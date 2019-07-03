import Function from '.Function';

import { _ } from './Scope/_';
import Scope from './Scope/';

export function Template (html :string, scope :Scope) :string {
	return scope[_](html);
}

function Body (body :string) :string {
	var index = body.indexOf(',');
	return 'var '+body.slice(0, index)+'=this'+body.slice(index, body.indexOf('(', index))+'=this._self._c||this.$createElement;return '+body.slice(index+1);
}

export function Render (code :string, scope? :Scope) :Render {
	return Function('"use strict";'+Body(scope ? scope[_](code) : code)) as Render;
}

export function StaticRenderFns (codes :string[], scope? :Scope) :Render[] {
	var index = codes.length;
	if ( scope ) { for ( var scope_ = scope[_]; index--; ) { codes[index] = Body(scope_(codes[index])); } }
	else { while ( index-- ) { codes[index] = Body(codes[index]); } }
	return Function('"use strict";return[function(){'+codes.join('},function(){')+'}]')();
}

type Render = <CreateElement extends (...args :any[]) => any> (createElement :CreateElement) => ReturnType<CreateElement>;