'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, get, ful, map }) => {
	
	await build({
		name: 'j-vue',
		Name: 'jVue',
		Desc: `
			对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
			The unified dependency for built .vue files. Belong to "Plan J".`,
		semver: await get('src/version'),
		ES: 5,
		ESM: true,
		UMD: true,
		DOC: true,
		locate: {
			'@ltd/j-groupify': ful('../../LongTengDao/j-groupify/dist/ESM/j-groupify.js'),
		},
	});
	
	await map('src/d.ts', 'dist/TSD/j-vue.d.ts');
	
});
