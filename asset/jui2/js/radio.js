(function($){
	
	var radioField = function(opt){
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
				name: 'j-'+jui2.random(8, 'aA#'),
				disabled: false,
				items: []
			}
			
			$.extend(true, defaults, opt);
			
			for(var i = 0;i<defaults.items.length;i++){
				defaults.items[i].id = 'j-'+jui2.random(8, 'aA#')
			}
			
			var output = $(jui2.tmpl.tmpl_radioField(defaults));
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
	
	jui2.radioField = function(opt) {
        return new radioField(opt);
    };
	
	jui2.radioField.fn = radioField.prototype;
	
	jui2.radioField.fn.disable = function(){
		
	}
	
	jui2.radioField.fn.enable = function(){
		
	}
	
	jui2.radioField.fn.close = function(){
		this[0].hide()
	}
	
	jui2.radioField.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
}(jQuery))