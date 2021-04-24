import Array from '.Array';
import freeze from '.Object.freeze';
import throwSyntaxError from '.throw.SyntaxError';

import { StringLiteral } from '@ltd/j-es';

import { BAD_INS } from '../../../dependencies';
import * as Entities from '../../Entities';
import Text from './Text';

const TNR = /^[\t\n\r]+|[\t\n\r]+$/g;
const NT = /(?:\n\t|\r\n?)\t*/g;

const OPEN_LIKE = /{(?:{+|$)/g;
const escapeOpenLike = ($$ :string) => `{{'${$$}'}}`;

const trimTab = (raw :string) :string => {
	//Entities.test(raw);// 以后如果要完全剔除“\n”，则需要要先检查解码的正确性，防止“&l”“t;”连起来
	//return raw.replace(/\n\t*/g, '');
	return raw.replace(NT, '\n');
};

export const DELIMITERS_0 = '{{';
export const DELIMITERS_1 = '}}';

export default class Mustache extends ( Array as { new () :{} } ) {
	
	[index :number] :string;
	declare readonly length :number;
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Mustache'; }
	
	readonly #pre :boolean = false;
	
	constructor (raw :string, v_pre :boolean, delimiters_0 :string, delimiters_1 :string) {
		// Vue 会优先解析 <tag>，而且还看 tagName，然后才是 {{}}，这和流式解析矛盾，因此要求避免任何潜在的视觉歧义
		// 如果未来发现不会导致解析报错终止的歧义，则要更严格地，在解码前检查确保连“<”都不存在
		super();
		raw = raw.replace(TNR, '');
		if ( v_pre ) {
			this.#pre = true;
			this[this.length] = Entities.unescape(trimTab(raw));
			return this;
		}
		let index = 0;
		for ( ; ; ) {
			
			const insStart = raw.indexOf(delimiters_0, index);
			
			if ( insStart<0 ) {
				const data :string = Entities.unescape(trimTab(raw.slice(index)));
				data.includes(delimiters_0) && throwSyntaxError(`对“${delimiters_0}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
				this[this.length] = data;
				break;
			}
			let data :string = Entities.unescape(trimTab(raw.slice(index, insStart)));
			data.includes(delimiters_0) && throwSyntaxError(`对“${delimiters_0}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
			this[this.length] = data;
			
			const insEnd = raw.indexOf(delimiters_1, insStart + 2);
			insEnd<0 && throwSyntaxError(`template 块中存在未关闭的插值模板标记“${delimiters_0}”，虽然 Vue 会将其作为普通文字处理，但这种情况本身极有可能是误以为插值语法可以包含标签造成的`);
			index = insStart + 2;
			index===insEnd && throwSyntaxError(`插值为空可能导致 Vue 尝试匹配更长的结果而造成错误`);
			data = Entities.unescape(raw.slice(index, insEnd)).trim();
			BAD_INS.test(data) && throwSyntaxError(`插值中存在 CR（后无 LF）、LS（U+2028）、PS（U+2029）会导致 Vue 无法按预期解析`);
			data.includes(delimiters_1) && throwSyntaxError(`对“${delimiters_1}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
			this[this.length] = data;
			index = insEnd + 2;
		}
		return this;
	}
	
	[Symbol.toPrimitive] (this :Mustache) :string {
		const expression :string[] = [];
		let expression_length = 0;
		let isTemplate :boolean = true;
		let index = 0;
		const { length } = this;
		do {
			const each = this[index++];
			each && ( expression[expression_length++] = isTemplate ? StringLiteral(each) : `(${each})` );
			isTemplate = !isTemplate;
		}
		while ( index!==length );
		return expression.join('+');
	}
	
	* [Symbol.iterator] (this :Mustache) :Generator<Text, void, void> {
		if ( this.#pre ) {
			const data = this[0]!;
			if ( data ) { yield new Text(data); }
			return;
		}
		const data = this[0]!;
		if ( data ) { yield new Text(data.replace(OPEN_LIKE, escapeOpenLike)); }
		let isTemplate :boolean = false;
		let index = 1;
		const { length } = this;
		while ( index!==length ) {
			const each = this[index++]!;
			if ( isTemplate ) {
				const data = each;
				if ( data ) { yield new Text(data.replace(OPEN_LIKE, escapeOpenLike)); }
				isTemplate = false;
			}
			else {
				each.includes('}}') && throwSyntaxError(`插值中不能存在原生结束标记“}}”，因为可能出现“{{ {'}}':{ }} }}”的情况，没有简单的方式进行统一转义`);
				yield new Text(each, true);//each[each.length - 1]==='}'
				isTemplate = true;
			}
		}
	}
	
};

freeze(freeze(Mustache).prototype);
