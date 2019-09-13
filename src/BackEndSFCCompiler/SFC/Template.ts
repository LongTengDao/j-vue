import undefined from '.undefined';
import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import create from '.Object.create';
import freeze from '.Object.freeze';
import NULL from '.null.prototype';

import { newRegExp } from '@ltd/j-regexp';

import _ from './private';
import Block from './Block';
import Content from './Template.Content';
import Element from './Template.Content.Element';
import { TOKENS, AliasName, localOrComponentName, className, TAG_EMIT_CHAR, TAG_LIKE } from './RE';
import { EMPTY } from './Attributes';
import { DELIMITERS_0, DELIMITERS_1 } from './Mustache';

const TEMPLATE_END_TAG = newRegExp('i')`</template${TAG_EMIT_CHAR}`;

const PARTIAL = newRegExp`^
	\s*(?:
		${AliasName}\s*
		=\s*
			${localOrComponentName}
			(?:\.?|(?:\.${className})*)
		\s*;
	\s*)*
$`;

const HTML = /^(?:HTML|\s*text\/html\s*)$/i;

export default class Template extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.Template'; }
	
	constructor (attributes :Attributes, inner :string | undefined) {
		
		if ( inner!==undefined && attributes.lang && !HTML.test(attributes.lang) ) {
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError(`.vue 文件的 template 块（非 html 状态下）中，存在可能使得正常结束判定结果模糊的标签语法标记`); }
			super('template', attributes, true, inner, TEMPLATE_END_TAG);
		}
		else {
			super('template', attributes, true, inner, null);
		}
		
		const _this :Private = _(this);
		
		if ( '.abbr' in attributes ) {
			const literal = attributes['.abbr'];
			if ( literal===EMPTY ) { throw SyntaxError(`template 功能块元素的“.abbr”属性的缺省值写法还没有实现`); }
			else {
				if ( !PARTIAL.test(literal) ) { throw SyntaxError(`template 块的“.abbr”属性语法错误：\n${literal}`); }
				const abbr = create(NULL) as Partial;
				for ( const pair of literal.split(';') ) {
					const tokens = pair.match(TOKENS);
					if ( tokens ) {
						const xName :string = tokens[0];
						const localName_class :string[] = tokens[1].split('.');
						abbr[xName] = {
							tagName: localName_class.shift()!,
							class: localName_class.length
								? localName_class.join(' ') || `__${xName}__`
								: '',
						};
					}
				}
				_this.abbr = abbr;
			}
		}
		
		if ( '.keys' in attributes ) {
			if ( attributes['.keys']===EMPTY ) { throw SyntaxError(`template 功能块元素的 .keys 属性必须具有值`); }
			_this.keys = attributes['.keys'];
		}
		
		if ( 'functional' in attributes ) {
			throw Error(`jVue 暂未支持编译 functional template，因为无法设想这种实际场景，从而也无法进行相应的功能设计`);
			//if ( attributes.functional!==EMPTY ) { throw SyntaxError(`template 功能块元素的 functional 属性必须是空属性`); }
			//_this.functional = true;
		}
		
		let notYet = true;
		for ( const name in attributes ) {
			if ( name.startsWith('.delimiters:') ) {
				if ( !notYet ) { throw SyntaxError(`template 功能块只能存在一个 .delimiters:* 格式的属性`); }
				notYet = false;
				const delimiters = attributes[name];
				if ( !delimiters ) { throw SyntaxError(`template 功能块的 ${name} 属性值不得为空`); }
				const { 0: delimiters_0, 1: delimiters_1, length } = delimiters.split(name.slice(12));
				if ( !delimiters_0 || !delimiters_1 || length!==2 ) { throw SyntaxError(`template 功能块的 ${name}="${attributes[name]}" 属性存在语法错误`); }
				_this.delimiters_0 = delimiters_0;
				_this.delimiters_1 = delimiters_1;
			}
		}
		if ( notYet ) {
			_this.delimiters_0 = DELIMITERS_0;
			_this.delimiters_1 = DELIMITERS_1;
		}
		
	}
	
	get content () :Content {
		const _this :Private = _(this);
		let inner :string | undefined = _this.innerHTML;
		if ( inner===undefined ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error(`自闭合的 template 功能块元素必须自行（根据 src 属性）加载 inner 值`); }
			if ( this.lang && !HTML.test(this.lang) ) { throw Error(`template 功能块元素如果设置了非 html 的 lang 属性值，那么必须自行提供转译后的 innerHTML`); }
			_this.cache = inner;
		}
		if ( _this.content && _this.cache===inner ) { return _this.content; }
		const content = new Content(inner, _this);
		_this.content = content;
		_this.cache = inner;
		return content;
	}
	
	get innerHTML () :string {
		const { childNodes } = this.content;
		if ( childNodes.length!==1 ) { throw Error(`Vue 从 2.0 开始，只允许组件的 template 存在一个根节点`); }
		const rootNode = childNodes[0];
		if ( !( rootNode instanceof Element ) ) { throw Error(`Vue 从 2.0 开始，组件的 template 的根节点必须是元素节点`); }
		return rootNode.outerHTML;
	}
	set innerHTML (value :string) {
		if ( typeof <unknown> value!=='string' ) { throw TypeError(`innerHTML 只能被赋值字符串`); }
		_(this).innerHTML = value;
	}
	
};

freeze(Template.prototype);

export type Private = object & {
	abbr? :Partial
	keys? :string
	functional? :boolean
	cache? :string
	content? :Content
	innerHTML? :string
	delimiters_0 :string
	delimiters_1 :string
};
export type Partial = { [xName :string] :{ tagName :string, class :string } };
type Attributes = import('./Attributes').default;