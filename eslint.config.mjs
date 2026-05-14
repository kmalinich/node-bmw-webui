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

			'webui/js/bootstrap-material-design.*',
			'webui/js/d3.*',
			'webui/js/jquery.*',
			'webui/js/justgage.*',
			'webui/js/locales.*',
			'webui/js/moment.*',
			'webui/js/moment-tz.*',
			'webui/js/popper-utils.*',
			'webui/js/nouislider.*',
			'webui/js/popper.*',
			'webui/js/socket.io.*',
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
