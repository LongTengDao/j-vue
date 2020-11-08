import Array from '.Array';
import freeze from '.Object.freeze';

import * as is from './is';
import * as TOKEN from './TOKEN';
import QualifiedRule from './QualifiedRule';

const isCSSWideKeywords = (literal :string) => is.inherit(literal) || is.initial(literal) || is.unset(literal);
const notCustomIdent = (literal :string) => is.default(literal) || isCSSWideKeywords(literal);

export default class KeyframesRule extends Array<QualifiedRule> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.KeyframesRule'; }
	
	readonly parent :Sheet | DeclarationList;
	readonly #keyword :string;
	keyframesNameLiteral :string = '';
	#blocked :boolean = false;
	get block () { return true as const; }
	
	constructor (parent :Sheet | DeclarationList, keyword :string) {
		super();
		this.parent = parent;
		this.#keyword = keyword;
		return this;
	}
	
	appendToken (this :KeyframesRule) :Sheet | DeclarationList | KeyframesRule | QualifiedRule | null {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.ident:
				if ( this.#blocked ) {
					if ( !is.from(TOKEN.literal) && !is.to(TOKEN.literal) ) { break; }
					const qualifiedRule = new QualifiedRule(this);
					this[this.length] = qualifiedRule;
					return qualifiedRule.appendToken(true) as QualifiedRule;
				}
				else {
					const { keyframesNameLiteral } = this;
					if ( keyframesNameLiteral ) { break; }
					if ( is.none(TOKEN.literal) || notCustomIdent(TOKEN.literal) ) { break; }
					this.keyframesNameLiteral = TOKEN.literal;
					return this;
				}
			case TOKEN.string:
				if ( this.keyframesNameLiteral ) { break; }
				this.keyframesNameLiteral = TOKEN.literal;
				return this;
			case '{':
				if ( !this.keyframesNameLiteral || this.#blocked ) { break; }
				this.#blocked = true;
				return this;
			case '}':
				if ( !this.#blocked ) { break; }
				return this.parent;
			case TOKEN.percentage:
				if ( !this.#blocked ) { break; }
				const qualifiedRule = new QualifiedRule(this);
				this[this.length] = qualifiedRule;
				return qualifiedRule.appendToken() as QualifiedRule;
		}
		return null;
	}
	
	get cssText () :string {
		const { keyframesNameLiteral } = this;
		let blockText = '';
		let index = this.length;
		while ( index ) { blockText = this[--index].cssText+blockText; }
		return `@${this.#keyword}${keyframesNameLiteral[0]==='"' || keyframesNameLiteral[0]==='\'' ? '' : ' '}${keyframesNameLiteral}{${blockText}}`;
	}
	
	* beautify (this :KeyframesRule, tab :string = '\t') :Generator<string, void, undefined> {
		yield `@${this.#keyword} ${this.keyframesNameLiteral} {`;
		const { length } = this;
		let index = 0;
		while ( index!==length ) {
			for ( const line of this[index++].beautify(tab) ) {
				yield tab+line;
			}
		}
		yield `}`;
	}
	
};

freeze(KeyframesRule.prototype);

import type Sheet from './';
import type { DeclarationList } from './AtRule';