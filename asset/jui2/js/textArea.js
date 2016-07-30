(function($){
	
	var textArea = function(opt){
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
				width: 154,
				height: 75
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_textArea(defaults));
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
			new Medium({
				element: output.find('.j-textArea-editor')[0]
			});
			this[0] = output[0];
			this.length = 1;
		
			return this;
			
		}
	}
	
	jui2.textArea = function(opt) {
        return new textArea(opt);
    };
	
	jui2.textArea.fn = textArea.prototype;
	
	jui2.textArea.fn.disable = function(){
		
	}
	
	jui2.textArea.fn.enable = function(){
		
	}
	
	jui2.textArea.fn.close = function(){
		this[0].hide()
	}
	
	jui2.textArea.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
}(jQuery))