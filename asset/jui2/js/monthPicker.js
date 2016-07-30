(function($){
	
	var monthPicker = function(opt){
		var defaults = {id: 'j-no-id'};
		
		$.extend(true, defaults, opt)

		if(defaults.target)
			var target = typeof defaults.target == 'string' ? $('#'+defaults.target):$(defaults.target)
		else
			var target = $('#'+defaults.id)
		
		if(target.hasClass('j-body')){
		
			this[0] = target;
			this.length = 1;
			
			return this;
		}
		else{
		
			if(!opt){
				var opt = {}
			}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: false,
				event: {},
				parent: 'body',
				lang: 'en',
				month: moment().format('MM')
			}
			
			$.extend(true, defaults, opt);
			
			defaults.monthsName = jui2.lang.monthPicker[defaults.lang];
			
			var output = $(jui2.tmpl.tmpl_monthPicker(defaults));
			
			if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}
			
			output.find('tbody td:contains('+jui2.lang.monthPicker[defaults.lang][moment(defaults.month+'-2000', 'MM-YYYY').format('MMM').toLowerCase()].short+')').addClass('j-monthPicker-selected')
			
			this[0] = output;
			this.length = 1;
			output[0].jui2 = this;
			this.value=defaults.month;
			
			output.find('tbody td').click(function(){
				var index = $(this).index();
				if(index==1){
					index=6;
				}
				output[0].jui2.value = $(this).parent().index()+1+index;
				output.find('tbody td').removeClass('j-monthPicker-selected');
				$(this).addClass('j-monthPicker-selected');
			})
			
			return this;
			
		}
	}
	
	jui2.monthPicker = function(opt) {
        return new monthPicker(opt);
    };
	
	jui2.monthPicker.fn = monthPicker.prototype;
	
	jui2.monthPicker.fn.disable = function(){
		if(!this[0].hasClass('j-disabled')){
			this[0].addClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events._click = this[0] .data().events.click;
				this[0] .data().events.click = null;
			}
		}
	}
	
	jui2.monthPicker.fn.enable = function(){
		if(this[0].hasClass('j-disabled')){
			this[0].removeClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events.click = this[0] .data().events._click;
				this[0] .data().events._click = null;
			}
		}
	}
	
	jui2.monthPicker.fn.close = function(){
		this[0].hide()
	}
	
	jui2.monthPicker.fn.destroy = function(){
		this[0].remove()
	}
	
}(jQuery))