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
	if ( index<0 ) { return 'return this._m('+body+')'; }
	var _vm_this = index ? body.slice(0, index)+'=this,' : '';
	var _c = body.slice(++index, body.indexOf('(', index));
	var _call = body.slice(index);
	return VAR_+_vm_this+_c+'=this._self._c;return '+_call;
}

type Render = <CreateElement extends (this :void, ...args :any[]) => any> (createElement :CreateElement) => ReturnType<CreateElement>;

function WithStripped (render :Render) {
	( render as { _withStripped? :true } )._withStripped = true;
	return render;
}

export function Render (code :string | number, scope? :Scope) :Render {
	return /*#__PURE__*/ WithStripped(
		/*#__PURE__*/ Function(
			'"use strict";'+Body(scope ? scope[_](''+code) : ''+code)
		) as Render
	);
}

export function StaticRenderFns (codes :ReadonlyArray<string | number>, scope? :Scope) :Render[] {
	var index :number = codes.length;
	var body :string = ']';
	if ( scope ) {
		for ( var scope_ = scope[_]; index; ) {
			body = 'function(){'+Body(scope_(''+codes[--index]))+'},'+body;
		}
	}
	else {
		while ( index ) {
			body = 'function(){'+Body(''+codes[--index])+'},'+body;
		}
	}
	return Function('"use strict";return['+body)();
}
