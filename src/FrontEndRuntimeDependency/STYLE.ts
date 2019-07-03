import create from '.Object.create';
import PropertyDescriptor from '.null.PropertyDescriptor';

export default create(null, {
	functional: PropertyDescriptor(true, false, true, false),
	render: PropertyDescriptor(function render (createElement :(...args :any[]) => any, context :{ data :any, children :any }) { return createElement('style', context.data, context.children); }, false, true, false)
}) as {
	functional :true,
	render :<CreateElement extends (...args :any[]) => any> (createElement :CreateElement) => ReturnType<CreateElement>,
};
