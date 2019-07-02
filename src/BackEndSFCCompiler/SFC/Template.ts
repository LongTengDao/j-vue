import undefined from '.undefined';
import Error from '.Error';
import SyntaxError from '.SyntaxError';
import create from '.Object.create';

import { newRegExp } from '@ltd/j-regexp';

import _ from './Private';
import Block from './Block';
import Content from './Template.Content';
import Element from './Template.Content.Element';
import { TOKENS, AliasName, localOrComponentName, className, TAG_EMIT_CHAR, TAG_LIKE } from './RE';

const TEMPLATE_END_TAG = newRegExp.i`</template${TAG_EMIT_CHAR}`;

const PARTIAL = newRegExp`^
	\s*(?:
		${AliasName}\s*
		=\s*
			${localOrComponentName}
			(?:\.${className})*
		\s*;
	\s*)*
$`;

const HTML = /^(?:HTML|\s*text\/html\s*)$/i;

export default class Template extends Block {
	
	abbr? :Partial
	keys? :string
	functional? :boolean
	
	constructor (attributes :Attributes, inner :string | undefined) {
		
		if ( inner!==undefined && attributes.lang && !HTML.test(attributes.lang) ) {
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError(`.vue 文件的 template 块（非 html 状态下）中，存在可能使得正常结束判定结果模糊的标签语法标记`); }
			super('template', attributes, true, inner, TEMPLATE_END_TAG);
		}
		else {
			super('template', attributes, true, inner, null);
		}
		
		const _this :Template = _(this);
		
		if ( 'abbr.' in attributes ) {
			const literal = attributes['abbr.'];
			if ( literal===undefined ) { throw SyntaxError(`template 功能块元素的“abbr.”属性的缺省值写法还没有实现`); }
			else {
				if ( !PARTIAL.test(literal) ) { throw SyntaxError(`template 块的“abbr.”属性语法错误：\n${literal}`); }
				const abbr :Partial = create(null);
				for ( const pair of literal.split(';') ) {
					const tokens = pair.match(TOKENS);
					if ( tokens ) {
						const xName :string = tokens[0];
						const localName_class :string[] = tokens[1].split('.');
						abbr[xName] = {
							tagName: localName_class.pop()!,
							class: localName_class.length
								? localName_class.join(' ') || `__${xName}__`
								: '',
						};
					}
				}
				_this.abbr = abbr;
			}
		}
		
		if ( 'scoped:keys' in attributes ) {
			if ( attributes['scoped:keys']===undefined ) { throw SyntaxError(`template 功能块元素的 scoped:keys 属性必须具有值`); }
			_this.keys = attributes['scoped:keys'];
		}
		
		if ( 'functional' in attributes ) {
			throw Error(`jVue 暂未支持编译 functional template，因为无法设想这种实际场景，从而也无法进行相应的功能设计`);
			//if ( attributes.functional!==undefined ) { throw SyntaxError(`template 功能块元素的 functional 属性必须是空属性`); }
			//_this.functional = true;
		}
		
	}
	
	get content () :Content {
		const _this :{ content :Content } = _(this);
		if ( _this.content ) { return _this.content; }
		if ( typeof this.inner!=='string' ) { throw Error(`自闭合的 template 功能块元素必须自行（根据 src 属性）加载 inner 值`); }
		if ( this.lang && !HTML.test(this.lang) ) { throw Error(`template 功能块元素如果设置了非 html 的 lang 属性值，那么必须自行提供转译后的 inner，并将 lang 设置为 html`); }
		return _this.content = new Content(this.inner, _(this).abbr);
	}
	
	get innerHTML () :string {
		if ( this.content.childNodes.length!==1 ) { throw Error(`Vue 从 2.0 开始，只允许组件的 template 存在一个根节点`); }
		const rootNode = this.content.firstChild;
		if ( !( rootNode instanceof Element ) ) { throw Error(`Vue 从 2.0 开始，组件的 template 的根节点必须是元素节点`); }
		return rootNode.outerHTML;
	}
	
};

export type Partial = { [xName :string] :{ tagName :string, class :string } };
import Attributes from './Attributes';