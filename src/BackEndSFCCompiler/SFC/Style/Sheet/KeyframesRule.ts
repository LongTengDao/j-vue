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
	private readonly keyword :string;
	keyframesNameLiteral :string = '';
	private blocked :boolean = false;
	get block () { return true as const; }
	
	constructor (parent :Sheet | DeclarationList, keyword :string) {
		super();
		this.parent = parent;
		this.keyword = keyword;
	}
	
	appendToken (this :KeyframesRule) :Sheet | DeclarationList | KeyframesRule | QualifiedRule | void {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.ident:
				if ( this.blocked ) {
					if ( !is.from(TOKEN.literal) && !is.to(TOKEN.literal) ) { return; }
					const qualifiedRule = new QualifiedRule(this);
					this.push(qualifiedRule);
					return qualifiedRule.appendToken(true) as QualifiedRule;
				}
				else {
					const { keyframesNameLiteral } = this;
					if ( keyframesNameLiteral ) { return; }
					if ( is.none(TOKEN.literal) || notCustomIdent(TOKEN.literal) ) { return; }
					this.keyframesNameLiteral = TOKEN.literal;
					return this;
				}
			case TOKEN.string:
				if ( this.keyframesNameLiteral ) { return; }
				this.keyframesNameLiteral = TOKEN.literal;
				return this;
			case '{':
				if ( !this.keyframesNameLiteral || this.blocked ) { return; }
				this.blocked = true;
				return this;
			case '}':
				if ( !this.blocked ) { return; }
				return this.parent;
			case TOKEN.percentage:
				if ( !this.blocked ) { return; }
				const qualifiedRule = new QualifiedRule(this);
				this.push(qualifiedRule);
				return qualifiedRule.appendToken() as QualifiedRule;
		}
	}
	
	get cssText () :string {
		const { keyframesNameLiteral } = this;
		let blockText = '';
		for ( let index = this.length; index; ) {
			blockText = this[--index].cssText+blockText;
		}
		return `@${this.keyword}${keyframesNameLiteral.startsWith('"') || keyframesNameLiteral.startsWith('\'') ? '' : ' '}${keyframesNameLiteral}{${blockText}}`;
	}
	
	* beautify (this :KeyframesRule, tab :string = '\t') :Generator<string, void, any> {
		yield `@${this.keyword} ${this.keyframesNameLiteral} {`;
		for ( let index = 0, { length } = this; index<length; ++index ) {
			for ( const line of this[index].beautify(tab) ) {
				yield tab+line;
			}
		}
		yield `}`;
	}
	
};

freeze(KeyframesRule.prototype);

type Sheet = import('./').default;
type DeclarationList = import('./AtRule').DeclarationList;