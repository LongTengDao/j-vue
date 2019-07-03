import Function from '.Function';

import { _ } from './Scope/_';
import Scope from './Scope/';

export function Template (html :string, scope :Scope) :string {
	return scope[_](html);
}

var VM_C_EXP = /^([\w$]+),(([\w$]+)\([^]*\))$/;

function Body (_vm :string, _c$_$ :string, _c :string) :string {
	return 'var '+_vm+'=this,'+_c+'=this._self._c||this.$createElement;return '+_c$_$;
}

export function Render (code :string, scope? :Scope) :Function {
	return Function('"use strict";'+( scope ? scope[_](code) : code ).replace(VM_C_EXP, Body));
}

export function StaticRenderFns (codes :string[], scope? :Scope) :Function[] {
	var index = codes.length;
	if ( scope ) {
		var scope_ = scope[_];
		while ( index-- ) { codes[index] = scope_(codes[index]).replace(VM_C_EXP, Body); }
	}
	else {
		while ( index-- ) { codes[index] = codes[index].replace(VM_C_EXP, Body); }
	}
	return Function('"use strict";return[function(){'+codes.join('},function(){')+'}]')();
}
