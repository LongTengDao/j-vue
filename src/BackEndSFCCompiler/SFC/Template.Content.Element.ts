import freeze from '.Object.freeze';

import Node from './Template.Content.Node';

export default class Element extends Node {
	
	constructor (localName :string, attributes :Attributes, partial? :Partial) {
		super();
		if ( partial && localName in partial ) {
			const { tagName, class: classNames } = partial[localName];
			if ( classNames ) {
				attributes.class = 'class' in attributes
					? attributes.class
						? classNames+' '+attributes.class
						: classNames
					: classNames;
			}
			localName = tagName;
		}
		this.localName = localName;
		this.attributes = attributes;
	}
	
	localName :string;
	attributes :Attributes;
	
	get outerHTML () :string {
		let innerHTML :string = '';
		for ( const childNode of this.childNodes ) { innerHTML += childNode.outerHTML; }
		return innerHTML
			? `<${this.localName}${this.attributes}>${innerHTML}</${this.localName}>`
			: `<${this.localName}${this.attributes} />`;
	}
	
	* toSource (tab :string = '\t') :IterableIterator<string> {
		if ( this.childNodes.length ) {
			yield `<${this.localName}${this.attributes}>`;
			for ( const childNode of this.childNodes ) {
				for ( const line of childNode.toSource(tab) ) {
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

import Attributes from './Attributes';
import { Partial } from './Template';