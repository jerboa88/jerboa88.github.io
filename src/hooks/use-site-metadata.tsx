/*
	Hook to get Gatsby site metadata via GraphQL query
	--------------------------------------------------
*/


import { graphql, useStaticQuery } from 'gatsby';


const useSiteMetadata = () => {
	const result = useStaticQuery(graphql`
		query HeaderQuery {
			site {
				siteMetadata {
					title,
					shortTitle,
					author,
					description,
					shortDescription,
					siteUrl,
					twitterUsername,
					ogImagePath,
					ogImageAltText,
					lightTheme {
						primary,
					},
					darkTheme {
						primary,
					},
				}
			}
		}
	`);

	return result.site.siteMetadata;
};


export default useSiteMetadata;
