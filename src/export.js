import semver from './semver.json';
export { semver };

var create = /*window.*/Object.create;
//var Function = window.Function;
//var Error = window.Error;
//var document = window.document;

var HEAD = document.documentElement.firstChild;

var IDENTIFIERS = /--[a-z_]\w*--|__[a-z0-9$]+(?:_[a-z0-9$]+)*__/ig;

//var RESERVED_WORDS = function (Set) {
//	Set.prototype = create(null);
//	return new Set;
//}(function () {
//	this.break = this.case = this.catch = this.class = this.const = this.continue = this.debugger = this.default = this.delete = this.do = this.else = this.enum = this.export = this.extends = this.finally = this.for = this.funciton = this.if = this.import = this.in = this.instanceof = this.let = this.new = this.return = this.try = this.super = this.switch = this.this = this.throw = this.typeof = this.var = this.void = this.while = this.with = null;
//});

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
	return identifierArray.join('');
	//var identifierString = identifierArray.join('');
	//if ( identifierString in RESERVED_WORDS ) {
	//	identifierArray_lastItem = identifierArray[identifierArray_lastIndex] = mapper[identifierArray_lastItem];
	//	identifierString = identifierArray.join('');
	//}
	//return identifierString;
}

function IdentifiersObject (IDs) {
	var index = IDs.length;
	while ( index ) {
		this[IDs[--index]] = Identifier();
	}
}

IdentifiersObject.prototype = create(null);

function IdentifiersFunction () {
	var identifiers = create(null);
	return function (ID) {
		if ( ID in identifiers ) { return identifiers[ID]; }
		return identifiers[ID] = Identifier();
	};
}

export function Scope (ID__ID) {
	return ID__ID ? new IdentifiersObject(ID__ID.split('--')) : IdentifiersFunction();
}

function Replacer (scope) {
	return typeof scope==='function' ?
		function (__ID__) { return scope(__ID__.slice(2, -2)); } :
		function (__ID__) {
			var ID = __ID__.slice(2, -2);
			if ( ID in scope ) { return scope[ID]; }
			throw new Error(__ID__);
		};
}

export function Render (code, scope) {
	return Function(
		scope
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
			fns.push(Function(codes[index].replace(IDENTIFIERS, replacer)));
			++index;
		}
	}
	else {
		while ( index<length ) {
			fns.push(Function(codes[index]));
			++index;
		}
	}
	return fns;
}

export function Style (css, scope) {
	var style = document.createElement('style');
	if ( css ) {
		style.textContent =
			scope
				? css.replace(IDENTIFIERS, Replacer(scope))
				: css;
	}
	HEAD.appendChild(style);
	return style;
}

export function remove (style) {
	HEAD.removeChild(style);
	return remove;
}

var jDoc = {
	semver: semver,
	Scope: Scope,
	Render: Render,
	StaticRenderFns: StaticRenderFns,
	Style: Style,
	remove: remove
};

jDoc.default = jDoc;

export default jDoc;
