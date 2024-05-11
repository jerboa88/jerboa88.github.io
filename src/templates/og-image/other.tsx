/*
	Template used to generate Open Graph images for all other pages
	---------------------------------------------------------------
*/

// TODO: Implement this template

import React from 'react'
import { Node } from 'gatsby'


export default function (props: Node) {
	console.warn('props', props)

	return (
		<div className="flex flex-row size-full bg-error">
			<h1>Open Graph image for other pages</h1>
			<output>
				{JSON.stringify(props, null, 2)}
			</output>
		</div>
	)
}
