import Array from '.Array';
import SyntaxError from '.SyntaxError';
import freeze from '.Object.freeze';

import * as is from './is';
import * as TOKEN from './TOKEN';
import TypeSelector from './TypeSelector';
import QualifiedRule from './QualifiedRule';
import AtRule from './AtRule';

const NULL_SURROGATE = /[\x00\uD800-\uDFFF]/u;
const NON_PRINTABLE = /[\x00-\x08\x0B\x0E-\x1F\x7F]/;
const NOT_CHANGES = /\\.|[^\\\x80-\x9F]+/gs;

function replaceComponentName (rules :Sheet | import('./AtRule').DeclarationList, abbr? :Replacer) {
	for ( let index = rules.length; index; ) {
		const rule = rules[--index];
		if ( abbr && rule instanceof QualifiedRule ) {
			const { typeSelectors } = rule;
			for ( let index = typeSelectors.length; index; ) {
				const typeSelector = typeSelectors[--index];
				typeSelector.cssText = abbr(typeSelector.cssText);
			}
		}
		else if ( rule instanceof AtRule ) {
			const { block } = rule;
			if ( block ) {
				if ( is.keyframes(rule.name) ) {
					for ( let index = block.length; index; ) {
						const qualifiedRule = block[--index] as QualifiedRule;
						const typeSelector = qualifiedRule[0];
						if ( typeSelector instanceof TypeSelector ) {
							qualifiedRule[0] = typeSelector.cssText;
							qualifiedRule.typeSelectors.length = 0;
						}
					}
				}
				else { replaceComponentName(block, abbr); }
			}
		}
	}
}

export default class Sheet extends Array<AtRule | QualifiedRule> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet'; }
	
	constructor (inner :string, abbr? :Replacer) {
		if ( !inner ) { return; }
		if ( inner[0]==='\uFEFF' ) { throw SyntaxError(`CSS 中 UTF BOM（U+FEFF）算作普通字符，处于起始位置时很可能是误用`); }
		if ( NULL_SURROGATE.test(inner) ) { throw SyntaxError(`CSS 中 NUL（U+00）或残破的代理对码点（U+D800〜U+DFFF）字面量会被替换为 U+FFFD，请避免使用`); }
		if ( NON_PRINTABLE.test(inner) ) { throw SyntaxError(`CSS 中不能出现除 TAB、LF、FF、CR 以外的控制字符字面量`); }
		if ( inner.replace(NOT_CHANGES, '') ) { throw SyntaxError(`U+80～U+9F 字面量在 CSS 2 和 3 之间表现不同，请避免使用`); }
		super();
		try { TOKEN.parse(this, inner); }
		finally { TOKEN.clear(); }
		replaceComponentName(this, abbr);
	}
	
	appendToken (this :Sheet) :Sheet | AtRule | QualifiedRule | SquareBracketBlock | Declaration | void {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.at_keyword:
				const name = TOKEN.literal.slice(1);
				if ( is.charset(name) ) {
					//if ( this.length ) { return; }
					throw SyntaxError(`用于 SFC 的 CSS 中不应用到 @charset`);// return new AtRule(this, name);
				}
				//if ( is._import(name) ) {
				//	for ( let index = this.length; index; ) {
				//		const rule = this[--index];
				//		if ( !( rule instanceof AtRule ) || !is._import(rule.name) ) { return; }
				//	}
				//}
				const atRule = new AtRule(this, name);
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
			cssText = this[--index].cssText+cssText;
		}
		return cssText;
	}
	
	* beautify (this :Sheet, tab :string = '\t') :IterableIterator<string> {
		for ( let index = 0, { length } = this; index<length; ++index ) {
			yield * this[index].beautify(tab);
		}
	}
	
};

freeze(Sheet.prototype);

type Replacer = import('../').Replacer;
type Declaration = import('./Declaration').default;
type SquareBracketBlock = import('./SquareBracketBlock').default;