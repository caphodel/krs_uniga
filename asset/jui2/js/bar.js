(function($){
	
	var bar = function(opt){
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
				items: [],
				event: {},
				type: 'bar'
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_bar(defaults));
			if(target.length > 0){
				target.replaceWith(output);
			}
			else if(defaults.parent){
				$(defaults.parent).append(output)
			}
			else{
				$('body').append(output);
			}
			
			for(var i = 0;i<defaults.items.length;i++){
				var obj = defaults.items[i];
				if(obj == '-'){
					jui2.spacer({parent: output});
				}
				else if(!obj.role){
					obj.label = obj.text;
					obj.parent = output;
					jui2.text(obj);
				}
				else{
					obj.parent = output;
					jui2[obj.role](obj);
				}
			}
			
			this[0] = output;
			this.length = 1;
			
			return this;
			
		}
	}
	
	jui2.bar = function(opt) {
        return new bar(opt);
    };
	
	jui2.bar.fn = bar.prototype;
	
	jui2.bar.fn.disable = function(){
		if(!this[0].hasClass('j-disabled')){
			this[0].addClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events._click = this[0] .data().events.click;
				this[0] .data().events.click = null;
			}
		}
	}
	
	jui2.bar.fn.enable = function(){
		if(this[0].hasClass('j-disabled')){
			this[0].removeClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events.click = this[0] .data().events._click;
				this[0] .data().events._click = null;
			}
		}
	}
	
}(jQuery))