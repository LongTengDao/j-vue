import undefined from '.undefined';
import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';

import { ESCAPABLE_RAW_TEXT_ELEMENTS } from 'lib:elements';
import { TAG_EMIT_CHAR, TAG_LIKE } from './RE';
import Block from './Block';

export default class CustomBlock extends Block {
	constructor (blockName :string, attributes :Attributes, inner :string | undefined) {
		if ( inner===undefined ) {
			super(blockName, attributes, false, inner, null);
		}
		else {
			if ( ESCAPABLE_RAW_TEXT_ELEMENTS.test(blockName) ) { throw SyntaxError(`.vue 文件中的自定义块尚没有明确的语义约定，请避免使用 textarea / title 标签及其大小写变种`); }
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError(`.vue 文件的 ${blockName} 自定义块中，存在可能使得正常结束判定结果模糊的标签语法标记`); }
			super(blockName, attributes, false, inner, new RegExp(`^</${blockName}${TAG_EMIT_CHAR}`, 'i'));
		}
	}
};

type Attributes = import('./Attributes').default;