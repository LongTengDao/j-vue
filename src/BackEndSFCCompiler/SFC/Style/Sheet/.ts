import Array from '.Array';
import SyntaxError from '.SyntaxError';
import freeze from '.Object.freeze';
import warnGlobal from '.throw.Error';

import { isAliasName } from '../../RE';
import * as is from './is';
import * as TOKEN from './TOKEN';
import QualifiedRule from './QualifiedRule';
import AtRule from './AtRule';
import KeyframesRule from './KeyframesRule';

const NULL_SURROGATE = /[\x00\uD800-\uDFFF]/u;
const NON_PRINTABLE = /[\x00-\x08\x0B\x0E-\x1F\x7F]/;
const NOT_CHANGES = /\\.|[^\\\x80-\x9F]+/gs;

function replaceComponentName (rules :Sheet | import('./AtRule').DeclarationList, start :number, abbr :Replacer) {
	for ( let index = start, { length } = rules; index<length; ++index ) {
		const rule = rules[index];
		switch ( rule.constructor ) {
			case QualifiedRule:
				const { typeSelectors } = rule as QualifiedRule;
				for ( let index = 0, { length } = typeSelectors; index<length; ++index ) {
					const typeSelector = typeSelectors[index];
					const { cssText } = typeSelector;
					if ( isAliasName(cssText) ) { typeSelector.cssText = abbr(cssText); }
				}
				break;
			case AtRule:
				const { block } = rule as AtRule;
				if ( block ) { replaceComponentName(block, 0, abbr); }
				break;
		}
	}
}

function checkScoped (rules :Sheet | import('./AtRule').DeclarationList, start :number, _checkScoped :(literal :string) => boolean) {
	for ( let index = start, { length } = rules; index<length; ++index ) {
		const rule = rules[index];
		switch ( rule.constructor ) {
			case QualifiedRule:
				const { classSelectors } = rule as QualifiedRule;
				for ( let index = 0, { length } = classSelectors; index<length; ++index ) {
					const { literal } = classSelectors[index];
					_checkScoped(literal) || warnGlobal(`.${literal} 将对全局生效`);
				}
				break;
			case AtRule:
				const { block } = rule as AtRule;
				if ( block ) { checkScoped(block, 0, _checkScoped); }
				break;
			case KeyframesRule:
				const { keyframesNameLiteral } = rule as KeyframesRule;
				_checkScoped(keyframesNameLiteral.startsWith('"') || keyframesNameLiteral.startsWith('\'') ? keyframesNameLiteral.slice(1, -1) : keyframesNameLiteral) || warnGlobal(`@keyframes ${keyframesNameLiteral} 将对全局生效`);
				break;
		}
	}
}

export default class Sheet extends Array<AtRule | KeyframesRule | QualifiedRule> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet'; }
	
	private imports_length = 0;
	private namespaces_length = 0;
	
	constructor (inner :string, { abbr } :import('../').Private) {
		super();
		if ( !inner ) { return; }
		if ( inner[0]==='\uFEFF' ) { throw SyntaxError(`CSS 中 UTF BOM（U+FEFF）算作普通字符，处于起始位置时很可能是误用`); }
		if ( NULL_SURROGATE.test(inner) ) { throw SyntaxError(`CSS 中 NUL（U+00）或残破的代理对码点（U+D800〜U+DFFF）字面量会被替换为 U+FFFD，请避免使用`); }
		if ( NON_PRINTABLE.test(inner) ) { throw SyntaxError(`CSS 中不能出现除 TAB、LF、FF、CR 以外的控制字符字面量`); }
		if ( inner.replace(NOT_CHANGES, '') ) { throw SyntaxError(`U+80～U+9F 字面量在 CSS 2 和 3 之间表现不同，请避免使用`); }
		try { TOKEN.parse(this, inner); }
		finally { TOKEN.clear(); }
		abbr && replaceComponentName(this, this.imports_length+this.namespaces_length, abbr);
	}
	
	checkScoped (_checkScoped :(literal :string) => boolean) {
		checkScoped(this, this.imports_length+this.namespaces_length, _checkScoped);
	}
	
	appendToken (this :Sheet) :Sheet | AtRule | KeyframesRule | QualifiedRule | SquareBracketBlock | Declaration | void {
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
					if ( this.length!==this.imports_length ) { return; }
					++this.imports_length;
					atRule = new AtRule(this, name);
				}
				else if ( is.namespace(name) ) {
					if ( this.length!==this.imports_length+this.namespaces_length ) { return; }
					++this.namespaces_length;
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
		for ( let index = 0, { length } = this; index<length; ++index ) {
			cssText += this[index].cssText;
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