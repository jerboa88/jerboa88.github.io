/*
	Page footer with external links
	-------------------------------
*/


import React from 'react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { SiteMetadataInterface } from '../../common/types';
import ButtonLink from '../links/button-link';
import Tooltip from '../tooltip';


interface FooterPropsInterface {
	siteMetadata: SiteMetadataInterface;
}

export default function Footer({ siteMetadata }: FooterPropsInterface) {
	return (
		<footer className="w-full bg-base-200 z-20">
			<div className="divider h-auto m-0 opacity-100" />
			<div className="flex-row p-4 pb-4 items-center justify-between">
				<nav className="tabs flex-row justify-center font-button">
					<Tooltip text="View the source code on GitHub" className="!tooltip-right">
						<ButtonLink text="Source" to={siteMetadata.sourceUrl} className="uppercase" />
					</Tooltip>
					{/* TODO: Add privacy policy */}
					{/* <Tooltip text="View the privacy policy" className="!tooltip-right">
						<ButtonLink text='Privacy' to='#' className="uppercase"/>
					</Tooltip> */}
				</nav>
				<nav className="flex flex-row justify-center">
					<Tooltip text="View my profile on LinkedIn" className="!tooltip-left">
						<ButtonLink to={siteMetadata.author.link.linkedin} icon={faLinkedin} />
					</Tooltip>
					<Tooltip text="View my profile on GitHub" className="!tooltip-left">
						<ButtonLink to={siteMetadata.author.link.github} icon={faGithub} />
					</Tooltip>
				</nav>
			</div>
		</footer>
	);
}
