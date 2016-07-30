(function($){
	
	var menuButton = function(opt){
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
				menu: []
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_menuButton(defaults));
			if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}
			
			jui2.menu({parent: output, menu: defaults.menu});
			
			this[0] = output;
			
			this[0].jui2 = {}
			
			this.length = 1;
			
			return this;
			
		}
	}
	
	jui2.menuButton = function(opt) {
        return new menuButton(opt);
    };
	
	jui2.menuButton.fn = menuButton.prototype;
	
	jui2.menuButton.fn.disable = function(){
		if(!this[0].hasClass('j-disabled')){
			this[0].addClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events._click = this[0] .data().events.click;
				this[0] .data().events.click = null;
			}
		}
	}
	
	jui2.menuButton.fn.enable = function(){
		if(this[0].hasClass('j-disabled')){
			this[0].removeClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events.click = this[0] .data().events._click;
				this[0] .data().events._click = null;
			}
		}
	}
	
}(jQuery))