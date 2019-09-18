import freeze from '.Object.freeze';

import Node from './Node';

export default class Element extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Element'; }
	
	constructor (localName :string, attributes :Attributes, partial? :{ class :string }) {
		super();
		if ( partial ) {
			const classNames = partial.class;
			if ( classNames ) {
				attributes.class = 'class' in attributes
					? attributes.class
						? classNames+' '+attributes.class
						: classNames
					: classNames;
			}
		}
		this.localName = localName;
		this.attributes = attributes;
	}
	
	readonly localName :string;
	readonly attributes :Attributes;
	
	get outerHTML () :string {
		let innerHTML :string = '';
		for ( let index = this.length; index; ) {
			innerHTML = this[--index].outerHTML+innerHTML;
		}
		return innerHTML
			? `<${this.localName}${this.attributes}>${innerHTML}</${this.localName}>`
			: `<${this.localName}${this.attributes} />`;
	}
	
	* beautify (this :Element, tab :string = '\t') :IterableIterator<string> {
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