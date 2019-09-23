import SyntaxError from '.SyntaxError';
import checkNewline from '.return';// 如果只限制 script 块正文前面的换行符，则在此函数中检测 FF LS PS

import { VOID_ELEMENTS } from 'lib:elements';

import Snippet from './Snippet';
import { Tag, ELEMENT_START, ELEMENT_END, ELEMENT_SELF_CLOSING, COMMENT, TEXT } from './Tag';
import Script from './Script';
import Style from './Style/';
import Template from './Template/';
import CustomBlock from './CustomBlock';

const SCRIPT_STYLE_TEMPLATE = /^(?:script|style|template)$/i;
const NON_EOL = /[^\n\r\u2028\u2029]+/g;
const NON_TAB = /[^\t ]/g;

export default function parseComponent (sfc :SFC, vue :string) :void {
	
	const eol = sfc.eol || '\n';
	const eol_0 = eol[0];
	const eol_length = eol.length;
	
	let index = 0;
	
	function throwSyntaxError(message :string) :never {
		const error :SyntaxError = SyntaxError(message);
		error.message = `${error.message}：\n${Snippet(vue, index)}`;
		throw error;
	}
	
	for ( const { length } = vue; index!==length; ) {
		
		if ( vue[index]===eol_0 ) {
			index += eol_length;
			continue;
		}
		
		const tag = Tag(vue, index, false);
		switch ( tag.type ) {
			case ELEMENT_START:
			case ELEMENT_SELF_CLOSING:
				index = tag.end;
				break;
			case COMMENT:
				index = tag.end;
				continue;
			case TEXT:
				throw throwSyntaxError(`.vue 文件中出现了未经标签包裹的“${tag.raw}”`);
			case ELEMENT_END:
				throwSyntaxError(`.vue 文件中凭空出现了“</${tag.xName}>”结束标签`);
		}
		
		const blockName :string = tag.xName!;
		switch ( blockName ) {
			case 'script':
			case 'template':
				sfc[blockName] && throwSyntaxError(`一个 .vue 文件中只能有一个 ${blockName} 块`);
				break;
			case 'style':
				break;
			default:
				SCRIPT_STYLE_TEMPLATE.test(blockName) && throwSyntaxError(`.vue 文件顶层的非全小写 script / style / template 标签存在歧义，请避免使用`);
				break;
		}
		
		let inner :string | undefined;
		if ( tag.type===ELEMENT_START ) {
			VOID_ELEMENTS.test(blockName) && throwSyntaxError(`.vue 文件中的自定义块如果是 HTML void 元素（无论大小写），必须自闭合使用、并添加自闭合斜线以避免歧义（因为尚没有明确的扩展约定）`);
			index===length && throwSyntaxError(`开始标签后缺少结束标签“</${blockName}>”`);
			if ( vue.startsWith(eol_0, index) ) {
				const innerStart = index+eol_length;
				const endTagStart = vue.indexOf(`${eol}</${blockName}>`, index)+eol_length;
				endTagStart<eol_length && throwSyntaxError(vue.includes(`</${blockName}>`, index) ? '开始标签后紧跟换行则启用多行模式，结束标签应在后续某行的行首' : `开始标签后缺少结束标签“</${blockName}>”`);
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
				vue.endsWith(`</${blockName}>`, index) || throwSyntaxError(`开始标签后不紧跟换行则启用单行块模式，该行应以对应的结束标签结尾`);
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
		else if ( blockName==='style' ) { sfc.styles.push(new Style(tag.attributes!, inner)); }
		else if ( blockName==='script' ) { sfc.script = new Script(tag.attributes!, inner); }
		else { sfc.customBlocks.push(new CustomBlock(blockName, tag.attributes!, inner)); }
		
		if ( index!==length ) {
			if ( vue.startsWith(eol_0, index) ) { index += eol_length; }
			else if ( !vue.startsWith('<!', index) ) { throwSyntaxError(`顶级标签的结束标签后的同一行内不应有除注释以外的内容`); }
		}
		
	}
	
};

type SFC = import('./').default;