import assign from '.Object.assign?';
import freeze from '.Object.freeze';
import create from '.Object.create';
import undefined from '.undefined';
import NULL from '.null.prototype';

export default /*#__PURE__*/freeze(create(NULL, {
	beforeMount: {
		enumerable: true,
		value: function beforeMount (el :any, binding :any) { binding.arg===undefined ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
	bind: {
		enumerable: true,
		value: function bind (el :any, binding :any) { binding.arg===undefined ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
	updated: {
		enumerable: true,
		value: function updated (el :any, binding :any) { binding.arg===undefined ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
	componentUpdated: {
		enumerable: true,
		value: function componentUpdated (el :any, binding :any) { binding.arg===undefined ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
}));
