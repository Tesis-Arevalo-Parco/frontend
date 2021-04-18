module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'standard',
		'prettier',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'react/react-in-jsx-scope': 0,
		'react/prop-types': 'off',
		'react/display-name': 0,
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				trailingComma: 'es5',
				semi: false,
				jsxSingleQuote: true,
				singleQuote: true,
				useTabs: true,
				endOfLine: 'auto',
			},
		],
	},
	settings: {
		react: {
			version: 'detected',
		},
		'import/resolver': {
			node: {
				moduleDirectory: ['node_modules', 'src/'],
				extensions: ['.js', '.jsx'],
			},
		},
	},
}
