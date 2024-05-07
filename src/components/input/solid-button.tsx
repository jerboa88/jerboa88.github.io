/*
	A bordered button with optional text/icon
	-----------------------------------------
*/


import React from 'react';
import { ButtonInterface } from '../../common/types';
import BaseButton from './base-button';
import Card from '../card';


interface SolidButtonInterface extends ButtonInterface {
	cardClassName?: string;
}

export default function SolidButton({ className = '', cardClassName = '', disabled, ...remainingProps }: SolidButtonInterface) {
	return (
		<Card outerClassName={cardClassName} middleClassName="rounded-lg" innerClassName="rounded-lg" disabled={disabled}>
			<BaseButton className={`px-4 py-3 sm:px-8 ${className}`} disabled={disabled} {...remainingProps} />
		</Card>
	);
}
