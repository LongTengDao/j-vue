import Error from '.Error';
import SyntaxError from '.SyntaxError';
import undefined from '.undefined';

import { StringLiteral } from '@ltd/j-es';
import { Null } from '@ltd/j-orderify';

import * as Entities from './Entities';

import { ATTRIBUTE, ATTRIBUTE_NAME_VALUE, NameAs__Key__ } from './RE';

//const BAD_ENTITY = /&[a-z][a-z\d]*[^a-z\d;]/;

const V_DIR = /^v-(?:slot(?:$|:)|on:|bind:)/;
const V_DOT = /^v-(?:bind|on|slot)\./;
const V__ = /^v-(?:text|html|show|if|else(?:-if)?|for|pre|cloak|once|is)[:.]/;
const V_BO = /^(?:[:@]|v-(?:bind|on)$)/;
const V_ = /^(?:[:@#]|v-|class$|style$)/;

export type EMPTY = undefined;
export const EMPTY :EMPTY = undefined;

export default class Attributes extends Null<string> {
	
	get [Symbol.toStringTag] () { return 'SFC.*.Attributes'; }
	
	constructor (literal :string, SHORTHAND :boolean = false) {
		super();
		if ( literal ) {
			const pairs = literal.match(ATTRIBUTE)!;
			if ( SHORTHAND && pairs.includes('v-pre') ) { SHORTHAND = false; }
			let _ = 0;
			let index = 0;
			for ( const { length } = pairs; index!==length; ) {
				let name = pairs[index++]!;
				let value :string | EMPTY;
				if ( name.includes('=') ) {
					( { 1: name, 2: value } = ATTRIBUTE_NAME_VALUE(name)! );
					if ( value[0]==='"' || value[0]==='\'' ) { value = value.slice(1, -1); }
					//if ( BAD_ENTITY.test(value) && (
					//	name==='href' ? xName==='a' || xName==='area' :
					//	name==='src' && ( xName==='img' || xName==='iframe' || xName==='source' || xName==='video' || xName==='audio' || xName==='track' )
					//) ) { throw Error(`${xName} 标签中的 ${name} 属性值 ${value} 中存在可疑的实体，无论它是否是 URI 参数，请明确转义`); }
					value = Entities.unescape(value);
				}
				if ( name[0]==='_' || name[0]===':' && ( name.length!==1 && name[1]==='_' ) ) { ++_; }
				if ( SHORTHAND ) {///////////////////
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
										`#${name.length===6 ? 'default' : name.slice(7)}${name[name.length - 1]==='#' ? ' ' : ''}`;
								if ( name.length===1 || name[1]==='.' ) { throw SyntaxError(`v-bind: v-on: v-slot: 的 arg 不能为空`); }
							}
							else if ( V_DOT.test(name) ) { throw SyntaxError(`无 arg 的 v-bind、v-on 和 v-slot 不能使用修饰符`); }
							else if ( V__.test(name) ) { throw SyntaxError(`v-text/v-html/v-show/v-if/v-else-if/v-else/v-for/v-pre/v-cloak/v-once/v-is 不能有 arg 或修饰符`); }
							break;
					}
					if ( name[0]===':' ? name.slice(1) in this && !V_.test(name.slice(1)) : ':' + name in this && !V_.test(name) ) {
						throw SyntaxError(`标签中出现了重复的属性“${name[0]===':' ? name.slice(1) : ':' + name}”和“${name}”`);
					}
					if ( V_BO.test(name) && ( !value || !( value = value.trim() ) ) ) { throw SyntaxError(`v-bind/v-on 的 value 不得为空`); }
				}///////////////////
				if ( name in this ) { throw SyntaxError(`标签中出现了重复的属性“${name}”`); }
				this[name] = value;
			}
			if ( SHORTHAND && 'v-pre' in this ) { throw SyntaxError(`v-pre 指令不能有值`); }
			if ( literal[literal.length - 1]==='/' ) { throw SyntaxError(`标签结尾处的“/”有歧义，无法达到标注标签为自闭合的目的，而是会作为最后一个无引号属性值的结束字符`); }
			this.#_ = _;
		}
		return this;
	}
	
	#_ = 0;
	
	static _asClass? (this :void, attributes :Attributes, keys :{ readonly [key :string] :null } | null, v_pre :boolean) {
		if ( !attributes.#_ ) { return; }
		let k = '';
		let kv = '';
		for ( const name in attributes ) {
			let classItem :string;
			let condition :string | EMPTY;
			if ( name[0]==='_' ) {
				if ( attributes[name]!==EMPTY ) { throw Error(`${name}="${attributes[name]}" 的值是无意义的`); }
				classItem = name.slice(1);
			}
			else if ( name[0]===':' && name[1]==='_' ) {
				condition = attributes[name];
				if ( !condition ) { throw Error(`${name} 必须要有值`); }
				if ( v_pre ) { throw Error(`v-pre 下的 ${name}="${condition}" 是无法转写的`); }
				classItem = name.slice(2);
			}
			else { continue; }
			if ( keys ) {
				if ( !( classItem in keys ) ) { throw Error(`${classItem} 没有陈列在 template .keys 中，这种组合是无意义的`); }
				classItem = `__${classItem}__`;
			}
			else { classItem = NameAs__Key__(classItem); }
			condition
				? kv += `+((${condition})?' ${classItem}':'')`
				: k += ' ' + classItem;
			delete attributes[name];
			if ( !--attributes.#_ ) { break; }
		}
		
		if ( kv ) {
			if ( attributes['class'] ) {
				delete attributes['class'];
				kv = StringLiteral(attributes['class'] + k) + kv;
			}
			else { kv = k ? StringLiteral(k.slice(1)) + kv : kv.slice(1); }
			attributes[':class'] = attributes[':class'] ? `[${kv},${attributes[':class']}]` : kv;
		}
		else if ( k ) {
			attributes['class'] = attributes['class'] ? attributes['class'] + k : k.slice(1);
		}
	}
	
	static default = Null(this);
	
};

export const { _asClass } = Attributes;
