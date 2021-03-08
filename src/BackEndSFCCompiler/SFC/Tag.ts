import SyntaxError from '.SyntaxError';

import { VOID_ELEMENTS } from 'lib:elements';

import Attributes from './Attributes';

import { TAG, IS_TAG, TAG_LIKE } from './RE';

export const ELEMENT_START :1.1 = 1.1;
export const ELEMENT_END :1.2 = 1.2;
export const ELEMENT_SELF_CLOSING :1.3 = 1.3;
export const TEXT :3 = 3;
export const COMMENT :8 = 8;
export const EOF :0 = 0;

export const PLAINTEXT = /^plaintext$/i;
export const LISTING = /^listing/i;
export const XMP = /^xmp$/i;

export const Tag = (html :string, position :number, foreign? :boolean, SHORTHAND? :boolean) => {
	
	let rest :string;
	
	if ( html[position]==='<' ) {
		
		if ( html[position + 1]==='!' ) {
			if ( !html.startsWith('--', position + 2) ) { throw SyntaxError(html.startsWith('[CDATA[', position + 2) && !foreign ? `“<![CDATA[”“]]>”语法只能用于 foreign 元素（MathML 或 SVG）内` : `标准的注释语法应由“<!--”而非“ <!”开启`); }
			if ( html[position + 4]==='>' || html.startsWith('->', position + 4) ) { throw SyntaxError(`紧随“<!--”注释开始语法之后出现的“>”或“->”会造成注释意外中断`); }
			const end = html.indexOf('-->', position + 4);
			if ( end<0 ) { throw SyntaxError(html.includes('--!>', position + 4) ? '应使用“-->”而非“--!>”关闭注释节点' : '存在未关闭的注释节点'); }
			const data :string = html.slice(position + 4, end);
			if ( data.includes('--!>') ) { throw SyntaxError(`“--!>”会造成注释意外中断`); }
			return { type: COMMENT, data, end: end + 3 };
		}
		
		if ( html[position + 1]==='?' ) { throw SyntaxError(foreign ? `不知该如何对待“<?”开启的 XML 指令/声明` : `在 HTML 上下文中，“<?”XML 指令/声明只会被作为注释对待，而且其引号属性并不安全`); }
		
		rest = html.slice(position);
		
		if ( IS_TAG.test(rest) ) {
			
			const _ = TAG(rest);
			if ( !_ ) { throw SyntaxError('标签格式有误'); }
			const { 0: { length }, 1: endSolidus, 2: xName, 3: attributesLiteral, 4: selfClosingSolidus } = _;
			
			if ( endSolidus ) {
				if ( attributesLiteral ) { throw SyntaxError(`结束标签中存在属性`); }
				if ( selfClosingSolidus ) { throw SyntaxError(`结束标签中存在自关闭斜杠`); }
				return { type: ELEMENT_END, xName, end: position + length };
			}
			
			const attributes :Attributes = new Attributes(attributesLiteral, SHORTHAND);
			
			if ( selfClosingSolidus ) { return { type: ELEMENT_SELF_CLOSING, xName, attributes, end: position + length }; }
			
			if ( VOID_ELEMENTS.test(xName) ) { throw SyntaxError(`.vue 文件中如果出现 HTML void 元素（无论大小写；即便已经过时、废弃或是非标准），必须自闭合使用并添加自闭合斜线以避免歧义（因为尚没有明确的扩展约定）`); }
			if ( PLAINTEXT.test(xName) ) { throw SyntaxError(`已过时的 ${xName} 标签没有结束方式，除非自闭合，否则${xName==='plaintext' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”）`); }
			if ( LISTING.test(xName) && !rest.startsWith('</', length) ) { throw SyntaxError(`已过时的 ${xName} 标签内容处理方式不定，除非自闭合或内容为空，否则${xName==='listing' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”或“<${xName} v-text="..." />”）`); }
			return { type: ELEMENT_START, xName, attributes, end: position + length };
			
		}
		
	}
	
	else { rest = html.slice(position); }
	
	if ( rest ) {
		let end = rest.search(TAG_LIKE);
		end = end<0 ? html.length : position + end;
		return { type: TEXT, raw: html.slice(position, end), end };
	}
	
	return { type: EOF, end: html.length };
	
};
