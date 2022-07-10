/*
	Reusable layout components
	--------------------------
*/


import React from 'react';
import { Link } from 'gatsby';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { H2, P } from '../components/text-components';
import IconButton from '../components/icon-button';


// Page section
interface SectionPropsInterface {
	className?: string;
	title?: string;
	children: React.ReactNode;
}

export function Section({ className = '', title, children }: SectionPropsInterface) {
	return (
		<section className={`flex flex-col min-h-screen p-8 text-white text-center justify-center ${className}`}>
			{title && <H2>{title}</H2>}
			{children}
		</section>
	);
}


// Footer shown on every page
interface FooterPropsInterface {
	className?: string;
}

export function Footer({ className = '' }: FooterPropsInterface) {
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


// Layout component that wraps every page
export function Layout(props: { children: React.ReactNode }) {
	return (
		<React.Fragment>
			<main>
				{props.children}
			</main>
			<Footer />
		</React.Fragment>
	);
}
