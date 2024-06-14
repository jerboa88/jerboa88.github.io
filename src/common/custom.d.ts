/*
	Custom Type Definitions for TypeScript imports
	----------------------------------------------
*/

declare module 'react-html-comment';

declare module '*.css';

// TODO: Make this declaration more specific
// declare module '*.css' {
// 	export default React;
// }

// Create custom type for svg files to suppress import warnings
declare module '../images/*.svg' {
	export default React.FunctionComponent<React.SVGAttributes<SVGElement>>();
}

// Create custom type for png images to suppress import warnings
declare module '../images/*.png' {
	export default React.FunctionComponent<
		React.PNGAttributes<HTMLImageElement>
	>();
}
