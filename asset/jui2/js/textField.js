(function($){
	
	var textField = function(opt){
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
			
			var output = $(jui2.tmpl.tmpl_textField(defaults));
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
		
			return this;
			
		}
	}
	
	jui2.textField = function(opt) {
        return new textField(opt);
    };
	
	jui2.textField.fn = textField.prototype;
	
	jui2.textField.fn.disable = function(){
		
	}
	
	jui2.textField.fn.enable = function(){
		
	}
	
	jui2.textField.fn.close = function(){
		this[0].hide()
	}
	
	jui2.textField.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
}(jQuery))