import Error from '.Error';
import WeakSet from '.WeakSet';
//import Object from '.Object';
import freeze from '.Object.freeze';
import Null from '.null';
import throwError from '.throw.Error';

import { StringLiteral } from '@ltd/j-es';
import { theRegExp } from '@ltd/j-regexp';

import { compile2, compile3, parse, findGlobals, simple, minify } from '../dependencies';
import _ from './private';
import { inBlackList, isCustomElement } from './Template/Content/';

let compatible = false;

const byReversedStart = (a :Identifier, b :Identifier) => b.start - a.start;

let shorthandValues :WeakSet<Identifier>;
//const __Proto__ :String = Object('__proto__');
let _$ :number;
let _vm :boolean;
let _this :boolean;
const visitors = Null({
	ObjectExpression ({ properties } :ObjectExpression) :void {
		let index = properties.length;
		while ( index ) {
			const property = properties[--index]!;
			if ( property.shorthand ) { shorthandValues.add(property.value); }
		}
	},
	ObjectPattern ({ properties } :ObjectPattern) :void {
		let index = properties.length;
		while ( index ) {
			const property = properties[--index]!;
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
	format: Null({
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
		format: Null({
			inline_script: false,
			beautify: true,
			indent_level: 0,
			//preserve_annotations: true,//comments: () => true,
		} as const),
	} as const);
};*/
const $event = /^Dropping unused function argument (?:\$event|_(?:cache|ctx)) \[\d+:\d+,\d+]$/;
const not$event = (warning :string) => !$event.test(warning);
const MinifyBODY = async (files :string) => {
	const { error, warnings, code } = await minify(files, MinifyOptionsBODY());
	if ( error ) { throw error; }
	if ( warnings ) {
		const filtered = warnings.filter(not$event);
		if ( filtered.length ) { throw Error(`Terser 压缩警告：\n${filtered.join('\n')}`); }
	}
	return code!;
};

const CONST_RETURN = theRegExp<1 | 2>(/^(?:cons|le)t ({[\w :,]*}) = Vue\n(.*)$/s).exec;
const PORTS = /[\w$]+(?= *[:,}])/g;

const with_this__return_ = 'with(this){return ';

const _$s = 'conslqikbveugdp'.split('').map($ => `_${$}`);// tmf
const mode_ = {
	var: _$s.map(_$ => `${_$} = _vm.${_$}`).join(', '),
	let: `{ ${_$s.join(', ')} } = _vm._self`,
	const: `{ ${_$s.join(', ')} } = _vm._self`,
} as const;

let MODE :'var' | 'let' | 'const';
let WS :{ readonly eol :string, readonly tab :string } | null;

const strip = (func :string) :string => {
	const AST = parse(func, parserOptions);
	const globals = findGlobals(AST);
	_$ = 1 + _$s.length;
	_vm = _this = false;
	shorthandValues = new WeakSet;
	simple(AST, visitors);
	let _vm_func :string = '';
	let index = 0;
	const identifiers = ( globals.nodes() as Identifier[] ).sort(byReversedStart);
	let i = identifiers.length;
	while ( i ) {
		const identifier = identifiers[--i]!;
		let name = identifier.name as string;
		if ( compatible && inBlackList(name) ) { compatible = false; }
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
	return _vm_func;
};

const NOOP = { eol: '', tab: '' } as const;
const Sheets = (sheet :Map<string, string>, ws :{ readonly eol :string, readonly tab :string } = NOOP) => {
	let literal = '';
	for ( const { 0: ref, 1: expression } of sheet ) {
		if ( expression ) { literal += `${ws.eol}${ws.tab}${ws.tab}${ref}: _vm => ${strip(expression)},`; }
	}
	return `{${literal}${ws.eol}${ws.tab}}`;
};

const NecessaryStringLiteral = async (body :string, name :null | number) :Promise<string> => {
	if ( !body.startsWith(with_this__return_) ) { throw Error(`jVue 内部错误：vue-template-compiler .compile 返回了与预期不符的内容格式`); }
	body = strip(`'use strict';(function(){${WS ? WS.tab + WS.tab : ''}${MODE} _vm = this, ${mode_[MODE]};${WS ? WS.eol + WS.tab + WS.tab : ''}return ${body.slice(with_this__return_.length, -1)};${WS ? WS.eol + WS.tab : ''}});`);
	body = ( WS ? body : await MinifyBODY(body) ).slice(25, -3);
	return WS
		? name===null
			? ecma===5
				? `${WS.eol}${WS.tab}function render () {${WS.eol}${body}}${WS.eol}`
				: `{${WS.eol}${WS.tab}render () {${WS.eol}${body}}${WS.eol}}.render`
			: `{${WS.eol}${WS.tab}${WS.tab}${name}${ecma===5 ? ': function' : ''} () {${WS.eol}${WS.tab}${body.replace('return ', return_ => WS!.tab + return_)}${WS.tab}}${WS.eol}${WS.tab}}[${name}]`
		: StringLiteral(body);
};

const options = freeze(Null({
	onError (error :SyntaxError) :never { throw Error(`.vue template 官方编译未通过：\n       ${error.message}`); },
	isCustomElement,
	mode: 'function',
	prefixIdentifiers: true,
	cacheHandlers: true,
	hoistStatic: true,
} as const));
const options4find = freeze(Null({
	onError (error :SyntaxError) :never { throw Error(`jVue 内部错误：.vue template 额外官方编译未通过：\n       ${error.message}`); },
	isCustomElement,
	mode: 'function',
	prefixIdentifiers: false,
	cacheHandlers: false,
	hoistStatic: false,
} as const));
const NSS = /\n+((?:  )*)/g;
const Render3 = async (innerHTML :string, mode :'let' | 'const', ws :{ readonly eol :string, readonly tab :string } | null, { sheet, shadow } :{ readonly sheet? :Map<string, string>, readonly shadow? :string }, need :boolean) => {
	const { code } = compile3[mode](innerHTML, options);
	const { 1: params, 2: rest } = CONST_RETURN(code) ?? { 1: '', 2: code };
	const ports = params.match(PORTS) ?? [];
	let Render = `'use strict';(${params})=>{${rest}};`;
	ecma = parserOptions.ecmaVersion = 2014;
	const globals = findGlobals(parse(Render, parserOptions));
	globals.size && throwError(`jVue 内部错误：@dom/compiler-dom .compile 返回的内容与预期不符（存在变量泄漏：“${globals.names().join('”“')}”）`);
	if (
		need &&
		compatible &&
		findGlobals(
			parse(`'use strict';()=>{${compile3[mode](innerHTML, options4find).code}}`, parserOptions)
		)
		.names()
		.some(inBlackList)
	) { compatible = false; }
	if ( ws ) { Render = Render.replace(NSS, (nss, ss) => ws.eol + ws.tab.repeat(2 + ss.length/2)).slice(13, -1); }
	else {
		Render = await MinifyBODY(Render);
		const end = Render.length - 1;
		Render = Render[14]==='('
			? Render.slice(14, Render[end]===';' ? end - 1 : end)
			: Render[end]===';'
				? Render.slice(13, end)
				: Render.slice(13);
	}
	const index = Render.indexOf('=>');
	const left = Render.slice(0, index);
	let right = Render.slice(index + 2);
	Render = ws
		? `class Render {${ws.eol}${ws.tab}constructor ${left} ${right[0]==='{' ? right.slice(0, -1) : `{${ws.eol}${ws.tab}${ws.tab}return ${right}`};${ws.eol}${ws.tab}}${sheet ? `${ws.eol}${ws.tab}static sheet = ${Sheets(sheet, ws)};` : ''}${shadow ? `${ws.eol}${ws.tab}static shadow = ${StringLiteral(shadow)};` : ''}${ws.eol}}`
		: StringLiteral(left + ( right[0]==='{' ? right : `{return${right[0]==='(' ? '' : ' '}${right}}` ) + ( sheet ? `static sheet=${( await MinifyBODY(`'use strict';(${Sheets(sheet)});`) ).slice(14, -2)}` : '' ) + ( sheet && shadow ? ';' : '' ) + ( shadow ? `static shadow=${StringLiteral(shadow)}` : '' ));
	return { ports, Render };
};

const Render2 = async (innerHTML :string, mode :'var' | 'let' | 'const', ws :{ readonly eol :string, readonly tab :string } | null) => {
	let { errors, tips, render, staticRenderFns } = compile2[mode](innerHTML);
	if ( errors.length ) { throw Error(`.vue template 官方编译未通过：\n       ${errors.join('\n       ')}`); }
	if ( tips.length ) { throw Error(`.vue template 官方编译建议：\n       ${tips.join('\n       ')}`); }
	WS = ws;
	MODE = mode;
	ecma = parserOptions.ecmaVersion = mode==='var' ? 5 : 2014;
	render = await NecessaryStringLiteral(render, null);
	let index = 0;
	for ( const { length } = staticRenderFns; index!==length; ++index ) {
		staticRenderFns[index] = await NecessaryStringLiteral(staticRenderFns[index]!, index);
	}
	return { render, staticRenderFns };
};

export { Render as default };
const Render = async (template :Template, mode :'var' | 'let' | 'const', ws :{ readonly eol :string, readonly tab :string } | null) => {
	const { content } = template;
	const innerHTML = '' + content;
	compatible = content._compatible_template;
	const render2 = content._compatible_render ? await Render2(innerHTML, mode, ws) : null;
	return {
		render2,
		render3: mode==='var' ? null : await Render3(innerHTML, mode, ws, _(template), !render2),
		/// - {ws}: (); import!
		/// - null: (); import or ~~runtime~~?
		innerHTML: compatible ? innerHTML : null,
	};
};

type Identifier = {
	readonly type :'Identifier',
	readonly start :number,
	readonly end :number,
	readonly name :String,
};
type ObjectExpression = {
	readonly properties :ReadonlyArray<{
		readonly shorthand :false,
	} | {
		readonly shorthand :true,
		readonly value :Identifier,
	}>,
};
type ObjectPattern = {
	readonly properties :ReadonlyArray<{
		readonly shorthand :false,
	} | {
		readonly shorthand :true,
		readonly value :Identifier | {
			readonly type :'AssignmentPattern',
			readonly left :Identifier,
		},
	}>,
};

import type Template from './Template/';