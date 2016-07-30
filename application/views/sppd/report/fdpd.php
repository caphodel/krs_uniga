<div id="div_report_fdpd" class="j-panel" data-content="REPORT FDPD">
	<j-dateField id="departure_date_start" format="YYYY-MM-DD">Tanggal Berangkat</j-dateField><j-dateField id="departure_date_end" format="YYYY-MM-DD">Sampai</j-dateField><br/><br/>
	<j-button color="blue" id="BtnSearch">Search</j-button><br/><br/>
	<j-table id="list_report_fdpd" class="doc" title="FDPD List">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><!--j-button color="blue" id="btnPrint">Export to Excel</j-button><j-textField id="tfSearch" ></j-textField><j-button id="btnSearch">Search</j-button-->
		</j-toolbar>
		<j-custom target="10">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[10]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "No FDPD", "Nama", "NIK", "Direktorat", "Divisi", "Departement", "Seksi","Select"]
		  ]
		<j-loader src="index.php/sppd_report/get_data_report_fdpd?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
<div>
<script>	

	$('#BtnSearch').click(function(){
		if ($('#departure_date_start').val()==''){alert('Harap isi Mulai Tanggal Berangkat !');return;}
		if ($('#departure_date_end').val()==''){alert('Harap isi Sampai Tanggal Berangkat !');return;}
		$('#list_report_fdpd j-loader')[0].param.departure_date_start=$('#departure_date_start').val();
		$('#list_report_fdpd j-loader')[0].param.departure_date_end=$('#departure_date_end').val();
		$('#list_report_fdpd')[0].generateData();
	})
	
	function drop(tr, record){
		load("sppd_report/detail_fdpd?fdpd_id="+record[0]+'&rand='+randomString(),tr.children())
	}
	
</script>