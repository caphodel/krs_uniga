<div id="div_tutup_fppd">
	<j-table id="list_tutup_fdpd" class="doc" title="List Tutup FDPD">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnTutup">Tutup</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
		<j-custom target="10">
			function(record){
				var str='';
				if (record[10]==1){
					str='Terbayar';
				}
				
				return str;
			}
		</j-custom>
		<j-custom target="11">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[11]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "No FDPD", "Nama", "NIK", "Direktorat", "Divisi", "Departemen", "Seksi", "Info Pembayaran", "Select"]
		  ]
		<j-loader src="index.php/sppd_home/get_data_tutup_fdpd?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
</div>
<script>
		
	$('#btnTutup').click(function(){
		if($('[name=select]:checked').val()){
			 if(confirm("Apa anda yakin ?")){
				var fdpd_id = $('[name=select]:checked').val();
				$.getJSON('index.php/sppd_home/validasi_tutup_fdpd', {
					user : user,
					fdpd_id : fdpd_id
				}).done(function(json){
					if (json.STATUS==1){
						alert(''+json.MESSAGE+'');
						$('#list_tutup_fdpd')[0].generateData();
					}
				})
			 }
		}else{
			alert('Harap pilih 1 Fdpd Terlebih dahulu !')
		}
	})
	
	function drop(tr, record){
		load("sppd_home/detail_fdpd_verify?fdpd_id="+record[11]+'&rand='+randomString(),tr.children())
	}
	
	$('#list_tutup_fdpd').on('afterdraw', function(){
		reload_badge()
	})
	
	$('#btnSearch').click(function(){
		$('#list_tutup_fdpd j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_tutup_fdpd')[0].generateData()
	})
	
</script>
