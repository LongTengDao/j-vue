'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, 龙腾道, get, ful, map, put }) => {
	
	const version = await get('src/version');
	
	/* Back-End SFC Compiler: NPM */
	
	await build({
		src: 'src/BackEndSFCCompiler',
		NPM: {
			description: '.vue single file component back-end compiler. Belong to "Plan J".／.vue 单文件组件后端编译工具。从属于“简计划”。',
			dependencies: {
				'vue-template-compiler': '2.6.8',
				'vue-template-es2015-compiler': '1.9.1',
				'acorn-globals': '4.3.2',
				'terser': '3.16.1',
			},
			keywords: ['Vue', 'SFC'],
		},
		ES: 6,
		semver: version,
		name: 'j-vue',
		user: 'LongTengDao',
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		locate: {
			'@ltd/j-groupify': ful('../../LongTengDao/j-groupify/dist/ESM/.j-groupify'),
			'@ltd/j-orderify': ful('../../LongTengDao/j-orderify/dist/ESM/.j-orderify'),
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/.j-regexp'),
			'@ltd/j-utf': ful('../../LongTengDao/j-utf/dist/ESM/.j-utf'),
			'@ltd/j-eol': ful('../../LongTengDao/j-eol/dist/ESM/.j-eol'),
			'@ltd/j-es': ful('../../LongTengDao/j-es/dist/ESM/.j-es'),
			'lib:entities': ful('lib/entities/dist.js'),
			'lib:elements': ful('lib/elements/dist.js'),
		},
	});
	
	const EDITIONS_README_OF_NPM = await get('dist/README.md');
	
	/* Front-End Runtime Dependency: UMD, ESM */
	
	await build({
		src: 'src/FrontEndRuntimeDependency',
		UMD: { main_global: 'jVue' },
		ESM: true,
		ES: 5,
		semver: version,
		name: 'j-vue',
		user: 'LongTengDao@ltd',
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		Desc: [
			'对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。',
			'The unified front-end dependency for built .vue files. Belong to "Plan J".'
		],
		locate: {
			'@ltd/j-groupify': ful('../../LongTengDao/j-groupify/dist/ESM/.j-groupify'),
		},
	});
	
	const EDITIONS_README_OF_UMD_AND_ESM = await get('dist/README.md');
	
	/* Common: TSD, dist Editions README, LICENSE_, DOC */
	
	await map('src/FrontEndRuntimeDependency/module.d.ts', replaceWithVersion(version), 'dist/TSD/j-vue.d.ts');///////////////////
	
	await put('dist/README.md', mergeEditionsReadme(EDITIONS_README_OF_NPM, EDITIONS_README_OF_UMD_AND_ESM));
	
	await build({ LICENSE_: 'LGPL-3.0', DOC: true });
	
});


function replaceWithVersion (version) {
	const EXPORT_D_TS = /(?<=(?:^|[\s;}])(?:export|declare)?\s+(?:const|let|var)\s+version\s*:\s*)string(?=\s*(?:[,;\n\r\u2028\u2029]|$))/;
	return tsd => tsd.replace(EXPORT_D_TS, `'${version}'`);
}


function mergeEditionsReadme (one, another) {
	
	const [en_heading, en_table, en_link, cn_heading, cn_table, cn_link] = one.split('\r\n\r\n');
	const [, en_table_, en_links, , cn_table_, cn_links] = another.split('\r\n\r\n');
	
	return [
		
		en_heading,
		
		Heading('Back-End SFC Compiler'),
		en_table,
		en_link,
		
		Heading('Front-End Runtime Dependency'),
		Rows(en_table_, '`TSD/j-vue.d.ts`', '[TypeScript][TS-en] module declaration file.'),
		en_links,
		
		cn_heading,
		
		Heading('单文件组件后端编译器'),
		cn_table,
		cn_link.replace(/\r\n$/, ''),
		
		Heading('前端运行时依赖'),
		Rows(cn_table_, '`TSD/j-vue.d.ts`', '[TypeScript][TS-zhs] 的模块声明文件。'),
		cn_links,
	
	].join('\r\n\r\n');
	
	function Heading (content) {
		const NON_ASCII = /[^\x00-\x7F]/ug;
		return content+'\r\n'+'-'.repeat(content.replace(NON_ASCII, '--').length);
	}
	
	function Rows (rows, th, td) {
		let index = rows.lastIndexOf('\r\n| `ESM/');
		if ( index<0 ) { throw Error(); }
		index = rows.indexOf('\r\n', index+1);
		if ( index<0 ) { throw Error(); }
		const NON_ASCII = /[^\x00-\x7F]/gu;
		return rows.slice(0, index)+
			'\r\n| '+th+' '.repeat(25-th.replace(NON_ASCII, '  ').length)+' | '+td+' '.repeat(97-td.replace(NON_ASCII, '  ').length)+' |'+
			'\r\n| '+' '.repeat(25)+' | '+' '.repeat(97)+' |'+
			rows.slice(index);
	}
	
}

