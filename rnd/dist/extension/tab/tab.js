/**
 * @classdesc Extension for editable table based from jui form input
 * @class editable @extension table
 */
(function($){
  head.load(jui2.path+'extension/tab/tab.css')
  jui2.attrChange['j-toolbar_type'] = function(el, oldVal, newVal){
    if(newVal == 'tab'){
      var container;
      if($(el).parents('j-hslider').length>0){
        container = $(el).parents('j-hslider')
        container.children('div').css('overflow', 'visible')
      }
      else{
        container = $(el)
      }
      container.css('overflow', 'visible').next().css('border-top', '0px');
      $(el).undelegate('j-button', 'click').delegate('j-button', 'click', function(){
        $(this).addClass('j-tab-active').siblings().removeClass('j-tab-active')
        if($(this).attr('for'))
          $($(this).attr('for')).show().siblings().hide()
      })
      if($(el).find('.j-tab-active').length == 0)
        if($(el).find('[active=true]').length > 0){
          $(el).find('[active=true]').click().removeAttr('active')
        }
        else
          $(el).find('j-button').eq(0).click()
    }
  }

}(jQuery))
