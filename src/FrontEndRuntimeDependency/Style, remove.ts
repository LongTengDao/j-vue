import document from '.document';
import head from '.document.head';

import { _ } from './Scope/_';

function Style (css? :string, scope? :Scope) :HTMLStyleElement {
	var style :HTMLStyleElement = document.createElement('style');
	if ( css ) { style.textContent = scope ? scope[_](css) : css; }
	return head.appendChild(style);
}

function remove (style :HTMLStyleElement) :typeof remove {
	head.removeChild(style);
	return remove;
}

export { Style, remove };

import Scope from './Scope/';