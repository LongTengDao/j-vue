import Error from '.Error';
import TypeError from '.TypeError';
import freeze from '.Object.freeze';
import undefined from '.undefined';

import { newRegExp } from '@ltd/j-regexp';
import { transpileModule } from '../dependencies';
import { TAG_EMIT_CHAR } from './RE';
const SCRIPT_END_TAG = newRegExp('i')`</script${TAG_EMIT_CHAR}`;

const JS = newRegExp('i')`^\s*(?:
	JS|JavaScript(?:\s*1\.\d)?|JSX
	|
	(?:ES|ECMAScript|ECMAS?)(?:\s*\d+)?
	|
	ESM
	|
	(?:text|application)\/(?:ECMAScript|JavaScript(?:;\s*version\s*=\s*1\.\d)?)
)\s*$`;
const TS = /^\s*T(?:S|ypeScript)\s*$/i;
const TSX = /^\s*TSX\s*$/i;

import Block from './Block';
import _ from './private';

export default class Script extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.Script'; }
	
	constructor (attributes :Attributes, inner :string | undefined) { super('script', attributes, true, inner, SCRIPT_END_TAG); }
	
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
		if ( typeof <unknown> value!=='string' ) { throw TypeError(`innerJS 只能被赋值字符串`); }
		_(this).innerJS = value;
	}
	
};

freeze(Script.prototype);

export type Private = object & {
	innerJS? :string
};
type Attributes = import('./Attributes').default;