import SyntaxError from '.SyntaxError';
import throwSyntaxError from '.throw.SyntaxError';

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
const ws = /\t\n\f\r /;
const ident_token = newRegExp`
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
			(?:
				${string_token}
				[${ws}]*
			)?
			\)
		)
	)
|
	[dD][oO][mM][aA][iI][nN]
	\(
	(?!
		[${ws}]*
		(?:
			[a-zA-Z\d\-.:]*
		|
			${string_token}
		)
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

function Numeric (literal :string) {
	const rest = literal.replace(number_token, '');
	return rest ? rest==='%' ? percentage : dimension : number;
}

export type Type = 'c' | 'w' | 'i' | 'a' | 'f' | 'h' | 's' | 'n' | 'd' | 'p' | 'u' | ''
	| '!' | '$' | '%' | '&' | '(' | ')' | '*' | '+' | ',' | '-' | '.' | '/' | ':'// '#'
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
			if ( literal.endsWith('"') && literal!=='"' ) { return string; }
			throw SyntaxError(`存在未闭合的字符串`);
		case '#':
			return hash;
		case '$':
		case '%':
		case '&':
			return literal as '$' | '%' | '&';
		case '\'':
			if ( literal.endsWith('\'') && literal!=='\'' ) { return string; }
			throw SyntaxError(`存在未闭合的字符串`);
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
			if ( literal==='-->' ) { throw SyntaxError(`CSS 中不需要 -->`); }
			break;
		case '.':
			return literal==='.' ? literal : Numeric(literal);
		case '/':
			if ( literal==='/' ) { return literal; }
			literal = literal.replace(COMMENT, '');
			if ( literal ) {
				if ( literal.startsWith('/') ) { throw SyntaxError(`存在未闭合的注释`); }
				return whitespace;
			}
			return comment;
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
			if ( literal==='<' ) { return literal; }
			throw SyntaxError(`CSS 中不需要 <!--`);
		case '=':
		case '>':
		case '?':
			return literal as '=' | '>' | '?';
		case '@':
			return literal==='@' ? literal : at_keyword;
		case '[':
			return literal as '[';
		case '\\':
			if ( literal==='\\' ) { throw SyntaxError(`存在残破的转义`); }
			break;
		case ']':
		case '^':
		case '`':
		case '{':
		case '|':
		case '}':
		case '~':
			return literal as ']' | '^' | '`' | '{' | '|' | '}' | '~';
		case 'u':
		case 'U':
			if ( literal.length>3 && is.url(literal.slice(0, 3)) ) {
				const char = literal[3];
				if ( char==='(' ) {
					if ( URL_REST.test(literal.slice(4)) ) { return url; }
					throw SyntaxError(`url(bad)`);
				}
				else if ( char==='-' && is.prefix_(literal.slice(4)) ) {
					throw SyntaxError(`url-prefix(bad)`);
				}
			}
			break;
		case 'd':
		case 'D':
			if ( is.domain_(literal) ) { throw SyntaxError(`domain(bad)`); }
			break;
	}
	return literal.replace(ident_token, '') ? function$ : ident;
}

export let literal :string;
export let type :Type;

export function parse (sheet :Sheet, source :string) {
	if ( !source ) { return sheet; }
	const literals :string[] = source.match(TOKEN)!;
	let layer :Layer = sheet;
	const { length } = literals;
	let index = 0;
	do {
		type = Type(literal = literals[index]);
		layer = layer.appendToken() || throwSyntaxError(`CSS 中出现了上下文不允许的内容 ${literal}：\n${literals.slice(0, index).join('')}`);
	}
	while ( ++index<length )
	return layer;
}

export function clear () { literal = ''; }

type Layer = { parent? :Layer, appendToken () : Layer | void };
type Sheet = import('./').default;