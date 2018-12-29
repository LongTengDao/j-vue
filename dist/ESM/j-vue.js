﻿/*!
 * 模块名称：jVue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified dependency for built .vue files. Belong to "Plan J".
 * 模块版本：2.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

var version = '2.2.0';

var undefined$1;
var create = Object.create;
var head = document.documentElement.firstChild;
var NULL = Object.freeze(Object.create(null));
var IDENTIFIERS = /--[a-z_]\w*--|__[a-z0-9$]+(?:_[a-z0-9$]+)*__/ig;
var mapper = {
	0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'a',
	a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
	h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
	o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
	u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
};
var identifierArray = ['9'];
var identifierArray_lastItem = '9';
var identifierArray_lastIndex = 0;

function Identifier () {
	if ( identifierArray_lastItem==='z' ) {
		identifierArray_lastItem = identifierArray[identifierArray_lastIndex] = '0';
		for ( var wIndex = identifierArray_lastIndex; ; ) {
			if ( wIndex ) {
				if ( identifierArray[--wIndex]==='z' ) { identifierArray[wIndex] = '0'; }
				else {
					identifierArray[wIndex] = mapper[identifierArray[wIndex]];
					break;
				}
			}
			else {
				identifierArray.unshift('a');
				++identifierArray_lastIndex;
				break;
			}
		}
	}
	else { identifierArray_lastItem = identifierArray[identifierArray_lastIndex] = mapper[identifierArray_lastItem]; }
	/*
	switch ( identifierString = identifierArray.join('') ) {
		case 'break':
		case 'case':
		case 'catch':
		case 'class':// ES 6
		case 'const':// ES 6
		case 'continue':
		case 'debugger':
		case 'default':
		case 'delete':
		case 'do':
		case 'else':
		case 'enum'://
		case 'export':// ES 6
		case 'extends':// ES 6
		case 'finally':
		case 'for':
		case 'function':
		case 'if':
		case 'import':// ES 6
		case 'in':
		case 'instanceof':
		case 'new':
		case 'return':
		case 'switch':
		case 'super':// ES 6
		case 'this':
		case 'throw':
		case 'try':
		case 'typeof':
		case 'var':
		case 'void':
		case 'while':
		case 'with':
			identifierArray_lastItem = identifierArray[identifierArray_lastIndex] = mapper[identifierArray_lastItem];
			var identifierString = identifierArray.join('');
	}
	return identifierString;
	*/
	return identifierArray.join('');
}

function IdentifiersObject (IDs) {
	for ( var index = IDs.length; index; ) {
		this[IDs[--index]] = Identifier();
	}
}

IdentifiersObject.prototype = NULL;

function IdentifiersObjectExtended (IDs) {
	for ( var index = IDs.length; index; ) {
		this[IDs[--index]] = Identifier();
	}
	IdentifiersObjectExtended.prototype = NULL;
}

function IdentifiersFunction (cache) {
	return function scope (ID) {
		if ( ID in cache ) { return cache[ID]; }
		return cache[ID] = Identifier();
	};
}

function Scope (ID__ID) {
	if ( ID__ID===undefined$1 ) { return IdentifiersFunction(create(this===undefined$1 || this===window ? null : this)); }
	if ( this===undefined$1 || this===window ) { return new IdentifiersObject(ID__ID.split('--')); }
	IdentifiersObjectExtended.prototype = this;
	return new IdentifiersObjectExtended(ID__ID.split('--'));
}

Scope.prototype = NULL;
Object.freeze(Scope);

function Replacer (scope) {
	return typeof scope==='function' ?
		function (__ID__) { return scope(__ID__.slice(2, -2)); } :
		function (__ID__) {
			var ID = __ID__.slice(2, -2);
			if ( ID in scope ) { return scope[ID]; }
			throw new Error(__ID__);
		};
}

function RenderFn (code) {
	return Function('with(this){return '+code+'}');
}

function Render (code, scope) {
	return RenderFn(scope
		? code.replace(IDENTIFIERS, Replacer(scope))
		: code
	);
}

function StaticRenderFns (codes, scope) {
	var fns = [];
	var length = codes.length;
	var index = 0;
	if ( scope ) {
		var replacer = Replacer(scope);
		while ( index<length ) {
			fns.push(RenderFn(codes[index].replace(IDENTIFIERS, replacer)));
			++index;
		}
	}
	else {
		while ( index<length ) {
			fns.push(RenderFn(codes[index]));
			++index;
		}
	}
	return fns;
}

var STYLE = Object.create(null, {
	render: {
		configurable: false,
		enumerable: true,
		writable: false,
		value: function render (createElement) {
			return 'default' in this.$slots
				? createElement('style', { domProps: { textContent: this.$slots.default[0].text } })
				: createElement('style');
		}
	}
});

function Style (css, scope) {
	var style = document.createElement('style');
	if ( css ) {
		style.textContent = scope
			? css.replace(IDENTIFIERS, Replacer(scope))
			: css;
	}
	head.appendChild(style);
	return style;
}

function remove (style) {
	head.removeChild(style);
	return remove;
}

var jDoc = {
	Scope: Scope,
	Render: Render,
	StaticRenderFns: StaticRenderFns,
	STYLE: STYLE,
	Style: Style,
	remove: remove,
	version: version
};
jDoc.default = jDoc;
Object.freeze(jDoc);

export default jDoc;
export { version, Scope, Render, StaticRenderFns, STYLE, Style, remove };

/*¡ jVue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMi4yLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxudmFyIHVuZGVmaW5lZDtcbnZhciBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xudmFyIGhlYWQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZmlyc3RDaGlsZDtcbnZhciBOVUxMID0gT2JqZWN0LmZyZWV6ZShPYmplY3QuY3JlYXRlKG51bGwpKTtcbnZhciBJREVOVElGSUVSUyA9IC8tLVthLXpfXVxcdyotLXxfX1thLXowLTkkXSsoPzpfW2EtejAtOSRdKykqX18vaWc7XG52YXIgbWFwcGVyID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBpZGVudGlmaWVyQXJyYXkgPSBbJzknXTtcbnZhciBpZGVudGlmaWVyQXJyYXlfbGFzdEl0ZW0gPSAnOSc7XG52YXIgaWRlbnRpZmllckFycmF5X2xhc3RJbmRleCA9IDA7XG5cbmZ1bmN0aW9uIElkZW50aWZpZXIgKCkge1xuXHRpZiAoIGlkZW50aWZpZXJBcnJheV9sYXN0SXRlbT09PSd6JyApIHtcblx0XHRpZGVudGlmaWVyQXJyYXlfbGFzdEl0ZW0gPSBpZGVudGlmaWVyQXJyYXlbaWRlbnRpZmllckFycmF5X2xhc3RJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIHdJbmRleCA9IGlkZW50aWZpZXJBcnJheV9sYXN0SW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIHdJbmRleCApIHtcblx0XHRcdFx0aWYgKCBpZGVudGlmaWVyQXJyYXlbLS13SW5kZXhdPT09J3onICkgeyBpZGVudGlmaWVyQXJyYXlbd0luZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZGVudGlmaWVyQXJyYXlbd0luZGV4XSA9IG1hcHBlcltpZGVudGlmaWVyQXJyYXlbd0luZGV4XV07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZGVudGlmaWVyQXJyYXkudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2lkZW50aWZpZXJBcnJheV9sYXN0SW5kZXg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHsgaWRlbnRpZmllckFycmF5X2xhc3RJdGVtID0gaWRlbnRpZmllckFycmF5W2lkZW50aWZpZXJBcnJheV9sYXN0SW5kZXhdID0gbWFwcGVyW2lkZW50aWZpZXJBcnJheV9sYXN0SXRlbV07IH1cblx0Lypcblx0c3dpdGNoICggaWRlbnRpZmllclN0cmluZyA9IGlkZW50aWZpZXJBcnJheS5qb2luKCcnKSApIHtcblx0XHRjYXNlICdicmVhayc6XG5cdFx0Y2FzZSAnY2FzZSc6XG5cdFx0Y2FzZSAnY2F0Y2gnOlxuXHRcdGNhc2UgJ2NsYXNzJzovLyBFUyA2XG5cdFx0Y2FzZSAnY29uc3QnOi8vIEVTIDZcblx0XHRjYXNlICdjb250aW51ZSc6XG5cdFx0Y2FzZSAnZGVidWdnZXInOlxuXHRcdGNhc2UgJ2RlZmF1bHQnOlxuXHRcdGNhc2UgJ2RlbGV0ZSc6XG5cdFx0Y2FzZSAnZG8nOlxuXHRcdGNhc2UgJ2Vsc2UnOlxuXHRcdGNhc2UgJ2VudW0nOi8vXG5cdFx0Y2FzZSAnZXhwb3J0JzovLyBFUyA2XG5cdFx0Y2FzZSAnZXh0ZW5kcyc6Ly8gRVMgNlxuXHRcdGNhc2UgJ2ZpbmFsbHknOlxuXHRcdGNhc2UgJ2Zvcic6XG5cdFx0Y2FzZSAnZnVuY3Rpb24nOlxuXHRcdGNhc2UgJ2lmJzpcblx0XHRjYXNlICdpbXBvcnQnOi8vIEVTIDZcblx0XHRjYXNlICdpbic6XG5cdFx0Y2FzZSAnaW5zdGFuY2VvZic6XG5cdFx0Y2FzZSAnbmV3Jzpcblx0XHRjYXNlICdyZXR1cm4nOlxuXHRcdGNhc2UgJ3N3aXRjaCc6XG5cdFx0Y2FzZSAnc3VwZXInOi8vIEVTIDZcblx0XHRjYXNlICd0aGlzJzpcblx0XHRjYXNlICd0aHJvdyc6XG5cdFx0Y2FzZSAndHJ5Jzpcblx0XHRjYXNlICd0eXBlb2YnOlxuXHRcdGNhc2UgJ3Zhcic6XG5cdFx0Y2FzZSAndm9pZCc6XG5cdFx0Y2FzZSAnd2hpbGUnOlxuXHRcdGNhc2UgJ3dpdGgnOlxuXHRcdFx0aWRlbnRpZmllckFycmF5X2xhc3RJdGVtID0gaWRlbnRpZmllckFycmF5W2lkZW50aWZpZXJBcnJheV9sYXN0SW5kZXhdID0gbWFwcGVyW2lkZW50aWZpZXJBcnJheV9sYXN0SXRlbV07XG5cdFx0XHR2YXIgaWRlbnRpZmllclN0cmluZyA9IGlkZW50aWZpZXJBcnJheS5qb2luKCcnKTtcblx0fVxuXHRyZXR1cm4gaWRlbnRpZmllclN0cmluZztcblx0Ki9cblx0cmV0dXJuIGlkZW50aWZpZXJBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gSWRlbnRpZmllcnNPYmplY3QgKElEcykge1xuXHRmb3IgKCB2YXIgaW5kZXggPSBJRHMubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dGhpc1tJRHNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpO1xuXHR9XG59XG5cbklkZW50aWZpZXJzT2JqZWN0LnByb3RvdHlwZSA9IE5VTEw7XG5cbmZ1bmN0aW9uIElkZW50aWZpZXJzT2JqZWN0RXh0ZW5kZWQgKElEcykge1xuXHRmb3IgKCB2YXIgaW5kZXggPSBJRHMubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dGhpc1tJRHNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpO1xuXHR9XG5cdElkZW50aWZpZXJzT2JqZWN0RXh0ZW5kZWQucHJvdG90eXBlID0gTlVMTDtcbn1cblxuZnVuY3Rpb24gSWRlbnRpZmllcnNGdW5jdGlvbiAoY2FjaGUpIHtcblx0cmV0dXJuIGZ1bmN0aW9uIHNjb3BlIChJRCkge1xuXHRcdGlmICggSUQgaW4gY2FjaGUgKSB7IHJldHVybiBjYWNoZVtJRF07IH1cblx0XHRyZXR1cm4gY2FjaGVbSURdID0gSWRlbnRpZmllcigpO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU2NvcGUgKElEX19JRCkge1xuXHRpZiAoIElEX19JRD09PXVuZGVmaW5lZCApIHsgcmV0dXJuIElkZW50aWZpZXJzRnVuY3Rpb24oY3JlYXRlKHRoaXM9PT11bmRlZmluZWQgfHwgdGhpcz09PXdpbmRvdyA/IG51bGwgOiB0aGlzKSk7IH1cblx0aWYgKCB0aGlzPT09dW5kZWZpbmVkIHx8IHRoaXM9PT13aW5kb3cgKSB7IHJldHVybiBuZXcgSWRlbnRpZmllcnNPYmplY3QoSURfX0lELnNwbGl0KCctLScpKTsgfVxuXHRJZGVudGlmaWVyc09iamVjdEV4dGVuZGVkLnByb3RvdHlwZSA9IHRoaXM7XG5cdHJldHVybiBuZXcgSWRlbnRpZmllcnNPYmplY3RFeHRlbmRlZChJRF9fSUQuc3BsaXQoJy0tJykpO1xufVxuXG5TY29wZS5wcm90b3R5cGUgPSBOVUxMO1xuT2JqZWN0LmZyZWV6ZShTY29wZSk7XG5cbmZ1bmN0aW9uIFJlcGxhY2VyIChzY29wZSkge1xuXHRyZXR1cm4gdHlwZW9mIHNjb3BlPT09J2Z1bmN0aW9uJyA/XG5cdFx0ZnVuY3Rpb24gKF9fSURfXykgeyByZXR1cm4gc2NvcGUoX19JRF9fLnNsaWNlKDIsIC0yKSk7IH0gOlxuXHRcdGZ1bmN0aW9uIChfX0lEX18pIHtcblx0XHRcdHZhciBJRCA9IF9fSURfXy5zbGljZSgyLCAtMik7XG5cdFx0XHRpZiAoIElEIGluIHNjb3BlICkgeyByZXR1cm4gc2NvcGVbSURdOyB9XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoX19JRF9fKTtcblx0XHR9O1xufVxuXG5mdW5jdGlvbiBSZW5kZXJGbiAoY29kZSkge1xuXHRyZXR1cm4gRnVuY3Rpb24oJ3dpdGgodGhpcyl7cmV0dXJuICcrY29kZSsnfScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVuZGVyIChjb2RlLCBzY29wZSkge1xuXHRyZXR1cm4gUmVuZGVyRm4oc2NvcGVcblx0XHQ/IGNvZGUucmVwbGFjZShJREVOVElGSUVSUywgUmVwbGFjZXIoc2NvcGUpKVxuXHRcdDogY29kZVxuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3RhdGljUmVuZGVyRm5zIChjb2Rlcywgc2NvcGUpIHtcblx0dmFyIGZucyA9IFtdO1xuXHR2YXIgbGVuZ3RoID0gY29kZXMubGVuZ3RoO1xuXHR2YXIgaW5kZXggPSAwO1xuXHRpZiAoIHNjb3BlICkge1xuXHRcdHZhciByZXBsYWNlciA9IFJlcGxhY2VyKHNjb3BlKTtcblx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRcdGZucy5wdXNoKFJlbmRlckZuKGNvZGVzW2luZGV4XS5yZXBsYWNlKElERU5USUZJRVJTLCByZXBsYWNlcikpKTtcblx0XHRcdCsraW5kZXg7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdFx0Zm5zLnB1c2goUmVuZGVyRm4oY29kZXNbaW5kZXhdKSk7XG5cdFx0XHQrK2luZGV4O1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZm5zO1xufVxuXG5leHBvcnQgdmFyIFNUWUxFID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG5cdHJlbmRlcjoge1xuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xuXHRcdFx0cmV0dXJuICdkZWZhdWx0JyBpbiB0aGlzLiRzbG90c1xuXHRcdFx0XHQ/IGNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywgeyBkb21Qcm9wczogeyB0ZXh0Q29udGVudDogdGhpcy4kc2xvdHMuZGVmYXVsdFswXS50ZXh0IH0gfSlcblx0XHRcdFx0OiBjcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdH1cblx0fVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBTdHlsZSAoY3NzLCBzY29wZSkge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHtcblx0XHRzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlXG5cdFx0XHQ/IGNzcy5yZXBsYWNlKElERU5USUZJRVJTLCBSZXBsYWNlcihzY29wZSkpXG5cdFx0XHQ6IGNzcztcblx0fVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHN0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSkge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cblxudmFyIGpEb2MgPSB7XG5cdFNjb3BlOiBTY29wZSxcblx0UmVuZGVyOiBSZW5kZXIsXG5cdFN0YXRpY1JlbmRlckZuczogU3RhdGljUmVuZGVyRm5zLFxuXHRTVFlMRTogU1RZTEUsXG5cdFN0eWxlOiBTdHlsZSxcblx0cmVtb3ZlOiByZW1vdmUsXG5cdHZlcnNpb246IHZlcnNpb25cbn07XG5qRG9jLmRlZmF1bHQgPSBqRG9jO1xuT2JqZWN0LmZyZWV6ZShqRG9jKTtcbmV4cG9ydCBkZWZhdWx0IGpEb2M7XG4iXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGNBQWUsT0FBTzs7c0JBQUMsdEJDR3ZCLElBQUlBLFdBQVMsQ0FBQztBQUNkLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDM0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7QUFDL0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUMsSUFBSSxXQUFXLEdBQUcsZ0RBQWdELENBQUM7QUFDbkUsSUFBSSxNQUFNLEdBQUc7Q0FDWixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztDQUM5RSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztDQUN0RCxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztDQUN0RCxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Q0FDOUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztDQUN0QyxDQUFDO0FBQ0Ys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