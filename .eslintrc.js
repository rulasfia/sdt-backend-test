/* eslint-env node */
module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
		ecmaVersion: "latest",
		sourceType: "module",
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"prettier",
	],
	plugins: ["@typescript-eslint"],
	env: {
		node: true,
	},
	rules: {
		"@typescript-eslint/no-unused-vars": "error",
	},
	overrides: [
		{
			files: ["*.js", "*.cjs", "*.mjs"],
			extends: ["plugin:@typescript-eslint/disable-type-checked"],
		},
	],
};
