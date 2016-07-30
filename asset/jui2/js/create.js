(function($){
	jui2.adapter = {}
	jui2.adapter.table = function(){
		$('table[jui2=true][role=table]').each(function(){
			var data = {}
			$.each(this.attributes, function(i, val){
				if(val.name=='drop' || val.name == 'server' || val.name == 'jui2' || val.name == 'hidden')
					data[val.name] = eval(val.value);
				else if(val.name=='event' || val.name == 'topbar' || val.name == 'custom'){
					data[val.name] = window[val.value]
				}
				else
					data[val.name] = val.value;
			})
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
	
	jui2.adapter.textField = function(){
		$('[jui2=true][role=textField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;
			})

			data.target = this;
			jui2.textField(data);
		})
	}
	
	jui2.adapter.textArea = function(){
		$('[jui2=true][role=textArea]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;
			})

			data.target = this;
			jui2.textArea(data);
		})
	}
	
	jui2.adapter.passwordField = function(){
		$('[jui2=true][role=passwordField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;
			})

			data.target = this;
			jui2.passwordField(data);
		})
	}
	
	jui2.adapter.datePicker = function(){
		$('[jui2=true][role=datePicker]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;
			})

			data.target = this;
			jui2.datePicker(data);
		})
	}
	
	jui2.adapter.comboField = function(){
		$('[jui2=true][role=comboField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				if(val.name=='items')
					data['items'] = eval(val.value)
				else if(val.name=='data')
					data['items'] = val.value
				else if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;
			})
			data.target = this;
			jui2.comboField(data);
		})
	}
	
	jui2.adapter.radioField = function(){
		$('[jui2=true][role=radioField]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				if(val.name=='items')
					data['items'] = eval(val.value)
				else if(val.name=='items-from-var')
					data['items'] = window[val.value]
				else if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;
			})
			data.target = this;
			jui2.radioField(data);
		})
	}
	
	jui2.adapter.button = function(){
		$('[jui2=true][role=button]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				if(val.name=='event')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;
			})

			data.target = this;
			jui2.button(data);
		})
	}
	
	jui2.adapter.bar = function(){
		$('[jui2=true][role=bar]').each(function(){
			var data = {}
			
			$.each(this.attributes, function(i, val){
				if(val.name=='event' || val.name=='items')
					data[val.name] = window[val.value]
				else
					data[val.name] = val.value;
			})

			data.target = this;
			jui2.bar(data);
		})
	}
	
	jui2.create = function(){
		$.each(jui2.adapter, function(i, val){
			jui2.adapter[i]()
		})
	}
}(jQuery))