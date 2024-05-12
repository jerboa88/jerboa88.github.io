/*
	Custom head section for Open Graph image templates
	--------------------------------------------------
*/


import React from 'react';
import { PropsWithClassName } from '../../common/types';


export default function OgImageHead({ className }: PropsWithClassName) {
	return (
		<>
			<html lang="en-US" className={className} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</>
	)
}
