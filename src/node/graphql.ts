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

type ProjectType {
	color: String!
	name: String
}

"""
Define required fields from the GitHub GraphQL API schema
"""
type GithubDataDataUserRepositoriesNodes {
	forkCount: Int!
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
	childMarkdownRemark: MarkdownRemark
	description: String!
	descriptionHtml: String
	forkCount: Int!
	homepageUrl: String
	languages: [String!]!
	logoUrl: String
	licenseInfo: GithubDataDataUserRepositoriesNodesLicenseInfo
	name: String!
	openGraphImageUrl: String!
	owner: String!
	slug: String!
	stargazerCount: Int!
	topics: [String!]!
	type: ProjectType!
	updatedAt: Date!
	url: String!
	usesCustomOpenGraphImage: Boolean!
}
`;

export const githubReposQuery = `
query GithubRepos {
	allGithubRepo {
		nodes {
			childMarkdownRemark {
				html
			}
			description
			descriptionHtml
			forkCount
			homepageUrl
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
			slug
			stargazerCount
			topics
			type {
				color
				name
			}
			updatedAt
			url
			usesCustomOpenGraphImage
		}
	}
}
`;
