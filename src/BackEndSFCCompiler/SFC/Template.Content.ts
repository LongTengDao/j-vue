import undefined from '.undefined';
import Error from '.Error';
import SyntaxError from '.SyntaxError';
import ReferenceError from '.ReferenceError';
import throwSyntaxError from '.throw.SyntaxError';
import RegExp from '.RegExp';
import __null__ from '.null';

import { newRegExp } from '@ltd/j-regexp';
import { FOREIGN_ELEMENTS, VOID_ELEMENTS, RAW_TEXT_ELEMENTS } from 'lib:elements';

import Node from './Template.Content.Node';
import Element from './Template.Content.Element';
import Text from './Template.Content.Text';
import Mustache from './Mustache';
import Snippet from './Snippet';
import { TAG_EMIT_CHAR } from './RE';
import { Tag, ELEMENT_END, ELEMENT_SELF_CLOSING, COMMENT, TEXT, EOF } from './Tag';
import { Parser } from '../dependencies';
import { escapeAttributeValue } from './Entities';

const foreign_elements = RegExp(FOREIGN_ELEMENTS.source);
const TEXTAREA_END_TAG = newRegExp`</textarea${TAG_EMIT_CHAR}`;
const STYLE_END_TAG = newRegExp`</STYLE${TAG_EMIT_CHAR}`;
const TITLE_END_TAG = newRegExp`</title${TAG_EMIT_CHAR}`;
const TEXTAREA = /^textarea$/i;
const TNS = /^[\t\n ]+$/;
const SOF_TNS_LT = /^[\t\n ]+</;
const GT_TNS_EOF = />[\t\n ]+$/;

const _NAME = /^_[a-z]$/;
const _NAMES :string[] = [];
function Pattern (node :any) :void {
	switch ( node.type ) {
		case 'Identifier':
			if ( _NAME.test(node.name) ) { _NAMES.push(node.name); }
			break;
		case 'ObjectPattern':
			const { properties } = node;
			const { length } = properties;
			for ( let index :number = 0; index<length; ++index ) {
				const property = properties[index];
				Pattern(property.value || property.argument);
			}
			break;
		case 'ArrayPattern':
			node.elements.forEach(Pattern);
			break;
		case 'RestElement':
			Pattern(node.argument);
			break;
		case 'AssignmentPattern':
			Pattern(node.left);
			break;
		default:
			throw Error(`Unrecognized pattern type: ${node.type}`);
	}
}
const forAliasRE = /(?<=^\s*\(?).*?(?=\)?\s+(?:in|of)\s+.*$)/s;
const parserOptions = __null__({
	ecmaVersion: 2014 as 6,
	sourceType: 'module',
	allowReserved: false,
});
function _NAME_test (v_for :string) :boolean {
	const alias :string = forAliasRE.exec(v_for)![0];
	const AST = Parser.parse(`(${alias})=>{}`, parserOptions);
	const { params } = AST.body[0].expression;
	_NAMES.length = 0;
	params.forEach(Pattern);
	return _NAMES.length!==0;
}

let html :string = '';
let index :number = 0;
let partial :Partial | undefined;

function parseAppend (parentNode_xName :string, parentNode :Node, V_PRE :boolean, FOREIGN :boolean) :void {
	for ( ; ; ) {
		const tag = Tag(html, index, FOREIGN);
		const { type } = tag;
		if ( type===EOF ) {
			if ( parentNode_xName ) { throw SyntaxError(`template 块中存在未关闭的 ${parentNode_xName} 标签`); }
			index = tag.end;
			return;
		}
		if ( type===TEXT ) {
			const data :string = new Mustache(tag.raw!, V_PRE).toData();
			data && parentNode.appendChild(new Text(data));
			index = tag.end;
			continue;
		}
		if ( type===COMMENT ) {
			index = tag.end;
			continue;
		}
		const xName = tag.xName!;
		if ( type===ELEMENT_END ) {
			xName===parentNode_xName || throwSyntaxError(parentNode_xName
				? `在 ${parentNode_xName} 配对的结束标签出现前，出现了预期外的结束标签“</${xName}>”`
				: `template 块中凭空出现了“</${xName}>”结束标签`
			);
			index = tag.end;
			return;
		}
		xName==='script' && throwSyntaxError(`Vue 不允许 template 中存在 script 标签`);
		xName==='style' && throwSyntaxError(`Vue 不允许 template 中存在 style 标签（真需要时，考虑使用 jVue 的 STYLE 函数式组件）`);
		const attributes :Attributes = tag.attributes!;
		const v_pre :boolean = V_PRE || 'v-pre' in attributes;
		if ( !v_pre && ( ':is' in attributes || 'v-bind:is' in attributes ) ) {}
		else if ( !v_pre && 'is' in attributes ) {
			if ( !foreign_elements.test(attributes.is!) && FOREIGN_ELEMENTS.test(attributes.is!) ) {
				throw SyntaxError(`通过 is 属性，也无法避免 SVG 命名空间中的 foreign 元素的大小写变种“${attributes.is!}”，不被 Vue 作为组件对待`);
			}
		}
		else {
			if ( !foreign_elements.test(xName) && FOREIGN_ELEMENTS.test(xName) ) {
				throw SyntaxError(`SVG 命名空间中的 foreign 元素的大小写变种“${xName}”，同样不被 Vue 作为组件对待`);
			}
		}
		if ( !v_pre && 'v-for' in attributes && _NAME_test(attributes['v-for']!) ) {
			const names :string = _NAMES.join('”“');
			_NAMES.length = 0;
			throw ReferenceError(`“v-for="${escapeAttributeValue(attributes['v-for']!)}"”中存在以下划线开头后跟字母的危险变量“${names}”，这可能使得 Vue 模板编译结果以错误的方式运行`);
		}
		const element :Element = parentNode.appendChild(new Element(xName, attributes, partial));
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
			endTagStart<0 && throwSyntaxError(`template 块中存在未关闭的 ${xName} 标签`);
			endTagStart += index;
			const expression :string = new Mustache(html.slice(index, endTagStart), v_pre).toExpression();
			if ( expression ) { attributes['v-text'] = expression; }
			index = Tag(html, index = endTagStart, foreign).end;
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
			parseAppend(xName, element, v_pre, foreign);// 不需要改循环实现，因为层数多了 Vue 本身也会爆栈。
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
			try { parseAppend('', this, false, false); }
			catch (error) {
				error.message = `${error.message}：\n${Snippet(inner, index)}`;
				throw error;
			}
			finally {
				partial = undefined;
				html = '';
			}
			if ( this.firstChild instanceof Text && TNS.test(this.firstChild.data) && SOF_TNS_LT.test(inner) ) { this.childNodes.shift(); }
			if ( this.lastChild instanceof Text && TNS.test(this.lastChild.data) && GT_TNS_EOF.test(inner) ) { this.childNodes.pop(); }
		}
	}
	
	* toSource (tab :string = '\t') :IterableIterator<string> {
		for ( const childNode of this.childNodes ) {
			yield * childNode.toSource(tab);
		}
	}
	
};

type Partial = import('./Template').Partial;
type Attributes = import('./Attributes').default;