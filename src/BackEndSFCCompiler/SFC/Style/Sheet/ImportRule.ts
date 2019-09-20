import Array from '.Array';
import freeze from '.Object.freeze';

import * as is from './is';
import * as TOKEN from './TOKEN';
import ParenthesisBlock from './ParenthesisBlock';

function MediaQueryList (rule :ImportRule) {
	let mediaQueryList = '';
	for ( let index = rule.length; index; ) {
		const child = rule[--index];
		mediaQueryList = ( typeof child==='string' ? child : child.cssText )+mediaQueryList;
	}
	return mediaQueryList;
}

export default class ImportRule extends Array<ParenthesisBlock | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.ImportRule'; }
	
	readonly parent :Sheet;
	private readonly keyword :string;
	private urlLiteral :ParenthesisBlock | string = '';
	get block () { return !!this.mediaBlock || !this.urlLiteral; }
	
	constructor (parent :Sheet, keyword :string) {
		super();
		this.parent = parent;
		this.keyword = keyword;
	}
	
	appendToken (this :ImportRule) :Sheet | ImportRule | ParenthesisBlock | void {
		if ( this.urlLiteral ) {
			switch ( TOKEN.type ) {
				case TOKEN.whitespace:
					this.push(' ');
					return this;
				case TOKEN.function$:
				case '(':
					const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
					this.push(parenthesisBlock);
					return parenthesisBlock;
				case TOKEN.ident:
				case ',':
					this.push(TOKEN.literal);
					return this;
				case ';':
					return this.parent;
				case TOKEN.comment:
					this.push('/**/');
					return this;
			}
		}
		else {
			switch ( TOKEN.type ) {
				case TOKEN.whitespace:
				case TOKEN.comment:
					return this;
				case TOKEN.function$:
					const name = TOKEN.literal.slice(0, -1);
					if ( !is.url(name) ) { return; }
					return this.urlLiteral = new ParenthesisBlock(this, name);
				case TOKEN.string:
				case TOKEN.url:
					this.urlLiteral = TOKEN.literal;
					return this;
			}
		}
	}
	
	get cssText () :string {
		const mediaQueryList = MediaQueryList(this);
		const { mediaBlock } = this;
		if ( mediaBlock ) {
			if ( mediaQueryList ) {
				return `@media${mediaQueryList.startsWith(' ') ? '' : ' '}${mediaQueryList}${mediaQueryList.endsWith(' ') ? '' : ' '}{${mediaBlock.cssText}}`;
			}
			else {
				return mediaBlock.cssText;
			}
		}
		else {
			return `@${this.keyword} ${this.urlLiteral}${mediaQueryList};`;
		}
	}
	
	* beautify (this :ImportRule, tab? :string) :IterableIterator<string> {
		const mediaQueryList = MediaQueryList(this);
		const { mediaBlock } = this;
		if ( mediaBlock ) {
			if ( mediaQueryList ) {
				yield `@media${mediaQueryList.startsWith(' ') ? '' : ' '}${mediaQueryList}${mediaQueryList.endsWith(' ') ? '' : ' '}{`;
				for ( const line of mediaBlock.beautify(tab) ) {
					yield tab+line;
				}
				yield `}`;
			}
			else {
				yield * mediaBlock.beautify(tab);
			}
		}
		else {
			yield `@${this.keyword} ${this.urlLiteral}${mediaQueryList};`;
		}
	}
	
	get url () {
		const { urlLiteral } = this;
		return TOKEN.unescape(
			urlLiteral instanceof ParenthesisBlock ? ( urlLiteral[0] as string ).slice(1, -1) :
				urlLiteral.startsWith('"') || urlLiteral.startsWith('\'') ? urlLiteral.slice(1, -1) :
					TOKEN.valueOfURL(urlLiteral)
		);
	}
	//set url (url :string) { }
	private mediaBlock? :Readonly<{
		cssText :string,
		beautify (tab? :string) :IterableIterator<string>,
	}>;
	
};

freeze(ImportRule.prototype);

type Sheet = import('./').default;