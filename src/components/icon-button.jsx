// Icon button
// Use function for this component because it doesn't use state
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function IconButton(props) {
	return (
		<button className={`inline-block m-4 p-4 rounded-full ${!props.disabled && 'hover:bg-white/20 transition-colors duration-200'} ${props.className || ''}`}>
			<FontAwesomeIcon icon={props.icon} className='block w-4 fa-lg fa-fw drop-shadow' />
		</button>
	);
}


{/* <button className={`inline-block m-4 px-3 py-2 rounded-full ${!props.disabled && 'hover:bg-white/20 transition-colors duration-200'} ${props.className || ''}`}>
<FontAwesomeIcon icon={props.icon} className='drop-shadow' />
</button> */}
