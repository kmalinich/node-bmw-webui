import { defineConfig } from 'eslint/config';

import globals from 'globals';
import js      from '@eslint/js';

import { default as promise } from 'eslint-plugin-promise';

import projectGlobals from './eslint.globals.mjs';
import projectRules   from './eslint.rules.mjs';

const eslintConfigArray = [
	{
		ignores : [
			'.git/',
			'node_modules/',

			'**.br',
			'**.gz',
			'**.html',
			'**.json',
			'**.md',
			'**.php',
			'**.zstd',

			'webui/css/*',
			'webui/fonts/*',
			'webui/images/*',
			'webui/include/*',

			'webui/js/bootstrap.js',
			'webui/js/d3.js',
			'webui/js/datatables.js',
			'webui/js/jquery.js',
			'webui/js/material.js',
			'webui/js/moment-tz.js',
			'webui/js/moment.js',
			'webui/js/nouislider.js',
			'webui/js/popper.js',
			'webui/js/ripples.js',
			'webui/js/socket.io.js',
		],
	},

	{
		files : [
			'*.{cjs,mjs,js}',
		],

		plugins : {
			js,
			promise,
		},

		extends : [
			'js/recommended',
			'promise/flat/recommended',
		],

		languageOptions : {
			ecmaVersion : 'latest',

			sourceType : 'module',

			globals : {
				...projectGlobals,
				...globals.browser,
				...globals.jquery,
				...globals.worker,
			},
		},

		rules : projectRules,
	},
];

export default defineConfig(eslintConfigArray);
