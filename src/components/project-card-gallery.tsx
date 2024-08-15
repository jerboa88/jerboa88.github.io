/*
	Container for project cards
	---------------------------
*/

import { getClassNameProps } from '../common/utils/other';
import { ProjectCard } from '../components/project-card';
import type { PropsWithClassName } from '../types/components';
import type { Project } from '../types/projects';

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
