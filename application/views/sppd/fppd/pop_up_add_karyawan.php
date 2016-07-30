<j-modal id="mdlAddKaryawan" title="Pilih Karyawan" drag="true" mask="true" height="400px" width="1000px">
	
	<div id="pop_up_add_karyawan">
		<j-table width="980px" id="list_karyawan">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-textField color="blue" id="tfSearch" placeholder="Search Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
			  [
				["No", "NAMA", "NIK", "DIREKTORAT", "DIVISI", "DEPARTMENT", "SEKSI", "LOKASI KERJA"]	
			  ]
			<j-loader src="index.php/sppd_fppd/get_data_employee?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
			<j-pagination></j-pagination> 
		</j-table><br/><br/>
		<j-button id="select_karyawan" color="blue">Select</j-button>
		<j-button id="close_pop_up" color="blue">Close</j-button>
	</div>
</j-modal>
<script>

	$('#select_karyawan').click(function(){
		if ($('#list_karyawan')[0].selectedRecord.length > 0){
			if ($('#list_karyawan')[0].selectedRecord.length>1){
				alert('Pilih 1 Karyawan !')
			}else{
				
				var detail_karyawan = {
					employee_id : $('#list_karyawan')[0].selectedRecord[0][10],
					nama : $('#list_karyawan')[0].selectedRecord[0][1],
					nik : $('#list_karyawan')[0].selectedRecord[0][2],
					posisi : $('#list_karyawan')[0].selectedRecord[0][8], 
					level : $('#list_karyawan')[0].selectedRecord[0][9],
					direktorat : $('#list_karyawan')[0].selectedRecord[0][3],
					divisi : $('#list_karyawan')[0].selectedRecord[0][4],
					deparment : $('#list_karyawan')[0].selectedRecord[0][5],
					seksi : $('#list_karyawan')[0].selectedRecord[0][6],
					lokasi_kerja : $('#list_karyawan')[0].selectedRecord[0][7],
					is_sf : $('#list_karyawan')[0].selectedRecord[0][11],
					address : $('#list_karyawan')[0].selectedRecord[0][12],
					phonenumber : $('#list_karyawan')[0].selectedRecord[0][13],
					banknumber : $('#list_karyawan')[0].selectedRecord[0][14],
					pp_code_id : $('#list_karyawan')[0].selectedRecord[0][15],
					pp_code : $('#list_karyawan')[0].selectedRecord[0][16]
				}
				
				load_karyawan(detail_karyawan)
				alert('Successfull')
				$('#mdlAddKaryawan').remove();
			}
		}else{
			alert('Harap Pilih Karyawan !')
		}
	})
	
	$('#close_pop_up').click(function(){
		$('#mdlAddKaryawan').remove();
	})
	
	$('#btnSearch').click(function(){
		$('#list_karyawan j-loader')[0].param.sSearch=$('#tfSearch').val()					
		$('#list_karyawan')[0].generateData()
	})
	
</script>