<div id="div_batal_pu">	
	<j-table id="list_konfirmasi_batal_pu" class="doc" title="List Konfirmasi Batal PU">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnKonfirmasi">Konfirmasi</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
		<j-custom target="11">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[11]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "Nama", "NIK", "Direktorat", "Divisi", "Departemen", "Seksi", "Versi", "Keterangan Batal", "Select"]
		  ]
		<j-loader src="index.php/sppd_home/get_data_fppd_batal_pu?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
</div>
<script>

	$('#btnKonfirmasi').click(function(){
		if($('[name=select]:checked').val()){
			if(confirm("Apa anda yakin ?")){
					var fppd_id = $('[name=select]:checked').val();
					$.getJSON('index.php/sppd_home/validasi_fppd_batal_pu', {
						user : user,
						fppd_id : fppd_id
					}).done(function(json){
						if (json.STATUS==1){
							alert(''+json.MESSAGE+'');
							$('#list_konfirmasi_batal_pu')[0].generateData();
						}
					})
			}
		}else{
			alert('Harap pilih 1 Sppd Terlebih dahulu !')
		}
	})
	
	function drop(tr, record){
		load("sppd_home/detail_fppd?fppd_id="+record[0]+'&rand='+randomString(),tr.children())
	}
	
	$('#list_konfirmasi_batal_pu').on('afterdraw', function(){
		reload_badge()
	})
	
	$('#btnSearch').click(function(){
		$('#list_konfirmasi_batal_pu j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_konfirmasi_batal_pu')[0].generateData()
	})
	
</script>