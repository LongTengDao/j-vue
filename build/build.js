'use strict';

require('@ltd/j-dev').
	
	build({
		dir: __dirname+'/..',
		ES: 3,
		name: 'j-vue',
		description: `
			对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
			The unified dependency for built .vue files. Belong to "Plan J".`,
		semver:
			require('fs').readFileSync(__dirname+'/../src/semver.json', 'utf8').match(/\d+/g).join('.'),
		UMD: {
			ES: 5,
			meta_name: 'jVue',
			main_global: 'jVue',
		},
		DOC: true,
	}).
	
	catch(console.error);
