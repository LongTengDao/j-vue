import undefined from '.undefined';
import Error from '.Error';
import SyntaxError from '.SyntaxError';
import ReferenceError from '.ReferenceError';
import RegExp from '.RegExp';

import { newRegExp } from '@ltd/j-regexp';
import { NON_SCALAR as SURROGATE_IN_INPUT_STREAM } from '@ltd/j-utf';

import { FOREIGN_ELEMENTS, VOID_ELEMENTS, RAW_TEXT_ELEMENTS } from 'lib:elements';

import { forAliasRE, slotRE, emptySlotScopeToken, SLOT_DIRECTIVE, BAD_SLOT_NAME, BAD_SCOPE, BAD_KEY, BAD_REF } from '../../INTERNAL';
import { CONTROL_CHARACTER as CONTROL_CHARACTER_IN_INPUT_STREAM, NONCHARACTER as NONCHARACTER_IN_INPUT_STREAM, TAG_EMIT_CHAR } from '../../RE';
import { Tag, ELEMENT_END, ELEMENT_SELF_CLOSING, COMMENT, TEXT, EOF } from '../../Tag';
import { EMPTY } from '../../Attributes';
import Params from '../../Params';
import Node from './Node';
import Element from './Element';
import Text from './Text';
import Mustache from '../../Mustache';
import Snippet from '../../Snippet';

const foreign_elements = RegExp(FOREIGN_ELEMENTS.source);
const TEXTAREA_END_TAG = newRegExp`</textarea${TAG_EMIT_CHAR}`;
const STYLE_END_TAG = newRegExp`</STYLE${TAG_EMIT_CHAR}`;
const TITLE_END_TAG = newRegExp`</title${TAG_EMIT_CHAR}`;
const TEXTAREA = /^textarea$/i;
const TNS = /^[\t\n ]+$/;
const SOF_TNS_LT = /^[\t\n ]+</;
const GT_TNS_EOF = />[\t\n ]+$/;
const V_BIND = /^(?:v-bind)?:([^.]*)/;

let html :string = '';
let index :number = 0;
let partial :Partial | undefined;
let delimiters_0 :string = '';
let delimiters_1 :string = '';

function parseAppend (parentNode_xName :string, parentNode :Content | Element, V_PRE :boolean, FOREIGN :boolean) :void {
	for ( ; ; ) {
		const tag = Tag(html, index, FOREIGN);
		const { type } = tag;
		if ( type===EOF ) {
			if ( parentNode_xName ) { throw SyntaxError(`template 块中存在未关闭的 ${parentNode_xName} 标签`); }
			index = tag.end;
			return;
		}
		if ( type===TEXT ) {
			const data :string = new Mustache(tag.raw!, V_PRE, delimiters_0, delimiters_1).toData();
			data && parentNode.appendChild(new Text(data));
			index = tag.end;
			continue;
		}
		if ( type===COMMENT ) {
			index = tag.end;
			continue;
		}
		const XName = tag.xName!;
		if ( type===ELEMENT_END ) {
			if ( XName!==parentNode_xName ) {
				throw SyntaxError(parentNode_xName
					? `在 ${parentNode_xName} 配对的结束标签出现前，出现了预期外的结束标签“</${XName}>”`
					: `template 块中凭空出现了“</${XName}>”结束标签`
				);
			}
			index = tag.end;
			return;
		}
		const xName = partial && XName in partial ? partial[XName].tagName : XName;
		if ( xName==='script' ) { throw ReferenceError(`Vue 不允许 template 中存在 script 标签`); }
		if ( xName==='style' ) { throw ReferenceError(`Vue 不允许 template 中存在 style 标签（真需要时，考虑使用 jVue 的 STYLE 函数式组件）`); }
		const attributes :Attributes = tag.attributes!;
		const v_pre :boolean = V_PRE || 'v-pre' in attributes;
		if ( !v_pre && ( ':is' in attributes || 'v-bind:is' in attributes ) ) {}
		else if ( !v_pre && 'is' in attributes ) {
			if ( !foreign_elements.test(attributes.is!) && FOREIGN_ELEMENTS.test(attributes.is!) ) {
				throw ReferenceError(`通过 is 属性，也无法避免 SVG 命名空间中的 foreign 元素的大小写变种“${attributes.is!}”，不被 Vue 作为组件对待`);
			}
		}
		else {
			if ( !foreign_elements.test(xName) && FOREIGN_ELEMENTS.test(xName) ) {
				throw ReferenceError(`SVG 命名空间中的 foreign 元素的大小写变种“${xName}”，同样不被 Vue 作为组件对待`);
			}
		}
		if ( !v_pre ) {
			if ( 'v-cloak' in attributes ) { throw SyntaxError(`单文件组件模板中不可能用到 v-cloak 指令`); }
			if ( 'v-for' in attributes ) {
				const value = attributes['v-for']!;
				Params(forAliasRE.exec(value)![0], 1, 3, `“v-for="${value}"”中的“of/in”前`);
			}
			if ( xName!=='slot' && 'slot' in attributes || 'slot-scope' in attributes || xName==='template' && 'scope' in attributes ) {
				throw SyntaxError(`slot、slot-scope、template scope 均已被 v-slot 取代`);
			}
			if ( xName==='slot' ) {
				if ( BAD_SLOT_NAME.test(attributes['name'] || 'default') ) { throw ReferenceError(`“$”或“_”开头的 slot name 可能无法按预期工作`); }
				for ( let name in attributes ) {
					const bind = V_BIND.exec(name);
					if ( bind ) { name = bind[1]; }
					else if ( name.startsWith('v-') && !SLOT_DIRECTIVE.test(name) || name.startsWith('@') || name.startsWith('#') ) {
						throw SyntaxError(`slot 组件上除 v-pre、v-once、v-for、v-if、v-else-if、v-else 和 v-bind 以外的指令都会被忽略，如果想要绑定 ${name} 为作用域属性，请使用 v-bind:${name}`);
					}
					if ( name===BAD_SCOPE ) { throw ReferenceError(`使用“${BAD_SCOPE}”作为 scope 无法按预期工作`); }
					if ( name==='key' || name==='ref' || name==='is' ) { throw SyntaxError(`包括 ${name} 在内的 key、ref、is 在 slot 组件上是无效的，即便使用 v-bind 结果也是一样`); }
				}
			}
			else {
				let already = '';
				for ( const name in attributes ) {
					if ( slotRE.test(name) ) {
						if ( already ) { throw SyntaxError(`不能同时存在多个插槽指令“${already}”和“${name}”`); }
						already = name;
						const value = attributes[name];
						if ( value===emptySlotScopeToken ) { throw ReferenceError(`“${emptySlotScopeToken}”是保留字，编译结果相当于留空`); }
						value===EMPTY ||
						Params(value, 0, 1, `${name}="${value}"中`);
						if ( BAD_SLOT_NAME.test(name) ) { throw ReferenceError(`“$”或“_”开头的 slot name 可能无法按预期工作`); }
					}
				}
				if ( attributes['key']===BAD_KEY ) { throw ReferenceError(`使用“${BAD_KEY}”作为 key 无法按预期工作`); }
				if ( attributes['ref']===BAD_REF ) { throw ReferenceError(`使用“${BAD_REF}”作为 ref 无法按预期工作`); }
			}
		}
		const element :Element = parentNode.appendChild(new Element(xName, attributes, partial && partial[XName]));
		index = tag.end;
		if ( type===ELEMENT_SELF_CLOSING || VOID_ELEMENTS.test(xName) ) { continue; }
		if ( !v_pre && ( 'v-text' in attributes || 'v-html' in attributes ) ) {
			throw SyntaxError(`开放标签，除非自身或外层节点有 v-pre 属性，否则不能再设置 v-text 或 v-html 属性`);
		}
		const foreign :boolean = FOREIGN || xName==='svg' || xName==='math';
		// iframe：Vue 运行所必须的 IE9+ 刚好允许其中嵌套标签
		// pre
		if ( xName==='textarea' || xName==='title' || xName==='STYLE' ) {
			if ( 'v-text' in attributes || 'v-html' in attributes || v_pre ) {
				throw SyntaxError((
					xName==='textarea' ? `由于 Vue 不能正确对待 ${xName} 标签中的类标签文本（形如标签的文本会被剔除）` :
						xName==='STYLE' ? `非自闭合 ${xName} 组件中的内容为了避免被 Vue 额外修正（形如标签的文本会被剔除）` :
							xName==='title' ? `由于 Vue 不能正确对待 ${xName} 标签中的类标签文本（会试着真的作为标签解析）` :
								``
				)+`，jVue 会将其编译为 v-text 属性，因此标签不能已经具备 v-text 或 v-html，且自身或外层节点不能有 v-pre 属性`);
			}
			let endTagStart :number = html.slice(index).search(
				xName==='textarea' ? TEXTAREA_END_TAG :
					xName==='STYLE' ? STYLE_END_TAG :
						xName==='title' ? TITLE_END_TAG :
							null as never
			);
			if ( endTagStart<0 ) { throw SyntaxError(`template 块中存在未关闭的 ${xName} 标签`); }
			endTagStart += index;
			const expression :string = new Mustache(html.slice(index, endTagStart), v_pre, delimiters_0, delimiters_1).toExpression();
			if ( expression ) { attributes['v-text'] = expression; }
			index = Tag(html, index = endTagStart, foreign).end;
		}
		else if ( TEXTAREA.test(xName) ) {
			throw ReferenceError(
				`Vue 不会将 textarea 的任何大小写变种中的内容理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，`+
				`jVue 虽可对其进行转写（比如“<component is="${xName}">”或“<${xName} v-text="..." />”），`+
				`但由于缺乏约定（就连 Vue 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），`+
				`并不知道该往什么方向进行`
			);
		}
		else if ( RAW_TEXT_ELEMENTS.test(xName) ) {
			throw ReferenceError(
				`Vue 不会将 style 或 script 的任何大小写变种中的内容理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，`+
				`jVue 虽可对其进行转写（比如“<component is="${xName}">”或“<${xName} v-text="..." />”），`+
				`但由于缺乏约定（就连 Vue 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），`+
				`并不知道该往什么方向进行（除 jVue 推荐的 STYLE 组件用来模拟 style 外）`
			);
		}
		else {
			parseAppend(XName, element, v_pre, foreign);// 不需要改循环实现，因为层数多了 Vue 本身也会爆栈。
		}
	}
}

export default class Content extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content'; }
	
	constructor (inner :string, _ :Private) {
		if ( !inner ) { return; }
		if ( SURROGATE_IN_INPUT_STREAM.test(inner) ) { throw Error(`HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
		if ( NONCHARACTER_IN_INPUT_STREAM.test(inner) ) { throw Error(`HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER_IN_INPUT_STREAM.test(inner) ) { throw Error(`HTML 字符流中禁止出现除 NUL 空（U+00）、TAB 水平制表（U+09）、LF 换行（U+0A）、FF 换页（U+0C）、CR 回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		delimiters_0 = _.delimiters_0;
		delimiters_1 = _.delimiters_1;
		partial = _.abbr;
		html = inner;
		index = 0;
		super();
		try { parseAppend('', this, false, false); }
		catch (error) {
			error.message = `${error.message}：\n${Snippet(inner, index)}`;
			throw error;
		}
		finally {
			partial = undefined;
			html = '';
		}
		if ( this.firstChild instanceof Text && TNS.test(this.firstChild.data) && SOF_TNS_LT.test(inner) ) { this.shift(); }
		if ( this.lastChild instanceof Text && TNS.test(this.lastChild.data) && GT_TNS_EOF.test(inner) ) { this.pop(); }
	}
	
	* beautify (this :Content, tab :string = '\t') :IterableIterator<string> {
		for ( let index = 0, { length } = this; index<length; ++index ) {
			yield * this[index].beautify(tab);
		}
	}
	
};

type Private = import('../').Private;
type Partial = import('../').Partial;
type Attributes = import('../../Attributes').default;