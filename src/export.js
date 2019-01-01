import version from './version?text';
export { version };

import { Identifier } from './Identifier.js';
export { Identifier };

import Scope  from './Scope.js';
export { Scope };

import { Render, StaticRenderFns } from './Render,StaticRenderFns.js';
export { Render, StaticRenderFns };

import STYLE  from './STYLE.js';
export { STYLE };

import { Style, remove } from './Style,remove.js';
export { Style, remove };

var jVue = Object.create(null, {
	Identifier: { configurable: false, writable: false, value: Identifier },
	Scope: { configurable: false, writable: false, value: Scope },
	Render: { configurable: false, writable: false, value: Render },
	StaticRenderFns: { configurable: false, writable: false, value: StaticRenderFns },
	STYLE: { configurable: false, writable: false, value: STYLE },
	Style: { configurable: false, writable: false, value: Style },
	remove: { configurable: false, writable: false, value: remove },
	version: { configurable: false, writable: false, value: version },
	default: { configurable: false, get: function () { return this; } }
});
export default jVue;
