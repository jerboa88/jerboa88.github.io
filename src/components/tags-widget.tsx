/*
	Widget to show tags with colored bullets
	----------------------------------------
*/


import React from 'react';
import { ProjectLanguageInterface } from '../common/types';
import { P } from '../components/text-components';


interface TagsWidgetPropsInterface {
	className?: string;
	tags: ProjectLanguageInterface[];
}

export default function TagsWidget({ className = '', tags }: TagsWidgetPropsInterface) {
	return (
		<div className={`flex flex-row px-3 gap-2 ${className}`}>
			{
				tags.map(({ name, color }) => {
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
