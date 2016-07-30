<div id="div_verifikasi_fdpd">
	<j-table id="list_verifikasi_fdpd" class="doc" title="List Verifikasi FDPD">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnVerifikasi">Verifikasi</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
		<j-custom target="10">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[10]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "No FDPD", "Nama", "NIK", "Direktorat", "Divisi", "Departemen", "Seksi", "Select"]
		  ]
		<j-loader src="index.php/sppd_home/get_data_verifikasi_fdpd?user=<?php echo $_REQUEST['user'];?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
</div>
<script>

	var array_is_pu=[];
	var array_cost_other=[];
	var array_eff_date=[];

	check = function(data, currency){
			var isi=true
			for(i=0 ;i<data.length;i++){
					if (data[i][0] == currency)
							isi = false
			}
			return isi
	}
	
	check_is_pu = function(fdpd_id){
			var isi=true
			for(i=0 ;i<array_is_pu.length;i++){
					if (array_is_pu[i][0] == fdpd_id)
							isi = false
			}
			return isi
	}
	
	select_is_pu = function(fdpd_id, idx){
			var data=''
			for(i=0 ;i<array_is_pu.length;i++){
				if (array_is_pu[i][0] == fdpd_id)
							data = array_is_pu[i][idx]
			}
			return data
	}
	
	update_is_pu = function(fdpd_id, ket){
			for(i=0 ;i<array_is_pu.length;i++){
				if (array_is_pu[i][0] == fdpd_id){
					array_is_pu[i][0]=fdpd_id
					array_is_pu[i][1]=ket
				}
			}
	}

	$('#btnVerifikasi').click(function(){
		if($('[name=select]:checked').val()){		
				var fdpd_id = $('[name=select]:checked').val();
				if (check_is_pu(fdpd_id)){alert('Harap Isi Detail terlebih dahulu');return;}
				if (select_is_pu(fdpd_id, 1)==''){alert('Harap isi Keterangan terlebih dahulu');return;}

				if(confirm("Apa anda yakin ?")){
					$.getJSON('index.php/sppd_home/validasi_verifikasi_fdpd', {
						user : user,
						fdpd_id : fdpd_id,
						verify_note : select_is_pu(fdpd_id, 1)
					}).done(function(json){
						if (json.STATUS==1){
							alert(''+json.MESSAGE+'');
							$('#list_verifikasi_fdpd')[0].generateData();
						}
					})
					
					if (array_eff_date.length > 0){
						for(i=0 ;i<array_eff_date.length;i++){
							if (array_eff_date[i][0]==fdpd_id){
								$.getJSON('index.php/sppd_home/update_dest_date_fdpd', {
									fdpd_id : fdpd_id,
									destination_id : array_eff_date[i][1],
									eff_date : array_eff_date[i][2],
									record_type : 'O',
									created_by : user 
								}).done(function(json){
									$('#list_verifikasi_fdpd')[0].generateData();
								})
							}
						}
					}
				}
		}else{
			alert('Harap pilih 1 Sppd Terlebih dahulu !')
		}
	})

	function drop(tr, record){
		load("sppd_home/detail_verifikasi_fdpd?fdpd_id="+record[0]+'&rand='+randomString(),tr.children())
	}
	
	$('#list_verifikasi_fdpd').on('afterdraw', function(){
		reload_badge()
	})
	
	$('#btnSearch').click(function(){
		$('#list_verifikasi_fdpd j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_verifikasi_fdpd')[0].generateData()
	})
		
</script>
