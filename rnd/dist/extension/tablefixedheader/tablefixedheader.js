/**
 * @classdesc Extension for fixed header table
 * @class editable @extension table
 */
(function($){

  jui2.attrChange['j-table_fixedheader'] = function(el, oldVal, newVal){
    if(newVal){
      if($(el).find('> .j-table-body > .j-table-fixedheader').length == 0){
        var div = $('<div class="j-table-fixedheader"></div>').css({
          'position':'fixed',
          'top': newVal
        }).width($(el).width()).appendTo(el)

        $(el).find('> .j-table-body > table').eq(0)
        .clone().addClass('j-table-fixedheader').css({
          'table-layout': ''
        })/*.width($(el).width())*/.appendTo(div)
        .children('tbody').empty();


        var parentScroll = $(el).parents().filter(function(){
            return $(this).hasScrollBar();
        })

        if(parentScroll.length == 0 || parentScroll.prop('tagName')=='HTML'){
          parentScroll = $(window)
        }

        $(el).find('> .j-table-fixedheader')[0].resize = false

        var onscroll = function(){
          var fixedEl = $(el).find('> .j-table-fixedheader')
          if(fixedEl.length > 0)
            if(fixedEl.touching($(el).find('> .j-table-body')).length==0){
              fixedEl.hide()[0].resize = false
            }
            else{
              var td = $(el).find('> .j-table-body > table:first-child > tbody > tr:first-child > td'), th = fixedEl.find('th');
              if(!fixedEl[0].resize){
                td.each(function(i, val){
                  th.eq(i).children().outerWidth($(val).outerWidth())
                })
              }
              fixedEl.show()[0].resize = true
            }
        }

        $(el).find('> .j-table-fixedheader').scroll(function(){
          $(el).find('> .j-table-body').scrollLeft($(this).scrollLeft())
        })

        $(el).find('> .j-table-body').scroll(function(){
          $(el).find('> .j-table-fixedheader').scrollLeft($(this).scrollLeft())
        })

        $(el).find('> .j-table-fixedheader j-resize').off('afterresize').on('afterresize', function(){
          var $self = $(this), w = $(this).parent().outerWidth()
    			$self.parent().parent().width(w)
    			$self.css('left', '')
          //console.log($(el).find('>.j-table-body > table:first-child > thead > th'), $self.parent().text().trim())
    			$(el).find('>.j-table-body > table:first-child > thead > tr > th').filter(function(){
    				return $(this).text().trim()==$self.parent().text().trim()
    			}).width(w)
          $(el).find('> .j-table-body > table:first-child > thead > tr > th > div').each(function(i, val){
    				$(val).css('width', '')
    			})
    		}).on('beforeresize', function(){
    			var divs = $(el).find('>.j-table-body > table:first-child > thead > tr > th > div'),
    			ws = divs.map(function(i, val){
    			  return $(val).width()
    			}).get()
    			divs.each(function(i, val){
    				var $el = $(val)
    				$el.width(ws[i]);
    			})
    		})

        parentScroll.scroll(onscroll)

        onscroll();
      }
    }
  }

}(jQuery))
