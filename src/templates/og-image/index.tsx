/*
	Template used to generate an Open Graph image for the landing page
	------------------------------------------------------------------
*/

// TODO: Implement this template

import React from 'react'
import { Node } from 'gatsby'


export default function (props: Node) {
	console.log('props', props)

	return (
		<div className="flex flex-row size-full bg-error">
			<h1>Open Graph image for the landing page</h1>
			<output>
				{JSON.stringify(props, null, 2)}
			</output>
		</div>
	)
}
