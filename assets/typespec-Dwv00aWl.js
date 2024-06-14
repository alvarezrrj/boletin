/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.49.0(383fdf3fc0e1e1a024068b8d0fd4f3dcbae74d04)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/var o=e=>`\\b${e}\\b`,n=e=>`(?!${e})`,r="[_a-zA-Z]",i="[_a-zA-Z0-9]",t=o(`${r}${i}*`),a=o("[_a-zA-Z-0-9]+"),s=["import","model","scalar","namespace","op","interface","union","using","is","extends","enum","alias","return","void","if","else","projection","dec","extern","fn"],c=["true","false","null","unknown","never"],g="[ \\t\\r\\n]",l="[0-9]+",k={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"/**",close:" */",notIn:["string"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}],indentationRules:{decreaseIndentPattern:new RegExp("^((?!.*?/\\*).*\\*/)?\\s*[\\}\\]].*$"),increaseIndentPattern:new RegExp("^((?!//).)*(\\{([^}\"'`/]*|(\\t|[ ])*//.*)|\\([^)\"'`/]*|\\[[^\\]\"'`/]*)$"),unIndentedLinePattern:new RegExp("^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$|^(\\t|[ ])*[ ]\\*/\\s*$|^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$")}},x={defaultToken:"",tokenPostfix:".tsp",brackets:[{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.square"},{open:"(",close:")",token:"delimiter.parenthesis"}],symbols:/[=:;<>]+/,keywords:s,namedLiterals:c,escapes:'\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|"|\\${)',tokenizer:{root:[{include:"@expression"},{include:"@whitespace"}],stringVerbatim:[{regex:'(|"|"")[^"]',action:{token:"string"}},{regex:`"""${n('"')}`,action:{token:"string",next:"@pop"}}],stringLiteral:[{regex:"\\${",action:{token:"delimiter.bracket",next:"@bracketCounting"}},{regex:'[^\\\\"$]+',action:{token:"string"}},{regex:"@escapes",action:{token:"string.escape"}},{regex:"\\\\.",action:{token:"string.escape.invalid"}},{regex:'"',action:{token:"string",next:"@pop"}}],bracketCounting:[{regex:"{",action:{token:"delimiter.bracket",next:"@bracketCounting"}},{regex:"}",action:{token:"delimiter.bracket",next:"@pop"}},{include:"@expression"}],comment:[{regex:"[^\\*]+",action:{token:"comment"}},{regex:"\\*\\/",action:{token:"comment",next:"@pop"}},{regex:"[\\/*]",action:{token:"comment"}}],whitespace:[{regex:g},{regex:"\\/\\*",action:{token:"comment",next:"@comment"}},{regex:"\\/\\/.*$",action:{token:"comment"}}],expression:[{regex:'"""',action:{token:"string",next:"@stringVerbatim"}},{regex:`"${n('""')}`,action:{token:"string",next:"@stringLiteral"}},{regex:l,action:{token:"number"}},{regex:t,action:{cases:{"@keywords":{token:"keyword"},"@namedLiterals":{token:"keyword"},"@default":{token:"identifier"}}}},{regex:`@${t}`,action:{token:"tag"}},{regex:`#${a}`,action:{token:"directive"}}]}};export{k as conf,x as language};
