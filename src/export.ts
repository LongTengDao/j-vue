// @ts-ignore
import version from './version?text';
export { version };

import { Identifier } from './Identifier';
export { Identifier };

import Scope from './Scope';
export { Scope };

import { Template, Render, StaticRenderFns } from './Template, Render, StaticRenderFns';
export { Template, Render, StaticRenderFns };

import STYLE  from './STYLE';
export { STYLE };

import { Style, remove } from './Style,remove';
export { Style, remove };

var jVue = Object.create(null, {
	Identifier: { configurable: false, writable: false, value: Identifier },
	Scope: { configurable: false, writable: false, value: Scope },
	Template: { configurable: false, writable: false, value: Template },
	Render: { configurable: false, writable: false, value: Render },
	StaticRenderFns: { configurable: false, writable: false, value: StaticRenderFns },
	STYLE: { configurable: false, writable: false, value: STYLE },
	Style: { configurable: false, writable: false, value: Style },
	remove: { configurable: false, writable: false, value: remove },
	version: { configurable: false, writable: false, value: version },
	default: { configurable: false, get: function () { return this; } }
});
export default jVue;
