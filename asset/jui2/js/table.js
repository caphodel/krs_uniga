(function($){
	
	var table = function(opt){
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
				width: 'auto',
				columns: [],
				height: '300px',
				server: false,
				hidden:[],
				custom:false,
				drop: []
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_table(defaults));
			
			output[0].jui2 = this;
			this[0] = output[0];
			this.length = 1;
			output[0].jui2.defaults = defaults
			
			if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}
			
			jui2.bar({
				parent: output.find('.j-table-top-toolbar'),
				items:[{
					text: defaults.title
				}]
			});
			
			if(defaults.topbar)
				jui2.bar({
					parent: output.find('.j-table-top-toolbar'),
					'class': 'j-color-toolbar-white',
					items: defaults.topbar
				});
			
			jui2.bar({
				parent: $(self[0]).find('.j-table-bottom-toolbar'),
				items:[{
					role: 'button',
					label: 'Prev',
					event: {
						click: function(){
							if(self.param.totalPage>(parseInt(self.param.iDisplayLength)+parseInt(self.param.iDisplayStart)))
								self.param.iDisplayStart = parseInt(self.param.iDisplayStart)+parseInt(self.param.iDisplayLength)
							self.generateData();
						}
					}
				}, {
					role: 'button',
					label: 'Next',
					event: {
						click: function(){
							if(self.param.totalPage>(parseInt(self.param.iDisplayLength)+parseInt(self.param.iDisplayStart)))
								self.param.iDisplayStart = parseInt(self.param.iDisplayStart)+parseInt(self.param.iDisplayLength)
							self.generateData();
						}
					}
				}, {
					role: 'button',
					icon: 'fa-refresh',
					class: 'j-table-refresh',
					event: {
						click: function(){
							self.generateData();
						}
					}
				}, '-', {
					text: '',
					class: 'j-table-pageOf'
				}]
			});
			
			if(typeof defaults.data == 'string'){
				output[0].jui2.param = {}
				output[0].jui2.param.sEcho = -1
				output[0].jui2.param.iDisplayLength = 10
				output[0].jui2.param.iDisplayStart = 0
				output[0].jui2.param.iSortCol_0 = 0
				output[0].jui2.param.sSearch = ''
				output[0].jui2.param.sSortDir_0 = ''
				output[0].jui2.generateData()
			}
			else{
				var data = $(jui2.tmpl.tmpl_tableData({data: defaults.data, columns: defaults.columns/*, class: output.attr('id')*/}));
				output.find('.j-table-body').empty().append(data);
				
				var maxWidth = 0;
				output.find('.j-table-head tbody td').each(function(i, val){
					output.children('.j-table-body').children('table').children('colgroup:nth-child('+(i+1)+')').children('col').width($(val).outerWidth())
					maxWidth += parseFloat($(val).outerWidth());
				})
				output.children('.j-table-body').children('table').width(maxWidth);
			}
			
			if(defaults.event.afterRender)
				defaults.event.afterRender(this)
			
			//add scroll event
			var controller = new ScrollMagic({
					container : output.children('.j-table-body'),
					vertical : false
				});
			var scene = new ScrollScene({
					//triggerElement : output.children('.j-table-body').children('table'),
					duration : 200
				}).addTo(controller).on("update", function (e) {
					output.children('.j-table-head').scrollLeft(e.scrollPos)
				});
				
			output.find('.j-table-head thead td .j-table-header-menu').each(function(i, val){
				var td = $($(this).parents('td')[0])
				var el = $(this)
				var startX=0;
				var scrollLeft = 0;
				drag(this).axis('x').handle($(this).children('.j-table-header-resize')[0]).dragging(function() {
					//td.width(td.width()+(this.pos.x-startX))
					output.children('.j-table-ruler').css('left', (td.position().left+this.pos.x+output.position().left+13))
					el.show()
					//startX = this.pos.x;
				}).start(function() {
					output.children('.j-table-ruler').height(output.height()).show()
					output.children('.j-table-ruler').css('left', (output.position().left+td.position().left+el.position().left+13/*-output.children('.j-table-head').scrollLeft()*/))
					startX = parseFloat(output.children('.j-table-ruler').css('left'));
					scrollLeft = output.children('.j-table-head').scrollLeft()
				}).end(function() {
					el.css('left', '');
					$(td.parents('table')[0]).width(parseFloat($(td.parents('table')[0]).width()) + (parseFloat(output.children('.j-table-ruler').css('left'))-startX))
					var width = td.width()+(parseFloat(output.children('.j-table-ruler').css('left'))-startX);
					td.width(width)
					td.children('div').width(width)
					output[0].jui2.resizeTable()
					output.children('.j-table-head').scrollLeft(scrollLeft)
					output.children('.j-table-body').scrollLeft(scrollLeft)
					output.children('.j-table-ruler').hide()
				}).bind();
			})
			
			return this;
			
		}
	}
	
	jui2.table = function(opt) {
        return new table(opt);
    };
	
	jui2.table.fn = table.prototype;
	
	jui2.table.fn.disable = function(){
		
	}
	
	jui2.table.fn.enable = function(){
		
	}
	
	jui2.table.fn.close = function(){
		this[0].hide()
	}
	
	jui2.table.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
	jui2.table.fn.resizeTable = function(){
		var self = this;
		var maxWidth = 0;
		
		$(self[0]).find('.j-table-head tbody td').each(function(i, val){
			if($(val).hasClass('j-table-last-td')){
				var width = 0;
				if($(val).outerWidth()>=20)
					width = parseFloat($(val).outerWidth())-20;
				
				$(self[0]).children('.j-table-body').children('table').children('colgroup:nth-child('+(i+1)+')').children('col').width(width)
				maxWidth += width;
			}
			else{
				$(self[0]).children('.j-table-body').children('table').children('colgroup:nth-child('+(i+1)+')').children('col').width($(val).outerWidth())
				maxWidth += parseFloat($(val).outerWidth());
			}
		})
		
		//if(parseFloat(maxWidth)>parseFloat($(self[0]).children('.j-table-body').children('table').width()))
		$(self[0]).children('.j-table-body').children('table').width(maxWidth);
	}
	
	jui2.table.fn.generateData = function(){
		var self = this;
		self.loadingMask = jui2.loadingMask($(self[0]).children('.j-table-body'))
		self.param.sEcho++;
		$.getJSON(self.defaults.data, self.param).done(function(data){
			if(self.param.sEcho==data.sEcho){
				self.defaults.items = new Array();
				self.param.totalPage = parseInt(data.iTotalRecords)-1;
				
				data.aaData = jui2.arrayToJson(data.aaData);
				self.aaData = TAFFY(data.aaData)
				$.each(data, function(i, val){
					if(i!='aaData')
						self.param[i] = val
				})
				
				var dataToBeShowed = (self.defaults.server == true) ? self.aaData().start(0).limit(self.param.iDisplayLength).get() : self.aaData().start(self.param.iDisplayStart).limit(self.param.iDisplayLength).get();

				if(self.defaults.custom)
					for(var i=0;i<dataToBeShowed.length;i++){
						$.each(self.defaults.custom, function(j, val){
							dataToBeShowed[i][j] = self.defaults.custom[j](dataToBeShowed[i])
						})
					}
				var data = $(jui2.tmpl.tmpl_tableData({id: $(self[0]).attr('id'),data: dataToBeShowed, colCount: self.defaults.colCount, drop: self.defaults.drop})).width('100%');
				$(self[0]).find('.j-table-body').empty().append(data);
				
				self.resizeTable();
				
				$(self[0]).children('.j-table-bottom-toolbar').find('.j-table-pageOf').text('Page '+(self.param.iDisplayStart/self.param.iDisplayLength+1)+' of '+Math.ceil(self.param.iTotalRecords/self.param.iDisplayLength))
			}
			else{
			}
			self.loadingMask.destroy()
		})
	}
	
	jui2.table.fn.showDrop = function(pk, td){
		var self = this;
		var parent = $(td).parent();
		if(typeof self.aaData().select(0)[0] == 'number')
			pk = parseInt(pk)
		if($(td).find('i').hasClass('fa-plus-square-o')){
			$(td).find('i').removeClass('fa-plus-square-o').addClass('fa-minus-square-o')
			var count = parent.children().length
			var dropEl = $('<tr><td colspan="'+count+'" class="j-table-field">&nbsp;</td></tr>').insertAfter(parent);
			if(self.defaults.event.drop)
				self.defaults.event.drop(td, self.aaData({0: pk}).get())
		}
		else{
			$(td).find('i').removeClass('fa-minus-square-o').addClass('fa-plus-square-o')
			parent.next().remove()
		}
		//console.log(self.aaData({0: pk}).get())
	}
	
}(jQuery))