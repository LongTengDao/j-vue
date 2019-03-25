'use strict';

const EXPORT_D_TS = /(?<=(?:^|[\s;}])(?:export|declare)?\s+(?:const|let|var)\s+version\s*:\s*)string(?=\s*(?:[,;\n\r\u2028\u2029]|$))/;

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, get, ful, map }) => {
	
	const semver = await get('src/version');
	
	await build({
		name: 'j-vue',
		Name: 'jVue',
		Desc: `
			对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
			The unified dependency for built .vue files. Belong to "Plan J".`,
		semver,
		ES: 5,
		ESM: true,
		UMD: true,
		DOC: true,
		locate: {
			'@ltd/j-groupify': ful('../../LongTengDao/j-groupify/dist/ESM/j-groupify!'),
		},
	});
	
	await map('src/module.d.ts', d => d.replace(EXPORT_D_TS, `'${ semver }'`), 'dist/TSD/j-vue.d.ts');
	
});
