/*
	Custom GraphQL types
*/

export const graphqlSchema = `
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

type GithubRepo implements Node {
	childMarkdownRemark: MarkdownRemark
	description: String
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
