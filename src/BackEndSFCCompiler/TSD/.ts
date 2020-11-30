import { StringLiteral } from '@ltd/j-es';

import _tsd from '../../FrontEndRuntimeDependency/module.d.ts?text';

const _ID_ = /'(\*?\??j-vue=?)'/g;

const tsd = _tsd.replace(/(?:\r?\n\texport type [_{][^;]*;)+/, '');

export default (ids :{ readonly [_ in ID]? :string }) => tsd.replace(_ID_, (_id_ :string, id :ID) => StringLiteral(( ids && ids[id] ) ?? id));

type ID = 'j-vue' | '*?j-vue' | '*?j-vue=';
