import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import create from '.Object.create';
import freeze from '.Object.freeze';
import undefined from '.undefined';
import NULL from '.null.prototype';

import { newRegExp } from '@ltd/j-regexp';

import KEYS from '../../../FrontEndRuntimeDependency/Scope/KEYS';

import _ from '../private';
import Block from '../Block';
import Content, { compatible_render as _compatible_render, hasSingleElementChild as isVue2Compatible } from './Content/';
import { ASCII_WHITESPACE as s, TOKENS, AliasName, localOrComponentNameWithoutDot, className, TAG_EMIT_CHAR, TAG_LIKE, isLocalOrComponentNameDotable, NameAs__Key__ } from '../RE';
import { EMPTY } from '../Attributes';
import { DELIMITERS_0, DELIMITERS_1 } from '../Mustache';

const TEMPLATE_END_TAG = newRegExp('i')`</template${TAG_EMIT_CHAR}`;

/* AliasName: */const PARTIAL = newRegExp('u')`^
	${s}*(?:
		${AliasName}${s}*
		=${s}*
			${localOrComponentNameWithoutDot}
			(?:(?:\.${className})*|\.?)
		${s}*;
	${s}*)*
$`;
/* AliasName: */const PARTIAL_WITH_TAG = newRegExp('u')`^
	${s}*(?:
		${AliasName}${s}*;
	${s}*)*
$`;

const HTML = newRegExp('i')`^(?:HTML|${s}*text/html${s}*)$`;

export let compatible_render :boolean = true;

export default class Template extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.Template'; }
	
	constructor (attributes :Attributes, inner :string | undefined) {
		
		if ( inner!==undefined && attributes.lang && !HTML.test(attributes.lang) ) {
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError(`.vue 文件的 template 块（非 html 状态下）中，存在标签语法标记，这可能模糊正常结束判定的结果`); }
			super('template', attributes, true, inner, TEMPLATE_END_TAG);
		}
		else {
			super('template', attributes, true, inner, null);
		}
		
		if ( 'functional' in attributes ) {
			throw Error(`jVue 暂未支持编译 functional template，因为无法设想这种实际场景，从而也无法进行相应的功能设计，且该功能在 Vue 3 中已经被废弃`);
			//if ( attributes.functional!==EMPTY ) { throw SyntaxError(`template 功能块元素的 functional 属性必须是空属性`); }
			//_this.functional = true;
		}
		
		const _this :Private = _.new(this);
		
		if ( '.keys' in attributes ) {
			const _keys = attributes['.keys'];
			if ( _keys===EMPTY ) { throw SyntaxError(`template 功能块的 .keys 属性必须具有值`); }
			const keys = _keys.match(KEYS);
			if ( !keys ) { throw SyntaxError(`template 功能块的 .keys 属性值未匹配到可用的内容`); }
			_this.keys = keys;
		}
		
		if ( '.abbr' in attributes ) {
			const literal = attributes['.abbr'];
			if ( literal===EMPTY ) { throw SyntaxError(`template 功能块的“.abbr”属性必须具有值`); }
			if ( !PARTIAL.test(literal) ) { throw SyntaxError(`template 功能块的“.abbr”属性语法错误：\n${literal}`); }
			const abbr = _this.abbr = create(NULL) as Partial;
			const pairs = literal.split(';');
			let index = pairs.length;
			while ( index ) {
				const tokens = pairs[--index].match(TOKENS);
				if ( tokens ) {
					const xName :string = tokens[0];
					if ( xName in abbr ) { throw SyntaxError(`template 功能块的“.abbr”属性值中存在重复的条目“${xName}”`); }
					const localName_class = tokens[1].split('.');
					abbr[xName] = {
						tagName: localName_class.shift()!,
						class: localName_class.length
							? localName_class.join(' ') || NameAs__Key__(xName)
							: '',
					};
				}
			}
		}
		for ( const name in attributes ) {
			if ( name.startsWith('.abbr:') ) {
				const tagName = name.slice(6);
				if ( tagName!=='_' && !isLocalOrComponentNameDotable(tagName) ) { throw SyntaxError(`template 功能块的“${name}”属性的标签名部分不符合要求`); }
				const abbr = _this.abbr ?? ( _this.abbr = create(NULL) as Partial );
				const literal = attributes[name];
				if ( literal===EMPTY ) {
					if ( '' in abbr ) { throw SyntaxError(`template 功能块的无值“.abbr:*”属性只能有一个`); }
					abbr[''] = { tagName };
				}
				else {
					if ( !PARTIAL_WITH_TAG.test(literal) ) { throw SyntaxError(`template 功能块的“${name}”属性语法错误：\n${literal}`); }
					const pairs = literal.split(';');
					let index = pairs.length;
					while ( index ) {
						const tokens = pairs[--index].match(TOKENS);
						if ( tokens ) {
							const xName :string = tokens[0];
							if ( xName in abbr ) { throw SyntaxError(`template 功能块的“${name}”属性值中存在重复的条目“${xName}”`); }
							abbr[xName] = { tagName, class: NameAs__Key__(xName) };
						}
					}
				}
			}
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
		
		return this;
		
	}
	
	get content () :Content {
		const _this :Private = _(this);
		let inner :string | undefined = _this.innerHTML;
		if ( inner===undefined ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error(`自闭合的 template 功能块元素必须自行加载 src 属性所要求的 inner 值`); }
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
		const { content } = this;
		Vue2: compatible_render = _compatible_render && isVue2Compatible(content);
		return content.outerHTML;
	}
	set innerHTML (value :string) {
		if ( typeof ( value as unknown )!=='string' ) { throw TypeError(`innerHTML 只能被赋值字符串`); }
		_(this).innerHTML = value;
	}
	
};

freeze(Template.prototype);

export type Private = object & {
	sheet? :Map<string, string>
	shadow? :string
	abbr? :Partial
	keys? :string[]
	//functional? :boolean
	cache? :string
	content? :Content
	innerHTML? :string
	delimiters_0 :string
	delimiters_1 :string
};
export type Partial = { [xName :string] :{ readonly tagName :string, readonly class :string } } & { '' :{ readonly tagName :string } };

import type Attributes from '../Attributes';
