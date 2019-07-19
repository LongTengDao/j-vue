import Error from '.Error';
import ReferenceError from '.ReferenceError';
import __null__ from '.null';

const { compile } :{ compile (template :string) :{ errors :string[], render :string, staticRenderFns :string[] } } = require('vue-template-compiler');
const { target, transform } :{ target (target :{}) :object, transform (source :string, options :object) :{ code :string } } = require('vue-template-es2015-compiler/buble');
const detectGlobals :{ (code :string, options :object) :{ name :string }[] } = require('acorn-globals');
const { minify } = require('terser');

import { StringLiteral } from '@ltd/j-es';

const transformOptions = __null__({
	transforms: function (transforms) {
		for ( const key in transforms ) {
			transforms[key] =
				key==='stripWith' ||// key==='stripWithFunctional' ||
				key==='trailingFunctionCommas' ||
				//key==='destructuring' || key==='parameterDestructuring' ||
				//key==='spreadRest' ||
				key==='numericLiteral';
		}
		return transforms;
	}(__null__<boolean>(target({}))),
	objectAssign: 'Object.assign',
});
const detectOptions = __null__({ ecmaVersion: 2014 as 2019, sourceType: 'module' });
const minifyOptions = __null__({
	warnings: 'verbose',
	parse: __null__({
		bare_returns: false,
		html5_comments: false,
		shebang: false,
	}),
	compress: __null__({
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

export function NecessaryStringLiteral (body :string) :string {
	
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

export default function Render (innerHTML :string, ES :5 | 8) :{ render :string, staticRenderFns :string[] } {
	const { errors, render, staticRenderFns } = compile(innerHTML);
	if ( errors.length ) { throw Error(`.vue template 官方编译未通过：\n${errors.join('\n')}`); }
	minifyOptions.ecma = ES;
	return {
		render: NecessaryStringLiteral(render),
		staticRenderFns: staticRenderFns.map(NecessaryStringLiteral),
	};
};
