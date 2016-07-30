function postJSON(url, data, success) {	
	$.ajax({
	  url: url,
	  dataType: 'json',
	  type : 'POST', 
	  data: data,
	  success: success
	});
}

function create_table_slideForm(args)
{
	var params = {
		form_id : "#form_id",
		form_table : '#table_id',
		forn_source : '', 
		forn_table_listsource : '', 
		form_submit : '', 
		column_id : 0 ,
	};
	
	$.extend(params, args); 
}

function create_table_dialogForm(args)
{
	var params = {
		form_id : "#form_id",
		form_table : '#table_id',
		form_source : ''
	};
	$.extend(params, args); 
}

function create_form_subTable(args)
{
	var params = {
		form_envi : '#envi',
		form_id : "#form_id",
		form_subTable : '#subTable_id', 
		form_source : '', 
		form_subTable_listsource : '', 
		form_subDialog_source : '', 
		form_submit : '', 
		form_subDialog_submit : '', 
		value_id : undefined, // default insert, if filled then edit
		column_id : 0
	};
	
	$.extend(params, args); 
	
	var envi = $(params.form_envi);
	var tabl = envi.find('table');
	var rows = envi.find('tbody');
	var panl = envi.find('#panel');
	var form = envi.find('#form_id');
	var fdialog = envi.find('#fdialog');
	
	var postJSON_data = function(url, data, success) {
	
		var name = 'id';
		var value = ( params.value_id == undefined ) ?  null : params.value_id;
		
		if (data == null) data = new Array();
		data.push({"name" : name, "value" : value});
		
		$.ajax({
		  url: url,
		  dataType: 'json',
		  type : 'POST', 
		  data: data,
		  success: success
		});		
	}
	
	var oTable = tabl.dataTable({
		"bProcessing": true,        
		"bJQueryUI": false,
		"sAjaxSource": site_url + "/" + params.form_subTable_listsource,
		"fnServerData" : postJSON_data
	});	
	
	fdialog.dialog({
        autoOpen: false,
        height: 400,
        width: 600,
        modal: true,
        buttons: {
			"Add to Table": function() {
				$.ajax({
					url : , 
					data : , 
					type : 'post',
					dataType : 'json', 
					success : function(response){
						var dresp = $.parseJSON(response);
						oTable.fnAddData(dresp.data);
					}
				});
            },
			
            "Clear Input": function() {
                // clear input
            }
        }
	});
	
	
	panl.find('input[type="button"]').click(function(){
		switch($(this).attr('id')){
			
			/** add data **/
			case 'add' : 
				
				// open dialog 
				fdialog.dialog( "open" );
				
				// fill dialog with form 
				ajaxLoadPage({
					url : params.form_subDialog_source , 
					data : null, 
					type : 'post', 
					dataType : 'html', 
					targetDiv : fdialog
				});
				
			break ; 
			
			/** del data **/
			case 'del' : 
			break ; 
			
			/** refresh data **/
			case 'ref' : 
			break ; 
			
			/** update data **/
			case 'upd' : 
			break ; 
		}
	});
	
	form.submit(function(){
		$.ajax({
			url : site_url + params.form_submit, 
			data : $(this).serialize(), 
			type : 'post', 
			dataType : 'json', 
			beforeSend : function(){}, 
			complete : function(){}, 
			success : function(response){
				var resp = $.parseJSON(response);
				if(resp.status != 1) { 
					alert(resp.message);
				}else{
					ajaxLoadPage({
						url : resp.nextPage , 
						data : null, 
						type : 'post', 
						dataType : 'html', 
						targetDiv : '#content'
					});
				}
			}
		});
		
		return false; 
	});
	
	return oTable ; 
	
}