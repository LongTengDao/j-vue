
export const VOID_ELEMENTS = /^(?:area|b(?:r|ase(?:font)?|gsound)|co(?:l|mmand)|embed|hr|i(?:m(?:g|age)|nput|sindex)|keygen|link|meta|param|source|track|wbr|frame|nextid)$/i;

export const RAW_TEXT_ELEMENTS = /^s(?:cript|tyle)$/i;

export const ESCAPABLE_RAW_TEXT_ELEMENTS = /^t(?:extarea|itle)$/i;

export const FOREIGN_ELEMENTS = /^(?:animate(?:Motion|Transform)?|c(?:ircle|lipPath|olor\-profile|ursor)|d(?:e(?:fs|sc)|iscard)|ellipse|f(?:e(?:Blend|Co(?:lorMatrix|mpo(?:nentTransfer|site)|nvolveMatrix)|D(?:i(?:ffuseLighting|s(?:placementMap|tanceLight))|ropShadow)|F(?:lood|unc[ABGR])|GaussianBlur|Image|M(?:erge(?:Node)?|orphology)|Offset|PointLight|Sp(?:ecularLighting|otLight)|T(?:ile|urbulence))|ilter|o(?:nt\-face|reignObject))|g(?:lyph)?|hatch(?:path)?|image|line(?:arGradient)?|m(?:a(?:rker|sk)|e(?:sh(?:gradient|patch|row)?|tadata)|issing\-glyph|path)|p(?:at(?:h|tern)|oly(?:gon|line))|r(?:adialGradient|ect)|s(?:et|olidcolor|top|vg|witch|ymbol)|t(?:ext(?:Path)?|itle|span)|u(?:nknown|se)|view)$/i;
