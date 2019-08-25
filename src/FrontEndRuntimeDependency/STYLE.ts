import create from '.Object.create';
import PropertyDescriptor from '.null.PropertyDescriptor';

function render (createElement :(this :void, ...args :any[]) => any, context :Readonly<{ data :Readonly<{}>, children :Readonly<any[]> }>) {
	return createElement('style', context.data, context.children);
}

export default create(create(null), {
	functional: PropertyDescriptor(true as true, false, true, false),
	render: PropertyDescriptor(render, false, true, false)
});
