<j-table id="list_fppd" class="doc" title="Validasi FPPD">
	<j-toolbar id="toolbar">
			<j-spacer></j-spacer><j-button color="blue" id="btnValidasi">Validasi</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
	</j-toolbar>
	<j-custom target="11">
		function(record){
			return '<center><input type="radio" name="select" value="'+record[11]+'" ></input></center>';
		}
	</j-custom>
	<j-drop target="0" onclick="drop"></j-drop>
	  [
		["+", "No", "No SPPD", "Nama", "NIK", "Direktorat", "Divisi", "Departemen", "Seksi", "Versi", "Posisi", "Select"]
	  ]
	<j-loader src="index.php/sppd_home/get_data_validasi_fppd?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
	<j-pagination></j-pagination>
</j-table>
<script>

	$('#btnValidasi').click(function(){
		if($('[name=select]:checked').val()){
			 if(confirm("Apa anda yakin ?")){
				var fppd_id = $('[name=select]:checked').val()
				$.getJSON('index.php/sppd_home/validasi_fppd', {
					user : user,
					fppd_id : fppd_id
				}).done(function(json){
					if (json.STATUS==1){
						alert(''+json.MESSAGE+'');
						$('#list_fppd')[0].generateData();
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
	
	$('#list_fppd').on('afterdraw', function(){
		reload_badge()
	})
	
	$('#btnSearch').click(function(){
		$('#list_fppd j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_fppd')[0].generateData()
	})

</script>