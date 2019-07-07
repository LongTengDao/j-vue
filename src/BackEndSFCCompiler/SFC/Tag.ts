import SyntaxError from '.SyntaxError';
import throwSyntaxError from '.throw.SyntaxError';

import * as Entities from './Entities';
import Attributes from './Attributes';

import { ATTRIBUTE, ATTRIBUTE_NAME_VALUE, TAG, IS_TAG, TAG_LIKE } from './RE';

export const ELEMENT_START :1.1 = 1.1;
export const ELEMENT_END :1.2 = 1.2;
export const ELEMENT_SELF_CLOSING :1.3 = 1.3;
export const TEXT :3 = 3;
export const COMMENT :8 = 8;
export const EOF :0 = 0;

export function Tag (html :string, position :number) {
	
	let rest :string;
	
	if ( html.startsWith('<', position) ) {
		
		if ( html.startsWith('!', position+1) ) {
			if ( !html.startsWith('--', position+2) ) { throw SyntaxError(html.startsWith('[CDATA[', position+2) ? `“<![CDATA[”“]]>”语法只能用于 foreign 元素（MathML 或 SVG）内` : `标准的注释语法应由“<!--”而非“ <!”开启`); }
			if ( html.startsWith('>', position+4) || html.startsWith('->', position+4) ) { throw SyntaxError(`紧随“<!--”注释开始语法之后出现的“>”或“->”会造成注释意外中断`); }
			const end :number = html.indexOf('-->', position+4);
			if ( end<0 ) { throw SyntaxError(html.includes('--!>', position+4) ? '应使用“-->”而非“--!>”关闭注释节点' : '存在未关闭的注释节点'); }
			const data :string = html.slice(position+4, end);
			if ( data.includes('--!>') ) { throw SyntaxError(`“--!>”会造成注释意外中断`); }
			return { type: COMMENT, data, end: end+3 };
		}
		
		if ( html.startsWith('?', position+1) ) { throw SyntaxError(`在 HTML 上下文中，“<?”XML 指令/声明只会被作为注释对待，而且其引号属性并不安全`); }
		
		rest = html.slice(position);
		
		if ( IS_TAG.test(rest) ) {
			const { 0: { length }, 1: endSolidus, 2: xName, 3: attributesLiteral, 4: selfClosingSolidus } = TAG.exec(rest) || throwSyntaxError('标签格式有误');
			if ( endSolidus ) {
				if ( attributesLiteral ) { throw SyntaxError(`结束标签中存在属性`); }
				if ( selfClosingSolidus ) { throw SyntaxError(`结束标签中存在自关闭斜杠`); }
				return { type: ELEMENT_END, xName, end: position+length };
			}
			const attributes :Attributes = new Attributes;
			if ( attributesLiteral ) {
				for ( let name of attributesLiteral.match(ATTRIBUTE)! ) {
					let value :string | undefined;
					if ( name.includes('=') ) {
						( { 1: name, 2: value } = ATTRIBUTE_NAME_VALUE.exec(name)! );
						value = Entities.unescape(value.startsWith('"') || value.startsWith('\'') ? value.slice(1, -1) : value);
					}
					if ( name in attributes ) { throw SyntaxError(`标签中出现了重复的属性“${name}”`); }
					else { attributes[name] = value; }
				}
				if ( attributesLiteral.endsWith('/') ) { throw SyntaxError(`标签结尾处的“/”有歧义，无法达到标注标签为自闭合的目的，而是会作为最后一个无引号属性值的结束字符`); }
			}
			return { type: selfClosingSolidus ? ELEMENT_SELF_CLOSING : ELEMENT_START, xName, attributes, end: position+length };
		}
		
	}
	
	else { rest = html.slice(position); }
	
	if ( rest ) {
		let end :number = rest.search(TAG_LIKE);
		end = end<0 ? html.length : position+end;
		return { type: TEXT, raw: html.slice(position, end), end };
	}
	
	return { type: EOF, end: html.length };
	
}
