import Function from '.Function';

import { _ } from './Scope/_';
import Scope from './Scope/';

var VAR_ :'const ' | 'var ' = /*#__PURE__*/ function () {
	try { Function('const v=0'); }
	catch (error) { return 'var '; }
	return 'const ';
}();

function Body (body :string) :string {
	var index = body.indexOf(',');
	return VAR_+body.slice(0, index)+'=this'+body.slice(index, body.indexOf('(', index))+'=this._self._c||this.$createElement;return '+body.slice(index+1);
}

type Render = <CreateElement extends (...args :any[]) => any> (createElement :CreateElement) => ReturnType<CreateElement>;

function Render (code :string, scope? :Scope) :Render {
	return /*#__PURE__*/ Function('"use strict";'+Body(scope ? scope[_](code) : code)) as Render;
}

function StaticRenderFns (codes :string[], scope? :Scope) :Render[] {
	var index = codes.length;
	if ( scope ) { for ( var scope_ = scope[_]; index--; ) { codes[index] = Body(scope_(codes[index])); } }
	else { while ( index-- ) { codes[index] = Body(codes[index]); } }
	return Function('"use strict";return[function(){'+codes.join('},function(){')+'}]')();
}

export { Render, StaticRenderFns };