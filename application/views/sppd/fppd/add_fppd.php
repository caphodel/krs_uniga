<style>
	#table_identitas_karyawan{
		font-family:arial;
	}
	#table_tindakan_karyawan{
		font-family:arial;
	}
	#table_perjalanan_dinas{
		font-family:arial;
	}
	#table_total_all{
		font-family:arial;
	}
	#table_uang_muka{
		font-family:arial;
		margin-left: 300px;
	}
	.table_detail_tujuan{
		font-family:arial;
	}
	fieldset {
		border: 0;
	}
</style>
<div id="div_add_fppd" class="j-panel">
	<j-textField id="fppd_no">Nomor</j-textField>
	<div id="div_identitas_karyawan" class="j-panel" data-content="IDENTITAS KARYAWAN">
		<j-button color="blue" id="btnAddKaryawan">Search</j-button><br/><br/>
		<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_identitas_karyawan">
			<tr height="40px">
				<td width="20%">Nama</td><td width="1%">:</td><td width="29%"><a id="nama">-</a></td>
				<td width="20%">Direktorat</td><td width="1%">:</td><td width="29%"><a id="direktorat">-</a></td>
			</tr>
			<tr height="40px">
				<td width="20%">NIK</td><td width="1%">:</td><td width="29%"><a id="nik">-</a></td>
				<td width="20%">Divisi</td><td width="1%">:</td><td width="29%"><a id="divisi">-</a></td>
			</tr>
			<tr height="40px">
				<td width="20%">Posisi</td><td width="1%">:</td><td width="29%"><a id="posisi">-</a></td>
				<td width="20%">Departement</td><td width="1%">:</td><td width="29%"><a id="departement">-</a></td>
			</tr>
			<tr height="40px">
				<td width="20%">Level / Grade</td><td width="1%">:</td><td width="29%"><a id="level">-</a></td>
				<td width="20%">Seksi</td><td width="1%">:</td><td width="29%"><a id="seksi">-</a></td>
			</tr>
			<tr height="40px">
				<td width="20%"></td><td width="1%"></td><td width="29%"></td>
				<td width="20%">Lokasi Kerja</td><td width="1%">:</td><td width="29%"><a id="lokasi_kerja">-</a></td>
			</tr>
		</table>
	</div>
	<div id="div_tindakan" class="j-panel" data-content="TINDAKAN">
			<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_tindakan_karyawan">
				<tr height="40px">
					<td width="20%">Keperluan</td><td width="1%">:</td><td width="29%"><j-textArea id="purpose"></j-textArea></td>
					<td width="20%"></td><td width="1%"></td><td width="29%"></td>
				</tr>
				<tr height="40px">
					<td width="20%">Tujuan</td><td width="1%">:</td><td colspan="4">
						<j-table width="600px" id="list_tujuan">
							<j-toolbar id="toolbar">
									<j-spacer></j-spacer><j-button color="blue" id="btnAddKota">Add</j-button><j-button color="red" id="btnRemoveKota">Remove</j-button>
							</j-toolbar>
							  [
								["No", "Kota", "Kategori"]	
							  ]
						</j-table>
					</td>
				</tr>
			</table>
			<div id="detail_tujuan">
			</div>
			<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_perjalanan_dinas">
				<tr height="40px">
					<td width="20%">Biaya Perjalanan Dinas</td><td width="20%"> : </td><td width="2%"></td><td width="58%"></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Transportasi Udara</td><td width="1%"> : </td><td width="29%"><j-radiofield id="is_transport_air">[[1, "Disediakan"], [0, "Diatur Sendiri"]]</j-radiofield></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Transportasi Lainnya</td><td width="1%"> : </td><td width="29%"><j-radiofield id="is_transport_other">[[1, "Disediakan"], [0, "Diatur Sendiri"]]</j-radiofield></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Keterangan Transportasi</td><td width="1%"> : </td><td width="29%"><j-textArea id="transport_note"></j-textArea><j-button id="btnInsAlamat" color="blue">Alamat</j-button><j-button id="btnInsHp" color="blue">No HP</j-button></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Akomodasi</td><td width="1%"> : </td><td width="29%"><j-radiofield id="is_accomodation">[[1, "Disediakan"], [0, "Diatur Sendiri"]]</j-radiofield></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Keterangan Akomodasi</td><td width="1%"> : </td><td width="29%"><j-textArea id="accomodation_note"></j-textArea></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Uang Muka Yang Dibutuhkan</td><td width="1%"> : </td><td width="29%"><j-radiofield id="is_money_dp" onclick="handleClick(this);">[[1, "Ya"], [0, "Tidak"]]</j-radiofield></td>
				</tr>
			</table>
			<div id="detail_uang_muka">
			</div>
		<br/>
		<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_tindakan_karyawan">
			<tr height="40px" id="tr_list_biaya">
				<td width="20%">Lain Lain</td><td width="1%">:</td><td colspan="4">
					<j-table width="600px" id="list_biaya">
						<j-toolbar id="toolbar">
								<j-spacer></j-spacer><j-button color="blue" id="btnAddBiaya">Add</j-button><j-button color="red" id="btnRemoveBiaya">Remove</j-button>
						</j-toolbar>
						  [
							["Keterangan", "Mata Uang", "Nominal"]	
						  ]
					</j-table>
				</td>
			</tr>
			<tr height="40px">
				<td width="20%">Total</td><td width="1%">:</td><td colspan="4"><table id="table_total_all"></table></td>
			</tr>
			<tr height="40px">
				<td width="20%">Kode PP</td><td width="1%">:</td><td colspan="4"><a id="pp_code"></a></td>
			</tr>
			<tr height="40px">
				<td width="20%">Keterangan</td><td width="1%">:</td><td colspan="4"><j-textArea id="fppd_note"></j-textArea><j-button id="btnInsRekening" color="blue">No Rekening</j-button></td>
			</tr>
			<tr height="40px">
				<td width="20%">Link</td><td width="1%">:</td><td colspan="4">
						<j-table width="600px" id="list_link">
							<j-toolbar id="toolbar">
									<j-spacer></j-spacer><j-button color="blue" id="btnAddLink">Add</j-button><j-button color="red" id="btnRemoveLink">Remove</j-button>
							</j-toolbar>
							  [
								["Keterangan", "Link"]	
							  ]
						</j-table>
				</td>
			</tr>
			<tr height="80px">
				<td colspan="4" style="text-align:center">
					<j-button color="blue" id="btnSaveFppd">Save</j-button><j-button color="blue" id="btnCancelFppd">Cancel</j-button>
				</td>
			</tr>
		</table>
	</div>
</div>
<script>

	var no=0;
	var array_pegawai=[];
	var array_table_tujuan=[];
	var array_uang_muka=[];
	var array_biaya_lain=[];
	var array_biaya_lain2=[];
	var array_total=[];
	var array_link=[];
	
	check = function(data, currency){
			var isi=true
			for(i=0 ;i<data.length;i++){
					if (data[i][0] == currency)
							isi = false
			}
			return isi
	}
	
	function load_karyawan(obj_karyawan){
			$('#nama').text(obj_karyawan.nama)
			$('#nik').text(obj_karyawan.nik)
			$('#posisi').text(obj_karyawan.posisi)
			$('#level').text(obj_karyawan.level)
			$('#direktorat').text(obj_karyawan.direktorat)
			$('#divisi').text(obj_karyawan.divisi)
			$('#departement').text(obj_karyawan.deparment)
			$('#seksi').text(obj_karyawan.seksi)
			$('#lokasi_kerja').text(obj_karyawan.lokasi_kerja)
			$('#pp_code').text(obj_karyawan.pp_code)

			array_pegawai=[obj_karyawan.employee_id, obj_karyawan.nik, obj_karyawan.nama, obj_karyawan.is_sf, obj_karyawan.address, obj_karyawan.phonenumber, obj_karyawan.banknumber, obj_karyawan.pp_code_id]
	}

	function arr_to_table(arr){
		no=no+1
		array_table_tujuan.push([	no, 
									arr.city, 
									arr.category_dest, 
									arr.destination_id, 
									arr.departure_date, 
									arr.departure_time, 
									arr.arrival_date, 
									arr.arrival_time, 
									arr.eff_date, 
									arr.eff_date_tot, 
									arr.eff_date_note,
									arr.category_dest_id
								])
										
		$('#list_tujuan')[0].record=array_table_tujuan
		
		var data_detail={
			no : no,
			city : arr.city ,
			departure_date : arr.departure_date ,
			departure_time : arr.departure_time ,
			arrival_date : arr.arrival_date ,
			arrival_time : arr.arrival_time ,
			eff_date : arr.eff_date ,
			eff_date_tot : arr.eff_date_tot ,
			eff_date_note : arr.eff_date_note,
			category_dest_id : arr.category_dest_id
		}
		
		detail_tujuan(data_detail)
		detail_uang_muka(arr.category_dest_id, array_pegawai[3], no, arr.eff_date_tot)
	}

	$('#btnRemoveKota').click(function(){
		$.each($('#list_tujuan')[0].selectedIndex, function(i, val){
			$('#list_tujuan')[0].data.splice(val,1)
			$('#list_tujuan')[0].generateData()
			array_uang_muka=[]
		})
		reload_array()
	})
	
	function remove_all_detail(){
		$('#detail_tujuan').find('br').remove()
		$('#detail_tujuan').find('table').remove()
		$('#detail_uang_muka').find('br').remove()
		$('#detail_uang_muka').find('table').remove()
	}
	
	function reload_array(){
		array_table_tujuan=[];
		remove_all_detail()
		no=0;
		$.each($('#list_tujuan')[0].record, function(i, val){
			no=no+1
			array_table_tujuan.push([no, val[1], val[2], val[3], val[4], val[5], val[6], val[7], val[8], val[9], val[10], val[11]]);
			
			var data_detail={
				no : no,
				city : val[1],
				departure_date : val[4],
				departure_time : val[5],
				arrival_date : val[6],
				arrival_time : val[7],
				eff_date : val[8],
				eff_date_tot : val[9],
				eff_date_note : val[10],
				category_dest_id : val[11]
			}
			detail_tujuan(data_detail)
			detail_uang_muka(data_detail.category_dest_id, array_pegawai[3], no, data_detail.eff_date_tot)
		})
		$('#list_tujuan')[0].record=array_table_tujuan
		
		if (no==0){
			count_total()
		}
	}
	
	function detail_tujuan(data){
		$('#detail_tujuan').append('<br/><table style="border-collapse: collapse;border: 1px solid #BDBDAE;" width="100%" class="table_detail_tujuan"><tr height="40px"><td width="20%">'+data.no+'. Kota</td><td width="1%">:</td><td width="29%" colspan="4">'+data.city+'</td></tr><tr height="40px"><td width="20%">Tanggal Berangkat</td><td width="1%">:</td><td width="29%">'+data.departure_date+'</td><td width="20%">Jam</td><td width="1%">:</td><td width="29%">'+data.departure_time+'</td></tr><tr height="40px"><td width="20%">Tanggal Kembali</td><td width="1%">:</td><td width="29%">'+data.arrival_date+'</td><td width="20%">Jam</td><td width="1%">:</td><td width="29%">'+data.arrival_time+'</td></tr><tr height="40px"><td width="20%">Hari Efektif</td><td width="1%">:</td><td width="29%"><j-textArea value="'+data.eff_date+'" class="inp_disable"></j-textArea></td><td width="20%">Jumlah Hari Efektif</td><td width="1%">:</td><td width="29%">'+data.eff_date_tot+'</td></tr></tr><tr height="40px"><td width="20%">Keterangan Hari Efektif</td><td width="1%">:</td><td width="29%" colspan="4">'+data.eff_date_note+'</td></tr></table><br/>');
	}
	
	function detail_uang_muka(category_dest_id, is_sf, no, tot_day){ 
		var symbol_saku_konsumsi=''
		var uang_saku_konsumsi=0
		var symbol_saku=''
		var uang_saku=0
		var symbol_konsumsi=''
		var uang_konsumsi=0
		$.getJSON('index.php/sppd_fppd/select_dest_cost', {
			category_dest_id : category_dest_id,  
			is_sf : is_sf
		}).done(function(jsn){
			if (jsn.data.length==1){
				cost_purpose_id_saku_konsumsi=jsn.data[0][0]
				symbol_saku_konsumsi=jsn.data[0][1]
				uang_saku_konsumsi=jsn.data[0][2]
				uang_saku_konsumsi = uang_saku_konsumsi.replace(/.[^.]+$/, "")
				uang_saku_konsumsi = uang_saku_konsumsi * tot_day
				array_uang_muka.push([jsn.data[0][3], uang_saku_konsumsi, symbol_saku_konsumsi, cost_purpose_id_saku_konsumsi, no])
			}else if (jsn.data.length==2){
				cost_purpose_id_saku=jsn.data[0][0]
				symbol_saku=jsn.data[0][1]
				uang_saku=jsn.data[0][2]
				uang_saku = uang_saku.replace(/.[^.]+$/, "")
				uang_saku = uang_saku * tot_day
				
				cost_purpose_id_konsumsi=jsn.data[1][0]
				symbol_konsumsi=jsn.data[1][1]
				uang_konsumsi=jsn.data[1][2]
				uang_konsumsi = uang_konsumsi.replace(/.[^.]+$/, "")
				uang_konsumsi = uang_konsumsi * tot_day
				array_uang_muka.push([jsn.data[0][3], uang_saku, symbol_saku, cost_purpose_id_saku, no])
				array_uang_muka.push([jsn.data[1][3], uang_konsumsi, symbol_konsumsi, cost_purpose_id_konsumsi, no])
			}
			
			$('#detail_uang_muka').append('<br/><table style="border-collapse: collapse;border: 1px solid #BDBDAE;" id="table_uang_muka"><tr height="30px"><td width="210px"><b>Struktural Fungsional</b></td><td width="20px"></td><td width="50px"></td><td width="200px"></td></tr><tr height="30px"><td style="text-align:right">Uang Saku Dan Konsumsi</td><td> : </td><td>'+symbol_saku_konsumsi+'</td><td>'+uang_saku_konsumsi+'</td></tr><tr height="30px"><td><b>Pekerjaan Operasional</b></td><td></td><td></td><td></td></tr height="30px"><tr height="30px"><td style="text-align:right">Uang Saku</td><td> : </td><td>'+symbol_saku+'</td><td>'+uang_saku+'</td></tr><tr height="30px"><td style="text-align:right">Konsumsi</td><td> : </td><td>'+symbol_konsumsi+'</td><td>'+uang_konsumsi+'</td></tr></table><br/>');
			count_total()
		})
	}

	$('#btnAddKaryawan').click(function(){
		$.ajax({
			url: 'index.php/sppd_fppd/pop_up_add_karyawan',
			data : {
				user : user
			},
			success: function(data){
				$('#div_add_fppd').append(data);
			}
		})
	})
	
	$('#btnAddKota').click(function(){
		if (array_pegawai.length>0){
			$.ajax({
				url: 'index.php/sppd_fppd/pop_up_add_tujuan',
				data : {
					employee_id : array_pegawai[0]
				},
				success: function(data){
					$('#div_add_fppd').append(data);
				}
			})
		}else{
			alert('Harap pilih Pegawai !');
		}
	})
	
	$('#btnAddBiaya').click(function(){
		$.ajax({
			url: 'index.php/sppd_fppd/pop_up_add_biaya',
			success: function(data){
				$('#div_add_fppd').append(data);
			}
		})
	})
	
	$('#btnAddLink').click(function(){
		$.ajax({
			url: 'index.php/sppd_fppd/pop_up_add_link',
			success: function(data){
				$('#div_add_fppd').append(data);
			}
		})
	})
	
	$('#btnRemoveBiaya').click(function(){
		$.each($('#list_biaya')[0].selectedIndex, function(i, val){
			$('#list_biaya')[0].data.splice(val,1)
			$('#list_biaya')[0].generateData()
		})
		reload_array_biaya()
	})
	
	function arr_to_table_biaya(arr){			
		array_biaya_lain.push([arr.cost_breakdown, arr.curr_symbol, arr.amount, arr.currency ]);
		$('#list_biaya')[0].record=array_biaya_lain
		array_biaya_lain2.push([arr.currency, arr.amount, arr.curr_symbol])
		count_total()
	}
	
	function reload_array_biaya(){
		array_biaya_lain=[];
		array_biaya_lain2=[];
		$.each($('#list_biaya')[0].record, function(i, val){
			array_biaya_lain.push([val[0], val[1], val[2], val[3]]);
			array_biaya_lain2.push([val[3], val[2], val[1]])
		})
		$('#list_biaya')[0].record=array_biaya_lain
		count_total()
	}
	
	$('#btnCancelFppd').click(function(){
		load("sppd_fppd/index?user="+user+"&rand="+randomString(),"#content");
	})
	
	
	function count_total(){
		$('#table_total_all').children().remove()
		var curr=''
		var tot=0
		var array_total=[];
		
		for(var i in array_uang_muka){
		  if (i!='_reduce'){
				curr=array_uang_muka[i][0]
				tot=array_uang_muka[i][1]
				if (check(array_total, array_uang_muka[i][0])){
				  array_total.push([array_uang_muka[i][0], array_uang_muka[i][1], array_uang_muka[i][2]])
				}else{
				  for(var a in array_total){
					if (array_total[a][0]==curr){
					  array_total[a][1]=parseInt(array_total[a][1])+parseInt(tot)
					}
				  }
				}
		  }
		}
		
		for(var i in array_biaya_lain2) {
		  if (i!='_reduce'){
				curr=array_biaya_lain2[i][0]
				tot=array_biaya_lain2[i][1]
				if (check(array_total, array_biaya_lain2[i][0])){
				  array_total.push([array_biaya_lain2[i][0], array_biaya_lain2[i][1], array_biaya_lain2[i][2]])
				}else{
				  for(var a in array_total){
					if (array_total[a][0]==curr){
						array_total[a][1]=parseInt(array_total[a][1])+parseInt(tot)
					}
				  }
				}
		  }
		}
		
		if (array_total.length > 0){
			for(var a in array_total){
				if (a!='_reduce'){
					$('#table_total_all').append('<tr><td>'+array_total[a][2]+'</td><td>'+array_total[a][1]+'</td></tr>')
				}
			}
		}
		
		$(".inp_disable").attr("disabled","disabled")
		
	}
		
	$('#btnInsAlamat').click(function(){
		if (array_pegawai.length>0){
			var str = $('#transport_note').val() + array_pegawai[4]
			$('#transport_note').val(str)
		}else{
			alert('Harap pilih Pegawai !');
		}
	})
	
	$('#btnInsHp').click(function(){
		if (array_pegawai.length>0){
			var str = $('#transport_note').val() + array_pegawai[5]
			$('#transport_note').val(str)
		}else{
			alert('Harap pilih Pegawai !');
		}
	})
	
	$('#btnInsRekening').click(function(){
		if (array_pegawai.length>0){
			var str = $('#fppd_note').val() + array_pegawai[6]
			$('#fppd_note').val(str)
			
		}else{
			alert('Harap pilih Pegawai !');
		}
	})
	
	function handleClick(radio){
		var val = $('#is_money_dp').val()
		if (val==0){
			$('#detail_uang_muka').hide()
			$('#tr_list_biaya').hide()
		}else{
			$('#detail_uang_muka').show()
			$('#tr_list_biaya').show()
		}
	}
	
	$('#is_money_dp').val(1)
	
	$('#btnSaveFppd').click(function(){
			if ($('#fppd_no').val()==''){alert('Harap Isi Kolom FPPD !');return;}
			if (array_pegawai.length==0){alert('Harap Pilih Pegawai Terlebih dahulu !');return;}
			if ($('#purpose').val()==''){alert('Harap Isi Kolom Keperluan !');return;}
			if (array_table_tujuan.length==0){alert('Harap Isi Tujuan !');return;}
			if ($('#is_transport_air').val()==''){alert('Harap Pilih Transaportasi Udara !');return;}
			if ($('#is_transport_other').val()==''){alert('Harap Pilih Transaportasi Lainnya !');return;}
			if ($('#transport_note').val()==''){alert('Harap Isi Transaportasi Lainnya !');return;}
			if ($('#is_accomodation').val()==''){alert('Harap pilih Akomodasi !');return;}
			if ($('#accomodation_note').val()==''){alert('Harap pilih Akomodasi !');return;}
			if ($('#is_money_dp').val()==''){alert('Harap pilih uang muka yang dibutuhkan !');return;}
			if ($('#fppd_note').val()==''){alert('Harap isi kolom Keterangan !');return;}
			
			
			$.getJSON('index.php/sppd_fppd/select_table', {
				query : " select * from sppd_t_fppd_main where fppd_no='"+$('#fppd_no').val()+"' "
			}).done(function(res){
				if (res[0].length<=0){
					$.getJSON('index.php/sppd_fppd/insert_fppd_main', {
						fppd_no : $('#fppd_no').val(),
						user : user,
						employee_id : array_pegawai[0]
					}).done(function(jsn){
							var fppd_main_id = jsn.id
							$.getJSON('index.php/sppd_fppd/insert_fppd', {
								fppd_main_id : fppd_main_id,
								purpose : $('#purpose').val(),
								is_transport_air : $('#is_transport_air').val(),
								is_transport_other : $('#is_transport_other').val(),
								transport_note : $('#transport_note').val(),
								is_accomodation : $('#is_accomodation').val(),
								accomodation_note : $('#accomodation_note').val(),
								is_money_dp : $('#is_money_dp').val(),
								pp_code_id : array_pegawai[7],
								fppd_note : $('#fppd_note').val(),
								created_by : user
							}).done(function(jsn2){
								var fppd_id = jsn2.id
								
								for (i=0 ; i< array_table_tujuan.length ; i++){
									var idx_tujuan=1
									$.getJSON('index.php/sppd_fppd/insert_fppd_dest',{
										fppd_id : fppd_id,
										destination_id : array_table_tujuan[i][3],
										departure_date : array_table_tujuan[i][4],
										departure_time : array_table_tujuan[i][5],
										arrival_date : array_table_tujuan[i][6],
										arrival_time : array_table_tujuan[i][7],
										effective_date : array_table_tujuan[i][8],
										eff_date_tot : array_table_tujuan[i][9],
										eff_date_note : array_table_tujuan[i][10],
										record_type : 'O',
										created_by : user
									}).done(function(jsn3){
										var fppd_dest_id = jsn3.id
										idx_tujuan=idx_tujuan+1
									})
								}
								
								if ($('#is_money_dp').val()==1){
									if (array_biaya_lain.length > 0){
										for (q=0 ; q < array_biaya_lain.length ; q++){
												$.getJSON('index.php/sppd_fppd/insert_fppd_cost_other',{
													fppd_id : fppd_id,
													cost_breakdown : array_biaya_lain[q][0],
													currency_id : array_biaya_lain[q][3],
													amount : array_biaya_lain[q][2],
													record_type : 'O',
													created_by : user
												}).done(function(jsn5){
														
												})
										}
									}
								}
								
								for (i=0 ; i< array_link.length ; i++){
									$.getJSON('index.php/sppd_fppd/insert_fppd_link',{
										fppd_id : fppd_id,
										doc_description : array_link[i][0],
										doc_address : array_link[i][1],
										user : user
									}).done(function(jsn3){
									
									})
								}
								
								load("sppd_fppd/index?user="+user+"&rand="+randomString(),"#content");
							})
					})
				}else{
					alert('No FPPD sudah ada !');
				}
			})

	})
	
	function arr_to_table_link(arr){
		array_link.push([arr.doc_description, arr.doc_address])
		$('#list_link')[0].record=array_link
	}
	
	$('#btnRemoveLink').click(function(){
		$.each($('#list_link')[0].selectedIndex, function(i, val){
			$('#list_link')[0].data.splice(val,1)
			$('#list_link')[0].generateData()
		})
	})
	
</script>