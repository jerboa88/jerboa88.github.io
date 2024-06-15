/*
	Employment history
	------------------
*/

import type { RoleConfig } from '../common/types';

export default [
	{
		type: 'internship',
		title: 'Systems Analyst',
		company: 'Haemonetics Corporation',
		location: 'Edmonton, AB',
		startDate: '2020-05-01',
		endDate: '2021-08-31',
		tasks: [
			'Developed and tested NexLynk DMS, a full-stack enterprise application for plasma donation management',
			'Collaborated with QA, documentation, and testing teams to ensure tickets were completed on time, in accordance with relevant SOPs, and following Agile processes',
			'Performed RCA on issues in production using limited customer-provided information',
			'Researched major dependency updates and new technologies in order to improve the build process and product functionality',
		],
	},
	{
		type: 'summer job',
		title: 'Ramp Agent',
		company: 'Airport Terminal Services',
		location: 'Edmonton, AB',
		startDate: '2019-07-01',
		endDate: '2019-08-01',
		tasks: [
			'Collaborated with 1 to 3 crew members to complete up to 10 flight turnarounds a day on a strict updating schedule',
			'Facilitated unloading/loading of airplanes with limited manpower, tight deadlines, and in adverse weather conditions',
			'Adapted to irregular workloads and staffing shortages to complete jobs in accordance with the flight schedule, working overtime when necessary',
			'Monitored actively changing flight arrival/departure times to ensure no delays were taken',
		],
	},
] as RoleConfig[];
