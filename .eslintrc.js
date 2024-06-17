module.exports = {
	globals: {
		__PATH_PREFIX__: true,
	},
	extends: 'react-app',
	plugins: [
		'react-hooks'
	],
	rules: {
		'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
		'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
	}
};
