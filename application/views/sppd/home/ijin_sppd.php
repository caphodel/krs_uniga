<div id="div_ijin_sppd">
	<j-table id="list_ijin_sppd" class="doc" title="List Ijin SPPD">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnKonfirmasi">Konfirmasi</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
		<j-custom target="13">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[1]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "No FDPD", "Nama", "NIK", "Direktorat", "Divisi", "Departemen", "Seksi", "Versi", "Pembatalan", "Perpanjangan", "Select"]
		  ]
		<j-loader src="index.php/sppd_home/get_data_ijin_sppd?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
</div>
<script>

	$('#btnKonfirmasi').click(function(){
		if($('[name=select]:checked').val()){
			if(confirm("Apa anda yakin ?")){
				var inpUSER_ID = user;
				if ($('#list_ijin_sppd')[0].selectedRecord[0][3]!=''){
					var inpFORM = 'FDPD';
					var inpFORM_ID = $('#list_ijin_sppd')[0].selectedRecord[0][14]
				}else {
					var inpFORM = 'FPPD';
					var inpFORM_ID = $('#list_ijin_sppd')[0].selectedRecord[0][13]
				}
			
				var inpCANCEL = $('#list_ijin_sppd')[0].selectedRecord[0][11]
				var inpEXTEND = $('#list_ijin_sppd')[0].selectedRecord[0][12]
			
				$.getJSON('index.php/sppd_home/validasi_ijin_fdpd_fppd', {
					inpUSER_ID : inpUSER_ID,
					inpFORM : inpFORM,
					inpFORM_ID : inpFORM_ID,
					inpCANCEL : inpCANCEL,
					inpEXTEND : inpEXTEND
				}).done(function(json){
					if (json.STATUS==1){
						alert(''+json.MESSAGE+'');
						$('#list_ijin_sppd')[0].generateData();
					}
				})
			}
		}else{
			alert('Harap pilih 1 Sppd Terlebih dahulu !')
		}
	})
	
	function drop(tr, record){
		if (record[3]!=''){
			load("sppd_home/detail_fdpd_verify?fdpd_id="+record[14]+'&rand='+randomString(),tr.children())
		}else{
			load("sppd_home/detail_fppd_verify?fppd_id="+record[13]+'&rand='+randomString(),tr.children())
		}
	}
	
	$('#list_ijin_sppd').on('afterdraw', function(){
		reload_badge()
	})
	
	$('#btnSearch').click(function(){
		$('#list_ijin_sppd j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_ijin_sppd')[0].generateData()
	})

</script>