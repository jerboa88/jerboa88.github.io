/*
	History of roles
	----------------
*/

import {
	RoleCategory,
	RoleType,
	type RolesConfig,
} from '../../types/content/roles.ts';

export const ROLES_CONFIG: RolesConfig = {
	[RoleType.Employment]: [
		{
			category: RoleCategory.Internship,
			title: 'Systems Analyst',
			company: 'Haemonetics Corporation',
			companyUrl: 'https://www.haemonetics.com/',
			location: 'Edmonton, AB',
			startDate: '2020-05-01',
			endDate: '2021-08-31',
			bullets: [
				'Developed, documented, and tested NexLynk DMS, a full-stack enterprise application for plasma donation management.',
				'Collaborated with QA, documentation, and testing teams across timezones to ensure tickets were completed on time, in accordance with relevant SOPs, and following Agile processes.',
				"Wrote extensive documentation about the product's development lifecycle, which was added to the company's internal wiki and used as a reference for colleagues and external teams.",
				'Compared various DB migration tools and built a POC to demonstrate the benefits of automated migration over using manual scripts, which was later integrated into the build process to reduce the reliance on field technicians for product updates.',
				'Enhanced product quality by performing thorough code reviews to uphold coding standards and identifying critical user-facing issues, earning a company-wide bug bounty.',
				'Onboarded two new interns, helping them become familiar with the development process and application codebase.',
			],
		},
		{
			category: RoleCategory.SeasonalJob,
			title: 'Ramp Agent',
			company: 'Airport Terminal Services',
			companyUrl: 'https://www.atsstl.com/',
			location: 'Edmonton, AB',
			startDate: '2019-07-01',
			endDate: '2019-08-01',
			bullets: [
				'Collaborated with 1 to 3 crew members to complete up to 10 flight turnarounds a day on a strict updating schedule, monitoring actively changing flight arrival/departure times to ensure no delays were taken.',
				'Facilitated unloading/loading of airplanes with limited manpower, tight deadlines, and in adverse weather conditions.',
			],
		},
		{
			category: RoleCategory.SeasonalJob,
			title: 'General Production Laborer',
			company: 'Universal Handling Equipment Ltd.',
			companyUrl: 'https://www.universalhandling.com/',
			location: 'Red Deer, AB',
			startDate: '2018-05-01',
			endDate: '2018-08-01',
			bullets: [
				'Manufactured a large range of parts from metal stock and balanced production to meet demand.',
				'Monitored inventory and requested additional materials when necessary.',
				'Communicated with welders and produced custom parts to their specifications when required.',
				'Unloaded, moved and organized heavy materials to maximize storage efficiency.',
				'Ensured proper safety procedures were followed at all times, including the use of PPE.',
			],
		},
		{
			category: RoleCategory.SeasonalJob,
			title: 'General Production Laborer',
			company: 'Universal Handling Equipment Ltd.',
			companyUrl: 'https://www.universalhandling.com/',
			location: 'Red Deer, AB',
			startDate: '2017-06-01',
			endDate: '2017-08-01',
			bullets: [
				'Manufactured a large range of parts from metal stock and balanced production to meet demand.',
				'Monitored inventory and requested additional materials when necessary.',
				'Communicated with welders and produced custom parts to their specifications when required.',
				'Unloaded, moved and organized heavy materials to maximize storage efficiency.',
				'Ensured proper safety procedures were followed at all times, including the use of PPE.',
			],
		},
		{
			category: RoleCategory.SeasonalJob,
			title: 'Afternoon Paper Carrier',
			company: 'Red Deer Advocate',
			companyUrl: 'https://www.reddeeradvocate.com/',
			location: 'Eckville, AB',
			startDate: '2017-04-01',
			endDate: '2017-06-01',
			bullets: [
				'Planned delivery routes to maximize efficiency and ensure optimal use of time.',
				'Recorded and reported to management customers opting into or out of the delivery service.',
				'Consistently delivered papers weekly despite challenging weather conditions.',
			],
		},
		{
			category: RoleCategory.SeasonalJob,
			title: 'Shop Assistant',
			company: 'Universal Handling Equipment Ltd.',
			companyUrl: 'https://www.universalhandling.com/',
			location: 'Red Deer, AB',
			startDate: '2015-06-01',
			endDate: '2015-08-01',
			bullets: [
				'Restocked and sorted parts into their correct locations, reporting discrepancies and low inventory to managers when necessary.',
				'Ensured shop environment was clean, organized, and safe.',
				'Performed yard maintenance including mowing and trimming trees.',
				'Took on more advanced tasks in periods of high demand such as accounting, archiving, and metalworking.',
			],
		},
	],
	[RoleType.Education]: [
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
	],
	[RoleType.Volunteering]: [
		{
			title: 'Event Assistant, Office Volunteer',
			company: 'International Student Services, U of A',
			companyUrl:
				'https://www.ualberta.ca/international/international-student-services',
			location: 'Edmonton, AB',
			startDate: '2019-02-01',
			endDate: '2021-04-01',
			bullets: [
				'Collaborated with peers to help organize various events for the diverse student organization including assisting with a promotional photoshoot and putting up posters on campus to promote events hosted by the organization.',
			],
		},
	],
} as const;
