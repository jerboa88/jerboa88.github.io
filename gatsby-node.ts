import { join, resolve } from 'node:path';
import type { GatsbyNode } from 'gatsby';
import { getPageMetadata } from './src/common/config-manager.ts';
import {
	ABOUT_PATH,
	CONTACT_PATH,
	EXPERIENCE_PATH,
	INDEX_PATH,
	PAGE_TEMPLATES_DIR,
	PROJECTS_PATH,
	PROJECTS_PATH_SHORT,
	RESUME_PATH,
	SOCIAL_IMAGES_PATH,
	SOCIAL_IMAGE_TEMPLATES_DIR,
} from './src/common/constants.ts';
import { transformGithubDataNode } from './src/node/github-data-node-transformer.ts';
import { schema } from './src/node/graphql.ts';
import { setReporter, warn } from './src/node/logger.ts';
import {
	getProjects,
	getSubsetOfProjects,
} from './src/node/projects-manager.ts';
import {
	createPage,
	createRedirect,
	deletePage,
	setGatsbyNodeHelpers,
} from './src/node/utils.ts';
import type { Project } from './src/types/content/projects.ts';
import { EntryPage, type PageMetadata } from './src/types/other.ts';
import type {
	IndexPageContext,
	ProjectPageContext,
	ResumePageContext,
} from './src/types/page-context.ts';
import type { AbsolutePathString } from './src/types/strings.ts';
import type { EmptyObject } from './src/types/utils.ts';

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
function createIndexPage(projects: Project[], authorBioHtml: string) {
	const context: IndexPageContext = {
		projects: getSubsetOfProjects(projects, EntryPage.Index),
		authorBioHtml,
	};

	createPage({
		path: INDEX_PATH,
		component: INDEX_PAGE_TEMPLATE,
		socialImageComponent: INDEX_OG_IMAGE_TEMPLATE,
		context: context,
	});
}

// Sort GitHub repos by creation date
function sortByCreatedAt(a: Project, b: Project) {
	return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

// Create the resume page
function createResumePage(projects: Project[]) {
	const pageMetadata: PageMetadata | EmptyObject =
		getPageMetadata(RESUME_PATH) || {};
	const context: ResumePageContext = {
		pageMetadata,
		projects: getSubsetOfProjects(projects, EntryPage.Resume, sortByCreatedAt),
	};

	createPage({
		path: RESUME_PATH,
		component: RESUME_PAGE_TEMPLATE,
		socialImageComponent: OTHER_OG_IMAGE_TEMPLATE,
		context: context,
	});
}

// Create project pages
function createProjectPages(projects: Project[]) {
	for (const project of projects) {
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
		createPage({
			path,
			component: PROJECT_PAGE_TEMPLATE,
			socialImageComponent: PROJECT_OG_IMAGE_TEMPLATE,
			context,
		});

		createRedirect(shortPath, path);
	}
}

// Create client-side redirects
function createRedirects() {
	const redirects = [
		[ABOUT_PATH, '/#about'],
		[PROJECTS_PATH, '/#projects'],
		[EXPERIENCE_PATH, '/#experience'],
		[CONTACT_PATH, '/#contact'],
	];

	for (const [fromPath, toPath] of redirects) {
		createRedirect(fromPath, toPath);
	}
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
export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page }) => {
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
	createPage({
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
	const { projects, authorBioHtml } = await getProjects(graphql);

	createProjectPages(projects);
	createIndexPage(projects, authorBioHtml);
	createResumePage(projects);
	createRedirects();
};
