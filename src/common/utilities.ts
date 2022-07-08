import defaultProjectImage from '../images/default-tile-bg.png'

export default function getProjectImage(imageUrl: string) {
	return imageUrl ? imageUrl : defaultProjectImage
}
