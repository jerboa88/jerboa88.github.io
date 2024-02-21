/*
	Image generation config to pass to gatsby-plugin-image-generator
	----------------------------------------------------------------
*/


export default {
	ogImage: {
		from: 'images/og-image.png',
		to: [
			{
				path: 'images/og-image.png',
				size: [1200, 630],
			}
		]
	},
	// We can generate the webmanifest config from this
	icons: [
		{
			from: 'images/maskable-icon.png',
			to: [
				{
					path: 'icons/maskable-icon.png',
					size: 512
				}
			],
			options: {
				optimize: true
			}
		},
		{
			from: 'images/icon.png',
			to: [
				// {
				// 	path: 'favicon.svg',
				// 	size: 1024
				// },
				{
					path: 'favicon-32x32.png',
					size: 32
				},
				{
					path: 'icons/icon-48x48.png',
					size: 48
				},
				{
					path: 'icons/icon-72x72.png',
					size: 72
				},
				{
					path: 'icons/icon-96x96.png',
					size: 96
				},
				{
					path: 'icons/icon-144x144.png',
					size: 144
				},
				{
					path: 'icons/icon-192x192.png',
					size: 192
				},
				{
					path: 'icons/icon-256x256.png',
					size: 256
				},
				{
					path: 'icons/icon-384x384.png',
					size: 384
				},
				{
					path: 'icons/icon-512x512.png',
					size: 512
				}
			],
			options: {
				optimize: true
			}
		},
	],
};
