var TAFFY,exports,T;(function(){var f,q,p,t,d,b,n,m,r,e,c,u,w,v,h,g,j,o,i,l,a,s,k;if(!TAFFY){d="2.7";b=1;n="000000";m=1000;r={};e=function(x){if(TAFFY.isArray(x)||TAFFY.isObject(x)){return x}else{return JSON.parse(x)}};i=function(y,x){return l(y,function(z){return x.indexOf(z)>=0})};l=function(A,z,y){var x=[];if(A==null){return x}if(Array.prototype.filter&&A.filter===Array.prototype.filter){return A.filter(z,y)}c(A,function(D,B,C){if(z.call(y,D,B,C)){x[x.length]=D}});return x};k=function(x){return Object.prototype.toString.call(x)==="[object RegExp]"};s=function(z){var x=T.isArray(z)?[]:T.isObject(z)?{}:null;if(z===null){return z}for(var y in z){x[y]=k(z[y])?z[y].toString():T.isArray(z[y])||T.isObject(z[y])?s(z[y]):z[y]}return x};a=function(y){var x=JSON.stringify(y);if(x.match(/regex/)===null){return x}return JSON.stringify(s(y))};c=function(B,A,C){var E,D,z,F;if(B&&((T.isArray(B)&&B.length===1)||(!T.isArray(B)))){A((T.isArray(B))?B[0]:B,0)}else{for(E,D,z=0,B=(T.isArray(B))?B:[B],F=B.length;z<F;z++){D=B[z];if(!T.isUndefined(D)||(C||false)){E=A(D,z);if(E===T.EXIT){break}}}}};u=function(C,z){var y=0,B,A;for(A in C){if(C.hasOwnProperty(A)){B=z(C[A],A,y++);if(B===T.EXIT){break}}}};r.extend=function(x,y){r[x]=function(){return y.apply(this,arguments)}};w=function(y){var x;if(T.isString(y)&&/[t][0-9]*[r][0-9]*/i.test(y)){return true}if(T.isObject(y)&&y.___id&&y.___s){return true}if(T.isArray(y)){x=true;c(y,function(z){if(!w(z)){x=false;return TAFFY.EXIT}});return x}return false};h=function(z,y){var x=true;c(y,function(A){switch(T.typeOf(A)){case"function":if(!A.apply(z)){x=false;return TAFFY.EXIT}break;case"array":x=(A.length===1)?(h(z,A[0])):(A.length===2)?(h(z,A[0])||h(z,A[1])):(A.length===3)?(h(z,A[0])||h(z,A[1])||h(z,A[2])):(A.length===4)?(h(z,A[0])||h(z,A[1])||h(z,A[2])||h(z,A[3])):false;if(A.length>4){c(A,function(B){if(h(z,B)){x=true}})}break}});return x};v=function(y){var x=[];if(T.isString(y)&&/[t][0-9]*[r][0-9]*/i.test(y)){y={___id:y}}if(T.isArray(y)){c(y,function(z){x.push(v(z))});y=function(){var A=this,z=false;c(x,function(B){if(h(A,B)){z=true}});return z};return y}if(T.isObject(y)){if(T.isObject(y)&&y.___id&&y.___s){y={___id:y.___id}}u(y,function(z,A){if(!T.isObject(z)){z={is:z}}u(z,function(B,C){var E=[],D;D=(C==="hasAll")?function(F,G){G(F)}:c;D(B,function(G){var F=true,H=false,I;I=function(){var N=this[A],M="==",O="!=",Q="===",R="<",L=">",S="<=",P=">=",K="!==",J;if(typeof N==="undefined"){return false}if((C.indexOf("!")===0)&&C!==O&&C!==K){F=false;C=C.substring(1,C.length)}J=((C==="regex")?(G.test(N)):(C==="lt"||C===R)?(N<G):(C==="gt"||C===L)?(N>G):(C==="lte"||C===S)?(N<=G):(C==="gte"||C===P)?(N>=G):(C==="left")?(N.indexOf(G)===0):(C==="leftnocase")?(N.toLowerCase().indexOf(G.toLowerCase())===0):(C==="right")?(N.substring((N.length-G.length))===G):(C==="rightnocase")?(N.toLowerCase().substring((N.length-G.length))===G.toLowerCase()):(C==="like")?(N.indexOf(G)>=0):(C==="likenocase")?(N.toLowerCase().indexOf(G.toLowerCase())>=0):(C===Q||C==="is")?(N===G):(C===M)?(N==G):(C===K)?(N!==G):(C===O)?(N!=G):(C==="isnocase")?(N.toLowerCase?N.toLowerCase()===G.toLowerCase():N===G):(C==="has")?(T.has(N,G)):(C==="hasall")?(T.hasAll(N,G)):(C==="contains")?(TAFFY.isArray(N)&&N.indexOf(G)>-1):(C.indexOf("is")===-1&&!TAFFY.isNull(N)&&!TAFFY.isUndefined(N)&&!TAFFY.isObject(G)&&!TAFFY.isArray(G))?(G===N[C]):(T[C]&&T.isFunction(T[C])&&C.indexOf("is")===0)?T[C](N)===G:(T[C]&&T.isFunction(T[C]))?T[C](N,G):(false));J=(J&&!F)?false:(!J&&!F)?true:J;return J};E.push(I)});if(E.length===1){x.push(E[0])}else{x.push(function(){var G=this,F=false;c(E,function(H){if(H.apply(G)){F=true}});return F})}})});y=function(){var A=this,z=true;z=(x.length===1&&!x[0].apply(A))?false:(x.length===2&&(!x[0].apply(A)||!x[1].apply(A)))?false:(x.length===3&&(!x[0].apply(A)||!x[1].apply(A)||!x[2].apply(A)))?false:(x.length===4&&(!x[0].apply(A)||!x[1].apply(A)||!x[2].apply(A)||!x[3].apply(A)))?false:true;if(x.length>4){c(x,function(B){if(!h(A,B)){z=false}})}return z};return y}if(T.isFunction(y)){return y}};j=function(x,y){var z=function(B,A){var C=0;T.each(y,function(F){var H,E,D,I,G;H=F.split(" ");E=H[0];D=(H.length===1)?"logical":H[1];if(D==="logical"){I=g(B[E]);G=g(A[E]);T.each((I.length<=G.length)?I:G,function(J,K){if(I[K]<G[K]){C=-1;return TAFFY.EXIT}else{if(I[K]>G[K]){C=1;return TAFFY.EXIT}}})}else{if(D==="logicaldesc"){I=g(B[E]);G=g(A[E]);T.each((I.length<=G.length)?I:G,function(J,K){if(I[K]>G[K]){C=-1;return TAFFY.EXIT}else{if(I[K]<G[K]){C=1;return TAFFY.EXIT}}})}else{if(D==="asec"&&B[E]<A[E]){C=-1;return T.EXIT}else{if(D==="asec"&&B[E]>A[E]){C=1;return T.EXIT}else{if(D==="desc"&&B[E]>A[E]){C=-1;return T.EXIT}else{if(D==="desc"&&B[E]<A[E]){C=1;return T.EXIT}}}}}}if(C===0&&D==="logical"&&I.length<G.length){C=-1}else{if(C===0&&D==="logical"&&I.length>G.length){C=1}else{if(C===0&&D==="logicaldesc"&&I.length>G.length){C=-1}else{if(C===0&&D==="logicaldesc"&&I.length<G.length){C=1}}}}if(C!==0){return T.EXIT}});return C};return(x&&x.push)?x.sort(z):x};(function(){var x={},y=0;g=function(z){if(y>m){x={};y=0}return x["_"+z]||(function(){var D=String(z),C=[],G="_",B="",A,E,F;for(A=0,E=D.length;A<E;A++){F=D.charCodeAt(A);if((F>=48&&F<=57)||F===46){if(B!=="n"){B="n";C.push(G.toLowerCase());G=""}G=G+D.charAt(A)}else{if(B!=="s"){B="s";C.push(parseFloat(G));G=""}G=G+D.charAt(A)}}C.push((B==="n")?parseFloat(G):G.toLowerCase());C.shift();x["_"+z]=C;y++;return C}())}}());o=function(){this.context({results:this.getDBI().query(this.context())})};r.extend("filter",function(){var y=TAFFY.mergeObj(this.context(),{run:null}),x=[];c(y.q,function(z){x.push(z)});y.q=x;c(arguments,function(z){y.q.push(v(z));y.filterRaw.push(z)});return this.getroot(y)});r.extend("order",function(z){z=z.split(",");var y=[],A;c(z,function(x){y.push(x.replace(/^\s*/,"").replace(/\s*$/,""))});A=TAFFY.mergeObj(this.context(),{sort:null});A.order=y;return this.getroot(A)});r.extend("limit",function(z){var y=TAFFY.mergeObj(this.context(),{}),x;y.limit=z;if(y.run&&y.sort){x=[];c(y.results,function(B,A){if((A+1)>z){return TAFFY.EXIT}x.push(B)});y.results=x}return this.getroot(y)});r.extend("start",function(z){var y=TAFFY.mergeObj(this.context(),{}),x;y.start=z;if(y.run&&y.sort&&!y.limit){x=[];c(y.results,function(B,A){if((A+1)>z){x.push(B)}});y.results=x}else{y=TAFFY.mergeObj(this.context(),{run:null,start:z})}return this.getroot(y)});r.extend("update",function(A,z,x){var B=true,D={},y=arguments,C;if(TAFFY.isString(A)&&(arguments.length===2||arguments.length===3)){D[A]=z;if(arguments.length===3){B=x}}else{D=A;if(y.length===2){B=z}}C=this;o.call(this);c(this.context().results,function(E){var F=D;if(TAFFY.isFunction(F)){F=F.apply(TAFFY.mergeObj(E,{}))}else{if(T.isFunction(F)){F=F(TAFFY.mergeObj(E,{}))}}if(TAFFY.isObject(F)){C.getDBI().update(E.___id,F,B)}});if(this.context().results.length){this.context({run:null})}return this});r.extend("remove",function(x){var y=this,z=0;o.call(this);c(this.context().results,function(A){y.getDBI().remove(A.___id);z++});if(this.context().results.length){this.context({run:null});y.getDBI().removeCommit(x)}return z});r.extend("count",function(){o.call(this);return this.context().results.length});r.extend("callback",function(z,x){if(z){var y=this;setTimeout(function(){o.call(y);z.call(y.getroot(y.context()))},x||0)}return null});r.extend("get",function(){o.call(this);return this.context().results});r.extend("stringify",function(){return JSON.stringify(this.get())});r.extend("first",function(){o.call(this);return this.context().results[0]||false});r.extend("last",function(){o.call(this);return this.context().results[this.context().results.length-1]||false});r.extend("sum",function(){var y=0,x=this;o.call(x);c(arguments,function(z){c(x.context().results,function(A){y=y+(A[z]||0)})});return y});r.extend("min",function(y){var x=null;o.call(this);c(this.context().results,function(z){if(x===null||z[y]<x){x=z[y]}});return x});(function(){var x=(function(){var A,y,z;A=function(E,G,D){var C,F,H,B;if(D.length===2){C=E[D[0]];H="===";F=G[D[1]]}else{C=E[D[0]];H=D[1];F=G[D[2]]}switch(H){case"===":return C===F;case"!==":return C!==F;case"<":return C<F;case">":return C>F;case"<=":return C<=F;case">=":return C>=F;case"==":return C==F;case"!=":return C!=F;default:throw String(H)+" is not supported"}};y=function(C,F){var B={},D,E;for(D in C){if(C.hasOwnProperty(D)){B[D]=C[D]}}for(D in F){if(F.hasOwnProperty(D)&&D!=="___id"&&D!=="___s"){E=!TAFFY.isUndefined(B[D])?"right_":"";B[E+String(D)]=F[D]}}return B};z=function(F){var B,D,C=arguments,E=C.length,G=[];if(typeof F.filter!=="function"){if(F.TAFFY){B=F()}else{throw"TAFFY DB or result not supplied"}}else{B=F}this.context({results:this.getDBI().query(this.context())});TAFFY.each(this.context().results,function(H){B.each(function(K){var I,J=true;CONDITION:for(D=1;D<E;D++){I=C[D];if(typeof I==="function"){J=I(H,K)}else{if(typeof I==="object"&&I.length){J=A(H,K,I)}else{J=false}}if(!J){break CONDITION}}if(J){G.push(y(H,K))}})});return TAFFY(G)()};return z}());r.extend("join",x)}());r.extend("max",function(y){var x=null;o.call(this);c(this.context().results,function(z){if(x===null||z[y]>x){x=z[y]}});return x});r.extend("select",function(){var y=[],x=arguments;o.call(this);if(arguments.length===1){c(this.context().results,function(z){y.push(z[x[0]])})}else{c(this.context().results,function(z){var A=[];c(x,function(B){A.push(z[B])});y.push(A)})}return y});r.extend("distinct",function(){var y=[],x=arguments;o.call(this);if(arguments.length===1){c(this.context().results,function(A){var z=A[x[0]],B=false;c(y,function(C){if(z===C){B=true;return TAFFY.EXIT}});if(!B){y.push(z)}})}else{c(this.context().results,function(z){var B=[],A=false;c(x,function(C){B.push(z[C])});c(y,function(D){var C=true;c(x,function(F,E){if(B[E]!==D[E]){C=false;return TAFFY.EXIT}});if(C){A=true;return TAFFY.EXIT}});if(!A){y.push(B)}})}return y});r.extend("supplant",function(y,x){var z=[];o.call(this);c(this.context().results,function(A){z.push(y.replace(/\{([^\{\}]*)\}/g,function(C,B){var D=A[B];return typeof D==="string"||typeof D==="number"?D:C}))});return(!x)?z.join(""):z});r.extend("each",function(x){o.call(this);c(this.context().results,x);return this});r.extend("map",function(x){var y=[];o.call(this);c(this.context().results,function(z){y.push(x(z))});return y});T=function(F){var C=[],G={},D=1,z={template:false,onInsert:false,onUpdate:false,onRemove:false,onDBChange:false,storageName:false,forcePropertyCase:null,cacheSize:100,name:""},B=new Date(),A=0,y=0,I={},E,x,H;x=function(L){var K=[],J=false;if(L.length===0){return C}c(L,function(M){if(T.isString(M)&&/[t][0-9]*[r][0-9]*/i.test(M)&&C[G[M]]){K.push(C[G[M]]);J=true}if(T.isObject(M)&&M.___id&&M.___s&&C[G[M.___id]]){K.push(C[G[M.___id]]);J=true}if(T.isArray(M)){c(M,function(N){c(x(N),function(O){K.push(O)})})}});if(J&&K.length>1){K=[]}return K};E={dm:function(J){if(J){B=J;I={};A=0;y=0}if(z.onDBChange){setTimeout(function(){z.onDBChange.call(C)},0)}if(z.storageName){setTimeout(function(){localStorage.setItem("taffy_"+z.storageName,JSON.stringify(C))})}return B},insert:function(M,N){var L=[],K=[],J=e(M);c(J,function(P,Q){var O,R;if(T.isArray(P)&&Q===0){c(P,function(S){L.push((z.forcePropertyCase==="lower")?S.toLowerCase():(z.forcePropertyCase==="upper")?S.toUpperCase():S)});return true}else{if(T.isArray(P)){O={};c(P,function(U,S){O[L[S]]=U});P=O}else{if(T.isObject(P)&&z.forcePropertyCase){R={};u(P,function(U,S){R[(z.forcePropertyCase==="lower")?S.toLowerCase():(z.forcePropertyCase==="upper")?S.toUpperCase():S]=P[S]});P=R}}}D++;P.___id="T"+String(n+b).slice(-6)+"R"+String(n+D).slice(-6);P.___s=true;K.push(P.___id);if(z.template){P=T.mergeObj(z.template,P)}C.push(P);G[P.___id]=C.length-1;if(z.onInsert&&(N||TAFFY.isUndefined(N))){z.onInsert.call(P)}E.dm(new Date())});return H(K)},sort:function(J){C=j(C,J.split(","));G={};c(C,function(L,K){G[L.___id]=K});E.dm(new Date());return true},update:function(Q,M,L){var P={},O,N,J,K;if(z.forcePropertyCase){u(M,function(R,S){P[(z.forcePropertyCase==="lower")?S.toLowerCase():(z.forcePropertyCase==="upper")?S.toUpperCase():S]=R});M=P}O=C[G[Q]];N=T.mergeObj(O,M);J={};K=false;u(N,function(R,S){if(TAFFY.isUndefined(O[S])||O[S]!==R){J[S]=R;K=true}});if(K){if(z.onUpdate&&(L||TAFFY.isUndefined(L))){z.onUpdate.call(N,C[G[Q]],J)}C[G[Q]]=N;E.dm(new Date())}},remove:function(J){C[G[J]].___s=false},removeCommit:function(K){var J;for(J=C.length-1;J>-1;J--){if(!C[J].___s){if(z.onRemove&&(K||TAFFY.isUndefined(K))){z.onRemove.call(C[J])}G[C[J].___id]=undefined;C.splice(J,1)}}G={};c(C,function(M,L){G[M.___id]=L});E.dm(new Date())},query:function(L){var O,P,K,N,M,J;if(z.cacheSize){P="";c(L.filterRaw,function(Q){if(T.isFunction(Q)){P="nocache";return TAFFY.EXIT}});if(P===""){P=a(T.mergeObj(L,{q:false,run:false,sort:false}))}}if(!L.results||!L.run||(L.run&&E.dm()>L.run)){K=[];if(z.cacheSize&&I[P]){I[P].i=A++;return I[P].results}else{if(L.q.length===0&&L.index.length===0){c(C,function(Q){K.push(Q)});O=K}else{N=x(L.index);c(N,function(Q){if(L.q.length===0||h(Q,L.q)){K.push(Q)}});O=K}}}else{O=L.results}if(L.order.length>0&&(!L.run||!L.sort)){O=j(O,L.order)}if(O.length&&((L.limit&&L.limit<O.length)||L.start)){M=[];c(O,function(R,Q){if(!L.start||(L.start&&(Q+1)>=L.start)){if(L.limit){J=(L.start)?(Q+1)-L.start:Q;if(J<L.limit){M.push(R)}else{if(J>L.limit){return TAFFY.EXIT}}}else{M.push(R)}}});O=M}if(z.cacheSize&&P!=="nocache"){y++;setTimeout(function(){var Q,R;if(y>=z.cacheSize*2){y=0;Q=A-z.cacheSize;R={};u(function(U,S){if(U.i>=Q){R[S]=U}});I=R}},0);I[P]={i:A++,results:O}}return O}};H=function(){var K,J;K=TAFFY.mergeObj(TAFFY.mergeObj(r,{insert:undefined}),{getDBI:function(){return E},getroot:function(L){return H.call(L)},context:function(L){if(L){J=TAFFY.mergeObj(J,L.hasOwnProperty("results")?TAFFY.mergeObj(L,{run:new Date(),sort:new Date()}):L)}return J},extend:undefined});J=(this&&this.q)?this:{limit:false,start:false,q:[],filterRaw:[],index:[],order:[],results:false,run:null,sort:null,settings:z};c(arguments,function(L){if(w(L)){J.index.push(L)}else{J.q.push(v(L))}J.filterRaw.push(L)});return K};b++;if(F){E.insert(F)}H.insert=E.insert;H.merge=function(M,L,N){var K={},J=[],O={};N=N||false;L=L||"id";c(M,function(Q){var P;K[L]=Q[L];J.push(Q[L]);P=H(K).first();if(P){E.update(P.___id,Q,N)}else{E.insert(Q,N)}});O[L]=J;return H(O)};H.TAFFY=true;H.sort=E.sort;H.settings=function(J){if(J){z=TAFFY.mergeObj(z,J);if(J.template){H().update(J.template)}}return z};H.store=function(L){var K=false,J;if(localStorage){if(L){J=localStorage.getItem("taffy_"+L);if(J&&J.length>0){H.insert(J);K=true}if(C.length>0){setTimeout(function(){localStorage.setItem("taffy_"+z.storageName,JSON.stringify(C))})}}H.settings({storageName:L})}return H};return H};TAFFY=T;T.each=c;T.eachin=u;T.extend=r.extend;TAFFY.EXIT="TAFFYEXIT";TAFFY.mergeObj=function(z,x){var y={};u(z,function(A,B){y[B]=z[B]});u(x,function(A,B){y[B]=x[B]});return y};TAFFY.has=function(z,y){var x=false,A;if((z.TAFFY)){x=z(y);if(x.length>0){return true}else{return false}}else{switch(T.typeOf(z)){case"object":if(T.isObject(y)){u(y,function(B,C){if(x===true&&!T.isUndefined(z[C])&&z.hasOwnProperty(C)){x=T.has(z[C],y[C])}else{x=false;return TAFFY.EXIT}})}else{if(T.isArray(y)){c(y,function(B,C){x=T.has(z,y[C]);if(x){return TAFFY.EXIT}})}else{if(T.isString(y)){if(!TAFFY.isUndefined(z[y])){return true}else{return false}}}}return x;case"array":if(T.isObject(y)){c(z,function(B,C){x=T.has(z[C],y);if(x===true){return TAFFY.EXIT}})}else{if(T.isArray(y)){c(y,function(C,B){c(z,function(E,D){x=T.has(z[D],y[B]);if(x===true){return TAFFY.EXIT}});if(x===true){return TAFFY.EXIT}})}else{if(T.isString(y)||T.isNumber(y)){x=false;for(A=0;A<z.length;A++){x=T.has(z[A],y);if(x){return true}}}}}return x;case"string":if(T.isString(y)&&y===z){return true}break;default:if(T.typeOf(z)===T.typeOf(y)&&z===y){return true}break}}return false};TAFFY.hasAll=function(A,z){var y=TAFFY,x;if(y.isArray(z)){x=true;c(z,function(B){x=y.has(A,B);if(x===false){return TAFFY.EXIT}});return x}else{return y.has(A,z)}};TAFFY.typeOf=function(x){var y=typeof x;if(y==="object"){if(x){if(typeof x.length==="number"&&!(x.propertyIsEnumerable("length"))){y="array"}}else{y="null"}}return y};TAFFY.getObjectKeys=function(x){var y=[];u(x,function(A,z){y.push(z)});y.sort();return y};TAFFY.isSameArray=function(y,x){return(TAFFY.isArray(y)&&TAFFY.isArray(x)&&y.join(",")===x.join(","))?true:false};TAFFY.isSameObject=function(A,y){var x=TAFFY,z=true;if(x.isObject(A)&&x.isObject(y)){if(x.isSameArray(x.getObjectKeys(A),x.getObjectKeys(y))){u(A,function(B,C){if(!((x.isObject(A[C])&&x.isObject(y[C])&&x.isSameObject(A[C],y[C]))||(x.isArray(A[C])&&x.isArray(y[C])&&x.isSameArray(A[C],y[C]))||(A[C]===y[C]))){z=false;return TAFFY.EXIT}})}else{z=false}}else{z=false}return z};f=["String","Number","Object","Array","Boolean","Null","Function","Undefined"];q=function(x){return function(y){return TAFFY.typeOf(y)===x.toLowerCase()?true:false}};for(p=0;p<f.length;p++){t=f[p];TAFFY["is"+t]=q(t)}}}());if(typeof(exports)==="object"){exports.taffy=TAFFY};

/*
string.js - Copyright (C) 2012-2013, JP Richardson <jprichardson@gmail.com>
*/!function(){"use strict";function n(e){e!==null&&e!==undefined?typeof e=="string"?this.s=e:this.s=e.toString():this.s=e,this.orig=e,e!==null&&e!==undefined?this.__defineGetter__?this.__defineGetter__("length",function(){return this.s.length}):this.length=e.length:this.length=-1}function o(){for(var e in i)(function(e){var t=i[e];r.hasOwnProperty(e)||(s.push(e),r[e]=function(){return String.prototype.s=this,t.apply(this,arguments)})})(e)}function u(){for(var e=0;e<s.length;++e)delete String.prototype[s[e]];s.length=0}function l(){var e=c(),t={};for(var n=0;n<e.length;++n){var i=e[n],s=r[i];try{var o=typeof s.apply("teststring",[]);t[i]=o}catch(u){}}return t}function c(){var e=[];if(Object.getOwnPropertyNames)return e=Object.getOwnPropertyNames(r),e.splice(e.indexOf("valueOf"),1),e.splice(e.indexOf("toString"),1),e;var t={},n=[];for(var i in String.prototype)t[i]=i;for(var i in Object.prototype)delete t[i];for(var i in t)e.push(i);return e}function h(e){return new n(e)}function p(e,t){var n=[],r;for(r=0;r<e.length;r++)n.push(e[r]),t&&t.call(e,e[r],r);return n}var e="1.3.0",t={},r=String.prototype,i=n.prototype={between:function(e,t){var r=this.s,i=r.indexOf(e),s=r.indexOf(t),o=i+e.length;return new n(s>i?r.slice(o,s):"")},camelize:function(){var e=this.trim().s.replace(/(\-|_|\s)+(.)?/g,function(e,t,n){return n?n.toUpperCase():""});return new n(e)},capitalize:function(){return new n(this.s.substr(0,1).toUpperCase()+this.s.substring(1).toLowerCase())},charAt:function(e){return this.s.charAt(e)},chompLeft:function(e){var t=this.s;return t.indexOf(e)===0?(t=t.slice(e.length),new n(t)):this},chompRight:function(e){if(this.endsWith(e)){var t=this.s;return t=t.slice(0,t.length-e.length),new n(t)}return this},collapseWhitespace:function(){var e=this.s.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"");return new n(e)},contains:function(e){return this.s.indexOf(e)>=0},dasherize:function(){var e=this.trim().s.replace(/[_\s]+/g,"-").replace(/([A-Z])/g,"-$1").replace(/-+/g,"-").toLowerCase();return new n(e)},decodeHtmlEntities:function(){var e=this.s;return e=e.replace(/&#(\d+);?/g,function(e,t){return String.fromCharCode(t)}).replace(/&#[xX]([A-Fa-f0-9]+);?/g,function(e,t){return String.fromCharCode(parseInt(t,16))}).replace(/&([^;\W]+;?)/g,function(e,n){var r=n.replace(/;$/,""),i=t[n]||n.match(/;$/)&&t[r];return typeof i=="number"?String.fromCharCode(i):typeof i=="string"?i:e}),new n(e)},endsWith:function(e){var t=this.s.length-e.length;return t>=0&&this.s.indexOf(e,t)===t},escapeHTML:function(){return new n(this.s.replace(/[&<>"']/g,function(e){return"&"+v[e]+";"}))},ensureLeft:function(e){var t=this.s;return t.indexOf(e)===0?this:new n(e+t)},ensureRight:function(e){var t=this.s;return this.endsWith(e)?this:new n(t+e)},isAlpha:function(){return!/[^a-z\xC0-\xFF]/.test(this.s.toLowerCase())},isAlphaNumeric:function(){return!/[^0-9a-z\xC0-\xFF]/.test(this.s.toLowerCase())},isEmpty:function(){return this.s===null||this.s===undefined?!0:/^[\s\xa0]*$/.test(this.s)},isLower:function(){return this.isAlpha()&&this.s.toLowerCase()===this.s},isNumeric:function(){return!/[^0-9]/.test(this.s)},isUpper:function(){return this.isAlpha()&&this.s.toUpperCase()===this.s},left:function(e){if(e>=0){var t=this.s.substr(0,e);return new n(t)}return this.right(-e)},lines:function(){var e=this.s.split("\n");for(var t=0;t<e.length;++t)e[t]=e[t].replace(/(^\s*|\s*$)/g,"");return e},pad:function(e,t){t=t||" ";if(this.s.length>=e)return new n(this.s);e-=this.s.length;var r=Array(Math.ceil(e/2)+1).join(t),i=Array(Math.floor(e/2)+1).join(t);return new n(r+this.s+i)},padLeft:function(e,t){return t=t||" ",this.s.length>=e?new n(this.s):new n(Array(e-this.s.length+1).join(t)+this.s)},padRight:function(e,t){return t=t||" ",this.s.length>=e?new n(this.s):new n(this.s+Array(e-this.s.length+1).join(t))},parseCSV:function(e,t,n){e=e||",",n=n||"\\",typeof t=="undefined"&&(t='"');var r=0,i=[],s=[],o=this.s.length,u=!1,a=this,f=function(e){return a.s.charAt(e)};t||(u=!0);while(r<o){var l=f(r);switch(l){case t:u?f(r-1)===n?i.push(l):u=!1:u=!0;break;case e:u&&t?i.push(l):(s.push(i.join("")),i.length=0);break;case n:t&&f(r+1)!==t&&i.push(l);break;default:u&&i.push(l)}r+=1}return s.push(i.join("")),s},replaceAll:function(e,t){var r=this.s.split(e).join(t);return new n(r)},right:function(e){if(e>=0){var t=this.s.substr(this.s.length-e,e);return new n(t)}return this.left(-e)},slugify:function(){var e=(new n(this.s.replace(/[^\w\s-]/g,"").toLowerCase())).dasherize().s;return e.charAt(0)==="-"&&(e=e.substr(1)),new n(e)},startsWith:function(e){return this.s.lastIndexOf(e,0)===0},stripPunctuation:function(){return new n(this.s.replace(/[^\w\s]|_/g,"").replace(/\s+/g," "))},stripTags:function(){var e=this.s,t=arguments.length>0?arguments:[""];return p(t,function(t){e=e.replace(RegExp("</?"+t+"[^<>]*>","gi"),"")}),new n(e)},template:function(e,t,r){var i=this.s,t=t||h.TMPL_OPEN,r=r||h.TMPL_CLOSE,s=new RegExp(t+"(.+?)"+r,"g"),o=i.match(s)||[];return o.forEach(function(n){var s=n.substring(t.length,n.length-r.length);e[s]&&(i=i.replace(n,e[s]))}),new n(i)},times:function(e){return new n((new Array(e+1)).join(this.s))},toBoolean:function(){if(typeof this.orig=="string"){var e=this.s.toLowerCase();return e==="true"||e==="yes"||e==="on"}return this.orig===!0||this.orig===1},toFloat:function(e){var t=parseFloat(this.s,10);return e?parseFloat(t.toFixed(e)):t},toInt:function(){return/^\s*-?0x/i.test(this.s)?parseInt(this.s,16):parseInt(this.s,10)},trim:function(){var e;return typeof String.prototype.trim=="undefined"?e=this.s.replace(/(^\s*|\s*$)/g,""):e=this.s.trim(),new n(e)},trimLeft:function(){var e;return r.trimLeft?e=this.s.trimLeft():e=this.s.replace(/(^\s*)/g,""),new n(e)},trimRight:function(){var e;return r.trimRight?e=this.s.trimRight():e=this.s.replace(/\s+$/,""),new n(e)},truncate:function(e,t){var r=this.s;e=~~e,t=t||"...";if(r.length<=e)return new n(r);var i=function(e){return e.toUpperCase()!==e.toLowerCase()?"A":" "},s=r.slice(0,e+1).replace(/.(?=\W*\w*$)/g,i);return s.slice(s.length-2).match(/\w\w/)?s=s.replace(/\s*\S+$/,""):s=(new n(s.slice(0,s.length-1))).trimRight().s,(s+t).length>r.length?new n(r):new n(r.slice(0,s.length)+t)},toCSV:function(){function u(e){return e!==null&&e!==""}var e=",",t='"',r="\\",i=!0,s=!1,o=[];typeof arguments[0]=="object"?(e=arguments[0].delimiter||e,e=arguments[0].separator||e,t=arguments[0].qualifier||t,i=!!arguments[0].encloseNumbers,r=arguments[0].escapeChar||r,s=!!arguments[0].keys):typeof arguments[0]=="string"&&(e=arguments[0]),typeof arguments[1]=="string"&&(t=arguments[1]),arguments[1]===null&&(t=null);if(this.orig instanceof Array)o=this.orig;else for(var a in this.orig)this.orig.hasOwnProperty(a)&&(s?o.push(a):o.push(this.orig[a]));var f=r+t,l=[];for(var c=0;c<o.length;++c){var h=u(t);typeof o[c]=="number"&&(h&=i),h&&l.push(t);if(o[c]!==null){var p=(new n(o[c])).replaceAll(t,f).s;l.push(p)}else l.push("");h&&l.push(t),e&&l.push(e)}return l.length=l.length-1,new n(l.join(""))},toString:function(){return this.s},underscore:function(){var e=this.trim().s.replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase();return(new n(this.s.charAt(0))).isUpper()&&(e="_"+e),new n(e)},unescapeHTML:function(){return new n(this.s.replace(/\&([^;]+);/g,function(e,t){var n;return t in d?d[t]:(n=t.match(/^#x([\da-fA-F]+)$/))?String.fromCharCode(parseInt(n[1],16)):(n=t.match(/^#(\d+)$/))?String.fromCharCode(~~n[1]):e}))},valueOf:function(){return this.s.valueOf()}},s=[],a=l();for(var f in a)(function(e){var t=r[e];typeof t=="function"&&(i[e]||(a[e]==="string"?i[e]=function(){return new n(t.apply(this,arguments))}:i[e]=t))})(f);i.repeat=i.times,i.include=i.contains,i.toInteger=i.toInt,i.toBool=i.toBoolean,i.decodeHTMLEntities=i.decodeHtmlEntities,h.extendPrototype=o,h.restorePrototype=u,h.VERSION=e,h.TMPL_OPEN="{{",h.TMPL_CLOSE="}}",h.ENTITIES=t,typeof module!="undefined"&&typeof module.exports!="undefined"?module.exports=h:typeof define=="function"&&define.amd?define([],function(){return h}):window.S=h;var d={lt:"<",gt:">",quot:'"',apos:"'",amp:"&"},v={};for(var m in d)v[d[m]]=m;t={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,"OElig;":338,"oelig;":339,"Scaron;":352,"scaron;":353,"Yuml;":376,"fnof;":402,"circ;":710,"tilde;":732,"Alpha;":913,"Beta;":914,"Gamma;":915,"Delta;":916,"Epsilon;":917,"Zeta;":918,"Eta;":919,"Theta;":920,"Iota;":921,"Kappa;":922,"Lambda;":923,"Mu;":924,"Nu;":925,"Xi;":926,"Omicron;":927,"Pi;":928,"Rho;":929,"Sigma;":931,"Tau;":932,"Upsilon;":933,"Phi;":934,"Chi;":935,"Psi;":936,"Omega;":937,"alpha;":945,"beta;":946,"gamma;":947,"delta;":948,"epsilon;":949,"zeta;":950,"eta;":951,"theta;":952,"iota;":953,"kappa;":954,"lambda;":955,"mu;":956,"nu;":957,"xi;":958,"omicron;":959,"pi;":960,"rho;":961,"sigmaf;":962,"sigma;":963,"tau;":964,"upsilon;":965,"phi;":966,"chi;":967,"psi;":968,"omega;":969,"thetasym;":977,"upsih;":978,"piv;":982,"ensp;":8194,"emsp;":8195,"thinsp;":8201,"zwnj;":8204,"zwj;":8205,"lrm;":8206,"rlm;":8207,"ndash;":8211,"mdash;":8212,"lsquo;":8216,"rsquo;":8217,"sbquo;":8218,"ldquo;":8220,"rdquo;":8221,"bdquo;":8222,"dagger;":8224,"Dagger;":8225,"bull;":8226,"hellip;":8230,"permil;":8240,"prime;":8242,"Prime;":8243,"lsaquo;":8249,"rsaquo;":8250,"oline;":8254,"frasl;":8260,"euro;":8364,"image;":8465,"weierp;":8472,"real;":8476,"trade;":8482,"alefsym;":8501,"larr;":8592,"uarr;":8593,"rarr;":8594,"darr;":8595,"harr;":8596,"crarr;":8629,"lArr;":8656,"uArr;":8657,"rArr;":8658,"dArr;":8659,"hArr;":8660,"forall;":8704,"part;":8706,"exist;":8707,"empty;":8709,"nabla;":8711,"isin;":8712,"notin;":8713,"ni;":8715,"prod;":8719,"sum;":8721,"minus;":8722,"lowast;":8727,"radic;":8730,"prop;":8733,"infin;":8734,"ang;":8736,"and;":8743,"or;":8744,"cap;":8745,"cup;":8746,"int;":8747,"there4;":8756,"sim;":8764,"cong;":8773,"asymp;":8776,"ne;":8800,"equiv;":8801,"le;":8804,"ge;":8805,"sub;":8834,"sup;":8835,"nsub;":8836,"sube;":8838,"supe;":8839,"oplus;":8853,"otimes;":8855,"perp;":8869,"sdot;":8901,"lceil;":8968,"rceil;":8969,"lfloor;":8970,"rfloor;":8971,"lang;":9001,"rang;":9002,"loz;":9674,"spades;":9824,"clubs;":9827,"hearts;":9829,"diams;":9830}}.call(this);

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};
//pikaday
(function($){$.fn.pikaday=function(){var args=arguments;if(!args||!args.length){args=[{}];}return this.each(function(){var self=$(this),plugin=self.data('pikaday');if(!(plugin instanceof window.Pikaday)){if(typeof args[0]==='object'){var options=$.extend({},args[0]);options.field=self[0];self.data('pikaday',new Pikaday(options));}}else{if(typeof args[0]==='string'&&typeof plugin[args[0]]==='function'){plugin[args[0]].apply(plugin,Array.prototype.slice.call(args,1));}}});};})(window.jQuery);(function(window,document,undefined){'use strict';var hasMoment=typeof window.moment==='function',hasEventListeners=!!window.addEventListener,sto=window.setTimeout,addEvent=function(el,e,callback,capture){if(hasEventListeners){el.addEventListener(e,callback,!!capture);}else{el.attachEvent('on'+e,callback);}},removeEvent=function(el,e,callback,capture){if(hasEventListeners){el.removeEventListener(e,callback,!!capture);}else{el.detachEvent('on'+e,callback);}},fireEvent=function(el,eventName,data){var ev;if(document.createEvent){ev=document.createEvent('HTMLEvents');ev.initEvent(eventName,true,false);ev=extend(ev,data);el.dispatchEvent(ev);}else if(document.createEventObject){ev=document.createEventObject();ev=extend(ev,data);el.fireEvent('on'+eventName,ev);}},trim=function(str){return str.trim?str.trim():str.replace(/^\s+|\s+$/g,'');},hasClass=function(el,cn){return(' '+el.className+' ').indexOf(' '+cn+' ')!==-1;},addClass=function(el,cn){if(!hasClass(el,cn)){el.className=(el.className==='')?cn:el.className+' '+cn;}},removeClass=function(el,cn){el.className=trim((' '+el.className+' ').replace(' '+cn+' ',' '));},isArray=function(obj){return(/Array/).test(Object.prototype.toString.call(obj));},isDate=function(obj){return(/Date/).test(Object.prototype.toString.call(obj))&&!isNaN(obj.getTime());},isLeapYear=function(year){return year%4===0&&year%100!==0||year%400===0;},getDaysInMonth=function(year,month){return[31,isLeapYear(year)?29:28,31,30,31,30,31,31,30,31,30,31][month];},compareDates=function(a,b){return a.getTime()===b.getTime();},extend=function(to,from,overwrite){var prop,hasProp;for(prop in from){hasProp=to[prop]!==undefined;if(hasProp&&typeof from[prop]==='object'&&from[prop].nodeName===undefined){if(isDate(from[prop])){if(overwrite){to[prop]=new Date(from[prop].getTime());}}else if(isArray(from[prop])){if(overwrite){to[prop]=from[prop].slice(0);}}else{to[prop]=extend({},from[prop],overwrite);}}else if(overwrite||!hasProp){to[prop]=from[prop];}}return to;},defaults={field:null,bound:undefined,format:'YYYY-MM-DD',defaultDate:null,setDefaultDate:false,firstDay:0,minDate:null,maxDate:null,yearRange:10,minYear:0,maxYear:9999,minMonth:undefined,maxMonth:undefined,isRTL:false,numberOfMonths:1,i18n:{previousMonth:'Previous Month',nextMonth:'Next Month',months:['January','February','March','April','May','June','July','August','September','October','November','December'],weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],weekdaysShort:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']},onSelect:null,onOpen:null,onClose:null,onDraw:null},renderDayName=function(opts,day,abbr){day+=opts.firstDay;while(day>=7){day-=7;}return abbr?opts.i18n.weekdaysShort[day]:opts.i18n.weekdays[day];},renderDay=function(i,isSelected,isToday,isDisabled,isEmpty){if(isEmpty){return'<td class="is-empty"></td>';}var arr=[];if(isDisabled){arr.push('is-disabled');}if(isToday){arr.push('is-today');}if(isSelected){arr.push('is-selected');}return'<td data-day="'+i+'" class="'+arr.join(' ')+'"><button class="pika-button" type="button">'+i+'</button>'+'</td>';},renderRow=function(days,isRTL){return'<tr>'+(isRTL?days.reverse():days).join('')+'</tr>';},renderBody=function(rows){return'<tbody>'+rows.join('')+'</tbody>';},renderHead=function(opts){var i,arr=[];for(i=0;i<7;i++){arr.push('<th scope="col"><abbr title="'+renderDayName(opts,i)+'">'+renderDayName(opts,i,true)+'</abbr></th>');}return'<thead>'+(opts.isRTL?arr.reverse():arr).join('')+'</thead>';},renderTitle=function(instance){var i,j,arr,opts=instance._o,month=instance._m,year=instance._y,isMinYear=year===opts.minYear,isMaxYear=year===opts.maxYear,html='<div class="pika-title">',prev=true,next=true;for(arr=[],i=0;i<12;i++){arr.push('<option value="'+i+'"'+(i===month?' selected':'')+((isMinYear&&i<opts.minMonth)||(isMaxYear&&i>opts.maxMonth)?'disabled':'')+'>'+opts.i18n.months[i]+'</option>');}html+='<div class="pika-label">'+opts.i18n.months[month]+'<select class="pika-select pika-select-month">'+arr.join('')+'</select></div>';if(isArray(opts.yearRange)){i=opts.yearRange[0];j=opts.yearRange[1]+1;}else{i=year-opts.yearRange;j=1+year+opts.yearRange;}for(arr=[];i<j&&i<=opts.maxYear;i++){if(i>=opts.minYear){arr.push('<option value="'+i+'"'+(i===year?' selected':'')+'>'+(i)+'</option>');}}html+='<div class="pika-label">'+year+'<select class="pika-select pika-select-year">'+arr.join('')+'</select></div>';if(isMinYear&&(month===0||opts.minMonth>=month)){prev=false;}if(isMaxYear&&(month===11||opts.maxMonth<=month)){next=false;}html+='<button class="pika-prev'+(prev?'':' is-disabled')+'" type="button">'+opts.i18n.previousMonth+'</button>';html+='<button class="pika-next'+(next?'':' is-disabled')+'" type="button">'+opts.i18n.nextMonth+'</button>';return html+='</div>';},renderTable=function(opts,data){return'<table cellpadding="0" cellspacing="0" class="pika-table">'+renderHead(opts)+renderBody(data)+'</table>';};window.Pikaday=function(options){var self=this,opts=self.config(options);self._onMouseDown=function(e){if(!self._v){return;}e=e||window.event;var target=e.target||e.srcElement;if(!target){return;}if(!hasClass(target,'is-disabled')){if(hasClass(target,'pika-button')&&!hasClass(target,'is-empty')){self.setDate(new Date(self._y,self._m,parseInt(target.innerHTML,10)));if(opts.bound){sto(function(){self.hide();},100);}return;}else if(hasClass(target,'pika-prev')){self.prevMonth();}else if(hasClass(target,'pika-next')){self.nextMonth();}}if(!hasClass(target,'pika-select')){if(e.preventDefault){e.preventDefault();}else{return e.returnValue=false;}}else{self._c=true;}};self._onChange=function(e){e=e||window.event;var target=e.target||e.srcElement;if(!target){return;}if(hasClass(target,'pika-select-month')){self.gotoMonth(target.value);}else if(hasClass(target,'pika-select-year')){self.gotoYear(target.value);}};self._onInputChange=function(e){var date;if(e.firedBy===self){return;}if(hasMoment){date=window.moment(opts.field.value,opts.format);date=date?date.toDate():null;}else{date=new Date(Date.parse(opts.field.value));}self.setDate(isDate(date)?date:null);if(!self._v){self.show();}};self._onInputFocus=function(e){self.show();};self._onInputClick=function(e){self.show();};self._onInputBlur=function(e){if(!self._c){self._b=sto(function(){self.hide();},50);}self._c=false;};self._onClick=function(e){e=e||window.event;var target=e.target||e.srcElement,pEl=target;if(!target){return;}if(!hasEventListeners&&hasClass(target,'pika-select')){if(!target.onchange){target.setAttribute('onchange','return;');addEvent(target,'change',self._onChange);}}do{if(hasClass(pEl,'pika-single')){return;}}while((pEl=pEl.parentNode));if(self._v&&target!==opts.field){self.hide();}};self.el=document.createElement('div');self.el.className='pika-single'+(opts.isRTL?' is-rtl':'');addEvent(self.el,'mousedown',self._onMouseDown,true);addEvent(self.el,'change',self._onChange);if(opts.field){if(opts.bound){document.body.appendChild(self.el);}else{opts.field.parentNode.insertBefore(self.el,opts.field.nextSibling);}addEvent(opts.field,'change',self._onInputChange);if(!opts.defaultDate){if(hasMoment&&opts.field.value){opts.defaultDate=window.moment(opts.field.value,opts.format).toDate();}else{opts.defaultDate=new Date(Date.parse(opts.field.value));}opts.setDefaultDate=true;}}var defDate=opts.defaultDate;if(isDate(defDate)){if(opts.setDefaultDate){self.setDate(defDate,true);}else{self.gotoDate(defDate);}}else{self.gotoDate(new Date());}if(opts.bound){this.hide();self.el.className+=' is-bound';addEvent(opts.field,'click',self._onInputClick);addEvent(opts.field,'focus',self._onInputFocus);addEvent(opts.field,'blur',self._onInputBlur);}else{this.show();}};window.Pikaday.prototype={config:function(options){if(!this._o){this._o=extend({},defaults,true);}var opts=extend(this._o,options,true);opts.isRTL=!!opts.isRTL;opts.field=(opts.field&&opts.field.nodeName)?opts.field:null;opts.bound=!!(opts.bound!==undefined?opts.field&&opts.bound:opts.field);var nom=parseInt(opts.numberOfMonths,10)||1;opts.numberOfMonths=nom>4?4:nom;if(!isDate(opts.minDate)){opts.minDate=false;}if(!isDate(opts.maxDate)){opts.maxDate=false;}if((opts.minDate&&opts.maxDate)&&opts.maxDate<opts.minDate){opts.maxDate=opts.minDate=false;}if(opts.minDate){opts.minYear=opts.minDate.getFullYear();opts.minMonth=opts.minDate.getMonth();}if(opts.maxDate){opts.maxYear=opts.maxDate.getFullYear();opts.maxMonth=opts.maxDate.getMonth();}if(isArray(opts.yearRange)){var fallback=new Date().getFullYear()-10;opts.yearRange[0]=parseInt(opts.yearRange[0],10)||fallback;opts.yearRange[1]=parseInt(opts.yearRange[1],10)||fallback;}else{opts.yearRange=Math.abs(parseInt(opts.yearRange,10))||defaults.yearRange;if(opts.yearRange>100){opts.yearRange=100;}}return opts;},toString:function(format){return!isDate(this._d)?'':hasMoment?window.moment(this._d).format(format||this._o.format):this._d.toDateString();},getMoment:function(){return hasMoment?window.moment(this._d):null;},setMoment:function(date){if(hasMoment&&window.moment.isMoment(date)){this.setDate(date.toDate());}},getDate:function(){return isDate(this._d)?new Date(this._d.getTime()):null;},setDate:function(date,preventOnSelect){if(!date){this._d=null;return this.draw();}if(typeof date==='string'){date=new Date(Date.parse(date));}if(!isDate(date)){return;}var min=this._o.minDate,max=this._o.maxDate;if(isDate(min)&&date<min){date=min;}else if(isDate(max)&&date>max){date=max;}this._d=new Date(date.getTime());this._d.setHours(0,0,0,0);this.gotoDate(this._d);if(this._o.field){this._o.field.value=this.toString();fireEvent(this._o.field,"change",{firedBy:this});}if(!preventOnSelect&&typeof this._o.onSelect==='function'){this._o.onSelect.call(this,this.getDate());}},gotoDate:function(date){if(!isDate(date)){return;}this._y=date.getFullYear();this._m=date.getMonth();this.draw();},gotoToday:function(){this.gotoDate(new Date());},gotoMonth:function(month){if(!isNaN((month=parseInt(month,10)))){this._m=month<0?0:month>11?11:month;this.draw();}},nextMonth:function(){if(++this._m>11){this._m=0;this._y++;}this.draw();},prevMonth:function(){if(--this._m<0){this._m=11;this._y--;}this.draw();},gotoYear:function(year){if(!isNaN(year)){this._y=parseInt(year,10);this.draw();}},draw:function(force){if(!this._v&&!force){return;}var opts=this._o,minYear=opts.minYear,maxYear=opts.maxYear,minMonth=opts.minMonth,maxMonth=opts.maxMonth;if(this._y<=minYear){this._y=minYear;if(!isNaN(minMonth)&&this._m<minMonth){this._m=minMonth;}}if(this._y>=maxYear){this._y=maxYear;if(!isNaN(maxMonth)&&this._m>maxMonth){this._m=maxMonth;}}this.el.innerHTML=renderTitle(this)+this.render(this._y,this._m);if(opts.bound){var pEl=opts.field,left=pEl.offsetLeft,top=pEl.offsetTop+pEl.offsetHeight;while((pEl=pEl.offsetParent)){left+=pEl.offsetLeft;top+=pEl.offsetTop;}this.el.style.cssText='position:absolute;left:'+left+'px;top:'+top+'px;';sto(function(){opts.field.focus();},1);}if(typeof this._o.onDraw==='function'){var self=this;sto(function(){self._o.onDraw.call(self);},0);}},render:function(year,month){var opts=this._o,now=new Date(),days=getDaysInMonth(year,month),before=new Date(year,month,1).getDay(),data=[],row=[];now.setHours(0,0,0,0);if(opts.firstDay>0){before-=opts.firstDay;if(before<0){before+=7;}}var cells=days+before,after=cells;while(after>7){after-=7;}cells+=7-after;for(var i=0,r=0;i<cells;i++){var day=new Date(year,month,1+(i-before)),isDisabled=(opts.minDate&&day<opts.minDate)||(opts.maxDate&&day>opts.maxDate),isSelected=isDate(this._d)?compareDates(day,this._d):false,isToday=compareDates(day,now),isEmpty=i<before||i>=(days+before);row.push(renderDay(1+(i-before),isSelected,isToday,isDisabled,isEmpty));if(++r===7){data.push(renderRow(row,opts.isRTL));row=[];r=0;}}return renderTable(opts,data);},isVisible:function(){return this._v;},show:function(){if(!this._v){if(this._o.bound){addEvent(document,'click',this._onClick);}removeClass(this.el,'is-hidden');this._v=true;this.draw();if(typeof this._o.onOpen==='function'){this._o.onOpen.call(this);}}},hide:function(){var v=this._v;if(v!==false){if(this._o.bound){removeEvent(document,'click',this._onClick);}this.el.style.cssText='';addClass(this.el,'is-hidden');this._v=false;if(v!==undefined&&typeof this._o.onClose==='function'){this._o.onClose.call(this);}}},destroy:function(){this.hide();removeEvent(this.el,'mousedown',this._onMouseDown,true);removeEvent(this.el,'change',this._onChange);if(this._o.field){removeEvent(this._o.field,'change',this._onInputChange);if(this._o.bound){removeEvent(this._o.field,'click',this._onInputClick);removeEvent(this._o.field,'focus',this._onInputFocus);removeEvent(this._o.field,'blur',this._onInputBlur);}}if(this.el.parentNode){this.el.parentNode.removeChild(this.el);}}};})(window,window.document);

/*
---
MooTools: the javascript framework

web build:
 - http://mootools.net/core/58f64dfefa42b08cb566c95a6244e613

packager build:
 - packager build Core/Class

copyrights:
  - [MooTools](http://mootools.net)

licenses:
  - [MIT License](http://mootools.net/license.txt)
...
*/

(function(){var o=this.typeOf=function(i){if(i==null){return"null";}if(i.$family!=null){return i.$family();
}if(i.nodeName){if(i.nodeType==1){return"element";}if(i.nodeType==3){return(/\S/).test(i.nodeValue)?"textnode":"whitespace";}}else{if(typeof i.length=="number"){if(i.callee){return"arguments";
}if("item" in i){return"collection";}}}return typeof i;};var j=this.instanceOf=function(t,i){if(t==null){return false;}var s=t.$constructor||t.constructor;
while(s){if(s===i){return true;}s=s.parent;}if(!t.hasOwnProperty){return false;}return t instanceof i;};var f=this.Function;var p=true;for(var k in {toString:1}){p=null;
}if(p){p=["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];}f.prototype.overloadSetter=function(s){var i=this;
return function(u,t){if(u==null){return this;}if(s||typeof u!="string"){for(var v in u){i.call(this,v,u[v]);}if(p){for(var w=p.length;w--;){v=p[w];if(u.hasOwnProperty(v)){i.call(this,v,u[v]);
}}}}else{i.call(this,u,t);}return this;};};f.prototype.overloadGetter=function(s){var i=this;return function(u){var v,t;if(typeof u!="string"){v=u;}else{if(arguments.length>1){v=arguments;
}else{if(s){v=[u];}}}if(v){t={};for(var w=0;w<v.length;w++){t[v[w]]=i.call(this,v[w]);}}else{t=i.call(this,u);}return t;};};f.prototype.extend=function(i,s){this[i]=s;
}.overloadSetter();f.prototype.implement=function(i,s){this.prototype[i]=s;}.overloadSetter();var n=Array.prototype.slice;f.from=function(i){return(o(i)=="function")?i:function(){return i;
};};Array.from=function(i){if(i==null){return[];}return(a.isEnumerable(i)&&typeof i!="string")?(o(i)=="array")?i:n.call(i):[i];};Number.from=function(s){var i=parseFloat(s);
return isFinite(i)?i:null;};String.from=function(i){return i+"";};f.implement({hide:function(){this.$hidden=true;return this;},protect:function(){this.$protected=true;
return this;}});var a=this.Type=function(u,t){if(u){var s=u.toLowerCase();var i=function(v){return(o(v)==s);};a["is"+u]=i;if(t!=null){t.prototype.$family=(function(){return s;
}).hide();}}if(t==null){return null;}t.extend(this);t.$constructor=a;t.prototype.$constructor=t;return t;};var e=Object.prototype.toString;a.isEnumerable=function(i){return(i!=null&&typeof i.length=="number"&&e.call(i)!="[object Function]");
};var q={};var r=function(i){var s=o(i.prototype);return q[s]||(q[s]=[]);};var b=function(t,x){if(x&&x.$hidden){return;}var s=r(this);for(var u=0;u<s.length;
u++){var w=s[u];if(o(w)=="type"){b.call(w,t,x);}else{w.call(this,t,x);}}var v=this.prototype[t];if(v==null||!v.$protected){this.prototype[t]=x;}if(this[t]==null&&o(x)=="function"){m.call(this,t,function(i){return x.apply(i,n.call(arguments,1));
});}};var m=function(i,t){if(t&&t.$hidden){return;}var s=this[i];if(s==null||!s.$protected){this[i]=t;}};a.implement({implement:b.overloadSetter(),extend:m.overloadSetter(),alias:function(i,s){b.call(this,i,this.prototype[s]);
}.overloadSetter(),mirror:function(i){r(this).push(i);return this;}});new a("Type",a);var d=function(s,x,v){var u=(x!=Object),B=x.prototype;if(u){x=new a(s,x);
}for(var y=0,w=v.length;y<w;y++){var C=v[y],A=x[C],z=B[C];if(A){A.protect();}if(u&&z){x.implement(C,z.protect());}}if(u){var t=B.propertyIsEnumerable(v[0]);
x.forEachMethod=function(G){if(!t){for(var F=0,D=v.length;F<D;F++){G.call(B,B[v[F]],v[F]);}}for(var E in B){G.call(B,B[E],E);}};}return d;};d("String",String,["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","quote","replace","search","slice","split","substr","substring","trim","toLowerCase","toUpperCase"])("Array",Array,["pop","push","reverse","shift","sort","splice","unshift","concat","join","slice","indexOf","lastIndexOf","filter","forEach","every","map","some","reduce","reduceRight"])("Number",Number,["toExponential","toFixed","toLocaleString","toPrecision"])("Function",f,["apply","call","bind"])("RegExp",RegExp,["exec","test"])("Object",Object,["create","defineProperty","defineProperties","keys","getPrototypeOf","getOwnPropertyDescriptor","getOwnPropertyNames","preventExtensions","isExtensible","seal","isSealed","freeze","isFrozen"])("Date",Date,["now"]);
Object.extend=m.overloadSetter();Date.extend("now",function(){return +(new Date);});new a("Boolean",Boolean);Number.prototype.$family=function(){return isFinite(this)?"number":"null";
}.hide();Number.extend("random",function(s,i){return Math.floor(Math.random()*(i-s+1)+s);});var g=Object.prototype.hasOwnProperty;Object.extend("forEach",function(i,t,u){for(var s in i){if(g.call(i,s)){t.call(u,i[s],s,i);
}}});Object.each=Object.forEach;Array.implement({forEach:function(u,v){for(var t=0,s=this.length;t<s;t++){if(t in this){u.call(v,this[t],t,this);}}},each:function(i,s){Array.forEach(this,i,s);
return this;}});var l=function(i){switch(o(i)){case"array":return i.clone();case"object":return Object.clone(i);default:return i;}};Array.implement("clone",function(){var s=this.length,t=new Array(s);
while(s--){t[s]=l(this[s]);}return t;});var h=function(s,i,t){switch(o(t)){case"object":if(o(s[i])=="object"){Object.merge(s[i],t);}else{s[i]=Object.clone(t);
}break;case"array":s[i]=t.clone();break;default:s[i]=t;}return s;};Object.extend({merge:function(z,u,t){if(o(u)=="string"){return h(z,u,t);}for(var y=1,s=arguments.length;
y<s;y++){var w=arguments[y];for(var x in w){h(z,x,w[x]);}}return z;},clone:function(i){var t={};for(var s in i){t[s]=l(i[s]);}return t;},append:function(w){for(var v=1,t=arguments.length;
v<t;v++){var s=arguments[v]||{};for(var u in s){w[u]=s[u];}}return w;}});["Object","WhiteSpace","TextNode","Collection","Arguments"].each(function(i){new a(i);
});var c=Date.now();String.extend("uniqueID",function(){return(c++).toString(36);});})();Array.implement({every:function(c,d){for(var b=0,a=this.length>>>0;
b<a;b++){if((b in this)&&!c.call(d,this[b],b,this)){return false;}}return true;},filter:function(d,f){var c=[];for(var e,b=0,a=this.length>>>0;b<a;b++){if(b in this){e=this[b];
if(d.call(f,e,b,this)){c.push(e);}}}return c;},indexOf:function(c,d){var b=this.length>>>0;for(var a=(d<0)?Math.max(0,b+d):d||0;a<b;a++){if(this[a]===c){return a;
}}return -1;},map:function(c,e){var d=this.length>>>0,b=Array(d);for(var a=0;a<d;a++){if(a in this){b[a]=c.call(e,this[a],a,this);}}return b;},some:function(c,d){for(var b=0,a=this.length>>>0;
b<a;b++){if((b in this)&&c.call(d,this[b],b,this)){return true;}}return false;},clean:function(){return this.filter(function(a){return a!=null;});},invoke:function(a){var b=Array.slice(arguments,1);
return this.map(function(c){return c[a].apply(c,b);});},associate:function(c){var d={},b=Math.min(this.length,c.length);for(var a=0;a<b;a++){d[c[a]]=this[a];
}return d;},link:function(c){var a={};for(var e=0,b=this.length;e<b;e++){for(var d in c){if(c[d](this[e])){a[d]=this[e];delete c[d];break;}}}return a;},contains:function(a,b){return this.indexOf(a,b)!=-1;
},append:function(a){this.push.apply(this,a);return this;},getLast:function(){return(this.length)?this[this.length-1]:null;},getRandom:function(){return(this.length)?this[Number.random(0,this.length-1)]:null;
},include:function(a){if(!this.contains(a)){this.push(a);}return this;},combine:function(c){for(var b=0,a=c.length;b<a;b++){this.include(c[b]);}return this;
},erase:function(b){for(var a=this.length;a--;){if(this[a]===b){this.splice(a,1);}}return this;},empty:function(){this.length=0;return this;},flatten:function(){var d=[];
for(var b=0,a=this.length;b<a;b++){var c=typeOf(this[b]);if(c=="null"){continue;}d=d.concat((c=="array"||c=="collection"||c=="arguments"||instanceOf(this[b],Array))?Array.flatten(this[b]):this[b]);
}return d;},pick:function(){for(var b=0,a=this.length;b<a;b++){if(this[b]!=null){return this[b];}}return null;},hexToRgb:function(b){if(this.length!=3){return null;
}var a=this.map(function(c){if(c.length==1){c+=c;}return c.toInt(16);});return(b)?a:"rgb("+a+")";},rgbToHex:function(d){if(this.length<3){return null;}if(this.length==4&&this[3]==0&&!d){return"transparent";
}var b=[];for(var a=0;a<3;a++){var c=(this[a]-0).toString(16);b.push((c.length==1)?"0"+c:c);}return(d)?b:"#"+b.join("");}});String.implement({test:function(a,b){return((typeOf(a)=="regexp")?a:new RegExp(""+a,b)).test(this);
},contains:function(a,b){return(b)?(b+this+b).indexOf(b+a+b)>-1:String(this).indexOf(a)>-1;},trim:function(){return String(this).replace(/^\s+|\s+$/g,"");
},clean:function(){return String(this).replace(/\s+/g," ").trim();},camelCase:function(){return String(this).replace(/-\D/g,function(a){return a.charAt(1).toUpperCase();
});},hyphenate:function(){return String(this).replace(/[A-Z]/g,function(a){return("-"+a.charAt(0).toLowerCase());});},capitalize:function(){return String(this).replace(/\b[a-z]/g,function(a){return a.toUpperCase();
});},escapeRegExp:function(){return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1");},toInt:function(a){return parseInt(this,a||10);},toFloat:function(){return parseFloat(this);
},hexToRgb:function(b){var a=String(this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return(a)?a.slice(1).hexToRgb(b):null;},rgbToHex:function(b){var a=String(this).match(/\d{1,3}/g);
return(a)?a.rgbToHex(b):null;},substitute:function(a,b){return String(this).replace(b||(/\\?\{([^{}]+)\}/g),function(d,c){if(d.charAt(0)=="\\"){return d.slice(1);
}return(a[c]!=null)?a[c]:"";});}});Function.extend({attempt:function(){for(var b=0,a=arguments.length;b<a;b++){try{return arguments[b]();}catch(c){}}return null;
}});Function.implement({attempt:function(a,c){try{return this.apply(c,Array.from(a));}catch(b){}return null;},bind:function(e){var a=this,b=arguments.length>1?Array.slice(arguments,1):null,d=function(){};
var c=function(){var g=e,h=arguments.length;if(this instanceof c){d.prototype=a.prototype;g=new d;}var f=(!b&&!h)?a.call(g):a.apply(g,b&&h?b.concat(Array.slice(arguments)):b||arguments);
return g==e?f:g;};return c;},pass:function(b,c){var a=this;if(b!=null){b=Array.from(b);}return function(){return a.apply(c,b||arguments);};},delay:function(b,c,a){return setTimeout(this.pass((a==null?[]:a),c),b);
},periodical:function(c,b,a){return setInterval(this.pass((a==null?[]:a),b),c);}});Number.implement({limit:function(b,a){return Math.min(a,Math.max(b,this));
},round:function(a){a=Math.pow(10,a||0).toFixed(a<0?-a:0);return Math.round(this*a)/a;},times:function(b,c){for(var a=0;a<this;a++){b.call(c,a,this);}},toFloat:function(){return parseFloat(this);
},toInt:function(a){return parseInt(this,a||10);}});Number.alias("each","times");(function(b){var a={};b.each(function(c){if(!Number[c]){a[c]=function(){return Math[c].apply(null,[this].concat(Array.from(arguments)));
};}});Number.implement(a);})(["abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max","min","pow","sin","sqrt","tan"]);(function(){var a=this.Class=new Type("Class",function(h){if(instanceOf(h,Function)){h={initialize:h};
}var g=function(){e(this);if(g.$prototyping){return this;}this.$caller=null;var i=(this.initialize)?this.initialize.apply(this,arguments):this;this.$caller=this.caller=null;
return i;}.extend(this).implement(h);g.$constructor=a;g.prototype.$constructor=g;g.prototype.parent=c;return g;});var c=function(){if(!this.$caller){throw new Error('The method "parent" cannot be called.');
}var g=this.$caller.$name,h=this.$caller.$owner.parent,i=(h)?h.prototype[g]:null;if(!i){throw new Error('The method "'+g+'" has no parent.');}return i.apply(this,arguments);
};var e=function(g){for(var h in g){var j=g[h];switch(typeOf(j)){case"object":var i=function(){};i.prototype=j;g[h]=e(new i);break;case"array":g[h]=j.clone();
break;}}return g;};var b=function(g,h,j){if(j.$origin){j=j.$origin;}var i=function(){if(j.$protected&&this.$caller==null){throw new Error('The method "'+h+'" cannot be called.');
}var l=this.caller,m=this.$caller;this.caller=m;this.$caller=i;var k=j.apply(this,arguments);this.$caller=m;this.caller=l;return k;}.extend({$owner:g,$origin:j,$name:h});
return i;};var f=function(h,i,g){if(a.Mutators.hasOwnProperty(h)){i=a.Mutators[h].call(this,i);if(i==null){return this;}}if(typeOf(i)=="function"){if(i.$hidden){return this;
}this.prototype[h]=(g)?i:b(this,h,i);}else{Object.merge(this.prototype,h,i);}return this;};var d=function(g){g.$prototyping=true;var h=new g;delete g.$prototyping;
return h;};a.implement("implement",f.overloadSetter());a.Mutators={Extends:function(g){this.parent=g;this.prototype=d(g);},Implements:function(g){Array.from(g).each(function(j){var h=new j;
for(var i in h){f.call(this,i,h[i],true);}},this);}};})();

// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com
(function(e){function O(e,t){return function(n){return j(e.call(this,n),t)}}function M(e){return function(t){return this.lang().ordinal(e.call(this,t))}}function _(){}function D(e){H(this,e)}function P(e){var t=this._data={},n=e.years||e.year||e.y||0,r=e.months||e.month||e.M||0,i=e.weeks||e.week||e.w||0,s=e.days||e.day||e.d||0,o=e.hours||e.hour||e.h||0,u=e.minutes||e.minute||e.m||0,a=e.seconds||e.second||e.s||0,f=e.milliseconds||e.millisecond||e.ms||0;this._milliseconds=f+a*1e3+u*6e4+o*36e5,this._days=s+i*7,this._months=r+n*12,t.milliseconds=f%1e3,a+=B(f/1e3),t.seconds=a%60,u+=B(a/60),t.minutes=u%60,o+=B(u/60),t.hours=o%24,s+=B(o/24),s+=i*7,t.days=s%30,r+=B(s/30),t.months=r%12,n+=B(r/12),t.years=n}function H(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function B(e){return e<0?Math.ceil(e):Math.floor(e)}function j(e,t){var n=e+"";while(n.length<t)n="0"+n;return n}function F(e,t,n){var r=t._milliseconds,i=t._days,s=t._months,o;r&&e._d.setTime(+e+r*n),i&&e.date(e.date()+i*n),s&&(o=e.date(),e.date(1).month(e.month()+s*n).date(Math.min(o,e.daysInMonth())))}function I(e){return Object.prototype.toString.call(e)==="[object Array]"}function q(e,t){var n=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),i=0,s;for(s=0;s<n;s++)~~e[s]!==~~t[s]&&i++;return i+r}function R(e,t){return t.abbr=e,s[e]||(s[e]=new _),s[e].set(t),s[e]}function U(e){return e?(!s[e]&&o&&require("./lang/"+e),s[e]):t.fn._lang}function z(e){return e.match(/\[.*\]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function W(e){var t=e.match(a),n,r;for(n=0,r=t.length;n<r;n++)A[t[n]]?t[n]=A[t[n]]:t[n]=z(t[n]);return function(i){var s="";for(n=0;n<r;n++)s+=typeof t[n].call=="function"?t[n].call(i,e):t[n];return s}}function X(e,t){function r(t){return e.lang().longDateFormat(t)||t}var n=5;while(n--&&f.test(t))t=t.replace(f,r);return C[t]||(C[t]=W(t)),C[t](e)}function V(e){switch(e){case"DDDD":return p;case"YYYY":return d;case"YYYYY":return v;case"S":case"SS":case"SSS":case"DDD":return h;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return m;case"X":return b;case"Z":case"ZZ":return g;case"T":return y;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return c;default:return new RegExp(e.replace("\\",""))}}function $(e,t,n){var r,i,s=n._a;switch(e){case"M":case"MM":s[1]=t==null?0:~~t-1;break;case"MMM":case"MMMM":r=U(n._l).monthsParse(t),r!=null?s[1]=r:n._isValid=!1;break;case"D":case"DD":case"DDD":case"DDDD":t!=null&&(s[2]=~~t);break;case"YY":s[0]=~~t+(~~t>68?1900:2e3);break;case"YYYY":case"YYYYY":s[0]=~~t;break;case"a":case"A":n._isPm=(t+"").toLowerCase()==="pm";break;case"H":case"HH":case"h":case"hh":s[3]=~~t;break;case"m":case"mm":s[4]=~~t;break;case"s":case"ss":s[5]=~~t;break;case"S":case"SS":case"SSS":s[6]=~~(("0."+t)*1e3);break;case"X":n._d=new Date(parseFloat(t)*1e3);break;case"Z":case"ZZ":n._useUTC=!0,r=(t+"").match(x),r&&r[1]&&(n._tzh=~~r[1]),r&&r[2]&&(n._tzm=~~r[2]),r&&r[0]==="+"&&(n._tzh=-n._tzh,n._tzm=-n._tzm)}t==null&&(n._isValid=!1)}function J(e){var t,n,r=[];if(e._d)return;for(t=0;t<7;t++)e._a[t]=r[t]=e._a[t]==null?t===2?1:0:e._a[t];r[3]+=e._tzh||0,r[4]+=e._tzm||0,n=new Date(0),e._useUTC?(n.setUTCFullYear(r[0],r[1],r[2]),n.setUTCHours(r[3],r[4],r[5],r[6])):(n.setFullYear(r[0],r[1],r[2]),n.setHours(r[3],r[4],r[5],r[6])),e._d=n}function K(e){var t=e._f.match(a),n=e._i,r,i;e._a=[];for(r=0;r<t.length;r++)i=(V(t[r]).exec(n)||[])[0],i&&(n=n.slice(n.indexOf(i)+i.length)),A[t[r]]&&$(t[r],i,e);e._isPm&&e._a[3]<12&&(e._a[3]+=12),e._isPm===!1&&e._a[3]===12&&(e._a[3]=0),J(e)}function Q(e){var t,n,r,i=99,s,o,u;while(e._f.length){t=H({},e),t._f=e._f.pop(),K(t),n=new D(t);if(n.isValid()){r=n;break}u=q(t._a,n.toArray()),u<i&&(i=u,r=n)}H(e,r)}function G(e){var t,n=e._i;if(w.exec(n)){e._f="YYYY-MM-DDT";for(t=0;t<4;t++)if(S[t][1].exec(n)){e._f+=S[t][0];break}g.exec(n)&&(e._f+=" Z"),K(e)}else e._d=new Date(n)}function Y(t){var n=t._i,r=u.exec(n);n===e?t._d=new Date:r?t._d=new Date(+r[1]):typeof n=="string"?G(t):I(n)?(t._a=n.slice(0),J(t)):t._d=n instanceof Date?new Date(+n):new Date(n)}function Z(e,t,n,r,i){return i.relativeTime(t||1,!!n,e,r)}function et(e,t,n){var i=r(Math.abs(e)/1e3),s=r(i/60),o=r(s/60),u=r(o/24),a=r(u/365),f=i<45&&["s",i]||s===1&&["m"]||s<45&&["mm",s]||o===1&&["h"]||o<22&&["hh",o]||u===1&&["d"]||u<=25&&["dd",u]||u<=45&&["M"]||u<345&&["MM",r(u/30)]||a===1&&["y"]||["yy",a];return f[2]=t,f[3]=e>0,f[4]=n,Z.apply({},f)}function tt(e,n,r){var i=r-n,s=r-e.day();return s>i&&(s-=7),s<i-7&&(s+=7),Math.ceil(t(e).add("d",s).dayOfYear()/7)}function nt(e){var n=e._i,r=e._f;return n===null||n===""?null:(typeof n=="string"&&(e._i=n=U().preparse(n)),t.isMoment(n)?(e=H({},n),e._d=new Date(+n._d)):r?I(r)?Q(e):K(e):Y(e),new D(e))}function rt(e,n){t.fn[e]=t.fn[e+"s"]=function(e){var t=this._isUTC?"UTC":"";return e!=null?(this._d["set"+t+n](e),this):this._d["get"+t+n]()}}function it(e){t.duration.fn[e]=function(){return this._data[e]}}function st(e,n){t.duration.fn["as"+e]=function(){return+this/n}}var t,n="2.0.0",r=Math.round,i,s={},o=typeof module!="undefined"&&module.exports,u=/^\/?Date\((\-?\d+)/i,a=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,f=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,l=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,c=/\d\d?/,h=/\d{1,3}/,p=/\d{3}/,d=/\d{1,4}/,v=/[+\-]?\d{1,6}/,m=/[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,g=/Z|[\+\-]\d\d:?\d\d/i,y=/T/i,b=/[\+\-]?\d+(\.\d{1,3})?/,w=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,E="YYYY-MM-DDTHH:mm:ssZ",S=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],x=/([\+\-]|\d\d)/gi,T="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),N={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},C={},k="DDD w W M D d".split(" "),L="M D H h m s w W".split(" "),A={M:function(){return this.month()+1},MMM:function(e){return this.lang().monthsShort(this,e)},MMMM:function(e){return this.lang().months(this,e)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(e){return this.lang().weekdaysMin(this,e)},ddd:function(e){return this.lang().weekdaysShort(this,e)},dddd:function(e){return this.lang().weekdays(this,e)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return j(this.year()%100,2)},YYYY:function(){return j(this.year(),4)},YYYYY:function(){return j(this.year(),5)},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return j(~~(this.milliseconds()/10),2)},SSS:function(){return j(this.milliseconds(),3)},Z:function(){var e=-this.zone(),t="+";return e<0&&(e=-e,t="-"),t+j(~~(e/60),2)+":"+j(~~e%60,2)},ZZ:function(){var e=-this.zone(),t="+";return e<0&&(e=-e,t="-"),t+j(~~(10*e/6),4)},X:function(){return this.unix()}};while(k.length)i=k.pop(),A[i+"o"]=M(A[i]);while(L.length)i=L.pop(),A[i+i]=O(A[i],2);A.DDDD=O(A.DDD,3),_.prototype={set:function(e){var t,n;for(n in e)t=e[n],typeof t=="function"?this[n]=t:this["_"+n]=t},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(e){return this._months[e.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(e){return this._monthsShort[e.month()]},monthsParse:function(e){var n,r,i,s;this._monthsParse||(this._monthsParse=[]);for(n=0;n<12;n++){this._monthsParse[n]||(r=t([2e3,n]),i="^"+this.months(r,"")+"|^"+this.monthsShort(r,""),this._monthsParse[n]=new RegExp(i.replace(".",""),"i"));if(this._monthsParse[n].test(e))return n}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(e){return this._weekdays[e.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(e){return this._weekdaysShort[e.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(e){return this._weekdaysMin[e.day()]},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(e){var t=this._longDateFormat[e];return!t&&this._longDateFormat[e.toUpperCase()]&&(t=this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e]=t),t},meridiem:function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},calendar:function(e,t){var n=this._calendar[e];return typeof n=="function"?n.apply(t):n},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(e,t,n,r){var i=this._relativeTime[n];return typeof i=="function"?i(e,t,n,r):i.replace(/%d/i,e)},pastFuture:function(e,t){var n=this._relativeTime[e>0?"future":"past"];return typeof n=="function"?n(t):n.replace(/%s/i,t)},ordinal:function(e){return this._ordinal.replace("%d",e)},_ordinal:"%d",preparse:function(e){return e},postformat:function(e){return e},week:function(e){return tt(e,this._week.dow,this._week.doy)},_week:{dow:0,doy:6}},t=function(e,t,n){return nt({_i:e,_f:t,_l:n,_isUTC:!1})},t.utc=function(e,t,n){return nt({_useUTC:!0,_isUTC:!0,_l:n,_i:e,_f:t})},t.unix=function(e){return t(e*1e3)},t.duration=function(e,n){var r=t.isDuration(e),i=typeof e=="number",s=r?e._data:i?{}:e,o;return i&&(n?s[n]=e:s.milliseconds=e),o=new P(s),r&&e.hasOwnProperty("_lang")&&(o._lang=e._lang),o},t.version=n,t.defaultFormat=E,t.lang=function(e,n){var r;if(!e)return t.fn._lang._abbr;n?R(e,n):s[e]||U(e),t.duration.fn._lang=t.fn._lang=U(e)},t.langData=function(e){return e&&e._lang&&e._lang._abbr&&(e=e._lang._abbr),U(e)},t.isMoment=function(e){return e instanceof D},t.isDuration=function(e){return e instanceof P},t.fn=D.prototype={clone:function(){return t(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._d},toJSON:function(){return t.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var e=this;return[e.year(),e.month(),e.date(),e.hours(),e.minutes(),e.seconds(),e.milliseconds()]},isValid:function(){return this._isValid==null&&(this._a?this._isValid=!q(this._a,(this._isUTC?t.utc(this._a):t(this._a)).toArray()):this._isValid=!isNaN(this._d.getTime())),!!this._isValid},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(e){var n=X(this,e||t.defaultFormat);return this.lang().postformat(n)},add:function(e,n){var r;return typeof e=="string"?r=t.duration(+n,e):r=t.duration(e,n),F(this,r,1),this},subtract:function(e,n){var r;return typeof e=="string"?r=t.duration(+n,e):r=t.duration(e,n),F(this,r,-1),this},diff:function(e,n,r){var i=this._isUTC?t(e).utc():t(e).local(),s=(this.zone()-i.zone())*6e4,o,u;return n&&(n=n.replace(/s$/,"")),n==="year"||n==="month"?(o=(this.daysInMonth()+i.daysInMonth())*432e5,u=(this.year()-i.year())*12+(this.month()-i.month()),u+=(this-t(this).startOf("month")-(i-t(i).startOf("month")))/o,n==="year"&&(u/=12)):(o=this-i-s,u=n==="second"?o/1e3:n==="minute"?o/6e4:n==="hour"?o/36e5:n==="day"?o/864e5:n==="week"?o/6048e5:o),r?u:B(u)},from:function(e,n){return t.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!n)},fromNow:function(e){return this.from(t(),e)},calendar:function(){var e=this.diff(t().startOf("day"),"days",!0),n=e<-6?"sameElse":e<-1?"lastWeek":e<0?"lastDay":e<1?"sameDay":e<2?"nextDay":e<7?"nextWeek":"sameElse";return this.format(this.lang().calendar(n,this))},isLeapYear:function(){var e=this.year();return e%4===0&&e%100!==0||e%400===0},isDST:function(){return this.zone()<t([this.year()]).zone()||this.zone()<t([this.year(),5]).zone()},day:function(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return e==null?t:this.add({d:e-t})},startOf:function(e){e=e.replace(/s$/,"");switch(e){case"year":this.month(0);case"month":this.date(1);case"week":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return e==="week"&&this.day(0),this},endOf:function(e){return this.startOf(e).add(e.replace(/s?$/,"s"),1).subtract("ms",1)},isAfter:function(e,n){return n=typeof n!="undefined"?n:"millisecond",+this.clone().startOf(n)>+t(e).startOf(n)},isBefore:function(e,n){return n=typeof n!="undefined"?n:"millisecond",+this.clone().startOf(n)<+t(e).startOf(n)},isSame:function(e,n){return n=typeof n!="undefined"?n:"millisecond",+this.clone().startOf(n)===+t(e).startOf(n)},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return t.utc([this.year(),this.month()+1,0]).date()},dayOfYear:function(e){var n=r((t(this).startOf("day")-t(this).startOf("year"))/864e5)+1;return e==null?n:this.add("d",e-n)},isoWeek:function(e){var t=tt(this,1,4);return e==null?t:this.add("d",(e-t)*7)},week:function(e){var t=this.lang().week(this);return e==null?t:this.add("d",(e-t)*7)},lang:function(t){return t===e?this._lang:(this._lang=U(t),this)}};for(i=0;i<T.length;i++)rt(T[i].toLowerCase().replace(/s$/,""),T[i]);rt("year","FullYear"),t.fn.days=t.fn.day,t.fn.weeks=t.fn.week,t.fn.isoWeeks=t.fn.isoWeek,t.duration.fn=P.prototype={weeks:function(){return B(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*864e5+this._months*2592e6},humanize:function(e){var t=+this,n=et(t,!e,this.lang());return e&&(n=this.lang().pastFuture(t,n)),this.lang().postformat(n)},lang:t.fn.lang};for(i in N)N.hasOwnProperty(i)&&(st(i,N[i]),it(i.toLowerCase()));st("Weeks",6048e5),t.lang("en",{ordinal:function(e){var t=e%10,n=~~(e%100/10)===1?"th":t===1?"st":t===2?"nd":t===3?"rd":"th";return e+n}}),o&&(module.exports=t),typeof ender=="undefined"&&(this.moment=t),typeof define=="function"&&define.amd&&define("moment",[],function(){return t})}).call(this);

/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);

/**
 * jquery.mask - overlay dom elements with a mask element
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function( $ ) {

    $.fn.extend({
        mask: function( options ) {
            if ( this.length === 0 ) { return; }

            var defaults = {
                    opacity             : 0.8,
                    backgroundColour    : "#ccc",
                    zIndex              : 9999
                },
                opts = $.extend( {}, defaults, options );

            return this.each(function() {
                var height = $( this ).height(),
                    width = $( this ).width(),
                    offset = $( this ).offset(),
                    top = offset.top,
                    left = offset.left;

                $( this ).append( "<div class='element-mask'></div>" );
                $( this ).find( ".element-mask" ).css({
                    "position"          : "absolute",
                    "opacity"           : opts.opacity,
                    "height"            : height,
                    "width"             : width,
                    "top"               : top,
                    "left"              : left,
                    "background-color"  : opts.backgroundColour,
                    "z-index"           : opts.zIndex
                });
            });
        },

        unmask: function() {
            if ( this.length === 0 ) { return; }

            return this.each(function() {
                $( this ).find( ".element-mask, .jui-mask" ).remove();
            });
        }
    });

}( jQuery ));

/*
 * DragDrop.js
 *
 * A JavaScript micro-framework for adding drag-and-drop functionality
 * to elements for advanced UI development.
 *
 * @author     James Brumond
 * @version    0.3.0
 * @copyright  Copyright 2011 James Brumond
 * @license    Dual licensed under MIT and GPL
 *//*jshint browser: true, bitwise: false, camelcase: false, eqnull: true, latedef: false,
  plusplus: false, jquery: true, shadow: true, smarttabs: true, loopfunc: true */(function(){function s(a){var b=0,c=0;if(a.targetTouches)b=a.targetTouches[0].pageX,c=a.targetTouches[0].pageY;else if(a.pageX||a.pageY)b=a.pageX,c=a.pageY;else if(a.clientX||a.clientY)b=a.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,c=a.clientY+document.body.scrollTop+document.documentElement.scrollTop;return{x:b,y:c}}var a="ontouchstart"in window,b="drag",c=function(){var d={},k=a?{start:"touchstart",move:"touchmove",end:"touchend"}:{start:"mousedown",move:"mousemove",end:"mouseup"},o=[],s=function(a,b){for(var c=0,d=o.length;c<d;c++)if(o[c]&&o[c].element===a&&o[c].anchor===b)return!0;return!1},t=function(a,b,c){o[a._id]&&o[a._id].events[b]&&c(o[a._id].events[b])},u=function(a,b){b=b||{},b.element=a,b.anchor=b.anchor||a,b.boundingBox=b.boundingBox||null,b.releaseAnchors=b.releaseAnchors||[],b.releaseAnchors.unshift(document);return b},v=1,w=function(){this._id=v++};w.prototype.unbind=function(){return c.unbind(this)},w.prototype.bindEvent=function(a,b){return c.bindEvent(this,a,b)},w.prototype.unbindEvent=function(a,b){return c.unbindEvent(this,a,b)},w.prototype.invokeEvent=function(a,b){return c.invokeEvent(this,a,b)},w.prototype.setBoundingBox=function(a){o[this._id].boundingBox=a},d.bind=function(d,e){e=u(d,e);if(!n(e.element))throw new Error("Must give an element to drag");if(g(e.element,"position")==="static")throw new Error("Cannot drag-drop an element with position:static");if(!s(e.element,e.anchor)){var t=new w,v={element:e.element,anchor:e.anchor,releaseAnchors:e.releaseAnchors,dragging:!1,event:null,shouldUnbind:!1,boundingBox:e.boundingBox,events:{beforedrag:p(e.beforedrag),dragstart:p(e.dragstart),dragend:p(e.dragend),drag:p(e.drag),unbind:p(e.unbind)}};v.event=r.bind(v.anchor,k.start,function(d){function z(a){return function(d){for(var e=0,f=t.length;e<f;e++)r.unbind(t[e]);v.dragging=!1,l(v.element,b),v.shouldUnbind&&c.unbind(v.element,v.anchor),v.events.dragend.call(v.element,new q("dragend",d,v,{releaseAnchor:a}));return j(d)}}if(window.event&&d.button===1||d.button===0||a){j(d),v.events.beforedrag.call(v.element,new q("beforedrag",d,v)),v.dragging=!0,m(v.element,b);var e=f(v.element,"left"),n=f(v.element,"top"),o=v.element.offsetLeft,p=v.element.offsetTop,s=i(v.element),t=[],u=a?v.anchor:document;t.push(r.bind(u,k.move,function(a){var b=a.clientX-d.clientX,c=a.clientY-d.clientY,f=v.element.offsetWidth,i=v.element.offsetHeight,k=e+b,l=n+c;if(v.boundingBox){var m=v.boundingBox,r,t,u,w;if(m==="offsetParent"){var x=v.element.offsetParent;g(v.element,"position")==="relative"?(r=-o,u=-p):r=u=0,t=x.clientWidth+r,w=x.clientHeight+u}else if(m==="windowSize"){var y=h();g(v.element,"position")==="relative"?(r=-s.x,u=-s.y):r=u=0,t=y.x+r,w=y.y+u}else r=m.x.min,t=m.x.max,u=m.y.min,w=m.y.max;k=Math.max(r,Math.min(t-f,k)),l=Math.max(u,Math.min(w-i,l))}v.element.style.left=k+"px",v.element.style.top=l+"px",v.events.drag.call(v.element,new q("drag",a,v));return j(a)}));for(var w=0,x=v.releaseAnchors.length;w<x;w++){var y=v.releaseAnchors[w];t.push(r.bind(y,k.end,z(y)))}document.body.focus(),t.push(r.bind(document,"selectstart",!1)),t.push(r.bind(v.anchor,"dragstart",!1)),v.events.dragstart.call(v.element,new q("dragstart",d,v));return!1}}),o[t._id]=v;return t}},d.unbind=function(a){if(a instanceof w){var b=a._id;o[b]&&(o[b].dragging?o[b].shouldUnbind=!0:(r.unbind(o[b].event),o[b]=null),binding.events.unbind.call(binding.element,new q("unbind",e,binding)))}},d.bindEvent=function(a,b,c){t(a,b,function(a){a.push(c)})},d.unbindEvent=function(a,b,c){t(a,b,function(a){a.remove(c)})},d.invokeEvent=function(a,b,c){t(a,b,function(d){d.call(o[a._id].element,new q(b,c,a))})};return d}(),d=function(a,b,c){var d=a.slice((c||b)+1||a.length);a.length=b<0?a.length+b:b;return a.push.apply(a,d)},f=function(a,b){var c=parseFloat(g(a,b));return isNaN(c)?0:c},g=function(a,b){if(a.currentStyle)return a.currentStyle[b];if(window.getComputedStyle)return document.defaultView.getComputedStyle(a,null).getPropertyValue(b);if(a.style)return a.style[b]},h=function(){return{x:window.innerWidth||document.documentElement.clientWidth||body().clientWidth,y:window.innerHeight||document.documentElement.clientHeight||body().clientHeight}},i=function(a){var b=0,c=0;if(a.offsetParent)do b+=a.offsetLeft,c+=a.offsetTop;while(a=a.offsetParent);return{x:b,y:c}},j=function(a){a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.returnValue=!1;return!1},k={},l=function(a,b){k[b]||(k[b]=new RegExp("(^|\\s)+"+b+"(\\s|$)+")),a.className=a.className.replace(k[b]," ")},m=function(a,b){l(a,b),a.className+=" "+b},n=function(a){return!!a&&typeof a=="object"},o=function(a){var b;a.target?b=a.target:a.srcElement&&(b=a.srcElement),b.nodeType===3&&(b=b.parentNode);return b},p=function(a){var b=[],c=function(){var a;for(var c=0,d=b.length;c<d;c++)a=b[c].apply(this,arguments);return a};c.push=function(){b.push.apply(b,arguments)},c.remove=function(){var a=Array.prototype.slice.call(arguments),c=[];OUTER:for(var d=0,e=b.length;d<e;d++){for(var f=0,g=a.length;f<g;f++)if(b[d]===a[f])continue OUTER;c.push(b[d])}b=c},typeof a=="function"&&b.push(a);return c},q=function(b,c,d,e){this.type=b,this.originalEvent=c,this.altKey=c.altKey||!1,this.ctrlKey=c.ctrlKey||!1,this.shiftKey=c.shiftKey||!1,this.timestamp=c.timestamp||+(new Date),this.pos=s(c),this.binding=d,this.target=o(c);if(e)for(var f in e)e.hasOwnProperty(f)&&(this[f]=e[f])},r=function(){var a=function(){return document.addEventListener?function(a,b,c){a.addEventListener(b,c,!1)}:document.attachEvent?function(a,b,c){a.attachEvent("on"+b,c)}:function(){}}(),b=function(){return document.removeEventListener?function(a,b,c){a.removeEventListener(b,c,!1)}:document.detachEvent?function(a,b,c){a.detachEvent("on"+b,c)}:function(){}}();return{bind:function(c,d,e){var f=e===!1?function(a){return j(a)}:e;e=function(a){return f.call(c,a||window.event)},a(c,d,e);var g=function(){b(c,d,e)};g.unbind=function(){g()};return g},unbind:function(a){a()}}}();window.DragDrop=c})()

var sw = new Class({
    initialize: function(){
        this.version = '0.0.1';
		for(i in this.Class){
			this[i] = new this.Class[i]();
		}
    },
	types: {}
});

(function (_) {
	_.implement({
		//===== create ===== //
		create: function(type,options){
			/*$.each(sw.widget.util.list, function(index, value){
				if($('#'+value.options.id).length==0){
					delete sw.widget.util.list[index];
				}
			})*/
			this.types = {
				'box' : this.widget.basic.box,
				'text' : this.widget.ui.text,
				'separator' : this.widget.ui.separator,
				'button' : this.widget.ui.button,
				'textfield' : this.widget.ui.textfield,
				'datefield' : this.widget.ui.datefield,
				'passwordfield' : this.widget.ui.passwordfield,
				'dropdown' : this.widget.ui.dropdown,
				'window' : this.widget.ui.window,
				'spacer' : this.widget.ui.spacer,
				'toolbar' : this.widget.ui.toolbar,
				'pagingtoolbar' : this.widget.ui.pagingtoolbar,
				'form' : this.widget.ui.form,
				'numberfield' : this.widget.ui.numberfield,
				'table' : this.widget.ui.table,
				'hideshowcolumn' : this.widget.ui.hideshowcolumn,
				'selectfield' : this.widget.ui.selectfield,
				'multiselectfield' : this.widget.ui.multiselectfield
			}
			
			var widget = new this.types[type](options)
			widget.render();
			return widget;
		}
	});
	
})(sw);

sw = new sw();

(function(_){
	_.widget = {
		basic: {},
		ui: {},
		util: {}
	}
	/*************************************/
	_.widget.util.text = {};
	/*************************************/
	_.widget.util.store = new Class({
		options:{
			data: false,
			total: 'total',
			dataRoot: 'data',
			listener: {
				success: function(){}
			},
			widgetFn: []
		},
		onLoad: false,
		sortBy: '',
		sortOrder: '',
		initialize: function(options){
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
		},
		load: function(load, param, loadSource){
			var self = this;
			if(typeof load == 'undefined' || load == false)
				load = self.options.listener.success;
			if(typeof param == 'undefined' || param == false)
				param = '';
			if(typeof loadSource == 'undefined')
				loadSource = false;
			if(loadSource!=true && typeof self.records == 'function' && !self.onLoad){
				self.onLoad = true;
				//load(self.records, self.total);
				$.each(self.options.widgetFn, function(index, value){
					value(self.records, self.total)
				})
				self.onLoad = false;
			}
			else{
				if(typeof self.options.data == 'string' && !self.onLoad){
					self.onLoad = true;
					$.getJSON(self.options.data+'?'+param, function(data) {
						self.records = TAFFY(data[self.options.dataRoot])
						self.total = TAFFY(data[self.options.total])
						//load(self.records, self.total);
						$.each(self.options.widgetFn, function(index, value){
							value(self.records, self.total)
						})
						self.onLoad = false;
					});
				}
				else if(!self.onLoad){
					self.records = TAFFY(self.options.data[self.options.dataRoot]);
					self.total = self.options.data[self.options.total];
					//load(self.records, self.total);
					$.each(self.options.widgetFn, function(index, value){
						value(self.records, self.total)
					})
					self.onLoad = false;
				}
			}
		},
		sort: function(field){
			if(field!=this.sortBy){
				this.shortBy = field;
				this.sortOrder = '';
			}
			if(this.sortOrder == '')
				this.sortOrder = 'asec';
			else if (this.sortOrder == 'asec')
				this.sortOrder = 'desc';
			self.records(this.shortBy+' '+this.sortOrder)
		}
	})
	/*************************************/
	_.widget.util.text.random = function (length, chars) {
		var mask = '';
		if (chars.indexOf('a') > -1)
			mask += 'abcdefghijklmnopqrstuvwxyz';
		if (chars.indexOf('A') > -1)
			mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (chars.indexOf('#') > -1)
			mask += '0123456789';
		if (chars.indexOf('!') > -1)
			mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
		var result = '';
		for (var i = length; i > 0; --i)
			result += mask[Math.round(Math.random() * (mask.length - 1))];
		return result;
	}
	/*************************************/
	_.widget.util.text.inputFloat = function(event){
		if (event.which != 46 && (event.which < 47 || event.which > 59))
		{
			event.preventDefault();
			if ((event.which == 46) && ($(this).indexOf('.') != -1)) {
				event.preventDefault();
			}
		}
	}
	/*************************************/
	_.get = function(selector){
		if($('.sw-base#'+selector).length>0)
			return $('.sw-base#'+selector)[0].sw;
	}
	/*************************************/
	_.widget.util.text.inputInteger = function(e){
		var chrTyped, chrCode=0, evt=e?e:event;
		if (evt.charCode!=null)
			chrCode = evt.charCode;
		else if (evt.which!=null)
			chrCode = evt.which;
		else if (evt.keyCode!=null)
			chrCode = evt.keyCode;

		if (chrCode==0)
			chrTyped = 'SPECIAL KEY';
		else
			chrTyped = String.fromCharCode(chrCode);

		//[test only:] display chrTyped on the status bar 
		self.status='inputDigitsOnly: chrTyped = '+chrTyped;

		//Digits, special keys & backspace [\b] work as usual:
		if (chrTyped.match(/\d|[\b]|SPECIAL/))
			return true;
		if (evt.altKey || evt.ctrlKey || chrCode<28)
			return true;

		//Any other input? Prevent the default response:
		if (evt.preventDefault) evt.preventDefault();
			evt.returnValue=false;
		return false;
	}
	/*************************************/
	_.widget.util.spacerWidth = function(margin){
		$('.sw-toolbar .sw-spacer-auto, .sw-form-button .sw-spacer-auto').each(function(key, value){
			var width = 0;
			$(value).siblings().not('.sw-spacer-auto').each(function(key, value){
				width += parseInt($(value).outerWidth()) + parseInt($(value).css('margin-left')) + parseInt($(value).css('margin-right'));
				//console.log(value, $(value).outerWidth());
			})
			//console.log(width);
			//if(margin)
			$(value).width( $(value).parent().width() - width - 4 );
			//else
				//$(value).width( ($(value).parent().width() - width - (parseInt($(value).css('margin-left'))*$(value).parent().children('.sw-spacer-auto').length) - (parseInt($(value).css('margin-right'))*$(value).parent().children('.sw-spacer-auto').length))/$(value).parent().children('.sw-spacer-auto').length );
		})
	}
	/*************************************/
	_.widget.basic.box = new Class({
		options: {
			width: 'auto',
			height: 'auto',
			minWidth: '0px',
			minHeight: '0px',
			formBind: false
		},
		created: false,
		initialize: function(options){
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.el = $(document.createElement('div')).addClass('sw-base sw-box');
			this.base = this.el;
			this.base.css({"min-width": this.options.minWidth,"min-height": this.options.minheight, width: this.options.width, height: this.options.height});
			this.base.prop('id', this.options.id)
			for(i in this.options.listener){
				if(typeof this.options.listener[i] == 'function')
					if(typeof this[i] == 'function')
						this[i]();
			}
			if(typeof this.options.class != 'undefined')
				this.base.addClass(this.options.class);
		},
		create: function(){
			
		},
		up: function(){
			return sw.get(this.base.parents('.sw-base').prop('id'));
		},
		destroy: function(){
			delete this.base.sw;
			this.base.remove();
			delete this;
		},
		render: function(renderTo){
			if(typeof renderTo == 'undefined' && typeof this.options.renderTo != 'undefined')
				renderTo = this.options.renderTo;
			if(!this.created)
				this.create();
			this.created = true;
			$(renderTo).append(this.base);
			var parent = this.base.parents('.sw-base');
			if(parent.hasClass('sw-dropdown'))
				this.base.removeClass('sw-inline-block');
			this.initRender();
			this.base[0].sw=this;
		},
		initRender: function(){
		
		},
		focus: function(){
			var self = this;
			this.base.bind('focus', function(){
				self.options.listener.focus(self.options.listenerData.focus);
			})
		},
		blur: function(){
			var self = this;
			this.base.bind('click', function(){
				self.options.listener.blur(self.options.listenerData.blur);
			})
		},
		click: function(){
			var self = this;
			this.base.bind('click', function(){
				if(self.options.formBind){
					if(!self.base.parents('.sw-form').hasClass('sw-false'))
						self.options.listener.click(self);
					else{
						alert(sw.get(self.base.parents('.sw-form').prop('id')).options.formBindMsg)
						self.base.parents('.sw-form').find('input').blur();
					}
				}
				else
					self.options.listener.click(self);
			})
		},
		dblclick: function(){
			var self = this;
			$(el).bind('dblclick', function(){
				if(self.options.formBind){
					if(!self.base.parents('.sw-form').hasClass('sw-false'))
						self.options.listener.dblclick(self.options.listenerData.dblclick);
					else{
						alert(sw.get(self.base.parents('.sw-form').prop('id')).options.formBindMsg)
						self.base.parents('.sw-form').find('input').blur();
					}
				}
				else
					self.options.listener.dblclick(self.options.listenerData.dblclick);
			})
		},
		mouseenter: function(){
			var self = this;
			this.base.bind('mouseenter', function(){
				self.options.listener.mouseenter(self.options.listenerData.mouseenter);
			})
		},
		mouseleave: function(){
			var self = this;
			this.base.bind('mouseleave', function(){
				self.options.listener.mouseleave(self.options.listenerData.mouseleave);
			})
		},
		mouseover: function(){
			var self = this;
			this.base.bind('mouseover', function(){
				self.options.listener.mouseover(self.options.listenerData.mouseover);
			})
		},
		keypress: function(){
			var self = this;
			this.base.bind('keypress', function(){
				self.options.listener.keypress(self);
			})
		},
		keydown: function(){
			var self = this;
			this.base.bind('keydown', function(){
				self.options.listener.keydown(self);
			})
		},
		keyup: function(){
			var self = this;
			this.base.bind('keyup', function(e){
				self.options.listener.keyup(self, e);
			})
		}
	})
	/*************************************/
	_.widget.basic.input = new Class({
		options: {
			width: 'auto',
			height: '22px',
			required: false,
			disabled: false,
			name: ''
		},
		created: false,
		initialize: function(options){
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.el = $(document.createElement('input')).addClass('sw-base sw-box');
			this.base = $(this.el);
			this.base.css({"height": this.options.height,"width": this.options.width});
			this.base.prop('id', this.options.id)
			if(typeof this.options.name == 'undefined')
				this.options.name = this.options.id
			this.base.prop('disabled', this.options.disabled);
			this.base.prop('name', this.options.name)
			for(i in this.options.listener){
				if(typeof this.options.listener[i] == 'function')
					if(typeof this[i] == 'function')
						this[i]();
			}
		},
		create: function(){
			
		},
		up: function(){
			return sw.get(this.base.parents('.sw-base').prop('id'));
		},
		render: function(renderTo){
			if(typeof renderTo == 'undefined' && typeof this.options.renderTo != 'undefined')
				renderTo = this.options.renderTo;
			if(!this.created)
				this.create();
			this.created = true;
			$(renderTo).append(this.base);
			this.initRender();
			//_.widget.util.list[this.options.id] = this;
			var self = this;
			if(this.options.required){
				$(this.base.parents('.sw-form')[0]).addClass('sw-false');
				this.base.bind('blur',function(){
					if($(this).val()==''){
						$(this).addClass('sw-border-error');
						$(self.base.parents('.sw-form')[0]).addClass('sw-false');
					}
					else{
						$(this).removeClass('sw-border-error');
						$(self.base.parents('.sw-form')[0]).removeClass('sw-false');
					}
				})
			}
			this.base[0].sw=this;
		},
		initRender: function(){
		
		},
		destroy: function(){
			delete this.base.sw;
			this.base.remove();
			//this.base.destroy()//delete sw.widget.util.list[this.options.id];
			delete this;
		},
		focus: function(){
			var self = this;
			this.base.bind('focus', function(){
				self.options.listener.focus(self.options.listenerData.focus);
			})
		},
		disable: function(){
			this.base.prop('disabled', true);
		},
		enable: function(){
			this.base.prop('disabled', false);
		},
		blur: function(){
			var self = this;
			this.base.bind('click', function(){
				self.options.listener.blur(self.options.listenerData.blur);
			})
		},
		click: function(){
			var self = this;
			this.base.bind('click', function(){
				self.options.listener.click(self.options.listenerData.click);
			})
		},
		dblclick: function(){
			var self = this;
			$(el).bind('dblclick', function(){
				self.options.listener.dblclick(self.options.listenerData.dblclick);
			})
		},
		mouseenter: function(){
			var self = this;
			this.base.bind('mouseenter', function(){
				self.options.listener.mouseenter(self.options.listenerData.mouseenter);
			})
		},
		mouseleave: function(){
			var self = this;
			this.base.bind('mouseleave', function(){
				self.options.listener.mouseleave(self.options.listenerData.mouseleave);
			})
		},
		mouseover: function(){
			var self = this;
			this.base.bind('mouseover', function(){
				self.options.listener.mouseover(self.options.listenerData.mouseover);
			})
		},
		keypress: function(){
			var self = this;
			this.base.bind('keypress', function(){
				self.options.listener.keypress(self.options.listenerData.keypress);
			})
		},
		keydown: function(){
			var self = this;
			this.base.bind('keydown', function(){
				self.options.listener.keydown(self.options.listenerData.keydown);
			})
		},
		keyup: function(){
			var self = this;
			this.base.bind('keyup', function(e){
				self.options.listener.keyup(self, e);
			})
		}
	})
	/*************************************/
	_.widget.basic.select = new Class({
		options: {
			width: '122px',
			height: '22px',
			required: false,
			store: false,
			listener:{
				success: function(){
					
				}
			}
		},
		created: false,
		initialize: function(options){
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.el = $(document.createElement('select')).addClass('sw-base sw-box');
			this.base = $(this.el);
			this.base.css({"height": this.options.height, 'width': this.options.width});
			this.base.prop('id', this.options.id)
			if(typeof this.options.name == 'undefined')
				this.options.name = this.options.id
			this.base.prop('name', this.options.name)
			for(i in this.options.listener){
				if(typeof this.options.listener[i] == 'function')
					if(typeof this[i] == 'function')
						this[i]();
			}
			if(this.options.required){
				this.base.addClass('sw-input-false')
				this.base.bind('')
				this.base.bind('blur',function(){
					if($(this).val()=='')
						$(this).addClass('sw-border-error').addClass('sw-input-false');
					else
						$(this).removeClass('sw-border-error').removeClass('sw-input-false');
				})
			}
		},
		load: function(load){
			if(typeof load == 'undefined' || load == false)
				load = this.options.listener.success;
			this.store.load(load)
		},
		create: function(){
			
		},
		up: function(){
			return sw.get(this.base.parents('.sw-base').prop('id'));
		},
		render: function(renderTo){
			if(typeof renderTo == 'undefined' && typeof this.options.renderTo != 'undefined')
				renderTo = this.options.renderTo;
			if(!this.created)
				this.create();
			this.created = true;
			$(renderTo).append(this.base);
			this.initRender();
			//_.widget.util.list[this.options.id] = this;
			this.base[0].sw=this;
		},
		initRender: function(){
		
		},
		destroy: function(){
			delete this.base.sw;
			this.base.remove();
			//this.base.destroy()//delete sw.widget.util.list[this.options.id];
			delete this;
		},
		focus: function(){
			var self = this;
			this.base.bind('focus', function(e){
				self.options.listener.focus(self, e);
			})
		},
		blur: function(){
			var self = this;
			this.base.bind('click', function(e){
				self.options.listener.blur(self, e);
			})
		},
		click: function(){
			var self = this;
			this.base.bind('click', function(e){
				self.options.listener.click(self, e);
			})
		},
		dblclick: function(){
			var self = this;
			$(el).bind('dblclick', function(e){
				self.options.listener.dblclick(self, e);
			})
		},
		mouseenter: function(){
			var self = this;
			this.base.bind('mouseenter', function(e){
				self.options.listener.mouseenter(self, e);
			})
		},
		mouseleave: function(){
			var self = this;
			this.base.bind('mouseleave', function(e){
				self.options.listener.mouseleave(self, e);
			})
		},
		mouseover: function(){
			var self = this;
			this.base.bind('mouseover', function(e){
				self.options.listener.mouseover(self, e);
			})
		},
		keypress: function(){
			var self = this;
			this.base.bind('keypress', function(e){
				self.options.listener.keypress(self, e);
			})
		},
		keydown: function(){
			var self = this;
			this.base.bind('keydown', function(e){
				self.options.listener.keydown(self, e);
			})
		},
		keyup: function(){
			var self = this;
			this.base.bind('keyup', function(e){
				self.options.listener.keyup(self, e);
			})
		},
		select: function(){
			var self = this;
			this.base.bind('select', function(e){
				self.options.listener.select(self, e);
			})
		}
	})
	/*************************************/
	_.widget.ui.text = new Class({
		Extends: _.widget.basic.box,
		options:{
			text: ''
		},
		initialize: function(options){
			this.options.id = sw.widget.util.text.random(8,'#aA')
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent({});
			this.base.html(this.options.text);
			this.base.addClass('sw-inline-block');
		}
		
	})
	/*************************************/
	_.widget.ui.separator = new Class({
		Extends: _.widget.basic.box,
		options:{},
		initialize: function(options){
			var self = this;
			this.options.id = sw.widget.util.text.random(8,'#aA')
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent({height: '100%',width:'1px'});
			this.base.addClass('sw-inline-block sw-border2 sw-separator');
		}
		
	})
	/*************************************/
	_.widget.ui.window = new Class({
		Extends: _.widget.basic.box,
		options:{
			width: '200px',
			height: '150px',
			'float': true,
			items: {},
			windowButton: 'close|minimize|maximize',
			title: ''
		},
		initialize: function(options){
			this.options.id = sw.widget.util.text.random(8,'#aA')
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent({width: this.options.width, height: this.options.height, id: this.options.id});
		},
		create: function(){
			var self = this;
			this.base.addClass('sw-background1 sw-border2 sw-padding1 sw-no-highlight sw-window sw-no-overflow');
			if(this.options.float == true){
				this.base.css('z-index', 1000);
				this.base.css('position', 'absolute');
				if(typeof this.options.left == 'undefined')
					this.options.left = (parseInt(window.innerWidth)-parseInt(this.options.width))/2;
				if(typeof this.options.top == 'undefined')
					this.options.top = (parseInt(window.innerHeight)-parseInt(this.options.height))/2;
				if(this.options.windowButton != '' || this.options.title != ''){
					this.title = $('<div style="height: 17px;" class="sw-title"></div>');
					this.base.append(this.title)
					self.draggable = DragDrop.bind(this.base[0], {
						anchor: this.title[0],
						boundingBox: 'offsetParent'
					});
					this.windowButton = $('<div class="sw-top-right sw-no-padding"></div>')
					this.title.append(this.windowButton);
					this.base.addClass('sw-gradient6').removeClass('sw-background1');
				}
				//if(this.options.windowButton == '' && this.options.title == ''){
					if(this.options.windowButton.contains('minimize')){
						sw.create('button', {
							renderTo : this.windowButton,
							icon: 'sw-icon-minimise',
							class: 'sw-window-button sw-padding2',
							height: '18px',
							listener:{
								click: function(){
									if(!self.base.hasClass("sw-minimize")){
										self.options.height = self.base.outerHeight();
										self.options.top = self.base.css('top');
										self.options.left = self.base.css('left');
									}
									self.base.toggleClass("sw-minimize")
									if(self.base.hasClass("sw-minimize")){
										self.base.css('top', '');
										self.draggable.unbind();
									}
									else{
										self.draggable = DragDrop.bind(self.base[0], {
											anchor: self.title[0],
											boundingBox: 'offsetParent'
										});
										self.base.height(self.options.height)
										self.base.css('top', self.options.top);
										self.base.css('left', self.options.left);
										self.base.css('position', 'absolute');
									}
								}
							}
						});
					}
					if(this.options.windowButton.contains('maximize')){
						sw.create('button', {
							renderTo : this.windowButton,
							icon: 'sw-icon-square',
							class: 'sw-window-button sw-padding2',
							height: '18px',
							listener:{
								click: function(){
									self.base.height(self.base.parent().innerHeight());
									self.base.width(self.base.parent().innerWidth());
									self.base.css('top','0px');
									self.base.css('left','0px');
									self.resize();
								}
							}
						});
					}
					if(this.options.windowButton.contains('close')){
						sw.create('button', {
							renderTo : this.windowButton,
							icon: 'sw-icon-close',
							class: 'sw-window-button sw-padding2',
							height: '18px',
							listener:{
								click: function(){
									self.destroy();
								}
							}
						});
					}
				//}
			}
			this.content = $('<div class="sw-background1 sw-window-content sw-overflow-auto" style="width:100%"></div>').outerHeight(this.base.height()-17-6);
			this.base.append(this.content)
			if(typeof this.options.top != 'undefined')
				this.base.css('top', this.options.top)
			if(typeof this.options.left != 'undefined')
				this.base.css('left', this.options.left)
		},
		resize: function(){
			this.content.outerHeight(this.base.innerHeight()-17)
		},
		initRender: function(){
			var self = this;
			$.each(this.options.items, function(key, value){
				if(typeof value.options == 'undefined')
					value.options = {};
				value.options.renderTo = self.content;
				sw.create(value.widget, value.options)
			})
			sw.widget.util.spacerWidth(true);
		}
	})
	/*************************************/
	_.widget.ui.spacer = new Class({
		Extends: _.widget.basic.box,
		options:{
			width: 'auto'
		},
		initialize: function(options){
			var self = this;
			this.options.id = sw.widget.util.text.random(8,'#aA')
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent(this.options);
			this.base.addClass('sw-spacer sw-inline-block');
			if(this.options.width=='auto'){
				this.base.addClass('sw-spacer-auto').removeClass('sw-spacer');
			}
		}
	})
	/*************************************/
	_.widget.ui.toolbar = new Class({
		Extends: _.widget.basic.box,
		options:{
			width: '100%',
			height: '28px'
		},
		initialize: function(options){
			var self = this;
			this.options.id = sw.widget.util.text.random(8,'#aA')
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent({width: this.options.width, height: this.options.height, id: this.options.id});
		},
		create: function(){
			this.base.addClass('sw-toolbar sw-gradient1 sw-border2 sw-padding1 sw-no-highlight sw-overflow-hidden');
		},
		addItems: function(items){
			$.each(items, function(key, value){
				if(typeof value.options == 'undefined')
					value.options = {};
				value.options.renderTo = self.base;
				sw.create(value.widget, value.options)
			});
		},
		initRender: function(){
			var self = this;
			var parent = this.base.parents('.sw-form');
			if(parent.length>0){
				this.base.removeClass('sw-toolbar sw-gradient1 sw-border2').addClass('sw-form-button')
			}
			$.each(this.options.items, function(key, value){
				if(typeof value.options == 'undefined')
					value.options = {};
				value.options.renderTo = self.base;
				sw.create(value.widget, value.options)
			})
			sw.widget.util.spacerWidth(true);
		}
	})
	/*************************************/
	_.widget.ui.pagingtoolbar = new Class({
		Extends: _.widget.ui.toolbar,
		options: {},
		initialize: function(widget){
			var self = this, widget = widget;
			this.options.renderTo = widget.base;
			this.options.items = [{
					widget: 'spacer'
				},{
					widget: 'button',
					options:{
						icon: 'sw-icon-fast_backward',
						text: '',
						listener: {
							click: function(){
								widget.load(widget.options.param, 1);
								self.base.find('#sw-paging-toolbar-page input').val(widget.options.page);
							}
						}
					}
				},{
					widget: 'button',
					options:{
						icon: 'sw-icon-back',
						text: '',
						listener: {
							click: function(){
								if(widget.options.page>1){
									widget.load(widget.options.param, widget.options.page-1);
									self.base.find('#sw-paging-toolbar-page input').val(widget.options.page);
								}
							}
						}
					}
				},{
					widget: 'textfield',
					options:{
						width: '30px',
						id: 'sw-paging-toolbar-page',
						value: widget.options.page
					}
				},{
					widget: 'button',
					options:{
						icon: 'sw-icon-forward',
						text: '',
						listener: {
							click: function(){
								if(Math.ceil(widget.options.total/widget.options.pageSize)>widget.options.page){
									widget.load(widget.options.param, widget.options.page+1);
									self.base.find('#sw-paging-toolbar-page input').val(widget.options.page);
								}
							}
						}
					}
				},{
					widget: 'button',
					options:{
						icon: 'sw-icon-fast_forward',
						text: '',
						listener: {
							click: function(){
								widget.load(widget.options.param, Math.ceil(widget.options.total/widget.options.pageSize));
								self.base.find('#sw-paging-toolbar-page input').val(Math.ceil(widget.options.total/widget.options.pageSize));
							}
						}
					}
				}]
			this.parent(this.options);
		}
	})
	/*************************************/
	_.widget.ui.textfield = new Class({
		Extends: _.widget.basic.box,
		options: {
			width: '122px',
			label: '',
			labelWidth: '100px',
			required: false,
			type: 'text',
			readOnly: false,
			value: ''
		},
		initialize: function(options){
			var self = this;
			if(typeof options.id=='undefined')
				this.options.id = sw.widget.util.text.random(8,'#aA');
			else
				this.options.id = options.id;
			this.options.inputId = sw.widget.util.text.random(8,'#aA')
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			if(this.options.label == '' || $(this.options.renderTo).hasClass('sw-toolbar') || $(this.options.renderTo).hasClass('sw-dropdown'))
				this.options.labelWidth = 'auto'
			this.label = new _.widget.basic.box({width: this.options.labelWidth, class: 'sw-float-left sw-padding-top1'});
			this.label.base.html(this.options.label+'&nbsp;');
			this.textfield = new _.widget.basic.input({width: this.options.width, required: this.options.required, id: this.options.inputId, class: 'sw-float-left', name: this.options.name})
			this.textfield.base.prop('type', this.options.type).prop('readonly', this.options.readOnly).val(self.options.value);
			this.parent({height: '22px', width: 'auto'});
			this.base.addClass('sw-textfield');
			this.base.bind('click',function(e){
				e.stopPropagation()
				$(this).find('input').focus();
			})
		},
		create: function(){
		},
		setValue: function(value){
			this.textfield.base.val(value);
		},
		getValue: function(value){
			return this.textfield.base.val();
		},
		initRender: function(){
			this.label.render(this.base);
			this.textfield.render(this.base);
			if(this.base.parent('.sw-toolbar').length>0)
				this.base.addClass('sw-inline-block');
			if(this.options.type == 'hidden')
				this.base.hide();
		}
	})
	/*************************************/
	_.widget.ui.datefield = new Class({
		Extends: _.widget.ui.textfield,
		options: {
			readOnly: true,
			firstDay: 1,
			minDate: moment().subtract('years', 7)._d,
			maxDate: moment().add('years', 7)._d,
			format: "MM-DD-YYYY",
			yearRange: [moment().subtract('years', 7).format('YYYY'), moment().add('years', 7).format('YYYY')]
		},
		initialize: function(options){
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent(this.options);
		},
		initRender: function(){
			var self = this;
			this.label.render(this.base);
			this.textfield.render(this.base);
			if(this.base.parent('.sw-toolbar').length>0)
				this.base.addClass('sw-inline-block');
			if(this.options.type == 'hidden')
				this.base.hide();
			self.textfield.base.pikaday({
				firstDay: 1,
				minDate: self.options.minDate,
				maxDate: self.options.maxDate,
				yearRange: self.options.yearRange,
				onSelect: function() {
					self.textfield.base.val(moment(this).format(self.options.format));
				}
			});
		}
	});
	/*************************************/
	_.widget.ui.table = new Class({
		Extends: _.widget.basic.box,
		options:{
			store: false,
			listener:{},
			model:{},
			width: '100%',
			height: 'auto',
			autoLoad: true,
			plugin: false,
			page: 1,
			pageSize: false,
			total: 0,
			search: false,
			query: {},
			dropDown: false,
			param: function(){
				return '';
			},
			hidden: [],
			serverPaging: false
		},
		initialize: function(options){
			var self = this;
			self.options.id = sw.widget.util.text.random(8,'#aA');
			//self.setOptions(options);
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			self.parent({width: self.options.width, height: self.options.height});
			self.base.addClass('sw-table sw-border2 sw-overflow-hidden');
			if(self.options.search == true){
				self.options.tbar[self.options.tbar.length] = {
					widget: 'spacer'
				}
				self.options.tbar[self.options.tbar.length] = {
					widget: 'textfield',
					options:{
						label: 'Search',
						listener:{
							keyup: function(widget, e){
								if(e.keyCode == 13){
									var widget = widget;
									if(widget.getValue()=="")
										self.options.query = {};
									else{
										self.options.query = [];
										$.each(self.options.model, function(index, value){
											self.options.query[self.options.query.length] = {};
											self.options.query[self.options.query.length-1][value.field] = {likenocase: widget.getValue()};
										})
									}
									self.options.listener.success(self.options.records, self.options.total)
								}
							}
						}
					}
				}
			}
			if(typeof self.options.tbar != 'undefined'){
				self.tbar = sw.create('toolbar',{
					items: self.options.tbar,
					renderTo: self.base
				})
			}
			self.header = $('<table class="sw-table-header" style="width: 100%;"></table>');
			self.bodyDiv = $('<div class="sw-table-body sw-overflow-y"></div>');
			self.body = $('<table style="width: 100%;"><thead></thead><tbody></tbody></table>');
			self.footer = $('<table class="sw-table-footer" style="width: 100%;"></table>');
			self.base.append(self.header).append(self.bodyDiv.append(self.body)).append(self.footer);
			if(typeof self.options.bbar != 'undefined'){
				sw.create('toolbar',{
					items: self.options.bbar,
					renderTo: self.base
				})
			}
		},
		create: function(loadSource){
			var self = this;
			if(typeof loadSource == 'undefined')
				loadSource = self.options.serverPaging;
			self.header.empty().append('<tr class="sw-no-highlight"></tr>');
			self.body.find('thead').empty().append('<tr></tr>');
			if(typeof self.options.dropDown == 'function'){
				self.header.find('tr').append('<td style="width:18px;" class="sw-border-right1 sw-row-dropdown"></td>')
				self.body.find('thead').find('tr').append('<td style="width:18px;" class="sw-table-not-used"></td>');
			}
			$.each(self.options.model, function(key, value){
				if(self.options.hidden.indexOf(value.field)<0){
					//self.header.find('tr').append('<td><div class="sw-inline-block">'+value.header+'</div><div class="sw-col-resize sw-inline-block sw-border-right1 sw-float-right" style="width: 3px;height: 15px;"></div></td>')
					td = $('<td style="height:23px;"><div style="position: relative">'+value.header+'</div></td>').click(function(){
						$(this).siblings().removeClass('sw-asec').removeClass('sw-desc')
						if(!$(this).hasClass('sw-asec')){
							self.sort(value.field, 'desc')
							$(this).addClass('sw-asec').remove('sw-desc');
						}
						else{
							self.sort(value.field, 'asec')
							$(this).addClass('sw-desc').remove('sw-asec');
						}
					})
					self.header.find('tr').append(td).append('<td width="3" class="sw-col-resize sw-table-not-used sw-border-right1"></td>')
					self.body.find('thead').find('tr').append('<td></td>')
					/*var tmp = sw.create('button', {
						id: 'prop',
						icon: 'sw-icon-arrow_down sw-no-margin',
						class: 'sw-top-right sw-border-none',
						renderTo: td.children('div'),
						listener:{
							click: function(){
								sw.create('window', {
									width: 'auto',
									height: 'auto',
									renderTo: self.options.renderTo,
									windowButton: '',
									items: [{
										widget: 'text',
										options:{
											text: 'test'
										}
									}]
								})
							}
						}
					})
					tmp.base.addClass('sw-no-padding').removeClass('sw-padding2');
					tmp.base.hide();
					td.bind('mouseover', function(){
						tmp.base.show();
					}).bind('mouseleave', function(){
						tmp.base.hide();
					})*/
				}
			});
			/*
			sw.get('compareTable').header.find('tr').children('td').not('.sw-col-resize,.sw-table-not-used').click(function(){
				
			})
			*/
			self.header.find('tr').find('.sw-col-resize').bind('mousedown', function(e){
				sw.mouseDown = this;
				sw.e = e;
				$('body').addClass('sw-col-resize')
			}).bind('mouseup', function(e){
				delete sw.mouseDown;
				$('body').removeClass('sw-col-resize')
				if(!$(this).next().hasClass('sw-table-not-used')){
					x = sw.e2.clientX-sw.e.clientX;
					if(x>0){
						if(x>(parseInt($(this).next().innerWidth())-5))
							x = (parseInt($(this).next().innerWidth())-5)
						$(this).prev().innerWidth(parseInt($(this).prev().innerWidth())+x);
						$(this).next().innerWidth(parseInt($(this).next().innerWidth())-x);
					}
					else{
						if(Math.abs(x)>(parseInt($(this).prev().innerWidth())-5))
							x = (parseInt($(this).prev().innerWidth())-5)
						$(this).prev().innerWidth(parseInt($(this).prev().innerWidth())-Math.abs(x));
						$(this).next().innerWidth(parseInt($(this).next().innerWidth())+Math.abs(x));
					}
					$(self.body.find('thead').find('td')[$(this).prevAll().not('.sw-table-not-used').length-1]).innerWidth(parseInt($(this).prev().innerWidth())+3)
					$(self.body.find('thead').find('td')[$(this).prevAll().not('.sw-table-not-used').length]).innerWidth(parseInt($(this).next().innerWidth())+3)
				}
			})
			self.header.find('tr').append('<td width="20" class="sw-table-not-used"></td>');
			//self.body.find('thead').find('tr').append('<td></td>');
			self.header.find('tr').addClass('sw-gradient1');
			this.options.listener.success = function(records, total){
				self.options.records = records;
				self.options.total = records(self.options.query).get().length;
				self.body.find('tbody').empty();
				if(typeof self.options.order != 'undefined'){
					self.options.records.sort(self.options.fieldOrder+' '+self.options.order)
				}
				var tmp = self.options.records(self.options.query).start((self.options.page*self.options.pageSize-self.options.pageSize)).limit(self.options.pageSize).get();
				$.each(tmp, function(key, value){
					var value = value;
					var tr = $('<tr></tr>');
					if(typeof self.options.dropDown == 'function'){
						var td = $('<td class="sw-table-not-used"><span class="sw-icon-add"></span></tr>').click(function(){
							if($(this).parent('tr').next().hasClass('sw-row-dropdown'))
								$(this).parent('tr').next().remove();
							else
								$('<tr class="sw-row-dropdown"><td colspan="'+(self.options.model.length-self.options.hidden.length+2)+'">'+self.options.dropDown(value)+'</td></tr>').insertAfter($(this).parent('tr'))
						});
						tr.append(td);
					}
					$.each(self.options.model, function(key, model){
						if(self.options.hidden.indexOf(model.field)<0){
							var td = $('<td>'+value[model.field]+'</td>');
							//console.log(value)
							if(typeof model.colRenderer == 'function'){
								td = model.colRenderer(value, td);
							}
							tr.append(td);
							if(typeof model.rowRenderer == 'function')
								tr = model.rowRenderer(value, tr);
						}
					});
					//tr.append('<td></td>')
					self.body.find('tbody').append(tr);
					if(typeof self.options.listener.rowdblclick=='function')
						self.rowDblClick(self.options.listener.rowdblclick, value, tr);
					if(typeof self.options.listener.rowclick=='function')
						self.rowClick(self.options.listener.rowclick, value, tr);
				})
				self.autoHeight();
			}
			self.options.store.options.widgetFn.push(self.options.listener.success)
			if(self.options.autoLoad)
				this.options.store.load(self.options.listener.success, self.options.param(), loadSource)
		},
		sort: function(field, order){
			this.options.fieldOrder = field;
			this.options.order = order;
			this.options.store.load(this.options.listener.success, this.options.param(), this.options.serverPaging)
		},
		rowClick: function(fn, record, tr){
			var self = this;
			var record = record;
			var fn = fn;
			var tr = tr;
			if(typeof tr != 'undefined')
				tr.click(function(e){
					fn(self,record,e);
				});
		},
		rowDblClick: function(fn, record, tr){
			var self = this;
			var record = record;
			var fn = fn;
			var tr = tr;
			if(typeof tr != 'undefined')
				tr.dblclick(function(e){
					fn(self,record,e);
				});
		},
		load: function(param, page, loadSource){
			var self = this;
			if(typeof param == 'undefined' || param == false)
				param = this.options.param;
			if(typeof page != 'undefined' || page == false)
				this.options.page = page;
			if(typeof loadSource == 'undefined')
				loadSource = self.options.serverPaging;
			this.options.store.load(self.options.listener.success, param(), loadSource)
		},
		initRender: function(){
			var self = this;
			header = self.header.find('tr').children('td').not('.sw-table-not-used').not('.sw-row-dropdown');
			$.each($(self.body.find('thead').find('tr')).children('td').not('.sw-table-not-used'),function(key, value){
				$(value).width(parseInt($(header[key]).outerWidth())+3)
			});

			if(this.options.plugin != false)
				$.each(this.options.plugin, function(key, value){
					sw.create(value,self);
				})

			self.autoHeight();
			this.base.width(this.base.outerWidth());
			this.body.width(parseInt(this.body.width())-20)
			sw.widget.util.spacerWidth()
		},
		autoHeight: function(){
			var self = this;
			if(self.options.height!='auto'){
				var height = parseInt(this.base.innerHeight());
				$.each(this.bodyDiv.siblings(), function(key, value){
					height -= parseInt($(value).outerHeight());
				})
				self.bodyDiv.css('height', height);
			}
		}
	})
	/*************************************/
	_.widget.ui.selectfield = new Class({
		Extends: _.widget.basic.box,
		options: {
			width: '122px',
			label: '',
			labelWidth: '100px',
			required: false,
			store: false,
			displayField: 'display',
			valueField: 'value',
			listener: {},
			autoLoad: true,
			param: '',
			selected: false,
			height: '22px'
		},
		initialize: function(options){
			this.options.id = sw.widget.util.text.random(8,'#aA')
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			if(this.options.label == '' || $(this.options.renderTo).hasClass('sw-toolbar') || $(this.options.renderTo).hasClass('sw-dropdown'))
				this.options.labelWidth = 'auto'
			this.label = new _.widget.basic.box({width: this.options.labelWidth, class: 'sw-float-left sw-padding-top1'});
			this.label.base.html(this.options.label+'&nbsp;');
			this.selectfield = new _.widget.basic.select({listener: this.options.listener, width: this.options.width, required: this.options.required, id: sw.widget.util.text.random(8,'#aA'), class: 'sw-float-left', name: this.options.name})
			this.parent({width: 'auto', height: this.options.height});
			this.selectfield.base.css('height', this.options.height)
			this.base.addClass('sw-selectfield');
			this.base.bind('click',function(e){
				e.stopPropagation()
				$(this).find('input').focus();
			})
			var self = this;
			this.options.listener.success = function(records, total){
				self.selectfield.base.empty();
				$.each(records().get(), function(key, value){
					if(self.options.selected == value[self.options.valueField])
						self.selectfield.base.append('<option value="'+value[self.options.valueField]+'" selected>'+value[self.options.displayField]+'</option>')
					else
						self.selectfield.base.append('<option value="'+value[self.options.valueField]+'">'+value[self.options.displayField]+'</option>')
				})
			}
			self.options.store.options.widgetFn.push(self.options.listener.success)
			if(self.options.autoLoad)
				this.options.store.load(self.options.listener.success)
		},
		create: function(){
		},
		getValue: function(){
			return this.selectfield.base.val();
		},
		initRender: function(){
			this.label.render(this.base);
			this.selectfield.render(this.base);
			if(this.base.parent('.sw-toolbar').length>0)
				this.base.addClass('sw-inline-block');
		},
		load: function(param, loadSource){
			if(typeof param == 'undefined' || param == false)
				param = this.options.param;
			if(typeof loadSource == 'undefined')
				loadSource = false;
			var self = this;
			this.options.store.load(self.options.listener.success, param,loadSource)
		}
	})
	/*************************************/
	_.widget.ui.multiselectfield = new Class({
		Extends: _.widget.ui.selectfield,
		options:{},
		initialize: function(options){
			this.parent(options);
			this.selectfield.base.prop('multiple', true)
			this.base.css('height', 'auto')
		}
	})
	/*************************************/
	_.widget.ui.passwordfield = new Class({
		Extends: _.widget.ui.textfield,
		options:{},
		initialize: function(options){
			this.options.id = sw.widget.util.text.random(8,'#aA');
			this.options.type = 'password';
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent(this.options);
			this.base.removeClass('sw-textfield').addClass('sw-passwordfield');
		}
	})
	/*************************************/
	_.widget.ui.numberfield = new Class({
		Extends: _.widget.ui.textfield,
		options:{
			input: 'integer'
		},
		initialize: function(options){
			this.options.id = sw.widget.util.text.random(8,'#aA');
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent(this.options);
			this.base.removeClass('sw-textfield').addClass('sw-numberfield');
		},
		initRender: function(){
			this.label.render(this.base);
			this.textfield.render(this.base);
			if(this.base.parent('.sw-toolbar').length>0)
				this.base.addClass('sw-inline-block');
			if(this.options.input == 'integer')
				this.textfield.base.keypress(sw.widget.util.text.inputInteger)
			if(this.options.input == 'float')
				this.textfield.base.keypress(sw.widget.util.text.inputFloat)
		},
		getValue: function(){
			return this.textfield.base.val();
		}
	})
	/*************************************/
	_.widget.ui.button = new Class({
		Extends: _.widget.basic.box,
		options:{
			width: 'auto',
			height: '22px',
			text: '',
			icon: '',
			types: {
				'default': 'sw-gradient1',
				'primary': 'sw-gradient2',
				'warning': 'sw-gradient3',
				'danger': 'sw-gradient4',
				'success': 'sw-gradient5',
				'info': 'sw-gradient6',
				'inverse': 'sw-gradient7',
			},
			hover: {
				'default': 'sw-hover1',
				'primary': 'sw-hover2',
				'warning': 'sw-hover3',
				'danger': 'sw-hover4',
				'success': 'sw-hover5',
				'info': 'sw-hover6',
				'inverse': 'sw-hover7',
			},
			type: 'default'
		},
		initialize: function(options){
			this.options.id = sw.widget.util.text.random(8,'#aA')
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent({
				width: this.options.width,
				height: this.options.height,
				id: this.options.id,
				listener: this.options.listener,
				listenerData: {
					click: self
				}
			});
			this.base.addClass('sw-button');
		},
		create: function(){
			self = this;
			var color = 'sw-color2';
			if(this.options.type=='default'){
				var color = 'sw-color1';
			}
			this.base.addClass('sw-content sw-pointer sw-no-highlight sw-border2 sw-padding2 '+this.options.types[this.options.type]+' sw-hover1 '+this.options.hover[this.options.type]+' sw-inline-block sw-font1 '+color+' sw-font-size1 sw-radius sw-box-shadow1');
			this.base.html('<a href="javascript:;">'+this.options.text+'</a>')
			if(this.options.icon!='')
				this.base.prepend('<span class="'+this.options.icon+'"></span>');
		},
		initRender: function(){
			var parent = $(this.base.parents('.sw-base')[0]);
			if(parent.hasClass('sw-toolbar') || parent.hasClass('sw-dropdown')){
				this.base.removeClass('sw-box-shadow1').removeClass('sw-border2').addClass('sw-border-none').removeClass(this.options.types[this.options.type])
			}
		}
	})
	/*************************************/
	_.widget.ui.form = new Class({
		Extends: _.widget.ui.window,
		options: {
			action: '',
			method: 'post',
			width: 'auto',
			height: 'auto',
			float: false,
			formBindMsg: 'Please check your input!',
			colNumber: 1
		},
		initialize: function(options){
			var self = this;
			this.options.id = sw.widget.util.text.random(8,'#aA')
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent(options);
			this.form = $('<form>').prop('action', this.options.action).prop('method', this.options.method).bind("keyup", function(e) {
				var code = e.keyCode || e.which; 
				if (code  == 13) {               
					e.preventDefault();
					return false;
				}
			});
			this.form.append('<table width="100%"><tr></tr></table>');
			this.tr = this.form.find('tr');
			for(var i=0;i<this.options.colNumber;i++){
				this.form.find('tr').append('<td class="sw-flex"></td>');
			}
			this.base.addClass('sw-form');
		},
		checkRequire: function(){
			this.base.find('sw-bind').enable();
		},
		initRender: function(){
			var self = this;
			if(typeof self.options.tbar != 'undefined'){
				sw.create('toolbar',{
					items: self.options.tbar,
					renderTo: self.base
				})
			}
			this.base.append(this.form);

			if(typeof self.options.bbar != 'undefined'){
				sw.create('toolbar',{
					items: self.options.bbar,
					renderTo: self.base
				})
			}
			var td = this.tr.children();
			var add = Math.ceil(this.options.items.length/this.options.colNumber);
			var i = 0, col = 0;
			$.each(this.options.items, function(key, value){
				if(typeof value.options == 'undefined')
					value.options = {};
				if(typeof value.options.label == 'undefined')
					value.options.label = '&nbsp;';
				value.options.renderTo = td[col];
				_.create(value.widget, value.options)
				i++;
				if(i==add){
					col++;
					i = 0;
				}
			})
		},
		setValues: function(record){
			$.each(record, function(key, value){
				if(typeof sw.get(key) != 'undefined')
					sw.get(key).setValue(value);
			})
			this.base.removeClass('sw-false');
		},
		getValues: function(){
			return this.form.serializeObject();
		},
		reset: function(){
			this.form[0].reset();
		},
		submit: function(fn){
			if(!this.base.hasClass('sw-false')){
				if(typeof fn == 'function')
					var fn = fn;
				else
					var fn = function(){};
				var self = this;
				$.ajax(self.options.action, {
					type: self.options.method,
					data: self.form.serialize(),
					success: function(data){
						fn(data);
					}
				})
			}
			else{
				alert(this.options.formBindMsg);
			}
		}
	})
	/*************************************/
	_.widget.ui.dropdown = new Class({
		Extends: _.widget.ui.button,
		options: {},
		initialize: function(options){
			this.options.id = sw.widget.util.text.random(8,'#aA')
			var self = this;
			$.each(options, function(index, value){
				self.options[index] = value;
			})
			this.parent(this.options);
		},
		create: function(){
			var self = this;
			var color = 'sw-color2';
			if(self.options.type=='default'){
				var color = 'sw-color1';
			}
			self.base.addClass('sw-content sw-dropdown-button sw-pointer sw-no-highlight sw-border-none sw-padding2 sw-hover1 '+self.options.hover[self.options.type]+' sw-inline-block sw-font1 '+color+' sw-font-size1 sw-radius sw-box-shadow1');
			self.base.text(self.options.text);
			$.each(self.options.items,function(key, value){
				if(typeof value.options.icon == 'undefined')
					value.options.icon = '';
				value.options.icon += ' sw-icon';
			})
			self.window = sw.create('window', {
				renderTo : self.base,
				width: 'auto',
				height: 'auto',
				class: 'sw-dropdown sw-gradient1 sw-fixed',
				items:self.options.items
			});
			self.window.base.hide();
			self.base.click(function(e){
				e.stopPropagation();
				if(self.window.base.is(":visible")){
					self.window.base.find('.sw-dropdown').hide()
					self.window.base.hide();
					if(!$(e.target).hasClass('sw-dropdown-button'))
						self.window.base.parents('.sw-dropdown').hide();
				}
				else{
					var parent = $(this).parents('.sw-base');
					pos = $(this).offset();
					if(parent.hasClass('sw-dropdown'))
						var top = parseInt(pos.top),left = parseInt(pos.left) + parseInt($(this).outerWidth());
					else
						var top = parseInt(pos.top) + parseInt($(this).outerHeight()),left = parseInt(pos.left);
					self.window.base.css({'top': top, 'left': left});
					self.window.base.show();
				}
			})
			if(this.options.icon!='')
				this.base.prepend('<span class="'+this.options.icon+'"></span>');
		}
	})
	/*********************************/
	_.widget.ui.hideshowcolumn = new Class({
		Extends: _.widget.ui.button,
		options: {},
		initialize: function(widget){
			var self = this;
			this.widget = widget;
			this.options.renderTo = this.widget.tbar.base;
			this.options.listener = {
				click: function(){
					sw.create('window',{
						id: self.widget.options.id+'hideShowWindow',
						renderTo: self.widget.options.renderTo,
						width: '600px',
						height: '250px',
						items: [{
							widget: 'form',
							options:{
								bbar: [{
									widget: 'spacer'
								},{
									widget: 'button',
									options: {
										text: 'Close',
										listener: {
											click: function(){
												sw.get(self.widget.options.id+'hideShowWindow').destroy();
											}
										}
									}
								}],
								colNumber: 3,
								items:[{
									widget: 'multiselectfield',
									options: {
										store: new sw.widget.util.store({
											data: self.getHiddenColumn()
										}),
										id: self.widget.options.id+'hidden',
										height: '200px',
										label: 'Hidden'
									}
								},{
									widget: 'toolbar',
									options:{
										items:[{
											widget: 'button',
											options:{
												text: 'Add',
												listener: {
													click: function(){
														$.each(sw.get(self.widget.options.id+'hidden').getValue(),function(i, val){
															self.widget.options.hidden.splice([self.widget.options.hidden.indexOf(val)],1);
														})
														sw.get(self.widget.options.id+'showed').options.store.options.data = self.getShowedColumn()
														sw.get(self.widget.options.id+'showed').load(false, true)
														sw.get(self.widget.options.id+'hidden').options.store.options.data = self.getHiddenColumn()
														sw.get(self.widget.options.id+'hidden').load(false, true)
														self.widget.create();
													}
												}
											}
										},{
											widget: 'button',
											options:{
												text: 'Remove',
												listener: {
													click: function(){
														$.each(sw.get(self.widget.options.id+'showed').getValue(),function(i, val){
															self.widget.options.hidden.push(val);
														})
														sw.get(self.widget.options.id+'showed').options.store.options.data = self.getShowedColumn()
														sw.get(self.widget.options.id+'showed').load(false, true)
														sw.get(self.widget.options.id+'hidden').options.store.options.data = self.getHiddenColumn()
														sw.get(self.widget.options.id+'hidden').load(false, true)
														self.widget.create();
													}
												}
											}
										}]
									}
								},{
									widget: 'multiselectfield',
									options: {
										store: new sw.widget.util.store({
											data: self.getShowedColumn()
										}),
										id: self.widget.options.id+'showed',
										height: '200px',
										label: 'Showed'
									}
								}]
							}
						}]
					})
				}
			}
			this.parent(this.options);
		},
		getShowedColumn: function(){
			var self = this;
			data = []
			$.each(self.widget.options.model, function(i,val){
				if(!self.options.hidden.contains(val.field)){
					data.push(val)
				}
			})
			return {total: data.length, data: data}
		},
		getHiddenColumn: function(){
			var self = this;
			data = []
			$.each(self.widget.options.model, function(i,val){
				if(self.options.hidden.contains(val.field)){
					data.push(val)
				}
			})
			return {total: data.length, data: data}
		}
	})
})(sw)

$(window).resize(function(){
	$('.sw-table').each(function(each, value){
		var self = sw.get($(value).prop('id'));
		self.base.css('width', '100%');
		header = self.header.find('tr').children('td').not('.sw-table-not-used').not('.sw-row-dropdown').css('width', 'auto');
		$.each($(self.body.find('thead').find('tr')).children('td').not('.sw-table-not-used'),function(key, value){
			$(value).width(parseInt($(header[key]).outerWidth())+3)
		});
		self.autoHeight();
		self.base.width(self.base.outerWidth());
		self.body.width('100%');
		self.body.width(parseInt(self.body.width())-20)
	})
	sw.widget.util.spacerWidth(false);
}).bind('mouseup', function(e){
	sw.e2 = e;
	if(typeof sw.mouseDown != 'undefined'){
		$(sw.mouseDown).trigger('mouseup');
	}
})