/*
	Header text and optional button link for a page section
	-------------------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { H2 } from '../text-components';
import ButtonLink from '../links/button-link';
import Tooltip from '../tooltip';


interface SectionHeaderPropsInterface extends PropsWithChildren {
	className?: string;
	title: string;
	button?: {
		text: string;
		icon: IconDefinition;
		to: string;
	};
}

export default function SectionHeader({ className = '', title, button }: SectionHeaderPropsInterface) {
	return (
		<>
			<div className={`w-full flex justify-between items-baseline pt-8 ${className}`}>
				<H2>{title}</H2>
				{button && (
					<Tooltip text={button.text} className="tooltip-left">
						<ButtonLink {...button} responsive flip className="self-baseline" />
					</Tooltip>
				)}
			</div>
			<div className="divider h-auto m-0 pb-8 opacity-100" />
		</>
	);
}
