/****js/core.js****/
var jui2;

(function ($) {

    var random, Jui = function (selector) {
        // Lets make a really simplistic selector implementation for demo purposes
        var nodes = $(selector), i;
        for (i = 0; i < nodes.length; i++) {
            this[i] = nodes[i].hasAttribute('role') ? nodes[i].jui2 : nodes[i];
        }
        this.length = nodes.length;
        return this;
    };
	/** @class jui2
		JUI2 class
		@param {String/HTMLElement/NodeList} string selector
		@return {jui2} array jui2 object collection
	*/
    jui2 = function (selector) {
        return new Jui(selector);
    };

    // Expose the prototype object via jui2.fn so methods can be added later
    jui2.fn = Jui.prototype = {
        // API Methods
        /*hide: function() {
            for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'none';
            }
            return this;
        },
        remove: function() {
            for (var i = 0; i < this.length; i++) {
                this[i].parentNode.removeChild(this[i]);
            }
            return this;
        }*/
        // More methods here, each using 'return this', to enable chaining
    };
	
	/** 
		@method random
		Function to create random string
		@alias random
		@param {Number} length
		Length of the generated string
		@param {String} chars
		@private
		String combination that allowed to generate, consist of 'a' representing lowercased alphabet char, 'A' for uppercased alphabet char, '#' for number and ! for other chars
		
		Example use:
			@example
			This code will create a random character consist of uppercased and lowercased alphabet and number with 8 character length
			jui2.random(8, 'aA#')
	*/
	random = function (length, chars) {
		var result = '', mask = '', text, i;
		/*if (chars.indexOf('a') > -1)
			mask += 'abcdefghijklmnopqrstuvwxyz';
		if (chars.indexOf('A') > -1)
			mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (chars.indexOf('#') > -1)
			mask += '0123456789';
		if (chars.indexOf('!') > -1)
			mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';*/
			
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
	}
	jui2.random = random;
	/*
	jui2.messaging = {
		addServer: function(name, event, target){
			var self = this;
			this.client[name] = [];
			self.name = name
			this.server[name] = function(e){
				var e = e;
				$.each(self.client[self.name], function(i, val){
					val(e);
				})
			}
			$(target).bind(event, this.server[name])
		},
		addClient: function(serverName, fn){
			if(this.client[serverName]){
				this.client[serverName].push(fn);
				return this.client[serverName].length;
			}
		},
		client: {},
		server: {}
	}*/
	
	/**
	*Variabel data kata-kata dalam berbagai bahasa
	*@static lang*/
	jui2.lang = {};
	
	/**
		@method findHighestZIndex
		Fungsi untuk mencari z-index tertinggi
		@return {Number} z-index
		@private
	*/
	jui2.findHighestZIndex = function(){
		return Math.max.apply(null,$.map($('body > *'), function(e,n){
           if($(e).css('position')=='absolute')
                return parseInt($(e).css('z-index'))||1 ;
           })
		);
	}
	
	/**
		@method arrayToJson
		Fungsi untuk mengubah array menjadi json object
		@param {Array} Array data
		@return {Object} converted array as object
		@static
	*/
	jui2.arrayToJson = function(arr) {
		var ret = [];
		for(i in arr){
			var i = i;
			ret[i] = {};
			for(z in arr[i]){
				ret[i][z] = arr[i][z];
			}
		}
		return ret;
	}
	
	jui2.cleanWordPaste = function(in_word_text) {
		 
		 		 // this next piece converts line breaks into break tags
		 // and removes the seemingly endless crap code
		 newString  = in_word_text.replace(/<!--[\s\S]*?-->/g,"");
		 // this next piece removes any break tags (up to 10) at beginning
		
		 return newString;
	}
	
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
			/*if(role=='timeField'){
				$el = $(this[0]).find('input')
				if(val){
					$el.eq(0).val(val.split(':')[0])
					$el.eq(1).val(val.split(':')[1])
				}
				return $el.eq(0).val()+':'+$el.eq(1).val();
			}*/
			/*if(el.attr('role')=='textArea'){
				value[el.attr('name')||el.attr('id')] = el.find('.j-textArea-editor').html()
				if(value[el.attr('name')||el.attr('id')]==null)
					value[el.attr('name')||el.attr('id')] = ''
			}
			else if(el.attr('role')=='comboField')
				value[el.attr('name')||el.attr('id')] = el.find('input[type=hidden]').val()
			else if(el.attr('role')=='radioField')
				value[el.attr('name')||el.attr('id')] = el.find('input:checked').val()
			else
				value[el.attr('name')||el.attr('id')] = el.find('input').val()*/
		});
		var i = 0
		this.find('j-datefield, j-combofield').each(function(i, val){
			var el = $(val), id = el.attr('name')||el.attr('id')
			value[id] = el.val();
		})
		return value;
	}
	
	$.jui2Reset = function(selector){
		$.each(jui2(selector+' [role=textField],'+selector+' [role=textArea],'+selector+' [role=dateField],'+selector+' [role=comboField],'+selector+' [role=datePicker],'+selector+' [role=passwordField],'+selector+' [role=radioField]'), function(i, val){
			val && val.reset && val.reset();
		})
	}
	
	/**
		@method define
		Fungsi mendefine variable yang di attach pada sebuah element, sehingga variable yang di create dengan fungsi ini akan hilang jika element tersebut hilang/di hapus.
		@param {Function} Function that consist of variable
		@param {String/HTMLElement/NodeList}
		@static
	*/
	jui2.define = function(fn, selector){
		var $el = $(selector), varName = $el.attr('id')
		window[varName] = {};
		$.each(new fn(), function(i, val){
			window[varName][i] = val;
		})
		
		 $el.on('remove', function(){
			window[varName] = null;
		 })
	}
	
	/**
		@method iterateJson
		Fungsi untuk melakukan iterasi pada sebuah JSON object dengan fungsi yang akan di jalankan setiap 
		@param {Object} JSON object
		@param {Function} function that will be fired upon iteration
		@static
	*/
	jui2.iterateJson = function(json, fn){
		for (var data in json) {
			fn(json[data])
			typeof json[data] == 'object' &&
				jui2.iterateJson(json[data], fn)
		}
	}
	
	/**
		@method clearNullFromJson
		A function to remove null value from a JSON object
		@param {Object} JSON object
		@static
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
	}
	
	/**
		@method template
		Simple template function
		@param {String} String template
		@param {Object} JSON object with value that will be applied to template
		@return {String} Generated string from template and value in JSON object
		@static
	*/
	jui2.template = function(template, json){
		var fetch = !0, r = /{{(.*?)}}/gi
		while(fetch){
			fetch = r.exec(template)
			template = template.replace(fetch[0], json[fetch[1]])
		}
		return template;
	}
	
	/**
		@method makeSure
		Fungsi untuk menampilkan konfirmasi
		@param {String} Text displayed on confirm
		@return {Boolean}
		@static
	*/
	jui2.makeSure = function(text){
		/*var r = confirm(text);
		return r;*/
		return confirm(text);
	}
	
	/**
		@method extend
		Fungsi untuk mengextend object ke object lain
		@param {Object} source
		Object source
		@param {Object} target
		Object target
		@param {Array} excldue
		List of excluded method to inherit
		@static
	*/
	
	jui2.extend = function(source, target, exclude){
		exclude = exclude || []
		for(i in source.fn){
			if(exclude.indexOf(i)==-1){
				target.fn[i] = source.fn[i]
			}
		}
	}
	
	jui2.mask = function(target){
		var $elTarget = $(target);
		if($elTarget.children('.j-mask').length==0){
			var $el = $('<div class="j-mask"></div>').appendTo(target);
			//console.log($(target).offset())
			$el.width($elTarget.outerWidth(false)).height($elTarget.outerHeight(false)).offset($elTarget.offset())
			$elTarget.on('remove', function(){
				$el.remove()
			})
			$el.each(function(i, val){
				var offset = $(val).parent().offset(),
				$el = $(val),
				$par = $el.parent();
				$par[0].jui2mask = $el;
				$el.appendTo('body').offset(offset);
				$('body').click(function(){
					$el.offset($par.offset());
				})
				$('.j-body').resize(function(){
					$el.offset($par.offset());
				})
			})
		}
	}
	
	jui2.mask2 = function(target){
		if($(target).children('.jn-mask').length==0){
			var $el = $('<div class="jn-mask" style="background: none repeat scroll 0 0 rgba(255, 255, 255, 0.8) !important; color: red; position: absolute; top: 0; bottom: 0px; right: 0px; left: 0px;"></div>').appendTo(target);
			$(target)[0].jui2mask = $el;
		}
	}
	
	jui2.unmask = function(target){
		if($(target)[0].jui2mask)
			$(target)[0].jui2mask.remove()
	}
	
	/**
		@class jui2.pin
		Digunakan untuk meng-attach element ke element lainnya
		@extend jui2
		@param {Object} options
		Options for pin method
	*/
	jui2.pin = function(opt){
		var opt = $.extend(!0, {
			/**
				@cfg {string/HTMLElement/NodeList} Selector of element that will be pinned
			*/
			element: '',
			/**
				@cfg {string/HTMLElement/NodeList} Selector of target element to be pinned to
			*/
			target: 'body',
			/**
				@cfg {string} element attachment position, consist of 2 word separated with space.
				Available options is top and bottom for vertical position, and left, right and horizontalcenter for horizontal position
			*/
			attachment: 'top left',
			/**
				@cfg {string} target element attachment position, consist of 2 word separated with space.
				Available options is top and bottom for vertical position, and left, right and horizontalcenter for horizontal position
			*/
			targetAttachment: 'bottom left'
		}, opt), self = this;
		
		self.attachment = {
			left: 'left',
			top: 'top'
		}
		
		self.targetAttachment = {
			left: 'bottom',
			top: 'top'
		}
		
		self.opt = opt;
		
		self.element = $(opt.element).css('position', 'absolute')
		self.target = $(opt.target);
		/**
			@method position
			Function to repositioning the attached element position
		*/
		self.position = function(){
			self.top = self.target.offset().top, self.left = self.target.offset().left;
			var attachment = opt.attachment, targetAttachment = opt.targetAttachment, el = self.element, target = self.target;
			if(attachment.search(/bottom/i)!=-1)
				self.top -= el.outerHeight(!1)
			if(attachment.search(/right/i)!=-1)
				self.left -= el.outerWidth(!1)
			if(attachment.search(/horizontalcenter/i)!=-1)
				self.left -= el.outerWidth(!1)/2
			if(attachment.search(/verticalcenter/i)!=-1)
				self.top -= el.outerHeight(!1)/2

			if(targetAttachment.search(/bottom/i)!=-1)
				self.top += target.outerHeight(!1)
			if(targetAttachment.search(/right/i)!=-1)
				self.left += target.outerWidth(!1)
			if(targetAttachment.search(/horizontalcenter/i)!=-1)
				self.left += target.outerWidth(!1)/2
			if(targetAttachment.search(/verticalcenter/i)!=-1)
				self.top += target.outerHeight(!1)/2
			if(self.left<0)
				self.left = 0;
			if(self.top<0)
				self.top = 0;
			self.element.offset({ top: self.top, left: self.left})
		}
		/**
			@method setOptions
			Function to set/edit the pinned element options
		*/
		self.setOptions = function(opt){
			self.opt = $.extend(!0, self.opt, opt)
		}
		
		self.position();
		
		return self;
	}
	
	jui2.util = {
	}
	
	jui2.modul = {
	}
	
	jui2.ui = function(component, opt){
		return jui2.modul[component](opt)
	}
	
	jui2.notification = function(title, content, server){
		var server = server || false;
		if (!("Notification" in window)) {
			
		}

		else if (Notification.permission === "granted") {
			if(!server){
				var notification = new Notification(title, {body:content});
			}
			else{
				$.get( content, function( data ) {
					var notification = new Notification(title, {body:data});
				});
			}
		}

		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (!('permission' in Notification)) {
					Notification.permission = permission;
				}

				// If the user is okay, let's create a notification
				if (permission === "granted") {
					if(!server){
						var notification = new Notification(title, {body:content});
					}
					else{
						$.get( content, function( data ) {
							var notification = new Notification(title, {body:data});
						});
					}
				}
			});
		}
	}
	
	jui2.mouse = {}
	
	jui2.arrayToExcel = function(arr){
		var html = "";
		$.each(arr, function(i, val){
			html += '<tr><td>' + val.join('</td><td>')+'</td></tr>'
		})
		window.open('data:application/vnd.ms-excel,' + encodeURIComponent('<table style="border-bottom:1px solid black; font-size:10px;"><style>.num{mso-number-format:"\@";}</style>'+html+'</table>'));											
	}
	
	jui2.isInView = function(elem)
	{
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	
	jui2.help = true;
	
	jui2.data = {
		followHead: false,
		followHeadShow: false
	}
	
	jui2.escapeHtmlEntities = function (text) {
        return text.replace(/[\u00A0-\u2666<>\&]/g, function(c) {
			if(c.charCodeAt(0)>=160)
				return '&#' + c.charCodeAt(0) + ';';
			else
				return c;
        });
    };
	/*
	jui2.fnToString = function(fn, prop) {
		'-'.replace(new RegExp('-', 'g'),function(_) {
			return fn;
		})
	};*/
	/*
	function (obj, prop) {
		var placeholder = '____PLACEHOLDER____';
		var fns = [];
		var json = JSON.stringify(obj, function(key, value) {
			if (typeof value === 'function') {
				fns.push(value);
				return placeholder;
			}
			return value;
		}, 2);
		json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function(_) {
			return fns.shift();
		});
		return 'this["' + prop + '"] = ' + json + ';';
	}*/
	
	jui2.class = {}

}(jQuery))

$( document ).ready(function() {
	$(document).click(function(e){
		jui2.oms.sendToClients(e, 'body')
	})
	$(document).bind('mousemove', function(e){
		jui2.mouse.offset = {
			x: e.clientX || e.pageX,
			y: e.clientY || e.pageY
		}
	})
	$(document).bind('mousedown', function(e){
		e = e || window.event;
		switch (e.which) {
			case 1: 
				//if($(e.target).hasClass()
				if($(e.target).parents('.j-right-menu').length==0)
					$('.j-right-menu').hide();
			break;
			case 2: $('.j-right-menu').hide(); break;
		}
	})
	window.onerror = function(message, url, linenumber) {
		//console("JavaScript error: " + message + " on line " + linenumber + " for " + url);
		$.each(jui2('[role=overlay]'), function(i,val){
			val.destroy();
		})
		if(jui2.onerror)
			jui2.onerror(message, url, linenumber)
	}
});

(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
	
    $.fn.hasScrollBarHor = function() {
        return this.get(0).scrollWidth > this.width();
    }
	
	jQuery.fn.center = function () {
		var $self = $(this), $parent = $self.parent(), self = this;
		self.css("position","absolute")
		.css("top", Math.max(0, (($parent.height() - $self.outerHeight(!0)) / 2) + 
													$parent.scrollTop()) + "px")
		.css("left", Math.max(0, (($parent.width() - $self.outerWidth(!0)) / 2) + 
													$parent.scrollLeft()) + "px");
		return self;
	}
})(jQuery);
/*
$('body').bind('mousedown', function(e){
e = e || window.event;
  switch (e.which) {
    case 1: console.log('left'); break;
    case 2: console.log('middle'); break;
    case 3: console.log('right'); break; 
  }
})*/
//Handlebars.registerPartial('part_bar', jui2.tmpl.tmpl_part_bar);  ;/****js/lang.monthPicker.js****/
(function($){

	jui2.lang.monthPicker = {
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
	
}(jQuery));/****js/oms.js****/
(function($){

	jui2.oms = {
		server: {},
		append: function(name, fn, server){
			if(!this.server[server])
				jui2.oms.createServer(function(){}, 'body');
			if(!this.server[server].client[name])
				this.server[server].client[name] = fn;
		},
		remove: function(name, server){
			if(this.server[server])
				delete this.server[server].client[name];
		},
		createServer: function(fn, name){
			this.server[name] = {
				fn: fn,
				client: {}
			}
		},
		removeServer: function(name){
			delete this.server[name];
		},
		sendToClients: function(msg, server){
			if(this.server[server])
				$.each(this.server[server].client, function(i, val){
					val(msg);
				})
		},
		sendToClient: function(msg, client){
			this.server[server].clients[client](msg);
		},
		sendToServer: function(msg, server){
			this.server[server].fn(msg);
		}
	}

}(jQuery));/****js/component.js****/
(function($){
/** JUI2 component Class
	@class jui2.component
	@extend jui2
	@author Deddy Lasmono Putro
	@docauthor Deddy Lasmono Putro
 */
	component = function(){
	}
	
	jui2.component = function(opt) {
        return new component(opt);
    };
	
	jui2.component.fn = component.prototype;
	/** @method disable
		disable enabled UI
		@chainable
	*/
	jui2.component.fn.disable = function(){
		/*var el = $(this[0])
		if(!el.hasClass('j-disabled')){
			el.addClass('j-disabled');
			el.off('click')
		}*/
		if(!this.defaults.disabled)
			jui2.mask(this[0])
		this.defaults.disabled = !0;
		return this;
	}
	/** @method enable
		enable disabled UI
		@chainable
	*/
	jui2.component.fn.enable = function(){
		/*var el = $(this[0])
		if(el.hasClass('j-disabled')){
			el.removeClass('j-disabled');
			el.on('click',function(e){
				e.preventDefault;
				el[0].jui2.defaults.event.click(el[0].jui2)
			})
		}*/
		jui2.unmask(this[0])
		this.defaults.disabled = !1;
		return this;
	}
	/** @method destroy
		destroy UI
	*/
	jui2.component.fn.destroy = function(){
		if($(this[0].id+'-help').length > 0)
			$(this[0].id+'-help').remove()
		$(this[0]).remove()
		this[0] = null;
	}
	/** @method click
		Set or fire click event
		@chainable
	*/
	jui2.component.fn.click = function(fn){
		if(fn){
			this.defaults.event.click = fn
		}
		else{
			if(this.ev.click)
				this.ev.click()
		}
		return this;
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
		'.' : 190,
		'-' : 173
	}

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
		$(el).keydown(function (e) {
			if($.inArray(e.keyCode, tmp)>=0){
				return
			}
			else
				e.preventDefault();
		});
	}
}(jQuery));/****js/event.js****/
(function($){
	jui2.event = {
		click: function(self, el, param){
			$(el).click(function(e){
				e.preventDefault;
				if(typeof self.defaults.event.click == 'function')
					if(el.children('.jn-mask').length == 0){
						if(param){
							self.defaults.event.click(e, param);
						}
						else{
							self.defaults.event.click(e);
						}
					}
			})
			self.onclick = function(fn){
				this.defaults.event.click = fn;
			}
		},
		mouseenter: function(self, el, param){
			$(el).mouseenter(function(e){
				e.preventDefault;
				if(typeof self.defaults.event.mouseenter == 'function')
					if(!self.defaults.disabled){
						if(param){
							self.defaults.event.mouseenter(e, param);
						}
						else{
							self.defaults.event.mouseenter(e);
						}
					}
			})
			self.onmouseenter = function(fn){
				this.defaults.event.mouseenter = fn;
			}
		},
		mouseleave: function(self, el, param){
			$(el).mouseleave(function(e){
				e.preventDefault;
				if(typeof self.defaults.event.mouseleave == 'function')
					if(!self.defaults.disabled){
						if(param){
							self.defaults.event.mouseleave(e, param);
						}
						else{
							self.defaults.event.mouseleave(e);
						}
					}
			})
			self.onmouseleave = function(fn){
				this.defaults.event.mouseleave = fn;
			}
		}
	};
}(jQuery));/****js/widget.js****/
(function($){
	jui2.class.widget = P(function(widget) {
		
		widget.events = {}
		/**
		 * Initial process
		 * @param   {Object}   defaults Options to initialize the component with
		 * @returns {jui2} jui2 object
		 */
		
		widget.init = function(defaults) {
			
			var defaults = this.defaults = $.extend({}, {
					id: 'j-'+jui2.random(8, 'aA#'),
					template: '',
					target: false,
					parent: false,
					event: {}
				}, defaults);
		
			this.events = defaults.events || {};
			
			defaults.target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target) : $(defaults.target) : $('#'+defaults.id)

			if(defaults.target.hasClass('j-widget')){
				return defaults.target[0].jui2;
			}
			else{
				var prepared = this.prepared = this.prepare(defaults)
				prepared = this.render(prepared)
				prepared[0].jui2 = this;
				this[0] = prepared[0];
				this.length = 1;
			
				return this;
			}
		};
        /**
         * Function to create the initial element for widget from a template
         * @param   {Object} defaults Defaults options for template
         * @returns {jQuery} jQuery object
         */

		widget.prepare = function(defaults) {
			return  $(jui2.tmpl[this.defaults.template](defaults));
		};
		/**
		 * Function to add widget into DOM
		 * @param   {jQuery} prepared jQuery object
		 * @returns {jQuery} jQuery object
		 */
		
		widget.render = function(prepared){
			var defaults = this.defaults
			target = defaults.target
			defaults.parent && $(defaults.parent).append(prepared) || 0 in target && target.replaceWith(prepared) || $('body').append(prepared);
			return this.event(prepared)
		};
		/**
		 * Function to apply events
		 * @param   {jQuery} prepared jQuery object
		 * @returns {jQuery} jQuery object
		 */
		
		widget.event = function(prepared){
			$.each(this.events, function(i, val){
				if(i!='afterdraw')
					prepared = val(prepared)
			})
			
			return prepared;
		}
		/**
		 * Function that execute after draw event element appended or redraw into DOM
		 */
		
		widget.afterDraw = function(){
			if(this.events.afterdraw)
				this.events.afterdraw(this.prepared);
		}
		/**
		 * Function that execute after render event when widget appended into dom
		 */
		
		widget.afterRender = function(){
			if(this.events.afterrender)
				this.events.afterrender(this.prepared);
		}
		/**
		 * Disable widget
		 * @returns {jui2} jui2 object
		 */
		
		widget.disable = function(){
			if($(this[0]).children('.jn-mask').length == 0)
				$(this[0]).append('<div class="jn-mask"></div>');
			return this;
		}
		/**
		 * Enable widget
		 * @returns {jui2} jui2 object
		 */
		
		widget.enable = function(){
			$(this[0]).children('.jn-mask').remove();
			return this;
		}
		/**
		 * Destroy jui2 widget
		 */
		
		widget.destroy = function(){
			$(this[0]).remove()
		}
		
		widget.on = function(name, fn){
			this['on'+name.toLowerCase()](fn);
		}
		
	});
	
}(jQuery));/****js/utility/code.parseString.js****/
(function ($) {
	jui2.util.parseString = function(data, htmlContent, esc) {
		htmlContent = htmlContent || false
			esc = esc || true
			
			if (htmlContent) {
				content_data = data.html().trim();
			} else {
				content_data = data.text().trim();
			}
			
			if (esc) {
				content_data = decodeURIComponent(escape(content_data));
			}
			
			return content_data;
	}
}
	(jQuery))
;/****js/utility/export.csv.js****/
(function ($) {
	if (!jui2.util.export)
		jui2.util.export = {}
	jui2.util.export.csv = function (el, filename, ignoreColumn, ignoreRow) {
		var tdData = "";
		ignoreColumn = ignoreColumn || []
		ignoreRow = ignoreRow || []
		$(el).find('thead').find('tr').each(function () {
			tdData += "\n";
			$(this).filter(':visible').children().each(function (index, data) {
				if ($(this).css('display') != 'none' && ignoreRow.indexOf(index) == -1) {
					if (ignoreColumn.indexOf(index) == -1) {
						tdData += '"' + jui2.util.parseString($(this)) + '"' + ',';
					}
				}
				
			});
			tdData = $.trim(tdData);
			tdData = $.trim(tdData).substring(0, tdData.length - 1);
		});
		
		// Row vs Column
		$(el).find('tbody').find('tr').each(function () {
			tdData += "\n";
			$(this).filter(':visible').children().each(function (index, data) {
				if ($(this).css('display') != 'none' && ignoreRow.indexOf(index) == -1) {
					if (ignoreColumn.indexOf(index) == -1) {
						tdData += '"' + jui2.util.parseString($(this)) + '"' + ',';
					}
				}
			});
			//tdData = $.trim(tdData);
			tdData = $.trim(tdData).substring(0, tdData.length - 1);
		});
		
		var base64data = "base64," + $.base64.encode(tdData);
		//window.open('data:application/' + 'csv' + ';filename=exportData;' + base64data);
		var elHref = $('<a target="_blank"></a>').attr('href', 'data:application/' + 'csv' + ';filename='+filename+'.csv;' + base64data).attr('download', filename+'.csv').appendTo('body');
		elHref[0].click();
		elHref.remove();
	}
}
	(jQuery))
;/****js/utility/export.office.js****/
(function ($) {
	if (!jui2.util.export)
		jui2.util.export = {}
	
	jui2.util.export.office = function (html, filename, type) {
		type = type || 'excel'
			var excel = html;
		
		var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:" + type + "' xmlns='http://www.w3.org/TR/REC-html40'>";
		excelFile += "<head>";
		excelFile += "<!--[if gte mso 9]>";
		excelFile += "<xml>";
		excelFile += "<x:ExcelWorkbook>";
		excelFile += "<x:ExcelWorksheets>";
		excelFile += "<x:ExcelWorksheet>";
		excelFile += "<x:Name>";
		excelFile += "{worksheet}";
		excelFile += "</x:Name>";
		excelFile += "<x:WorksheetOptions>";
		excelFile += "<x:DisplayGridlines/>";
		excelFile += "</x:WorksheetOptions>";
		excelFile += "</x:ExcelWorksheet>";
		excelFile += "</x:ExcelWorksheets>";
		excelFile += "</x:ExcelWorkbook>";
		excelFile += "</xml>";
		excelFile += "<![endif]-->";
		excelFile += "</head>";
		excelFile += "<body>";
		excelFile += excel;
		excelFile += "</body>";
		excelFile += "</html>";
		
		var base64data = "base64," + $.base64.encode(excelFile);
		//window.open('data:application/vnd.ms-' + defaults.type + ';filename=exportData.doc;' + base64data);
		var fileType = 'xls'
		switch(type){
			case 'doc': fileType = 'doc';
			break;
			case 'powerpoint': fileType = 'ppt';
			break;
		}
		var elHref = $('<a target="_blank"></a>').attr('href', 'data:application/vnd.ms-' + type + ';filename='+filename + '.' + fileType + base64data).attr('download', filename + '.' + fileType).appendTo('body');
		elHref[0].click();
		elHref.remove();
	}
	
	jui2.util.export.fromJTableToOffice = function (el, filename, type, ignoreColumn) {
		type = type || 'excel'
			ignoreColumn = ignoreColumn || []
			var excel = "<table border='1px'>";
		// Header
		$(el).find('.j-table-head thead').find('tr').each(function () {
			excel += "<tr>";
			$(this).filter(':visible').children().each(function (index, data) {
				if ($(this).css('display') != 'none') {
					if (ignoreColumn.indexOf(index) == -1) {
						excel += "<td style='background: #F1F1F1;'>" + jui2.util.parseString($(this), true, true) + "</td>";
					}
				}
			});
			excel += '</tr>';
			
		});
		
		// Row Vs Column
		var rowCount = 1;
		$(el).find('.j-table-body tbody').find('tr').each(function () {
			excel += "<tr>";
			var colCount = 0;
			$(this).filter(':visible').children().each(function (index, data) {
				if ($(this).css('display') != 'none') {
					if (ignoreColumn.indexOf(index) == -1) {
						excel += "<td>" + jui2.util.parseString($(this), true, true) + "</td>";
					}
				}
				colCount++;
			});
			rowCount++;
			excel += '</tr>';
		});
		excel += '</table>'
		
		jui2.util.export.office(excel, filename, type);
	}
}
	(jQuery))
;/****js/widget/accordion.js****/
(function($){
	
	var accordion = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				items: [],
				event: {}
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_accordion(defaults));
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			output.children().click(function(e){
				defaults.event.click && defaults.event.click(this, $(this).index(), e);
			})
			
			self[0] = output;
			self.length = 1;
			
			return self;
			
		}
	}
	
	var $widget = jui2.accordion = function(opt) {
        return new accordion(opt);
    };
	
	$widget.fn = accordion.prototype;
	
	$widget.fn.disable = function(){
		var el = this[0]
		if(!el.hasClass('j-disabled')){
			el.addClass('j-disabled');
			if(el.data().events){
				el.data().events._click = el.data().events.click;
				el.data().events.click = null;
			}
		}
	}
	
	$widget.fn.enable = function(){
		var el = this[0]
		if(el.hasClass('j-disabled')){
			el.removeClass('j-disabled');
			if(el.data().events){
				el.data().events.click = el.data().events._click;
				el.data().events._click = null;
			}
		}
	}
	
}(jQuery));/****js/widget/bar.js****/
(function($){
/**
Widget class to create a menu bar or tab bar
@class bar
@param {object} options - Options to initialize the component with
@param {string} options.id - Id of the widget
@param {string} options.template - template name that will be used to generate widget
@param {boolean} options.disabled - wether the component is disabler or not
*/
	jui2.bar = jui2.class.bar = P(jui2.class.widget, function(bar, widget) {
		
		bar.init = function(defaults, events){
		
			var self = this
			
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_bar',
				disabled: false,
				items: []
			}, defaults)
			
			defaults.events = {
				afterrender: function(prepared){
					var n = prepared.children('.j-bar-next-item'), p = prepared.children('.j-bar-prev-item');
					n.click(function(){
						prepared.scrollLeft(prepared.scrollLeft()+100)
						//prepared.children('.j-bar-prev-item').show()
						if(prepared[0].scrollWidth == (prepared.scrollLeft()+prepared.outerWidth())){
							n.css('position', 'relative')
							prepared.scrollLeft(prepared.scrollLeft()+100)
						}
					})
					p.click(function(){
						prepared.scrollLeft(prepared.scrollLeft()-100)
						n.css('position', 'absolute')
						//if(prepared.scrollLeft()==0)
							//prepared.children('.j-bar-prev-item').hide()
					})
					if(prepared[0].scrollWidth>prepared.outerWidth()){
						n.appendTo(prepared).show();
						p.prependTo(prepared).show();
						prepared.css({
							'padding-right':29,
							'padding-left':29
						})
					}
					else{
						n.hide();
						p.hide();
						prepared.css({
							'padding-right':5,
							'padding-left':5
						})
					}
					
					$(window).on('resize', function(){
						if(prepared[0].scrollWidth>prepared.outerWidth()){
							n.appendTo(prepared).show();
							p.prependTo(prepared).show();
							n.css('position', 'absolute')
							prepared.css({
								'padding-right':29,
								'padding-left':29
							})
						}
						else{
							n.hide();
							p.hide();
							prepared.css({
								'padding-right':5,
								'padding-left':5
							})
						}
					})
					
					if(events)
						if(events.afterrender)
							events.afterrender(prepared)
					
					return prepared;
				},
				afterdraw: function(prepared, targetWidget){
					
					if(events)
						if(events.afterdraw)
							events.afterdraw(prepared, targetWidget)
					
					return prepared;
				}
			}
			
			return widget.init.call(this, defaults);
		}
		/**
		 * Overwrite render function on class widget and then call the actuall render function on class widget
		 * @param   {jQuery} prepared jQuery object
		 * @returns {jQuery} jQuery object
		 */
		
		bar.render = function(prepared){
			var items = this.defaults.items;
			for(var i = 0;i<items.length;i++){
				var obj = items[i];
				if(obj == '-'){
					jui2.spacer({parent: prepared});
				}
				else if(!obj.role){
					obj.label = obj.text;
					obj.parent = prepared;
					jui2.text(obj);
				}
				else if(typeof obj == 'string'){
					prepared.append(obj)
				}
				else{
					obj.parent = prepared;
					if(typeof jui2.class[obj.role]=='function')
						jui2.class[obj.role](obj);
					else
						jui2[obj.role](obj);
				}
			}
			
			this.defaults.type == 'tab' && (
				prepared.addClass('j-tab'),
				prepared.click(function(e){
					e.target.className.search('j-button') != -1 &&
						$(e.target).addClass('j-active').siblings().removeClass('j-active')
				})
			)
			
			//this.defaults.parent = parent;
			
			return widget.render.call(this, prepared);
			
		}
		
	});
	
}(jQuery));/****js/widget/button.js****/
	(function($){
	/** JUI2 button UI
		@class jui2.button
		@extends jui2.component
		@param {Object} button options
		@return {Object} jui2 button object
		@author Deddy Lasmono Putro
		@docauthor Deddy Lasmono Putro
		
			@example
			Example Usage:
			jui2.button({
				label: 'Button'
			})
		
			@example
		To create button with click event, you can add event using javascript like in this example:
			jui2.button({
				label: 'Button',
				event: {
					click: function(button){
						alert('Button clicked!');
					}
				}
			})
		
			@example
		This one is the HTML version example:
			<button jui2="true" role="button" event="event" label="Button"></button>
			<script>
				var event = {
					click: function(){
						alert('Button clicked!');
					}
				}
				jui2.create()
			</script>
	 */
	jui2.button = jui2.class.button = P(jui2.class.widget, function(button, widget) {
		/**
		 * Function to initiate widget creation
		 * @param   {Object} defaults Options to initialize the component with
		 * @returns {jui2}   jui2 object
		 */
		
		button.init = function(defaults){
			var self = this;
			
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_button',
				icon: '',
				label: '',
				disabled: false,
				color: 'normal',
				formBind: false,
				event: {}
			}, defaults)
			
			defaults.events = {
			
				click:  function(prepared){
				
				
						/*prepared.on('click', function(e){
						
							e.preventDefault;
							if(prepared.children('.jn-mask').length == 0){
								if(defaults.formBind){
									defaults.event.click(self)
								}
								else{
									defaults.event.click(self)
								}
							}
						})*/
						jui2.event.click(self, prepared, {widget: self})
					return prepared;
				},
			
				mouseenter:  function(prepared){
					jui2.event.mouseenter(self, prepared, {widget: self})
					return prepared;
				},
			
				mouseleave:  function(prepared){
					jui2.event.mouseleave(self, prepared, {widget: self})
					return prepared;
				}
				
			}
			
			return widget.init.call(this, defaults);
		}
		/**
		 * Set this button's label
		 * @param {String} label The button text
		 */
		
		button.setLabel = function(label){
			$(this[0]).children('span').text(label)
		}
		
		/**
		 * Set this button's badges
		 * @param {String} badges text
		 */
		
		button.setBadges = function(label){
			$(this[0]).children('.j-badges').remove();
			$(this[0]).append('<div class="j-badges">'+label+'</div>')
		}

	});
		
	}(jQuery));/****js/widget/calendar.js****/
(function($){
	
	var calendar = function(opt){
		var defaults = {id: 'j-no-id'}, self = this, format = 'DD-MM-YYYY';
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
			
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				type: 'calendar',
				lang: 'en',
				date: moment().format(format)
			}
			
			$.extend(!0, defaults, opt);
			
			if(moment(defaults.date, format).format()=='Invalid date')
				defaults.date = moment().format(format);
			defaults.datesOfMonth = jui2.tmpl.tmpl_calendarDate({
				weeks: self.getDatesOfMonth(moment(defaults.date, 'DD-MM-YYYY').startOf('month').diff(moment().startOf('month'), 'month'))
			})
			defaults.dateName = self.lang[defaults.lang];
			
			var output = $(jui2.tmpl.tmpl_calendar(defaults));
			
			//generate top toolbar
			
			var topToolbar = output.find('.j-calendar-top-toolbar')
			
			topToolbar.append($(jui2.tmpl.tmpl_datePickerHeader({})))
			
			
			topToolbar.find('.j-calendar-select-month span').text(moment(defaults.date, format).format('MMMM YYYY')).parent().click(function(){
				self.monthPicker();
			})
			topToolbar.find('button').eq(0).click(function(){
				self.changeMonth(-1)
			})
			topToolbar.find('button').eq(2).click(function(){
				self.changeMonth(1)
			})
			
			//generate bottom toolbar
			output.find('.j-calendar-bottom-toolbar').append($(jui2.tmpl.tmpl_datePickerFooter({}))).find('button').click(function(){
				self.month = 0
				self.changeMonth(0);
				self.value = moment().format(format);
				output.find('[value='+self.value+']').addClass('j-calendar-selected')
				if(self.event.click)
					self.event.click(self);
			})
			/*jui2.bar({
				parent: output.find('.j-calendar-bottom-toolbar'),
				//'class': 'j-bg-inherit',
				items: ['-', {
					role: 'button',
					label: 'Today',
					//'class': 'j-border-inherit',
					event:{
						click: function(){
							self.month = 0
							self.changeMonth(0);
							self.value = moment().format(format);
							output.find('[value='+self.value+']').addClass('j-calendar-selected')
							if(self.event.click)
								self.event.click(self);
						}
					}
				}, '-']
			})*/
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			self.month= moment(defaults.date, 'DD-MM-YYYY').startOf('month').diff(moment().startOf('month'), 'month');
			self.value= defaults.date;
			self.date= defaults.date;
			self.event= defaults.event;
			
			output[0].jui2 = self;
			output.find('[value='+self.value+']').addClass('j-calendar-selected')
			
			self.event.click = defaults.event.click && defaults.event.click;

			self.length = 1;
			
			output.find('tbody td').click(function(){
				output[0].jui2.value = $(this).attr('value')
				output.find('tbody td').removeClass('j-calendar-selected')
				$(this).addClass('j-calendar-selected')
				output[0].jui2.event.click && output[0].jui2.event.click(self)
			})
			
			self[0] = output[0];
			self.length = 1;
			
			return self;
			
		}
	}
	
	var $widget = jui2.calendar = function(opt) {
        return new calendar(opt);
    };
	
	$widget.fn = calendar.prototype;
	
	$widget.fn.disable = function(){
		var el = this[0]
		if(!el.hasClass('j-disabled')){
			el.addClass('j-disabled');
			if(el.data().events){
				el.data().events._click = el.data().events.click;
				el.data().events.click = null;
			}
		}
	}
	
	$widget.fn.enable = function(){
		var el = this[0]
		if(el.hasClass('j-disabled')){
			el.removeClass('j-disabled');
			if(el.data().events){
				el.data().events.click = el.data().events._click;
				el.data().events._click = null;
			}
		}
	}
	
	$widget.fn.changeMonth = function(offset){
		var self = this, el = $(this[0])
		self.month += offset;
		el.find('tbody').empty().append(jui2.tmpl.tmpl_calendarDate({weeks: self.getDatesOfMonth(self.month)}))
		el.find('.j-calendar-select-month span').text(moment().add('M', self.month).format('MMMM YYYY'))
		el.find('tbody td').click(function(){
			self.value = $(this).attr('value');
			el.find('tbody td').removeClass('j-calendar-selected');
			$(this).addClass('j-calendar-selected');
			self.event.click && self.event.click(self);
		})
	}
	
	$widget.fn.getDatesOfMonth = function(offset){
		offset = offset || 0;
		this.month = offset;
		var firstDate = moment().add('M', offset).startOf('month').startOf('week'), weeks = [];
		for(var i=0;i<42;i++){
			var weekNumber = ~~(i/7);
			if(!weeks[weekNumber])
				weeks[weekNumber] = []
			weeks[weekNumber].push({text: firstDate.get('D'), value: firstDate.format('DD-MM-YYYY')})
			firstDate.add('d',1)
		}
		return weeks;
	}
	
	$widget.fn.monthPicker = function(){
		var calendar = this, $el = $(this[0]), overlay = jui2.overlay({id: $(this[0]).attr('id')+'-overlay', overlayTarget: this[0], 'class': 'j-calendar-overlay', content:'<div style="flex:1;display: flex;"></div>'})
		var month = jui2.monthPicker({parent: '#'+$el.attr('id')+'-overlay div', 'class': 'j-calendar-monthPicker', month: this.value.split('-')[1]}), year = jui2.yearPicker({parent: '#'+$el.attr('id')+'-overlay div', 'class': 'j-calendar-yearPicker', year: this.value.split('-')[2]})
		calendar.overlay = overlay;
		jui2.bar({
			parent: '#'+$(this[0]).attr('id')+'-overlay',
			items:['-', {
				role: 'button',
				label: 'OK',
				'class': 'j-border-inherit',
				event: {
					click: function(self){
						calendar.changeMonth(moment(month.value+'-'+year.value, 'MM-YYYY').diff(moment($(calendar[0]).find('.j-calendar-select-month').text(),'MMM-YYYY'), 'month'));
						overlay.destroy();
						calendar.overlay = !1;
					}
				}
			},{
				role: 'button',
				label: 'Cancel',
				'class': 'j-border-inherit',
				event: {
					click: function(self){
						overlay.destroy();
						calendar.overlay = !1;
					}
				}
			}, '-']
		})
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
	$widget.fn.lang = {
		en: {
			sun: {
				'short': 'Sun',
				'long': 'Sunday'
			},
			mon: {
				'short': 'Mon',
				'long': 'Monday'
			},
			tue: {
				'short': 'Tue',
				'long': 'Tuesday'
			},
			wed: {
				'short': 'Wed',
				'long': 'Wednesday'
			},
			thu: {
				'short': 'Thu',
				'long': 'Thursday'
			},
			fri: {
				'short': 'Fri',
				'long': 'Friday'
			},
			sat: {
				'short': 'Sat',
				'long': 'Saturday'
			}
		}
	}
	
}(jQuery));/****js/widget/chart.js****/
(function($){
/** JUI2 chart UI
	@class jui2.input.chart
	@alternateClassName jui2.chart
	@extend jui2.component
	@param {Object} chart options
	@return {Object} jui2 chart object
	@author Deddy Lasmono Putro
	@docauthor Deddy Lasmono Putro
	Example Usage:
	
		@example
		jui2.chart({
			label: 'Textfield'
		})
		
	This one is the HTML version example:
	
		@example
		<input jui2="true" role="chart" label="Text field"></input>
		<script>
			jui2.create()
		</script>
 */
	var chart = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				/**
					@cfg {string} id
					will be auto generated string if leave blank
				*/
				id: 'j-'+jui2.random(8, 'aA#'),
				/**
					@cfg {boolean} disabled
					True if this menu button disabled
				*/
				disabled: !1,
				event: {},
				type: 'bar',
				data: []
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_chart(defaults));
			/**
					@cfg {String/HTMLElement/NodeList} parent
					Parent selector is a element selector wich this UI will be appended if exist
				*/
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			$inputs = output.find('input')
			
			jui2.keycodes.bind($inputs, 'esc,tab,delete,backspace,[0,9],[96,111]')//'tab,backspace,escape,[0,9],delete')
				
			if(defaults.event.keydown){
				$inputs.keydown(function(e){
					defaults.event.keydown(e, self);
				})
			}
			
			$inputs.eq(0).blur(function(){
				if($(this).val()>23)
					$(this).val(23)
				if($(this).val()<0)
					$(this).val(0)
				$(this).val(('00'+$(this).val()).substr((2+$(this).val().length)-2));
			})
			
			$inputs.eq(1).blur(function(){
				if($(this).val()>59 || $(this).val()<0)
					$(this).val(0)
				$(this).val(('00'+$(this).val()).substr((2+$(this).val().length)-2));
			})
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			output[0].jui2 = self;
			self[0] = output[0];
			self.length = 1;
			self.defaults = defaults
		
			return self;
			
		}
	}
	
	var $widget = jui2.chart = function(opt) {
        return new chart(opt);
    };
	
	$widget.fn = chart.prototype;
	/**
		@method val
		Get value
	*/
	$widget.fn.val = function(val){
		$el = $(this[0]).find('input')
		if(val){
			$el.eq(0).val(val.split(':')[0])
			$el.eq(1).val(val.split(':')[1])
		}
		return $el.eq(0).val()+':'+$el.eq(1).val();
	}
	/**
		@method reset
		Clear the value of UI
		@chainable
	*/
	$widget.fn.reset = function(){
		$(this[0]).find('input').val('')
		return this;
	}/*
	
	jui2.chart.fn.close = function(){
		this[0].hide()
		return this;
	}*/
	
	jui2.extend(jui2.component, $widget, ['click'])
	/**
		@method click
		@hide
	*/
	
}(jQuery));/****js/widget/checkbox.js****/
(function($){

	jui2.checkboxField = jui2.class.checkboxField = P(jui2.class.widget, function(checkboxField, widget) {
		/**
		 * Function to initiate widget creation
		 * @param   {Object} defaults Options to initialize the component with
		 * @returns {jui2}   jui2 object
		 */
		
		checkboxField.init = function(defaults){
			var self = this;
		
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_checkboxField',
				icon: '',
				label: '',
				disabled: false,
				required: false,
				event:{}
			}, defaults)
			
			defaults.events = $.extend({}, {
				
				require:  function(prepared){
					if(defaults.required!=false)
						if(!defaults.disabled){
							
						}
					return prepared;
				},
				afterrender: function(prepared){
					if(prepared.find('label').length == 0)
						prepared.css('width', '150px');
					return prepared;
				},
				click: function(prepared){
					
					if(typeof defaults.event.click == 'function')
						prepared.find('input').click(function(){
							if(!defaults.disabled){
								defaults.event.click(this.checked, self.value)
							}
						})
					
					return prepared;
				}
				
			}, defaults.events);
			
			return widget.init.call(this, defaults);
		}
		/**
		 * Call class widget render function
		 * @param   {jQuery} prepared jQuery object
		 * @returns {jQuery} jQuery object
		 */
		
		checkboxField.render = function(prepared){
			return widget.render.call(this, prepared);
		}
		/**
		 * Set or get value
		 * @param   {String} value The value to set
		 * @returns {String} Value
		 */
		
		checkboxField.val = function(value){
			value && $(this[0]).find('input').val(value)
			return $(this[0]).find('input').val()
		}
		/**
		 * Reset value
		 */
		
		checkboxField.reset = function(){
			$(this[0]).find('input').val('')
		}
		
	});
	
}(jQuery));/****js/widget/comboField.js****/
(function($){
	
	var comboField = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				server: !1,
				display: [1],
				pk: 0,
				firstload: !0,
				help: '',
				labelposition: 'left',
				class: '',
				datastore: false,
				template: false,
				datatemplate: false,
				length: 10,
				itemsWidth: false,
				height: '242px'
			}
			
			$.extend(!0, defaults, opt);
			
			
			var output = defaults.template && $(defaults.template(defaults)) || $(jui2.tmpl.tmpl_comboField(defaults));
			
			output.find('input').first().bind('keypress', function(evt){
				var keycode = evt.charCode || evt.keyCode;
				//if (keycode  == 13) { //Enter key's keycode
				return !0;
				//}
			}).keydown(function (e) {
				e.preventDefault();
			});
			
			output.find('.fa-times').on('click', function(){
				output.find('input').val('')
				return false;
			})
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
				
			output[0].jui2 = self;
			self[0] = output[0];
			self.length = 1;
			output[0].jui2.defaults = defaults
			
			if(typeof defaults.items == 'string'){
				output[0].jui2.param = {
					sEcho : -1,
					iDisplayLength : defaults.length,
					iDisplayStart : 0,
					iSortCol_0 : 0,
					sSearch : defaults.value||'',
					sSortDir_0 : '',
					iTotalRecords: 0
				}
				
				if(defaults.firstload)
					self.generateItemList()
				
				$(self[0]).click(function(e){
					self.itemsEl &&
						self.itemsEl.is(':visible') && self.itemsEl.hide() || self.generateItemList(!0)
					||
						self.generateItemList(!0)
				})
				output[0].jui2.param.sSearch = ''
			}
			else{
				var elInput = output.find('input')
				$.each(defaults.items, function(i, val){
					if(defaults.value)
						if(defaults.value.toString() == val.value.toString()){
							elInput.last().val(val.value)
							elInput.first().val(val.label)
						}
					if(defaults.itemsWidth){
						defaults.items[i].label = '<td style="width:100%;width:'+defaults.itemsWidth+';max-width:'+defaults.itemsWidth+'">'+val.label+'</td>'
					}else{
						defaults.items[i].label = '<td style="width:100%;max-width:100%">'+val.label+'</td>'
					}
				})
				var items = $(jui2.tmpl.tmpl_listItems({items: defaults.items, class: defaults.class, height: defaults.height}));
				if(defaults.itemsWidth){
					items.find('table').width(defaults.itemsWidth)
				}
				items.find('.j-listItems-bottom-toolbar').remove()
				items.find('.j-listItems-top-toolbar').remove()
				$(defaults.vr || 'body').append(items);
				items.css('z-index', jui2.findHighestZIndex()+1)
				output[0].jui2.tether = jui2.pin({
					element: items,
					target: output.find('input').first(),
					attachment: 'top left',
					targetAttachment: 'bottom left'
				})
				
				items.hide()
				
				jui2.oms.remove(defaults.id, 'body')
				
				jui2.oms.append(defaults.id, function(e){
					var $target = $(e.target)
					if(items.is(':visible') && $target.closest('.j-listItems').length ^ 1 && $target.closest('.j-comboField').length ^ 1)
						items.hide()
				}, 'body')
				
				items.click(function(e){
					var elTarget = e.target, elInput = output.find('input')
					if(elTarget.tagName == 'TD'){
						elInput.last().val($(elTarget).closest('tr').attr("value"))
						elInput.first().val(elTarget.innerHTML)
						items.hide()
						defaults.event.select && defaults.event.select($(elTarget).closest('tr').attr("value"), elTarget.innerHTML, [$(elTarget).closest('tr').attr("value"), elTarget.innerHTML], self)
						output.focus()
					}
				})
				
				output.click(function(e){
					/*if(items.is(':visible'))
						items.hide()
					else
						items.show();*/
					output[0].jui2.tether = jui2.pin({
						element: items,
						target: output.find('input').first(),
						attachment: 'top left',
						targetAttachment: 'bottom left'
					})
					if(output.find('input').attr('readonly')!='readonly'){
						items.is(':visible') && items.hide() || ($('[role=listItems]').hide(), items.show())
						output[0].jui2.tether.position()
					}
				})
				
				output.on('remove', function(){
					items.remove()
				});
			}
			
			var help = false;
			output.find('input').on('focus', function(){
				/*if(defaults.help.trim() != ''){
					if(jui2.help){
						help = jui2.popover({
							title: '<i class="fa fa-question-circle"></i>',
							pin: false,
							id: defaults.id+'-help',
							position: 'right',
							body: defaults.help,
							on: function(tg, el){
								jui2.pin({
									element: $(el),
									target: $(output),
									attachment: 'left verticalcenter',
									targetAttachment: 'right verticalcenter'
								})
								el.show();
								el.css('z-index', jui2.findHighestZIndex()+1)
							}
						})
					}
				}*/
			}).on('keydown', function(e){
				if(e.keyCode == 13)
					output.click();
			})
			
			return self;
			
		}
	}
	
	jui2.comboField = function(opt) {
        return new comboField(opt);
    };
	
	jui2.comboField.fn = comboField.prototype;
	
	jui2.comboField.fn.disable = function(){
		$(this[0]).find('input').attr('readonly', !0)
		return this;
	}
	
	jui2.comboField.fn.enable = function(){
		$(this[0]).find('input').removeAttr('readonly')
		return this;
	}
	
	jui2.comboField.fn.close = function(){
		this[0].hide()
	}
	
	jui2.comboField.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
	jui2.comboField.fn.search = function(sSearch){
		var self = this;
	}
	
	jui2.comboField.fn.val = function(value){
		if(value){
			if(this.param){
				var tmp = this.param.sSearch, self = this
				self.defaults.value = self.param.sSearch = value || ''
				self.param.sSearch = value
				self.generateItemList();
				return value || $(self[0]).find('input').last().val();
			}
			else{
				var tmp = false, self = this
				self.defaults.value = value || ''
				$.each(self.defaults.items, function(i, val){
					if(val.value==value){
						$(self[0]).find('input').first().val(val.label.replace(/(<([^>]+)>)/ig, ''))
						$(self[0]).find('input').last().val(val.value)
					}
				})
				return value || $(self[0]).find('input').last().val();
			}
		}
		else{
			return $(this[0]).find('input').last().val();
		}
	}
	
	jui2.comboField.fn.reset = function(){
		var $input = $(this[0]).find('input');
		$input.last().val('')
		$input.first().val('')
	}
	
	jui2.comboField.fn.generateItemList = function(show){
		var show = show, self = this, param = self.param, $input = $(this[0]).find('input'), $self = $(self[0]), defaults = self.defaults;
		param.sEcho++;
		
		var process = function(data){
			if(param.sEcho==data.sEcho){
				self.items = new Array();
				self.data = {};
				param.totalPage = data.iTotalRecords-1;
				if(data.aaData){
					jui2.clearNullFromJson(data.aaData);
					for(var i=0;i<param.iDisplayLength;i++){
						if(data.aaData[i]){
							var val = data.aaData[i], label = '', display = [];
							for(z=0;z<defaults.display.length;z++){
								label += '<td style="padding-right: 10px;">'+val[defaults.display[z]]+'</td>'
								display.push(val[defaults.display[z]])
							}
							if(defaults.value)
								if(defaults.value.toString() == val[defaults.pk].toString()){
									$input.first().val(display.join(', '))
									$input.last().val(val[defaults.pk])
								}
							self.data[val[defaults.pk]] = val
							self.items.push({label: label, value: val[defaults.pk]})
						}
					}
				}
				$.each(data, function(i, val){
					param[i] = i^'aaData' && val
				})
				param.iTotalRecords = data.iTotalRecords
				//var dataToBeShowed = (self.defaults.server == !0) ? self.aaData().start(0).limit(self.param.iDisplayLength).get() : self.aaData().start(self.param.iDisplayStart).limit(self.param.iDisplayLength).get();
				var items = $(jui2.tmpl.tmpl_listItems({items: self.items, 'displayName': defaults['display-name'], class: defaults.class, valueSearch: param.sSearch}));
				
				self.itemsEl && self.itemsEl.remove();
				
				$self.on('remove', function(){
					self.itemsEl.remove()
				});
				
				self.itemsEl = items;
				
				$(defaults.vr || 'body').append(items);
				
				items.find('.j-listItems-top-toolbar input').on('keydown', function(e){
					if(e.keyCode==13){
						param.sSearch = $(this).val()
						param.iDisplayStart  = 0;
						self.generateItemList(!0)
					}
				})
				
				/*items.find('.j-listItems-top-toolbar button').on('click', function(e){
					param.sSearch = items.find('.j-listItems-top-toolbar input').val()
					param.iDisplayStart  = 0;
					self.generateItemList(!0)
				})*/
				/*jui2.bar({
					parent: items.find('.j-listItems-top-toolbar'),
					items:[{
						role: 'textField',
						icon: 'fa-search',
						'class': 'j-listItems-searchText',
						value: param.sSearch,
						event:{
							keydown: function(e, textfield){
								if(e.keyCode==13){
									param.sSearch = textfield.val()
									param.iDisplayStart  = 0;
									self.generateItemList(!0)
								}
							}
						}
					},{
						role: 'button',
						label: 'Search',
						event: {
							click: function(e){
								param.sSearch = $(e[0]).parents('.j-listItems-top-toolbar').find('.j-listItems-searchText input').val()
								param.iDisplayStart  = 0;
								self.generateItemList(!0)
							}
						}
					}]
				})*/
				
				var botToolbar = items.find('.j-listItems-bottom-toolbar')
				botToolbar.find('.j-icon:nth-child(1)').click(function(){
					if(+param.iDisplayStart>0){
						param.iDisplayStart = +param.iDisplayStart- +param.iDisplayLength
						self.generateItemList(!0)
					}
				})
				
				botToolbar.find('.j-icon:nth-child(3)').click(function(){
					if((-~(param.iDisplayStart/param.iDisplayLength))<-~(param.iTotalRecords/param.iDisplayLength)){
						param.iDisplayStart = +param.iDisplayStart+ +param.iDisplayLength
						self.generateItemList(!0)
					}
				})
				
				botToolbar.find('.j-icon:nth-child(4)').click(function(){
					self.generateItemList(!0)
				})
				
				//botToolbar.find('.j-itemList-pageOf').text('Page '+(-~(param.iDisplayStart/param.iDisplayLength))+'/'+ -~(param.iTotalRecords/param.iDisplayLength))
				botToolbar.find('.j-itemList-pageOf input').on('keydown', function(e){
					if(e.keyCode==13){
						param.iDisplayStart = $(this).val()*param.iDisplayLength-param.iDisplayLength
						if($(this).val()>-~(param.iTotalRecords/param.iDisplayLength))
							param.iDisplayStart = -~(param.iTotalRecords/param.iDisplayLength) * param.iDisplayLength - param.iDisplayLength
						if($(this).val()<0)
							param.iDisplayStart = 0
						self.generateItemList(!0)
					}
				}).val((-~(param.iDisplayStart/param.iDisplayLength)))
				botToolbar.find('.j-itemList-pageOf span').text(Math.ceil(param.iTotalRecords/param.iDisplayLength))
				
				items.css('z-index', jui2.findHighestZIndex()+1)
				
				self.tether = jui2.pin({
					element: items,
					target: $self.find('input').first(),
					attachment: 'top left',
					targetAttachment: 'bottom left'
				})
				
				jui2.oms.remove($self.attr('id'), 'body')
				
				jui2.oms.append($self.attr('id'), function(e){
					if(items.is(':visible') && $(e.target).closest('.j-listItems').length ^ 1 && $(e.target).closest('.j-comboField').length != 1)
						items.remove()
				}, 'body')
				
				items.click(function(e){
					if($(e.target).closest('tr').length==1 && !$(e.target).closest('tr').hasClass('j-listItems-header')){
						var el = $(e.target).closest('tr'), optionTexts = [], $input = $self.find('input'), ev = defaults.event;
						el.find('td').each(function() { optionTexts.push($(this).text()) });
						$input.last().val(el.attr("value"))
						$input.first().val(optionTexts.join(', '))
						items.hide()
						/*if(ev.select)
							ev.select(el.attr("value"), optionTexts)*/
						ev.select && ev.select(el.attr("value"), optionTexts, self.data[el.attr("value")], self)
						$self.focus()
					}
				})
				
				$self.unbind('click').click(function(){
					items.is(':visible') && items.hide() || self.generateItemList(!0)
				})
				
				items.hide()
				
				if($self.find('input').attr('readonly')!='readonly'){
					!show && items.hide() || ($('[role=listItems]').hide(), items.show(), self.tether.position())
				}
				
				items.find('.j-listItems-searchText input').focus();
				items.find('.j-listItems-searchText input').on('blur', function(){
					$('#'+defaults.id+'-help').remove();
				});
				
				var th = items.find('thead > tr > td')
				items.find('tbody tr').eq(0).children().each(function(i, val){
					if(th.eq(i).width()>$(val).width())
						$(val).css('width', th.eq(i).width())
					else
						th.eq(i).css('width', $(val).width())
				})
				
				items.find('input')[0].setSelectionRange(999,999);
			
			}
			
			if(defaults.event.afterDraw){
				defaults.event.afterDraw();
			}
		}
		
		if(defaults.datastore){
			defaults.datastore.load(process);
		}
		else{
			$.ajax({
				dataType: "json",
				url: defaults.items,
				data: param
			}).done(function(data){
				process(data);
			})
		}
	}
	
}(jQuery));/****js/widget/dataView.js****/
(function($){

	jui2.class.dataView = P(jui2.class.widget, function(dataView, widget) {
		
		dataView.init = function(defaults){
		
			this.defaults = defaults = $.extend({}, this.defaults, {
				template: 'tmpl_dataView',
				dataTemplate: 'tmpl_dataViewData',
				disabled: false,
				totalColumn: 999,
				width: 'auto',
				height: 'auto'
			}, defaults)
			
			var self = this;
			
			defaults.events = $.extend({}, {
			
				afterdraw: function(prepared){
					if(defaults.event)
						if(defaults.event.afterdraw){
							defaults.event.afterdraw(self);
						}
					return prepared;
				},
				
				afterrender: function(prepared){
					if(defaults.event)
						if(defaults.event.afterrender){
							defaults.event.afterrender(self);
						}
					return prepared;
				}
				
			}, defaults.events || {});
			
			this.param = {
				sEcho: -1,
				iDisplayLength: 10,
				iDisplayStart: 0,
				iSortCol_0: 0,
				sSearch: '',
				sSortDir_0: '',
				iTotalRecords: 0
			}
			
			return widget.init.call(this, defaults);
		}
		
		dataView.render = function(prepared){
			this.generateData();
			return widget.render.call(this, prepared);
		}
		
		dataView.getData = function(prepared, url){
			var self = this;
			self.param.sEcho++;
			$.getJSON(url, self.param).done(function(data){
				if(data.sEcho == self.param.sEcho){
					self.genDataJson(data)
				}
			})
			
		}
		
		dataView.genDataJson = function(data){
			var prepared = this.prepared, body = $(prepared).find('.jn-body-data'), defaults = this.defaults;
			this.param.iTotalRecords = data.iTotalRecords
			body.empty();
			jui2.clearNullFromJson(allData);
			
			var allData = data.aaData
			
			this.aaData = $.extend(true, data.aaData);
			
			if(allData!= null){
				if(defaults.custom)
					for(var i=0;i<allData.length;i++){
						for(j in defaults.custom){
							allData[i][j] = defaults.custom[j](this.aaData[i])
						}
					}
				$.each(allData, function(i, val){
					var tmp = val.slice(0, defaults.totalColumn)
					var row = $(jui2.tmpl[defaults.dataTemplate]({data: tmp}))
					body.append(row)
				})
			}
			
			return this.afterDraw(prepared)
		}
		
		dataView.genDataArray = function(data){
			var prepared = this.prepared, body = $(prepared).find('.jn-body-data'), defaults = this.defaults;
			$.each(data, function(i, val){
				var tmp = val.slice(0, defaults.totalColumn), tpl = typeof defaults.dataTemplate == 'string' ? jui2.tmpl[defaults.dataTemplate] : defaults.dataTemplate;
				var row = $(tpl({'data': tmp}))
				row[0].record = val;
				console.log(body, 'asd', row[0]);
				body.append(row)
			})
			
			this.aaData = data;
			
			return this.afterDraw(prepared)
		}
		
		dataView.generateData = function(data){
			if(this.defaults.event.beforedraw){
				this.defaults.event.beforedraw(this.prepared)
				console.log('asd')
			}
			if(this.defaults.server)
				this.getData(this.prepared, this.defaults.url);
			else
				this.genDataArray(data || this.defaults.data);
			return this;
		}
		
		dataView.goToFirst = function(){
			this.param.iDisplayStart = 0;
			this.generateData()
		}
		
		dataView.back = function(){
			this.param.iDisplayStart = this.param.iDisplayStart-(1*this.param.iDisplayLength);
			if(this.param.iDisplayStart<0)
				this.param.iDisplayStart = 0
			this.generateData()
		}
		
		dataView.next = function(){
			if(this.defaults.event.beforedraw){
				this.defaults.event.beforedraw(this.prepared)
			}
			this.param.iDisplayStart = this.param.iDisplayStart+(1*this.param.iDisplayLength);
			if(this.param.iDisplayStart>Math.ceil((this.param.iTotalRecords/this.param.iDisplayLength)*this.param.iDisplayLength))
				this.param.iDisplayStart = Math.floor(this.param.iTotalRecords/this.param.iDisplayLength)*this.param.iDisplayLength
			this.generateData()
		}
		
		dataView.goToLast = function(){
			this.param.iDisplayStart = Math.ceil((this.param.iTotalRecords/this.param.iDisplayLength-1))*this.param.iDisplayLength;
			this.generateData()
		}
		
		dataView.refresh = function(){
			this.generateData()
		}
		
		dataView.goTo = function(page){
			this.param.iDisplayStart = (page-1)*this.param.iDisplayLength;
			this.generateData();
		}
		
		dataView.getPage = function(){
			return ~~(this.param.iDisplayStart/this.param.iDisplayLength+1)
		}
		
		dataView.getTotal = function(){
			return ~~Math.ceil((this.param.iTotalRecords/this.param.iDisplayLength-1))+1;
		}
		
		dataView.afterDraw = function(prepared){
			return this.defaults.events.afterdraw(prepared);
		}
		
		dataView.getSelected = function(){
			return this.selected;
		}
		
		dataView.addItems = function(items){
			
		}
		
	});
	
	jui2.dataView = jui2.class.dataView
	
}(jQuery));/****js/widget/datePicker.js****/
(function($, $j){
	
	var datePicker = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+$j.random(8, 'aA#'),
				disabled: !1,
				event: {}
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $($j.tmpl.tmpl_datePicker(defaults));
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			output.find('input').click(function(){
				output[0].jui2.showPicker();
			})
			
			output.find('i').click(function(){
				output[0].jui2.showPicker();
				output.find('input').focus()
			})
			
			self.monthPicker = !1
			self.defaults = defaults
			output[0].jui2 = self;
			
			self[0] = output[0];
			self.length = 1;
			
			$j.oms.remove(output.attr('id'), 'body')
			
			$j.oms.append(output.attr('id'), function(e){
				var el = self[0], target = $(e.target), elJui2 = self[0].jui2;
				
				0 in target.closest('.j-calendar-select-month') &&
					(elJui2.monthPicker = !0)
				|| elJui2.calendar &&
					0 in target.closest(elJui2.calendar[0]) &&
						(elJui2.monthPicker = !1)
				/*if(target.closest('.j-calendar-select-month').length == 1)
					elJui2.monthPicker = !0
				else if(elJui2.calendar)
					if(target.closest(elJui2.calendar[0]).length==1)
						elJui2.monthPicker = !1*/
				//if(target.closest(output).length ^ 1 && elJui2.monthPicker == !1 && elJui2.calendar && target.closest(elJui2.calendar[0]).length ^ 1){
				//console.log(target.closest(output).length ^ 1, !elJui2.monthPicker, elJui2.calendar, target.closest(elJui2.calendar[0]).length ^ 1,self[0].jui2.calendar, self[0].jui2,self[0])
				if(target.closest(output).length ^ 1 && !elJui2.monthPicker && elJui2.calendar && target.closest(elJui2.calendar[0]).length ^ 1){
					elJui2.calendar.destroy();
					elJui2.calendar=!1;
				}
				//if( output[0].jui2.calendar)
				if(output[0].jui2.calendar)
					if(target.closest(output).length == 0 &&  target.closest(output[0].jui2.calendar).length == 0 &&  target.closest('.j-calendar-overlay').length == 0){
						elJui2.calendar.overlay &&
							elJui2.calendar.overlay.destroy &&
								elJui2.calendar.overlay.destroy()
						elJui2.calendar.destroy();
						elJui2.calendar=!1;
					}
			}, 'body')
			
			return self;
			
		}
	}
	
	var $widget = $j.datePicker = function(opt) {
        return new datePicker(opt);
    };
	
	$widget.fn = datePicker.prototype;
	
	$widget.fn.disable = function(){
		
	}
	
	$widget.fn.enable = function(){
		
	}
	
	$widget.fn.close = function(){
		this[0].hide()
	}
	
	$widget.fn.val = function(val, el){
		el = $(this[0]).find('input')
		val && el.val(val)
		return el.val();
	}
	
	$widget.fn.reset = function(){
		$(this[0]).find('input').val('')
	}
	
	$widget.fn.destroy = function(el){
		el = this[0]
		$j.oms.remove(el.attr('id'), 'body')
		el.remove()
		el = null;
	}
	
	$widget.fn.showPicker = function(){
		var elJui2 = this[0].jui2, $elInput = $(this[0]).find('input'), format = this.defaults.format, defFormat = 'DD-MM-YYYY', self = this;
		if(!elJui2.calendar)
			elJui2.calendar = $j.calendar({
				date: format ? moment($elInput.val(), format).format(defFormat) : $elInput.val(),
				event:{
					click: function(cal){
						$elInput.val(format ? moment(cal.value, defFormat).format(format) : cal.value);
						cal.destroy();
						elJui2.calendar = null;
						$elInput.focus();
						if(self.defaults.event.select)
							self.defaults.event.select(format ? moment(cal.value, defFormat).format(format) : cal.value);
					}
				}
			})
			
			
			$(elJui2.calendar[0]).css('z-index', $j.findHighestZIndex()+1)
			
			$j.pin({
				element: elJui2.calendar[0],
				target: $elInput,
				attachment: 'top left',
				targetAttachment: 'bottom left'
			})
			/*new Tether({
				element: elJui2.calendar[0],
				target: $elInput,
				attachment: 'top left',
				targetAttachment: 'bottom left',
				constraints: [{
					to: 'window',
					attachment: 'together none',
					pin: !0
				}]
			});*/
	}
	
}(jQuery, jui2));/****js/widget/group.js****/
(function($){
	
	var group = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				items: [],
				event: {},
				type: 'group'
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_group(defaults));
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			for(var i = 0;i<defaults.items.length;i++){
				var obj = defaults.items[i];
				obj.parent = output;
				jui2[obj.role](obj);
			}
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			self[0] = output;
			self.length = 1;
			
			return self;
			
		}
	}
	
	var $widget = jui2.group = function(opt) {
        return new group(opt);
    };
	
	$widget.fn = group.prototype;
	
	$widget.fn.disable = function(){
		var el = this[0]
		if(!el.hasClass('j-disabled')){
			el.addClass('j-disabled');
			if(el.data().events){
				el.data().events._click = el.data().events.click;
				el.data().events.click = null;
			}
		}
	}
	
	$widget.fn.enable = function(){
		var el = this[0]
		if(el.hasClass('j-disabled')){
			el.removeClass('j-disabled');
			if(el.data().events){
				el.data().events.click = el.data().events._click;
				el.data().events._click = null;
			}
		}
	}
	
}(jQuery));/****js/widget/icon.js****/
(function($){
	
	var icon = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {}
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_icon(defaults));
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
				
			self.defaults = defaults
			self.ev = {}
			if(typeof defaults.event.click == 'function'){
				self.ev.click = function(){
					if(!defaults.disabled)
						defaults.event.click(self)
				}
				output.on('click', function(e){
					e.preventDefault;
					self.ev.click();
				});
			}
			
			self[0] = output;
			self.length = 1;
			
			return self;
			
		}
	}
	
	var $widget = jui2.icon = function(opt) {
        return new icon(opt);
    };
	
	$widget.fn = icon.prototype;
	
	$widget.fn.disable = function(){
		var el = this[0], clsDis = 'j-disabled'
		if(!el.hasClass(clsDis)){
			el.addClass(clsDis);
			if(el.data().events){
				el.data().events._click = el.data().events.click;
				el.data().events.click = null;
			}
		}
	}
	
	$widget.fn.enable = function(){
		var el = this[0], clsDis = 'j-disabled'
		if(el.hasClass(clsDis)){
			el.removeClass(clsDis);
			if(el.data().events){
				el.data().events.click = el.data().events._click;
				el.data().events._click = null;
			}
		}
	}
	
}(jQuery));/****js/widget/layout.js****/
(function($){

	jui2.class.layout = P(jui2.class.widget, function(layout, widget) {
		
		layout.init = function(defaults, events){
		
			var self = this
			
			defaults = $.extend(true, {}, this.defaults, {
				template: 'tmpl_layout_',
				layout: 'horizontal',
				items: [],
				width: 'auto',
				height: 'auto'
			}, defaults)
			
			defaults.events = {
				afterRender: function(prepared){
					
					if(prepared.parent().hasClass('jn-layout-content')){
						prepared.css({
							height: '100%'
						}).parent().css({
							border: '0px'
						})
					}
				
					prepared.find('.jn-layout-content').each(function(i, val){
						if(defaults.layout == 'horizontal')
							$(val).outerWidth($(val).outerWidth())
						else
							$(val).outerHeight($(val).outerHeight())
					})
					
					var el = prepared.find('.jn-layout-border-vertical');
					el.each(function(i, val){
						new Draggabilly( val, {axis: 'x'}).on( 'dragStart', function(){
							} ).on( 'dragEnd', function(){
							var pwidth = parseInt($(this.element).prev().outerWidth())+parseInt(this.dragPoint.x),
								nwidth = parseInt($(this.element).next().outerWidth())-parseInt(this.dragPoint.x)
							$(this.element).prev().outerWidth(pwidth)
							$(this.element).next().outerWidth(nwidth)
							$(this.element).css('left', 0)
							} );
					})
					
					var el = prepared.find('.jn-layout-border-horizontal');
					el.each(function(i, val){
						new Draggabilly( val, {axis: 'y'}).on( 'dragStart', function(){
							} ).on( 'dragEnd', function(){
							var pheight = parseInt($(this.element).prev().outerHeight())+parseInt(this.dragPoint.y),
								nheight = parseInt($(this.element).next().outerHeight())-parseInt(this.dragPoint.y)
							$(this.element).prev().outerHeight(pheight)
							$(this.element).next().outerHeight(nheight)
							$(this.element).css('top', 0)
							} );
					})
					
					var items = defaults.items
					for(var i=0;i<items.length;i++){
						if(items[i].child){
							items[i].child.parent = '#'+items[i].id
							var data = $.extend(true,items[i].child)
							jui2.class.layout(data)
						}
					}
					
					if(events)
						if(events.afterrender)
							events.afterrender(prepared)
					
					return prepared;
				}
			}
			
			defaults.template += defaults.layout;
			
			return widget.init.call(this, defaults);
		}
		
		layout.render = function(prepared){
			return widget.render.call(this, prepared);
		}
		
	});
	
}(jQuery));/****js/widget/loadingMask.js****/
(function($){
	jui2.loadingMask = function(target){
		return jui2.overlay({
			overlayTarget: target,
			'class': 'j-background-transparent j-textCenter',
			content: jui2.tmpl.tmpl_loadingMask(),
			event: {
				afterRender: function(self){
					$(self[0]).find('div').center();//.flexVerticalCenter()
				}
			}
		})
	}
}(jQuery));/****js/widget/loadingMaskProgress.js****/
(function($){
	jui2.loadingMaskProgress = function(target){
		var self = jui2.overlay({
			overlayTarget: target,
			'class': 'j-background-transparent j-textCenter',
			content: jui2.tmpl.tmpl_loadingMaskProgress({width: '250px'}),
			event: {
				afterRender: function(self){
					$(self[0]).find('div').center();//.flexVerticalCenter()
				}
			}
		})
		self.setProgress = function(pct){
			$(self).find('.j-progress-bar div').width(pct+'%')
		}
		return self
	}
}(jQuery));/****js/widget/menu.js****/
(function($){
	
	var menu = function(opt){
		var self = this, defaults = {id: 'j-no-id'};
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				parent: 'body',
				menu: []
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_menu(defaults));

			0 in target &&  target.replaceWith(output) || $('body').append(output);
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else{
				$('body').append(output);
			}*/
			
			var haveChild = output.find('.j-menu-item').not('[items="undefined"]')//.siblings()
			var i = haveChild.length;
			while(i--){
				$(haveChild[i]).attr('parent', !0).removeAttr('items');
				var menu = defaults.menu[$(haveChild[i]).index()].menu;
				jui2.menu({parent: $(haveChild[i]), menu: menu, child: !0, parentId: defaults.id});
			}
			
			output.hide();
			
			output[0].jui2 = self;
			
			var targetAttachment = defaults.child ? 'top right' : 'bottom left';
			/*if(defaults.child){
				targetAttachment = 'top right';
			}*/
			if($('#'+output.attr('id')).length>0){
				output[0].jui2.tether = jui2.pin({
					element: output,
					target: $(defaults.parent),
					attachment: 'top left',
					targetAttachment: targetAttachment
				})
				/*new Tether({
					element: output,
					target: $(defaults.parent),
					attachment: 'top left',
					targetAttachment: targetAttachment,
					constraints: [{
						to: 'window',
						attachment: 'together none',
						pin: !0
					}]
				});*/
			}
			if(defaults.child){
				var $jMenuSub = $('.j-menu-'+defaults.parentId)
				$(defaults.parent).mouseover(function(){
					$jMenuSub.hide();
					output[0].jui2.showMenu()
				}).siblings().not('[parent=true]').mouseover(function(){
					$jMenuSub.hide();
				})
			}
			
			self.length = 1;
			
			output.click(function(e){
				var $menu = defaults.menu[$(e.target).closest('.j-menu-item').index()];
				$menu.event&&$menu.event.click&&$menu.event.click()
			})
			
			jui2.oms.append(output.attr('id'), function(e){
				var $elMenuItem = $(e.target).closest('.j-menu-item');
				if(!$(e.target).closest(output).length == 1 && $(e.target).closest($(defaults.parent)).length == 0){
					if(!$elMenuItem.attr('parent'))
						output.hide();
						output.css('z-index', 0)
				}
				else{
					if(!output.is(':visible'))
						output[0].jui2.showMenu()
					else
						if(!$elMenuItem.attr('parent')){
							output.hide()
							output.css('z-index', 0)
						}
				}
			}, 'body')
			
			self[0] = output[0];
			return self;
			
		}
	}
	
	var $widget = jui2.menu = function(opt) {
        return new menu(opt);
    };
	
	$widget.fn = menu.prototype;
	
	$widget.fn.showMenu = function(){
		var el = $(this[0]), $target = $(this[0].jui2.tether.target), $tetherEl = $(this[0].jui2.tether.element), tether = this[0].jui2.tether
		if(!el.is(':visible'))
			el.show();
		if($target.attr('parent')){
			if($target.parent().position().left+$target.parent().width()+$tetherEl.width()>=$(document).width()){
				tether.setOptions({
					element: $tetherEl,
					target: $target,
					attachment: 'top right',
					targetAttachment: 'top left'
				})
				tether.position()
				/*.setOptions({
					element: $tetherEl,
					target: $target,
					attachment: 'top right',
					targetAttachment: 'top left',
					constraints: [{
						to: 'window',
						attachment: 'together none',
						pin: !0
					}]
				})*/
			}
			else if(tether.attachment.left == 'right'){
				tether.setOptions({
					element: $tetherEl,
					target: $target,
					attachment: 'top left',
					targetAttachment: 'top right'
				})
				tether.position()
				/*this[0].jui2.tether.setOptions({
					element: $tetherEl,
					target: $target,
					attachment: 'top left',
					targetAttachment: 'top right',
					constraints: [{
						to: 'window',
						attachment: 'together none',
						pin: !0
					}]
				})*/
			}
		}
		tether.position();
		el.css('z-index', jui2.findHighestZIndex()+1)
	}
	
}(jQuery));/****js/widget/menuButton.js****/
(function($){
/** JUI2 menu button UI
	@class jui2.button.menuButton
	@extend jui2.button.button
	@param {Object} menuButton options
	@return {Object} jui2 menuButton object
	@author Deddy Lasmono Putro
	@docauthor Deddy Lasmono Putro
	Example Usage:
	
		@example
		jui2.menuButton({
			label: 'Menu Button'
		})
		
	To create button with click event, you can add event using javascript like in this example:
	
		@example
		jui2.menuButton({
			label: 'Menu Button',
			event: {
				click: function(menuButton){
					console.log('Split Button clicked!');
				}
			}
		})
		
	This one is the HTML version example:
	
		@example
		<button jui2="true" role="menuButton" event="event"></button>
		<script>
			var event = {
				click: function(){
					console.log('Menu Button clicked!');
				}
			}
			jui2.create()
		</script>
 */
	var menuButton = function(opt){
		var self = this;
		var defaults = {id: 'j-no-id'};
		
		$.extend(!0, defaults, opt)
			
		/**
			@cfg {selector} target
			A selector of target element that will be replaced with this UI
		*/
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				/**
					@cfg {string} id
					will be auto generated string if leave blank
				*/
				id: 'j-'+jui2.random(8, 'aA#'),
				/**
					@cfg {string} label
					Text that will be shown on menu button
				*/
				label: '',
				/**
					@cfg {string} icon
					CSS class of icon
				*/
				icon: '',
				/**
					@cfg {boolean} disabled
					True if this menu button disabled
				*/
				disabled: !1,
				/**
					@cfg {Array} menu
					Array of menu that will be shown when drop down icon clicked
				*/
				menu: []
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_menuButton(defaults));
			
			/**
				@cfg {String/HTMLElement/NodeList} parent
				Parent selector is a element selector wich this UI will be appended if exist
			*/
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			jui2.menu({parent: output, menu: defaults.menu});
			
			self[0] = output;
			
			self[0].jui2 = {}
			
			self.length = 1;
			
			return self;
			
		}
	}
	
	var $widget = jui2.menuButton = function(opt) {
        return new menuButton(opt);
    };
	
	$widget.fn = menuButton.prototype;
	jui2.extend(jui2.button, $widget, ['click'])
	
	/**
		@method click
		@hide
	*/
	
	jui2.modul.menuButton = $widget
	
}(jQuery));/****js/widget/modal.js****/
(function($){
	
	var modal = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				content: '',
				event: {},
				overlay: true
			}
			
			$.extend(!0, defaults, opt);
			
			var content = jui2.tmpl.tmpl_modal(defaults);
			
			/*jui2.bar({
				parent: content.find('.j-modal-top-toolbar'),
				items:['-', {
					role: 'button',
					icon: 'fa-times',
					event: {
						click: function(){
							console.log('close');
						}
					}
				}]
			})*/
			
			
			if(defaults.overlay == false){
				var output = $(content);
				$('body').append(output);
			}
			else{
				var output = jui2.overlay({
					event: defaults.event,
					overlayTarget: 'body',
					'class': 'j-background-transparent j-modal-overlay',
					id: defaults.id,
					content: content
				})
			}
			
			jui2.bar({
				parent: $(output[0]).find('.j-modal-top-toolbar'),
				class: 'j-color-toolbar-white j-title-bar',
				items:[{
					text: defaults.title
				},'-', {
					role: 'button',
					icon: 'fa-times',
					event: {
						click: function(){
							self.destroy()
						}
					}
				}]
			})
			
			//
			
			/*Midway()
			Midway()*/
			if(defaults.overlay == true){
				drag($(output[0]).find('.j-modal')[0]).handle($(output[0]).find('.j-modal-top-toolbar')[0]).bind();
				$(output[0]).children().center();
			}
			else{
				drag(output[0]).handle(output.find('.j-modal-top-toolbar')[0]).bind();
				output.center();
			}
			
			//self.loadingMask = jui2.loadingMask($(output[0]))
			
			$.ajax({
				url: defaults.content
			}).done(function(content){
				$(output[0]).find('.j-modal-content').append(content)
				if(defaults.overlay == true)
					$(output[0]).children().center();
				else{
					output.center();
				}
			})
			
			output[0].jui2 = self;

			self[0] = output[0];
			self.length = 1;
	
			return self;
			
		}
	}
	
	var $widget = jui2.modal = function(opt) {
        return new modal(opt);
    };
	
	$widget.fn = modal.prototype;
	
	$widget.fn.disable = function(){
		
	}
	
	$widget.fn.enable = function(){
		
	}
	
	$widget.fn.close = function(){
		$(this[0]).hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).find('.j-modal').remove()
		$(this[0]).remove()
		this[0] = null;
	}
	
}(jQuery));/****js/widget/monthPicker.js****/
(function($){
	
	var monthPicker = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				parent: 'body',
				lang: 'en',
				month: moment().format('MM')
			}
			
			$.extend(!0, defaults, opt);
			
			defaults.monthsName = jui2.lang.monthPicker[defaults.lang];
			
			var output = $(jui2.tmpl.tmpl_monthPicker(defaults));
			
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			output.find('tbody td:contains('+jui2.lang.monthPicker[defaults.lang][moment(defaults.month+'-2000', 'MM-YYYY').format('MMM').toLowerCase()].short+')').addClass('j-monthPicker-selected')
			
			self[0] = output;
			self.length = 1;
			output[0].jui2 = self;
			self.value=defaults.month;
			
			output.find('tbody td').click(function(){
				var index = $(this).index(), $el = $(this), clsSel = 'j-monthPicker-selected';
				
				index == 1 && (index = 6)
				/*if(index==1){
					index=6;
				}*/
				output[0].jui2.value = $el.parent().index()+1+index;
				output.find('tbody td').removeClass(clsSel);
				$el.addClass(clsSel);
			})
			
			return self;
			
		}
	}
	
	var $widget = jui2.monthPicker = function(opt) {
        return new monthPicker(opt);
    };
	
	$widget.fn = monthPicker.prototype;
	
	$widget.fn.disable = function(){
		var el = this[0]
		if(!el.hasClass('j-disabled')){
			el.addClass('j-disabled');/*
			if(el .data().events){
				el .data().events._click = el .data().events.click;
				el .data().events.click = null;
			}*/
			el .data().events&&(
				el .data().events._click = el .data().events.click,
				el .data().events.click = null
			)
		}
	}
	
	$widget.fn.enable = function(){
		var el = this[0]
		if(el.hasClass('j-disabled')){
			el.removeClass('j-disabled');/*
			if(el .data().events){
				el .data().events.click = el .data().events._click;
				el .data().events._click = null;
			}*/
			el .data().events&&(
				el .data().events.click = el .data().events._click,
				el .data().events._click = null
			)
		}
	}
	
	$widget.fn.close = function(){
		this[0].hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
	}
	
}(jQuery));/****js/widget/overlay.js****/
(function($){
	
	var overlay = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				overlayTarget: 'body'
			}
			
			$.extend(!0, defaults, opt);
			
			defaults.top = defaults.top || $(defaults.overlayTarget).offset().top
			/*if(!defaults.top)
				defaults.top = $(defaults.overlayTarget).position().top*/
			
			defaults.left = defaults.left || $(defaults.overlayTarget).offset().left
			/*if(!defaults.left)
				defaults.left = $(defaults.overlayTarget).position().left*/
			
			defaults.width = defaults.width || $(defaults.overlayTarget).width()
			/*if(!defaults.width)
				defaults.width = $(defaults.overlayTarget).width()*/
			
			defaults.height = defaults.height || $(defaults.overlayTarget).height()
			/*if(!defaults.height)
				defaults.height = $(defaults.overlayTarget).height()*/

			var output = $(jui2.tmpl.tmpl_overlay(defaults));
			
			$('body').append(output);
			
			output.css('z-index', jui2.findHighestZIndex()+1)
			
			output[0].jui2 = this;
			self[0] = output[0];
			self.length = 1;
			
			defaults.event.afterRender && defaults.event.afterRender(this)
			/*if(defaults.event.afterRender){
				defaults.event.afterRender(this);
			}*/
			
			output.children('.j-modal').center()
			
			return self;
			
		}
	}
	
	var $widget = jui2.overlay = function(opt) {
        return new overlay(opt);
    };
	
	$widget.fn = overlay.prototype;
	
	$widget.fn.disable = function(){
		
	}
	
	$widget.fn.enable = function(){
		
	}
	
	$widget.fn.close = function(){
		this[0].hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
	$widget.fn.center = function(){
		$(self[0]).children('.j-modal').center()
	}
	
}(jQuery));/****js/widget/pagination.js****/
	(function($){
	/** JUI2 pagination UI
		@class jui2.pagination
		@extends jui2.component
		@param {Object} pagination options
		@return {Object} jui2 pagination object
		@author Deddy Lasmono Putro
		@docauthor Deddy Lasmono Putro
		
			@example
			Example Usage:
			jui2.pagination({
				label: 'pagination'
			})
		
			@example
		To create pagination with click event, you can add event using javascript like in this example:
			jui2.pagination({
				label: 'pagination',
				event: {
					click: function(pagination){
						alert('pagination clicked!');
					}
				}
			})
		
			@example
		This one is the HTML version example:
			<pagination jui2="true" role="pagination" event="event" label="pagination"></pagination>
			<script>
				var event = {
					click: function(){
						alert('pagination clicked!');
					}
				}
				jui2.create()
			</script>
	 */
		var pagination = function(opt){
			var defaults = {id: 'j-no-id'}, self = this;
			
			$.extend(!0, defaults, opt)
				
			/**
				@cfg {selector} target
				A selector of target element that will be replaced with this UI
			*/
			
			var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

			/*if(defaults.target)
				var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
			else
				var target = $('#'+defaults.id)*/
			
			if(target.hasClass('j-body')){
				return target[0].jui2;
				/*self[0] = target;
				self.length = 1;
				
				return self;*/
			}
			else{
			
				opt = opt || {}
				var defaults = {
					/**
						@cfg {string} id
						will be auto generated string if leave blank
					*/
					id: 'j-'+jui2.random(8, 'aA#'),
					/**
						@cfg {string} label
						Text that will be shown on pagination
					*/
					prev: false,
					next: false,
					refresh: false,
					changepage: false,
					/**
						@cfg {boolean} disabled
						True if this pagination disabled
					*/
					disabled: !1,
					/**
						@cfg {Object} event
						@cfg {Function} event.click
						Click event that fired when UI is clicked on
						@param {object} JUI2 pagination UI object
					*/
					event: {},
					targetel: false,
					template: false
				}
				
				$.extend(!0, defaults, opt);
				
				var output = defaults.template && $(defaults.template(defaults)) || $(jui2.tmpl.tmpl_pagination(defaults));
				
				/**
					@cfg {String/HTMLElement/NodeList} parent
					Parent selector is a element selector wich this UI will be appended if exist
				*/
				
				if(defaults.targetel)
					defaults.parent = $(defaults.targetel).find('.j-toolbar-header')
				0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
				
				self.defaults = defaults
				
				output[0].jui2 = self;
				self[0] = output[0];
				self.length = 1;
				
				if(defaults.targetel){
					jui2(defaults.targetel)[0].pagination = output
					output.find('.j-pagination-prev').click(function(){
						jui2(defaults.targetel)[0].prev()
					})
					output.find('.j-pagination-next').click(function(){
						jui2(defaults.targetel)[0].next()
					})
					output.find('.j-pagination-page input').keydown(function(e){
						jui2(defaults.targetel)[0].goTo(e, $(this))
					})
					output.find('.j-pagination-refresh').click(function(e){
						if (jui2(defaults.targetel)[0].defaults.server)
							jui2(defaults.targetel)[0].generateData()
					})
				}
			
				return self;
				
			}
		}
		
		var $widget = jui2.pagination = function(opt) {
			return new pagination(opt);
		};
		
		$widget.fn = pagination.prototype;
		
		$widget.fn.setTargetEl = function(selector){
			if(this.defaults.targetel && jui2(this.defaults.targetel)[0])
				jui2(this.defaults.targetel)[0].pagination = false;
			this.defaults.targetel = selector;
			jui2(this.defaults.targetel)[0].pagination = $(this[0])
		}
		
		jui2.extend(jui2.component, $widget)
		
		jui2.modul.pagination = $widget
		
	}(jQuery));/****js/widget/panel.js****/
;/****js/widget/popover.js****/
(function($){
	
	var popover = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				event: {},
				type: 'popover',
				position: 'top',
				on: false,
				pin: true
			}
			
			$.extend(!0, defaults, opt);
			
			switch(defaults.position){
				case 'top':
					defaults.arrow = 'bottom'
					break;
				case 'bottom':
					defaults.arrow = 'top'
					break;
				case 'left':
					defaults.arrow = 'right'
					break;
				case 'right':
					defaults.arrow = 'left'
					break;
			}
			
			var output = $(jui2.tmpl.tmpl_popover(defaults));
			
			$('body').append(output);
			
			self[0] = output;
			self.length = 1;
			
			if(defaults.pin)
				switch(defaults.position){
					case 'top':
						output.tether = jui2.pin({
							element: output,
							target: $(defaults.parent),
							attachment: 'bottom horizontalcenter',
							targetAttachment: 'top horizontalcenter'
						})
						defaults.arrow = 'bottom'
						break;
					case 'bottom':
						output.tether = jui2.pin({
							element: output,
							target: $(defaults.parent),
							attachment: 'top horizontalcenter',
							targetAttachment: 'bottom horizontalcenter'
						})
						defaults.arrow = 'top'
						break;
					case 'left':
						output.tether = jui2.pin({
							element: output,
							target: $(defaults.parent),
							attachment: 'right verticalcenter',
							targetAttachment: 'left verticalcenter'
						})
						defaults.arrow = 'right'
						break;
					case 'right':
						output.tether = jui2.pin({
							element: output,
							target: $(defaults.parent),
							attachment: 'left verticalcenter',
							targetAttachment: 'right verticalcenter'
						})
						defaults.arrow = 'left'
						break;
				}
			
			output.hide();
			if(!defaults.on)
				$(defaults.parent).on('mouseover', function(){
					output.show();
				}).on('mouseout', function(){
					output.hide();
				})
			else
				defaults.on(defaults.parent, output);
			
			return self;
			
		}
	}
	
	var $widget = jui2.popover = function(opt) {
        return new popover(opt);
    };
	
	$widget.fn = popover.prototype;
	
	$widget.fn.show = function(){
		var el = this[0]
		el.show()
	}
	
	$widget.fn.hide = function(){
		var el = this[0]
		el.hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
}(jQuery));/****js/widget/radio.js****/
(function($){

	jui2.radioField = jui2.class.radioField = P(jui2.class.widget, function(radioField, widget) {
		
		radioField.init = function(defaults){
			var self = this;
			
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_radioField',
				icon: '',
				label: '',
				disabled: false,
				required: false,
				name: 'j-'+jui2.random(8, 'aA#'),
				event: {}
			}, defaults)
			
			defaults.events = $.extend({}, {
				
				require:  function(prepared){
					if(defaults.required!=false)
						if(!defaults.disabled){
							
						}
					return prepared;
				},
				afterrender: function(prepared){
					if(prepared.find('label').length == 0)
						prepared.css('width', '150px');
					return prepared;
				},
				click: function(prepared){
					if(typeof defaults.event.select == 'function'){
						prepared.find('input').click(function(){
							if(!defaults.disabled){
								defaults.event.select(self.val())
							}
						})
					}
					
					return prepared;
				}
				
			}, defaults.events);
			
			return widget.init.call(this, defaults);
		}
		
		radioField.render = function(prepared){
			return widget.render.call(this, prepared);
		}
		
		radioField.val = function(value){
			value && $(this[0]).find('input[value='+value+']').prop('checked', true)
			return $(this[0]).find('input:checked').val()
		}
		
		radioField.reset = function(value){
			//$(this[0]).find('input').val('')
		}
		
	});
	
}(jQuery));/****js/widget/rightMenu.js****/
(function($){
	
	var rightMenu = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				rightMenuTarget: 'body',
				class: 'j-right-menu'
			}
			
			$.extend(!0, defaults, opt);

			var output = $(jui2.tmpl.tmpl_menu(defaults));
			
			$(defaults.rightMenuTarget).append(output).bind('mousedown', function(e) {
				e = e || window.event;
				switch (e.which) {
					case 3:
						if(defaults.event.beforeshow){
							defaults.event.beforeshow(self, e)
						}
						$('.j-right-menu').hide()
						$(self[0]).show().offset({ top: e.pageY, left: e.pageX})
					break; 
				}
			}).bind('contextmenu', function(){
				return false;
			})/*;
			
			$(defaults.rightMenuTarget)*/.click(function(e){
				if($(e.target).hasClass('j-tree-head')){
					var $menu = defaults.menu[$(e.target).closest('.j-menu-item').index()];
					if($menu)
						$menu.event&&$menu.event.click&&$menu.event.click()
					$(e.target).parents('.j-right-menu').hide();
				}
			})
			
			output.hide();
			
			output.css('z-index', jui2.findHighestZIndex()+1)
			
			output[0].jui2 = this;
			self[0] = output[0];
			self.length = 1;
			self.defaults = defaults
			self.output = output
			
			return self;
			
		}
	}
	
	var $widget = jui2.rightMenu = function(opt) {
        return new rightMenu(opt);
    };
	
	$widget.fn = rightMenu.prototype;
	
	$widget.fn.disable = function(){
		
	}
	
	$widget.fn.enable = function(){
		
	}
	
	$widget.fn.close = function(){
		this[0].hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
	$widget.fn.center = function(){
		$(self[0]).children('.j-modal').center()
	}
	
	$widget.fn.items = function(menu){
		var self = this
		self.defaults.menu = menu
		self[0].remove();
		self.output = $(jui2.tmpl.tmpl_menu(self.defaults));
		$(self.defaults.rightMenuTarget).append(self.output)/*
		
		$(self.defaults.rightMenuTarget)*/.click(function(e){
			var $menu = self.defaults.menu[$(e.target).closest('.j-menu-item').index()];
			$menu.event&&$menu.event.click&&$menu.event.click()
			$(e.target).parents('.j-right-menu').hide();
		})
		
		self.output.css('z-index', jui2.findHighestZIndex()+1)
		self.output[0].jui2 = this;
		self[0] = self.output[0]
	}
	
}(jQuery));/****js/widget/slider.js****/
(function($){

	jui2.slider = jui2.class.slider = P(jui2.class.widget, function(slider, widget) {
		
		slider.init = function(defaults, events){
		
			var self = this
			
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_slider',
				disabled: false,
				snap: false,
				items: [],
				event: {}
			}, defaults)
			
			defaults.events = {
				afterRender: function(prepared){
					if(self.defaults.snap)
						self.grid = (parseInt(prepared.width())-15)/(defaults.items.length-1)
					 else
						self.grid = (parseInt(prepared.width())-15)/self.defaults.items[self.defaults.items.length-1][0]
					new Draggabilly( prepared.find('.jn-slider-cursor')[0], {containment: prepared[0],axis: 'x', grid: [self.grid,0]}).on( 'dragStart', function(){
					} ).on( 'dragMove', function(){
						if(defaults.event.move){
							if(self.defaults.snap)
								self.value = defaults.items[Math.round(this.position.x/self.grid)][0]
							else{
								self.value = Math.round(this.position.x/self.grid)
							}
							defaults.event.move(self)
						}
					} ).on( 'dragEnd', function(){
						if(self.defaults.snap)
							self.value = defaults.items[Math.round(this.position.x/self.grid)][0]
						else
							self.value = Math.round(this.position.x/self.grid)
					} );
					self.value = defaults.items[0][0]
					
					prepared.find('.jn-slider-bar').click(function(e){
						if($(e.target).hasClass('jn-slider-bar')){
							relX = e.pageX - $(this).offset().left;
							if(self.defaults.snap){
								self.value = defaults.items[Math.round(relX/self.grid)][0]
								relX = Math.round(relX/self.grid) * self.grid
							}
							else{
								self.value = Math.round(relX/self.grid)
							}
							$(this).find('.jn-slider-cursor').css('left', relX)
							if(defaults.event.move){
								defaults.event.move(self)
							}
						}
					})
					
					return prepared;
				}
			}
			
			return widget.init.call(this, defaults);
		}
		
		slider.val = function(val){
			var self = this ;
			if(val){
				if(self.defaults.snap){
					var step = 0, left = 0;
					$.each(self.defaults.items, function(i, val){
						if(val[1]!=val)
							step++;
					})
					left = step*self.grid
					$(self[0]).find('.jn-slider-cursor').css('left', left)
					self.value = val//self.defaults.items[Math.round(left/self.grid)][0]
				}
				else{
					left = val * self.grid;
					$(self[0]).find('.jn-slider-cursor').css('left', left)
					self.value = val
				}
			}
			return self.value;
		}
		
	});
	
}(jQuery));/****js/widget/slimPagination.js****/
(function($){

	jui2.class.pagination = P(jui2.class.bar, function(pagination, bar) {
		
		pagination.events = 
		
		pagination.init = function(defaults){
			var self = this;
			
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_slimPagination',
				targetId: false,
				disabled: false,
				event: {}
			}, defaults)
			
			events = {
			
				afterrender:  function(prepared){
					if(defaults.targetId != false || defaults.jui2Object != false){
						var targetWidget = jui2(defaults.targetId)[0] || defaults.jui2Object, page = prepared.find('.jn-pagination-page'), text = prepared.find('.jn-pagination-text-of');
						prepared.find('.jn-pagination-first').click(function(){
							targetWidget.goToFirst()
							page.val(targetWidget.getPage())
							text.text(' of '+targetWidget.getTotal())
						})
						prepared.find('.jn-pagination-back').click(function(){
							targetWidget.back()
							page.val(targetWidget.getPage())
							text.text(' of '+targetWidget.getTotal())
						})
						prepared.find('.jn-pagination-next').click(function(){
							targetWidget.next()
							page.val(targetWidget.getPage())
							text.text(' of '+targetWidget.getTotal())
						})
						prepared.find('.jn-pagination-last').click(function(){
							targetWidget.goToLast()
							page.val(targetWidget.getPage())
							text.text(' of '+targetWidget.getTotal())
						})
						prepared.find('.jn-pagination-refresh').click(function(){
							targetWidget.refresh()
							page.val(targetWidget.getPage())
							text.text(' of '+targetWidget.getTotal())
						})
						prepared.find('.jn-pagination-page').keyup(function (e) {
							if (e.keyCode == 13) {
								targetWidget.goTo($(this).val())
								text.text(' of '+targetWidget.getTotal())
							}
						});
					}
					if(typeof defaults.event.afterrender == 'function')
							defaults.event.afterrender(self)
					return prepared;
				},
				afterdraw: function(prepared, targetWidget){
					prepared.find('.jn-pagination-text-of').text(' of '+targetWidget.getTotal())
					
					if(typeof defaults.event.afterdraw == 'function')
							defaults.event.afterdraw(self)
					return prepared;
				}
				
			}
			
			return bar.init.call(this, defaults, events);
		}

	});
	
}(jQuery));/****js/widget/slimTable.js****/
(function($){

	jui2.slimTable = jui2.class.slimTable = P(jui2.class.dataView, function(table, dataView) {
		
		table.init = function(defaults){
			var self = this;
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_slimTable',
				dataTemplate: 'tmpl_slimTableData',
				headerTemplate: 'tmpl_tableHeader',
				editableTemplate: 'tmpl_tableEditable',
				editablemode: 'single',
				editable: {},
				drop: [0]
			}, defaults)
			
			this.tmp = {};
			
			defaults.totalColumn = defaults.columns[defaults.columns.length-1].length
			
			defaults.events = {
				afterrender: function(prepared){
					var header = $(jui2.tmpl[defaults.headerTemplate]({columns: self.defaults.columns}))
					prepared.find('.jn-header-data').append(header);
					$(prepared.children()[2]).scroll(function(){
						$(prepared.children()[1]).scrollLeft($(this).scrollLeft())
					})
					if(self.defaults.topbar){
						var bar = jui2.class.bar({items: self.defaults.topbar, target: self.prepared.children('.jn-header'), 'class': 'j-color-toolbar-white'})
						$(bar[0]).css('border-bottom', '1px')
					}
					
					if(self.defaults.server)
						self.pagination = jui2.class.pagination({jui2Object: self, target: self.prepared.find('.jn-footer')})
						
					prepared.find('.jn-body-data tr td').dblclick(function(){
						self.editable($(this).index())
					})
					
					if(self.defaults.event.afterrender)
						self.defaults.event.afterrender(self);
						
					return prepared;
				},
				beforedraw: function(prepared){
					jui2.mask2(prepared)
					return prepared;
				},
				afterdraw: function(prepared){
					
					var header = prepared.find('.jn-header-data tr:last-child td > div'), defaults = self.defaults
					
					$.each(defaults.drop, function(i, val){
						prepared.find('.jn-body-data tr td:nth-child('+(val+1)+') div').click(function(){
							self.drop(self, $(this).parent().parent(), $(this).parent().index())
						}).empty().append('<i class="fa fa-plus-square-o"></i>')
					})
					
					header.each(function(i, val){
						prepared.find('.jn-body-data td:nth-child('+(i+1)+') > div').css('width', $(val).css('width'))
							
					})
					
					prepared.find('.jn-body-data').scroll(function() {
						prepared.find('.jn-header-data').scrollLeft(this.scrollLeft)
						if(prepared.find('.jn-header-data')[0].scrollWidth-this.scrollWidth>20){
							var w = prepared.find('.jn-header-data td:last-child').width()+20
							prepared.find('.jn-header-data td:last-child').outerWidth(w)
							prepared.find('.jn-header-data td:last-child div').outerWidth(w)
						}
						if(this.scrollWidth>prepared.find('.jn-header-data')[0].scrollWidth){
							var w = prepared.find('.jn-header-data td:last-child').width()-20
							prepared.find('.jn-header-data td:last-child').outerWidth(w)
						}
					});
					
					prepared.find('.jn-body-data tr').click(function(){
						$(this).siblings().children().removeClass('jn-active')
						$(this).children().addClass('jn-active')
						$(this).find('[name=select]').prop('checked', true);
						var objValue = {}
						$.each(self.aaData[$(this).index()], function(i, val){
							objValue[i] = val;
						})
						self.selected = objValue
					})
					
					prepared.find('.jn-body-data tr > td').dblclick(function(){
						var $el = $(this), index = $(this).index(), $parent = $el.parent();
						if(defaults.editable[index]){
							$parent[0].defaultInnerHTML = $parent.children().clone(!0);
							var colspan = $parent.children().length-1
							if(defaults.editablemode == 'single')
								var element = typeof defaults.editable[index] == 'function' ? defaults.editable[index](self.aaData[$parent.index()]) : defaults.editable[index]
							else{
								var element = '';
								$.each(defaults.editable, function(i,val){
									element += typeof val == 'function' ? val(self.aaData[$parent.index()]) : val
									element += '<br/>'
								})
							}

							$parent.empty().append('<td></td><td colspan="'+colspan+'"><div>'+element+'</div></td>').addClass('j-editable')
							jui2.button({
								label: 'Save',
								event: {
									click: function(){
										var data = $($parent).jui2Serialize();
										for(i in data){
											value = data[i]
										}
										if(defaults.editablemode == 'single')
											defaults.save(self, value, index, data[$(this).parent().index()], $parent.index());
										else
											defaults.save(self, data, index, data[$(this).parent().index()], $parent.index());
										$parent.empty().empty().append($parent[0].defaultInnerHTML).removeClass('j-editable')
									}
								},
								parent: $parent.children().children()[0]
							});
							jui2.button({
								label: 'Cancel',
								event: {
									click: function(){
										$parent.empty().empty().append($parent[0].defaultInnerHTML).removeClass('j-editable')
									}
								},
								parent: $parent.children().children()[0]
							});
							jui2.create(defaults.vr.substring(1).trim())
							$($($parent.children().children()[0]).children()[0]).attr('tabindex', 1).keydown(function (e) {
								if (e.which == 13) {
									$($parent.children().children()[0]).find('button:contains(Save)').click()
									return false;
								}
							});
						}
					})
					
					prepared.find('.jn-body-data > tr > td:first-child, .jn-header-data > tr > td:first-child').css('border-left', '0px')
					prepared.find('.jn-body-data > tr > td:last-child, .jn-header-data > tr > td:last-child').css('border-right', '0px')
					
					if(defaults.height!='auto'){
						var ow = 0;
						
						prepared.children().not('.jn-table-body').each(function(i, val){
						  ow+=$(val).outerHeight();
						})

						ow = ow + prepared.children('.jn-table-body').find('.jn-header-data').outerHeight()

						prepared.find('.jn-body-data').outerHeight((prepared.height()-ow)+'px')
					}
					
					if(self.defaults.server){
						self.pagination.defaults.events.afterdraw($(self.pagination[0]), self)
					}
					
					jui2.unmask(prepared);
					
					return prepared;
				}
			}
			
			return dataView.init.call(this, defaults);
		}
		
		table.editable = function(index){
			var el = this[0].children().children('.jn-body-data').children().children().eq(index), editable = this.defaults.editable;
			el[0].editable = this[0].children().children('.jn-body-data').children().children().eq(index);
			if(editable[index])
				el.replaceWith($(jui2.tmpl[self.defaults.editableTemplate](editable[index])))
		}
		
		table.editableCancel = function(){
			var el = this[0].children().children('.jn-body-data').children().children().eq(index)
			el.replaceWith(el[0].editable)
		}
		
		table.drop = function(self, el, index){
			if(self.defaults.event.drop){
				if(!el.next().hasClass('jn-table-drop')){
					el.siblings().hide()
					el.children().eq(0).children().empty().append('<i class="fa fa-minus-square-o"></i>')
					var colspan = el.children().length, tr = $(jui2.tmpl['tmpl_tableDrop']({'colspan': colspan}))
					tr.insertAfter(el)
					self.defaults.event.drop(tr, [self.aaData[el.index()]], index);
				}
				else{
					el.children().eq(0).children().empty().append('<i class="fa fa-plus-square-o"></i>')
					el.next().remove();
					el.siblings().show()
				}
			}
		}
		
	});
	
}(jQuery));/****js/widget/spacer.js****/
(function($){
	
	var spacer = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
		
			self[0] = target;
			self.length = 1;
			
			return self;
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {}
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_spacer(defaults));
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			self[0] = output;
			self.length = 1;
			
			return self;
			
		}
	}
	
	var $widget = jui2.spacer = function(opt) {
        return new spacer(opt);
    };
	
	$widget.fn = spacer.prototype;
	
}(jQuery));/****js/widget/splitButton.js****/
(function($){
/** JUI2 button UI
	@class jui2.button.splitButton
	@alternateClassName jui2.splitButton
	@extends jui2.button.button
	@param {Object} splitButton options
	@return {Object} jui2 splitButton object
	@author Deddy Lasmono Putro
	@docauthor Deddy Lasmono Putro
	Example Usage:
	
		@example
		jui2.splitButton({
			label: 'Split Button'
		})
		
	To create button with click event, you can add event using javascript like in this example:
	
		@example
		jui2.splitButton({
			label: 'Split Button',
			event: {
				click: function(splitButton){
					console.log('Split Button clicked!');
				}
			}
		})
		
	This one is the HTML version example:
	
		@example
		<button jui2="true" role="splitButton" event="event"></button>
		<script>
			var event = {
				click: function(){
					console.log('Split Button clicked!');
				}
			}
			jui2.create()
		</script>
 */
	var splitButton = function(opt){
		var self = this, defaults = {id: 'j-no-id'};
		
		$.extend(!0, defaults, opt)
			
		/**
			@cfg {selector} target
			A selector of target element that will be replaced with this UI
		*/
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				/**
					@cfg {string} id
					will be auto generated string if leave blank
				*/
				id: 'j-'+jui2.random(8, 'aA#'),
				/**
					@cfg {string} label
					Text that will be shown on split button
				*/
				label: '',
				/**
					@cfg {string} icon
					CSS class of icon
				*/
				icon: '',
				/**
					@cfg {boolean} disabled
					True if this split button disabled
				*/
				disabled: !1,
				/**
					@cfg {Array} menu
					Array of menu that will be shown when drop down icon clicked
				*/
				menu: [],
				/**
					@cfg {Object} event
					@cfg {Function} event.click
					@param {object} JUI2 splitButton UI object
					Click event that fired when UI is clicked on
				*/
				event: {}
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_splitButton(defaults));
			
			/**
				@cfg {String/HTMLElement/NodeList} parent
				Parent selector is a element selector wich this UI will be appended if exist
			*/
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			jui2.menu({parent: output.find('i')[1], menu: defaults.menu});
			
			self[0] = output;
			
			self[0].jui2 = {}
			
			self.length = 1;
			
			self.ev = {}
			
			if(typeof defaults.event.click == 'function'){
				self.ev.click = function(){
					if(!defaults.disabled)
						defaults.event.click(self)
				}
				output.find('i').last().siblings().on('click', function(e){
					e.preventDefault;
					self.ev.click()
				});
			}
			
			return self;
			
		}
	}
	
	var $widget = jui2.splitButton = function(opt) {
        return new splitButton(opt);
    };
	
	$widget.fn = splitButton.prototype;
	jui2.extend(jui2.button, $widget)
	
	jui2.modul.splitButton = $widget
	
}(jQuery));/****js/widget/table.js****/
(function($){
	
	var table = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
			/*opt = opt || {}*/
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				width: 'auto',
				height: 'auto',
				columns: [],
				server: !1,
				hidden:[],
				custom:!1,
				drop: [],
				editable: {},
				editablemode: 'single',
				vr: '',
				merge: [],
				stickycolumn: [],
				followhead: jui2.data.followHead,
				autorefresh: false,
				preload:false
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_table(defaults));
			
			var jTableHead = output.children('.j-table-head'), jTableBody = output.children('.j-table-body')
			
			output[0].jui2 = self;
			self[0] = output[0];
			self.length = 1;
			output[0].jui2.defaults = defaults
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
				
			defaults.topbar = [].concat(defaults.topbar);
			if(defaults.topbar[0])
				jui2.bar({
					parent: output.find('.j-table-top-toolbar'),
					'class': 'j-color-toolbar-white',
					items: defaults.topbar
				});
			output.children('.j-table-preview').on('dblclick', function(){
				$(this).empty();
			})
			var jui2Param = output[0].jui2.param = {}
			
			jui2Param.iSortCol = 0
			jui2Param.sSortDir = 'asc'
			
			if(output[0].jui2.defaults.param){
				$.each(output[0].jui2.defaults.param, function(i, val){
					jui2Param[i] = val
				})
			}
			
			if(typeof defaults.data == 'string'){
				var barItems = [{
					role: 'icon',
					icon: 'fa-angle-left',
					event: {
						click: function(){
							var param = self.param;
							
							if((param.iDisplayStart/param.iDisplayLength+1)>1)
								param.iDisplayStart = (+param.iDisplayStart)-(+param.iDisplayLength)
							if(param.iDisplayStart<0)
								param.iDisplayStart = 0
							self.generateData();
						}
					}
				},{
					role: 'textField',
					label: 'Page',
					class: defaults.id+'goto j-table-textfield',
					event: {
						keydown: function(e, el){
							if (e.keyCode == 13) {
								var param = self.param;
								param.iDisplayStart = Math.abs((el.find('input').val()-1)*param.iDisplayLength)
								self.generateData();
								return false;
							}
						}
					}
				}, {
					text: '',
					class: 'j-table-pageOf'
				}, {
					role: 'icon',
					icon: 'fa-angle-right',
					event: {
						click: function(){
							var param = self.param;
							if((param.iDisplayStart/param.iDisplayLength+1)<-~(param.iTotalRecords/param.iDisplayLength))
								param.iDisplayStart = (+param.iDisplayStart)+(+param.iDisplayLength)
							self.generateData();
						}
					}
				}, {
					role: 'comboField',
					label: 'items per page',
					class: 'j-table-combo',
					labelposition: 'right',
					items:[{
						label: '10',
						value: 10
					}, {
						label: '25',
						value: 25
					}, {
						label: '50',
						value: 50
					}, {
						label: '100',
						value: 100
					}, {
						label: '200',
						value: 200
					}],
					event: {
						select: function(value){
							var param = self.param;
							param.iDisplayLength = value;
							param.iDisplayStart = 0;
							self.generateData();
						}
					}
				}, {
					role: 'icon',
					icon: 'fa-repeat',
					class: 'j-table-refresh',
					event: {
						click: function(){
							self.generateData();
						}
					}
				}, '-', {
					text: '',
					class: 'j-table-items'
				}];
				
				if(defaults.bottombar)
					for(var r=0;r<defaults.bottombar.length;r++){
						barItems.splice(5,0, defaults.bottombar[r])
					}
				
				jui2.bar({
					parent: $(self[0]).find('.j-table-bottom-toolbar'),
					class: 'j-status-bar',
					items: barItems
				});
				jui2Param.sEcho = -1
				jui2Param.iDisplayLength = defaults.loadlength || 10
				jui2Param.iDisplayStart = 0
				jui2Param.sSearch = ''
				
				output.find('.j-table-head thead td .j-table-header-menu').click(function(e){
					if($(e.target).attr('class') != 'j-table-header-resize'){
						var parent;
						if($(e.target).parents('.j-table-header-menu').length > 0)
							parent = $(e.target).parents('.j-table-header-menu').parent().parent()
						else
							parent = $(e.target).parent().parent()
						
						if(jui2Param.iSortCol == parent.index()){
							if(output[0].jui2.param.sSortDir == 'asc')
								output[0].jui2.param.sSortDir = 'desc'
							else{
								output[0].jui2.param.sSortDir = 'asc'
							}
						}
						else{
							output[0].jui2.param.sSortDir = 'asc'
						}
						output[0].jui2.param.iSortCol = parent.index()
						output[0].jui2.generateData()
					}
				})
				
				output[0].jui2.generateData()
			}
			else{
				var data = $(jui2.tmpl.tmpl_tableData({data: defaults.data, columns: defaults.columns/*, class: output.attr('id')*/}));
				jTableBody.empty().append(data);
				
				var maxWidth = 0;
				output.find('.j-table-head tbody td').each(function(i, val){
					jTableBody.children('table').children('colgroup:nth-child('+(i+1)+')').children('col').width($(val).outerWidth(!0))
					maxWidth += parseFloat($(val).outerWidth(!0));
				})
				self.resizeTable();
				jTableBody.children('table').width(maxWidth);
				
				output.find('.j-table-head thead td .j-table-header-menu').click(function(e){
					if($(e.target).attr('class') != 'j-table-header-resize'){
						var parent;
						if($(e.target).parents('.j-table-header-menu').length > 0)
							parent = $(e.target).parents('.j-table-header-menu').parent().parent()
						else
							parent = $(e.target).parent().parent()
						
						if(jui2Param.iSortCol == parent.index()){
							if(output[0].jui2.param.sSortDir == 'asc')
								output[0].jui2.param.sSortDir = 'desc'
							else{
								output[0].jui2.param.sSortDir = 'asc'
							}
						}
						else{
							output[0].jui2.param.sSortDir = 'asc'
						}
						output[0].jui2.param.iSortCol = parent.index()
						var arr = output.find('> .j-table-body > table > tbody > tr')
						
						sortCol = output[0].jui2.param.iSortCol
						sortDesc = output[0].jui2.param.sSortDir
						var intmode = true;
						arr.each(function(i, val){
							if(isNaN($(val).children().eq(sortCol).text()) || $(val).children().eq(sortCol).text().trim()==''){
								intmode = false
							}
						})
						
						arr.sort(function(a, b) {
							var va = $(a).children().eq(sortCol).text(), vb = $(b).children().eq(sortCol).text()
							
							if(intmode){
								va = parseFloat(va)
							}
							else{
								va = va.trim()
							}
							
							if(intmode){
								vb = parseFloat(vb)
							}
							else{
								vb = vb.trim()
							}
							
							
							if(intmode == false){
								if (va < vb) return sortDesc == 'asc' ? -1 : 1
								if (va > vb) return sortDesc == 'asc' ? 1 : -1
								return 0;
							}
							else{
								return sortDesc == 'asc' ? 
									va - vb :
									vb - va
							}
						})
						var $tbody = output.find('> .j-table-body > table > tbody').eq(0)
						arr.each(function(i, val){
							$(val).appendTo($tbody)
						})
					}
				})
			}
			
			if(defaults.event.afterRender)
				defaults.event.afterRender(this)
			
			jTableBody.scroll(function() {
				jTableHead.scrollLeft(this.scrollLeft)
				jTableBody.find('.j-table-sticky').css('left', this.scrollLeft);
			});
				
			output.find('.j-table-head thead td .j-table-header-menu').each(function(i, val){
				var td = $($(this).parents('td')[0]), el = $(this), startX=0, scrollLeft = 0, tableRuler = output.children('.j-table-ruler');
				drag(this).axis('x').handle($(this).children('.j-table-header-resize')[0]).dragging(function() {

					tableRuler.css('left', (td.position().left+this.pos.x+output.position().left+13))
					el.show()

				}).start(function() {
					tableRuler.height(output.height()).show().css('left', (output.position().left+td.position().left+el.position().left+13/*-output.children('.j-table-head').scrollLeft()*/))
					startX = parseFloat(tableRuler.css('left'));
					scrollLeft = jTableHead.scrollLeft()
				}).end(function() {
					el.css('left', '');
					$(td.parents('table')[0]).width(parseFloat($(td.parents('table')[0]).width()) + (parseFloat(tableRuler.css('left'))-startX))
					var width = td.width()+(parseFloat(tableRuler.css('left'))-startX);
					td.width(width).children('div').width(width)
					output[0].jui2.resizeTable()
					jTableHead.scrollLeft(scrollLeft)
					jTableBody.scrollLeft(scrollLeft)
					tableRuler.hide()
				}).bind();
			})
			
			if(defaults.autorefresh != false){
				output[0].jui2.interval = window.setInterval(function(){
					if($(output[0]).is(':visible')){
						output[0].jui2.generateData();
					}
					else{
						window.clearInterval(output[0].jui2.interval);
					}
				}, defaults.autorefresh)
			}
			
			return self;
			
		}
	}
	
	var $widget = jui2.table = function(opt) {
        return new table(opt);
    };
	
	$widget.fn = table.prototype;
	
	$widget.fn.disable = function(){
		
	}
	
	$widget.fn.enable = function(){
		
	}
	
	$widget.fn.close = function(){
		this[0].hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
	$widget.fn.resizeTable = function(){
		var self = this;
		var maxWidth = 0;
		var $jTableBodyTable = $(self[0]).children('.j-table-body').children('table')
		
		$(self[0]).find('.j-table-head tbody td:not(:last-child)').each(function(i, val){
			var $col = $jTableBodyTable.children('colgroup:nth-child('+(i+1)+')').children('col'), outerWidth = $(val).outerWidth(!0)
			if($(val).hasClass('j-table-last-td')){

				var width = outerWidth>=20 ? parseFloat(outerWidth)-20 : 0;
				$col.width(width)
				maxWidth += width;
			}
			else{
				$col.width(outerWidth)
				maxWidth += parseFloat(outerWidth);
			}
		})
		
		$jTableBodyTable.width(maxWidth);

		if(self.defaults.height != 'auto'){
			$(self[0]).children('.j-table-body').height($(self[0]).height()-$(self[0]).children('.j-table-head').height()-$(self[0]).children('.j-table-top-toolbar').height()-$(self[0]).children('.j-table-bottom-toolbar').height())
		}
		
		$(self[0]).children('.j-table-head').find('thead tr:nth-child(1) td').each(function(i, val){
			$(self[0]).children('.j-table-body').find('table colgroup:nth-child('+(i+1)+') col').width($(val).outerWidth())
		})
	}
	
	$widget.fn.generateData = function(data){
		var self = this, $self = $(this[0]), param = self.param, defaults = self.defaults, $jTableBody = $self.children('.j-table-body')
		
		if(data){
			self.aaData = data
			var data = $(jui2.tmpl.tmpl_tableData({data: data, columns: defaults.columns, colCount: defaults.colCount, id: $self.attr('id'), drop: defaults.drop}));
			$jTableBody.empty().append(data);
			
			$jTableBody.children().children().children('tr').bind('click', function(){
				if(!$(this).hasClass('j-editable')){
					var $this = $(this), $radio = $this.find('[type=radio]'), cls = 'j-table-active'
					$this.addClass(cls).siblings().removeClass(cls);
					0 in $radio && ($radio[0].checked = !0)
					if(defaults.event.selected){
						defaults.event.selected(self.aaData[$(this).children().eq(0).text()], $this)
					}
					$self.children('.j-table-preview').empty();
				}
			})
			
			$jTableBody.children().children().children('tr').children('td').bind('dblclick', function(e){
				var $el = $(this), index = $(this).index(), $parent = $el.parent();
				if(defaults.editable[index]){
					$parent[0].defaultInnerHTML = $parent.children().clone(!0);
					var colspan = $parent.children().length-1
					if(defaults.editablemode == 'single')
						var element = typeof defaults.editable[index] == 'function' ? defaults.editable[index](self.aaData[$parent.index()]) : defaults.editable[index]
					else{
						var element = '';
						$.each(defaults.editable, function(i,val){
							element += typeof val == 'function' ? val(self.aaData[$parent.index()]) : val
							element += '<br/>'
						})
					}

					$parent.empty().append('<td></td><td colspan="'+colspan+'"><div>'+element+'</div></td>').addClass('j-editable')
					jui2.button({
						label: 'Save',
						event: {
							click: function(){
								var data = $($parent).jui2Serialize();
								for(i in data){
									value = data[i]
								}
								if(defaults.editablemode == 'single')
									defaults.save(self, value, index, data[$(this).parent().index()], $parent.index());
								else
									defaults.save(self, data, index, data[$(this).parent().index()], $parent.index());
								$parent.empty().empty().append($parent[0].defaultInnerHTML).removeClass('j-editable')
							}
						},
						parent: $parent.children().children()[0]
					});
					jui2.button({
						label: 'Cancel',
						event: {
							click: function(){
								$parent.empty().empty().append($parent[0].defaultInnerHTML).removeClass('j-editable')
							}
						},
						parent: $parent.children().children()[0]
					});
					jui2.create(defaults.vr.substring(1).trim())
					$($($parent.children().children()[0]).children()[0]).attr('tabindex', 1).keydown(function (e) {
						if (e.which == 13) {
							$($parent.children().children()[0]).find('button:contains(Save)').click()
							return false;
						}
					});
				}
				else if(typeof defaults.preview == 'function'){
					$self.children('.j-table-preview').html(defaults.preview(self.aaData[$parent.index()]))
				}
			})
			
			self.resizeTable();
			if(defaults.event.afterdraw){
				defaults.event.afterdraw(self)
			}
		}
		else{
			if(self.loadingMask)
				if(self.loadingMask.destroy)
					self.loadingMask.destroy();
			self.loadingMask = jui2.loadingMask(self[0])
			self.param.sEcho++;
			$.getJSON(defaults.data, param).done(function(data){
				if(param.sEcho==data.sEcho){
					defaults.items = new Array();
					param.totalPage = (+data.iTotalRecords)-1;
					
					jui2.clearNullFromJson(data.aaData);
					
					if(data.aaData!=null){
						var datazz = []
						if(data.aaData.length>0){
							for(zz = 0; zz<data.aaData[0].length;zz++){
								datazz.push(zz);
							}

							data.aaData.unshift(datazz)

						}
					}
					else{
						data.aaData = []
					}
					self.aaData = TAFFY(data.aaData)
					for(i in data){
						if(i!='aaData'){
							param[i] = data[i]
						}
					}
					
					var dataToBeShowed = [], tmpdataToBeShowed = []
					$.extend(!0, dataToBeShowed, (defaults.server == !0) ? self.aaData().start(0).limit(param.iDisplayLength).get() : self.aaData().start(param.iDisplayStart).limit(param.iDisplayLength).get());
					//var dataToBeShowed = (defaults.server == !0) ? self.aaData().start(0).limit(param.iDisplayLength).get() : self.aaData().start(param.iDisplayStart).limit(param.iDisplayLength).get();
					$.extend(!0, tmpdataToBeShowed, dataToBeShowed)
					if(defaults.custom)
						for(var i=0;i<dataToBeShowed.length;i++){
							for(j in defaults.custom){
								tmpdataToBeShowed[i][j] = defaults.custom[j](dataToBeShowed[i])
							}
						}
					
					var data = $(jui2.tmpl.tmpl_tableData({/*preview: preview, previewurl: previewurl*/id: $self.attr('id'),data: tmpdataToBeShowed, colCount: defaults.colCount, drop: defaults.drop})).width('100%');
					$jTableBody.empty().append(data);
					
					jui2.create(defaults.vr.substring(1))
					$jTableBody.children().children().children('tr').children('td').bind('dblclick', function(e){
						var $el = $(this), index = $(this).index(), $parent = $el.parent();
						if(defaults.editable[index]){
							$parent[0].defaultInnerHTML = $parent.children().clone(!0);
							var colspan = $parent.children().length-1
							
							if(defaults.editablemode == 'single')
								var element = typeof defaults.editable[index] == 'function' ? defaults.editable[index](self.aaData({___id: $(this).parent().attr('pk')}).get()[0]) : defaults.editable[index]
							else{
								var element = '';
								var pk = $(this).parent().attr('pk');
								$.each(defaults.editable, function(i,val){
									element += typeof val == 'function' ? val(self.aaData({___id: pk}).get()[0]) : val
									element += '<br/>'
								})
							}
							$parent.empty().append('<td></td><td colspan="'+colspan+'" style="background:#fff3a1"><div>'+element+'</div></td>').addClass('j-editable')
							jui2.button({
								label: 'Save',
								event: {
									click: function(){
										var data = $($parent).jui2Serialize();
										for(i in data){
											value = data[i]
										}
										if(defaults.editablemode == 'single')
											defaults.save(value, index, self.aaData({___id: $parent.attr('pk')}).get()[0]);
										else
											defaults.save(data, index, self.aaData({___id: $parent.attr('pk')}).get()[0]);
										$parent.empty().empty().append($parent[0].defaultInnerHTML).removeClass('j-editable')
									}
								},
								parent: $parent.children().children()[0]
							});
							jui2.button({
								label: 'Cancel',
								event: {
									click: function(){
										$parent.empty().empty().append($parent[0].defaultInnerHTML).removeClass('j-editable')
									}
								},
								parent: $parent.children().children()[0]
							});
							jui2.create(defaults.vr.substring(1).trim())
							$($($parent.children().children()[0]).children()[0]).attr('tabindex', 1).keydown(function (e) {
								if (e.which == 13) {
									$($parent.children().children()[0]).children('button:contains(Save)').click()
									return false;
								}
							});
						}
						else if(typeof defaults.preview == 'function'){
							$self.children('.j-table-preview').html(defaults.preview(self.aaData[$parent.index()]))
						}
					})
					
					$jTableBody.children().children().children('tr').bind('click', function(){
						if(!$(this).hasClass('j-editable')){
							var $this = $(this), $radio = $this.find('[type=radio]'), cls = 'j-table-active'
							$this.addClass(cls).siblings().removeClass(cls);
							0 in $radio && ($radio[0].checked = !0)
							if(defaults.event.selected){
								defaults.event.selected(self.aaData({___id: $this.attr('pk')}).get()[0], $this)
							}
							$self.children('.j-table-preview').empty();
						}
					})
					self.resizeTable();
					$self.children('.j-table-bottom-toolbar').find('.j-table-textfield input').val((param.iDisplayStart/param.iDisplayLength+1))
					$self.children('.j-table-bottom-toolbar').find('.j-table-pageOf').html('&nbsp;of '+Math.ceil(param.iTotalRecords/param.iDisplayLength)/*+' ( '+param.iTotalRecords+' data )'*/).css('color', '#000 !important')
					$self.children('.j-table-bottom-toolbar').find('.j-table-items').html(param.iTotalRecords+' items')
					
					$self.find('.j-table-head thead td div').css('height', 'auto');
					$self.find('.j-table-head thead td div .j-table-header-menu div').outerHeight('100%')
					$self.find('.j-table-head thead td div .j-table-header-menu').outerHeight($self.find('.j-table-head thead td div').height()).css('height', '').hide();
					
					self.merge();
					
					if(defaults.event.afterdraw){
						defaults.event.afterdraw(self)
					}
					
					$self.children('.j-table-head').find('thead tr:first-child td').each(function(i, val){
						if(!$(val).is(":visible") ){
							$self.children('.j-table-head').find('thead tr:first-child td:nth-child('+($(this).index()+1)+')').hide();
							$self.children('.j-table-body').find('tbody tr td:nth-child('+($(this).index()+1)+')').hide();
							$self.children('.j-table-body').find('colgroup:nth-child('+($(this).index()+1)+')').hide();
						}
					})
					$self.children('.j-table-head').find('thead tr:first-child td').each(function(i, val){
						$self.children('.j-table-body').find('colgroup:nth-child('+(i+1)+')').children('col').outerWidth($(val).outerWidth(!0))
					})
					$self.children('.j-table-body > table:nth-child(1)').width($self.children('.j-table-head').outerWidth())
					
					$.each(defaults.stickycolumn, function(i, val){
						$self.find('.j-table-body > table:nth-child(1) colgroup:nth-child('+(val+1)+')').clone().appendTo($self.find('.j-table-body > table:nth-child(2)'))
						$self.find('.j-table-body > table:nth-child(1) tr').each(function(i2, val2){
							var tr = 0 in $self.find('.j-table-body > table:nth-child(2) tr:nth-child('+(i2+1)+')') && $self.find('.j-table-body > table:nth-child(2) tr:nth-child('+(i2+1)+')') || $('<tr></tr>');
							tr.css('height', $(this).outerHeight())
							$self.find('.j-table-body > table:nth-child(1) tr:nth-child('+(i2+1)+') td:nth-child('+(val+1)+')').clone().appendTo(tr);
							$self.find('.j-table-body > table:nth-child(2) tr:nth-child('+(i2+1)+')').length == 0 && tr.appendTo($self.find('.j-table-body > table:nth-child(2) tbody'))
							
						})
					})
					
					var totColWidth = 0;
					$self.find('.j-table-body > table:nth-child(2) colgroup col').each(function(i, val){
						totColWidth += parseInt($(this)[0].style.width);
					})
					
					$self.find('.j-table-body > table:nth-child(2)').css('width',totColWidth)
					$.each(defaults.hidden, function(i, val){
						$self.find('.j-table-body > table > tbody > tr > td:nth-child('+(val+1)+')').hide();
						$self.find('.j-table-head > table > thead > tr > td:nth-child('+(val+1)+')').hide();
						$self.find('.j-table-body > table > colgroup:nth-child('+(val+1)+')').hide();
					})
					
					self.resizeTable();
					
				}
			}).always(function(){
				self.loadingMask.destroy()
			})
		}
	}

	$widget.fn.showDrop = function(td){
		var self = this, parent = $(td).parent(), $i = $(td).find('i'), iconPlus = 'fa-plus-square-o', iconMin = 'fa-minus-square-o', pk = $(td).parent().attr('pk')
		if($i.hasClass(iconPlus)){
			if(!parent.next().attr('pk') && parent.next().attr('pk')!=''){
				parent.next().remove()
				parent.children().find('div > i').removeClass(iconMin).addClass(iconPlus)
			}
			$i.removeClass(iconPlus).addClass(iconMin)
			var ev = self.defaults.event
			
			var dropEl = $('<tr class="j-table-field-drop-tr"><td colspan="'+parent.children().length+'" class="j-table-field-drop">&nbsp;</td></tr>').insertAfter(parent);
			if(ev.drop)
				if(typeof self.aaData == 'function')
					ev.drop(dropEl, self.aaData({___id: pk}).get(), $(td).index())
				else{
					ev.drop(dropEl, [self.aaData[parent.index()-parent.prevAll('.j-table-field-drop-tr').length]], $(td).index())
				}
		}
		else{
			$i.removeClass(iconMin).addClass(iconPlus)
			var ev = self.defaults.event
			if(ev.hidedrop){
				if(typeof self.aaData == 'function')
					ev.hidedrop(parent.next(), self.aaData({___id: pk}).get(), $(td).index())
			}
			else{
				parent.next().remove()
			}
		}
		self.merge();
	}
	
	$widget.fn.recreate = function(){
		var self = this;
		$(self[0]).removeClass('j-body')
		self.defaults.target = self[0]
		jui2.table(self.defaults)
	}
	
	$widget.fn.getSelected = function(){
		var self = this;
		if(typeof self.aaData == 'function')
			return self.aaData({___id: $(self[0]).children('.j-table-body').children().children().children('tr.j-table-active').attr('pk')}).get()[0]
		else
			return self.aaData[$(self[0]).children('.j-table-body').children().children().children('tr.j-table-active').children().eq(0).text()];
	}
	
	$widget.fn.merge = function(){
		var self = this, merge = self.defaults.merge, tr = $(self[0]).children('.j-table-body').children().children().children('tr');
		tr.find('.j-table-merge').removeAttr('rowspan')
		if(merge.length > 0){
			for(i in merge){
				var name='', j=0, el='', v = i;
				tr.children('td:nth-child('+(parseInt(merge[i])+1)+')').each(function(i, val){
					if(name!=$(this).text()){
						if(el.attr){
							
							tr.children('td:nth-child('+(parseInt(merge[v])+1)+')').filter(function () {
								return $(this).text() == name
							}).not(el).hide().addClass('j-table-merge')
							el.attr('rowspan',j).show()
						}
						j=1;
						el = $(this)
					}
					else{
						j++;
					}
					name = $(this).text();
					if($(this).parent().next().children().hasClass('j-table-field-drop')){
						if(el.attr){
							
							tr.children('td:nth-child('+(parseInt(merge[v])+1)+')').filter(function () {
								return $(this).text() == name
							}).not(el).hide().addClass('j-table-merge')
							el.attr('rowspan',j).show()
							el = $(this).parent().next().next().children('td:nth-child('+(parseInt(merge[v])+1)+')')
						}
						j=1;
						name=''
					}
				})
				if(j>1){
					
					tr.children('td:nth-child('+(parseInt(merge[v])+1)+')').filter(function () {
						return $(this).text() == name
					}).not(el).hide().addClass('j-table-merge')
					el.attr('rowspan',j).show()
				}
			}
		}
		tr.find('.j-table-merge').each(function(i, val){
			if($(val).attr('rowspan')>0)
				$(val).show()
		})
	}
	
	$widget.fn.settings = function(){
		var self = this, table = $(self[0]);
		if(0 in table.children('.j-table-body').children('.j-table-settings')){
			table.children('.j-table-body').velocity({
				properties:{
					height: table.children('.j-table-body').children('table').outerHeight()
				},
				options: {
					duration: 250
				}
			})
			table.children('.j-table-body').children('.j-table-settings').velocity("transition.slideDownOut", {
				complete: function(){
					$(this).remove();
				}
			})
			
			table.children('.j-table-body').children().velocity("transition.slideUpIn", {complete: function(){
				table.children('.j-table-body').find('table tr:first-child > td > div').each(function(i, val){
					table.children('.j-table-head').find('table tr:first-child td:nth-child('+(i+1)+') > div').outerWidth($(val).width())
				})
				table.children('.j-table-body').children().width(table.children('.j-table-head').width()-table.children('.j-table-head').find('thead tr:first-child td:last-child').width());
				table.find('.j-table-body table.j-body').outerWidth(table.find('.j-table-head table').outerWidth())
			}});
		}
		else{
			var column = '';
			table.children('.j-table-head').find('thead tr:first-child td:not(:last-child)').each(function(i, val){
				if($(val).is(":visible") )
					var check = 'checked';
				column += '<input type="checkbox" class="j-table-setting-column" id="check'+i+'" name="check'+i+'" value="'+$(val).text()+'" '+check+'><label for="check'+i+'">'+$(val).text()+'</label>'
			})
			table.children('.j-table-body').append('<div class="j-table-settings" style="position:absolute;top:0px;">'+column+'</div>').velocity("transition.slideUpIn")
			table.children('.j-table-body').height(table.children('.j-table-body').outerHeight())
			table.children('.j-table-body').velocity({
				properties:{
					height: table.children('.j-table-body').children('.j-table-settings').outerHeight()
				},
				options: {
					duration: 250
				}
			})
			table.children('.j-table-body').children('.j-table-settings').find('.j-table-setting-column').on('change', function(){
				if($(this).is(':checked')){
					table.children('.j-table-head').find('thead tr:first-child td:nth-child('+(Math.floor($(this).index()/2)+1)+')').show();
					table.children('.j-table-body').find('tbody tr td:nth-child('+(Math.floor($(this).index()/2)+1)+')').show();
					table.children('.j-table-body').find('colgroup:nth-child('+(Math.floor($(this).index()/2)+1)+')').show();
				}
				else{
					table.children('.j-table-head').find('thead tr:first-child td:nth-child('+(Math.floor($(this).index()/2)+1)+')').hide();
					table.children('.j-table-body').find('tbody tr td:nth-child('+(Math.floor($(this).index()/2)+1)+')').hide();
					table.children('.j-table-body').find('colgroup:nth-child('+(Math.floor($(this).index()/2)+1)+')').hide();
				}
			})
			
			table.children('.j-table-body').children('table').velocity("transition.slideDownOut");
		}
	}
	
	$widget.fn.expand = function(){
		var table = $(this[0]), self = this;
		if(table.css('position') != 'fixed'){
			self.tmp = {
				width: table.css('width'),
				height: table.css('height'),
				top: table.offset().top,
				left: table.offset().left
			}
			table.css({
				'background': 'rgba(0, 0, 0, 0.3)',
				'z-index': (jui2.findHighestZIndex()+1),
				'position': 'fixed',
				width: table.css('width'),
				height: table.css('height'),
			}).velocity({
				properties: {
					'width': '100%',
					'height': '100%',
					'top': 0,
					'left': 0
				},
				options: {
					duration: 250
				}
			})
			table.find('.fa-expand').removeClass('fa-expand').addClass('fa-compress')
			//setTimeout(self.resizeTable(), 1000);
			self.generateData()
		}
		else{
			table.velocity({
				properties: {
					'width': self.tmp.width,
					'height': self.tmp.height,
					'top': self.tmp.top,
					'left': self.tmp.left
				},
				options: {
					duration: 250,
					complete: function(){
						$(this).attr('style', 'width:auto;height:auto;')
					}
				}
			})//
			table.find('.fa-compress').removeClass('fa-compress').addClass('fa-expand')
			//setTimeout(self.resizeTable(), 1000);
			self.generateData()
		}
	}
	
	$(window).scroll(function(){
		$('.j-table-body').each(function(i, val){
			var el = $(this);
			
			if(jui2.data.followHeadShow != false){
				if( (el.offset().top-$(window).scrollTop()) < jui2.data.followHeadShow && !jui2.isInView(el.next())){
					if(el.prev().css('position') != 'fixed'){
						var head = el.prev();
						head.css({
							'width': head.outerWidth(),
							top: jui2.data.followHeadShow,
							position: 'fixed',
							'z-index': (jui2.findHighestZIndex()+1),
							'overflow-x': 'auto'
						});
						head.on('scroll', function(){
							el.scrollLeft(head[0].scrollLeft);
						})
					}
				}
				else{
					if( (el.next().offset().top-$(window).scrollTop()) < jui2.data.followHeadShow || (el.prev().prev().offset().top-$(window).scrollTop()) > jui2.data.followHeadShow){
						var head = el.prev();
						head.css({
							'width': head.prev().outerWidth(),
							top: '',
							position: 'relative',
							'z-index': '',
							'overflow-x': 'hidden'
						});
					}
				}
			}
		})
	})
	
}(jQuery));/****js/widget/table.plugin.export.js****/
	(function($){
	/** JUI2 button export UI
		@class jui2.tableExport
		@extends jui2.button
		@param {Object} tableExport options
		@return {Object} jui2 tableExport object
		@author Deddy Lasmono Putro
		@docauthor Deddy Lasmono Putro
		
			@example
			Example Usage:
			jui2.tableExport({
				label: 'Export to xls',
				icon: 'fa-download',
				targetTable: '#table_panel',
				type: 'excel'
			})
	 */
	jui2.tableExport = jui2.class.tableExport = P(jui2.class.button, function(tableExport, button) {
		/**
		 * Function to initiate widget creation
		 * @param   {Object} defaults Options to initialize the component with
		 * @returns {jui2}   jui2 object
		 */
		
		tableExport.init = function(defaults){
			var self = this;
			
			defaults = $.extend({}, this.defaults, {
				targetTable: '',
				filename: 'Export',
				type: 'excel',
				ignoreColumn: [],
				ignoreRow: [],
				event: {}
			}, defaults)
			
			defaults.event = {
			
				click:  function(prepared){
			
					typeof defaults.ignoreColumn == 'function' ? ignoreColumn = defaults.ignoreColumn() : ignoreColumn = defaults.ignoreColumn
					typeof defaults.ignoreRow == 'function' ? ignoreRow = defaults.ignoreRow() : ignoreRow = defaults.ignoreRow
					
					jui2.util.export.office(defaults.targetTable, defaults.filename, defaults.type, ignoreColumn, ignoreRow);
					
					return prepared;
				}
				
			}
			
			return button.init.call(this, defaults);
		}

	});
		
	}(jQuery));/****js/widget/text.js****/
(function($){
	
	var text = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {}
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_text(defaults));
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			self[0] = output;
			self.length = 1;
			
			return self;
			
		}
	}
	
	var $widget = jui2.text = function(opt) {
        return new text(opt);
    };
	
	$widget.fn = text.prototype;
	
	$widget.fn.disable = function(){
		var el = this[0], clsDis = 'j-disabled'
		if(!el.hasClass(clsDis)){
			el.addClass(clsDis);
			if(el.data().events){
				el.data().events._click = el.data().events.click;
				el.data().events.click = null;
			}
		}
	}
	
	$widget.fn.enable = function(){
		var el = this[0], clsDis = 'j-disabled'
		if(el.hasClass(clsDis)){
			el.removeClass(clsDis);
			if(el.data().events){
				el.data().events.click = el.data().events._click;
				el.data().events._click = null;
			}
		}
	}
	
}(jQuery));/****js/widget/textArea.js****/
(function($){
	
	var textArea = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				width: 232,
				height: 102,
				wysiwyg: true
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_textArea(defaults));
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			/*if(defaults.value)
				output.find('.j-textArea-editor').html('<p>'+defaults.value+'</p>')*/
			
			output[0].jui2 = self;
			/*new Medium({
				element: output.find('.j-textArea-editor')[0]
			});*/
			
			self.editor = output.find('iframe')[0].contentWindow
			self.editor.document.open();
			self.editor.document.close();
			self.editor.document.designMode="on";
			if(defaults.wysiwyg){
				var tmpel = $('<div>'),
				commandIcon = ['fa-bold', 'fa-italic', 'fa-underline', 'fa-superscript', 'fa-subscript', 'fa-strikethrough', 'fa-list-ol', 'fa-list'],
				commandTag = ['B', 'I', 'U', 'SUP', 'SUB', 'STRIKE', 'OL', 'UL'],
				commandExec = [
					['bold', false, ''],
					['italic', false, ''],
					['underline', false, ''],
					['superscript', 0, 0],
					['subscript', 0, 0],
					['strikethrough', 0, 0],
					['insertorderedlist', 0, 0],
					['insertunorderedlist', 0, 0]
				],
				tmpel2 = $('<div>'), elSymbol = output.find('.j-textArea-symbols')
				
				for(i in commandIcon){
					if(typeof commandIcon[i]!='function')
					$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-'+commandTag[i]+'" onclick="jui2(\'#'+defaults.id+'\')[0].command(\''+commandExec[i][0]+'\', '+commandExec[i][1]+', \''+commandExec[i][2]+'\')"><i class="fa '+commandIcon[i]+'"></i><span></span></button>').appendTo(tmpel)
				}
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-LINK"><i class="fa fa-link"></i><span></span></button>').click(function(){
					var link = prompt("Enter URL:", "http://");
					self.editor.document.execCommand('CreateLink', false, link)
					self.editor.focus();
				}).appendTo(tmpel)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-UNLINK"><i class="fa fa-unlink"></i><span></span></button>').click(function(){
					self.editor.document.execCommand('unlink')
					self.editor.focus();
				}).appendTo(tmpel)
				
				//buttons output.find('.j-textArea-top-toolbar')
				/*$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-B"><i class="fa fa-bold"></i><span></span></button>').click(function(){
					self.command('bold')
				}).appendTo(tmpel)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-I"><i class="fa fa-italic"></i><span></span></button>').click(function(){
					self.command('italic')
				}).appendTo(tmpel)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-U"><i class="fa fa-underline"></i><span></span></button>').click(function(){
					self.command('underline')
				}).appendTo(tmpel)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-SUP"><i class="fa fa-superscript"></i><span></span></button>').click(function(){
					self.command('superscript', 0, 0)
				}).appendTo(tmpel)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-SUB"><i class="fa fa-subscript"></i><span></span></button>').click(function(){
					self.command('subscript', 0, 0)
				}).appendTo(tmpel)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-STRIKE"><i class="fa fa-strikethrough"></i><span></span></button>').click(function(){
					self.command('strikethrough', 0, 0)
				}).appendTo(tmpel)*/
				
				/* start of symbols */
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-textArea-button-symbols"><i class="fa fa-dollar"></i><span></span></button>').click(function(){
					//self.command('insertHTML', false, '&#176;')
					if(elSymbol.is(":visible")){
						elSymbol.hide()
					}
					else{
						elSymbol.show()
						output[0].jui2.tether.position()
					}
				}).appendTo(tmpel)
				//output.find('.j-textArea-symbols')
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&deg;</span></button>').click(function(){
					self.command('insertHTML', false, '&deg;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&#937;</span></button>').click(function(){
					self.command('insertHTML', false, '&Omega;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&#956;</span></button>').click(function(){
					self.command('insertHTML', false, '&mu;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&#8805;</span></button>').click(function(){
					self.command('insertHTML', false, '&ge;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&#8804;</span></button>').click(function(){
					self.command('insertHTML', false, '&le;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&#8734;</span></button>').click(function(){
					self.command('insertHTML', false, '&infin;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&#177;</span></button>').click(function(){
					self.command('insertHTML', false, '&#177;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&Sigma;</span></button>').click(function(){
					self.command('insertHTML', false, '&#931;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&euro;</span></button>').click(function(){
					self.command('insertHTML', false, '&#8364;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey"><span>&oslash;</span></button>').click(function(){
					self.command('insertHTML', false, '&oslash;')
					elSymbol.hide()
				}).appendTo(tmpel2)
				
				tmpel2.children().unwrap().appendTo(elSymbol)
				/* end of symbols */
				
				/*$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-OL"><i class="fa fa-list-ol"></i><span></span></button>').click(function(){
					self.command('insertorderedlist', 0, 0)
				}).appendTo(tmpel)
				
				$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-UL"><i class="fa fa-list"></i><span></span></button>').click(function(){
					self.command('insertunorderedlist', 0, 0)
				}).appendTo(tmpel)*/
				
				/*$('<button role="button" class="j-button j-body j-border j-button-grey j-editor-UL"><i class="fa fa-code"></i><span></span></button>').click(function(){
					self.command('insertunorderedlist', 0, 0)
				}).appendTo(tmpel)*/
				
				tmpel.children().unwrap().appendTo(output.find('.j-textArea-top-toolbar'))
			}
			
			output.find('.j-textArea-top-toolbar').find('.j-editor-B, .j-editor-I, .j-editor-U, .j-editor-STRIKE').wrapAll('<div class="j-group"></div>')
			output.find('.j-textArea-top-toolbar').find('.j-editor-SUP, .j-editor-SUB').wrapAll('<div class="j-group"></div>')
			output.find('.j-textArea-top-toolbar').find('.j-editor-OL, .j-editor-UL').wrapAll('<div class="j-group"></div>')
			output.find('.j-textArea-top-toolbar').find('.j-editor-LINK, .j-editor-UNLINK').wrapAll('<div class="j-group"></div>')
			
			output[0].jui2.tether = jui2.pin({
					element: elSymbol,
					target: output.find('.j-textArea-button-symbols'),
					attachment: 'top left',
					targetAttachment: 'bottom left'
				})
			
			elSymbol.hide()
			
			$(output.find('iframe')[0].contentWindow.document.body).on('click', function(){
				if(self.editor.document.getSelection) {
					output.sel = self.editor.document.getSelection();
					if(output.sel.getRangeAt && output.sel.rangeCount) {
						output.range = output.sel.getRangeAt(0);
					}
				}
				
				output.find('.j-textArea-top-toolbar button').addClass('j-button-grey').removeClass('j-buton-blue')
				output.find('.j-editor-'+output.sel.anchorNode.parentElement.tagName).removeClass('j-button-grey').addClass('j-buton-blue')
				$(output.sel.anchorNode.parentElement).parents().each(function(i,val){
					output.find('.j-editor-'+this.tagName).removeClass('j-button-grey').addClass('j-buton-blue')
				})
			}).on('keyup', function(){
				if(self.editor.document.getSelection) {
					output.sel = self.editor.document.getSelection();
					if(output.sel.getRangeAt && output.sel.rangeCount) {
						output.range = output.sel.getRangeAt(0);
					}
				}
				
				output.find('.j-textArea-top-toolbar button').addClass('j-button-grey').removeClass('j-buton-blue')
				output.find('.j-editor-'+output.sel.anchorNode.parentElement.tagName).removeClass('j-button-grey').addClass('j-buton-blue')
				$(output.sel.anchorNode.parentElement).parents().each(function(i,val){
					output.find('.j-editor-'+this.tagName).removeClass('j-button-grey').addClass('j-buton-blue')
				})
			}).append(defaults.value);
			
			output.find('.j-textArea-editor').on('mouseup', function(){
				var parent = output.parent(), w = 0;
				parent.children().each(function(i, val){
					w = w < parseInt($(val).outerWidth(true)) ? parseInt($(val).outerWidth(true)):w
				})
				//console.log(parent.children(), w)
				parent.width(w);
			})
				
			self[0] = output[0];
			self.length = 1;
			
			$(self.editor.document.body).css('overflow', 'auto');
			
			$(self.editor.document.body).on('paste', function(){
				setTimeout(function(){
					var range = self.editor.document.getSelection().getRangeAt(0)
					var startContainer = range.startContainer, endContainer = range.endContainer,
					startOffset = range.startOffset, endOffset = range.endOffset
					
					$(self.editor.document.body).html($(self.editor.document.body).html().replace(/<table(?:.|\n)*?>/gi, '')
					.replace(/<\/table>/gi, '').replace(/<tr(?:.|\n)*?>/gi, '').replace(/<\/tr>/gi, '<br/>')
					.replace(/<td(?:.|\n)*?>/gi, '').replace(/<\/td>/gi, '')
					.replace(/<thead(?:.|\n)*?>/gi, '').replace(/<\/thead>/gi, '')
					.replace(/<span(?:.|\n)*?>/gi, '').replace(/<\/span>/gi, '')
					.replace(/<colgroup(?:.|\n)*?>/gi, '').replace(/<\/colgroup>/gi, '')
					.replace(/<col(?:.|\n)*?>/gi, '').replace(/<\/col>/gi, '')
					.replace(/<h(?:.|\n)*?>/gi, '').replace(/<\/h(?:.|\n)*?>/gi, '')
					.replace(/<style(?:.|\n)*?>/gi, '').replace(/<\/style(?:.|\n)*?>/gi, '')
					.replace(/<p(?:.|\n)*?>/gi, '').replace(/<\/p(?:.|\n)*?>/gi, '<br/>')
					.replace(/<ul(?:.|\n)*?>/gi, '').replace(/<\/ul(?:.|\n)*?>/gi, '')
					.replace(/<li(?:.|\n)*?>/gi, '').replace(/<\/li(?:.|\n)*?>/gi, '')
					.replace(/<tbody(?:.|\n)*?>/gi, '').replace(/<\/tbody>/gi, '')
					.replace(/&nbsp;/g,' ')
					.replace(/\s\s+/g, ' ')
					.replace(/(^<br>|<br>$)/g,''));
					
					range.setStart(startContainer, startOffset);
					range.setEnd(endContainer, endOffset);
				}, 250);
				
			})
		
			return self;
			
		}
	}
	
	var $widget = jui2.textArea = function(opt) {
        return new textArea(opt);
    };
	
	$widget.fn = textArea.prototype;
	
	$widget.fn.command = function(command, tf, value){
		this.editor.document.execCommand(command, tf || false, value || "");
		this.editor.focus();
	}
	
	$widget.fn.disable = function(){
		//$(this[0]).find('.j-textArea-editor').removeAttr('contenteditable')
		$(this[0]).find('.j-textArea-editor').find('iframe')[0].contentWindow.document.designMode="off";
	}
	
	$widget.fn.enable = function(){
		//$(this[0]).find('.j-textArea-editor').attr('contenteditable', 'true')
		$(this[0]).find('.j-textArea-editor').find('iframe')[0].contentWindow.document.designMode="on";
	}
	
	$widget.fn.val = function(value){
		var el = $(this[0]).find('.j-textArea-editor')
		if(value)
			$(this.editor.document.body).html(value)
		return (he.encode(($(this.editor.document.body).html().trim() != '' && $(this.editor.document.body).html().trim() != '<br>' ? jui2.cleanWordPaste($(this.editor.document.body).html().trim()) : ''), {
			'allowUnsafeSymbols': false
		})).replace('&#x2010;', '-').replace('&#x2013;', '-').replace('&#x9;', '').replace(/&nbsp;/g,' ').replace(/\s\s+/g, ' ').replace(/(^<br>|<br>$)/g,'');
	}
	
	$widget.fn.reset = function(){
		$(this.editor.document.body).html('')
	}
	
	$widget.fn.close = function(){
		this[0].hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
}(jQuery));/****js/widget/textField.js****/
(function($){

	jui2.class.textField = P(jui2.class.widget, function(textField, widget) {
		
		textField.init = function(defaults){
			var self = this;
		
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_textField',
				icon: '',
				label: '',
				disabled: false,
				required: false
			}, defaults)
			
			defaults.events = $.extend({}, {
		
				keydown: function(prepared){
					if(defaults.event)
						if(defaults.event.keydown)
							prepared.keydown(function(e){
								defaults.event.keydown(e, prepared)
							})
					return prepared;
				},				
				require:  function(prepared){
					if(defaults.required!=false)
						if(!defaults.disabled){
							prepared.find('input:first-child').blur(function(e){
								if(prepared.find('input:last-child').val()=='')
									prepared.find('input:last-child').parent().addClass('jn-border-danger')
								else
									prepared.find('input:last-child').parent().removeClass('jn-border-danger')
							})
						}
					return prepared;
				},
				afterrender: function(prepared){
					if(prepared.find('label').length == 0)
						prepared.css('width', '150px');
					return prepared;
				}
				
			}, defaults.events);
			
			return widget.init.call(this, defaults);
		}
		
		textField.render = function(prepared){
			if(this.defaults.format)
				jui2.keycodes.bind(prepared.find('input'), this.defaults.format)
			return widget.render.call(this, prepared);
		}
		
		textField.val = function(value){
			value && $(this[0]).find('input').val(value)
			return $(this[0]).find('input').val()
		}
		
		textField.reset = function(value){
			$(this[0]).find('input').val('')
		}
		
	});
	
	jui2.textField = jui2.class.textField
}(jQuery));/****js/widget/textFieldNumberField.js****/
(function($){

	jui2.numberField = jui2.class.numberField = P(jui2.class.textField, function(numberField, textField) {
		
		numberField.init = function(defaults){
		
			defaults = $.extend({}, this.defaults, {
				format: 'tab,backspace,escape,.,[0,9],delete,[96,111],enter'
			}, defaults)
			
			return textField.init.call(this, defaults);
		}
		
	});
	
}(jQuery));/****js/widget/textFieldPasswordField.js****/
(function($){

	jui2.passwordField = jui2.class.passwordField = P(jui2.class.textField, function(passwordField, textField) {
		
		passwordField.init = function(defaults){
		
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_passwordField'
			}, defaults)
			
			return textField.init.call(this, defaults);
		}
		
	});
	
}(jQuery));/****js/widget/timeField.js****/
(function($){

	jui2.timeField = jui2.class.timeField = P(jui2.class.textField, function(timeField, textField) {
		
		timeField.init = function(defaults){
		
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_timeField',
				event: {}
			}, defaults)
			
			var self = this;
			
			defaults.events = $.extend({}, {
				
				require:  function(prepared){
					if(defaults.required!=false)
						if(!defaults.disabled){
							
						}
					return prepared;
				},
				afterrender: function(prepared){
					jui2.keycodes.bind(prepared.find('input'), 'esc,tab,delete,backspace,[0,9],[96,111]')
			
					prepared.find('input').eq(0).blur(function(){
						if($(this).val()>23)
							$(this).val(23)
						if($(this).val()<0)
							$(this).val(0)
						$(this).val(('00'+$(this).val()).substr((2+$(this).val().length)-2));
					})
					
					prepared.find('input').eq(1).blur(function(){
						if($(this).val()>59 || $(this).val()<0)
							$(this).val(0)
						$(this).val(('00'+$(this).val()).substr((2+$(this).val().length)-2));
					})
					return prepared;
				},
				keydown: function(prepared){
					if(defaults.event.keydown){
						prepared.find('input').keydown(function(e){
							defaults.event.keydown(e, self);
						})
					}
					return prepared;
				}
				
			}, defaults.events);
			
			return textField.init.call(this, defaults);
		}
		
		timeField.val = function(val){
			$el = $(this[0]).find('input')
			if(val){
				$el.eq(0).val(val.split(':')[0])
				$el.eq(1).val(val.split(':')[1])
			}
			return $el.eq(0).val()+':'+$el.eq(1).val();
		}
		
	});
	
}(jQuery));/****js/widget/timeLine.js****/
	(function($){
	/** JUI2 timeLine UI
		@class jui2.timeLine.timeLine
		@alternateClassName jui2.timeLine
		@extends jui2.component
		@param {Object} timeLine options
		@return {Object} jui2 timeLine object
		@author Deddy Lasmono Putro
		@docauthor Deddy Lasmono Putro
		
	 */
		var timeLine = function(opt){
			var defaults = {id: 'j-no-id'}, self = this;
			
			$.extend(!0, defaults, opt)
				
			/**
				@cfg {selector} target
				A selector of target element that will be replaced with this UI
			*/
			
			var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

			/*if(defaults.target)
				var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
			else
				var target = $('#'+defaults.id)*/
			
			if(target.hasClass('j-body')){
				return target[0].jui2;
				/*self[0] = target;
				self.length = 1;
				
				return self;*/
			}
			else{
			
				opt = opt || {}
				var defaults = {
					/**
						@cfg {string} id
						will be auto generated string if leave blank
					*/
					id: 'j-'+jui2.random(8, 'aA#'),
					/**
						@cfg {string} label
						Text that will be shown on timeLine
					*/
					label: '',
					/**
						@cfg {string} data
						data url
					*/
					data: '',
					/**
						@cfg {boolean} disabled
						True if this timeLine disabled
					*/
					disabled: !1,
					/**
						@cfg {Object} event
						@cfg {Function} event.click
						@param {object} JUI2 timeLine UI object
						Click event that fired when UI is clicked on
					*/
					event: {},
					scaleWidth: 100,
					labelWidth: 100,
					param: {}
				}
				
				$.extend(!0, defaults, opt);
				
				var output = $(jui2.tmpl.tmpl_timeLine(defaults));
				
				/**
					@cfg {String/HTMLElement/NodeList} parent
					Parent selector is a element selector wich this UI will be appended if exist
				*/
				0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
				
				/*if(target.length > 0){
					target.replaceWith(output);
				}
				else if(defaults.parent){
					$(defaults.parent).append(output)
				}
				else{
					$('body').append(output);
				}*/
				
				self.defaults = defaults
				self.ev = {}
				/*if(typeof defaults.event.click == 'function'){
					self.ev.click = function(){
						if(!defaults.disabled)
							defaults.event.click(self)
					}
					output.on('click', function(e){
						e.preventDefault;
						self.ev.click();
					});
				}*/
				//output[0].jui2.defaults = defaults;
				
				output[0].jui2 = self;
				self[0] = output[0];
				self.length = 1;
				
				self.loadData();
			
				return self;
				
			}
		}
		
		var $widget = jui2.timeLine = function(opt) {
			return new timeLine(opt);
		};
		
		$widget.fn = timeLine.prototype;
		
		$widget.fn.loadData = function(){
			var self = this;
			self.loadingMask = jui2.loadingMask(self[0])
			var param = self.defaults.param
			$.getJSON(self.defaults.data).done(function(data){
				data.scaleWidth = self.defaults.scaleWidth 
				data.labelWidth = self.defaults.labelWidth 
				data.id = self.defaults.id
				data.title = self.defaults.title
				data.label = self.defaults.label
				var output = $(jui2.tmpl.tmpl_timeLine(data));
				$(self[0]).replaceWith(output);
				//$('.j-timeline section').height(output.height())
				self[0] = output[0];
				
				$(output[0]).find('.j-timeline-bar').css('top', $(output[0]).find('.j-timeline-title').outerHeight()+$(output[0]).find('.j-timeline-scale').outerHeight())
				
				$(output[0]).find('.j-timeline-data span.j-button').filter(function(){
					return $(this).text().trim() == '';
				}).remove()
				
				/*$(output[0]).find('.j-timeline-data').each(function(){
					$(this).find('span').parent().parent().parent().prev().find('span:nth-child(even)').appendTo($(this).next().find('td:nth-child(2) > div')).css('margin-top', '-28px');
				})*/
				
				var z = 1;
				$(output[0]).find('.j-timeline-data span').each(function(i, val){
					var target = $(val)
					jui2.popover({
					  body: target.attr('data-body'),
					  title: target.text(),
					  parent: val
					})
					/*if(i%2==0 && i != 0)
					  z++;
					if(i%2==0){
						var parent = $(val).parent().parent().parent().prev()
					}
					else{
						var parent = $(val).parent().parent().parent().next()
					}
					var target = parent.find('span:nth-child('+z+')')
					var bar = $(val)
					//console.log(target, bar.css('left'))
					target.css('left', bar.css('left'))
					if(target.width() > bar.width()){
						//console.log('asd',((target.outerWidth()-bar.outerWidth())/2))
						target.css('left', parseInt(target.css('left'))-((target.outerWidth()-bar.outerWidth())/2)+'px')
					}*/
				})
				
				$(output[0]).find('.j-timeline-scale section').each(function(i, val){
					$(val).css('height', 24+$(val).parent().next().outerHeight(true))
				})
				
				output[0].jui2 = self;
				
			}).always(function(){
				self.loadingMask.destroy();
			})
		}
		
		jui2.extend(jui2.component, $widget)
		
		jui2.modul.timeLine = $widget;
		$widget.fn.showTaskName = function(el){
			$(el).parent().prev().toggle();
			$(el).parent().next().toggle();
				
			$(this[0]).find('.j-timeline-scale section').each(function(i, val){
				$(val).css('height', 24+$(val).parent().next().outerHeight(true))
			})
		}
		
	}(jQuery));/****js/widget/tooltip.js****/
(function($){
	
	var tooltip = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				server: false
			}
			
			$.extend(!0, defaults, opt);
			if(defaults.server){
				defaults.url = defaults.content;
				defaults.content = ''
			}
			
			self.defaults = defaults
			self.defaults.show = "";
			
			$(defaults.target).each(function(i, el){
				$(el)[0].jui2 = $(el)[0].jui2 || {}
				$(el).bind('mouseover', function(){
					setTimeout(function(){
						if($(el).is(":hover")){
							if(!$(el)[0].jui2.show){
								self.output = $(jui2.tmpl.tmpl_tooltip(defaults));
								if(defaults.event.onshow){
									defaults.event.onshow(self, $(el))
								}
								$('body').append(self.output);
								
								if(defaults.server){
									$.ajax({
										url: defaults.url ,
									}).done(function(data){
										self.output.find('.j-tooltip-content').empty().append(data)
										self.output[0].tether.position()
									})
								}
								else{
									self.output.find('.j-tooltip-content').empty().append(defaults.content);
								}
								
								self.output[0].tether = jui2.pin({
									element: self.output,
									target: $(el),
									attachment: 'bottom horizontalcenter',
									targetAttachment: 'top horizontalcenter'
								})
								
								//console.log(self.output.css('left'))
								//if(parseInt(self.output.css('left'))<0){
									//self.output.find('.j-tooltip-content').css('padding-left', parseInt(self.output.css('left'))+'px')
								//}
								
								self.output.css('z-index', jui2.findHighestZIndex()+1)
								
								$(el).bind('mouseout', function(){
									
									setTimeout(function(){
										if(!$(el).is(":hover")){
											self.output.remove()
											$(el)[0].jui2.show = !1
										}
									}, 250)
								})
							}
							$(el)[0].jui2.show = !0
						}
					}, 250)
					//$(defaults.target).children('.j-tooltip').show();
					//$(defaults.target).children('.j-tooltip').css('z-index', jui2.findHighestZIndex()+1)
				})
			})
			
		}
	}
	
	var $widget = jui2.tooltip = function(opt) {
        return new tooltip(opt);
    };
	
	$widget.fn = tooltip.prototype;
	
	$widget.fn.setContent = function(content, defaults){
		defaults = this.defaults
		defaults.content = content
		if(defaults.server){
			defaults.url = content;
			defaults.content = 'Loading...';
		}
	}
	/*
	jui2.tooltip.fn.val = function(val){
		if(val)
			$(this[0]).find('input').val(val)
		return val || $(this[0]).find('input').val();
	}
	
	jui2.tooltip.fn.reset = function(){
		$(this[0]).find('input').val('')
	}
	
	jui2.tooltip.fn.disable = function(){
		$(this[0]).find('input').attr('readonly', !0)
		return this;
	}
	
	jui2.tooltip.fn.enable = function(){
		$(this[0]).find('input').removeAttr('readonly')
		return this;
	}
	
	jui2.tooltip.fn.close = function(){
		this[0].hide()
		return this;
	}
	
	jui2.tooltip.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}*/
	
}(jQuery));/****js/widget/tree.js****/
(function($){
/** JUI2 tree UI
	@class jui2.list.tree
	@extend jui2
	@param {object} tree options
	@return {object} jui2 tree object
	@author Deddy Lasmono Putro
	@docauthor Deddy Lasmono Putro
	Example Usage:
	
		@example
		jui2.tree({
			data: 'path/to/data/url',
			root: false
		})
		
	To create tree children with click event, you can add event using javascript like in this example:
	
		@example
		jui2.tree({
			data: 'path/to/data/url',
			root: false,
			event: {
				click: function(tree, record){
					console.log('You clicked the tree!');
				}
			}
		})
		
	This one is the HTML version example:
	
		@example
		<ul jui2="true" role="tree" event="event" data="path/to/data/url" root="false"></ul>
		<script>
			var event = {
				click: function(tree, record){
					console.log('You clicked the tree!');
				}
			}
			jui2.create()
		</script>
 */
	var tree = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			/*opt = opt || {}*/
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				//defaults.event.click(self.aaData({___id: $(this).attr('data')}).get()[0])
				event: {},
				width: '150px',
				columns: [],
				server: !1,
				hidden:[],
				data: '',
				root: false
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_tree(defaults));
			
			
			output[0].jui2 = self;
			self[0] = output[0];
			self.length = 1;
			output[0].jui2.defaults = defaults
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			var jui2Param = output[0].jui2.param = {}
			jui2Param.sEcho = -1
			jui2Param.iDisplayLength = 10
			jui2Param.iDisplayStart = 0
			jui2Param.iSortCol_0 = 0
			jui2Param.sSearch = ''
			jui2Param.sSortDir_0 = ''
			
			if(defaults.root){
				var data = $(jui2.tmpl.tmpl_treeData({data: [[defaults.rootname, defaults.data]]}));
				output.empty().append(data);
				data.children('i').click(function(){
					if($(this).next().next().text()==''){
						$(this).removeClass('fa-plus-square-o').addClass('fa-minus-square-o')
						jui2.tree({class: 'j-tree-children', data: $(this).attr('data'), server: !0, parent: $(this).next().next(), event: defaults.event});
					}
					else{
						$(this).removeClass('fa-minus-square-o').addClass('fa-plus-square-o')
						$(this).next().next().text('')
					}
				})
				data.children('.j-tree-head').click(function(){
					if(defaults.event.click)
						defaults.event.click()
				})
			}
			else{
				output[0].jui2.generateData()
			}
			
			return self;
			
		}
	}
	
	var $widget = jui2.tree = function(opt) {
        return new tree(opt);
    };
	
	$widget.fn = tree.prototype;
	
	$widget.fn.disable = function(){
		
	}
	
	$widget.fn.enable = function(){
		
	}
	
	$widget.fn.close = function(){
		this[0].hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
	$widget.fn.generateData = function(){
		var self = this, $self = $(this[0]), param = self.param, defaults = self.defaults
		self.loadingMask = jui2.loadingMask(self[0])
		self.param.sEcho++;
		$.getJSON(defaults.data, param).done(function(data){
			if(param.sEcho==data.sEcho){
				defaults.items = new Array();
				param.totalPage = (+data.iTotalRecords)-1;
				
				jui2.clearNullFromJson(data.aaData);
				
				data.aaData = jui2.arrayToJson(data.aaData);
				self.aaData = TAFFY(data.aaData)
				for(i in data){
					if(i!='aaData'){
						param[i] = data[i]
					}
				}
				/*$.each(data, function(i, val){
					console.log(i);
					if(i^'aaData')
						param[i] = val
				})*/
				
				var dataToBeShowed = [], tmpdataToBeShowed = []
				$.extend(!0, dataToBeShowed, self.aaData().get());
				//var dataToBeShowed = (defaults.server == !0) ? self.aaData().start(0).limit(param.iDisplayLength).get() : self.aaData().start(param.iDisplayStart).limit(param.iDisplayLength).get();
				$.extend(!0, tmpdataToBeShowed, dataToBeShowed)
				if(defaults.custom)
					for(var i=0;i<dataToBeShowed.length;i++){
						for(j in defaults.custom){
							tmpdataToBeShowed[i][j] = defaults.custom[j](dataToBeShowed[i])
						}
					}
				var data = $(jui2.tmpl.tmpl_treeData({data: tmpdataToBeShowed}));
				$self.empty().append(data);
				data.children('.j-tree-head').click(function(){
					if(defaults.event.click)
						defaults.event.click(self, self.aaData({___id: $(this).attr('data')}).get()[0])
				})
				data.children('i').click(function(){
					var el = this, $el = $(el);
					if($el.next().next().text()==''){
						$el.removeClass('fa-plus-square-o').addClass('fa-minus-square-o')
						var childrenUrl = defaults.childrenurl ? defaults.childrenurl(self.aaData({___id: $el.next().attr('pk')}).get()[0]) : $el.attr('data')
						jui2.tree({class: 'j-tree-children', data: $el.attr('data'), server: !0, parent: $el.next().next(), event: defaults.event});
					}
					else{
						$el.removeClass('fa-minus-square-o').addClass('fa-plus-square-o')
						$el.next().next().text('')
					}
				})
				
			}
		}).always(function(){
			self.loadingMask.destroy()
		})
	}
	
}(jQuery));/****js/widget/uploadField.js****/
(function($){
/** JUI2 uploadField UI
	@class jui2.input.uploadField
	@alternateClassName jui2.uploadField
	@extend jui2.component
	@param {Object} uploadField options
	@return {Object} jui2 uploadField object
	@author Deddy Lasmono Putro
	@docauthor Deddy Lasmono Putro
	Example Usage:
	
		@example
		jui2.uploadField({
			label: 'uploadField'
		})
		
	This one is the HTML version example:
	
		@example
		<input jui2="true" role="uploadField" label="Text field"></input>
		<script>
			jui2.create()
		</script>
 */
	var uploadField = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/

		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				/**
					@cfg {string} id
					will be auto generated string if leave blank
				*/
				id: 'j-'+jui2.random(8, 'aA#'),
				/**
					@cfg {boolean} disabled
					True if this menu button disabled
				*/
				disabled: !1,
				event: {}
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_uploadField(defaults));
			/**
					@cfg {String/HTMLElement/NodeList} parent
					Parent selector is a element selector wich this UI will be appended if exist
				*/
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			if(defaults.format)
				jui2.keycodes.bind(output.find('input'), defaults.format)
				
			if(defaults.event.keydown){
				output.find('input').keydown(function(e){
					defaults.event.keydown(e, self);
				})
			}
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			output[0].jui2 = self;
			self[0] = output[0];
			self.length = 1;
			self.defaults = defaults
		
			return self;
			
		}
	}
	
	var $widget = jui2.uploadField = function(opt) {
        return new uploadField(opt);
    };
	
	$widget.fn = uploadField.prototype;
	/**
		@method val
		Get value
	*/
	$widget.fn.val = function(val){
		$el = $(this[0]).find('input')
		if(val)
			$el.val(val)
		return $el.val();
	}
	/**
		@method files
		Get files
	*/
	$widget.fn.val = function(){
		$el = $(this[0]).find('input')
		return $el[0].files;
	}
	/**
		@method reset
		Clear the value of UI
		@chainable
	*/
	$widget.fn.reset = function(){
		$(this[0]).find('input').val('')
		return this;
	}/*
	
	jui2.uploadField.fn.close = function(){
		this[0].hide()
		return this;
	}*/
	
	jui2.extend(jui2.component, $widget, ['click'])
	/**
		@method click
		@hide
	*/
	
}(jQuery));/****js/widget/window.js****/
(function($){

	jui2.class.window = P(jui2.class.widget, function(window, widget) {
		
		window.init = function(defaults){
			var self = this;
			defaults = $.extend({}, this.defaults, {
				template: 'tmpl_window',
				disabled: false,
				title: '',
				width: '500px',
				height: '200px',
				position: false,
			}, defaults)

			defaults.events = {
				afterrender: function(prepared){
					if(self.defaults.topbar){
						jui2.class.bar({items: self.defaults.topbar, target: self.prepared.children('.jn-header'), 'class': 'jn-header'})
					}
					else
						self.prepared.children('.jn-header').hide()
					if(self.defaults.event.afterrender)
						self.defaults.event.afterrender(self);
					
					self.drag = new Draggabilly( prepared[0], {
					  handle: '.jn-title'
					}).on( 'dragMove', function(instance, event, pointer){
						if($(instance.element).hasClass('jn-window-max')){
							$(instance.element).css('z-index', jui2.findHighestZIndex());
							$(instance.element).removeClass('jn-window-max')[0].style.top = event.clientY-40
							instance.element.style.left = (event.clientX-$(instance.element).prop('data-width')/2)+'px'
							self.drag.startPosition.x = event.clientX-$(instance.element).prop('data-width')/2
							self.drag.startPosition.y = event.clientY-40
						}
					});
	
					prepared.children('.jn-title').dblclick(function(e){
						if(!$(e.target).hasClass('jn-pointer') && $(e.target).parents('.jn-pointer').length == 0 && !$(this).parent().hasClass('jn-window-max'))
							self.maximize(prepared);
						else{
							$(this).parent().removeClass('jn-window-max').css({
								'top': $(this).parent().prop('data-y'),
								'left': $(this).parent().prop('data-x')
							})
						}
					})
					
					prepared.children('.jn-title').children('.jn-window-close').click(function(){
						self.destroy();
					})
					
					prepared.children('.jn-title').children('.jn-window-minimize').click(function(){
						if($('.jn-main-footer').length==0){
							prepared.children('.jn-window-body').hide()
							prepared.children('.jn-header').hide()
							prepared.removeClass('jn-window-max');
							prepared.width('150px').height('auto').css({
								'bottom': 0,
								'top': ''
							})
							self.drag.disable()
						}
						else{
							
						}
					})
					
					prepared.children('.jn-title').children('.jn-window-expand').click(function(){
						if(!$(this).parent().parent().hasClass('jn-window-max'))
							self.maximize(prepared);
						else{
							prepared.removeClass('jn-window-max').css({
								'top': prepared.prop('data-y'),
								'left': prepared.prop('data-x')
							})
						}
					})
					
					if(!defaults.position){
						prepared.center();
					}
					else{
						prepared.css({
							'top': defaults.position.top,
							'left': defaults.position.left
						})
					}
					
					return prepared;
				}
			}
			
			return widget.init.call(this, defaults);
		}
		
		window.maximize = function(prepared){
			if(!prepared.hasClass('jn-window-minimize')){
				prepared.prop('data-x', prepared.css('left'))
				prepared.prop('data-y', prepared.css('top'))
				prepared.prop('data-width', prepared.outerWidth())
				prepared.prop('data-height', prepared.outerHeight())
			}
			else{
				prepared.removeClass('jn-window-minimize')
			}
			prepared.addClass('jn-window-max');
			prepared.css('z-index', jui2.findHighestZIndex());
			prepared.children('.jn-window-body').show()
			this.drag.enable()
			prepared.css('bottom', '');
		}
		
	});
	
}(jQuery));/****js/widget/windowPanel.js****/
(function($){
	
	var windowPanel = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
		
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				title: '',
				icon: '',
				disabled: !1,
				event: {},
				taskbar: !1
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_windowPanel(defaults));
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			typeof defaults.event.click == 'function' &&
				output.click(defaults.event.click);
				
			/*if(defaults.taskbar){
				jui2.button({label: defaults.title, parent: $(defaults.taskbar)})
			}*/
			self.defaults = defaults;
			output[0].jui2 = self;
			
			//output[0].jui2.defaults = defaults;
			
			self[0] = output[0];
			self.length = 1;
			return self;
			
		}
	}
	
	var $widget = jui2.windowPanel = function(opt) {
        return new windowPanel(opt);
    };
	
	$widget.fn = windowPanel.prototype;
	
	$widget.fn.minimize = function(){
		var self = this, defaults = this[0].jui2.defaults;
		if(defaults.taskbar){
			jui2.button({label: defaults.title, parent: $(defaults.taskbar),
				event : {
					click: function(el){
						$(self[0]).show()
						el.destroy()
					}
				}})
			$(this[0]).hide()
		}/*
		var defaults = this[0].jui2.defaults
		defaults.taskbar &&
			~function(defaults, $el){
				jui2.button({label: defaults.title, parent: $(defaults.taskbar),
					event : {
						click: function(el){
							$el.show()
							el.destroy()
						}
					}
				})
				$el.hide()
			}(defaults, $(self[0]))*/
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
		this[0] = null;
	}
	
}(jQuery));/****js/widget/yearPicker.js****/
(function($){
	
	var yearPicker = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(!0, defaults, opt)
		
		var target = defaults.target ? typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target) : $('#'+defaults.id)

		/*if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)*/
		
		if(target.hasClass('j-body')){
			return target[0].jui2;
			/*self[0] = target;
			self.length = 1;
			
			return self;*/
		}
		else{
			opt = opt || {}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: !1,
				event: {},
				parent: 'body',
				year: (+moment().format('YYYY'))
			}
			
			$.extend(!0, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_yearPicker(defaults));
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			//generate top toolbar
			jui2.bar({
				parent: output.find('.j-yearPicker-top-toolbar'),
				'class': 'j-bg-inherit',
				items: ['-', {
					role: 'button',
					icon: 'fa-chevron-left',
					'class': 'j-bg-inherit j-border-inherit',
					event:{
						click: function(){
							output[0].jui2.changeYear(-10)
						}
					}
				}, '-', {
					role: 'button',
					icon: 'fa-chevron-right',
					'class': 'j-bg-inherit j-border-inherit',
					event:{
						click: function(){
							output[0].jui2.changeYear(10)
						}
					}
				}, '-']
			})
			
			self.value = defaults.year
			output[0].jui2 = self;
			
			$td = output.find('tbody td');
			
			$td.click(function(){
				var el = $(this), clsSel = 'j-yearPicker-selected'
				output[0].jui2.value = el.text();
				$td.removeClass(clsSel);
				el.addClass(clsSel);
			})
			
			0 in target && target.replaceWith(output) || defaults.parent && $(defaults.parent).append(output) || $('body').append(output);
			
			self[0] = output[0];
			self.length = 1;
			
			return self;
			
		}
	}
	
	var $widget = jui2.yearPicker = function(opt) {
        return new yearPicker(opt);
    };
	
	$widget.fn = yearPicker.prototype;
	
	$widget.fn.disable = function(self){
		self = this
		/*if(!this.overlay)
			this.overlay = jui2.overlay({overlayTarget: this[0]})*/
			
		self.overlay = !self.overlay && jui2.overlay({overlayTarget: self[0]})
	}
	
	$widget.fn.enable = function(self){
		self = this
		/*if(this.overlay){
			this.overlay.destroy();
			this.overlay = null
		}*/
		self.overlay && (
			self.overlay.destroy(),
			self.overlay = null
		)
	}
	
	$widget.fn.changeYear = function(offset){
		var el = $(this[0]).find('tbody td'), self = this, clsSel = 'j-yearPicker-selected';

		el.removeClass(clsSel);
		el.each(function(){
			var el = $(this);
			el.text((+el.text())+offset)
			el.text() == self.value && el.addClass(clsSel);
			/*if(el.text()==self.value)
				el.addClass(clsSel);*/
		})
	}
	
	$widget.fn.close = function(){
		$(this[0]).hide()
	}
	
	$widget.fn.destroy = function(){
		$(this[0]).remove()
	}
	
}(jQuery));/****js/create.js****/
(function($){
	jui2.adapter = {}
	var adp = jui2.adapter
	
	adp.panel = function(vr, selector){
		$(selector+'[jui2=true][role=panel]').each(function(){
			var data = {}
			data['content'] = $(this).html()
			$.each(this.attributes, function(i, val){
				data[val.name] = (val.name=='event') ? vr[val.value] : val.value;
				/*if(val.name=='event' || val.name=='items')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector

			data.target = this;
			jui2.panel(data);
		})
	}
	
	adp.table = function(vr, selector){
		$(selector+'table[jui2=true][role=table]').each(function(){
			var data = {}
			$.each(this.attributes, function(i, val){
				
				data[val.name] = ['drop', 'server', 'jui2', 'hidden', 'merge', 'stickycolumn'].indexOf(val.name) > -1 ? 
					eval(val.value) 
				: ['event', 'bottombar', 'topbar', 'custom', 'preview', 'editable', 'save', 'param'].indexOf(val.name) > -1 ? 
					vr[val.value]
				:
					val.value
				/*
				if(val.name=='drop' || val.name == 'server' || val.name == 'jui2' || val.name == 'hidden')
					data[val.name] = eval(val.value);
				else if(val.name=='event' || val.name == 'topbar' || val.name == 'custom'){
					data[val.name] = window[val.value]
				}
				else
					data[val.name] = val.value;*/
			})
			if(!data.server){
				data.data = eval(data.data)
			}
			data.vr = selector
			
			data.colCount = $(this).find('tbody td').length;
			data.columns = []
			$(this).find('thead tr').each(function(i, val){
				data.columns[i] = [];
				//var col = {};
				$(this).find('td').each(function(){
					var el =$(this);
					data.columns[i].push({
						text: el.html(),
						colspan: el.attr('colspan')?el.attr('colspan'):0,
						rowspan: el.attr('rowspan')?el.attr('rowspan'):0,
						width: el.attr('width')?el.attr('width'):'auto',
					})
				})
			})
			data.target = this;
			jui2.table(data);
		})
	}
	
	adp.slimTable = function(vr, selector){
		$(selector+'table[jui2=true][role=slimTable]').each(function(){
			var data = {}
			$.each(this.attributes, function(i, val){
				
				data[val.name] = ['drop', 'server', 'jui2', 'hidden', 'merge', 'stickycolumn'].indexOf(val.name) > -1 ? 
					eval(val.value) 
				: ['event', 'bottombar', 'topbar', 'custom', 'preview', 'editable', 'save'].indexOf(val.name) > -1 ? 
					vr[val.value]
				:
					val.value
				/*
				if(val.name=='drop' || val.name == 'server' || val.name == 'jui2' || val.name == 'hidden')
					data[val.name] = eval(val.value);
				else if(val.name=='event' || val.name == 'topbar' || val.name == 'custom'){
					data[val.name] = window[val.value]
				}
				else
					data[val.name] = val.value;*/
			})
			if(!data.server){
				data.data = eval(data.data)
			}
			else{
				data.url = data.data
			}
			data.vr = selector
			
			data.colCount = $(this).find('tbody td').length;
			data.columns = []
			$(this).find('thead tr').each(function(i, val){
				data.columns[i] = [];
				//var col = {};
				$(this).find('td').each(function(){
					var el =$(this);
					data.columns[i].push({
						text: el.html(),
						colspan: el.attr('colspan')?el.attr('colspan'):0,
						rowspan: el.attr('rowspan')?el.attr('rowspan'):0,
						width: el.attr('width')?el.attr('width'):'auto',
					})
				})
			})
			data.target = this;
			jui2.slimTable(data);
		})
	}
	
	adp.tree = function(vr, selector){
		$(selector+'ul[jui2=true][role=tree]').each(function(){
			var data = {}
			$.each(this.attributes, function(i, val){
				
				data[val.name] = ['server', 'jui2', 'root'].indexOf(val.name) > -1 ? 
					eval(val.value) 
				: ['event'].indexOf(val.name) > -1 ? 
					vr[val.value]
				:
					val.value
			})
			data.vr = selector

			data.target = this;
			jui2.tree(data);
		})
	}
	
	adp.textField = function(vr, selector){
		$(selector+'[jui2=true][role=textField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name == 'event' ? vr[val.value] : val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
				if(val.name == 'required')
					data[val.name] = eval(val.value)
			})
			data.vr = selector
			
			data.target = this;
			
			jui2.textField(data);
		})
	}
	
	adp.numberField = function(vr, selector){
		$(selector+'[jui2=true][role=numberField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name == 'event' ? vr[val.value] : val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
				if(val.name == 'required')
					data[val.name] = eval(val.value)
			})
			data.vr = selector
			
			data.target = this;
			
			jui2.numberField(data);
		})
	}
	
	adp.timeField = function(vr, selector){
		$(selector+'[jui2=true][role=timeField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name == 'event' ? vr[val.value] : val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector
			
			data.target = this;
			
			jui2.timeField(data);
		})
	}
	
	adp.uploadField = function(vr, selector){
		$(selector+'[jui2=true][role=uploadField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name == 'event' ? vr[val.value] : val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector
			
			data.target = this;
			
			jui2.uploadField(data);
		})
	}
	
	adp.textArea = function(vr, selector){
		$(selector+'[jui2=true][role=textArea]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name == 'event' ? vr[val.value] : val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector
			
			data.target = this;
			jui2.textArea(data);
		})
	}
	
	adp.passwordField = function(vr, selector){
		$(selector+'[jui2=true][role=passwordField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name == 'event' ? vr[val.value] : val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector
			
			data.target = this;
			jui2.passwordField(data);
		})
	}
	
	adp.datePicker = function(vr, selector){
		$(selector+'[jui2=true][role=datePicker]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name == 'event' ? vr[val.value] : val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector

			data.target = this;
			jui2.datePicker(data);
		})
	}
	
	adp.comboField = function(vr, selector){
		$(selector+'[jui2=true][role=comboField]').each(function(){
			var data = {}
			for(var i = this.attributes.length, attr = this.attributes;i--;){
				val = attr[i]
				
				val.name == 'data' && (data['items'] = val.value) ||
				(data[val.name] = ['items', 'display', 'display-name', 'firstload'].indexOf(val.name)^-1 &&
					eval(val.value)
				|| val.name=='data' &&
					val.value
				|| val.name=='event' &&
					vr[val.value]
				|| val.name=='length' &&
					parseInt(val.value)
				||
					val.value)
				if(val.name == 'firstload')
					data[val.name] = eval(val.value)
			}
			data.vr = selector
			
			data.target = this;
			jui2.comboField(data);
		})
	}
	
	adp.radioField = function(vr, selector){
		$(selector+'[jui2=true][role=radioField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				switch(val.name){
					case 'items': 
						data['items'] = eval(val.value);
						 break;
					case 'items-from-var': 
						data['items'] = vr[val.value];
						 break;
					case 'event': 
						data[val.name] = vr[val.value];
						 break;
					default:
						data[val.name] = val.value;
						
				}
			})
			data.vr = selector
			
			data.target = this;
			jui2.radioField(data);
		})
	}
	
	adp.checkboxField = function(vr, selector){
		$(selector+'[jui2=true][role=checkboxField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				switch(val.name){
					case 'items': 
						data['items'] = eval(val.value);
						 break;
					case 'items-from-var': 
						data['items'] = vr[val.value];
						 break;
					case 'event': 
						data[val.name] = vr[val.value];
						 break;
					default:
						data[val.name] = val.value;
						
				}
				/*
				if(val.name=='items')
					data['items'] = eval(val.value)
				else if(val.name=='items-from-var')
					data['items'] = window[val.value]
				else if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector
			
			data.target = this;
			jui2.checkboxField(data);
		})
	}
	
	adp.button = function(vr, selector){
		$(selector+'[jui2=true][role=button]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name=='event' ? vr[val.value] :val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector
			data.target = this;
			jui2.button(data);
		})
	}
	
	adp.menuButton = function(vr, selector){
		$(selector+'[jui2=true][role=menuButton]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name=='event' || val.name=='menu' ? vr[val.value] :val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector

			data.target = this;
			jui2.menuButton(data);
		})
	}
	
	adp.splitButton = function(vr, selector){
		$(selector+'[jui2=true][role=menuButton]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = val.name=='event' || val.name=='menu' ? vr[val.value] :val.value;
				/*if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector

			data.target = this;
			jui2.menuButton(data);
		})
	}
	
	adp.bar = function(vr, selector){
		$(selector+'[jui2=true][role=bar]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = (val.name=='event' || val.name=='items') ? vr[val.value] : val.value;
				/*if(val.name=='event' || val.name=='items')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector

			data.target = this;
			jui2.bar(data);
		})
	}
	
	adp.timeLine = function(vr, selector){
		$(selector+'[jui2=true][role=timeLine]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				data[val.name] = (val.name=='event') ? vr[val.value] : val.value;
				/*if(val.name=='event' || val.name=='items')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;*/
			})
			data.vr = selector

			data.target = this;
			jui2.bar(data);
		})
	}
	
	jui2.create = function(globalVar){
		var vr = window[globalVar] || window, selector = globalVar ? '#'+globalVar+' ' : '';
		$.each(adp, function(i, val){
			adp[i](vr, selector)
		})
	}
}(jQuery))