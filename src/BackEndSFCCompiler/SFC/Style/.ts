import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import create from '.Object.create';
import freeze from '.Object.freeze';
import undefined from '.undefined';
import NULL from '.null.prototype';
import throwSyntaxError from '.throw.SyntaxError';

import { newRegExp } from '@ltd/j-regexp';

import { ASCII_WHITESPACE as s, TOKENS, AliasName, localNameWithoutDot, className, TAG_EMIT_CHAR, NameAs__Key__ } from '../RE';
import Block from '../Block';
import _ from '../private';
import { EMPTY } from '../Attributes';
import Sheet from './Sheet/';

const SELECTOR = newRegExp('u')`^
	${s}*(?:
		${AliasName}${s}*
		(?:=${s}*
			(?:${localNameWithoutDot}|(?=\.))
			(?:\.${className})*
		${s}*)?;
	${s}*)*
$`;

const STYLE_END_TAG = newRegExp('i')`</style${TAG_EMIT_CHAR}`;

const CSS = newRegExp('i')`^${s}*(?:text\/)?CSS${s}*$`;

const defaultSelector = (Name :string) :string => `.${NameAs__Key__(Name)}`;

export default class Style extends Block<'style'> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style'; }
	
	constructor (attributes :Attributes, inner :string | undefined) {
		
		super('style', attributes, true, inner, STYLE_END_TAG);
		
		if ( 'module' in attributes ) { throw Error(`jVue 暂未支持编译 style module`); }
		if ( 'scoped' in attributes ) { throw Error(`jVue 暂未支持编译 style scoped`); }
		if ( 'vars' in attributes ) { throw Error(`jVue 暂未支持编译 style vars`); }
		
		const _this :Private = _.new(this);
		
		_this.allowGlobal = '.global' in attributes && ( attributes['.global']===EMPTY || throwSyntaxError(`style 块的“.global”属性不能具有值`) );
		
		if ( '.abbr' in attributes ) {
			const literal = attributes['.abbr'];
			if ( literal===EMPTY ) { _this.abbr = defaultSelector; }
			else {
				if ( !SELECTOR.test(literal) ) { throw SyntaxError(`style 块的“.abbr”属性语法错误：\n${literal}`); }
				const abbr = create(NULL) as Selector;
				const pairs = literal.split(';');
				const { length } = pairs;
				let index = 0;
				while ( index!==length ) {
					const tokens = pairs[index++].match(TOKENS);
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
		
		return this;
		
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
		if ( typeof ( value as unknown )!=='string' ) { throw TypeError(`innerCSS 只能被赋值字符串`); }
		_(this).innerCSS = value;
	}
	
};

freeze(Style.prototype);

export type Private = object & {
	allowGlobal? :boolean
	abbr? :Replacer
	media? :string
	cache? :string
	sheet? :Sheet
	innerCSS? :string
};
export type Replacer = (this :void, componentName :string) => string;
type Selector = { [componentName :string] :string };

import type Attributes from '../Attributes';