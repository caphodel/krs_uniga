<div id="div_verifikasi_fppd">
	<j-table id="list_verifikasi_sppd" class="doc" title="List Verifikasi FPPB">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnVerifikasi">Verifikasi</j-button><j-button color="blue" id="btnSendInfo">Kirim Info</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
		<j-custom target="12">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[12]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "Nama", "NIK", "Direktorat", "Divisi", "Departemen", "Seksi", "Versi", "Perpanjangan", "Verifikasi", "Select"]
		  ]
		<j-loader src="index.php/sppd_home/get_data_verifikasi_fppd?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
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
	
	check_is_pu = function(fppd_id){
			var isi=true
			for(i=0 ;i<array_is_pu.length;i++){
					if (array_is_pu[i][0] == fppd_id)
							isi = false
			}
			return isi
	}
	
	select_is_pu = function(fppd_id, idx){
			var data=''
			for(i=0 ;i<array_is_pu.length;i++){
				if (array_is_pu[i][0] == fppd_id)
							data = array_is_pu[i][idx]
			}
			return data
	}
	
	update_is_pu = function(fppd_id, val, ket){
			for(i=0 ;i<array_is_pu.length;i++){
				if (array_is_pu[i][0] == fppd_id){
					array_is_pu[i][0]=fppd_id
					array_is_pu[i][1]=val
					array_is_pu[i][2]=ket
				}
			}
	}

	$('#btnVerifikasi').click(function(){
		if($('[name=select]:checked').val()){
			var fppd_id = $('[name=select]:checked').val();
			if (check_is_pu(fppd_id)){alert('Harap Isi Detail terlebih dahulu');return;}
			if (select_is_pu(fppd_id, 1)==''){alert('Harap Pilih Pembayaran terlebih dahulu');return;}
			if (select_is_pu(fppd_id, 2)==''){alert('Harap isi Keterangan terlebih dahulu');return;}
			
			if(confirm("Apa anda yakin ?")){			
				$.getJSON('index.php/sppd_home/validasi_verifikasi_fppd', {
					user : user,
					fppd_id : fppd_id,
					processed_by : select_is_pu(fppd_id, 1),
					verify_note : select_is_pu(fppd_id, 2)
				}).done(function(json){
					if (json.STATUS==1){
						alert(''+json.MESSAGE+'');
						$('#list_verifikasi_sppd')[0].generateData();
					}
				})
				
				if (array_cost_other.length > 0){
					for(i=0 ;i<array_cost_other.length;i++){
						if (array_cost_other[i][0]==fppd_id){
							$.getJSON('index.php/sppd_home/insert_cost_other_fppd', {
								fppd_id : fppd_id,
								cost_breakdown : array_cost_other[i][1],
								currency_id : array_cost_other[i][4],
								amount : array_cost_other[i][3],
								record_type : 'O',
								processed_by : select_is_pu(fppd_id, 1),
								created_by : user
							}).done(function(json){
								$('#list_verifikasi_sppd')[0].generateData();
							})
						}
					}
				}
				
				if (array_eff_date.length > 0){
					for(i=0 ;i<array_eff_date.length;i++){
						if (array_eff_date[i][0]==fppd_id){
							$.getJSON('index.php/sppd_home/update_dest_date_fppd', {
								fppd_id : fppd_id,
								destination_id : array_eff_date[i][1],
								eff_date : array_eff_date[i][2],
								record_type : 'O',
								created_by : user
							}).done(function(json){
								$('#list_verifikasi_sppd')[0].generateData();
							})
						}
					}
				}
			}
		}else{
			alert('Harap pilih 1 Sppd Terlebih dahulu !')
		}
	})
	
	$('#btnSendInfo').click(function(){
		if($('[name=select]:checked').val()){
			if ($('#list_verifikasi_sppd')[0].selectedRecord[0][11]!=''){
				var fppd_id = $('[name=select]:checked').val();
				$.ajax({
					url: 'index.php/sppd_home/pop_up_kirim_info',
					data : {
						user : user,
						fppd_id : fppd_id
					},
					success: function(data){
						$('#div_verifikasi_fppd').append(data);
					}
				})
			}else{
				alert('Harap Verifikasi Terlebih Dahulu !')
			}
		}else{
			alert('Harap pilih 1 Sppd Terlebih dahulu !')
		}
	})
	
	function drop(tr, record){
		if (record[11]!=''){
			load("sppd_home/detail_fppd_verify?fppd_id="+record[0]+'&rand='+randomString(),tr.children())
		}else{
			load("sppd_home/detail_verifikasi_fppd?fppd_id="+record[0]+'&rand='+randomString(),tr.children())
		}
	}
	
	$('#list_verifikasi_sppd').on('afterdraw', function(){
		reload_badge()
		disable_button()
	})
	
	$('#btnSearch').click(function(){
		$('#list_verifikasi_sppd j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_verifikasi_sppd')[0].generateData()
	})
	
	function disable_button(){
		$('#btnSendInfo').attr('disabled', true)
		$('#btnVerifikasi').attr('disabled', true)
	}

	$('#list_verifikasi_sppd').on('itemclick',function(e,val){
		if (val[11]=='OK'){
			$('#btnSendInfo').removeAttr('disabled');
			$('#btnVerifikasi').attr('disabled', true)
		}else{
			$('#btnSendInfo').attr('disabled', true)
			$('#btnVerifikasi').removeAttr('disabled');
		}
	})
	
</script>
