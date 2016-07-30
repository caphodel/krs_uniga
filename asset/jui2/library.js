/****lib/jquery.base64.js****/
/*jslint adsafe: false, bitwise: true, browser: true, cap: false, css: false,
  debug: false, devel: true, eqeqeq: true, es5: false, evil: false,
  forin: false, fragment: false, immed: true, laxbreak: false, newcap: true,
  nomen: false, on: false, onevar: true, passfail: false, plusplus: true,
  regexp: false, rhino: true, safe: false, strict: false, sub: false,
  undef: true, white: false, widget: false, windows: false */
/*global jQuery: false, window: false */
//"use strict";

/*
 * Original code (c) 2010 Nick Galbreath
 * http://code.google.com/p/stringencoders/source/browse/#svn/trunk/javascript
 *
 * jQuery port (c) 2010 Carlo Zottmann
 * http://github.com/carlo/jquery-base64
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/

/* base64 encode/decode compatible with window.btoa/atob
 *
 * window.atob/btoa is a Firefox extension to convert binary data (the "b")
 * to base64 (ascii, the "a").
 *
 * It is also found in Safari and Chrome.  It is not available in IE.
 *
 * if (!window.btoa) window.btoa = $.base64.encode
 * if (!window.atob) window.atob = $.base64.decode
 *
 * The original spec's for atob/btoa are a bit lacking
 * https://developer.mozilla.org/en/DOM/window.atob
 * https://developer.mozilla.org/en/DOM/window.btoa
 *
 * window.btoa and $.base64.encode takes a string where charCodeAt is [0,255]
 * If any character is not [0,255], then an exception is thrown.
 *
 * window.atob and $.base64.decode take a base64-encoded string
 * If the input length is not a multiple of 4, or contains invalid characters
 *   then an exception is thrown.
 */
 
jQuery.base64 = ( function( $ ) {
  
  var _PADCHAR = "=",
    _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    _VERSION = "1.0";


  function _getbyte64( s, i ) {
    // This is oddly fast, except on Chrome/V8.
    // Minimal or no improvement in performance by using a
    // object with properties mapping chars to value (eg. 'A': 0)

    var idx = _ALPHA.indexOf( s.charAt( i ) );

    if ( idx === -1 ) {
      throw "Cannot decode base64";
    }

    return idx;
  }
  
  
  function _decode( s ) {
    var pads = 0,
      i,
      b10,
      imax = s.length,
      x = [];

    s = String( s );
    
    if ( imax === 0 ) {
      return s;
    }

    if ( imax % 4 !== 0 ) {
      throw "Cannot decode base64";
    }

    if ( s.charAt( imax - 1 ) === _PADCHAR ) {
      pads = 1;

      if ( s.charAt( imax - 2 ) === _PADCHAR ) {
        pads = 2;
      }

      // either way, we want to ignore this last block
      imax -= 4;
    }

    for ( i = 0; i < imax; i += 4 ) {
      b10 = ( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 ) | _getbyte64( s, i + 3 );
      x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff, b10 & 0xff ) );
    }

    switch ( pads ) {
      case 1:
        b10 = ( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 );
        x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff ) );
        break;

      case 2:
        b10 = ( _getbyte64( s, i ) << 18) | ( _getbyte64( s, i + 1 ) << 12 );
        x.push( String.fromCharCode( b10 >> 16 ) );
        break;
    }

    return x.join( "" );
  }
  
  
  function _getbyte( s, i ) {
    var x = s.charCodeAt( i );

    if ( x > 255 ) {
      throw "INVALID_CHARACTER_ERR: DOM Exception 5";
    }
    
    return x;
  }


  function _encode( s ) {
    if ( arguments.length !== 1 ) {
      throw "SyntaxError: exactly one argument required";
    }

    s = String( s );

    var i,
      b10,
      x = [],
      imax = s.length - s.length % 3;

    if ( s.length === 0 ) {
      return s;
    }

    for ( i = 0; i < imax; i += 3 ) {
      b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 ) | _getbyte( s, i + 2 );
      x.push( _ALPHA.charAt( b10 >> 18 ) );
      x.push( _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) );
      x.push( _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) );
      x.push( _ALPHA.charAt( b10 & 0x3f ) );
    }

    switch ( s.length - imax ) {
      case 1:
        b10 = _getbyte( s, i ) << 16;
        x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _PADCHAR + _PADCHAR );
        break;

      case 2:
        b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 );
        x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) + _PADCHAR );
        break;
    }

    return x.join( "" );
  }


  return {
    decode: _decode,
    encode: _encode,
    VERSION: _VERSION
  };
      
}( jQuery ) );

;/****lib/moment.js****/
//! moment.js
//! version : 2.7.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function d(a,b){function c(){mb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}var d=!0;return j(function(){return d&&(c(),d=!1),b.apply(this,arguments)},b)}function e(a,b){return function(c){return m(a.call(this,c),b)}}function f(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function g(){}function h(a){z(a),j(this,a)}function i(a){var b=s(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._bubble()}function j(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function k(a){var b,c={};for(b in a)a.hasOwnProperty(b)&&Ab.hasOwnProperty(b)&&(c[b]=a[b]);return c}function l(a){return 0>a?Math.ceil(a):Math.floor(a)}function m(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function n(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&hb(a,"Date",gb(a,"Date")+f*c),g&&fb(a,gb(a,"Month")+g*c),d&&mb.updateOffset(a,f||g)}function o(a){return"[object Array]"===Object.prototype.toString.call(a)}function p(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function q(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&u(a[d])!==u(b[d]))&&g++;return g+f}function r(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=bc[a]||cc[b]||b}return a}function s(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=r(c),b&&(d[b]=a[c]));return d}function t(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}mb[b]=function(e,f){var g,h,i=mb.fn._lang[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=mb().utc().set(d,a);return i.call(mb.fn._lang,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function u(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function v(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function w(a,b,c){return bb(mb([a,11,31+b-c]),b,c).week}function x(a){return y(a)?366:365}function y(a){return a%4===0&&a%100!==0||a%400===0}function z(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[tb]<0||a._a[tb]>11?tb:a._a[ub]<1||a._a[ub]>v(a._a[sb],a._a[tb])?ub:a._a[vb]<0||a._a[vb]>23?vb:a._a[wb]<0||a._a[wb]>59?wb:a._a[xb]<0||a._a[xb]>59?xb:a._a[yb]<0||a._a[yb]>999?yb:-1,a._pf._overflowDayOfYear&&(sb>b||b>ub)&&(b=ub),a._pf.overflow=b)}function A(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a,b){return b._isUTC?mb(a).zone(b._offset||0):mb(a).local()}function D(a,b){return b.abbr=a,zb[a]||(zb[a]=new g),zb[a].set(b),zb[a]}function E(a){delete zb[a]}function F(a){var b,c,d,e,f=0,g=function(a){if(!zb[a]&&Bb)try{require("./lang/"+a)}catch(b){}return zb[a]};if(!a)return mb.fn._lang;if(!o(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,d=B(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&q(e,d,!0)>=b-1)break;b--}f++}return mb.fn._lang}function G(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function H(a){var b,c,d=a.match(Fb);for(b=0,c=d.length;c>b;b++)d[b]=hc[d[b]]?hc[d[b]]:G(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function I(a,b){return a.isValid()?(b=J(b,a.lang()),dc[b]||(dc[b]=H(b)),dc[b](a)):a.lang().invalidDate()}function J(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Gb.lastIndex=0;d>=0&&Gb.test(a);)a=a.replace(Gb,c),Gb.lastIndex=0,d-=1;return a}function K(a,b){var c,d=b._strict;switch(a){case"Q":return Rb;case"DDDD":return Tb;case"YYYY":case"GGGG":case"gggg":return d?Ub:Jb;case"Y":case"G":case"g":return Wb;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?Vb:Kb;case"S":if(d)return Rb;case"SS":if(d)return Sb;case"SSS":if(d)return Tb;case"DDD":return Ib;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Mb;case"a":case"A":return F(b._l)._meridiemParse;case"X":return Pb;case"Z":case"ZZ":return Nb;case"T":return Ob;case"SSSS":return Lb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?Sb:Hb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Hb;case"Do":return Qb;default:return c=new RegExp(T(S(a.replace("\\","")),"i"))}}function L(a){a=a||"";var b=a.match(Nb)||[],c=b[b.length-1]||[],d=(c+"").match(_b)||["-",0,0],e=+(60*d[1])+u(d[2]);return"+"===d[0]?-e:e}function M(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[tb]=3*(u(b)-1));break;case"M":case"MM":null!=b&&(e[tb]=u(b)-1);break;case"MMM":case"MMMM":d=F(c._l).monthsParse(b),null!=d?e[tb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[ub]=u(b));break;case"Do":null!=b&&(e[ub]=u(parseInt(b,10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=u(b));break;case"YY":e[sb]=mb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[sb]=u(b);break;case"a":case"A":c._isPm=F(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[vb]=u(b);break;case"m":case"mm":e[wb]=u(b);break;case"s":case"ss":e[xb]=u(b);break;case"S":case"SS":case"SSS":case"SSSS":e[yb]=u(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=L(b);break;case"dd":case"ddd":case"dddd":d=F(c._l).weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=u(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=mb.parseTwoDigitYear(b)}}function N(a){var c,d,e,f,g,h,i,j;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[sb],bb(mb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(j=F(a._l),g=j._week.dow,h=j._week.doy,d=b(c.gg,a._a[sb],bb(mb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=cb(d,e,f,h,g),a._a[sb]=i.year,a._dayOfYear=i.dayOfYear}function O(a){var c,d,e,f,g=[];if(!a._d){for(e=Q(a),a._w&&null==a._a[ub]&&null==a._a[tb]&&N(a),a._dayOfYear&&(f=b(a._a[sb],e[sb]),a._dayOfYear>x(f)&&(a._pf._overflowDayOfYear=!0),d=Z(f,0,a._dayOfYear),a._a[tb]=d.getUTCMonth(),a._a[ub]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];a._d=(a._useUTC?Z:Y).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()+a._tzm)}}function P(a){var b;a._d||(b=s(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],O(a))}function Q(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function R(a){if(a._f===mb.ISO_8601)return void V(a);a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=F(a._l),h=""+a._i,i=h.length,j=0;for(d=J(a._f,g).match(Fb)||[],b=0;b<d.length;b++)e=d[b],c=(h.match(K(e,a))||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),hc[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),M(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[vb]<12&&(a._a[vb]+=12),a._isPm===!1&&12===a._a[vb]&&(a._a[vb]=0),O(a),z(a)}function S(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function T(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function U(a){var b,d,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=j({},a),b._pf=c(),b._f=a._f[f],R(b),A(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,d=b));j(a,d||b)}function V(a){var b,c,d=a._i,e=Xb.exec(d);if(e){for(a._pf.iso=!0,b=0,c=Zb.length;c>b;b++)if(Zb[b][1].exec(d)){a._f=Zb[b][0]+(e[6]||" ");break}for(b=0,c=$b.length;c>b;b++)if($b[b][1].exec(d)){a._f+=$b[b][0];break}d.match(Nb)&&(a._f+="Z"),R(a)}else a._isValid=!1}function W(a){V(a),a._isValid===!1&&(delete a._isValid,mb.createFromInputFallback(a))}function X(b){var c=b._i,d=Cb.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?W(b):o(c)?(b._a=c.slice(0),O(b)):p(c)?b._d=new Date(+c):"object"==typeof c?P(b):"number"==typeof c?b._d=new Date(c):mb.createFromInputFallback(b)}function Y(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function Z(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function $(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function _(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function ab(a,b,c){var d=rb(Math.abs(a)/1e3),e=rb(d/60),f=rb(e/60),g=rb(f/24),h=rb(g/365),i=d<ec.s&&["s",d]||1===e&&["m"]||e<ec.m&&["mm",e]||1===f&&["h"]||f<ec.h&&["hh",f]||1===g&&["d"]||g<=ec.dd&&["dd",g]||g<=ec.dm&&["M"]||g<ec.dy&&["MM",rb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,_.apply({},i)}function bb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=mb(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function cb(a,b,c,d,e){var f,g,h=Z(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:x(a-1)+g}}function db(b){var c=b._i,d=b._f;return null===c||d===a&&""===c?mb.invalid({nullInput:!0}):("string"==typeof c&&(b._i=c=F().preparse(c)),mb.isMoment(c)?(b=k(c),b._d=new Date(+c._d)):d?o(d)?U(b):R(b):X(b),new h(b))}function eb(a,b){var c,d;if(1===b.length&&o(b[0])&&(b=b[0]),!b.length)return mb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function fb(a,b){var c;return"string"==typeof b&&(b=a.lang().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),v(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function gb(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function hb(a,b,c){return"Month"===b?fb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function ib(a,b){return function(c){return null!=c?(hb(this,a,c),mb.updateOffset(this,b),this):gb(this,a)}}function jb(a){mb.duration.fn[a]=function(){return this._data[a]}}function kb(a,b){mb.duration.fn["as"+a]=function(){return+this/b}}function lb(a){"undefined"==typeof ender&&(nb=qb.moment,qb.moment=a?d("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",mb):mb)}for(var mb,nb,ob,pb="2.7.0",qb="undefined"!=typeof global?global:this,rb=Math.round,sb=0,tb=1,ub=2,vb=3,wb=4,xb=5,yb=6,zb={},Ab={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_tzm:null,_isUTC:null,_offset:null,_pf:null,_lang:null},Bb="undefined"!=typeof module&&module.exports,Cb=/^\/?Date\((\-?\d+)/i,Db=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Eb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Fb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,Gb=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,Hb=/\d\d?/,Ib=/\d{1,3}/,Jb=/\d{1,4}/,Kb=/[+\-]?\d{1,6}/,Lb=/\d+/,Mb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Nb=/Z|[\+\-]\d\d:?\d\d/gi,Ob=/T/i,Pb=/[\+\-]?\d+(\.\d{1,3})?/,Qb=/\d{1,2}/,Rb=/\d/,Sb=/\d\d/,Tb=/\d{3}/,Ub=/\d{4}/,Vb=/[+-]?\d{6}/,Wb=/[+-]?\d+/,Xb=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Yb="YYYY-MM-DDTHH:mm:ssZ",Zb=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],$b=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],_b=/([\+\-]|\d\d)/gi,ac=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),bc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},cc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},dc={},ec={s:45,m:45,h:22,dd:25,dm:45,dy:345},fc="DDD w W M D d".split(" "),gc="M D H h m s w W".split(" "),hc={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return m(this.year()%100,2)},YYYY:function(){return m(this.year(),4)},YYYYY:function(){return m(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+m(Math.abs(a),6)},gg:function(){return m(this.weekYear()%100,2)},gggg:function(){return m(this.weekYear(),4)},ggggg:function(){return m(this.weekYear(),5)},GG:function(){return m(this.isoWeekYear()%100,2)},GGGG:function(){return m(this.isoWeekYear(),4)},GGGGG:function(){return m(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return u(this.milliseconds()/100)},SS:function(){return m(u(this.milliseconds()/10),2)},SSS:function(){return m(this.milliseconds(),3)},SSSS:function(){return m(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+m(u(a/60),2)+":"+m(u(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+m(u(a/60),2)+m(u(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},ic=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];fc.length;)ob=fc.pop(),hc[ob+"o"]=f(hc[ob],ob);for(;gc.length;)ob=gc.pop(),hc[ob+ob]=e(hc[ob],2);for(hc.DDDD=e(hc.DDD,3),j(g.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=mb.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=mb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return bb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),mb=function(b,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=d,g._l=e,g._strict=f,g._isUTC=!1,g._pf=c(),db(g)},mb.suppressDeprecationWarnings=!1,mb.createFromInputFallback=d("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i)}),mb.min=function(){var a=[].slice.call(arguments,0);return eb("isBefore",a)},mb.max=function(){var a=[].slice.call(arguments,0);return eb("isAfter",a)},mb.utc=function(b,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=d,g._strict=f,g._pf=c(),db(g).utc()},mb.unix=function(a){return mb(1e3*a)},mb.duration=function(a,b){var c,d,e,f=a,g=null;return mb.isDuration(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(f={},b?f[b]=a:f.milliseconds=a):(g=Db.exec(a))?(c="-"===g[1]?-1:1,f={y:0,d:u(g[ub])*c,h:u(g[vb])*c,m:u(g[wb])*c,s:u(g[xb])*c,ms:u(g[yb])*c}):(g=Eb.exec(a))&&(c="-"===g[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},f={y:e(g[2]),M:e(g[3]),d:e(g[4]),h:e(g[5]),m:e(g[6]),s:e(g[7]),w:e(g[8])}),d=new i(f),mb.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},mb.version=pb,mb.defaultFormat=Yb,mb.ISO_8601=function(){},mb.momentProperties=Ab,mb.updateOffset=function(){},mb.relativeTimeThreshold=function(b,c){return ec[b]===a?!1:(ec[b]=c,!0)},mb.lang=function(a,b){var c;return a?(b?D(B(a),b):null===b?(E(a),a="en"):zb[a]||F(a),c=mb.duration.fn._lang=mb.fn._lang=F(a),c._abbr):mb.fn._lang._abbr},mb.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),F(a)},mb.isMoment=function(a){return a instanceof h||null!=a&&a.hasOwnProperty("_isAMomentObject")},mb.isDuration=function(a){return a instanceof i},ob=ic.length-1;ob>=0;--ob)t(ic[ob]);mb.normalizeUnits=function(a){return r(a)},mb.invalid=function(a){var b=mb.utc(0/0);return null!=a?j(b._pf,a):b._pf.userInvalidated=!0,b},mb.parseZone=function(){return mb.apply(null,arguments).parseZone()},mb.parseTwoDigitYear=function(a){return u(a)+(u(a)>68?1900:2e3)},j(mb.fn=h.prototype,{clone:function(){return mb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=mb(this).utc();return 0<a.year()&&a.year()<=9999?I(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):I(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return A(this)},isDSTShifted:function(){return this._a?this.isValid()&&q(this._a,(this._isUTC?mb.utc(this._a):mb(this._a)).toArray())>0:!1},parsingFlags:function(){return j({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=I(this,a||mb.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a&&"string"==typeof b?mb.duration(isNaN(+b)?+a:+b,isNaN(+b)?b:a):"string"==typeof a?mb.duration(+b,a):mb.duration(a,b),n(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a&&"string"==typeof b?mb.duration(isNaN(+b)?+a:+b,isNaN(+b)?b:a):"string"==typeof a?mb.duration(+b,a):mb.duration(a,b),n(this,c,-1),this},diff:function(a,b,c){var d,e,f=C(a,this),g=6e4*(this.zone()-f.zone());return b=r(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-mb(this).startOf("month")-(f-mb(f).startOf("month")))/d,e-=6e4*(this.zone()-mb(this).startOf("month").zone()-(f.zone()-mb(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:l(e)},from:function(a,b){return mb.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(mb(),a)},calendar:function(a){var b=a||mb(),c=C(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.lang().calendar(e,this))},isLeapYear:function(){return y(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=$(a,this.lang()),this.add({d:a-b})):b},month:ib("Month",!0),startOf:function(a){switch(a=r(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(a){return a=r(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+mb(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+mb(a).startOf(b)},isSame:function(a,b){return b=b||"ms",+this.clone().startOf(b)===+C(a,this).startOf(b)},min:d("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=mb.apply(null,arguments),this>a?this:a}),max:d("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=mb.apply(null,arguments),a>this?this:a}),zone:function(a,b){var c=this._offset||0;return null==a?this._isUTC?c:this._d.getTimezoneOffset():("string"==typeof a&&(a=L(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,c!==a&&(!b||this._changeInProgress?n(this,mb.duration(c-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,mb.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?mb(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return v(this.year(),this.month())},dayOfYear:function(a){var b=rb((mb(this).startOf("day")-mb(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=bb(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=bb(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=bb(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return w(this.year(),1,4)},weeksInYear:function(){var a=this._lang._week;return w(this.year(),a.dow,a.doy)},get:function(a){return a=r(a),this[a]()},set:function(a,b){return a=r(a),"function"==typeof this[a]&&this[a](b),this},lang:function(b){return b===a?this._lang:(this._lang=F(b),this)}}),mb.fn.millisecond=mb.fn.milliseconds=ib("Milliseconds",!1),mb.fn.second=mb.fn.seconds=ib("Seconds",!1),mb.fn.minute=mb.fn.minutes=ib("Minutes",!1),mb.fn.hour=mb.fn.hours=ib("Hours",!0),mb.fn.date=ib("Date",!0),mb.fn.dates=d("dates accessor is deprecated. Use date instead.",ib("Date",!0)),mb.fn.year=ib("FullYear",!0),mb.fn.years=d("years accessor is deprecated. Use year instead.",ib("FullYear",!0)),mb.fn.days=mb.fn.day,mb.fn.months=mb.fn.month,mb.fn.weeks=mb.fn.week,mb.fn.isoWeeks=mb.fn.isoWeek,mb.fn.quarters=mb.fn.quarter,mb.fn.toJSON=mb.fn.toISOString,j(mb.duration.fn=i.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,h=this._data;h.milliseconds=e%1e3,a=l(e/1e3),h.seconds=a%60,b=l(a/60),h.minutes=b%60,c=l(b/60),h.hours=c%24,f+=l(c/24),h.days=f%30,g+=l(f/30),h.months=g%12,d=l(g/12),h.years=d},weeks:function(){return l(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*u(this._months/12)},humanize:function(a){var b=+this,c=ab(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=mb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=mb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=r(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=r(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:mb.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(ob in ac)ac.hasOwnProperty(ob)&&(kb(ob,ac[ob]),jb(ob.toLowerCase()));kb("Weeks",6048e5),mb.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},mb.lang("en",{ordinal:function(a){var b=a%10,c=1===u(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Bb?module.exports=mb:"function"==typeof define&&define.amd?(define("moment",function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(qb.moment=nb),mb}),lb(!0)):lb()}).call(this);;/****lib/handlebars.runtime-v3.0.3.js****/
/*!

 handlebars v3.0.3

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;

	var _import = __webpack_require__(1);

	var base = _interopRequireWildcard(_import);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _SafeString = __webpack_require__(2);

	var _SafeString2 = _interopRequireDefault(_SafeString);

	var _Exception = __webpack_require__(3);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _import2 = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_import2);

	var _import3 = __webpack_require__(5);

	var runtime = _interopRequireWildcard(_import3);

	var _noConflict = __webpack_require__(6);

	var _noConflict2 = _interopRequireDefault(_noConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _SafeString2['default'];
	  hb.Exception = _Exception2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_noConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	exports.createFrame = createFrame;

	var _import = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(3);

	var _Exception2 = _interopRequireDefault(_Exception);

	var VERSION = '3.0.1';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 6;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function registerHelper(name, fn) {
	    if (toString.call(name) === objectType) {
	      if (fn) {
	        throw new _Exception2['default']('Arg not supported with multiple helpers');
	      }
	      Utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _Exception2['default']('Attempting to register a partial as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function () {
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} constuct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });

	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _Exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function (conditional, options) {
	    if (isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });

	  instance.registerHelper('with', function (context, options) {
	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!Utils.isEmpty(context)) {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
	        options = { data: data };
	      }

	      return fn(context, options);
	    } else {
	      return options.inverse(this);
	    }
	  });

	  instance.registerHelper('log', function (message, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, message);
	  });

	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 1,

	  // Can be overridden in the host environment
	  log: function log(level, message) {
	    if (typeof console !== 'undefined' && logger.level <= level) {
	      var method = logger.methodMap[level];
	      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports.logger = logger;
	var log = logger.log;

	exports.log = log;

	function createFrame(object) {
	  var frame = Utils.extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	/* [args, ]options */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;

	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#x27;',
	  '`': '&#x60;'
	};

	var badChars = /[&<>"'`]/g,
	    possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/*eslint-disable func-style, no-var */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	/*eslint-enable func-style, no-var */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};exports.isArray = isArray;

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;

	// TODO: Remove this line and break up compilePartial

	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _import = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(3);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(1);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
	          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
	      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _Exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      return templateSpec[i];
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      depths = options.depths ? [context].concat(options.depths) : [context];
	    }

	    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _Exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _Exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
	  }
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    partial = options.partials[options.name];
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;

	  if (partial === undefined) {
	    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;
	/*global window */

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (typeof obj === "object" && obj !== null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ }
/******/ ])
});
;;/****lib/taffy-min.js****/
var TAFFY,exports,T;(function(){var f,q,p,t,d,b,n,m,r,e,c,u,w,v,h,g,j,o,i,l,a,s,k;if(!TAFFY){d="2.7";b=1;n="000000";m=1000;r={};e=function(x){if(TAFFY.isArray(x)||TAFFY.isObject(x)){return x}else{return JSON.parse(x)}};i=function(y,x){return l(y,function(z){return x.indexOf(z)>=0})};l=function(A,z,y){var x=[];if(A==null){return x}if(Array.prototype.filter&&A.filter===Array.prototype.filter){return A.filter(z,y)}c(A,function(D,B,C){if(z.call(y,D,B,C)){x[x.length]=D}});return x};k=function(x){return Object.prototype.toString.call(x)==="[object RegExp]"};s=function(z){var x=T.isArray(z)?[]:T.isObject(z)?{}:null;if(z===null){return z}for(var y in z){x[y]=k(z[y])?z[y].toString():T.isArray(z[y])||T.isObject(z[y])?s(z[y]):z[y]}return x};a=function(y){var x=JSON.stringify(y);if(x.match(/regex/)===null){return x}return JSON.stringify(s(y))};c=function(B,A,C){var E,D,z,F;if(B&&((T.isArray(B)&&B.length===1)||(!T.isArray(B)))){A((T.isArray(B))?B[0]:B,0)}else{for(E,D,z=0,B=(T.isArray(B))?B:[B],F=B.length;z<F;z++){D=B[z];if(!T.isUndefined(D)||(C||false)){E=A(D,z);if(E===T.EXIT){break}}}}};u=function(C,z){var y=0,B,A;for(A in C){if(C.hasOwnProperty(A)){B=z(C[A],A,y++);if(B===T.EXIT){break}}}};r.extend=function(x,y){r[x]=function(){return y.apply(this,arguments)}};w=function(y){var x;if(T.isString(y)&&/[t][0-9]*[r][0-9]*/i.test(y)){return true}if(T.isObject(y)&&y.___id&&y.___s){return true}if(T.isArray(y)){x=true;c(y,function(z){if(!w(z)){x=false;return TAFFY.EXIT}});return x}return false};h=function(z,y){var x=true;c(y,function(A){switch(T.typeOf(A)){case"function":if(!A.apply(z)){x=false;return TAFFY.EXIT}break;case"array":x=(A.length===1)?(h(z,A[0])):(A.length===2)?(h(z,A[0])||h(z,A[1])):(A.length===3)?(h(z,A[0])||h(z,A[1])||h(z,A[2])):(A.length===4)?(h(z,A[0])||h(z,A[1])||h(z,A[2])||h(z,A[3])):false;if(A.length>4){c(A,function(B){if(h(z,B)){x=true}})}break}});return x};v=function(y){var x=[];if(T.isString(y)&&/[t][0-9]*[r][0-9]*/i.test(y)){y={___id:y}}if(T.isArray(y)){c(y,function(z){x.push(v(z))});y=function(){var A=this,z=false;c(x,function(B){if(h(A,B)){z=true}});return z};return y}if(T.isObject(y)){if(T.isObject(y)&&y.___id&&y.___s){y={___id:y.___id}}u(y,function(z,A){if(!T.isObject(z)){z={is:z}}u(z,function(B,C){var E=[],D;D=(C==="hasAll")?function(F,G){G(F)}:c;D(B,function(G){var F=true,H=false,I;I=function(){var N=this[A],M="==",O="!=",Q="===",R="<",L=">",S="<=",P=">=",K="!==",J;if(typeof N==="undefined"){return false}if((C.indexOf("!")===0)&&C!==O&&C!==K){F=false;C=C.substring(1,C.length)}J=((C==="regex")?(G.test(N)):(C==="lt"||C===R)?(N<G):(C==="gt"||C===L)?(N>G):(C==="lte"||C===S)?(N<=G):(C==="gte"||C===P)?(N>=G):(C==="left")?(N.indexOf(G)===0):(C==="leftnocase")?(N.toLowerCase().indexOf(G.toLowerCase())===0):(C==="right")?(N.substring((N.length-G.length))===G):(C==="rightnocase")?(N.toLowerCase().substring((N.length-G.length))===G.toLowerCase()):(C==="like")?(N.indexOf(G)>=0):(C==="likenocase")?(N.toLowerCase().indexOf(G.toLowerCase())>=0):(C===Q||C==="is")?(N===G):(C===M)?(N==G):(C===K)?(N!==G):(C===O)?(N!=G):(C==="isnocase")?(N.toLowerCase?N.toLowerCase()===G.toLowerCase():N===G):(C==="has")?(T.has(N,G)):(C==="hasall")?(T.hasAll(N,G)):(C==="contains")?(TAFFY.isArray(N)&&N.indexOf(G)>-1):(C.indexOf("is")===-1&&!TAFFY.isNull(N)&&!TAFFY.isUndefined(N)&&!TAFFY.isObject(G)&&!TAFFY.isArray(G))?(G===N[C]):(T[C]&&T.isFunction(T[C])&&C.indexOf("is")===0)?T[C](N)===G:(T[C]&&T.isFunction(T[C]))?T[C](N,G):(false));J=(J&&!F)?false:(!J&&!F)?true:J;return J};E.push(I)});if(E.length===1){x.push(E[0])}else{x.push(function(){var G=this,F=false;c(E,function(H){if(H.apply(G)){F=true}});return F})}})});y=function(){var A=this,z=true;z=(x.length===1&&!x[0].apply(A))?false:(x.length===2&&(!x[0].apply(A)||!x[1].apply(A)))?false:(x.length===3&&(!x[0].apply(A)||!x[1].apply(A)||!x[2].apply(A)))?false:(x.length===4&&(!x[0].apply(A)||!x[1].apply(A)||!x[2].apply(A)||!x[3].apply(A)))?false:true;if(x.length>4){c(x,function(B){if(!h(A,B)){z=false}})}return z};return y}if(T.isFunction(y)){return y}};j=function(x,y){var z=function(B,A){var C=0;T.each(y,function(F){var H,E,D,I,G;H=F.split(" ");E=H[0];D=(H.length===1)?"logical":H[1];if(D==="logical"){I=g(B[E]);G=g(A[E]);T.each((I.length<=G.length)?I:G,function(J,K){if(I[K]<G[K]){C=-1;return TAFFY.EXIT}else{if(I[K]>G[K]){C=1;return TAFFY.EXIT}}})}else{if(D==="logicaldesc"){I=g(B[E]);G=g(A[E]);T.each((I.length<=G.length)?I:G,function(J,K){if(I[K]>G[K]){C=-1;return TAFFY.EXIT}else{if(I[K]<G[K]){C=1;return TAFFY.EXIT}}})}else{if(D==="asec"&&B[E]<A[E]){C=-1;return T.EXIT}else{if(D==="asec"&&B[E]>A[E]){C=1;return T.EXIT}else{if(D==="desc"&&B[E]>A[E]){C=-1;return T.EXIT}else{if(D==="desc"&&B[E]<A[E]){C=1;return T.EXIT}}}}}}if(C===0&&D==="logical"&&I.length<G.length){C=-1}else{if(C===0&&D==="logical"&&I.length>G.length){C=1}else{if(C===0&&D==="logicaldesc"&&I.length>G.length){C=-1}else{if(C===0&&D==="logicaldesc"&&I.length<G.length){C=1}}}}if(C!==0){return T.EXIT}});return C};return(x&&x.push)?x.sort(z):x};(function(){var x={},y=0;g=function(z){if(y>m){x={};y=0}return x["_"+z]||(function(){var D=String(z),C=[],G="_",B="",A,E,F;for(A=0,E=D.length;A<E;A++){F=D.charCodeAt(A);if((F>=48&&F<=57)||F===46){if(B!=="n"){B="n";C.push(G.toLowerCase());G=""}G=G+D.charAt(A)}else{if(B!=="s"){B="s";C.push(parseFloat(G));G=""}G=G+D.charAt(A)}}C.push((B==="n")?parseFloat(G):G.toLowerCase());C.shift();x["_"+z]=C;y++;return C}())}}());o=function(){this.context({results:this.getDBI().query(this.context())})};r.extend("filter",function(){var y=TAFFY.mergeObj(this.context(),{run:null}),x=[];c(y.q,function(z){x.push(z)});y.q=x;c(arguments,function(z){y.q.push(v(z));y.filterRaw.push(z)});return this.getroot(y)});r.extend("order",function(z){z=z.split(",");var y=[],A;c(z,function(x){y.push(x.replace(/^\s*/,"").replace(/\s*$/,""))});A=TAFFY.mergeObj(this.context(),{sort:null});A.order=y;return this.getroot(A)});r.extend("limit",function(z){var y=TAFFY.mergeObj(this.context(),{}),x;y.limit=z;if(y.run&&y.sort){x=[];c(y.results,function(B,A){if((A+1)>z){return TAFFY.EXIT}x.push(B)});y.results=x}return this.getroot(y)});r.extend("start",function(z){var y=TAFFY.mergeObj(this.context(),{}),x;y.start=z;if(y.run&&y.sort&&!y.limit){x=[];c(y.results,function(B,A){if((A+1)>z){x.push(B)}});y.results=x}else{y=TAFFY.mergeObj(this.context(),{run:null,start:z})}return this.getroot(y)});r.extend("update",function(A,z,x){var B=true,D={},y=arguments,C;if(TAFFY.isString(A)&&(arguments.length===2||arguments.length===3)){D[A]=z;if(arguments.length===3){B=x}}else{D=A;if(y.length===2){B=z}}C=this;o.call(this);c(this.context().results,function(E){var F=D;if(TAFFY.isFunction(F)){F=F.apply(TAFFY.mergeObj(E,{}))}else{if(T.isFunction(F)){F=F(TAFFY.mergeObj(E,{}))}}if(TAFFY.isObject(F)){C.getDBI().update(E.___id,F,B)}});if(this.context().results.length){this.context({run:null})}return this});r.extend("remove",function(x){var y=this,z=0;o.call(this);c(this.context().results,function(A){y.getDBI().remove(A.___id);z++});if(this.context().results.length){this.context({run:null});y.getDBI().removeCommit(x)}return z});r.extend("count",function(){o.call(this);return this.context().results.length});r.extend("callback",function(z,x){if(z){var y=this;setTimeout(function(){o.call(y);z.call(y.getroot(y.context()))},x||0)}return null});r.extend("get",function(){o.call(this);return this.context().results});r.extend("stringify",function(){return JSON.stringify(this.get())});r.extend("first",function(){o.call(this);return this.context().results[0]||false});r.extend("last",function(){o.call(this);return this.context().results[this.context().results.length-1]||false});r.extend("sum",function(){var y=0,x=this;o.call(x);c(arguments,function(z){c(x.context().results,function(A){y=y+(A[z]||0)})});return y});r.extend("min",function(y){var x=null;o.call(this);c(this.context().results,function(z){if(x===null||z[y]<x){x=z[y]}});return x});(function(){var x=(function(){var A,y,z;A=function(E,G,D){var C,F,H,B;if(D.length===2){C=E[D[0]];H="===";F=G[D[1]]}else{C=E[D[0]];H=D[1];F=G[D[2]]}switch(H){case"===":return C===F;case"!==":return C!==F;case"<":return C<F;case">":return C>F;case"<=":return C<=F;case">=":return C>=F;case"==":return C==F;case"!=":return C!=F;default:throw String(H)+" is not supported"}};y=function(C,F){var B={},D,E;for(D in C){if(C.hasOwnProperty(D)){B[D]=C[D]}}for(D in F){if(F.hasOwnProperty(D)&&D!=="___id"&&D!=="___s"){E=!TAFFY.isUndefined(B[D])?"right_":"";B[E+String(D)]=F[D]}}return B};z=function(F){var B,D,C=arguments,E=C.length,G=[];if(typeof F.filter!=="function"){if(F.TAFFY){B=F()}else{throw"TAFFY DB or result not supplied"}}else{B=F}this.context({results:this.getDBI().query(this.context())});TAFFY.each(this.context().results,function(H){B.each(function(K){var I,J=true;CONDITION:for(D=1;D<E;D++){I=C[D];if(typeof I==="function"){J=I(H,K)}else{if(typeof I==="object"&&I.length){J=A(H,K,I)}else{J=false}}if(!J){break CONDITION}}if(J){G.push(y(H,K))}})});return TAFFY(G)()};return z}());r.extend("join",x)}());r.extend("max",function(y){var x=null;o.call(this);c(this.context().results,function(z){if(x===null||z[y]>x){x=z[y]}});return x});r.extend("select",function(){var y=[],x=arguments;o.call(this);if(arguments.length===1){c(this.context().results,function(z){y.push(z[x[0]])})}else{c(this.context().results,function(z){var A=[];c(x,function(B){A.push(z[B])});y.push(A)})}return y});r.extend("distinct",function(){var y=[],x=arguments;o.call(this);if(arguments.length===1){c(this.context().results,function(A){var z=A[x[0]],B=false;c(y,function(C){if(z===C){B=true;return TAFFY.EXIT}});if(!B){y.push(z)}})}else{c(this.context().results,function(z){var B=[],A=false;c(x,function(C){B.push(z[C])});c(y,function(D){var C=true;c(x,function(F,E){if(B[E]!==D[E]){C=false;return TAFFY.EXIT}});if(C){A=true;return TAFFY.EXIT}});if(!A){y.push(B)}})}return y});r.extend("supplant",function(y,x){var z=[];o.call(this);c(this.context().results,function(A){z.push(y.replace(/\{([^\{\}]*)\}/g,function(C,B){var D=A[B];return typeof D==="string"||typeof D==="number"?D:C}))});return(!x)?z.join(""):z});r.extend("each",function(x){o.call(this);c(this.context().results,x);return this});r.extend("map",function(x){var y=[];o.call(this);c(this.context().results,function(z){y.push(x(z))});return y});T=function(F){var C=[],G={},D=1,z={template:false,onInsert:false,onUpdate:false,onRemove:false,onDBChange:false,storageName:false,forcePropertyCase:null,cacheSize:100,name:""},B=new Date(),A=0,y=0,I={},E,x,H;x=function(L){var K=[],J=false;if(L.length===0){return C}c(L,function(M){if(T.isString(M)&&/[t][0-9]*[r][0-9]*/i.test(M)&&C[G[M]]){K.push(C[G[M]]);J=true}if(T.isObject(M)&&M.___id&&M.___s&&C[G[M.___id]]){K.push(C[G[M.___id]]);J=true}if(T.isArray(M)){c(M,function(N){c(x(N),function(O){K.push(O)})})}});if(J&&K.length>1){K=[]}return K};E={dm:function(J){if(J){B=J;I={};A=0;y=0}if(z.onDBChange){setTimeout(function(){z.onDBChange.call(C)},0)}if(z.storageName){setTimeout(function(){localStorage.setItem("taffy_"+z.storageName,JSON.stringify(C))})}return B},insert:function(M,N){var L=[],K=[],J=e(M);c(J,function(P,Q){var O,R;if(T.isArray(P)&&Q===0){c(P,function(S){L.push((z.forcePropertyCase==="lower")?S.toLowerCase():(z.forcePropertyCase==="upper")?S.toUpperCase():S)});return true}else{if(T.isArray(P)){O={};c(P,function(U,S){O[L[S]]=U});P=O}else{if(T.isObject(P)&&z.forcePropertyCase){R={};u(P,function(U,S){R[(z.forcePropertyCase==="lower")?S.toLowerCase():(z.forcePropertyCase==="upper")?S.toUpperCase():S]=P[S]});P=R}}}D++;P.___id="T"+String(n+b).slice(-6)+"R"+String(n+D).slice(-6);P.___s=true;K.push(P.___id);if(z.template){P=T.mergeObj(z.template,P)}C.push(P);G[P.___id]=C.length-1;if(z.onInsert&&(N||TAFFY.isUndefined(N))){z.onInsert.call(P)}E.dm(new Date())});return H(K)},sort:function(J){C=j(C,J.split(","));G={};c(C,function(L,K){G[L.___id]=K});E.dm(new Date());return true},update:function(Q,M,L){var P={},O,N,J,K;if(z.forcePropertyCase){u(M,function(R,S){P[(z.forcePropertyCase==="lower")?S.toLowerCase():(z.forcePropertyCase==="upper")?S.toUpperCase():S]=R});M=P}O=C[G[Q]];N=T.mergeObj(O,M);J={};K=false;u(N,function(R,S){if(TAFFY.isUndefined(O[S])||O[S]!==R){J[S]=R;K=true}});if(K){if(z.onUpdate&&(L||TAFFY.isUndefined(L))){z.onUpdate.call(N,C[G[Q]],J)}C[G[Q]]=N;E.dm(new Date())}},remove:function(J){C[G[J]].___s=false},removeCommit:function(K){var J;for(J=C.length-1;J>-1;J--){if(!C[J].___s){if(z.onRemove&&(K||TAFFY.isUndefined(K))){z.onRemove.call(C[J])}G[C[J].___id]=undefined;C.splice(J,1)}}G={};c(C,function(M,L){G[M.___id]=L});E.dm(new Date())},query:function(L){var O,P,K,N,M,J;if(z.cacheSize){P="";c(L.filterRaw,function(Q){if(T.isFunction(Q)){P="nocache";return TAFFY.EXIT}});if(P===""){P=a(T.mergeObj(L,{q:false,run:false,sort:false}))}}if(!L.results||!L.run||(L.run&&E.dm()>L.run)){K=[];if(z.cacheSize&&I[P]){I[P].i=A++;return I[P].results}else{if(L.q.length===0&&L.index.length===0){c(C,function(Q){K.push(Q)});O=K}else{N=x(L.index);c(N,function(Q){if(L.q.length===0||h(Q,L.q)){K.push(Q)}});O=K}}}else{O=L.results}if(L.order.length>0&&(!L.run||!L.sort)){O=j(O,L.order)}if(O.length&&((L.limit&&L.limit<O.length)||L.start)){M=[];c(O,function(R,Q){if(!L.start||(L.start&&(Q+1)>=L.start)){if(L.limit){J=(L.start)?(Q+1)-L.start:Q;if(J<L.limit){M.push(R)}else{if(J>L.limit){return TAFFY.EXIT}}}else{M.push(R)}}});O=M}if(z.cacheSize&&P!=="nocache"){y++;setTimeout(function(){var Q,R;if(y>=z.cacheSize*2){y=0;Q=A-z.cacheSize;R={};u(function(U,S){if(U.i>=Q){R[S]=U}});I=R}},0);I[P]={i:A++,results:O}}return O}};H=function(){var K,J;K=TAFFY.mergeObj(TAFFY.mergeObj(r,{insert:undefined}),{getDBI:function(){return E},getroot:function(L){return H.call(L)},context:function(L){if(L){J=TAFFY.mergeObj(J,L.hasOwnProperty("results")?TAFFY.mergeObj(L,{run:new Date(),sort:new Date()}):L)}return J},extend:undefined});J=(this&&this.q)?this:{limit:false,start:false,q:[],filterRaw:[],index:[],order:[],results:false,run:null,sort:null,settings:z};c(arguments,function(L){if(w(L)){J.index.push(L)}else{J.q.push(v(L))}J.filterRaw.push(L)});return K};b++;if(F){E.insert(F)}H.insert=E.insert;H.merge=function(M,L,N){var K={},J=[],O={};N=N||false;L=L||"id";c(M,function(Q){var P;K[L]=Q[L];J.push(Q[L]);P=H(K).first();if(P){E.update(P.___id,Q,N)}else{E.insert(Q,N)}});O[L]=J;return H(O)};H.TAFFY=true;H.sort=E.sort;H.settings=function(J){if(J){z=TAFFY.mergeObj(z,J);if(J.template){H().update(J.template)}}return z};H.store=function(L){var K=false,J;if(localStorage){if(L){J=localStorage.getItem("taffy_"+L);if(J&&J.length>0){H.insert(J);K=true}if(C.length>0){setTimeout(function(){localStorage.setItem("taffy_"+z.storageName,JSON.stringify(C))})}}H.settings({storageName:L})}return H};return H};TAFFY=T;T.each=c;T.eachin=u;T.extend=r.extend;TAFFY.EXIT="TAFFYEXIT";TAFFY.mergeObj=function(z,x){var y={};u(z,function(A,B){y[B]=z[B]});u(x,function(A,B){y[B]=x[B]});return y};TAFFY.has=function(z,y){var x=false,A;if((z.TAFFY)){x=z(y);if(x.length>0){return true}else{return false}}else{switch(T.typeOf(z)){case"object":if(T.isObject(y)){u(y,function(B,C){if(x===true&&!T.isUndefined(z[C])&&z.hasOwnProperty(C)){x=T.has(z[C],y[C])}else{x=false;return TAFFY.EXIT}})}else{if(T.isArray(y)){c(y,function(B,C){x=T.has(z,y[C]);if(x){return TAFFY.EXIT}})}else{if(T.isString(y)){if(!TAFFY.isUndefined(z[y])){return true}else{return false}}}}return x;case"array":if(T.isObject(y)){c(z,function(B,C){x=T.has(z[C],y);if(x===true){return TAFFY.EXIT}})}else{if(T.isArray(y)){c(y,function(C,B){c(z,function(E,D){x=T.has(z[D],y[B]);if(x===true){return TAFFY.EXIT}});if(x===true){return TAFFY.EXIT}})}else{if(T.isString(y)||T.isNumber(y)){x=false;for(A=0;A<z.length;A++){x=T.has(z[A],y);if(x){return true}}}}}return x;case"string":if(T.isString(y)&&y===z){return true}break;default:if(T.typeOf(z)===T.typeOf(y)&&z===y){return true}break}}return false};TAFFY.hasAll=function(A,z){var y=TAFFY,x;if(y.isArray(z)){x=true;c(z,function(B){x=y.has(A,B);if(x===false){return TAFFY.EXIT}});return x}else{return y.has(A,z)}};TAFFY.typeOf=function(x){var y=typeof x;if(y==="object"){if(x){if(typeof x.length==="number"&&!(x.propertyIsEnumerable("length"))){y="array"}}else{y="null"}}return y};TAFFY.getObjectKeys=function(x){var y=[];u(x,function(A,z){y.push(z)});y.sort();return y};TAFFY.isSameArray=function(y,x){return(TAFFY.isArray(y)&&TAFFY.isArray(x)&&y.join(",")===x.join(","))?true:false};TAFFY.isSameObject=function(A,y){var x=TAFFY,z=true;if(x.isObject(A)&&x.isObject(y)){if(x.isSameArray(x.getObjectKeys(A),x.getObjectKeys(y))){u(A,function(B,C){if(!((x.isObject(A[C])&&x.isObject(y[C])&&x.isSameObject(A[C],y[C]))||(x.isArray(A[C])&&x.isArray(y[C])&&x.isSameArray(A[C],y[C]))||(A[C]===y[C]))){z=false;return TAFFY.EXIT}})}else{z=false}}else{z=false}return z};f=["String","Number","Object","Array","Boolean","Null","Function","Undefined"];q=function(x){return function(y){return TAFFY.typeOf(y)===x.toLowerCase()?true:false}};for(p=0;p<f.length;p++){t=f[p];TAFFY["is"+t]=q(t)}}}());if(typeof(exports)==="object"){exports.taffy=TAFFY};
;/****lib/bean.min.js****/
/*!
  * Bean - copyright (c) Jacob Thornton 2011-2012
  * https://github.com/fat/bean
  * MIT license
  */
(function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n():typeof define=="function"&&define.amd?define(n):t[e]=n()})("bean",this,function(e,t){e=e||"bean",t=t||this;var n=window,r=t[e],i=/[^\.]*(?=\..*)\.|.*/,s=/\..*/,o="addEventListener",u="removeEventListener",a=document||{},f=a.documentElement||{},l=f[o],c=l?o:"attachEvent",h={},p=Array.prototype.slice,d=function(e,t){return e.split(t||" ")},v=function(e){return typeof e=="string"},m=function(e){return typeof e=="function"},g="click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll ",y="show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend textinputreadystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ",b=function(e,t,n){for(n=0;n<t.length;n++)t[n]&&(e[t[n]]=1);return e}({},d(g+(l?y:""))),w=function(){var e="compareDocumentPosition"in f?function(e,t){return t.compareDocumentPosition&&(t.compareDocumentPosition(e)&16)===16}:"contains"in f?function(e,t){return t=t.nodeType===9||t===window?f:t,t!==e&&t.contains(e)}:function(e,t){while(e=e.parentNode)if(e===t)return 1;return 0},t=function(t){var n=t.relatedTarget;return n?n!==this&&n.prefix!=="xul"&&!/document/.test(this.toString())&&!e(n,this):n==null};return{mouseenter:{base:"mouseover",condition:t},mouseleave:{base:"mouseout",condition:t},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}}}(),E=function(){var e=d("altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which propertyName"),t=e.concat(d("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement")),r=t.concat(d("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis")),i=e.concat(d("char charCode key keyCode keyIdentifier keyLocation location")),s=e.concat(d("data")),o=e.concat(d("touches targetTouches changedTouches scale rotation")),u=e.concat(d("data origin source")),l=e.concat(d("state")),c=/over|out/,h=[{reg:/key/i,fix:function(e,t){return t.keyCode=e.keyCode||e.which,i}},{reg:/click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,fix:function(e,n,r){n.rightClick=e.which===3||e.button===2,n.pos={x:0,y:0};if(e.pageX||e.pageY)n.clientX=e.pageX,n.clientY=e.pageY;else if(e.clientX||e.clientY)n.clientX=e.clientX+a.body.scrollLeft+f.scrollLeft,n.clientY=e.clientY+a.body.scrollTop+f.scrollTop;return c.test(r)&&(n.relatedTarget=e.relatedTarget||e[(r=="mouseover"?"from":"to")+"Element"]),t}},{reg:/mouse.*(wheel|scroll)/i,fix:function(){return r}},{reg:/^text/i,fix:function(){return s}},{reg:/^touch|^gesture/i,fix:function(){return o}},{reg:/^message$/i,fix:function(){return u}},{reg:/^popstate$/i,fix:function(){return l}},{reg:/.*/,fix:function(){return e}}],p={},v=function(e,t,r){if(!arguments.length)return;e=e||((t.ownerDocument||t.document||t).parentWindow||n).event,this.originalEvent=e,this.isNative=r,this.isBean=!0;if(!e)return;var i=e.type,s=e.target||e.srcElement,o,u,a,f,l;this.target=s&&s.nodeType===3?s.parentNode:s;if(r){l=p[i];if(!l)for(o=0,u=h.length;o<u;o++)if(h[o].reg.test(i)){p[i]=l=h[o].fix;break}f=l(e,this,i);for(o=f.length;o--;)!((a=f[o])in this)&&a in e&&(this[a]=e[a])}};return v.prototype.preventDefault=function(){this.originalEvent.preventDefault?this.originalEvent.preventDefault():this.originalEvent.returnValue=!1},v.prototype.stopPropagation=function(){this.originalEvent.stopPropagation?this.originalEvent.stopPropagation():this.originalEvent.cancelBubble=!0},v.prototype.stop=function(){this.preventDefault(),this.stopPropagation(),this.stopped=!0},v.prototype.stopImmediatePropagation=function(){this.originalEvent.stopImmediatePropagation&&this.originalEvent.stopImmediatePropagation(),this.isImmediatePropagationStopped=function(){return!0}},v.prototype.isImmediatePropagationStopped=function(){return this.originalEvent.isImmediatePropagationStopped&&this.originalEvent.isImmediatePropagationStopped()},v.prototype.clone=function(e){var t=new v(this,this.element,this.isNative);return t.currentTarget=e,t},v}(),S=function(e,t){return!l&&!t&&(e===a||e===n)?f:e},x=function(){var e=function(e,t,n,r){var i=function(n,i){return t.apply(e,r?p.call(i,n?0:1).concat(r):i)},s=function(n,r){return t.__beanDel?t.__beanDel.ft(n.target,e):r},o=n?function(e){var t=s(e,this);if(n.apply(t,arguments))return e&&(e.currentTarget=t),i(e,arguments)}:function(e){return t.__beanDel&&(e=e.clone(s(e))),i(e,arguments)};return o.__beanDel=t.__beanDel,o},t=function(t,n,r,i,s,o,u){var a=w[n],f;n=="unload"&&(r=A(O,t,n,r,i)),a&&(a.condition&&(r=e(t,r,a.condition,o)),n=a.base||n),this.isNative=f=b[n]&&!!t[c],this.customType=!l&&!f&&n,this.element=t,this.type=n,this.original=i,this.namespaces=s,this.eventType=l||f?n:"propertychange",this.target=S(t,f),this[c]=!!this.target[c],this.root=u,this.handler=e(t,r,null,o)};return t.prototype.inNamespaces=function(e){var t,n,r=0;if(!e)return!0;if(!this.namespaces)return!1;for(t=e.length;t--;)for(n=this.namespaces.length;n--;)e[t]==this.namespaces[n]&&r++;return e.length===r},t.prototype.matches=function(e,t,n){return this.element===e&&(!t||this.original===t)&&(!n||this.handler===n)},t}(),T=function(){var e={},t=function(n,r,i,s,o,u){var a=o?"r":"$";if(!r||r=="*")for(var f in e)f.charAt(0)==a&&t(n,f.substr(1),i,s,o,u);else{var l=0,c,h=e[a+r],p=n=="*";if(!h)return;for(c=h.length;l<c;l++)if((p||h[l].matches(n,i,s))&&!u(h[l],h,l,r))return}},n=function(t,n,r,i){var s,o=e[(i?"r":"$")+n];if(o)for(s=o.length;s--;)if(!o[s].root&&o[s].matches(t,r,null))return!0;return!1},r=function(e,n,r,i){var s=[];return t(e,n,r,null,i,function(e){return s.push(e)}),s},i=function(t){var n=!t.root&&!this.has(t.element,t.type,null,!1),r=(t.root?"r":"$")+t.type;return(e[r]||(e[r]=[])).push(t),n},s=function(n){t(n.element,n.type,null,n.handler,n.root,function(t,n,r){return n.splice(r,1),t.removed=!0,n.length===0&&delete e[(t.root?"r":"$")+t.type],!1})},o=function(){var t,n=[];for(t in e)t.charAt(0)=="$"&&(n=n.concat(e[t]));return n};return{has:n,get:r,put:i,del:s,entries:o}}(),N,C=function(e){arguments.length?N=e:N=a.querySelectorAll?function(e,t){return t.querySelectorAll(e)}:function(){throw new Error("Bean: No selector engine installed")}},k=function(e,t){if(!l&&t&&e&&e.propertyName!="_on"+t)return;var n=T.get(this,t||e.type,null,!1),r=n.length,i=0;e=new E(e,this,!0),t&&(e.type=t);for(;i<r&&!e.isImmediatePropagationStopped();i++)n[i].removed||n[i].handler.call(this,e)},L=l?function(e,t,n){e[n?o:u](t,k,!1)}:function(e,t,n,r){var i;n?(T.put(i=new x(e,r||t,function(t){k.call(e,t,r)},k,null,null,!0)),r&&e["_on"+r]==null&&(e["_on"+r]=0),i.target.attachEvent("on"+i.eventType,i.handler)):(i=T.get(e,r||t,k,!0)[0],i&&(i.target.detachEvent("on"+i.eventType,i.handler),T.del(i)))},A=function(e,t,n,r,i){return function(){r.apply(this,arguments),e(t,n,i)}},O=function(e,t,n,r){var i=t&&t.replace(s,""),o=T.get(e,i,null,!1),u={},a,f;for(a=0,f=o.length;a<f;a++)(!n||o[a].original===n)&&o[a].inNamespaces(r)&&(T.del(o[a]),!u[o[a].eventType]&&o[a][c]&&(u[o[a].eventType]={t:o[a].eventType,c:o[a].type}));for(a in u)T.has(e,u[a].t,null,!1)||L(e,u[a].t,!1,u[a].c)},M=function(e,t){var n=function(t,n){var r,i=v(e)?N(e,n):e;for(;t&&t!==n;t=t.parentNode)for(r=i.length;r--;)if(i[r]===t)return t},r=function(e){var r=n(e.target,this);r&&t.apply(r,arguments)};return r.__beanDel={ft:n,selector:e},r},_=l?function(e,t,r){var i=a.createEvent(e?"HTMLEvents":"UIEvents");i[e?"initEvent":"initUIEvent"](t,!0,!0,n,1),r.dispatchEvent(i)}:function(e,t,n){n=S(n,e),e?n.fireEvent("on"+t,a.createEventObject()):n["_on"+t]++},D=function(e,t,n){var r=v(t),o,u,a,f;if(r&&t.indexOf(" ")>0){t=d(t);for(f=t.length;f--;)D(e,t[f],n);return e}u=r&&t.replace(s,""),u&&w[u]&&(u=w[u].base);if(!t||r){if(a=r&&t.replace(i,""))a=d(a,".");O(e,u,n,a)}else if(m(t))O(e,null,t);else for(o in t)t.hasOwnProperty(o)&&D(e,o,t[o]);return e},P=function(e,t,n,r){var o,u,a,f,l,v,g;if(n===undefined&&typeof t=="object"){for(u in t)t.hasOwnProperty(u)&&P.call(this,e,u,t[u]);return}m(n)?(l=p.call(arguments,3),r=o=n):(o=r,l=p.call(arguments,4),r=M(n,o,N)),a=d(t),this===h&&(r=A(D,e,t,r,o));for(f=a.length;f--;)g=T.put(v=new x(e,a[f].replace(s,""),r,o,d(a[f].replace(i,""),"."),l,!1)),v[c]&&g&&L(e,v.eventType,!0,v.customType);return e},H=function(e,t,n,r){return P.apply(null,v(n)?[e,n,t,r].concat(arguments.length>3?p.call(arguments,5):[]):p.call(arguments))},B=function(){return P.apply(h,arguments)},j=function(e,t,n){var r=d(t),o,u,a,f,l;for(o=r.length;o--;){t=r[o].replace(s,"");if(f=r[o].replace(i,""))f=d(f,".");if(!f&&!n&&e[c])_(b[t],t,e);else{l=T.get(e,t,null,!1),n=[!1].concat(n);for(u=0,a=l.length;u<a;u++)l[u].inNamespaces(f)&&l[u].handler.apply(e,n)}}return e},F=function(e,t,n){var r=T.get(t,n,null,!1),i=r.length,s=0,o,u;for(;s<i;s++)r[s].original&&(o=[e,r[s].type],(u=r[s].handler.__beanDel)&&o.push(u.selector),o.push(r[s].original),P.apply(null,o));return e},I={on:P,add:H,one:B,off:D,remove:D,clone:F,fire:j,Event:E,setSelectorEngine:C,noConflict:function(){return t[e]=r,this}};if(n.attachEvent){var q=function(){var e,t=T.entries();for(e in t)t[e].type&&t[e].type!=="unload"&&D(t[e].element,t[e].type);n.detachEvent("onunload",q),n.CollectGarbage&&n.CollectGarbage()};n.attachEvent("onunload",q)}return C(),I});/****lib/drag.min.js****/
/*!
  * drag.js - copyright Jake Luer 2011
  * https://github.com/jakeluer/drag.js
  * MIT License
  */
!function(a,b){"undefined"==typeof bean&&(bean=require("bean"));var c=bean,d=getComputedStyle||currentStyle,e="ontouchstart"in b.documentElement?!0:!1;drag=function(a){return new Drag(drag.select(a))},drag.select=function(a){return"string"==typeof a?document.getElementById(a)||document.querySelectorAll(a)[0]:a},drag.value=function(a,b,c){if(!c)return parseFloat(d(a).getPropertyValue(b));a.style[b]=c},drag.evs=function(){return e?{start:"touchstart",move:"touchmove",end:"touchend"}:{start:"mousedown",move:"mousemove",end:"mouseup"}}(),Drag=function g(a){return this instanceof g?(this.el=a,this._axis="both",this._start=[],this._dragging=[],this._end=[],this.pos={},this):new g(a)},Drag.prototype.current=function(a){return drag.value(this.el,a)},Drag.prototype.axis=function(a){if(a=="x"||a=="y"||a=="both")this._axis=a;return this},Drag.prototype.container=function(a){return this._container=drag.select(a),this},Drag.prototype.handle=function(a){return this._handle=drag.select(a),this},Drag.prototype.start=function(a){return a&&"function"==typeof a&&this._start.push(a),this},Drag.prototype.dragging=function(a){return a&&"function"==typeof a&&this._dragging.push(a),this},Drag.prototype.end=function(a){return a&&"function"==typeof a&&this._end.push(a),this},Drag.prototype.getPos=function(a){return this.pos.x=this.current("left"),this.pos.y=this.current("top"),a&&"function"==typeof a&&a.apply(this),this},Drag.prototype.bind=function(){var a=this;return this.unbind(),this._eventHandler=function(d){var f=a.current("left"),g=a.current("top"),h=function(b){var c,h,i,j;e?d.touches.length==1&&(c=b.touches[0].clientX-d.touches[0].clientX,h=b.touches[0].clientY-d.touches[0].clientY):(c=b.clientX-d.clientX,h=b.clientY-d.clientY),i=f+c,j=g+h,a.pos.dX=i-a.current("left"),a.pos.dY=j-a.current("top");if(a._container){var k=a._container;i<0?i=0:i>=0&&(maxX=drag.value(k,"padding-left")+drag.value(k,"width")+drag.value(k,"padding-right")-(drag.value(a.el,"margin-left")+drag.value(a.el,"border-left-width")+drag.value(a.el,"padding-left")+drag.value(a.el,"width")+drag.value(a.el,"padding-right")+drag.value(a.el,"border-right-width")+drag.value(a.el,"margin-right")),i>maxX&&(i=maxX)),j<0?j=0:j>=0&&(maxY=drag.value(k,"padding-top")+drag.value(k,"height")+drag.value(k,"padding-bottom")-(drag.value(a.el,"margin-top")+drag.value(a.el,"border-top-width")+drag.value(a.el,"padding-top")+drag.value(a.el,"height")+drag.value(a.el,"padding-bottom")+drag.value(a.el,"border-bottom-width")+drag.value(a.el,"margin-bottom")),j>maxY&&(j=maxY))}a._axis=="x"?drag.value(a.el,"left",i+"px"):a._axis=="y"?drag.value(a.el,"top",j+"px"):(drag.value(a.el,"left",i+"px"),drag.value(a.el,"top",j+"px")),a.getPos();for(var l in a._dragging)a._dragging[l].apply(a);b.preventDefault(),b.stopPropagation()},i=function(){c.remove(b,drag.evs.move,h),c.remove(b,drag.evs.end,j),c.remove(b,"selectstart",k),c.remove(a._handle,"dragstart",k)},j=function(b){for(var c in a._end)a._end[c].apply(a);i()},k=function(a){a.preventDefault(),a.stopPropagation()};for(var l in a._start)a._start[l].apply(a);b.body.focus(),c.add(b,"selectstart",k),c.add(a._handle,"dragstart",k),c.add(b,drag.evs.move,h),c.add(b,drag.evs.end,j)},this.getPos(),this._handle||(this._handle=this.el),c.add(this._handle,drag.evs.start,this._eventHandler),this},Drag.prototype.unbind=function(){return this._eventHandler?(c.remove(this.el,drag.evs.start,this._eventHandler),c.remove(this._handle,drag.evs.start,this._eventHandler),this):this};var f=a.drag;drag.noConflict=function(){return a.drag=f,this},typeof module!="undefined"&&module.exports&&(module.exports=drag),a.drag=drag}(this,document);/****lib/multiline.js****/
/*!
	multiline
	Multiline strings in JavaScript
	https://github.com/sindresorhus/multiline
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	// start matching after: comment start block => ! or @preserve => optional whitespace => newline
	// stop matching before: last newline => optional whitespace => comment end block
	var reCommentContents = /\/\*!?(?:\@preserve)?\s*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;

	var multiline = function (fn) {
		if (typeof fn !== 'function') {
			throw new TypeError('Expected a function.');
		}

		var match = reCommentContents.exec(fn.toString());

		if (!match) {
			throw new TypeError('Multiline comment missing.');
		}

		return match[1];
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = multiline;
	} else {
		window.multiline = multiline;
	}
})();
;/****lib/he.js****/
/*! https://mths.be/he v0.5.0 by @mathias | MIT license */
;
(function (root) {
	// Detect free variables `exports`.
	var freeExports = typeof exports == 'object' && exports;
	// Detect free variable `module`.
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}
	/*--------------------------------------------------------------------------*/
	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// http://whatwg.org/html/tokenization.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// http://whatwg.org/html/tokenization.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {
		'\xC1' : 'Aacute',
		'\xE1' : 'aacute',
		'\u0102' : 'Abreve',
		'\u0103' : 'abreve',
		'\u223E' : 'ac',
		'\u223F' : 'acd',
		'\u223E\u0333' : 'acE',
		'\xC2' : 'Acirc',
		'\xE2' : 'acirc',
		'\xB4' : 'acute',
		'\u0410' : 'Acy',
		'\u0430' : 'acy',
		'\xC6' : 'AElig',
		'\xE6' : 'aelig',
		'\u2061' : 'af',
		'\uD835\uDD04' : 'Afr',
		'\uD835\uDD1E' : 'afr',
		'\xC0' : 'Agrave',
		'\xE0' : 'agrave',
		'\u2135' : 'aleph',
		'\u0391' : 'Alpha',
		'\u03B1' : 'alpha',
		'\u0100' : 'Amacr',
		'\u0101' : 'amacr',
		'\u2A3F' : 'amalg',
		'&' : 'amp',
		'\u2A55' : 'andand',
		'\u2A53' : 'And',
		'\u2227' : 'and',
		'\u2A5C' : 'andd',
		'\u2A58' : 'andslope',
		'\u2A5A' : 'andv',
		'\u2220' : 'ang',
		'\u29A4' : 'ange',
		'\u29A8' : 'angmsdaa',
		'\u29A9' : 'angmsdab',
		'\u29AA' : 'angmsdac',
		'\u29AB' : 'angmsdad',
		'\u29AC' : 'angmsdae',
		'\u29AD' : 'angmsdaf',
		'\u29AE' : 'angmsdag',
		'\u29AF' : 'angmsdah',
		'\u2221' : 'angmsd',
		'\u221F' : 'angrt',
		'\u22BE' : 'angrtvb',
		'\u299D' : 'angrtvbd',
		'\u2222' : 'angsph',
		'\xC5' : 'angst',
		'\u237C' : 'angzarr',
		'\u0104' : 'Aogon',
		'\u0105' : 'aogon',
		'\uD835\uDD38' : 'Aopf',
		'\uD835\uDD52' : 'aopf',
		'\u2A6F' : 'apacir',
		'\u2248' : 'ap',
		'\u2A70' : 'apE',
		'\u224A' : 'ape',
		'\u224B' : 'apid',
		'\'' : 'apos',
		'\xE5' : 'aring',
		'\uD835\uDC9C' : 'Ascr',
		'\uD835\uDCB6' : 'ascr',
		'\u2254' : 'colone',
		'*' : 'ast',
		'\u224D' : 'CupCap',
		'\xC3' : 'Atilde',
		'\xE3' : 'atilde',
		'\xC4' : 'Auml',
		'\xE4' : 'auml',
		'\u2233' : 'awconint',
		'\u2A11' : 'awint',
		'\u224C' : 'bcong',
		'\u03F6' : 'bepsi',
		'\u2035' : 'bprime',
		'\u223D' : 'bsim',
		'\u22CD' : 'bsime',
		'\u2216' : 'setmn',
		'\u2AE7' : 'Barv',
		'\u22BD' : 'barvee',
		'\u2305' : 'barwed',
		'\u2306' : 'Barwed',
		'\u23B5' : 'bbrk',
		'\u23B6' : 'bbrktbrk',
		'\u0411' : 'Bcy',
		'\u0431' : 'bcy',
		'\u201E' : 'bdquo',
		'\u2235' : 'becaus',
		'\u29B0' : 'bemptyv',
		'\u212C' : 'Bscr',
		'\u0392' : 'Beta',
		'\u03B2' : 'beta',
		'\u2136' : 'beth',
		'\u226C' : 'twixt',
		'\uD835\uDD05' : 'Bfr',
		'\uD835\uDD1F' : 'bfr',
		'\u22C2' : 'xcap',
		'\u25EF' : 'xcirc',
		'\u22C3' : 'xcup',
		'\u2A00' : 'xodot',
		'\u2A01' : 'xoplus',
		'\u2A02' : 'xotime',
		'\u2A06' : 'xsqcup',
		'\u2605' : 'starf',
		'\u25BD' : 'xdtri',
		'\u25B3' : 'xutri',
		'\u2A04' : 'xuplus',
		'\u22C1' : 'Vee',
		'\u22C0' : 'Wedge',
		'\u290D' : 'rbarr',
		'\u29EB' : 'lozf',
		'\u25AA' : 'squf',
		'\u25B4' : 'utrif',
		'\u25BE' : 'dtrif',
		'\u25C2' : 'ltrif',
		'\u25B8' : 'rtrif',
		'\u2423' : 'blank',
		'\u2592' : 'blk12',
		'\u2591' : 'blk14',
		'\u2593' : 'blk34',
		'\u2588' : 'block',
		'=\u20E5' : 'bne',
		'\u2261\u20E5' : 'bnequiv',
		'\u2AED' : 'bNot',
		'\u2310' : 'bnot',
		'\uD835\uDD39' : 'Bopf',
		'\uD835\uDD53' : 'bopf',
		'\u22A5' : 'bot',
		'\u22C8' : 'bowtie',
		'\u29C9' : 'boxbox',
		'\u2510' : 'boxdl',
		'\u2555' : 'boxdL',
		'\u2556' : 'boxDl',
		'\u2557' : 'boxDL',
		'\u250C' : 'boxdr',
		'\u2552' : 'boxdR',
		'\u2553' : 'boxDr',
		'\u2554' : 'boxDR',
		'\u2500' : 'boxh',
		'\u2550' : 'boxH',
		'\u252C' : 'boxhd',
		'\u2564' : 'boxHd',
		'\u2565' : 'boxhD',
		'\u2566' : 'boxHD',
		'\u2534' : 'boxhu',
		'\u2567' : 'boxHu',
		'\u2568' : 'boxhU',
		'\u2569' : 'boxHU',
		'\u229F' : 'minusb',
		'\u229E' : 'plusb',
		'\u22A0' : 'timesb',
		'\u2518' : 'boxul',
		'\u255B' : 'boxuL',
		'\u255C' : 'boxUl',
		'\u255D' : 'boxUL',
		'\u2514' : 'boxur',
		'\u2558' : 'boxuR',
		'\u2559' : 'boxUr',
		'\u255A' : 'boxUR',
		'\u2502' : 'boxv',
		'\u2551' : 'boxV',
		'\u253C' : 'boxvh',
		'\u256A' : 'boxvH',
		'\u256B' : 'boxVh',
		'\u256C' : 'boxVH',
		'\u2524' : 'boxvl',
		'\u2561' : 'boxvL',
		'\u2562' : 'boxVl',
		'\u2563' : 'boxVL',
		'\u251C' : 'boxvr',
		'\u255E' : 'boxvR',
		'\u255F' : 'boxVr',
		'\u2560' : 'boxVR',
		'\u02D8' : 'breve',
		'\xA6' : 'brvbar',
		'\uD835\uDCB7' : 'bscr',
		'\u204F' : 'bsemi',
		'\u29C5' : 'bsolb',
		'\\' : 'bsol',
		'\u27C8' : 'bsolhsub',
		'\u2022' : 'bull',
		'\u224E' : 'bump',
		'\u2AAE' : 'bumpE',
		'\u224F' : 'bumpe',
		'\u0106' : 'Cacute',
		'\u0107' : 'cacute',
		'\u2A44' : 'capand',
		'\u2A49' : 'capbrcup',
		'\u2A4B' : 'capcap',
		'\u2229' : 'cap',
		'\u22D2' : 'Cap',
		'\u2A47' : 'capcup',
		'\u2A40' : 'capdot',
		'\u2145' : 'DD',
		'\u2229\uFE00' : 'caps',
		'\u2041' : 'caret',
		'\u02C7' : 'caron',
		'\u212D' : 'Cfr',
		'\u2A4D' : 'ccaps',
		'\u010C' : 'Ccaron',
		'\u010D' : 'ccaron',
		'\xC7' : 'Ccedil',
		'\xE7' : 'ccedil',
		'\u0108' : 'Ccirc',
		'\u0109' : 'ccirc',
		'\u2230' : 'Cconint',
		'\u2A4C' : 'ccups',
		'\u2A50' : 'ccupssm',
		'\u010A' : 'Cdot',
		'\u010B' : 'cdot',
		'\xB8' : 'cedil',
		'\u29B2' : 'cemptyv',
		'\xA2' : 'cent',
		'\xB7' : 'middot',
		'\uD835\uDD20' : 'cfr',
		'\u0427' : 'CHcy',
		'\u0447' : 'chcy',
		'\u2713' : 'check',
		'\u03A7' : 'Chi',
		'\u03C7' : 'chi',
		'\u02C6' : 'circ',
		'\u2257' : 'cire',
		'\u21BA' : 'olarr',
		'\u21BB' : 'orarr',
		'\u229B' : 'oast',
		'\u229A' : 'ocir',
		'\u229D' : 'odash',
		'\u2299' : 'odot',
		'\xAE' : 'reg',
		'\u24C8' : 'oS',
		'\u2296' : 'ominus',
		'\u2295' : 'oplus',
		'\u2297' : 'otimes',
		'\u25CB' : 'cir',
		'\u29C3' : 'cirE',
		'\u2A10' : 'cirfnint',
		'\u2AEF' : 'cirmid',
		'\u29C2' : 'cirscir',
		'\u2232' : 'cwconint',
		'\u201D' : 'rdquo',
		'\u2019' : 'rsquo',
		'\u2663' : 'clubs',
		':' : 'colon',
		'\u2237' : 'Colon',
		'\u2A74' : 'Colone',
		',' : 'comma',
		'@' : 'commat',
		'\u2201' : 'comp',
		'\u2218' : 'compfn',
		'\u2102' : 'Copf',
		'\u2245' : 'cong',
		'\u2A6D' : 'congdot',
		'\u2261' : 'equiv',
		'\u222E' : 'oint',
		'\u222F' : 'Conint',
		'\uD835\uDD54' : 'copf',
		'\u2210' : 'coprod',
		'\xA9' : 'copy',
		'\u2117' : 'copysr',
		'\u21B5' : 'crarr',
		'\u2717' : 'cross',
		'\u2A2F' : 'Cross',
		'\uD835\uDC9E' : 'Cscr',
		'\uD835\uDCB8' : 'cscr',
		'\u2ACF' : 'csub',
		'\u2AD1' : 'csube',
		'\u2AD0' : 'csup',
		'\u2AD2' : 'csupe',
		'\u22EF' : 'ctdot',
		'\u2938' : 'cudarrl',
		'\u2935' : 'cudarrr',
		'\u22DE' : 'cuepr',
		'\u22DF' : 'cuesc',
		'\u21B6' : 'cularr',
		'\u293D' : 'cularrp',
		'\u2A48' : 'cupbrcap',
		'\u2A46' : 'cupcap',
		'\u222A' : 'cup',
		'\u22D3' : 'Cup',
		'\u2A4A' : 'cupcup',
		'\u228D' : 'cupdot',
		'\u2A45' : 'cupor',
		'\u222A\uFE00' : 'cups',
		'\u21B7' : 'curarr',
		'\u293C' : 'curarrm',
		'\u22CE' : 'cuvee',
		'\u22CF' : 'cuwed',
		'\xA4' : 'curren',
		'\u2231' : 'cwint',
		'\u232D' : 'cylcty',
		'\u2020' : 'dagger',
		'\u2021' : 'Dagger',
		'\u2138' : 'daleth',
		'\u2193' : 'darr',
		'\u21A1' : 'Darr',
		'\u21D3' : 'dArr',
		'\u2010' : 'dash',
		'\u2AE4' : 'Dashv',
		'\u22A3' : 'dashv',
		'\u290F' : 'rBarr',
		'\u02DD' : 'dblac',
		'\u010E' : 'Dcaron',
		'\u010F' : 'dcaron',
		'\u0414' : 'Dcy',
		'\u0434' : 'dcy',
		'\u21CA' : 'ddarr',
		'\u2146' : 'dd',
		'\u2911' : 'DDotrahd',
		'\u2A77' : 'eDDot',
		'\xB0' : 'deg',
		'\u2207' : 'Del',
		'\u0394' : 'Delta',
		'\u03B4' : 'delta',
		'\u29B1' : 'demptyv',
		'\u297F' : 'dfisht',
		'\uD835\uDD07' : 'Dfr',
		'\uD835\uDD21' : 'dfr',
		'\u2965' : 'dHar',
		'\u21C3' : 'dharl',
		'\u21C2' : 'dharr',
		'\u02D9' : 'dot',
		'`' : 'grave',
		'\u02DC' : 'tilde',
		'\u22C4' : 'diam',
		'\u2666' : 'diams',
		'\xA8' : 'die',
		'\u03DD' : 'gammad',
		'\u22F2' : 'disin',
		'\xF7' : 'div',
		'\u22C7' : 'divonx',
		'\u0402' : 'DJcy',
		'\u0452' : 'djcy',
		'\u231E' : 'dlcorn',
		'\u230D' : 'dlcrop',
		'$' : 'dollar',
		'\uD835\uDD3B' : 'Dopf',
		'\uD835\uDD55' : 'dopf',
		'\u20DC' : 'DotDot',
		'\u2250' : 'doteq',
		'\u2251' : 'eDot',
		'\u2238' : 'minusd',
		'\u2214' : 'plusdo',
		'\u22A1' : 'sdotb',
		'\u21D0' : 'lArr',
		'\u21D4' : 'iff',
		'\u27F8' : 'xlArr',
		'\u27FA' : 'xhArr',
		'\u27F9' : 'xrArr',
		'\u21D2' : 'rArr',
		'\u22A8' : 'vDash',
		'\u21D1' : 'uArr',
		'\u21D5' : 'vArr',
		'\u2225' : 'par',
		'\u2913' : 'DownArrowBar',
		'\u21F5' : 'duarr',
		'\u0311' : 'DownBreve',
		'\u2950' : 'DownLeftRightVector',
		'\u295E' : 'DownLeftTeeVector',
		'\u2956' : 'DownLeftVectorBar',
		'\u21BD' : 'lhard',
		'\u295F' : 'DownRightTeeVector',
		'\u2957' : 'DownRightVectorBar',
		'\u21C1' : 'rhard',
		'\u21A7' : 'mapstodown',
		'\u22A4' : 'top',
		'\u2910' : 'RBarr',
		'\u231F' : 'drcorn',
		'\u230C' : 'drcrop',
		'\uD835\uDC9F' : 'Dscr',
		'\uD835\uDCB9' : 'dscr',
		'\u0405' : 'DScy',
		'\u0455' : 'dscy',
		'\u29F6' : 'dsol',
		'\u0110' : 'Dstrok',
		'\u0111' : 'dstrok',
		'\u22F1' : 'dtdot',
		'\u25BF' : 'dtri',
		'\u296F' : 'duhar',
		'\u29A6' : 'dwangle',
		'\u040F' : 'DZcy',
		'\u045F' : 'dzcy',
		'\u27FF' : 'dzigrarr',
		'\xC9' : 'Eacute',
		'\xE9' : 'eacute',
		'\u2A6E' : 'easter',
		'\u011A' : 'Ecaron',
		'\u011B' : 'ecaron',
		'\xCA' : 'Ecirc',
		'\xEA' : 'ecirc',
		'\u2256' : 'ecir',
		'\u2255' : 'ecolon',
		'\u042D' : 'Ecy',
		'\u044D' : 'ecy',
		'\u0116' : 'Edot',
		'\u0117' : 'edot',
		'\u2147' : 'ee',
		'\u2252' : 'efDot',
		'\uD835\uDD08' : 'Efr',
		'\uD835\uDD22' : 'efr',
		'\u2A9A' : 'eg',
		'\xC8' : 'Egrave',
		'\xE8' : 'egrave',
		'\u2A96' : 'egs',
		'\u2A98' : 'egsdot',
		'\u2A99' : 'el',
		'\u2208' : 'in',
		'\u23E7' : 'elinters',
		'\u2113' : 'ell',
		'\u2A95' : 'els',
		'\u2A97' : 'elsdot',
		'\u0112' : 'Emacr',
		'\u0113' : 'emacr',
		'\u2205' : 'empty',
		'\u25FB' : 'EmptySmallSquare',
		'\u25AB' : 'EmptyVerySmallSquare',
		'\u2004' : 'emsp13',
		'\u2005' : 'emsp14',
		'\u2003' : 'emsp',
		'\u014A' : 'ENG',
		'\u014B' : 'eng',
		'\u2002' : 'ensp',
		'\u0118' : 'Eogon',
		'\u0119' : 'eogon',
		'\uD835\uDD3C' : 'Eopf',
		'\uD835\uDD56' : 'eopf',
		'\u22D5' : 'epar',
		'\u29E3' : 'eparsl',
		'\u2A71' : 'eplus',
		'\u03B5' : 'epsi',
		'\u0395' : 'Epsilon',
		'\u03F5' : 'epsiv',
		'\u2242' : 'esim',
		'\u2A75' : 'Equal',
		'=' : 'equals',
		'\u225F' : 'equest',
		'\u21CC' : 'rlhar',
		'\u2A78' : 'equivDD',
		'\u29E5' : 'eqvparsl',
		'\u2971' : 'erarr',
		'\u2253' : 'erDot',
		'\u212F' : 'escr',
		'\u2130' : 'Escr',
		'\u2A73' : 'Esim',
		'\u0397' : 'Eta',
		'\u03B7' : 'eta',
		'\xD0' : 'ETH',
		'\xF0' : 'eth',
		'\xCB' : 'Euml',
		'\xEB' : 'euml',
		'\u20AC' : 'euro',
		'!' : 'excl',
		'\u2203' : 'exist',
		'\u0424' : 'Fcy',
		'\u0444' : 'fcy',
		'\u2640' : 'female',
		'\uFB03' : 'ffilig',
		'\uFB00' : 'fflig',
		'\uFB04' : 'ffllig',
		'\uD835\uDD09' : 'Ffr',
		'\uD835\uDD23' : 'ffr',
		'\uFB01' : 'filig',
		'\u25FC' : 'FilledSmallSquare',
		'fj' : 'fjlig',
		'\u266D' : 'flat',
		'\uFB02' : 'fllig',
		'\u25B1' : 'fltns',
		'\u0192' : 'fnof',
		'\uD835\uDD3D' : 'Fopf',
		'\uD835\uDD57' : 'fopf',
		'\u2200' : 'forall',
		'\u22D4' : 'fork',
		'\u2AD9' : 'forkv',
		'\u2131' : 'Fscr',
		'\u2A0D' : 'fpartint',
		'\xBD' : 'half',
		'\u2153' : 'frac13',
		'\xBC' : 'frac14',
		'\u2155' : 'frac15',
		'\u2159' : 'frac16',
		'\u215B' : 'frac18',
		'\u2154' : 'frac23',
		'\u2156' : 'frac25',
		'\xBE' : 'frac34',
		'\u2157' : 'frac35',
		'\u215C' : 'frac38',
		'\u2158' : 'frac45',
		'\u215A' : 'frac56',
		'\u215D' : 'frac58',
		'\u215E' : 'frac78',
		'\u2044' : 'frasl',
		'\u2322' : 'frown',
		'\uD835\uDCBB' : 'fscr',
		'\u01F5' : 'gacute',
		'\u0393' : 'Gamma',
		'\u03B3' : 'gamma',
		'\u03DC' : 'Gammad',
		'\u2A86' : 'gap',
		'\u011E' : 'Gbreve',
		'\u011F' : 'gbreve',
		'\u0122' : 'Gcedil',
		'\u011C' : 'Gcirc',
		'\u011D' : 'gcirc',
		'\u0413' : 'Gcy',
		'\u0433' : 'gcy',
		'\u0120' : 'Gdot',
		'\u0121' : 'gdot',
		'\u2265' : 'ge',
		'\u2267' : 'gE',
		'\u2A8C' : 'gEl',
		'\u22DB' : 'gel',
		'\u2A7E' : 'ges',
		'\u2AA9' : 'gescc',
		'\u2A80' : 'gesdot',
		'\u2A82' : 'gesdoto',
		'\u2A84' : 'gesdotol',
		'\u22DB\uFE00' : 'gesl',
		'\u2A94' : 'gesles',
		'\uD835\uDD0A' : 'Gfr',
		'\uD835\uDD24' : 'gfr',
		'\u226B' : 'gg',
		'\u22D9' : 'Gg',
		'\u2137' : 'gimel',
		'\u0403' : 'GJcy',
		'\u0453' : 'gjcy',
		'\u2AA5' : 'gla',
		'\u2277' : 'gl',
		'\u2A92' : 'glE',
		'\u2AA4' : 'glj',
		'\u2A8A' : 'gnap',
		'\u2A88' : 'gne',
		'\u2269' : 'gnE',
		'\u22E7' : 'gnsim',
		'\uD835\uDD3E' : 'Gopf',
		'\uD835\uDD58' : 'gopf',
		'\u2AA2' : 'GreaterGreater',
		'\u2273' : 'gsim',
		'\uD835\uDCA2' : 'Gscr',
		'\u210A' : 'gscr',
		'\u2A8E' : 'gsime',
		'\u2A90' : 'gsiml',
		'\u2AA7' : 'gtcc',
		'\u2A7A' : 'gtcir',
		'>' : 'gt',
		'\u22D7' : 'gtdot',
		'\u2995' : 'gtlPar',
		'\u2A7C' : 'gtquest',
		'\u2978' : 'gtrarr',
		'\u2269\uFE00' : 'gvnE',
		'\u200A' : 'hairsp',
		'\u210B' : 'Hscr',
		'\u042A' : 'HARDcy',
		'\u044A' : 'hardcy',
		'\u2948' : 'harrcir',
		'\u2194' : 'harr',
		'\u21AD' : 'harrw',
		'^' : 'Hat',
		'\u210F' : 'hbar',
		'\u0124' : 'Hcirc',
		'\u0125' : 'hcirc',
		'\u2665' : 'hearts',
		'\u2026' : 'mldr',
		'\u22B9' : 'hercon',
		'\uD835\uDD25' : 'hfr',
		'\u210C' : 'Hfr',
		'\u2925' : 'searhk',
		'\u2926' : 'swarhk',
		'\u21FF' : 'hoarr',
		'\u223B' : 'homtht',
		'\u21A9' : 'larrhk',
		'\u21AA' : 'rarrhk',
		'\uD835\uDD59' : 'hopf',
		'\u210D' : 'Hopf',
		'\u2015' : 'horbar',
		'\uD835\uDCBD' : 'hscr',
		'\u0126' : 'Hstrok',
		'\u0127' : 'hstrok',
		'\u2043' : 'hybull',
		'\xCD' : 'Iacute',
		'\xED' : 'iacute',
		'\u2063' : 'ic',
		'\xCE' : 'Icirc',
		'\xEE' : 'icirc',
		'\u0418' : 'Icy',
		'\u0438' : 'icy',
		'\u0130' : 'Idot',
		'\u0415' : 'IEcy',
		'\u0435' : 'iecy',
		'\xA1' : 'iexcl',
		'\uD835\uDD26' : 'ifr',
		'\u2111' : 'Im',
		'\xCC' : 'Igrave',
		'\xEC' : 'igrave',
		'\u2148' : 'ii',
		'\u2A0C' : 'qint',
		'\u222D' : 'tint',
		'\u29DC' : 'iinfin',
		'\u2129' : 'iiota',
		'\u0132' : 'IJlig',
		'\u0133' : 'ijlig',
		'\u012A' : 'Imacr',
		'\u012B' : 'imacr',
		'\u2110' : 'Iscr',
		'\u0131' : 'imath',
		'\u22B7' : 'imof',
		'\u01B5' : 'imped',
		'\u2105' : 'incare',
		'\u221E' : 'infin',
		'\u29DD' : 'infintie',
		'\u22BA' : 'intcal',
		'\u222B' : 'int',
		'\u222C' : 'Int',
		'\u2124' : 'Zopf',
		'\u2A17' : 'intlarhk',
		'\u2A3C' : 'iprod',
		'\u2062' : 'it',
		'\u0401' : 'IOcy',
		'\u0451' : 'iocy',
		'\u012E' : 'Iogon',
		'\u012F' : 'iogon',
		'\uD835\uDD40' : 'Iopf',
		'\uD835\uDD5A' : 'iopf',
		'\u0399' : 'Iota',
		'\u03B9' : 'iota',
		'\xBF' : 'iquest',
		'\uD835\uDCBE' : 'iscr',
		'\u22F5' : 'isindot',
		'\u22F9' : 'isinE',
		'\u22F4' : 'isins',
		'\u22F3' : 'isinsv',
		'\u0128' : 'Itilde',
		'\u0129' : 'itilde',
		'\u0406' : 'Iukcy',
		'\u0456' : 'iukcy',
		'\xCF' : 'Iuml',
		'\xEF' : 'iuml',
		'\u0134' : 'Jcirc',
		'\u0135' : 'jcirc',
		'\u0419' : 'Jcy',
		'\u0439' : 'jcy',
		'\uD835\uDD0D' : 'Jfr',
		'\uD835\uDD27' : 'jfr',
		'\u0237' : 'jmath',
		'\uD835\uDD41' : 'Jopf',
		'\uD835\uDD5B' : 'jopf',
		'\uD835\uDCA5' : 'Jscr',
		'\uD835\uDCBF' : 'jscr',
		'\u0408' : 'Jsercy',
		'\u0458' : 'jsercy',
		'\u0404' : 'Jukcy',
		'\u0454' : 'jukcy',
		'\u039A' : 'Kappa',
		'\u03BA' : 'kappa',
		'\u03F0' : 'kappav',
		'\u0136' : 'Kcedil',
		'\u0137' : 'kcedil',
		'\u041A' : 'Kcy',
		'\u043A' : 'kcy',
		'\uD835\uDD0E' : 'Kfr',
		'\uD835\uDD28' : 'kfr',
		'\u0138' : 'kgreen',
		'\u0425' : 'KHcy',
		'\u0445' : 'khcy',
		'\u040C' : 'KJcy',
		'\u045C' : 'kjcy',
		'\uD835\uDD42' : 'Kopf',
		'\uD835\uDD5C' : 'kopf',
		'\uD835\uDCA6' : 'Kscr',
		'\uD835\uDCC0' : 'kscr',
		'\u21DA' : 'lAarr',
		'\u0139' : 'Lacute',
		'\u013A' : 'lacute',
		'\u29B4' : 'laemptyv',
		'\u2112' : 'Lscr',
		'\u039B' : 'Lambda',
		'\u03BB' : 'lambda',
		'\u27E8' : 'lang',
		'\u27EA' : 'Lang',
		'\u2991' : 'langd',
		'\u2A85' : 'lap',
		'\xAB' : 'laquo',
		'\u21E4' : 'larrb',
		'\u291F' : 'larrbfs',
		'\u2190' : 'larr',
		'\u219E' : 'Larr',
		'\u291D' : 'larrfs',
		'\u21AB' : 'larrlp',
		'\u2939' : 'larrpl',
		'\u2973' : 'larrsim',
		'\u21A2' : 'larrtl',
		'\u2919' : 'latail',
		'\u291B' : 'lAtail',
		'\u2AAB' : 'lat',
		'\u2AAD' : 'late',
		'\u2AAD\uFE00' : 'lates',
		'\u290C' : 'lbarr',
		'\u290E' : 'lBarr',
		'\u2772' : 'lbbrk',
		'{' : 'lcub',
		'[' : 'lsqb',
		'\u298B' : 'lbrke',
		'\u298F' : 'lbrksld',
		'\u298D' : 'lbrkslu',
		'\u013D' : 'Lcaron',
		'\u013E' : 'lcaron',
		'\u013B' : 'Lcedil',
		'\u013C' : 'lcedil',
		'\u2308' : 'lceil',
		'\u041B' : 'Lcy',
		'\u043B' : 'lcy',
		'\u2936' : 'ldca',
		'\u201C' : 'ldquo',
		'\u2967' : 'ldrdhar',
		'\u294B' : 'ldrushar',
		'\u21B2' : 'ldsh',
		'\u2264' : 'le',
		'\u2266' : 'lE',
		'\u21C6' : 'lrarr',
		'\u27E6' : 'lobrk',
		'\u2961' : 'LeftDownTeeVector',
		'\u2959' : 'LeftDownVectorBar',
		'\u230A' : 'lfloor',
		'\u21BC' : 'lharu',
		'\u21C7' : 'llarr',
		'\u21CB' : 'lrhar',
		'\u294E' : 'LeftRightVector',
		'\u21A4' : 'mapstoleft',
		'\u295A' : 'LeftTeeVector',
		'\u22CB' : 'lthree',
		'\u29CF' : 'LeftTriangleBar',
		'\u22B2' : 'vltri',
		'\u22B4' : 'ltrie',
		'\u2951' : 'LeftUpDownVector',
		'\u2960' : 'LeftUpTeeVector',
		'\u2958' : 'LeftUpVectorBar',
		'\u21BF' : 'uharl',
		'\u2952' : 'LeftVectorBar',
		'\u2A8B' : 'lEg',
		'\u22DA' : 'leg',
		'\u2A7D' : 'les',
		'\u2AA8' : 'lescc',
		'\u2A7F' : 'lesdot',
		'\u2A81' : 'lesdoto',
		'\u2A83' : 'lesdotor',
		'\u22DA\uFE00' : 'lesg',
		'\u2A93' : 'lesges',
		'\u22D6' : 'ltdot',
		'\u2276' : 'lg',
		'\u2AA1' : 'LessLess',
		'\u2272' : 'lsim',
		'\u297C' : 'lfisht',
		'\uD835\uDD0F' : 'Lfr',
		'\uD835\uDD29' : 'lfr',
		'\u2A91' : 'lgE',
		'\u2962' : 'lHar',
		'\u296A' : 'lharul',
		'\u2584' : 'lhblk',
		'\u0409' : 'LJcy',
		'\u0459' : 'ljcy',
		'\u226A' : 'll',
		'\u22D8' : 'Ll',
		'\u296B' : 'llhard',
		'\u25FA' : 'lltri',
		'\u013F' : 'Lmidot',
		'\u0140' : 'lmidot',
		'\u23B0' : 'lmoust',
		'\u2A89' : 'lnap',
		'\u2A87' : 'lne',
		'\u2268' : 'lnE',
		'\u22E6' : 'lnsim',
		'\u27EC' : 'loang',
		'\u21FD' : 'loarr',
		'\u27F5' : 'xlarr',
		'\u27F7' : 'xharr',
		'\u27FC' : 'xmap',
		'\u27F6' : 'xrarr',
		'\u21AC' : 'rarrlp',
		'\u2985' : 'lopar',
		'\uD835\uDD43' : 'Lopf',
		'\uD835\uDD5D' : 'lopf',
		'\u2A2D' : 'loplus',
		'\u2A34' : 'lotimes',
		'\u2217' : 'lowast',
		'_' : 'lowbar',
		'\u2199' : 'swarr',
		'\u2198' : 'searr',
		'\u25CA' : 'loz',
		'(' : 'lpar',
		'\u2993' : 'lparlt',
		'\u296D' : 'lrhard',
		'\u200E' : 'lrm',
		'\u22BF' : 'lrtri',
		'\u2039' : 'lsaquo',
		'\uD835\uDCC1' : 'lscr',
		'\u21B0' : 'lsh',
		'\u2A8D' : 'lsime',
		'\u2A8F' : 'lsimg',
		'\u2018' : 'lsquo',
		'\u201A' : 'sbquo',
		'\u0141' : 'Lstrok',
		'\u0142' : 'lstrok',
		'\u2AA6' : 'ltcc',
		'\u2A79' : 'ltcir',
		'<' : 'lt',
		'\u22C9' : 'ltimes',
		'\u2976' : 'ltlarr',
		'\u2A7B' : 'ltquest',
		'\u25C3' : 'ltri',
		'\u2996' : 'ltrPar',
		'\u294A' : 'lurdshar',
		'\u2966' : 'luruhar',
		'\u2268\uFE00' : 'lvnE',
		'\xAF' : 'macr',
		'\u2642' : 'male',
		'\u2720' : 'malt',
		'\u2905' : 'Map',
		'\u21A6' : 'map',
		'\u21A5' : 'mapstoup',
		'\u25AE' : 'marker',
		'\u2A29' : 'mcomma',
		'\u041C' : 'Mcy',
		'\u043C' : 'mcy',
		'\u2014' : 'mdash',
		'\u223A' : 'mDDot',
		'\u205F' : 'MediumSpace',
		'\u2133' : 'Mscr',
		'\uD835\uDD10' : 'Mfr',
		'\uD835\uDD2A' : 'mfr',
		'\u2127' : 'mho',
		'\xB5' : 'micro',
		'\u2AF0' : 'midcir',
		'\u2223' : 'mid',
		'\u2212' : 'minus',
		'\u2A2A' : 'minusdu',
		'\u2213' : 'mp',
		'\u2ADB' : 'mlcp',
		'\u22A7' : 'models',
		'\uD835\uDD44' : 'Mopf',
		'\uD835\uDD5E' : 'mopf',
		'\uD835\uDCC2' : 'mscr',
		'\u039C' : 'Mu',
		'\u03BC' : 'mu',
		'\u22B8' : 'mumap',
		'\u0143' : 'Nacute',
		'\u0144' : 'nacute',
		'\u2220\u20D2' : 'nang',
		'\u2249' : 'nap',
		'\u2A70\u0338' : 'napE',
		'\u224B\u0338' : 'napid',
		'\u0149' : 'napos',
		'\u266E' : 'natur',
		'\u2115' : 'Nopf',
		'\xA0' : 'nbsp',
		'\u224E\u0338' : 'nbump',
		'\u224F\u0338' : 'nbumpe',
		'\u2A43' : 'ncap',
		'\u0147' : 'Ncaron',
		'\u0148' : 'ncaron',
		'\u0145' : 'Ncedil',
		'\u0146' : 'ncedil',
		'\u2247' : 'ncong',
		'\u2A6D\u0338' : 'ncongdot',
		'\u2A42' : 'ncup',
		'\u041D' : 'Ncy',
		'\u043D' : 'ncy',
		'\u2013' : 'ndash',
		'\u2924' : 'nearhk',
		'\u2197' : 'nearr',
		'\u21D7' : 'neArr',
		'\u2260' : 'ne',
		'\u2250\u0338' : 'nedot',
		'\u200B' : 'ZeroWidthSpace',
		'\u2262' : 'nequiv',
		'\u2928' : 'toea',
		'\u2242\u0338' : 'nesim',
		'\n' : 'NewLine',
		'\u2204' : 'nexist',
		'\uD835\uDD11' : 'Nfr',
		'\uD835\uDD2B' : 'nfr',
		'\u2267\u0338' : 'ngE',
		'\u2271' : 'nge',
		'\u2A7E\u0338' : 'nges',
		'\u22D9\u0338' : 'nGg',
		'\u2275' : 'ngsim',
		'\u226B\u20D2' : 'nGt',
		'\u226F' : 'ngt',
		'\u226B\u0338' : 'nGtv',
		'\u21AE' : 'nharr',
		'\u21CE' : 'nhArr',
		'\u2AF2' : 'nhpar',
		'\u220B' : 'ni',
		'\u22FC' : 'nis',
		'\u22FA' : 'nisd',
		'\u040A' : 'NJcy',
		'\u045A' : 'njcy',
		'\u219A' : 'nlarr',
		'\u21CD' : 'nlArr',
		'\u2025' : 'nldr',
		'\u2266\u0338' : 'nlE',
		'\u2270' : 'nle',
		'\u2A7D\u0338' : 'nles',
		'\u226E' : 'nlt',
		'\u22D8\u0338' : 'nLl',
		'\u2274' : 'nlsim',
		'\u226A\u20D2' : 'nLt',
		'\u22EA' : 'nltri',
		'\u22EC' : 'nltrie',
		'\u226A\u0338' : 'nLtv',
		'\u2224' : 'nmid',
		'\u2060' : 'NoBreak',
		'\uD835\uDD5F' : 'nopf',
		'\u2AEC' : 'Not',
		'\xAC' : 'not',
		'\u226D' : 'NotCupCap',
		'\u2226' : 'npar',
		'\u2209' : 'notin',
		'\u2279' : 'ntgl',
		'\u22F5\u0338' : 'notindot',
		'\u22F9\u0338' : 'notinE',
		'\u22F7' : 'notinvb',
		'\u22F6' : 'notinvc',
		'\u29CF\u0338' : 'NotLeftTriangleBar',
		'\u2278' : 'ntlg',
		'\u2AA2\u0338' : 'NotNestedGreaterGreater',
		'\u2AA1\u0338' : 'NotNestedLessLess',
		'\u220C' : 'notni',
		'\u22FE' : 'notnivb',
		'\u22FD' : 'notnivc',
		'\u2280' : 'npr',
		'\u2AAF\u0338' : 'npre',
		'\u22E0' : 'nprcue',
		'\u29D0\u0338' : 'NotRightTriangleBar',
		'\u22EB' : 'nrtri',
		'\u22ED' : 'nrtrie',
		'\u228F\u0338' : 'NotSquareSubset',
		'\u22E2' : 'nsqsube',
		'\u2290\u0338' : 'NotSquareSuperset',
		'\u22E3' : 'nsqsupe',
		'\u2282\u20D2' : 'vnsub',
		'\u2288' : 'nsube',
		'\u2281' : 'nsc',
		'\u2AB0\u0338' : 'nsce',
		'\u22E1' : 'nsccue',
		'\u227F\u0338' : 'NotSucceedsTilde',
		'\u2283\u20D2' : 'vnsup',
		'\u2289' : 'nsupe',
		'\u2241' : 'nsim',
		'\u2244' : 'nsime',
		'\u2AFD\u20E5' : 'nparsl',
		'\u2202\u0338' : 'npart',
		'\u2A14' : 'npolint',
		'\u2933\u0338' : 'nrarrc',
		'\u219B' : 'nrarr',
		'\u21CF' : 'nrArr',
		'\u219D\u0338' : 'nrarrw',
		'\uD835\uDCA9' : 'Nscr',
		'\uD835\uDCC3' : 'nscr',
		'\u2284' : 'nsub',
		'\u2AC5\u0338' : 'nsubE',
		'\u2285' : 'nsup',
		'\u2AC6\u0338' : 'nsupE',
		'\xD1' : 'Ntilde',
		'\xF1' : 'ntilde',
		'\u039D' : 'Nu',
		'\u03BD' : 'nu',
		'#' : 'num',
		'\u2116' : 'numero',
		'\u2007' : 'numsp',
		'\u224D\u20D2' : 'nvap',
		'\u22AC' : 'nvdash',
		'\u22AD' : 'nvDash',
		'\u22AE' : 'nVdash',
		'\u22AF' : 'nVDash',
		'\u2265\u20D2' : 'nvge',
		'>\u20D2' : 'nvgt',
		'\u2904' : 'nvHarr',
		'\u29DE' : 'nvinfin',
		'\u2902' : 'nvlArr',
		'\u2264\u20D2' : 'nvle',
		'<\u20D2' : 'nvlt',
		'\u22B4\u20D2' : 'nvltrie',
		'\u2903' : 'nvrArr',
		'\u22B5\u20D2' : 'nvrtrie',
		'\u223C\u20D2' : 'nvsim',
		'\u2923' : 'nwarhk',
		'\u2196' : 'nwarr',
		'\u21D6' : 'nwArr',
		'\u2927' : 'nwnear',
		'\xD3' : 'Oacute',
		'\xF3' : 'oacute',
		'\xD4' : 'Ocirc',
		'\xF4' : 'ocirc',
		'\u041E' : 'Ocy',
		'\u043E' : 'ocy',
		'\u0150' : 'Odblac',
		'\u0151' : 'odblac',
		'\u2A38' : 'odiv',
		'\u29BC' : 'odsold',
		'\u0152' : 'OElig',
		'\u0153' : 'oelig',
		'\u29BF' : 'ofcir',
		'\uD835\uDD12' : 'Ofr',
		'\uD835\uDD2C' : 'ofr',
		'\u02DB' : 'ogon',
		'\xD2' : 'Ograve',
		'\xF2' : 'ograve',
		'\u29C1' : 'ogt',
		'\u29B5' : 'ohbar',
		'\u03A9' : 'ohm',
		'\u29BE' : 'olcir',
		'\u29BB' : 'olcross',
		'\u203E' : 'oline',
		'\u29C0' : 'olt',
		'\u014C' : 'Omacr',
		'\u014D' : 'omacr',
		'\u03C9' : 'omega',
		'\u039F' : 'Omicron',
		'\u03BF' : 'omicron',
		'\u29B6' : 'omid',
		'\uD835\uDD46' : 'Oopf',
		'\uD835\uDD60' : 'oopf',
		'\u29B7' : 'opar',
		'\u29B9' : 'operp',
		'\u2A54' : 'Or',
		'\u2228' : 'or',
		'\u2A5D' : 'ord',
		'\u2134' : 'oscr',
		'\xAA' : 'ordf',
		'\xBA' : 'ordm',
		'\u22B6' : 'origof',
		'\u2A56' : 'oror',
		'\u2A57' : 'orslope',
		'\u2A5B' : 'orv',
		'\uD835\uDCAA' : 'Oscr',
		'\xD8' : 'Oslash',
		'\xF8' : 'oslash',
		'\u2298' : 'osol',
		'\xD5' : 'Otilde',
		'\xF5' : 'otilde',
		'\u2A36' : 'otimesas',
		'\u2A37' : 'Otimes',
		'\xD6' : 'Ouml',
		'\xF6' : 'ouml',
		'\u233D' : 'ovbar',
		'\u23DE' : 'OverBrace',
		'\u23B4' : 'tbrk',
		'\u23DC' : 'OverParenthesis',
		'\xB6' : 'para',
		'\u2AF3' : 'parsim',
		'\u2AFD' : 'parsl',
		'\u2202' : 'part',
		'\u041F' : 'Pcy',
		'\u043F' : 'pcy',
		'%' : 'percnt',
		'.' : 'period',
		'\u2030' : 'permil',
		'\u2031' : 'pertenk',
		'\uD835\uDD13' : 'Pfr',
		'\uD835\uDD2D' : 'pfr',
		'\u03A6' : 'Phi',
		'\u03C6' : 'phi',
		'\u03D5' : 'phiv',
		'\u260E' : 'phone',
		'\u03A0' : 'Pi',
		'\u03C0' : 'pi',
		'\u03D6' : 'piv',
		'\u210E' : 'planckh',
		'\u2A23' : 'plusacir',
		'\u2A22' : 'pluscir',
		'+' : 'plus',
		'\u2A25' : 'plusdu',
		'\u2A72' : 'pluse',
		'\xB1' : 'pm',
		'\u2A26' : 'plussim',
		'\u2A27' : 'plustwo',
		'\u2A15' : 'pointint',
		'\uD835\uDD61' : 'popf',
		'\u2119' : 'Popf',
		'\xA3' : 'pound',
		'\u2AB7' : 'prap',
		'\u2ABB' : 'Pr',
		'\u227A' : 'pr',
		'\u227C' : 'prcue',
		'\u2AAF' : 'pre',
		'\u227E' : 'prsim',
		'\u2AB9' : 'prnap',
		'\u2AB5' : 'prnE',
		'\u22E8' : 'prnsim',
		'\u2AB3' : 'prE',
		'\u2032' : 'prime',
		'\u2033' : 'Prime',
		'\u220F' : 'prod',
		'\u232E' : 'profalar',
		'\u2312' : 'profline',
		'\u2313' : 'profsurf',
		'\u221D' : 'prop',
		'\u22B0' : 'prurel',
		'\uD835\uDCAB' : 'Pscr',
		'\uD835\uDCC5' : 'pscr',
		'\u03A8' : 'Psi',
		'\u03C8' : 'psi',
		'\u2008' : 'puncsp',
		'\uD835\uDD14' : 'Qfr',
		'\uD835\uDD2E' : 'qfr',
		'\uD835\uDD62' : 'qopf',
		'\u211A' : 'Qopf',
		'\u2057' : 'qprime',
		'\uD835\uDCAC' : 'Qscr',
		'\uD835\uDCC6' : 'qscr',
		'\u2A16' : 'quatint',
		'?' : 'quest',
		'"' : 'quot',
		'\u21DB' : 'rAarr',
		'\u223D\u0331' : 'race',
		'\u0154' : 'Racute',
		'\u0155' : 'racute',
		'\u221A' : 'Sqrt',
		'\u29B3' : 'raemptyv',
		'\u27E9' : 'rang',
		'\u27EB' : 'Rang',
		'\u2992' : 'rangd',
		'\u29A5' : 'range',
		'\xBB' : 'raquo',
		'\u2975' : 'rarrap',
		'\u21E5' : 'rarrb',
		'\u2920' : 'rarrbfs',
		'\u2933' : 'rarrc',
		'\u2192' : 'rarr',
		'\u21A0' : 'Rarr',
		'\u291E' : 'rarrfs',
		'\u2945' : 'rarrpl',
		'\u2974' : 'rarrsim',
		'\u2916' : 'Rarrtl',
		'\u21A3' : 'rarrtl',
		'\u219D' : 'rarrw',
		'\u291A' : 'ratail',
		'\u291C' : 'rAtail',
		'\u2236' : 'ratio',
		'\u2773' : 'rbbrk',
		'}' : 'rcub',
		']' : 'rsqb',
		'\u298C' : 'rbrke',
		'\u298E' : 'rbrksld',
		'\u2990' : 'rbrkslu',
		'\u0158' : 'Rcaron',
		'\u0159' : 'rcaron',
		'\u0156' : 'Rcedil',
		'\u0157' : 'rcedil',
		'\u2309' : 'rceil',
		'\u0420' : 'Rcy',
		'\u0440' : 'rcy',
		'\u2937' : 'rdca',
		'\u2969' : 'rdldhar',
		'\u21B3' : 'rdsh',
		'\u211C' : 'Re',
		'\u211B' : 'Rscr',
		'\u211D' : 'Ropf',
		'\u25AD' : 'rect',
		'\u297D' : 'rfisht',
		'\u230B' : 'rfloor',
		'\uD835\uDD2F' : 'rfr',
		'\u2964' : 'rHar',
		'\u21C0' : 'rharu',
		'\u296C' : 'rharul',
		'\u03A1' : 'Rho',
		'\u03C1' : 'rho',
		'\u03F1' : 'rhov',
		'\u21C4' : 'rlarr',
		'\u27E7' : 'robrk',
		'\u295D' : 'RightDownTeeVector',
		'\u2955' : 'RightDownVectorBar',
		'\u21C9' : 'rrarr',
		'\u22A2' : 'vdash',
		'\u295B' : 'RightTeeVector',
		'\u22CC' : 'rthree',
		'\u29D0' : 'RightTriangleBar',
		'\u22B3' : 'vrtri',
		'\u22B5' : 'rtrie',
		'\u294F' : 'RightUpDownVector',
		'\u295C' : 'RightUpTeeVector',
		'\u2954' : 'RightUpVectorBar',
		'\u21BE' : 'uharr',
		'\u2953' : 'RightVectorBar',
		'\u02DA' : 'ring',
		'\u200F' : 'rlm',
		'\u23B1' : 'rmoust',
		'\u2AEE' : 'rnmid',
		'\u27ED' : 'roang',
		'\u21FE' : 'roarr',
		'\u2986' : 'ropar',
		'\uD835\uDD63' : 'ropf',
		'\u2A2E' : 'roplus',
		'\u2A35' : 'rotimes',
		'\u2970' : 'RoundImplies',
		')' : 'rpar',
		'\u2994' : 'rpargt',
		'\u2A12' : 'rppolint',
		'\u203A' : 'rsaquo',
		'\uD835\uDCC7' : 'rscr',
		'\u21B1' : 'rsh',
		'\u22CA' : 'rtimes',
		'\u25B9' : 'rtri',
		'\u29CE' : 'rtriltri',
		'\u29F4' : 'RuleDelayed',
		'\u2968' : 'ruluhar',
		'\u211E' : 'rx',
		'\u015A' : 'Sacute',
		'\u015B' : 'sacute',
		'\u2AB8' : 'scap',
		'\u0160' : 'Scaron',
		'\u0161' : 'scaron',
		'\u2ABC' : 'Sc',
		'\u227B' : 'sc',
		'\u227D' : 'sccue',
		'\u2AB0' : 'sce',
		'\u2AB4' : 'scE',
		'\u015E' : 'Scedil',
		'\u015F' : 'scedil',
		'\u015C' : 'Scirc',
		'\u015D' : 'scirc',
		'\u2ABA' : 'scnap',
		'\u2AB6' : 'scnE',
		'\u22E9' : 'scnsim',
		'\u2A13' : 'scpolint',
		'\u227F' : 'scsim',
		'\u0421' : 'Scy',
		'\u0441' : 'scy',
		'\u22C5' : 'sdot',
		'\u2A66' : 'sdote',
		'\u21D8' : 'seArr',
		'\xA7' : 'sect',
		';' : 'semi',
		'\u2929' : 'tosa',
		'\u2736' : 'sext',
		'\uD835\uDD16' : 'Sfr',
		'\uD835\uDD30' : 'sfr',
		'\u266F' : 'sharp',
		'\u0429' : 'SHCHcy',
		'\u0449' : 'shchcy',
		'\u0428' : 'SHcy',
		'\u0448' : 'shcy',
		'\u2191' : 'uarr',
		'\xAD' : 'shy',
		'\u03A3' : 'Sigma',
		'\u03C3' : 'sigma',
		'\u03C2' : 'sigmaf',
		'\u223C' : 'sim',
		'\u2A6A' : 'simdot',
		'\u2243' : 'sime',
		'\u2A9E' : 'simg',
		'\u2AA0' : 'simgE',
		'\u2A9D' : 'siml',
		'\u2A9F' : 'simlE',
		'\u2246' : 'simne',
		'\u2A24' : 'simplus',
		'\u2972' : 'simrarr',
		'\u2A33' : 'smashp',
		'\u29E4' : 'smeparsl',
		'\u2323' : 'smile',
		'\u2AAA' : 'smt',
		'\u2AAC' : 'smte',
		'\u2AAC\uFE00' : 'smtes',
		'\u042C' : 'SOFTcy',
		'\u044C' : 'softcy',
		'\u233F' : 'solbar',
		'\u29C4' : 'solb',
		'/' : 'sol',
		'\uD835\uDD4A' : 'Sopf',
		'\uD835\uDD64' : 'sopf',
		'\u2660' : 'spades',
		'\u2293' : 'sqcap',
		'\u2293\uFE00' : 'sqcaps',
		'\u2294' : 'sqcup',
		'\u2294\uFE00' : 'sqcups',
		'\u228F' : 'sqsub',
		'\u2291' : 'sqsube',
		'\u2290' : 'sqsup',
		'\u2292' : 'sqsupe',
		'\u25A1' : 'squ',
		'\uD835\uDCAE' : 'Sscr',
		'\uD835\uDCC8' : 'sscr',
		'\u22C6' : 'Star',
		'\u2606' : 'star',
		'\u2282' : 'sub',
		'\u22D0' : 'Sub',
		'\u2ABD' : 'subdot',
		'\u2AC5' : 'subE',
		'\u2286' : 'sube',
		'\u2AC3' : 'subedot',
		'\u2AC1' : 'submult',
		'\u2ACB' : 'subnE',
		'\u228A' : 'subne',
		'\u2ABF' : 'subplus',
		'\u2979' : 'subrarr',
		'\u2AC7' : 'subsim',
		'\u2AD5' : 'subsub',
		'\u2AD3' : 'subsup',
		'\u2211' : 'sum',
		'\u266A' : 'sung',
		'\xB9' : 'sup1',
		'\xB2' : 'sup2',
		'\xB3' : 'sup3',
		'\u2283' : 'sup',
		'\u22D1' : 'Sup',
		'\u2ABE' : 'supdot',
		'\u2AD8' : 'supdsub',
		'\u2AC6' : 'supE',
		'\u2287' : 'supe',
		'\u2AC4' : 'supedot',
		'\u27C9' : 'suphsol',
		'\u2AD7' : 'suphsub',
		'\u297B' : 'suplarr',
		'\u2AC2' : 'supmult',
		'\u2ACC' : 'supnE',
		'\u228B' : 'supne',
		'\u2AC0' : 'supplus',
		'\u2AC8' : 'supsim',
		'\u2AD4' : 'supsub',
		'\u2AD6' : 'supsup',
		'\u21D9' : 'swArr',
		'\u292A' : 'swnwar',
		'\xDF' : 'szlig',
		'\t' : 'Tab',
		'\u2316' : 'target',
		'\u03A4' : 'Tau',
		'\u03C4' : 'tau',
		'\u0164' : 'Tcaron',
		'\u0165' : 'tcaron',
		'\u0162' : 'Tcedil',
		'\u0163' : 'tcedil',
		'\u0422' : 'Tcy',
		'\u0442' : 'tcy',
		'\u20DB' : 'tdot',
		'\u2315' : 'telrec',
		'\uD835\uDD17' : 'Tfr',
		'\uD835\uDD31' : 'tfr',
		'\u2234' : 'there4',
		'\u0398' : 'Theta',
		'\u03B8' : 'theta',
		'\u03D1' : 'thetav',
		'\u205F\u200A' : 'ThickSpace',
		'\u2009' : 'thinsp',
		'\xDE' : 'THORN',
		'\xFE' : 'thorn',
		'\u2A31' : 'timesbar',
		'\xD7' : 'times',
		'\u2A30' : 'timesd',
		'\u2336' : 'topbot',
		'\u2AF1' : 'topcir',
		'\uD835\uDD4B' : 'Topf',
		'\uD835\uDD65' : 'topf',
		'\u2ADA' : 'topfork',
		'\u2034' : 'tprime',
		'\u2122' : 'trade',
		'\u25B5' : 'utri',
		'\u225C' : 'trie',
		'\u25EC' : 'tridot',
		'\u2A3A' : 'triminus',
		'\u2A39' : 'triplus',
		'\u29CD' : 'trisb',
		'\u2A3B' : 'tritime',
		'\u23E2' : 'trpezium',
		'\uD835\uDCAF' : 'Tscr',
		'\uD835\uDCC9' : 'tscr',
		'\u0426' : 'TScy',
		'\u0446' : 'tscy',
		'\u040B' : 'TSHcy',
		'\u045B' : 'tshcy',
		'\u0166' : 'Tstrok',
		'\u0167' : 'tstrok',
		'\xDA' : 'Uacute',
		'\xFA' : 'uacute',
		'\u219F' : 'Uarr',
		'\u2949' : 'Uarrocir',
		'\u040E' : 'Ubrcy',
		'\u045E' : 'ubrcy',
		'\u016C' : 'Ubreve',
		'\u016D' : 'ubreve',
		'\xDB' : 'Ucirc',
		'\xFB' : 'ucirc',
		'\u0423' : 'Ucy',
		'\u0443' : 'ucy',
		'\u21C5' : 'udarr',
		'\u0170' : 'Udblac',
		'\u0171' : 'udblac',
		'\u296E' : 'udhar',
		'\u297E' : 'ufisht',
		'\uD835\uDD18' : 'Ufr',
		'\uD835\uDD32' : 'ufr',
		'\xD9' : 'Ugrave',
		'\xF9' : 'ugrave',
		'\u2963' : 'uHar',
		'\u2580' : 'uhblk',
		'\u231C' : 'ulcorn',
		'\u230F' : 'ulcrop',
		'\u25F8' : 'ultri',
		'\u016A' : 'Umacr',
		'\u016B' : 'umacr',
		'\u23DF' : 'UnderBrace',
		'\u23DD' : 'UnderParenthesis',
		'\u228E' : 'uplus',
		'\u0172' : 'Uogon',
		'\u0173' : 'uogon',
		'\uD835\uDD4C' : 'Uopf',
		'\uD835\uDD66' : 'uopf',
		'\u2912' : 'UpArrowBar',
		'\u2195' : 'varr',
		'\u03C5' : 'upsi',
		'\u03D2' : 'Upsi',
		'\u03A5' : 'Upsilon',
		'\u21C8' : 'uuarr',
		'\u231D' : 'urcorn',
		'\u230E' : 'urcrop',
		'\u016E' : 'Uring',
		'\u016F' : 'uring',
		'\u25F9' : 'urtri',
		'\uD835\uDCB0' : 'Uscr',
		'\uD835\uDCCA' : 'uscr',
		'\u22F0' : 'utdot',
		'\u0168' : 'Utilde',
		'\u0169' : 'utilde',
		'\xDC' : 'Uuml',
		'\xFC' : 'uuml',
		'\u29A7' : 'uwangle',
		'\u299C' : 'vangrt',
		'\u228A\uFE00' : 'vsubne',
		'\u2ACB\uFE00' : 'vsubnE',
		'\u228B\uFE00' : 'vsupne',
		'\u2ACC\uFE00' : 'vsupnE',
		'\u2AE8' : 'vBar',
		'\u2AEB' : 'Vbar',
		'\u2AE9' : 'vBarv',
		'\u0412' : 'Vcy',
		'\u0432' : 'vcy',
		'\u22A9' : 'Vdash',
		'\u22AB' : 'VDash',
		'\u2AE6' : 'Vdashl',
		'\u22BB' : 'veebar',
		'\u225A' : 'veeeq',
		'\u22EE' : 'vellip',
		'|' : 'vert',
		'\u2016' : 'Vert',
		'\u2758' : 'VerticalSeparator',
		'\u2240' : 'wr',
		'\uD835\uDD19' : 'Vfr',
		'\uD835\uDD33' : 'vfr',
		'\uD835\uDD4D' : 'Vopf',
		'\uD835\uDD67' : 'vopf',
		'\uD835\uDCB1' : 'Vscr',
		'\uD835\uDCCB' : 'vscr',
		'\u22AA' : 'Vvdash',
		'\u299A' : 'vzigzag',
		'\u0174' : 'Wcirc',
		'\u0175' : 'wcirc',
		'\u2A5F' : 'wedbar',
		'\u2259' : 'wedgeq',
		'\u2118' : 'wp',
		'\uD835\uDD1A' : 'Wfr',
		'\uD835\uDD34' : 'wfr',
		'\uD835\uDD4E' : 'Wopf',
		'\uD835\uDD68' : 'wopf',
		'\uD835\uDCB2' : 'Wscr',
		'\uD835\uDCCC' : 'wscr',
		'\uD835\uDD1B' : 'Xfr',
		'\uD835\uDD35' : 'xfr',
		'\u039E' : 'Xi',
		'\u03BE' : 'xi',
		'\u22FB' : 'xnis',
		'\uD835\uDD4F' : 'Xopf',
		'\uD835\uDD69' : 'xopf',
		'\uD835\uDCB3' : 'Xscr',
		'\uD835\uDCCD' : 'xscr',
		'\xDD' : 'Yacute',
		'\xFD' : 'yacute',
		'\u042F' : 'YAcy',
		'\u044F' : 'yacy',
		'\u0176' : 'Ycirc',
		'\u0177' : 'ycirc',
		'\u042B' : 'Ycy',
		'\u044B' : 'ycy',
		'\xA5' : 'yen',
		'\uD835\uDD1C' : 'Yfr',
		'\uD835\uDD36' : 'yfr',
		'\u0407' : 'YIcy',
		'\u0457' : 'yicy',
		'\uD835\uDD50' : 'Yopf',
		'\uD835\uDD6A' : 'yopf',
		'\uD835\uDCB4' : 'Yscr',
		'\uD835\uDCCE' : 'yscr',
		'\u042E' : 'YUcy',
		'\u044E' : 'yucy',
		'\xFF' : 'yuml',
		'\u0178' : 'Yuml',
		'\u0179' : 'Zacute',
		'\u017A' : 'zacute',
		'\u017D' : 'Zcaron',
		'\u017E' : 'zcaron',
		'\u0417' : 'Zcy',
		'\u0437' : 'zcy',
		'\u017B' : 'Zdot',
		'\u017C' : 'zdot',
		'\u2128' : 'Zfr',
		'\u0396' : 'Zeta',
		'\u03B6' : 'zeta',
		'\uD835\uDD37' : 'zfr',
		'\u0416' : 'ZHcy',
		'\u0436' : 'zhcy',
		'\u21DD' : 'zigrarr',
		'\uD835\uDD6B' : 'zopf',
		'\uD835\uDCB5' : 'Zscr',
		'\uD835\uDCCF' : 'zscr',
		'\u200D' : 'zwj',
		'\u200C' : 'zwnj'
	};
	var regexEscape = /["'`]/g;
	var escapeMap = {
		'"' : '&quot;',
		'&' : '&amp;',
		'\'' : '&#x27;',
		'<' : '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it�s part of a tag or an
		// unquoted attribute value. We�re only escaping it to support those
		// situations, and for XML support.
		'>' : '&gt;',
		// In Internet Explorer = 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`' : '&#x60;'
	};
	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|iacute|Uacute|plusmn|otilde|Otilde|Agrave|agrave|yacute|Yacute|oslash|Oslash|Atilde|atilde|brvbar|Ccedil|ccedil|ograve|curren|divide|Eacute|eacute|Ograve|oacute|Egrave|egrave|ugrave|frac12|frac14|frac34|Ugrave|Oacute|Iacute|ntilde|Ntilde|uacute|middot|Igrave|igrave|iquest|aacute|laquo|THORN|micro|iexcl|icirc|Icirc|Acirc|ucirc|ecirc|Ocirc|ocirc|Ecirc|Ucirc|aring|Aring|aelig|AElig|acute|pound|raquo|acirc|times|thorn|szlig|cedil|COPY|Auml|ordf|ordm|uuml|macr|Uuml|auml|Ouml|ouml|para|nbsp|Euml|quot|QUOT|euml|yuml|cent|sect|copy|sup1|sup2|sup3|Iuml|iuml|shy|eth|reg|not|yen|amp|AMP|REG|uml|ETH|deg|gt|GT|LT|lt)([=a-zA-Z0-9])?/g;
	var decodeMap = {
		'Aacute' : '\xC1',
		'aacute' : '\xE1',
		'Abreve' : '\u0102',
		'abreve' : '\u0103',
		'ac' : '\u223E',
		'acd' : '\u223F',
		'acE' : '\u223E\u0333',
		'Acirc' : '\xC2',
		'acirc' : '\xE2',
		'acute' : '\xB4',
		'Acy' : '\u0410',
		'acy' : '\u0430',
		'AElig' : '\xC6',
		'aelig' : '\xE6',
		'af' : '\u2061',
		'Afr' : '\uD835\uDD04',
		'afr' : '\uD835\uDD1E',
		'Agrave' : '\xC0',
		'agrave' : '\xE0',
		'alefsym' : '\u2135',
		'aleph' : '\u2135',
		'Alpha' : '\u0391',
		'alpha' : '\u03B1',
		'Amacr' : '\u0100',
		'amacr' : '\u0101',
		'amalg' : '\u2A3F',
		'amp' : '&',
		'AMP' : '&',
		'andand' : '\u2A55',
		'And' : '\u2A53',
		'and' : '\u2227',
		'andd' : '\u2A5C',
		'andslope' : '\u2A58',
		'andv' : '\u2A5A',
		'ang' : '\u2220',
		'ange' : '\u29A4',
		'angle' : '\u2220',
		'angmsdaa' : '\u29A8',
		'angmsdab' : '\u29A9',
		'angmsdac' : '\u29AA',
		'angmsdad' : '\u29AB',
		'angmsdae' : '\u29AC',
		'angmsdaf' : '\u29AD',
		'angmsdag' : '\u29AE',
		'angmsdah' : '\u29AF',
		'angmsd' : '\u2221',
		'angrt' : '\u221F',
		'angrtvb' : '\u22BE',
		'angrtvbd' : '\u299D',
		'angsph' : '\u2222',
		'angst' : '\xC5',
		'angzarr' : '\u237C',
		'Aogon' : '\u0104',
		'aogon' : '\u0105',
		'Aopf' : '\uD835\uDD38',
		'aopf' : '\uD835\uDD52',
		'apacir' : '\u2A6F',
		'ap' : '\u2248',
		'apE' : '\u2A70',
		'ape' : '\u224A',
		'apid' : '\u224B',
		'apos' : '\'',
		'ApplyFunction' : '\u2061',
		'approx' : '\u2248',
		'approxeq' : '\u224A',
		'Aring' : '\xC5',
		'aring' : '\xE5',
		'Ascr' : '\uD835\uDC9C',
		'ascr' : '\uD835\uDCB6',
		'Assign' : '\u2254',
		'ast' : '*',
		'asymp' : '\u2248',
		'asympeq' : '\u224D',
		'Atilde' : '\xC3',
		'atilde' : '\xE3',
		'Auml' : '\xC4',
		'auml' : '\xE4',
		'awconint' : '\u2233',
		'awint' : '\u2A11',
		'backcong' : '\u224C',
		'backepsilon' : '\u03F6',
		'backprime' : '\u2035',
		'backsim' : '\u223D',
		'backsimeq' : '\u22CD',
		'Backslash' : '\u2216',
		'Barv' : '\u2AE7',
		'barvee' : '\u22BD',
		'barwed' : '\u2305',
		'Barwed' : '\u2306',
		'barwedge' : '\u2305',
		'bbrk' : '\u23B5',
		'bbrktbrk' : '\u23B6',
		'bcong' : '\u224C',
		'Bcy' : '\u0411',
		'bcy' : '\u0431',
		'bdquo' : '\u201E',
		'becaus' : '\u2235',
		'because' : '\u2235',
		'Because' : '\u2235',
		'bemptyv' : '\u29B0',
		'bepsi' : '\u03F6',
		'bernou' : '\u212C',
		'Bernoullis' : '\u212C',
		'Beta' : '\u0392',
		'beta' : '\u03B2',
		'beth' : '\u2136',
		'between' : '\u226C',
		'Bfr' : '\uD835\uDD05',
		'bfr' : '\uD835\uDD1F',
		'bigcap' : '\u22C2',
		'bigcirc' : '\u25EF',
		'bigcup' : '\u22C3',
		'bigodot' : '\u2A00',
		'bigoplus' : '\u2A01',
		'bigotimes' : '\u2A02',
		'bigsqcup' : '\u2A06',
		'bigstar' : '\u2605',
		'bigtriangledown' : '\u25BD',
		'bigtriangleup' : '\u25B3',
		'biguplus' : '\u2A04',
		'bigvee' : '\u22C1',
		'bigwedge' : '\u22C0',
		'bkarow' : '\u290D',
		'blacklozenge' : '\u29EB',
		'blacksquare' : '\u25AA',
		'blacktriangle' : '\u25B4',
		'blacktriangledown' : '\u25BE',
		'blacktriangleleft' : '\u25C2',
		'blacktriangleright' : '\u25B8',
		'blank' : '\u2423',
		'blk12' : '\u2592',
		'blk14' : '\u2591',
		'blk34' : '\u2593',
		'block' : '\u2588',
		'bne' : '=\u20E5',
		'bnequiv' : '\u2261\u20E5',
		'bNot' : '\u2AED',
		'bnot' : '\u2310',
		'Bopf' : '\uD835\uDD39',
		'bopf' : '\uD835\uDD53',
		'bot' : '\u22A5',
		'bottom' : '\u22A5',
		'bowtie' : '\u22C8',
		'boxbox' : '\u29C9',
		'boxdl' : '\u2510',
		'boxdL' : '\u2555',
		'boxDl' : '\u2556',
		'boxDL' : '\u2557',
		'boxdr' : '\u250C',
		'boxdR' : '\u2552',
		'boxDr' : '\u2553',
		'boxDR' : '\u2554',
		'boxh' : '\u2500',
		'boxH' : '\u2550',
		'boxhd' : '\u252C',
		'boxHd' : '\u2564',
		'boxhD' : '\u2565',
		'boxHD' : '\u2566',
		'boxhu' : '\u2534',
		'boxHu' : '\u2567',
		'boxhU' : '\u2568',
		'boxHU' : '\u2569',
		'boxminus' : '\u229F',
		'boxplus' : '\u229E',
		'boxtimes' : '\u22A0',
		'boxul' : '\u2518',
		'boxuL' : '\u255B',
		'boxUl' : '\u255C',
		'boxUL' : '\u255D',
		'boxur' : '\u2514',
		'boxuR' : '\u2558',
		'boxUr' : '\u2559',
		'boxUR' : '\u255A',
		'boxv' : '\u2502',
		'boxV' : '\u2551',
		'boxvh' : '\u253C',
		'boxvH' : '\u256A',
		'boxVh' : '\u256B',
		'boxVH' : '\u256C',
		'boxvl' : '\u2524',
		'boxvL' : '\u2561',
		'boxVl' : '\u2562',
		'boxVL' : '\u2563',
		'boxvr' : '\u251C',
		'boxvR' : '\u255E',
		'boxVr' : '\u255F',
		'boxVR' : '\u2560',
		'bprime' : '\u2035',
		'breve' : '\u02D8',
		'Breve' : '\u02D8',
		'brvbar' : '\xA6',
		'bscr' : '\uD835\uDCB7',
		'Bscr' : '\u212C',
		'bsemi' : '\u204F',
		'bsim' : '\u223D',
		'bsime' : '\u22CD',
		'bsolb' : '\u29C5',
		'bsol' : '\\',
		'bsolhsub' : '\u27C8',
		'bull' : '\u2022',
		'bullet' : '\u2022',
		'bump' : '\u224E',
		'bumpE' : '\u2AAE',
		'bumpe' : '\u224F',
		'Bumpeq' : '\u224E',
		'bumpeq' : '\u224F',
		'Cacute' : '\u0106',
		'cacute' : '\u0107',
		'capand' : '\u2A44',
		'capbrcup' : '\u2A49',
		'capcap' : '\u2A4B',
		'cap' : '\u2229',
		'Cap' : '\u22D2',
		'capcup' : '\u2A47',
		'capdot' : '\u2A40',
		'CapitalDifferentialD' : '\u2145',
		'caps' : '\u2229\uFE00',
		'caret' : '\u2041',
		'caron' : '\u02C7',
		'Cayleys' : '\u212D',
		'ccaps' : '\u2A4D',
		'Ccaron' : '\u010C',
		'ccaron' : '\u010D',
		'Ccedil' : '\xC7',
		'ccedil' : '\xE7',
		'Ccirc' : '\u0108',
		'ccirc' : '\u0109',
		'Cconint' : '\u2230',
		'ccups' : '\u2A4C',
		'ccupssm' : '\u2A50',
		'Cdot' : '\u010A',
		'cdot' : '\u010B',
		'cedil' : '\xB8',
		'Cedilla' : '\xB8',
		'cemptyv' : '\u29B2',
		'cent' : '\xA2',
		'centerdot' : '\xB7',
		'CenterDot' : '\xB7',
		'cfr' : '\uD835\uDD20',
		'Cfr' : '\u212D',
		'CHcy' : '\u0427',
		'chcy' : '\u0447',
		'check' : '\u2713',
		'checkmark' : '\u2713',
		'Chi' : '\u03A7',
		'chi' : '\u03C7',
		'circ' : '\u02C6',
		'circeq' : '\u2257',
		'circlearrowleft' : '\u21BA',
		'circlearrowright' : '\u21BB',
		'circledast' : '\u229B',
		'circledcirc' : '\u229A',
		'circleddash' : '\u229D',
		'CircleDot' : '\u2299',
		'circledR' : '\xAE',
		'circledS' : '\u24C8',
		'CircleMinus' : '\u2296',
		'CirclePlus' : '\u2295',
		'CircleTimes' : '\u2297',
		'cir' : '\u25CB',
		'cirE' : '\u29C3',
		'cire' : '\u2257',
		'cirfnint' : '\u2A10',
		'cirmid' : '\u2AEF',
		'cirscir' : '\u29C2',
		'ClockwiseContourIntegral' : '\u2232',
		'CloseCurlyDoubleQuote' : '\u201D',
		'CloseCurlyQuote' : '\u2019',
		'clubs' : '\u2663',
		'clubsuit' : '\u2663',
		'colon' : ':',
		'Colon' : '\u2237',
		'Colone' : '\u2A74',
		'colone' : '\u2254',
		'coloneq' : '\u2254',
		'comma' : ',',
		'commat' : '@',
		'comp' : '\u2201',
		'compfn' : '\u2218',
		'complement' : '\u2201',
		'complexes' : '\u2102',
		'cong' : '\u2245',
		'congdot' : '\u2A6D',
		'Congruent' : '\u2261',
		'conint' : '\u222E',
		'Conint' : '\u222F',
		'ContourIntegral' : '\u222E',
		'copf' : '\uD835\uDD54',
		'Copf' : '\u2102',
		'coprod' : '\u2210',
		'Coproduct' : '\u2210',
		'copy' : '\xA9',
		'COPY' : '\xA9',
		'copysr' : '\u2117',
		'CounterClockwiseContourIntegral' : '\u2233',
		'crarr' : '\u21B5',
		'cross' : '\u2717',
		'Cross' : '\u2A2F',
		'Cscr' : '\uD835\uDC9E',
		'cscr' : '\uD835\uDCB8',
		'csub' : '\u2ACF',
		'csube' : '\u2AD1',
		'csup' : '\u2AD0',
		'csupe' : '\u2AD2',
		'ctdot' : '\u22EF',
		'cudarrl' : '\u2938',
		'cudarrr' : '\u2935',
		'cuepr' : '\u22DE',
		'cuesc' : '\u22DF',
		'cularr' : '\u21B6',
		'cularrp' : '\u293D',
		'cupbrcap' : '\u2A48',
		'cupcap' : '\u2A46',
		'CupCap' : '\u224D',
		'cup' : '\u222A',
		'Cup' : '\u22D3',
		'cupcup' : '\u2A4A',
		'cupdot' : '\u228D',
		'cupor' : '\u2A45',
		'cups' : '\u222A\uFE00',
		'curarr' : '\u21B7',
		'curarrm' : '\u293C',
		'curlyeqprec' : '\u22DE',
		'curlyeqsucc' : '\u22DF',
		'curlyvee' : '\u22CE',
		'curlywedge' : '\u22CF',
		'curren' : '\xA4',
		'curvearrowleft' : '\u21B6',
		'curvearrowright' : '\u21B7',
		'cuvee' : '\u22CE',
		'cuwed' : '\u22CF',
		'cwconint' : '\u2232',
		'cwint' : '\u2231',
		'cylcty' : '\u232D',
		'dagger' : '\u2020',
		'Dagger' : '\u2021',
		'daleth' : '\u2138',
		'darr' : '\u2193',
		'Darr' : '\u21A1',
		'dArr' : '\u21D3',
		'dash' : '\u2010',
		'Dashv' : '\u2AE4',
		'dashv' : '\u22A3',
		'dbkarow' : '\u290F',
		'dblac' : '\u02DD',
		'Dcaron' : '\u010E',
		'dcaron' : '\u010F',
		'Dcy' : '\u0414',
		'dcy' : '\u0434',
		'ddagger' : '\u2021',
		'ddarr' : '\u21CA',
		'DD' : '\u2145',
		'dd' : '\u2146',
		'DDotrahd' : '\u2911',
		'ddotseq' : '\u2A77',
		'deg' : '\xB0',
		'Del' : '\u2207',
		'Delta' : '\u0394',
		'delta' : '\u03B4',
		'demptyv' : '\u29B1',
		'dfisht' : '\u297F',
		'Dfr' : '\uD835\uDD07',
		'dfr' : '\uD835\uDD21',
		'dHar' : '\u2965',
		'dharl' : '\u21C3',
		'dharr' : '\u21C2',
		'DiacriticalAcute' : '\xB4',
		'DiacriticalDot' : '\u02D9',
		'DiacriticalDoubleAcute' : '\u02DD',
		'DiacriticalGrave' : '`',
		'DiacriticalTilde' : '\u02DC',
		'diam' : '\u22C4',
		'diamond' : '\u22C4',
		'Diamond' : '\u22C4',
		'diamondsuit' : '\u2666',
		'diams' : '\u2666',
		'die' : '\xA8',
		'DifferentialD' : '\u2146',
		'digamma' : '\u03DD',
		'disin' : '\u22F2',
		'div' : '\xF7',
		'divide' : '\xF7',
		'divideontimes' : '\u22C7',
		'divonx' : '\u22C7',
		'DJcy' : '\u0402',
		'djcy' : '\u0452',
		'dlcorn' : '\u231E',
		'dlcrop' : '\u230D',
		'dollar' : '$',
		'Dopf' : '\uD835\uDD3B',
		'dopf' : '\uD835\uDD55',
		'Dot' : '\xA8',
		'dot' : '\u02D9',
		'DotDot' : '\u20DC',
		'doteq' : '\u2250',
		'doteqdot' : '\u2251',
		'DotEqual' : '\u2250',
		'dotminus' : '\u2238',
		'dotplus' : '\u2214',
		'dotsquare' : '\u22A1',
		'doublebarwedge' : '\u2306',
		'DoubleContourIntegral' : '\u222F',
		'DoubleDot' : '\xA8',
		'DoubleDownArrow' : '\u21D3',
		'DoubleLeftArrow' : '\u21D0',
		'DoubleLeftRightArrow' : '\u21D4',
		'DoubleLeftTee' : '\u2AE4',
		'DoubleLongLeftArrow' : '\u27F8',
		'DoubleLongLeftRightArrow' : '\u27FA',
		'DoubleLongRightArrow' : '\u27F9',
		'DoubleRightArrow' : '\u21D2',
		'DoubleRightTee' : '\u22A8',
		'DoubleUpArrow' : '\u21D1',
		'DoubleUpDownArrow' : '\u21D5',
		'DoubleVerticalBar' : '\u2225',
		'DownArrowBar' : '\u2913',
		'downarrow' : '\u2193',
		'DownArrow' : '\u2193',
		'Downarrow' : '\u21D3',
		'DownArrowUpArrow' : '\u21F5',
		'DownBreve' : '\u0311',
		'downdownarrows' : '\u21CA',
		'downharpoonleft' : '\u21C3',
		'downharpoonright' : '\u21C2',
		'DownLeftRightVector' : '\u2950',
		'DownLeftTeeVector' : '\u295E',
		'DownLeftVectorBar' : '\u2956',
		'DownLeftVector' : '\u21BD',
		'DownRightTeeVector' : '\u295F',
		'DownRightVectorBar' : '\u2957',
		'DownRightVector' : '\u21C1',
		'DownTeeArrow' : '\u21A7',
		'DownTee' : '\u22A4',
		'drbkarow' : '\u2910',
		'drcorn' : '\u231F',
		'drcrop' : '\u230C',
		'Dscr' : '\uD835\uDC9F',
		'dscr' : '\uD835\uDCB9',
		'DScy' : '\u0405',
		'dscy' : '\u0455',
		'dsol' : '\u29F6',
		'Dstrok' : '\u0110',
		'dstrok' : '\u0111',
		'dtdot' : '\u22F1',
		'dtri' : '\u25BF',
		'dtrif' : '\u25BE',
		'duarr' : '\u21F5',
		'duhar' : '\u296F',
		'dwangle' : '\u29A6',
		'DZcy' : '\u040F',
		'dzcy' : '\u045F',
		'dzigrarr' : '\u27FF',
		'Eacute' : '\xC9',
		'eacute' : '\xE9',
		'easter' : '\u2A6E',
		'Ecaron' : '\u011A',
		'ecaron' : '\u011B',
		'Ecirc' : '\xCA',
		'ecirc' : '\xEA',
		'ecir' : '\u2256',
		'ecolon' : '\u2255',
		'Ecy' : '\u042D',
		'ecy' : '\u044D',
		'eDDot' : '\u2A77',
		'Edot' : '\u0116',
		'edot' : '\u0117',
		'eDot' : '\u2251',
		'ee' : '\u2147',
		'efDot' : '\u2252',
		'Efr' : '\uD835\uDD08',
		'efr' : '\uD835\uDD22',
		'eg' : '\u2A9A',
		'Egrave' : '\xC8',
		'egrave' : '\xE8',
		'egs' : '\u2A96',
		'egsdot' : '\u2A98',
		'el' : '\u2A99',
		'Element' : '\u2208',
		'elinters' : '\u23E7',
		'ell' : '\u2113',
		'els' : '\u2A95',
		'elsdot' : '\u2A97',
		'Emacr' : '\u0112',
		'emacr' : '\u0113',
		'empty' : '\u2205',
		'emptyset' : '\u2205',
		'EmptySmallSquare' : '\u25FB',
		'emptyv' : '\u2205',
		'EmptyVerySmallSquare' : '\u25AB',
		'emsp13' : '\u2004',
		'emsp14' : '\u2005',
		'emsp' : '\u2003',
		'ENG' : '\u014A',
		'eng' : '\u014B',
		'ensp' : '\u2002',
		'Eogon' : '\u0118',
		'eogon' : '\u0119',
		'Eopf' : '\uD835\uDD3C',
		'eopf' : '\uD835\uDD56',
		'epar' : '\u22D5',
		'eparsl' : '\u29E3',
		'eplus' : '\u2A71',
		'epsi' : '\u03B5',
		'Epsilon' : '\u0395',
		'epsilon' : '\u03B5',
		'epsiv' : '\u03F5',
		'eqcirc' : '\u2256',
		'eqcolon' : '\u2255',
		'eqsim' : '\u2242',
		'eqslantgtr' : '\u2A96',
		'eqslantless' : '\u2A95',
		'Equal' : '\u2A75',
		'equals' : '=',
		'EqualTilde' : '\u2242',
		'equest' : '\u225F',
		'Equilibrium' : '\u21CC',
		'equiv' : '\u2261',
		'equivDD' : '\u2A78',
		'eqvparsl' : '\u29E5',
		'erarr' : '\u2971',
		'erDot' : '\u2253',
		'escr' : '\u212F',
		'Escr' : '\u2130',
		'esdot' : '\u2250',
		'Esim' : '\u2A73',
		'esim' : '\u2242',
		'Eta' : '\u0397',
		'eta' : '\u03B7',
		'ETH' : '\xD0',
		'eth' : '\xF0',
		'Euml' : '\xCB',
		'euml' : '\xEB',
		'euro' : '\u20AC',
		'excl' : '!',
		'exist' : '\u2203',
		'Exists' : '\u2203',
		'expectation' : '\u2130',
		'exponentiale' : '\u2147',
		'ExponentialE' : '\u2147',
		'fallingdotseq' : '\u2252',
		'Fcy' : '\u0424',
		'fcy' : '\u0444',
		'female' : '\u2640',
		'ffilig' : '\uFB03',
		'fflig' : '\uFB00',
		'ffllig' : '\uFB04',
		'Ffr' : '\uD835\uDD09',
		'ffr' : '\uD835\uDD23',
		'filig' : '\uFB01',
		'FilledSmallSquare' : '\u25FC',
		'FilledVerySmallSquare' : '\u25AA',
		'fjlig' : 'fj',
		'flat' : '\u266D',
		'fllig' : '\uFB02',
		'fltns' : '\u25B1',
		'fnof' : '\u0192',
		'Fopf' : '\uD835\uDD3D',
		'fopf' : '\uD835\uDD57',
		'forall' : '\u2200',
		'ForAll' : '\u2200',
		'fork' : '\u22D4',
		'forkv' : '\u2AD9',
		'Fouriertrf' : '\u2131',
		'fpartint' : '\u2A0D',
		'frac12' : '\xBD',
		'frac13' : '\u2153',
		'frac14' : '\xBC',
		'frac15' : '\u2155',
		'frac16' : '\u2159',
		'frac18' : '\u215B',
		'frac23' : '\u2154',
		'frac25' : '\u2156',
		'frac34' : '\xBE',
		'frac35' : '\u2157',
		'frac38' : '\u215C',
		'frac45' : '\u2158',
		'frac56' : '\u215A',
		'frac58' : '\u215D',
		'frac78' : '\u215E',
		'frasl' : '\u2044',
		'frown' : '\u2322',
		'fscr' : '\uD835\uDCBB',
		'Fscr' : '\u2131',
		'gacute' : '\u01F5',
		'Gamma' : '\u0393',
		'gamma' : '\u03B3',
		'Gammad' : '\u03DC',
		'gammad' : '\u03DD',
		'gap' : '\u2A86',
		'Gbreve' : '\u011E',
		'gbreve' : '\u011F',
		'Gcedil' : '\u0122',
		'Gcirc' : '\u011C',
		'gcirc' : '\u011D',
		'Gcy' : '\u0413',
		'gcy' : '\u0433',
		'Gdot' : '\u0120',
		'gdot' : '\u0121',
		'ge' : '\u2265',
		'gE' : '\u2267',
		'gEl' : '\u2A8C',
		'gel' : '\u22DB',
		'geq' : '\u2265',
		'geqq' : '\u2267',
		'geqslant' : '\u2A7E',
		'gescc' : '\u2AA9',
		'ges' : '\u2A7E',
		'gesdot' : '\u2A80',
		'gesdoto' : '\u2A82',
		'gesdotol' : '\u2A84',
		'gesl' : '\u22DB\uFE00',
		'gesles' : '\u2A94',
		'Gfr' : '\uD835\uDD0A',
		'gfr' : '\uD835\uDD24',
		'gg' : '\u226B',
		'Gg' : '\u22D9',
		'ggg' : '\u22D9',
		'gimel' : '\u2137',
		'GJcy' : '\u0403',
		'gjcy' : '\u0453',
		'gla' : '\u2AA5',
		'gl' : '\u2277',
		'glE' : '\u2A92',
		'glj' : '\u2AA4',
		'gnap' : '\u2A8A',
		'gnapprox' : '\u2A8A',
		'gne' : '\u2A88',
		'gnE' : '\u2269',
		'gneq' : '\u2A88',
		'gneqq' : '\u2269',
		'gnsim' : '\u22E7',
		'Gopf' : '\uD835\uDD3E',
		'gopf' : '\uD835\uDD58',
		'grave' : '`',
		'GreaterEqual' : '\u2265',
		'GreaterEqualLess' : '\u22DB',
		'GreaterFullEqual' : '\u2267',
		'GreaterGreater' : '\u2AA2',
		'GreaterLess' : '\u2277',
		'GreaterSlantEqual' : '\u2A7E',
		'GreaterTilde' : '\u2273',
		'Gscr' : '\uD835\uDCA2',
		'gscr' : '\u210A',
		'gsim' : '\u2273',
		'gsime' : '\u2A8E',
		'gsiml' : '\u2A90',
		'gtcc' : '\u2AA7',
		'gtcir' : '\u2A7A',
		'gt' : '>',
		'GT' : '>',
		'Gt' : '\u226B',
		'gtdot' : '\u22D7',
		'gtlPar' : '\u2995',
		'gtquest' : '\u2A7C',
		'gtrapprox' : '\u2A86',
		'gtrarr' : '\u2978',
		'gtrdot' : '\u22D7',
		'gtreqless' : '\u22DB',
		'gtreqqless' : '\u2A8C',
		'gtrless' : '\u2277',
		'gtrsim' : '\u2273',
		'gvertneqq' : '\u2269\uFE00',
		'gvnE' : '\u2269\uFE00',
		'Hacek' : '\u02C7',
		'hairsp' : '\u200A',
		'half' : '\xBD',
		'hamilt' : '\u210B',
		'HARDcy' : '\u042A',
		'hardcy' : '\u044A',
		'harrcir' : '\u2948',
		'harr' : '\u2194',
		'hArr' : '\u21D4',
		'harrw' : '\u21AD',
		'Hat' : '^',
		'hbar' : '\u210F',
		'Hcirc' : '\u0124',
		'hcirc' : '\u0125',
		'hearts' : '\u2665',
		'heartsuit' : '\u2665',
		'hellip' : '\u2026',
		'hercon' : '\u22B9',
		'hfr' : '\uD835\uDD25',
		'Hfr' : '\u210C',
		'HilbertSpace' : '\u210B',
		'hksearow' : '\u2925',
		'hkswarow' : '\u2926',
		'hoarr' : '\u21FF',
		'homtht' : '\u223B',
		'hookleftarrow' : '\u21A9',
		'hookrightarrow' : '\u21AA',
		'hopf' : '\uD835\uDD59',
		'Hopf' : '\u210D',
		'horbar' : '\u2015',
		'HorizontalLine' : '\u2500',
		'hscr' : '\uD835\uDCBD',
		'Hscr' : '\u210B',
		'hslash' : '\u210F',
		'Hstrok' : '\u0126',
		'hstrok' : '\u0127',
		'HumpDownHump' : '\u224E',
		'HumpEqual' : '\u224F',
		'hybull' : '\u2043',
		'hyphen' : '\u2010',
		'Iacute' : '\xCD',
		'iacute' : '\xED',
		'ic' : '\u2063',
		'Icirc' : '\xCE',
		'icirc' : '\xEE',
		'Icy' : '\u0418',
		'icy' : '\u0438',
		'Idot' : '\u0130',
		'IEcy' : '\u0415',
		'iecy' : '\u0435',
		'iexcl' : '\xA1',
		'iff' : '\u21D4',
		'ifr' : '\uD835\uDD26',
		'Ifr' : '\u2111',
		'Igrave' : '\xCC',
		'igrave' : '\xEC',
		'ii' : '\u2148',
		'iiiint' : '\u2A0C',
		'iiint' : '\u222D',
		'iinfin' : '\u29DC',
		'iiota' : '\u2129',
		'IJlig' : '\u0132',
		'ijlig' : '\u0133',
		'Imacr' : '\u012A',
		'imacr' : '\u012B',
		'image' : '\u2111',
		'ImaginaryI' : '\u2148',
		'imagline' : '\u2110',
		'imagpart' : '\u2111',
		'imath' : '\u0131',
		'Im' : '\u2111',
		'imof' : '\u22B7',
		'imped' : '\u01B5',
		'Implies' : '\u21D2',
		'incare' : '\u2105',
		'in' : '\u2208',
		'infin' : '\u221E',
		'infintie' : '\u29DD',
		'inodot' : '\u0131',
		'intcal' : '\u22BA',
		'int' : '\u222B',
		'Int' : '\u222C',
		'integers' : '\u2124',
		'Integral' : '\u222B',
		'intercal' : '\u22BA',
		'Intersection' : '\u22C2',
		'intlarhk' : '\u2A17',
		'intprod' : '\u2A3C',
		'InvisibleComma' : '\u2063',
		'InvisibleTimes' : '\u2062',
		'IOcy' : '\u0401',
		'iocy' : '\u0451',
		'Iogon' : '\u012E',
		'iogon' : '\u012F',
		'Iopf' : '\uD835\uDD40',
		'iopf' : '\uD835\uDD5A',
		'Iota' : '\u0399',
		'iota' : '\u03B9',
		'iprod' : '\u2A3C',
		'iquest' : '\xBF',
		'iscr' : '\uD835\uDCBE',
		'Iscr' : '\u2110',
		'isin' : '\u2208',
		'isindot' : '\u22F5',
		'isinE' : '\u22F9',
		'isins' : '\u22F4',
		'isinsv' : '\u22F3',
		'isinv' : '\u2208',
		'it' : '\u2062',
		'Itilde' : '\u0128',
		'itilde' : '\u0129',
		'Iukcy' : '\u0406',
		'iukcy' : '\u0456',
		'Iuml' : '\xCF',
		'iuml' : '\xEF',
		'Jcirc' : '\u0134',
		'jcirc' : '\u0135',
		'Jcy' : '\u0419',
		'jcy' : '\u0439',
		'Jfr' : '\uD835\uDD0D',
		'jfr' : '\uD835\uDD27',
		'jmath' : '\u0237',
		'Jopf' : '\uD835\uDD41',
		'jopf' : '\uD835\uDD5B',
		'Jscr' : '\uD835\uDCA5',
		'jscr' : '\uD835\uDCBF',
		'Jsercy' : '\u0408',
		'jsercy' : '\u0458',
		'Jukcy' : '\u0404',
		'jukcy' : '\u0454',
		'Kappa' : '\u039A',
		'kappa' : '\u03BA',
		'kappav' : '\u03F0',
		'Kcedil' : '\u0136',
		'kcedil' : '\u0137',
		'Kcy' : '\u041A',
		'kcy' : '\u043A',
		'Kfr' : '\uD835\uDD0E',
		'kfr' : '\uD835\uDD28',
		'kgreen' : '\u0138',
		'KHcy' : '\u0425',
		'khcy' : '\u0445',
		'KJcy' : '\u040C',
		'kjcy' : '\u045C',
		'Kopf' : '\uD835\uDD42',
		'kopf' : '\uD835\uDD5C',
		'Kscr' : '\uD835\uDCA6',
		'kscr' : '\uD835\uDCC0',
		'lAarr' : '\u21DA',
		'Lacute' : '\u0139',
		'lacute' : '\u013A',
		'laemptyv' : '\u29B4',
		'lagran' : '\u2112',
		'Lambda' : '\u039B',
		'lambda' : '\u03BB',
		'lang' : '\u27E8',
		'Lang' : '\u27EA',
		'langd' : '\u2991',
		'langle' : '\u27E8',
		'lap' : '\u2A85',
		'Laplacetrf' : '\u2112',
		'laquo' : '\xAB',
		'larrb' : '\u21E4',
		'larrbfs' : '\u291F',
		'larr' : '\u2190',
		'Larr' : '\u219E',
		'lArr' : '\u21D0',
		'larrfs' : '\u291D',
		'larrhk' : '\u21A9',
		'larrlp' : '\u21AB',
		'larrpl' : '\u2939',
		'larrsim' : '\u2973',
		'larrtl' : '\u21A2',
		'latail' : '\u2919',
		'lAtail' : '\u291B',
		'lat' : '\u2AAB',
		'late' : '\u2AAD',
		'lates' : '\u2AAD\uFE00',
		'lbarr' : '\u290C',
		'lBarr' : '\u290E',
		'lbbrk' : '\u2772',
		'lbrace' : '{',
		'lbrack' : '[',
		'lbrke' : '\u298B',
		'lbrksld' : '\u298F',
		'lbrkslu' : '\u298D',
		'Lcaron' : '\u013D',
		'lcaron' : '\u013E',
		'Lcedil' : '\u013B',
		'lcedil' : '\u013C',
		'lceil' : '\u2308',
		'lcub' : '{',
		'Lcy' : '\u041B',
		'lcy' : '\u043B',
		'ldca' : '\u2936',
		'ldquo' : '\u201C',
		'ldquor' : '\u201E',
		'ldrdhar' : '\u2967',
		'ldrushar' : '\u294B',
		'ldsh' : '\u21B2',
		'le' : '\u2264',
		'lE' : '\u2266',
		'LeftAngleBracket' : '\u27E8',
		'LeftArrowBar' : '\u21E4',
		'leftarrow' : '\u2190',
		'LeftArrow' : '\u2190',
		'Leftarrow' : '\u21D0',
		'LeftArrowRightArrow' : '\u21C6',
		'leftarrowtail' : '\u21A2',
		'LeftCeiling' : '\u2308',
		'LeftDoubleBracket' : '\u27E6',
		'LeftDownTeeVector' : '\u2961',
		'LeftDownVectorBar' : '\u2959',
		'LeftDownVector' : '\u21C3',
		'LeftFloor' : '\u230A',
		'leftharpoondown' : '\u21BD',
		'leftharpoonup' : '\u21BC',
		'leftleftarrows' : '\u21C7',
		'leftrightarrow' : '\u2194',
		'LeftRightArrow' : '\u2194',
		'Leftrightarrow' : '\u21D4',
		'leftrightarrows' : '\u21C6',
		'leftrightharpoons' : '\u21CB',
		'leftrightsquigarrow' : '\u21AD',
		'LeftRightVector' : '\u294E',
		'LeftTeeArrow' : '\u21A4',
		'LeftTee' : '\u22A3',
		'LeftTeeVector' : '\u295A',
		'leftthreetimes' : '\u22CB',
		'LeftTriangleBar' : '\u29CF',
		'LeftTriangle' : '\u22B2',
		'LeftTriangleEqual' : '\u22B4',
		'LeftUpDownVector' : '\u2951',
		'LeftUpTeeVector' : '\u2960',
		'LeftUpVectorBar' : '\u2958',
		'LeftUpVector' : '\u21BF',
		'LeftVectorBar' : '\u2952',
		'LeftVector' : '\u21BC',
		'lEg' : '\u2A8B',
		'leg' : '\u22DA',
		'leq' : '\u2264',
		'leqq' : '\u2266',
		'leqslant' : '\u2A7D',
		'lescc' : '\u2AA8',
		'les' : '\u2A7D',
		'lesdot' : '\u2A7F',
		'lesdoto' : '\u2A81',
		'lesdotor' : '\u2A83',
		'lesg' : '\u22DA\uFE00',
		'lesges' : '\u2A93',
		'lessapprox' : '\u2A85',
		'lessdot' : '\u22D6',
		'lesseqgtr' : '\u22DA',
		'lesseqqgtr' : '\u2A8B',
		'LessEqualGreater' : '\u22DA',
		'LessFullEqual' : '\u2266',
		'LessGreater' : '\u2276',
		'lessgtr' : '\u2276',
		'LessLess' : '\u2AA1',
		'lesssim' : '\u2272',
		'LessSlantEqual' : '\u2A7D',
		'LessTilde' : '\u2272',
		'lfisht' : '\u297C',
		'lfloor' : '\u230A',
		'Lfr' : '\uD835\uDD0F',
		'lfr' : '\uD835\uDD29',
		'lg' : '\u2276',
		'lgE' : '\u2A91',
		'lHar' : '\u2962',
		'lhard' : '\u21BD',
		'lharu' : '\u21BC',
		'lharul' : '\u296A',
		'lhblk' : '\u2584',
		'LJcy' : '\u0409',
		'ljcy' : '\u0459',
		'llarr' : '\u21C7',
		'll' : '\u226A',
		'Ll' : '\u22D8',
		'llcorner' : '\u231E',
		'Lleftarrow' : '\u21DA',
		'llhard' : '\u296B',
		'lltri' : '\u25FA',
		'Lmidot' : '\u013F',
		'lmidot' : '\u0140',
		'lmoustache' : '\u23B0',
		'lmoust' : '\u23B0',
		'lnap' : '\u2A89',
		'lnapprox' : '\u2A89',
		'lne' : '\u2A87',
		'lnE' : '\u2268',
		'lneq' : '\u2A87',
		'lneqq' : '\u2268',
		'lnsim' : '\u22E6',
		'loang' : '\u27EC',
		'loarr' : '\u21FD',
		'lobrk' : '\u27E6',
		'longleftarrow' : '\u27F5',
		'LongLeftArrow' : '\u27F5',
		'Longleftarrow' : '\u27F8',
		'longleftrightarrow' : '\u27F7',
		'LongLeftRightArrow' : '\u27F7',
		'Longleftrightarrow' : '\u27FA',
		'longmapsto' : '\u27FC',
		'longrightarrow' : '\u27F6',
		'LongRightArrow' : '\u27F6',
		'Longrightarrow' : '\u27F9',
		'looparrowleft' : '\u21AB',
		'looparrowright' : '\u21AC',
		'lopar' : '\u2985',
		'Lopf' : '\uD835\uDD43',
		'lopf' : '\uD835\uDD5D',
		'loplus' : '\u2A2D',
		'lotimes' : '\u2A34',
		'lowast' : '\u2217',
		'lowbar' : '_',
		'LowerLeftArrow' : '\u2199',
		'LowerRightArrow' : '\u2198',
		'loz' : '\u25CA',
		'lozenge' : '\u25CA',
		'lozf' : '\u29EB',
		'lpar' : '(',
		'lparlt' : '\u2993',
		'lrarr' : '\u21C6',
		'lrcorner' : '\u231F',
		'lrhar' : '\u21CB',
		'lrhard' : '\u296D',
		'lrm' : '\u200E',
		'lrtri' : '\u22BF',
		'lsaquo' : '\u2039',
		'lscr' : '\uD835\uDCC1',
		'Lscr' : '\u2112',
		'lsh' : '\u21B0',
		'Lsh' : '\u21B0',
		'lsim' : '\u2272',
		'lsime' : '\u2A8D',
		'lsimg' : '\u2A8F',
		'lsqb' : '[',
		'lsquo' : '\u2018',
		'lsquor' : '\u201A',
		'Lstrok' : '\u0141',
		'lstrok' : '\u0142',
		'ltcc' : '\u2AA6',
		'ltcir' : '\u2A79',
		'lt' : '<',
		'LT' : '<',
		'Lt' : '\u226A',
		'ltdot' : '\u22D6',
		'lthree' : '\u22CB',
		'ltimes' : '\u22C9',
		'ltlarr' : '\u2976',
		'ltquest' : '\u2A7B',
		'ltri' : '\u25C3',
		'ltrie' : '\u22B4',
		'ltrif' : '\u25C2',
		'ltrPar' : '\u2996',
		'lurdshar' : '\u294A',
		'luruhar' : '\u2966',
		'lvertneqq' : '\u2268\uFE00',
		'lvnE' : '\u2268\uFE00',
		'macr' : '\xAF',
		'male' : '\u2642',
		'malt' : '\u2720',
		'maltese' : '\u2720',
		'Map' : '\u2905',
		'map' : '\u21A6',
		'mapsto' : '\u21A6',
		'mapstodown' : '\u21A7',
		'mapstoleft' : '\u21A4',
		'mapstoup' : '\u21A5',
		'marker' : '\u25AE',
		'mcomma' : '\u2A29',
		'Mcy' : '\u041C',
		'mcy' : '\u043C',
		'mdash' : '\u2014',
		'mDDot' : '\u223A',
		'measuredangle' : '\u2221',
		'MediumSpace' : '\u205F',
		'Mellintrf' : '\u2133',
		'Mfr' : '\uD835\uDD10',
		'mfr' : '\uD835\uDD2A',
		'mho' : '\u2127',
		'micro' : '\xB5',
		'midast' : '*',
		'midcir' : '\u2AF0',
		'mid' : '\u2223',
		'middot' : '\xB7',
		'minusb' : '\u229F',
		'minus' : '\u2212',
		'minusd' : '\u2238',
		'minusdu' : '\u2A2A',
		'MinusPlus' : '\u2213',
		'mlcp' : '\u2ADB',
		'mldr' : '\u2026',
		'mnplus' : '\u2213',
		'models' : '\u22A7',
		'Mopf' : '\uD835\uDD44',
		'mopf' : '\uD835\uDD5E',
		'mp' : '\u2213',
		'mscr' : '\uD835\uDCC2',
		'Mscr' : '\u2133',
		'mstpos' : '\u223E',
		'Mu' : '\u039C',
		'mu' : '\u03BC',
		'multimap' : '\u22B8',
		'mumap' : '\u22B8',
		'nabla' : '\u2207',
		'Nacute' : '\u0143',
		'nacute' : '\u0144',
		'nang' : '\u2220\u20D2',
		'nap' : '\u2249',
		'napE' : '\u2A70\u0338',
		'napid' : '\u224B\u0338',
		'napos' : '\u0149',
		'napprox' : '\u2249',
		'natural' : '\u266E',
		'naturals' : '\u2115',
		'natur' : '\u266E',
		'nbsp' : '\xA0',
		'nbump' : '\u224E\u0338',
		'nbumpe' : '\u224F\u0338',
		'ncap' : '\u2A43',
		'Ncaron' : '\u0147',
		'ncaron' : '\u0148',
		'Ncedil' : '\u0145',
		'ncedil' : '\u0146',
		'ncong' : '\u2247',
		'ncongdot' : '\u2A6D\u0338',
		'ncup' : '\u2A42',
		'Ncy' : '\u041D',
		'ncy' : '\u043D',
		'ndash' : '\u2013',
		'nearhk' : '\u2924',
		'nearr' : '\u2197',
		'neArr' : '\u21D7',
		'nearrow' : '\u2197',
		'ne' : '\u2260',
		'nedot' : '\u2250\u0338',
		'NegativeMediumSpace' : '\u200B',
		'NegativeThickSpace' : '\u200B',
		'NegativeThinSpace' : '\u200B',
		'NegativeVeryThinSpace' : '\u200B',
		'nequiv' : '\u2262',
		'nesear' : '\u2928',
		'nesim' : '\u2242\u0338',
		'NestedGreaterGreater' : '\u226B',
		'NestedLessLess' : '\u226A',
		'NewLine' : '\n',
		'nexist' : '\u2204',
		'nexists' : '\u2204',
		'Nfr' : '\uD835\uDD11',
		'nfr' : '\uD835\uDD2B',
		'ngE' : '\u2267\u0338',
		'nge' : '\u2271',
		'ngeq' : '\u2271',
		'ngeqq' : '\u2267\u0338',
		'ngeqslant' : '\u2A7E\u0338',
		'nges' : '\u2A7E\u0338',
		'nGg' : '\u22D9\u0338',
		'ngsim' : '\u2275',
		'nGt' : '\u226B\u20D2',
		'ngt' : '\u226F',
		'ngtr' : '\u226F',
		'nGtv' : '\u226B\u0338',
		'nharr' : '\u21AE',
		'nhArr' : '\u21CE',
		'nhpar' : '\u2AF2',
		'ni' : '\u220B',
		'nis' : '\u22FC',
		'nisd' : '\u22FA',
		'niv' : '\u220B',
		'NJcy' : '\u040A',
		'njcy' : '\u045A',
		'nlarr' : '\u219A',
		'nlArr' : '\u21CD',
		'nldr' : '\u2025',
		'nlE' : '\u2266\u0338',
		'nle' : '\u2270',
		'nleftarrow' : '\u219A',
		'nLeftarrow' : '\u21CD',
		'nleftrightarrow' : '\u21AE',
		'nLeftrightarrow' : '\u21CE',
		'nleq' : '\u2270',
		'nleqq' : '\u2266\u0338',
		'nleqslant' : '\u2A7D\u0338',
		'nles' : '\u2A7D\u0338',
		'nless' : '\u226E',
		'nLl' : '\u22D8\u0338',
		'nlsim' : '\u2274',
		'nLt' : '\u226A\u20D2',
		'nlt' : '\u226E',
		'nltri' : '\u22EA',
		'nltrie' : '\u22EC',
		'nLtv' : '\u226A\u0338',
		'nmid' : '\u2224',
		'NoBreak' : '\u2060',
		'NonBreakingSpace' : '\xA0',
		'nopf' : '\uD835\uDD5F',
		'Nopf' : '\u2115',
		'Not' : '\u2AEC',
		'not' : '\xAC',
		'NotCongruent' : '\u2262',
		'NotCupCap' : '\u226D',
		'NotDoubleVerticalBar' : '\u2226',
		'NotElement' : '\u2209',
		'NotEqual' : '\u2260',
		'NotEqualTilde' : '\u2242\u0338',
		'NotExists' : '\u2204',
		'NotGreater' : '\u226F',
		'NotGreaterEqual' : '\u2271',
		'NotGreaterFullEqual' : '\u2267\u0338',
		'NotGreaterGreater' : '\u226B\u0338',
		'NotGreaterLess' : '\u2279',
		'NotGreaterSlantEqual' : '\u2A7E\u0338',
		'NotGreaterTilde' : '\u2275',
		'NotHumpDownHump' : '\u224E\u0338',
		'NotHumpEqual' : '\u224F\u0338',
		'notin' : '\u2209',
		'notindot' : '\u22F5\u0338',
		'notinE' : '\u22F9\u0338',
		'notinva' : '\u2209',
		'notinvb' : '\u22F7',
		'notinvc' : '\u22F6',
		'NotLeftTriangleBar' : '\u29CF\u0338',
		'NotLeftTriangle' : '\u22EA',
		'NotLeftTriangleEqual' : '\u22EC',
		'NotLess' : '\u226E',
		'NotLessEqual' : '\u2270',
		'NotLessGreater' : '\u2278',
		'NotLessLess' : '\u226A\u0338',
		'NotLessSlantEqual' : '\u2A7D\u0338',
		'NotLessTilde' : '\u2274',
		'NotNestedGreaterGreater' : '\u2AA2\u0338',
		'NotNestedLessLess' : '\u2AA1\u0338',
		'notni' : '\u220C',
		'notniva' : '\u220C',
		'notnivb' : '\u22FE',
		'notnivc' : '\u22FD',
		'NotPrecedes' : '\u2280',
		'NotPrecedesEqual' : '\u2AAF\u0338',
		'NotPrecedesSlantEqual' : '\u22E0',
		'NotReverseElement' : '\u220C',
		'NotRightTriangleBar' : '\u29D0\u0338',
		'NotRightTriangle' : '\u22EB',
		'NotRightTriangleEqual' : '\u22ED',
		'NotSquareSubset' : '\u228F\u0338',
		'NotSquareSubsetEqual' : '\u22E2',
		'NotSquareSuperset' : '\u2290\u0338',
		'NotSquareSupersetEqual' : '\u22E3',
		'NotSubset' : '\u2282\u20D2',
		'NotSubsetEqual' : '\u2288',
		'NotSucceeds' : '\u2281',
		'NotSucceedsEqual' : '\u2AB0\u0338',
		'NotSucceedsSlantEqual' : '\u22E1',
		'NotSucceedsTilde' : '\u227F\u0338',
		'NotSuperset' : '\u2283\u20D2',
		'NotSupersetEqual' : '\u2289',
		'NotTilde' : '\u2241',
		'NotTildeEqual' : '\u2244',
		'NotTildeFullEqual' : '\u2247',
		'NotTildeTilde' : '\u2249',
		'NotVerticalBar' : '\u2224',
		'nparallel' : '\u2226',
		'npar' : '\u2226',
		'nparsl' : '\u2AFD\u20E5',
		'npart' : '\u2202\u0338',
		'npolint' : '\u2A14',
		'npr' : '\u2280',
		'nprcue' : '\u22E0',
		'nprec' : '\u2280',
		'npreceq' : '\u2AAF\u0338',
		'npre' : '\u2AAF\u0338',
		'nrarrc' : '\u2933\u0338',
		'nrarr' : '\u219B',
		'nrArr' : '\u21CF',
		'nrarrw' : '\u219D\u0338',
		'nrightarrow' : '\u219B',
		'nRightarrow' : '\u21CF',
		'nrtri' : '\u22EB',
		'nrtrie' : '\u22ED',
		'nsc' : '\u2281',
		'nsccue' : '\u22E1',
		'nsce' : '\u2AB0\u0338',
		'Nscr' : '\uD835\uDCA9',
		'nscr' : '\uD835\uDCC3',
		'nshortmid' : '\u2224',
		'nshortparallel' : '\u2226',
		'nsim' : '\u2241',
		'nsime' : '\u2244',
		'nsimeq' : '\u2244',
		'nsmid' : '\u2224',
		'nspar' : '\u2226',
		'nsqsube' : '\u22E2',
		'nsqsupe' : '\u22E3',
		'nsub' : '\u2284',
		'nsubE' : '\u2AC5\u0338',
		'nsube' : '\u2288',
		'nsubset' : '\u2282\u20D2',
		'nsubseteq' : '\u2288',
		'nsubseteqq' : '\u2AC5\u0338',
		'nsucc' : '\u2281',
		'nsucceq' : '\u2AB0\u0338',
		'nsup' : '\u2285',
		'nsupE' : '\u2AC6\u0338',
		'nsupe' : '\u2289',
		'nsupset' : '\u2283\u20D2',
		'nsupseteq' : '\u2289',
		'nsupseteqq' : '\u2AC6\u0338',
		'ntgl' : '\u2279',
		'Ntilde' : '\xD1',
		'ntilde' : '\xF1',
		'ntlg' : '\u2278',
		'ntriangleleft' : '\u22EA',
		'ntrianglelefteq' : '\u22EC',
		'ntriangleright' : '\u22EB',
		'ntrianglerighteq' : '\u22ED',
		'Nu' : '\u039D',
		'nu' : '\u03BD',
		'num' : '#',
		'numero' : '\u2116',
		'numsp' : '\u2007',
		'nvap' : '\u224D\u20D2',
		'nvdash' : '\u22AC',
		'nvDash' : '\u22AD',
		'nVdash' : '\u22AE',
		'nVDash' : '\u22AF',
		'nvge' : '\u2265\u20D2',
		'nvgt' : '>\u20D2',
		'nvHarr' : '\u2904',
		'nvinfin' : '\u29DE',
		'nvlArr' : '\u2902',
		'nvle' : '\u2264\u20D2',
		'nvlt' : '<\u20D2',
		'nvltrie' : '\u22B4\u20D2',
		'nvrArr' : '\u2903',
		'nvrtrie' : '\u22B5\u20D2',
		'nvsim' : '\u223C\u20D2',
		'nwarhk' : '\u2923',
		'nwarr' : '\u2196',
		'nwArr' : '\u21D6',
		'nwarrow' : '\u2196',
		'nwnear' : '\u2927',
		'Oacute' : '\xD3',
		'oacute' : '\xF3',
		'oast' : '\u229B',
		'Ocirc' : '\xD4',
		'ocirc' : '\xF4',
		'ocir' : '\u229A',
		'Ocy' : '\u041E',
		'ocy' : '\u043E',
		'odash' : '\u229D',
		'Odblac' : '\u0150',
		'odblac' : '\u0151',
		'odiv' : '\u2A38',
		'odot' : '\u2299',
		'odsold' : '\u29BC',
		'OElig' : '\u0152',
		'oelig' : '\u0153',
		'ofcir' : '\u29BF',
		'Ofr' : '\uD835\uDD12',
		'ofr' : '\uD835\uDD2C',
		'ogon' : '\u02DB',
		'Ograve' : '\xD2',
		'ograve' : '\xF2',
		'ogt' : '\u29C1',
		'ohbar' : '\u29B5',
		'ohm' : '\u03A9',
		'oint' : '\u222E',
		'olarr' : '\u21BA',
		'olcir' : '\u29BE',
		'olcross' : '\u29BB',
		'oline' : '\u203E',
		'olt' : '\u29C0',
		'Omacr' : '\u014C',
		'omacr' : '\u014D',
		'Omega' : '\u03A9',
		'omega' : '\u03C9',
		'Omicron' : '\u039F',
		'omicron' : '\u03BF',
		'omid' : '\u29B6',
		'ominus' : '\u2296',
		'Oopf' : '\uD835\uDD46',
		'oopf' : '\uD835\uDD60',
		'opar' : '\u29B7',
		'OpenCurlyDoubleQuote' : '\u201C',
		'OpenCurlyQuote' : '\u2018',
		'operp' : '\u29B9',
		'oplus' : '\u2295',
		'orarr' : '\u21BB',
		'Or' : '\u2A54',
		'or' : '\u2228',
		'ord' : '\u2A5D',
		'order' : '\u2134',
		'orderof' : '\u2134',
		'ordf' : '\xAA',
		'ordm' : '\xBA',
		'origof' : '\u22B6',
		'oror' : '\u2A56',
		'orslope' : '\u2A57',
		'orv' : '\u2A5B',
		'oS' : '\u24C8',
		'Oscr' : '\uD835\uDCAA',
		'oscr' : '\u2134',
		'Oslash' : '\xD8',
		'oslash' : '\xF8',
		'osol' : '\u2298',
		'Otilde' : '\xD5',
		'otilde' : '\xF5',
		'otimesas' : '\u2A36',
		'Otimes' : '\u2A37',
		'otimes' : '\u2297',
		'Ouml' : '\xD6',
		'ouml' : '\xF6',
		'ovbar' : '\u233D',
		'OverBar' : '\u203E',
		'OverBrace' : '\u23DE',
		'OverBracket' : '\u23B4',
		'OverParenthesis' : '\u23DC',
		'para' : '\xB6',
		'parallel' : '\u2225',
		'par' : '\u2225',
		'parsim' : '\u2AF3',
		'parsl' : '\u2AFD',
		'part' : '\u2202',
		'PartialD' : '\u2202',
		'Pcy' : '\u041F',
		'pcy' : '\u043F',
		'percnt' : '%',
		'period' : '.',
		'permil' : '\u2030',
		'perp' : '\u22A5',
		'pertenk' : '\u2031',
		'Pfr' : '\uD835\uDD13',
		'pfr' : '\uD835\uDD2D',
		'Phi' : '\u03A6',
		'phi' : '\u03C6',
		'phiv' : '\u03D5',
		'phmmat' : '\u2133',
		'phone' : '\u260E',
		'Pi' : '\u03A0',
		'pi' : '\u03C0',
		'pitchfork' : '\u22D4',
		'piv' : '\u03D6',
		'planck' : '\u210F',
		'planckh' : '\u210E',
		'plankv' : '\u210F',
		'plusacir' : '\u2A23',
		'plusb' : '\u229E',
		'pluscir' : '\u2A22',
		'plus' : '+',
		'plusdo' : '\u2214',
		'plusdu' : '\u2A25',
		'pluse' : '\u2A72',
		'PlusMinus' : '\xB1',
		'plusmn' : '\xB1',
		'plussim' : '\u2A26',
		'plustwo' : '\u2A27',
		'pm' : '\xB1',
		'Poincareplane' : '\u210C',
		'pointint' : '\u2A15',
		'popf' : '\uD835\uDD61',
		'Popf' : '\u2119',
		'pound' : '\xA3',
		'prap' : '\u2AB7',
		'Pr' : '\u2ABB',
		'pr' : '\u227A',
		'prcue' : '\u227C',
		'precapprox' : '\u2AB7',
		'prec' : '\u227A',
		'preccurlyeq' : '\u227C',
		'Precedes' : '\u227A',
		'PrecedesEqual' : '\u2AAF',
		'PrecedesSlantEqual' : '\u227C',
		'PrecedesTilde' : '\u227E',
		'preceq' : '\u2AAF',
		'precnapprox' : '\u2AB9',
		'precneqq' : '\u2AB5',
		'precnsim' : '\u22E8',
		'pre' : '\u2AAF',
		'prE' : '\u2AB3',
		'precsim' : '\u227E',
		'prime' : '\u2032',
		'Prime' : '\u2033',
		'primes' : '\u2119',
		'prnap' : '\u2AB9',
		'prnE' : '\u2AB5',
		'prnsim' : '\u22E8',
		'prod' : '\u220F',
		'Product' : '\u220F',
		'profalar' : '\u232E',
		'profline' : '\u2312',
		'profsurf' : '\u2313',
		'prop' : '\u221D',
		'Proportional' : '\u221D',
		'Proportion' : '\u2237',
		'propto' : '\u221D',
		'prsim' : '\u227E',
		'prurel' : '\u22B0',
		'Pscr' : '\uD835\uDCAB',
		'pscr' : '\uD835\uDCC5',
		'Psi' : '\u03A8',
		'psi' : '\u03C8',
		'puncsp' : '\u2008',
		'Qfr' : '\uD835\uDD14',
		'qfr' : '\uD835\uDD2E',
		'qint' : '\u2A0C',
		'qopf' : '\uD835\uDD62',
		'Qopf' : '\u211A',
		'qprime' : '\u2057',
		'Qscr' : '\uD835\uDCAC',
		'qscr' : '\uD835\uDCC6',
		'quaternions' : '\u210D',
		'quatint' : '\u2A16',
		'quest' : '?',
		'questeq' : '\u225F',
		'quot' : '"',
		'QUOT' : '"',
		'rAarr' : '\u21DB',
		'race' : '\u223D\u0331',
		'Racute' : '\u0154',
		'racute' : '\u0155',
		'radic' : '\u221A',
		'raemptyv' : '\u29B3',
		'rang' : '\u27E9',
		'Rang' : '\u27EB',
		'rangd' : '\u2992',
		'range' : '\u29A5',
		'rangle' : '\u27E9',
		'raquo' : '\xBB',
		'rarrap' : '\u2975',
		'rarrb' : '\u21E5',
		'rarrbfs' : '\u2920',
		'rarrc' : '\u2933',
		'rarr' : '\u2192',
		'Rarr' : '\u21A0',
		'rArr' : '\u21D2',
		'rarrfs' : '\u291E',
		'rarrhk' : '\u21AA',
		'rarrlp' : '\u21AC',
		'rarrpl' : '\u2945',
		'rarrsim' : '\u2974',
		'Rarrtl' : '\u2916',
		'rarrtl' : '\u21A3',
		'rarrw' : '\u219D',
		'ratail' : '\u291A',
		'rAtail' : '\u291C',
		'ratio' : '\u2236',
		'rationals' : '\u211A',
		'rbarr' : '\u290D',
		'rBarr' : '\u290F',
		'RBarr' : '\u2910',
		'rbbrk' : '\u2773',
		'rbrace' : '}',
		'rbrack' : ']',
		'rbrke' : '\u298C',
		'rbrksld' : '\u298E',
		'rbrkslu' : '\u2990',
		'Rcaron' : '\u0158',
		'rcaron' : '\u0159',
		'Rcedil' : '\u0156',
		'rcedil' : '\u0157',
		'rceil' : '\u2309',
		'rcub' : '}',
		'Rcy' : '\u0420',
		'rcy' : '\u0440',
		'rdca' : '\u2937',
		'rdldhar' : '\u2969',
		'rdquo' : '\u201D',
		'rdquor' : '\u201D',
		'rdsh' : '\u21B3',
		'real' : '\u211C',
		'realine' : '\u211B',
		'realpart' : '\u211C',
		'reals' : '\u211D',
		'Re' : '\u211C',
		'rect' : '\u25AD',
		'reg' : '\xAE',
		'REG' : '\xAE',
		'ReverseElement' : '\u220B',
		'ReverseEquilibrium' : '\u21CB',
		'ReverseUpEquilibrium' : '\u296F',
		'rfisht' : '\u297D',
		'rfloor' : '\u230B',
		'rfr' : '\uD835\uDD2F',
		'Rfr' : '\u211C',
		'rHar' : '\u2964',
		'rhard' : '\u21C1',
		'rharu' : '\u21C0',
		'rharul' : '\u296C',
		'Rho' : '\u03A1',
		'rho' : '\u03C1',
		'rhov' : '\u03F1',
		'RightAngleBracket' : '\u27E9',
		'RightArrowBar' : '\u21E5',
		'rightarrow' : '\u2192',
		'RightArrow' : '\u2192',
		'Rightarrow' : '\u21D2',
		'RightArrowLeftArrow' : '\u21C4',
		'rightarrowtail' : '\u21A3',
		'RightCeiling' : '\u2309',
		'RightDoubleBracket' : '\u27E7',
		'RightDownTeeVector' : '\u295D',
		'RightDownVectorBar' : '\u2955',
		'RightDownVector' : '\u21C2',
		'RightFloor' : '\u230B',
		'rightharpoondown' : '\u21C1',
		'rightharpoonup' : '\u21C0',
		'rightleftarrows' : '\u21C4',
		'rightleftharpoons' : '\u21CC',
		'rightrightarrows' : '\u21C9',
		'rightsquigarrow' : '\u219D',
		'RightTeeArrow' : '\u21A6',
		'RightTee' : '\u22A2',
		'RightTeeVector' : '\u295B',
		'rightthreetimes' : '\u22CC',
		'RightTriangleBar' : '\u29D0',
		'RightTriangle' : '\u22B3',
		'RightTriangleEqual' : '\u22B5',
		'RightUpDownVector' : '\u294F',
		'RightUpTeeVector' : '\u295C',
		'RightUpVectorBar' : '\u2954',
		'RightUpVector' : '\u21BE',
		'RightVectorBar' : '\u2953',
		'RightVector' : '\u21C0',
		'ring' : '\u02DA',
		'risingdotseq' : '\u2253',
		'rlarr' : '\u21C4',
		'rlhar' : '\u21CC',
		'rlm' : '\u200F',
		'rmoustache' : '\u23B1',
		'rmoust' : '\u23B1',
		'rnmid' : '\u2AEE',
		'roang' : '\u27ED',
		'roarr' : '\u21FE',
		'robrk' : '\u27E7',
		'ropar' : '\u2986',
		'ropf' : '\uD835\uDD63',
		'Ropf' : '\u211D',
		'roplus' : '\u2A2E',
		'rotimes' : '\u2A35',
		'RoundImplies' : '\u2970',
		'rpar' : ')',
		'rpargt' : '\u2994',
		'rppolint' : '\u2A12',
		'rrarr' : '\u21C9',
		'Rrightarrow' : '\u21DB',
		'rsaquo' : '\u203A',
		'rscr' : '\uD835\uDCC7',
		'Rscr' : '\u211B',
		'rsh' : '\u21B1',
		'Rsh' : '\u21B1',
		'rsqb' : ']',
		'rsquo' : '\u2019',
		'rsquor' : '\u2019',
		'rthree' : '\u22CC',
		'rtimes' : '\u22CA',
		'rtri' : '\u25B9',
		'rtrie' : '\u22B5',
		'rtrif' : '\u25B8',
		'rtriltri' : '\u29CE',
		'RuleDelayed' : '\u29F4',
		'ruluhar' : '\u2968',
		'rx' : '\u211E',
		'Sacute' : '\u015A',
		'sacute' : '\u015B',
		'sbquo' : '\u201A',
		'scap' : '\u2AB8',
		'Scaron' : '\u0160',
		'scaron' : '\u0161',
		'Sc' : '\u2ABC',
		'sc' : '\u227B',
		'sccue' : '\u227D',
		'sce' : '\u2AB0',
		'scE' : '\u2AB4',
		'Scedil' : '\u015E',
		'scedil' : '\u015F',
		'Scirc' : '\u015C',
		'scirc' : '\u015D',
		'scnap' : '\u2ABA',
		'scnE' : '\u2AB6',
		'scnsim' : '\u22E9',
		'scpolint' : '\u2A13',
		'scsim' : '\u227F',
		'Scy' : '\u0421',
		'scy' : '\u0441',
		'sdotb' : '\u22A1',
		'sdot' : '\u22C5',
		'sdote' : '\u2A66',
		'searhk' : '\u2925',
		'searr' : '\u2198',
		'seArr' : '\u21D8',
		'searrow' : '\u2198',
		'sect' : '\xA7',
		'semi' : ';',
		'seswar' : '\u2929',
		'setminus' : '\u2216',
		'setmn' : '\u2216',
		'sext' : '\u2736',
		'Sfr' : '\uD835\uDD16',
		'sfr' : '\uD835\uDD30',
		'sfrown' : '\u2322',
		'sharp' : '\u266F',
		'SHCHcy' : '\u0429',
		'shchcy' : '\u0449',
		'SHcy' : '\u0428',
		'shcy' : '\u0448',
		'ShortDownArrow' : '\u2193',
		'ShortLeftArrow' : '\u2190',
		'shortmid' : '\u2223',
		'shortparallel' : '\u2225',
		'ShortRightArrow' : '\u2192',
		'ShortUpArrow' : '\u2191',
		'shy' : '\xAD',
		'Sigma' : '\u03A3',
		'sigma' : '\u03C3',
		'sigmaf' : '\u03C2',
		'sigmav' : '\u03C2',
		'sim' : '\u223C',
		'simdot' : '\u2A6A',
		'sime' : '\u2243',
		'simeq' : '\u2243',
		'simg' : '\u2A9E',
		'simgE' : '\u2AA0',
		'siml' : '\u2A9D',
		'simlE' : '\u2A9F',
		'simne' : '\u2246',
		'simplus' : '\u2A24',
		'simrarr' : '\u2972',
		'slarr' : '\u2190',
		'SmallCircle' : '\u2218',
		'smallsetminus' : '\u2216',
		'smashp' : '\u2A33',
		'smeparsl' : '\u29E4',
		'smid' : '\u2223',
		'smile' : '\u2323',
		'smt' : '\u2AAA',
		'smte' : '\u2AAC',
		'smtes' : '\u2AAC\uFE00',
		'SOFTcy' : '\u042C',
		'softcy' : '\u044C',
		'solbar' : '\u233F',
		'solb' : '\u29C4',
		'sol' : '/',
		'Sopf' : '\uD835\uDD4A',
		'sopf' : '\uD835\uDD64',
		'spades' : '\u2660',
		'spadesuit' : '\u2660',
		'spar' : '\u2225',
		'sqcap' : '\u2293',
		'sqcaps' : '\u2293\uFE00',
		'sqcup' : '\u2294',
		'sqcups' : '\u2294\uFE00',
		'Sqrt' : '\u221A',
		'sqsub' : '\u228F',
		'sqsube' : '\u2291',
		'sqsubset' : '\u228F',
		'sqsubseteq' : '\u2291',
		'sqsup' : '\u2290',
		'sqsupe' : '\u2292',
		'sqsupset' : '\u2290',
		'sqsupseteq' : '\u2292',
		'square' : '\u25A1',
		'Square' : '\u25A1',
		'SquareIntersection' : '\u2293',
		'SquareSubset' : '\u228F',
		'SquareSubsetEqual' : '\u2291',
		'SquareSuperset' : '\u2290',
		'SquareSupersetEqual' : '\u2292',
		'SquareUnion' : '\u2294',
		'squarf' : '\u25AA',
		'squ' : '\u25A1',
		'squf' : '\u25AA',
		'srarr' : '\u2192',
		'Sscr' : '\uD835\uDCAE',
		'sscr' : '\uD835\uDCC8',
		'ssetmn' : '\u2216',
		'ssmile' : '\u2323',
		'sstarf' : '\u22C6',
		'Star' : '\u22C6',
		'star' : '\u2606',
		'starf' : '\u2605',
		'straightepsilon' : '\u03F5',
		'straightphi' : '\u03D5',
		'strns' : '\xAF',
		'sub' : '\u2282',
		'Sub' : '\u22D0',
		'subdot' : '\u2ABD',
		'subE' : '\u2AC5',
		'sube' : '\u2286',
		'subedot' : '\u2AC3',
		'submult' : '\u2AC1',
		'subnE' : '\u2ACB',
		'subne' : '\u228A',
		'subplus' : '\u2ABF',
		'subrarr' : '\u2979',
		'subset' : '\u2282',
		'Subset' : '\u22D0',
		'subseteq' : '\u2286',
		'subseteqq' : '\u2AC5',
		'SubsetEqual' : '\u2286',
		'subsetneq' : '\u228A',
		'subsetneqq' : '\u2ACB',
		'subsim' : '\u2AC7',
		'subsub' : '\u2AD5',
		'subsup' : '\u2AD3',
		'succapprox' : '\u2AB8',
		'succ' : '\u227B',
		'succcurlyeq' : '\u227D',
		'Succeeds' : '\u227B',
		'SucceedsEqual' : '\u2AB0',
		'SucceedsSlantEqual' : '\u227D',
		'SucceedsTilde' : '\u227F',
		'succeq' : '\u2AB0',
		'succnapprox' : '\u2ABA',
		'succneqq' : '\u2AB6',
		'succnsim' : '\u22E9',
		'succsim' : '\u227F',
		'SuchThat' : '\u220B',
		'sum' : '\u2211',
		'Sum' : '\u2211',
		'sung' : '\u266A',
		'sup1' : '\xB9',
		'sup2' : '\xB2',
		'sup3' : '\xB3',
		'sup' : '\u2283',
		'Sup' : '\u22D1',
		'supdot' : '\u2ABE',
		'supdsub' : '\u2AD8',
		'supE' : '\u2AC6',
		'supe' : '\u2287',
		'supedot' : '\u2AC4',
		'Superset' : '\u2283',
		'SupersetEqual' : '\u2287',
		'suphsol' : '\u27C9',
		'suphsub' : '\u2AD7',
		'suplarr' : '\u297B',
		'supmult' : '\u2AC2',
		'supnE' : '\u2ACC',
		'supne' : '\u228B',
		'supplus' : '\u2AC0',
		'supset' : '\u2283',
		'Supset' : '\u22D1',
		'supseteq' : '\u2287',
		'supseteqq' : '\u2AC6',
		'supsetneq' : '\u228B',
		'supsetneqq' : '\u2ACC',
		'supsim' : '\u2AC8',
		'supsub' : '\u2AD4',
		'supsup' : '\u2AD6',
		'swarhk' : '\u2926',
		'swarr' : '\u2199',
		'swArr' : '\u21D9',
		'swarrow' : '\u2199',
		'swnwar' : '\u292A',
		'szlig' : '\xDF',
		'Tab' : '\t',
		'target' : '\u2316',
		'Tau' : '\u03A4',
		'tau' : '\u03C4',
		'tbrk' : '\u23B4',
		'Tcaron' : '\u0164',
		'tcaron' : '\u0165',
		'Tcedil' : '\u0162',
		'tcedil' : '\u0163',
		'Tcy' : '\u0422',
		'tcy' : '\u0442',
		'tdot' : '\u20DB',
		'telrec' : '\u2315',
		'Tfr' : '\uD835\uDD17',
		'tfr' : '\uD835\uDD31',
		'there4' : '\u2234',
		'therefore' : '\u2234',
		'Therefore' : '\u2234',
		'Theta' : '\u0398',
		'theta' : '\u03B8',
		'thetasym' : '\u03D1',
		'thetav' : '\u03D1',
		'thickapprox' : '\u2248',
		'thicksim' : '\u223C',
		'ThickSpace' : '\u205F\u200A',
		'ThinSpace' : '\u2009',
		'thinsp' : '\u2009',
		'thkap' : '\u2248',
		'thksim' : '\u223C',
		'THORN' : '\xDE',
		'thorn' : '\xFE',
		'tilde' : '\u02DC',
		'Tilde' : '\u223C',
		'TildeEqual' : '\u2243',
		'TildeFullEqual' : '\u2245',
		'TildeTilde' : '\u2248',
		'timesbar' : '\u2A31',
		'timesb' : '\u22A0',
		'times' : '\xD7',
		'timesd' : '\u2A30',
		'tint' : '\u222D',
		'toea' : '\u2928',
		'topbot' : '\u2336',
		'topcir' : '\u2AF1',
		'top' : '\u22A4',
		'Topf' : '\uD835\uDD4B',
		'topf' : '\uD835\uDD65',
		'topfork' : '\u2ADA',
		'tosa' : '\u2929',
		'tprime' : '\u2034',
		'trade' : '\u2122',
		'TRADE' : '\u2122',
		'triangle' : '\u25B5',
		'triangledown' : '\u25BF',
		'triangleleft' : '\u25C3',
		'trianglelefteq' : '\u22B4',
		'triangleq' : '\u225C',
		'triangleright' : '\u25B9',
		'trianglerighteq' : '\u22B5',
		'tridot' : '\u25EC',
		'trie' : '\u225C',
		'triminus' : '\u2A3A',
		'TripleDot' : '\u20DB',
		'triplus' : '\u2A39',
		'trisb' : '\u29CD',
		'tritime' : '\u2A3B',
		'trpezium' : '\u23E2',
		'Tscr' : '\uD835\uDCAF',
		'tscr' : '\uD835\uDCC9',
		'TScy' : '\u0426',
		'tscy' : '\u0446',
		'TSHcy' : '\u040B',
		'tshcy' : '\u045B',
		'Tstrok' : '\u0166',
		'tstrok' : '\u0167',
		'twixt' : '\u226C',
		'twoheadleftarrow' : '\u219E',
		'twoheadrightarrow' : '\u21A0',
		'Uacute' : '\xDA',
		'uacute' : '\xFA',
		'uarr' : '\u2191',
		'Uarr' : '\u219F',
		'uArr' : '\u21D1',
		'Uarrocir' : '\u2949',
		'Ubrcy' : '\u040E',
		'ubrcy' : '\u045E',
		'Ubreve' : '\u016C',
		'ubreve' : '\u016D',
		'Ucirc' : '\xDB',
		'ucirc' : '\xFB',
		'Ucy' : '\u0423',
		'ucy' : '\u0443',
		'udarr' : '\u21C5',
		'Udblac' : '\u0170',
		'udblac' : '\u0171',
		'udhar' : '\u296E',
		'ufisht' : '\u297E',
		'Ufr' : '\uD835\uDD18',
		'ufr' : '\uD835\uDD32',
		'Ugrave' : '\xD9',
		'ugrave' : '\xF9',
		'uHar' : '\u2963',
		'uharl' : '\u21BF',
		'uharr' : '\u21BE',
		'uhblk' : '\u2580',
		'ulcorn' : '\u231C',
		'ulcorner' : '\u231C',
		'ulcrop' : '\u230F',
		'ultri' : '\u25F8',
		'Umacr' : '\u016A',
		'umacr' : '\u016B',
		'uml' : '\xA8',
		'UnderBar' : '_',
		'UnderBrace' : '\u23DF',
		'UnderBracket' : '\u23B5',
		'UnderParenthesis' : '\u23DD',
		'Union' : '\u22C3',
		'UnionPlus' : '\u228E',
		'Uogon' : '\u0172',
		'uogon' : '\u0173',
		'Uopf' : '\uD835\uDD4C',
		'uopf' : '\uD835\uDD66',
		'UpArrowBar' : '\u2912',
		'uparrow' : '\u2191',
		'UpArrow' : '\u2191',
		'Uparrow' : '\u21D1',
		'UpArrowDownArrow' : '\u21C5',
		'updownarrow' : '\u2195',
		'UpDownArrow' : '\u2195',
		'Updownarrow' : '\u21D5',
		'UpEquilibrium' : '\u296E',
		'upharpoonleft' : '\u21BF',
		'upharpoonright' : '\u21BE',
		'uplus' : '\u228E',
		'UpperLeftArrow' : '\u2196',
		'UpperRightArrow' : '\u2197',
		'upsi' : '\u03C5',
		'Upsi' : '\u03D2',
		'upsih' : '\u03D2',
		'Upsilon' : '\u03A5',
		'upsilon' : '\u03C5',
		'UpTeeArrow' : '\u21A5',
		'UpTee' : '\u22A5',
		'upuparrows' : '\u21C8',
		'urcorn' : '\u231D',
		'urcorner' : '\u231D',
		'urcrop' : '\u230E',
		'Uring' : '\u016E',
		'uring' : '\u016F',
		'urtri' : '\u25F9',
		'Uscr' : '\uD835\uDCB0',
		'uscr' : '\uD835\uDCCA',
		'utdot' : '\u22F0',
		'Utilde' : '\u0168',
		'utilde' : '\u0169',
		'utri' : '\u25B5',
		'utrif' : '\u25B4',
		'uuarr' : '\u21C8',
		'Uuml' : '\xDC',
		'uuml' : '\xFC',
		'uwangle' : '\u29A7',
		'vangrt' : '\u299C',
		'varepsilon' : '\u03F5',
		'varkappa' : '\u03F0',
		'varnothing' : '\u2205',
		'varphi' : '\u03D5',
		'varpi' : '\u03D6',
		'varpropto' : '\u221D',
		'varr' : '\u2195',
		'vArr' : '\u21D5',
		'varrho' : '\u03F1',
		'varsigma' : '\u03C2',
		'varsubsetneq' : '\u228A\uFE00',
		'varsubsetneqq' : '\u2ACB\uFE00',
		'varsupsetneq' : '\u228B\uFE00',
		'varsupsetneqq' : '\u2ACC\uFE00',
		'vartheta' : '\u03D1',
		'vartriangleleft' : '\u22B2',
		'vartriangleright' : '\u22B3',
		'vBar' : '\u2AE8',
		'Vbar' : '\u2AEB',
		'vBarv' : '\u2AE9',
		'Vcy' : '\u0412',
		'vcy' : '\u0432',
		'vdash' : '\u22A2',
		'vDash' : '\u22A8',
		'Vdash' : '\u22A9',
		'VDash' : '\u22AB',
		'Vdashl' : '\u2AE6',
		'veebar' : '\u22BB',
		'vee' : '\u2228',
		'Vee' : '\u22C1',
		'veeeq' : '\u225A',
		'vellip' : '\u22EE',
		'verbar' : '|',
		'Verbar' : '\u2016',
		'vert' : '|',
		'Vert' : '\u2016',
		'VerticalBar' : '\u2223',
		'VerticalLine' : '|',
		'VerticalSeparator' : '\u2758',
		'VerticalTilde' : '\u2240',
		'VeryThinSpace' : '\u200A',
		'Vfr' : '\uD835\uDD19',
		'vfr' : '\uD835\uDD33',
		'vltri' : '\u22B2',
		'vnsub' : '\u2282\u20D2',
		'vnsup' : '\u2283\u20D2',
		'Vopf' : '\uD835\uDD4D',
		'vopf' : '\uD835\uDD67',
		'vprop' : '\u221D',
		'vrtri' : '\u22B3',
		'Vscr' : '\uD835\uDCB1',
		'vscr' : '\uD835\uDCCB',
		'vsubnE' : '\u2ACB\uFE00',
		'vsubne' : '\u228A\uFE00',
		'vsupnE' : '\u2ACC\uFE00',
		'vsupne' : '\u228B\uFE00',
		'Vvdash' : '\u22AA',
		'vzigzag' : '\u299A',
		'Wcirc' : '\u0174',
		'wcirc' : '\u0175',
		'wedbar' : '\u2A5F',
		'wedge' : '\u2227',
		'Wedge' : '\u22C0',
		'wedgeq' : '\u2259',
		'weierp' : '\u2118',
		'Wfr' : '\uD835\uDD1A',
		'wfr' : '\uD835\uDD34',
		'Wopf' : '\uD835\uDD4E',
		'wopf' : '\uD835\uDD68',
		'wp' : '\u2118',
		'wr' : '\u2240',
		'wreath' : '\u2240',
		'Wscr' : '\uD835\uDCB2',
		'wscr' : '\uD835\uDCCC',
		'xcap' : '\u22C2',
		'xcirc' : '\u25EF',
		'xcup' : '\u22C3',
		'xdtri' : '\u25BD',
		'Xfr' : '\uD835\uDD1B',
		'xfr' : '\uD835\uDD35',
		'xharr' : '\u27F7',
		'xhArr' : '\u27FA',
		'Xi' : '\u039E',
		'xi' : '\u03BE',
		'xlarr' : '\u27F5',
		'xlArr' : '\u27F8',
		'xmap' : '\u27FC',
		'xnis' : '\u22FB',
		'xodot' : '\u2A00',
		'Xopf' : '\uD835\uDD4F',
		'xopf' : '\uD835\uDD69',
		'xoplus' : '\u2A01',
		'xotime' : '\u2A02',
		'xrarr' : '\u27F6',
		'xrArr' : '\u27F9',
		'Xscr' : '\uD835\uDCB3',
		'xscr' : '\uD835\uDCCD',
		'xsqcup' : '\u2A06',
		'xuplus' : '\u2A04',
		'xutri' : '\u25B3',
		'xvee' : '\u22C1',
		'xwedge' : '\u22C0',
		'Yacute' : '\xDD',
		'yacute' : '\xFD',
		'YAcy' : '\u042F',
		'yacy' : '\u044F',
		'Ycirc' : '\u0176',
		'ycirc' : '\u0177',
		'Ycy' : '\u042B',
		'ycy' : '\u044B',
		'yen' : '\xA5',
		'Yfr' : '\uD835\uDD1C',
		'yfr' : '\uD835\uDD36',
		'YIcy' : '\u0407',
		'yicy' : '\u0457',
		'Yopf' : '\uD835\uDD50',
		'yopf' : '\uD835\uDD6A',
		'Yscr' : '\uD835\uDCB4',
		'yscr' : '\uD835\uDCCE',
		'YUcy' : '\u042E',
		'yucy' : '\u044E',
		'yuml' : '\xFF',
		'Yuml' : '\u0178',
		'Zacute' : '\u0179',
		'zacute' : '\u017A',
		'Zcaron' : '\u017D',
		'zcaron' : '\u017E',
		'Zcy' : '\u0417',
		'zcy' : '\u0437',
		'Zdot' : '\u017B',
		'zdot' : '\u017C',
		'zeetrf' : '\u2128',
		'ZeroWidthSpace' : '\u200B',
		'Zeta' : '\u0396',
		'zeta' : '\u03B6',
		'zfr' : '\uD835\uDD37',
		'Zfr' : '\u2128',
		'ZHcy' : '\u0416',
		'zhcy' : '\u0436',
		'zigrarr' : '\u21DD',
		'zopf' : '\uD835\uDD6B',
		'Zopf' : '\u2124',
		'Zscr' : '\uD835\uDCB5',
		'zscr' : '\uD835\uDCCF',
		'zwj' : '\u200D',
		'zwnj' : '\u200C'
	};
	var decodeMapLegacy = {
		'Aacute' : '\xC1',
		'aacute' : '\xE1',
		'Acirc' : '\xC2',
		'acirc' : '\xE2',
		'acute' : '\xB4',
		'AElig' : '\xC6',
		'aelig' : '\xE6',
		'Agrave' : '\xC0',
		'agrave' : '\xE0',
		'amp' : '&',
		'AMP' : '&',
		'Aring' : '\xC5',
		'aring' : '\xE5',
		'Atilde' : '\xC3',
		'atilde' : '\xE3',
		'Auml' : '\xC4',
		'auml' : '\xE4',
		'brvbar' : '\xA6',
		'Ccedil' : '\xC7',
		'ccedil' : '\xE7',
		'cedil' : '\xB8',
		'cent' : '\xA2',
		'copy' : '\xA9',
		'COPY' : '\xA9',
		'curren' : '\xA4',
		'deg' : '\xB0',
		'divide' : '\xF7',
		'Eacute' : '\xC9',
		'eacute' : '\xE9',
		'Ecirc' : '\xCA',
		'ecirc' : '\xEA',
		'Egrave' : '\xC8',
		'egrave' : '\xE8',
		'ETH' : '\xD0',
		'eth' : '\xF0',
		'Euml' : '\xCB',
		'euml' : '\xEB',
		'frac12' : '\xBD',
		'frac14' : '\xBC',
		'frac34' : '\xBE',
		'gt' : '>',
		'GT' : '>',
		'Iacute' : '\xCD',
		'iacute' : '\xED',
		'Icirc' : '\xCE',
		'icirc' : '\xEE',
		'iexcl' : '\xA1',
		'Igrave' : '\xCC',
		'igrave' : '\xEC',
		'iquest' : '\xBF',
		'Iuml' : '\xCF',
		'iuml' : '\xEF',
		'laquo' : '\xAB',
		'lt' : '<',
		'LT' : '<',
		'macr' : '\xAF',
		'micro' : '\xB5',
		'middot' : '\xB7',
		'nbsp' : '\xA0',
		'not' : '\xAC',
		'Ntilde' : '\xD1',
		'ntilde' : '\xF1',
		'Oacute' : '\xD3',
		'oacute' : '\xF3',
		'Ocirc' : '\xD4',
		'ocirc' : '\xF4',
		'Ograve' : '\xD2',
		'ograve' : '\xF2',
		'ordf' : '\xAA',
		'ordm' : '\xBA',
		'Oslash' : '\xD8',
		'oslash' : '\xF8',
		'Otilde' : '\xD5',
		'otilde' : '\xF5',
		'Ouml' : '\xD6',
		'ouml' : '\xF6',
		'para' : '\xB6',
		'plusmn' : '\xB1',
		'pound' : '\xA3',
		'quot' : '"',
		'QUOT' : '"',
		'raquo' : '\xBB',
		'reg' : '\xAE',
		'REG' : '\xAE',
		'sect' : '\xA7',
		'shy' : '\xAD',
		'sup1' : '\xB9',
		'sup2' : '\xB2',
		'sup3' : '\xB3',
		'szlig' : '\xDF',
		'THORN' : '\xDE',
		'thorn' : '\xFE',
		'times' : '\xD7',
		'Uacute' : '\xDA',
		'uacute' : '\xFA',
		'Ucirc' : '\xDB',
		'ucirc' : '\xFB',
		'Ugrave' : '\xD9',
		'ugrave' : '\xF9',
		'uml' : '\xA8',
		'Uuml' : '\xDC',
		'uuml' : '\xFC',
		'Yacute' : '\xDD',
		'yacute' : '\xFD',
		'yen' : '\xA5',
		'yuml' : '\xFF'
	};
	var decodeMapNumeric = {
		'0' : '\uFFFD',
		'128' : '\u20AC',
		'130' : '\u201A',
		'131' : '\u0192',
		'132' : '\u201E',
		'133' : '\u2026',
		'134' : '\u2020',
		'135' : '\u2021',
		'136' : '\u02C6',
		'137' : '\u2030',
		'138' : '\u0160',
		'139' : '\u2039',
		'140' : '\u0152',
		'142' : '\u017D',
		'145' : '\u2018',
		'146' : '\u2019',
		'147' : '\u201C',
		'148' : '\u201D',
		'149' : '\u2022',
		'150' : '\u2013',
		'151' : '\u2014',
		'152' : '\u02DC',
		'153' : '\u2122',
		'154' : '\u0161',
		'155' : '\u203A',
		'156' : '\u0153',
		'158' : '\u017E',
		'159' : '\u0178'
	};
	var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65000, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
	/*--------------------------------------------------------------------------*/
	var stringFromCharCode = String.fromCharCode;
	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function (object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};
	var contains = function (array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};
	var merge = function (options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};
	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function (codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// �Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.�
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};
	var hexEscape = function (symbol) {
		return '&#x' + symbol.charCodeAt(0).toString(16).toUpperCase() + ';';
	};
	var parseError = function (message) {
		throw Error('Parse error: ' + message);
	};
	/*--------------------------------------------------------------------------*/
	var encode = function (string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function (symbol) {
					// Use named references if requested & possible.
					if (useNamedReferences && has(encodeMap, symbol)) {
						return '&' + encodeMap[symbol] + ';';
					}
					return hexEscape(symbol);
				});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function (string) {
						// Note: there is no need to check `has(encodeMap, string)` here.
						return '&' + encodeMap[string] + ';';
					});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function (string) {
						return '&' + encodeMap[string] + ';'; // no need to check `has()` here
					});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function (string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they�re not handled
			// using named character references.
			string = string.replace(regexEscape, hexEscape);
		}
		return string
		// Encode astral symbols.
		.replace(regexAstralSymbols, function ($0) {
			// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
			var high = $0.charCodeAt(0);
			var low = $0.charCodeAt(1);
			var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
			return '&#x' + codePoint.toString(16).toUpperCase() + ';';
		})
		// Encode any remaining BMP symbols that are not printable ASCII symbols
		// using a hexadecimal escape.
		.replace(regexBmpWhitelist, hexEscape);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols' : false,
		'encodeEverything' : false,
		'strict' : false,
		'useNamedReferences' : false
	};
	var decode = function (html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function ($0, $1, $2, $3, $4, $5, $6, $7) {
			var codePoint;
			var semicolon;
			var hexDigits;
			var reference;
			var next;
			if ($1) {
				// Decode decimal escapes, e.g. `&#119558;`.
				codePoint = $1;
				semicolon = $2;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				return codePointToSymbol(codePoint, strict);
			}
			if ($3) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $3;
				semicolon = $4;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}
			if ($5) {
				// Decode named character references with trailing `;`, e.g. `&copy;`.
				reference = $5;
				if (has(decodeMap, reference)) {
					return decodeMap[reference];
				} else {
					// Ambiguous ampersand. https://mths.be/notes/ambiguous-ampersands
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon');
					}
					return $0;
				}
			}
			// If we�re still here, it�s a legacy reference for sure. No need for an
			// extra `if` check.
			// Decode named character references without trailing `;`, e.g. `&amp`
			// This is only a parse error if it gets converted to `&`, or if it is
			// followed by `=` in an attribute context.
			reference = $6;
			next = $7;
			if (next && options.isAttributeValue) {
				if (strict && next == '=') {
					parseError('`&` did not start a character reference');
				}
				return $0;
			} else {
				if (strict) {
					parseError(
						'named character reference was not terminated by a semicolon');
				}
				// Note: there is no need to check `has(decodeMapLegacy, reference)`.
				return decodeMapLegacy[reference] + (next || '');
			}
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue' : false,
		'strict' : false
	};
	var escape = function (string) {
		return string.replace(regexEscape, function ($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};
	/*--------------------------------------------------------------------------*/
	var he = {
		'version' : '0.5.0',
		'encode' : encode,
		'decode' : decode,
		'escape' : escape,
		'unescape' : decode
	};
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd) {
		define(function () {
			return he;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = he;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in he) {
				has(he, key) && (freeExports[key] = he[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.he = he;
	}
}
	(this));
;/****lib/velocity.min.js****/
/*! VelocityJS.org (1.0.0). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function(e){function t(e){var t=e.length,r=$.type(e);return"function"===r||$.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===r||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var $=function(e,t){return new $.fn.init(e,t)};$.isWindow=function(e){return null!=e&&e==e.window},$.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?a[o.call(e)]||"object":typeof e},$.isArray=Array.isArray||function(e){return"array"===$.type(e)},$.isPlainObject=function(e){var t;if(!e||"object"!==$.type(e)||e.nodeType||$.isWindow(e))return!1;try{if(e.constructor&&!n.call(e,"constructor")&&!n.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}for(t in e);return void 0===t||n.call(e,t)},$.each=function(e,r,a){var n,o=0,i=e.length,s=t(e);if(a){if(s)for(;i>o&&(n=r.apply(e[o],a),n!==!1);o++);else for(o in e)if(n=r.apply(e[o],a),n===!1)break}else if(s)for(;i>o&&(n=r.call(e[o],o,e[o]),n!==!1);o++);else for(o in e)if(n=r.call(e[o],o,e[o]),n===!1)break;return e},$.data=function(e,t,a){if(void 0===a){var n=e[$.expando],o=n&&r[n];if(void 0===t)return o;if(o&&t in o)return o[t]}else if(void 0!==t){var n=e[$.expando]||(e[$.expando]=++$.uuid);return r[n]=r[n]||{},r[n][t]=a,a}},$.removeData=function(e,t){var a=e[$.expando],n=a&&r[a];n&&$.each(t,function(e,t){delete n[t]})},$.extend=function(){var e,t,r,a,n,o,i=arguments[0]||{},s=1,l=arguments.length,u=!1;for("boolean"==typeof i&&(u=i,i=arguments[s]||{},s++),"object"!=typeof i&&"function"!==$.type(i)&&(i={}),s===l&&(i=this,s--);l>s;s++)if(null!=(n=arguments[s]))for(a in n)e=i[a],r=n[a],i!==r&&(u&&r&&($.isPlainObject(r)||(t=$.isArray(r)))?(t?(t=!1,o=e&&$.isArray(e)?e:[]):o=e&&$.isPlainObject(e)?e:{},i[a]=$.extend(u,o,r)):void 0!==r&&(i[a]=r));return i},$.queue=function(e,r,a){function n(e,r){var a=r||[];return null!=e&&(t(Object(e))?!function(e,t){for(var r=+t.length,a=0,n=e.length;r>a;)e[n++]=t[a++];if(r!==r)for(;void 0!==t[a];)e[n++]=t[a++];return e.length=n,e}(a,"string"==typeof e?[e]:e):[].push.call(a,e)),a}if(e){r=(r||"fx")+"queue";var o=$.data(e,r);return a?(!o||$.isArray(a)?o=$.data(e,r,n(a)):o.push(a),o):o||[]}},$.dequeue=function(e,t){$.each(e.nodeType?[e]:e,function(e,r){t=t||"fx";var a=$.queue(r,t),n=a.shift();"inprogress"===n&&(n=a.shift()),n&&("fx"===t&&a.unshift("inprogress"),n.call(r,function(){$.dequeue(r,t)}))})},$.fn=$.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),r=this.offset(),a=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:$(e).offset();return r.top-=parseFloat(t.style.marginTop)||0,r.left-=parseFloat(t.style.marginLeft)||0,e.style&&(a.top+=parseFloat(e.style.borderTopWidth)||0,a.left+=parseFloat(e.style.borderLeftWidth)||0),{top:r.top-a.top,left:r.left-a.left}}};var r={};$.expando="velocity"+(new Date).getTime(),$.uuid=0;for(var a={},n=a.hasOwnProperty,o=a.toString,i="Boolean Number String Function Array Date RegExp Object Error".split(" "),s=0;s<i.length;s++)a["[object "+i[s]+"]"]=i[s].toLowerCase();$.fn.init.prototype=$.fn,e.Velocity={Utilities:$}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,r,a){function n(e){for(var t=-1,r=e?e.length:0,a=[];++t<r;){var n=e[t];n&&a.push(n)}return a}function o(e){return g.isWrapped(e)?e=[].slice.call(e):g.isNode(e)&&(e=[e]),e}function i(e){var t=$.data(e,"velocity");return null===t?a:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,r,a,n){function o(e,t){return 1-3*t+3*e}function i(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,r){return((o(t,r)*e+i(t,r))*e+s(t))*e}function u(e,t,r){return 3*o(t,r)*e*e+2*i(t,r)*e+s(t)}function c(t,r){for(var n=0;m>n;++n){var o=u(r,e,a);if(0===o)return r;var i=l(r,e,a)-t;r-=i/o}return r}function p(){for(var t=0;b>t;++t)w[t]=l(t*x,e,a)}function f(t,r,n){var o,i,s=0;do i=r+(n-r)/2,o=l(i,e,a)-t,o>0?n=i:r=i;while(Math.abs(o)>h&&++s<v);return i}function d(t){for(var r=0,n=1,o=b-1;n!=o&&w[n]<=t;++n)r+=x;--n;var i=(t-w[n])/(w[n+1]-w[n]),s=r+i*x,l=u(s,e,a);return l>=y?c(t,s):0==l?s:f(t,r,r+x)}function g(){V=!0,(e!=r||a!=n)&&p()}var m=4,y=.001,h=1e-7,v=10,b=11,x=1/(b-1),S="Float32Array"in t;if(4!==arguments.length)return!1;for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1;e=Math.min(e,1),a=Math.min(a,1),e=Math.max(e,0),a=Math.max(a,0);var w=S?new Float32Array(b):new Array(b),V=!1,C=function(t){return V||g(),e===r&&a===n?t:0===t?0:1===t?1:l(d(t),r,n)};C.getControlPoints=function(){return[{x:e,y:r},{x:a,y:n}]};var T="generateBezier("+[e,r,a,n]+")";return C.toString=function(){return T},C}function u(e,t){var r=e;return g.isString(e)?v.Easings[e]||(r=!1):r=g.isArray(e)&&1===e.length?s.apply(null,e):g.isArray(e)&&2===e.length?b.apply(null,e.concat([t])):g.isArray(e)&&4===e.length?l.apply(null,e):!1,r===!1&&(r=v.Easings[v.defaults.easing]?v.defaults.easing:h),r}function c(e){if(e)for(var t=(new Date).getTime(),r=0,n=v.State.calls.length;n>r;r++)if(v.State.calls[r]){var o=v.State.calls[r],s=o[0],l=o[2],u=o[3],f=!!u;u||(u=v.State.calls[r][3]=t-16);for(var d=Math.min((t-u)/l.duration,1),m=0,y=s.length;y>m;m++){var h=s[m],b=h.element;if(i(b)){var S=!1;if(l.display!==a&&null!==l.display&&"none"!==l.display){if("flex"===l.display){var w=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];$.each(w,function(e,t){x.setPropertyValue(b,"display",t)})}x.setPropertyValue(b,"display",l.display)}l.visibility!==a&&"hidden"!==l.visibility&&x.setPropertyValue(b,"visibility",l.visibility);for(var V in h)if("element"!==V){var C=h[V],T,k=g.isString(C.easing)?v.Easings[C.easing]:C.easing;if(1===d)T=C.endValue;else if(T=C.startValue+(C.endValue-C.startValue)*k(d),!f&&T===C.currentValue)continue;if(C.currentValue=T,x.Hooks.registered[V]){var A=x.Hooks.getRoot(V),F=i(b).rootPropertyValueCache[A];F&&(C.rootPropertyValue=F)}var E=x.setPropertyValue(b,V,C.currentValue+(0===parseFloat(T)?"":C.unitType),C.rootPropertyValue,C.scrollData);x.Hooks.registered[V]&&(i(b).rootPropertyValueCache[A]=x.Normalizations.registered[A]?x.Normalizations.registered[A]("extract",null,E[1]):E[1]),"transform"===E[0]&&(S=!0)}l.mobileHA&&i(b).transformCache.translate3d===a&&(i(b).transformCache.translate3d="(0px, 0px, 0px)",S=!0),S&&x.flushTransformCache(b)}}l.display!==a&&"none"!==l.display&&(v.State.calls[r][2].display=!1),l.visibility!==a&&"hidden"!==l.visibility&&(v.State.calls[r][2].visibility=!1),l.progress&&l.progress.call(o[1],o[1],d,Math.max(0,u+l.duration-t),u),1===d&&p(r)}v.State.isTicking&&P(c)}function p(e,t){if(!v.State.calls[e])return!1;for(var r=v.State.calls[e][0],n=v.State.calls[e][1],o=v.State.calls[e][2],s=v.State.calls[e][4],l=!1,u=0,c=r.length;c>u;u++){var p=r[u].element;if(t||o.loop||("none"===o.display&&x.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&x.setPropertyValue(p,"visibility",o.visibility)),o.loop!==!0&&($.queue(p)[1]===a||!/\.velocityQueueEntryFlag/i.test($.queue(p)[1]))&&i(p)){i(p).isAnimating=!1,i(p).rootPropertyValueCache={};var f=!1;$.each(x.Lists.transforms3D,function(e,t){var r=/^scale/.test(t)?1:0,n=i(p).transformCache[t];i(p).transformCache[t]!==a&&new RegExp("^\\("+r+"[^.]").test(n)&&(f=!0,delete i(p).transformCache[t])}),o.mobileHA&&(f=!0,delete i(p).transformCache.translate3d),f&&x.flushTransformCache(p),x.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(n,n)}catch(d){setTimeout(function(){throw d},1)}s&&o.loop!==!0&&s(n),o.loop!==!0||t||($.each(i(p).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360)}),v(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&$.dequeue(p,o.queue)}v.State.calls[e]=!1;for(var g=0,m=v.State.calls.length;m>g;g++)if(v.State.calls[g]!==!1){l=!0;break}l===!1&&(v.State.isTicking=!1,delete v.State.calls,v.State.calls=[])}var f=function(){if(r.documentMode)return r.documentMode;for(var e=7;e>4;e--){var t=r.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return a}(),d=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var r=(new Date).getTime(),a;return a=Math.max(0,16-(r-e)),e=r+a,setTimeout(function(){t(r+a)},a)}}(),g={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==a&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},$,m=!1;if(e.fn&&e.fn.jquery?($=e,m=!0):$=t.Velocity.Utilities,8>=f&&!m)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=f)return void(jQuery.fn.velocity=jQuery.fn.animate);var y=400,h="swing",v={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:r.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:$,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:y,easing:h,begin:a,complete:a,progress:a,display:a,visibility:a,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){$.data(e,"velocity",{isSVG:g.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:1,patch:0},debug:!1};t.pageYOffset!==a?(v.State.scrollAnchor=t,v.State.scrollPropertyLeft="pageXOffset",v.State.scrollPropertyTop="pageYOffset"):(v.State.scrollAnchor=r.documentElement||r.body.parentNode||r.body,v.State.scrollPropertyLeft="scrollLeft",v.State.scrollPropertyTop="scrollTop");var b=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,a){var n={x:t.x+a.dx*r,v:t.v+a.dv*r,tension:t.tension,friction:t.friction};return{dx:n.v,dv:e(n)}}function r(r,a){var n={dx:r.v,dv:e(r)},o=t(r,.5*a,n),i=t(r,.5*a,o),s=t(r,a,i),l=1/6*(n.dx+2*(o.dx+i.dx)+s.dx),u=1/6*(n.dv+2*(o.dv+i.dv)+s.dv);return r.x=r.x+l*a,r.v=r.v+u*a,r}return function a(e,t,n){var o={x:-1,v:0,tension:null,friction:null},i=[0],s=0,l=1e-4,u=.016,c,p,f;for(e=parseFloat(e)||500,t=parseFloat(t)||20,n=n||null,o.tension=e,o.friction=t,c=null!==n,c?(s=a(e,t),p=s/n*u):p=u;;)if(f=r(f||o,p),i.push(1+f.x),s+=16,!(Math.abs(f.x)>l&&Math.abs(f.v)>l))break;return c?function(e){return i[e*(i.length-1)|0]}:s}}();v.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},$.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){v.Easings[t[0]]=l.apply(null,t[1])});var x=v.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<x.Lists.colors.length;e++){var t="color"===x.Lists.colors[e]?"0 0 0 1":"255 255 255 1";x.Hooks.templates[x.Lists.colors[e]]=["Red Green Blue Alpha",t]}var r,a,n;if(f)for(r in x.Hooks.templates){a=x.Hooks.templates[r],n=a[0].split(" ");var o=a[1].match(x.RegEx.valueSplit);"Color"===n[0]&&(n.push(n.shift()),o.push(o.shift()),x.Hooks.templates[r]=[n.join(" "),o.join(" ")])}for(r in x.Hooks.templates){a=x.Hooks.templates[r],n=a[0].split(" ");for(var e in n){var i=r+n[e],s=e;x.Hooks.registered[i]=[r,s]}}},getRoot:function(e){var t=x.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return x.RegEx.valueUnwrap.test(t)&&(t=t.match(x.RegEx.valueUnwrap)[1]),x.Values.isCSSNullValue(t)&&(t=x.Hooks.templates[e][1]),t},extractValue:function(e,t){var r=x.Hooks.registered[e];if(r){var a=r[0],n=r[1];return t=x.Hooks.cleanRootPropertyValue(a,t),t.toString().match(x.RegEx.valueSplit)[n]}return t},injectValue:function(e,t,r){var a=x.Hooks.registered[e];if(a){var n=a[0],o=a[1],i,s;return r=x.Hooks.cleanRootPropertyValue(n,r),i=r.toString().match(x.RegEx.valueSplit),i[o]=t,s=i.join(" ")}return r}},Normalizations:{registered:{clip:function(e,t,r){switch(e){case"name":return"clip";case"extract":var a;return x.RegEx.wrappedValueAlreadyExtracted.test(r)?a=r:(a=r.toString().match(x.RegEx.valueUnwrap),a=a?a[1].replace(/,(\s+)?/g," "):r),a;case"inject":return"rect("+r+")"}},blur:function(e,t,r){switch(e){case"name":return"-webkit-filter";case"extract":var a=parseFloat(r);if(!a&&0!==a){var n=r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a=n?n[1]:0}return a;case"inject":return parseFloat(r)?"blur("+r+")":"none"}},opacity:function(e,t,r){if(8>=f)switch(e){case"name":return"filter";case"extract":var a=r.toString().match(/alpha\(opacity=(.*)\)/i);return r=a?a[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(r)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(r),10)+")"}else switch(e){case"name":return"opacity";case"extract":return r;case"inject":return r}}},register:function(){9>=f||v.State.isGingerbread||(x.Lists.transformsBase=x.Lists.transformsBase.concat(x.Lists.transforms3D));for(var e=0;e<x.Lists.transformsBase.length;e++)!function(){var t=x.Lists.transformsBase[e];x.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return"transform";case"extract":return i(r)===a||i(r).transformCache[t]===a?/^scale/i.test(t)?1:0:i(r).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case"scal":case"scale":v.State.isAndroid&&i(r).transformCache[t]===a&&1>n&&(n=1),o=!/(\d)$/i.test(n);break;case"skew":o=!/(deg|\d)$/i.test(n);break;case"rotate":o=!/(deg|\d)$/i.test(n)}return o||(i(r).transformCache[t]="("+n+")"),i(r).transformCache[t]}}}();for(var e=0;e<x.Lists.colors.length;e++)!function(){var t=x.Lists.colors[e];x.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return t;case"extract":var o;if(x.RegEx.wrappedValueAlreadyExtracted.test(n))o=n;else{var i,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(n)?i=s[n]!==a?s[n]:s.black:x.RegEx.isHex.test(n)?i="rgb("+x.Values.hexToRgb(n).join(" ")+")":/^rgba?\(/i.test(n)||(i=s.black),o=(i||n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=f||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=f?4===n.split(" ").length&&(n=n.split(/\s+/).slice(0,3).join(" ")):3===n.split(" ").length&&(n+=" 1"),(8>=f?"rgb":"rgba")+"("+n.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(f||v.State.isAndroid&&!v.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(v.State.prefixMatches[e])return[v.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],r=0,a=t.length;a>r;r++){var n;if(n=0===r?e:t[r]+e.replace(/^\w/,function(e){return e.toUpperCase()}),g.isString(v.State.prefixElement.style[n]))return v.State.prefixMatches[e]=n,[n,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,a;return e=e.replace(t,function(e,t,r,a){return t+t+r+r+a+a}),a=r.exec(e),a?[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,r,n,o){function s(e,r){function n(){u&&x.setPropertyValue(e,"display","none")}var l=0;if(8>=f)l=$.css(e,r);else{var u=!1;if(/^(width|height)$/.test(r)&&0===x.getPropertyValue(e,"display")&&(u=!0,x.setPropertyValue(e,"display",x.Values.getDisplayType(e))),!o){if("height"===r&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(x.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(x.getPropertyValue(e,"paddingBottom"))||0);return n(),c}if("width"===r&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(x.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(x.getPropertyValue(e,"paddingRight"))||0);return n(),p}}var d;d=i(e)===a?t.getComputedStyle(e,null):i(e).computedStyle?i(e).computedStyle:i(e).computedStyle=t.getComputedStyle(e,null),(f||v.State.isFirefox)&&"borderColor"===r&&(r="borderTopColor"),l=9===f&&"filter"===r?d.getPropertyValue(r):d[r],(""===l||null===l)&&(l=e.style[r]),n()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(r)){var g=s(e,"position");("fixed"===g||"absolute"===g&&/top|left/i.test(r))&&(l=$(e).position()[r]+"px")}return l}var l;if(x.Hooks.registered[r]){var u=r,c=x.Hooks.getRoot(u);n===a&&(n=x.getPropertyValue(e,x.Names.prefixCheck(c)[0])),x.Normalizations.registered[c]&&(n=x.Normalizations.registered[c]("extract",e,n)),l=x.Hooks.extractValue(u,n)}else if(x.Normalizations.registered[r]){var p,d;p=x.Normalizations.registered[r]("name",e),"transform"!==p&&(d=s(e,x.Names.prefixCheck(p)[0]),x.Values.isCSSNullValue(d)&&x.Hooks.templates[r]&&(d=x.Hooks.templates[r][1])),l=x.Normalizations.registered[r]("extract",e,d)}return/^[\d-]/.test(l)||(l=i(e)&&i(e).isSVG&&x.Names.SVGAttribute(r)?/^(height|width)$/i.test(r)?e.getBBox()[r]:e.getAttribute(r):s(e,x.Names.prefixCheck(r)[0])),x.Values.isCSSNullValue(l)&&(l=0),v.debug>=2&&console.log("Get "+r+": "+l),l},setPropertyValue:function(e,r,a,n,o){var s=r;if("scroll"===r)o.container?o.container["scroll"+o.direction]=a:"Left"===o.direction?t.scrollTo(a,o.alternateValue):t.scrollTo(o.alternateValue,a);else if(x.Normalizations.registered[r]&&"transform"===x.Normalizations.registered[r]("name",e))x.Normalizations.registered[r]("inject",e,a),s="transform",a=i(e).transformCache[r];else{if(x.Hooks.registered[r]){var l=r,u=x.Hooks.getRoot(r);n=n||x.getPropertyValue(e,u),a=x.Hooks.injectValue(l,a,n),r=u}if(x.Normalizations.registered[r]&&(a=x.Normalizations.registered[r]("inject",e,a),r=x.Normalizations.registered[r]("name",e)),s=x.Names.prefixCheck(r)[0],8>=f)try{e.style[s]=a}catch(c){v.debug&&console.log("Browser does not support ["+a+"] for ["+s+"]")}else i(e)&&i(e).isSVG&&x.Names.SVGAttribute(r)?e.setAttribute(r,a):e.style[s]=a;v.debug>=2&&console.log("Set "+r+" ("+s+"): "+a)}return[s,a]},flushTransformCache:function(e){function t(t){return parseFloat(x.getPropertyValue(e,t))}var r="";if((f||v.State.isAndroid&&!v.State.isChrome)&&i(e).isSVG){var a={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};$.each(i(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),a[e]&&(r+=e+"("+a[e].join(" ")+") ",delete a[e])})}else{var n,o;$.each(i(e).transformCache,function(t){return n=i(e).transformCache[t],"transformPerspective"===t?(o=n,!0):(9===f&&"rotateZ"===t&&(t="rotate"),void(r+=t+n+" "))}),o&&(r="perspective"+o+" "+r)}x.setPropertyValue(e,"transform",r)}};x.Hooks.register(),x.Normalizations.register(),v.hook=function(e,t,r){var n=a;return e=o(e),$.each(e,function(e,o){if(i(o)===a&&v.init(o),r===a)n===a&&(n=v.CSS.getPropertyValue(o,t));else{var s=v.CSS.setPropertyValue(o,t,r);"transform"===s[0]&&v.CSS.flushTransformCache(o),n=s}}),n};var S=function(){function e(){return f?k.promise||null:d}function s(){function e(e){function f(e,t){var r=a,n=a,i=a;return g.isArray(e)?(r=e[0],!g.isArray(e[1])&&/^[\d-]/.test(e[1])||g.isFunction(e[1])||x.RegEx.isHex.test(e[1])?i=e[1]:(g.isString(e[1])&&!x.RegEx.isHex.test(e[1])||g.isArray(e[1]))&&(n=t?e[1]:u(e[1],s.duration),e[2]!==a&&(i=e[2]))):r=e,t||(n=n||s.easing),g.isFunction(r)&&(r=r.call(o,V,w)),g.isFunction(i)&&(i=i.call(o,V,w)),[r||0,n,i]}function d(e,t){var r,a;return a=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return r=e,""}),r||(r=x.Values.getUnitType(e)),[a,r]}function m(){var e={myParent:o.parentNode||r.body,position:x.getPropertyValue(o,"position"),fontSize:x.getPropertyValue(o,"fontSize")},a=e.position===L.lastPosition&&e.myParent===L.lastParent,n=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var s=100,l={};if(n&&a)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var u=i(o).isSVG?r.createElementNS("http://www.w3.org/2000/svg","rect"):r.createElement("div");v.init(u),e.myParent.appendChild(u),$.each(["overflow","overflowX","overflowY"],function(e,t){v.CSS.setPropertyValue(u,t,"hidden")}),v.CSS.setPropertyValue(u,"position",e.position),v.CSS.setPropertyValue(u,"fontSize",e.fontSize),v.CSS.setPropertyValue(u,"boxSizing","content-box"),$.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){v.CSS.setPropertyValue(u,t,s+"%")}),v.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(x.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(x.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=L.lastEmToPx=(parseFloat(x.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===L.remToPx&&(L.remToPx=parseFloat(x.getPropertyValue(r.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,v.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(s.begin&&0===V)try{s.begin.call(h,h)}catch(y){setTimeout(function(){throw y},1)}if("scroll"===A){var S=/^x$/i.test(s.axis)?"Left":"Top",C=parseFloat(s.offset)||0,T,F,E;s.container?g.isWrapped(s.container)||g.isNode(s.container)?(s.container=s.container[0]||s.container,T=s.container["scroll"+S],E=T+$(o).position()[S.toLowerCase()]+C):s.container=null:(T=v.State.scrollAnchor[v.State["scrollProperty"+S]],F=v.State.scrollAnchor[v.State["scrollProperty"+("Left"===S?"Top":"Left")]],E=$(o).offset()[S.toLowerCase()]+C),l={scroll:{rootPropertyValue:!1,startValue:T,currentValue:T,endValue:E,unitType:"",easing:s.easing,scrollData:{container:s.container,direction:S,alternateValue:F}},element:o},v.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===A){if(!i(o).tweensContainer)return void $.dequeue(o,s.queue);"none"===i(o).opts.display&&(i(o).opts.display="auto"),"hidden"===i(o).opts.visibility&&(i(o).opts.visibility="visible"),i(o).opts.loop=!1,i(o).opts.begin=null,i(o).opts.complete=null,P.easing||delete s.easing,P.duration||delete s.duration,s=$.extend({},i(o).opts,s);var j=$.extend(!0,{},i(o).tweensContainer);for(var H in j)if("element"!==H){var N=j[H].startValue;j[H].startValue=j[H].currentValue=j[H].endValue,j[H].endValue=N,g.isEmptyObject(P)||(j[H].easing=s.easing),v.debug&&console.log("reverse tweensContainer ("+H+"): "+JSON.stringify(j[H]),o)}l=j}else if("start"===A){var j;i(o).tweensContainer&&i(o).isAnimating===!0&&(j=i(o).tweensContainer),$.each(b,function(e,t){if(RegExp("^"+x.Lists.colors.join("$|^")+"$").test(e)){var r=f(t,!0),n=r[0],o=r[1],i=r[2];if(x.RegEx.isHex.test(n)){for(var s=["Red","Green","Blue"],l=x.Values.hexToRgb(n),u=i?x.Values.hexToRgb(i):a,c=0;c<s.length;c++){var p=[l[c]];o&&p.push(o),u!==a&&p.push(u[c]),b[e+s[c]]=p}delete b[e]}}});for(var O in b){var z=f(b[O]),q=z[0],M=z[1],I=z[2];O=x.Names.camelCase(O);var B=x.Hooks.getRoot(O),W=!1;if(i(o).isSVG||x.Names.prefixCheck(B)[1]!==!1||x.Normalizations.registered[B]!==a){(s.display!==a&&null!==s.display&&"none"!==s.display||s.visibility!==a&&"hidden"!==s.visibility)&&/opacity|filter/.test(O)&&!I&&0!==q&&(I=0),s._cacheValues&&j&&j[O]?(I===a&&(I=j[O].endValue+j[O].unitType),W=i(o).rootPropertyValueCache[B]):x.Hooks.registered[O]?I===a?(W=x.getPropertyValue(o,B),I=x.getPropertyValue(o,O,W)):W=x.Hooks.templates[B][1]:I===a&&(I=x.getPropertyValue(o,O));var G,D,X,Y=!1;if(G=d(O,I),I=G[0],X=G[1],G=d(O,q),q=G[0].replace(/^([+-\/*])=/,function(e,t){return Y=t,""}),D=G[1],I=parseFloat(I)||0,q=parseFloat(q)||0,"%"===D&&(/^(fontSize|lineHeight)$/.test(O)?(q/=100,D="em"):/^scale/.test(O)?(q/=100,D=""):/(Red|Green|Blue)$/i.test(O)&&(q=q/100*255,D="")),/[\/*]/.test(Y))D=X;else if(X!==D&&0!==I)if(0===q)D=X;else{p=p||m();var Q=/margin|padding|left|right|width|text|word|letter/i.test(O)||/X$/.test(O)||"x"===O?"x":"y";switch(X){case"%":I*="x"===Q?p.percentToPxWidth:p.percentToPxHeight;break;case"px":break;default:I*=p[X+"ToPx"]}switch(D){case"%":I*=1/("x"===Q?p.percentToPxWidth:p.percentToPxHeight);break;case"px":break;default:I*=1/p[D+"ToPx"]}}switch(Y){case"+":q=I+q;break;case"-":q=I-q;break;case"*":q=I*q;break;case"/":q=I/q}l[O]={rootPropertyValue:W,startValue:I,currentValue:I,endValue:q,unitType:D,easing:M},v.debug&&console.log("tweensContainer ("+O+"): "+JSON.stringify(l[O]),o)}else v.debug&&console.log("Skipping ["+B+"] due to a lack of browser support.")}l.element=o}l.element&&(x.Values.addClass(o,"velocity-animating"),R.push(l),""===s.queue&&(i(o).tweensContainer=l,i(o).opts=s),i(o).isAnimating=!0,V===w-1?(v.State.calls.length>1e4&&(v.State.calls=n(v.State.calls)),v.State.calls.push([R,h,s,null,k.resolver]),v.State.isTicking===!1&&(v.State.isTicking=!0,c())):V++)}var o=this,s=$.extend({},v.defaults,P),l={},p;switch(i(o)===a&&v.init(o),parseFloat(s.delay)&&s.queue!==!1&&$.queue(o,s.queue,function(e){v.velocityQueueEntryFlag=!0,i(o).delayTimer={setTimeout:setTimeout(e,parseFloat(s.delay)),next:e}}),s.duration.toString().toLowerCase()){case"fast":s.duration=200;break;case"normal":s.duration=y;break;case"slow":s.duration=600;break;default:s.duration=parseFloat(s.duration)||1}v.mock!==!1&&(v.mock===!0?s.duration=s.delay=1:(s.duration*=parseFloat(v.mock)||1,s.delay*=parseFloat(v.mock)||1)),s.easing=u(s.easing,s.duration),s.begin&&!g.isFunction(s.begin)&&(s.begin=null),s.progress&&!g.isFunction(s.progress)&&(s.progress=null),s.complete&&!g.isFunction(s.complete)&&(s.complete=null),s.display!==a&&null!==s.display&&(s.display=s.display.toString().toLowerCase(),"auto"===s.display&&(s.display=v.CSS.Values.getDisplayType(o))),s.visibility!==a&&null!==s.visibility&&(s.visibility=s.visibility.toString().toLowerCase()),s.mobileHA=s.mobileHA&&v.State.isMobile&&!v.State.isGingerbread,s.queue===!1?s.delay?setTimeout(e,s.delay):e():$.queue(o,s.queue,function(t,r){return r===!0?(k.promise&&k.resolver(h),!0):(v.velocityQueueEntryFlag=!0,void e(t))}),""!==s.queue&&"fx"!==s.queue||"inprogress"===$.queue(o)[0]||$.dequeue(o)}var l=arguments[0]&&($.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||g.isString(arguments[0].properties)),f,d,m,h,b,P;if(g.isWrapped(this)?(f=!1,m=0,h=this,d=this):(f=!0,m=1,h=l?arguments[0].elements:arguments[0]),h=o(h)){l?(b=arguments[0].properties,P=arguments[0].options):(b=arguments[m],P=arguments[m+1]);var w=h.length,V=0;if("stop"!==b&&!$.isPlainObject(P)){var C=m+1;P={};for(var T=C;T<arguments.length;T++)g.isArray(arguments[T])||!/^(fast|normal|slow)$/i.test(arguments[T])&&!/^\d/.test(arguments[T])?g.isString(arguments[T])||g.isArray(arguments[T])?P.easing=arguments[T]:g.isFunction(arguments[T])&&(P.complete=arguments[T]):P.duration=arguments[T]}var k={promise:null,resolver:null,rejecter:null};f&&v.Promise&&(k.promise=new v.Promise(function(e,t){k.resolver=e,k.rejecter=t}));var A;switch(b){case"scroll":A="scroll";break;case"reverse":A="reverse";break;case"stop":$.each(h,function(e,t){i(t)&&i(t).delayTimer&&(clearTimeout(i(t).delayTimer.setTimeout),i(t).delayTimer.next&&i(t).delayTimer.next(),delete i(t).delayTimer)});var F=[];return $.each(v.State.calls,function(e,t){t&&$.each(t[1],function(r,n){var o=g.isString(P)?P:"";return P!==a&&t[2].queue!==o?!0:void $.each(h,function(t,r){r===n&&(P!==a&&($.each($.queue(r,o),function(e,t){g.isFunction(t)&&t(null,!0)}),$.queue(r,o,[])),i(r)&&""===o&&$.each(i(r).tweensContainer,function(e,t){t.endValue=t.currentValue}),F.push(e))})})}),$.each(F,function(e,t){p(t,!0)}),k.promise&&k.resolver(h),e();default:if(!$.isPlainObject(b)||g.isEmptyObject(b)){if(g.isString(b)&&v.Redirects[b]){var E=$.extend({},P),j=E.duration,H=E.delay||0;return E.backwards===!0&&(h=$.extend(!0,[],h).reverse()),$.each(h,function(e,t){parseFloat(E.stagger)?E.delay=H+parseFloat(E.stagger)*e:g.isFunction(E.stagger)&&(E.delay=H+E.stagger.call(t,e,w)),E.drag&&(E.duration=parseFloat(j)||(/^(callout|transition)/.test(b)?1e3:y),E.duration=Math.max(E.duration*(E.backwards?1-e/w:(e+1)/w),.75*E.duration,200)),v.Redirects[b].call(t,t,E||{},e,w,h,k.promise?k:a)
}),e()}var N="Velocity: First argument ("+b+") was not a property map, a known action, or a registered redirect. Aborting.";return k.promise?k.rejecter(new Error(N)):console.log(N),e()}A="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},R=[];$.each(h,function(e,t){g.isNode(t)&&s.call(t)});var E=$.extend({},v.defaults,P),O;if(E.loop=parseInt(E.loop),O=2*E.loop-1,E.loop)for(var z=0;O>z;z++){var q={delay:E.delay,progress:E.progress};z===O-1&&(q.display=E.display,q.visibility=E.visibility,q.complete=E.complete),S(h,"reverse",q)}return e()}};v=$.extend(S,v),v.animate=S;var P=t.requestAnimationFrame||d;return v.State.isMobile||r.hidden===a||r.addEventListener("visibilitychange",function(){r.hidden?(P=function(e){return setTimeout(function(){e(!0)},16)},c()):P=t.requestAnimationFrame||d}),e.Velocity=v,e!==t&&(e.fn.velocity=S,e.fn.velocity.defaults=v.defaults),$.each(["Down","Up"],function(e,t){v.Redirects["slide"+t]=function(e,r,n,o,i,s){var l=$.extend({},r),u=l.begin,c=l.complete,p={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},f={};l.display===a&&(l.display="Down"===t?"inline"===v.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(i,i);for(var r in p){f[r]=e.style[r];var a=v.CSS.getPropertyValue(e,r);p[r]="Down"===t?[a,0]:[0,a]}f.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in f)e.style[t]=f[t];c&&c.call(i,i),s&&s.resolver(i)},v(e,p,l)}}),$.each(["In","Out"],function(e,t){v.Redirects["fade"+t]=function(e,r,n,o,i,s){var l=$.extend({},r),u={opacity:"In"===t?1:0},c=l.complete;l.complete=n!==o-1?l.begin=null:function(){c&&c.call(i,i),s&&s.resolver(i)},l.display===a&&(l.display="In"===t?"auto":"none"),v(this,u,l)}}),v}(window.jQuery||window.Zepto||window,window,document)});;/****lib/velocity.ui.min.js****/
/* VelocityJS.org UI Pack (5.0.0). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci. */
!function(t){"function"==typeof require&&"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define(["velocity"],t):t()}(function(){return function(t,a,e,r){function n(t,a){var e=[];return t&&a?($.each([t,a],function(t,a){var r=[];$.each(a,function(t,a){for(;a.toString().length<5;)a="0"+a;r.push(a)}),e.push(r.join(""))}),parseFloat(e[0])>parseFloat(e[1])):!1}if(!t.Velocity||!t.Velocity.Utilities)return void(a.console&&console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));var i=t.Velocity,$=i.Utilities,s=i.version,o={major:1,minor:1,patch:0};if(n(o,s)){var l="Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";throw alert(l),new Error(l)}i.RegisterEffect=i.RegisterUI=function(t,a){function e(t,a,e,r){var n=0,s;$.each(t.nodeType?[t]:t,function(t,a){r&&(e+=t*r),s=a.parentNode,$.each(["height","paddingTop","paddingBottom","marginTop","marginBottom"],function(t,e){n+=parseFloat(i.CSS.getPropertyValue(a,e))})}),i.animate(s,{height:("In"===a?"+":"-")+"="+n},{queue:!1,easing:"ease-in-out",duration:e*("In"===a?.6:1)})}return i.Redirects[t]=function(n,s,o,l,c,u){function f(){s.display!==r&&"none"!==s.display||!/Out$/.test(t)||$.each(c.nodeType?[c]:c,function(t,a){i.CSS.setPropertyValue(a,"display","none")}),s.complete&&s.complete.call(c,c),u&&u.resolver(c||n)}var p=o===l-1;a.defaultDuration="function"==typeof a.defaultDuration?a.defaultDuration.call(c,c):parseFloat(a.defaultDuration);for(var d=0;d<a.calls.length;d++){var y=a.calls[d],g=y[0],m=s.duration||a.defaultDuration||1e3,X=y[1],Y=y[2]||{},O={};if(O.duration=m*(X||1),O.queue=s.queue||"",O.easing=Y.easing||"ease",O.delay=parseFloat(Y.delay)||0,O._cacheValues=Y._cacheValues||!0,0===d){if(O.delay+=parseFloat(s.delay)||0,0===o&&(O.begin=function(){s.begin&&s.begin.call(c,c);var a=t.match(/(In|Out)$/);a&&"In"===a[0]&&g.opacity!==r&&$.each(c.nodeType?[c]:c,function(t,a){i.CSS.setPropertyValue(a,"opacity",0)}),s.animateParentHeight&&a&&e(c,a[0],m+O.delay,s.stagger)}),null!==s.display)if(s.display!==r&&"none"!==s.display)O.display=s.display;else if(/In$/.test(t)){var v=i.CSS.Values.getDisplayType(n);O.display="inline"===v?"inline-block":v}s.visibility&&"hidden"!==s.visibility&&(O.visibility=s.visibility)}d===a.calls.length-1&&(O.complete=function(){if(a.reset){for(var t in a.reset){var e=a.reset[t];i.CSS.Hooks.registered[t]!==r||"string"!=typeof e&&"number"!=typeof e||(a.reset[t]=[a.reset[t],a.reset[t]])}var s={duration:0,queue:!1};p&&(s.complete=f),i.animate(n,a.reset,s)}else p&&f()},"hidden"===s.visibility&&(O.visibility=s.visibility)),i.animate(n,g,O)}},i},i.RegisterEffect.packagedEffects={"callout.bounce":{defaultDuration:550,calls:[[{translateY:-30},.25],[{translateY:0},.125],[{translateY:-15},.125],[{translateY:0},.25]]},"callout.shake":{defaultDuration:800,calls:[[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:0},.125]]},"callout.flash":{defaultDuration:1100,calls:[[{opacity:[0,"easeInOutQuad",1]},.25],[{opacity:[1,"easeInOutQuad"]},.25],[{opacity:[0,"easeInOutQuad"]},.25],[{opacity:[1,"easeInOutQuad"]},.25]]},"callout.pulse":{defaultDuration:825,calls:[[{scaleX:1.1,scaleY:1.1},.5],[{scaleX:1,scaleY:1},.5]]},"callout.swing":{defaultDuration:950,calls:[[{rotateZ:15},.2],[{rotateZ:-10},.2],[{rotateZ:5},.2],[{rotateZ:-5},.2],[{rotateZ:0},.2]]},"callout.tada":{defaultDuration:1e3,calls:[[{scaleX:.9,scaleY:.9,rotateZ:-3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:-3},.1],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],[{scaleX:1,scaleY:1,rotateZ:0},.2]]},"transition.fadeIn":{defaultDuration:500,calls:[[{opacity:[1,0]}]]},"transition.fadeOut":{defaultDuration:500,calls:[[{opacity:[0,1]}]]},"transition.flipXIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateY:[0,-55]}]],reset:{transformPerspective:0}},"transition.flipXOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateY:55}]],reset:{transformPerspective:0,rotateY:0}},"transition.flipYIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateX:[0,-45]}]],reset:{transformPerspective:0}},"transition.flipYOut":{defaultDuration:800,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateX:25}]],reset:{transformPerspective:0,rotateX:0}},"transition.flipBounceXIn":{defaultDuration:900,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateY:[-10,90]},.5],[{opacity:.8,rotateY:10},.25],[{opacity:1,rotateY:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceXOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateY:-10},.5],[{opacity:0,rotateY:90},.5]],reset:{transformPerspective:0,rotateY:0}},"transition.flipBounceYIn":{defaultDuration:850,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateX:[-10,90]},.5],[{opacity:.8,rotateX:10},.25],[{opacity:1,rotateX:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceYOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateX:-15},.5],[{opacity:0,rotateX:90},.5]],reset:{transformPerspective:0,rotateX:0}},"transition.swoopIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["100%","50%"],transformOriginY:["100%","100%"],scaleX:[1,0],scaleY:[1,0],translateX:[0,-700],translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%"}},"transition.swoopOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformOriginX:["50%","100%"],transformOriginY:["100%","100%"],scaleX:0,scaleY:0,translateX:-700,translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%",scaleX:1,scaleY:1,translateX:0}},"transition.whirlIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,0],scaleY:[1,0],rotateY:[0,160]},1,{easing:"easeInOutSine"}]]},"transition.whirlOut":{defaultDuration:750,calls:[[{opacity:[0,"easeInOutQuint",1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:0,scaleY:0,rotateY:160},1,{easing:"swing"}]],reset:{scaleX:1,scaleY:1,rotateY:0}},"transition.shrinkIn":{defaultDuration:750,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,1.5],scaleY:[1,1.5],translateZ:0}]]},"transition.shrinkOut":{defaultDuration:600,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:1.3,scaleY:1.3,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.expandIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,.625],scaleY:[1,.625],translateZ:0}]]},"transition.expandOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:.5,scaleY:.5,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.bounceIn":{defaultDuration:800,calls:[[{opacity:[1,0],scaleX:[1.05,.3],scaleY:[1.05,.3]},.4],[{scaleX:.9,scaleY:.9,translateZ:0},.2],[{scaleX:1,scaleY:1},.5]]},"transition.bounceOut":{defaultDuration:800,calls:[[{scaleX:.95,scaleY:.95},.35],[{scaleX:1.1,scaleY:1.1,translateZ:0},.35],[{opacity:[0,1],scaleX:.3,scaleY:.3},.3]],reset:{scaleX:1,scaleY:1}},"transition.bounceUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[-30,1e3]},.6,{easing:"easeOutCirc"}],[{translateY:10},.2],[{translateY:0},.2]]},"transition.bounceUpOut":{defaultDuration:1e3,calls:[[{translateY:20},.2],[{opacity:[0,"easeInCirc",1],translateY:-1e3},.8]],reset:{translateY:0}},"transition.bounceDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[30,-1e3]},.6,{easing:"easeOutCirc"}],[{translateY:-10},.2],[{translateY:0},.2]]},"transition.bounceDownOut":{defaultDuration:1e3,calls:[[{translateY:-20},.2],[{opacity:[0,"easeInCirc",1],translateY:1e3},.8]],reset:{translateY:0}},"transition.bounceLeftIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[30,-1250]},.6,{easing:"easeOutCirc"}],[{translateX:-10},.2],[{translateX:0},.2]]},"transition.bounceLeftOut":{defaultDuration:750,calls:[[{translateX:30},.2],[{opacity:[0,"easeInCirc",1],translateX:-1250},.8]],reset:{translateX:0}},"transition.bounceRightIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[-30,1250]},.6,{easing:"easeOutCirc"}],[{translateX:10},.2],[{translateX:0},.2]]},"transition.bounceRightOut":{defaultDuration:750,calls:[[{translateX:-30},.2],[{opacity:[0,"easeInCirc",1],translateX:1250},.8]],reset:{translateX:0}},"transition.slideUpIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,20],translateZ:0}]]},"transition.slideUpOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:-20,translateZ:0}]],reset:{translateY:0}},"transition.slideDownIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,-20],translateZ:0}]]},"transition.slideDownOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:20,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,-20],translateZ:0}]]},"transition.slideLeftOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:-20,translateZ:0}]],reset:{translateX:0}},"transition.slideRightIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,20],translateZ:0}]]},"transition.slideRightOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:20,translateZ:0}]],reset:{translateX:0}},"transition.slideUpBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,75],translateZ:0}]]},"transition.slideUpBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:-75,translateZ:0}]],reset:{translateY:0}},"transition.slideDownBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,-75],translateZ:0}]]},"transition.slideDownBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:75,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,-75],translateZ:0}]]},"transition.slideLeftBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:-75,translateZ:0}]],reset:{translateX:0}},"transition.slideRightBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,75],translateZ:0}]]},"transition.slideRightBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:75,translateZ:0}]],reset:{translateX:0}},"transition.perspectiveUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:[0,-180]}]]},"transition.perspectiveUpOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveDownOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveLeftIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveLeftOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}},"transition.perspectiveRightIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveRightOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}}};for(var c in i.RegisterEffect.packagedEffects)i.RegisterEffect(c,i.RegisterEffect.packagedEffects[c]);i.RunSequence=function(t){var a=$.extend(!0,[],t);a.length>1&&($.each(a.reverse(),function(t,e){var r=a[t+1];if(r){var n=e.options&&e.options.sequenceQueue===!1?"begin":"complete",s=r.options&&r.options[n],o={};o[n]=function(){var t=r.elements.nodeType?[r.elements]:r.elements;s&&s.call(t,t),i(e)},r.options=$.extend({},r.options,o)}}),a.reverse()),i(a[0])}}(window.jQuery||window.Zepto||window,window,document)});;/****lib/p.js****/
var P = (function (prototype, ownProperty, undefined) {
	return function P(_superclass /* = Object */
	, definition) {
		// handle the case where no superclass is given
		if (definition === undefined) {
			definition = _superclass;
			_superclass = Object;
		}
		// C is the class to be returned.
		//
		// When called, creates and initializes an instance of C, unless
		// `this` is already an instance of C, then just initializes `this`;
		// either way, returns the instance of C that was initialized.
		//
		// TODO: the Chrome inspector shows all created objects as `C`
		// rather than `Object`. Setting the .name property seems to
		// have no effect. Is there a way to override this behavior?
		function C() {
			var self = this instanceof C ? this : new Bare;
			self.init.apply(self, arguments);
			return self;
		}
		// C.Bare is a class with a noop constructor. Its prototype will be
		// the same as C, so that instances of C.Bare are instances of C.
		// `new MyClass.Bare` then creates new instances of C without
		// calling .init().
		function Bare() {}
		C.Bare = Bare;
		// Extend the prototype chain: first use Bare to create an
		// uninitialized instance of the superclass, then set up Bare
		// to create instances of this class.
		var _super = Bare[prototype] = _superclass[prototype];
		var proto = Bare[prototype] = C[prototype] = C.p = new Bare;
		// pre-declaring the iteration variable for the loop below to save
		// a `var` keyword after minification
		var key;
		// set the constructor property on the prototype, for convenience
		proto.constructor = C;
		C.extend = function (def) {
			return P(C, def);
		}
		return (C.open = function (def) {
			if (typeof def === 'function') {
				// call the defining function with all the arguments you need
				// extensions captures the return value.
				def = def.call(C, proto, _super, C, _superclass);
			}
			// ...and extend it
			if (typeof def === 'object') {
				for (key in def) {
					if (ownProperty.call(def, key)) {
						proto[key] = def[key];
					}
				}
			}
			// if no init, assume we're inheriting from a non-Pjs class, so
			// default to using the superclass constructor.
			if (!('init' in proto))
				proto.init = _superclass;
			return C;
		})(definition);
	}
	// as a minifier optimization, we've closured in a few helper functions
	// and the string 'prototype' (C[p] is much shorter than C.prototype)
})('prototype', ({}).hasOwnProperty);
;/****lib/draggabilly.min.js****/
/*!
 * Draggabilly PACKAGED v1.1.2
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

!function (a) {
	function b(a) {
		return new RegExp("(^|\\s+)" + a + "(\\s+|$)")
	}
	function c(a, b) {
		var c = d(a, b) ? f : e;
		c(a, b)
	}
	var d,
	e,
	f;
	"classList" in document.documentElement ? (d = function (a, b) {
		return a.classList.contains(b)
	}, e = function (a, b) {
		a.classList.add(b)
	}, f = function (a, b) {
		a.classList.remove(b)
	}) : (d = function (a, c) {
		return b(c).test(a.className)
	}, e = function (a, b) {
		d(a, b) || (a.className = a.className + " " + b)
	}, f = function (a, c) {
		a.className = a.className.replace(b(c), " ")
	});
	var g = {
		hasClass : d,
		addClass : e,
		removeClass : f,
		toggleClass : c,
		has : d,
		add : e,
		remove : f,
		toggle : c
	};
	"function" == typeof define && define.amd ? define("classie/classie", g) : a.classie = g
}
(window), function () {
	function a() {}
	
	function b(a, b) {
		for (var c = a.length; c--; )
			if (a[c].listener === b)
				return c;
		return -1
	}
	function c(a) {
		return function () {
			return this[a].apply(this, arguments)
		}
	}
	var d = a.prototype;
	d.getListeners = function (a) {
		var b,
		c,
		d = this._getEvents();
		if ("object" == typeof a) {
			b = {};
			for (c in d)
				d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
		} else
			b = d[a] || (d[a] = []);
		return b
	},
	d.flattenListeners = function (a) {
		var b,
		c = [];
		for (b = 0; b < a.length; b += 1)
			c.push(a[b].listener);
		return c
	},
	d.getListenersAsObject = function (a) {
		var b,
		c = this.getListeners(a);
		return c instanceof Array && (b = {}, b[a] = c),
		b || c
	},
	d.addListener = function (a, c) {
		var d,
		e = this.getListenersAsObject(a),
		f = "object" == typeof c;
		for (d in e)
			e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
				listener : c,
				once : !1
			});
		return this
	},
	d.on = c("addListener"),
	d.addOnceListener = function (a, b) {
		return this.addListener(a, {
			listener : b,
			once : !0
		})
	},
	d.once = c("addOnceListener"),
	d.defineEvent = function (a) {
		return this.getListeners(a),
		this
	},
	d.defineEvents = function (a) {
		for (var b = 0; b < a.length; b += 1)
			this.defineEvent(a[b]);
		return this
	},
	d.removeListener = function (a, c) {
		var d,
		e,
		f = this.getListenersAsObject(a);
		for (e in f)
			f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
		return this
	},
	d.off = c("removeListener"),
	d.addListeners = function (a, b) {
		return this.manipulateListeners(!1, a, b)
	},
	d.removeListeners = function (a, b) {
		return this.manipulateListeners(!0, a, b)
	},
	d.manipulateListeners = function (a, b, c) {
		var d,
		e,
		f = a ? this.removeListener : this.addListener,
		g = a ? this.removeListeners : this.addListeners;
		if ("object" != typeof b || b instanceof RegExp)
			for (d = c.length; d--; )
				f.call(this, b, c[d]);
		else
			for (d in b)
				b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
		return this
	},
	d.removeEvent = function (a) {
		var b,
		c = typeof a,
		d = this._getEvents();
		if ("string" === c)
			delete d[a];
		else if ("object" === c)
			for (b in d)
				d.hasOwnProperty(b) && a.test(b) && delete d[b];
		else
			delete this._events;
		return this
	},
	d.emitEvent = function (a, b) {
		var c,
		d,
		e,
		f,
		g = this.getListenersAsObject(a);
		for (e in g)
			if (g.hasOwnProperty(e))
				for (d = g[e].length; d--; )
					c = g[e][d], f = c.listener.apply(this, b || []), (f === this._getOnceReturnValue() || c.once === !0) && this.removeListener(a, c.listener);
		return this
	},
	d.trigger = c("emitEvent"),
	d.emit = function (a) {
		var b = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(a, b)
	},
	d.setOnceReturnValue = function (a) {
		return this._onceReturnValue = a,
		this
	},
	d._getOnceReturnValue = function () {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	},
	d._getEvents = function () {
		return this._events || (this._events = {})
	},
	"function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
		return a
	}) : "object" == typeof module && module.exports ? module.exports = a : this.EventEmitter = a
}
.call(this), function (a) {
	var b = document.documentElement,
	c = function () {};
	b.addEventListener ? c = function (a, b, c) {
		a.addEventListener(b, c, !1)
	}
	 : b.attachEvent && (c = function (b, c, d) {
		b[c + d] = d.handleEvent ? function () {
			var b = a.event;
			b.target = b.target || b.srcElement,
			d.handleEvent.call(d, b)
		}
		 : function () {
			var c = a.event;
			c.target = c.target || c.srcElement,
			d.call(b, c)
		},
		b.attachEvent("on" + c, b[c + d])
	});
	var d = function () {};
	b.removeEventListener ? d = function (a, b, c) {
		a.removeEventListener(b, c, !1)
	}
	 : b.detachEvent && (d = function (a, b, c) {
		a.detachEvent("on" + b, a[b + c]);
		try {
			delete a[b + c]
		} catch (d) {
			a[b + c] = void 0
		}
	});
	var e = {
		bind : c,
		unbind : d
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", e) : a.eventie = e
}
(this), function (a) {
	function b(a) {
		if (a) {
			if ("string" == typeof d[a])
				return a;
			a = a.charAt(0).toUpperCase() + a.slice(1);
			for (var b, e = 0, f = c.length; f > e; e++)
				if (b = c[e] + a, "string" == typeof d[b])
					return b
		}
	}
	var c = "Webkit Moz ms Ms O".split(" "),
	d = document.documentElement.style;
	"function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
		return b
	}) : a.getStyleProperty = b
}
(window), function (a) {
	function b(a) {
		var b = parseFloat(a),
		c = -1 === a.indexOf("%") && !isNaN(b);
		return c && b
	}
	function c() {
		for (var a = {
				width : 0,
				height : 0,
				innerWidth : 0,
				innerHeight : 0,
				outerWidth : 0,
				outerHeight : 0
			}, b = 0, c = g.length; c > b; b++) {
			var d = g[b];
			a[d] = 0
		}
		return a
	}
	function d(a) {
		function d(a) {
			if ("string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
				var d = f(a);
				if ("none" === d.display)
					return c();
				var i = {};
				i.width = a.offsetWidth,
				i.height = a.offsetHeight;
				for (var j = i.isBorderBox = !(!h || !d[h] || "border-box" !== d[h]), k = 0, l = g.length; l > k; k++) {
					var m = g[k],
					n = d[m],
					o = parseFloat(n);
					i[m] = isNaN(o) ? 0 : o
				}
				var p = i.paddingLeft + i.paddingRight,
				q = i.paddingTop + i.paddingBottom,
				r = i.marginLeft + i.marginRight,
				s = i.marginTop + i.marginBottom,
				t = i.borderLeftWidth + i.borderRightWidth,
				u = i.borderTopWidth + i.borderBottomWidth,
				v = j && e,
				w = b(d.width);
				w !== !1 && (i.width = w + (v ? 0 : p + t));
				var x = b(d.height);
				return x !== !1 && (i.height = x + (v ? 0 : q + u)),
				i.innerWidth = i.width - (p + t),
				i.innerHeight = i.height - (q + u),
				i.outerWidth = i.width + r,
				i.outerHeight = i.height + s,
				i
			}
		}
		var e,
		h = a("boxSizing");
		return function () {
			if (h) {
				var a = document.createElement("div");
				a.style.width = "200px",
				a.style.padding = "1px 2px 3px 4px",
				a.style.borderStyle = "solid",
				a.style.borderWidth = "1px 2px 3px 4px",
				a.style[h] = "border-box";
				var c = document.body || document.documentElement;
				c.appendChild(a);
				var d = f(a);
				e = 200 === b(d.width),
				c.removeChild(a)
			}
		}
		(),
		d
	}
	var e = document.defaultView,
	f = e && e.getComputedStyle ? function (a) {
		return e.getComputedStyle(a, null)
	}
	 : function (a) {
		return a.currentStyle
	},
	g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
	"function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], d) : a.getSize = d(a.getStyleProperty)
}
(window), function (a) {
	function b(a, b) {
		for (var c in b)
			a[c] = b[c];
		return a
	}
	function c() {}
	
	function d(d, e, g, j, k) {
		function m(a, c) {
			this.element = "string" == typeof a ? f.querySelector(a) : a,
			this.options = b({}, this.options),
			b(this.options, c),
			this._create()
		}
		function n() {
			return !1
		}
		function o(a, b) {
			a.x = void 0 !== b.pageX ? b.pageX : b.clientX,
			a.y = void 0 !== b.pageY ? b.pageY : b.clientY
		}
		function p(a, b, c) {
			return c = c || "round",
			b ? Math[c](a / b) * b : a
		}
		var q = j("transform"),
		r = !!j("perspective");
		b(m.prototype, e.prototype),
		m.prototype.options = {},
		m.prototype._create = function () {
			this.position = {},
			this._getPosition(),
			this.startPoint = {
				x : 0,
				y : 0
			},
			this.dragPoint = {
				x : 0,
				y : 0
			},
			this.startPosition = b({}, this.position);
			var a = h(this.element);
			"relative" !== a.position && "absolute" !== a.position && (this.element.style.position = "relative"),
			this.enable(),
			this.setHandles()
		},
		m.prototype.setHandles = function () {
			this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element],
			this.bindHandles(!0)
		},
		m.prototype.bindHandles = function (b) {
			var c;
			c = a.navigator.pointerEnabled ? this.bindPointer : a.navigator.msPointerEnabled ? this.bindMSPointer : this.bindMouseTouch,
			b = void 0 === b ? !0 : !!b;
			for (var d = 0, e = this.handles.length; e > d; d++) {
				var f = this.handles[d];
				c.call(this, f, b)
			}
		},
		m.prototype.bindPointer = function (a, b) {
			var c = b ? "bind" : "unbind";
			g[c](a, "pointerdown", this),
			a.style.touchAction = b ? "none" : ""
		},
		m.prototype.bindMSPointer = function (a, b) {
			var c = b ? "bind" : "unbind";
			g[c](a, "MSPointerDown", this),
			a.style.msTouchAction = b ? "none" : ""
		},
		m.prototype.bindMouseTouch = function (a, b) {
			var c = b ? "bind" : "unbind";
			g[c](a, "mousedown", this),
			g[c](a, "touchstart", this),
			b && t(a)
		};
		var s = "attachEvent" in f.documentElement,
		t = s ? function (a) {
			"IMG" === a.nodeName && (a.ondragstart = n);
			for (var b = a.querySelectorAll("img"), c = 0, d = b.length; d > c; c++) {
				var e = b[c];
				e.ondragstart = n
			}
		}
		 : c;
		m.prototype._getPosition = function () {
			var a = h(this.element),
			b = parseInt(a.left, 10),
			c = parseInt(a.top, 10);
			this.position.x = isNaN(b) ? 0 : b,
			this.position.y = isNaN(c) ? 0 : c,
			this._addTransformPosition(a)
		},
		m.prototype._addTransformPosition = function (a) {
			if (q) {
				var b = a[q];
				if (0 === b.indexOf("matrix")) {
					var c = b.split(","),
					d = 0 === b.indexOf("matrix3d") ? 12 : 4,
					e = parseInt(c[d], 10),
					f = parseInt(c[d + 1], 10);
					this.position.x += e,
					this.position.y += f
				}
			}
		},
		m.prototype.handleEvent = function (a) {
			var b = "on" + a.type;
			this[b] && this[b](a)
		},
		m.prototype.getTouch = function (a) {
			for (var b = 0, c = a.length; c > b; b++) {
				var d = a[b];
				if (d.identifier === this.pointerIdentifier)
					return d
			}
		},
		m.prototype.onmousedown = function (a) {
			var b = a.button;
			b && 0 !== b && 1 !== b || !$(a.target).hasClass('jn-pointer') && $(a.target).parents('.jn-pointer').length == 0 && this.dragStart(a, a)
		},
		m.prototype.ontouchstart = function (a) {
			this.isDragging || this.dragStart(a, a.changedTouches[0])
		},
		m.prototype.onMSPointerDown = m.prototype.onpointerdown = function (a) {
			this.isDragging || this.dragStart(a, a)
		};
		var u = {
			mousedown : ["mousemove", "mouseup"],
			touchstart : ["touchmove", "touchend", "touchcancel"],
			pointerdown : ["pointermove", "pointerup", "pointercancel"],
			MSPointerDown : ["MSPointerMove", "MSPointerUp", "MSPointerCancel"]
		};
		m.prototype.dragStart = function (b, c) {
			this.isEnabled && (b.preventDefault ? b.preventDefault() : b.returnValue = !1, this.pointerIdentifier = void 0 !== c.pointerId ? c.pointerId : c.identifier, this._getPosition(), this.measureContainment(), o(this.startPoint, c), this.startPosition.x = this.position.x, this.startPosition.y = this.position.y, this.setLeftTop(), this.dragPoint.x = 0, this.dragPoint.y = 0, this._bindEvents({
					events : u[b.type],
					node : b.preventDefault ? a : f
				}), d.add(this.element, "is-dragging"), this.isDragging = !0, this.emitEvent("dragStart", [this, b, c]), this.animate())
		},
		m.prototype._bindEvents = function (a) {
			for (var b = 0, c = a.events.length; c > b; b++) {
				var d = a.events[b];
				g.bind(a.node, d, this)
			}
			this._boundEvents = a
		},
		m.prototype._unbindEvents = function () {
			var a = this._boundEvents;
			if (a && a.events) {
				for (var b = 0, c = a.events.length; c > b; b++) {
					var d = a.events[b];
					g.unbind(a.node, d, this)
				}
				delete this._boundEvents
			}
		},
		m.prototype.measureContainment = function () {
			var a = this.options.containment;
			if (a) {
				this.size = k(this.element);
				var b = this.element.getBoundingClientRect(),
				c = i(a) ? a : "string" == typeof a ? f.querySelector(a) : this.element.parentNode;
				this.containerSize = k(c);
				var d = c.getBoundingClientRect();
				this.relativeStartPosition = {
					x : b.left - d.left,
					y : b.top - d.top
				}
			}
		},
		m.prototype.onmousemove = function (a) {
			this.dragMove(a, a)
		},
		m.prototype.onMSPointerMove = m.prototype.onpointermove = function (a) {
			a.pointerId === this.pointerIdentifier && this.dragMove(a, a)
		},
		m.prototype.ontouchmove = function (a) {
			var b = this.getTouch(a.changedTouches);
			b && this.dragMove(a, b)
		},
		m.prototype.dragMove = function (a, b) {
			o(this.dragPoint, b);
			var c = this.dragPoint.x - this.startPoint.x,
			d = this.dragPoint.y - this.startPoint.y,
			e = this.options.grid,
			f = e && e[0],
			g = e && e[1];
			c = p(c, f),
			d = p(d, g),
			c = this.containDrag("x", c, f),
			d = this.containDrag("y", d, g),
			c = "y" === this.options.axis ? 0 : c,
			d = "x" === this.options.axis ? 0 : d,
			this.position.x = this.startPosition.x + c,
			this.position.y = this.startPosition.y + d,
			this.dragPoint.x = c,
			this.dragPoint.y = d,
			this.emitEvent("dragMove", [this, a, b])
		},
		m.prototype.containDrag = function (a, b, c) {
			if (!this.options.containment)
				return b;
			var d = "x" === a ? "width" : "height",
			e = this.relativeStartPosition[a],
			f = p(-e, c, "ceil"),
			g = this.containerSize[d] - e - this.size[d];
			return g = p(g, c, "floor"),
			Math.min(g, Math.max(f, b))
		},
		m.prototype.onmouseup = function (a) {
			this.dragEnd(a, a)
		},
		m.prototype.onMSPointerUp = m.prototype.onpointerup = function (a) {
			a.pointerId === this.pointerIdentifier && this.dragEnd(a, a)
		},
		m.prototype.ontouchend = function (a) {
			var b = this.getTouch(a.changedTouches);
			b && this.dragEnd(a, b)
		},
		m.prototype.dragEnd = function (a, b) {
			this.isDragging = !1,
			delete this.pointerIdentifier,
			q && (this.element.style[q] = "", this.setLeftTop()),
			this._unbindEvents(),
			d.remove(this.element, "is-dragging"),
			this.emitEvent("dragEnd", [this, a, b])
		},
		m.prototype.onMSPointerCancel = m.prototype.onpointercancel = function (a) {
			a.pointerId === this.pointerIdentifier && this.dragEnd(a, a)
		},
		m.prototype.ontouchcancel = function (a) {
			var b = this.getTouch(a.changedTouches);
			this.dragEnd(a, b)
		},
		m.prototype.animate = function () {
			if (this.isDragging) {
				this.positionDrag();
				var a = this;
				l(function () {
					a.animate()
				})
			}
		};
		var v = r ? function (a, b) {
			return "translate3d( " + a + "px, " + b + "px, 0)"
		}
		 : function (a, b) {
			return "translate( " + a + "px, " + b + "px)"
		};
		return m.prototype.setLeftTop = function () {
			this.element.style.left = this.position.x + "px",
			this.element.style.top = this.position.y + "px"
		},
		m.prototype.positionDrag = q ? function () {
			this.element.style[q] = v(this.dragPoint.x, this.dragPoint.y)
		}
		 : m.prototype.setLeftTop,
		m.prototype.enable = function () {
			this.isEnabled = !0
		},
		m.prototype.disable = function () {
			this.isEnabled = !1,
			this.isDragging && this.dragEnd()
		},
		m.prototype.destroy = function () {
			this.disable(),
			q && (this.element.style[q] = ""),
			this.element.style.left = "",
			this.element.style.top = "",
			this.element.style.position = "",
			this.bindHandles(!1)
		},
		m
	}
	for (var e, f = a.document, g = f.defaultView, h = g && g.getComputedStyle ? function (a) {
		return g.getComputedStyle(a, null)
	}
		 : function (a) {
		return a.currentStyle
	}, i = "object" == typeof HTMLElement ? function (a) {
		return a instanceof HTMLElement
	}
		 : function (a) {
		return a && "object" == typeof a && 1 === a.nodeType && "string" == typeof a.nodeName
	}, j = 0, k = "webkit moz ms o".split(" "), l = a.requestAnimationFrame, m = a.cancelAnimationFrame, n = 0; n < k.length && (!l || !m); n++)
		e = k[n], l = l || a[e + "RequestAnimationFrame"], m = m || a[e + "CancelAnimationFrame"] || a[e + "CancelRequestAnimationFrame"];
	l && m || (l = function (b) {
		var c = (new Date).getTime(),
		d = Math.max(0, 16 - (c - j)),
		e = a.setTimeout(function () {
				b(c + d)
			}, d);
		return j = c + d,
		e
	}, m = function (b) {
		a.clearTimeout(b)
	}),
	"function" == typeof define && define.amd ? define(["classie/classie", "eventEmitter/EventEmitter", "eventie/eventie", "get-style-property/get-style-property", "get-size/get-size"], d) : "object" == typeof exports ? module.exports = d(require("desandro-classie"), require("wolfy87-eventemitter"), require("eventie"), require("desandro-get-style-property"), require("get-size")) : a.Draggabilly = d(a.classie, a.EventEmitter, a.eventie, a.getStyleProperty, a.getSize)
}
(window);;/****lib/touch.js****/
/*! jquery.finger - v0.1.2 - 2014-10-01
* https://github.com/ngryman/jquery.finger
* Copyright (c) 2014 Nicolas Gryman; Licensed MIT */
(function(e,t){function a(t){t.preventDefault(),e.event.remove(T,"click",a)}function n(e,t){return(p?t.originalEvent.touches[0]:t)["page"+e.toUpperCase()]}function r(t,n,r){var o=e.Event(n,b);e.event.trigger(o,{originalEvent:t},t.target),o.isDefaultPrevented()&&(~n.indexOf("tap")&&!p?e.event.add(T,"click",a):t.preventDefault()),r&&(e.event.remove(T,y+"."+D,i),e.event.remove(T,x+"."+D,d))}function o(t){var o=t.timeStamp||+new Date;v!=o&&(v=o,k.x=b.x=n("x",t),k.y=b.y=n("y",t),k.time=o,k.target=t.target,b.orientation=null,b.end=!1,u=!1,l=!1,c=setTimeout(function(){l=!0,r(t,"press")},e.Finger.pressDuration),e.event.add(T,y+"."+D,i),e.event.add(T,x+"."+D,d),w.preventDefault&&(t.preventDefault(),e.event.add(T,"click",a)))}function i(t){if(b.x=n("x",t),b.y=n("y",t),b.dx=b.x-k.x,b.dy=b.y-k.y,b.adx=Math.abs(b.dx),b.ady=Math.abs(b.dy),u=b.adx>w.motionThreshold||b.ady>w.motionThreshold){for(clearTimeout(c),b.orientation||(b.adx>b.ady?(b.orientation="horizontal",b.direction=b.dx>0?1:-1):(b.orientation="vertical",b.direction=b.dy>0?1:-1));t.target&&t.target!==k.target;)t.target=t.target.parentNode;return t.target!==k.target?(t.target=k.target,d.call(this,e.Event(x+"."+D,t)),void 0):(r(t,"drag"),void 0)}}function d(e){var t,a=e.timeStamp||+new Date,n=a-k.time;if(clearTimeout(c),u||l||e.target!==k.target)e.target=k.target,w.flickDuration>n&&r(e,"flick"),b.end=!0,t="drag";else{var o=g===e.target&&w.doubleTapInterval>a-s;t=o?"doubletap":"tap",g=o?null:k.target,s=a}r(e,t,!0)}var u,l,v,c,g,s,m=/chrome/i.exec(t),f=/android/i.exec(t),p="ontouchstart"in window&&!(m&&!f),h=p?"touchstart":"mousedown",x=p?"touchend touchcancel":"mouseup mouseleave",y=p?"touchmove":"mousemove",D="finger",T=e("html")[0],k={},b={},w=e.Finger={pressDuration:300,doubleTapInterval:300,flickDuration:150,motionThreshold:5};e.event.add(T,h+"."+D,o)})(jQuery,navigator.userAgent);;/****lib/nodoubletapzoom.js****/
(function($){
	var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
	$.fn.nodoubletapzoom = function(){
		if(IS_IOS)
			$(this).bind('touchstart', function preventZoom(e){
				var t2 = e.timeStamp,
				t1 = $(this).data('lastTouch') || t2,
				dt = t2 - t1,
				fingers = e.originalEvent.touches.length;
				$(this).data('lastTouch', t2);
				if(!dt || dt > 500 || fingers > 1) return;
				e.preventDefault();
				$(this).trigger('click').trigger('click');
			});
	};
})(jQuery);;/****lib/hotkeys.js****/
/*jslint browser: true*/
/*jslint jquery: true*/

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * https://github.com/tzuryby/jquery.hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */

/*
 * One small change is: now keys are passed by object { keys: '...' }
 * Might be useful, when you want to pass some other data to your handler
 */

(function(jQuery) {

  jQuery.hotkeys = {
    version: "0.8",

    specialKeys: {
      8: "backspace",
      9: "tab",
      10: "return",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      59: ";",
      61: "=",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    },

    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": "\"",
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    },

    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: [
      "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
      "datetime-local", "search", "color", "tel"],

    // default input types not to bind to unless bound directly
    textInputTypes: /textarea|input|select/i,

    options: {
      filterInputAcceptingElements: true,
      filterTextInputs: true,
      filterContentEditable: true
    }
  };

  function keyHandler(handleObj) {
    if (typeof handleObj.data === "string") {
      handleObj.data = {
        keys: handleObj.data
      };
    }

    // Only care when a possible input has been specified
    if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
      return;
    }

    var origHandler = handleObj.handler,
      keys = handleObj.data.keys.toLowerCase().split(" ");

    handleObj.handler = function(event) {
      //      Don't fire in text-accepting inputs that we didn't directly bind to
      if (this !== event.target &&
        (jQuery.hotkeys.options.filterInputAcceptingElements &&
          jQuery.hotkeys.textInputTypes.test(event.target.nodeName) ||
          (jQuery.hotkeys.options.filterContentEditable && jQuery(event.target).attr('contenteditable')) ||
          (jQuery.hotkeys.options.filterTextInputs &&
            jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) {
        return;
      }

      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
        character = String.fromCharCode(event.which).toLowerCase(),
        modif = "",
        possible = {};

      jQuery.each(["alt", "ctrl", "shift"], function(index, specialKey) {

        if (event[specialKey + 'Key'] && special !== specialKey) {
          modif += specialKey + '+';
        }
      });

      // metaKey is triggered off ctrlKey erronously
      if (event.metaKey && !event.ctrlKey && special !== "meta") {
        modif += "meta+";
      }

      if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
        modif = modif.replace("alt+ctrl+shift+", "hyper+");
      }

      if (special) {
        possible[modif + special] = true;
      }
      else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;

        // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
        if (modif === "shift+") {
          possible[jQuery.hotkeys.shiftNums[character]] = true;
        }
      }

      for (var i = 0, l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments);
        }
      }
    };
  }

  jQuery.each(["keydown", "keyup", "keypress"], function() {
    jQuery.event.special[this] = {
      add: keyHandler
    };
  });

})(jQuery || this.jQuery || window.jQuery);
