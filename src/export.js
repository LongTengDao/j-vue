import version from './version?text';
export { version };

var create = Object.create;
var head = document.documentElement.firstChild;
var NULL = Object.freeze(Object.create(null));
var IDENTIFIERS = /--(?:[a-z][a-z0-9]*(?:_[a-z0-9]+)*|(?:_[a-z0-9]+)+)--|__[a-z0-9$]+(?:_[a-z0-9$]+)*__/ig;
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

export function Scope (ID__ID) {
	if ( ID__ID ) {
		if ( this instanceof IdentifiersObject ) {
			IdentifiersObjectExtended.prototype = this;
			return new IdentifiersObjectExtended(ID__ID.split('--'));
		}
		return new IdentifiersObject(ID__ID.split('--'));
	}
	return IdentifiersFunction(create(this instanceof IdentifiersObject ? this : null));
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

export function Render (code, scope) {
	return RenderFn(scope
		? code.replace(IDENTIFIERS, Replacer(scope))
		: code
	);
}

export function StaticRenderFns (codes, scope) {
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

export var STYLE = Object.create(null, {
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

export function Style (css, scope) {
	var style = document.createElement('style');
	if ( css ) {
		style.textContent = scope
			? css.replace(IDENTIFIERS, Replacer(scope))
			: css;
	}
	head.appendChild(style);
	return style;
}

export function remove (style) {
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
