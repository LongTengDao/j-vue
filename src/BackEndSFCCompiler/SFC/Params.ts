import Error from '.Error';
import SyntaxError from '.SyntaxError';
import ReferenceError from '.ReferenceError';
import Null from '.null';

import { Parser } from '../dependencies';
import { _v, $vvv } from './INTERNAL';

const parserOptions = Null({
	ecmaVersion: 2014 as 6,
	sourceType: 'module' as 'module',// use strict mode
	allowReserved: true as true,
});

const _NAMES :string[] = [];
const $NAMES :string[] = [];

export default function Params (parameters :string, min :number, max :number, attribute :string) {
	let program :Program;
	try { program = Parser.parse(`(${parameters})=>{}`, parserOptions) as any; }
	catch (error) {
		const index :number = error.pos-1;
		throw SyntaxError(`${attribute}的内容“${parameters.slice(0, index)}”✗“${parameters.slice(index)}”解析失败`);
	}
	const { body } = program;
	if ( body.length!==1 ) { throw SyntaxError(`${attribute}的内容的解析结果不符合预期`); }
	const body_0 = body[0];
	if ( body_0.type!=='ExpressionStatement' ) { throw SyntaxError(`${attribute}的内容的解析结果不符合预期`); }
	const { expression } = body_0;
	if ( expression.type!=='ArrowFunctionExpression' ) { throw SyntaxError(`${attribute}的内容的解析结果不符合预期`); }
	const block = expression.body;
	if ( block.type!=='BlockStatement' || block.body.length!==0 ) { throw SyntaxError(`${attribute}的内容的解析结果不符合预期`); }
	const { params } = expression;
	const { length } = params;
	if ( length<min || max<length ) { throw SyntaxError(`${attribute}的内容的解析结果不符合预期`); }
	if ( !length ) { return; }
	_NAMES.length = 0;
	$NAMES.length = 0;
	for ( let index = 0; index<length; ++index ) { Pattern(params[index]); }
	if ( !_NAMES.length && !$NAMES.length ) { return; }
	const _ :string = _NAMES.join('”“');
	const $ :string = $NAMES.join('”“');
	_NAMES.length = 0;
	$NAMES.length = 0;
	throw ReferenceError(
		`${attribute}存在`+
		( _ && `以“_”开头后跟单个小写字母的危险变量“${_}”` )+
		( _ && $ && `和` )+
		( $ && `以“$”开头的危险变量“${$}”` )+
		`，这可能使得 Vue 模板编译结果以错误的方式运行`
	);
};

function Pattern (node :Pattern) :void {
	switch ( node.type ) {
		case 'Identifier':
			if ( _v.test(node.name) ) { _NAMES.push(node.name); }
			if ( $vvv.test(node.name) ) { $NAMES.push(node.name); }
			break;
		case 'ObjectPattern':// { Pattern }
			for ( let { properties } = node, { length } = properties, index :number = 0; index<length; ++index ) {
				const property = properties[index];
				switch ( property.type ) {
					case 'Property':// { key: valuePattern }
						Pattern(property.value);
						break;
					case 'RestElement':// { ...argumentPattern }
						Pattern(property.argument);
						break;
					default:
						throw Error(`Unrecognized pattern type: ${property.type}`);
				}
			}
			break;
		case 'ArrayPattern':// [ , Pattern ]
			for ( let { elements } = node, { length } = elements, index :number = 0; index<length; ++index ) {
				const element = elements[index];
				if ( element ) { Pattern(element); }
			}
			break;
		case 'RestElement':
			Pattern(node.argument);// [ ...argumentPattern ] (...argumentPattern)
			break;
		case 'AssignmentPattern':// leftPattern = right
			Pattern(node.left);
			break;
		default:
			throw Error(`Unrecognized pattern type: ${node.type}`);
	}
}

type Pattern = {
	type :'Identifier',
	name :string,
} | {
	type :'ObjectPattern',
	properties :Array<{
		type :'Property',
		value :Pattern,
	} | {
		type :'RestElement',
		argument :Pattern,
	} | {
		type :'',
	}>,
} | {
	type :'ArrayPattern',
	elements :Array<Pattern | null>,
} | {
	type :'RestElement',
	argument :Pattern,
} | {
	type :'AssignmentPattern',
	left :Pattern,
} | {
	type :'',
};

type Program = {
	type :'Program',
	body :[ {
		type :'ExpressionStatement',
		expression :{
			type :'ArrowFunctionExpression',
			params :Pattern[],
			body :{
				type :'BlockStatement',
				body :[],
			},
		},
	} ],
};
