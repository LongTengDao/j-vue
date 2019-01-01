var head = document.documentElement.firstChild;

export function Style (css, scope) {
	var style = document.createElement('style');
	if ( css ) { style.textContent = scope ? css.replace(scope._search, scope._replacer) : css; }
	return head.appendChild(style);
}

export function remove (style) {
	head.removeChild(style);
	return remove;
}
