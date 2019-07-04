import version from '../version?text';
import Identifier from './Identifier';
import Scope from './Scope/';
import Template from './Template';
import { Render, StaticRenderFns } from './Render, StaticRenderFns';
import STYLE  from './STYLE';
import { Style, remove } from './Style, remove';

export {
	version,
	Identifier,
	Scope,
	Template,
	Render, StaticRenderFns,
	STYLE,
	Style, remove,
};

import Default from '.default';
export default Default({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render,
	StaticRenderFns: StaticRenderFns,
	STYLE: STYLE,
	Style: Style,
	remove: remove
});