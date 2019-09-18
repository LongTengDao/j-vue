import { newRegExp } from '@ltd/j-regexp';

export const NONCHARACTER = newRegExp('u')`[
	\uFDD0-\uFDEF
	\uFFFE\u{1FFFE}\u{2FFFE}\u{3FFFE}\u{4FFFE}\u{5FFFE}\u{6FFFE}\u{7FFFE}\u{8FFFE}\u{9FFFE}\u{AFFFE}\u{BFFFE}\u{CFFFE}\u{DFFFE}\u{EFFFE}\u{FFFFE}\u{10FFFE}
	\uFFFF\u{1FFFF}\u{2FFFF}\u{3FFFF}\u{4FFFF}\u{5FFFF}\u{6FFFF}\u{7FFFF}\u{8FFFF}\u{9FFFF}\u{AFFFF}\u{BFFFF}\u{CFFFF}\u{DFFFF}\u{EFFFF}\u{FFFFF}\u{10FFFF}
]`;
export const CONTROL_CHARACTER = /[\x01-\x08\x0B\x0E-\x1F\x7F-\x9F]/;

const ASCII_WHITESPACE = /[\t\n\f\r ]/;
const ASCII_ALPHA = /[a-zA-Z]/;

export const TOKENS = /[^\s=;]+/g;
export const AliasName = /[A-Z][\w\-]*/;////
export const localOrComponentName = /[A-Za-z][\w\-]*/;////
export const localName = /[a-z][a-z0-9\-]*/;////
export const className = /[_a-zA-Z][\w\-]*/;////

const ATTRIBUTE_NAME = /[^\0\t\n\f\r "'<>/=]+/;
const UNQUOTED_ATTRIBUTE_VALUE = /[^\0\t\n\f\r "'=<>`]+/;//// /[^\t\n\f\r "'=<>`][^\t\n\f\r >]*|(?=>)/; // HTML5 以前的标准宽松一些，实际 HTML 解析则更宽松。但 jVue 目前的整体设计原则是抛出一切不规范的错误，另外顺带提示反引号这个十分特殊的 IE 漏洞的存在
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
			"[^\0"]*"
			|
			'[^\0']*'
			|
			${UNQUOTED_ATTRIBUTE_VALUE}
		)
	)?`;

const TAG_NAME = newRegExp`${ASCII_ALPHA}[^\0\t\n\f\r />]*`;
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
