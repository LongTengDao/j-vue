import undefined from '.undefined';
import SyntaxError from '.SyntaxError';
import throwSyntaxError from '.throw.SyntaxError';

import { newRegExp } from '@ltd/j-regexp';

import Node from './Template.Content.Node';
import Element from './Template.Content.Element';
import Text from './Template.Content.Text';
import Mustache from './Mustache';
import Snippet from './Snippet';
import { TAG_EMIT_CHAR } from './RE';
import { Tag, ELEMENT_END, ELEMENT_SELF_CLOSING, COMMENT, TEXT, EOF } from './Tag';

import { VOID_ELEMENTS, RAW_TEXT_ELEMENTS } from 'lib:elements';

const TEXTAREA_END_TAG = newRegExp`</textarea${TAG_EMIT_CHAR}`;
const STYLE_END_TAG = newRegExp`</STYLE${TAG_EMIT_CHAR}`;
const TITLE_END_TAG = newRegExp`</title${TAG_EMIT_CHAR}`;
const TEXTAREA = /^textarea$/i;

let html :string = '';
let index :number = 0;
let partial :Partial | undefined;

function parseAppend (xName :string, node :Node) :void {
	for ( ; ; ) {
		const tag = Tag(html, index);
		if ( tag.type===EOF ) {
			if ( xName ) { throw SyntaxError(`template 块中存在未关闭的 ${xName} 标签`); }
			index = tag.end;
			return;
		}
		if ( tag.type===TEXT ) {
			const data :string = new Mustache(tag.raw).toData();
			data && node.appendChild(new Text(data));
			index = tag.end;
			continue;
		}
		if ( tag.type===COMMENT ) {
			index = tag.end;
			continue;
		}
		if ( tag.type===ELEMENT_END ) {
			tag.xName===xName || throwSyntaxError(xName
				? `在 ${xName} 配对的结束标签出现前，出现了预期外的结束标签“</${tag.xName}>”`
				: `template 块中凭空出现了“</${tag.xName}>”结束标签`
			);
			index = tag.end;
			return;
		}
		tag.xName==='script' && throwSyntaxError(`Vue 不允许 template 中存在 script 标签`);
		tag.xName==='style' && throwSyntaxError(`Vue 不允许 template 中存在 style 标签（真需要时，考虑使用 jVue 的 STYLE 函数式组件）`);
		const element :Element = node.appendChild(new Element(xName, tag.attributes, partial && partial[xName]));
		index = tag.end;
		if ( tag.type===ELEMENT_SELF_CLOSING || VOID_ELEMENTS.test(tag.xName) ) { continue; }
		// iframe：Vue 运行所必须的 IE9+ 刚好允许其中嵌套标签
		if ( xName==='textarea' || xName==='title' || xName==='STYLE' ) {
			if ( 'v-text' in element.attributes || 'v-html' in element.attributes ) {
				throw SyntaxError((
					xName==='textarea' ? `由于 Vue 不能正确对待 ${xName} 标签中的类标签文本（形如标签的文本会被剔除）` :
						xName==='STYLE' ? `非自闭合 STYLE 组件中的内容为了避免被 Vue 额外修正（形如标签的文本会被剔除）` :
							xName==='title' ? `由于 Vue 不能正确对待 ${xName} 标签中的类标签文本（会试着真的作为标签解析）` :
								``
				)+`，jVue 会将其编译为 v-text 属性，因此标签不能已经具备 v-text 或 v-html 属性`);
			}
			const endTagStart = html.slice(index).search(
				xName==='textarea' ? TEXTAREA_END_TAG :
					xName==='STYLE' ? STYLE_END_TAG :
						xName==='title' ? TITLE_END_TAG :
							null as never
			);
			endTagStart<0 && throwSyntaxError(`template 块中存在未关闭的 ${xName} 标签`);
			const expression :string = new Mustache(html.slice(index, endTagStart)).toExpression();
			if ( expression ) { element.attributes['v-text'] = expression; }
			index = Tag(html, index = endTagStart).end;
		}
		else if ( TEXTAREA.test(xName) ) {
			throw SyntaxError(
				`Vue 不会将 textarea 的任何大小写变种中的内容理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，`+
				`jVue 虽可对其进行转写（比如“<component is="${xName}">”或“<${xName} v-text="..." />”），`+
				`但由于缺乏约定（就连 Vue 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），`+
				`并不知道该往什么方向进行`
			);
		}
		else if ( RAW_TEXT_ELEMENTS.test(xName) ) {
			throw SyntaxError(
				`Vue 不会将 style 或 script 的任何大小写变种中的内容理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，`+
				`jVue 虽可对其进行转写（比如“<component is="${xName}">”或“<${xName} v-text="..." />”），`+
				`但由于缺乏约定（就连 Vue 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），`+
				`并不知道该往什么方向进行（除 jVue 推荐的 STYLE 组件用来模拟 style 外）`
			);
		}
		else {
			parseAppend(xName, element);// 不需要改循环实现，因为层数多了 Vue 本身也会爆栈。
		}
	}
}

export default class Content extends Node {
	
	constructor (inner :string, abbr? :Partial) {
		super();
		if ( inner ) {
			partial = abbr;
			html = inner;
			index = 0;
			try { parseAppend('', this); }
			catch (error) {
				error.message = `${error.message}：\n${Snippet(inner, index)}`;
				throw error;
			}
			finally {
				partial = undefined;
				html = '';
			}
		}
	}
	
	* toSource (tab :string = '\t') :IterableIterator<string> {
		for ( const childNode of this.childNodes ) {
			yield * childNode.toSource(tab);
		}
	}
	
};

import { Partial } from './Template';