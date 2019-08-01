import PropertyDescriptor from '.null.PropertyDescriptor';
import defineProperty from '.Object.defineProperty';
import document from '.document';
import head from '.document.head';
import undefined from '.undefined';

var _ :'_' = typeof Symbol==='function'
	? Symbol('_') as any
	: '_';

function $<T extends Scope> (this :T, css? :string, media? :string) :T {
	var style :HTMLStyleElement = document.createElement('style');
	if ( css ) { style.textContent = this[_](css); }
	if ( media!==undefined ) {
		style.media = media as string;
	}
	head.appendChild(style);
	return this;
}

var prepare_ :(scope :Scope) => void = typeof _==='symbol'
	
	? function $ () {}
	
	: function () {
		var _descriptor = PropertyDescriptor(function _ () {}, true, false, false);
		return function $ (scope :Scope) {
			defineProperty(scope, _, _descriptor);
		};
	}();

export { _, $, prepare_ };

type Scope = import('./').default;