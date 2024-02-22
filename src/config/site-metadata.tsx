/*
	Site metadata
	-------------
*/


import type { SiteMetadataConfigInterface } from '../common/types';


export default {
	shortTitle: 'John Goodliff',
	title: 'John Goodliff | Software Developer',
	shortDescription: 'A portfolio site for John Goodliff, a Software Developer based in Edmonton, Alberta.',
	description: 'A portfolio site for John Goodliff, a Software Developer based in Edmonton, Alberta.',
	ogImagePath: 'images/og-image.png',
	ogImageAltText: 'Cover image for johng.io',
	siteUrl: 'https://johng.io/',
	sourceUrl: 'https://github.com/jerboa88/jerboa88.github.io/',
	trackingId: 'G-1PTSNX2F57',
	author: {
		firstName: 'John',
		lastName: 'Goodliff',
		jobTitle: 'Software Developer',
		alumniOf: 'University of Alberta',
		image: 'https://2.gravatar.com/avatar/17dff698e6f6992387f1650b6111daa02ba7cae1b0eb453b65b30036c4e36253?size=1024',
		username: {
			linkedin: 'johngoodliff',
			github: 'jerboa88',
			twitter: 'jerboa88',
		},
		location: {
			city: 'Edmonton',
			state: 'Alberta',
			country: 'Canada',
		},
	}
} as SiteMetadataConfigInterface;
