/*
	An animated particles background component
	------------------------------------------
*/

import { loadBasic } from '@tsparticles/basic';
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSquareShape } from '@tsparticles/shape-square';
import { useReducedMotion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { getTheme } from '../../common/config-manager';
import { getClassNameProps } from '../../common/utilities';

// Constants

// TODO: Replace hardcoded value here
const THEME = getTheme('dark');

function UnmemoizedParticlesBackground() {
	const shouldReduceMotion = useReducedMotion();
	const [init, setInit] = useState(false);

	const classNameProps = getClassNameProps(
		'fixed top-0 left-0 size-full mix-blend-overlay transition-opacity ease-out duration-[2s]',
		init ? 'opacity-100' : 'opacity-0', // Hide until loaded
	);
	const tsParticlesConfig = {
		fpsLimit: 30,
		detectRetina: true,
		particles: {
			color: {
				value: THEME.neutral,
			},
			move: {
				enable: !shouldReduceMotion,
				speed: 1,
				direction: 'none',
				random: true,
				straight: false,
				outModes: {
					default: 'out',
				},
			},
			number: {
				density: {
					enable: true,
					area: 800,
				},
				value: 200,
			},
			opacity: {
				value: {
					min: 0,
					max: 1,
				},
				animation: {
					enable: true,
					startValue: 'random',
					speed: 1,
					sync: false,
				},
			},
			shape: {
				type: 'square',
			},
			size: {
				value: {
					min: 1,
					max: 4,
				},
			},
		},
	} as RecursivePartial<IOptions>;

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadBasic(engine);
			await loadSquareShape(engine);
		}).then(() => {
			setInit(true);

			console.debug('tsParticles engine has been loaded');
		});
	});

	return <Particles options={tsParticlesConfig} {...classNameProps} />;
}

// Never re-render this component
export const ParticlesBackground = memo(UnmemoizedParticlesBackground);
