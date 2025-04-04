/*
	GraphQL types and queries
*/

export const schema = `
type GithubDataDataUser {
	repositories: GithubDataDataUserRepositories!
}

type GithubDataDataUserRepositories {
	nodes: [GithubDataDataUserRepositoriesNodes]
}

type GithubDataDataUserRepositoriesNodesLicenseInfo {
	name: String!
	spdxId: String
	url: String
}

type GithubDataDataUserRepositoriesNodesOwner {
	login: String!
}

type GithubDataDataUserRepositoriesNodesRepositoryTopicsNodesTopic {
	name: String!
}

type GithubDataDataUserRepositoriesNodesRepositoryTopicsNodes {
	topic: GithubDataDataUserRepositoriesNodesRepositoryTopicsNodesTopic!
}

type GithubDataDataUserRepositoriesNodesRepositoryTopics {
	nodes: [GithubDataDataUserRepositoriesNodesRepositoryTopicsNodes]
}

type ProjectCategory {
	color: String!
	name: String
}

type Schema {
	type: String
	applicationCategory: String
	operatingSystem: String
}

"""
Define required fields from the GitHub GraphQL API schema
"""
type GithubDataDataUserRepositoriesNodes {
	createdAt: Date!
	forkCount: Int!
	isFork: Boolean!
	licenseInfo: GithubDataDataUserRepositoriesNodesLicenseInfo
	name: String!
	openGraphImageUrl: String!
	owner: GithubDataDataUserRepositoriesNodesOwner!
	repositoryTopics: GithubDataDataUserRepositoriesNodesRepositoryTopics!
	stargazerCount: Int!
	updatedAt: Date!
	url: String!
	usesCustomOpenGraphImage: Boolean!
}

"""
Define schema for custom GithubRepo nodes
"""
type GithubRepo implements Node {
	# Computed fields
	childMarkdownRemark: MarkdownRemark
	languages: [String!]!
	name: String!
	owner: String!
	slug: String!
	tags: [String!]!
	category: ProjectCategory!
	logoUrl: String

	# Fields directly from GitHub API
	createdAt: Date!
	description: String!
	forkCount: Int!
	homepageUrl: String
	isFork: Boolean!
	licenseInfo: GithubDataDataUserRepositoriesNodesLicenseInfo
	openGraphImageUrl: String!
	stargazerCount: Int!
	updatedAt: Date!
	url: String!
	usesCustomOpenGraphImage: Boolean!

	# Fields directly from project metadata file
	background: String
	schema: Schema!
	technologies: [String!]!
	tools: [String!]!
	topics: [String!]!
}
`;

export const githubReposQuery = `
query GithubRepos {
	allGithubRepo {
		nodes {
			background
			category {
				color
				name
			}
			childMarkdownRemark {
				html
			}
			createdAt
			description
			forkCount
			homepageUrl
			isFork
			languages
			logoUrl
			licenseInfo {
				name
				spdxId
				url
			}
			name
			openGraphImageUrl
			owner
			schema {
				applicationCategory
				operatingSystem
				type
			}
			slug
			stargazerCount
			tags
			technologies
			tools
			topics
			updatedAt
			url
			usesCustomOpenGraphImage
		}
	}
}
`;
