const APP_NAME = 'John Goodliff - Software Developer & Student';

require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	siteMetadata: {
		title: APP_NAME,
		description: 'Portfolio site for John Goodliff, Software Developer and Student',
		siteUrl: 'https://johng.io'
	},
	plugins: [
		'gatsby-plugin-postcss',
		'gatsby-plugin-image',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		// TODO: Enable this later
		// {
		// 	resolve: `gatsby-plugin-realfavicongenerator`,
		// 	options: {
		// 		apiKey: process.env.RFG_API_KEY,
		// 		appName: APP_NAME,
		// 		masterPicture: 'src/images/icon.png',
		// 		themeColor: '#040609'
		// 	}
		// },
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				'icon': 'src/images/icon.png'
			}
		},
		{
			resolve: 'gatsby-plugin-web-font-loader',
			options: {
				google: {
					families: ['Montserrat:900', 'Open Sans:400']
				}
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				'name': 'images',
				'path': './src/images/'
			},
			__key: 'images'
		},
		{
			resolve: 'gatsby-source-graphql',
			options: {
				typeName: 'GITHUB',
				fieldName: 'github',
				url: 'https://api.github.com/graphql',
				headers: {
					Authorization: `Bearer ${process.env.GH_TOKEN}`,
				},
			},
		}
	]
};
