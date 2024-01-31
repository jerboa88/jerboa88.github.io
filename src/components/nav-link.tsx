import React from 'react';


interface NavLinkPropsInterface {
	className?: string;
	title: string;
	href: string;
	key?: string;
}

export function NavLink({ className = '', title, href }: NavLinkPropsInterface) {
	return (
		<a href={href} className={`tab px-2 sm:px-4 transition-transform hover:scale-110 ${className}`}>{title}</a>
	);
}
