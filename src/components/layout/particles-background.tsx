/*
	An animated particles background component
	------------------------------------------
*/

import { loadBasic } from '@tsparticles/basic';
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSquareShape } from '@tsparticles/shape-square';
import { useReducedMotion } from 'motion/react';
import { memo, useEffect, useState } from 'react';
import { getTheme } from '../../managers/config.ts';
import { info } from '../../node/logger.ts';
import { ThemeType } from '../../types/other.ts';
import { getClassNameProps } from '../../utils/other.ts';

// Constants

// TODO: Replace hardcoded value here
const THEME = getTheme(ThemeType.Dark);

function UnmemoizedParticlesBackground() {
	const shouldReduceMotion = useReducedMotion();
	const [init, setInit] = useState(false);

	const classNameProps = getClassNameProps(
		'fixed h-lvh w-lvw mix-blend-overlay transition-opacity ease-out duration-[2s]',
		init ? 'opacity-100' : 'opacity-0', // Hide until loaded
	);
	const tsParticlesOptions: RecursivePartial<IOptions> = {
		fpsLimit: 30,
		smooth: false,
		pauseOnBlur: true,
		pauseOnOutsideViewport: true,
		detectRetina: true,
		fullScreen: {
			enable: false,
		},
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
				value: 100,
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
	};

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await Promise.all([loadBasic(engine), loadSquareShape(engine)]);

			setInit(true);

			info('tsParticles engine has been loaded');
		});
	}, []);

	return <Particles options={tsParticlesOptions} {...classNameProps} />;
}

// Never re-render this component
export const ParticlesBackground = memo(UnmemoizedParticlesBackground);
