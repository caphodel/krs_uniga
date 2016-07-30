(function($){
	
	var comboField = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
		$.extend(true, defaults, opt)

		if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)

		if(target.hasClass('j-body')){
			return target[0].jui2;
		}
		else{
		
			if(!opt){
				var opt = {}
			}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: false,
				event: {},
				server: false,
				display: [1]
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_comboField(defaults));
			if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}
				
			output[0].jui2 = this;
			this[0] = output[0];
			this.length = 1;
			
			output[0].jui2.defaults = defaults
			
			if(typeof defaults.items == 'string'){
				
				output[0].jui2.param = {}
				output[0].jui2.param.sEcho = -1
				output[0].jui2.param.iDisplayLength = 10
				output[0].jui2.param.iDisplayStart = 0
				output[0].jui2.param.iSortCol_0 = 0
				output[0].jui2.param.sSearch = ''
				output[0].jui2.param.sSortDir_0 = ''
				
				output[0].jui2.generateItemList()
			}
			else{
				var items = $(jui2.tmpl.tmpl_listItems({items: defaults.items}));
				$('body').append(items);
				items.css('z-index', jui2.findHighestZIndex('.j-body')+1)
				output[0].jui2.tether = new Tether({
					element: items,
					target: output.find('input').first(),
					attachment: 'top left',
					targetAttachment: 'bottom left',
					constraints: [{
						to: 'window',
						attachment: 'together none',
						pin: true
					}]
				});
				
				items.hide()
				
				jui2.oms.remove(output.attr('id'), 'body')
				
				jui2.oms.append(output.attr('id'), function(e){
					if(items.is(':visible') && $(e.target).closest('.j-listItems').length != 1 && $(e.target).closest('.j-comboField').length != 1)
						items.hide()
				}, 'body')
				
				items.click(function(e){
					if(e.target.tagName == 'LI'){
						output.find('input.j-value').val(e.target.getAttribute("value"))
						output.find('input').first().val(e.target.innerHTML)
						items.hide()
					}
				})
				
				output.click(function(){
					if(items.is(':visible'))
						items.hide()
					else
						tems.show();
					output[0].jui2.tether.position()
				})
			}
			return this;
			
		}
	}
	
	jui2.comboField = function(opt) {
        return new comboField(opt);
    };
	
	jui2.comboField.fn = comboField.prototype;
	
	jui2.comboField.fn.disable = function(){
		
	}
	
	jui2.comboField.fn.enable = function(){
		
	}
	
	jui2.comboField.fn.close = function(){
		this[0].hide()
	}
	
	jui2.comboField.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
	jui2.comboField.fn.search = function(sSearch){
		var self = this;
	}
	
	jui2.comboField.fn.generateItemList = function(show){
		var self = this;
		self.param.sEcho++;
		//$.getJSON(self.defaults.items, self.param)
		$.ajax({
			dataType: "json",
			url: self.defaults.items,
			type: 'POST',
			data: self.param
		}).done(function(data){
		
			if(self.param.sEcho==data.sEcho){
				self.items = new Array();
				self.param.totalPage = data.iTotalRecords-1;
				
				for(i=0;i<self.param.iDisplayLength;i++){
					if(data.aaData[i]){
						var val = data.aaData[i]
						var label = ''
						for(z=0;z<self.defaults.display.length;z++){
							label += '<div style="flex: 1;padding-right: 10px;">'+val[self.defaults.display[z]]+'</div>'
						}
						self.items.push({label: label, value: val[0]})
					}
				}
				
				$.each(data, function(i, val){
					if(i!='aaData')
						self.param[i] = val
				})
				
				//var dataToBeShowed = (self.defaults.server == true) ? self.aaData().start(0).limit(self.param.iDisplayLength).get() : self.aaData().start(self.param.iDisplayStart).limit(self.param.iDisplayLength).get();
				var items = $(jui2.tmpl.tmpl_listItems({items: self.items}));
				
				if(self.itemsEl)
					self.itemsEl.remove();
				
				self.itemsEl = items;
				
				$('body').append(items);
				
				jui2.bar({
					parent: items.find('.j-listItems-top-toolbar'),
					items:[{
						role: 'textField',
						icon: 'fa-search',
						'class': 'j-listItems-searchText'
					},{
						role: 'button',
						label: 'Search',
						event: {
							click: function(e){
								self.param.sSearch = $(e.target).parents('.j-listItems-top-toolbar').find('.j-listItems-searchText input').val()
								self.param.iDisplayStart  = 0;
								self.generateItemList(true)
							}
						}
					}]
				})
				
				jui2.bar({
					parent: items.find('.j-listItems-bottom-toolbar'),
					items:[{
						role: 'button',
						label: 'Prev',
						event: {
							click: function(e){
								if(parseInt(self.param.iDisplayStart)>0){
									self.param.iDisplayStart = parseInt(self.param.iDisplayStart)-parseInt(self.param.iDisplayLength)
									self.generateItemList(true)
								}
							}
						}
					},{
						role: 'button',
						label: 'Next',
						event: {
							click: function(e){
								if(self.param.totalPage>(parseInt(self.param.iDisplayLength)+parseInt(self.param.iDisplayStart))){
									self.param.iDisplayStart = parseInt(self.param.iDisplayStart)+parseInt(self.param.iDisplayLength)
									self.generateItemList(true)
								}
							}
						}
					}, '-', {
						text: 'Page '+(Math.ceil(self.param.iDisplayStart/self.param.iDisplayLength)+1)+'/'+Math.ceil(self.param.iTotalRecords/self.param.iDisplayLength),
						"class": 'j-itemList-pageOf'
					}]
				})
				
				items.css('z-index', jui2.findHighestZIndex('.j-body')+1)
				
				self.tether = new Tether({
					element: items,
					target: $(self[0]).find('input').first(),
					attachment: 'top left',
					targetAttachment: 'bottom left',
					constraints: [{
						to: 'window',
						attachment: 'together none',
						pin: true
					}]
				});
				
				jui2.oms.remove($(self[0]).attr('id'), 'body')
				
				jui2.oms.append($(self[0]).attr('id'), function(e){
					if(items.is(':visible') && $(e.target).closest('.j-listItems').length != 1 && $(e.target).closest('.j-comboField').length != 1)
						items.hide()
				}, 'body')
				
				items.click(function(e){
					if($(e.target).closest('li').length==1){
						var el = $(e.target).closest('li');
						var optionTexts = [];
						el.find('div').each(function() { optionTexts.push($(this).text()) });
						$(self[0]).find('input.j-value').val(el.attr("value"))
						$(self[0]).find('input').first().val(optionTexts.join(', '))
						items.hide()
						if(self.defaults.event.select)
							self.defaults.event.select(el.attr("value"), optionTexts)
					}
				})
				
				$(self[0]).unbind('click').click(function(){
					if(items.is(':visible'))
						items.hide()
					else
						//items.show();
						self.generateItemList(true)
					self.tether.position()
				})
				
				if(!show)
					items.hide()
				else
					self.tether.position()
			}
		})
	}
	
}(jQuery))