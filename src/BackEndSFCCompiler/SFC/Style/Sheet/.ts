import Array from '.Array';
import SyntaxError from '.SyntaxError';
import freeze from '.Object.freeze';
import warnGlobal from '.throw.Error';

import { newRegExp } from '@ltd/j-regexp';

import KEYS from '../../../../FrontEndRuntimeDependency/Scope/KEYS';

import _ from '../../private';
import { AliasName } from '../../RE';
import * as is from './is';
import * as TOKEN from './TOKEN';
import QualifiedRule from './QualifiedRule';
import AtRule from './AtRule';
import KeyframesRule from './KeyframesRule';
import ImportRule from './ImportRule';

const NULL_SURROGATE = /[\x00\uD800-\uDFFF]/u;
const NON_PRINTABLE = /[\x00-\x08\x0B\x0E-\x1F\x7F]/;
const NOT_CHANGES = /\\.|[^\\\x80-\x9F]+/gs;
const __KEY__ = newRegExp('i')`
	^
	__${KEYS}__
	$
`;

function isScoped (literal :string) { return __KEY__.test(literal); }

function replaceComponentName (rules :Sheet | import('./AtRule').DeclarationList, abbr :Replacer | undefined, isScoped :(literal :string) => boolean) {
	for ( let index = rules.length; index; ) {
		const rule = rules[--index];
		if ( rule instanceof QualifiedRule ) {
			const { typeSelectors, classSelectors } = rule;
			if ( abbr ) {
				for ( let index = typeSelectors.length; index; ) {
					const typeSelector = typeSelectors[--index];
					const { cssText } = typeSelector;
					if ( AliasName.test(cssText) ) { typeSelector.cssText = abbr(cssText); }
				}
			}
			for ( let index = classSelectors.length; index; ) {
				const { literal } = classSelectors[--index];
				isScoped(literal) || warnGlobal(`.${literal} 将对全局生效`);
			}
		}
		else if ( rule instanceof AtRule ) {
			const { block } = rule;
			if ( block ) { replaceComponentName(block, abbr, isScoped); }
		}
		else if ( rule instanceof KeyframesRule ) {
			const literal = rule.keyframesNameLiteral;
			isScoped(literal.startsWith('"') || literal.startsWith('\'') ? literal.slice(1, -1) : literal) || warnGlobal(`@keyframes ${literal} 将对全局生效`);
		}
	}
}

export default class Sheet extends Array<AtRule | KeyframesRule | ImportRule | QualifiedRule> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet'; }
	
	constructor (inner :string, { abbr, sfc: { template } } :import('../').Private) {
		if ( !inner ) { return; }
		if ( inner[0]==='\uFEFF' ) { throw SyntaxError(`CSS 中 UTF BOM（U+FEFF）算作普通字符，处于起始位置时很可能是误用`); }
		if ( NULL_SURROGATE.test(inner) ) { throw SyntaxError(`CSS 中 NUL（U+00）或残破的代理对码点（U+D800〜U+DFFF）字面量会被替换为 U+FFFD，请避免使用`); }
		if ( NON_PRINTABLE.test(inner) ) { throw SyntaxError(`CSS 中不能出现除 TAB、LF、FF、CR 以外的控制字符字面量`); }
		if ( inner.replace(NOT_CHANGES, '') ) { throw SyntaxError(`U+80～U+9F 字面量在 CSS 2 和 3 之间表现不同，请避免使用`); }
		super();
		try { TOKEN.parse(this, inner); }
		finally { TOKEN.clear(); }
		const keys = template && _(template).keys;
		replaceComponentName(this, abbr, keys ? function isScoped (literal :string) { return __KEY__.test(literal) && keys.includes(literal.slice(2, -2)); } : isScoped);
	}
	
	appendToken (this :Sheet) :Sheet | AtRule | KeyframesRule | ImportRule | QualifiedRule | SquareBracketBlock | Declaration | void {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.at_keyword:
				const name = TOKEN.literal.slice(1);
				if ( is.charset(name) ) {
					if ( this.length ) { return; }
					throw SyntaxError(`用于 SFC 的 CSS 中不应用到 @charset`);// return new AtRule(this, name);
				}
				let atRule;
				if ( is._import(name) ) {
					for ( let index = this.length; index; ) {
						const rule = this[--index];
						if ( !( rule instanceof ImportRule ) ) { return; }
					}
					atRule = new ImportRule(this, name);
				}
				else if ( is.namespace(name) ) {
					for ( let index = this.length; index; ) {
						const rule = this[--index];
						if ( !( rule instanceof ImportRule ) && !( rule instanceof AtRule && is.namespace(rule.name) ) ) { return; }
					}
					atRule = new AtRule(this, name);
				}
				else { atRule = is._keyframes(name) ? new KeyframesRule(this, name) : new AtRule(this, name); }
				this.push(atRule);
				return atRule;
			case TOKEN.ident:
			case '*':
			case '.':
			case ':':
			case '[':
			case '|':
			case '$':
			case TOKEN.hash:
				const styleRule = new QualifiedRule(this);
				this.push(styleRule);
				return styleRule.appendToken() as SquareBracketBlock | Declaration;
		}
	}
	
	get cssText () :string {
		let cssText = '';
		for ( let index = this.length; index; ) {
			const rule = this[--index];
			if ( !( rule instanceof ImportRule ) || rule.block ) {
				cssText = rule.cssText+cssText;
			}
		}
		for ( let index = this.length; index; ) {
			const rule = this[--index];
			if ( rule instanceof ImportRule && !rule.block ) {
				cssText = rule.cssText+cssText;
			}
		}
		return cssText;
	}
	
	* beautify (this :Sheet, tab :string = '\t') :IterableIterator<string> {
		const { length } = this;
		for ( let index = 0; index<length; ++index ) {
			const rule = this[index];
			if ( rule instanceof ImportRule && !rule.block ) {
				yield * rule.beautify(tab);
			}
		}
		for ( let index = 0; index<length; ++index ) {
			const rule = this[index];
			if ( !( rule instanceof ImportRule ) || rule.block ) {
				yield * rule.beautify(tab);
			}
		}
	}
	
};

freeze(Sheet.prototype);

type Replacer = import('../').Replacer;
type Declaration = import('./Declaration').default;
type SquareBracketBlock = import('./SquareBracketBlock').default;