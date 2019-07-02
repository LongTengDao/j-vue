import Function from '.Function';

import { _ } from './Scope/_';
import Scope from './Scope/';

export function Template (html :string, scope :Scope) :string {
	return scope[_](html);
}

export function Render (code :string, scope? :Scope) :Function {
	return Function(
		'"use strict";var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return '+
		( scope ? scope[_](code) : code )
	);
}

export function StaticRenderFns (codes :string[], scope? :Scope) :Function[] {
	if ( scope ) {
		for ( var index = codes.length, scope_ = scope[_]; index--; ) {
			codes[index] = scope_(codes[index]);
		}
	}
	return Function(
		'"use strict";return[function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return '+
		codes.join('},function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return ')+
		'}]'
	)();
}
