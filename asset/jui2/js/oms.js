(function($){

	jui2.oms = {
		server: {},
		append: function(name, fn, server){
			if(this.server[server])
				if(!this.server[server].client[name])
					this.server[server].client[name] = fn;
		},
		remove: function(name, server){
			delete this.server[server].client[name];
		},
		createServer: function(fn, name){
			this.server[name] = {
				fn: fn,
				client: {}
			}
		},
		removeServer: function(name){
			delete this.server[name];
		},
		sendToClients: function(msg, server){
			$.each(this.server[server].client, function(i, val){
				val(msg);
			})
		},
		sendToClient: function(msg, client){
			this.server[server].clients[client](msg);
		},
		sendToServer: function(msg, server){
			this.server[server].fn(msg);
		}
	}

}(jQuery))