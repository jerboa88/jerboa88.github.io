/*
	An animated particles background component
	------------------------------------------
*/


import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { IOptions, RecursivePartial } from '@tsparticles/engine';
import { loadBasic } from '@tsparticles/basic';
import { loadSquareShape } from '@tsparticles/shape-square';
import ConfigManager from '../../common/config-manager';


// Constants

// TODO: Replace hardcoded value here
const { neutral } = new ConfigManager().getTheme('dark');


function ParticlesBackground() {
	const shouldReduceMotion = useReducedMotion();
	const tsParticlesConfig = {
		fpsLimit: 30,
		detectRetina: true,
		particles: {
			color: {
				value: neutral,
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
					max: 1
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

	const [init, setInit] = useState(false);


	useEffect(() => {
		initParticlesEngine(async engine => {
			await loadBasic(engine);
			await loadSquareShape(engine);
		}).then(() => {
			setInit(true);

			console.debug('tsParticles engine has been loaded');
		});
	});


	return (
		<Particles options={tsParticlesConfig} className={`fixed top-0 left-0 size-full mix-blend-overlay transition-opacity ease-out duration-[2s] ${init ? 'opacity-100' : 'opacity-0'}`} />
	);
}

// Never re-render this component
const MemoizedParticlesBackground = React.memo(ParticlesBackground);

export default MemoizedParticlesBackground;
