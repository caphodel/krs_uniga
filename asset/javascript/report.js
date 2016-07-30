	$(function(){
	
		// load pertama 
		$.ajax({
			url : site + '/secondaryGempolUtil/getMachineLine',
			type : 'POST', 
			data : null, 
			dataType : 'json',
			success : function(response){
				$('select[name="mLine"]').html(response);				
			}
		});
	
		$('select[name="mLine"]').change(function () {
			var str = "";
			$('select[name="mLine"] option:selected').each(function () {
                str += $(this).text();
			});			
			$.ajax({
				url : site + '/secondaryGempolUtil/getMachineUnit',
				data : {'mLine':str}, 
				type : 'POST', 
				dataType : 'json',
				success : function(response){
					$('select[name="mUnit"]').html(response);
				}
			});			
        });

		$('select[name="mUnit"]').change(function(){
			var str = "";
			$('select[name="mUnit"] option:selected').each(function () {
                str += $(this).text();
			});
			$.ajax({
				url : site + '/secondaryGempolUtil/getMachineShift',
				data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : str}, 
				type : 'POST', 
				dataType : 'json',
				success : function(response){
					$('select[name="mShift"]').html(response);					
				}
			});			
		});
		
		var countProdM5 = 0 ; 
		var countProdKDM = 0 ; 
		$('input[name="prodEventRecord"]').click(function(){
			if($('select[name="mLine"]').val() == 'I5' || $('select[name="mLine"]').val() == 'I6'){
				if(countProdM5==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_production_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val(),'topView' : $('input[name="topView"]').val(), 'isOthers' : $('select[name="others"]').val()}, 
						targetDiv : "#prodEvent"
					});
				}else{
					if($(this).is(':checked')){
						$('div#prodEvent').show();
					}else{
						$('div#prodEvent').hide();
					}
				}
				countProdM5 = countProdM5  + 1; 
			}
			
			if($('select[name="mLine"]').val() == 'KDM'){
				if(countProdKDM==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_production_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val(),'topView' : $('input[name="topView"]').val(), 'isOthers' : $('select[name="others"]').val()}, 
						targetDiv : "#prodEvent"
					});
				}else{
					if($(this).is(':checked')){
						$('div#prodEvent').show();
					}else{
						$('div#prodEvent').hide();
					}
				}
				countProdKDM = countProdKDM  + 1; 
			}
		});
		
		var countRejectM5 = 0 ; 
		var countRejectKDM = 0 ; 
		$('input[name="prodReject"]').click(function(){
			if($('select[name="mLine"]').val() == 'I5' || $('select[name="mLine"]').val() == 'I6'){
				if(countRejectM5==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_reject_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#reject"
					});
				}else{
					if($(this).is(':checked')){
						$('div#reject').show();
					}else{
						$('div#reject').hide();
					}
				}			
				countRejectM5 = countRejectM5 + 1 ; 
			}
			
			if($('select[name="mLine"]').val() == 'KDM' ){
				if(countRejectKDM==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_reject_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#reject"
					});
				}else{
					if($(this).is(':checked')){
						$('div#reject').show();
					}else{
						$('div#reject').hide();
					}
				}			
				countRejectKDM = countRejectKDM + 1 ; 
			}
			
		});
		
		var countExtStopM5 = 0 ; 
		var countExtStopKDM = 0 ; 
		$('input[name="prodExtStop"]').click(function(){
			if($('select[name="mLine"]').val() == 'I5' || $('select[name="mLine"]').val() == 'I6'){
				if(countExtStopM5==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_stop_ext_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#ExternalStop"
					});
				}else{
					if($(this).is(':checked')){
						$('div#ExternalStop').show();
					}else{
						$('div#ExternalStop').hide();
					}
				}
				countExtStopM5  = countExtStopM5+ 1; 
			}
			
			if($('select[name="mLine"]').val() == 'B3K'){
				if(countExtStopKDM==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_stop_ext_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#ExternalStop"
					});
				}else{
					if($(this).is(':checked')){
						$('div#ExternalStop').show();
					}else{
						$('div#ExternalStop').hide();
					}
				}
				countExtStopKDM  = countExtStopKDM+ 1; 
			}
			
		});
		
		var  countIntStopM5 = 0; 
		var  countIntStopKDM = 0; 
		$('input[name="prodIntStop"]').click(function(){
			if($('select[name="mLine"]').val() == 'I5' || $('select[name="mLine"]').val() == 'I6'){
				if(countIntStopM5==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_stop_int_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#InternalStop"
					});
				}else{
					if($(this).is(':checked')){
						$('div#InternalStop').show();
					}else{
						$('div#InternalStop').hide();
					}
				}
				countIntStopM5  = countIntStopM5+ 1; 
			}			
			
			if($('select[name="mLine"]').val() == 'KDM'){
				if(countIntStopKDM==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_stop_int_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#InternalStop"
					});
				}else{
					if($(this).is(':checked')){
						$('div#InternalStop').show();
					}else{
						$('div#InternalStop').hide();
					}
				}
				countIntStopKDM  = countIntStopKDM+ 1; 
			}
		});
		
		var countDetStopM5 = 0 ; 
		var countDetStopKDM = 0 ; 
		$('input[name="prodDetStop"]').click(function(){
			if($('select[name="mLine"]').val() == 'I5' || $('select[name="mLine"]').val() == 'I6'){
				if(countDetStopM5==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_stop_det_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#DetailStop"
					});
				}else{
					if($(this).is(':checked')){
						$('div#DetailStop').show();
					}else{
						$('div#DetailStop').hide();
					}
				}
				countDetStopM5  = countDetStopM5+ 1; 
			}
			
			if($('select[name="mLine"]').val() == 'B3K'){
				if(countDetStopKDM==0){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_stop_det_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#DetailStop"
					});
				}else{
					if($(this).is(':checked')){
						$('div#DetailStop').show();
					}else{
						$('div#DetailStop').hide();
					}
				}
				countDetStopKDM  = countDetStopKDM+ 1; 
			}
			
		});
		
	});
	
	function viewProduction()
	{
	
			if($('select[name="mLine"]').val() == 'I5' || $('select[name="mLine"]').val() == 'I6')
			{
				if($('input[name="prodEventRecord"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_production_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val(),'topView' : $('input[name="topView"]').val(), 'isOthers' : $('select[name="others"]').val()}, 
						targetDiv : "#prodEvent"
					});
				}
				
				if($('input[name="prodReject"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_reject_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#reject"
					});
				}
				
				if($('input[name="prodExtStop"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_stop_ext_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#ExternalStop"
					});
				}
				
				if($('input[name="prodIntStop"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_stop_int_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#InternalStop"
					});
				}
				
				if($('input[name="prodDetStop"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/PM5/M5_stop_det_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#DetailStop"
					});
				}
			}
			
			if($('select[name="mLine"]').val() == 'B3K')
			{
				if($('input[name="prodEventRecord"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_production_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val(),'topView' : $('input[name="topView"]').val(), 'isOthers' : $('select[name="others"]').val()}, 
						targetDiv : "#prodEvent"
					});
				}
				
				if($('input[name="prodReject"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_reject_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#reject"
					});
				}
				
				if($('input[name="prodExtStop"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_stop_ext_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#ExternalStop"
					});
				}
				
				if($('input[name="prodIntStop"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_stop_int_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#InternalStop"
					});
				}
				
				if($('input[name="prodDetStop"]').is(':checked')){
					ajaxLoadAnotherPage({
						url : 'http://10.216.0.114/gg_report/KDM/KDM_stop_det_view.php',
						dataType : "html",
						data : {'date' : $('#tanggal1').val(), 'line' : $('select[name="mLine"]').val(), 'unit' : $('select[name="mUnit"]').val(),'shift' : $('select[name="mShift"]').val()}, 
						targetDiv : "#DetailStop"
					});
				}
			}
		
	}
	
	function getReportParam(type)
	{
		var params = null;
		if(type=='url'){
			params = "";
			params += '/' +  $('input[name="tanggal1"]').val();
			params += '/' +  $('select[name="mLine"]').val();			
			params += '/' +  $('select[name="mUnit"]').val();
			params += '/' +  $('select[name="mShift"]').val();
			params += '/' +  $('input[name="topView"]').val() + 0;
			params += '/' +  $('select[name="others"]').val();
			
		}else{
			params = $('form#fmpParams').serialize();
		}
		return params ; 
	}
	
	$('a#download').click(function(){		
		
		var params = "?";
		params = params + "date=" + $('#tanggal1').val()  + "&";
		params = params + "line=" + $('select[name="mLine"]').val()  + "&";
		params = params + "shift=" + $('select[name="mShift"]').val() ;
		
		// cek input
		if($('#tanggal1').val() == "" || $('select[name="mLine"]').val() == "" || $('select[name="mUnit"]').val() == null || $('select[name="mShift"]').val()==null){
			alert("input required!");
			return ;
		}
		
		if($('select[name="mLine"]').val() == "B3K" || $('select[name="mLine"]').val() == "I5" || $('select[name="mLine"]').val() == "I6"){
			
			var folder = $('select[name="mLine"]').val() ;
			
			if ($('input[name="prodEventRecord"]').is(':checked')){								
				window.open('http://10.216.0.114/gg_report/'+folder +'/production.php' + params,'mywindow','width=400,height=200,left=0,top=100,screenX=0,screenY=100','toolbar=no','scrollbars=yes')
			}
			
			if ($('input[name="prodReject"]').is(':checked')){								
				window.open('http://10.216.0.114/gg_report/'+folder +'/reject.php' + params,'mywindow','width=400,height=200,left=0,top=100,screenX=0,screenY=100','toolbar=no','scrollbars=yes')
			}
			
			if ($('input[name="prodExtStop"]').is(':checked') || $('input[name="prodIntStop"]').is(':checked') || $('input[name="prodDetStop"]').is(':checked')){								
				var detail = "";
				if($('input[name="prodExtStop"]').is(':checked')){
					detail = detail + "&ext=on";
				}
				if($('input[name="prodIntStop"]').is(':checked')){
					detail = detail + "&int=on";
				}
				if($('input[name="prodDetStop"]').is(':checked')){
					detail = detail + "&det=on";
				}				
				window.open('http://10.216.0.114/gg_report/'+ folder +'/stop.php' + params + detail,'mywindow','width=400,height=200,left=0,top=100,screenX=0,screenY=100','toolbar=no','scrollbars=yes')
			}
			
		}
		
	});
	
	