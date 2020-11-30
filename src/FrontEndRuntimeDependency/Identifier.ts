import test from '.RegExp.prototype.test';
import join from '.Array.prototype.join';
import unshift from '.Array.prototype.unshift';

var object = {
	'0': '1', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6', '6': '7', '7': '8', '8': '9', '9': 'a',
	a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
	h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
	o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
	u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
} as const;

var lastItem :Item = 'z';
var array :Item[] = [ lastItem ];
var lastIndex :number = array.length - 1;

var notKeyword :{ (this :void, string :string) :boolean } = /*#__PURE__*/test.bind(/\d/);
var toString :{ (this :void) :string } = /*#__PURE__*/join.bind(array, '');
var prependA :{ (this :void) :number } = /*#__PURE__*/unshift.bind(array, 'a');

export default function Identifier () :string {
	if ( lastItem==='9' ) {
		array[lastIndex] = 'a';
		var string :string;
		if ( notKeyword(string = toString()) ) {
			lastItem = 'a';
			return string;
		}
	}
	else if ( lastItem!=='z' ) {
		lastItem = array[lastIndex] = object[lastItem];
		return toString();
	}
	lastItem = array[lastIndex] = '0';
	for ( var index :number = lastIndex; index; array[index] = '0' ) {
		var item :Item = array[--index]!;
		if ( item!=='z' ) {
			array[index] = object[item];
			return toString();
		}
	}
	lastIndex = prependA() - 1;
	return toString();
};

type Item = keyof typeof object | 'z';