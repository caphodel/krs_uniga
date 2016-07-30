(function($){
	
	Handlebars.registerHelper('jui2MenuFnChildMenu', function(items) {
		return new Handlebars.SafeString(
			JSON.stringify(items)
		);
	});
	
	var menu = function(opt){
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
				parent: 'body',
				menu: []
			}
			
			$.extend(true, defaults, opt);
			
			var output = $(jui2.tmpl.tmpl_menu(defaults));
			if(target.length > 0){
				target.replaceWith(output);
			}
			else{
				$('body').append(output);
			}
			
			var haveChild = output.find('.j-menu-item').not('[items="undefined"]')//.siblings()
			var i = haveChild.length;
			while(i--){
				$(haveChild[i]).attr('parent', true).removeAttr('items');
				var menu = defaults.menu[$(haveChild[i]).index()].menu;
				jui2.menu({parent: $(haveChild[i]), menu: menu, child: true, parentId: defaults.id});
			}
			
			output.hide();
			
			output[0].jui2 = this;
			
			var targetAttachment = 'bottom left';
			if(defaults.child){
				targetAttachment = 'top right';
			}
			
			if($('#'+output.attr('id')).length>0){
				output[0].jui2.tether = new Tether({
					element: output,
					target: $(defaults.parent),
					attachment: 'top left',
					targetAttachment: targetAttachment,
					constraints: [{
						to: 'window',
						attachment: 'together none',
						pin: true
					}]
				});
			}
			if(defaults.child)
				$(defaults.parent).mouseover(function(){
					$('.j-menu-'+defaults.parentId).hide();
					output[0].jui2.showMenu()
				}).siblings().not('[parent=true]').mouseover(function(){
					$('.j-menu-'+defaults.parentId).hide();
				})
			
			this.length = 1;
			
			output.click(function(e){
				if(defaults.menu[$(e.target).closest('.j-menu-item').index()].event)
					if(defaults.menu[$(e.target).closest('.j-menu-item').index()].event.click)
						defaults.menu[$(e.target).closest('.j-menu-item').index()].event.click()
			})
			
			jui2.oms.append(output.attr('id'), function(e){
				if(!$(e.target).closest(output).length == 1 && $(e.target).closest($(defaults.parent)).length == 0){
					if(!$(e.target).closest('.j-menu-item').attr('parent'))
						output.hide();
						output.css('z-index', 0)
				}
				else{
					if(!output.is(':visible'))
						output[0].jui2.showMenu()
					else
						if(!$(e.target).closest('.j-menu-item').attr('parent')){
							output.hide()
							output.css('z-index', 0)
						}
				}
			}, 'body')
			
			this[0] = output[0];
			return this;
			
		}
	}
	
	jui2.menu = function(opt) {
        return new menu(opt);
    };
	
	jui2.menu.fn = menu.prototype;
	
	jui2.menu.fn.showMenu = function(){
		var el = $(this[0])
		if(!el.is(':visible'))
			el.show();
		if($(this[0].jui2.tether.target).attr('parent')){
			if($(this[0].jui2.tether.target).parent().position().left+$(this[0].jui2.tether.target).parent().width()+$(this[0].jui2.tether.element).width()>=$(document).width()){
				this[0].jui2.tether.setOptions({
					element: $(this[0].jui2.tether.element),
					target: $(this[0].jui2.tether.target),
					attachment: 'top right',
					targetAttachment: 'top left',
					constraints: [{
						to: 'window',
						attachment: 'together none',
						pin: true
					}]
				})
			}
			else if(this[0].jui2.tether.attachment.left == 'right'){
				this[0].jui2.tether.setOptions({
					element: $(this[0].jui2.tether.element),
					target: $(this[0].jui2.tether.target),
					attachment: 'top left',
					targetAttachment: 'top right',
					constraints: [{
						to: 'window',
						attachment: 'together none',
						pin: true
					}]
				})
			}
		}
		this[0].jui2.tether.position();
		el.css('z-index', jui2.findHighestZIndex('.j-body')+1)
	}
	
}(jQuery))