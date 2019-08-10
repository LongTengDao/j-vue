'use strict';

const ___________________________ = _ => console.info(`\n[${_}]:`) || {};

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, 龙腾道: Auth, get, ful, put }) => {
	
	const name = 'j-vue';
	const Copy = 'LGPL-3.0';
	const semver = await get('src/version');
	
	___________________________`Back-End SFC Compiler: /dist/NPM/*`.___________________________;
	
	await build({
		src: 'src/BackEndSFCCompiler',
		NPM: {
			description: '.vue single-file component back-end compiler. Belong to "Plan J".／.vue 单文件组件后端编译工具。从属于“简计划”。',
			dependencies: {
				'@ltd/acorn-globals': '1.0.1',
				'acorn': '6.2.1',
				'acorn-bigint': '0.4.0',
				'acorn-class-fields': '0.3.1',
				'acorn-private-methods': '0.3.0',
				'acorn-static-class-features': '0.2.0',
				'acorn-walk': '6.2.0',
				'rollup': '1.19.4',
				'terser': '3.16.1',
				'vue-template-compiler': '2.6.8',
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
	
	const EDITIONS_README_OF_NPM = await get('dist/README.md');
	
	___________________________`Front-End Runtime Dependency: /dist/UMD/*, /dist/ESM/*`.___________________________;
	
	await build({
		src: 'src/FrontEndRuntimeDependency',
		UMD: { main_global: 'jVue' },
		ESM: true,
		ES: 5,
		semver,
		name,
		user: 'LongTengDao@ltd',
		Auth,
		Copy,
		Desc: [
			'对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。',
			'The unified front-end dependency for built .vue files. Belong to "Plan J".'
		],
		locate: {
			'@ltd/j-groupify': ful('../../LongTengDao/j-groupify/dist/ESM/.j-groupify.js'),
		},
	});
	
	const EDITIONS_README_OF_UMD_AND_ESM = await get('dist/README.md');
	
	___________________________`Common: /dist/README.md, /LICENSE*, /docs/*`.___________________________;
	
	await put('dist/README.md', mergeEditionsReadme(EDITIONS_README_OF_NPM, EDITIONS_README_OF_UMD_AND_ESM));
	
	await build({ LICENSE_: Copy, DOC: true });
	
});


function mergeEditionsReadme (one, another) {
	
	const [ en_heading, en_table, en_link, cn_heading, cn_table, cn_link ] = one.split('\r\n\r\n');
	const [ , en_table_, en_links, , cn_table_, cn_links ] = another.split('\r\n\r\n');
	
	return [
		
		en_heading,
		
		Heading('Back-End SFC Compiler'),
		en_table,
		en_link,
		
		Heading('Front-End Runtime Dependency'),
		en_table_,
		en_links,
		
		cn_heading,
		
		Heading('单文件组件后端编译器'),
		cn_table,
		cn_link.replace(/\r\n$/, ''),
		
		Heading('前端运行时依赖'),
		cn_table_,
		cn_links,
	
	].join('\r\n\r\n');
	
	function Heading (content) {
		const NON_ASCII = /[^\x00-\x7F]/ug;
		return content+'\r\n'+'-'.repeat(content.replace(NON_ASCII, '--').length);
	}
	
}

