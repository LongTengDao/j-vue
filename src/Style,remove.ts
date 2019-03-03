var head :HTMLHeadElement = <HTMLHtmlElement>( <HTMLHtmlElement>document.documentElement ).firstChild;

export function Style (css? :string, scope?) :HTMLStyleElement {
	var style :HTMLStyleElement = document.createElement('style');
	if ( css ) { style.textContent = scope ? scope._(css) : css; }
	return head.appendChild(style);
}

export function remove (style :HTMLStyleElement) :typeof remove {
	head.removeChild(style);
	return remove;
}
