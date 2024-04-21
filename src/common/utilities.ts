import defaultProjectImage from '../images/default-tile-bg.png'


// Exports

// Check if the window object exists
// This will return false if the method is called from a server-side environment
export function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}

export function getProjectImage(imageUrl: string) {
	return imageUrl ? imageUrl : defaultProjectImage
}
