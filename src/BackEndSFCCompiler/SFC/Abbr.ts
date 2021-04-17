import Error from '.Error';
import SyntaxError from '.SyntaxError';
import create from '.Object.create';
import NULL from '.null.prototype';

import { newRegExp } from '@ltd/j-regexp';

import { ASCII_WHITESPACE as s, TOKENS, AliasName, localNameWithoutDot, localOrComponentNameWithoutDot, isLocalOrComponentNameDotable, className, NameAs__Key__ } from './RE';
import _ from './private';
import { EMPTY } from './Attributes';

const isSelector = newRegExp.u`^
	${s}*(?:
		${AliasName}${s}*
		(?:=${s}*
			(?:${localNameWithoutDot}|(?=\.))
			(?:\.${className})*
		${s}*)?;
	${s}*)*
$`.test;

const defaultSelector = (Name :string) => `.${NameAs__Key__(Name)}`;

type Selector = { [componentName :string] :string };

export const forStyle = (attributes :Attributes) => {
	if ( '.abbr' in attributes ) {
		const literal = attributes['.abbr'];
		if ( literal===EMPTY ) { return defaultSelector; }
		else {
			if ( !isSelector(literal) ) { throw SyntaxError(`style 块的“.abbr”属性语法错误：\n${literal}`); }
			const abbr = create(NULL) as Selector;
			const pairs = literal.split(';');
			const { length } = pairs;
			let index = 0;
			while ( index!==length ) {
				const tokens = pairs[index++]!.match(TOKENS);
				if ( tokens ) {
					const componentName :string = tokens[0]!;
					abbr[componentName] = tokens.length>1 ? tokens[1]! : defaultSelector(componentName);
				}
			}
			return (componentName :string) :string => {
				if ( componentName in abbr ) { return abbr[componentName]!; }
				throw Error(`style 块中存在被遗漏的伪标签名 ${componentName} 选择器`);
			};
		}
	}
	return;
};

const ATTR = newRegExp.u`
	\[ *
	[a-zA-Z][\w-]*(?:\|[a-zA-Z][\w-]*)? *
	(?:
		~?
		= *
		(?:
			[a-zA-Z][\w-]*
		|
			'[^']*'
		|
			"[^"]*"
		) *
	)?
	\]
`;
const sAfterAliasName = newRegExp`
	${s}+$
`;
const PARTS = newRegExp.gu`
	${localOrComponentNameWithoutDot}
	|
	\*
	|
	\.(?:${className})?
	|
	${ATTR}
`;
const PARTIALS = newRegExp.gu`
	${AliasName}${s}*
	=${s}*
		(?:
			${localOrComponentNameWithoutDot}
		|
			\*
		)${s}*
		(?:
			(?:
				\.(?:${className})?
			|
				${ATTR}
			)
			${s}*
		)*
`;
const TEMPLATE_ABBR = newRegExp.u`^
	${s}*(?:
		${PARTIALS};
	${s}*)*
$`;
const TEMPLATE_ABBR_COLON_ = newRegExp.u`^
	${s}*(?:
		${AliasName}${s}*;
	${s}*)*
$`;

export type Partial = { [xName :string] :{ readonly tagName :string | null, readonly class :string, readonly attrs :Null<string> | null } };

export const forTemplate = (attributes :Attributes) => {
	let abbr :Partial | undefined;
	
	if ( '.abbr' in attributes ) {
		const literal = attributes['.abbr'];
		if ( literal===EMPTY ) { throw SyntaxError(`template 功能块的“.abbr”属性必须具有值`); }
		if ( !TEMPLATE_ABBR.test(literal) ) { throw SyntaxError(`template 功能块的“.abbr”属性语法错误：\n${literal}`); }
		abbr = create(NULL) as Partial;
		const pairs = literal.match(PARTIALS);
		if ( pairs ) {
			let index = pairs.length;
			do {
				const part = pairs[--index]!;
				const indexOfEqual = part.indexOf('=');
				const xName :string = part.slice(0, indexOfEqual).replace(sAfterAliasName, '');
				if ( xName in abbr ) { throw SyntaxError(`template 功能块的“.abbr”属性值中存在重复的条目“${xName}”`); }
				const x_selectors = part.slice(indexOfEqual + 1).match(PARTS)!;
				let tagName :string | null = x_selectors[0]!;
				if ( tagName==='*' ) { tagName = null; }
				let className :string = '';
				let attrs :Null<string> | null = null;
				let i = 1;
				while ( i!==x_selectors.length ) {
					const selector = x_selectors[i++]!;
					if ( selector[0]==='.' ) {
						className += selector==='.'
							? ' ' + NameAs__Key__(xName)
							: ' ' + selector.slice(1);
					}
					else {
						const i = selector.indexOf('=');
						let n = selector.slice(1, i).trim();
						if ( n.startsWith('v-') || n==='class' || n==='style' ) { throw SyntaxError(`template 功能块的“.abbr”属性值中不能添加“v-”开头的属性或“class”“style”`); }
						n = n.replace('|', ':');
						attrs ?? ( attrs = create(NULL) as Null<string> );
						let v :string | EMPTY;
						if ( i>0 ) {
							if ( selector[i - 1]==='~' ) {
								n = n.slice(0, -1).trim();
								if ( n in attrs ) { throw SyntaxError(`template 功能块的“.abbr”属性值中出现了重复的属性“${n}”`); }
								n = '$' + n;
							}
							v = selector.slice(i + 1, -1).trim();
							if ( v[0]=='"' || v[0]==='\'' ) { v = v.slice(1, -1); }
						}
						else {
							if ( n in attrs ) { throw SyntaxError(`template 功能块的“.abbr”属性值中出现了重复的属性“${n}”`); }
							n = '$' + n;
						}
						if ( n in attrs ) { throw SyntaxError(`template 功能块的“.abbr”属性值中出现了重复的属性“${n[0]==='~' ? n.slice(1) : n}”`); }
						attrs[n] = v;
					}
				}
				abbr[xName] = {
					tagName,
					class: className.slice(1),
					attrs,
				};
			}
			while ( index );
		}
	}
	
	for ( const name in attributes ) {
		if ( name.startsWith('.abbr:') ) {
			let tagName :string | null = name.slice(6);
			if ( tagName==='*' ) { tagName = null; }
			else if ( !isLocalOrComponentNameDotable(tagName) ) { throw SyntaxError(`template 功能块的“${name}”属性的标签名部分不符合要求`); }
			abbr ?? ( abbr = create(NULL) as Partial );
			const literal = attributes[name];
			if ( literal===EMPTY ) {
				if ( '' in abbr ) { throw SyntaxError(`template 功能块的无值“.abbr:***”属性只能有一个`); }
				abbr[''] = { tagName, class: '', attrs: null };
			}
			else {
				if ( !TEMPLATE_ABBR_COLON_.test(literal) ) { throw SyntaxError(`template 功能块的“${name}”属性语法错误：\n${literal}`); }
				const pairs = literal.split(';');
				let index = pairs.length;
				while ( index ) {
					const tokens = pairs[--index]!.match(TOKENS);
					if ( tokens ) {
						const xName :string = tokens[0]!;
						if ( xName in abbr ) { throw SyntaxError(`template 功能块的“${name}”属性值中存在重复的条目“${xName}”`); }
						abbr[xName] = { tagName, class: NameAs__Key__(xName), attrs: null };
					}
				}
			}
		}
	}
	
	return abbr;
};

import type Attributes from './Attributes';
import type Null from '.null';