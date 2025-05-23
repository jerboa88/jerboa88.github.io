/*
	Layout component that provides basic styles for the whole page
	--------------------------------------------------------------
*/

import { MotionConfig } from 'motion/react';
import { type PropsWithChildren, StrictMode, lazy } from 'react';
import { SPRING_TRANSITION_PROPS } from '../../config/constants.ts';
import type { PageSection } from '../../types/components.ts';
import type { PropsWithClassName } from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { Footer } from './footer.tsx';
import { Header } from './header.tsx';

// Types

interface Props extends PropsWithClassName, PropsWithChildren {
	expandTitle?: boolean;
	sections?: readonly PageSection[];
}

// Constants

const BG_GRADIENT_PROPS = {
	style: {
		background:
			'radial-gradient(100% 100% at 0% 0%,oklch(var(--a)),oklch(var(--b2)),transparent),radial-gradient(100% 100% at 100% 100%,oklch(var(--a)),oklch(var(--b2)),transparent)',
	},
};

const ParticlesBackground = lazy(() =>
	import('./particles-background.tsx').then((module) => ({
		default: module.ParticlesBackground,
	})),
);

export function PageLayout({
	className,
	expandTitle,
	sections = [],
	children,
}: Props) {
	const classNameProps = getClassNameProps(
		'flex-col gap-32 justify-between items-center mx-auto text-base min-h-svh scroll-smooth selection:bg-primary selection:text-primary-content',
		className,
	);

	// const lsKeyForTheme = 'is-dark-theme';
	// const lsKeyForMotion = 'is-motion-allowed';
	// const lsKeyForAnalytics = `ga-disable-${props.siteMetadata.trackingId}`;
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
		<StrictMode>
			<MotionConfig {...SPRING_TRANSITION_PROPS} reducedMotion="user">
				{/* Page body */}
				<div {...BG_GRADIENT_PROPS} {...classNameProps}>
					<ParticlesBackground />
					<Header {...{ expandTitle, sections }} />
					{children}
					<Footer />
				</div>
			</MotionConfig>
		</StrictMode>
	);
}
