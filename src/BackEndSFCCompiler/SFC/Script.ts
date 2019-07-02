import Error from '.Error';

import { newRegExp } from '@ltd/j-regexp';
import { TAG_EMIT_CHAR } from './RE';
const SCRIPT_END_TAG = newRegExp.i`</script${TAG_EMIT_CHAR}`;

const JS = newRegExp.i`^\s*(?:
	JS|JavaScript(?:\s*1\.\d)?
	|
	(?:ES|ECMAScript|ECMAS?)(?:\s*\d+)?
	|
	ESM
	|
	(?:text|application)\/(?:ECMAScript|JavaScript(?:;\s*version\s*=\s*1\.\d)?)
)\s*$`;

import Block from './Block';

export default class Script extends Block {
	
	constructor (attributes :Attributes, inner :string | undefined) { super('script', attributes, true, inner, SCRIPT_END_TAG); }
	
	get innerJS () :string {
		let inner = this.inner;
		if ( typeof inner!=='string' ) { throw Error(`自闭合的 script 功能块元素必须自行（根据 src 属性）加载 inner 值`); }
		if ( this.lang && !JS.test(this.lang) ) { throw Error(`script 功能块元素如果设置了非 js 的 lang 属性值，那么必须自行提供转译后的 inner，并将 lang 设置为 js`); }
		return inner;
	}
	
};

import Attributes from './Attributes';