var jui2;

(function($) {

    jui2 = function(selector) {
        return new Jui(selector);
    };

    var Jui = function(selector) {
        // Lets make a really simplistic selector implementation for demo purposes
        var nodes = $(selector);
        for (var i = 0; i < nodes.length; i++) {
			if(nodes[i].hasAttribute('role'))
				this[i] = jui2[nodes[i].getAttribute('role')]({id: nodes[i].getAttribute('id')});
			else
				this[i] = nodes[i];
        }
        this.length = nodes.length;
        return this;
    };

    // Expose the prototype object via jui2.fn so methods can be added later
    jui2.fn = Jui.prototype = {
        // API Methods
        /*hide: function() {
            for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'none';
            }
            return this;
        },
        remove: function() {
            for (var i = 0; i < this.length; i++) {
                this[i].parentNode.removeChild(this[i]);
            }
            return this;
        }*/
        // More methods here, each using 'return this', to enable chaining
    };
	
	var random = function (length, chars) {
		var mask = '';
		if (chars.indexOf('a') > -1)
			mask += 'abcdefghijklmnopqrstuvwxyz';
		if (chars.indexOf('A') > -1)
			mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (chars.indexOf('#') > -1)
			mask += '0123456789';
		if (chars.indexOf('!') > -1)
			mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
		var result = '';
		for (var i = length; i > 0; --i)
			result += mask[Math.round(Math.random() * (mask.length - 1))];
		return result;
	}
	
	jui2.random = random;
	
	jui2.messaging = {
		addServer: function(name, event, target){
			var self = this;
			this.client[name] = [];
			self.name = name
			this.server[name] = function(e){
				var e = e;
				$.each(self.client[self.name], function(i, val){
					val(e);
				})
			}
			$(target).bind(event, this.server[name])
		},
		addClient: function(serverName, fn){
			if(this.client[serverName]){
				this.client[serverName].push(fn);
				return this.client[serverName].length;
			}
		},
		client: {},
		server: {}
	}
	
	jui2.lang = {};
	
	jui2.findHighestZIndex = function(selector){
		var elems = $(selector);
		var highest = 0;
		for (var i = 0; i < elems.length; i++){
			var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
			if ((zindex > highest) && (zindex != 'auto')){
				highest = zindex;
			}
		}
		return highest;
	}
	
	jui2.arrayToJson = function(arr) {
		var ret = [];
		for(i in arr){
			var i = i;
			ret[i] = {};
			for(z in arr[i]){
				ret[i][z] = arr[i][z];
			}
		}
		return ret;
	}
	
	$.fn.jui2Serialize = function(){
		value = {};
		this.find('[role=textField],[role=textArea],[role=dateField],[role=comboField],[role=datePicker],[role=passwordField]').each(function(){
			var el = $(this)
			if(el.attr('role')=='textArea'){
				value[el.attr('name')?el.attr('name'):el.attr('id')] = el.find('j-textArea-editor').html()
				if(value[el.attr('name')?el.attr('name'):el.attr('id')]==null)
					value[el.attr('name')?el.attr('name'):el.attr('id')] = ''
			}
			else if(el.attr('role')=='comboField')
				value[el.attr('name')?el.attr('name'):el.attr('id')] = el.find('input[type=hidden]').val()
			else
				value[el.attr('name')?el.attr('name'):el.attr('id')] = el.find('input').val()
		});
		return value;
	}

}(jQuery))

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
	lvalue = parseFloat(lvalue);
	rvalue = parseFloat(rvalue);

	return {
		"+": lvalue + rvalue,
		"-": lvalue - rvalue,
		"*": lvalue * rvalue,
		"/": lvalue / rvalue,
		"%": lvalue % rvalue
	}[operator];
});

Handlebars.registerHelper('for', function(from, to, incr, block) {
	var accum = '';
	for(var i = from; i < to; i += incr)
		accum += block.fn(i);
	return accum;
});

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

	if (arguments.length < 3)
		throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

	operator = options.hash.operator || "==";

	var operators = {
		'==':       function(l,r) { return l == r; },
		'===':      function(l,r) { return l === r; },
		'!=':       function(l,r) { return l != r; },
		'<':        function(l,r) { return l < r; },
		'>':        function(l,r) { return l > r; },
		'<=':       function(l,r) { return l <= r; },
		'>=':       function(l,r) { return l >= r; },
		'typeof':   function(l,r) { return typeof l == r; }
	}

	if (!operators[operator])
		throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

	var result = operators[operator](lvalue,rvalue);

	if( result ) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}

});

Handlebars.registerHelper('checkarray', function(lvalue, rvalue, options) {
	if( typeof lvalue[rvalue] != 'undefined') {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}

});

$( document ).ready(function() {
	jui2.oms.createServer(function(){}, 'body');
	$(document).click(function(e){
		jui2.oms.sendToClients(e, 'body')
	})
});

(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);