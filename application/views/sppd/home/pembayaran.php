<div id="div_pembayaran">
	<j-table id="list_pembayaran" class="doc" title="List Pembayaran">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnProses">Proses</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
		<j-custom target="10">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[1]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "No FDPD", "Nama", "NIK", "Direktorat", "Divisi", "Departemen", "Seksi", "Select"]
		  ]
		<j-loader src="index.php/sppd_home/get_data_pembayaran?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
</div>
<script>
	
	$('#btnProses').click(function(){
		if($('[name=select]:checked').val()){
			 if(confirm("Apa anda yakin ?")){
				var inpUSER_ID = user;
				if ($('#list_pembayaran')[0].selectedRecord[0][3]!=''){
					var inpFORM = 'FDPD';
					var inpFORM_ID = $('#list_pembayaran')[0].selectedRecord[0][11]
				}else {
					var inpFORM = 'FPPD';
					var inpFORM_ID = $('#list_pembayaran')[0].selectedRecord[0][10]
				}
				
				$.getJSON('index.php/sppd_home/proses_pembayaran', {
					inpUSER_ID : inpUSER_ID,
					inpFORM : inpFORM,
					inpFORM_ID : inpFORM_ID
				}).done(function(json){
					if (json.STATUS==1){
						alert(''+json.MESSAGE+'');
						$('#list_pembayaran')[0].generateData();
					}
				})
			 }
		}else{
			alert('Harap pilih 1 Fdpd Terlebih dahulu !')
		}
	})
	
	function drop(tr, record){
		if (record[3]!=''){
			load("sppd_home/detail_fdpd_verify?fdpd_id="+record[11]+'&rand='+randomString(),tr.children())
		}else{
			load("sppd_home/detail_fppd_verify?fppd_id="+record[10]+'&rand='+randomString(),tr.children())
		}
	}
	
	$('#list_pembayaran').on('afterdraw', function(){
		reload_badge()
	})
	
	$('#btnSearch').click(function(){
		$('#list_pembayaran j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_pembayaran')[0].generateData()
	})
	
</script>
