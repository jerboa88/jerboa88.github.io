import defaultProjectImage from './images/default-tile-bg.png'

export default function getProjectImage(imageUrl) {
	return imageUrl ? imageUrl : defaultProjectImage
}
