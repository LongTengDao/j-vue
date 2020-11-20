import freeze from '.Object.freeze';

import Node from './Node';

export default class Element extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Element'; }
	
	constructor (localName :string, attributes :Attributes, __class__ :string | undefined, shadowRoot :{ readonly along :string, readonly inside :boolean } | null) {
		super();
		if ( __class__ ) {
			attributes['class'] = attributes['class']
				? __class__+' '+attributes['class']
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
	
	get outerHTML () {
		let innerHTML :string = '';
		let index = this.length;
		while ( index ) { innerHTML = this[--index]!.outerHTML+innerHTML; }
		if ( this.#shadowRoot ) {
			innerHTML = `<teleport v-if="${this.#shadowRoot.along}$get" :to="${this.#shadowRoot.along}$get">${innerHTML}</teleport>`;
			return this.#shadowRoot.inside
				? `<${this.localName}${this.attributes} :ref="${this.#shadowRoot.along}$set">${innerHTML}</${this.localName}>`
				: `<${this.localName}${this.attributes} :ref="${this.#shadowRoot.along}$set" />${innerHTML}`;
		}
		else {
			return innerHTML
				? `<${this.localName}${this.attributes}>${innerHTML}</${this.localName}>`
				: `<${this.localName}${this.attributes} />`;
		}
	}
	
	* beautify (this :Element, tab :string = '\t') :Generator<string, void, undefined> {
		if ( this.#shadowRoot ) {
			const teleport = `<teleport v-if="${this.#shadowRoot.along}$get" :to="${this.#shadowRoot.along}$get">`;
			if ( this.#shadowRoot.inside ) {
				yield `<${this.localName}${this.attributes} :ref="${this.#shadowRoot.along}$set">`;
				yield tab + teleport;
				const { length } = this;
				let index = 0;
				while ( index!==length ) {
					for ( const line of this[index++]!.beautify(tab) ) {
						yield `${tab}${tab}${line}`;
					}
				}
				yield `${tab}</teleport>`;
				yield `</${this.localName}>`;
			}
			else {
				yield `<${this.localName}${this.attributes} :ref="${this.#shadowRoot.along}$set" />`;
				yield teleport;
				const { length } = this;
				let index = 0;
				while ( index!==length ) {
					for ( const line of this[index++]!.beautify(tab) ) {
						yield `${tab}${line}`;
					}
				}
				yield `</teleport>`;
			}
		}
		else {
			if ( this.length ) {
				yield `<${this.localName}${this.attributes}>`;
				const { length } = this;
				let index = 0;
				while ( index!==length ) {
					for ( const line of this[index++]!.beautify(tab) ) {
						yield `${tab}${line}`;
					}
				}
				yield `</${this.localName}>`;
			}
			else {
				yield `<${this.localName}${this.attributes} />`;
			}
		}
	}
	
};

freeze(Element.prototype);

import type Attributes from '../../Attributes';