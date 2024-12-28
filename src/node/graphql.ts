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
	childMarkdownRemark: MarkdownRemark
	createdAt: Date!
	description: String!
	descriptionHtml: String
	exposition: String
	forkCount: Int!
	homepageUrl: String
	isFork: Boolean!
	languages: [String!]!
	logoUrl: String
	licenseInfo: GithubDataDataUserRepositoriesNodesLicenseInfo
	name: String!
	openGraphImageUrl: String!
	owner: String!
	slug: String!
	stargazerCount: Int!
	topics: [String!]!
	category: ProjectCategory!
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
			createdAt
			description
			descriptionHtml
			exposition
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
			slug
			stargazerCount
			topics
			category {
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
