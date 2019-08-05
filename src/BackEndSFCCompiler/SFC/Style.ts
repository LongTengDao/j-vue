import undefined from '.undefined';
import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import create from '.Object.create';

import { newRegExp } from '@ltd/j-regexp';

import { TOKENS, AliasName, localName, className, TAG_EMIT_CHAR } from './RE';
import Block from './Block';
import _ from './private';

const SELECTOR = newRegExp`^
	\s*(?:
		${AliasName}\s*
		(?:=\s*
			(?:${localName}|(?=\.))
			(?:\.${className})*
		\s*)?;
	\s*)*
$`;

const STYLE_END_TAG = newRegExp.i`</style${TAG_EMIT_CHAR}`;

const CSS = /^\s*(?:text\/)?CSS\s*$/i;

const NAME_IN_CSS = /(?<=[\s,>}{\](+~]|\*\/|^)(?:[A-Z][\w-]*)+(?=[\s,>{}[)+~#:.]|\/\*|$)/g;

export default class Style extends Block<'style'> {
	
	abbr? :Selector;
	media? :string;
	
	constructor (attributes :Attributes, inner :string | undefined) {
		
		super('style', attributes, true, inner, STYLE_END_TAG);
		
		const _this :Style = _(this);
		
		if ( 'abbr.' in attributes ) {
			const literal = attributes['abbr.'];
			if ( literal===undefined ) { throw SyntaxError(`style 功能块元素的“abbr.”属性的缺省值写法还没有实现`); }
			else {
				if ( !SELECTOR.test(literal) ) { throw SyntaxError(`style 块的“abbr.”属性语法错误：\n${literal}`); }
				const abbr :Selector = create(null);
				for ( const pair of literal.split(';') ) {
					const tokens = pair.match(TOKENS);
					if ( tokens ) {
						const componentName :string = tokens[0];
						abbr[componentName] = tokens.length>1
							? tokens[1]
							: `.__${componentName}__`;
					}
				}
				_this.abbr = abbr;
			}
		}
		
		if ( 'media' in attributes ) {
			if ( attributes.media===undefined ) { throw SyntaxError(`style 功能块元素的 media 属性必须具有值`); }
			_this.media = attributes.media;
		}
		
	}
	
	get innerCSS () :string {
		let inner :string | undefined = _(this).innerCSS;
		if ( inner===undefined ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error(`自闭合的 style 功能块元素必须自行根据 src 属性加载 inner 值`); }
			if ( this.lang && !CSS.test(this.lang) ) { throw Error(`style 功能块元素如果设置了非 css 的 lang 属性值，那么必须自行提供转译后的 innerCSS`); }
		}
		const { abbr } = _(this);
		if ( abbr ) { inner = inner.replace(NAME_IN_CSS, (componentName :string) :string => componentName in abbr ? abbr[componentName] : componentName); }
		return inner;
	}
	set innerCSS (value :string) {
		if ( typeof <unknown> value!=='string' ) { throw TypeError(`innerCSS 只能被赋值字符串`); }
		_(this).innerCSS = value;
	}
	
};

type Selector = { [componentName :string] :string };
type Attributes = import('./Attributes').default;