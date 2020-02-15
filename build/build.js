'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, 龙腾道: Auth, get, ful, map, put }) => {
	
	const name = 'j-vue';
	const Copy = 'LGPL-3.0';
	const semver = await get('src/version');
	
	await build({
		src: 'src/BackEndSFCCompiler',
		dist: 'dist/BackEndSFCCompiler',
		NPM: {
			description: '.vue single-file component back-end compiler. Belong to "Plan J".／.vue 单文件组件后端编译工具。从属于“简计划”。',
			dependencies: {
				'@ltd/acorn-globals': require('../../../LongTengDao/acorn-globals/dist/NPM/package.json').version,
				'@ltd/j-ts': require('../../../LongTengDao/j-ts/dist/NPM/package.json').version,
				'acorn': '6.3.0',
				'acorn-class-fields': '0.3.1',
				'acorn-private-methods': '0.3.0',
				'acorn-static-class-features': '0.2.0',
				'acorn-walk': '6.2.0',
				'rollup': '1.19.4',
				'terser': '4.6.3',
				'vue-template-compiler': '2.6.11',
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
			'lib:entities': ful('lib/entities/dist.js'),
			'lib:elements': ful('lib/elements/dist.js'),
		},
	});
	
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
			'对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。',
			'The unified front-end dependency for built .vue files. Belong to "Plan J".'
		],
		locate: {
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/.j-regexp.js'),
			'lib:css-keywords': ful('lib/css-keywords/dist.js'),
		},
	});
	await map('src/FrontEndRuntimeDependency/module.d.ts', ReplaceWithVersion(semver), 'dist/FrontEndRuntimeDependency/TSD/j-vue.d.ts');
	await put('dist/FrontEndRuntimeDependency/README.md', mergeEditionsReadme(await get('dist/FrontEndRuntimeDependency/README.md')));
	
	await build({ LICENSE_: Copy, DOC: true });
	
});

function ReplaceWithVersion (version) {
	const EXPORT_D_TS = /(?<=(?:^|[\s;}])(?:export|declare)?\s+(?:const|let|var)\s+version\s*:\s*)string(?=\s*(?:[,;\n\r\u2028\u2029]|$))/;
	return function replaceWithVersion (tsd) {
		return tsd.replace(EXPORT_D_TS, `'${version}'`)
	};
}

function mergeEditionsReadme (another) {
	
	const [ en_heading, en_table, en_links, cn_heading, cn_table, cn_links ] = another.split('\r\n\r\n');
	
	return [
		
		en_heading,
		Rows(en_table, '`TSD/j-vue.d.ts`', '[TypeScript][TS-en] module declaration file.'),
		en_links,
		
		cn_heading,
		Rows(cn_table, '`TSD/j-vue.d.ts`', '[TypeScript][TS-zhs] 的模块声明文件。'),
		cn_links,
		
	].join('\r\n\r\n');
	
	function Rows (rows, th, td) {
		let index = rows.lastIndexOf('\r\n| `ESM/');
		if ( index<0 ) { throw Error(); }
		index = rows.indexOf('\r\n', index+1);
		if ( index<0 ) { throw Error(); }
		const NON_ASCII = /[^\x00-\x7F]/gu;
		return rows.slice(0, index)+
			'\r\n| '+' '.repeat(25)+' | '+' '.repeat(110)+' |'+
			'\r\n| '+th+' '.repeat(25-th.replace(NON_ASCII, '  ').length)+' | '+td+' '.repeat(110-td.replace(NON_ASCII, '  ').length)+' |'+
			rows.slice(index);
	}
	
}
