import defaultProjectImage from '../images/default-tile-bg.png'


// Exports

// Check if the window object exists
// This will return false if the method is called from a server-side environment
export function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}


// Check if the user has requested reduced motion
export function getIsMotionAllowed(): boolean {
	if (doesWindowExist()) {
		const result = window.matchMedia('(prefers-reduced-motion: reduce)');

		return result && !result.matches;
	}

	return false;
}


export function getProjectImage(imageUrl: string) {
	return imageUrl ? imageUrl : defaultProjectImage
}


// Default transition settings for Framer Motion animations
export function getDefaultTransition(): any {
	// TODO: Replace hardcoded boolean with `getIsMotionAllowed()`
	if (getIsMotionAllowed()) {
		return {
			transition: {
				type: 'spring',
				stiffness: 350,
				damping: 25,
			}
		}
	} else {
		return {
			transition: {
				duration: 0,
			}
		}
	}
}
