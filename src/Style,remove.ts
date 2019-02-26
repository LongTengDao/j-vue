var head = document.documentElement.firstChild;

export function Style (css? :string, scope?) :HTMLStyleElement {
	var style :HTMLStyleElement = document.createElement('style');
	if ( css ) { style.textContent = scope ? css.replace(scope._search, scope._replacer) : css; }
	return head.appendChild(style);
}

type remove = (style :HTMLStyleElement) => remove;
export function remove (style :HTMLStyleElement) :remove {
	head.removeChild(style);
	return remove;
}
