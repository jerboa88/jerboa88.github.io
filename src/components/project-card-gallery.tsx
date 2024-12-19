/*
	Container for project cards
	---------------------------
*/

import { ProjectCard } from '../components/project-card.tsx';
import type { PropsWithClassName } from '../types/components.ts';
import type { Project } from '../types/content/projects.ts';
import { getClassNameProps } from '../utils/other.ts';

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
