import Error from '.Error';
import ReferenceError from '.ReferenceError';
import undefined from '.undefined';
import NULL from '.null';

const { compile } :{
	compile (template :string) :{ errors :string[], render :string, staticRenderFns :string[] }
} = require('vue-template-compiler');

const { target, transform } :{
	target (target :{}) :object
	transform (source :string, options :object) :{ code :string }
} = require('vue-template-es2015-compiler/buble');

const detectGlobals :{
	(code :string, options :object) :{ name :string }[]
} = require('acorn-globals');

const { minify } = require('terser');

import { StringLiteral } from '@ltd/j-es';

import { KEYS } from '../../FrontEndRuntimeDependency/Scope/';

import _ from './Private';

const transformOptions = NULL({
	transforms: NULL<boolean>(target({})),
	objectAssign: 'Object.assign',
});

for ( const key in transformOptions.transforms ) {
	transformOptions.transforms[key] =
		key==='stripWith' ||// key==='stripWithFunctional' ||
		key==='trailingFunctionCommas' ||
		//key==='destructuring' || key==='parameterDestructuring' ||
		//key==='spreadRest' ||
		key==='numericLiteral';
}

const detectOptions = NULL({
	ecmaVersion: 2014 as 2019,
	sourceType: 'module',
});

const minifyOptions = NULL({
	warnings: 'verbose',
	parse: NULL({
		bare_returns: false,
		html5_comments: false,
		shebang: false,
	}),
	compress: NULL({
		warnings: true,
		collapse_vars: false,
		pure_getters: false,
		side_effects: false,
		drop_debugger: false,
		keep_infinity: true,
		typeofs: false,
		expression: true,
		arguments: true,
		computed_props: true,
	}),
	safari10: true,
	ie8: false,
	ecma: 5,
});

const PRE = '(function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return ';
const SUR = '})';
const PRE_LENGTH = PRE.length;
const SUR_LENGTH = -SUR.length;

const VM_C_EXP = /^\(function\(([\w$]+),([\w$]+)\){"use strict";return (\2\(.*\))}\);$/s;

function fetchName (global :{ name :string }) :string { return global ? global.name || '' : ''; }

function NecessaryStringLiteral (body :string) :string {
	if ( !body.startsWith('with(this){return ') || !body.endsWith('}') ) { throw Error(`jVue 内部错误：vue-template-compiler .compile 返回了与预期不符的内容格式`); }
	const without = transform(`(function(){${body}})`, transformOptions).code;
	if ( !without.startsWith(PRE) || !without.endsWith(SUR) ) { throw Error(`jVue 内部错误：vue-template-es2015-compiler/buble .transform 返回了与预期不符的内容格式`); }
	const wrapped = `(function(_vm,_c){"use strict";return ${without.slice(PRE_LENGTH, SUR_LENGTH)}});`;
	const globals = detectGlobals(wrapped, detectOptions);
	if ( globals && globals.length ) {
		const names :string = globals.map(fetchName).join('”“');
		throw names==='_h'
			? Error(`jVue 内部设计时错误地认为新版本的 Vue 不会编译生成对“_h”的引用`)
			: ReferenceError(`template 块中，存在编译后跳过实例属性检查直接作为全局变量的标识符“${names}”`);
	}
	const minified = minify(wrapped, minifyOptions);
	if ( minified.error ) { throw minified.error; }
	if ( minified.warnings ) { throw Error(`Terser 压缩警告：\n${minified.warnings.join('\n')}`); }
	const vm_c_exp = VM_C_EXP.exec(minified.code);
	if ( !vm_c_exp ) { throw Error(`jVue 内部设计时错误地估计了 Terser 压缩生成的内容格式：\n`+minified.code); }
	return StringLiteral(`${vm_c_exp[1]},${vm_c_exp[3]}`);
}

const NULo = /^\0[0-7]/;
const LS_PS = /[\u2028\u2029]/g;
const LF_LS_PS = /[\n\u2028\u2029]/g;
const escape_LS_PS = ($0 :string) :string => $0==='\u2028' ? '\\002028' : '\\002029';
const escape_LF_LS_PS = ($0 :string) :string => $0==='\n' ? '&#x0A;' : $0==='\u2028' ? '&#x2028;' : '&#x2029;';

function VisibleStringLiteral (id :string) :string {
	const literal :string = StringLiteral(id);
	return id.startsWith('\0') ? ( NULo.test(id) ? `'\\x00` : `'\\0` )+literal.slice(2) : literal;
}

export default function * From (tab :string, mode :'const' | 'var' | 'let', styles :Style[], template :Template | null, from :string, eol :string) :IterableIterator<string> {
	
	yield `export * from ${VisibleStringLiteral(from)};${eol}`;
	yield `import { Scope, Template, Render, StaticRenderFns } from ${VisibleStringLiteral(from)};${eol}${eol}`;
	
	yield !template || _(template).keys===undefined
		? `export ${mode} scope = /*#__PURE__*/Scope()`
		: `export ${mode} scope = /*#__PURE__*/Scope('${( _(template).keys!.match(KEYS) || [] ).join(',')}')`;
	for ( const style of styles ) {
		const { innerCSS } = style;
		for ( const line of innerCSS.split('\n') ) {
			yield `${eol}//${line.replace(LS_PS, escape_LS_PS)}`;
		}
		const { media } = _(style);
		yield media===undefined
			? `${eol}.$(${StringLiteral(innerCSS)})`
			: `${eol}.$(${StringLiteral(innerCSS)}, ${StringLiteral(media)})`;
	}
	yield `;${eol}`;
	
	if ( !template ) { return; }
	
	const { innerHTML } = template;
	const { errors, render, staticRenderFns } = compile(innerHTML);
	if ( errors.length ) { throw Error(`.vue template 官方编译未通过：\n${errors.join('\n')}`); }
	
	minifyOptions.ecma = mode==='var' ? 5 : 8;
	
	yield eol;
	yield `export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, scope);${eol}`;
	yield `export ${mode} render = /*#__PURE__*/Render(${NecessaryStringLiteral(render)}, scope);${eol}`;
	yield staticRenderFns.length
		? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.map(NecessaryStringLiteral).join(`,${eol}${tab}`)}${eol}], scope);${eol}`
		: `export ${mode} staticRenderFns = [];${eol}`;
	for ( const line of template.content.toSource(tab) ) {
		yield `//${tab}${line.replace(LF_LS_PS, escape_LF_LS_PS)}${eol}`;
	}
	
};

import Style from './Style';
import Template from './Template';