import SyntaxError from '.SyntaxError';
import throwSyntaxError from '.throw.SyntaxError';

import { newRegExp } from '@ltd/j-regexp';

import * as is from './is';

export const nonASCII = /\x80-\uFFFF/;
const hex_digit = /[0-9A-F]/i;
const escape = newRegExp('i')`
	\\
	(?:
		${hex_digit}{1,6}
		(?:[\t\n\f ]|\r\n?)?
		|
		[^\n\f\r]
	)
`;
const ws = /\t\n\f\r /;
export const ident_token_start = newRegExp('i')`
	(?:
		-
		(?:
			-
		|
			[a-z_${nonASCII}]
		|
			${escape}
		)
	|
		[a-z_${nonASCII}]
	|
		${escape}
	)
`;
export const ident_token = newRegExp('i')`
	${ident_token_start}
	(?:
		[-\w${nonASCII}]
	|
		${escape}
	)*
`;
const hash_token = newRegExp('i')`
	#
	(?:
		[-\w${nonASCII}]
	|
		${escape}
	)*
`;
const string_token = newRegExp`
	"
	(?:\\(?:\r\n?|.)|[^\\"\n\f\r])*
	"?
|
	'
	(?:\\(?:\r\n?|.)|[^\\'\n\f\r])*
	'?
`;
const url_token = newRegExp('i')`
	url
	(?:
		\(
		[${ws}]*
		(?![${ws}"'])
		(?:
			${escape}
		|
			[^)]
		)*
		\)?
	|
		-prefix\([${ws}]*\)
	)
|
	domain\([${ws}]*	[a-z\d\-.:]*	[${ws}]*\)
`;
const number_token = newRegExp('i')`
	[-+]?
	(?:\d+(?:\.\d+)?|\.\d+)
	(?:e[+-]?\d+)?
`;
const CDO_token = '<!--';
const CDC_token = '-->';

const TOKENS = newRegExp('gis')`
	(?:
		[${ws}]+
	|
		/\*.*?\*/
	)+
|
	/\*.*
|
	${url_token}
	|
	${ident_token}\(?
	|
	@${ident_token}
|
	${number_token}(?:${ident_token}|%)?
|
	${hash_token}
|
	${string_token}
|
	${CDO_token}
|
	${CDC_token}
|
	.
`;

const BAD_URL = newRegExp('i')`
	^
	url\(
	(?!
	[${ws}]*
	(?:${escape}|[^${ws}"'()\\])*
	[${ws}]*
	\)
	$
	)
`;
const NUMBER = /[\d.]/;
const COMMENT = /\/\*.*?\*\//gs;
const IDENT = newRegExp('i')`
	^
	${ident_token}
	$
`;
const FUNCTION = newRegExp('i')`
	^
	${ident_token}\(
	$
`;

export const comment = 'c';
export const whitespace = 'w';
export const ident = 'i';
export const at_keyword = 'a';
export const function$ = 'f';
export const hash = 'h';
export const string = 's';
export const number = 'n';
export const dimension = 'd';
export const percentage = 'p';
export const url = 'u';

const IdentLike = (literal :string) =>
	IDENT.test(literal) ? ident :
		FUNCTION.test(literal) ?
			is.url_prefix_(literal) ? throwSyntaxError(`function-token "url-prefix" 不在标准中，而它此刻的内容又存在歧义`) :
				is.domain_(literal) ? throwSyntaxError(`function-token "domain" 不在标准中，而它此刻的内容又存在歧义`) :
					function$ :
			BAD_URL.test(literal) ? throwSyntaxError(`bad-url-token`) :
				url;

const Numeric = (literal :string) => {
	const rest = literal.replace(number_token, '');
	return rest ? rest==='%' ? percentage : dimension : number;
};

export type Type = 'c' | 'w' | 'i' | 'a' | 'f' | 'h' | 's' | 'n' | 'd' | 'p' | 'u'// | '\\'
	| '!' | '$' | '%' | '&' | '(' | ')' | '*' | '+' | ',' | '-' | '.' | '/' | ':'// | '#'
	| ';' | '<' | '=' | '>' | '?' | '@' | '[' | ']' | '^' | '`' | '{' | '|' | '}' | '~';
const Type = (literal :string) :Type => {
	switch ( literal[0] ) {
		case '\t':
		case '\n':
		case '\f':
		case '\r':
		case ' ':
			return whitespace;
		case '!':
			return literal as '!';
		case '"':
			return literal[literal.length - 1]==='"' && literal.length!==1 ? literal.includes('\t') ? throwSyntaxError(`CSS 2 不允许字符串中存在 TAB`) : string : throwSyntaxError(`bad-string-token`);
		case '#':
			return hash;
		case '$':
		case '%':
		case '&':
			return literal as '$' | '%' | '&';
		case '\'':
			return literal[literal.length - 1]==='\'' && literal.length!==1 ? literal.includes('\t') ? throwSyntaxError(`CSS 2 不允许字符串中存在 TAB`) : string : throwSyntaxError(`bad-string-token`);
		case '(':
		case ')':
		case '*':
			return literal as '(' | ')' | '*';
		case '+':
			return literal==='+' ? literal : Numeric(literal);
		case ',':
			return literal as ',';
		case '-':
			if ( literal==='-' ) { return literal; }
			if ( NUMBER.test(literal[1]) ) { return Numeric(literal); }
			if ( literal==='-->' ) { throw SyntaxError(`用于 SFC 的 CSS 中不应用到 CDC-token`); }
			break;
		case '.':
			return literal==='.' ? literal : Numeric(literal);
		case '/':
			if ( literal==='/' ) { return literal; }
			literal = literal.replace(COMMENT, '');
			return literal
				? literal[0]==='/'
					? throwSyntaxError(`bad-comment-token`)
					: whitespace
				: comment;
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			return Numeric(literal);
		case ':':
		case ';':
			return literal as ':' | ';';
		case '<':
			return literal==='<' ? literal : throwSyntaxError(`用于 SFC 的 CSS 中不应用到 CDO-token`);
		case '=':
		case '>':
		case '?':
			return literal as '=' | '>' | '?';
		case '@':
			return literal==='@' ? literal : at_keyword;
		case '[':
			return literal as '[';
		case '\\':
			if ( literal==='\\' ) { throw SyntaxError(`bad escape`); }
			break;
		case ']':
		case '^':
		case '`':
		case '{':
		case '|':
		case '}':
		case '~':
			return literal as ']' | '^' | '`' | '{' | '|' | '}' | '~';
	}
	return IdentLike(literal);
};

export let literal :string = '';
export let type :Type;

export const parse = (sheet :Sheet, source :string) :void => {
	let layer :Layer = sheet;
	const literals :string[] = source.match(TOKENS) ?? [];
	const { length } = literals;
	let types = '';
	let index = 0;
	while ( index!==length ) { types += Type(literals[index++]); }
	for ( index = 0; index!==length; ++index ) {
		type = ( types as string & { [index :number] :Type } )[index];
		literal = literals[index];
		layer = layer.appendToken() ?? throwSyntaxError(`CSS 中出现了 ${layer.constructor.name} 上下文不允许的内容“${literal}”：\n${literals.slice(0, index).join('')}`);
	}
	layer===sheet || layer.parent===sheet && !layer.block || throwSyntaxError(`CSS 终止处尚有未完成的结构`);
};

export const typeSelectors :{ [index :number] :TypeSelector, length :number } = [];

export const clear = () :void => {
	literal = '';
	typeSelectors.length = 0;
};

type Layer = { parent? :Layer, block? :any, appendToken () :Layer | null };

import type Sheet from './';
import type { TypeSelector } from './Selector';