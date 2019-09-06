export const forAliasRE = /(?<=^\s*(?:\(|(?!\())).*?(?=\)?\s+(?:in|of)\s+.*$)/s;
export const slotRE = /^(?:#|v-slot(?::|$))/;
export const _v = /^_[a-z]$/;
export const _x = /^_(?![a-z]$)/;
export const $vvv = /^\$(?:\$[a-zA-Z]+|_[1-9]\d*|event|set|forceUpdate)$/;
export const $vv = /^\$(?:\$[a-zA-Z]+|_[1-9]\d*)$/;