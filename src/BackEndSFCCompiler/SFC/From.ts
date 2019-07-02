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

const PRE = '(function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return ';
const SUR = '})';
const PRE_LENGTH = PRE.length;
const SUR_LENGTH = -SUR.length;

function fetchName (global :{ name :string }) :string { return global ? global.name : ''; }

function NecessaryStringLiteral (body :string) :string {
	if ( !body.startsWith('with(this){return ') || !body.endsWith('}') ) {
		throw Error(`jVue 内部错误：vue-template-compiler .compile 返回了与预期不符的内容格式`);
	}
	const { code } = transform(`(function(){${body}})`, transformOptions);
	if ( !code.startsWith(PRE) || !code.endsWith(SUR) ) {
		throw Error(`jVue 内部错误：vue-template-es2015-compiler/buble .transform 返回了与预期不符的内容格式`);
	}
	const globals = detectGlobals(`'use strict';${code}`, detectOptions);
	if ( globals && globals.length ) {
		throw ReferenceError(`template 块中，存在编译后跳过实例属性检查直接作为全局变量的标识符“${globals.map(fetchName).join('”“')}”`);
	}
	return StringLiteral(code.slice(PRE_LENGTH, SUR_LENGTH));
}

export default function * From (tab :string, mode :'const' | 'var' | 'let', styles :Style[], template :Template | null, from :string, eol :string) :IterableIterator<string> {
	
	yield `export * from ${StringLiteral(from)};${eol}${eol}`;
	yield `import { Scope, Template, Render, StaticRenderFns } from ${StringLiteral(from)};${eol}${eol}`;
	
	yield !template || _(template).keys===undefined
		? `export ${mode} scope = /*#__PURE__*/Scope()`
		: `export ${mode} scope = /*#__PURE__*/Scope('${( _(template).keys!.match(KEYS) || [] ).join(',')}')`;
	for ( const style of styles ) {
		yield _(style).media===undefined
			? `${eol}.$(${StringLiteral(style.innerCSS)})`
			: `${eol}.$(${StringLiteral(style.innerCSS)}, ${StringLiteral(_(style).media!)})`;
	}
	yield `;${eol}${eol}`;
	
	if ( !template ) { return; }
	
	const { innerHTML } = template;
	const { errors, render, staticRenderFns } = compile(innerHTML);
	if ( errors.length ) { throw Error(`.vue template 官方编译未通过：\n${errors.join('\n')}`); }
	
	yield `export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, scope);${eol}`;
	yield `export ${mode} render = /*#__PURE__*/Render(${NecessaryStringLiteral(render)}, scope);${eol}`;
	yield staticRenderFns.length
		? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.map(NecessaryStringLiteral).join(`,${eol}${tab}`)}${eol}], scope);${eol}`
		: `export ${mode} staticRenderFns = [];${eol}`;
	
	for ( const line of template.content.toSource(tab) ) { yield `//${tab}${line}${eol}`; }
	
};

import Style from './Style';
import Template from './Template';