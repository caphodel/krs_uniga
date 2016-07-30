(function($){
	
	var yearPicker = function(opt){
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
			var self = this;
		
			if(!opt){
				var opt = {}
			}
			var defaults = {
				id: 'j-'+jui2.random(8, 'aA#'),
				disabled: false,
				event: {},
				parent: 'body',
				year: parseInt(moment().format('YYYY'))
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_yearPicker(defaults));
			
			if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}
			//generate top toolbar
			jui2.bar({
				parent: output.find('.j-yearPicker-top-toolbar'),
				'class': 'j-bg-inherit',
				items: ['-', {
					role: 'button',
					icon: 'fa-chevron-left',
					'class': 'j-bg-inherit j-border-inherit',
					event:{
						click: function(){
							output[0].jui2.changeYear(-10)
						}
					}
				}, '-', {
					role: 'button',
					icon: 'fa-chevron-right',
					'class': 'j-bg-inherit j-border-inherit',
					event:{
						click: function(){
							output[0].jui2.changeYear(10)
						}
					}
				}, '-']
			})
			
			output[0].jui2 = this;
			output[0].jui2.value= defaults.year
			
			output.find('tbody td').click(function(){
				output[0].jui2.value = $(this).text();
				output.find('tbody td').removeClass('j-yearPicker-selected');
				$(this).addClass('j-yearPicker-selected');
			})
			
			this[0] = output[0];
			this.length = 1;
			
			return this;
			
		}
	}
	
	jui2.yearPicker = function(opt) {
        return new yearPicker(opt);
    };
	
	jui2.yearPicker.fn = yearPicker.prototype;
	
	jui2.yearPicker.fn.disable = function(){
		if(!this.overlay)
			this.overlay = jui2.overlay({overlayTarget: this[0]})
	}
	
	jui2.yearPicker.fn.enable = function(){
		if(this.overlay){
			this.overlay.destroy();
			this.overlay = null
		}
	}
	
	jui2.yearPicker.fn.changeYear = function(offset){
		var el = $(this[0]).find('tbody td'), self = this;

		el.removeClass('j-yearPicker-selected');
		el.each(function(){
			var el = $(this);
			el.text(parseInt(el.text())+offset)
			if(el.text()==self.value)
				el.addClass('j-yearPicker-selected');
		})
	}
	
	jui2.yearPicker.fn.close = function(){
		$(this[0]).hide()
	}
	
	jui2.yearPicker.fn.destroy = function(){
		$(this[0]).remove()
	}
	
}(jQuery))