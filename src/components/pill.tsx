/*
	Pill widget
	-----------
*/


import React from 'react';
import ConfigManager from '../common/config-manager';
import { Span } from '../components/text-components';


interface PillPropsInterface {
	className?: string;
	text: string;
}

export default function Pill({ className = '', text }: PillPropsInterface) {
	const configManager = new ConfigManager();
	const color = configManager.getProjectTypeColor(text) || configManager.getRoleTypeColor(text) || 'bg-transparent';

	return (
		<div key={text} className={`inline-block w- fit h-fit px-3 py-2 rounded-lg drop-shadow-sm ${color} ${className}`}>
			<Span>{text}</Span>
		</div>
	);
}
