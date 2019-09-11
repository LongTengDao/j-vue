export const forAliasRE = /(?<=^\s*(?:\(|(?!\())).*?(?=\)?\s+(?:in|of)\s+.*$)/s;
export const slotRE = /^(?:#|v-slot(?::|$))/;
export const emptySlotScopeToken = '_empty_';
export const SLOT_DIRECTIVE = /^v-(?:once|for|if|else(?:-if)?|bind)$/;
export const BAD_SLOT_NAME = /^(?:#|v-slot:)[$_]/;// $hasNormal $key $stable __proto__ _normalized ...
export const BAD_SCOPE = '__proto__';
export const BAD_KEY = '__proto__';
export const BAD_REF = '__proto__';
export const _v = /^_[a-z]$/;
export const _x = /^_(?![a-z]$)/;
export const $vvv = /^\$(?:\$[a-zA-Z]+|_[1-9]\d*|event|set|forceUpdate)$/;
export const $vv = /^\$(?:\$[a-zA-Z]+|_[1-9]\d*)$/;
