'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, 龙腾道: Auth, get, ful, map }) => {
	
	const name = 'j-vue';
	const Copy = 'LGPL-3.0';
	const semver = await get('src/version');
	
	await build({
		src: 'src/FrontEndRuntimeDependency',
		dist: 'dist/FrontEndRuntimeDependency',
		UMD: { main_global: 'jVue' },
		ESM: true,
		ES: 5,
		semver,
		name,
		user: 'LongTengDao',
		Auth,
		Copy,
		Desc: [
			'构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。',
			'The front-end runtime dependency for built .vue files. Belong to "Plan J".'
		],
		locate: {
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/.j-regexp.js'),
		},
	});
	
	await build({
		src: 'src/BackEndSFCCompiler',
		dist: 'dist/BackEndSFCCompiler',
		NPM: {
			description: '.vue single-file component back-end compiler. Belong to "Plan J".／.vue 单文件组件后端编译工具。从属于“简计划”。',
			dependencies: {
				'@ltd/acorn-globals': require('../../../LongTengDao/acorn-globals/dist/NPM/package.json').version,
				'@ltd/j-ts': require('../../../LongTengDao/j-ts/dist/NPM/package.json').version,
				'@ltd/j-es-plus': require('../../../LongTengDao/j-es-plus/dist/NPM/package.json').version,
				'acorn-walk': '8.0.2',
				'@vue/compiler-dom': '^3.0.10',
				'vue-template-compiler': '2.6.12',
				'de-indent': '1.0.2',
				'he': '1.2.0',
			},
			keywords: [ 'Vue', 'SFC' ],
		},
		ES: 6,
		semver,
		name,
		user: 'LongTengDao',
		Auth,
		Copy,
		locate: {
			'@ltd/j-orderify': ful('../../LongTengDao/j-orderify/dist/ESM/.j-orderify.js'),
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/.j-regexp.js'),
			'@ltd/j-utf': ful('../../LongTengDao/j-utf/dist/ESM/.j-utf.js'),
			'@ltd/j-eol': ful('../../LongTengDao/j-eol/dist/ESM/.j-eol.js'),
			'@ltd/j-es': ful('../../LongTengDao/j-es/dist/ESM/.j-es.js'),
			'@ltd/j-css': ful('../../LongTengDao/j-css/dist/ESM/.j-css.js'),
			'lib:entities': ful('lib/entities/dist.js'),
			'lib:elements': ful('lib/elements/dist.js'),
		},
	});
	
	await map('dist/FrontEndRuntimeDependency/ESM/.j-vue.js', 'dist/BackEndSFCCompiler/NPM/lib/.j-vue.js');
	
	await build({ LICENSE_: Copy, DOC: true });
	
});
