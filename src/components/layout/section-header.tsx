/*
	Header text and optional button link for a page section
	-------------------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PropsWithClassName } from '../../common/types';
import SectionHeading from '../text/section-heading';
import GhostButtonLink from '../links/ghost-button-link';
import Tooltip from '../tooltip';


interface SectionHeaderPropsInterface extends PropsWithClassName, PropsWithChildren {
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
				<SectionHeading>
					{title}
				</SectionHeading>
				{button && (
					<Tooltip text={button.text} className="!tooltip-left">
						<GhostButtonLink {...button} responsive flip className="self-baseline" />
					</Tooltip>
				)}
			</div>
			<div className="divider h-auto m-0 pb-8 opacity-100" />
		</>
	);
}
