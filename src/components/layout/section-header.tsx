/*
	Header text and optional button link for a page section
	-------------------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import SectionHeading from '../text/section-heading';
import GhostButtonLink from '../links/ghost-button-link';
import Tooltip from '../tooltip';


interface SectionHeaderPropsInterface extends PropsWithClassName, PropsWithChildren {
	title: string;
	button?: {
		text: string;
		icon: IconDefinition;
		to: string;
		flip?: boolean;
	};
}

export default function SectionHeader({ className = '', title, button }: SectionHeaderPropsInterface) {
	const classNameProps = getClassNameProps(
		'w-full flex flex-row justify-between items-baseline pt-8',
		className,
	);

	return (
		<>
			<div {...classNameProps}>
				<SectionHeading>
					{title}
				</SectionHeading>
				{button && (
					<Tooltip text={button.text} className="!tooltip-left">
						<GhostButtonLink flip={button.flip ?? true} className="self-baseline" {...button} responsive />
					</Tooltip>
				)}
			</div>
			<div className="pb-8 m-0 h-auto opacity-100 divider" />
		</>
	);
}
