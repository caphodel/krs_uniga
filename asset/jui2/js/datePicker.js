(function($){
	
	var datePicker = function(opt){
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
				event: {}
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_datePicker(defaults));
			
			if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}
			
			output.find('input').click(function(){
				output[0].jui2.showPicker();
			})
			
			output.find('i').click(function(){
				output[0].jui2.showPicker();
				output.find('input').focus()
			})
			
			output[0].jui2 = this;
			output[0].jui2.monthPicker = false
			
			output[0].jui2.defaults = defaults
			
			this[0] = output[0];
			this.length = 1;
			
			jui2.oms.remove(output.attr('id'), 'body')
			
			jui2.oms.append(output.attr('id'), function(e){
				if($(e.target).closest('.j-calendar-select-month').length == 1)
					self[0].jui2.monthPicker = true
				else if(self[0].jui2.calendar)
					if($(e.target).closest(self[0].jui2.calendar[0]).length==1)
						self[0].jui2.monthPicker = false
				if($(e.target).closest(output).length != 1 && self[0].jui2.monthPicker == false && self[0].jui2.calendar && $(e.target).closest(self[0].jui2.calendar[0]).length != 1){
					self[0].jui2.calendar.destroy();
					self[0].jui2.calendar=false;
				}
				if( output[0].jui2.calendar)
					if($(e.target).closest(output).length == 0 &&  $(e.target).closest(output[0].jui2.calendar).length == 0 &&  $(e.target).closest('.j-calendar-overlay').length == 0){
						if(self[0].jui2.calendar.overlay)
							if(self[0].jui2.calendar.overlay.destroy)
								self[0].jui2.calendar.overlay.destroy()
						self[0].jui2.calendar.destroy();
						self[0].jui2.calendar=false;
					}
			}, 'body')
			
			return this;
			
		}
	}
	
	jui2.datePicker = function(opt) {
        return new datePicker(opt);
    };
	
	jui2.datePicker.fn = datePicker.prototype;
	
	jui2.datePicker.fn.disable = function(){
		
	}
	
	jui2.datePicker.fn.enable = function(){
		
	}
	
	jui2.datePicker.fn.close = function(){
		this[0].hide()
	}
	
	jui2.datePicker.fn.destroy = function(){
		jui2.oms.remove(this[0].attr('id'), 'body')
		this[0].remove()
		this[0] = null;
	}
	
	jui2.datePicker.fn.showPicker = function(){
		var self = this;
		var el = this[0];
		if(!this[0].jui2.calendar)
			this[0].jui2.calendar = jui2.calendar({
				date: self.defaults.format ? moment($(el).find('input').val(), self.defaults.format).format('DD-MM-YYYY') : $(el).find('input').val(),
				event:{
					click: function(cal){
						$(el).find('input').val(self.defaults.format ? moment(cal.value, 'DD-MM-YYYY').format(self.defaults.format) : cal.value);
						cal.destroy();
						el.jui2.calendar = null;
						$(el).find('input').focus();
					}
				}
			})
			
			new Tether({
				element: this[0].jui2.calendar[0],
				target: $(this[0]).find('input'),
				attachment: 'top left',
				targetAttachment: 'bottom left',
				constraints: [{
					to: 'window',
					attachment: 'together none',
					pin: true
				}]
			});
	}
	
}(jQuery))