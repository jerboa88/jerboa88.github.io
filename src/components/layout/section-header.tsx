/*
	Header text and optional button link for a page section
	-------------------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { H2 } from '../../components/text-components';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import ButtonLink from '../links/button-link';


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
			<div className="w-full flex justify-between items-baseline pt-8">
				<H2>{title}</H2>
				{button && <ButtonLink {...button} flip className="self-baseline" />}
			</div>
			<div className="divider h-auto m-0 pb-8 opacity-100" />
		</>
	);
}
