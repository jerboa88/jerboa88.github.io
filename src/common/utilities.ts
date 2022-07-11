import defaultProjectImage from '../images/default-tile-bg.png'

// Exports

export function getProjectImage(imageUrl: string) {
	return imageUrl ? imageUrl : defaultProjectImage
}
