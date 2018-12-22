'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, read }) => {
	
	await build({
		name: 'j-vue',
		Name: 'jVue',
		Desc: `
			对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
			The unified dependency for built .vue files. Belong to "Plan J".`,
		semver: await read('src/version'),
		ES: 3,
		UMD: { ES: 5 },
		DOC: true,
	});
	
});
