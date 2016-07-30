(function($){
	
	var calendar = function(opt){
		var defaults = {id: 'j-no-id'}, self = this;
		
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
				event: {},
				type: 'calendar',
				lang: 'en',
				date: moment().format('DD-MM-YYYY')
			}
			
			$.extend(true, defaults, opt);
			
			if(moment(defaults.date, 'DD-MM-YYYY').format()=='Invalid date')
				defaults.date = moment().format('DD-MM-YYYY');
			defaults.datesOfMonth = jui2.tmpl.tmpl_calendarDate({
				weeks: self.getDatesOfMonth(moment().diff(moment(defaults.date, 'DD-MM-YYYY'), 'month'))
			})
			defaults.dateName = self.lang[defaults.lang];
			
			var output = $(jui2.tmpl.tmpl_calendar(defaults));
			
			//generate top toolbar
			jui2.bar({
				parent: output.find('.j-calendar-top-toolbar'),
				//'class': 'j-bg-inherit',
				items: [{
					role: 'button',
					icon: 'fa-chevron-left',
					'class': 'j-bg-inherit j-border-inherit',
					event:{
						click: function(){
							self.changeMonth(-1)
						}
					}
				}, '-', {
					role: 'button',
					label: moment(defaults.date, 'DD-MM-YYYY').format('MMMM YYYY'),
					'class': 'j-bg-inherit j-calendar-select-month j-border-inherit',
					event:{
						click: function(){
							self.monthPicker();
						}
					}
				}, '-', {
					role: 'button',
					icon: 'fa-chevron-right',
					'class': 'j-bg-inherit j-border-inherit',
					event:{
						click: function(){
							self.changeMonth(1)
						}
					}
				}]
			})
			
			//generate bottom toolbar
			jui2.bar({
				parent: output.find('.j-calendar-bottom-toolbar'),
				//'class': 'j-bg-inherit',
				items: ['-', {
					role: 'button',
					label: 'Today',
					//'class': 'j-border-inherit',
					event:{
						click: function(){
							self.month = 0
							self.changeMonth(0);
							self.value = moment().format('DD-MM-YYYY');
							output.find('[value='+self.value+']').addClass('j-calendar-selected')
							if(self.event.click)
								self.event.click(self);
						}
					}
				}, '-']
			})
			
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
			
			output[0].jui2.month= 0;
			output[0].jui2.value= defaults.date;
			output[0].jui2.date= defaults.date;
			output[0].jui2.event= defaults.event;
			output.find('[value='+self.value+']').addClass('j-calendar-selected')
			
			if(defaults.event.click)
				this.event.click = defaults.event.click;

			this.length = 1;
			
			output.find('tbody td').click(function(){
				output[0].jui2.value = $(this).attr('value');
				output.find('tbody td').removeClass('j-calendar-selected');
				$(this).addClass('j-calendar-selected');
				
				if(output[0].jui2.event.click)
					output[0].jui2.event.click(self);
			})
			
			this[0] = output[0];
			this.length = 1;
			
			return this;
			
		}
	}
	
	jui2.calendar = function(opt) {
        return new calendar(opt);
    };
	
	jui2.calendar.fn = calendar.prototype;
	
	jui2.calendar.fn.disable = function(){
		if(!this[0].hasClass('j-disabled')){
			this[0].addClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events._click = this[0] .data().events.click;
				this[0] .data().events.click = null;
			}
		}
	}
	
	jui2.calendar.fn.enable = function(){
		if(this[0].hasClass('j-disabled')){
			this[0].removeClass('j-disabled');
			if(this[0] .data().events){
				this[0] .data().events.click = this[0] .data().events._click;
				this[0] .data().events._click = null;
			}
		}
	}
	
	jui2.calendar.fn.changeMonth = function(offset){
		var self = this;
		var el = $(this[0])
		this.month += offset;
		el.find('tbody').empty().append(jui2.tmpl.tmpl_calendarDate({weeks: this.getDatesOfMonth(this.month)}))
		el.find('.j-calendar-select-month span span').text(moment().add('M', this.month).format('MMMM YYYY'))
		el.find('tbody td').click(function(){
			self.value = $(this).attr('value');
			el.find('tbody td').removeClass('j-calendar-selected');
			$(this).addClass('j-calendar-selected');
			if(self.event.click)
				self.event.click(self);
		})
	}
	
	jui2.calendar.fn.getDatesOfMonth = function(offset){
		if(!offset)
			offset = 0;
		var firstDate = moment().add('M', offset).startOf('month').startOf('week');
		var weeks = [];
		for(var i=0;i<42;i++){
			var weekNumber = Math.floor(i/7)
			if(!weeks[weekNumber]){
				weeks[weekNumber] = []
			}
			weeks[weekNumber].push({text: firstDate.get('D'), value: firstDate.format('DD-MM-YYYY')})
			firstDate.add('d',1)
		}
		return weeks;
	}
	
	jui2.calendar.fn.monthPicker = function(){
		var calendar = this;
		var overlay = jui2.overlay({id: $(this[0]).attr('id')+'-overlay', overlayTarget: this[0], 'class': 'j-calendar-overlay', content:'<div style="flex:1;display: flex;"></div>'})
		var month = jui2.monthPicker({parent: '#'+$(this[0]).attr('id')+'-overlay div', 'class': 'j-calendar-monthPicker', month: calendar.value.split('-')[1]})
		var year = jui2.yearPicker({parent: '#'+$(this[0]).attr('id')+'-overlay div', 'class': 'j-calendar-yearPicker', year: calendar.value.split('-')[2]})
		calendar.overlay = overlay;
		jui2.bar({
			//'class': 'j-bg-inherit',
			parent: '#'+$(this[0]).attr('id')+'-overlay',
			items:['-', {
				role: 'button',
				label: 'OK',
				'class': 'j-border-inherit',
				event: {
					click: function(self){
						calendar.changeMonth(moment(month.value+'-'+year.value, 'MM-YYYY').diff(moment($(calendar[0]).find('.j-calendar-select-month').text(),'MMM-YYYY'), 'month'));
						overlay.destroy();
						calendar.overlay = false;
					}
				}
			},{
				role: 'button',
				label: 'Cancel',
				'class': 'j-border-inherit',
				event: {
					click: function(self){
						overlay.destroy();
						calendar.overlay = false;
					}
				}
			}, '-']
		})
	}
	
	jui2.calendar.fn.destroy = function(){
		this[0].remove()
		this[0] = null;
	}
	
	jui2.calendar.fn.lang = {
		en: {
			sun: {
				'short': 'Sun',
				'long': 'Sunday'
			},
			mon: {
				'short': 'Mon',
				'long': 'Monday'
			},
			tue: {
				'short': 'Tue',
				'long': 'Tuesday'
			},
			wed: {
				'short': 'Wed',
				'long': 'Wednesday'
			},
			thu: {
				'short': 'Thu',
				'long': 'Thursday'
			},
			fri: {
				'short': 'Fri',
				'long': 'Friday'
			},
			sat: {
				'short': 'Sat',
				'long': 'Saturday'
			}
		}
	}
	
}(jQuery))