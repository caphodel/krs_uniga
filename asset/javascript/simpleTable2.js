jQuery.fn.toHtmlString = function () {
    return $(this).get()[0].outerHTML;
};

(function( $ ){
	$.simpleTableCol=[];
    $.extend($.fn, {
        simpleTable: function(url, opt){
            //this.id = id;
			if(typeof(url) != 'undefined' && typeof(opt) != 'undefined'){
				this.url = url;
				this.options = {
					columns : [],
					dropDown : false,
					autoUpdate : false,
					updateTime : 5000,
					type:[]
				}

				this.dropDown = [];
				this.sortedOrder = 'desc';
				this.sortedBy = ''
				this.records = [];
				this.tm = '';
				this.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;

				$.extend(this.options, this.options, opt);

				var self = this;

				this.addClass('simpleTable');
				this.empty();
				th = '<thead><tr>';

				if(typeof(this.options.dropDown)=='function')
					th = th + '<th>&nbsp;</th>';
				//thead = $('#'+this.attr('id')+' thead th')
				for(i in this.options.columns){
					th = th + '<th onclick="$(\'#'+this.attr('id')+'\').simpleTable().sortTable(\''+this.options.columns[i].name+'\',true)">'+this.options.columns[i].title+'</th>';
				}
				th = th + '</tr></thead><tbody></tbody>';
				this.append(th);

				this.stop = function(){
					self.options.autoUpdate = false;
					clearTimeout(self.tm);
				}
				
				this.start = function(){
					self.options.autoUpdate = true;
					self.drawTable();
				}
				
				this.loadData = function(){
					if(self.options.autoUpdate){
						clearTimeout(self.tm);
					}
					$.getJSON(this.url, function(records) {
						self.records = records
						if(self.sortedBy != ''){
							self.sortTable(self.sortedBy, false);
						}
						self.drawTable();
					})
				}
				
				this.drawTable = function(){
					records = self.records;
					el = ''
					columns = self.options.columns;
					for (row in records){
						el = el + '<tr>'
						for (col in columns){
							/*if(self.options.renderer.hasOwnProperty(columns[col].name)){
								el2 = $('<td>' + records[row][columns[col].name] + '</td>');
								el = el + self.options.renderer[columns[col].name](records[row][columns[col].name], el2, records[row]).toHtmlString()
							}*/;
							if(typeof(columns[col].renderer)=='function'){
								el2 = $('<td>' + records[row][columns[col].name] + '</td>');
								el = el + columns[col].renderer(records[row][columns[col].name], el2, records[row]).toHtmlString()
							}
							else{
								data = records[row][columns[col].name];
								if(data == null)
									data = '';
								el = el + '<td>' + data + '</td>'
							}
						}
						el = el + '</tr>'
					}
					$('#'+self.attr('id')+' tbody').empty();
					if($('#smtablecss').length>=1)
						$('#smtablecss').remove();
					$('<style id="smtablecss">.simpleTable{font-family:"lucida grande",Tahoma,verdana,arial,sans-serif;font-size:11px;text-align:left;border-collapse:collapse;width:100%;}.simpleTable th{background:none repeat scroll 0 0#D8DFEA;color:#333333;font-size:11px;font-weight:bold;padding:5px 4px;border-bottom:2px#3B5998 solid;}.simpleTable td{padding:4px;color:#669;}.simpleTable tbody tr:nth-child(even){background:#FFFFFF;padding:4px;color:#669;}.simpleTable tbody tr:nth-child(odd){background:#EBF0F5;padding:4px;color:#669;}</style>').insertBefore('#'+self.attr('id'));
					$('#'+self.attr('id')+' tbody').append(el);
					if(self.options.autoUpdate){
						self.tm = setTimeout(function(){self.loadData();}, self.options.updateTime)
					}
				}
				
				this.drawTableNoUpdate = function(){
					records = self.records;
					el = ''
					columns = self.options.columns;
					for (row in records){
						el = el + '<tr>'
						for (col in columns){
							if(self.options.renderer.hasOwnProperty(columns[col].name)){
								el2 = $('<td>' + records[row][columns[col].name] + '</td>');
								el = el + self.options.renderer[columns[col].name](records[row][columns[col].name],el2).toHtmlString()
							}
							else{
								data = records[row][columns[col].name];
								if(data == null)
									data = '';
								el = el + '<td>' + data + '</td>'
							}
						}
						el = el + '</tr>'
					}
					$('#'+self.attr('id')+' tbody').empty();
					if($('#smtablecss').length>=1)
						$('#smtablecss').remove();
					$('<style id="smtablecss">.simpleTable{font-family:"lucida grande",Tahoma,verdana,arial,sans-serif;font-size:11px;text-align:left;border-collapse:collapse;width:100%;}.simpleTable th{background:none repeat scroll 0 0#D8DFEA;color:#333333;font-size:11px;font-weight:bold;padding:5px 4px;border-bottom:2px#3B5998 solid;}.simpleTable td{padding:4px;color:#669;}.simpleTable tbody tr:nth-child(even){background:#FFFFFF;padding:4px;color:#669;}.simpleTable tbody tr:nth-child(odd){background:#EBF0F5;padding:4px;color:#669;}</style>').insertBefore('#'+self.attr('id'));
					$('#'+self.attr('id')+' tbody').append(el);
				}
				
				this.guessType = function(column){
					for(i in self.records){
						if (self.records[i][column] != '') {
							if (self.records[i][column].match(/^-?[£$¤]?[\d,.]+%?$/)) {
								/*if(typeof(sortpos[column])=='undefined'){
									sortpos[column] = 'min';
									return function(a,b){return parseFloat(a[column])-parseFloat(b[column])};
								}
								else if(sortpos[column] == 'min'){
									sortpos[column] = 'max';
									return function(a,b){return parseFloat(b[column])-parseFloat(a[column])};
								}
								else{
									sortpos[column] = 'min';
									return function(a,b){return parseFloat(a[column])-parseFloat(b[column])};
								}*/
								return 'number';
							}
							else{
								return 'text';
								/*if(typeof(sortpos[column])=='undefined'){
									sortpos[column] = 'min';
									return 'min';
								}
								else if(sortpos[column] == 'min'){
									sortpos[column] = 'max';
									return 'max';
								}
								else{
									sortpos[column] = 'min';
									return 'min';
								}
								/*possdate = self.records[i].match(self.DATE_RE)
								if (possdate) {
									first = parseInt(possdate[1]);
									second = parseInt(possdate[2]);
									if (first > 12) {
									// definitely dd/mm
										return sorttable.sort_ddmm;
									} else if (second > 12) {
										return sorttable.sort_mmdd;
									} else {
									// looks like a date, but we can't tell which, so assume
									// that it's dd/mm (English imperialism!) and keep looking
										sortfn = sorttable.sort_ddmm;
									}
								}*/
							}
						}
					}
				}

				this.sortTable = function(column, ch){
					//if(typeof(type[column])!='undefined')
					type = self.guessType(column);
					//self.sortedBy = column
					if(type=='number'){
						if(self.sortedBy != column)
							self.sortedOrder = 'desc';
						if(self.sortedOrder == 'desc'){
							if(ch)
								self.sortedOrder = 'asc';
						}
						else{
							if(ch)
								self.sortedOrder = 'desc';
						}
						if(self.sortedOrder == 'asc'){
							fn = function(a,b){return parseFloat(a[column])-parseFloat(b[column])}
						}
						if(self.sortedOrder == 'desc'){
							fn = function(a,b){return parseFloat(b[column])-parseFloat(a[column])}
						}
						self.records = self.records.sort(fn)
					}
					else{
						if(self.sortedBy != column)
							self.sortedOrder = 'desc';
						if(self.sortedOrder == 'desc'){
							if(ch)
								self.sortedOrder = 'asc';
						}
						else{
							if(ch)
								self.sortedOrder = 'desc';
						}
						if(self.sortedOrder == 'asc'){
							self.records = self.records.sort()
							self.records = self.records.reverse()
						}
						if(self.sortedOrder == 'desc'){
							self.records = self.records.reverse()
							self.records = self.records.sort()
						}
					}
					self.sortedBy = column;
					
					//console.log(self.sortedBy,column,self.sortedOrder )
					self.drawTableNoUpdate();
				}

				this.loadData();
				for(i in this){
					this[i].simpleTable = this;
				}
			}
			return this[0].simpleTable;
        }
    });
})( jQuery );

///////////////////

simpleTable = function(id, url, opt){
	this.id = id;
	this.url = url;
    this.options = {
        columns : [],
		renderer : [],
		autoUpdate : false,
		updateTime : 5000,
		type:[]
    }
	
	this.sortPos = [];
	this.records = [];
	this.tm = '';
	this.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
	
	$.extend(this.options, this.options, opt);

	var self = this;

	$(id).addClass('simpleTable');
	
	this.stop = function(){
		self.options.autoUpdate = false;
		clearTimeout(self.tm);
	}

	this.loadData = function(){
		$.getJSON(this.url, function(records) {
			self.records = records
			self.drawTable();
		})
	}
	
	this.drawTable = function(){
		records = self.records;
		el = ''
		columns = self.options.columns;
		for (row in records){
			el = el + '<tr>'
			for (col in columns){
				if(self.options.renderer.hasOwnProperty(columns[col])){
					el2 = $('<td>' + records[row][columns[col]] + '</td>');
					el = el + self.options.renderer[columns[col]](records[row][columns[col]],el2).toHtmlString()
				}
				else{
					data = records[row][columns[col]];
					if(data == null)
						data = '';
					el = el + '<td>' + data + '</td>'
				}
			}
			el = el + '</tr>'
		}
		$(id+' tbody').empty();
		if($('#smtablecss').length>=1)
			$('#smtablecss').remove();
		$('<style id="smtablecss">.simpleTable{font-family:"lucida grande",Tahoma,verdana,arial,sans-serif;font-size:11px;text-align:left;border-collapse:collapse;width:100%;}.simpleTable th{background:none repeat scroll 0 0#D8DFEA;color:#333333;font-size:11px;font-weight:bold;padding:5px 4px;border-bottom:2px#3B5998 solid;}.simpleTable td{padding:4px;color:#669;}.simpleTable tbody tr:nth-child(even){background:#FFFFFF;padding:4px;color:#669;}.simpleTable tbody tr:nth-child(odd){background:#EBF0F5;padding:4px;color:#669;}</style>').insertBefore(id);
		$(id+' tbody').append(el);
		if(self.options.autoUpdate){
			self.tm = setTimeout(function(){self.loadData();}, self.options.updateTime)
		}
	}
	
	this.drawTableNoUpdate = function(){
		records = self.records;
		el = ''
		columns = self.options.columns;
		for (row in records){
			el = el + '<tr>'
			for (col in columns){
				if(self.options.renderer.hasOwnProperty(columns[col])){
					el2 = $('<td>' + records[row][columns[col]] + '</td>');
					el = el + self.options.renderer[columns[col]](records[row][columns[col]],el2).toHtmlString()
				}
				else{
					data = records[row][columns[col]];
					if(data == null)
						data = '';
					el = el + '<td>' + data + '</td>'
				}
			}
			el = el + '</tr>'
		}
		$(id+' tbody').empty();
		if($('#smtablecss').length>=1)
			$('#smtablecss').remove();
		$('<style id="smtablecss">.simpleTable{font-family:"lucida grande",Tahoma,verdana,arial,sans-serif;font-size:11px;text-align:left;border-collapse:collapse;width:100%;}.simpleTable th{background:none repeat scroll 0 0#D8DFEA;color:#333333;font-size:11px;font-weight:bold;padding:5px 4px;border-bottom:2px#3B5998 solid;}.simpleTable td{padding:4px;color:#669;}.simpleTable tbody tr:nth-child(even){background:#FFFFFF;padding:4px;color:#669;}.simpleTable tbody tr:nth-child(odd){background:#EBF0F5;padding:4px;color:#669;}</style>').insertBefore(id);
		$(id+' tbody').append(el);
	}
	
	this.guessType = function(column){
		for(i in self.records){
			if (self.records[i] != '') {
				if (self.records[i].match(/^-?[£$¤]?[\d,.]+%?$/)) {
					if(typeof(sortpos[column])=='undefined'){
						sortpos[column] = 'min';
						return function(a,b){return parseFloat(a[column])-parseFloat(b[column])};
					}
					else if(sortpos[column] == 'min'){
						sortpos[column] = 'max';
						return function(a,b){return parseFloat(b[column])-parseFloat(a[column])};
					}
					else{
						sortpos[column] = 'min';
						return function(a,b){return parseFloat(a[column])-parseFloat(b[column])};
					}
				}
				else{
					if(typeof(sortpos[column])=='undefined'){
						sortpos[column] = 'min';
						return 'min';
					}
					else if(sortpos[column] == 'min'){
						sortpos[column] = 'max';
						return 'max';
					}
					else{
						sortpos[column] = 'min';
						return 'min';
					}
					/*possdate = self.records[i].match(self.DATE_RE)
					if (possdate) {
						first = parseInt(possdate[1]);
						second = parseInt(possdate[2]);
						if (first > 12) {
						// definitely dd/mm
							return sorttable.sort_ddmm;
						} else if (second > 12) {
							return sorttable.sort_mmdd;
						} else {
						// looks like a date, but we can't tell which, so assume
						// that it's dd/mm (English imperialism!) and keep looking
							sortfn = sorttable.sort_ddmm;
						}
					}*/
				}
			}
		}
	}

	this.sortTable = function(column){
		if(typeof(type[column])!='undefined')
			type = self.guessType(column);
		if(typeof(type)=='function')
			self.records = self.records.sort(type);
		else if(type == 'min')
			self.records = self.records.sort();
		else
			self.records = self.records.reverse();
		self.drawTable();
	}
}