import SyntaxError from '.SyntaxError';
import freeze from '.Object.freeze';
import undefined from '.undefined';

import { EMPTY } from './Attributes';

export default abstract class Block<BlockName extends string = string> {
	
	protected constructor (blockName :BlockName, attributes :Attributes, emitProperties :boolean, inner :string | undefined, END_TAG :RegExp | null) {
		this.blockName = blockName;
		this.attributes = attributes;
		if ( inner===undefined ) {
			if ( emitProperties ) {
				if ( attributes.src===EMPTY ) { throw SyntaxError(`自闭合功能块元素必须存在 src 属性值`); }
				this.src = attributes.src;
				if ( 'lang' in attributes ) { throw SyntaxError(`自闭合功能块元素不支持 lang 属性`); }
			}
		}
		else {
			this.inner = inner;
			if ( emitProperties ) {
				if ( 'src' in attributes ) { throw SyntaxError(`开放功能块元素不能存在 src 属性`); }
				if ( 'lang' in attributes ) {
					if ( !attributes.lang ) { throw SyntaxError(`开放功能块元素的 lang 属性如果设置，值不能为空`); }
					this.lang = attributes.lang;
				}
			}
			if ( END_TAG && END_TAG.test(inner) ) { throw SyntaxError(`“${blockName}”块内包含疑似结束标签的内容（注意 .vue 文件需要确保单行/多行解析模式与传统 HTML 流式解析的结果一致）`); }
		}
		return this;
	}
	
	readonly blockName :BlockName;
	readonly attributes :Attributes;
	inner? :string;
	readonly src? :string;
	readonly lang? :string;
	
};

freeze(Block.prototype);

import type Attributes from './Attributes';