(function($){
	jui2.loadingMask = function(target){
		return jui2.overlay({
			overlayTarget: target,
			'class': 'j-background-transparent j-textCenter',
			content: jui2.tmpl.tmpl_loadingMask(),
			event: {
				afterRender: function(self){
					$(self[0]).find('div').flexVerticalCenter()
				}
			}
		})
	}
}(jQuery))