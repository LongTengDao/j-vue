import freeze from '.Object.freeze';

import Node from './Node';

export default class Element extends Node {
	
	protected get [Symbol.toStringTag] () { return 'SFC.Template.Content.Element'; }
	
	constructor (localName :string, attributes :Attributes, __class__? :string) {
		super();
		if ( __class__ ) {
			attributes.class = 'class' in attributes
				? attributes.class
					? __class__+' '+attributes.class
					: __class__
				: __class__;
		}
		this.localName = localName;
		this.attributes = attributes;
	}
	
	readonly localName :string;
	readonly attributes :Attributes;
	
	get outerHTML () {
		let innerHTML :string = '';
		for ( let index = this.length; index; ) {
			innerHTML = this[--index].outerHTML+innerHTML;
		}
		return innerHTML
			? `<${this.localName}${this.attributes}>${innerHTML}</${this.localName}>`
			: `<${this.localName}${this.attributes} />`;
	}
	
	* beautify (this :Element, tab :string = '\t') {
		if ( this.length ) {
			yield `<${this.localName}${this.attributes}>`;
			for ( let index = 0, { length } = this; index<length; ++index ) {
				for ( const line of this[index].beautify(tab) ) {
					yield `${tab}${line}`;
				}
			}
			yield `</${this.localName}>`;
		}
		else {
			yield `<${this.localName}${this.attributes} />`;
		}
	}
	
};

freeze(Element.prototype);

type Attributes = import('../../Attributes').default;