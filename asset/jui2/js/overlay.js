(function($){
	
	var overlay = function(opt){
		var defaults = {id: 'j-no-id'};
		
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
				overlayTarget: 'body'
			}
			
			$.extend(true, defaults, opt);
			
			if(!defaults.top)
				defaults.top = $(defaults.overlayTarget).position().top
			
			if(!defaults.left)
				defaults.left = $(defaults.overlayTarget).position().left
			
			if(!defaults.width)
				defaults.width = $(defaults.overlayTarget).width()
			
			if(!defaults.height)
				defaults.height = $(defaults.overlayTarget).height()

			var output = $(jui2.tmpl.tmpl_overlay(defaults));
			
			$('body').append(output);
			
			output.css('z-index', jui2.findHighestZIndex('.j-body')+1)
			
			output[0].jui2 = this;
			this[0] = output[0];
			this.length = 1;
			
			if(defaults.event.afterRender){
				defaults.event.afterRender(this);
			}
			
			return this;
			
		}
	}
	
	jui2.overlay = function(opt) {
        return new overlay(opt);
    };
	
	jui2.overlay.fn = overlay.prototype;
	
	jui2.overlay.fn.disable = function(){
		
	}
	
	jui2.overlay.fn.enable = function(){
		
	}
	
	jui2.overlay.fn.close = function(){
		this[0].hide()
	}
	
	jui2.overlay.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
}(jQuery))