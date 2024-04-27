/*
	Reusable card component
	-----------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../common/types';


interface CardPropsInterface extends PropsWithClassName, PropsWithChildren {
	disabled?: boolean;
}

export default function Card({ className = '', disabled = false, children }: CardPropsInterface) {
	const interactiveStyles = disabled ? '' : 'interactive-card';

	return (
		<div className={`bg-base-200 border-2 border-base-content/10 rounded-2xl shadow-md overflow-hidden duration-500 ${interactiveStyles} ${className}`}>
			{children}
		</div>
	);
}
