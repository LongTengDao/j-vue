import Error from '.Error';
import WeakSet from '.WeakSet';
//import Object from '.Object';
import test from '.RegExp.prototype.test';
import Null from '.null';
import throwError from '.throw.Error';

import { StringLiteral } from '@ltd/j-es';

import { compile2, compile3, parse, findGlobals, simple, minify } from '../dependencies';

const byReversedStart = (a :Identifier, b :Identifier) :number => b.start - a.start;

let shorthandValues :WeakSet<Identifier>;
//const __Proto__ :String = Object('__proto__');
let _$ :number;
let _vm :boolean;
let _this :boolean;
const visitors = Null({
	ObjectExpression ({ properties } :ObjectExpression) :void {
		let index :number = properties.length;
		while ( index ) {
			const property = properties[--index];
			if ( property.shorthand ) { shorthandValues.add(property.value); }
		}
	},
	ObjectPattern ({ properties } :ObjectPattern) :void {
		let index :number = properties.length;
		while ( index ) {
			const property = properties[--index];
			if ( property.shorthand ) {
				let { value } = property;
				if ( value.type==='AssignmentPattern' ) { value = value.left; }
				//if ( value.name==='__proto__' ) { value.name = __Proto__; }
				shorthandValues.add(value);
			}
		}
	},
	VariablePattern (identifier :Identifier) :void {// 赋值
		if ( identifier.name[0]==='_' ) {
			if ( !_$ ) { throw Error(`不要对实例下的下划线开头格式的私有属性（“${identifier.name}”）进行赋值！`); }
			--_$;
		}
	},
	Identifier (identifier :Identifier) :void {// 引用
		if ( identifier.name==='_vm' ) {
			if ( _vm ) { throw Error(`不应出现对“_vm”的直接访问。`); }
			_vm = true;
		}
		else if ( identifier.name==='arguments' ) { throw Error(`“arguments”可能存在歧义，请避免使用。`); }
	},
	ThisExpression () :void {
		if ( _this ) { throw Error(`直接访问“this”可能导致难以预料的结果，最好避免。`); }
		_this = true;
	},
});

const parserOptions = Null({
	ecmaVersion: 5 as 5 | 2014,
	sourceType: 'module' as const,// use strict mode
	allowReserved: true as const,
	///preserveParens: true,
});
let ecma :5 | 2014 = 5;
const MinifyOptionsBODY = () => Null({
	warnings: 'verbose',
	parse: Null({
		html5_comments: false,
	} as const),
	compress: Null({
		warnings: true,
		//collapse_vars: false,
		pure_getters: true,
		drop_debugger: false,
		typeofs: false,
		expression: true,
		keep_fargs: false,
		arguments: true,
		passes: 2,
		unsafe_arrows: true,
		unsafe_methods: true,
	} as const),
	output: Null({
		inline_script: false,
		beautify: false,
	} as const),
	safari10: true,
	ie8: false,
	ecma,
} as const);
/*const MinifyOptionsFUNC = () => {
	const options = MinifyOptionsBODY();
	return Null({
		...options,
		compress: Null({
			...options.compress,
			//collapse_vars: false,
			defaults: false,
			arrows: true,
			pure_getters: false,
			keep_fargs: true,
			arguments: false,
			side_effects: true,//
			//keep_fnames: false,
		} as const),
		mangle: false,
		output: Null({
			inline_script: false,
			beautify: true,
			indent_level: 0,
			//preserve_annotations: true,//comments: () => true,
		} as const),
	} as const);
};*/
const MinifyBODY = (files :string) => {
	const { error, warnings, code } = minify(files, MinifyOptionsBODY());
	if ( error ) { throw error; }
	if ( warnings ) {
		const filtered = warnings.filter((warning :string) => !/^Dropping unused function argument \$event \[\d+:\d+,\d+]$/.test(warning));
		if ( filtered.length ) { throw Error(`Terser 压缩警告：\n${filtered.join('\n')}`); }
	}
	return code!;
};

const CONST_RETURN = /^(?:cons|le)t ({ [\w :,]+ }) = Vue\n(.*)$/s;

const with_this__return_ = 'with(this){return ';

const _$s = 'conslqikbveugdp'.split('').map($ => `_${$}`);// tmf
const _function____use_strict__return_ = {
	var: `(function(){"use strict";var _vm = this, ${_$s.map(_$ => `${_$} = _vm.${_$}`).join(', ')}; return `,
	let: `(function(){"use strict";let _vm = this, { ${_$s.join(', ')} } = _vm._self; return `,
	const: `(function(){"use strict";const _vm = this, { ${_$s.join(', ')} } = _vm._self; return `,
} as const;

let MODE :'var' | 'let' | 'const';
let BODY :boolean;

const NecessaryStringLiteral = (body :string, name :'\'render\'' | number) :string => {
	if ( !body.startsWith(with_this__return_) ) { throw Error(`jVue 内部错误：vue-template-compiler .compile 返回了与预期不符的内容格式`); }
	const func :string = `${_function____use_strict__return_[MODE]}${body.slice(with_this__return_.length, -1)};});`;
	const AST = parse(func, parserOptions);
	const globals = findGlobals(AST);
	_$ = 1 + _$s.length;
	_vm = _this = false;
	shorthandValues = new WeakSet;
	simple(AST, visitors);
	let _vm_func :string = '';
	let index :number = 0;
	const identifiers = ( globals.nodes() as Identifier[] ).sort(byReversedStart);
	let i = identifiers.length;
	while ( i ) {
		const identifier = identifiers[--i];
		let name :string = identifier.name as string;
		const { start } = identifier;
		if ( start!==index ) { _vm_func += func.slice(index, start); }
		name = func.slice(start, index = identifier.end);
		if ( shorthandValues.has(identifier) ) {
			_vm_func += //identifier.name==='__proto__' ? '["__proto__"]:' :
				name + ':';
		}
		_vm_func += '_vm.' + name;
	}
	if ( index!==func.length ) { _vm_func += func.slice(index); }
	if ( BODY ) { _vm_func = MinifyBODY(_vm_func); }
	body = _vm_func.slice(_vm_func.indexOf(';') + 1, _vm_func.lastIndexOf('}'));
	return BODY
		? StringLiteral(body)
		: ecma===5 ? `function(){${body}}` : `{[${name}](){${body}}}[${name}]`;
};

const onError = (error :SyntaxError) :never => { throw Error(`.vue template 官方编译未通过：\n       ${error.message}`); };
const isCustomElement = test.bind(/^(?![A-Z]|base-transition$|component$|keep-alive$|s(?:lot|uspense)$|te(?:mplate|leport)$)/);
export const Render3 = (innerHTML :string, mode :'let' | 'const', body :boolean, shadow? :string) :string => {
	const { code } = compile3[mode](innerHTML, {
		onError,
		isCustomElement,
		mode: 'function',
		prefixIdentifiers: true,
		cacheHandlers: true,
		hoistStatic: true,
	});
	const { 1: params, 2: rest } = CONST_RETURN.exec(code) ?? throwError(`jVue 内部错误：@dom/compiler-dom .compile 返回了与预期不符的内容格式`);
	let Render :string = `"use strict";(${params})=>{${rest}};`;
	ecma = parserOptions.ecmaVersion = 2014;
	const globals = findGlobals(parse(Render, parserOptions));
	globals.size && throwError(`jVue 内部错误：@dom/compiler-dom .compile 返回的内容与预期不符（存在变量泄漏：“${globals.names().join('”“')}”）`);
	if ( body ) { Render = MinifyBODY(Render); }
	Render = Render.slice(13, -1);
	const index = Render.indexOf('=>');
	const left = Render.slice(0, index);
	const right = Render.slice(index + 2);
	return body
		? StringLiteral(left + ( right[0]==='{' ? right : `{return${right[0]==='(' ? '' : ' '}${right}}`) + (shadow ? `static shadow=${StringLiteral(shadow)}` : ''))
		: `class { constructor ${left} ${right[0]==='{' ? right : `{ return ${right}; }`} ${shadow ? `static shadow = ${StringLiteral(shadow)}; ` : ''}}`;
};

export const Render2 = (innerHTML :string, mode :'var' | 'let' | 'const', body :boolean) :{ readonly render :string, readonly staticRenderFns :readonly string[] } => {
	const { errors, tips, render, staticRenderFns } = compile2[mode](innerHTML);
	if ( errors.length ) { throw Error(`.vue template 官方编译未通过：\n       ${errors.join('\n       ')}`); }
	if ( tips.length ) { throw Error(`.vue template 官方编译建议：\n       ${tips.join('\n       ')}`); }
	BODY = body;
	MODE = mode;
	ecma = parserOptions.ecmaVersion = mode==='var' ? 5 : 2014;
	return {
		render: NecessaryStringLiteral(render, `'render'`),
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