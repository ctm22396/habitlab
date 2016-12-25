function carp(e,t){throw SyntaxError(e+" on line "+-~t)}function able(e,t,s){var i,n;return null==t&&(t=e.length),n=(i=e[t-1])[0],"ID"===n||"]"===n||"?"===n||(s?i.callable||(")"===n||")CALL"===n||"BIOPBP"===n)&&i[1]:"}"===n||")"===n||")CALL"===n||"STRNUM"===n||"LITERAL"===n||"WORDS"===n)}function heretabs(e){var t,s,i;for(t=NaN;s=TABS.exec(e);)t<=(i=s[0].length-1)||(t=i);return t}function detab(e,t){return t?e.replace(detab[t]||(detab[t]=RegExp("\\n[^\\n\\S]{1,"+t+"}","g")),"\n"):e}function lchomp(e){return e.slice(1+e.lastIndexOf("\n",0))}function decode(e,t){return isNaN(e)?(e=e.length>8?"ng":Function("return "+e)(),1===e.length||carp("bad string in range",t),[e.charCodeAt(),!0]):[+e]}function uxxxx(e){return'"\\u'+("000"+e.toString(16)).slice(-4)+'"'}function firstPass(e){var t,s,i,n,a,r,c,h,o,l,u,E;for(t=["NEWLINE","\n",0],s=0;i=e[++s];){switch(n=i[0],a=i[1],r=i[2],c=i[3],!1){case!("ASSIGN"===n&&in$(t[1],LS_KEYWORDS)&&"DOT"!==e[s-2][0]):carp("cannot assign to reserved word '"+t[1]+"'",r);break;case!("DOT"===n&&"]"===t[0]&&"["===e[s-2][0]&&"DOT"===e[s-3][0]):e.splice(s-2,3),e[s-3][1]="[]";break;case!("DOT"===n&&"}"===t[0]&&"{"===e[s-2][0]&&"DOT"===e[s-3][0]):e.splice(s-2,3),e[s-3][1]="{}";break;case!("."===a&&i.spaced&&t.spaced):e[s]=["COMPOSE","<<",r,c];break;case"++"!==a:if(!(h=e[s+1]))break;o=["ID","LITERAL","STRNUM"],(t.spaced&&i.spaced||!t.spaced&&!i.spaced&&in$(t[0],o)&&in$(h[0],o))&&(e[s][0]="CONCAT"),("("===t[0]&&")"===h[0]||"("===t[0]&&i.spaced||")"===h[0]&&t.spaced)&&(e[s][0]="BIOP");break;case"DOT"!==n:if(h=e[s+1],"("===t[0]&&")"===h[0])e[s][0]="BIOP";else if("("===t[0])e.splice(s,0,["PARAM(","(",r,c],[")PARAM",")",r,c],["->","~>",r,c],["ID","it",r,c]);else if(")"===h[0]){e.splice(s+1,0,["[","[",r,c],["ID","it",r,c],["]","]",r,c]),l=1;e:for(u=s+1;u>=0;--u)switch(E=u,e[E][0]){case")":++l;break;case"(":if(0===--l){e.splice(E+1,0,["PARAM(","(",r,c],["ID","it",r,c],[")PARAM",")",r,c],["->","~>",r,c]);break e}}}}t=i}}function rewriteBlockless(e){function t(e){var t;return"NEWLINE"===(t=e[0])||"INDENT"===t}function s(t,s){var i,r;"IF"===a?("INDENT"!==t[0]||!t[1]&&!t.then||in$(e[s-1][0],BLOCK_USERS))&&(n[0]="POST_IF"):"INDENT"!==t[0]&&e.splice(s,0,["INDENT",0,i=e[s-1][2],r=e[s-1][3]],["DEDENT",0,i,r])}var i,n,a;for(i=-1;n=e[++i];)a=n[0],"IF"!==a&&"CLASS"!==a&&"CATCH"!==a||detectEnd(e,i+1,t,s)}function addImplicitIndentation(e){function t(t,s){var i,n;switch(i=t[0],n=a,(a===i||"THEN"===a&&"SWITCH"===i)&&(a=""),i){case"NEWLINE":return";"!==t[1];case"DOT":case"?":case",":case"PIPE":case"BACKPIPE":return e[s-1].eol;case"ELSE":return"THEN"===n;case"CATCH":return"TRY"===n;case"FINALLY":return"TRY"===n||"CATCH"===n||"THEN"===n;case"CASE":case"DEFAULT":return"CASE"===n||"THEN"===n}}function s(t,s){var i;i=e[s-1],e.splice(","===i[0]?s-1:s,0,(h[2]=i[2],h[3]=i[3],h))}var i,n,a,r,c,h,o,l,u;for(i=0;n=e[++i];)if(a=n[0],"->"===a||"THEN"===a||"ELSE"===a||"DEFAULT"===a||"TRY"===a||"FINALLY"===a||"DECL"===a){switch(r=e[i+1][0]){case"IF":if("ELSE"===a)continue;break;case"INDENT":case"THEN":"THEN"===a&&e.splice(i--,1);continue}switch(c=["INDENT",0,n[2],n[3]],h=["DEDENT",0],"THEN"===a?(e[i]=c).then=!0:e.splice(++i,0,c),!1){case"DECL"!==a:break;case"DOT"!==r&&"?"!==r&&","!==r&&"PIPE"!==r&&"BACKPIPE"!==r:--i;case!(("ID"===r||"STRNUM"===r||"LITERAL"===r)&&","===(null!=(o=e[i+2])?o[0]:void 0)):s(0,i+=2),++i;continue;case!(("("===r||"["===r||"{"===r)&&","===(null!=(l=e[u=1+indexOfPair(e,i+1)])?l[0]:void 0)):s(0,u),++i;continue}detectEnd(e,i+1,t,s)}}function addImplicitParentheses(e){function t(e){var t;return t=e[0],in$(t,ARG)||!e.spaced&&("+-"===t||"CLONE"===t)}function s(t,s){var i,n,a;if(i=t[0],"POST_IF"===i||"PIPE"===i||"BACKPIPE"===i)return!0;if(!f&&(t.alias&&("&&"===(n=t[1])||"||"===n||"xor"===n)||"TO"===i||"BY"===i||"IMPLEMENTS"===i))return!0;switch(a=e[s-1],i){case"NEWLINE":return","!==a[0];case"DOT":case"?":return!f&&(a.spaced||"DEDENT"===a[0]);case"SWITCH":d=!0;case"IF":case"CLASS":case"FUNCTION":case"GENERATOR":case"LET":case"WITH":case"CATCH":f=!0;break;case"CASE":if(!d)return!0;f=!0;break;case"INDENT":return f?f=!1:!in$(a[0],BLOCK_USERS);case"WHILE":if(t.done)return!1;case"FOR":return f=!0,able(e,s)||"CREMENT"===a[0]||"..."===a[0]&&a.spaced}return!1}function i(t,s){e.splice(s,0,[")CALL","",e[s-1][2],e[s-1][3]])}var n,a,r,c,h,o,l,u,E,f,d;for(n=0,a=[];r=e[++n];){if("do"===r[1]&&"INDENT"===e[n+1][0]&&(c=indexOfPair(e,n+1),"NEWLINE"===e[c+1][0]&&"WHILE"===(null!=(h=e[c+2])?h[0]:void 0)?(r[0]="DO",e[c+2].done=!0,e.splice(c+1,1)):((r=e[1+n])[0]="(",(o=e[c])[0]=")",r.doblock=!0,e.splice(n,1))),l=r[0],u=e[n-1],"["===l&&a.push("DOT"===u[0]),"]"===u[0]){if(!a.pop())continue;u.index=!0}("FUNCTION"===(E=u[0])||"GENERATOR"===E||"LET"===E||"WHERE"===E||u.spaced&&able(e,n,!0))&&(r.doblock?(r[0]="CALL(",o[0]=")CALL"):t(r)&&("CREMENT"!==l||!r.spaced&&in$(null!=(E=e[n+1])?E[0]:void 0,CHAIN))&&(f=d=!1,e.splice(n++,0,["CALL(","",r[2],r[3]]),detectEnd(e,n,s,i)))}}function addImplicitBraces(e){function t(t,s){var i,n,a,r;switch(i=t[0]){case",":break;case"NEWLINE":if(E)return!0;break;case"DEDENT":return!0;case"POST_IF":case"FOR":case"WHILE":return E;default:return!1}return n=null!=(a=e[s+1])?a[0]:void 0,n!==(","===i?"NEWLINE":"COMMENT")&&":"!==(null!=(r=e["("===n?1+indexOfPair(e,s+1):s+2])?r[0]:void 0)}function s(t,s){e.splice(s,0,["}","",t[2],t[3]])}var i,n,a,r,c,h,o,l,u,E,f;for(i=[],n=0;a=e[++n];)if(":"===(r=a[0])){if(h=")"===e[n-1][0],o=h?c[1]:n-1,l=e[o-1],":"===(u=l[0])||"ASSIGN"===u||"IMPORT"===u||"{"!==(null!=(u=i[i.length-1])?u[0]:void 0)){for(i.push(["{"]),E=!l.doblock&&"NEWLINE"!==(f=l[0])&&"INDENT"!==f;"COMMENT"===(null!=(f=e[o-2])?f[0]:void 0);)o-=2;e.splice(o,0,["{","{",e[o][2],e[o][3]]),detectEnd(e,++n+1,t,s)}}else switch(!1){case!in$(r,CLOSERS):c=i.pop();break;case!in$(r,OPENERS):"INDENT"===r&&"{"===e[n-1][0]&&(r="{"),i.push([r,n])}}function expandLiterals(e){function t(){65536<A.push(["STRNUM",S(O),h,o],[",",",",h,o])&&carp("range limit exceeded",h)}var s,i,n,a,r,c,h,o,l,u,E,f,d,p,N,I,T,A,S,L,R,O,k,g,b,C,D;for(s=0;n=e[++s];){switch(n[0]){case"STRNUM":if(~"-+".indexOf(a=n[1].charAt(0))&&(n[1]=n[1].slice(1),e.splice(s++,0,["+-",a,n[2],n[3]])),n.callable)continue;break;case"TO":case"TIL":if("["!==e[s-1][0]||!("]"===e[s+2][0]&&("'"===(r=e[s+1][1].charAt(0))||'"'===r||+e[s+1][1]>=0)||"BY"===e[s+2][0]&&"STRNUM"===(null!=(r=e[s+3])?r[0]:void 0)&&"]"===(null!=(c=e[s+4])?c[0]:void 0)))continue;"BY"===e[s+2][0]&&(e[s+2][0]="RANGE_BY"),n.op=n[1],i=0;case"RANGE":if(h=n[2],o=n[3],null!=i||"["===e[s-1][0]&&"STRNUM"===e[s+1][0]&&("]"===e[s+2][0]&&("'"===(l=e[s+1][1].charAt(0))||'"'===l||+e[s+1][1]>=0)||"RANGE_BY"===e[s+2][0]&&"STRNUM"===(null!=(l=e[s+3])?l[0]:void 0)&&"]"===(null!=(u=e[s+4])?u[0]:void 0))){if(null==i&&(E=decode(n[1],h),i=E[0],f=E[1]),E=decode(e[s+1][1],h),d=E[0],p=E[1],(null==d||f^p)&&carp('bad "to" in range',h),N=1,(I="RANGE_BY"===(null!=(E=e[s+2])?E[0]:void 0))?(N=+(null!=(T=e[s+3])?T[1]:void 0))||carp('bad "by" in range',e[s+2][2]):i>d&&(N=-1),A=[],S=f?character:String,L=t,"to"===n.op)for(R=i;N<0?R>=d:R<=d;R+=N)O=R,L();else for(R=i;N<0?R>d:R<d;R+=N)O=R,L();A.pop()||carp("empty range",h),e.splice.apply(e,[s,2+2*I].concat(slice$.call(A))),s+=A.length-1}else n[0]="STRNUM","RANGE_BY"===(null!=(k=e[s+2])?k[0]:void 0)&&e.splice(s+2,1,["BY","by",h,o]),e.splice(s+1,0,["TO",n.op,h,o]);i=null;break;case"WORDS":for(A=[["[","[",h=n[2],o=n[3]]],R=0,b=(g=n[1].match(/\S+/g)||"").length;R<b;++R)C=g[R],A.push(["STRNUM",string("'",C,h),h,o],[",",",",h,o]);e.splice.apply(e,[s,1].concat(slice$.call(A),[["]","]",h,o]])),s+=A.length;break;case"INDENT":(D=e[s-1])&&("new"===D[1]?e.splice(s++,0,["PARAM(","",n[2],n[3]],[")PARAM","",n[2],n[3]],["->","",n[2],n[3]]):"FUNCTION"!==(g=D[0])&&"GENERATOR"!==g&&"LET"!==g||(e.splice(s,0,["CALL(","",n[2],n[3]],[")CALL","",n[2],n[3]]),s+=2));continue;case"LITERAL":case"}":break;case")":case")CALL":if(n[1])continue;break;case"]":if(n.index)continue;break;case"CREMENT":if(!able(e,s))continue;break;case"BIOP":n.spaced||"+"!==(g=n[1])&&"-"!==g||")"===e[s+1][0]||(e[s][0]="+-");continue;default:continue}n.spaced&&in$(e[s+1][0],ARG)&&e.splice(++s,0,[",",",",n[2],n[3]])}}function detectEnd(e,t,s,i){var n,a,r;for(n=0;a=e[t];++t){if(!n&&s(a,t))return i(a,t);if(r=a[0],0>(n+=in$(r,OPENERS)||-in$(r,CLOSERS)))return i(a,t)}}function indexOfPair(e,t){var s,i,n,a;for(s=1,i=INVERSES[n=e[t][0]];a=e[++t];)switch(a[0]){case n:++s;break;case i:if(!--s)return t}return-1}function clone$(e){function t(){}return t.prototype=e,new t}function in$(e,t){for(var s=-1,i=t.length>>>0;++s<i;)if(e===t[s])return!0;return!1}function import$(e,t){var s={}.hasOwnProperty;for(var i in t)s.call(t,i)&&(e[i]=t[i]);return e}var string,TABS,unlines,enlines,enslash,reslash,camelize,deheregex,character,KEYWORDS_SHARED,KEYWORDS_UNUSED,JS_KEYWORDS,LS_KEYWORDS,ID,SYMBOL,SPACE,MULTIDENT,SIMPLESTR,JSTOKEN,BSTOKEN,NUMBER,NUMBER_OMIT,REGEX,HEREGEX_OMIT,LASTDENT,INLINEDENT,NONASCII,OPENERS,CLOSERS,INVERSES,i,o,c,CHAIN,ARG,BLOCK_USERS,this$=this,slice$=[].slice;exports.lex=function(e,t){return clone$(exports).tokenize(e||"",t||{})},exports.rewrite=function(e){var t;return e||(e=this.tokens),firstPass(e),addImplicitIndentation(e),rewriteBlockless(e),addImplicitParentheses(e),addImplicitBraces(e),expandLiterals(e),"NEWLINE"===(null!=(t=e[0])?t[0]:void 0)&&e.shift(),e},exports.tokenize=function(e,t){var s,i,n,a,r;for(this.inter||(e=e.replace(/[\r\u2028\u2029\uFEFF]/g,"")),e="\n"+e,this.tokens=[this.last=["NEWLINE","\n",0,0]],this.line=~-t.line,this.column=t.column||0,this.dents=[],this.closes=[],this.parens=[],this.flags=[],s=0,i=s,this.charsCounted=0,this.isAtPrefix=!0;n=e.charAt(s);){if(a=s-i,i=s,this.charsCounted>a)throw new Error("Location information out-of-sync in lexer");switch(this.column+=a-this.charsCounted,this.charsCounted=0,n){case" ":s+=this.doSpace(e,s);break;case"\n":s+=this.doLine(e,s);break;case"\\":s+=this.doBackslash(e,s);break;case"'":case'"':s+=this.doString(e,s,n);break;case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":s+=this.doNumber(e,s);break;case"/":switch(e.charAt(s+1)){case"*":s+=this.doComment(e,s);break;case"/":s+=this.doHeregex(e,s);break;default:s+=this.doRegex(e,s)||this.doLiteral(e,s)}break;case"`":s+="`"===e.charAt(s+1)?this.doJS(e,s):this.doLiteral(e,s);break;default:s+=this.doID(e,s)||this.doLiteral(e,s)||this.doSpace(e,s)}}return this.dedent(this.dent),(r=this.closes.pop())&&this.carp("missing `"+r+"`"),this.inter?null==this.rest&&this.carp("unterminated interpolation"):(this.last.spaced=!0,this.newline()),t.raw||this.rewrite(),this.tokens},exports.dent=0,exports.identifiers={},exports.hasOwn=Object.prototype.hasOwnProperty,exports.checkConsistency=function(e,t){if(this.hasOwn.call(this.identifiers,e)&&this.identifiers[e]!==t)throw new ReferenceError("Inconsistent use of "+e+" as "+t+" on line "+-~this.line);return this.identifiers[e]=t},exports.doID=function(e,t){var s,i,n,a,r,c,h,o,l;if(i=(s=(ID.lastIndex=t,ID).exec(e))[0],!i)return 0;if(n=camelize(s[1]),/-/.test(s[1])&&this.checkConsistency(n,s[1]),NONASCII.test(n))try{Function("var "+n)}catch(e){a=e,this.carp("invalid identifier '"+n+"'")}if(r=this.last,s[2]||"DOT"===r[0]||this.adi())return this.token("ID",in$(n,JS_KEYWORDS)?(c=Object(n),c.reserved=!0,c):n),s[2]&&this.token(":",":"),i.length;switch(n){case"true":case"false":case"on":case"off":case"yes":case"no":case"null":case"void":case"arguments":case"debugger":h="LITERAL";break;case"new":case"do":case"typeof":case"delete":h="UNARY";break;case"yield":h="YIELD";break;case"return":case"throw":h="HURL";break;case"break":case"continue":h="JUMP";break;case"this":case"eval":case"super":return this.token("LITERAL",n,!0).length;case"for":n=[],this.fset("for",!0),this.fset("to",!1),this.fset("by",!0);break;case"then":this.fset("for",!1),this.fset("to",!1);break;case"catch":case"function":n="";break;case"in":case"of":if(this.fget("for")){this.fset("for",!1),"in"===n&&(this.fset("by",!0),n="","ID"!==r[0]||","!==(c=(o=this.tokens)[o.length-2][0])&&"]"!==c&&"}"!==c||(n=this.tokens.pop()[1],","===(c=this.tokens)[c.length-1][0]&&this.tokens.pop()));break}case"instanceof":"!"===r[1]&&(n=this.tokens.pop()[1]+n),h="("===(c=this.tokens)[c.length-1][0]?"BIOPR":"RELATION";break;case"not":if(r.alias&&"==="===r[1])return r[1]="!==",3;h="UNARY",n="!";break;case"and":case"or":case"xor":case"is":case"isnt":return this.unline(),h="is"===n||"isnt"===n?"COMPARE":"LOGIC","("===r[0]&&(h="BIOP"),this.token(h,function(){switch(n){case"is":return"===";case"isnt":return"!==";case"or":return"||";case"and":return"&&";case"xor":return"xor"}}()),this.last.alias=!0,n.length;case"unless":h="IF";break;case"until":h="WHILE";break;case"import":"("===r[0]?(n="<<<",h="BIOP"):able(this.tokens)?n="<<<":h="DECL";break;case"export":case"const":case"var":h="DECL";break;case"with":h=function(){switch(!1){case!able(this.tokens):return"CLONEPORT";case"("!==r[0]:return"BIOP";default:return"WITH"}}.call(this);break;case"when":this.fset("for",!1),h="CASE";case"case":if(this.doCase())return i.length;break;case"match":h="SWITCH";break;case"loop":return this.token("WHILE",n),this.token("LITERAL","true"),i.length;case"let":case"own":if("FOR"===r[0]&&!in$(n,r[1]))return r[1].push(n),3;default:if(in$(n,KEYWORDS_SHARED))break;if(in$(n,KEYWORDS_UNUSED)&&this.carp("reserved word '"+n+"'"),!r[1]&&("FUNCTION"===(c=r[0])||"GENERATOR"===c||"LABEL"===c))return r[1]=n,r.spaced=!1,i.length;switch(h="ID",n){case"otherwise":if("CASE"===(c=r[0])||"|"===c)return r[0]="DEFAULT",n.length;break;case"all":if(l="<<<"===r[1]&&"<"||"import"===r[1]&&"All")return r[1]+=l,3;break;case"from":if("yield"===r[1])return r[1]+="from",4;this.forange()&&(h="FROM");break;case"to":case"til":if(this.forange()&&this.tokens.push(["FROM","",this.line,this.column],["STRNUM","0",this.line,this.column]),this.fget("from"))this.fset("from",!1),this.fset("by",!0),h="TO";else{if(!r.callable&&"STRNUM"===r[0]&&"["===(c=this.tokens)[c.length-2][0])return r[0]="RANGE",r.op=n,n.length;if(in$("]",this.closes))return this.token("TO",n),n.length}break;case"by":"STRNUM"===r[0]&&"RANGE"===(c=this.tokens)[c.length-2][0]&&"["===(c=this.tokens)[c.length-3][0]?h="RANGE_BY":in$("]",this.closes)?h="BY":this.fget("by")&&"FOR"!==r[0]&&(h="BY",this.fset("by",!1));break;case"ever":"FOR"===r[0]&&(this.fset("for",!1),r[0]="WHILE",h="LITERAL",n="true")}}return h||(h=s[1].toUpperCase()),"COMPARE"!==h&&"LOGIC"!==h&&"RELATION"!==h||"("!==r[0]||(h="RELATION"===h?"BIOPR":"BIOP"),"THEN"!==h&&"IF"!==h&&"WHILE"!==h||(this.fset("for",!1),this.fset("by",!1)),"RELATION"!==h&&"THEN"!==h&&"ELSE"!==h&&"CASE"!==h&&"DEFAULT"!==h&&"CATCH"!==h&&"FINALLY"!==h&&"IN"!==h&&"OF"!==h&&"FROM"!==h&&"TO"!==h&&"BY"!==h&&"EXTENDS"!==h&&"IMPLEMENTS"!==h&&"WHERE"!==h||this.unline(),this.token(h,n),i.length},exports.doNumber=function(e,t){var s,i,n,a,r,c,h,o;if(NUMBER.lastIndex=t,!(s=(i=NUMBER.exec(e))[0]))return 0;if(n=this.last,i[5]&&("DOT"===n[0]||this.adi()))return this.token("STRNUM",i[4].replace(NUMBER_OMIT,"")),i[4].length;if(a=i[1]){if(r=parseInt(c=i[2].replace(NUMBER_OMIT,""),a),h=!1,(a>36||a<2)&&(/[0-9]/.exec(c)?this.carp("invalid number base "+a+" (with number "+c+"),base must be from 2 to 36"):h=!0),isNaN(r)||r===parseInt(c.slice(0,-1),a))return this.strnum(i[1]),this.token("DOT",".~"),this.token("ID",i[2]),s.length;r+=""}else r=(i[3]||s).replace(NUMBER_OMIT,""),i[3]&&"0"===r.charAt()&&""!==(o=r.charAt(1))&&"."!==o&&this.carp("deprecated octal literal "+i[4]);return n.spaced||"+-"!==n[0]?(this.strnum(r),s.length):(n[0]="STRNUM",n[1]+=r,s.length)},exports.doString=function(e,t,s){var i,n;return s===e.charAt(t+1)?s===e.charAt(t+2)?this.doHeredoc(e,t,s):(this.strnum(s+s),2):'"'===s?(i=this.interpolate(e,t,s),this.addInterpolated(i,unlines),i.size):(n=(SIMPLESTR.lastIndex=t,SIMPLESTR).exec(e)[0]||this.carp("unterminated string"),this.strnum(unlines(this.string(s,n.slice(1,-1)))),this.countLines(n).length)},exports.doHeredoc=function(e,t,s){var i,n,a,r,c,h,o,l,u;if("'"===s)return~(i=e.indexOf(s+s+s,t+3))||this.carp("unterminated heredoc"),n=e.slice(t+3,i),a=n.replace(LASTDENT,""),this.strnum(enlines(this.string(s,lchomp(detab(a,heretabs(a)))))),this.countLines(n).length+6;for(r=this.interpolate(e,t,s+s+s),c=heretabs(e.slice(t+3,t+r.size-3).replace(LASTDENT,"")),h=0,o=r.length;h<o;++h)l=h,u=r[h],"S"===u[0]&&(l+1===r.length&&(u[1]=u[1].replace(LASTDENT,"")),u[1]=detab(u[1],c),0===l&&(u[1]=lchomp(u[1])));return this.addInterpolated(r,enlines),r.size},exports.doComment=function(e,t){var s,i,n;return s=~(i=e.indexOf("*/",t+2))?e.slice(t,i+2):e.slice(t)+"*/","NEWLINE"!==(n=this.last[0])&&"INDENT"!==n&&"THEN"!==n||(this.token("COMMENT",detab(s,this.dent)),this.token("NEWLINE","\n")),this.countLines(s).length},exports.doJS=function(e,t){var s,i;return JSTOKEN.lastIndex=t,s=JSTOKEN.exec(e)[0]||this.carp("unterminated JS literal"),this.token("LITERAL",(i=Object(detab(s.slice(2,-2),this.dent)),i.js=!0,i),!0),this.countLines(s).length},exports.doRegex=function(e,t){var s,i,n,a,r;return!(s=able(this.tokens)||"CREMENT"===this.last[0])||this.last.spaced&&" "!==(i=e.charAt(t+1))&&"="!==i?(i=(REGEX.lastIndex=t,REGEX).exec(e),n=i[0],a=i[1],r=i[2],n?this.regex(a,r):s||"("===this.last[0]||this.carp("unterminated regex"),n.length):0},exports.doHeregex=function(e,t){var s,i,n,a,r,c,h,o,l,u,E,f;if(s=this.tokens,i=this.last,n=this.interpolate(e,t,"//"),a=e.slice(t+n.size),r=this.validate(/^(?:[gimy]{1,4}|[?$]?)/.exec(a)[0]),n[1]){if("$"===r)this.adi(),this.token("(",'"');else if(s.push(["ID","RegExp",i[2],i[3]],["CALL(","",i[2],i[3]]),"?"===r)for(c=n.length-1;c>=0;--c)if(h=c,o=n[c],"TOKENS"===o[0]){l=n.splice(h,1)[0][1];break}for(c=0,u=n.length;c<u;++c){if(h=c,o=n[c],"TOKENS"===o[0])s.push.apply(s,o[1]);else{if(E=deheregex(o[1]),f&&!E)continue;f=s.push((o[0]="STRNUM",o[1]=this.string("'",enslash(E)),o))}s.push(["+-","+",s[s.length-1][2],s[s.length-1][3]])}--s.length,(l||r>="g")&&(this.token(",",","),l?s.push.apply(s,l):this.token("STRNUM","'"+r+"'")),this.token("$"===r?")":")CALL","")}else this.regex(reslash(deheregex(n[0][1])),r);return n.size+r.length},exports.doBackslash=function(e,t){var s,i,n;return BSTOKEN.lastIndex=t,s=BSTOKEN.exec(e),i=s[0],n=s[1],n?this.strnum(this.string("'",n)):this.countLines(i),i.length},exports.doLine=function(e,t){var s,i,n,a,r,c,h,o,l;if(s=(MULTIDENT.lastIndex=t,MULTIDENT).exec(e),i=s[0],n=s[1],a=this.countLines(i).length,r=this.last,r.eol=!0,r.spaced=!0,t+a>=e.length)return a;if((c=n&&(this.emender||(this.emender=RegExp("[^"+n.charAt()+"]"))).exec(n))&&this.carp("contaminated indent "+escape(c)),0>(h=n.length-this.dent))this.dedent(-h),this.newline();else{if(o=r[0],l=r[1],"ASSIGN"===o&&"="!=(s=l+"")&&":="!==s&&"+="!==s||"++"===l&&(s=this.tokens)[s.length-2].spaced||"+-"===o||"PIPE"===o||"BACKPIPE"===o||"COMPOSE"===o||"DOT"===o||"LOGIC"===o||"MATH"===o||"COMPARE"===o||"RELATION"===o||"SHIFT"===o||"IN"===o||"OF"===o||"TO"===o||"BY"===o||"FROM"===o||"EXTENDS"===o||"IMPLEMENTS"===o)return a;h?this.indent(h):this.newline()}return this.fset("for",!1),this.fset("by",!1),a},exports.doSpace=function(e,t){var s;return SPACE.lastIndex=t,(s=SPACE.exec(e)[0])&&(this.last.spaced=!0),s.length},exports.doCase=function(){var e,t;if(this.seenFor=!1,"ASSIGN"===(e=this.last[0])||"->"===e||":"===e||"INDENT"===this.last[0]&&("ASSIGN"===(e=(t=this.tokens)[t.length-2][0])||"->"===e||":"===e))return this.token("SWITCH","switch"),this.token("CASE","case")},exports.doLiteral=function(e,t){var s,i,n,a,r;if(!(s=(SYMBOL.lastIndex=t,SYMBOL).exec(e)[0]))return 0;switch(i=n=s){case"|":if(i="CASE",this.doCase())return s.length;break;case"|>":i="PIPE";break;case"`":i="BACKTICK";break;case"<<":case">>":i="COMPOSE";break;case"<|":i="BACKPIPE";break;case"+":case"-":i="+-";break;case"&&":case"||":i="LOGIC";break;case".&.":case".|.":case".^.":i="BITWISE";break;case"^^":i="CLONE";break;case"**":case"^":i="POWER";break;case"?":"("===this.last[0]?(this.token("PARAM(","("),this.token(")PARAM",")"),this.token("->","->"),this.token("ID","it")):this.last.spaced&&(i="LOGIC");break;case"/":case"%":case"%%":i="MATH";break;case"++":case"--":i="CREMENT";break;case"<<<":case"<<<<":i="IMPORT";break;case";":i="NEWLINE",this.fset("by",!1);break;case"..":return this.token("LITERAL","..",!0),2;case".":"?"===this.last[1]&&(this.last[0]="?"),i="DOT";break;case",":switch(this.last[0]){case",":case"[":case"(":case"CALL(":this.token("LITERAL","void");break;case"FOR":case"OWN":this.token("ID","")}break;case"!=":case"~=":if(!able(this.tokens)&&"("!==(a=this.last[0])&&"CREMENT"!==a)return this.tokens.push("!="===n?["UNARY","!",this.line,this.column]:["UNARY","~",this.line,this.column],["ASSIGN","=",this.line,this.column]),2;case"!~=":case"==":n=function(){switch(n){case"~=":return"==";case"!~=":return"!=";case"==":return"===";case"!=":return"!=="}}(),i="COMPARE";break;case"===":case"!==":n+="=";case"<":case">":case"<=":case">=":case"<==":case">==":case">>=":case"<<=":i="COMPARE";break;case".<<.":case".>>.":case".>>>.":case"<?":case">?":i="SHIFT";break;case"(":if("FUNCTION"!==(a=this.last[0])&&"GENERATOR"!==a&&"LET"!==a&&!this.able(!0)&&".@"!==this.last[1])return this.token("(","("),this.closes.push(")"),this.parens.push(this.last),1;i="CALL(",this.closes.push(")CALL");break;case"[":case"{":this.adi(),this.closes.push("]}".charAt("{"===n));break;case"}":if(this.inter&&n!==(a=this.closes)[a.length-1])return this.rest=e.slice(t+1),9e9;case"]":case")":")"!==i||"+-"!==(a=this.last[0])&&"COMPARE"!==a&&"LOGIC"!==a&&"MATH"!==a&&"POWER"!==a&&"SHIFT"!==a&&"BITWISE"!==a&&"CONCAT"!==a&&"COMPOSE"!==a&&"RELATION"!==a&&"PIPE"!==a&&"BACKPIPE"!==a&&"IMPORT"!==a&&"CLONEPORT"!==a&&"ASSIGN"!==a||((a=this.tokens)[a.length-1][0]=function(){switch(this.last[0]){case"RELATION":return"BIOPR";case"PIPE":return this.parameters(!1,-1),"BIOPP";default:return"BIOP"}}.call(this)),")"===(i=n=this.pair(n))&&(this.lpar=this.parens.pop());break;case"=":case":":if(":"===n){switch(this.last[0]){case"ID":case"STRNUM":case")":break;case"...":this.last[0]="STRNUM";break;default:i="LABEL",n=""}return this.token(i,n),s.length}case":=":case"+=":case"-=":case"*=":case"/=":case"%=":case"%%=":case"<?=":case">?=":case"**=":case"^=":case".&.=":case".|.=":case".^.=":case".<<.=":case".>>.=":case".>>>.=":case"++=":case"|>=":if("."===this.last[1]||"?"===this.last[0]&&this.adi())return this.last[1]+=n,n.length;"LOGIC"===this.last[0]?(n=Object(n)).logic=this.tokens.pop()[1]:"+="!==n&&"-="!==n||able(this.tokens)||"+-"===(a=this.last[0])||"UNARY"===a||"LABEL"===a||(this.token("UNARY",n.charAt()),n="="),i="ASSIGN";break;case"::=":return this.token("DOT","."),this.token("ID","prototype"),this.token("IMPORT","<<"),s.length;case"*":if("FUNCTION"===this.last[0])return this.last[0]="GENERATOR",s.length;if(r=("NEWLINE"===(a=this.last[0])||"INDENT"===a||"THEN"===a||"=>"===a)&&(INLINEDENT.lastIndex=t+1,INLINEDENT).exec(e)[0].length)return this.tokens.push(["LITERAL","void",this.line,this.column],["ASSIGN","=",this.line,this.column]),this.indent(t+r-1-this.dent-e.lastIndexOf("\n",t-1)),r;i=able(this.tokens)||"CREMENT"===this.last[0]&&able(this.tokens,this.tokens.length-1)||"("===this.last[0]?"MATH":"STRNUM";break;case"@":return this.adi(),"DOT"===this.last[0]&&"."===this.last[1]&&"ID"===(a=this.tokens)[a.length-2][0]&&"constructor"===(a=this.tokens)[a.length-2][1]?(this.tokens.pop(),this.tokens.pop(),this.token("LITERAL","this",!0),this.adi(),this.token("ID","constructor",!0)):this.token("LITERAL","this",!0),1;case"@@":return this.adi(),this.token("ID","constructor",!0),2;case"&":return this.token("LITERAL","arguments"),1;case"!":switch(!1){default:if(!this.last.spaced){if("require"===this.last[1])this.last[0]="REQUIRE",this.last[1]="require!";else if(able(this.tokens,null,!0))this.token("CALL(","!"),this.token(")CALL",")");else if("typeof"===this.last[1])this.last[1]="classof";else{if("delete"!==this.last[1])break;this.last[1]="jsdelete"}return 1}}i="UNARY";break;case"|":i="BITWISE";break;case"~":if(this.dotcat(n))return 1;i="UNARY";break;case"::":this.adi(),n="prototype",i="ID";break;case"=>":this.unline(),this.fset("for",!1),i="THEN";break;default:if(/^!?(?:--?|~~?)>\*?$/.test(n))this.parameters(i="->");else if(/^\*?<(?:--?|~~?)!?$/.test(n))this.parameters(i="<-");else switch(n.charAt(0)){case"(":this.token("CALL(","("),i=")CALL",n=")";break;case"<":return n.length<4&&this.carp("unterminated words"),this.token("WORDS",n.slice(2,-2),this.adi()),this.countLines(n).length}}return"+-"!==i&&"COMPARE"!==i&&"LOGIC"!==i&&"MATH"!==i&&"POWER"!==i&&"SHIFT"!==i&&"BITWISE"!==i&&"CONCAT"!==i&&"RELATION"!==i&&"PIPE"!==i&&"BACKPIPE"!==i&&"COMPOSE"!==i&&"IMPORT"!==i||"("!==this.last[0]||(i="BACKPIPE"===i?"BIOPBP":"BIOP"),","!==i&&"CASE"!==i&&"PIPE"!==i&&"BACKPIPE"!==i&&"COMPOSE"!==i&&"DOT"!==i&&"LOGIC"!==i&&"COMPARE"!==i&&"MATH"!==i&&"POWER"!==i&&"IMPORT"!==i&&"SHIFT"!==i&&"BITWISE"!==i||this.unline(),this.token(i,n),s.length},exports.token=function(e,t,s){return this.tokens.push(this.last=[e,t,this.line,this.column]),s&&(this.last.callable=!0),t},exports.indent=function(e){this.dent+=e,this.dents.push(this.token("INDENT",e)),this.closes.push("DEDENT")},exports.dedent=function(e){var t;for(this.dent-=e;e>0&&(t=this.dents.pop());)e<t&&!this.inter&&this.carp("unmatched dedent ("+e+" for "+t+")"),this.pair("DEDENT"),e-="number"==typeof t?this.token("DEDENT",t):t},exports.newline=function(){var e;"\n"===this.last[1]||this.tokens.push(this.last=(e=["NEWLINE","\n",this.line,this.column],e.spaced=!0,e))},exports.unline=function(){var e;if(this.tokens[1])switch(this.last[0]){case"INDENT":(e=this.dents)[e.length-1]+="";case"NEWLINE":this.tokens.length--}},exports.parameters=function(e,t){var s,i,n,a,r;if(")"===this.last[0]&&")"===this.last[1])return this.lpar[0]="PARAM(",void(this.last[0]=")PARAM");if("->"===e)this.token("PARAM(","");else{for(s=(i=this.tokens).length-1;s>=0&&(n=s,a=i[s],"NEWLINE"!==(r=a[0])&&"INDENT"!==r&&"THEN"!==r&&"=>"!==r&&"("!==r);--s);this.tokens.splice(n+1,0,["PARAM(","",a[2],a[3]])}t?this.tokens.splice(this.tokens.length+t,0,[")PARAM","",a[2],a[3]]):this.token(")PARAM","")},exports.interpolate=function(e,t,s){var i,n,a,r,c,h,o,l,u,E,f,d,p,N,I,T,A,S;for(i=[],n=s.charAt(0),a=0,r=-1,e=e.slice(t+s.length),c=[this.line,this.column],h=c[0],o=c[1],this.countLines(s);l=e.charAt(++r);){switch(l){case n:if(s!==e.slice(r,r+s.length))continue;return i.push(["S",this.countLines(e.slice(0,r)),h,o]),this.countLines(s),i.size=a+r+2*s.length,i;case"#":if(u=e.charAt(r+1),E=in$(u,["@"])&&u||(ID.lastIndex=r+1,ID).exec(e)[1],!E&&"{"!==u)continue;break;case"\\":++r;default:continue}if((r||T&&!f)&&(f=i.push(["S",this.countLines(e.slice(0,r)),h,o]),c=[this.line,this.column],h=c[0],o=c[1]),E){if(d=E.length,"@"===E&&(E="this"),in$(E,["this"]))p="LITERAL";else{E=camelize(E);try{Function("'use strict'; var "+E)}catch(e){N=e,this.carp("invalid variable interpolation '"+E+"'")}p="ID"}e=e.slice(I=r+1+d),i.push(["TOKENS",T=[[p,E,this.line,this.column]]])}else{for(c=clone$(exports),c.inter=!0,c.emender=this.emender,A=c,T=A.tokenize(e.slice(r+2),{line:this.line,column:this.column+2,raw:!0}),I=e.length-A.rest.length,this.countLines(e.slice(r,I)),e=A.rest;"NEWLINE"===(null!=(c=T[0])?c[0]:void 0);)T.shift();T.length&&(T.unshift(["(","(",h,o]),T.push([")",")",this.line,this.column-1]),i.push(["TOKENS",T])),S=[this.line,this.column],h=S[0],o=S[1]}a+=I,r=-1}this.carp("missing `"+s+"`")},exports.addInterpolated=function(e,t){var s,i,n,a,r,c,h,o,l,u,E;if(!e[1])return this.strnum(t(this.string('"',e[0][1])));for(s=this.tokens,i=this.last,n=i.spaced||"%"!==i[1]?["(",")",["+-","+"]]:(--s.length,this.last=i=s[s.length-1],["[","]",[",",","]]),a=n[0],r=n[1],c=n[2],h=this.adi(),s.push([a,'"',i[2],i[3]]),o=0,l=e.length;o<l;++o){if(u=o,E=e[o],"TOKENS"===E[0])s.push.apply(s,E[1]);else{if(u>1&&!E[1])continue;s.push(["STRNUM",t(this.string('"',E[1])),E[2],E[3]])}s.push(c.concat(s[s.length-1][2],s[s.length-1][3]))}--s.length,this.token(r,"",h)},exports.strnum=function(e){this.token("STRNUM",e,this.adi()||"DOT"===this.last[0])},exports.regex=function(e,t){var s;try{RegExp(e)}catch(e){s=e,this.carp(s.message)}return"$"===t?this.strnum(this.string("'",enslash(e))):this.token("LITERAL","/"+(e||"(?:)")+"/"+this.validate(t))},exports.adi=function(){if(!this.last.spaced&&able(this.tokens))return this.token("DOT",".")},exports.dotcat=function(e){if("."===this.last[1]||this.adi())return this.last[1]+=e},exports.pair=function(e){var t,s;return e===(t=(s=this.closes)[s.length-1])||")CALL"===t&&")"===e?(this.unline(),this.closes.pop()):("DEDENT"!==t&&this.carp("unmatched `"+e+"`"),this.dedent((s=this.dents)[s.length-1]),this.pair(e))},exports.able=function(e){return!this.last.spaced&&able(this.tokens,null,e)},exports.countLines=function(e){var t;for(this.isAtPrefix||(this.column+=e.length);t=1+e.indexOf("\n",t);)this.isAtPrefix||(this.column=0),this.column+=e.length-t,++this.line,this.isAtPrefix=!1;return this.charsCounted+=e.length,e},exports.forange=function(){var e,t,s;return("FOR"===(null!=(e=(t=this.tokens)[t.length-2-("NEWLINE"===(s=this.last[0])||"INDENT"===s)])?e[0]:void 0)||"FOR"===this.last[0])&&(this.fset("for",!1),this.fset("from",!0),!0)},exports.validate=function(e){var t;return(t=e&&/(.).*\1/.exec(e))&&this.carp("duplicate regex flag `"+t[1]+"`"),e},exports.fget=function(e){var t;return null!=(t=this.flags[this.closes.length])?t[e]:void 0},exports.fset=function(e,t){var s,i;((s=this.flags)[i=this.closes.length]||(s[i]={}))[e]=t},exports.carp=function(e){carp(e,this.line)},exports.string=function(e,t){return string(e,t,this.line)},string=function(e){return function(t,s,i){return s=s.replace(e,function(e,s,n,a){return e===t||"\\"===e?"\\"+e:s?"\\x"+(256+parseInt(s,8)).toString(16).slice(1):(n&&carp("malformed character escape sequence",i),a&&t!==a?a:e)}),t+s+t}}.call(this,/['"]|\\(?:([0-3]?[0-7]{2}|[1-7]|0(?=[89]))|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|([xu])|[\\0bfnrtv]|[^\n\S]|([\w\W]))?/g),TABS=/\n(?!$)[^\n\S]*/gm,unlines=function(e){return e.replace(/\n[^\n\S]*/g,"")},enlines=function(e){return e.replace(/\n/g,"\\n")},enslash=function(e){return e.replace(/\\/g,"\\\\")},reslash=function(e){return e.replace(/(\\.)|\//g,function(){return arguments[1]||"\\/"})},camelize=function(e){return e.replace(/-[a-z]/gi,function(e){return e.charAt(1).toUpperCase()})},deheregex=function(e){return e.replace(/\s+(?:#.*)?|(\\[\s\S])/g,function(e,t){return t||(t=""),"\n"===t.charAt(1)?"\\n":t})},character="undefined"==typeof JSON||null===JSON?uxxxx:function(e){switch(e){case 8232:case 8233:return uxxxx(e);default:return JSON.stringify(String.fromCharCode(e))}},KEYWORDS_SHARED=["true","false","null","this","void","super","return","throw","break","continue","if","else","for","while","switch","case","default","try","catch","finally","function","class","extends","implements","new","do","delete","typeof","in","instanceof","let","with","var","const","import","export","debugger","yield"],KEYWORDS_UNUSED=["enum","interface","package","private","protected","public","static"],JS_KEYWORDS=KEYWORDS_SHARED.concat(KEYWORDS_UNUSED),LS_KEYWORDS=["xor","match","where"],ID=/((?!\s)[a-z_$\xAA-\uFFDC](?:(?!\s)[\w$\xAA-\uFFDC]|-[a-z])*)([^\n\S]*:(?![:=]))?|/gi,SYMBOL=/[-\/^]=|[%+:*]{1,2}=|\|>=|\.(?:[&\|\^]|<<|>>>?)\.=?|\.{1,3}|\^\^|\*?<(?:--?|~~?)!?|!?(?:--?|~~?)>\*?|([-+&|:])\1|%%|&|\([^\n\S]*\)|[!=]==?|!?\~=|@@?|<\[(?:[\s\S]*?\]>)?|<<<<?|<\||[<>]==|<<=|>>=|<<|>>|[<>]\??=?|\|>|\||=>|\*\*|\^|`|[^\s#]?/g,SPACE=/[^\n\S]*(?:#.*)?/g,MULTIDENT=/(?:\s*#.*)*(?:\n([^\n\S]*))*/g,SIMPLESTR=/'[^\\']*(?:\\[\s\S][^\\']*)*'|/g,JSTOKEN=/``[^\\`]*(?:\\[\s\S][^\\`]*)*``|/g,BSTOKEN=RegExp("\\\\(?:(\\S[^\\s,;)}\\]]*)|(?:"+SPACE.source+"\\n?)*)","g"),NUMBER=/0x[\dA-Fa-f][\dA-Fa-f_]*|(\d*)~([\dA-Za-z]\w*)|((\d[\d_]*)(\.\d[\d_]*)?(?:e[+-]?\d[\d_]*)?)[$\w]*|/g,NUMBER_OMIT=/_+/g,REGEX=/\/([^[\/\n\\]*(?:(?:\\.|\[[^\]\n\\]*(?:\\.[^\]\n\\]*)*\])[^[\/\n\\]*)*)\/([gimy]{1,4}|\$?)|/g,HEREGEX_OMIT=/\s+(?:#.*)?/g,LASTDENT=/\n[^\n\S]*$/,INLINEDENT=/[^\n\S]*[^#\s]?/g,NONASCII=/[\x80-\uFFFF]/,OPENERS=["(","[","{","CALL(","PARAM(","INDENT"],CLOSERS=[")","]","}",")CALL",")PARAM","DEDENT"],
INVERSES=import$(function(){var e,t,s,n={};for(e=0,s=(t=OPENERS).length;e<s;++e)i=e,o=t[e],n[o]=CLOSERS[i];return n}(),function(){var e,t,s,n={};for(e=0,s=(t=CLOSERS).length;e<s;++e)i=e,c=t[e],n[c]=OPENERS[i];return n}()),CHAIN=["(","{","[","ID","STRNUM","LITERAL","LET","WITH","WORDS"],ARG=CHAIN.concat(["...","UNARY","YIELD","CREMENT","PARAM(","FUNCTION","GENERATOR","IF","SWITCH","TRY","CLASS","RANGE","LABEL","DECL","DO","BIOPBP"]),BLOCK_USERS=[",",":","->","ELSE","ASSIGN","IMPORT","UNARY","DEFAULT","TRY","FINALLY","HURL","DECL","DO","LET","FUNCTION","GENERATOR","..."];