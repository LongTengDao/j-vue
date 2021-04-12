import assign from '.Object.assign?';
import freeze from '.Object.freeze';
import create from '.Object.create';
import undefined from '.undefined';
import NULL from '.null.prototype';

function created (el :any, binding :any) { binding.arg===undefined ? assign(el, binding.value) :                                     ( el[binding.arg] = binding.value ); }
function updated (el :any, binding :any) { binding.arg===undefined ? assign(el, binding.value) : binding.oldValue===binding.value || ( el[binding.arg] = binding.value ); }

export default /*#__PURE__*/freeze(create(NULL, {
	
	created: { value: created, enumerable: true },
	bind: { value: created, enumerable: true },
	
	updated: { value: updated, enumerable: true },
	componentUpdated: { value: updated, enumerable: true },
	
}));
