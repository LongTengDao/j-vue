import undefined from '.undefined';
import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import create from '.Object.create';
import freeze from '.Object.freeze';
import NULL from '.null.prototype';

import { newRegExp } from '@ltd/j-regexp';

import { TOKENS, AliasName, localName, className, TAG_EMIT_CHAR } from '../RE';
import Block from '../Block';
import _ from '../private';
import { EMPTY } from '../Attributes';
import Sheet from './Sheet/';

const SELECTOR = newRegExp`^
	\s*(?:
		${AliasName}\s*
		(?:=\s*
			(?:${localName}|(?=\.))
			(?:\.${className})*
		\s*)?;
	\s*)*
$`;

const STYLE_END_TAG = newRegExp('i')`</style${TAG_EMIT_CHAR}`;

const CSS = /^\s*(?:text\/)?CSS\s*$/i;

const defaultSelector = (componentName :string) :string => `.__${componentName}__`;

export default class Style extends Block<'style'> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style'; }
	
	constructor (attributes :Attributes, inner :string | undefined) {
		
		super('style', attributes, true, inner, STYLE_END_TAG);
		
		const _this :Private = _(this);
		
		if ( '.abbr' in attributes ) {
			const literal = attributes['.abbr'];
			if ( literal===EMPTY ) { _this.abbr = defaultSelector; }
			else {
				if ( !SELECTOR.test(literal) ) { throw SyntaxError(`style 块的“.abbr”属性语法错误：\n${literal}`); }
				const abbr = create(NULL) as Selector;
				for ( const pair of literal.split(';') ) {
					const tokens = pair.match(TOKENS);
					if ( tokens ) {
						const componentName :string = tokens[0];
						abbr[componentName] = tokens.length>1 ? tokens[1] : defaultSelector(componentName);
					}
				}
				_this.abbr = (componentName :string) :string => {
					if ( componentName in abbr ) { return abbr[componentName]; }
					throw Error(`style 块中存在被遗漏的伪标签名 ${componentName} 选择器`);
				};
			}
		}
		
		if ( 'media' in attributes ) {
			if ( attributes.media===EMPTY ) { throw SyntaxError(`style 功能块元素的 media 属性必须具有值`); }
			_this.media = attributes.media;
		}
		
	}
	
	get sheet () :Sheet {
		const _this :Private = _(this);
		let inner :string | undefined = _this.innerCSS;
		if ( inner===undefined ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error(`自闭合的 style 功能块元素必须自行根据 src 属性加载 inner 值`); }
			const { lang } = this;
			if ( lang && !CSS.test(lang) ) { throw Error(`style 功能块元素如果设置了非 css 的 lang 属性值，那么必须自行提供转译后的 innerCSS`); }
		}
		if ( _this.sheet && _this.cache===inner ) { return _this.sheet; }
		const sheet = new Sheet(inner, _this.abbr);
		_this.sheet = sheet;
		_this.cache = inner;
		return sheet;
	}
	
	get innerCSS () :string {
		return this.sheet.cssText;
	}
	set innerCSS (value :string) {
		if ( typeof <unknown> value!=='string' ) { throw TypeError(`innerCSS 只能被赋值字符串`); }
		_(this).innerCSS = value;
	}
	
};

freeze(Style.prototype);

export type Private = object & {
	abbr? :Replacer
	media? :string
	cache? :string
	sheet? :Sheet
	innerCSS? :string
};
export type Replacer = (componentName :string) => string;
type Selector = { [componentName :string] :string };
type Attributes = import('../Attributes').default;