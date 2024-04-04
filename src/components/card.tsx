/*
	Reusable card component
	-----------------------
*/


import React, { PropsWithChildren } from 'react';


interface CardPropsInterface extends PropsWithChildren {
	className?: string;
	disabled?: boolean;
}

export default function Card({ className = '', disabled = false, children }: CardPropsInterface) {
	const interactiveStyles = disabled ? '' : 'interactive-scale-sm';

	return (
		<div className={`bg-base-200 border-2 border-base-content/10 rounded-2xl overflow-hidden duration-500 ${interactiveStyles} ${className}`}>
			{children}
		</div>
	);
}
