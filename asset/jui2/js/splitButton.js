(function($){
	
	var splitButton = function(opt){
		var self = this;
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
				label: '',
				icon: '',
				disabled: false,
				menu: [],
				event: {}
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_splitButton(defaults));
			if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}
			
			jui2.menu({parent: output.find('i')[1], menu: defaults.menu});
			
			this[0] = output;
			
			this[0].jui2 = {}
			
			this.length = 1;
			
			if(typeof defaults.event.click == 'function')
				output.find('i').last().siblings().click(defaults.event.click);
			
			return this;
			
		}
	}
	
	jui2.splitButton = function(opt) {
        return new splitButton(opt);
    };
	
	jui2.splitButton.fn = splitButton.prototype;
	
	jui2.splitButton.fn.disable = function(){
		if(!this[0].hasClass('j-disabled')){
			this[0].addClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events._click = this[0] .data().events.click;
				this[0] .data().events.click = null;
			}
		}
	}
	
	jui2.splitButton.fn.enable = function(){
		if(this[0].hasClass('j-disabled')){
			this[0].removeClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events.click = this[0] .data().events._click;
				this[0] .data().events._click = null;
			}
		}
	}
	
}(jQuery))