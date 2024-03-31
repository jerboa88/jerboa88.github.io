/*
	Page footer with external links
	-------------------------------
*/


import React from 'react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { SiteMetadataInterface } from '../../common/types';
import ButtonLink from '../links/button-link';


interface FooterPropsInterface {
	siteMetadata: SiteMetadataInterface;
}

export default function Footer({ siteMetadata }: FooterPropsInterface) {
	return (
		<footer className="w-full bg-base-200 z-20">
			<div className='divider h-auto m-0 transition-opacity opacity-100' />
			<div className='flex-row p-4 pb-4 items-center justify-between'>
				<nav layout="position" className="tabs flex-row justify-center font-button uppercase">
					<ButtonLink text='Source' to={siteMetadata.sourceUrl} />
					{/* TODO: Add privacy policy */}
					{/* <ButtonLink text='Privacy' to='#' /> */}
				</nav>
				<nav className='flex flex-row justify-center'>
					<ButtonLink to={siteMetadata.author.link.linkedin} icon={faLinkedin} />
					<ButtonLink to={siteMetadata.author.link.github} icon={faGithub} />
				</nav>
			</div>
		</footer>
	);
}
