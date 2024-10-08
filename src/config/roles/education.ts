/*
	History of education roles
	--------------------------
*/

import type { EducationRole, RolesConfig } from '../../types/roles';

export const educationRolesConfig: RolesConfig<EducationRole> = [
	{
		title: 'BSc Specialization in Computing Science',
		company: 'University of Alberta',
		companyUrl: 'https://www.ualberta.ca/',
		location: 'Edmonton, AB',
		startDate: '2017-09-13',
		endDate: '2023-11-21',
		bullets: [
			'Completed my BSc Specialization in Software Practice with Distinction.',
			"Achieved Dean's Honor Roll recognition for academic excellence in 2022-2023.",
		],
	},
	{
		title: 'High School Diploma',
		company: 'Eckville Junior/Senior High School',
		companyUrl: 'https://ehs.wolfcreek.ab.ca/',
		location: 'Edmonton, AB',
		startDate: '2010-09-01',
		endDate: '2016-06-01',
		bullets: ['Graduated with an overall average of 85%.'],
	},
];
