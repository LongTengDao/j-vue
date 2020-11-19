import SyntaxError from '.SyntaxError';
import checkNewline from '.return';// 如果只限制 script 块正文前面的换行符，则在此函数中检测 FF LS PS

import Snippet from './Snippet';
import { Tag, ELEMENT_START, ELEMENT_END, ELEMENT_SELF_CLOSING, COMMENT, TEXT } from './Tag';
import Script from './Script/';
import Style from './Style/';
import Template from './Template/';
import CustomBlock from './CustomBlock';

const SCRIPT_STYLE_TEMPLATE = /^(?:script|style|template)$/i;
const NON_EOL = /[^\n\r\u2028\u2029]+/g;
const NON_TAB = /[^\t ]/g;

export { parseComponent as default };
const parseComponent = (sfc :SFC, vue :string) :void => {
	
	const eol = sfc.eol || '\n';
	const eol_0 = eol[0];
	const eol_length = eol.length;
	
	let index = 0;
	
	try {
		for ( const { length } = vue; index!==length; ) {
			
			if ( vue[index]===eol_0 ) {
				index += eol_length;
				continue;
			}
			
			const tag = Tag(vue, index);
			switch ( tag.type ) {
				case ELEMENT_START:
				case ELEMENT_SELF_CLOSING:
					index = tag.end;
					break;
				case COMMENT:
					index = tag.end;
					continue;
				case TEXT:
					throw SyntaxError(`.vue 文件中出现了未经标签包裹的“${tag.raw}”`);
				case ELEMENT_END:
					throw SyntaxError(`.vue 文件中凭空出现了“</${tag.xName}>”结束标签`);
			}
			
			const blockName :string = tag.xName!;
			switch ( blockName ) {
				case 'script':
					if ( 'setup' in tag.attributes! ? sfc.scriptSetup : sfc.script ) { throw SyntaxError(`一个 .vue 文件中只能有一个 script${'setup' in tag.attributes! ? ' setup' : ''} 块`); }
					break;
				case 'template':
					if ( sfc.template ) { throw SyntaxError(`一个 .vue 文件中只能有一个 template 块`); }
					break;
				case 'style':
					break;
				default:
					if ( SCRIPT_STYLE_TEMPLATE.test(blockName) ) { throw SyntaxError(`.vue 文件顶层的非全小写 script / style / template 标签存在歧义，请避免使用`); }
					break;
			}
			
			let inner :string | undefined;
			if ( tag.type===ELEMENT_START ) {
				if ( index===length ) { throw SyntaxError(`开始标签后缺少结束标签“</${blockName}>”`); }
				if ( vue[index]===eol_0 ) {
					const innerStart = index+eol_length;
					const endTagStart = vue.indexOf(`${eol}</${blockName}>`, index)+eol_length;
					if ( endTagStart<eol_length ) { throw SyntaxError(vue.includes(`</${blockName}>`, index) ? '开始标签后紧跟换行则启用多行模式，结束标签应在后续某行的行首' : `开始标签后缺少结束标签“</${blockName}>”`); }
					index = endTagStart+3+blockName.length;
					inner = endTagStart===innerStart || endTagStart-eol_length===innerStart ? '' : vue.slice(innerStart, endTagStart-eol_length);
					if ( blockName!=='style' ) {
						inner =
							checkNewline(vue.slice(0, innerStart)).replace(NON_EOL, '')+
							inner;
					}
				}
				else {
					const innerStart = index;
					index = vue.indexOf(eol_0, index);
					if ( index<0 ) { index = length; }
					if ( !vue.endsWith(`</${blockName}>`, index) ) { throw SyntaxError(`开始标签后不紧跟换行则启用单行块模式，该行应以对应的结束标签结尾`); }
					inner = vue.slice(innerStart, index-3-blockName.length);
					if ( blockName!=='style' ) {
						const previousLineEnd = vue.lastIndexOf(eol_0, innerStart);
						const lastLineStart = previousLineEnd<0 ? 0 : previousLineEnd+eol_length;
						inner =
							checkNewline(vue.slice(0, lastLineStart)).replace(NON_EOL, '')+
							checkNewline(vue.slice(lastLineStart, innerStart)).replace(NON_TAB, ' ')+
							inner;
					}
				}
			}
			
			if ( blockName==='template' ) { sfc.template = new Template(tag.attributes!, inner); }
			else if ( blockName==='style' ) { sfc.styles[sfc.styles.length] = new Style(tag.attributes!, inner); }
			else if ( blockName==='script' ) {
				if ( 'setup' in tag.attributes! ) {
					if ( 'src' in tag.attributes! ) { throw SyntaxError(`src 属性不能使用在 script setup 块上`); }
					if ( sfc.script && 'src' in sfc.script.attributes ) { throw SyntaxError(`src 属性不能使用在同时具有 script setup 块的 .vue 文件内的 script 块上`); }
					sfc.scriptSetup = new Script(tag.attributes!, inner);
				}
				else {
					if ( 'src' in tag.attributes! && sfc.scriptSetup ) { throw SyntaxError(`src 属性不能使用在同时具有 script setup 块的 .vue 文件内的 script 块上`); }
					sfc.script = new Script(tag.attributes!, inner);
				}
			}
			else { sfc.customBlocks[sfc.customBlocks.length] = new CustomBlock(blockName, tag.attributes!, inner); }
			
			if ( index!==length ) {
				if ( vue[index]===eol_0 ) { index += eol_length; }
				else if ( !vue.startsWith('<!', index) ) { throw SyntaxError(`顶级标签的结束标签后的同一行内不应有除注释以外的内容`); }
			}
			
		}
	}
	catch (error) {
		error.message = `${error.message}：\n${Snippet(vue, index)}`;
		throw error;
	}
	
};

import type SFC from './';