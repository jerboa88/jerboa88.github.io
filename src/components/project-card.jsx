// Container for a project card and its title
// Use class for this component because it uses state
import React from 'react';
import { Link } from 'gatsby';
import { H3, P, C } from '../components/text-components';
import Pill from '../components/pill';
import TagsWidget from '../components/tags-widget';
import IconButton from '../components/icon-button';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import getProjectImage from '../utilities.js';
import * as styles from '../styles/project-card.module.css';


export default class ProjectCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			x: 0,
			y: 0,
			correctionRads: 0,
			isFlipped: false
		};

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}

	handleMouseEnter(event) {
		if (!this.state.isFlipped) {
			const { top, bottom, right, left } = event.target.getBoundingClientRect();

			// Get cursor position relative to element
			const x = (((event.clientX - left) / (right - left)) - 0.5) * 2;
			const y = -(((event.clientY - top) / (bottom - top)) - 0.5) * 2;

			// If we rotate around a single axis vector, the card will not always be in the correct orientation
			// Calculate a rotation around the Z axis to correct this
			const correctionRads = Math.atan2(x, y) - Math.atan2(y, x) - Math.PI / 2;

			this.setState({
				x: x,
				y: y,
				correctionRads: correctionRads,
				isFlipped: true
			});
		}
	}

	handleMouseLeave() {
		if (this.state.isFlipped) {
			this.setState({
				x: 0,
				y: 0,
				correctionRads: 0,
				isFlipped: false
			});
		}
	}

	render() {
		return (
			<Link to={`/${this.props.repo.slug}`} className="group">
				{/* TODO: Use pointer-events-none to disable Link element before card is fully flipped. May need to add an event listener on to know when card has finished flipping? Or prevent default on first tap event */}
				{/* TODO: Move Link element to cardBack component instead? */}
				{/* TODO: Add events for touch */}
				<div role='presentation' className={`flex flex-col items-start text-ellipsis ${styles.card}`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
					<div className={`relative flex z-40 justify-center align-middle bg-red-500 w-full h-64 rounded-2xl overflow-hidden transition-transform transform-gpu duration-700 ease-out`} style={{
						background: `url(${getProjectImage(this.props.repo.imageUrl)}) center center / cover no-repeat`,
						transform: `rotate3d(${this.state.y}, ${this.state.x}, 0, 180deg) rotate(${this.state.correctionRads}rad)`
					}}>
						<C>Overlay for lighting FX</C>
						<div className={`absolute z-30 w-[200%] h-[200%] top-[-50%] pointer-events-none transition-transform duration-700 ease-out ${styles.overlay}`} style={{
							transform: `rotate(${-this.state.correctionRads}rad) rotate3d(${-this.state.y}, ${-this.state.x}, 0, -180deg)`
						}} />

						<C>Back of Card</C>
						<div className={`absolute flex z-20 w-full h-full p-8 items-center rounded-2xl opacity-0 transition-opacity transform-gpu duration-600 group-hover:opacity-100 ${styles.cardBack}`} style={{ background: `${this.props.repo.typeColor}cc` }}>
							<IconButton icon={faExpand} className='absolute top-0 right-0' />
							<P className={`origin-center my-0 mx-auto drop-shadow group-hover:drop-shadow-md`}>{this.props.repo.shortDesc}</P>

							<C>Project type & language widget</C>
							<div className='absolute top-0 left-0 flex flex-row w-max m-4 rounded-full bg-black/10 shadow-inner'>
								<Pill className='self-center' text={this.props.repo.typeName} color={this.props.repo.typeColor} />
								<TagsWidget className='self-center' data={this.props.repo.languages} />
							</div>
						</div>

						<C>Front of Card</C>
						<div className={`absolute flex z-10 w-full h-full p-8 items-center rounded-2xl opacity-100 transition-opacity transform-gpu duration-600 group-hover:opacity-0`}>
							<Pill className='absolute top-0 right-0 m-4' text={this.props.repo.typeName} color={this.props.repo.typeColor} />
							<IconButton icon={faGithub} className='absolute top-0 left-0' disabled />
						</div>
					</div>

					<div className="mx-2 text-left group-hover:scale-105 transition-transform transform-gpu duration-600">
						<H3 className="group-hover:drop-shadow-md font-semibold">
							{this.props.repo.name}
						</H3>
					</div>
				</div>
			</Link >
		);
	}
}
