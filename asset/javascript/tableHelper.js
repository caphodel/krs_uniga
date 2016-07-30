function __ta_wrapper()
{return '<div id="envi"><div id="t"><div id="tTable"><div><div id="tPanel"><input type="button" name="fadd" id="fadd" value="Tambah" /><input type="button" name="fedit" id="fedit" value="Lihat" /><input type="button" name="frefresh" id="frefresh" value="Refresh" /><div><div id="f"><div id="fForm"><form></form></div><div id="fPanel"><input type="button" name="fsave" id="fsave" value="Save" /><input type="button" name="freset" id="freset" value="Reset" /><input type="button" name="fclose" id="fclose" value="Tutup" /></div></div></div><div id="tmpform" style="display:none;"></div>';}

function createTableAction(args)
{
	var params =  {
		tableID : "#tableID",
		listSource : "dialog/notification",
		formSource : "dialog/notification",
		actionTarget : "dialog/notificaion",		
		columnID : 0,
		renderID : "#content"
	}
	
	args = args || params ; 
	$.extend(params, args);
	
	// render htmlnya dulu
	var render = __ta_wrapper();
	$(params.renderID).html('');
	$(params.renderID).html( __ta_wrapper());
	// alert($(params.tableID).html());
	var myTable = $(params.tableID);
	alert(myTable.html());
	/**
	var envi = $(params.renderID).find("div#envi");
	var tpanel = $(params.renderID).find('tPanel');
	var fform = $(params.renderID).find('form');
	var fpanel = $(params.renderID).find('fPanel');
	var trows = ttable.find('tbody');
	var tmpform = envi.find('div#tmpform');
	
	
	
	// envi.find('tTable').html($(params.tableID).html());
	// render dulu tablenya ke dalam envi 
	// var ttable = $(params.renderID).find('table');
	// alert(envi.find(tTable).html());
	// alert('test');
	/**
	// generate tablenya dulu 
	var otable = ttable.dataTable({
		"sAjaxSource" : site_url + params.listSource,
		"bServerSide": true,
		"sPaginationType": "full_numbers",
		"bAutoWidth": true,
		"bFilter": true
	});
	
	// buat action tablenya 
	// 1. buat selection row-nya dulu
	var selectedID = null;
	var selectedRow = '';
	trows.mousedown(function(event){
			
		// remove css selected rows
		var pos = otable.fnGetPosition(event.target.parentNode);
		selectedRow = pos ; 
		var data = otable.fnGetData(pos);
		selectedID = data[params.columnID];
			
		// add css to selected rows
	});
	**/
	
}