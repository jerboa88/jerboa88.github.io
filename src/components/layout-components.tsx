/*
	Reusable layout components
	--------------------------
*/


import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { MotionConfig } from 'framer-motion';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { H2, P } from '../components/text-components';
import IconButton from '../components/icon-button';
import { Helmet } from 'react-helmet';
import { MetadataInterface, ThemeInterface } from '../common/types';


// Page section
interface SectionPropsInterface {
	className?: string;
	title?: string;
	children: React.ReactNode;
}

export function Section({ className = '', title, children }: SectionPropsInterface) {
	return (
		<section className={`flex flex-col min-h-screen p-8 text-white text-center justify-center ${className}`}>
			{title && <H2>{title}</H2>}
			{children}
		</section>
	);
}


// Footer shown on every page
interface FooterPropsInterface {
	className?: string;
}

export function Footer({ className = '' }: FooterPropsInterface) {
	return (
		<footer className={`w-full ${className}`}>
			<nav className='flex flex-row justify-around text-center'>
				<Link to='about' className='flex-1 p-2'>About</Link>
				<P className='flex-1 p-4'>Handcrafted with love</P>
				<Link to='privacy' className='flex-1 p-2'>Privacy Policy</Link>
			</nav>
			<nav className='flex flex-row justify-center'>
				<a href='https://instagram.com/jerboa88' rel='external'>
					<IconButton icon={faInstagram} className='fa-xl' />
				</a>
				<a href='https://linkedin.com' rel='external'>
					<IconButton icon={faLinkedin} className='fa-xl' />
				</a>
				<a href='https://github.com/jerboa88' rel='external'>
					<IconButton icon={faGithub} className='fa-xl' />
				</a>
			</nav>
		</footer>
	);
}


interface PageLayoutPropsInterface {
	className?: string;
	metadata: MetadataInterface;
	lightTheme: ThemeInterface;
	darkTheme: ThemeInterface;
	children: ReactNode
}

// Layout component that provides basic styles and metadata tags for the whole page
export function PageLayout({ className = '', metadata, lightTheme, darkTheme, children }: PageLayoutPropsInterface) {
	// const lsKeyForTheme = 'is-dark-theme';
	// const lsKeyForMotion = 'is-motion-allowed';
	// const lsKeyForAnalytics = `ga-disable-${props.metadata.trackingId}`;
	const ogImageUrl = `${metadata.siteUrl}${metadata.ogImageUrl}`;
	// Whether the component is currently being mounted or not
	// We can use this to ignore initial state changes of the component
	// const isMount = useIsMount();
	// const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getIsDarkMode());
	// const [isMotionAllowed, setIsMotionAllowed] = useState<boolean>(getIsMotionAllowed());
	// const [areAnalyticsAllowed, setAreAnalyticsAllowed] = useState<boolean>(getAreAnalyticsAllowed());

	// Save the user's preferences to local storage or cookies when its state changes
	// useEffect(() => {
	// 	StorageManager.setIf(!isMount, lsKeyForTheme, isDarkTheme);
	// }, [isDarkTheme]);

	// useEffect(() => {
	// 	StorageManager.setIf(!isMount, lsKeyForMotion, isMotionAllowed);
	// }, [isMotionAllowed]);

	// useEffect(() => {
	// 	CookieManager.setIf(!isMount, lsKeyForAnalytics, !areAnalyticsAllowed);
	// }, [areAnalyticsAllowed]);

	// Get the user's preference from storage if it exists
	// Otherwise, use the system preference if it is set or fall back to the default value
	// function getIsDarkMode(): boolean {
	// 	return StorageManager.get(lsKeyForTheme, mediaFeatureMatches('prefers-color-scheme', 'dark', true));
	// }

	// function getIsMotionAllowed(): boolean {
	// 	return StorageManager.get(lsKeyForMotion, !mediaFeatureMatches('prefers-reduced-motion', 'reduce', false));
	// }

	// function getAreAnalyticsAllowed(): boolean {
	// 	return !CookieManager.get(lsKeyForAnalytics, false);
	// }

	// Get the primary theme color from DaisyUI config
	function getPrimaryThemeColor(): string {
		// TODO: Replace hardcoded value
		return true ? darkTheme.primary : lightTheme.primary;
		// return metadata[true ? 'darkTheme' : 'lightTheme'].primary;
	}

	// Define toggle functions and memoize before passing to the relevant context provider
	// const providerValuesForTheme = useMemo(() => ({
	// 	isEnabled: isDarkTheme,
	// 	toggle: () => {
	// 		setIsDarkTheme(!isDarkTheme);
	// 	}
	// }), [isDarkTheme]);

	// const providerValuesForMotion = useMemo(() => ({
	// 	isEnabled: isMotionAllowed,
	// 	toggle: () => {
	// 		setIsMotionAllowed(!isMotionAllowed);
	// 	}
	// }), [isMotionAllowed]);

	// const providerValuesForAnalytics = useMemo(() => ({
	// 	isEnabled: areAnalyticsAllowed,
	// 	toggle: () => {
	// 		setAreAnalyticsAllowed(!areAnalyticsAllowed);
	// 	}
	// }), [areAnalyticsAllowed]);

	// <DarkThemeContext.Provider value={providerValuesForTheme}>
	// <AllowMotionContext.Provider value={providerValuesForMotion}>
	// 	<SendAnalyticsContext.Provider value={providerValuesForAnalytics}>

	// 	</SendAnalyticsContext.Provider>
	// 	</AllowMotionContext.Provider>
	// </DarkThemeContext.Provider>

	return (
		<>
			{/* Page head */}
			<Helmet htmlAttributes={{ lang: 'en-US' }}>
				<title>{metadata.title}</title>
				<meta name="author" content={metadata.author} />
				<meta name="description" content={metadata.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				{/* OpenGraph meta tags */}
				<meta property="og:title" content={metadata.title} />
				<meta property="og:description" content={metadata.description} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={metadata.siteUrl} />
				<meta property="og:image" content={ogImageUrl} />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:image:alt" content={metadata.ogImageAltText} />

				{/* Twitter meta tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={metadata.title} />
				<meta name="twitter:creator" content={metadata.authorUsername} />
				<meta name="twitter:description" content={metadata.description} />
				<meta name="twitter:image" content={ogImageUrl} />
				<meta name="twitter:image:alt" content={metadata.ogImageAltText} />

				<meta name="google" content="nositelinkssearchbox" />
				<meta content={getPrimaryThemeColor()} name="theme-color" />

				<link rel="canonical" href={metadata.siteUrl} />

				{/* These icons are were not added to the head with gatsby-plugin-manifest so we need to add them manually here */}
				<link rel="icon" href="/favicon-32x32.png" type="image/png" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

				{/* Structured data */}
				<script type="application/ld+json">
					{`{
							"@context": "http://schema.org",
							"@type": "WebSite",
							"name": "${metadata.shortTitle}",
							"description": "${metadata.description}",
							"url": "${metadata.siteUrl}",
							"author": {
								"@type": "Person",
								"name": "${metadata.author}",
								"url": "https://${metadata.homepageDomain}"
							}
						}`}
				</script>
			</Helmet>

			{/* Page body */}
			<MotionConfig reducedMotion="user">
				<div className={`min-h-screen flex-col justify-between items-center mx-auto gap-8 text-base bg-base-200 text-base-content selection:bg-primary selection:text-primary-content ${className}`}>
					{children}
					<Footer />
				</div>
			</MotionConfig>
		</>
	);
}
