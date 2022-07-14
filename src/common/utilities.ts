import defaultProjectImage from '../images/default-tile-bg.png'


// Exports

export function getProjectImage(imageUrl: string) {
	return imageUrl ? imageUrl : defaultProjectImage
}

// Default transition settings for Framer Motion animations
export function getDefaultTransition(): any {
	// TODO: Replace hardcoded boolean with `getIsMotionAllowed()`
	if (true) {
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

// Check if the window object exists
// This will return false if the method is called from a server-side environment
export function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}
