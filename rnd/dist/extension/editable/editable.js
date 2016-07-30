/**
 * @classdesc Extension for editable table based from jui form input
 * @class editable @extension table
 */
(function($){

  jui2.attrChange['j-datefield_target'] =
  jui2.attrChange['j-datefield_clicktarget'] =
  jui2.attrChange['j-datefield_cancel'] =
  jui2.attrChange['j-datefield_submit'] =

  jui2.attrChange['j-combofield_target'] =
  jui2.attrChange['j-combofield_clicktarget'] =
  jui2.attrChange['j-combofield_cancel'] =
  jui2.attrChange['j-combofield_submit'] =

  function(el, oldVal, newVal){
    if(newVal){
      if(oldVal){

      }

      var data = {
  			cancel: $(el).attr('cancel') || 'Cancel',
  			submit: $(el).attr('submit') || 'Submit'
  		}

      $(el).hide();
      if($(el).attr('target') && $(el).attr('clicktarget')){
        var target = $(el).attr('target'), clicktarget = $(el).attr('clicktarget')
        $target = $(target);
        $target.off('afterdraw.'+$(el).attr('id')).on('afterdraw.'+$(el).attr('id'), function(e){
          $target.find('> .j-table-body > table > tbody > tr > '+clicktarget).on('dblclick doubletap', function(){
            var tr = $(this).parent()
            if(tr.find('.j-table-editable').length == 0){
              tr.children().hide()
              var text = $(el).children('label').text()
    					tr.append('<td class="j-table-editable" colspan="'+tr.children().length+'"></td>')
              $(el).appendTo(tr.find('.j-table-editable')).show()
              tr.find('.j-table-editable').append(jui2.tmpl['tableInPlaceForm'](data))
              tr.find('#'+$(el).attr('id')).val($target[0].data[tr.index()][$(el).attr('recordno')])
            }

            tr.find('.j-table-form-cancel').off('click').on('click', function(){
              var td = $(this).parent().parent()
              td.parent().children().show()
              /**
               * Fires when cancel button clicked
               * @event cancel
               * @param {object} event Event object
               * @param  {Object} el jQuery object
               * @memberof tableInPlaceForm @extension table
               */
              if($(el).attr('cancel'))
                window[$(el).attr('cancel')](td)
              td.remove()
            })

            tr.find('.j-table-form-submit').off('click').on('click', function(){
              var td = $(this).parent().parent()
              td.parent().children().show()
              /**
               * Fires when submit button clicked
               * @event submit
               * @param {object} event Event object
               * @param  {Object} el jQuery object
               * @memberof tableInPlaceForm @extension table
               */
              if($(el).attr('submit'))
                window[$(el).attr('submit')](td)
              //el.remove()
            })
            tr.children('.j-table-editable').width($target.find('> .j-table-body > table').width());
          })
        });
      }
    }
  }

}(jQuery))
