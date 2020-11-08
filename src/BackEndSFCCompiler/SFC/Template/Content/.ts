import Error from '.Error';
import SyntaxError from '.SyntaxError';
import ReferenceError from '.ReferenceError';
import RegExp from '.RegExp';
import Set from '.Set';
import throwError from '.throw.Error';

import { newRegExp, groupify } from '@ltd/j-regexp';
import { NON_SCALAR as SURROGATE_IN_INPUT_STREAM } from '@ltd/j-utf';

import { FOREIGN_ELEMENTS, VOID_ELEMENTS, RAW_TEXT_ELEMENTS } from 'lib:elements';

import { forAliasRE, slotRE, emptySlotScopeToken, SLOT_DIRECTIVE, BAD_SLOT_NAME, BAD_V_SLOT_NAME, BAD_SCOPE, BAD_KEY, BAD_REF, NON_ASCII_SIMPLE_PATH, STYLE_BY_COMPONENT_IS, BUILT_IN } from '../../../dependencies';
import { CONTROL_CHARACTER as CONTROL_CHARACTER_IN_INPUT_STREAM, NONCHARACTER as NONCHARACTER_IN_INPUT_STREAM, TAG_EMIT_CHAR, isAliasName, NameIs__Key__, NON_PCENChar } from '../../RE';
import { Tag, ELEMENT_END, ELEMENT_SELF_CLOSING, COMMENT, TEXT, EOF, PLAINTEXT, LISTING, XMP } from '../../Tag';
import { EMPTY } from '../../Attributes';
import Params from '../../Params';
import Node from './Node';
import Element from './Element';
import Text, { RawText } from './Text';
import Mustache from '../../Mustache';
import Snippet from '../../Snippet';
import CSS from '../../../CSS/';

const TRIM = /^\s*\(?|\)?\s*$/g;
const void_elements = RegExp(VOID_ELEMENTS, '');
const foreign_elements = RegExp(FOREIGN_ELEMENTS, '');
const TEXTAREA_END_TAG = newRegExp('i')`</textarea${TAG_EMIT_CHAR}`;
const STYLE_END_TAG = newRegExp('i')`</style${TAG_EMIT_CHAR}`;
//const TITLE_END_TAG = newRegExp('i')`</title${TAG_EMIT_CHAR}`;
const TEXTAREA = /^textarea$/i;
const TNS = /^[\t\n\f\r ]+$/;
const SOF_TNS_LT = /^[\t\n\f\r ]+</;
const GT_TNS_EOF = />[\t\n\f\r ]+$/;
const NATIVE_D = /\.(?:native|\d+)(?:$|\.)/;
const PROP_SYNC = /\.(?:prop|sync)(?:$|\.)/;
const BIND_PROP_SYNC = /^:.*?\.(?:prop|sync)(?:$|\.)/s;
const V_MODEL_ = /^v-model(?::|(?=\.)(?!(?:\.(?:lazy|number|trim))+$))/;
const STARTS_WITH_LOWERCASE_AND_NOT = /^(?:[abd-z]|(?!component$))/;
const ON_UPPER_CASE_ONCE = /[A-Z]|^[^.]*(?:capture|once|passive)(?:\.|$)/;
const ATTR_ON = /^:?on/i;
const ATTR_ = /^:?_/;
const HTML5 = `
	body
	blockquote
	main header footer
	article section nav aside
	h1 h2 h3 h4 h5 h6
	p
	div
	span
`.match(/\S+/g)!;
const HTML_5 = newRegExp('i')`^${groupify(HTML5)}$`;
const SVG_MathML = newRegExp('i')`^${groupify(`
	annotation-xml
	color-profile
	font-face
	font-face-src
	font-face-uri
	font-face-format
	font-face-name
	missing-glyph
`.match(/\S+/g)!)}$`;
const NON_HTML = /[^\dA-Za-z]/;
const STARTS_WITH_UPPERCASE = /^(?![A-Za-z])/;

const xSlot = (attributes :Attributes) => {
	if ( 'v-slot' in attributes ) { return false; }
	for ( const name in attributes ) { if ( name[0]==='#' ) { return false; } }
	return true;
};

const checkNameBeing = (xName :string, attributes :Attributes, is :boolean) :void => {
	if ( 'v-html' in attributes && ( xName==='xmp' || xName==='plaintext' || xName==='listing' ) ) {
		throw SyntaxError(is
			? `请避免 is 已废弃的 xmp、plaintext 或 listing 元素并在其上使用 v-html，它的实际行为（可能）是 v-text`
			: `请避免在已废弃的 xmp、plaintext 或 listing 标签上使用 v-html，它的实际行为（可能）是 v-text`
		);
	}
	if ( 2 ) {
		if ( compatible_template || compatible_render ) {
				if ( !foreign_elements.test(xName) && FOREIGN_ELEMENTS.test(xName) ) {
					compatible_template = false;
					compatible_render = false;
					//throw SyntaxError(is ? `通过 is 属性，也无法避免 SVG 命名空间中的 foreign 元素的大写变种“${xName}”，不被 Vue 2 作为组件对待` : `SVG 命名空间中的 foreign 标签的大写变种“${xName}”，同样不被 Vue 2 作为组件对待`);
				}
		}
	}
};

let html :string = '';
let index :number = 0;

let partial :Partial | null = null;
let partial_with_tagName :string = '';

let delimiters_0 :string = '';
let delimiters_1 :string = '';

export let compatible_template :boolean = true;
export let compatible_render :boolean = true;

let shadow_name :string = '';
let shadow_hasNames :boolean = false;
const shadow_names = new Set<string>();
const SHADOW = /^#([a-z]\w*)(?:(\.)([a-z]\w*))?#$/i;
const Shadow = ($name_names$ :string) => {
	const { 1: name, 2: hasNames = '', 3: names = '' } = SHADOW.exec($name_names$) || throwError(`${$name_names$} 格式不符合预期`);
	if ( shadow_name ) {
		if ( name!==shadow_name ) { throw Error(`不支持多路径 shadow，请使用子命名区分`); }
		( shadow_hasNames = !!hasNames ) && shadow_names.add(names);
	}
	else {
		shadow_name = name;
		if ( !hasNames===shadow_hasNames ) { throw Error(`不能既访问子命名 shadow，又访问简单 shadow`); }
		if ( shadow_hasNames && shadow_names.size===shadow_names.add(names).size ) { throw Error(`出现了重复的 shadow“${$name_names$}”`); }
	}
	if ( compatible_render || compatible_template ) {
		compatible_render = false;
		compatible_template = false;
	}
	return name + hasNames + names;
};

const parseAppend = (parentNode_XName :string, parentNode :Content | Element, V_PRE :boolean, FOREIGN :boolean, V_FOR :boolean) :void => {
	for ( ; ; ) {
		const tag = Tag(html, index, FOREIGN, !V_PRE);
		const { type } = tag;
		if ( type===EOF ) {
			if ( parentNode_XName ) { throw SyntaxError(`template 块中存在未关闭的 ${parentNode_XName} 标签`); }
			index = tag.end;
			break;
		}
		if ( type===TEXT ) {
			const data :string = new Mustache(tag.raw!, V_PRE, delimiters_0, delimiters_1).toData();
			data && parentNode.appendChild(new Text(data));
			index = tag.end;
			continue;
		}
		if ( type===COMMENT ) {
			index = tag.end;
			continue;
		}
		const XName = tag.xName!;
		if ( type===ELEMENT_END ) {
			if ( XName!==parentNode_XName ) {
				throw SyntaxError(parentNode_XName
					? `在 ${parentNode_XName} 配对的结束标签出现前，出现了预期外的结束标签“</${XName}>”`
					: `template 块中凭空出现了“</${XName}>”结束标签`
				);
			}
			index = tag.end;
			break;
		}
		let xName :string = XName;
		let __class__ :string | undefined;
		if ( partial ) {
			let alias = XName;
			let addOn = '';
			///if ( XName.includes('.') ) {
			///	const _ = XName.split('.');
			///	alias = _[0];
			///	addOn = ' ' + _.slice(1).join(' ');
			///}
			/* AliasName: */
			if ( isAliasName(alias) ) {
				if ( alias in partial ) {
					const _ = partial[alias];
					xName = _.tagName==='_' ? alias + '_' : _.tagName;
					__class__ = _.class + addOn;
				}
				else if ( partial_with_tagName && NameIs__Key__(alias) ) {
					xName = partial_with_tagName==='_' ? alias + '_' : partial_with_tagName;
					__class__ = `__${alias}__` + addOn;
				}
			}
		}
		const notComponent = STARTS_WITH_LOWERCASE_AND_NOT.test(xName);
		let afterColon = xName;
		if ( notComponent ) {
			const index = xName.indexOf(':');
			if ( index>0 ) {
				if ( xName.lastIndexOf(':')!==index ) { throw Error(`“${xName}”中含有多个“:”，并不是一个合格的标签名`); }
				if ( NON_PCENChar.test(xName.slice(0, index)) ) { throw Error(`“${xName}”的命名空间中含有不符合限定的字符，并不是一个合格的标签名`); }
				afterColon = xName.slice(index + 1);
				if ( STARTS_WITH_UPPERCASE.test(afterColon) ) { throw Error(`“${xName}”的后半部分没有以字母开头，并不是一个合格的原生标签或自定义元素名`); }
				if ( afterColon.includes('-') ) {
					if ( NON_PCENChar.test(afterColon) ) { throw Error(`“${xName}”的后半部分中含有不符合限定的字符，并不是一个合格的自定义元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				}
				else {
					if ( NON_HTML.test(afterColon) ) { throw Error(`HTML 原生标签中不会包含“${xName}”的后半部分这种含有特殊字符的元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				}
				
			}
			else {
				if ( xName.includes('-') ) {
					if ( NON_PCENChar.test(xName) ) { throw Error(`“${xName}”中含有不符合限定的字符，并不是一个合格的自定义元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				}
				else {
					if ( NON_HTML.test(xName) ) { throw Error(`HTML 原生标签中不会包含“${xName}”这种含有特殊字符的元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				}
			}
		}
		if ( xName==='script' ) { throw SyntaxError(`Vue 不允许 template 中存在 script 标签`); }
		const attributes :Attributes = tag.attributes!;
		const v_pre :boolean = V_PRE || 'v-pre' in attributes;
		const v_for :boolean = v_pre ? false : V_FOR || 'v-for' in attributes;
		let shadowRoot :string | null = null;
		if ( v_pre ) {
			if ( STYLE_BY_COMPONENT_IS && xName==='style' ) { throw SyntaxError(STYLE_BY_COMPONENT_IS.pre); }
			if ( !V_PRE && xName==='template'
				&& !( 'v-if' in attributes )
				&& !('v-else-if' in attributes)
				&& !('v-else' in attributes)
				&& !( 'v-for' in attributes )
				&& xSlot(attributes)
			) {
				throw SyntaxError(`应当避免没有 v-if/else-if/else/for/slot 指令的 template 元素，这在 Vue 2 与 3 中存在歧义，且没有必要（真需要时，考虑使用“<component is="template">”，或在其上级标签上设置 v-pre）`);
			}
		}
		else {
			if ( 3 ) {
				if ( 'v-is' in attributes ) { throw SyntaxError(`v-is 是 Vue 3 新增的内置指令，在单文件组件模板中不可能需要被用到；在 Vue 2 中也请避开使用`); }
			}
			if ( xName==='component' ) {
				if ( ':is' in attributes ) {}
				else if ( 'is' in attributes ) { checkNameBeing(attributes.is!, attributes, true); }
				else { throw SyntaxError(`component 组件不能缺少 is 属性`); }
			}
			else {
				if ( !notComponent && ( ':is' in attributes || 'is' in attributes ) ) {
					throw Error(xName==='slot'
						? `is 在 Vue 2 的 slot 组件上是无效的${':is' in attributes ? '，即便使用 v-bind: 结果也是一样' : ''}；在 Vue 3 中，在 Vue 3 中，由于存在与 Vue 2 混淆的可能，请避免使用`
						: BUILT_IN.has(xName)
							? `is 属性不应当出现在 ${xName} 上`
							: `Vue 2 单文件组件模板中不可能必须在非 component 上设置 is 属性；在 Vue 3 中，由于存在与 Vue 2 混淆的可能，请避免使用 is 作为其它组件的参数（如果“${xName}”不是组件，请避免使用大写字母开头）`
					);
				}
				checkNameBeing(xName, attributes, false);
				//if ( 3 ) {
				//	if ( STYLE_BY_COMPONENT_IS && xName==='style' ) {
				//		if ( ':is' in attributes || 'is' in attributes ) { throw SyntaxError(STYLE_BY_COMPONENT_IS.is); }
				//	}
				//	checkNameBeing(xName, attributes, false);
				//}
				//if ( 2 ) {
				//	if ( ':is' in attributes ) {
				//		if ( STYLE_BY_COMPONENT_IS && xName==='style' ) { throw SyntaxError(STYLE_BY_COMPONENT_IS.is); }
				//	}
				//	else if ( 'is' in attributes ) {
				//		if ( STYLE_BY_COMPONENT_IS && xName==='style' ) { throw SyntaxError(STYLE_BY_COMPONENT_IS.is); }
				//		checkNameBeing(attributes.is!, attributes, true);
				//	}
				//	else { checkNameBeing(xName, attributes, false); }
				//}
			}
			if ( 'inline-template' in attributes ) { throw Error(`jVue 不支持包含 inline-template 的模板编译，且该功能在 Vue 3 中已经被废弃`); }
			if ( 'v-cloak' in attributes ) { throw SyntaxError(`单文件组件模板中不可能用到 v-cloak 指令`); }
			if ( 'v-for' in attributes ) {
				const value = attributes['v-for']!;
				const index = value.search(forAliasRE);
				if ( index<0 ) { throw SyntaxError(`“v-for="${value}"”的格式有误`); }
				Params(value.slice(0, index).replace(TRIM, ''), 1, 3, `“v-for="${value}"”中的“of/in”前`);
			}
			if ( 3 ) {
				if ( v_for && 'ref' in attributes ) {
					throw SyntaxError(`Vue 3 不再支持在有 v-for 的标签及其内部标签上设置 ref，请用 :ref 模式代替`);
				}
			}
			if ( xName==='slot' ) {
				if ( BAD_SLOT_NAME.test(attributes['name'] || 'default') ) { throw ReferenceError(`“$”或“_”开头的 slot name 可能无法按预期工作`); }
				for ( let name in attributes ) {
					const bind = name[0]===':';
					if ( bind ) {
						if ( 3 ) {
							if ( PROP_SYNC.test(name) ) { throw SyntaxError(`Vue 3 中 v-bind: 已不再支持 .prop、.sync 修饰符`); }
						}
						name = name.slice(1);
					}
					else if ( name.startsWith('v-') && !SLOT_DIRECTIVE.test(name) || name[0]==='@' || name[0]==='#' ) {
						throw SyntaxError(`slot 组件上除 v-pre、v-once、v-for、v-if、v-else-if、v-else 和 v-bind 以外的指令都会被忽略，如果想要绑定 ${name} 为作用域属性，请使用 v-bind:${name}`);
					}
					if ( name===BAD_SCOPE ) { throw ReferenceError(`使用“${BAD_SCOPE}”作为 scope 无法按预期工作`); }
					if ( name==='key' || name==='ref' ) { throw SyntaxError(`${name}（key、ref）在 slot 组件上是无效的${bind ? '，即便使用 v-bind: 结果也是一样' : ''}`); }
				}
			}
			else {
				if ( compatible_template ) {
					if (
						xName==='BaseTransition' || xName==='Suspense' || xName==='Teleport' || xName==='KeepAlive' || xName==='Transition' || xName==='TransitionGroup'
					) { compatible_template = false; }
				}
				if ( compatible_render ) {
					if (
						///xName==='KeepAlive' || xName==='Transition' || xName==='TransitionGroup' ||
						xName==='base-transition' || xName==='suspense' || xName==='teleport' ||
						xName==='template' && ( 'key' in attributes || ':key' in attributes )
					) { compatible_render = false; }
				}
				if ( 'v-if' in attributes || 'v-else-if' in attributes || 'v-else' in attributes ) {
					if ( 'v-for' in attributes ) { throw Error(`v-for 和 v-if 等的优先级在 Vue 2 和 3 中不同，请避免同时使用`); }///compatible_template = false;
				}
				else if ( xName==='template' && !( 'v-for' in attributes ) && xSlot(attributes) ) {
					throw SyntaxError(`应当避免没有 v-if/else-if/else/for/slot 指令的 template 元素，这在 Vue 2 与 3 中存在歧义，且没有必要（真需要时，考虑使用“<component is="template">”，或在其上级标签上设置 v-pre）`);
				}
				if ( 2 ) {
					if ( 'slot' in attributes || ':slot' in attributes ) { throw SyntaxError(`slot 已被 v-slot 取代（如果只是碰巧重名，请使用 :slot.camel）`); }
					if ( 'slot-scope' in attributes ) { throw SyntaxError(`slot-scope 已被 v-slot 取代（如果只是碰巧重名，请使用 :slot-scope）`); }
					if ( 'scope' in attributes && xName==='template' ) { throw SyntaxError(`template scope 已被 v-slot 取代`); }
				}
				let already = '';
				for ( const name in attributes ) {
					if ( name[0]==='@' ) {
						if ( name[1]==='_' ) { throw ReferenceError(`“_”开头的 listener 可能无法按预期工作`); }
						if ( 3 ) {
							if ( NATIVE_D.test(name) ) { throw Error(`Vue 3 中 v-on 已不再支持 .native、键位数字修饰符`); }
							if ( ON_UPPER_CASE_ONCE.test('on' + name.slice(name[0]==='@' ? 1 : 5)) ) { throw Error(`Vue 3 中事件名不应出现大写，且不应以 capture、once、passive 结尾以免与 .capture、.once、.passive 修饰符编译的结果混淆`); }
						}
						if ( compatible_template && NON_ASCII_SIMPLE_PATH.test(attributes[name]!) ) { compatible_template = false; }
					}
					else {
						if ( ATTR_.test(name) ) { throw ReferenceError(`“_”开头的 attr 可能无法按预期工作`); }
						if ( 3 ) {
							if ( ATTR_ON.test(name) ) { throw ReferenceError(`Vue 3 中合并了 listeners 和 attrs 的通道，因此 attrs 的内容不能以 on 起始`); }
							if ( BIND_PROP_SYNC.test(name) ) { throw SyntaxError(`Vue 3 中 v-bind: 已不再支持 .prop、.sync 修饰符`); }
						}
						if ( 2 ) {
							if ( compatible_render && V_MODEL_.test(name) ) { compatible_render = false; }
						}
						if ( slotRE.test(name) ) {
							if ( already ) { throw SyntaxError(`不能同时存在多个插槽指令“${already}”和“${name}”`); }
							already = name;
							if ( name[0]==='#' && name[name.length - 1]==='#' && name.length>1 ) {
								if ( BUILT_IN.has(xName) ) { throw Error(`jVue 借用了插槽缩写语法表示 Shadow DOM，并以“#”结尾加以区分，该功能不能用在 ${xName} 标签上`); }
								if ( !notComponent ) { throw Error(`jVue 借用了插槽缩写语法表示 Shadow DOM，并以“#”结尾加以区分，该功能不能用在组件标签${xName==='component' ? ` component 上` : `上（如果 ${xName} 不是组件，请避免使用大写字母开头）`}`); }
								if ( xName.includes('-') ? SVG_MathML.test(xName) : !HTML_5.test(xName) ) { throw Error(`HTML 原生标签中，只有 ${HTML5.join('、')} 支持 Shadow DOM，其中不包括“${xName}”`); }
								if ( attributes[name]!==EMPTY ) { throw Error(`jVue 借用了插槽缩写语法表示 Shadow DOM，并以“#”结尾加以区分，该功能不支持属性值`); }
								shadowRoot = Shadow(name);
							}
							else {
								const value = attributes[name];
								if ( xName==='template' ) {
									if ( !( 'localName' in parentNode ) ) { throw Error(`插槽所在的 template 必须位于组件标签内`); }
									if ( STARTS_WITH_LOWERCASE_AND_NOT.test(parentNode.localName) ) {
										throw Error(`插槽所在的 template 必须位于组件标签的根层` + ( BUILT_IN.has(parentNode.localName) ? `` : `（如果 ${parentNode.localName} 是组件，则请避免使用小写字母开头）` ));
									}
								}
								else {
									if ( notComponent ) { throw Error(`插槽只能出现在 template 或组件上` + ( BUILT_IN.has(xName) ? `` : `（如果 ${xName} 是组件，则请避免使用小写字母开头）`)); }
									if ( name!=='v-slot' && name!=='#default' ) { throw SyntaxError(`具名插槽只能出现在 template 上`); }
									if ( value===EMPTY ) { throw Error(`无值的默认插槽 v-slot 指令没有必要显式地写在组件上`); }
								}
								if ( value===emptySlotScopeToken ) { throw ReferenceError(`“${emptySlotScopeToken}”是保留字，编译结果相当于留空`); }
								value===EMPTY ||
								Params(value, 0, 1, `${name}="${value}"中`);
								if ( BAD_V_SLOT_NAME.test(name) ) { throw ReferenceError(`“$”或“_”开头的 slot name 可能无法按预期工作`); }
							}
						}
					}
				}
				if ( shadowRoot ) { delete attributes[shadowRoot]; }
				if ( attributes['key']===BAD_KEY ) { throw ReferenceError(`使用“${BAD_KEY}”作为 key 无法按预期工作`); }
				if ( attributes['ref']===BAD_REF ) { throw ReferenceError(`使用“${BAD_REF}”作为 ref 无法按预期工作`); }
			}
		}
		if ( compatible_template && xName==='style' && !STYLE_BY_COMPONENT_IS ) { compatible_template = false; }
		const element :Element = parentNode.appendChild(new Element(
			STYLE_BY_COMPONENT_IS && xName==='style' ? ( attributes['is'] = xName, 'component' ) : xName,
			attributes,
			__class__,
			shadowRoot ? { along: shadowRoot, aside: void_elements.test(xName) || 'localName' in parentNode } : null,
		));
		index = tag.end;
		if ( type===ELEMENT_SELF_CLOSING ) { continue; }
		const foreign :boolean = FOREIGN || xName==='svg' || xName==='math';
		if ( void_elements.test(xName) ) { throw SyntaxError(`template 文件中如果出现 HTML void 元素（小写；即便已经过时、废弃或是非标准），宜添加自闭合斜线以避免歧义`); }
		if ( html.startsWith('</', index) ) {
			if ( LISTING.test(xName) ) { throw SyntaxError(`已过时的 ${XName} 标签内容处理方式不定，除非自闭合或内容为空，否则${XName==='listing' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”或“<${xName} v-text="..." />”）`); }
			if ( PLAINTEXT.test(xName) || XMP.test(xName) || XMP.test(XName) && ( xName = XName ) ) {
				throw SyntaxError(
					`已${PLAINTEXT.test(xName) ? '过时' : '废弃'}的 ${xName} 标签${xName==='plaintext' || xName==='xmp' ? '' : '（不论大小写）'}被开放式使用时，需将内容完全按原状对待，` +
					`jVue 虽可以通过 v-text 模拟这一行为、避免被 Vue 按标签嵌套模式解析，` +
					`但由于缺乏相关约定，不确定如何处理插值和空白，所以无法处理。` +
					( v_pre ? `v-pre 时虽然不再存在插值，但却也无法使用 v-text。` : `（真需要时，考虑使用“<component is="${xName}">”或“<${xName} v-text="..." />”）` )
				);
			}
			if ( RAW_TEXT_ELEMENTS.test(XName)!==RAW_TEXT_ELEMENTS.test(xName) ) { throw SyntaxError(`由于存在内容解析歧义，开放式标签名和其简写不能一个是原始文本元素，而另一个不是`); }// xmp plaintext listing
			if (
				(
					TEXTAREA.test(XName)// || XName==='title'
				)!==(
					TEXTAREA.test(xName)// || xName==='title'
				)
			) { throw SyntaxError(`由于存在内容解析歧义，开放式标签名和其简写不能一个是可转义原始文本元素，而另一个不是`); }
			if ( RAW_TEXT_ELEMENTS.test(xName) && xName!=='style' || TEXTAREA.test(xName) && xName!=='textarea' ) {
				throw SyntaxError(
					`Vue 2 不会将 textarea、style 或 script 的任何大写变种理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，` +
					`jVue 虽可对其进行转写（比如“<${xName} v-text="..." />”或“<component is="${xName}">”），` +
					`但由于缺乏约定（就连 Vue 2 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），` +
					`并不知道该往什么方向进行`
				);
			}
			if ( !v_pre && ( 'v-text' in attributes || 'v-html' in attributes ) ) { throw SyntaxError(`开放式标签，除非自身或外层节点有 v-pre 指令，否则不能再设置 v-text 或 v-html 指令`); }
			if ( xName==='iframe' || xName==='noscript' || xName==='noembed' || xName==='noframes' ) { throw Error(`在支持 Vue 运行的环境下，不应有用 ${xName} 标签来包含内容的需要，因此暂未开启兼容转写功能支持`); }
			// <pre>\n
			if (
				xName==='textarea' || xName==='style'// || xName==='title'
			) {
				let endTagStart :number = html.slice(index).search(
					xName==='textarea' ? TEXTAREA_END_TAG :
						xName==='style' ? STYLE_END_TAG :
							//xName==='title' ? TITLE_END_TAG :
							null as never
				);
				if ( endTagStart<0 ) { throw SyntaxError(`template 块中存在未关闭的 ${XName} 标签`); }
				endTagStart += index;
				const inner = html.slice(index, endTagStart);
				if ( xName==='style' ) {
					if ( v_pre ) {
						const css = CSS(inner);
						css && element.appendChild(new RawText(css));
					}
					else {
						const expression :string = new Mustache(inner, v_pre, delimiters_0, delimiters_1).toExpression();
						if ( expression ) { attributes['v-text'] = expression; }
					}
				}
				else {
					const mustache = new Mustache(inner, v_pre, delimiters_0, delimiters_1);
					if ( mustache.length!==1 && xName==='textarea' ) { throw Error(`有插值的 textarea 标签这种用例没有意义`); }
					if ( mustache[0] ) {
						v_pre
							? element.appendChild(new Text(( xName==='textarea' ? '\n' : '' ) + mustache[0]))
							: attributes['v-text'] = mustache.toExpression();
					}
				}
				const tag = Tag(html, index = endTagStart, foreign);
				if ( tag.xName!==XName ) { throw SyntaxError(`${XName} 的结束标记 ${html.slice(endTagStart, tag.end)} 不符合严谨性预期`); }
				index = tag.end;
				continue;
			}
		}
		parseAppend(XName, element, v_pre, foreign, v_for);// 不需要改循环实现，因为层数多了 Vue 本身也会爆栈。
	}
};

export default class Content extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content'; }
	
	constructor (inner :string, _ :Private) {
		if ( !inner ) { return super() as unknown as this; }
		if ( SURROGATE_IN_INPUT_STREAM.test(inner) ) { throw Error(`HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
		if ( NONCHARACTER_IN_INPUT_STREAM.test(inner) ) { throw Error(`HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER_IN_INPUT_STREAM.test(inner) ) { throw Error(`HTML 字符流中禁止出现除 NUL 空（U+00）、TAB 水平制表（U+09）、LF 换行（U+0A）、FF 换页（U+0C）、CR 回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		delimiters_0 = _.delimiters_0;
		delimiters_1 = _.delimiters_1;
		partial = _.abbr ?? null;
		partial_with_tagName = partial?.['']?.tagName ?? '';
		html = inner;
		index = 0;
		compatible_template = true;
		compatible_render = true;
		super();
		try {
			parseAppend('', this, false, false, false);
			if ( shadow_name ) { _.shadow = shadow_hasNames ? [ shadow_name, ...shadow_names ].join('.') : shadow_name; }
		}
		catch (error) {
			error.message = `${error.message}：\n${Snippet(inner, index)}`;
			throw error;
		}
		finally {
			partial = null;
			html = '';
			shadow_name = '';
			shadow_names.clear();
		}
		if ( !compatible_template ) { this.#compatible_template = false; }
		if ( !compatible_render ) { this.#compatible_render = false; }
		this.firstChild instanceof Text && TNS.test(this.firstChild.data) && SOF_TNS_LT.test(inner) && this.shift();
		this.lastChild instanceof Text && TNS.test(this.lastChild.data) && GT_TNS_EOF.test(inner) && --this.length;
		return this;
	}
	
	readonly #compatible_template :boolean = true;
	readonly #compatible_render :boolean = true;
	
	get outerHTML () {
		const { length } = this;
		if ( length ) {
			let { outerHTML } = this[0]!;
			if ( outerHTML[0]==='#' ) { outerHTML = '&#35;' + outerHTML.slice(1); }
			let index = 1;
			while ( index!==length ) { outerHTML += this[index++]!.outerHTML; }
			compatible_template = this.#compatible_template;
			compatible_render = this.#compatible_render;
			return outerHTML;
		}
		compatible_template = this.#compatible_template;
		compatible_render = this.#compatible_render;
		return '';
	}
	
	* beautify (this :Content, tab :string = '\t') :Generator<string, void, undefined> {
		const { length } = this;
		let index = 0;
		while ( index!==length ) { yield * this[index++]!.beautify(tab); }
	}
	
};

import type { Private } from '../';
import type { Partial } from '../';
import type Attributes from '../../Attributes';