import create from '.Object.create';
import defineProperty from '.Object.defineProperty';
import document from '.document';
import head from '.document.head';
import undefined from '.undefined';

export var _ :'_' = typeof Symbol==='function'
	? Symbol('_') as any
	: '_';

export function $<T extends Scope> (this :T, css? :string, media? :string) :T {
	var style :HTMLStyleElement = document.createElement('style');
	if ( css ) { style.textContent = this[_](css); }
	if ( media!==undefined ) {
		style.media = media as string;
	}
	head.appendChild(style);
	return this;
}

export var prepare_ :(scope :Scope) => void = typeof _==='symbol'
	
	? function $ () {}
	
	: /*#__PURE__*/ function () {
		var _descriptor = create(null);
		_descriptor.value = function _ () {};
		_descriptor.writable = true;
		return function $ (scope :Scope) {
			defineProperty(scope, _, _descriptor);
		};
	}();

import Scope from './';