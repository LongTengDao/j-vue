import Function from '.Function';
import test from '.RegExp.prototype.test';

import { _ } from './Scope/_';
import Scope from './Scope/';

var IS_NOT_ES5 = /*#__PURE__*/test.bind(/^(cons|le)t /);

function WithStripped (render :Render & { _withStripped? :true }) {
	render._withStripped = true;
	return render;
}

export default function Render (code :string, scope? :Scope) :{ new (Vue3 :object) :Render } | Render {
	return code[0]==='('
		? /*#__PURE__*/Function('"use strict";return class Render extends null{constructor' + ( scope ? scope[_](code) : code ) + '};')() as { new (Vue3 :object) :Render }
		: /*#__PURE__*/WithStripped(
			/*#__PURE__*/Function(/*#__PURE__*/IS_NOT_ES5(code)
				? '"use strict";return{render(){' + ( scope ? scope[_](code) : code ) + '}}.render;'
				: '"use strict";return function render(){' + ( scope ? scope[_](code) : code ) + '};'
			)() as Render
		);
};

export function StaticRenderFns (codes :readonly string[], scope? :Scope) :Render[] {
	var index :number = codes.length;
	var body :string = ']';
	if ( scope ) {
		for ( var scope_ = scope[_]; index; ) { body = 'function(){' + scope_(codes[--index]!) + '},' + body; }
	}
	else {
		while ( index ) { body = 'function(){' + codes[--index] + '},' + body; }
	}
	return Function('"use strict";return[' + body)();
}

type Render = <CreateElement extends (this :void, ...args :any) => any> (createElement :CreateElement) => ReturnType<CreateElement>;
