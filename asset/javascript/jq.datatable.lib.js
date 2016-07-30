/**
* 
* untuk fnReloadAjax dengan mempertahankan current page
* 
**/
$.fn.dataTableExt.oApi.fnRedrawCurrent = function(oSettings) {

	if(oSettings.oFeatures.bServerSide === true){
		var before = oSettings._iDisplayStart;
			 
		oSettings.oApi._fnReDraw(oSettings);
		// iDisplayStart has been reset to zero - so lets change it back
		oSettings._iDisplayStart = before;
		oSettings.oApi._fnCalculateEnd(oSettings);
	}
				  
	// draw the 'current' page
	oSettings.oApi._fnDraw(oSettings);
	
};