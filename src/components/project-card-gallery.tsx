/*
	Container for project cards
	---------------------------
*/

import type { ProjectInfo, PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utilities';
import { ProjectCard } from '../components/project-card';

interface Props extends PropsWithClassName {
	projects: ProjectInfo[];
}

export function ProjectCardGallery({ className, projects }: Props) {
	const classNameProps = getClassNameProps(
		'grid grid-flow-row-dense flex-1 w-full gap-10 grid-cols-1 xl:grid-cols-2',
		className,
	);

	return (
		<div {...classNameProps}>
			{projects.map((repo) => (
				<ProjectCard key={repo.slug} repo={repo} />
			))}
		</div>
	);
}
