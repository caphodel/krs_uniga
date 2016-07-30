/****js/core.js****/
/**
 * @namespace jui2
 * @global
 */
var jui2 = jui2 || {
	ui: {},
	lang: {}
};

(function($) {

	Array.prototype._reduce = function(callback /*, initialValue*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }

    if (typeof callback !== 'function') {
			return;
      //throw new TypeError(typeof callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };

	jui2.path = './dist/';
	jui2.ctrlPressed = false;

	jui2.loadExtension = function(){
		$.getJSON(jui2.path+'extension/').done(function(data){
			for(i in data){
				data[i] = jui2.path+'extension/'+data[i]+'/'+data[i]+'.js'
			}
			head.load(data)
		})
	}

	jui2.lang = jui2.lang || {};
	/**
	 * @namespace ui
	 * @memberof jui2
	 */
	jui2.ui = jui2.ui || {};
	/**
	 * Create random string
	 * @memberof jui2
	 * @param  {Number} length String length
	 * @param  {String} chars  String output format combination, Combination: 'a' for lowercase alphabet, 'A' for uppercase alphabet, '#' for numeric and '!' for non alphanumeric
	 * @return {String}        Random string
	 * @example
	 * var randomString = jui2.random(8, 'aA#'); //will return random string containing uppercase, lowercase and numeric string
	 */
	jui2.random = function (length, chars) {
		var result = '', mask = '', text, i;

		text = {
			'a': 'abcdefghijklmnopqrstuvwxyz',
			'A': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'#': '0123456789',
			'!': '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
		};

		for (i = chars.length; i--;)
			mask+=text[chars[i]]

		for (i = length; i > 0; --i)
			result += mask[Math.round(Math.random() * (mask.length - 1))];
		return result;
	};
	/**
	 * return highest z-index
	 * @memberof jui2
	 * @return {number} Highest z-index
	 */
	jui2.findHighestZIndex = function(){
		return Math.max.apply(null,$.map($('body > *'), function(e,n){
		   if($(e).css('position')=='absolute')
				return parseInt($(e).css('z-index'))||1 ;
		   })
		);
	}
	/**
	 * Clear null value from JSON object and change it to empty string
	 * @memberof jui2
	 * @param  {object} json JSON object
	 * @return {object}      JSON object
	 */
	jui2.clearNullFromJson = function(json){
		jui2.iterateJson(json, function(json){
			if(typeof json == 'object')
				for (var data in json) {
					if(!json[data])
						if(json[data]!=0)
							json[data] = ''
				}
		})
	};
	/**
	 * Iterating a json object
	 * @memberof jui2
	 * @param  {object}   json JSON object
	 * @param  {Function} fn   function to execute in every JSON object items
	 * @example
	 * jui2.iterateJson({
	 * 	a: 1,
	 *  b: 2
	 * }, function(obj){
	 * 	console.log(obj)
	 * }) // will print 1 then 2
	 */
	jui2.iterateJson = function(json, fn){
		for (var data in json) {
			fn(json[data])
			typeof json[data] == 'object' &&
				jui2.iterateJson(json[data], fn)
		}
	};
	/**
	 * Confirm dialog
	 * @memberof jui2
	 * @param  {string}   label Text/label for confirm
	 * @param  {Function} yes   function to execute when yes button clicked
	 * @param  {Function} no   function to execute when no button clicked
	 */
	jui2.confirm = function(label, yes, no){
		$('body').append(jui2.tmpl['confirm']({label: label}))
		$('.j-confirm j-button').eq(0).click(function(){
			yes.call(this)
			$('.j-confirm').remove()
		})
		$('.j-confirm j-button').eq(1).click(function(){
			no.call(this)
			$('.j-confirm').remove()
		})
	}

	/*old code*/
	$.fn.jui2Serialize = function(){
		value = {};
		this.find('[role=textField],[role=timeField],[role=uploadField],[role=textArea],[role=dateField],[role=comboField],[role=datePicker],[role=passwordField],[role=radioField]').each(function(){
			var el = $(this)
			var role = el.attr('role'), id = el.attr('name')||el.attr('id'), text = '';

			if (role=='textArea')
				text = $(el.find('iframe')[0].contentWindow.document.body).html().trim()

			value[id] =
				role=='textArea' && (text != '<br>' && jui2.escapeHtmlEntities(text.replace('&#x2010;', '-').replace('&#x2013;', '-').replace('&#x9;', '').replace(/&nbsp;/g,' ').replace(/\s\s+/g, ' ').replace(/(^<br>|<br>$)/g,'')) != '' && jui2.escapeHtmlEntities(jui2.cleanWordPaste(text).replace('&#x2010;', '-').replace('&#x2013;', '-').replace('&#x9;', '').replace(/&nbsp;/g,' ').replace(/\s\s+/g, ' ').replace(/(^<br>|<br>$)/g,'')))
				|| role=='comboField' &&
					el.find('input[type=hidden]').val()
				|| role=='radioField' &&
					el.find('input:checked').val()
				|| role=='timeField' &&
					el.find('input').eq(0).val()+':'+el.find('input').eq(1).val()
				|| el.find('input').val()

			if(role=='textArea' && value[id]=='<br>')
				value[id] = ''

			if(role=='textArea'){
				if(value[id])
					value[id] = jui2.escapeHtmlEntities((he.encode(value[id], {
						'allowUnsafeSymbols': false
					})).replace('&#x2010;', '-').replace('&#x2013;', '-').replace('&#x9;', '').replace(/&nbsp;/g,' ')
					.replace(/\s\s+/g, ' '));
			}

		});
		var i = 0
		this.find('j-datefield, j-combofield').each(function(i, val){
			var el = $(val), id = el.attr('name')||el.attr('id')
			value[id] = el.val();
		})

		value = $.extend(value, $(this).getValues())
		return value;
	};

	/**
	 * Count the size of overlapped area
	 * @param  {jQuery} selector jQuery selector, object or HTMLElement
	 * @return {object}          JSON object containing width and height of overlapped area
	 */
	$.fn.overlappedSize = function(selector){
		var el = $(selector),
		offset1 = this.offset(),
		offset2 = el.offset(),
		w1 = this.outerWidth(),
		w2 = el.outerWidth(),
		h1 = this.outerHeight(),
		h2 = el.outerHeight(),
		width = Math.max(Math.min(offset1.left+w1, offset2.left+w2) - Math.max(offset1.left, offset2.left), 0),
		height = Math.max(Math.min(offset1.top+h1, offset2.top+h2) - Math.max(offset1.top, offset2.top), 0)

		return {
			width: width,
			height: height
		}
	}

	/**
	 * Calculate distance between 2 points
	 * @param  {object} point1 x and y of point ex. {x: 10, y: 10}
	 * @param  {object} point2 x and y of point ex. {x: 10, y: 10}
	 * @return {number}        distance
	 */
	$.calcDistance = function(point1, point2){
		var xs = 0, ys = 0;

		xs = point2.x - point1.x;
		xs = xs * xs;

		ys = point2.y - point1.y;
		ys = ys * ys;

		return Math.sqrt( xs + ys );
	}

	$.fn.centerPoint = function(){
		var xy1 = this.offset()

		return {
			x: xy1.left + this.outerWidth()/2,
			y: xy1.top + this.outerHeight()/2
		}
	}

	/**
	 * Get nearest distance of 2 elements
	 * @param  {jQuery} selector jQuery selector, object or HTMLElement
	 * @return {integer}          Distance of nearest distance in pixel
	 */
	$.fn.nearestDistance = function(selector){
		var thisOuterWidth = this.outerWidth(), thisOuterHeight = this.outerHeight(), offset1 = this.offset(), topLeft1 = {x: offset1.left, y: offset1.top},
		bottomLeft1 = {x: offset1.left, y: offset1.top+thisOuterHeight},
		topRight1 = {x: offset1.left+thisOuterWidth, y: offset1.top},
		bottomRight1 = {x: offset1.left+thisOuterWidth, y: offset1.top+thisOuterHeight},
		bottom1 = offset1.top+thisOuterHeight,
		right1 = offset1.left+thisOuterWidth
		el = $(selector), elOuterHeight = el.outerHeight(), elOuterWidth = el.outerWidth()
		offset2 = el.offset(), topLeft2 = {x: offset2.left, y: offset2.top},
		bottomLeft2 = {x: offset2.left, y: offset2.top+elOuterHeight},
		topRight2 = {x: offset2.left+elOuterWidth, y: offset2.top},
		bottomRight2 = {x: offset2.left+elOuterWidth, y: offset2.top+elOuterHeight},
		bottom2 = offset2.top+elOuterHeight,
		right2 = offset2.left+elOuterWidth, distance = []

		if(right1 > offset2.left && !(offset1.left > right2)){
			if(bottom1 < offset2.top)
				distance.push(offset2.top - bottom1)
			if(bottom2 < offset1.top)
				distance.push(offset1.top - bottom2)
		}

		if(bottom1 > offset2.top && !(offset1.top > bottom2)){
			if(right1 < offset2.left)
				distance.push(offset2.left - right1)
			if(right2 < offset1.left)
				distance.push(offset1.left - right2)
		}

		if(bottom1 < offset2.top){
			/*distance.push($.calcDistance(bottomRight1, topLeft2))
			distance.push($.calcDistance(bottomRight1, topRight2))
			distance.push($.calcDistance(bottomLeft1, topLeft2))
			distance.push($.calcDistance(bottomLeft1, topRight2))*/
			distance.push(
				$.calcDistance(bottomRight1, topLeft2),
				$.calcDistance(bottomRight1, topRight2),
				$.calcDistance(bottomLeft1, topLeft2),
				$.calcDistance(bottomLeft1, topRight2)
			)
		}
		else if(bottom2 < offset1.top){
			distance.push(
				$.calcDistance(bottomRight2, topLeft1),
				$.calcDistance(bottomRight2, topRight1),
				$.calcDistance(bottomLeft2, topLeft1),
				$.calcDistance(bottomLeft2, topRight1)
			)
		}

		if(right1 < offset2.left){
			distance.push(
				$.calcDistance(bottomRight1, topLeft2),
				$.calcDistance(bottomRight1, bottomLeft2),
				$.calcDistance(topRight1, topLeft2),
				$.calcDistance(topRight1, bottomLeft2)
			)
		}
		else if(right2 < offset1.left){
			distance.push(
				$.calcDistance(bottomRight2, topLeft1),
				$.calcDistance(bottomRight2, bottomLeft1),
				$.calcDistance(topRight2, topLeft1),
				$.calcDistance(topRight2, bottomLeft1)
			)
		}

		//TODO: 0 Could be optimized.
		return Math.min.apply(null, distance);
	}

	$.fn.nearest = function(selector){
		var isOverlap = false, self = this, data = $(), value = false, tmp, el1, el2, offset1, offset2, targetOffset = this.offset(), width = this.outerWidth(), height = this.outerHeight();
		$(selector || '*:visible').not(this.get(0)).each(function(i, el){

			if(!isOverlap){
				if(self.isOverlap(el)){
					tmp = self.overlappedSize(el)
					tmp = tmp.width*tmp.height
					data = $(el)
					value = tmp
					data.add(el)
					isOverlap = true
				}
				else{
			if(!value){
				value = self.nearestDistance(el);
				data = $(el)
			}
			else{
	            if(self.nearestDistance(el) < value){
					data = $(el)
					value = self.nearestDistance(el)
	            }
	            else if(value == self.nearestDistance(el)){
					el1 = data.last(), el2 = $(el), dist2 = $.calcDistance(self.centerPoint(),el2.centerPoint()), dist1 = $.calcDistance(self.centerPoint(),el1.centerPoint())

					if(dist2 < dist1)
						data = el2
					else if(dist1 == dist2)
						data = data.add(el)
	            }
	    	}
				}
			}
			else{
		        tmp = self.overlappedSize(el)
		        tmp = tmp.width*tmp.height
				if(value < tmp){
					data = $(el)
					value = tmp
				}
				else if(value == tmp){
					el1 = data.last(), el2 = $(el), dist2 = $.calcDistance(self.centerPoint(),el2.centerPoint()), dist1 = $.calcDistance(self.centerPoint(),el1.centerPoint())

					if(dist2 < dist1)
						data = el2
					else if(dist1 == dist2)
						data = data.add(el)
				}
			}
		})

		return data;
	}

	/**
	 * Check if element is in viewport
	 * @return {boolean} true if element in viewport
	 */
	$.fn.inViewport = function() {
    var rect = this.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
	};

	/**
	 * Get HTML string of element
	 * @return {String}   Outer HTML string of an element
	 */
	$.fn.outerHTML = function(s) {
		return s
	    ? this.before(s).remove()
	    : jQuery("<p>").append(this.eq(0).clone()).html();
	};

	/**
	 * Check if element touched the top of the window
	 * @return {boolean} true if element touched the top of the window
	 * @author Deddy Lasmono Putro
	 */
	$.fn.touchTop = function(){
		//var el = $(this);
		return $(this).offset().top<0
	};

	/**
	 * Check if element touched the bottom of the window
	 * @return {boolean} true if element touched the bottom of the window
	 * @author Deddy Lasmono Putro
	 */
	$.fn.touchBottom = function(){
		var wd = $(window);
		return (this.offset().top + this.height()) >= (wd.height()+wd.scrollTop())
	};

	/**
	 * Get values from jui2 widget inside selected element
	 * @return {object} Collection of jui2 widget values
	 * @author Deddy Lasmono Putro
	 */
	$.fn.getValues = function(){
		var values = {}
		this.find('j-textfield, j-textarea, j-wysiwyg, j-passwordfield, j-combofield, j-datefield, j-numberfield, j-editor, j-timefield').filter(function(){
			var el = $(this);
	    return (el.attr('name')||el.attr('id')) !== undefined
	  }).each(function(i, val){
	    var el = $(val), id = el.attr('name')||el.attr('id')
			values[id] = el.val()
		})
		return values;
	};

	/**
	 * Get RGB value from hex color
	 * @param  {string} color Hex color
	 * @return {object}       Object containing RGB value
	 * @author Deddy Lasmono Putro
	 */
	$.getRGB = function(color) {
		var r, g, b, rgb;
		if(color.match(/rgb/gi)){
			rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			r = rgb[1];
			g = rgb[2];
			b = rgb[3];

		  return {
				R: r,
				G: g,
				B: b
		  };
		}
		else{
			r = color.substring(1, 3);
			g = color.substring(3, 5);
			b = color.substring(5, 7);

		  return {
				R: parseInt(r, 16),
				G: parseInt(g, 16),
				B: parseInt(b, 16)
		  };
		}
	};

	/**
	 * Get ideal color (black or white) for defined background color
	 * @param  {string} bgColor Hex color
	 * @return {string} color Hex color (black/white)
	 * @author Deddy Lasmono Putro
	 */
	$.idealTextColor = function(bgColor) {

		var nThreshold = 105,
		components = $.getRGB(bgColor),
		bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

		return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
	};

	/**
	 * Get only text(remove children) from element
	 * @return {string} Element's text
	 * @author Deddy Lasmono Putro
	 */
	$.fn.justtext = function() {
		var c = this.clone(), text = c.children()
		.remove()
		.end()
		.text();
		c.remove();
		return text;
	};

	/**
	 * Center an element
	 * @return {jQuery} jQuery object
	 * @author Deddy Lasmono Putro
	 */
	$.fn.center = function () {
		var wd = $(window), wdHeight = wd.height() , wdWidth = wd.width(), outerHeight = this.outerHeight(false), outerWidth = this.outerWidth(false);
		this.css("position","absolute");
		if(this.parent().css('position')=='fixed'){
			this.css("top", Math.max(0, ((wdHeight - outerHeight) / 2)) + "px");
			this.css("left", Math.max(0, ((wdWidth - outerWidth) / 2)) + "px");
		}
		else{
			this.css("top", Math.max(0, ((wdHeight - outerHeight) / 2) + wd.scrollTop()) + "px");
			this.css("left", Math.max(0, ((wdWidth - outerWidth) / 2) + wd.scrollLeft()) + "px");
		}
		return this;
	};

	/**
	 * Check if element overlapping other element
	 * @param  {jQuery} selector Jquery selector, object or eleemnt
	 * @return {boolean}          true if overlapping
	 * @author Deddy Lasmono Putro
	 */
	$.fn.isOverlap = function(selector){
		var rect1, rect2 = selector instanceof jQuery ? selector[0].getBoundingClientRect() : (selector instanceof HTMLCollection ? selector.getBoundingClientRect() : $(selector)[0].getBoundingClientRect())
		if(!this.is(':visible')){
			this.css('opacity', 0).show();
			rect1 = this[0].getBoundingClientRect()
			this.hide().css('opacity', '');
		}
		else
			rect1 = this[0].getBoundingClientRect()
		return !(rect1.right < rect2.left ||
	    rect1.left > rect2.right ||
	    rect1.bottom < rect2.top ||
	    rect1.top > rect2.bottom)
	};

	/**
	 * Check if element inside another element
	 * @param  {jQuery} selector jQuery object, selector or HTMLElement
	 * @return {boolean}          true if element inside another element
	 * @author Deddy Lasmono Putro
	 */
	$.fn.isInside = function(selector){
		var rect1 = this[0].getBoundingClientRect(), rect2 = selector instanceof jQuery ? selector[0].getBoundingClientRect() : (selector instanceof HTMLCollection ? selector.getBoundingClientRect() : $(selector)[0].getBoundingClientRect())
		return (rect2.right > rect1.right &&
	    rect2.left < rect1.left ||
	    rect2.bottom > rect1.bottom ||
	    rect2.top < rect1.top)
	};

	/**
	 * Get elements that touching selected element
	 * @param  {jQuey} selector jQuery selector, object or HTMLElement
	 * @return {jQuery}          jQuery object that contains all element that touching selected element
	 */
	$.fn.touching = function(selector){
	  var el = this;
	  return $(selector || '*:visible').filter(function(){
	    return el.isOverlap(this)
	  })
	}

	/**
	 * Check if element has scrollbar or not
	 * @return {boolean} Return true if element has scrollbar
	 * @author Deddy Lasmono Putro
	 */
    $.fn.hasScrollBar = function() {
      return this.get(0).scrollHeight > this.outerHeight();
    };

	$.fn.checkField = function(){
		var pass = [];
		$.each(this, function(i, val){
			if($(val).val()=='' || $(val).val()==undefined){
				pass.push($(val));
			}
		})
		return pass.length != 0 ? pass : true;
	}

})(jQuery);

/*!
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
//
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
//
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
//
// About: Release History
//
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function ($, window, undefined) {
	'$:nomunge'; // Used by YUI compressor.

	// A jQuery object containing all non-window elements to which the resize
	// event is bound.
	var elems = $([]),

	// Extend $.resize if it already exists, otherwise create it.
	jq_resize = $.resize = $.extend($.resize, {}),

	timeout_id,

	// Reused strings.
	str_setTimeout = 'setTimeout',
	str_resize = 'resize',
	str_data = str_resize + '-special-event',
	str_delay = 'delay',
	str_throttle = 'throttleWindow';

	// Property: jQuery.resize.delay
	//
	// The numeric interval (in milliseconds) at which the resize event polling
	// loop executes. Defaults to 250.

	jq_resize[str_delay] = 250;

	// Property: jQuery.resize.throttleWindow
	//
	// Throttle the native window object resize event to fire no more than once
	// every <jQuery.resize.delay> milliseconds. Defaults to true.
	//
	// Because the window object has its own resize event, it doesn't need to be
	// provided by this plugin, and its execution can be left entirely up to the
	// browser. However, since certain browsers fire the resize event continuously
	// while others do not, enabling this will throttle the window resize event,
	// making event behavior consistent across all elements in all browsers.
	//
	// While setting this property to false will disable window object resize
	// event throttling, please note that this property must be changed before any
	// window object resize event callbacks are bound.

	jq_resize[str_throttle] = true;

	// Event: resize event
	//
	// Fired when an element's width or height changes. Because browsers only
	// provide this event for the window element, for other elements a polling
	// loop is initialized, running every <jQuery.resize.delay> milliseconds
	// to see if elements' dimensions have changed. You may bind with either
	// .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
	//
	// Usage:
	//
	// > jQuery('selector').bind( 'resize', function(e) {
	// >   // element's width or height has changed!
	// >   ...
	// > });
	//
	// Additional Notes:
	//
	// * The polling loop is not created until at least one callback is actually
	//   bound to the 'resize' event, and this single polling loop is shared
	//   across all elements.
	//
	// Double firing issue in jQuery 1.3.2:
	//
	// While this plugin works in jQuery 1.3.2, if an element's event callbacks
	// are manually triggered via .trigger( 'resize' ) or .resize() those
	// callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
	// events system. This is not an issue when using jQuery 1.4+.
	//
	// > // While this works in jQuery 1.4+
	// > $(elem).css({ width: new_w, height: new_h }).resize();
	// >
	// > // In jQuery 1.3.2, you need to do this:
	// > var elem = $(elem);
	// > elem.css({ width: new_w, height: new_h });
	// > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
	// > elem.resize();

	$.event.special[str_resize] = {

		// Called only when the first 'resize' event callback is bound per element.
		setup : function () {
			// Since window has its own native 'resize' event, return false so that
			// jQuery will bind the event using DOM methods. Since only 'window'
			// objects have a .setTimeout method, this should be a sufficient test.
			// Unless, of course, we're throttling the 'resize' event for window.
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}

			var elem = $(this);

			// Add this element to the list of internal elements to monitor.
			elems = elems.add(elem);

			// Initialize data store on the element.
			$.data(this, str_data, {
				w : elem.width(),
				h : elem.height()
			});

			// If this is the first element added, start the polling loop.
			if (elems.length === 1) {
				loopy();
			}
		},

		// Called only when the last 'resize' event callback is unbound per element.
		teardown : function () {
			// Since window has its own native 'resize' event, return false so that
			// jQuery will unbind the event using DOM methods. Since only 'window'
			// objects have a .setTimeout method, this should be a sufficient test.
			// Unless, of course, we're throttling the 'resize' event for window.
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}

			var elem = $(this);

			// Remove this element from the list of internal elements to monitor.
			elems = elems.not(elem);

			// Remove any data stored on the element.
			elem.removeData(str_data);

			// If this is the last element removed, stop the polling loop.
			if (!elems.length) {
				clearTimeout(timeout_id);
			}
		},

		// Called every time a 'resize' event callback is bound per element (new in
		// jQuery 1.4).
		add : function (handleObj) {
			// Since window has its own native 'resize' event, return false so that
			// jQuery doesn't modify the event object. Unless, of course, we're
			// throttling the 'resize' event for window.
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}

			var old_handler;

			// The new_handler function is executed every time the event is triggered.
			// This is used to update the internal element data store with the width
			// and height when the event is triggered manually, to avoid double-firing
			// of the event callback. See the "Double firing issue in jQuery 1.3.2"
			// comments above for more information.

			function new_handler(e, w, h) {
				var elem = $(this),
				data = $.data(this, str_data);

				// If called from the polling loop, w and h will be passed in as
				// arguments. If called manually, via .trigger( 'resize' ) or .resize(),
				// those values will need to be computed.
				data.w = w !== undefined ? w : elem.width();
				data.h = h !== undefined ? h : elem.height();

				old_handler.apply(this, arguments);
			};

			// This may seem a little complicated, but it normalizes the special event
			// .add method between jQuery 1.4/1.4.1 and 1.4.2+
			if ($.isFunction(handleObj)) {
				// 1.4, 1.4.1
				old_handler = handleObj;
				return new_handler;
			} else {
				// 1.4.2+
				old_handler = handleObj.handler;
				handleObj.handler = new_handler;
			}
		}

	};

	function loopy() {

		// Start the polling loop, asynchronously.
		timeout_id = window[str_setTimeout](function () {

				// Iterate over all elements to which the 'resize' event is bound.
				elems.each(function () {
					var elem = $(this),
					width = elem.width(),
					height = elem.height(),
					data = $.data(this, str_data);

					// If element size has changed since the last time, update the element
					// data store and trigger the 'resize' event.
					if (width !== data.w || height !== data.h) {
						elem.trigger(str_resize, [data.w = width, data.h = height]);
					}

				});

				// Loop.
				loopy();

			}, jq_resize[str_delay]);

	};

})(jQuery, this);
;/****lang/day.js****/
(function($){

	jui2.lang.day = {
		en: {
			sun: {
				short: 'Sun',
				long: 'Sunday'
			},
			mon: {
				short: 'Mon',
				long: 'Monday'
			},
			tue: {
				short: 'Tue',
				long: 'Tuesday'
			},
			wed: {
				short: 'Wed',
				long: 'Wednesday'
			},
			thu: {
				short: 'Thu',
				long: 'Thursday'
			},
			fri: {
				short: 'Fri',
				long: 'Friday'
			},
			sat: {
				short: 'Sat',
				long: 'Saturday'
			}
		}
	}

}(jQuery));/****lang/month.js****/
(function($){

	jui2.lang.month = {
		en: {
			jan: {
				short: 'Jan',
				long: 'January'
			},
			feb: {
				short: 'Feb',
				long: 'February'
			},
			mar: {
				short: 'Mar',
				long: 'March'
			},
			apr: {
				short: 'Apr',
				long: 'April'
			},
			may: {
				short: 'May',
				long: 'May'
			},
			jun: {
				short: 'Jun',
				long: 'June'
			},
			jul: {
				short: 'Jul',
				long: 'July'
			},
			aug: {
				short: 'Aug',
				long: 'August'
			},
			sep: {
				short: 'Sep',
				long: 'September'
			},
			oct: {
				short: 'Oct',
				long: 'October'
			},
			nov: {
				short: 'Nov',
				long: 'November'
			},
			dec: {
				short: 'Dec',
				long: 'December'
			},
		}
	}

}(jQuery));
;/****js/drag.js****/
(function($) {
  jui2.drag = {
    mouseDown: false,
    draggedEl: false,
    handler: false,
    clientX: 0,
    clientY: 0,
    horizontalDrag: true,
    verticalDrag: true,
    parent: false,
    mouseMove: false
  };
  $( document ).ready(function() {
    $('body').on('mousedown', function(e){
      jui2.drag.mouseDown = true;
      jui2.drag.horizontalDrag = true;
      jui2.drag.verticalDrag = true;
      jui2.drag.mouseMove = false;
      jui2.drag.parent = false;
      if($(e.target).attr('drag')){
        jui2.drag.draggedEl = $(e.target);
      }
      else{
        var parents = $(e.target).parents('[drag]');
        if(parents.length > 0)
          jui2.drag.draggedEl = parents.eq(0);
      }

      var $draggedEl = jui2.drag.draggedEl;

      if(jui2.drag.draggedEl){
        if($draggedEl.parent().css('position')=='relative'){
          jui2.drag.parent = true;
        }
        if($draggedEl.attr('horizontalDrag')=='false'){
          jui2.drag.horizontalDrag = false;
        }
        if($draggedEl.attr('verticalDrag')=='false'){
          jui2.drag.verticalDrag = false;
        }

        if($draggedEl.attr('drag').toLowerCase()=='true'){
          jui2.drag.handler = $draggedEl.add($draggedEl.find('*'));
        }
        else{
          var handler = $draggedEl.find($draggedEl.attr('drag'));
          if(handler.length > 0)
            jui2.drag.handler = handler;
        }
      }
      if(jui2.drag.handler){
        jui2.drag.clientX = e.pageX - $draggedEl.offset().left;
    		jui2.drag.clientY = e.pageY - $draggedEl.offset().top;
        if(jui2.drag.handler && (jui2.drag.handler[0] == e.target || $.inArray(e.target, jui2.drag.handler) > -1)){
          var parentScroll = $draggedEl.parents().filter(function(){
              return $(this).hasScrollBar();
          });

          if(parentScroll.length === 0 || parentScroll.prop('tagName')=='HTML'){
            parentScroll = $(window);
          }
          //jui2.drag.handler.css('cursor', 'pointer');
          $draggedEl.css({
            '-webkit-touch-callout': 'none',
            '-webkit-user-select': 'none',
            '-khtml-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
          });
          if(jui2.drag.parent)
            $(e.target).parent().append('<j-drag></j-drag>');
          else
            $('body').append('<j-drag></j-drag>');
          var dragMask = $('j-drag'), mouseX = e.clientX + parentScroll.scrollLeft(),
  		      mouseY = e.clientY + parentScroll.scrollTop();

          dragMask.css({
            width: $draggedEl.outerWidth(false),
            height: $draggedEl.outerHeight(false),
            'z-index': jui2.findHighestZIndex()
          }).offset({top: mouseY-jui2.drag.clientY, left: mouseX-jui2.drag.clientX});
          $draggedEl.triggerHandler('dragstart', [{x: $draggedEl.offset().left, y: $draggedEl.offset().top}]);
        }
      }
    }).on('mouseup', function(e){
      if(jui2.drag.handler && jui2.drag.mouseDown && $('j-drag').length > 0 && jui2.drag.mouseMove){
        var $draggedEl = jui2.drag.draggedEl, parentScroll = $draggedEl.parents().filter(function(){
            return $(this).hasScrollBar();
        }), dragMask = $('j-drag');

        if(parentScroll.length === 0 || parentScroll.prop('tagName')=='HTML'){
          parentScroll = $(window);
        }
        var mouseX = e.clientX + parentScroll.scrollLeft(),
    		mouseY = e.clientY + parentScroll.scrollTop(),
        dMaskOffset = dragMask.offset();

        if(!jui2.drag.verticalDrag){
          $draggedEl.offset({top: dMaskOffset.top, left: mouseX-jui2.drag.clientX});
          $draggedEl.triggerHandler('dragend', [{x: dMaskOffset.left, y: dMaskOffset.top}]);
        }
        else if(!jui2.drag.horizontalDrag){
          $draggedEl.offset({top: mouseY-jui2.drag.clientY, left: dMaskOffset.left});
          $draggedEl.triggerHandler('dragend', [{x: dMaskOffset.left, y: mouseY-jui2.drag.clientY}]);
        }
        else{
          $draggedEl.offset({top: mouseY-jui2.drag.clientY, left: mouseX-jui2.drag.clientX});
          $draggedEl.triggerHandler('dragend', [{x: mouseX-jui2.drag.clientX, y: mouseY-jui2.drag.clientY}]);
        }
        //jui2.drag.draggedEl.triggerHandler('dragend', [{x: mouseX-jui2.drag.clientX, y: mouseY-jui2.drag.clientY}]);
        //jui2.drag.draggedEl.offset({top: mouseY-jui2.drag.clientY, left: mouseX-jui2.drag.clientX})
        $draggedEl.css({
          '-webkit-touch-callout': '',
          '-webkit-user-select': '',
          '-khtml-user-select': '',
          '-moz-user-select': '',
          '-ms-user-select': '',
          'user-select': ''
        });
      }
      jui2.drag.mouseDown = false;
      jui2.drag.draggedEl = false;
      jui2.drag.handler = false;
      $('j-drag').remove();
    }).on('mousemove', function(e){
      if(jui2.drag.handler && jui2.drag.mouseDown){
        var $draggedEl = jui2.drag.draggedEl;
        jui2.drag.mouseMove = true;
        var parentScroll = $draggedEl.parents().filter(function(){
            return $(this).hasScrollBar();
        });

        if(parentScroll.length === 0 || parentScroll.prop('tagName')=='HTML'){
          parentScroll = $(window);
        }
        var mouseX = e.clientX + parentScroll.scrollLeft(),
    		mouseY = e.clientY + parentScroll.scrollTop(),
        dragMask = $('j-drag'),
        dMaskOffset = dragMask.offset();
        if(!jui2.drag.verticalDrag){
          dragMask.offset({top: dMaskOffset.top, left: mouseX-jui2.drag.clientX});
          $draggedEl.triggerHandler('dragmove', [{x: dMaskOffset.left, y: dMaskOffset.top}]);
        }
        else if(!jui2.drag.horizontalDrag){
          dragMask.offset({top: mouseY-jui2.drag.clientY, left: dMaskOffset.left});
          $draggedEl.triggerHandler('dragmove', [{x: dMaskOffset.left, y: mouseY-jui2.drag.clientY}]);
        }
        else{
          dragMask.offset({top: mouseY-jui2.drag.clientY, left: mouseX-jui2.drag.clientX});
          $draggedEl.triggerHandler('dragmove', [{x: mouseX-jui2.drag.clientX, y: mouseY-jui2.drag.clientY}]);
        }
      }
    });
  });
})(jQuery);
;/****lang/day.js****/
(function($){

	jui2.lang.day = {
		en: {
			sun: {
				short: 'Sun',
				long: 'Sunday'
			},
			mon: {
				short: 'Mon',
				long: 'Monday'
			},
			tue: {
				short: 'Tue',
				long: 'Tuesday'
			},
			wed: {
				short: 'Wed',
				long: 'Wednesday'
			},
			thu: {
				short: 'Thu',
				long: 'Thursday'
			},
			fri: {
				short: 'Fri',
				long: 'Friday'
			},
			sat: {
				short: 'Sat',
				long: 'Saturday'
			}
		}
	}
	
}(jQuery));/****lang/month.js****/
(function($){

	jui2.lang.month = {
		en: {
			jan: {
				short: 'Jan',
				long: 'January'
			},
			feb: {
				short: 'Feb',
				long: 'February'
			},
			mar: {
				short: 'Mar',
				long: 'March'
			},
			apr: {
				short: 'Apr',
				long: 'April'
			},
			may: {
				short: 'May',
				long: 'May'
			},
			jun: {
				short: 'Jun',
				long: 'June'
			},
			jul: {
				short: 'Jul',
				long: 'July'
			},
			aug: {
				short: 'Aug',
				long: 'August'
			},
			sep: {
				short: 'Sep',
				long: 'September'
			},
			oct: {
				short: 'Oct',
				long: 'October'
			},
			nov: {
				short: 'Nov',
				long: 'November'
			},
			dec: {
				short: 'Dec',
				long: 'December'
			},
		}
	}
	
}(jQuery));/****js/keycodes.js****/

(function($){
	jui2.nextChar = function (c) {
		return String.fromCharCode(c.charCodeAt(0) + 1);
	}

	jui2.keycodes = {
		'backspace': 8,
		'tab': 9,
		'enter': 13,
		'enter': 16,
		'ctrl': 17,
		'alt': 18,
		'pause/break': 19,
		'capslock': 20,
		'esc': 27, 'escape': 27,
		'space': 32,
		'pageup': 33,
		'pagedown': 34,
		'end': 35,
		'home': 36,
		'left': 37,
		'up': 38,
		'right': 39,
		'down': 40,
		'printscreen': 44,
		'insert': 45, 'ins' : 45,
		'delete': 46, 'del' : 46,
		'0' : 48,
		'1' : 49,
		'2' : 50,
		'3' : 51,
		'4' : 52,
		'5' : 53,
		'6' : 54,
		'7' : 55,
		'8' : 56,
		'9' : 57,
		'a' : 65,
		'b' : 66,
		'c' : 67,
		'd' : 68,
		'e' : 69,
		'f' : 70,
		'g' : 71,
		'h' : 72,
		'i' : 73,
		'j' : 74,
		'k' : 75,
		'l' : 76,
		'm' : 77,
		'n' : 78,
		'o' : 79,
		'p' : 80,
		'q' : 81,
		'r' : 82,
		's' : 83,
		't' : 84,
		'u' : 85,
		'v' : 86,
		'w' : 87,
		'x' : 88,
		'y' : 89,
		'z' : 90,
		'96' : 96,
		'97' : 97,
		'98' : 98,
		'99' : 99,
		'100' : 100,
		'101' : 101,
		'102' : 102,
		'103' : 103,
		'104' : 104,
		'105' : 105,
		'106' : 106,
		'107' : 107,
		'108' : 108,
		'109' : 109,
		'110' : 110,
		'111' : 111,
		'.' : 190
	}

	/**
	 * Bind a series of keycodes into element to prevent user type a character outside the defined keycodes
	 * @param  {jQuery} el jQuery selector, object or HTMLElement
	 * @param {String} keycodes A series of keycodes with comma separated values, ex. 'backspace,space,[a-z]' will only allow user typing backspace, space and character a to z into the element
	 */
	jui2.keycodes.bind = function(el, keycodes){
		keycodes = keycodes.replace(/\s+/g, '')
		keycodes = '["'+keycodes.replace(/,/g, '","').replace(/\"\[/g,'["').replace(/(\]\")/g,'"]')+'"]'
		keycodes = keycodes.replace(/(\]\")/g,'"]')
		keycodes = eval(keycodes)
		var tmp = []
		$.each(keycodes, function(i, val){
			if(typeof val == 'object')
				if(isNaN(val[0])){
					var first = val[0].lowerCase(), last = val[1].lowerCase()
					while(first!=last){
						tmp.push(jui2.keycodes[first])
						first = jui2.nextChar(first)
					}
					tmp.push(jui2.keycodes[first])
				}
				else{
					for(var z = parseInt(val[0]);z<=parseInt(val[1]);z++){
						tmp.push(jui2.keycodes[z])
					}
				}
			else
				tmp.push(jui2.keycodes[val])
		})
		var ctrlDown = false,
		ctrlKey = 17, vKey = 86, cKey = 67, xKey = 88;
		$(el).keydown(function (e) {
			if(e.keyCode == ctrlKey){
				ctrlDown = true;
			}else{
				if(ctrlDown && (e.keyCode == vKey || e.keyCode == cKey || e.keyCode == xKey)){
					return;
				}
				else{
					if($.inArray(e.keyCode, tmp)>=0){
						return
					}
					else
						e.preventDefault();
				}
			}
		}).keyup(function(e){
      if (e.keyCode == ctrlKey) ctrlDown = false;
    });
	}
}(jQuery));
;/****js/method.js****/

jui2.method = {
	disable : function(el){
		self = el || this
		self.className += ' j-disable';
	},
	enable: function(el){
		self = el || this
		self.className = self.className.replace( /(?:^|\s)j-disable(?!\S)/g , '' )
	}
};;/****js/attrChange.js****/
(function($) {
	jui2.attrChange = {
		disabled: function(el, oldVal, newVal){
			if(newVal != null){
				jui2.method.disable(el);
				$el = $(el)
				if(['J-TABLE', 'J-GANTT'].indexOf($el.prop("tagName")) < 0){
					$el.data( "_events", $.extend(true, {}, $el.data( "events" ), jQuery._data( $el[0], "events" )))
					$el.data( "events", [] )
					jQuery._data( $el[0], "events", [] )
					try {
						$el.unbind();
					}
					catch(err) {
					}
				}
			}
			else if(newVal == null){
				jui2.method.enable(el);
				$el = $(el)
				if(['J-TABLE', 'J-GANTT'].indexOf($el.prop("tagName")) < 0){
					$.each($el.data("_events"), function(i, val){
					  $.each(val, function(i2, val2){
						//if(val2.delegateCount == 1){
							//$el.delegate(val2.selector, val2.type, val2.handler );
						//}else
							$el.on(val2.type, val2.handler, val2.data, val2.selector );
					  })
					})

					$el.data( "events", $.extend(true, {}, $el.data( "_events" )))
					jQuery._data( $el[0], "events", $.extend(true, {}, $el.data( "_events" )))
				}
			}
		},
		icon: function(el, oldVal, newVal){
			if(el.iconPosition){
				$(el).children('.j-ui-icon').remove()
				if(newVal != null){
					el.insertAdjacentHTML( el.iconPosition, '<i class="j-ui-icon fa '+newVal+'"></i> ' );
				}
			}
		},
		width: function(el, oldVal, newVal){
			el.style.width = newVal;
		},
		height: function(el, oldVal, newVal){
			var $el = $(el);
			el.style.height = newVal;
			if($el.prop('tagName')=='J-TABLE')
				$el.triggerHandler('afterdraw.height')
		},
		title: function(el, oldVal, newVal){
			var $el = $(el)
			$el.find('.j-title').remove();
			var table = $(el).children('table');
			if(newVal != null)
				el.insertAdjacentHTML( 'afterbegin', '<div class="j-title">'+newVal+'</div>' );
			if(el.tagName == 'J-TABLE'){
				marginTop = 0
				table.prevAll().each(function(i, val){
					($(val).prop('tagName') == 'J-TOOLBAR') ? marginTop += 37 : marginTop += $(val).outerHeight(true)
					/*if($(val).prop('tagName') == 'J-TOOLBAR')
						marginTop += 37
					else
						marginTop += $(val).outerHeight(true)*/
				})
				table.css('margin-top', marginTop);
				/*$el.resize(function(){
					$el.children('.j-title').outerWidth($el.width())
				});
				$el.children('.j-title').outerWidth($el.width())*/
			}
		},
		resize: function(el, oldVal, newVal){
			var $el = $(el), tag = $el.next().prop('tagName');
			if(newVal.toLowerCase() == 'true'){
				if(tag == 'J-LAYOUT-NO-RESIZER'){
					$el.next().remove()
				}
				if(tag != 'J-LAYOUT-RESIZER'){
					$('<j-layout-resizer class="j-drag"></j-layout-resizer>').insertAfter($el)
				}
			}
			else{
				if(tag == 'J-LAYOUT-RESIZER'){
					$el.next().remove()
				}
				if(tag != 'J-LAYOUT-NO-RESIZER'){
					$('<j-layout-no-resizer></j-layout-no-resizer>').insertAfter($el)
				}
			}
		},
		cols: function(el, oldVal, newVal){
			var $el = $(el);
			(newVal != null) ? $el.find('textarea').attr('cols', newVal) : $el.find('textarea').removeAttr('cols')
			/*if(newVal != null){
				$(el).find('textarea').attr('cols', newVal)
			}
			else{
				$(el).find('textarea').removeAttr('cols')
			}*/
		},
		rows: function(el, oldVal, newVal){
			var $el = $(el);
			(newVal != null) ? $el.find('textarea').attr('rows', newVal) : $el.find('textarea').removeAttr('rows')
			/*if(newVal != null){
				$(el).find('textarea').attr('rows', newVal)
			}
			else{
				$(el).find('textarea').removeAttr('rows')
			}*/
		},
		readonly: function(el, oldVal, newVal){
			var $el = $(el)
			if(newVal != null){
				$el.children('input, textarea').attr('readonly', true)
			}
			else{
				$el.children('input, textarea').removeAttr('readonly')
			}
		},
		placeholder: function(el, oldVal, newVal){
			var $el = $(el)
			if(newVal != null){
				$el.children('input').attr('placeholder', newVal)
			}
			else{
				$el.children('input').removeAttr('placeholder')
			}
		}
	};
}(jQuery))
;
;/****js/base.js****/

/**
 * @classdesc base for all custom web component
 * @class base
 */

(function($) {
  /** @constructor */
  var proto = Object.create(HTMLElement.prototype);

  proto.createdCallback = function(pr) {
		var ext, $this = $(this), self = this;
    this.enabledAttrChange = this.enabledAttrChange || [];
    if(pr){
      if(pr.extension !== undefined){
				ext = pr.extension;
        if(ext.length>0){
          for(var i in ext){
            ext[i](this);
          }
        }
      }
    }

    if($this.attr('onafterdraw'))
      $this.on('afterdraw', function(e){
        window[$this.attr('onafterdraw')].call(this, e);
      });

    this.attrChangedCb = function(enabledAttrChange, attrName, oldVal, newVal){
      if(enabledAttrChange){
        self.enabledAttrChange = $.unique(self.enabledAttrChange.concat(enabledAttrChange));

    		for(i in self.attributes){
    			var attrName = self.attributes[i].nodeName,
    			newVal = self.attributes[i].nodeValue, attr = self.tagName.toLowerCase()+'_'+attrName;
    			if(jui2.attrChange[attr])
    				jui2.attrChange[attr](self, false, newVal);
    			else if(jui2.attrChange[attrName] && self.enabledAttrChange.indexOf(attrName) > -1)
    	      jui2.attrChange[attrName](self, false, newVal);
    		}
      }
      else{
    		var attr = self.tagName.toLowerCase()+'_'+attrName;
    		if(jui2.attrChange[attr])
    			jui2.attrChange[attr](self, oldVal, newVal);
  	    else if(jui2.attrChange[attrName])
  	      jui2.attrChange[attrName](self, oldVal, newVal);
      }
  	}

    /*for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
			if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, '', newVal);
		}*/

    //add id if not set
    if(!$this.attr('id')){
      $this.attr('id', 'j-'+jui2.random(8, 'aA#'));
    }

    this.juiid = jui2.random(8, 'aA#');

    if(pr)
      if(!pr.extension){
        pr.extension = [];
      }
  };

  jui2.ui.base = {
    widget: document.registerElement('j-base', {
      prototype: proto
    }),
    proto: proto,
    extension: []
  };

}(jQuery))
;
;/****js/button.js****/
/**
 * @classdesc Button custom web component
 * @class button
 * @property {string} color Available color is blue and red
 * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="http://fontawesome.github.io/Font-Awesome/icons/">http://fontawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Basic button</caption>
 * <j-button>My Button</j-button>
 * @example <caption>Button with different color</caption>
 * <j-button color="blue">My Button</j-button>
 * @example <caption>Button with icon</caption>
 * <j-button icon="fa-calendar">My Button</j-button>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.button);

		var $self = $(this)

		this.iconPosition = 'afterBegin';

		$self.attr('tabindex', 0).addClass('j-transition1 j-border-box j-focus-highlight1');

		if(this.innerHTML.trim() == '')
			this.innerHTML = ''

		/*if(this.getAttribute('icon'))
			this.innerHTML = '<i class="fa '+this.getAttribute('icon')+'"></i> '+this.innerHTML*/
		/*this.enabledAttrChange = $.unique(this.enabledAttrChange.concat(['disabled', 'icon']));

		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue, attr = this.tagName.toLowerCase()+'_'+attrName;
			if(jui2.attrChange[attr])
				jui2.attrChange[attr](this, false, newVal);
			else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	        	jui2.attrChange[attrName](this, false, newVal);
		}*/

		$self.keyup(function(event){
		    if(event.keyCode == 13){
				event.preventDefault();
		        $self.click();
		    }
		});

		this.attrChangedCb(['disabled', 'icon'])

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var attr = this.tagName.toLowerCase()+'_'+attrName;
		if(jui2.attrChange[attr])
			jui2.attrChange[attr](this, oldVal, newVal);
	    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      jui2.attrChange[attrName](this, oldVal, newVal);*/
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

 /**
 	* Fires when button clicked
 	* @event click
 	* @memberof button
 	* @example
 	* <j-button id="myButton">My Button</j-button>
 	* <script>
 	* $('#myButton').on('click', function(value){
 	* 	console.log('Button clicked') //will print 'Button clicked' in javascript console
 	* })
 	* </script>
 	*/
	jui2.ui.button = {
		widget: document.registerElement('j-button',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/modal.js****/

/**
 * @classdesc Modal custom web component
 * @class modal
 * @property {string} title Modal title
 * @property {string} height Modal height
 * @property {string} width Modal width
 * @property {boolean} center As long as attribute center available and not 'false', j-modal will be positioned at center of the page
 * @property {boolean} mask If true will mask the current page
 * @property {boolean} drag Allow dragging or not
 * @property {boolean} resize Allow resize or not
 * @property {selector} snapto Will snap modal to given selector
 * @property {string} snappos If snapto attribute available then snappos will be used as position to snap to target element. Available value is: 'topleft to bottomleft' and 'bottomleft to topleft'
 * @example <caption>Basic modal</caption>
 * <j-modal title="My Modal">Modal Content</j-modal>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {
		$(this).detach().appendTo('body')
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.modal);
		var z = jui2.findHighestZIndex(), $this = $(this)

		$this.css('z-index', z == '-Infinity' ? 100 : z)

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		$this.append('<div class="j-modal-body" style="overflow:auto;position:relative;height:100%"></div>')

		$this.children(':not(.j-modal-title)').appendTo($(this).children('.j-modal-body'))

		$this.on('afterresize', function(){
			$this.children('.j-modal-body').outerHeight(parseInt($this.height()) - parseInt($this.children('.j-modal-title').outerHeight(true)))
		})


    	for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
			if(jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName])
				jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName](this, false, newVal);
			else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	        	jui2.attrChange[attrName](this, false, newVal);
		}

		if(!$(this).attr('snappos') && !$(this).attr('snapto') && $(this).attr('center')!="false")
			$(this).center();
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		if(jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName])
			jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName](this, oldVal, newVal);
	    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	    	jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.modal = {
		widget: document.registerElement('j-modal',  {
			prototype: proto
		}),
		proto: proto,
    extension: []
	}

	jui2.attrChange['j-modal_width'] = function(el, oldVal, newVal){
		(newVal) ? $(el).css('width', newVal) : $(el).css('width', '')
    /*if(newVal){
			$(el).css('width', newVal)
		}
		else{
			$(el).css('width', '')
		}*/
	}

	jui2.attrChange['j-modal_height'] = function(el, oldVal, newVal){
		(newVal) ? $(el).css('height', newVal) : $(el).css('height', '')
    /*if(newVal){
			$(el).css('height', newVal)
		}
		else{
			$(el).css('height', '')
		}*/
	}

	jui2.attrChange['j-modal_title'] = function(el, oldVal, newVal){
		var $el = $(el)
    	if(newVal){
			$el.children('.j-modal-title').remove()
			$el.prepend('<div class="j-modal-title">'+newVal+'<div class="j-modal-window-controls"><i class="fa fa-times"></i></div></div>')
			$el.find('> .j-modal-title .fa-times').click(function(){
				if($el.attr('remove')=='hide')
					$el.hide()
				else
					$el.remove()
			})

			$el.children('.j-modal-body').outerHeight(parseInt($el.height()) - parseInt($el.children('.j-modal-title').outerHeight(true)))
		}
		else{
			$el.children('.j-modal-title').remove()
		}
	}

  jui2.attrChange['j-modal_snapto'] = function(el, oldVal, newVal){
    if(newVal){
		var $el = $(el)
      if($el.attr('snappos')){
        var snappos = $el.attr('snappos')
        if(snappos == 'topleft to bottomleft'){
          var pos = $(newVal).offset(), x = pos.left, y = pos.top+$(newVal).outerHeight(true);
        }
        else if(newVal == 'bottomleft to topleft'){
          var pos = $(snapto).offset(), x = pos.left, y = pos.top-$el.outerHeight(true);
        }

        var z = jui2.findHighestZIndex()
        z = z == '-Infinity' ? 100 : z;

        $el.css({
          top: y,
          left: x,
          'z-index': z
        })
      }
    }
  }

  jui2.attrChange['j-modal_snappos'] = function(el, oldVal, newVal){
    if(newVal){
		var $el = $(el)
      if($el.attr('snapto')){
        var snapto = $el.attr('snapto')
        if(newVal == 'topleft to bottomleft'){
          var pos = $(snapto).offset(), x = pos.left, y = pos.top+$(snapto).outerHeight(true);
        }
        else if(newVal == 'bottomleft to topleft'){
          var pos = $(snapto).offset(), x = pos.left, y = pos.top-$el.outerHeight(true);
        }

        var z = jui2.findHighestZIndex()
        z = z == '-Infinity' ? 100 : z;

        $el.css({
          top: y,
          left: x,
          'z-index': z
        })
      }
    }
  }

	jui2.attrChange['j-modal_drag'] = function(el, oldVal, newVal){
    if(newVal == 'true'){
			$(el).attr('drag', '.j-modal-title')
		}
	}

	jui2.attrChange['j-modal_resize'] = function(el, oldVal, newVal){
		(newVal == 'true') ? $(el).append('<j-resize></j-resize>') : $(el).children('j-resize').remove()
    /*if(newVal == 'true'){
			$(el).append('<j-resize></j-resize>')
		}
		else{
			$(el).children('j-resize').remove()
		}*/
	}

}(jQuery))
;
;/****js/textField.js****/

 /**
  * @classdesc TextField custom web component
  * @class textField
  * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
  * @example <caption>Basic usage: <br/><j-textfield>Username</j-textfield></caption>
  * <j-textfield>Username</j-textfield>
  * @example <caption>Textfield with icon: <br/><j-textfield icon="fa-user">Username</j-textfield></caption>
  * <j-textfield icon="fa-user">Username</j-textfield>
  */

(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.textField);

		this.iconPosition = 'beforeend';

		var label = label || '',
		type = type || 'text', $self = $(this);

		if(this.innerHTML.trim() == '')
			this.innerHTML = label

		var tmpValue = this.getAttribute('value') || '';

		this.innerHTML = jui2.tmpl['textField']({label: this.innerHTML, type: type});

		$self.addClass('j-input').children().eq(1).attr('value', tmpValue);

		this.removeAttribute('value');

		if(this.getAttribute('icon')){
			this.insertAdjacentHTML( 'beforeend', '<i class="j-ui-icon fa '+this.getAttribute('icon')+'"></i>' );
		}

		$self.children().eq(0).click(function(){
			$(this).next().focus();
		})

		/* non jquery code */

		/*if (document.addEventListener) {                // For all major browsers, except IE 8 and earlier
			this.children[0].addEventListener("click", function(){
				$(this).next().focus();
			});
		} else if (document.attachEvent) {              // For IE 8 and earlier versions
			this.children[0].attachEvent("onclick", function(){
				$(this).next().focus();
			});
		}*/

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		this.attrChangedCb(['disabled', 'icon', 'placeholder', 'readonly'])

		/**
		 * Set and get widget value
		 * @param {mixed} value can be empty
		 * @returns {mixed}
		 * @method val
		 * @memberof textField
		 * @instance
		 * @example <caption>nopreview</caption>
		 * var value = $('#myWidget').val() // will return widget's value to variable value
		 * @example <caption>nopreview</caption>
		 * $('#myWidget').val('myValue') // will set widget's value to 'myValue'
		 */
		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function(){
				if($(this).children('input')[0])
					return $(this).children('input')[0].value;
				else
					return '';
			},
			set: function(value){
				if($(this).children('input')[0])
					$(this).children('input')[0].value = value;
				return $(this).children('input')[0].value
			}
		});

		var extend = true;
		if(this.noInherit)
			if(this.noInherit.indexOf('value')!=-1)
				extend = false;

		if(this.value && extend){
			var tmpValue = this.value
			delete this.value;
			$self.val(tmpValue);
		}
		else{
			if(extend)
				delete this.value;
		}

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);*/
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

	jui2.ui.textField = {
		widget: document.registerElement('j-textfield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/radioField.js****/

 /**
  * @classdesc RadioField custom web component
  * @class radioField
  * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
  * @example <caption>Basic usage: <br/><j-radiofield>RadioField[[1, "value 1"], [2, "value 2"]]</j-radiofield></caption>
  * <j-radiofield>RadioField[[1, "value 1"], [2, "value 2"]]</j-radiofield>
  * @example <caption>RadioField with icon: <br/><j-radiofield icon="fa-user">RadioField[[1, "value 1"], [2, "value 2"]]</j-radiofield></caption>
  * <j-radiofield icon="fa-user">RadioField[[1, "value 1"], [2, "value 2"]]</j-radiofield>
  */

(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.radioField);

		this.iconPosition = 'beforeend';

		var label = label || '',
		type = type || 'radio', $self = $(this),
		radios = eval(this.innerHTML.match(/\[(.*)\]/)[0]);

		if(this.innerHTML.trim() == '')
			this.innerHTML = label

		label = this.innerHTML.split('[')[0];

		var tmpValue = this.getAttribute('value') || '';

		$self.empty().append(jui2.tmpl['radioField']({id: this.juiid, label: label, type: type, radios: radios}));

		$self.addClass('j-input').children().eq(1).attr('value', tmpValue);

		this.removeAttribute('value');

		if(this.getAttribute('icon')){
			this.insertAdjacentHTML( 'beforeend', '<i class="j-ui-icon fa '+this.getAttribute('icon')+'"></i>' );
		}

		$self.children().eq(0).click(function(){
			$(this).next().focus();
		})

		/* non jquery code */

		/*if (document.addEventListener) {                // For all major browsers, except IE 8 and earlier
			this.children[0].addEventListener("click", function(){
				$(this).next().focus();
			});
		} else if (document.attachEvent) {              // For IE 8 and earlier versions
			this.children[0].attachEvent("onclick", function(){
				$(this).next().focus();
			});
		}*/

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		this.attrChangedCb(['disabled', 'icon'])

		/**
		 * Set and get widget value
		 * @param {mixed} value can be empty
		 * @returns {mixed}
		 * @method val
		 * @memberof radioField
		 * @instance
		 * @example <caption>nopreview</caption>
		 * var value = $('#myWidget').val() // will return widget's value to variable value
		 * @example <caption>nopreview</caption>
		 * $('#myWidget').val('myValue') // will set widget's value to 'myValue'
		 */
		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function(){
				if($(this).children('input')[0])
					return $(this).children(':checked').val();
				else
					return '';
			},
			set: function(value){
				if($(this).children('input')[0])
					$(this).children('input').filter('[value='+value+']').prop('checked', true);
				return $(this).children(':checked').val()
			}
		});

		var extend = true;
		if(this.noInherit)
			if(this.noInherit.indexOf('value')!=-1)
				extend = false;

		if(this.value && extend){
			var tmpValue = this.value
			delete this.value;
			$self.val(tmpValue);
		}
		else{
			if(extend)
				delete this.value;
		}

		$self.children('input').eq(0).remove()
		$self.children('label').eq(1).remove()

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);*/
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

	jui2.ui.radioField = {
		widget: document.registerElement('j-radiofield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/numberField.js****/

/**
 * @classdesc Numberfield custom web component
 * @class numberField
 * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Numberfield basic example</caption>
 * <j-numberfield>My number</j-numberfield>
 * @augments textField
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		jui2.ui.textField.proto.createdCallback.call(this, '')

		jui2.keycodes.bind(this, "tab,enter,backspace,escape,.,[0,9],delete,[96,111]")
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);*/
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

	jui2.ui.numberField = {
		widget: document.registerElement('j-numberfield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/passwordField.js****/

/**
 * @classdesc Passwordfield custom web component
 * @class passwordField
 * @property {string} icon Button icon, using font awesome. Ex. fa-key etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Passwordfield basic usage</caption>
 * <j-passwordfield>Password</j-passwordfield>
 * @example <caption>Passwordfield with icon</caption>
 * <j-passwordfield icon="fa-key">Password</j-passwordfield>
 * @augments textField
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {
		jui2.ui.textField.proto.createdCallback.call(this, '', 'password')
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);*/
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

	jui2.ui.passwordField = {
		widget: document.registerElement('j-passwordfield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/comboField.js****/

/**
 * @classdesc Combofield custom web component
 * @class comboField
 * @property {number} pk Column number in data retrieved that will be use as primary key and as value when combo items selected
 * @example <caption>Combofield widget basic usage</caption>
 *
<j-combofield id="combo">Combo
	<j-table>
		[
			[ "ID", "Fruit", "data 1", "data 2", "data 3"],
      [ 1, "apple", 4, 10, 2 ],
      [ 2, "banana", 0, 4, 0 ],
      [ 3, "grape", 2, 3, 5 ],
      [ 4, "pear", 4, 2, 8 ],
      [ 5, "strawberry", 0, 14, 0 ]
    ]
	</j-table>
</j-combofield>
 * @example <caption>Combofield data from server</caption>
 *
<j-combofield>Combo
	<j-table>

		<j-loader src="http://gggmpscdweb05/gg_beta/index.php/emres_sppb/get_data"></j-loader>
		[["ID", "SPPB No.", "SPPB Date", "Requestor", "PIC"]]
		<j-pagination>
		</j-pagination>
	</j-table>
</j-combofield>
 * @augments textField
 */

(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {
		//jui2.ui.base.proto.createdCallback.call(this, jui2.ui.comboField);

		this.setAttribute("icon", "fa-angle-down");
		var $self = $(this), table = $self.children('j-table').detach(), $table, $div, id;

		this.noInherit = ['value'];
		jui2.ui.textField.proto.createdCallback.call(this, '')
		id = this.juiid

		$self.append(table).children('j-table').wrap('<div></div>')

		$div = $self.children('div')
		$table = $self.find('j-table')

		if(!$self.attr('pk'))
			$self.attr('pk', '0');

		/* handling mouseclick outside of comboField widget
		 * If click is in outside then close comboField selection
		 */
		$table.bind( "clickout", function(event){
			var $target = $(event.target);
			if(event.target != $self[0] && $target.parents('j-combofield')[0] != $self[0] && $target.parents('[belongto=j-comboField]').length == 0){
				$table.detach().appendTo($div);
				$('#j-comboField-'+id).remove();
				$div.hide();
			}
		});

		/* handling if mouse click comboField widget to show comboField selection
		 */
		$self.delegate($self.children().not('j-table'), 'click', function(e){
			var $eTarget = $(e.target), $itemPerpage = $table.find('> j-pagination > .j-itemPerPage');
			if($itemPerpage.length > 0){
				$itemPerpage.remove();
				$table.find('> j-pagination > span:contains(items per page)').remove();
			}
			if($eTarget.hasClass('fa-remove')){
				$self.val('')
			}
			else if($eTarget.parents('div:not(j-table > div)')[0] != $div[0] && e.target != $div[0]){
				$div.toggle();
				if($div.css('display') == 'block'){
					if($('#j-comboField-'+id).length==0)
						$('body').append('<j-modal search="'+$self.attr('search')+'" belongto="j-comboField" snapto="#'+$self.attr('id')+' > input" snappos="topleft to bottomleft" id="j-comboField-'+id+'"></j-modal>');
					$table[0].generateData();
					$table.detach().appendTo('#j-comboField-'+id)
					$table.show();
					$self.find('j-toolbar j-textfield').focus();
					table.find('table').removeAttr('style');
				}
				else{
					$table.detach().appendTo($div);
					$('#j-comboField-'+id).remove();
				}
			}
		})

		/* handling comboField options selection
		 * If option (a td element) is clicked, then close the selection and set value to comboField
		 * and then fires 'select' event
		 */
		$table.delegate('td', 'click', function(e){
			var $td = $(this), $table = $td.parents('j-table').eq(0), pk = $self.attr('pk'), data = $table[0].data, val = data[$td.parent().index()][pk]

			for(var i in data){
				if(data[i][pk]==val){
					$self.val(data[i][pk])
				}
			}
			$table.detach().appendTo($div);
			$('#j-comboField-'+id).remove();
			$div.hide();
			/**
			 * Fires when combofield selected
			 * @event select
			 * @param {object} event Event object
			 * @param  {String} value Selected value
			 * @memberof comboField
			 * @example
			 * <j-combofield id="myCombo1">Combo</j-combofield>
			 * <script>
			 * $('#myCombo1').on('select', function(e, value){
			 * 	console.log(value) // will print value you selected from combofield in javascript console
			 * })
			 * </script>
			 */
			$self.triggerHandler('select', [$self.val()]);
			$table.find('tr').removeClass('j-active');
		})

		$table.prepend(jui2.tmpl['comboToolbar']())

		$self.find('j-toolbar j-textfield').on('keydown', function(e){
			if(e.keyCode == 13){
				var $loader = $table.find('j-loader'), $input = $table.find('j-toolbar j-textfield');
				if($loader.length > 0){
					$loader[0].param.sSearch = $input.val()
					$table[0].generateData();
				}
				else{
					$('#j-comboField-'+id+' tbody tr').show()
					.not(':contains('+$input.val()+')').hide()
				}
			}
		})

		//delete value when captured backspace keydown event
		$self.on('keydown', function(e){
			if(e.keyCode == 8){
				$self.val('');
				$table.detach().appendTo($div);
				$('#j-comboField-'+id).remove();
				$div.hide();
			}
		})

		var tmpValue = $self.attr('value') || (this.value || '')
		//$(this).removeAttr('value')

		jui2.keycodes.bind($self.children('input'), "tab")

		/* getter/setter */
		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function(){
				return $(this).attr('data-value');
			},
			set: function(value){
				var $this = $(this);
				if(value==''){
					$this.removeAttr('data-value');
					$this.children('input')[0].value = '';
					this.setAttribute("icon", "fa-angle-down")
				}
				else{
					$this.attr('data-value', value)
					var $table = $('#j-comboField-'+$(this)[0].juiid).find('j-table'), i;
					if(!$table[0]){
						$table = $this.find('> div > j-table')
					}

					for(i in $table[0].data){
						if($table[0].data[i][$(this).attr('pk')]==value){
							var data = $table[0].data[i].slice(), c = 0, valText = []
							$table.find('> .j-table-body > table > thead > tr > th').filter(function(){
								return $(this).css('display') != 'none'
							}).each(function(i, val){
								valText[valText.length] = data[$(val).index()]
							})
							$this.children('input')[0].value = valText.join(', ');
						}
					}

					if($this.children('input')[0].value.trim()!='')
						this.setAttribute("icon", "fa-remove")
				}
			}
		});

		var check = true, found = false

		$self.find('> div > j-table').on('afterdraw', function(){
			value = $self.attr('data-value') ? $self.attr('data-value') : tmpValue;

			if($self.attr('data-value')){
				$self.val($self.attr('data-value'))
				value = $self.attr('data-value')
			}

			if(tmpValue!='' && tmpValue != undefined){
				$self.val(tmpValue)
				value = tmpValue
			}
			if(this.data != null)
				if(this.data.length > 0){
					if($table[0].data.length == 1){
						found = true
						check = false
						var data = $table[0].data[0].slice(), c = 0, valText = []
						$self.attr('data-value', this.data[0][$self.attr('pk')])
						$(this).find('> .j-table-body > table > thead > tr > th').filter(function(){
							return $(this).css('display') != 'none'
						}).each(function(i, val){
							valText[valText.length] = data[$(val).index()]
						})
						$self.children('input')[0].value = valText.join(', ');
					}
					else{
						for(i in this.data){
							if(this.data[i][$self.attr('pk')]==value){
								found = true
								check = false
								var data = this.data[i].slice(), c = 0, valText = []
								$(this).find('> .j-table-body > table > thead > tr > th').filter(function(){
									return $(this).css('display') != 'none'
								}).each(function(i, val){
									valText[valText.length] = data[$(val).index()]
								})
								$self.children('input')[0].value = valText.join(', ');
							}
						}
					}

					if((found && check == false) || $(this).find('j-loader').length == 0){
						$self.find('> div > j-table').unbind('afterdraw')
						tmpValue = undefined
						if($(this).find('j-loader').length>0)
							$(this).find('j-loader')[0].param.pk = ''
					}
					else{
						check = false;
						found = true;

						$(this).find('j-loader')[0].param.pk = value
						$self.find('> div > j-table')[0].generateData()

					}
				}
		})

		delete this.value;

		/**
		 * Fires after comboField has been created
		 * @event afterdraw
		 * @param {object} event Event object
		 * @memberof comboField
		 * @example
		 * <j-combofield id="myCombo1">Combo</j-combofield>
		 * <script>
		 * $('#myCombo1').on('afterdraw', function(e){
		 * 	console.log('ComboField created!')
		 * })
		 * </script>
		 */
		$self.triggerHandler('afterdraw')

	};

	/**
	 * Get selected record data
	 * @method getSelectedRecord
	 * @memberof comboField
	 * @return {array} record Selected record
	 * @instance
	 */
	proto.getSelectedRecord = function(){
		var value = $(this).attr('data-value'), $table = $(this).find('j-table'), i;
		for(i in $table[0].data){
			if($table[0].data[i][$(this).attr('pk')]==value){
				return $table[0].data[i]
			}
		}
	}

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = ['disabled', 'icon', 'placeholder', 'readonly'], attrChange = jui2.attrChange;
		if(attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.comboField = {
		widget: document.registerElement('j-combofield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/dateField.js****/

/**
 * @classdesc Datefield custom web component
 * @class dateField
 * @property {string} format Date formatting for datefield value, format conventions using momentjs formatting conventions see <a href="http://momentjs.com/docs/#/displaying/">http://momentjs.com/docs/#/displaying/</a>
 * @example <caption>Datefield widget basic usage</caption>
 * <j-datefield id="date">Date</j-datefield>
 * @example <caption>Datefield formatting</caption>
 * <j-datefield format="DD MMM YYYY">Date</j-datefield>
 * @augments textField
 */
//TODO: clearing and trimming code
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(type) {
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.dateField);

		var $self = $(this), $table, self = this, id = this.juiid, tag = $self.prop('tagName'), defFormat = "MMMM YYYY"

		this.setAttribute("icon", "fa-calendar");

		jui2.ui.textField.proto.createdCallback.call(this, '')

		if(!$self.attr('format')){
			$self.attr('format', 'DD/MM/YYYY')
		}

		var initDate = moment($self.val(), $self.attr('format')).format(defFormat)
		if(initDate == 'Invalid date')
			initDate = moment().format(defFormat)
		if(type)
			$self.append(jui2.tmpl[type]({day: jui2.lang.day.en, month: initDate}));
		else
			$self.append(jui2.tmpl['calendar']({day: jui2.lang.day.en, month: initDate}));

		$table = $self.children('table')

		$table.find('.fa-chevron-left').parent().click(function(){
			self.prevMonth($table)
		})

		$table.find('.fa-chevron-right').parent().click(function(){
			self.nextMonth($table)
		})

		$table.find('tfoot j-button').click(function(){
			$self.val(moment().format($self.attr('format')))
			$table.detach().appendTo($self);
			$('#j-dateField-'+id).remove();
			$table.hide();
			/**
			 * Fires when date selected
			 * @event select
			 * @param {object} event Event object
			 * @param  {String} value Selected value
			 * @memberof dateField
			 * @example
			 * <j-datefield id="myDatefield1">Date</j-datefield>
			 * <script>
			 * $('#myDatefield1').on('select', function(e, value){
			 * 	console.log(value) // will print value you selected from datefield in javascript console
			 * })
			 * </script>
			 */
			$self.triggerHandler('select', [$self.val()]);
		})
		//self.timestamp = 0
		$self.unbind('clickout').bind( "clickout", function(event){
			if(event.target != $self[0] && $(event.target).parents('#'+$self.attr('id')).length == 0 && $(event.target).parents('[belongto=j-dateField]').length == 0/* && self.timestamp != event.timestamp*/){
				$table.detach().appendTo($self);
				$('#j-dateField-'+id).remove();
				$table.hide();

				/*$('[belongto=j-dateField]').filter(function(){
					return $(this).
				})*/

				/*if($(event.target).parents('j-datefield, [belongto=j-dateField]').length == 0 && $(event.target).parents('j-datefield')[0] != $self[0]){
					$('[belongto=j-dateField]').find('table').detach().appendTo($self)
					$('[belongto=j-dateField]').find('table').hide()
					$('[belongto=j-dateField]').remove()
				}*/
			}
			//self.timestamp = event.timestamp
		});

		$table.delegate('tbody td', 'click', function(e){
			e.stopPropagation();
			var elNum = parseInt(this.innerHTML), $this = $(this);

			if($this.index()<7 && $this.parent().parent().parent().parent().hasClass('j-modal-body')){
				var $dateText = $table.find('thead tr:first-child th:nth-child(2)');
				if($this.parent().index()==0){
					if($this.nextAll().filter(function( index ) {
						return parseInt(this.innerHTML) < elNum
					}).length > 0){
						$dateText.text(moment($dateText.text(), defFormat).subtract(1, 'month').format(defFormat))
					}
				}
				else if($this.parent().index()==($this.parent().siblings().length)){
					if($this.prevAll().filter(function( index ) {
						return parseInt(this.innerHTML) > elNum
					}).length > 0){
						$dateText.text(moment($dateText.text(), $dateText).add(1, 'month').format($dateText))
					}
				}
				$self.val(moment(('00'+elNum).slice(-2)+' '+$dateText.text(), 'DD MMMM YYYY').format($self.attr('format')))
				$table.detach().appendTo($self);
				$('#j-dateField-'+id).remove();
				$table.hide();
				/**
				 * Fires when date selected
				 * @event select
				 * @param {object} event Event object
				 * @param  {String} value Selected value
				 * @memberof dateField
				 * @example
				 * <j-datefield id="myDatefield1">Date</j-datefield>
				 * <script>
				 * $('#myDatefield1').on('select', function(e, value){
				 * 	console.log(value) // will print value you selected from datefield in javascript console
				 * })
				 * </script>
				 */
				$self.triggerHandler('select', [$self.val()]);
			}
		})

		$self.delegate($self.children().not('table'), 'click', function(e){

			if($(e.target).parents('table')[0] != $table[0] && e.target != $table[0]){
				$table.toggle();
				if($table.is(':visible')){
					if($('#j-dateField-'+id).length==0)
						$('body').append('<j-modal belongto="j-dateField" snapto="#'+$self.attr('id')+' > input" snappos="topleft to bottomleft" id="j-dateField-'+id+'" height="240px"></j-modal>');
					setTimeout(function(){
						var $modal = $('#j-dateField-'+id)
						if($modal.touchBottom()){
							$modal.attr('snappos', 'bottomleft to topleft')
							setTimeout(function(){
								if($modal.touchTop())
									$modal.attr('snappos', 'topleft to bottomleft')
							}, 250);
						}
					}, 250)
					$table.detach().appendTo('#j-dateField-'+id)

					var date = [], lastDate, startDate, w = [], i = 0, format = $self.attr('format');
					//$table.css('z-index', z == '-Infinity' ? 100 : z);

					//m = moment($self.val(), $self.attr('format'))

					lastDate = moment($self.val(), format).endOf('month').endOf('week')
					if(lastDate == 'Invalid date' || lastDate.format(format) == 'Invalid date')
						lastDate = moment().endOf('month').endOf('week')
					startDate = moment($self.val(), format).startOf('month').startOf('week')
					if(startDate == 'Invalid date' || startDate.format(format) == 'Invalid date')
						startDate = moment().startOf('month').startOf('week')

					while(startDate.format('DD/MM/YYYY') != lastDate.format('DD/MM/YYYY')){
						w[w.length] = startDate.format('D')
						i++;
						startDate.add(1, 'day');
						if(i==7){
							i=0;
							date[date.length] = w;
							w = [];
						}
					}

					w[w.length] = startDate.format('D')
					startDate.add(1, 'day');
					if(w.length > 0)
						date[date.length] = w;
					$table.find('> tbody').empty().append(jui2.tmpl['calendarBody']({date: date}));
					$self.triggerHandler('calendarshow', [$table]);
				}
				else{
					$table.detach().appendTo($self);
					$('#j-dateField-'+id).remove();
				}
			}
		});

		jui2.keycodes.bind(this, "tab")
		/*--*
		 * Fires after dateField created
		 * @event afterdraw
		 * @instance
		 * @memberof dateField
		 * @example
		 * <j-datefield id="myDatefield2">Date</j-datefield>
		 * <script>
		 * $('#myDatefield2').on('afterdraw', function(value){
		 * 	console.log('Datefield created')
		 * })
		 * </script>
		 --*/
		//$self.triggerHandler('afterdraw')

		if(this.value || this.value == ''){
			if(this.value.trim()!=''){
				var tmpValue = this.value
				$(this).val(tmpValue);
			}
			delete this.value;
		}

		$self.on('keydown', function(e){
			if(e.keyCode == 8){
				$self.val('');
				$table.detach().appendTo($self);
				$('#j-dateField-'+id).remove();
				$table.hide();
			}
		})

		this.enabledAttrChange = $.unique(this.enabledAttrChange.concat(['disabled', 'icon', 'placeholder', 'readonly']));

    for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
      if(jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName])
  			jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName](this, false, newVal);
      else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
        jui2.attrChange[attrName](this, false, newVal);
		}

	};

/**
 * Go to previous month
 * @method prevMonth
 * @memberof dateField
 * @instance
 */
	proto.prevMonth = function(table){
		var date = [], lastDate, startDate, w = [], i = 0, $table = table, defFormat = "MMMM YYYY";
		lastDate = moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).subtract(1, 'month').endOf('month').endOf('week')
		startDate = moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).subtract(1, 'month').startOf('month').startOf('week')
		while(startDate.format('DD/MM/YYYY') != lastDate.format('DD/MM/YYYY')){
			w[w.length] = startDate.format('D')
			i++;
			startDate.add(1, 'day');
			if(i==7){
				i=0;
				date[date.length] = w;
				w = [];
			}
		}
		w[w.length] = startDate.format('D')
		startDate.add(1, 'day');
		if(w.length > 0)
			date[date.length] = w;

		$table.find('thead tr:first-child th:nth-child(2)').text(moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).subtract(1, 'month').format(defFormat))
		$table.find('> tbody').empty().append(jui2.tmpl['calendarBody']({date: date}));
	}
/**
 * Go to next month
 * @method nextMonth
 * @memberof dateField
 * @instance
 */
	proto.nextMonth = function(table){
		var date = [], lastDate, startDate, w = [], i = 0, $table = table, defFormat = "MMMM YYYY";
		lastDate = moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).add(1, 'month').endOf('month').endOf('week')
		startDate = moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).add(1, 'month').startOf('month').startOf('week')
		while(startDate.format('DD/MM/YYYY') != lastDate.format('DD/MM/YYYY')){
			w[w.length] = startDate.format('D')
			i++;
			startDate.add(1, 'day');
			if(i==7){
				i=0;
				date[date.length] = w;
				w = [];
			}
		}
		w[w.length] = startDate.format('D')
		startDate.add(1, 'day');
		if(w.length > 0)
			date[date.length] = w;

		$table.find('thead tr:first-child th:nth-child(2)').text(moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).add(1, 'month').format(defFormat))
		$table.find('> tbody').empty().append(jui2.tmpl['calendarBody']({date: date}));
	}

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var tagName = this.tagName, attrChange = jui2.attrChange, key = tagName.toLowerCase()+'_'+attrName;
		if(attrChange[key])
			attrChange[key](this, oldVal, newVal);
	    else if(attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.dateField = {
		widget: document.registerElement('j-datefield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/dateTimeField.js****/
/**
 * @classdesc Datetimefield custom web component
 * @class dateTimeField
 * @property {string} format Datetime formatting for datetimefield value, format conventions using momentjs formatting conventions see <a href="http://momentjs.com/docs/#/displaying/">http://momentjs.com/docs/#/displaying/</a>
 * @example <caption>Datetimefield widget basic usage</caption>
 * <j-datetimefield id="datetime">Datetime</j-datetimefield>
 * @example <caption>Datetimefield formatting</caption>
 * <j-datetimefield format="DD MMM YYYY hh:mm">Datetime</j-datetimefield>
 * @augments dateField
 */
//TODO: clearing and trimming code

(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		if(!$(this).attr('format')){
			$(this).attr('format', 'DD/MM/YYYY hh:mm')
		}

		jui2.ui.dateField.proto.createdCallback.call(this)

		var $self = $(this), $table, self = this, id = this.juiid

		$table = $self.children('table')

		$self.find('table').css('display', 'none');

		$self.on('calendarshow', function(e, $elTable){
			$elTable.find('.j-datetime-item').remove()
			$elTable.find('thead tr:first-child').append('<th rowspan="2" class="j-datetime-item j-border-bot3" style="text-align: center; width: 100px;">Time</th>')
			$elTable.find('tbody tr:first-child').append('<td rowspan="5" class="j-datetime-item"></td>')
			var initVal = $self.val(),
			dt = initVal != '' ? moment(initVal, $self.attr('format')).format('hh:mm').split(':') : moment().format('hh:mm').split(':');
			$elTable.find('tbody tr:first-child .j-datetime-item').append(jui2.tmpl['dateTime']({
				hour: dt[0],
				minute: dt[1]
			}))
			this.timeControl($elTable)

			if($elTable.parent().width()<250)
				$elTable.parent().css('width', $table.width()+100)
			else
				$elTable.parent().css('width', $table.width())
		})

		$table.undelegate('td', 'click');

		$table.delegate('td', 'click', function(e){
			e.stopPropagation();
			var elNum = parseInt(this.innerHTML), $this = $(this),
			hour = $table.find('tbody tr:first-child .j-datetime-item .j-datetime-hour'),
			minute = $table.find('tbody tr:first-child .j-datetime-item .j-datetime-minute')

			if($this.index()<7 && $this.parent().parent().parent().parent().hasClass('j-modal-body')){
				if($this.parent().index()==0){
					if($this.nextAll().filter(function( index ) {
						return parseInt(this.innerHTML) < elNum
					}).length > 0){
						$table.find('thead tr:first-child th:nth-child(2)').text(moment($table.find('thead tr:first-child th:nth-child(2)').text(), "MMMM YYYY").subtract(1, 'month').format('MMMM YYYY'))
					}
				}
				else if($this.parent().index()==($this.parent().siblings().length)){
					if($this.prevAll().filter(function( index ) {
						return parseInt(this.innerHTML) > elNum
					}).length > 0){
						$table.find('thead tr:first-child th:nth-child(2)').text(moment($table.find('thead tr:first-child th:nth-child(2)').text(), "MMMM YYYY").add(1, 'month').format('MMMM YYYY'))
					}
				}
				$self.val(moment(('00'+elNum).slice(-2)+' '+$table.find('thead tr:first-child th:nth-child(2)').text()+' '+hour.val()+':'+minute.val(), 'DD MMMM YYYY hh:mm').format($self.attr('format')))
				var modal = $table.parent().parent()
				$table.detach().appendTo($self);
				modal.remove();
				$table.hide();
				/**
				 * Fires when datetime selected
				 * @event select
				 * @param {object} event Event object
				 * @param  {String} value Selected value
				 * @memberof datetimeField
				 * @example
				 * <j-datetimefield id="myDatetimefield1">Datetime</j-datetimefield>
				 * <script>
				 * $('#myDatetimefield1').on('select', function(e, value){
				 * 	console.log(value) // will print value you selected from datefield in javascript console
				 * })
				 * </script>
				 */
				$self.triggerHandler('select', [$self.val()]);
			}
		})
	}

	proto.timeControl = function($elTable){
		var topArrow = $elTable.find('tbody tr:first-child .j-datetime-item table tr:first-child i');
		var botArrow = $elTable.find('tbody tr:first-child .j-datetime-item table tr:nth-child(3) i');
		var hour = $elTable.find('tbody tr:first-child .j-datetime-item .j-datetime-hour')
		var minute = $elTable.find('tbody tr:first-child .j-datetime-item .j-datetime-minute')
		topArrow.eq(0).click(function(){
			var val = parseInt(hour.val());
			val++;
			if(val==24)
				val=0
			hour.val(val)
		})
		topArrow.eq(1).click(function(){
			var val = parseInt(minute.val())
			val++
			if(val==60)
				val=0
			minute.val(val)
		})
		botArrow.eq(0).click(function(){
			var val = parseInt(hour.val());
			val--;
			if(val==-1)
				val=23
			hour.val(val)
		})
		botArrow.eq(1).click(function(){
			var val = parseInt(minute.val())
			val--
			if(val==-1)
				val=59
			minute.val(val)
		})
	}

	proto.prevMonth = function(table){
		var time = table.find('tbody tr:first-child .j-datetime-item').clone()
		jui2.ui.dateField.proto.prevMonth.call(this, table);
		table.find('tbody tr:first-child').append(time)
		this.timeControl(table)
	}

	proto.nextMonth = function(table){
		var time = table.find('tbody tr:first-child .j-datetime-item').clone()
		jui2.ui.dateField.proto.nextMonth.call(this, table);
		table.find('tbody tr:first-child').append(time)
		this.timeControl(table)
	}

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var tagName = this.tagName, attrChange = jui2.attrChange, key = tagName.toLowerCase()+'_'+attrName;
		if(attrChange[key])
			attrChange[key](this, oldVal, newVal);
    	else if(attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
			attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.dateTimeField = {
		widget: document.registerElement('j-datetimefield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/loader.js****/

/**
 * @classdesc Extension for loading data from server/ajax
 * @class loader @extension table
 * @example <caption>Basic usage</caption>
 *
<j-table width="300px">
	<j-loader src="data.json"></j-loader>
	[
		[ "Fruit", "data 1", "data 2", "data 3"]
	]
</j-table>
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.generateData = function(target){
		var $parent = $(this).parent()
		$parent.attr('disabled', 'disabled');
		var param = this.param, self = this, $target = $(target);
		param.sEcho++
		param.rand = jui2.random(8, 'aA#')
		if(this.getAttribute('src'))
			$.getJSON(this.getAttribute('src'), param).done(function(data){
				if(param.sEcho==data.sEcho){
					param.totalPage = Math.ceil(param.iTotalRecords/param.iDisplayLength)
					jui2.clearNullFromJson(data.aaData);
					target.data = data.aaData
					self.targetGenerateData.call(target);
					$target.find('> div > table > thead > tr > th').filter(function(i, val){
						return val.innerHTML === '';
					}).hide().each(function(i,val){
						$target.find('> div > table > tbody > tr > td:nth-child('+(parseInt($(val).index())+1)+')').hide()
					});
					param.iTotalRecords = data.iTotalRecords
					self.afterDrawCall();
				}
			}).always(function(){
				$parent.removeAttr('disabled');
			})
		else if(this.getAttribute('fn'))
			window[this.getAttribute('fn')](param, function(data){
				if(param.sEcho==data.sEcho){
					param.totalPage = Math.ceil(param.iTotalRecords/param.iDisplayLength)
					jui2.clearNullFromJson(data.aaData);
					target.data = data.aaData;
					self.targetGenerateData.call(target);
					$target.find('> div > table > thead > tr > th').filter(function(i, val){
						return val.innerHTML === '';
					}).hide().each(function(i,val){
						$target.find('> div > table > tbody > tr > td:nth-child('+(parseInt($(val).index())+1)+')').hide()
					});
					param.iTotalRecords = data.iTotalRecords
					self.afterDrawCall();
				}
			}, function(){
				$parent.removeAttr('disabled');
			})
	}

	proto.setParam = function(name, value){
		this.param[name] = value;
	}

	proto.createdCallback = function(label, type) {
		//jui2.ui.base.proto.createdCallback.call(this, jui2.ui.loader);

		var self = this;

		this.afterDrawMethods = {};

		this.param = {
			sEcho: -1,
			iDisplayLength: self.getAttribute('size') || 10,
			iDisplayStart: 0,
			iSortCol: 0,
			sSearch: '',
			sSortDir: 'desc'
		}

		if(this.getAttribute('type') == 'j-table'){
			var target = $(this).parent();

			this.target = target[0]

			this.targetGenerateData = this.target.generateData

			this.target.generateData = function(){
				self.generateData.call(self, this);
			}

			this.target.generateData();
		}

		$(this).triggerHandler('created')

	};

	proto.afterDrawCall = function(){
		var self = this;
		$.each(this.afterDrawMethods, function(i, val){
			val.call(self)
		})
	}

	jui2.ui.loader = {
		widget: document.registerElement('j-loader',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/dataView.js****/

/**
 * @classdesc Dataview custom web component
 * @class dataView
 * @example <caption>Dataview basic usage</caption>
 * <j-dataview>
 *      [
 *         [ "apple", 4, 10, 2 ],
 *         [ "banana", 0, 4, 0 ],
 *         [ "grape", 2, 3, 5 ],
 *         [ "pear", 4, 2, 8 ],
 *         [ "strawberry", 0, 14, 0 ]
 *     ]
 * </j-dataview>
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)
/**
 * Generate dataView data
 * @method generateData
 * @memberof dataView
 * @return {object} this
 */
	proto.generateData = function(){
		var $self = $(this), mainTable = $self.children('.j-table-body').children('table').eq(0), tbody = mainTable.children('tbody'), self = this, thead = mainTable.children('thead');
		tbody.children('tr').remove();

		this.viewData = this.data

		$self.triggerHandler('beforedraw')

		tbody.append(jui2.tmpl['dataViewData']({data: this.viewData, type: this.type}));

		if(this.afterDrawCombo){
			if(typeof this.afterDrawCombo == 'function')
				this.afterDrawCombo()
		}

		// #TODO:0 Create drop as extension
		if(this.drop)
			if(this.drop.length > 0){
				for(i in this.drop){
					if(this.drop[i].getAttribute){
						if(this.drop[i].getAttribute('target') != null)
							tbody.find(' > tr > td:nth-child('+(parseInt(this.drop[i].getAttribute('target'))+1)+')').html(this.drop.eq(i).outerHTML())
					}
				}
			}

		//for combobox
		if($self.parent().parent().prop('tagName')=='J-COMBOFIELD')
			$self.find('j-resize').remove()

		var thCount = thead.find(' > tr:not(.j-custom-header)').eq(0).find(' > th').last().index() + 1 + (thead.find(' > tr:not(.j-custom-header)').eq(0).find(' > th[colspan]').map(function(){
		  return parseInt($(this).attr('colspan'))-1
		}).get()[0]||0);

		if(thCount > 0)
			tbody.find(' > tr > td:nth-child(n+'+(thCount+1)+')').remove();

		//remarks from :visible
		thCount = thead.find(' > tr:not(.j-custom-header)').eq(0).find(' > th').last().index() + 1 + (thead.find(' > tr:not(.j-custom-header)').eq(0).find(' > th[colspan]').map(function(){
		  return parseInt($(this).attr('colspan'))-1
		}).get()[0]||0);

		if(thCount > 0)
			tbody.find(' > tr > td:nth-child(n+'+(thCount+1)+')').remove();

		thead.find(' > tr:not(.j-custom-header)').eq(0).find(' > th').filter(function(){
			return $(this).text().trim() == ''
		}).each(function(i, val){
			val = $(val)
			tbody.find(' > tr > td:nth-child('+(parseInt(val.index())+1)+')').hide().attr('hide','true')
			val.hide()
		})

		$self.triggerHandler('self.afterdraw')
		$self.triggerHandler('afterdraw.height')
		/**
		 * Fire after data has been drawn
		 * @event afterdraw
		 * @param  {object} event Event object
		 * @memberof dataView
		 * @example
		 <j-table width="300px" title="Table" id="table1">
		 	[
		 		["Fruit", "data 1", "data 2", "data 3"]
		 	]
		 	<j-loader src="data.json"></j-loader>
		 </j-table>
		<script>
		$('#table1').on('afterdraw', function(){
			console.log('Data in table has been draw!')
		})
		</script>
		 */
		/*$(this).find('>.j-table-body > table > thead > tr > th').each(function(i, val){
			var $el = $(val)
			$el.children().outerWidth($el.width());
		})*/

		if(this.afterdrawCheck==false && this.firstDraw == true){
			this.firstDraw = false
			this.afterdrawIntervalCount = 0, this.afterdrawInterval = setInterval(function(){
				var events = jQuery._data( self, "events"), afterdrawLength = 1, fnAfterDraw;
				if($self.prop('tagName')=='J-DATAVIEW')
					afterdrawLength = 0;
				if(events != undefined)
					if(events.afterdraw)
						if(events.afterdraw.length > afterdrawLength){
							self.afterdrawCheck = true;
							$self.triggerHandler('afterdraw')

							if(self.getAttribute('onafterdraw')){
								fnAfterDraw = self.getAttribute('onafterdraw')
								if(typeof window[fnAfterDraw] == 'function')
									window[fnAfterDraw]()
							}
							clearInterval(self.afterdrawInterval);
						}
				if(!$.contains(document.documentElement, $self.get(0))){
					clearInterval(self.afterdrawInterval);
				}
			}, 250)
		}
		else{
			clearInterval(this.afterdrawInterval)
			$self.triggerHandler('afterdraw')
		}

		return this;
	}

	proto.createdCallback = function(type) {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.dataview);

		this.afterdrawCheck = false;
		this.firstDraw = true;
		var $self = $(this), data, regxp = /<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig/*, custom = $(this).children('j-custom').detach()*/;

		var text = $('<div>'+this.innerHTML+'</div>');
		text.children().remove()

		if(text[0].innerHTML.trim().replace(regxp, '') == "")
			data = data || [];
		else
			data = data || JSON.parse(text[0].innerHTML.replace(regxp, ''));

		text.remove();

		if(!this.data)
			this.data = data;

		this.type = type ? type : 'dataview'

		this.innerHTML = jui2.tmpl['dataView']();

		this.generateData();

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		var enabledAttrChange = ['disabled', 'width', 'height'];
		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
			if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, '', newVal);
		}

		Object.defineProperty(this.__proto__, 'record', {
			configurable: true,
			get: function(){
				return this.data;
			},
			set: function(data){
				this.data = data;
				this.generateData();
			}
		});

		$(this).triggerHandler('created')
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = ['disabled', 'width', 'height'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.dataview = {
		widget: document.registerElement('j-dataview',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/table.js****/

/**
 * @classdesc Table custom web component
 * @class table
 * @property {string} title Table title.
 * @property {boolean} disabled True to disabled. Dedault to true.
 * @property {string} onafterdraw Function name that will be executed after data generated (only work on data loaded from server/ajax or if table data is generated again with generateData function)
 * @augments dataView
 * @example <caption>Table usage</caption>
 *
<j-table width="300px">
	[
		[ "ID", "Fruit", "data 1", "data 2", "data 3"],
		[ 1, "apple", 4, 10, 2 ],
		[ 2, "banana", 0, 4, 0 ],
		[ 3, "grape", 2, 3, 5 ],
		[ 4, "pear", 4, 2, 8 ],
		[ 5, "strawberry", 0, 14, 0 ]
	]
</j-table>
 * @example <caption>Table with toolbar</caption>
 *
<j-table width="300px">
	<j-toolbar position="top">
		<j-button>My Button</j-button>
	</j-toolbar>
	<j-toolbar position="bottom">
		<j-spacer></j-spacer><j-button>My Button</j-button>
	</j-toolbar>
	[
		[ "ID", "Fruit", "data 1", "data 2", "data 3"],
		[ 1, "apple", 4, 10, 2 ],
		[ 2, "banana", 0, 4, 0 ],
		[ 3, "grape", 2, 3, 5 ],
		[ 4, "pear", 4, 2, 8 ],
		[ 5, "strawberry", 0, 14, 0 ]
	]
</j-table>
 * @example <caption>Table with onafterdraw example</caption>
 *
<script>
	function cls(e){
		console.log('Data has been drawn!');
	}
</script>
<j-table width="300px" title="Table" onafterdraw="cls">
	[
		["Fruit", "data 1", "data 2", "data 3"]
	]
	<j-loader src="data.json"></j-loader>
</j-table>
 */

/**
 * Fire after data has been drawn (only work on data loaded from server/ajax or if table data is generated again with generateData function)
 * @event afterdraw
 * @param  {object} event Event object
 * @memberof table
 * @example
 <j-table width="300px" title="Table" id="table1">
 	[
 		["Fruit", "data 1", "data 2", "data 3"]
 	]
 	<j-loader src="data.json"></j-loader>
 </j-table>
<script>
$('#table1').on('afterdraw', function(){
	console.log('Data in table has been draw!')
})
</script>
 */

(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.generateData = jui2.ui.dataview.proto.generateData

	proto.createdCallback = function() {
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.table);
		var $self = $(this),
		//custom = $(this).children('j-custom').detach(),
		drop = this.drop = $self.children('j-drop').detach().attr('type', 'j-table'),
		loader = this.loader = $self.children('j-loader').detach().attr('type', 'j-table'),
		header = this.header = $self.children('j-custom-header').detach().attr('type', 'j-table'),
		pagination = this.pagination = $self.children('j-pagination').detach(),
		toolbarBot = this.toolbar = $self.children('j-toolbar[position="bottom"]').detach(),
		toolbar = this.toolbar = $self.children('j-toolbar').detach(),
		data, cst, z, i, thCount = 0, th, $tbody, $thead,
		regxp = /<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig;

		var text = $('<div>'+this.innerHTML+'</div>');
		text.children().remove()

		if(text[0].innerHTML.trim().replace(regxp, '') == "")
			data = [];
		else
			data = JSON.parse(text[0].innerHTML.replace(regxp, ''));

		text.remove();

		this.aaData = data;

		var headCols = data.shift(), css = {
			'flex': 0,
			'-webkit-box-flex': 0,
			'-webkit-flex': 0,
			'display': 'block'
		}

		this.data = $.extend(true, [], data);

		$self.on('afterdraw.height', function(){
			var $self = $(this)
			if($self){
				if($self.attr('style')){
					if($self.attr('style').match(/height/ig)){
						if($self.attr('style').match(/height/ig).length == 0 && typeof $self.attr('height') == 'undefined'){
							$self.css(css)
						}
					}
					else{
						if(typeof $self.attr('height') == 'undefined'){
							$self.css(css)
						}
					}
				}
				else{
					if(typeof $self.attr('height') == 'undefined'){
						$self.css(css)
					}
				}
			}
		})

		$self.on('self.afterdraw', function(){
			$thead = $self.find('> .j-table-body > table:first-child > thead');
			$tbody = $self.find('> .j-table-body > table:first-child > tbody');

			var idx = $thead.find(' > tr > th').filter(function(){
				return $(this).text().trim() === ''
			}).index()

			$tbody.find(' > tr > td:nth-child('+(idx+1)+')').hide()

			$tbody.find( "> tr").click(function() {
				var $tr = $(this), $sel = $tr.find('td:visible').last().find('input[type=radio]')
				$self.triggerHandler('itemclick', [$self[0].data[$tr.index()]])
				if(jui2.ctrlPressed==false)
					$tr.addClass('j-active').siblings().removeClass('j-active')
				else{
					if($tr.hasClass('j-active'))
						$tr.removeClass('j-active')
					else
						$tr.addClass('j-active')
				}
				if($sel.length > 0){
					$sel.prop('checked', true)
				}
			})

			$thead.find(' > tr > th .j-table-sort').off('click').click(function(){
				if($self[0].loader.length>0){
					var param = $self[0].loader[0].param, index = $(this).parent().parent().index()
					if(param.iSortCol == index && param.sSortDir == 'asc'){
						param.sSortDir = 'desc'
					}
					else{
						param.sSortDir = 'asc'
					}
					param.iSortCol = index;
					$self[0].generateData();
				}
			})
		})

		jui2.ui.dataview.proto.createdCallback.call(this, 'table')

		$(this.children[0]).children().prepend( jui2.tmpl['tableHeader']({columns: headCols}) );

		$thead = $self.find('> .j-table-body > table:first-child > thead');
		$tbody = $self.find('> .j-table-body > table:first-child > tbody');

		$(this.children[0]).children().find('j-resize').on('afterresize', function(){
			var $self = $(this), w = $self.parent().outerWidth()
			$self.parent().parent().width(w)
			$self.css('left', '')
			$self.find('>j-table-fixedheader th div').filter(function(){
				return $(this).text().trim()==$self.parent().text().trim()
			}).css('width', '').parent().width(w)
			$thead.find(' > tr > th > div').each(function(i, val){
				$(val).css('width', '')
			})
		}).on('beforeresize', function(){
			var divs = $thead.find(' > tr > th > div'),
			ws = divs.map(function(i, val){
			  return $(val).width()
			}).get()
			divs.each(function(i, val){
				var $el = $(val)
				$el.width(ws[i]);
			})
		})

		var c = 0;

		$thead.find(' > tr > th').filter(function(i, val){
			return $(val).text() === '' || $(val).text() === ' ';
		}).hide().each(function(i,val){
			$tbody.find(' > tr > td:nth-child('+(parseInt($(val).index())+1)+')').hide()
			c++;
		});

		/*$(this).find('>.j-table-body > table > thead > tr > th').each(function(i, val){
			var $el = $(val)
			$el.children().outerWidth($el.width());
		})*/
		/*$(this).find('>.j-table-body > table > thead > tr > th j-resize').click(function(){
			$(this).find('>.j-table-body > table > thead > tr > th j-resize').each(function(i, val){
				var div = $(val).parent()
				div.outerWidth(div.parent().width())
			})
		});*/

		$self.append(loader)
		$self.append(header)

		if(pagination)
			$self.append(pagination)

		if(toolbar){
			toolbar.insertBefore($self.children('.j-table-body'))
		}

		if(toolbarBot){
			toolbarBot.insertAfter($self.children('.j-table-body'))
		}

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		var enabledAttrChange = ['title'];
		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
			if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, '', newVal);
		}

		/* active tr highlight */

		this.attrChangedCb(['disabled', 'width', 'height', 'title'])

		Object.defineProperty(this.__proto__, 'selectedIndex', {
			configurable: true,
			get: function(){
				var data = []
				$(this).find('> .j-table-body > table > tbody > tr.j-active').each(function(i, val){
					data.push($(val).index())
				})
				return data;
			}
		});

		Object.defineProperty(this.__proto__, 'selectedRecord', {
			configurable: true,
			get: function(){
				var data = [], self = this
				$(this).find('> .j-table-body > table > tbody > tr.j-active').each(function(i, val){
					data.push(self.data[$(val).index()])
				})
				return data;
			}
		});

		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function(){
				var data = [], self = this
				$(this).find('> .j-table-body > table > tbody > tr.j-active').each(function(i, val){
					data.push(self.data[$(val).index()])
				})
				return data;
			}
		});

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		this.attrChangedCb(false, attrName, oldVal, newVal)
		/*var attr = this.tagName.toLowerCase()+'_'+attrName;
		if(jui2.attrChange[attr])
			jui2.attrChange[attr](this, oldVal, newVal);
	    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      jui2.attrChange[attrName](this, oldVal, newVal);*/
	}

	jui2.ui.table = {
		widget: document.registerElement('j-table',  {
			prototype: proto
		}),
		proto: proto,
    extension: []
	}

	$(window).keydown(function(evt) {
		if (evt.keyCode == 17) {
			jui2.ctrlPressed = true;
		}
	}).keyup(function(evt) {
		if (evt.keyCode == 17) {
			jui2.ctrlPressed = false;
		}
	});

}(jQuery))
;
;/****js/tablePivotLeft.js****/

/**
 * @classdesc Pivot column extension for table widget
 * @class pivotLeft @extension table
 * @example <caption>basic usage</caption>
 *
<j-table width="300px" id="table">
	<j-custom target="2" width="150px">
	</j-custom>
	<j-loader src="data.json"></j-loader>
	[
		[ "Fruit", "data 1", "data 2", "data 3"]
	]
	<j-pagination>
	</j-pagination>
</j-table>
<j-table-pivot-left target="#table">
[0]
</j-table-pivot-left>
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.draw =  function(){
		var $self = $(this), $target = $($self.attr('target')).children('.j-table-body'), column = this.column,
		$table = $target.find('> table').clone(true), c = 0, w = 0;

		$self.empty().append($table);
		$self.find('th').each(function(i, val){
			if(column.indexOf(i) == -1){
				$self.find('table > tbody > tr > td:nth-child('+(i-c+1)+')').remove()
				$self.find('table > colgroup').eq((i-c)).remove()
				$(val).remove()
				c++;
			}
			else{
				$(val).outerWidth($target.find('thead > tr > th').eq(i).outerWidth());
				w += $target.find('thead > tr > th').eq(i).outerWidth()
			}
		})

		$target.children('table').find('td:nth-child(1)').each(function(i, val){
			var td = $self.find('table > tbody > tr:nth-child('+(i+1)+') > td:first-child')
			if(($(val).height()-9)<=9 && td.text().trim()==''){
				$self.find('table > tbody > tr:nth-child('+(i+1)+') > td:first-child').html('&nbsp')
			}
			td.css('height', $(val).css('height'))
		})

		/*$self.find('table > colgroup > col').each(function(i, val){
			w+=parseInt($(this).attr('width'))
		})*/

		$self.children('table').css('width', w)

		if($self.parent().children('j-table-pivot-top').length>0){
			if($self.parent().children('j-table-pivot-intersection').length==0){
				$self.parent().append('<j-table-pivot-intersection></j-table-pivot-intersection>')
			}
			var $intersection = $self.parent().children('j-table-pivot-intersection')
			$intersection.empty().append($self.parent().children('j-table-pivot-top').find('table').clone(true))
			$intersection.find('tr td:nth-child(n+'+($self.parent().children('j-table-pivot-left').find('tr:first-child > td').length+1)+')').remove()
			$intersection.find('tr th:nth-child(n+'+($self.parent().children('j-table-pivot-left').find('tr:first-child > td').length+1)+')').remove()
			$intersection.find('colgroup').remove()
			$intersection.children().css('width', $self.children().css('width'))
		}
	}

	proto.createdCallback = function() {

		var $self = $(this), $target = $($self.attr('target')).children('.j-table-body'), column;

		if(this.innerHTML.trim() == '')
			column = [];
		else
			column = JSON.parse(this.innerHTML);

		this.column = column

		$(this).appendTo($target)

		var lastScrollLeft = 0

		$target.scroll(function(){
			var st = $(this).scrollLeft();
			if (st != lastScrollLeft){
				$self.css('z-index', jui2.findHighestZIndex() == -Infinity? 100:jui2.findHighestZIndex())
				$self.parent().children('j-table-pivot-intersection').css('z-index', jui2.findHighestZIndex() == -Infinity? 100:jui2.findHighestZIndex())
			}
			else{
				$self.css('z-index', '')
			}

			lastScrollLeft = st

			$self.css('left', $(this).scrollLeft());
			$self.parent().children('j-table-pivot-intersection').css('left', $(this).scrollLeft());
			$self.css('top', '-'+$(this).scrollTop());
		})

		$($self.attr('target')).on('afterdraw', function(){
			$(this).find('> .j-table-body > j-table-pivot-left')[0].draw();
		})

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);*/
	}

	jui2.ui.tablePivotLeft = {
		widget: document.registerElement('j-table-pivot-left',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;;/****js/tablePivotTop.js****/

/**
 * @classdesc Pivot row extension for table widget
 * @class pivotTop @extension table
 * @example <caption>basic usage</caption>
 *
<j-table width="300px" id="table" height="150px">
	<j-loader src="data.json"></j-loader>
	[
		[ "Fruit", "data 1", "data 2", "data 3"]
	]
	<j-pagination>
	</j-pagination>
</j-table>
<j-table-pivot-top target="#table">
[0]
</j-table-pivot-top>
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.draw =  function(){
		var $self = $(this), $target = $($self.attr('target')).children('.j-table-body'), column = this.column,
		$table = $target.children('table').clone(true), c = 0, w = 0;
		$self.empty().append($table);

		$self.children().css('width', $target.css('width'))
		$self.find('tbody > tr').each(function(i, val){
			if(column.indexOf(i) == -1){
				$self.find('table > tbody > tr:nth-child('+(i-c+1)+')').remove()
				c++;
			}
			else{
				//console.log($target.find('> tbody > tr:nth-child('+(i-c+1)+') > td'), '> tbody > tr:nth-child('+(i-c+1)+') > td')
				$(val).children().css('height', $target.find('> table > tbody > tr:nth-child('+(i-c+1)+') > td').eq(0).css('height'));
			}
		})

		$self.children('table').css('width', $target.children('table').outerWidth())
		//$self.trigger('afterdraw')
		if($self.parent().children('j-table-pivot-left').length>0){
			if($self.parent().children('j-table-pivot-intersection').length==0){
				$self.parent().append('<j-table-pivot-intersection></j-table-pivot-intersection>')
			}
			var $intersection = $self.parent().children('j-table-pivot-intersection')
			$intersection.empty().append($self.find('table').clone(true))
			$intersection.find('tr td:nth-child(n+'+($self.parent().children('j-table-pivot-left').find('tr:first-child > td').length+1)+')').remove()
			$intersection.find('tr th:nth-child(n+'+($self.parent().children('j-table-pivot-left').find('tr:first-child > td').length+1)+')').remove()
			$intersection.find('colgroup').remove()
			$intersection.children().css('width', $self.parent().children('j-table-pivot-left').children().css('width'))
		}
	}

	proto.createdCallback = function() {

		var $self = $(this), $target = $($self.attr('target')).children('.j-table-body'), column;

		if(this.innerHTML.trim() == '')
			column = [];
		else
			column = JSON.parse(this.innerHTML);

		this.column = column

		$(this).appendTo($target)

		var lastScrollTop = 0

		$target.scroll(function(){
			var st = $(this).scrollTop();
			if (st != lastScrollTop){
				$self.css('z-index', jui2.findHighestZIndex() == -Infinity? 100:jui2.findHighestZIndex())
				$self.parent().children('j-table-pivot-intersection').css('z-index', jui2.findHighestZIndex() == -Infinity? 100:jui2.findHighestZIndex())
			}
			else{
				$self.css('z-index', '')
			}

			lastScrollTop = st;

			$self.css('left', '-'+$(this).scrollLeft());
			$self.css('top', $(this).scrollTop());
			$self.parent().children('j-table-pivot-intersection').css('top', $(this).scrollTop());
		})

		$($self.attr('target')).on('afterdraw', function(){
			$(this).find('> .j-table-body > j-table-pivot-top')[0].draw();
		})

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);*/
	}

	jui2.ui.tablePivotTop = {
		widget: document.registerElement('j-table-pivot-top',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;;/****js/tableForm.js****/

(function($){

/*********************** table form ******************************/
	var proto = Object.create(HTMLElement.prototype)
	
	proto.show = function(){
		
		var $self = $(this), $target = $($self.attr('target'))
		
		$self.appendTo($target)
		$target.children().not('.j-title').hide()
		$self.css('display', '');
		
	}
	
	proto.hide = function(){
		var $self = $(this), $target = $($self.attr('target'))
		$self.hide();
		$target.children().not(this).show()
	}
	
	proto.createdCallback = function() {
		
		var $self = $(this)
		
		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
		
		var data = {
			cancel: $self.attr('cancel') || 'Cancel',
			submit: $self.attr('submit') || 'Submit'
		}
		
		this.innerHTML = jui2.tmpl['tableForm'](data);
		
		$self.find('.j-table-form-cancel').click(function(){
			$(this).parent().parent()[0].hide();
		})
		
		$self.hide();
		
	};
	
	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);*/
	}
	
	jui2.ui.tableForm = {
		widget: document.registerElement('j-table-form',  { 
			prototype: proto
		}),
		proto: proto
	}

}(jQuery));;/****js/tableInPlaceForm.js****/

/**
 * @classdesc Inplace editable extension for table widget
 * @class tableInPlaceForm @extension table
 * @property {string} target jQuery selector that point to a j-table
 * @property {string} clicktarget jQuery selector that point to a j-table column that will show tableInPlaceForm if double clicked. Eg. 'td', 'td:nth-child(1)' etc.
 * @property {number} recordno New attribute for form field inside tableInPlaceForm. Record number from data loaded in j-table that will be inserted as value in form field.
 * @example <caption>basic usage</caption>
 *
<j-table id="table">
	<j-loader src="data.json"></j-loader>
	[
		[ "Fruit", "data 1", "data 2", "data 3"]
	]
	<j-pagination>
	</j-pagination>
</j-table>
<j-table-inplace-form id="tableForm" target="#table" clicktarget="td">
	<j-textfield recordno="0" id="fruit">Fruit</j-textfield>
	<j-textfield recordno="1" id="data1">Data 1</j-textfield>
	<j-textfield recordno="2" id="data2">Data 2</j-textfield>
	<j-textfield recordno="3" id="data3">Data 3</j-textfield>
</j-table-inplace-form>
<script>
	$('#tableForm').on('submit', function(e, form){
		console.log('Submiting Fruit : '+form.find('#fruit').val()+', Data 1 : '+form.find('#data1').val()+', Data 2 : '+form.find('#data2').val()+', Data 3 : '+form.find('#data3').val())
	})
</script>
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {
		var $self = $(this), $target = $($self.attr('target')), form = $self.html()

		this.form = form

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		var data = {
			cancel: $self.attr('cancel') || 'Cancel',
			submit: $self.attr('submit') || 'Submit'
		}

		this.form += jui2.tmpl['tableInPlaceForm'](data);

		$self.hide();

		$self.appendTo($target)

		$target.nodoubletapzoom()

		$target.on('self.afterdraw', function(e){
			$target.find('> .j-table-body > table > tbody > tr > '+$self.attr('clicktarget')).on('dblclick doubletap', function(event){
				var tr = $(this).parent()
				if(tr.find('.j-table-inplace-form').length == 0){
					tr.children().hide()
					tr.append('<td class="j-table-inplace-form" colspan="'+tr.children().length+'">'+$self[0].form+'</td>')
					tr.children('.j-table-inplace-form').find('*').not('j-toolbar').each(function(i, val){
						var el = $(val)
						if(el.attr('recordno')){
							el.val($target[0].data[tr.index()][el.attr('recordno')])
						}
					})
					tr.find('.j-table-form-cancel').on('click', function(){
						var el = $(this).parent().parent()
						el.parent().children(":not([hide=true])").show()
						/**
						 * Fires when cancel button clicked
						 * @event cancel
						 * @param {object} event Event object
						 * @param  {Object} el jQuery object
						 * @memberof tableInPlaceForm @extension table
						 */
						$self.triggerHandler('cancel', [el])
						el.remove()
					})
					tr.find('.j-table-form-submit').on('click', function(){
						var el = $(this).parent().parent()
						el.parent().children(":not([hide=true])").show()
						/**
						 * Fires when submit button clicked
						 * @event submit
						 * @param {object} event Event object
						 * @param  {Object} el jQuery object
						 * @memberof tableInPlaceForm @extension table
						 */
						$self.triggerHandler('submit', [el])
						//el.remove()
					})
					tr.children('.j-table-inplace-form').width($target.find('> .j-table-body > table').width());
					$self.triggerHandler('afterdraw', [$target[0].data[tr.index()]])
				}
			})
		})

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
	}

	jui2.ui.tableInPlaceForm = {
		widget: document.registerElement('j-table-inplace-form',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/tableCustom.js****/

// #DOING:100 Recreating j-custom for table as extension
(function($){

	jui2.ui.tableCustom = function(self) {
		var $self = $(self), jCustom = $self.find('> j-custom').detach(), $table, tmpData = [], colgroup = [], th;

		$self.on('beforedraw', function(){
			$table = $self.find('> .j-table-body > table:first-child');
			tmpData = []
			if(jCustom){
				if($table.find(' > colgroup').length == 0){
					if(jCustom.length>0){
						th = $table.find(' > thead > tr:last-child th')
						/*if(th.length==0)
							th = $table.find(' > tbody > tr:last-child td')*/
						th.each(function(z, val){
							var $val = $(val), cst = jCustom.filter( "[target='"+z+"']" ),
							w = $val.width(), attr;

							if(cst.length == 0){
								attr = jCustom.eq(z).attr('target')
								if(typeof attr === typeof undefined || attr === false){
									cst = jCustom.eq(z)
								}
							}

							if(cst.length > 0){
								w = cst.attr('width')
								if(val.innerHTML != ''){
									//colgroup += '<colgroup><col width="'+w+'"></col></colgroup>';
									$val.width(w)
								}
							}
						})
						$table.css('table-layout', 'fixed');
						/*th.each(function(z, val){
							$(val).children().width($(val).width())
							//$(val).css("width", '');
						})*/
					}
				}
				if(jCustom.length > 0){
					var dataLoop = $self[0].viewData
					for(z in dataLoop){
						if(dataLoop.hasOwnProperty(z)){
							tmpData[z] = []
							for (i in dataLoop[z]){
								if(dataLoop[z].hasOwnProperty(i)){
									var cst = jCustom.filter( "[target='"+i+"']" );

									if(cst.length == 0){
										var attr = jCustom.eq(i).attr('target')
										if(typeof attr === typeof undefined || attr === false)
											cst = jCustom.eq(i)
									}

									if(cst.length > 0 && cst.html().trim() != ''){
										if(!cst[0].fn)
											cst[0].fn = eval('fn = '+cst.html().replace(/&lt;/g, '<')
												.replace(/&gt;/g, '>')
												.replace(/&amp;/g, '&'));
										tmpData[z][i] = cst[0].fn(dataLoop[z]);
									}
									else{
										tmpData[z][i] = dataLoop[z][i];
									}
								}
							}
						}
					}
				}
				else{
					tmpData = $self[0].viewData;
				}
			}
			else{
				tmpData = $self[0].viewData;
			}
			$self[0].viewData = tmpData;
		})
	}

	jui2.ui.table.extension.push(jui2.ui.tableCustom)

}(jQuery))
;
;/****js/tableWrap.js****/

(function($) {

  jui2.ui.tableWrap = function(self) {
    self.enabledAttrChange.push('word-wrap');
    jui2.attrChange['word-wrap'] = function(el, oldVal, newVal) {
      if(newVal == 'true'){
        el.tableWrap = function(){
          $(el).find('> .j-table-body > table > thead > tr > th').each(function(i, val){
            $(el).find('> .j-table-body > table > colgroup > col').eq(i).width($(val).outerWidth())
          })
          $(el).find('> .j-table-body > table > tbody > tr > td').css({
            'word-wrap': 'break-word',
            'white-space': 'normal'
          });
        }
        el.tableWrap()
        $(el).on('self.afterdraw', el.tableWrap);
      }
      else{
        $(el).find('> .j-table-body > table > tbody > tr > td').css({
          'word-wrap': '',
          'white-space': ''
        });
        $(el).unbind('self.afterdraw', el.tableWrap);
      }
    }
  }

  jui2.ui.table.extension.push(jui2.ui.tableWrap)

}(jQuery))
;;/****js/drop.js****/

(function($){

/*********************** drop ******************************/

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {

		this.className += ' fa fa-plus-square-o';

		/*
		for(i in jui2.method){
			this[i] = jui2.method[i];
		}*/

		var self = this;

		if(this.getAttribute('type') == 'j-table'){
			$(this).parent().click(function(){
				var nextEl = $(this).parent().next()
				var openedDrop = $(this).parent().find('> td > j-drop[type="j-table"].fa-minus-square-o').not($(this).children());
				if(openedDrop.length > 0){
					nextEl.remove()
					openedDrop.removeClass('fa-minus-square-o').addClass('fa-plus-square-o')
					nextEl = $(this).parent().next()
				}
				if(nextEl.hasClass('j-drop')){
					nextEl.remove()
					$(self).removeClass('fa-minus-square-o').addClass('fa-plus-square-o')
				}
				else{
					var targetEl = $(this).parent()
					var tr = $('<tr class="j-drop"><td colspan="'+targetEl.children().length+'"></td></tr>').insertAfter(targetEl)
					window[self.getAttribute('onclick')](tr, targetEl.parent().parent().parent().parent()[0].aaData[targetEl.index()-targetEl.prevAll('.j-drop').length]||targetEl.parent().parent().parent().parent()[0].data[targetEl.index()-targetEl.prevAll('.j-drop').length])
					$(self).removeClass('fa-plus-square-o').addClass('fa-minus-square-o')
				}
			}).css('cursor', 'pointer')
		}

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = [];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.drop = {
		widget: document.registerElement('j-drop',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;;/****js/toolbar.js****/

(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		var self = this;
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.toolbar);

		$(this).addClass('j-horizontal-flex')

		this.attrChangedCb()

		/*for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue, name = this.tagName.toLowerCase()+'_'+attrName;
			if(jui2.attrChange[name])
				jui2.attrChange[name](this, false, newVal);
			else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, false, newVal);
		}*/
	};

	//#TODO:0 Fixing toolbar to support table as extension
	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		this.attrChangedCb(false, attrName, oldVal, newVal)
		/*var name = this.tagName.toLowerCase()+'_'+attrName;
		if(jui2.attrChange[name])
			jui2.attrChange[name](this, oldVal, newVal);
	    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      jui2.attrChange[attrName](this, oldVal, newVal);*/
	}

	jui2.ui.toolbar = {
		widget: document.registerElement('j-toolbar',  {
			prototype: proto
		}),
		proto: proto,
    extension: []
	}

}(jQuery))
;
;/****js/toolbarScroll.js****/

(function($) {

  jui2.ui.toolbarScroll = function(self) {
    self.enabledAttrChange.push('toolbarscroll');

    jui2.attrChange['toolbarscroll'] = function(el, oldVal, newVal) {
      if (newVal.toLowerCase() == 'true') {

    		$(self).on('DOMNodeInserted', function(){
    			var elements = $(self).find('> *:not(.toolbarscroll-left):not(.toolbarscroll-right)')
    			elements.css('margin', '0px 2px')
    		  //elements.last().css('margin-right', '20px')
    		  elements.first().css('margin-left', '20px')
    		})

        $(el).css({
          position: 'relative'
        });
        $(el).scrollLeft(0);
        $(el).append('<j-button class="toolbarscroll-left" style="margin: 0px; left: 0px;position: absolute;top: 0px; height: 100%; border: 0px; border-right: 1px solid #d8d8d8; padding-top: 8px; width: 20px; background: inherit; text-align: center;" icon="fa-caret-left"></j-button>')
        $(el).append('<j-button class="toolbarscroll-right" style="margin: 0px; right: 0px;position: absolute;top: 0px; height: 100%; border: 0px; border-left: 1px solid #d8d8d8; padding-top: 8px; width: 20px; background: inherit; text-align: center;" icon="fa-caret-right"></j-button>')
        $(el).append('<div class="toolbarscroll-right-space" style="padding-right: 16px;">&nbsp</div>')

        $(el).children('.toolbarscroll-left').css('left', $(el).scrollLeft())
        $(el).children('.toolbarscroll-right').css('right', '-' + $(el).scrollLeft().toString() + 'px')

        var timeoutId, time, mdown;
        $(el).children('.toolbarscroll-left').bind('mousedown', function() {
          time = 250
          mdown = function() {
            $(el).scrollLeft($(el).scrollLeft() - 20)
            if ($(el).scrollLeft() < 0)
              $(el).scrollLeft(0)
            $(el).children('.toolbarscroll-left').css('left', $(el).scrollLeft())
            $(el).children('.toolbarscroll-right').css('right', '-' + $(el).scrollLeft().toString() + 'px')
            if (time > 0)
              time = time - 50;
            timeoutId = setTimeout(mdown, time);
          }
          mdown()
        })
        $(el).children('.toolbarscroll-right').bind('mousedown', function() {
          time = 250
          mdown = function() {
            $(el).scrollLeft($(el).scrollLeft() + 20)
            var max = el.scrollWidth - $(el).width() + 40
            if ($(el).scrollLeft() > max)
              $(el).scrollLeft(max)
            $(el).children('.toolbarscroll-left').css('left', $(el).scrollLeft())
            $(el).children('.toolbarscroll-right').css('right', '-' + $(el).scrollLeft().toString() + 'px')
            if (time > 0)
              time = time - 50;
            timeoutId = setTimeout(mdown, time);
          }
          mdown()
        })
        $(el).on('DOMMouseScroll mousewheel', function(e){
          var wheel = 0;
          if(e.originalEvent.wheelDelta)
            wheel = e.originalEvent.wheelDelta
          if(e.originalEvent.deltaY)
            wheel = e.originalEvent.deltaY
          if(e.originalEvent.detail)
            wheel = e.originalEvent.detail

          if(wheel>0){
            $(el).scrollLeft($(el).scrollLeft() + 20)
            var max = el.scrollWidth - $(el).width() + 40
            if ($(el).scrollLeft() > max)
              $(el).scrollLeft(max)
            $(el).children('.toolbarscroll-left').css('left', $(el).scrollLeft())
            $(el).children('.toolbarscroll-right').css('right', '-' + $(el).scrollLeft().toString() + 'px')
          }
          else{
            $(el).scrollLeft($(el).scrollLeft() - 20)
            if ($(el).scrollLeft() < 0)
              $(el).scrollLeft(0)
            $(el).children('.toolbarscroll-left').css('left', $(el).scrollLeft())
            $(el).children('.toolbarscroll-right').css('right', '-' + $(el).scrollLeft().toString() + 'px')
          }

          return false;
        })

        $('body').bind('mouseup', function() {
          clearTimeout(timeoutId);
        });
      }
      else{
  			var elements = $(self).find('> *:not(.toolbarscroll-left):not(.toolbarscroll-right)')
  			elements.css('margin', '0px 2px')
      }
    }
  }

  jui2.ui.toolbar.extension.push(jui2.ui.toolbarScroll)

}(jQuery))
;;/****js/tooltip.js****/
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		var $self = $(this), self = this

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.tooltip);

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		this.target = $($self.attr('target'));
		this.tooltip = $self.attr('tooltip');
		this.currentEl = false;

		$('body').on('mousemove.'+$self.attr('id'), $.throttle( 250, function(e){
			var show = self.target.is(e.target), target = $(e.target);
			if(show==false){
				var target = self.target.filter(target.parents())
			 	if(target.length > 0)
					show = true
			}
		  if(show){
				if(self.currentEl[0] != target[0]){
					self.currentEl = target;
					var offset = target.offset(), left;
					$('.j-tooltip').remove()
					$('body').append('<j-modal class="j-tooltip" center="false"></j-modal>');

					(typeof self.tooltip == 'string') ? $('.j-tooltip').append(self.tooltip) : self.tooltip($('.j-tooltip'))

					/*if(typeof self.tooltip == 'string'){
						$('.j-tooltip').append(self.tooltip)
					}
					else {
						self.tooltip($('.j-tooltip'))
					}*/

					left = (offset.left+$('.j-tooltip').outerWidth()>$(window).width()) ? offset.left-$('.j-tooltip').outerWidth() : offset.left+(target.outerWidth()/2)-($('.j-tooltip').outerWidth()/2)

					/*if(offset.left+$('.j-tooltip').outerWidth()>$(window).width())
						left = offset.left-$('.j-tooltip').outerWidth()
					else
						left = offset.left+(target.outerWidth()/2)-($('.j-tooltip').outerWidth()/2)*/
					$('.j-tooltip').offset({left: left, top: offset.top-$('.j-tooltip').outerHeight()})
				}

				if($self.closest('body').length == 0){
					$('body').off('mousemove.'+$self.attr('id'));
				}
			}
			else{
				$('.j-tooltip').remove()
			}
		}))

		this.enabledAttrChange = $.unique(this.enabledAttrChange.concat([]));

		var attrChange = jui2.attrChange

    for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue, attr = this.tagName.toLowerCase()+'_'+attrName;
      if(attrChange[attr])
  			attrChange[attr](this, false, newVal);
      else if(attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
        attrChange[attrName](this, false, newVal);
		}
	};

	proto.setText = function(text){
		var offset = this.currentEl.offset(), left, jtooltip = $('.j-tooltip');
		jtooltip.empty().append(text);
		if(offset.left+jtooltip.outerWidth()>$(window).width())
			left = offset.left-jtooltip.outerWidth()
		else
			left = offset.left+(this.currentEl.outerWidth()/2)-(jtooltip.outerWidth()/2)
		jtooltip.offset({left: left, top: offset.top-jtooltip.outerHeight()})
	}

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var attr = this.tagName.toLowerCase()+'_'+attrName, attrChange = jui2.attrChange;
		if(attrChange[attr])
			attrChange[attr](this, oldVal, newVal);
    else if(attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
      attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.tooltip = {
		widget: document.registerElement('j-tooltip',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/scroll.js****/

(function($){

/*********************** scroll ******************************/
	var proto = Object.create(HTMLElement.prototype)
	
	proto.createdCallback = function() {
		
		this.innerHTML = jui2.tmpl['scroll']();
		
		var $parent = $(this).parent()
		
		if($parent.prop("tagName").toLowerCase() == 'j-table'){
			$(this).children().children().outerWidth($(this).prev().outerWidth(true))
			$(this).outerWidth($(this).prev().outerWidth(true))
			$(this).children().outerWidth($parent.width())
			
			$parent.children('j-scroll').children().scroll(function(e){
				$parent.scrollLeft($parent.children('j-scroll').children().scrollLeft());
				$parent.children().not('table, j-scroll').css('left', $parent.children('j-scroll').children().scrollLeft());
				$parent.children('j-scroll').children().css('left', $parent.children('j-scroll').children().scrollLeft());
			})
			
			$(this).height($parent.children('j-scroll').children().height());
				$parent.scrollLeft('0px');
		}
		
	};
	
	jui2.ui.scroll = {
		widget: document.registerElement('j-scroll',  { 
			prototype: proto
		}),
		proto: proto
	}

}(jQuery));;/****js/pagination.js****/

/**
 * @classdesc Pagination extension for table widget
 * @class pagination @extension table
 * @example <caption>basic usage</caption>
 *
 <j-table width="300px">
 	<j-loader src="data.json"></j-loader>
 	[
 		[ "Fruit", "data 1", "data 2", "data 3"]
 	]
 	<j-pagination>
 	</j-pagination>
 </j-table>
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {

		var self = this, $self = $(this);

		jui2.ui.toolbar.proto.createdCallback.call(this)

		$self.addClass('j-bg1 j-border-top1 j-horizontal-flex j-pad1 j-min-height border-box')

		this.innerHTML = jui2.tmpl['pagination']();

		var target = null;

		target = (this.getAttribute('target') != null) ? $(this.getAttribute('target'))[0] : $(this).parent().children('j-loader')[0]

		/*if(this.getAttribute('target') != null){
			target = $(this.getAttribute('target'))[0]
		}
		else{
			target = $(this).parent().children('j-loader')[0]
		}*/

		if(target){

			var $self = $(self);

			var margin = ($self.outerHeight(true)+6).toString()+'px', param = target.param

			$self.children('.fa-angle-left').click(function(){
				param.iDisplayStart = parseInt(param.iDisplayStart)
				param.iDisplayLength = parseInt(param.iDisplayLength)
				$self.parent().attr('disabled', 'disabled');
				param.iDisplayStart -= param.iDisplayLength
				if(param.iDisplayStart<0)
					param.iDisplayStart = 0
				target.target.generateData();
			})

			$self.parent().resize(function(){
				$(this).children('j-pagination').outerWidth($(this).width())
			});

			$self.children('.fa-refresh').click(function(){
				target.target.generateData();
			})
			$self.children('.fa-angle-right').click(function(){
				$self.parent().attr('disabled', 'disabled');
				param.iDisplayStart = parseInt(param.iDisplayStart)
				param.iDisplayLength = parseInt(param.iDisplayLength)
				param.iTotalRecords = parseInt(param.iTotalRecords)
				param.iDisplayStart += param.iDisplayLength
				if(param.iDisplayStart>=param.iTotalRecords)
					param.iDisplayStart -= param.iDisplayLength
				target.target.generateData();
			})

			$self.children('.j-gotopage').on('keydown', function(e){
				if(e.keyCode == 13){
					param.iDisplayLength = parseInt(param.iDisplayLength)
					param.iDisplayStart = $(this).val()*param.iDisplayLength-param.iDisplayLength
					target.target.generateData();
				}
			})

			$self.children('.j-itemPerPage').on('select', function(e, val){
				param.iDisplayLength = parseInt(val);
				target.target.generateData();
			})

			target.afterDrawMethods['pagination'] = function(){
				$self.children('.j-pageof').text(' of '+Math.ceil(param.iTotalRecords/param.iDisplayLength));
				$self.children('.j-gotopage').val(Math.ceil(param.iDisplayStart/param.iDisplayLength)+1);
				var total = param.iTotalRecords+' items '
				if(total == 'NaN items ')
					total = ''
				$self.children('.j-total').text(param.iTotalRecords+' items ');

				$self.find('.j-itemPerPage j-toolbar').remove()
			}

			target.afterDrawMethods['pagination']();

		}

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = [];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.pagination = {
		widget: document.registerElement('j-pagination',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/layoutContent.js****/

(function($){

/*********************** layout Content ******************************/
	var proto = Object.create(HTMLElement.prototype)
	
	proto.createdCallback = function() {
		
		/*this.iconPosition = 'afterBegin';
		
		if(this.innerHTML.trim() == '')
			this.innerHTML = 'Button'
		
		if(this.getAttribute('icon'))
			this.innerHTML = '<i class="fa '+this.getAttribute('icon')+'"></i> '+this.innerHTML
		
		for(i in jui2.method){
			this[i] = jui2.method[i];
		}*/
		
		$('<j-layout-no-resizer></j-layout-no-resizer>').insertAfter(this)
		
		var enabledAttrChange = ['resize'];
		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
			if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, '', newVal);
		}
		
	};
	
	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = ['resize'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}
	
	jui2.ui.layoutContent = {
		widget: document.registerElement('j-layout-content',  { 
			prototype: proto
		}),
		proto: proto
	}

}(jQuery));;/****js/layoutResizer.js****/

(function($){

/*********************** layout Resizer ******************************/
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		/*this.iconPosition = 'afterBegin';

		if(this.innerHTML.trim() == '')
			this.innerHTML = 'Button'

		if(this.getAttribute('icon'))
			this.innerHTML = '<i class="fa '+this.getAttribute('icon')+'"></i> '+this.innerHTML

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}*/

		var $el = $(this)

	};

	/*proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = ['resize'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}*/

	jui2.ui.layoutResizer = {
		widget: document.registerElement('j-layout-resizer',  {
			prototype: proto
		}),
		proto: proto
	}

	$( document ).ready(function() {
		var $body = $('body'), body = $body[0]
		$.data(body, 'jui2.drag.el', false)
		$body.on('mousedown', function(e){
			var d;
			if($(e.target).hasClass('j-drag')){
				d = true;
				$.data(body, 'jui2.drag.el', $(e.target))
			}
			if($(e.target).parents('.j-drag').length>0){
				d = true;
				$.data(body, 'jui2.drag.el', $(e.target).parents('.j-drag').eq(0))
			}
			var el =$.data(body, 'jui2.drag.el')
			if(el != false){
				el.addClass('j-dragging')
				el.css('z-index', jui2.findHighestZIndex())
				var offset = el.offset(),
				clientX = offset.left,
				clientY = offset.top
				$.data(body, 'jui2.drag.el.offset', {x: clientX, y: clientY})
				$.data(body, 'jui2.drag.pos', {x: 0, y: 0})
			}
		})

		.on('mousemove', function(e){
			var el = $.data(body, 'jui2.drag.el')
			if($.data(body, 'jui2.drag.el') != false){
				$body.addClass('j-disable-select')
				var offset = $.data(body, 'jui2.drag.el.offset'),
				mouseX = e.clientX + $(document).scrollLeft(),
				mouseY = e.clientY + $(document).scrollTop(),
				x = mouseX > offset.x ? parseInt(mouseX) - parseInt(offset.x) : '-'+(parseInt(offset.x) - parseInt(mouseX)),
				y = mouseY > offset.y ? parseInt(mouseY) - parseInt(offset.y) : '-'+(parseInt(offset.y) - parseInt(mouseY))
				$.data(body, 'jui2.drag.pos', {x: x, y: y})
				if(el.prop('tagName') == 'J-LAYOUT-RESIZER'){
					if(el.parent().prop('tagName') == 'J-LAYOUT-HORIZONTAL'){
						el.css('transform', 'translate3d( '+x+'px, 0px, 0px)')
						$body.css('cursor', 'w-resize');
					}
					else{
						el.css('transform', 'translate3d(0px, '+y+'px,  0px)')
						$body.css('cursor', 'n-resize');
					}
				}
				else{
					el.trigger('jui2.drag', [{x: x, y: y}, {x: mouseX, y: mouseY}])
					el.css('transform', 'translate3d( '+x+'px, '+y+'px,  0px)')
				}
			}
		})

		.on('mouseup', function(e){
			var el = $.data(body, 'jui2.drag.el')
			if(el){
				var pos = $.data(body, 'jui2.drag.pos'),
				mouseX = e.clientX + $(document).scrollLeft(),
				mouseY = e.clientY + $(document).scrollTop()
				if(el.prop('tagName') == 'J-LAYOUT-RESIZER'){
						$body.css('cursor', '');
						if(el.parent().prop('tagName') == 'J-LAYOUT-HORIZONTAL'){
							var nWidth = parseInt(el.next().width())
							el.prev().width(parseInt(el.prev().width()) + parseInt(pos.x))
							.css('flex-grow', '0')
							if(el.next().prop('resize') != true){
								el.next().width(nWidth - parseInt(pos.x))
							}
						}
						else{
							var nHeight = parseInt(el.next().height())
							el.prev().height(parseInt(el.prev().height()) + parseInt(pos.y))
							.css('flex-grow', '0')
							if(el.next().prop('resize') != true){
								el.next().height(nHeight - parseInt(pos.y))
							}
						}
				}
				else{
					el.trigger('jui2.drop', [{x: pos.x, y: pos.y}, {x: mouseX, y: mouseY}]);
				}
				el.css('transform', '')
				el.removeClass('j-dragging')
				$.data(body, 'jui2.drag.el', false)
				$body.removeClass('j-disable-select')
				el.css('z-index', '')
			}
		})
	})

}(jQuery));
;/****js/colorPicker.js****/

/**
 * @classdesc Color picker custom web component
 * @class colorPicker
 * @example <caption>Color picker widget basic usage</caption>
 * <j-colorPicker id="date">Pick Color</j-colorPicker>
 * @augments textField
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.colorPicker);

		var $self = $(this);

		this.setAttribute("icon", "fa-square");

		jui2.ui.textField.proto.createdCallback.call(this, '')

		$self.bind( "clickout", function(e){
			if($(e.target).parents('j-colorPicker').length == 0 && $(e.target).parents('[belongto=j-colorPicker]').length == 0){
				$('#j-colorPicker-'+$self.attr('id')).remove();
				if($(e.target).parents('j-colorpicker, [belongto=j-colorPicker]').length == 0 && $(e.target).parents('j-colorpicker')[0] != $self[0])
					$('[belongto=j-colorPicker]').remove()
			}
		});

		$self.click(function(e){
			if($(e.target).prop('tagName') == 'J-BUTTON'){
				$('#j-colorPicker-'+$self.attr('id')).remove();
			}
			else if($self.find('canvas').length > 0){
				if($(e.target).parents('.j-canvas-pallete').length == 0)
					$('#j-colorPicker-'+$self.attr('id')).remove();
			}
			else{
				$self.append('<div class="j-canvas-pallete"><canvas width="284" height="155"></canvas><div><div></div>Hex:<br/><input class="j-colorPallete-hex"></input><br/><br/><j-button>Pick</j-button></div></div>');
				//RGB:<br/><input class="j-colorPallete-rgb"></input>
				var $colors  = $self.find('canvas'),
				colorctx = $colors[0].getContext('2d'), colorEventX, colorEventY;

				var getColor = function(e) {
					var newColor,
					imageData = colorctx.getImageData(colorEventX, colorEventY, 1, 1), picker = $('#j-colorPicker-'+$self.attr('id'));
					//selectedColor = 'rgb(' + imageData.data[0] + ', ' + imageData.data[1] + ', ' + imageData.data[2] + ')';
					//$self.find('.j-colorPallete-rgb').val(selectedColor)
					//picker.find('.j-colorPallete-hex').val("#" + componentToHex(imageData.data[0]) + componentToHex(imageData.data[1]) + componentToHex(imageData.data[2]))
					picker.find('.j-canvas-pallete > div > div').css('background', "#" + componentToHex(imageData.data[0]) + componentToHex(imageData.data[1]) + componentToHex(imageData.data[2]));
				};

				var setColor = function(e) {
					var newColor,
					imageData = colorctx.getImageData(colorEventX, colorEventY, 1, 1), picker = $('#j-colorPicker-'+$self.attr('id'));
					//selectedColor = 'rgb(' + imageData.data[0] + ', ' + imageData.data[1] + ', ' + imageData.data[2] + ')';
					//$self.find('.j-colorPallete-rgb').val(selectedColor)
					picker.find('.j-colorPallete-hex').val("#" + componentToHex(imageData.data[0]) + componentToHex(imageData.data[1]) + componentToHex(imageData.data[2]))
					picker.find('.j-canvas-pallete > div > div').css('background', picker.find('.j-colorPallete-hex').val());
					picker.find('.j-colorPallete-hex').attr('hex', picker.find('.j-colorPallete-hex').val());
				};

				var componentToHex = function(c) {
					var hex = c.toString(16);
					return hex.length == 1 ? "0" + hex : hex;
				}

				var gradient = colorctx.createLinearGradient(0, 0, $colors.width(), 0);
				// Create color gradient
				gradient.addColorStop(0,    "rgb(255,   0,   0)");
				gradient.addColorStop(0.15, "rgb(255,   0, 255)");
				gradient.addColorStop(0.33, "rgb(0,     0, 255)");
				gradient.addColorStop(0.49, "rgb(0,   255, 255)");
				gradient.addColorStop(0.67, "rgb(0,   255,   0)");
				gradient.addColorStop(0.84, "rgb(255, 255,   0)");
				gradient.addColorStop(1,    "rgb(255,   0,   0)");
				// Apply gradient to canvas
				colorctx.fillStyle = gradient;
				colorctx.fillRect(0, 0, colorctx.canvas.width, colorctx.canvas.height);

				// Create semi transparent gradient (white -> trans. -> black)
				gradient = colorctx.createLinearGradient(0, 0, 0, $colors.height());
				gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
				gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
				gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
				gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");
				// Apply gradient to canvas
				colorctx.fillStyle = gradient;
				colorctx.fillRect(0, 0, colorctx.canvas.width, colorctx.canvas.height);
				var z = jui2.findHighestZIndex()
				$colors.parent().css('z-index', z == '-Infinity' ? 100 : z);

				$self.find('.j-colorPallete-hex').val('#ffffff');
				$self.find('.j-colorPallete-hex').attr('hex', '#ffffff');

				$self.find('j-button').click(function(){
					var picker = $('#j-colorPicker-'+$self.attr('id'));
					$self.val(picker.find('.j-colorPallete-hex').attr('hex'));
					$self.find('i').css('color', picker.find('.j-colorPallete-hex').attr('hex'));
					$('#j-colorPicker-'+$self.attr('id')).remove();
				})

				$colors.mousemove(function(e) {
					colorEventX = e.pageX - $colors.offset().left;
					colorEventY = e.pageY - $colors.offset().top;
					getColor(e);
				});

				$colors.mouseout(function(e) {
					var picker = $('#j-colorPicker-'+$self.attr('id'));
					picker.find('.j-canvas-pallete > div > div').css('background', picker.find('.j-colorPallete-hex').attr('hex'));
					picker.find('.j-colorPallete-hex').val(picker.find('.j-colorPallete-hex').attr('hex'));
				});

				$colors.click(function(e) {
					colorEventX = e.pageX - $colors.offset().left;
					colorEventY = e.pageY - $colors.offset().top;
					setColor(e);
				});
				$('body').append('<j-modal belongto="j-colorPicker" snapto="#'+$self.attr('id')+' > input" snappos="topleft to bottomleft" id="j-colorPicker-'+$self.attr('id')+'"></j-modal>');
				setTimeout(function(){
					if($('#j-colorPicker-'+$self.attr('id')).touchBottom()){
						$('#j-colorPicker-'+$self.attr('id')).attr('snappos', 'bottomleft to topleft')
						setTimeout(function(){
							if($('#j-colorPicker-'+id).touchTop())
								$('#j-colorPicker-'+id).attr('snappos', 'topleft to bottomleft')
						}, 250);
					}
				}, 250);
				$colors.parent().detach().appendTo('#j-colorPicker-'+$self.attr('id'))
			}
		})

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.colorPicker = {
		widget: document.registerElement('j-colorPicker',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/textarea.js****/

(function($){


/**
 * @classdesc textarea custom web component
 * @class textArea
 * @example <caption>TexaArea basic usage</caption>
 * <j-textarea><Textarea/j-textarea>
 */

/*********************** textarea ******************************/

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.textArea);

		this.iconPosition = 'beforeend';

		var label = label || '',
		type = type || 'text', $this = $(this), tmpValue = this.getAttribute('value') || '';

		if(this.innerHTML.trim() == '')
			this.innerHTML = label

		this.innerHTML = jui2.tmpl['textArea']({label: this.innerHTML});

		$this.addClass('j-input j-valign-top').children().eq(1).append(tmpValue);

		this.removeAttribute('value');

		this.children[0].addEventListener("click", function(){
			$(this).next().focus();
		});

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		/* getter/setter */
		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function(){
				if($(this).children('textarea')[0])
					return $(this).children('textarea')[0].value;
				else
					return '';
			},
			set: function(value){
				if($(this).children('textarea')[0])
					$(this).children('textarea')[0].value = value;
			}
		});

		if(this.value){
			var tmpValue = this.value
			delete this.value;
			$this.val(tmpValue);
		}
		else{
			delete this.value;
		}

		this.attrChangedCb(['disabled', 'rows', 'cols', 'placeholder', 'readonly'])

		/*this.enabledAttrChange = $.unique(this.enabledAttrChange.concat(['disabled', 'rows', 'cols']));

		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue, attr = this.tagName.toLowerCase()+'_'+attrName;
	      if(jui2.attrChange[attr])
	  			jui2.attrChange[attr](this, false, newVal);
	      else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	        jui2.attrChange[attrName](this, false, newVal);
		}*/

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		this.attrChangedCb(false, attrName, oldVal, newVal)
		/*var attr = this.tagName.toLowerCase()+'_'+attrName;
		if(jui2.attrChange[attr])
			jui2.attrChange[attr](this, oldVal, newVal);
	    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      jui2.attrChange[attrName](this, oldVal, newVal);*/
	}

	jui2.ui.textArea = {
		widget: document.registerElement('j-textarea',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;/****js/hslider.js****/
/**
 * @classdesc Horizontal slider custom web component
 * @class hslider
 * @example <caption>Basic usage</caption>
 * <j-hslider>My Content</j-hslider>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {
		var self = this;
    jui2.ui.base.proto.createdCallback.call(this, jui2.ui.hslider);

		var children = $(this).children().detach();

		$(this).append(jui2.tmpl['hslider']()).children('div').append(children)

		var timeoutId, time, mdown;
		$(this).children('i').first().bind('mousedown', function() {
			time = 250
			mdown = function() {
				$(self).children('div').scrollLeft($(self).children('div').scrollLeft() - 20)
				if (time > 0)
					time = time - 50;
				timeoutId = setTimeout(mdown, time);
			}
			mdown()
		})

		$(this).children('i').last().bind('mousedown', function() {
			time = 250
			mdown = function() {
				$(self).children('div').scrollLeft($(self).children('div').scrollLeft() + 20)
				if (time > 0)
					time = time - 50;
				timeoutId = setTimeout(mdown, time);
			}
			mdown()
		})

		$(this).children('div').on('DOMMouseScroll mousewheel', function(e){
			var wheel = 0;
			if(e.originalEvent.wheelDelta)
				wheel = e.originalEvent.wheelDelta
			if(e.originalEvent.deltaY)
				wheel = e.originalEvent.deltaY
			if(e.originalEvent.detail)
				wheel = e.originalEvent.detail
			if(wheel>0){
				$(this).scrollLeft($(this).scrollLeft() + 20)
			}
			else{
				$(this).scrollLeft($(this).scrollLeft() - 20)
			}

			return false;
		})

		$('body').bind('mouseup', function() {
			clearTimeout(timeoutId);
		});

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.hslider = {
		widget: document.registerElement('j-hslider',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/tree.js****/
/**
 * @classdesc Tree custom web component
 * @class tree
 * @example <caption>Basic tree</caption>
 * <j-tree>
 * [
 * 	["Root", "", "0"],
 *  ["folder", "0", "0a" ],
 *  ["folder", "0", "0b" ],
 *  ["subfolder", "0a", "0a1" ]
 * ]</j-tree>
 *
 * The data for tree is array of item with item structure like this array ['label', 'id of parent', 'id']
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.addItem = function(item){
		if(item[1]=='')
			$(this).find('tbody').append('<tr item-id="'+item[2]+'" show-child="false"><td>'+item[0]+'</td></tr>')
		else
			$('<tr item-id="'+item[2]+'" item-parent="'+item[1]+'" show-child="false"><td>'+item[0]+'</td></tr>').insertAfter($(this).find('tbody > tr[item-id='+item[1]+']')).hide();
	}

	proto.createdCallback = function() {
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.tree);
		var data, $this = $(this), text = $('<div>'+this.innerHTML+'</div>');
		text.children().remove()
		$(this).append('<table></table>')

		if(text[0].innerHTML.trim().replace(/<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig, '') == "")
			data = [];
		else
			data = JSON.parse(text[0].innerHTML.replace(/<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig, ''));
		text.remove()
		$.each(data, function(i, val){
			$this[0].addItem(val)
		})

		$(this).delegate('tr', 'click', function(event) {
			var el = $(this);
			if(el.attr('show-child')=='false'){
				$this.find('tr[item-parent='+el.attr('item-id')+']').show()
			}
			else{
				$this.find('tr[item-parent='+el.attr('item-id')+']').hide()
			}
		});

		this.attrChangedCb(['disabled'])

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

	jui2.ui.tree = {
		widget: document.registerElement('j-tree',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/gantt.js****/

/**
 * @classdesc gantt custom web component
 * @class gantt
 * @augments gantt
 */
(function($){

	var proto = Object.create(HTMLElement.prototype)

  proto.generateData = jui2.ui.dataview.proto.generateData

	proto.createdCallback = function() {
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.gantt);
    var $self = $(this), loader = this.loader = $self.children('j-loader').detach().attr('type', 'j-table'), self = this, regxp = /<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig

    if(this.innerHTML.trim().replace(regxp, '') == "")
      data = [];
    else
      data = JSON.parse(this.innerHTML.trim().replace(regxp, ''));

    this.aaData = data;

    var headCols = ["Task Name", "&nbsp;", "&nbsp;"]

    this.data = $.extend(true, [], data);

    $self.on('afterdraw', function(){
      $self.find('>.j-table-body > table > tbody > tr > td:nth-child(2)').wrapInner('<div style="height: 100%;"></div>')
      var $trs = $self.find('>.j-table-body > table > tbody > tr'),
      startDate = moment().subtract(1, 'month').startOf('week'),
      endDate = moment().endOf('week').add(1, 'month'),
      today = moment(), dateFormat = 'DD-MM-YYYY';
      $trs.each(function(i, val){
        var data = $self[0].data[i][3];
        if(moment(data.startDate, dateFormat).subtract(2, 'week').isBefore(startDate))
          startDate = moment(data.startDate, dateFormat).subtract(1, 'week')
        if(moment(data.endDate, dateFormat).add(2, 'week').isAfter(endDate))
          endDate = moment(data.endDate, dateFormat).add(1, 'week')
        var el = $trs.filter(function(){
          return $(this).children('td:nth-child(3)').text().trim()==($(val).find('>td:first-child').text())
        })
        if(el.length>0){
          if($(val).children('td:nth-child(2)').children().children('i.fa-plus').length==0)
            $(val).children('td:nth-child(2)').children().prepend('<i class="fa fa-minus-square-o"></i>')
          el.children('td:nth-child(2)').children().css('padding-left', parseInt($(val).children('td:nth-child(2)').children().css('padding-left'))+30).parent().parent()//.hide()
        }
      }).append('<td class="j-gantt-grid-container"></td>')

      //creating grid
      var grid = '<div style="height: 100%;position: relative">', gridHead = '<div style="height: 100%;position: relative">'
      gridWeek = '<div style="height: 100%;position: relative">', gridMonth = '<div style="height: 100%;position: relative">', week = 0, weekWidth = 0, month = 0, monthWidth = 0, weekDayCount = 0, monthDayCount = 0;
      while(!startDate.isAfter(endDate)){
        grid+='<div class="j-gantt-grid '+startDate.format('DDMMYYYY')+'"></div>'
        gridHead+='<div class="j-gantt-grid '+startDate.format('DDMMYYYY')+'"><span style="display:none">'+startDate.format('DD MMM YYYY')+'</span><span>'+startDate.format('DD MMM')+'</span><span style="display: none;">'+startDate.format('dd')+'</span><span style="display: none;">'+startDate.format('dd')[0]+'</span></div>'
        if(parseInt(startDate.format('W')) > week){
          if(week!=0){
            gridWeek = gridWeek.replace('{width}', weekWidth+'px').replace('{day}', weekDayCount)
            weekWidth = 0;
            weekDayCount = 0;
          }
          week = parseInt(startDate.format('W'))
          gridWeek += '<div day="{day}" class="j-gantt-grid week'+week+'" style="width: {width}">'+week+'</div>'
        }
        weekWidth += 50;
        weekDayCount++;

        if(parseInt(startDate.format('M')) > month){
          if(month!=0){
            gridMonth = gridMonth.replace('{width}', monthWidth+'px').replace('{day}', monthDayCount)
            monthWidth = 0;
            monthDayCount = 0;
          }
          month = parseInt(startDate.format('M'))
          gridMonth += '<div day="{day}" class="j-gantt-grid month'+month+'" style="width: {width}">'+startDate.format('MMM YYYY')+'</div>'
        }
        monthWidth += 50;
        monthDayCount++;
        startDate.add(1, 'day');
      }
      gridWeek = gridWeek.replace('{width}', weekWidth+'px').replace('{day}', weekDayCount)
      gridMonth = gridMonth.replace('{width}', monthWidth+'px').replace('{day}', monthDayCount)
      grid+='</div>';
      gridHead+='</div>';
      gridMonth+='</div>';
      $self.find('>.j-table-body > table > thead > tr > th:last-child').empty().append(gridHead);
      $self.find('>.j-table-body > table > thead > tr > th:last-child').prepend(gridWeek);
      $self.find('>.j-table-body > table > thead > tr > th:last-child').prepend(gridMonth);
      $trs.children('td:nth-child(3), td:first-child').hide()
			$trs.children('td:nth-child(2)').show()
      $self.find('.j-gantt-grid-container').append(grid)
      $self.find('>.j-table-body > table > thead > tr > th:nth-child(2)').hide()
      $self.find('>.j-table-body > table > thead > tr > th:nth-child(3)').show()
      $self.find('>.j-table-body > table > tbody > tr:last-child').clone().appendTo($self.find('>.j-table-body > table > tbody'))
      $self.find('>.j-table-body > table > tbody > tr:last-child').show().children().empty().css('padding', '0px')
      var elScrollWidths = $self.find('>.j-table-body > table > tbody > tr > td:nth-child(2)').map(function() {
        return this.scrollWidth
      }).get()
      maxScrollWidth = Math.max.apply(null, elScrollWidths)//-250+10;
      $self.find('>.j-table-body > table > tbody > tr:last-child td:nth-child(2)').css({
        "font-size": 0,
        "line-height": 0,
      }).append('<div class="j-gantt-task-scroll" style="overflow-x: auto; overflow-y: hidden;width: 100%; height: 20px; display: inline-block;"><div style="display:block;width:'+maxScrollWidth+'px;height:20px;"></div></div>')
      var gridCellWidths = $self.find('>.j-table-body > table > tbody > tr:first-child td:last-child > div > div').map(function(){
        return parseInt($(this).outerWidth())
      }).get(),
      sum = gridCellWidths._reduce(function(pv, cv) { return pv + cv; }, 0);
      $self.find('>.j-table-body > table > tbody > tr:last-child td:last-child').append('<div class="j-gantt-bar-scroll" style="overflow-x: auto; overflow-y: hidden;width: 100%; height: 20px; display: inline-block;"><div style="display:block;height:20px;width:'+sum+'px;"></div></div>')
      $self.find('.j-gantt-task-scroll').scroll(function(){
        $self.find('>.j-table-body > table > tbody > tr:not(:last-child) > td:nth-child(2) > div').css('margin-left', '-'+$(this).scrollLeft()+'px')
      })
      $self.find('.j-gantt-bar-scroll').scroll(function(){
        $self.find('>.j-table-body > table > tbody > tr:not(:last-child) > td:last-child > div, >.j-table-body > table > thead > tr > th:last-child > div').css('margin-left', '-'+$(this).scrollLeft()+'px')
      })

      $self[0].addFlag('#F46670', today.format('DD-MM-YYYY'), 'Today')

      //draw the bar
      var firstBar = false;
      $trs.each(function(i, val){
        var data = $self[0].data[i][3], startDate = moment(data.startDate, 'DD-MM-YYYY'), endDate = moment(data.endDate, 'DD-MM-YYYY'), diff = startDate.diff(endDate, 'days'),
        gridCellWidth = $trs.find('.j-gantt-grid').outerWidth(),
        bar = $('<div startDate="'+startDate.format('DDMMYYYY')+'" endDate="'+endDate.format('DDMMYYYY')+'" drag="true" verticalDrag="false" class="j-gantt-bar" style="width: '+(gridCellWidth*(Math.abs(diff)+1))+'px"><div class="j-gantt-progress j-gantt-progress-completed" style="display: inline-block;width:'+data.progress+'%"></div><span style="z-index: 1">'+data.progress+'%</span></div>'),
        childPos = $self.find('.'+startDate.format('DDMMYYYY')).offset(),
        parentPos = $self.find('.'+startDate.format('DDMMYYYY')).parent().offset()

				if($self[0].data[i][4] != undefined)
					if($self[0].data[i][4] == 1)
						bar.addClass('j-gantt-disable');

        if(today.isAfter(endDate)){
          bar.attr('warning', 'Overdue '+today.diff(endDate, 'days')+' days')
        }

        bar.appendTo($(val).children().last().children()).css({
          top: '2.5px',
          left: childPos.left - parentPos.left
        })

				if(firstBar==false)
					firstBar = childPos.left - parentPos.left

				if((childPos.left - parentPos.left) < firstBar)
					firstBar = childPos.left - parentPos.left

        if($(val).is(':visible'))
          self.updateBar(bar)

      })

			$self.find('.j-gantt-bar-scroll').scrollLeft(firstBar)

      $self.find('.j-gantt-bar').on('dragend', function(e, pos){
        var target = $(this).touching('.j-gantt-grid').eq(0), startDate = target.attr('class').split(' ')[1], endDate = $(this).touching('.j-gantt-grid').last().prev().attr('class').split(' ')[1]
        childPos = target.offset(),
        parentPos = target.parent().offset()
        $(this).css({
          top: '2.5px',
          left: childPos.left - parentPos.left
        }).attr('startDate', startDate)
        .attr('endDate', endDate)

        self.updateBar(this)
      })
    })

    $self.delegate('.fa-plus-square-o', 'click', function(){
      var $tr = $(this).parent().parent().parent()
      $showed = $tr.nextUntil(
        $tr.nextAll().filter(function(){
          var targetPad = parseInt($(this).children('td:nth-child(2)').children().css('padding-left')),
          elPad = parseInt($tr.children('td:nth-child(2)').children().css('padding-left'))
          return targetPad <= elPad
        })
      ).filter(function(){
        return parseInt($(this).children('td:nth-child(2)').children().css('padding-left')) == parseInt($tr.children('td:nth-child(2)').children().css('padding-left'))+30
      }).show()
      $showed.find('.j-gantt-bar').each(function(i, val){
        self.updateBar(val)
      })
      $(this).removeClass('fa-plus-square-o').addClass('fa-minus-square-o');

      var elScrollWidths = $self.find('>.j-table-body > table > tbody > tr > td:nth-child(2)').map(function() {
        return this.scrollWidth
      }).get()
      var maxScrollWidth = Math.max.apply(null, elScrollWidths)//-250+10;

      $self.find('.j-gantt-task-scroll > div').css('width', maxScrollWidth)
    })

    $self.delegate('.fa-minus-square-o', 'click', function(){
      var $tr = $(this).parent().parent().parent(), elPad = parseInt($tr.children('td:nth-child(2)').children().css('padding-left'))
      $tr.nextUntil(
        $tr.nextAll().filter(function(){
          var targetPad = parseInt($(this).children('td:nth-child(2)').children().css('padding-left'))
          return targetPad <= elPad
        })
      ).hide().find('.fa-minus-square-o').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
      $(this).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');

      var elScrollWidths = $self.find('>.j-table-body > table > tbody > tr > td:nth-child(2)').map(function() {
        return this.scrollWidth
      }).get()
      var maxScrollWidth = Math.max.apply(null, elScrollWidths)-200+10;

      $self.find('.j-gantt-task-scroll > div').css('width', maxScrollWidth)
    })

    $self.delegate('.j-gantt-bar', 'mouseover', function(e){
			var tooltip = $('#j-gantt-tooltip'), create = true;
			if(tooltip.length>0){
				if(tooltip[0].bar == e.target || tooltip[0] == e.target || tooltip[0].bar == $(e.target).parents('.j-gantt-bar')[0]){
					create = false;
				}
			}

			if(create){
				var info = self.taskInfo(this), offset = $(this).offset(), left;
				$('#j-gantt-tooltip').remove()

				$self.append('<j-modal id="j-gantt-tooltip" center="false">'+info.tooltip+'</j-modal>')
				if(e.pageX+$('#j-gantt-tooltip').outerWidth()>$(window).width())
					left = e.pageX-$('#j-gantt-tooltip').outerWidth()
				else
					left = e.pageX
				$('#j-gantt-tooltip').offset({left: left, top: offset.top-$('#j-gantt-tooltip').outerHeight()})
				$('#j-gantt-tooltip')[0].bar = e.target
			}
    })

    $self.delegate('.j-gantt-grid', 'mouseenter', function(e){
			var tooltip = $('#j-gantt-tooltip')
			if(tooltip.length>0){
				if(tooltip[0] == e.target || tooltip[0].bar == e.target || tooltip[0].bar == $(e.target).parents('.j-gantt-bar')[0]){

				}
				else
	      	$('#j-gantt-tooltip').remove()
			}
    })

    jui2.ui.dataview.proto.createdCallback.call(this)

    $self.find('thead').remove()

    $self.append(loader);

		this.enabledAttrChange = $.unique(this.enabledAttrChange.concat(['disabled', 'width', 'height', 'title']));

		$(this.children[0]).children().prepend(jui2.tmpl['tableHeader']({columns: headCols}) );

		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
      if(jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName])
  			jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName](this, false, newVal);
      else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
        jui2.attrChange[attrName](this, false, newVal);
		}
	};

  proto.updateBar = function(item){
    var data = this.taskInfo(item), item = $(item), $self = $(this);
    if(data.overdue>0)
      item.attr('warning', 'Overdue '+data.overdue+' days')
    else {
      item.attr('warning', '')
    }

		if(data.disable == 1){
			item.addClass('j-gantt-disable')
		}

    var progressToComplete = data.expectedProgress>data.progress? 100 - data.expectedProgress : 100 - data.progress, gridCellWidth = item.parent().parent().find('.j-gantt-grid').outerWidth();

    item.empty()
    item.append('<span style="z-index: 1">'+data.progress+'%</span>')
    item.outerWidth(gridCellWidth*(Math.abs(moment(data.startDate, 'DD-MM-YYYY').diff(moment(data.endDate, 'DD-MM-YYYY'), 'days'))+1))
    item.prepend('<div class="j-gantt-progress j-gantt-progress-completed" style="display: inline-block;width:'+data.progress+'%"></div>')
    item.prepend('<div class="j-gantt-progress" style="display: inline-block; width: '+(data.expectedProgress-data.progress)+'%; left: '+data.progress+'%; background: #f46670"></div>')
    item.prepend('<div class="j-gantt-progress" style="display: inline-block; width: '+progressToComplete+'%; right: 0; left: unset; background: #c7d8f7"></div>')
    if(item.parent().parent().parent().children('td:nth-child(2)').find('.fa-minus-square-o, .fa-plus-square-o').length>0){
      item.append('<div class="j-gantt-milestone"></div>')
    }

    childPos = $self.find('.'+moment(data.startDate, 'DD-MM-YYYY').format('DDMMYYYY')).offset(),
    parentPos = $self.find('.'+moment(data.startDate, 'DD-MM-YYYY').format('DDMMYYYY')).parent().offset()

    item.css({
      top: '2.5px',
      left: childPos.left - parentPos.left
    })

  }

  proto.taskInfo = function(item){
    var item = $(item), data = this.data[item.parent().parent().parent().index()];
    data[3].startDate = moment($(item).attr('startDate'), 'DDMMYYYY').format('DD-MM-YYYY')
    data[3].endDate = moment($(item).attr('endDate'), 'DDMMYYYY').format('DD-MM-YYYY')
    var days = item.parent().children('.'+moment(data[3].startDate, 'DD-MM-YYYY').format('DDMMYYYY')).nextUntil('.'+moment(data[3].endDate, 'DD-MM-YYYY').format('DDMMYYYY')).length+2,
    overdue = moment().startOf('day').diff(moment(data[3].endDate, 'DD-MM-YYYY'), 'days'),
    progress = data[3].progress//parseInt(item.eq(0).children('.j-gantt-progress-completed').outerWidth())/parseInt(item.eq(0).outerWidth())*100,
    elapsedDays = moment().diff(moment(data[3].startDate, 'DD-MM-YYYY'), 'days'),
    expectedProgress = 100/days*(elapsedDays+1),
		disable = 0;

		if(item.hasClass('j-gantt-disable'))
			disable = 1

    if(expectedProgress>100){
      expectedProgress = 100;
    }
    var returnData = {
      overdue: overdue,
      progress: Math.round(progress),
      startDate: data[3].startDate,
      endDate: data[3].endDate,
      expectedProgress: expectedProgress,
      elapsedDay: elapsedDays,
      name: data[1],
			realData: data,
			disable: disable
    }

    returnData.tooltip = typeof this.tooltip == 'function' ? this.tooltip(returnData) : returnData.name

    return returnData;
  }

  proto.addFlag = function(color, date, note){
    var cls = moment(date, 'DD-MM-YYYY').format('DDMMYYYY'), fontColor = $.idealTextColor(color)
    if(note){
      note = '<div style="color:'+fontColor+'">'+note+'</div>'
    }
    else{
      note = ""
    }
    var target = $(this).find('.j-gantt-grid-container .'+cls);
    target.eq(0).append('<div class="j-gantt-flag" style="background:'+color+'">'+note+'</div>')
    target.not(target.eq(0)).append('<div class="j-gantt-flag" style="background:'+color+'"></div>')
  }

  proto.zoomOut = function(){
    var self = this, grid = $(this).find('> .j-table-body > table > tbody > tr .j-gantt-grid')
    if((grid.outerWidth()/2)% 1 == 0){
      grid.outerWidth(grid.outerWidth()/2)
      var gridHead = $(this).find('> .j-table-body > table > thead div:nth-child(3) .j-gantt-grid')
      gridHead.outerWidth(gridHead.outerWidth()/2)
      $(this).find('> .j-table-body > table > thead div:nth-child(2) .j-gantt-grid').each(function(i, val){
        $(val).outerWidth(parseInt($(val).attr('day'))*grid.outerWidth())
      })
      $(this).find('> .j-table-body > table > thead div:nth-child(1) .j-gantt-grid').each(function(i, val){
        $(val).outerWidth(parseInt($(val).attr('day'))*grid.outerWidth())
      })
      var scroll = $(this).find('> .j-table-body > table > tbody > tr .j-gantt-bar-scroll > div')
      scroll.outerWidth(scroll.outerWidth()/2)
      $(this).find('> .j-table-body > table > tbody > tr .j-gantt-bar').each(function(i, val){
        self.updateBar(val);
      })

      var grid = gridHead.filter(function(){
        return $(this).children(':visible').text().match('W')
      })
      if(grid.length==0)
        grid = gridHead
      if(grid[0].offsetWidth<=grid[0].scrollWidth)
        gridHead.children(':visible').hide().next().show()

      if(gridHead.eq(0).children(':visible').length==0){
        gridHead.parent().css('height', '0px')
      }
    }
  }

  proto.zoomIn = function(){
    var self = this, grid = $(this).find('> .j-table-body > table > tbody > tr .j-gantt-grid')
    grid.outerWidth(grid.outerWidth()*2)
    var gridHead = $(this).find('> .j-table-body > table > thead div:nth-child(3) .j-gantt-grid')
    gridHead.outerWidth(gridHead.outerWidth()*2)
    $(this).find('> .j-table-body > table > thead div:nth-child(2) .j-gantt-grid').each(function(i, val){
      $(val).outerWidth(parseInt($(val).attr('day'))*grid.outerWidth())
    })
    $(this).find('> .j-table-body > table > thead div:nth-child(1) .j-gantt-grid').each(function(i, val){
      $(val).outerWidth(parseInt($(val).attr('day'))*grid.outerWidth())
    })
    var scroll = $(this).find('> .j-table-body > table > tbody > tr .j-gantt-bar-scroll > div')
    scroll.outerWidth(scroll.outerWidth()*2)
    $(this).find('> .j-table-body > table > tbody > tr .j-gantt-bar').each(function(i, val){
      self.updateBar(val);
    })

    if(gridHead[0].offsetWidth>gridHead[0].scrollWidth)
      if(gridHead.children(':visible').length==0)
        gridHead.children('span:last-child').show()
      else if(gridHead.children(':visible').prev().length>0)
        gridHead.children(':visible').hide().prev().show()
    if(gridHead[0].offsetWidth<=gridHead[0].scrollWidth)
      if(gridHead.children(':visible').next().length>0)
        gridHead.children(':visible').hide().next().show()
      else
        gridHead.children().hide()

      if(gridHead.eq(0).children(':visible').length>0){
        gridHead.parent().css('height', '')
      }
  }


	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		if(jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName])
			jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName](this, oldVal, newVal);
    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
      jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.gantt = {
		widget: document.registerElement('j-gantt',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/timeField.js****/

 /**
  * @classdesc TimeField custom web component
  * @class timeField
  * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
  * @example <caption>Basic usage: <br/><j-timefield>Username</j-timefield></caption>
  * <j-timefield>Username</j-timefield>
  * @example <caption>Timefield with icon: <br/><j-timefield icon="fa-user">Username</j-timefield></caption>
  * <j-timefield icon="fa-user">Username</j-timefield>
  */

(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.comboField);
		var id = this.juiid

		this.iconPosition = 'beforeend';

		var label = label || '',
		type = type || 'text', $table, $div, $self = $(this);

		if(this.innerHTML.trim() == '')
			this.innerHTML = label

		var tmpValue = this.getAttribute('value') || '';

		this.innerHTML = jui2.tmpl['timeField']({label: this.innerHTML, type: type});

		$(this).children().eq(1).attr('value', tmpValue);
		$(this).append(jui2.tmpl['timeFieldBody']())

		this.removeAttribute('value');

		if(this.getAttribute('icon')){
			this.insertAdjacentHTML( 'beforeend', '<i class="j-ui-icon fa '+this.getAttribute('icon')+'"></i>' );
		}

		if (document.addEventListener) {                // For all major browsers, except IE 8 and earlier
			this.children[0].addEventListener("click", function(){
				$(this).next().focus();
			});
		} else if (document.attachEvent) {              // For IE 8 and earlier versions
			this.children[0].attachEvent("onclick", function(){
				$(this).next().focus();
			});
		}

		jui2.keycodes.bind(this, "tab,enter,backspace,escape,[0,9],delete,[96,111]")

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		$div = $(this).children('div')
		$table = $(this).find('table')

		$table.bind( "clickout", function(event){
			if(event.target != $self[0] && $(event.target).parents('j-timeField')[0] != $self[0] && $(event.target).parents('[belongto=j-timeField]').length == 0){
				$table.detach().appendTo($div);
				$('#j-timeField-'+id).remove();
				$div.hide();
			}
		});

		$self.delegate($self.children().not('j-table'), 'click', function(e){
			var $eTarget = $(e.target);
			if($eTarget.hasClass('fa-remove')){
				$self.val('')
			}
			else if($eTarget.parents('div:not(j-table > div)')[0] != $div[0] && e.target != $div[0]){
				$div.toggle();
				if($div.css('display') == 'block'){
					if($('#j-timeField-'+id).length==0)
						$('body').append('<j-modal belongto="j-timeField" snapto="#'+$self.attr('id')+' > input" snappos="topleft to bottomleft" id="j-timeField-'+id+'"></j-modal>');
					$table.detach().appendTo('#j-timeField-'+id)
					$table.show();
					$div.show();

					$table.removeAttr('style');
				}
				else{
					$table.detach().appendTo($div);
					$('#j-timeField-'+id).remove();
					$div.hide();
				}
			}
		})

		$table.find('.j-timeField-setTime').click(function(){
			$self.find('input').eq(0).val($table.find('.j-active').eq(0).text());
			$self.find('input').eq(1).val($table.find('.j-active').eq(1).text());
			$table.detach().appendTo($div);
			$('#j-timeField-'+id).remove();
			$div.hide();

			/**
			 * Fires when time selected
			 * @event select
			 * @param {object} event Event object
			 * @param  {String} value Selected value
			 * @memberof timeField
			 * @example
			 * <j-timeField id="myTimeField1">Combo</j-timeField>
			 * <script>
			 * $('#myTimeField').on('select', function(e, value){
			 * 	console.log(value) // will print value you selected from timeField in javascript console
			 * })
			 * </script>
			 */

			$self.triggerHandler('select', [$self.val()]);
			$table.find('td').removeClass('j-active');
		})

		$table.delegate('td', 'click', function(e){

			var $table = $(this).parents('table').eq(0);
			if($('[belongto=j-timeField] table tr:nth-child(2) td, [belongto=j-timeField] > table tr:nth-child(3) td').is($(this))){
				$('[belongto=j-timeField] table tr:nth-child(2) td, [belongto=j-timeField] > table tr:nth-child(3) td').removeClass('j-active');
			}

			if($('[belongto=j-timeField] table tr:nth-child(5) td').is($(this))){
				$('[belongto=j-timeField] table tr:nth-child(5) td').removeClass('j-active');
			}

			if(!$('[belongto=j-timeField] table tr:nth-child(6) td, [belongto=j-timeField] > table tr:nth-child(1) td, [belongto=j-timeField] > table tr:nth-child(4) td').is($(this)))
				$(this).addClass('j-active')

		})

		/**
		 * Set and get widget value
		 * @param {mixed} value can be empty
		 * @returns {mixed}
		 * @method val
		 * @memberof timeField
		 * @instance
		 * @example <caption>nopreview</caption>
		 * var value = $('#myWidget').val() // will return widget's value to variable value
		 * @example <caption>nopreview</caption>
		 * $('#myWidget').val('myValue') // will set widget's value to 'myValue'
		 */
		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function(){
				if($(this).children('input')[0])
					return $(this).children('input')[0].value + ':' + $(this).children('input')[1].value;
				else
					return '';
			},
			set: function(value){
				if($(this).children('input')[0]){
					$(this).children('input')[0].value = value.split(':')[0];
					$(this).children('input')[1].value = value.split(':')[1];
				}
				return $(this).children('input')[0].value + ':' + $(this).children('input')[1].value;
			}
		});

		var extend = true;
		if(this.noInherit)
			if(this.noInherit.indexOf('value')!=-1)
				extend = false;

		if(this.value && extend){
			var tmpValue = this.value
			delete this.value;
			$(this).val(tmpValue);
		}
		else{
			if(extend)
				delete this.value;
		}

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = ['disabled', 'icon', 'placeholder', 'readonly'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.timeField = {
		widget: document.registerElement('j-timefield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/resize.js****/

(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {
    	var x, y;
		var self = this;
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.resize);

	    $(this).attr('drag', 'true').on('dragstart', function(e, pos){
			x = pos.x, y = pos.y

			$(self).triggerHandler('beforeresize')

			$('j-drag').css({
				height: $(self).parent().outerHeight(false),
				width: $(self).parent().outerWidth(false)
			}).offset($(self).parent().offset())

			if($(self).attr('direction')=='horizontal'){
				$('j-drag').css({
					cursor: 'ew-resize !important'
				})
			}

	    }).on('dragmove', function(e, pos){

			if($(self).attr('direction')=='horizontal'){
				$('j-drag').css({
	        		width: $(self).parent().outerWidth(false)+(pos.x-x)
				}).offset($(self).parent().offset())
			}
			else{
				$('j-drag').css({
					width: $(self).parent().outerWidth(false)+(pos.x-x),
					height: $(self).parent().outerHeight(false)+(pos.y-y)
				}).offset($(self).parent().offset())
			}

	    }).on('dragend', function(e, pos){
				if($(self).attr('direction')=='horizontal'){
					$(self).parent().outerWidth($(self).parent().outerWidth(false)+(pos.x-x))
					$(self).css({
						'top': '',
						'bottom': ''
					}).triggerHandler('afterresize')
				}
				else{
					var resizedEl = $(self).parent()
					$(self).parent().outerHeight(parseInt($('j-drag').innerHeight())-parseInt(resizedEl.css('margin-top'))-parseInt(resizedEl.css('margin-bottom'))-parseInt(resizedEl.css('padding-top'))-parseInt(resizedEl.css('padding-bottom'))).outerWidth(parseInt($('j-drag').innerWidth())-parseInt(resizedEl.css('margin-left'))-parseInt(resizedEl.css('margin-right'))-parseInt(resizedEl.css('padding-left'))-parseInt(resizedEl.css('padding-right'))).triggerHandler('afterresize')
	      			/*$(self).parent().outerWidth($(self).parent().outerWidth(false)+(pos.x-x)).outerHeight($(self).parent().outerHeight(false)+(pos.y-y)).triggerHandler('afterresize')*/
				}
	    })

		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
			if(jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName])
				jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName](this, false, newVal);
			else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, false, newVal);
		}
	};

	//#TODO:0 Fixing toolbar to support table as extension
	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		if(jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName])
			jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName](this, oldVal, newVal);
    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
      jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.resize = {
		widget: document.registerElement('j-resize',  {
			prototype: proto
		}),
		proto: proto,
    extension: []
	}

}(jQuery))
;
;/****js/wysiwyg.js****/

 /**
  * @classdesc Wysiwyg custom web component
  * @class wysiwyg
  * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
  * @example <caption>Basic usage: <br/><j-wysiwyg>Username</j-wysiwyg></caption>
  * <j-wysiwyg>Username</j-wysiwyg>
  * @example <caption>Wysiwyg with icon: <br/><j-wysiwyg icon="fa-user">Username</j-wysiwyg></caption>
  * <j-wysiwyg icon="fa-user">Username</j-wysiwyg>
  */

(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.wysiwyg);

		this.iconPosition = 'beforeend';

		var label = label || '',
		type = type || 'text';

		if(this.innerHTML.trim() == '')
			this.innerHTML = label

		var tmpValue = this.getAttribute('value') || '';

		this.innerHTML = jui2.tmpl['textArea']({label: this.innerHTML});

		$(this).addClass('j-input j-valign-top').children().eq(1).attr('value', tmpValue);

		this.removeAttribute('value');

		if(this.getAttribute('icon')){
			this.insertAdjacentHTML( 'beforeend', '<i class="j-ui-icon fa '+this.getAttribute('icon')+'"></i>' );
		}

		if (document.addEventListener) {                // For all major browsers, except IE 8 and earlier
			this.children[0].addEventListener("click", function(){
				$(this).next().focus();
			});
		} else if (document.attachEvent) {              // For IE 8 and earlier versions
			this.children[0].attachEvent("onclick", function(){
				$(this).next().focus();
			});
		}

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		var textid = 'mce-'+$(this).attr('id')+jui2.random('5', '#')

		$(this).children('textarea').attr('id', textid)

		/*if(tinyMCE.get('mce-'+$(this).attr('id'))!=null)
			tinymce.execCommand('mceAddEditor',true,'mce-'+$(this).attr('id'));
		else*/
			tinymce.init({ selector: '#'+textid, plugins: [
				'advlist autolink lists loadexcel link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime media table contextmenu paste code'
			],
			toolbar: 'insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
			width: 350,
			forced_root_block : false,
			resize: 'both',
			force_br_newlines : true,
			force_p_newlines : false });

		/**
		 * Set and get widget value
		 * @param {mixed} value can be empty
		 * @returns {mixed}
		 * @method val
		 * @memberof wysiwyg
		 * @instance
		 * @example <caption>nopreview</caption>
		 * var value = $('#myWidget').val() // will return widget's value to variable value
		 * @example <caption>nopreview</caption>
		 * $('#myWidget').val('myValue') // will set widget's value to 'myValue'
		 */
		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function(){
				return $(this).find('iframe').contents().find('body').html()
			},
			set: function(value){
				$(this).find('iframe').contents().find('body').html(value)
				return $(this).find('iframe').contents().find('body').html()
			}
		});

		var extend = true;
		if(this.noInherit)
			if(this.noInherit.indexOf('value')!=-1)
				extend = false;

		if(this.value && extend){
			var tmpValue = this.value
			delete this.value;
			$(this).val(tmpValue);
		}
		else{
			if(extend)
				delete this.value;
		}

	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var enabledAttrChange = ['disabled', 'icon'];
		if(jui2.attrChange[attrName] && enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.wysiwyg = {
		widget: document.registerElement('j-wysiwyg',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/tableFilter.js****/
/**
 * @classdesc TableFilter custom web component
 * @class tableFilter
 * @example <caption>Basic tableFilter</caption>
 * <j-tableFilter>My TableFilter</j-tableFilter>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.tableFilter);
		var filterList, $this = $(this);

		var text = $('<div>'+this.innerHTML+'</div>');

		if(text[0].innerHTML.trim().replace(/<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig, '') == "")
			filterList = "";
		else{
			filterList = text[0].innerHTML.trim().replace(/<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig, '');
		}

		text.remove();

		$this.empty().append(jui2.tmpl['tableFilter']({filterList: filterList, filterSource: $this.attr('filter-source')}));

		$this.find('.j-table-filter-add').on('select', function(e, value){
			fields = $this[0].add(parseInt(value));
			if(fields[0]!="" && $this.find('.j-table-filter-body #'+value).length == 0)
				$this.find('.j-table-filter-body').append('<tr id="'+value+'"><td width="100px"><input type="checkbox" checked/> '+fields[0]+' </td><td>'+fields[1]+'</td></tr>');
		})

		$this.find('.j-table-filter-filter').on('select', function(e, value){
			$this.get(0).removeFilter();
			var record = this.getSelectedRecord(), filter=record[2].split(";");
			filter=filter.slice(0, -1);

			for (i=0;i<filter.length;i++){
				var id_load = -1, data = filter[i].split('=');
				if($this[0].load)
					fields = $this[0].load(data[0], data[1]);
				$this.find('.j-table-filter-body').append('<tr><td width="100px"><input type="checkbox" checked/> '+fields[0]+' </td><td>'+fields[1]+'</td></tr>');
			}
		})

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}

		this.enabledAttrChange = $.unique(this.enabledAttrChange.concat([]));

		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue, attr = this.tagName.toLowerCase()+'_'+attrName;
			if(jui2.attrChange[attr])
					jui2.attrChange[attr](this, false, newVal);
			else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, false, newVal);
		}
	};

	proto.removeFilter = function(){
		var $this = $(this)
		$this.find('.j-table-filter-tabFilter tr').remove();
	}

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var attr = this.tagName.toLowerCase()+'_'+attrName;
		if(jui2.attrChange[attr])
			jui2.attrChange[attr](this, oldVal, newVal);
	    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      jui2.attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.tableFilter = {
		widget: document.registerElement('j-table-filter',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/progressbar.js****/
/**
 * @classdesc Progressbar custom web component
 * @class progressbar
 * @example <caption>Basic progressbar</caption>
 * <j-progressbar></j-progressbar>
 * @example <caption>Indeterminate progressbar</caption>
 * <j-progressbar type="indeterminate"></j-progressbar>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.progressbar);

		this.attrChangedCb(['disabled'])

		var $self = $(this);
		$self.append('<div></div><div></div>')

		if($self.attr('color')){
			var rgb = $.getRGB($self.attr('color'))
			$self.css('background-color', 'rgba('+rgb.R+', '+rgb.G+', '+rgb.B+', 0.2)')
			$self.children().css('background-color', $self.attr('color'))
		}

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

	proto.progress = function(percent){
		clearTimeout($(this).stop().data('timer'));
		if($(this).attr('type')!='indeterminate')
			$(this).children().width(parseInt(percent)+'%')
	}

	proto.reset = function(){
		clearTimeout($(this).stop().data('timer'));
		$(this).removeAttr('type')
		this.progress(0);
	}

	proto.complete = function(){
		var el = $(this).children()
		$(this).removeAttr('type')
		el.width('100%')
		$.data(this, 'timer', setTimeout(function() { el.width(0) }, 1000));
	}

	jui2.ui.progressbar = {
		widget: document.registerElement('j-progressbar',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/customHeader.js****/
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {
		var self = this;

		if(this.getAttribute('type') == 'j-table'){
			var target = $(this).parent(), regxp = /<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig, data, html = '';

			if(this.innerHTML.trim().replace(regxp, '') == "")
				data = data || [];
			else
				data = data || eval(this.innerHTML.replace(regxp, ''));

			$.each(data, function(i, val){
				html += '<tr class="j-custom-header">'
				$.each(val, function(i, val){
					html+='<th rowspan="'+(val.rowspan||1)+'" colspan="'+(val.colspan||1)+'" class="j-border-bot1 j-bg1 j-no-wrap j-border-right1"><div class="j-pad1">'+val.text+'</div></th>'
				})
				html += '</tr>'
			})
			target.find('> .j-table-body > table > thead').prepend(html)

			this.innerHTML = ""
		}
	}

	jui2.ui.customHeader = {
		widget: document.registerElement('j-custom-header',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;;/****js/editor.js****/
/**
 * @classdesc WYSIWYG editor custom web component
 * @class editor
 * @example <caption>Editor basic usage</caption>
 * <j-editor>Editor</j-editor>
 * @augments textArea
 */
(function($) {

  var proto = Object.create(HTMLElement.prototype)

  proto.createdCallback = function() {

    jui2.ui.textArea.proto.createdCallback.call(this, '', 'text');

    $(this).find('textarea').wysiwyg({
      toolbar: 'top-selection',
      buttons: {
        bold: {
          title: 'Bold (Ctrl+B)',
          image: '\uf032', // <img src="path/to/image.png" width="16" height="16" alt="" />
          hotkey: 'b'
        },
        italic: {
          title: 'Italic (Ctrl+I)',
          image: '\uf033', // <img src="path/to/image.png" width="16" height="16" alt="" />
          hotkey: 'i'
        },
        underline: {
          title: 'Underline (Ctrl+U)',
          image: '\uf0cd', // <img src="path/to/image.png" width="16" height="16" alt="" />
          hotkey: 'u'
        },
        strikethrough: {
          title: 'Strikethrough (Ctrl+S)',
          image: '\uf0cc', // <img src="path/to/image.png" width="16" height="16" alt="" />
          hotkey: 's'
        },
        forecolor: {
          title: 'Text color',
          image: '\uf1fc' // <img src="path/to/image.png" width="16" height="16" alt="" />
        },
        highlight: {
          title: 'Background color',
          image: '\uf043' // <img src="path/to/image.png" width="16" height="16" alt="" />
        },
        /*alignleft: {
          title: 'Left',
          image: '\uf036', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: false // wanted on selection
        },
        aligncenter: {
          title: 'Center',
          image: '\uf037', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: false // wanted on selection
        },
        alignright: {
          title: 'Right',
          image: '\uf038', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: false // wanted on selection
        },
        alignjustify: {
          title: 'Justify',
          image: '\uf039', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: false // wanted on selection
        },*/
        subscript: {
          title: 'Subscript',
          image: '\uf12c', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: true // wanted on selection
        },
        superscript: {
          title: 'Superscript',
          image: '\uf12b', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: true // wanted on selection
        },
        /*indent: {
          title: 'Indent',
          image: '\uf03c', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: false // wanted on selection
        },
        outdent: {
          title: 'Outdent',
          image: '\uf03b', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: false // wanted on selection
        },
        orderedList: {
          title: 'Ordered list',
          image: '\uf0cb', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: false // wanted on selection
        },
        unorderedList: {
          title: 'Unordered list',
          image: '\uf0ca', // <img src="path/to/image.png" width="16" height="16" alt="" />
          //showstatic: true,    // wanted on the toolbar
          showselection: false // wanted on selection
        },*/
        removeformat: {
          title: 'Remove format',
          image: '\uf12d' // <img src="path/to/image.png" width="16" height="16" alt="" />
        }
      }
    });

		/* getter/setter */
		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function(){
				if($(this).find('.wysiwyg-editor')[0])
					return $(this).find('.wysiwyg-editor').html();
				else
					return '';
			},
			set: function(value){
				if($(this).find('.wysiwyg-editor')[0])
					$(this).find('.wysiwyg-editor').html(value);
			}
		});

  };

  proto.attributeChangedCallback = function(attrName, oldVal, newVal) {
		var attr = this.tagName.toLowerCase()+'_'+attrName;
		if(jui2.attrChange[attr])
			jui2.attrChange[attr](this, oldVal, newVal);
    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
      jui2.attrChange[attrName](this, oldVal, newVal);
  }

  jui2.ui.editor = {
    widget: document.registerElement('j-editor', {
      prototype: proto
    }),
    proto: proto
  }

}(jQuery));
