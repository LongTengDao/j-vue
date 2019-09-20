import SyntaxError from '.SyntaxError';
import throwSyntaxError from '.throw.SyntaxError';
import fromCodePoint from '.String.fromCodePoint';
import parseInt from '.parseInt';

import { newRegExp } from '@ltd/j-regexp';

import * as is from './is';

const nonASCII = /\x80-\uFFFF/;
const hex_digit = /[0-9A-Fa-f]/;
const escape = newRegExp`
	\\
	(?:
		${hex_digit}{1,6}
		(?:[\t\n\f ]|\r\n?)?
		|
		[^\n\f\r]
	)
`;
const ESCAPED = newRegExp`
	\\
	(?:
		(${hex_digit}{1,6})
		(?:[\t\n\f ]|\r\n?)?
		|
		[^\n\f\r]
	)
`;
const escapedReplacer = (match :string, p1 :string) => p1 ? fromCodePoint(parseInt(p1, 16)) : match.slice(1);
export const unescape = (literal :string) => literal.replace(ESCAPED, escapedReplacer);
const ws = /\t\n\f\r /;
export const ident_token = newRegExp`
	(?:
		--
	|
		-?
		(?:
			[A-Z_a-z${nonASCII}]
		|
			${escape}
		)
	)
	(?:
		[\-\w${nonASCII}]
	|
		${escape}
	)*
`;
const hash_token = newRegExp`
	#
	(?:
		[\-\w${nonASCII}]
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
const URL_VALUE = newRegExp`
	(?:
		${escape}
	|
		[^ws]
	)*
`;
export function valueOfURL (url_token :string) {
	const value = URL_VALUE.exec(url_token.slice(4, -1));
	return value ? value[0] : '';
}
const url_token = newRegExp`
	[uU][rR][lL]
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
		-[pP][rR][eE][fF][iI][xX]
		\(
		(?!
			[${ws}]*
			\)
		)
	)
|
	[dD][oO][mM][aA][iI][nN]
	\(
	(?!
		[${ws}]*
		[a-zA-Z\d\-.:]*
		[${ws}]*
		\)
	)
`;
const number_token = newRegExp`
	[-+]?
	(?:\d+(?:\.\d+|\d+)|\.\d+)
	(?:[eE][+-]?\d+)?
`;
const CDO_token = '<!--';
const CDC_token = '-->';

const TOKEN = newRegExp('gs')`
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

const URL_REST = newRegExp`
	^
	[${ws}]*
	(?:${escape}|[${ws}"'()\\])*
	[${ws}]*
	\)
	$
`;
const NUMBER = /[\d.]/;
const COMMENT = /\/\*.*?\*\//g;
const FUNCTION = newRegExp`
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

function IdentLike (literal :string) {
	if ( !literal.endsWith('(') || literal.endsWith('\\(') && !FUNCTION.test(literal) ) { return ident; }
	if ( is.url(literal.slice(0, 3)) ) {
		const char = literal[3];
		if ( char==='(' ) { return URL_REST.test(literal.slice(4)) ? url : throwSyntaxError(`bad-url-token`); }
		else if ( char==='-' && is.prefix_(literal.slice(4)) ) { throw SyntaxError(`function-token "url-prefix" 不在标准中，而它此刻的内容又存在歧义`); }
	}
	else if ( is.domain_(literal) ) { throw SyntaxError(`function-token "domain" 不在标准中，而它此刻的内容又存在歧义`); }
	return function$;
}

function Numeric (literal :string) {
	const rest = literal.replace(number_token, '');
	return rest ? rest==='%' ? percentage : dimension : number;
}

export type Type = 'c' | 'w' | 'i' | 'a' | 'f' | 'h' | 's' | 'n' | 'd' | 'p' | 'u'// | '\\'
	| '!' | '$' | '%' | '&' | '(' | ')' | '*' | '+' | ',' | '-' | '.' | '/' | ':'// | '#'
	| ';' | '<' | '=' | '>' | '?' | '@' | '[' | ']' | '^' | '`' | '{' | '|' | '}' | '~';
function Type (literal :string) :Type {
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
			return literal.endsWith('"') && literal!=='"' ? literal.includes('\t') ? throwSyntaxError(`CSS 2 不允许字符串中存在 TAB`) : string : throwSyntaxError(`bad-string-token`);
		case '#':
			return hash;
		case '$':
		case '%':
		case '&':
			return literal as '$' | '%' | '&';
		case '\'':
			return literal.endsWith('\'') && literal!=='\'' ? literal.includes('\t') ? throwSyntaxError(`CSS 2 不允许字符串中存在 TAB`) : string : throwSyntaxError(`bad-string-token`);
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
				? literal.startsWith('/')
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
}

export let literal :string = '';
export let type :Type;

export function parse (sheet :Sheet, source :string) {
	let layer :Layer = sheet;
	const literals :string[] = source.match(TOKEN) || [];
	const { length } = literals;
	let types = '';
	for ( let index = 0; index<length; ++index ) { types += Type(literals[index]); }
	for ( let index = 0; index<length; ++index ) {
		type = ( types as string & { [index :number] :Type } )[index];
		literal = literals[index];
		layer = layer.appendToken() || throwSyntaxError(`CSS 中出现了上下文不允许的内容 ${literal}：\n${literals.slice(0, index).join('')}`);
	}
	if ( layer!==sheet ) {
		const { parent } = layer;
		parent===sheet && !parent.block || throwSyntaxError(`CSS 终止处尚有未完成的结构`);
	}
}

export function clear () { literal = ''; }

type Layer = { parent? :Layer, block? :any, appendToken () : Layer | void };
type Sheet = import('./').default;