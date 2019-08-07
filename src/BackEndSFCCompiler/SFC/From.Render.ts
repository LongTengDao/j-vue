import Error from '.Error';
import Object from '.Object';
import WeakSet from '.WeakSet';
import __null__ from '.null';

import { StringLiteral } from '@ltd/j-es';

import { compile, Parser, findGlobals, simple, minify } from '../dependencies';

const byStart = (a :Node, b :Node) :number => a.start-b.start;

const shorthand :WeakSet<Node> = new WeakSet;
const dangerous :WeakSet<Node> = new WeakSet;
const __Proto__ :String = Object('__proto__');
const visitors = __null__({
	ObjectExpression ({ properties } :Node) :void {
		for ( let index :number = properties!.length; index--; ) {
			const property = properties![index];
			if ( property.shorthand ) { shorthand.add(property.value); }
		}
	},
	ObjectPattern ({ properties } :Node) :void {
		for ( let index :number = properties!.length; index--; ) {
			const property = properties![index];
			if ( property.shorthand ) {
				let { value } = property;
				if ( value.type==='AssignmentPattern' ) { value = value.left!; }
				if ( value.name==='__proto__' ) { value.name = __Proto__; }
				shorthand.add(value);
			}
		}
	},
	VariablePattern (node :Node) :void {
		if ( node.name!.startsWith('_') ) { dangerous.add(node); }
	},
});

const parserOptions = __null__({ ecmaVersion: 5 });
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

const with_this__return_ = 'with(this){return ';
const with_this__return_$ = with_this__return_.length;
const _ = '}';
const _$ = -_.length;
const _function__c___use_strict__return_ = '(function(_c){"use strict";return ';
const _function__c___use_strict__return_$ = _function__c___use_strict__return_.length;

const _VM_C_EXP = /^\(function\(([\w$]+),([\w$]+)\){"use strict";return \1=this,(\2\(.*\))}\);$/s;
const _C_EXP = /^\(function\(([\w$]+)\){"use strict";return (\1\(.*\))}\);$/s;

export function NecessaryStringLiteral (body :string) :string {
	if ( !body.startsWith(with_this__return_) || !body.endsWith(_) ) { throw Error(`jVue 内部错误：vue-template-compiler .compile 返回了与预期不符的内容格式`); }
	const code :string = `${_function__c___use_strict__return_}${body.slice(with_this__return_$, _$)}})`;
	const AST :Node = Parser.parse(code, parserOptions);
	const globals = findGlobals(AST);
	if ( globals.size ) {
		if ( globals.has('_h') ) { throw Error(`jVue 内部设计时错误地认为新版本的 Vue 不会编译生成对“_h”的引用`); }
		
		const _vm :string = '$'.repeat(body.length);
		
		simple(AST, visitors);
		let _code :string = '';
		let index :number = 0;
		for ( const node of globals.nodes().sort(byStart) ) {
			if ( dangerous.has(node) ) { throw Error(`不要对实例下的下划线开头的私有属性“${node.name}”进行写操作！`); }
			const { start } :Node = node;
			if ( start!==index ) { _code += code.slice(index, start); }
			const name :string = code.slice(start, index = node.end);
			if ( shorthand.has(node) ) { _code += node.name==='__proto__' ? `['__proto__']:` : `${name}:`; }
			_code += `${_vm}.${name}`;
		}
		if ( index!==code.length ) { _code += code.slice(index); }
		
		const minified = minify(`(function(${_vm},_c){"use strict";return ${_vm}=this,${_code.slice(_function__c___use_strict__return_$)}`, minifyOptions);
		if ( minified.error ) { throw minified.error; }
		if ( minified.warnings ) { throw Error(`Terser 压缩警告：\n${minified.warnings.join('\n')}`); }
		
		const _vm_c_exp = _VM_C_EXP.exec(minified.code);
		if ( !_vm_c_exp ) { throw Error(`jVue 内部设计时错误地估计了 Terser 压缩生成的内容格式：\n`+minified.code); }
		return StringLiteral(`${_vm_c_exp[1]},${_vm_c_exp[3]}`);
	}
	else {
		const minified = minify(`(function(_c){"use strict";return ${code.slice(_function__c___use_strict__return_$)}`, minifyOptions);
		if ( minified.error ) { throw minified.error; }
		if ( minified.warnings ) { throw Error(`Terser 压缩警告：\n${minified.warnings.join('\n')}`); }
		
		const _c_exp = _C_EXP.exec(minified.code);
		if ( !_c_exp ) { throw Error(`jVue 内部设计时错误地估计了 Terser 压缩生成的内容格式：\n`+minified.code); }
		return StringLiteral(`,${_c_exp[2]}`);
	}
}

export default function Render (innerHTML :string, ES5 :boolean) :{ render :string, staticRenderFns :string[] } {
	const { errors, render, staticRenderFns } = compile(innerHTML);
	if ( errors.length ) { throw Error(`.vue template 官方编译未通过：\n${errors.join('\n')}`); }
	parserOptions.ecmaVersion = ES5 ? 5 : 2014;
	minifyOptions.ecma = ES5 ? 5 : 8;
	return {
		render: NecessaryStringLiteral(render),
		staticRenderFns: staticRenderFns.map(NecessaryStringLiteral),
	};
};

type Node = object & {
	type :string
	start :number
	end :number
	name? :String
	properties? :{ shorthand :boolean, value :Node & { left? :Node } }[]
};