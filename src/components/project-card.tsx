/*
	Container for a project card and its title
	------------------------------------------
*/


import React, { useCallback, useState } from 'react';
import { Link } from 'gatsby';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import getProjectImage from '../common/utilities';
import { ProjectInfoInterface } from '../common/types';
import { H3, P, C } from '../components/text-components';
import Pill from '../components/pill';
import TagsWidget from '../components/tags-widget';
import IconButton from '../components/icon-button';
import * as styles from '../styles/project-card.module.css';


interface CardRotationInfoInterface {
	x: number;
	y: number;
	correctionRads: number;
	isFlipped: boolean;
}

interface ProjectCardPropsInterface {
	repo: ProjectInfoInterface;
}

export default function ProjectCard({ repo }: ProjectCardPropsInterface) {
	const [state, setState] = useState<CardRotationInfoInterface>({
		x: 0,
		y: 0,
		correctionRads: 0,
		isFlipped: false
	});

	const handleMouseEnter = useCallback((event: any) => {
		if (!state.isFlipped) {
			const { top, bottom, right, left } = event.target.getBoundingClientRect();

			// Get cursor position relative to element
			const x = (((event.clientX - left) / (right - left)) - 0.5) * 2;
			const y = -(((event.clientY - top) / (bottom - top)) - 0.5) * 2;

			// If we rotate around a single axis vector, the card will not always be in the correct orientation
			// Calculate a rotation around the Z axis to correct this
			const correctionRads = Math.atan2(x, y) - Math.atan2(y, x) - Math.PI / 2;

			setState({
				x: x,
				y: y,
				correctionRads: correctionRads,
				isFlipped: true
			});
		}
	}, [state]);

	const handleMouseLeave = useCallback(() => {
		if (state.isFlipped) {
			setState({
				x: 0,
				y: 0,
				correctionRads: 0,
				isFlipped: false
			});
		}
	}, [state]);

	return (
		<Link to={`/${repo.slug}`} className="group">
			{/* TODO: Use pointer-events-none to disable Link element before card is fully flipped. May need to add an event listener on to know when card has finished flipping? Or prevent default on first tap event */}
			{/* TODO: Move Link element to cardBack component instead? */}
			{/* TODO: Add events for touch */}
			<div role='presentation' className={`flex flex-col items-start text-ellipsis ${styles.card}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<div className={`relative flex z-40 justify-center align-middle bg-red-500 w-full h-64 rounded-2xl overflow-hidden transition-transform transform-gpu duration-700 ease-out`} style={{
					background: `url(${getProjectImage(repo.imageUrl)}) center center / cover no-repeat`,
					transform: `rotate3d(${state.y}, ${state.x}, 0, 180deg) rotate(${state.correctionRads}rad)`
				}}>
					<C>Overlay for lighting FX</C>
					<div className={`absolute z-30 w-[200%] h-[200%] top-[-50%] pointer-events-none transition-transform duration-700 ease-out ${styles.overlay}`} style={{
						transform: `rotate(${-state.correctionRads}rad) rotate3d(${-state.y}, ${-state.x}, 0, -180deg)`
					}} />

					<C>Back of Card</C>
					<div className={`absolute flex z-20 w-full h-full p-8 items-center rounded-2xl opacity-0 transition-opacity transform-gpu duration-600 group-hover:opacity-100 ${styles.cardBack}`} style={{ background: `${repo.typeColor}cc` }}>
						<IconButton icon={faExpand} className='absolute top-0 right-0' />
						<P className={`origin-center my-0 mx-auto drop-shadow group-hover:drop-shadow-md`}>{repo.shortDesc}</P>

						<C>Project type & language widget</C>
						<div className='absolute top-0 left-0 flex flex-row w-max m-4 rounded-full bg-black/10 shadow-inner'>
							<Pill className='self-center' text={repo.typeName} color={repo.typeColor} />
							<TagsWidget className='self-center' tags={repo.languages} />
						</div>
					</div>

					<C>Front of Card</C>
					<div className={`absolute flex z-10 w-full h-full p-8 items-center rounded-2xl opacity-100 transition-opacity transform-gpu duration-600 group-hover:opacity-0`}>
						<Pill className='absolute top-0 right-0 m-4' text={repo.typeName} color={repo.typeColor} />
						<IconButton icon={faGithub} className='absolute top-0 left-0' disabled />
					</div>
				</div>

				<div className="mx-2 text-left group-hover:scale-105 transition-transform transform-gpu duration-600">
					<H3 className="group-hover:drop-shadow-md font-semibold">
						{repo.name}
					</H3>
				</div>
			</div>
		</Link >
	);
}
