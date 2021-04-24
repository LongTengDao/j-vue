import freeze from '.Object.freeze';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';

import * as Entities from '../../Entities';
import { EMPTY } from '../../Attributes';
import Node from './Node';

const tag_attrs = ({ localName: literal, attributes } :Element) => {
	for ( const name in attributes ) {
		const value = attributes[name];
		literal += value===EMPTY ? ` ${name}` : ` ${name}="${Entities.escapeAttributeValue(value)}"`;
	}
	return literal;
};

export default class Element extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.*.Element'; }
	
	constructor (localName :string, attributes :Attributes, __class__ :string | undefined, shadowRoot :{ readonly along :string, readonly inside :boolean } | null) {
		super();
		if ( __class__ ) {
			attributes['class'] = attributes['class']
				? __class__ + ' ' + attributes['class']
				: __class__;
		}
		this.localName = localName;
		this.attributes = attributes;
		this.#shadowRoot = shadowRoot;
		return this;
	}
	
	readonly localName :string;
	readonly attributes :Attributes;
	readonly #shadowRoot :{ readonly along :string, readonly inside :boolean } | null;
	
	[Symbol.toPrimitive] (this :Element) {
		let innerHTML :string = '';
		let child = this.firstChild;
		while ( child ) {
			innerHTML += child;
			child = child.nextSibling;
		}
		if ( this.#shadowRoot ) {
			///Vue3: return `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set"><template shadowroot="open">${innerHTML}</template></${this.localName}>`;
			innerHTML = `<teleport v-if="${this.#shadowRoot.along}$get" :to="${this.#shadowRoot.along}$get">${innerHTML}</teleport>`;
			return this.#shadowRoot.inside
				? `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set">${innerHTML}</${this.localName}>`
				: `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set" />${innerHTML}`;
		}
		else {
			return innerHTML
				? `<${tag_attrs(this)}>${this.localName==='textarea' || this.localName==='pre' ? '\n' + innerHTML : innerHTML}</${this.localName}>`
				: `<${tag_attrs(this)} />`;
		}
	}
	
	* beautify (tab :string = '\t') :Generator<string, void, void> {
		if ( this.#shadowRoot ) {
			const teleport = `<teleport v-if="${this.#shadowRoot.along}$get" :to="${this.#shadowRoot.along}$get">`;
			if ( this.#shadowRoot.inside ) {
				yield `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set">`;
				yield tab + teleport;
				let child = this.firstChild;
				while ( child ) {
					for ( const line of child.beautify(tab) ) {
						yield `${tab}${tab}${line}`;
					}
					child = child.nextSibling;
				}
				yield `${tab}</teleport>`;
				yield `</${this.localName}>`;
			}
			else {
				yield `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set" />`;
				yield teleport;
				let child = this.firstChild;
				while ( child ) {
					for ( const line of child.beautify(tab) ) {
						yield `${tab}${line}`;
					}
					child = child.nextSibling;
				}
				yield `</teleport>`;
			}
		}
		else {
			let child = this.firstChild;
			if ( child ) {
				yield `<${tag_attrs(this)}>`;
				do {
					for ( const line of child.beautify(tab) ) {
						yield `${tab}${line}`;
					}
				}
				while ( ( child = child.nextSibling ) );
				yield `</${this.localName}>`;
			}
			else {
				yield `<${tag_attrs(this)} />`;
			}
		}
	}
	
};

freeze(freeze(Element).prototype);

export class RawTextElement extends Element {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.RawTextElement'; }
	
	constructor (localName :string, attributes :Attributes, __class__ :string | undefined) { return super(localName, attributes, __class__, null) as unknown as this; }
	
	textContent :string = '';
	
	[Symbol.toPrimitive] (this :RawTextElement) {
		return this.textContent
			? `<${tag_attrs(this)}>${this.textContent}</${this.localName}>`
			: `<${tag_attrs(this)} />`;
	}
	
	* beautify (this :RawTextElement, tab = '\t') :Generator<string, void, void> {
		if ( this.textContent ) {
			yield `<${tag_attrs(this)}>`;
			for ( const line of this.textContent.split('\n') ) {
				yield `${tab}${line}`;
			}
			yield `</${this.localName}>`;
		}
		else {
			yield `<${tag_attrs(this)} />`;
		}
	}
	
}

freeze(freeze(RawTextElement).prototype);

export const isElement = /*#__PURE__*/isPrototypeOf.bind(Element.prototype) as (value :Node) => value is Element;

import type Attributes from '../../Attributes';