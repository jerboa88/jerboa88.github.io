/*
	Loader widget
	-------------
*/

import { getClassNameProps } from '../common/utils';
import type { PropsWithClassName } from '../types/components';

export function Loader({ className }: PropsWithClassName) {
	const classNameProps = getClassNameProps('size-full', className);

	return (
		<div {...classNameProps}>
			<div className="backdrop-blur size-full bg-glass">
				<div className="flex flex-row justify-center items-center text-sm uppercase bg-transparent border-2 shadow-md mix-blend-overlay drop-shadow border-base-content/5 size-full skeleton font-button">
					Loading...
				</div>
			</div>
		</div>
	);
}
