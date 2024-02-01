import React from 'react';


interface NavLinkPropsInterface {
	className?: string;
	title: string;
	href: string;
	key?: string;
}

export default function NavLink({ className = '', title, href }: NavLinkPropsInterface) {
	return (
		<a href={href} className={`tab px-2 sm:px-4 j-scale-transitions ${className}`}>{title}</a>
	);
}
