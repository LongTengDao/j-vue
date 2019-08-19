import Function from '.Function';

import { _ } from './Scope/_';
import Scope from './Scope/';

var VAR_ :'const ' | 'var ' = /*#__PURE__*/ function () {
	try { Function('const v=0'); }
	catch (error) { return 'var '; }
	return 'const ';
}();

function Body (body :string) :string {
	var index :number = body.indexOf(',');
	return ( index ? VAR_+body.slice(0, index)+'=this,' : VAR_ )+body.slice(++index, body.indexOf('(', index))+'=this._self._c||this.$createElement;return '+body.slice(index);
}

type Render = <CreateElement extends (this :void, ...args :any[]) => any> (createElement :CreateElement) => ReturnType<CreateElement>;

export function Render (code :string, scope? :Scope) :Render {
	return /*#__PURE__*/ Function('"use strict";'+Body(scope ? scope[_](code) : code)) as Render;
}

export function StaticRenderFns (codes :string[], scope? :Scope) :Render[] {
	var index = codes.length;
	if ( scope ) { for ( var scope_ = scope[_]; index--; ) { codes[index] = Body(scope_(codes[index])); } }
	else { while ( index-- ) { codes[index] = Body(codes[index]); } }
	return Function('"use strict";return[function(){'+codes.join('},function(){')+'}]')();
}
