import SyntaxError from '.SyntaxError';

import { VOID_ELEMENTS } from 'lib:elements';

import * as Entities from './Entities';
import Attributes, { EMPTY } from './Attributes';

import { ATTRIBUTE, ATTRIBUTE_NAME_VALUE, TAG, IS_TAG, TAG_LIKE, NameAs__Key__ } from './RE';

export const ELEMENT_START :1.1 = 1.1;
export const ELEMENT_END :1.2 = 1.2;
export const ELEMENT_SELF_CLOSING :1.3 = 1.3;
export const TEXT :3 = 3;
export const COMMENT :8 = 8;
export const EOF :0 = 0;

export const PLAINTEXT = /^plaintext$/i;
export const LISTING = /^listing/i;
export const XMP = /^xmp$/i;

//const BAD_ENTITY = /&[a-z][a-z\d]*[^a-z\d;]/;

const V_DIR = /^v-(?:slot|on|bind):/;
const V_DOT = /^v-(?:bind|on|slot)\./;
const V__ = /^v-(?:text|html|show|if|else(?:-if)?|for|pre|cloak|once|is)[:.]/;
const V_BO = /^(?:[:@]|v-(?:bind|on)$)/;
const V_ = /^(?:[:@#]|v-)/;

export const Tag = (html :string, position :number, foreign? :boolean, SHORTHAND :boolean | null = null) => {
	
	let rest :string;
	
	if ( html[position]==='<' ) {
		
		if ( html[position + 1]==='!' ) {
			if ( !html.startsWith('--', position + 2) ) { throw SyntaxError(html.startsWith('[CDATA[', position + 2) && !foreign ? `“<![CDATA[”“]]>”语法只能用于 foreign 元素（MathML 或 SVG）内` : `标准的注释语法应由“<!--”而非“ <!”开启`); }
			if ( html[position + 4]==='>' || html.startsWith('->', position + 4) ) { throw SyntaxError(`紧随“<!--”注释开始语法之后出现的“>”或“->”会造成注释意外中断`); }
			const end :number = html.indexOf('-->', position + 4);
			if ( end<0 ) { throw SyntaxError(html.includes('--!>', position + 4) ? '应使用“-->”而非“--!>”关闭注释节点' : '存在未关闭的注释节点'); }
			const data :string = html.slice(position + 4, end);
			if ( data.includes('--!>') ) { throw SyntaxError(`“--!>”会造成注释意外中断`); }
			return { type: COMMENT, data, end: end + 3 };
		}
		
		if ( html[position + 1]==='?' ) { throw SyntaxError(foreign ? `不知该如何对待“<?”开启的 XML 指令/声明` : `在 HTML 上下文中，“<?”XML 指令/声明只会被作为注释对待，而且其引号属性并不安全`); }
		
		rest = html.slice(position);
		
		if ( IS_TAG.test(rest) ) {
			const _ = TAG.exec(rest);
			if ( !_ ) { throw SyntaxError('标签格式有误'); }
			const { 0: { length }, 1: endSolidus, 2: xName, 3: attributesLiteral, 4: selfClosingSolidus } = _;
			if ( endSolidus ) {
				if ( attributesLiteral ) { throw SyntaxError(`结束标签中存在属性`); }
				if ( selfClosingSolidus ) { throw SyntaxError(`结束标签中存在自关闭斜杠`); }
				return { type: ELEMENT_END, xName, end: position + length };
			}
			
			const attributes :Attributes = new Attributes;
			if ( attributesLiteral ) {
				const pairs = attributesLiteral.match(ATTRIBUTE)!;
				const { length } = pairs;
				let index = 0;
				if ( SHORTHAND && pairs.includes('v-pre') ) { SHORTHAND = false; }
				const DOT = SHORTHAND!==null;
				while ( index!==length ) {
					let name = pairs[index++];
					let value :string | EMPTY;
					if ( name.includes('=') ) {
						( { 1: name, 2: value } = ATTRIBUTE_NAME_VALUE.exec(name)! );
						if ( value[0]==='"' || value[0]==='\'' ) { value = value.slice(1, -1); }
						//if ( BAD_ENTITY.test(value) && (
						//	name==='href' ? xName==='a' || xName==='area' :
						//	name==='src' && ( xName==='img' || xName==='iframe' || xName==='source' || xName==='video' || xName==='audio' || xName==='track' )
						//) ) { throw Error(`${xName} 标签中的 ${name} 属性值 ${value} 中存在可疑的实体，无论它是否是 URI 参数，请明确转义`); }
						value = Entities.unescape(value);
					}
					if ( DOT && name[0]==='.' ) {
						for ( const classItem of name.slice(1).split('.') ) { Attributes.dot(attributes, NameAs__Key__(classItem)); }
						continue;
					}
					if ( SHORTHAND ) {
						switch ( name[0] ) {
							case ':':
							case '@':
							case '#':
								if ( name.length===1 || name[1]==='.' ) { throw SyntaxError(`: @ # 的 arg 不能为空`); }
								break;
							case 'v':
								if ( V_DIR.test(name) ) {
									name = name[2]==='b' ? name.slice(6) :
										name[2]==='o' ? `@${name.slice(5)}` :
											`#${name.slice(7)}`;
									if ( name.length===1 || name[1]==='.' ) { throw SyntaxError(`v-bind: v-on: v-slot: 的 arg 不能为空`); }
								}
								else if ( V_DOT.test(name) ) { throw SyntaxError(`无 arg 的 v-bind、v-on 和 v-slot 不能使用修饰符`); }
								else if ( V__.test(name) ) { throw SyntaxError(`v-text/v-html/v-show/v-if/v-else-if/v-else/v-for/v-pre/v-cloak/v-once/v-is 不能有 arg 或修饰符`); }
								break;
						}
					}
					if ( name in attributes ) { throw SyntaxError(`标签中出现了重复的属性“${name}”`); }
					if ( name[0]===':'
						? name.slice(1) in attributes && !V_.test(name.slice(1))
						: ':' + name in attributes && !V_.test(name)
					) {
						throw SyntaxError(`标签中出现了重复的属性“${name[0]===':' ? name.slice(1) : ':' + name}”和“${name}”`);
					}
					if ( V_BO.test(name) && ( !value || !( value = value.trim() ) ) ) { throw SyntaxError(`v-bind/v-on 的 value 不得为空`); }
					attributes[name] = value;
				}
				if ( attributes['v-pre']!==EMPTY ) { throw SyntaxError(`v-pre 指令不能有值`); }
				if ( attributesLiteral[attributesLiteral.length - 1]==='/' ) { throw SyntaxError(`标签结尾处的“/”有歧义，无法达到标注标签为自闭合的目的，而是会作为最后一个无引号属性值的结束字符`); }
				DOT && Attributes.dot(attributes);
			}
			if ( selfClosingSolidus ) {
				return { type: ELEMENT_SELF_CLOSING, xName, attributes, end: position + length };
			}
			else {
				if ( VOID_ELEMENTS.test(xName) ) { throw SyntaxError(`.vue 文件中如果出现 HTML void 元素（无论大小写；即便已经过时、废弃或是非标准），必须自闭合使用并添加自闭合斜线以避免歧义（因为尚没有明确的扩展约定）`); }
				if ( PLAINTEXT.test(xName) ) { throw SyntaxError(`已过时的 ${xName} 标签没有结束方式，除非自闭合，否则${xName==='plaintext' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”）`); }
				if ( LISTING.test(xName) && !rest.startsWith('</', length) ) { throw SyntaxError(`已过时的 ${xName} 标签内容处理方式不定，除非自闭合或内容为空，否则${xName==='listing' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”或“<${xName} v-text="..." />”）`); }
				return { type: ELEMENT_START, xName, attributes, end: position + length };
			}
		}
		
	}
	
	else { rest = html.slice(position); }
	
	if ( rest ) {
		let end :number = rest.search(TAG_LIKE);
		end = end<0 ? html.length : position + end;
		return { type: TEXT, raw: html.slice(position, end), end };
	}
	
	return { type: EOF, end: html.length };
	
};
