/*
	Page footer with external links
	-------------------------------
*/


import React from 'react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { MetadataInterface } from '../../common/types';
import IconButton from '../../components/icon-button';
import NavLink from '../../components/nav-link';


interface FooterPropsInterface {
	metadata: MetadataInterface;
}

export default function Footer({ metadata }: FooterPropsInterface) {
	return (
		<footer className="w-full bg-base-200 z-20">
			<div className='divider h-auto m-0 transition-opacity opacity-100' />
			<div className='flex-row p-4 pb-4 items-center justify-between'>
				<nav layout="position" className="tabs flex-row justify-center font-button uppercase">
					<NavLink title='Source' href={metadata.sourceUrl} />
					{/* TODO: Add privacy policy */}
					{/* <NavLink title='Privacy' href='#' /> */}
				</nav>
				<nav className='flex flex-row justify-center'>
					<a href={metadata.linkedinUrl} rel='external'>
						<IconButton icon={faLinkedin} />
					</a>
					<a href={metadata.githubUrl} rel='external'>
						<IconButton icon={faGithub} />
					</a>
				</nav>
			</div>
		</footer>
	);
}
