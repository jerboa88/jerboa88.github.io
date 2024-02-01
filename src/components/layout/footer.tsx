/*
	Page footer with external links
	-------------------------------
*/


import React from 'react';
import { Link } from 'gatsby';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { P } from '../../components/text-components';
import { IconButton } from '../../components/icon-button';


interface FooterPropsInterface {
	className?: string;
}

export default function Footer({ className = '' }: FooterPropsInterface) {
	return (
		<footer className={`w-full ${className}`}>
			<nav className='flex flex-row justify-around text-center'>
				<Link to='about' className='flex-1 p-2'>About</Link>
				<P className='flex-1 p-4'>Handcrafted with love</P>
				<Link to='privacy' className='flex-1 p-2'>Privacy Policy</Link>
			</nav>
			<nav className='flex flex-row justify-center'>
				<a href='https://instagram.com/jerboa88' rel='external'>
					<IconButton icon={faInstagram} className='fa-xl' />
				</a>
				<a href='https://linkedin.com' rel='external'>
					<IconButton icon={faLinkedin} className='fa-xl' />
				</a>
				<a href='https://github.com/jerboa88' rel='external'>
					<IconButton icon={faGithub} className='fa-xl' />
				</a>
			</nav>
		</footer>
	);
}
