import { writeFile as writeFileAsync } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { CreatePagesArgs, GatsbyNode } from 'gatsby';
import resolveConfig from 'tailwindcss/resolveConfig';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
	ABOUT_PATH,
	CONTACT_PATH,
	EXPERIENCE_PATH,
	INDEX_PATH,
	PAGE_TEMPLATES_DIR,
	PROJECTS_PATH,
	PROJECTS_PATH_SHORT,
	PROJECT_METADATA_SCHEMA,
	PROJECT_METADATA_SCHEMA_FILE,
	RESUME_PATH,
	SOCIAL_IMAGES_PATH,
	SOCIAL_IMAGE_TEMPLATES_DIR,
} from './src/config/constants.ts';
import {
	getPageMetadata,
	getProjectCategoryColor,
} from './src/managers/config.ts';
import {
	getAuthorBio,
	getProjectsForPage,
} from './src/managers/content/projects.ts';
import { transformGithubDataNode } from './src/node/github-data-node-transformer.ts';
import { schema } from './src/node/graphql.ts';
import { panic, setReporter, warn } from './src/node/logger.ts';
import {
	createDirs,
	createPage,
	createRedirect,
	deletePage,
	fetchAndSaveImage,
	setGatsbyNodeHelpers,
} from './src/node/utils.ts';
import { ProjectCategory } from './src/types/content/projects.ts';
import type { PageMetadata } from './src/types/other.ts';
import type {
	IndexPageContext,
	ProjectPageContext,
	ResumePageContext,
} from './src/types/page-context.ts';
import type {
	AbsolutePathString,
	DirPathString,
	UrlString,
	WorkingPathString,
} from './src/types/strings.ts';
import type { EmptyObject } from './src/types/utils.ts';
import { isDefined, prettify } from './src/utils/other.ts';
import tailwindConfig from './tailwind.config.ts';

// Constants

const INDEX_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'index.tsx');
const PROJECT_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'project.tsx');

const INDEX_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'index.tsx',
);
const RESUME_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'resume.tsx');
const PROJECT_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'project.tsx',
);
const OTHER_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'other.tsx',
);

// Functions

// Create the landing page
async function createIndexPage(graphql: CreatePagesArgs['graphql']) {
	const [projects, authorBio] = await Promise.all([
		getProjectsForPage(graphql, INDEX_PATH),
		getAuthorBio(graphql),
	]);
	const context: IndexPageContext = {
		projects,
		authorBio,
	};

	return createPage({
		path: INDEX_PATH,
		component: INDEX_PAGE_TEMPLATE,
		socialImageComponent: INDEX_OG_IMAGE_TEMPLATE,
		context: context,
	});
}

// Create the resume page
async function createResumePage(graphql: CreatePagesArgs['graphql']) {
	const projects = await getProjectsForPage(graphql, RESUME_PATH);
	const pageMetadata: PageMetadata | EmptyObject =
		getPageMetadata(RESUME_PATH) || {};
	const context: ResumePageContext = {
		pageMetadata,
		projects,
	};

	return createPage({
		path: RESUME_PATH,
		component: RESUME_PAGE_TEMPLATE,
		socialImageComponent: OTHER_OG_IMAGE_TEMPLATE,
		context: context,
	});
}

// Create project pages
async function createProjectPages(graphql: CreatePagesArgs['graphql']) {
	const projects = await getProjectsForPage(graphql, PROJECTS_PATH);
	const promises = projects.map(async (project) => {
		const path: AbsolutePathString = join(
			PROJECTS_PATH,
			project.slug,
		) as AbsolutePathString;
		const shortPath: AbsolutePathString = join(
			PROJECTS_PATH_SHORT,
			project.slug,
		) as AbsolutePathString;
		const context: ProjectPageContext = {
			project,
		};
		// Create project pages
		const createPagePromise = createPage({
			path,
			component: PROJECT_PAGE_TEMPLATE,
			socialImageComponent: PROJECT_OG_IMAGE_TEMPLATE,
			context,
		});
		const createRedirectPromise = createRedirect(shortPath, path);

		await Promise.all([createPagePromise, createRedirectPromise]);
	});

	return Promise.all(promises);
}

// Create client-side redirects
async function createRedirects() {
	const redirectsMatrix: [
		fromPath: AbsolutePathString,
		toPath: AbsolutePathString,
	][] = [
		[ABOUT_PATH, '/#about'],
		[PROJECTS_PATH, '/#projects'],
		[EXPERIENCE_PATH, '/#experience'],
		[CONTACT_PATH, '/#contact'],
	];
	const promises = redirectsMatrix.map(([fromPath, toPath]) =>
		createRedirect(fromPath, toPath),
	);

	return Promise.all(promises);
}

// Create project category badges for use in READMEs
async function createProjectCategoryBadges() {
	const badgesBaseUrl: UrlString = 'https://img.shields.io/badge' as const;
	const badgesDir: WorkingPathString & DirPathString =
		'./public/badges/category/' as const;
	const { colors } = resolveConfig(tailwindConfig).theme;

	await createDirs(badgesDir);

	const promises = Object.values(ProjectCategory).map(async (category) => {
		const cssColor = getProjectCategoryColor(category);
		const [_, colorName, colorShade] = cssColor.split('-');

		if (!(isDefined(colorName) && isDefined(colorShade))) {
			panic(`CSS color '${cssColor}' is not in the expected format`);
		}

		const hexColor = colors[colorName]?.[colorShade];

		if (!isDefined(hexColor)) {
			panic(`CSS color '${cssColor}' is not a valid theme color`);
		}

		const badgeUrl = `${badgesBaseUrl}/category-${category}-${hexColor.slice(1)}`;
		const badgeFilePath = join(badgesDir, `${category}.svg`);

		await fetchAndSaveImage(badgeUrl, badgeFilePath);
	});

	return Promise.all(promises);
}

// Create project metadata schema for validating project metadata files
async function createProjectMetadataSchema() {
	const jsonSchema = zodToJsonSchema(PROJECT_METADATA_SCHEMA, {
		name: 'Project Metadata',
		nameStrategy: 'title',
		target: 'jsonSchema2019-09',
	});

	await createDirs(PROJECT_METADATA_SCHEMA_FILE);

	return writeFileAsync(PROJECT_METADATA_SCHEMA_FILE, prettify(jsonSchema));
}

// Save Gatsby Node API Helpers for later use
export const onPluginInit: GatsbyNode['onPluginInit'] = ({
	reporter,
	actions: { createPage, deletePage, createRedirect },
}) => {
	setReporter(reporter);
	setGatsbyNodeHelpers(createPage, deletePage, createRedirect);
};

// Add custom types to the GraphQL schema
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
	({ actions: { createTypes } }) => {
		// Overwrite fields that we know are non-null (as per the GitHub GraphQL schema)
		createTypes(schema);
	};

// Transform source nodes into a more usable format
export const onCreateNode: GatsbyNode<Queries.GithubData>['onCreateNode'] = ({
	node,
	actions: { createNode },
	createContentDigest,
}) => {
	if (node.internal.type === 'GithubData') {
		transformGithubDataNode(node, createNode, createContentDigest);
	}
};

// Add metadata to automatically generated pages and generate the associated Open Graph images
export const onCreatePage: GatsbyNode['onCreatePage'] = async ({ page }) => {
	if (!page.path) {
		return;
	}

	// Skip social images
	if (page.path.startsWith(SOCIAL_IMAGES_PATH)) {
		return;
	}

	const pageMetadata = getPageMetadata(page.path);

	if (!pageMetadata) {
		warn(`Skipped adding metadata to ${page.path}`);

		return;
	}

	deletePage(page);
	await createPage({
		...page,
		path: page.path as AbsolutePathString,
		socialImageComponent: OTHER_OG_IMAGE_TEMPLATE,
		context: {
			...page.context,
			pageMetadata: pageMetadata,
		},
	});
};

// Manually create pages and generate the associated Open Graph images
export const createPages: GatsbyNode['createPages'] = async ({ graphql }) => {
	await Promise.all([
		createProjectPages(graphql),
		createIndexPage(graphql),
		createResumePage(graphql),
		createProjectMetadataSchema(),
		createProjectCategoryBadges(),
		createRedirects(),
	]);
};
