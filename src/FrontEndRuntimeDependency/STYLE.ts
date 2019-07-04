import create from '.Object.create';
import PropertyDescriptor from '.null.PropertyDescriptor';

function render (createElement :(...args :any[]) => any, context :{ data :any, children :any }) {
	return createElement('style', context.data, context.children);
}

var STYLE :{ render :Render, functional :true } = create(null, {
	render: PropertyDescriptor(render, false, true, false),
	functional: PropertyDescriptor(true, false, true, false)
});

export { STYLE as default };

import { Render } from './Render, StaticRenderFns';