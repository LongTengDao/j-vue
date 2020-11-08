import { _ } from './Scope/_';

function Template (html :string, scope :Scope) :string {
	return /*#__PURE__*/scope[_](html);
}

export { Template as default };

import type Scope from './Scope/';