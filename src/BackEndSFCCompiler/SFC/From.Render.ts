import Error from '.Error';
import WeakSet from '.WeakSet';
//import Object from '.Object';
import Null from '.null';

import { StringLiteral } from '@ltd/j-es';

import { compile, Parser, findGlobals, simple, minify } from '../dependencies';
import { _x, $vv } from './INTERNAL';

const byStart = (a :Identifier, b :Identifier) :number => a.start-b.start;

let shorthand :WeakSet<Identifier>;
//let dangerous :WeakSet<Identifier>;
//const __Proto__ :String = Object('__proto__');
let _c :boolean;
const visitors = Null({
	ObjectExpression ({ properties } :ObjectExpression) :void {
		for ( let index :number = properties.length; index--; ) {
			const property = properties[index];
			if ( property.shorthand ) { shorthand.add(property.value); }
		}
	},
	ObjectPattern ({ properties } :ObjectPattern) :void {
		for ( let index :number = properties.length; index--; ) {
			const property = properties[index];
			if ( property.shorthand ) {
				let { value } = property;
				if ( value.type==='AssignmentPattern' ) { value = value.left; }
				//if ( value.name==='__proto__' ) { value.name = __Proto__; }
				shorthand.add(value);
			}
		}
	},
	VariablePattern (identifier :Identifier) :void {
		if ( identifier.name.startsWith('_') ) {
			if ( _c ) {
				throw Error(`不要对实例下的下划线开头格式的私有属性（“${identifier.name}”）进行赋值！`);//dangerous.add(identifier);
			}
			_c = true;
		}
	},
});

const parserOptions = Null({
	ecmaVersion: 5 as 5 | 6,
	sourceType: 'module' as 'module',// use strict mode
	allowReserved: true as true,
});
const minifyOptions = Null({
	warnings: 'verbose' as 'verbose',
	parse: Null({
		bare_returns: false as false,
		html5_comments: false as false,
		shebang: false as false,
	}),
	compress: Null({
		warnings: true as true,
		collapse_vars: false as false,
		pure_getters: false as false,
		side_effects: false as false,
		drop_debugger: false as false,
		keep_infinity: true as true,
		typeofs: false as false,
		expression: true as true,
		arguments: true as true,
		computed_props: true as true,
	}),
	safari10: true as true,
	ie8: false as false,
	ecma: 5 as 5 | 6,
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
	const AST = Parser.parse(code, parserOptions);
	const globals = findGlobals(AST);
	if ( globals.size ) {
		//if ( globals.has('_h') ) { throw Error(`jVue 内部设计时错误地认为新版本的 Vue 不会编译生成对“_h”的引用`); }
		
		const _vm :string = '$'.repeat(body.length);
		
		_c = false;
		shorthand = new WeakSet;
		//dangerous = new WeakSet;
		simple(AST, visitors);
		let _code :string = '';
		let index :number = 0;
		for ( const identifier of ( globals.nodes() as Identifier[] ).sort(byStart) ) {
			//if ( dangerous.has(identifier) ) { throw Error(`不要对实例下的下划线开头格式的私有属性（“${identifier.name}”）进行赋值！`); }
			let name :string = identifier.name as string;
			if ( _x.test(name) ) { throw Error(`访问实例下的下划线开头但后面不是单个小写字母的私有属性（“${name}”）是不妥的`); }
			if ( $vv.test(name) ) { throw Error(`不要尝试在模板中直接访问“$$”后跟若干大小写字母或“$_”后跟 1 以上的数字的实例属性（“${name}”），它们有可能与模板编译时自动生成的运行变量冲突`); }
			const { start } = identifier;
			if ( start!==index ) { _code += code.slice(index, start); }
			name = code.slice(start, index = identifier.end);
			_code += shorthand.has(identifier)
				? `${name}:${_vm}.${name}`//if ( shorthand.has(identifier) ) { _code += identifier.name==='__proto__' ? `['__proto__']:` : `${name}:`; }
				: `${_vm}.${name}`;//_code += `${_vm}.${name}`;
		}
		if ( index!==code.length ) { _code += code.slice(index); }
		
		const minified = minify(`(function(${_vm},_c){"use strict";return ${_vm}=this,${_code.slice(_function__c___use_strict__return_$)}`, minifyOptions);
		if ( minified.error ) { throw minified.error; }
		if ( minified.warnings ) { throw Error(`Terser 压缩警告：\n${minified.warnings.join('\n')}`); }
		
		const _vm_c_exp = _VM_C_EXP.exec(minified.code!);
		if ( !_vm_c_exp ) { throw Error(`jVue 内部设计时错误地估计了 Terser 压缩生成的内容格式：\n`+minified.code); }
		return StringLiteral(`${_vm_c_exp[1]},${_vm_c_exp[3]}`);
	}
	else {
		const minified = minify(`(function(_c){"use strict";return ${code.slice(_function__c___use_strict__return_$)}`, minifyOptions);
		if ( minified.error ) { throw minified.error; }
		if ( minified.warnings ) { throw Error(`Terser 压缩警告：\n${minified.warnings.join('\n')}`); }
		
		const _c_exp = _C_EXP.exec(minified.code!);
		if ( !_c_exp ) { throw Error(`jVue 内部设计时错误地估计了 Terser 压缩生成的内容格式：\n`+minified.code); }
		return StringLiteral(`,${_c_exp[2]}`);
	}
}

export default function Render (innerHTML :string, ES5 :boolean) :{ render :string, staticRenderFns :string[] } {
	const { errors, render, staticRenderFns } = compile(innerHTML);
	if ( errors.length ) { throw Error(`.vue template 官方编译未通过：\n${errors.join('\n')}`); }
	minifyOptions.ecma = parserOptions.ecmaVersion = ES5 ? 5 : 2014 as 6;
	return {
		render: NecessaryStringLiteral(render),
		staticRenderFns: staticRenderFns.map(NecessaryStringLiteral),
	};
};

type Identifier = {
	type :'Identifier',
	start :number,
	end :number,
	name :String,
};
type ObjectExpression = {
	properties :Array<{
		shorthand :false,
	} | {
		shorthand :true,
		value :Identifier,
	}>,
};
type ObjectPattern = {
	properties :Array<{
		shorthand :false,
	} | {
		shorthand :true,
		value :Identifier | {
			type :'AssignmentPattern',
			left :Identifier,
		},
	}>,
};