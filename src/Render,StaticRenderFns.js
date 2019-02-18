export function Render (code, scope) {
	return RenderFn(scope ? code.replace(scope._search, scope._replacer) : code);
}

export function StaticRenderFns (codes, scope) {
	var fns = [];
	var length = codes.length;
	var index = 0;
	if ( scope ) {
		var _search = scope._search;
		var _replacer = scope._replacer;
		while ( index<length ) { fns.push(RenderFn(codes[index++].replace(_search, _replacer))); }
	}
	else {
		while ( index<length ) { fns.push(RenderFn(codes[index++])); }
	}
	return fns;
}

function RenderFn (code) {
	return Function('with(this){return '+code+'}');
}
