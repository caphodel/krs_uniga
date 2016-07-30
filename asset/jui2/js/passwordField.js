(function($){
	
	var passwordField = function(opt){
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
			
			var output = $(jui2.tmpl.tmpl_passwordField(defaults));
			$('body').append(output);
			
			output[0].jui2 = this;
			this[0] = output[0];
			this.length = 1;
		
			return this;
			
		}
	}
	
	jui2.passwordField = function(opt) {
        return new passwordField(opt);
    };
	
	jui2.passwordField.fn = passwordField.prototype;
	
	jui2.passwordField.fn.disable = function(){
		
	}
	
	jui2.passwordField.fn.enable = function(){
		
	}
	
	jui2.passwordField.fn.close = function(){
		this[0].hide()
	}
	
	jui2.passwordField.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
}(jQuery))