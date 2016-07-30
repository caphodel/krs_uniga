function createDatePicker(params) {

	var envi = $(params.id);
	var input = envi.find('.cal_input');
	var desc = envi.find('.com_desc');
	var btn = envi.find('.com_popup');	
	var df = 'yy-mm-dd'; // var df = 'dd/mm/yy';
	
	input.datepicker({
		altField : desc,
		altFormat : 'D, d MM yy',
		dateFormat : df,
		constraintInput : true,
		changeYear: true,
		changeMonth: true,
		showOtherMonths : true,
		showOn : null,
		showAnim : "drop"
	});
	
	btn.click(function() {	
		if (!$(input).attr('disabled')) input.datepicker('show');
	});	
}

function postJSON(url, data, success) {	
	$.ajax({
	  url: url,
	  dataType: 'json',
	  type : 'POST', 
	  data: data,
	  success: success
	});
}

function create_lookup(args)
{
	var params = {		
		lookup_id : '', 
		lookup_table : '',		
		lookup_listsource : 'message/listsource', 
		lookup_datasource : 'message/datasource',		
		lookup_detail : true, 
		lookup_width : 400,
		lookup_disable : false, 
		column_id : 0, 
		lookup_enable : false
	};
	$.extend(params, args);
	
	var envi = $(params.lookup_table);
	var tabl = envi.find('table');
	var rows = envi.find('tbody');
	var panl = envi.find('#panel');
	
	var fenvi 	= $(params.lookup_id);
	var finput  = fenvi.find('.com_input');
	var fbutton = fenvi.find('.com_popup');
	var fdesc 	= fenvi.find('.com_desc');
	var fid 	= fenvi.find('.com_id');
	
	if (params.lookup_detail) {
		fenvi.append('<div class="com_detail"></div>');
		var fdetail = fenvi.find('.com_detail');
	}
	
	var getData = function(data_mode, data_id) {
		postJSON(site_url + "/" + params.lookup_datasource, {mode : data_mode, data : data_id}, function(json) {
			finput.val(json.value);
			fdesc.html(json.desc);
			fid.val(json.id);
			if (params.lookup_detail) fdetail.html(json.detail)
			if(params.onSelect != null) params.onSelect(data_id);
		});
	}
	
	var postJSON_lookup = function(url, data, success) {
		
		var q = envi.find('#q').val();
		var kat = envi.find('#kategori').val();		
		var qvalue = (q == undefined ? '' : q);
		var katvalue = (kat == undefined ? '' : kat);
		
		if (data == null) data = new Array();
		data.push( { "name" : "q", "value" : qvalue } );
		data.push( { "name" : "kat", "value":  katvalue } );		
	
		$.ajax({
		  url: url,
		  dataType: 'json',
		  type : 'POST', 
		  data: data,
		  success: success
		});		
	}
	
	// render to jqm dialog window	
	var oTable = tabl.dataTable({
		"bProcessing": true,        
		"bJQueryUI": false,
		"sAjaxSource": site_url + "/" + params.lookup_listsource,
		"sPaginationType": "full_numbers",
		"bServerSide": true,
		"fnServerData" : postJSON_lookup
	});	
	
	envi.addClass('jqmWindow');
	envi.jqm();
	
	oTable.fnSetColumnVis(0, false); // hidden colomn 1
	tabl.after($(panl));
	
	$('.dataTable').css('clear','both');
	$('.dataTable').find('thead').css('background-color','#F4F6F8');
	$('.dataTables_info').css("width","40%");

	fbutton.click(function(){
		var pos = finput.offset();
		envi.css('width', params.lookup_width);
		envi.css('background-color','#e5e8e3');
		envi.css('left', pos.left);
		envi.css('top', pos.top + finput.outerHeight());
		tabl.css('width',params.lookup_width);
		if ($(finput).attr('disabled') || params.lookup_disable == true ) return;
		else envi.jqmShow();		
	});
	
	getData(1, fid.val());
	
	selectedId = '';
	rows.mousedown(function(event) {
		$(oTable.fnSettings().aoData).each(function (){
			// $(this.nTr).removeClass('row_selected');
			$(this.nTr).removeAttr('style');
		});		
		var pos = oTable.fnGetPosition(event.target.parentNode);
		var data = oTable.fnGetData(pos);
		selectedId = data[params.column_id];
		// $(event.target.parentNode).addClass('row_selected');
		$(event.target.parentNode).css('background-color','maroon');
		$(event.target.parentNode).css('color','white');
	});
	
	rows.dblclick(function(event) {
		$(oTable.fnSettings().aoData).each(function (){
			$(this.nTr).removeClass('row_selected');
		});
		
		var pos = oTable.fnGetPosition(event.target.parentNode);
		var data = oTable.fnGetData(pos);
		selectedId = data[params.column_id];
		
		fid.val(selectedId);
		getData(1, fid.val());
		
		$(event.target.parentNode).addClass('row_selected');
		envi.jqmHide();
	});
	
	panl.find('input[type="button"]').click(function() {
		
		var ajaxData = "";
		
		switch ($(this).attr('id'))	{
		case 'choose':
			
			if (selectedId == '') {
				alert('Please select 1 data');
				return;
			}
			
			fid.val(selectedId);
			getData(1, fid.val());
			
			envi.jqmHide();
			break;
			
		case 'refresh':
			oTable.fnReloadAjax();			
			break;
		
		case 'cancel':
			envi.jqmHide();
			break;
		}
		
	});
	
	if(params.lookup_enable){
		finput.removeAttr('readonly');
		finput.removeAttr('style');
		finput.css('background-color', 'white');
	}
	
	return oTable ; 
}