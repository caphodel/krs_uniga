<div id="div_perpanjangan_fppd">	
	<j-table id="list_perpanjangan_fppd" class="doc" title="List Perpanjangan FPPD">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnValidasi">Validasi</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
		<j-custom target="14">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[14]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "Nama", "NIK", "Direktorat", "Divisi", "Departemen", "Seksi", "Versi", "Perpanjangan/Percepatan", "Jangka Waktu Awal", "Perubahan Tanggal Kembali", "Posisi", "Select"]
		  ]
		<j-loader src="index.php/sppd_home/get_data_perpanjangan?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
</div>
<script>

	$('#btnValidasi').click(function(){
		if($('[name=select]:checked').val()){
			 if(confirm("Apa anda yakin ?")){
				var fppd_id = $('[name=select]:checked').val();
				$.getJSON('index.php/sppd_home/validasi_perpanjangan', {
					user : user,
					fppd_id : fppd_id
				}).done(function(json){
					if (json.STATUS==1){
						alert(''+json.MESSAGE+'');
						$('#list_perpanjangan_fppd')[0].generateData();
					}
				})
			 }
		}else{
			alert('Harap pilih 1 Sppd Terlebih dahulu !')
		}
	})
	
	function drop(tr, record){
		load("sppd_home/detail_fppd_verify?fppd_id="+record[0]+'&rand='+randomString(),tr.children())
	}
	
	$('#list_perpanjangan_fppd').on('afterdraw', function(){
		reload_badge()
	})
	
	$('#btnSearch').click(function(){
		$('#list_perpanjangan_fppd j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_perpanjangan_fppd')[0].generateData()
	})
	
</script>