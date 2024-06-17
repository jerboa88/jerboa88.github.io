/*
	Custom head section for Open Graph image templates
	--------------------------------------------------
*/

export function SocialImageHead() {
	// Scale all components by making the root font size proportional to the viewport size
	return (
		<>
			<html lang="en-US" className="text-[1.75vmax]" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</>
	);
}
