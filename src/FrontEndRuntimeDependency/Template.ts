import { _ } from './Scope/_';

function Template (html :string, scope :Scope) :string {
	return /*#__PURE__*/ scope[_](html);
}

export { Template as default };

import Scope from './Scope/';