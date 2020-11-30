import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';
import freeze from '.Object.freeze';
import undefined from '.undefined';

import { ESCAPABLE_RAW_TEXT_ELEMENTS } from 'lib:elements';

import { TAG_EMIT_CHAR, TAG_LIKE } from './RE';
import Block from './Block';

export default class CustomBlock extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.CustomBlock'; }
	
	constructor (blockName :string, attributes :Attributes, inner :string | undefined) {
		if ( inner===undefined ) {
			return super(blockName, attributes, false, inner, null) as unknown as this;
		}
		else {
			if ( ESCAPABLE_RAW_TEXT_ELEMENTS.test(blockName) ) { throw SyntaxError(`.vue 文件中的自定义块尚没有明确的语义约定，请避免使用 textarea / title 标签及其大小写变种`); }
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError(`.vue 文件的 ${blockName} 自定义块中，存在标签语法标记，这可能模糊正常结束判定的结果`); }
			return super(blockName, attributes, false, inner, RegExp(`^</${blockName}${TAG_EMIT_CHAR}`, 'i')) as unknown as this;
		}
	}
	
};

freeze(freeze(CustomBlock).prototype);

import type Attributes from './Attributes';