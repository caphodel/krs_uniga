//Simple widget
//Created by Deddy Lasmono Putro caphodel@gmail.com

Number.prototype.formatMoney = function(c, d, t){
var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
 
$.sw = {};
/*
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);

(function ($) {
	$.fn.hasScrollBar = function () {
		return this.get(0).scrollHeight > this.height();
	}
})(jQuery);

jQuery.fn.toHtmlString = function () {
	return $(this).get()[0].outerHTML;
};
(function ($, c, b) {
	$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "), function (d) {
		a(d)
	});
	a("focusin", "focus" + b);
	a("focusout", "blur" + b);
	$.addOutsideEvent = a;
	function a(g, e) {
		e = e || g + b;
		var d = $(),
		h = g + "." + e + "-special-event";
		$.event.special[e] = {
			setup : function () {
				d = d.add(this);
				if (d.length === 1) {
					$(c).bind(h, f)
				}
			},
			teardown : function () {
				d = d.not(this);
				if (d.length === 0) {
					$(c).unbind(h)
				}
			},
			add : function (i) {
				var j = i.handler;
				i.handler = function (l, k) {
					l.target = k;
					j.apply(this, arguments)
				}
			}
		};
		function f(i) {
			$(d).each(function () {
				var j = $(this);
				if (this !== i.target && !j.has(i.target).length) {
					j.triggerHandler(e, [i.target])
				}
			})
		}
	}
})(jQuery, document, "outside");

(function ($) {
	$.sw.randomString = function (length, chars) {
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
	/***********************************///-parseInt($(el).height())
	$.sw.mask = function (el) {
		return $('<div id="sws-mask-' + $(el).attr('id') + '" class="sws-mask" style="width:' + $(el).outerWidth() + 'px;height:' + $(el).outerHeight() + 'px;top:' + $(el).position().top + 'px;left:' + $(el).position().left + 'px;"></div>').insertAfter($(el));
	}
	/***********************************/
	$.sw.widget = function (fn) {
		var self = this;
		this.options = {
			target : '',
			baseCls : '',
			width : '180px',
			data : '',
			disabled : false,
			height : 'auto',
			hidden : false,
			renderTo : false,
			listeners : {}
		}
		this.maskEl = '';
		this.getOptions = function () {
			return this.options;
		}
		this.name = '';
		this.fn = {};
		this.fn.render = function () {};
		this.fn.enable = function () {};
		this.fn.disable = function () {};
		this.fn.hide = function () {};
		this.fn.show = function () {};
		this.baseEl = '';
		this.on = function (event, fn) {
			self.options.listeners[event] = fn;
			return self.targetEl[0].sw;
		}
		
		this.remove = function () {
			tmp = self.targetEl[0].sw;
			$(self.targetEl[0].sw.baseEl).remove();
			/**
			@event show
			@desc Fires after the component is shown when calling the show method.
			 */
			if (typeof self.options.listeners.remove == 'function')
				self.options.listeners.remove(tmp);
		}
		
		this.generateId = function (el) {
			if (typeof $(el).attr('id') == 'undefined') {
				return $.sw.randomString(8, '#aA');
			} else
				return $(el).attr('id');
		}
		
		this.hide = function () {
			$(this.baseEl).hide();
			self.fn.hide();
			/**
			@event hide
			@desc Fires after the component is hidden. Fires after the component is hidden when calling the hide method.
			 */
			if (typeof self.options.listeners.hide == 'function')
				self.options.listeners.hide(self.targetEl[0].sw);
			return self.targetEl[0].sw;
		}
		
		this.show = function () {
			$(this.baseEl).show();
			self.fn.show();
			/**
			@event show
			@desc Fires after the component is shown when calling the show method.
			 */
			if (typeof self.options.listeners.show == 'function')
				self.options.listeners.show(self.targetEl[0].sw);
			return self.targetEl[0].sw;
		}
		
		this.render = function () {
			/**
			@event beforerender
			@desc Fires before the component is rendered. Return false from an event handler to stop the render.
			 */
			if (typeof self.options.listeners.beforerender == 'function')
				self.options.listeners.beforerender(self.targetEl[0].sw);
			
			self.fn.render();
			
			//event click
			$(this.baseEl).click(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.click == 'function')
					self.options.listeners.click(self.targetEl[0].sw, e);
			}).dblclick(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.dblclick == 'function')
					self.options.listeners.dblclick(self.targetEl[0].sw, e);
			}).focus(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.focus == 'function')
					self.options.listeners.focus(self.targetEl[0].sw, e);
			}).focusin(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.focusin == 'function')
					self.options.listeners.focusin(self.targetEl[0].sw, e);
			}).focusout(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.focusout == 'function')
					self.options.listeners.focusout(self.targetEl[0].sw, e);
			}).hover(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.hover == 'function')
					self.options.listeners.hover(self.targetEl[0].sw, e);
			}).keydown(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.keydown == 'function')
					self.options.listeners.keydown(self.targetEl[0].sw, e);
			}).keypress(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.keypress == 'function')
					self.options.listeners.keypress(self.targetEl[0].sw, e);
			}).keyup(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.keyup == 'function')
					self.options.listeners.keyup(self.targetEl[0].sw, e);
			}).mouseover(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.mouseover == 'function')
					self.options.listeners.mouseover(self.targetEl[0].sw, e);
			}).mouseup(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.mouseup == 'function')
					self.options.listeners.mouseup(self.targetEl[0].sw, e);
			}).mousedown(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.mousedown == 'function')
					self.options.listeners.mousedown(self.targetEl[0].sw, e);
			}).mouseenter(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.mouseenter == 'function')
					self.options.listeners.mouseenter(self.targetEl[0].sw, e);
			}).mouseleave(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.mouseleave == 'function')
					self.options.listeners.mouseleave(self.targetEl[0].sw, e);
			}).mousemove(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.mousemove == 'function')
					self.options.listeners.mousemove(self.targetEl[0].sw, e);
			}).mouseout(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.mouseout == 'function')
					self.options.listeners.mouseout(self.targetEl[0].sw, e);
			}).blur(function (e) {
				/**
				@event show
				@desc Fires after the component is shown when calling the show method.
				 */
				if (typeof self.options.listeners.blur == 'function')
					self.options.listeners.blur(self.targetEl[0].sw, e);
			})
			
			/**
			@event render
			@desc Fires after the component markup is rendered.
			 */
			if (typeof self.options.listeners.render == 'function')
				self.options.listeners.render(self.targetEl[0].sw);
			return self.targetEl[0].sw;
		}
		
		this.enable = function () {
			//self.find('div#sws-mask').remove();
			self.maskEl.remove();
			self.fn.enable();
			return self.targetEl[0].sw;
		}
		/**
		@method disable()
		@desc Disable this component and fire the 'disable' event.
		 */
		this.disable = function () {
			self.maskEl = $.sw.mask(self.baseEl);
			self.fn.disable();
			/**
			@event disable(component)
			@desc Fires after the component is disabled.
			 */
			if (typeof self.options.listeners.render == 'function')
				self.options.listeners.render(self.targetEl[0].sw);
			return self.targetEl[0].sw;
		}
		
		this.create = function (fn) {
			for (i in fn) {
				self[i] = fn[i];
			}
		}
		
	}
})(jQuery);

(function ($) {
	$.sw.combobox = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			opt.target = $('<select></select>').attr('id', id).appendTo(opt.renderTo);
		}
		var el = $(opt.target);
		
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof(opt) != 'undefined') {
						if (typeof $(opt.target)[0].sw != 'undefined') {
							$('.sws-combobox-' + $(opt.target).attr('id')).remove();
						}
						$.extend(this.options, this.getOptions(), {
							data : '',
							valueField : '',
							displayField : '',
							width : '200px',
							height : '250px',
							type : '',
							autoSelect : false,
							pageSize : false,
							editable : true,
							typeAhead : false,
							typeAheadDelay : 250,
							listeners : {
								select : '',
								beforeselect : '',
								blur : '',
								change : '',
								keyup : '',
								keypress : '',
								keydown : '',
								render : '',
								beforerender : ''
							},
							blankText : 'This field is required',
							emptyText : '',
							allowBlank : true,
							baseCls : 'sws-input'
						}, opt)
						var self = this;
						self.name = 'combobox';
						self.targetEl = $(self.options.target).hide().empty();
						self.id = self.generateId(self.targetEl);
						self.cp = self.options.allowBlank == true ? '&nbsp;' : self.options.blankText;
						self.baseEl = $('<div id="' + $.sw.randomString(8, '#aA') + '" class="' + self.options.baseCls + ' sws-base sws-combobox-' + self.id + '" style="width:' + (parseInt(self.options.width) - 12) + 'px;' /* + (parseInt(self.targetEl.innerHeight()) - 2)*/
								 + '">&nbsp;</div>');
						$('.sws-' + self.id).remove();
						$('#sws-comboTable-' + self.id).remove();
						/**
						@method reset
						@desc Resets the current field value to the originally-loaded value and clears any validation messages. Also adds emptyText...
						 */
						this.reset = function () {
							self.targetEl.empty();
							self.baseEl.children('div#sws-content').html('&nbsp;');
							$('#sws-comboTable-' + self.id)[0].sw.records().remove();
							$('#sws-comboTable-' + self.id)[0].sw.drawTable();
						}
						
						this.fn.render = function () {
							var opt = self.options;
							self.baseEl.insertAfter(self.targetEl).append('<div id="sws-content" contenteditable="' + opt.editable.toString() + '" style="position:relative;float:left;width:' + (parseInt(opt.width) - 17) + 'px;padding-top: 3px;"></div><div style="position:relative;top:-10px;float:right;width: 0;height: 0;border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 5px solid #000;"></div>').find('#sws-content').html(self.cp);
							$('#sws-comboTable-' + self.id).remove();
							$('body').append('<table id="sws-comboTable-' + self.id + '"></table>');
							var swComboTable = $('#sws-comboTable-' + self.id);
							
							$.sw.table({
								target : '#sws-comboTable-' + self.id,
								data : opt.data,
								height : opt.height,
								width: opt.width,
								displayData: false,
								columns : [{
										name : opt.displayField,
										title : opt.displayField,
										type : opt.type,
										style : 'cursor:pointer;',
										renderer : function (fields, el, record) {
											var display = record[opt.displayField],
											record = record;
											
											return el.click(function () {
												/**
												@event beforeselect
												@desc Fires before a list item is selected. Return false to cancel the selection.
												 */
												oldValue = self.targetEl.val();
												var optEl = '<option value="' + record[opt.valueField] + '" selected="true">' + display + '</option>';
												if (typeof opt.listeners.beforeselect == 'function')
													opt.listeners.beforeselect(self.targetEl[0].sw, record);
												self.baseEl.children('div#sws-content').text(display).parent().addClass('sws-border-default').removeClass('sws-border-error');
												self.targetEl.empty().append(optEl);
												$('.sws-table-sws-comboTable-' + self.id).hide();
												/**
												@event change
												@desc Fires just before the field blurs if the field value has changed.
												 */
												if (oldValue != self.targetEl.val())
													if (typeof opt.listeners.change == 'function')
														opt.listeners.change(self.targetEl[0].sw, self.targetEl.val(), oldValue);
												/**
												@event select
												@desc Fires when a list item is selected
												 */
												if (typeof opt.listeners.select == 'function')
													opt.listeners.select(self.targetEl[0].sw, record);
											})
										}
									}
								],
								pageSize : opt.pageSize,
								header : false
							});
							
							$('.sws-table-sws-comboTable-' + self.id).hide();
							
							if (!self.options.allowBlank) {
								self.baseEl.find('#sws-content').text(self.options.blankText);
							}
							
							self.baseEl.find('#sws-content').keyup(function (e) {
								/**
								@event keyup
								@desc Keyup input field event. This event only fires if enableKeyEvents is set to true.
								 */
								if (typeof self.options.listeners.keyup == 'function')
									self.options.listeners.keyup(self.targetEl[0].sw, e);
								if (self.baseEl.find('#sws-content').text() == '')
									self.baseEl.find('#sws-content').html('&nbsp;');
								if (self.options.typeAhead)
									window.setTimeout(function () {
										$('#sws-comboTable-' + self.id)[0].sw.searchData(self.baseEl.find('#sws-content').text().replace(/^\s+|\s+$/g, ''));
									}, self.options.typeAheadValue)
							})
							
							self.baseEl.find('#sws-content').keypress(function (e) {
								/**
								@event keypress
								@desc Keypress input field event. This event only fires if enableKeyEvents is set to true.
								 */
								if (typeof self.options.listeners.keypress == 'function')
									self.options.listeners.keypress(self.targetEl[0].sw, e);
							})
							
							self.baseEl.find('#sws-content').keydown(function (e) {
								/**
								@event keydown
								@desc Keydown input field event. This event only fires if enableKeyEvents is set to true.
								 */
								if (typeof self.options.listeners.keydown == 'function')
									self.options.listeners.keydown(self.targetEl[0].sw, e);
							})
							
							self.baseEl.click(function () {
								$('.sws-table-sws-comboTable-' + self.id).css({
									'width' : opt.width,
									'z-index' : 1000,
									'top' : parseInt(self.baseEl.position().top) + parseInt(self.baseEl.outerHeight()),
									'left' : self.baseEl.position().left,
									'position' : 'absolute'
								});
								var swContent = $(this).find('#sws-content');
								swContent.focus().contents().select();
								if (swContent.html() == self.cp) {
									swContent.html('&nbsp;');
								}
								var swComboTable = $('.sws-table-sws-comboTable-' + self.id);
								swComboTable.unbind('clickoutside');
								if (!swComboTable.is(":visible")) {
									swComboTable.show(0, function () {
										window.setTimeout(function () {
											swComboTable.bind('clickoutside', function (event) {
												if ($(event.target).parents('.sws-table-sws-comboTable-' + self.id).length == 0 && $(event.target).parents('div#paging.sws-toolbar').length == 0) {
													if (self.options.autoSelect) {
														if (swContent.text().replace(/^\s+|\s+$/g, '') != '') {
															$(swComboTable.find('tbody').find('td')[0]).click();
														}
													} else {
														if (swContent.text().replace(/^\s+|\s+$/g, '') != '') {
															if (self.targetEl.text() == '') {
																swContent.html(self.cp);
															} else {
																swContent.text(self.targetEl.text());
															}
														} else {
															if (self.targetEl.text() == '') {
																swContent.html(self.cp);
																if (!self.options.allowBlank) {
																	self.baseEl.addClass('sws-border-error').removeClass('sws-border-default');
																}
															} else {
																swContent.text(self.targetEl.text());
															}
														}
													}
													swComboTable.hide().unbind('clickoutside');
												}
												/**
												@event blur
												@desc Fires when this field loses input focus.
												 */
												if (typeof self.options.listeners.blur == 'function')
													self.options.listeners.blur(self.targetEl[0].sw);
											})
										}, 200);
										sw = $('#sws-comboTable-' + self.id)[0].sw;
										sw.page = 1;
										sw.searchData('');
									})
								} else
									swComboTable.hide();
							})
						}
						
						this.fn.disable = function () {
							$('#sws-comboTable-' + self.id).hide();
						}
						/**
						@method select(fieldName, value)
						@desc Select an item in the dropdown list. This function does NOT cause the select event to fire. The store must be loaded and the list expanded for this function to work.
						 */
						this.select = function (field, value) {
							var record = $('#sws-comboTable-' + self.id)[0].sw.searchRecord(field, value);
							if (record.length > 0) {
								var opt = '<option value="' + record[0][self.options.valueField] + '" selected="true">' + record[0][self.options.displayField] + '</option>';
								self.targetEl.empty().append(opt);
								$(self.baseEl).find('#sws-content').html(record[0][self.options.displayField]);
							}
							return self.targetEl[0].sw;
						}
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
		return el;
	}
	/***********************************/
	
	$.sw.textfield = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			opt.target = $('<input type="text"></input>').attr('id', id).appendTo(opt.renderTo);
			if(typeof opt.cls != 'undefined')
				opt.target.addClass(opt.cls)
		}
		var el = $(opt.target);
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof opt != 'undefined') {
						$.extend(this.options, this.getOptions(), {
							blankText : 'This field is required',
							listeners : {},
							allowBlank : true,
							width : 'auto',
							style : '',
							value : ''
						}, opt)
						var self = this;
						this.baseEl = this.targetEl = $(this.options.target);
						this.baseEl.addClass('sws-base sws-input-text').val(opt.value).css('width', this.options.width).css(this.options.style);
						this.fn.render = function () {
							if (self.options.allowBlank == false) {
								self.baseEl.bind('blur', function (e) {
									if ($(this).text() == '') {
										self.baseEl.addClass('sws-border-error');
									} else {
										self.baseEl.removeClass('sws-border-error');
									}
								})
							}
						}
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
	}
	
	/***********************************/
	
	$.sw.button = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			opt.target = $('<button></button>').attr('id', id).appendTo(opt.renderTo);
			if(typeof opt.cls != 'undefined')
				opt.target.addClass(opt.cls)
		}
		var el = $(opt.target);
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof opt != 'undefined') {
						$.extend(this.options, this.getOptions(), {
							text : '',
							listeners : {},
							style : '',
							img : ''
						}, opt)
						var self = this;
						this.baseEl = this.targetEl = $(this.options.target);
						this.baseEl.addClass('sws-button sws-base').html(opt.text)
						this.baseEl.css(this.options.style);
						if (this.options.img != '') {
							this.baseEl.css({
								'background' : 'url(' + this.options.img + ') center no-repeat',
								width : '22px',
								height : '20px'
							})
						}
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
	}
	
	/***********************************/
	
	$.sw.spacer = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			opt.target = $('<div class="sws-spacer"></div>').attr('id', id).appendTo(opt.renderTo);
			if(typeof opt.cls != 'undefined')
				opt.target.addClass(opt.cls)
		}
		var el = $(opt.target);
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof opt != 'undefined') {
						$.extend(this.options, this.getOptions(), {
							width : 'auto'
						}, opt)
						var self = this;
						this.baseEl = this.targetEl = $(this.options.target);
						if (this.options.width == 'auto') {
							this.baseEl.addClass('sws-auto')
						}
						this.fn.render = function () {
							var w = 0;
							self.baseEl.parent().children().not(this.baseEl).not('.sws-spacer.sws-auto').each(function (index) {
								w += parseInt($(this).outerWidth());
							})
							var els = self.baseEl.parent().children('.sws-spacer.sws-auto');
							w = (parseInt(self.baseEl.parent().width()) - w) / els.length;
							for (var i = 0; i < els.length; i++) {
								$(els[i]).width(w + 'px');
							}
						}
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
	}
	
	/***********************************/
	
	$.sw.separator = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			opt.target = $('<div class="sws-separator sws-base"></div>').attr('id', id).appendTo(opt.renderTo);
			if(typeof opt.cls != 'undefined')
				opt.target.addClass(opt.cls)
		}
		var el = $(opt.target);
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof opt != 'undefined') {
						$.extend(this.options, this.getOptions(), {}, opt)
						var self = this;
						this.baseEl = this.targetEl = $(this.options.target);
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
	}
	
	/***********************************/
	
	$.sw.text = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			opt.target = $('<div class="sws-base sws-container sws-text"></div>').attr('id', id).appendTo(opt.renderTo);
			if(typeof opt.cls != 'undefined')
				opt.target.addClass(opt.cls)
		}
		var el = $(opt.target);
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof opt != 'undefined') {
						$.extend(this.options, this.getOptions(), {
							width : 'auto',
							text : 'Text',
						}, opt)
						var self = this;
						this.baseEl = this.targetEl = $(this.options.target);
						this.baseEl.html(self.options.text);
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
	}
	
	/***********************************/
	
	$.sw.toolbar = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			if ($(opt.renderTo).children('#' + opt.id).length > 0) {
				$(opt.renderTo).children('#' + opt.id).remove();
			}
			opt.target = $('<div class="sws-toolbar sws-child-margin"><div class="sws-body"></div></div>').attr('id', id).appendTo(opt.renderTo);
			
		}
		var el = $(opt.target);
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof opt != 'undefined') {
						$.extend(this.options, this.getOptions(), {
							items : {},
							listeners : {}
						}, opt)
						var self = this;
						this.baseEl = this.targetEl = $(opt.target);
						this.body = this.baseEl.find('.sws-body');
						this.addItem = function (itemOpt, pos) {
							if (typeof pos == 'undefined')
								pos = 'append';
							if(pos == 'prepend'){
								els = this.body.children().detach();
							}
								
							if (typeof itemOpt == 'object') {
								if (itemOpt.type == 'button') {
									itemOpt.renderTo = this.body;
									$.sw.button(itemOpt);
								}
								if (itemOpt.type == 'spacer') {
									itemOpt.renderTo = this.body;
									$.sw.spacer(itemOpt);
								}
								if (itemOpt.type == 'combobox') {
									itemOpt.renderTo = this.body;
									$.sw.combobox(itemOpt);
								}
								if (itemOpt.type == 'textfield') {
									itemOpt.renderTo = this.body;
									$.sw.textfield(itemOpt);
								}
								if (itemOpt.type == 'text') {
									itemOpt.renderTo = this.body;
									$.sw.text(itemOpt);
								}
								if (itemOpt.type == 'separator') {
									itemOpt.renderTo = this.body;
									$.sw.separator(itemOpt);
								}
							}
							if(pos == 'prepend'){
								this.body.append(els);
							}
							w = 0;
							this.body.children().not('.sws-spacer.sws-auto').not(':hidden').each(function (index) {
								w += parseInt($(this).outerWidth()) + parseInt($(this).css('margin-left')) + parseInt($(this).css('margin-right'));
							});
							els = this.body.children('.sws-spacer.sws-auto');
							w = (parseInt(this.body.innerWidth()) - w) / els.length;
							for (i = 0; i < els.length; i++) {
								$(els[i]).width(w + 'px');
							}
						}
						
						this.append = function(opt){
							for (var i = 0; i < opt.length; i++) {
								self.addItem(opt[i], 'append');
							}
						}
						
						this.prepend = function(opt){
							for (var i = 0; i < opt.length; i++) {
								self.addItem(opt[i], 'prepend');
							}
						}
						
						this.fn.render = function () {
							self.baseEl.css({'width': '100%','overflow':'hidden'});
							for (var i = 0; i < self.options.items.length; i++) {
								self.addItem(self.options.items[i]);
							}
							self.baseEl.resize(function(){
								w = 0;
								self.body.children().not('.sws-spacer.sws-auto').not(':hidden').each(function (index) {
									var el = $(this);
									w += parseInt(el.outerWidth()) + parseInt(el.css('margin-left')) + parseInt(el.css('margin-right'));
								});
								els = self.body.children('.sws-spacer.sws-auto');
								w = (parseInt(self.body.innerWidth()) - w) / els.length;
								for (i = 0; i < els.length; i++) {
									$(els[i]).width(w + 'px');
								}
								if(typeof self.options.listeners.resize == 'function')
									self.options.listeners.resize();
							});
						}
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
	}
	
	/***********************************/
	
	$.sw.multiselect = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			opt.target = $('<select multiple></select>').attr('id', id).appendTo(opt.renderTo);
			if(typeof opt.cls != 'undefined')
				opt.target.addClass(opt.cls)
		}
		var el = $(opt.target);
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof(opt) != 'undefined') {
						if (typeof $(opt.target).sw != 'undefined') {
							//delete $(opt.target).sw
						}
						$.extend(this.options, this.getOptions(), {
							data : '',
							width : '180px',
							listeners : {},
							blankText : 'This field is required',
							allowBlank : true,
							baseCls : 'sws-multi',
							editable : true,
							valueField : '',
							displayField : '',
							height : '150px'
						}, opt)
						var self = this;
						//self.name = 'textField';
						self.targetEl = $(self.options.target);
						self.id = self.generateId(self.targetEl);
						self.targetEl.hide();
						//self.baseEl = '<table class="'+self.options.baseCls+'"></table>';
						this.fn.render = function () {
							var opt = self.options;
							target = $('<table></table>').insertAfter(self.targetEl);
							$.sw.table({
								data : opt.data,
								header : false,
								target : target,
								width : opt.width,
								height : opt.height,
								columns : [{
										name : opt.displayField,
										title : 'display',
										renderer : function (data, el, record) {
											var record = record;
											return el.click(function () {
												records = $(this).parents('table')[0].sw.records;
												if (records(record.___id).first().___selected != true) {
													records(record.___id).update({
														___selected : true
													})
													$(this).parent('tr').find('td').addClass('sws-selected');
												} else {
													records(record.___id).update({
														___selected : false
													})
													$(this).parent('tr').find('td').removeClass('sws-selected');
												}
												self.records = records;
											})
										}
									}
								],
								listeners : {
									render : function (sw) {
										self.records = sw.records;
									}
								}
							});
							//this.records = tmp[0].sw.records;
						}
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
	}
	
	/***********************************/
	
	$.sw.table = function (opt) {
		if (typeof opt.renderTo != 'undefined') {
			id = typeof opt.id == 'undefined' ? $.sw.randomString(8, '#aA') : opt.id;
			opt.target = $('<table></table>').attr('id', id).appendTo(opt.renderTo)
		}
		
		var el = $(opt.target);
		for (i = 0; i < el.length; i++) {
			opt.target = el[i];
			el[i].sw = new $.sw.widget();
			el[i].sw.create({
				init : function (opt) {
					if (typeof(opt) != 'undefined') {
						if (typeof $(opt.target)[0].sw != 'undefined') {
							if (typeof $(opt.target)[0].sw.stop != 'undefined')
								$(opt.target)[0].sw.stop();
							$(opt.target).insertBefore($('.sws-table-' + $(opt.target).attr('id')));
							$('.sws-table-' + $(opt.target).attr('id')).remove();
						}
						
						$.extend(this.options, {
							data : '',
							defaults : {},
							columns : [],
							dropDown : false,
							autoUpdate : false,
							updateTime : 5000,
							type : [],
							dropHandler : ' + ',
							displayData: true,
							pageSize : false,
							exclude : [],
							success : false,
							search : false,
							bottomToolbar : [],
							serverPaging : false,
							width : '100%',
							height : 'auto',
							header : true,
							baseCls : 'sws-table',
							title : false,
							filter : false,
							selection : false,
							scrollbar : false,
							actionItems : ''
						})
						//apply options to default options
						$.extend(this.options, opt);
						this.searchWord = '';
						this.cancel = false;
						this.page = 1;
						this.dropDown = [];
						this.sortedOrder = 'desc';
						this.sortedBy = '';
						this.records = TAFFY();
						this.records.settings({
							template : {
								___selected : false,
								___tds : false,
								___view : true
							}
						});
						this.tm = '';
						this.chart = false;
						this.recordStart = 0;
						this.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
						this.selfPage = 0;
						this.dirtyRecord = {};
						this.query = '';
						
						var self = this;
						self.targetEl = $(self.options.target);
						$('#simpletablecss').remove();
						$('#content').append('<link id="simpletablecss" href="../asset/css/simpleTable.css" media="screen" rel="stylesheet" type="text/css" />');
						$('#output').append('<link id="simpletablecss" href="../asset/css/simpleTable.css" media="screen" rel="stylesheet" type="text/css" />');
						self.id = self.generateId(self.targetEl);
						self.targetEl.empty();
						self.cp = self.options.allowBlank == true ? '&nbsp;' : self.options.blankText;
						self.colsWidth = {};
						this.addToolbar = function (opt) {
							$.sw.toolbar(opt);
						}
						
						this.stop = function () {
							self.options.autoUpdate = false;
							self.cancel = true;
							clearTimeout(self.tm);
							return self.targetEl[0].sw;
						}
						
						this.start = function () {
							self.options.autoUpdate = true;
							self.drawTable(false, self.page);
							return self.targetEl[0].sw;
						}
						
						this.searchRecord = function (field, value) {
							var data = [];
							tmp = {};
							tmp[field] = value;
							return self.records(tmp).get();
						}
						
						this.searchData = function (word) {
							self.searchWord = word;
							self.drawTable(false, self.page);
							return self.targetEl[0].sw;
						}
						
						this.addBbar = function(items){
							if(self.footer.find('#sws-table-bbar').length>0){
								bbar = self.footer.find('#sws-table-bbar')[0].sw;
								if(self.footer.find('#sws-table-bbar').children('.sws-body').children('.sws-display-data').length>0){
									swDisplayData = self.footer.find('#sws-table-bbar').children('.sws-body').children().not('.sws-display-data').detach();
									bbar.append(items);
									self.footer.find('#sws-table-bbar').children('.sws-body').append(swDisplayData);
								}
								else{
									bbar.append(items);
								}
							}
							else{
								tb = {
									renderTo : self.footer,
									id : 'sws-table-bbar',
									listeners: {
										resize : function(){
											if (opt.height != 'auto') {
												self.body.css('height', parseInt(self.baseEl.outerHeight()) - (parseInt(self.header.outerHeight() + parseInt(self.footer.outerHeight()))) + 'px');
											}
										}
									},
									items: items
								}
								self.addToolbar(tb);
							}
						}
						
						this.addTbar = function(items){
							if(self.header.find('#sws-table-bbar').length>0){
								bbar = self.header.find('#sws-table-bbar')[0].sw;
								if(self.header.find('#sws-table-bbar').children('.sws-body').children('.sws-search').length>0){
									swDisplayData = self.header.find('#sws-table-bbar').children('.sws-body').children('.sws-search').detach();
									bbar.append(items);
									self.header.find('#sws-table-bbar').children('.sws-body').append(swDisplayData);
								}
								else{
									bbar.append(items);
								}
							}
							else{
								tb = {
									renderTo : self.header,
									id : 'sws-table-bbar',
									listeners: {
										resize : function(){
											if (opt.height != 'auto') {
												self.body.css('height', parseInt(self.baseEl.outerHeight()) - (parseInt(self.header.outerHeight() + parseInt(self.footer.outerHeight()))) + 'px');
											}
										}
									},
									items: items
								}
								self.addToolbar(tb);
							}
						}
						
						this.loadData = function (page, renderWidth) {
							var opt = self.options;
							if (typeof(page) != 'undefined')
								self.page = page;
							if (typeof(renderWidth) == 'undefined')
								renderWidth = false;
							if (opt.autoUpdate) {
								clearTimeout(self.tm);
							}
							data = '';
							if (opt.serverPaging) {
								data = '?page=' + self.page + '&paging=' + opt.pageSize + '&search=' + self.searchWord;
							}
							//var selected = self.records({___selected: true}).update({___view: false}).get();
							if (typeof opt.data == 'string') {
								$.getJSON(opt.data + data, function (records) {
									if (!self.cancel) {
										if (opt.serverPaging) {
											self.records().remove();
											self.records.insert(records.data);
											self.total = self.records().count();
										} else {
											self.records().remove();
											self.records.insert(records);
											self.total = self.records().count();
										}
										if (self.sortedBy != '') {
											self.records.sort(self.sortedBy + ' ' + self.sortedOrder);
										}
										if (opt.serverPaging)
											page = 1;
										else
											page = self.page;
										self.drawTable(opt.autoUpdate, page, renderWidth);
										if (typeof opt.success == 'function')
											opt.success(records);
										self.cancel = false;
									}
								})
							} else {
								self.records().remove();
								self.records.insert(opt.data);
								self.totPage = self.records().count();
								if (self.sortedBy != '') {
									self.records.sort(self.sortedBy + ' ' + self.sortedOrder);
								}
								if (opt.serverPaging)
									page = 1;
								else
									page = self.page;
								self.drawTable(opt.autoUpdate, page, renderWidth);
							}
							return self.targetEl[0].sw;
						}
						
						this.showDrop = function (key) {
							if ($('tr#' + key).length > 0) {
								$('tr#' + key).remove();
							} else {
								$('tr.' + key).after(self.dropDown[key]).after('<tr id="'+key+'"></tr>');
							}
							return self.targetEl[0].sw;
						}
						
						this.sortTable = function (column, ch) {
							if (self.sortedBy == column) {
								if (self.sortedOrder == 'asec')
									self.sortedOrder = 'desc';
								else
									self.sortedOrder = 'asec';
								self.sortedBy = column;
								self.records.sort(self.sortedBy + ' ' + self.sortedOrder);
							} else {
								self.sortedOrder = 'asec';
								self.sortedBy = column;
								self.records.sort(self.sortedBy + ' ' + self.sortedOrder);
							}
							self.drawTable(self.options.autoUpdate, self.page);
							
							self.header.find('.sws-table-header').find('span').removeClass();
							if (self.sortedOrder == 'asec') {
								cls = 'sws-arrowUp';
								t = '-10px';
							} else {
								cls = 'sws-arrowDown';
								t = '10px';
							}
							self.header.find('#' + column).addClass(cls).css('top', t);
							return self.targetEl[0].sw;
						}
						
						this.clear = function () {
							self.targetEl.find('tbody').empty();
						}
						
						this.drawTable = function (update, page, renderWidth) {
							var opt = self.options;
							page = self.page = typeof page != 'undefined' ? page : true;
							update = typeof update != 'undefined' ? update : 1;
							renderWidth = typeof renderWidth !== 'undefined' ? renderWidth : false;
							self.targetEl.css('height', '');
							if (opt.serverPaging)
								self.page = self.page;
							var nextdot = false,
							prevdot = false,
							dataDrawCount = 0,
							dropHandler = opt.dropHandler,
							search = opt.search,
							optColumns = opt.columns,
							optColumnsLength = opt.columns.length,
							arrDropDown = self.dropDown,
							dropDown = opt.dropDown,
							searchWord = self.searchWord,
							process,
							found,
							exclude = opt.exclude,
							pageSize = opt.pageSize,
							id = self.id,
							smtablecss = $('#smtablecss'),
							body = self.targetEl.find('tbody'),
							foot = self.footer,
							records = self.records,
							el = '',
							columns = opt.columns,
							count = 0,
							elcol = [],
							sum = [],
							elsum = '',
							sumcount = 0,
							el,
							el2,
							style,
							pageEl,
							process = false,
							firstclick = 'style="opacity:0.5"',
							prevclick = 'style="opacity:0.5"',
							nextclick = 'style="opacity:0.5"',
							lastclick = 'style="opacity:0.5"',
							col = 0,
							row = 0;
							//query
							self.query = '';
							
							if ($('#' + self.baseEl.attr('id')).length == 1) {
								if (typeof self.options.filter == 'object') {
									if (typeof self.query != 'object')
										self.query = [];
									self.query = self.query.concat(self.options.filter);
								}
								if (searchWord.length > 0) {
									if (typeof self.query != 'object')
										self.query = [];
									$.each(opt.columns, function(i, value){
										tmp = {};
										tmp[columns[i].name] = {
											likenocase : searchWord
										};
										self.query.push(tmp);
									})
								}
								if (pageSize == false) {
									tmpRecord = records(self.query).filter({___view: true});
								} else {
									tmpRecord = records(self.query).filter({___view: true}).start(pageSize * page - pageSize + 1).limit(pageSize);
								}
								self.total = records(self.query).filter({___view: true}).count();
								el = [];
								if (typeof dropDown == 'function') {
									colspan = columns.length + 1;
									if (opt.selection != false)
										colspan = columns.length + 2;
								}
								tmpRecord.each(function (r) {
									tr = $('<tr class="' + id + 'Drop' + row + ' sws-row"></tr>');
									if (typeof dropDown == 'function') {
										tr.append('<td class="sws-container" style="width:32px;" onclick="$(\'#' + id + '\')[0].sw.showDrop(\'' + id + 'Drop' + row + '\')">' + dropHandler + '</td>');
										arrDropDown[id + 'Drop' + row] = dropDown(r, '<tr id="' + id + 'Drop' + row + '">' + $('<td>Drop Down</td>').attr('colspan', colspan).addClass('sws-content').toHtmlString() + '</tr>');
									}
									if (r.___tds == false) {
										tmp2 = [];
										//for (i in columns) {
										$.each(opt.columns, function(i, value){
											column = columns[i];
											if (r[column.name] == null)
												value = '';
											else
												value = r[column.name];
											tmp = $('<td>' + value + '</td>').addClass(column.name + ' sws-td-' + column.name);
											if (typeof(column.renderer) == 'function') {
												tmp = column.renderer(value, tmp, r);
											}
											if (typeof(column.style) == 'string') {
												tmp.attr('style', column.style);
											}
											tr.append(tmp);
											tmp2.push(tmp[0]);
										})
										records(r).update({
											___tds : tmp2
										});
									} else {
										if($(r.___tds).hasClass('sws-selected') && r.___selected == false)
											$(r.___tds).removeClass('sws-selected');
										tr.append(r.___tds);
									}
									if (opt.selection != false) {
										if (opt.selection == 'single') {
											if (typeof r.___selected == 'undefined')
												checked = '';
											else {
												if (r.___selected)
													checked = 'checked';
												else
													checked = ''
											}
											tr.append('<td class="sws-selection sws-td-sws-selection" style="width:43px;"><input type="radio" id="' + self.baseEl.attr('id') + 'select" name="' + self.baseEl.attr('id') + 'select" value="' + r.___id + '" ' + checked + '></td>')
										}
										if (opt.selection == 'multiple') {
											if (typeof r.___selected == 'undefined')
												checked = '';
											else {
												if (r.___selected)
													checked = 'checked';
												else
													checked = ''
											}
											tr.append('<td class="sws-selection sws-td-sws-selection" style="width:43px;"><input type="checkbox" class="' + self.baseEl.attr('id') + 'check" value="' + r.___id + '" ' + checked + '></td>')
										}
										if (opt.selection == 'all') {
											if (typeof r.___selected == 'undefined')
												checked = '';
											else {
												if (r.___selected)
													checked = 'checked';
												else
													checked = ''
											}
											tr.append('<td class="sws-selection sws-td-sws-selection" style="width:43px;"><input type="radio" id="' + self.baseEl.attr('id') + 'select" name="' + self.baseEl.attr('id') + 'select" value="' + r.___id + '" ' + checked + '><input type="checkbox" class="' + self.baseEl.attr('id') + 'check" value="' + r.___id + '" ' + checked + '></td>')
										}
										
									}
									el[row] = tr[0];
									row++;
								})
								
								self.body.find('div.sws-info').remove();
								body.empty().append(el);
								if (opt.selection == 'single' || opt.selection == 'all') {
									self.targetEl.find('input#' + self.baseEl.attr('id') + 'select').filter(':checked').parent('td').parent('tr').find('td').addClass('sws-selected');
									self.targetEl.find('input#' + self.baseEl.attr('id') + 'select').click(function () {
										tmp = {};
										tmp['___id'] = $(this).val();
										//if (opt.selection == 'single') {
										self.targetEl.find('input.' + self.baseEl.attr('id') + 'check').attr('checked', false)
										$(this).parents('tbody').find('td').removeClass('sws-selected');
										$(this).parent('td').parent('tr').find('td').addClass('sws-selected');
										records({
											___selected : true
										}).update({
											___selected : false
										});
										
										records(tmp).update({
											___selected : true
										});
										//}
									})
								}
								if (opt.selection == 'multiple' || opt.selection == 'all') {
									self.targetEl.find('input.' + self.baseEl.attr('id') + 'check').filter(':checked').parent('td').parent('tr').addClass('sws-selected');
									self.targetEl.find('input.' + self.baseEl.attr('id') + 'check').click(function () {
										tmp = {};
										tmp['___id'] = $(this).val();
										if(self.targetEl.find('input#' + self.baseEl.attr('id') + 'select').filter(':checked').length>0){
											tmp2 = {};
											tmp2['___id'] = self.targetEl.find('input#' + self.baseEl.attr('id') + 'select').filter(':checked').val();
											self.targetEl.find('input#' + self.baseEl.attr('id') + 'select').filter(':checked').parent('td').parent('tr').find('td').removeClass('sws-selected');
											records(tmp).update({
												___selected : false
											});
										}
										self.targetEl.find('input#' + self.baseEl.attr('id') + 'select').attr('checked', false)
										if($(this).is(':checked')){
											records(tmp).update({
												___selected : true
											});
											$(this).parent('td').parent('tr').find('td').addClass('sws-selected');
										}
										else{
											records(tmp).update({
												___selected : false
											});
											$(this).parent('td').parent('tr').find('td').removeClass('sws-selected');
										}
									})
								}
								if(typeof opt.actionItems == 'object'){
									
								}
								if (opt.serverPaging) {
									totpage = self.totPage;
									page = self.page;
								}
								sumEl = '';
								createSum = false;
								for (i in columns) {
									if (typeof columns[i].sum != 'undefined')
										createSum = true;
								}
								if (createSum)
									for (i in columns) {
										column = columns[i];
										width = self.header.find('div.sws-table-header').find('.sws-head-' + column.name).width();
										if (typeof column.sum != 'undefined') {
											if (column.sum == true) {
												sum = records(self.query).sum(column.name);
												if (typeof column.sumRenderer == 'function')
													sumEl += '<div class="sws-container sws-head-' + column.name + '" style="width:' + width + '">' + column.sumRenderer(sum, $('<div class="sws-content">' + sum + '</div>')).toHtmlString() + '</div>';
												else
													sumEl += '<div class="sws-container sws-head-' + column.name + '" style="width:' + width + '"><div class="sws-content">' + sum + '</div></div>';
											} else
												sumEl += '<div class="sws-container sws-head-' + column.name + '" style="width:' + width + '"><div class="sws-content">' + column.sum + '</div></div>';
										} else {
											sumEl += '<div class="sws-container sws-head-' + column.name + '" style="width:' + width + '"><div class="sws-content">&nbsp;</div></div>';
										}
									}
								if (sumEl != '') {
									if (typeof dropDown == 'function')
										sumEl = '<div class="sws-container" style="width:32px;"></div>' + sumEl;
									//console.log(self.footer.find('.sws-summary')
									self.footer.find('.sws-summary').remove()
									sumEl = $('<div>' + sumEl + '</div>').addClass('sws-toolbar sws-padding sws-no-select sws-summary sws-header-gradient sws-no-hor-padding').prependTo(self.footer);
									for (i in columns) {
										column = columns[i];
										self.footer.children('sws-summary').children('sws-head-' + column.name).css('width', self.baseEl.find('div.sws-head-' + opt.columns[i].name).css('width'));
									}
								}
								if (pageSize != false) {
									foot.find('#paging').remove();
									copy = self.total;
									totpage = ~~(self.total / pageSize);
								}
								if (update)
									if (opt.autoUpdate) {
										if ($('#' + self.baseEl.attr('id')).length == 1) {
											self.tm = setTimeout(function () {
													self.loadData();
												}, opt.updateTime)
										}
									}
								end = (pageSize * page - pageSize + pageSize);
								if(end>self.total)
									end = self.total;
								if (renderWidth) {
									//for (i in opt.columns) {
									$.each(opt.columns, function(i, value){
										self.baseEl.find('div.sws-head-' + opt.columns[i].name).css('width', self.baseEl.find('td.sws-td-' + opt.columns[i].name).width())
									})
									if (pageSize != false) {
										toolbar = {
											renderTo : self.footer,
											id : 'sws-table-bbar',
											listeners: {
												resize : function(){
													if (opt.height != 'auto') {
														self.body.css('height', parseInt(self.baseEl.outerHeight()) - (parseInt(self.header.outerHeight() + parseInt(self.footer.outerHeight()))) + 'px');
													}
												},
												render: function(){
												}
											},
											items : [{
													type : 'text',
													id : 'sws-display-data',
													cls: 'sws-display-data',
													text : 'Displaying data ' + (pageSize * page - pageSize + 1) + ' - ' + end + ' of ' + self.total
												},{
													type : 'spacer',
													cls: 'sws-display-data'
												}]
										}
										self.addToolbar(toolbar);
										if(typeof opt.bbar == 'object'){
											self.addBbar(opt.bbar)
										}
										if(self.options.displayData == true){
											self.footer.find('#sws-table-bbar')[0].sw.append([{
													type : 'button',
													img : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAnNCSVQICFXsRgQAAAAJcEhZcwAAAbsAAAG7ATrs4+IAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAABeElEQVQYGQXBsWoTARgA4P8mfQVHBzOJi6/gKLSNSUoJwRatlrZQLim1aS1pKHXTB3ARBB3cFC5IUQfdHCSgHaR06RIrSjiFG+KFz+8LIYQ4rBz0+1lv1Bv1s4P+YUUIIUKIXrKXdou2TT09m9q6xV7aS4QIsZN0BxseODL03YlvjmzZ0B3sJCJEJ13zxFc/jP3xV+6nU4+t6aQi0sp60XHst8I/H02VJnJnNq0XaSVW+0s++KUw9ck2GCjlhpas7sdyds8XudJnW+7gSA0T51YsZ7E46hgae2dX003vtVxDaWzX4ihao7ZjudduueKiN264gKncQ61RNLNFQ2OlV666hBcuozR2VzOLZr/mrXMTPHMdPMfEiZrmfixU6sV9p3IlXgJKuY56sVAJ0UhnPXImN1GaKk3knprVSEWI+aQxmLFi6NxYbuxE24zGYD4RIUQjqaXVYkbLlm23zagWtbSRCBFCCFGv1PrVbG40N6pmtX69IoQQ/wEVim5FdJNDnAAAAABJRU5ErkJggg==',
													id : 'sws-first',
													style : {
														'opacity' : 0.5
													},
													listeners : {
														click : function (el, e) {
															self.drawTable(0,1);
															self.footer.find('#sws-page').val(1);
															//self.page = 1;
															self.footer.find('#sws-last').fadeTo(0.5, 1);
															self.footer.find('#sws-next').fadeTo(0.5, 1);
															self.footer.find('#sws-first').fadeTo(1, 0.5);
															self.footer.find('#sws-prev').fadeTo(1, 0.5);
														}
													}
												}, {
													type : 'button',
													img : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAG7AAABuwE67OPiAAAAB3RJTUUH3AwECzMpWTYeHwAAAYdJREFUKM8t0b9L1GEAgPHP+96d5ymmQWS2BAXXGof9B0JcEjRVZP9AS9gU5OJiWyTR4GJLWBpBkzhE0BqZRG1GixBKaPTD8+t53fs26DM+28MTskMe1NNEGk0N4lpcjQv31w99yJgOafLfTLsW9aMlqRblqTg7nQnZVMjLe82qMadVJYUf3trXtxLGZ3KZ9uR+86yrBlRFWdcpI9741uyd9CjcrXc+9dbuGFQTBS3vjClseapdVC7E9s1W7ZZB/SpKPnviq6qaYeNatfZEuXOxakRNyV/z3jtmWNSjY0hFZ7TcaZzUI/rosQ20j7KTaMBOo9wVREHW8t2GIWcQRBVZV0xrW5Js1LwrjutTQZZ0/JTWog+/bEsY9NAz5w0iObBll9WYnodiTqELxiy5rKuw67VQpIXSl51Xe9uXDtRFUNGw57cX1pXvLS6H7EbIy+3mObedECUHNs3ZVF0J44s5ZFwPaTLNdGtDRiSb/igVcSrOLuWjm3CtnifSaG4Q1uJqWHh5tPs/J7WbqhEEktkAAAAASUVORK5CYII=',
													id : 'sws-prev',
													style : {
														'opacity' : 0.5
													},
													listeners : {
														click : function (el, e) {
															if ((self.page - 1) >= 1) {
																self.footer.find('#sws-page').val(self.page - 1);
																//self.loadData(self.page - 1);
																self.drawTable(0,self.page - 1);
																self.footer.find('#sws-last').fadeTo(0.5, 1);
																self.footer.find('#sws-next').fadeTo(0.5, 1);
																if (parseInt(parseInt(self.footer.find('#sws-page').val())) == 1) {
																	self.footer.find('#sws-first').fadeTo(1, 0.5);
																	self.footer.find('#sws-prev').fadeTo(1, 0.5);
																}
															}
														}
													}
												}, {
													type : 'separator'
												}, {
													type : 'text',
													text : 'Page'
												}, {
													type : 'textfield',
													width : '30px',
													value : '1',
													style : {
														'text-align' : 'right'
													},
													id : 'sws-page',
													listeners : {
														focus : function (el) {
															if ($.isNumeric($(el.baseEl).val())) {
																el.val = parseInt($(el.baseEl).val());
															} else {
																$(el.baseEl).val(el.val);
															}
														},
														keypress : function (el, e) {
															if (e.which == 13) {
																if ($.isNumeric($(el.baseEl).val())) {
																	el.val = $(el.baseEl).val();
																	if (parseInt($(el.baseEl).val()) == 1) {
																		self.footer.find('#sws-last').fadeTo(0.5, 1);
																		self.footer.find('#sws-next').fadeTo(0.5, 1);
																		self.footer.find('#sws-first').fadeTo(1, 0.5);
																		self.footer.find('#sws-prev').fadeTo(1, 0.5);
																	} else if (parseInt($(el.baseEl).val()) == (totpage + 1)) {
																		self.footer.find('#sws-last').fadeTo(1, 0.5)
																		self.footer.find('#sws-next').fadeTo(1, 0.5)
																		self.footer.find('#sws-first').fadeTo(0.5, 1);
																		self.footer.find('#sws-prev').fadeTo(0.5, 1);
																	}
																} else {
																	$(el.baseEl).val(el.val)
																}
															}
														}
													}
												}, {
													type : 'text',
													id : 'sws-page-of',
													text : 'of ' + (totpage + 1)
												}, {
													type : 'separator'
												}, {
													type : 'button',
													img : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAnNCSVQICFXsRgQAAAAJcEhZcwAAAbsAAAG7ATrs4+IAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAABdElEQVQYGQXBQUtTARwA8P879RHq2qF9hC5dPEYXdW2zGJZCmqggbxNrlsyH6M26dOpjBG+EQV+gqEF5CPHiZRnFegbvMN749fuFEEIc1g6yLO+P+qMsP8gOa0IIEUL0k720V3Zs6+vb1tEr99J+IkSI3aQ32PLMiaEfznx3YseW3mA3ESG66YZXvvlp7Mo/hV/OHdvQTUWktc2y69QfpXeuTFUmChe2bZZpLdazZR/9Vpo6duQrqBSGlq3vx0q+6otChT2rHnjtChOX1qzksTTqGhqrsGrejBmPfFYZe2FpFIujjlOFKW677ppb7vtkqvDS4ija+ZKhsQp33HRDx19Uxp5o59HOGt67NME9d30ATJxpaO/Hw1qzfOpcofJGAagUuprlw1qIVjrnyIXCRGWqMlF4a04rFSEWktZg1pqhS2OFsTMds1qDhUSEEK2kkdbLWYt2PPfYrHrZSFuJECGEEM1aI6vn86P5UT1vZM2aEEL8B3stbp8vLTeMAAAAAElFTkSuQmCC',
													id : 'sws-next',
													listeners : {
														click : function (el, e) {
															if ((totpage + 1) >= (self.page + 1)) {
																self.footer.find('#sws-page').val(self.page + 1)
																//self.loadData(self.page + 1)
																self.drawTable(0,self.page + 1);
																if (parseInt(self.footer.find('#sws-page').val()) > 1) {
																	self.footer.find('#sws-first').fadeTo(0.5, 1);
																	self.footer.find('#sws-prev').fadeTo(0.5, 1);
																}
																if (parseInt(self.footer.find('#sws-page').val()) == (totpage + 1)) {
																	self.footer.find('#sws-last').fadeTo(1, 0.5)
																	self.footer.find('#sws-next').fadeTo(1, 0.5)
																}
															}
														}
													}
												}, {
													type : 'button',
													img : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAnNCSVQICFXsRgQAAAAJcEhZcwAAAbsAAAG7ATrs4+IAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAABeUlEQVQYGQXBQUtTARwA8P9O9RX6AO3exUuH7h2ajm1iQ1LIkinI28SaJnOI3QovHerWJQihQ/CGCPYBOsSgPIR48bKMYryCd1hv/Pr9QgghDsr7/X7aG/VG/XS/f1AWQogQolfaTbp526aenk1t3Xw36ZWECLFd6g42PHFi6Ltz35zYsqE72C6JEJ1kzUtf/TD2x1+Zny68sKaTiEjK63nHmd9y/0ydKkxkLm1az5NytPrLPvkl9xns+IhCZmhZay9W0ke+yBQOnaLlnneYuLJqJY2lUcfQWKGl7th9t8w4UhjbsTSKxVHbmczUjGvemnHdTe9NZZ5ZHEUzXTI0VrjjELfd8AqFsYeaaTT7NceuTByBu16DiXM1zb1YKNfzxy5kCvABFDId9XyhHKKRzHruUmaiMFWYyLwxq5GIEPOlxqBi1dCVsczYubaKxmC+JEKIRqmWVPOKRVueeqCimteSRkmIEEKIernWr6Zzo7lRNa3162UhhPgPpn5t28IKrBcAAAAASUVORK5CYII=',
													id : 'sws-last',
													listeners : {
														click : function (el, e) {
															//self.loadData(totpage + 1)
															self.drawTable(0,totpage + 1);
															self.footer.find('#sws-page').val(totpage + 1)
															self.footer.find('#sws-last').fadeTo(1, 0.5)
															self.footer.find('#sws-next').fadeTo(1, 0.5)
															self.footer.find('#sws-first').fadeTo(0.5, 1);
															self.footer.find('#sws-prev').fadeTo(0.5, 1);
															//self.page = totpage;
														}
													}
												}]);
										}
									}
									if (opt.width == '100%') {
										w = 0;
										self.header.find('.sws-table-header .sws-container').each(function (index) {
											w += parseInt($(this).outerWidth());
										});
										
										self.baseEl.css('width', w + 'px')
									}
								}
								self.footer.find('#sws-page-of').text('of ' + (~~(self.total / pageSize) + 1));
								self.footer.find('#sws-display-data').text('Displaying data ' + (pageSize * page - pageSize + 1) + ' - ' + end + ' of ' + self.total);
								for (i in opt.columns) {
									self.body.find('td.sws-td-' + opt.columns[i].name).css('width', parseInt(self.baseEl.find('div.sws-head-' + opt.columns[i].name).css('width')) - 2 + 'px')
								}
								if (opt.height != 'auto') {
									self.body.css('height', parseInt(self.baseEl.outerHeight()) - (parseInt(self.header.outerHeight() + parseInt(self.footer.outerHeight()))) + 'px');
								}
								if ($(body.parent('table').parent('div')).hasScrollBar()) {
									if (opt.scrollbar == false) {
										opt.scrollbar = true;
										lastHead = $(self.header.find('.sws-table-header').find('.sws-container')[self.header.find('.sws-table-header').find('.sws-container').length - 1]);
										lastHead.css('width', parseInt(lastHead.css('width')) - 20 + 'px');
									}
									lastTd = $(self.body.find('tr')[0]).find('td')[$(self.body.find('tr')[0]).find('td').length - 1];
									$(lastTd).css('width', parseInt($(lastTd).css('width')) - 20 + 'px');
								}
								if (opt.height != 'auto') {
									self.body.css('height', parseInt(self.baseEl.outerHeight()) - (parseInt(self.header.outerHeight() + parseInt(self.footer.outerHeight()))) + 'px');
								}
							}
							return self.targetEl[0].sw;
						}
						
						this.guessType = function (column) {
							records = self.records;
							for (i in self.records) {
								record = self.records[i][column];
								if (record != null)
									if (record.toString() != '') {
										if (record.toString().match(/^-?[£$¤]?[\d,.]+%?$/)) {
											return 'number';
										} else {
											return 'string';
										}
									}
							}
						}
						
						this.fn.render = function () {
							var opt = self.options,
							header = '<div class="sws-toolbar sws-table-header sws-header-gradient sws-no-hor-padding">';
							self.baseEl = $('<div></div>').addClass('swTable sws-base').css({
									'width' : opt.width,
									'height' : opt.height
								}).addClass('sws-table-' + self.id).attr('id', $.sw.randomString(8, '#aA')).insertAfter(self.targetEl);
							parent = self.baseEl.parent();
							if (opt.width == '100%')
								self.baseEl.css('width', $(parent.find('.swTable')[0]).outerWidth());
							
							self.targetEl.addClass(self.options.baseCls);
							$('<div class="sws-header"></div><div class="sws-content sws-content-skin"><div style="text-align:center;" class="sws-info">Loading Data</div></div><div class="sws-footer"></div>').appendTo(self.baseEl);
							self.header = self.baseEl.children('.sws-header');
							self.body = self.baseEl.children('.sws-content');
							self.footer = self.baseEl.children('.sws-footer');
							self.targetEl.appendTo(self.body).append('<tbody></tbody>').find('tbody').append('<tr class="sws-row"></tr>');
							tbody = self.targetEl.find('tbody').find('tr');
							if (opt.search) {
								toolbar = {
									renderTo : self.header,
									id : 'sws-table-bbar',
									listeners: {
										resize : function(){
											if (opt.height != 'auto') {
												self.body.css('height', parseInt(self.baseEl.outerHeight()) - (parseInt(self.header.outerHeight() + parseInt(self.footer.outerHeight()))) + 'px');
											}
										}
									},
									items : [{
										type: 'spacer',
										cls: 'sws-search'
									},{
										type: 'textfield',
										id: self.targetEl.attr('id')+'Search',
										cls: 'sws-search',
									},{
										type: 'button',
										text: 'Search',
										cls: 'sws-search',
										listeners:{
											click: function(){
												self.searchData($('#' + self.targetEl.attr('id') + 'Search').val());
												self.drawTable(0,1);
												self.footer.find('#sws-page').val(1);
												//self.page = 1;
												self.footer.find('#sws-last').fadeTo(0.5, 1);
												self.footer.find('#sws-next').fadeTo(0.5, 1);
												self.footer.find('#sws-first').fadeTo(1, 0.5);
												self.footer.find('#sws-prev').fadeTo(1, 0.5);
											}
										}
									}]
								}
								self.addToolbar(toolbar);
								if(typeof opt.tbar == 'object')
									self.addTbar(opt.tbar)
								//id = self.targetEl.attr('id');
								//self.header.prepend('<div class="sws-toolbar"><div style="text-align: right"><input id="' + id + 'Search"></input>&nbsp;<button class="sws-button" onclick="$(\'#' + id + '\')[0].sw.searchData($(\'#' + id + 'Search\').val())">Search</button></div></div>');
							}
							if (opt.header) {
								if (typeof(opt.dropDown) == 'function') {
									header = header + '<div class="sws-container" style="width:34px;" ><div class="sws-content">&nbsp;</div></div>';
									tbody.append('<td class="sws-container" style="width:32px;"></td>');
								}
								var columns = opt.columns,
								optDefaults = opt.defaults;
								//for (col in columns) {
								$.each(columns, function(col, value){
									var colConf = columns[col]
										$.extend(colConf, optDefaults, colConf);
									if (typeof colConf.width == 'undefined')
										w = '';
									else
										w = 'width:' + colConf.width;
									header += '<div class="sws-head-' + colConf.name + ' sws-container sws-no-select sws-no-wrap" style="' + w + '"><div onclick="$(\'#' + self.id + '\')[0].sw.sortTable(\'' + colConf.name + '\',true)" class="sws-content">&nbsp;' + colConf.title + '&nbsp;<span id="' + colConf.name + '" style="position: relative;"></span></div></div>';
									opt.columns[col] = colConf;
									tbody.append('<td class="' + colConf.name + ' sws-td-' + colConf.name + '"></td>');
								})
								if (opt.selection != false) {
									header += '<div class="sws-container" style="width:50px;padding:0px;"><div class="sws-content">Action</div></div>';
									tbody.append('<td class="sws-container" style="width:48px;"></td>');
								}
							}
							
							header = header + '</div>';
							self.header.append(header);
							for (i in opt.columns) {
								tbody.find('td.sws-td-' + opt.columns[i].name).width();
								self.header.find('div.sws-head-' + opt.columns[i].name).css('width', tbody.find('td.sws-td-' + opt.columns[i].name).width());
							}
							self.header = self.baseEl.find('div.sws-header');
							var body = $('body')[0],
							swcontent = $('.sws-toolbar div.sws-container');
							$('.sws-toolbar div.sws-container .sws-content').mouseenter(function () {
								swcontent.unbind('mouseover').unbind('mousedown');
								if (!body.resizeAct) {
									swcontent.css('cursor', 'pointer')
								}
							}).mouseleave(function (e) {
								if (!body.resizeAct) {
									swcontent.mouseover(function () {
										thisEl = $(this);
										thisEl.css('cursor', 'col-resize').prev().css('cursor', 'col-resize')
										thisEl.mousedown(function (e) {
											this.x = e.clientX;
											body.resize = this;
											body.resizeAct = true;
											$('body').mouseup(function (e) {
												$(this).unbind('mouseup');
												if (body.resizeAct && $(this.resize).prev().attr('class') != 'sws-container') {
													resize = $(this.resize)
														cl = resize.attr('class').split('-')[2].split(' ')[0];
													clprev = resize.prev().attr('class').split('-')[2].split(' ')[0];
													dif = Math.abs(this.resize.x - e.clientX)
														if (this.resize.x < e.clientX) {
															if (parseInt(resize.css('width')) - dif < 32)
																dif = parseInt(resize.css('width')) - 32
																	resize.css('width', parseInt(resize.css('width')) - dif + 'px').prev().css('width', parseInt(resize.prev().css('width')) + dif + 'px')
														} else {
															if (parseInt(resize.prev().css('width')) - dif < 32)
																dif = parseInt(resize.prev().css('width')) - 32
																	resize.css('width', parseInt(resize.css('width')) + dif + 'px').prev().css('width', parseInt(resize.prev().css('width')) - dif + 'px')
														}
														$('.' + resize.attr('class').split(' ')[0]).css('width', resize.width()).prev().width(resize.prev().width())
														self.baseEl.find('.sws-td-' + cl).css('width', parseInt(resize.css('width')) - 2 + 'px');
													self.baseEl.find('.sws-td-' + clprev).css('width', parseInt(resize.prev().css('width')) - 2 + 'px');
												}
												body.resizeAct = false;
												swcontent.css('cursor', 'col-resize')
											})
										})
									})
								}
							})
							if (self.options.title != false) {
								self.header.prepend('<div class="sws-title"><div>' + self.options.title + '</div></div>')
							}
							/*if (self.options.bottomToolbar.length != 0) {
							self.bbar(self.options.bottomToolbar);
							}*/
							if (!opt.header) {
								self.header.hide();
							}
							self.loadData(1, true);
						}
						this.render();
					}
					return this.targetEl[0].sw;
				}
			})
		}
		
		for (i = 0; i < el.length; i++) {
			el[i].sw.init(opt);
		}
		return el;
	}
	
})(jQuery);

//wrapper for secondary
(function ($) {
	$.extend($.fn, {
		simpleTable : function (data, opt) {
			$.extend(opt, {
				'data' : data,
				target : '#' + this.attr('id')
			})
			return $.sw.table(opt);
		},
		simpleCombo : function (data, opt) {
			$.extend(opt, {
				'data' : data,
				target : '#' + this.attr('id')
			})
			return $.sw.combobox(opt);
		}
	})
})(jQuery);
