import Error from '.Error';
import TypeError from '.TypeError';
import freeze from '.Object.freeze';
import undefined from '.undefined';

import { newRegExp } from '@ltd/j-regexp';
import { transpileModule } from '../../dependencies';
import { ASCII_WHITESPACE as s, TAG_EMIT_CHAR } from '../RE';
const SCRIPT_END_TAG = newRegExp.i!`</script${TAG_EMIT_CHAR}`;

/* TODO:
<https://mimesniff.spec.whatwg.org/#javascript-mime-type>
A JavaScript MIME type is any MIME type whose essence is one of the following:
application/ecmascript
application/javascript
application/x-ecmascript
application/x-javascript
text/ecmascript
text/javascript
text/javascript1.0
text/javascript1.1
text/javascript1.2
text/javascript1.3
text/javascript1.4
text/javascript1.5
text/jscript
text/livescript
text/x-ecmascript
text/x-javascript
*/
const JS = newRegExp.i!`^${s}*(?:
	JS|JavaScript(?:${s}*1\.\d)?|JSX
	|
	(?:ES|ECMAScript|ECMAS?)(?:${s}*\d+)?
	|
	ESM
	|
	(?:text|application)\/(?:ECMAScript|JavaScript(?:;${s}*version${s}*=${s}*1\.\d)?)
)${s}*$`;
const TS = newRegExp.i!`^${s}*T(?:S|ypeScript)${s}*$`;
const TSX = newRegExp.i!`^${s}*TSX${s}*$`;

import Block from '../Block';
import _ from '../private';

export default class Script extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.Script'; }
	
	constructor (attributes :Attributes, inner :string | undefined) {
		super('script', attributes, true, inner, SCRIPT_END_TAG);
		_.new(this);
		return this;
	}
	
	get innerJS () :string {
		let inner :string | undefined = _(this).innerJS;
		if ( inner===undefined ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error(`自闭合的 script 功能块元素必须自行加载 src 属性所要求的 inner 值`); }
			const { lang } = this;
			if ( lang && !JS.test(lang) ) {
				if ( TS.test(lang) ) { inner = transpileModule(inner, false); }
				else if ( TSX.test(lang) ) { inner = transpileModule(inner, true); }
				else { throw Error(`script 功能块元素如果设置了非 js / jsx / ts / tsx 的 lang 属性值，那么必须自行提供转译后的 innerJS`); }
			}
		}
		return inner;
	}
	set innerJS (value :string) {
		if ( typeof ( value as unknown )!=='string' ) { throw TypeError(`innerJS 只能被赋值字符串`); }
		_(this).innerJS = value;
	}
	
};

freeze(freeze(Script).prototype);

export type Private = object & {
	innerJS? :string
};

import type Attributes from '../Attributes';