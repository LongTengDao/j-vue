import Error from '.Error';

import { newRegExp } from '@ltd/j-regexp';

import KEYS from '../../FrontEndRuntimeDependency/Scope/KEYS';

const KEY = newRegExp('i')`^${KEYS}$`;
export const NameIs__Key__ = (Name :string) :boolean => KEY.test(Name);
export const NameAs__Key__ = (Name :string) :string => {
	if ( KEY.test(Name) ) { return `__${Name}__`; }
	throw Error(`“${Name}”不满足自动生成动态值的条件`);
};

export const NONCHARACTER = newRegExp('u')`[
	\uFDD0-\uFDEF
	\uFFFE\u{1FFFE}\u{2FFFE}\u{3FFFE}\u{4FFFE}\u{5FFFE}\u{6FFFE}\u{7FFFE}\u{8FFFE}\u{9FFFE}\u{AFFFE}\u{BFFFE}\u{CFFFE}\u{DFFFE}\u{EFFFE}\u{FFFFE}\u{10FFFE}
	\uFFFF\u{1FFFF}\u{2FFFF}\u{3FFFF}\u{4FFFF}\u{5FFFF}\u{6FFFF}\u{7FFFF}\u{8FFFF}\u{9FFFF}\u{AFFFF}\u{BFFFF}\u{CFFFF}\u{DFFFF}\u{EFFFF}\u{FFFFF}\u{10FFFF}
]`;
export const CONTROL_CHARACTER = /[\x01-\x08\x0B\x0E-\x1F\x7F-\x9F]/;

export const ASCII_WHITESPACE = /[\t\n\f\r ]/;
const ASCII_ALPHA = /[A-Za-z]/;

export const TOKENS = /[^\t\n\f\r=; ]+/g;
const PCENCharWithoutDot = /[\-\w\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]/u.source.slice(1, -1);// /[\u{10000}-\u{EFFFF}]/u => /(?:[\uD800-\uDB7F][\uDC00-\uDFFF])/
export const NON_PCENChar = newRegExp('u')`
	[^.${PCENCharWithoutDot}]
`;
/* AliasName: */export const AliasName = newRegExp('u')`
	[A-Z][${PCENCharWithoutDot}]*
`;
/* AliasName: */const _AliasName_ = newRegExp('u')`^${AliasName}$`;
/* AliasName: */export const isAliasName = (name :string) => _AliasName_.test(name);
export const localOrComponentNameWithoutDot = newRegExp('u')`
	[A-Za-z][${PCENCharWithoutDot}]*
`;
const _localOrComponentNameDotable_ = newRegExp('u')`
	^
	[A-Za-z][.${PCENCharWithoutDot}]*
	$
`;
export const isLocalOrComponentNameDotable = (name :string) => _localOrComponentNameDotable_.test(name);
export const localNameWithoutDot = newRegExp('u')`
	[a-z][${PCENCharWithoutDot}]*
`;
export const className = newRegExp('u')`
	(?:
		-
		(?:
			-
		|
			[A-Z_a-z\x80-\u{10FFFF}]
		)
	|
		[A-Z_a-z\x80-\u{10FFFF}]
	)
	[-\w\x80-\u{10FFFF}]*
`;

const ATTRIBUTE_NAME = /[^\x00\t\n\f\r "'<>/=]+/;
const UNQUOTED_ATTRIBUTE_VALUE = /[^\x00\t\n\f\r "'=<>`]+/;//// /[^\t\n\f\r "'=<>`][^\t\n\f\r >]*|(?=>)/; // HTML5 以前的标准宽松一些，实际 HTML 解析则更宽松。但 jVue 目前的整体设计原则是抛出一切不规范的错误，另外顺带提示反引号这个十分特殊的 IE 漏洞的存在
export const ATTRIBUTE_NAME_VALUE = newRegExp`
	(${ATTRIBUTE_NAME})
	${ASCII_WHITESPACE}*
	=
	${ASCII_WHITESPACE}*
	(
		"[^"]*"
		|
		'[^']*'
		|
		${UNQUOTED_ATTRIBUTE_VALUE}
	)`;
export const ATTRIBUTE = newRegExp('g')`
	${ATTRIBUTE_NAME}
	(?:
		${ASCII_WHITESPACE}*
		=
		${ASCII_WHITESPACE}*
		(?:
			"[^\x00"]*"
			|
			'[^\x00']*'
			|
			${UNQUOTED_ATTRIBUTE_VALUE}
		)
	)?`;

const TAG_NAME = newRegExp`${ASCII_ALPHA}[^\x00\t\n\f\r />]*`;
export const TAG = newRegExp`
	^
	<
	(/?)
	(${TAG_NAME})
	((?:
		${ASCII_WHITESPACE}+
		${ATTRIBUTE}
	)*)
	${ASCII_WHITESPACE}*
	(/?)
	>
`;

export const TAG_EMIT_CHAR = /[\t\n\f\r />]/;
export const TAG_LIKE = newRegExp`
	<
	(?:
		/?${TAG_NAME}${TAG_EMIT_CHAR}
		|
		[!?]
	)
`;

export const IS_TAG = newRegExp`
	^
	<
	/?
	${TAG_NAME}
	${TAG_EMIT_CHAR}
`;
