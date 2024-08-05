/*
	Container for project cards
	---------------------------
*/

import type { Project, PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utils';
import { ProjectCard } from '../components/project-card';

interface Props extends PropsWithClassName {
	projects: Project[];
}

export function ProjectCardGallery({ className, projects }: Props) {
	const classNameProps = getClassNameProps(
		'grid grid-flow-row-dense flex-1 w-full gap-10 grid-cols-1 xl:grid-cols-2',
		className,
	);

	return (
		<div {...classNameProps}>
			{projects.map((project) => (
				<ProjectCard key={project.slug} project={project} />
			))}
		</div>
	);
}
