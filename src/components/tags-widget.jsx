// Widget to show tags with colored bullets
// Use function for this component because it doesn't use state
import React from 'react';
import { P } from '../components/text-components';


export default function TagsWidget(props) {
	return (
		<div className={`flex flex-row px-3 gap-2 ${props.className || ''}`}>
			{
				props.data.map(({ name, color }) => {
					return (
						<div key={name} className={'inline-block'}>
							<span className='m-0 align-middle text-4xl leading-4 drop-shadow' style={{ color: `${color}` }}>•</span>
							<P className='inline mx-1 my-0 drop-shadow'>{name}</P>
						</div>
					);
				})
			}
		</div>
	);
}
