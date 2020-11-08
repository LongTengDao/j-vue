import Symbol from '.Symbol?';
import document from '.document';
import head from '.document.head';
import undefined from '.undefined';

var _ :'_' = Symbol ? /*#__PURE__*/Symbol('_') as any : '_';

function $<T extends Scope> (this :T, css? :string, media? :string) :T {
	var style :HTMLStyleElement = document.createElement('style');
	if ( css ) { style.textContent = this[_](css); }
	if ( media!==undefined ) { style.media = media; }
	head.appendChild(style);
	return this;
}

export { _, $ };

import type Scope from './';