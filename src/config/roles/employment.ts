/*
	History of employment roles
	---------------------------
*/

import type { EmploymentRole, RolesConfig } from '../../types/roles';

export const employmentRolesConfig: RolesConfig<EmploymentRole> = [
	{
		type: 'internship',
		title: 'Systems Analyst',
		company: 'Haemonetics Corporation',
		companyUrl: 'https://www.haemonetics.com/',
		location: 'Edmonton, AB',
		startDate: '2020-05-01',
		endDate: '2021-08-31',
		bullets: [
			"Developed, documented, and tested NexLynk DMS, a full-stack enterprise application for plasma donation management. Wrote extensive documentation about the product's development lifecycle, which was added to the company's internal wiki and used as a reference for colleagues and external teams.",
			'Collaborated with QA, documentation, and testing teams to ensure tickets were completed on time, in accordance with relevant SOPs, and following Agile processes. Communicated effectively with remote team members across multiple timezones. Onboarded two new interns, helping them become familiar with the development process and application codebase.',
			'Performed detailed code reviews, providing feedback to team members to ensure code quality and adherence to coding standards. Won a company-wide bug bounty for discovering a number of user-facing issues.',
			'Researched major dependency updates and new technologies in order to improve the build process and product functionality. For example, comparing various database migration tools and building a POC to demonstrate the benefits of automated migration over using manual scripts. This tool was later integrated into the build process to reduce the dependence on field technicians for minor product updates.',
			'Performed RCA of issues in production using limited customer-provided information. For example, computing the expected size of a database based on estimated data entry rates to alleviate data storage concerns and fixing intermittent bugs by reviewing logs and database records from customer environments.',
		],
	},
	{
		type: 'summer job',
		title: 'Ramp Agent',
		company: 'Airport Terminal Services',
		companyUrl: 'https://www.universalhandling.com/',
		location: 'Edmonton, AB',
		startDate: '2019-07-01',
		endDate: '2019-08-01',
		bullets: [
			'Collaborated with 1 to 3 crew members to complete up to 10 flight turnarounds a day on a strict updating schedule, monitoring actively changing flight arrival/departure times to ensure no delays were taken.',
			'Facilitated unloading/loading of airplanes with limited manpower, tight deadlines, and in adverse weather conditions.',
		],
	},
	{
		type: 'summer job',
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
		type: 'summer job',
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
		type: 'summer job',
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
		type: 'summer job',
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
];
