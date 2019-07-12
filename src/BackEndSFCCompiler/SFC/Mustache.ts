import throwSyntaxError from '.throw.SyntaxError';
import Array from '.Array';

import { StringLiteral } from '@ltd/j-es';

import * as Entities from './Entities';

const NT = /\n\t+/g;
const N = /^\n|\n$/g;

function trimTab (raw :string) :string {
	//Entities.test(raw);// 以后如果要完全剔除“\n”，则需要要先检查解码的正确性，防止“&l”“t;”连起来
	//return raw.replace(/\n\t*/g, '');
	return raw.replace(NT, '\n').replace(N, '');
}

const delimiters = [ '{{', '}}' ];

export default class Mustache extends Array<string> {
	
	constructor (raw :string, v_pre :boolean) {
		// Vue 会优先解析 <tag>，而且还看 tagName，然后才是 {{}}，这和流式解析矛盾，因此要求避免任何潜在的视觉歧义
		// 如果未来发现不会导致解析报错终止的歧义，则要更严格地，在解码前检查确保连“<”都不存在
		super();
		if ( v_pre ) {
			this.push(Entities.unescape(trimTab(raw)));
			return;
		}
		for ( let index :number = 0, data :string; ; ) {
			
			const insStart :number = raw.indexOf(delimiters[0], index);
			
			if ( insStart<0 ) {
				data = Entities.unescape(trimTab(raw.slice(index)));
				data.includes(delimiters[0]) && throwSyntaxError(`对“${delimiters[0]}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码`);
				this.push(data);
				break;
			}
			data = Entities.unescape(trimTab(raw.slice(index, insStart)));
			data.includes(delimiters[0]) && throwSyntaxError(`对“${delimiters[0]}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码`);
			this.push(data);
			
			const insEnd :number = raw.indexOf(delimiters[1], insStart+2);
			insEnd<0 && throwSyntaxError(`template 块中存在未关闭的插值模板标记“${delimiters[0]}”，虽然 Vue 会将其作为普通文字处理，但这种情况本身极有可能是误以为插值语法可以包含标签造成的`);
			index = insStart+2;
			data = Entities.unescape(raw.slice(index, insEnd));
			data.includes(delimiters[1]) && throwSyntaxError(`对“${delimiters[1]}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码`);
			this.push(data);
			index = insEnd+2;
		}
	}
	
	toExpression (this :Mustache) :string {
		const expression :string[] = [];
		let isTemplate :boolean = true;
		for ( const each of this ) {
			each && expression.push(isTemplate ? StringLiteral(each) : `(${each})`);
			isTemplate = !isTemplate;
		}
		return expression.join('+');
	}
	
	toData (this :Mustache) :string {
		let data :string = '';
		let isTemplate :boolean = true;
		for ( const each of this ) {
			if ( each ) { data += isTemplate ? each : `${delimiters[0]}${each}${delimiters[1]}`; }// 以后如果要完全剔除“\n”，则需要更复杂的保全逻辑（{{'{{{'}}、{{{k:{b:'}\}\}'} } }}），避免本来没有连在一起的连到一起
			isTemplate = !isTemplate;
		}
		return data;
	}
	
};
