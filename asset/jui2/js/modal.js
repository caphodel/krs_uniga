(function($){
	
	var modal = function(opt){
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
				content: '',
				event: {}
			}
			
			$.extend(true, defaults, opt);
			
			var content = jui2.tmpl.tmpl_modal(defaults);
			
			/*jui2.bar({
				parent: content.find('.j-modal-top-toolbar'),
				items:['-', {
					role: 'button',
					icon: 'fa-times',
					event: {
						click: function(){
							console.log('close');
						}
					}
				}]
			})*/
			
			var output = jui2.overlay({
				event: defaults.event,
				overlayTarget: 'body',
				'class': 'j-background-transparent j-modal-overlay',
				id: defaults.id,
				content: content
			})
			
			jui2.bar({
				parent: $(output[0]).find('.j-modal-top-toolbar'),
				items:['-', {
					role: 'button',
					icon: 'fa-times',
					event: {
						click: function(){
							self.destroy()
						}
					}
				}]
			})
			
			Midway()
			Midway()
			
			//self.loadingMask = jui2.loadingMask($(output[0]))
			
			$.ajax({
				url: defaults.content
			}).done(function(content){
				$(output[0]).find('.j-modal-content').append(content)
				//self.loadingMask.destroy()
			})
			//setTimeout(function(){Midway();console.log('asd')}, 2000)
			
			/*if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}*/
			
			output[0].jui2 = this;
			this[0] = output[0];
			this.length = 1;
		
			return this;
			
		}
	}
	
	jui2.modal = function(opt) {
        return new modal(opt);
    };
	
	jui2.modal.fn = modal.prototype;
	
	jui2.modal.fn.disable = function(){
		
	}
	
	jui2.modal.fn.enable = function(){
		
	}
	
	jui2.modal.fn.close = function(){
		this[0].hide()
	}
	
	jui2.modal.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
}(jQuery))