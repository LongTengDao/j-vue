import Error from '.Error';
import SyntaxError from '.SyntaxError';
import ReferenceError from '.ReferenceError';
import Null from '.null';

import { parse } from '../dependencies';

const parserOptions = Null({
	ecmaVersion: 2014,
	sourceType: 'module',// use strict mode
	allowReserved: true,
} as const);

const NAMES :string[] = [];

const Pattern = (node :Pattern) :void => {
	switch ( node.type ) {
		case 'Identifier':
			const { name } = node;
			if ( name[0]==='_' || name[0]==='$' ) { NAMES[NAMES.length] = name; }
			break;
		case 'ObjectPattern':// { Pattern }
			let propertyIndex = 0;
			for ( const { properties } = node, { length } = properties; propertyIndex!==length; ) {
				const property = properties[propertyIndex++]!;
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
			let elementIndex = 0;
			for ( const { elements } = node, { length } = elements; elementIndex!==length; ) {
				const element = elements[elementIndex++];
				element && Pattern(element);
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
};

export { Params as default };
const Params = (parameters :string, min :number, max :number, attribute :string) :void => {
	let program :Program;
	try { program = parse(`(${parameters})=>{}`, parserOptions) as any; }
	catch (error) {
		const index = error.pos-1;
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
	if ( length<min || max<length ) { throw SyntaxError(`${attribute}的内容的解析结果数量 ${length} 不符合预期的 ${min}～${max}`); }
	if ( !length ) { return; }
	NAMES.length = 0;
	let index = 0;
	while ( index!==length ) { Pattern(params[index++]!); }
	if ( NAMES.length ) { throw ReferenceError(`${attribute}创建了以“_”或“$”开头的局部变量“${NAMES.join('”“')}”，这可能使得内层 Vue 模板编译结果以错误的方式运行`); }
};

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
