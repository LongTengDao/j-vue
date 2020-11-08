import Array from '.Array';
import SyntaxError from '.SyntaxError';
import ReferenceError from '.ReferenceError';
import freeze from '.Object.freeze';

import { isAliasName } from '../../RE';
import * as is from './is';
import * as TOKEN from './TOKEN';
import QualifiedRule from './QualifiedRule';
import AtRule from './AtRule';
import KeyframesRule from './KeyframesRule';
import ImportRule from './ImportRule';

const NULL_SURROGATE = /[\x00\uD800-\uDFFF]/u;
const NON_PRINTABLE = /[\x00-\x08\x0B\x0E-\x1F\x7F]/;
const NOT_CHANGES = /\\.|[^\\\x80-\x9F]+/gs;

const checkScoped = (rules :Sheet | import('./AtRule').DeclarationList, start :number, __KEY__ :{ readonly test :(this :object, string :string) => boolean }) :void => {
	const { length } = rules;
	let index = start;
	while ( index!==length ) {
		const rule = rules[index++];
		switch ( rule.constructor ) {
			case QualifiedRule:
				const { classSelectors } = rule as QualifiedRule;
				const { length } = classSelectors;
				let index = 0;
				do {
					const classSelectorsPART = classSelectors[index];
					const { length } = classSelectorsPART;
					if ( length ) {
						let index = 0;
						do { if ( !__KEY__.test(classSelectorsPART[index].literal) ) { throw ReferenceError(`.${classSelectorsPART[index].literal} 将对全局生效`); } }
						while ( ++index!==length )
					}
					else { throw ReferenceError(`${( rule as QualifiedRule ).selectorTextAt(index)} 将对全局生效`); }
				}
				while ( ++index!==length )
				break;
			case AtRule:
				const { block } = rule as AtRule;
				block && checkScoped(block, 0, __KEY__);
				break;
			case KeyframesRule:
				const { keyframesNameLiteral } = rule as KeyframesRule;
				if ( !__KEY__.test(keyframesNameLiteral[0]==='"' || keyframesNameLiteral[0]==='\'' ? keyframesNameLiteral.slice(1, -1) : keyframesNameLiteral) ) { throw ReferenceError(`@keyframes ${keyframesNameLiteral} 将对全局生效`); }
				break;
		}
	}
};

export default class Sheet extends Array<ImportRule | AtRule | KeyframesRule | QualifiedRule> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet'; }
	
	#imports_length :number = 0;
	#namespaces_length :number = 0;
	
	constructor (inner :string, abbr? :Replacer) {
		super();
		if ( !inner ) { return; }
		if ( inner[0]==='\uFEFF' ) { throw SyntaxError(`CSS 中 UTF BOM（U+FEFF）算作普通字符，处于起始位置时很可能是误用`); }
		if ( NULL_SURROGATE.test(inner) ) { throw SyntaxError(`CSS 中 NUL（U+00）或残破的代理对码点（U+D800〜U+DFFF）字面量会被替换为 U+FFFD，请避免使用`); }
		if ( NON_PRINTABLE.test(inner) ) { throw SyntaxError(`CSS 中不能出现除 TAB、LF、FF、CR 以外的控制字符字面量`); }
		if ( inner.replace(NOT_CHANGES, '') ) { throw SyntaxError(`U+80～U+9F 字面量在 CSS 2 和 3 之间表现不同，请避免使用`); }
		try {
			TOKEN.parse(this, inner);
			if ( abbr ) {
				const { length } = TOKEN.typeSelectors;
				let index = 0;
				while ( index!==length ) {
					const typeSelector = TOKEN.typeSelectors[index++];
					let { cssText } = typeSelector;
					/* AliasName: */if ( isAliasName(cssText) ) {
						typeSelector.cssText = typeSelector.ns_
							? ( cssText = abbr(cssText) )[0]==='.'//!newRegExp('i')`^${TOKEN.ident_token_start}`.test(cssText = abbr(cssText))
								? '*'+cssText
								: cssText
							: abbr(cssText);
					}
				}
			}
		}
		finally { TOKEN.clear(); }
		return this;
	}
	
	checkScoped (__KEY__ :{ readonly test :(this :object, string :string) => boolean }) :void {
		checkScoped(this, this.#imports_length+this.#namespaces_length, __KEY__);
	}
	
	appendToken (this :Sheet) :Sheet | ImportRule | AtRule | KeyframesRule | QualifiedRule | SquareBracketBlock | Declaration | null {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.at_keyword:
				const name = TOKEN.literal.slice(1);
				if ( is.charset(name) ) {
					if ( this.length ) { break; }
					throw SyntaxError(`用于 SFC 的 CSS 中不应用到 @charset`);// return new AtRule(this, name);
				}
				let atRule;
				if ( is.import(name) ) {
					if ( this.length!==this.#imports_length ) { break; }
					++this.#imports_length;
					atRule = new ImportRule(this);
				}
				else if ( is.namespace(name) ) {
					if ( this.length!==this.#imports_length+this.#namespaces_length ) { break; }
					++this.#namespaces_length;
					atRule = new AtRule(this, name);
				}
				else { atRule = is.keyframes(name) ? new KeyframesRule(this, name) : new AtRule(this, name); }
				return this[this.length] = atRule;
			case TOKEN.ident:
			case '*':
			case '.':
			case ':':
			case '[':
			///case '|':
			case '$':
			case TOKEN.hash:
				const styleRule = new QualifiedRule(this);
				this[this.length] = styleRule;
				return styleRule.appendToken() as SquareBracketBlock | Declaration;
		}
		return null;
	}
	
	get cssText () :string {
		let cssText = '';
		let index = 0;
		const { length } = this;
		while ( index!==length ) { cssText += this[index++].cssText; }
		return cssText && cssText[cssText.length - 1]===';' ? cssText.slice(0, -1) : cssText;
	}
	
	* beautify (this :Sheet, tab :string = '\t') :Generator<string, void, undefined> {
		const { length } = this;
		let index = 0;
		while ( index!==length ) { yield * this[index++].beautify(tab); }
	}
	
};

freeze(Sheet.prototype);

import type { Replacer } from '../';
import type Declaration from './Declaration';
import type SquareBracketBlock from './SquareBracketBlock';