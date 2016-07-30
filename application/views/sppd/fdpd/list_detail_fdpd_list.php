<style>
	#table_identitas_karyawan{
		font-family:arial;
	}
	#table_fdpd{
		font-family:arial;
		font-size: 14px;
	}
	#div_tindakan{
		font-family:arial;
	}
	#table_perjalanan_dinas{
		font-family:arial;
	}
	fieldset {
		border: 0;
	}
	#table_uang_muka
	{
		font-family:arial;
		margin-left: 300px;
	}
	.table_detail_tujuan
	{
		font-family:arial;
	}
	caption {
		text-align: left;
	}
</style>
<div id="div_add_fdpd" class="j-panel">
	<table id="table_fdpd">
		<tr height="30px">
			<td>Nomor</td><td> : </td><td><a id="fdpd_no"></a></td>
		</tr>
		<tr height="30px">
			<td>Nomor SPPD</td><td> : </td><td><a id="fppd_no"></a></td>
		</tr>
	</table>
	<div id="div_identitas_karyawan" class="j-panel" data-content="IDENTITAS KARYAWAN">
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
					<td width="20%">Keperluan</td><td width="1%">:</td><td width="29%"><a id="purpose"></a></td>
					<td width="20%"></td><td width="1%"></td><td width="29%"></td>
				</tr>
				<tr height="40px">
					<td width="20%">Status SPPD</td><td width="1%">:</td><td width="29%"><j-radiofield id="is_done" class="inp_disable">[[1, "Terlaksana"], [0, "Batal"]]</j-radiofield></td>
					<td width="20%"></td><td width="1%"></td><td width="29%"></td>
				</tr>
				<tr height="40px">
					<td width="20%">Tujuan</td><td width="1%">:</td><td colspan="4">
						<j-table width="600px" id="list_tujuan">
							  [
								["No", "Kota", "Kategori"]	
							  ]
						</j-table>
					</td>
				</tr>
			</table>
			<div id="detail_tujuan">
			</div>
			<div id="rincian_pekejaan">
				<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_rincian_kegiatan">
					<tr height="40px">
						<td width="20%">Rincian Pekerjaan</td>
						<td width="2%"> : </td>
						<td width="78%">
							<j-table width="600px" id="list_rincian_kegiatan">
								  [
									["No", "Tanggal", "jam Datang", "Jam Pulang", "Pekerjaan"]	
								  ]
							</j-table>
						</td>
					</tr>
				</table>
			</div>
			<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_perjalanan_dinas">
				<tr height="40px">
					<td width="20%">Biaya Perjalanan Dinas</td>
					<td width="2%"> : </td>
					<td width="78%">
					</td>
				</tr>
				<tr height="40px">
					<td width="20%">Transportasi Udara</td>
					<td width="2%"> : </td>
					<td width="78%">
						<j-table width="600px" id="list_trans_udara">
							  [
								["No", "Tanggal", "Keterangan", "Mata Uang", "Pengeluaran", "Bukti"]	
							  ]
						</j-table>
					</td>
				</tr>
				<tr height="40px">
					<td width="20%">Transportasi lainnya</td>
					<td width="2%"> : </td>
					<td width="78%">
						<j-table width="600px" id="list_trans_lainnya">
							  [
								["No", "Tanggal", "Keterangan", "Mata Uang", "Pengeluaran", "Bukti"]	
							  ]
						</j-table>
					</td>
				</tr>
				<tr height="40px">
					<td width="20%">Akomodasi</td>
					<td width="2%"> : </td>
					<td width="78%">
						<j-table width="600px" id="list_akomodasi">
							  [
								["No", "Tanggal", "Keterangan", "Mata Uang", "Pengeluaran", "Bukti"]	
							  ]
						</j-table>
					</td>
				</tr>
			</table>
			<div id="detail_uang_muka">
			</div>
			<br/>
			<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_tindakan_karyawan">
			<tr height="40px">
				<td width="20%"><b>Lain Lain</b></td><td width="1%">:</td><td colspan="4">
					<j-table width="600px" id="list_biaya_lain">
						  [
							["No", "Tanggal", "Keterangan", "Mata Uang", "Pengeluaran", "Bukti"]
						  ]
					</j-table>
				</td>
			</tr>
			<tr height="40px">
				<td width="20%"><b>Total</b></td><td width="1%">:</td><td colspan="4" id="row_total_biaya"><table id="table_total_all"></table></td>
			</tr>
			<tr height="40px">
				<td width="20%">Biaya Yang Telah Diterima</td><td width="1%">:</td><td colspan="4"><table id="table_biaya_diterima"></table></td>
			</tr>
			<tr height="40px">
				<td width="20%">Kekurangan Biaya</td><td width="1%">:</td><td colspan="4"><table id="table_kekurangan_biaya"></table></td>
			</tr>
			<tr height="40px">
				<td width="20%">Keterangan</td><td width="1%">:</td><td colspan="4"><j-textArea id="fdpd_note" class="inp_disable"></j-textArea></td>
			</tr>
			<tr height="40px">
				<td width="20%">Dokumen Pendukung</td><td width="1%">:</td><td colspan="4">
					<j-table width="600px" id="list_link">
						  [
							["Keterangan", "Link"]
						  ]
					</j-table>
				</td>
			</tr>
		</table>
	</div>
</div>
<script>

	var no=0;
	var array_pegawai=[];
	var array_table_tujuan=[];
	var array_total=[];
	var array_trans_udara=[]
	var array_trans_lainnya=[]
	var array_rincian_kegiatan=[]
	var array_akomodasi=[]
	var array_biaya_lain=[]
	var array_biaya_diterima=[]
	var array_kekurangan_biaya=[]
	var array_uang_muka=[]
	var array_link=[];

	check = function(data, currency){
			var isi=true
			for(i=0 ;i<data.length;i++){
					if (data[i][2] == currency)
							isi = false
			}
			return isi
	}
		
	function load_karyawan(obj_karyawan){
			
			$('#fppd_no').text(obj_karyawan.fppd_no)
			$('#fdpd_no').text(obj_karyawan.fdpd_no)
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
	
	load_data('<?php echo $_REQUEST['fdpd_id']; ?>')
	
	function load_data(fdpd_id){
		
		//select tindakan karyawan 
		$.getJSON('index.php/sppd_fdpd_list_detail/get_data_employee_detail', {
			user : user,
			fdpd_id : fdpd_id
		}).done(function(jsn){
			if (jsn.aaData.length > 0){
				
				var detail_karyawan = {
					employee_id : jsn.aaData[0][10],
					nama : jsn.aaData[0][1],
					nik : jsn.aaData[0][2],
					posisi : jsn.aaData[0][8], 
					level : jsn.aaData[0][9],
					direktorat : jsn.aaData[0][3],
					divisi : jsn.aaData[0][4],
					deparment : jsn.aaData[0][5],
					seksi : jsn.aaData[0][6],
					lokasi_kerja : jsn.aaData[0][7],
					is_sf : jsn.aaData[0][11],
					address : jsn.aaData[0][12],
					phonenumber : jsn.aaData[0][13],
					banknumber : jsn.aaData[0][14],
					pp_code_id : jsn.aaData[0][15],
					pp_code : jsn.aaData[0][16],
					fppd_no : jsn.aaData[0][17],
					fdpd_no : jsn.aaData[0][18]
				}
				load_karyawan(detail_karyawan)
				load_det(fdpd_id)
			} 
		})
			
	}
	
	function load_det(fdpd_id){
		
		//select tujuan
		$.getJSON('index.php/sppd_fdpd_list_detail/get_data_destination_detail', {
			fdpd_id : fdpd_id
		}).done(function(jsn){
			if (jsn.aaData != null){
					$.each(jsn.aaData, function(i,val){
						var myArray ={
							city : jsn.aaData[i][0], 
							category_dest : jsn.aaData[i][1], 
							destination_id : jsn.aaData[i][2], 
							departure_date : jsn.aaData[i][3], 
							departure_time : jsn.aaData[i][4], 
							arrival_date : jsn.aaData[i][5], 
							arrival_time : jsn.aaData[i][6], 
							eff_date : jsn.aaData[i][7], 
							eff_date_tot : jsn.aaData[i][8], 
							eff_date_note : jsn.aaData[i][9], 
							category_dest_id : jsn.aaData[i][10], 
						}
						
						arr_to_table(myArray)
					})
			}
		})
		
		$.getJSON('index.php/sppd_fdpd_list_detail/select_table', {
			query : "select purpose from sppd_t_fdpd where fdpd_id='"+fdpd_id+"'"
		}).done(function(json){
			$('#purpose').text(json[0][0].purpose)
		})
		
		$.getJSON('index.php/sppd_fdpd_list_detail/get_fppd_total_fix', {
			fdpd_id : fdpd_id
		}).done(function(json){
			$.each(json.aaData, function(i, val){
				val[1]=val[1].replace(/.[^.]+$/, "")
				array_biaya_diterima.push([val[0], val[1], val[2]])
				$('#table_biaya_diterima').append('<tr><td>'+val[0]+'</td><td>'+val[1]+'</td></tr>')
			})
		})
		
		$.getJSON('index.php/sppd_fdpd_list_detail/get_data_rincian_pekerjaan', {
			fdpd_id : fdpd_id
		}).done(function(json){
				if (json.aaData != null){
					$.each(json.aaData, function(i, val){
						var myArray=[]
						myArray.push(
							val[0],
							val[1],
							val[2],
							val[3]
						)
						insert_rincian_kegiatan(myArray)
					})
				}
		})
		
		$.getJSON('index.php/sppd_fdpd_list_detail/get_data_transportasi_udara', {
			fdpd_id : fdpd_id
		}).done(function(json){
				if (json.aaData != null){
					$.each(json.aaData, function(i, val){
						var myArray=[]
						val[3]=val[3].replace(/.[^.]+$/, "")
						myArray.push(
							val[0],
							val[1],
							val[2],
							val[3],
							val[4],
							val[5]
						)
						
						insert_trans_udara(myArray)
					})
				}
		})
		
		$.getJSON('index.php/sppd_fdpd_list_detail/get_data_transportasi_lainnya', {
			fdpd_id : fdpd_id
		}).done(function(json){
			if (json.aaData != null){
				$.each(json.aaData, function(i, val){
					var myArray=[]
					val[3]=val[3].replace(/.[^.]+$/, "")
					myArray.push(
						val[0],
						val[1],
						val[2],
						val[3],
						val[4],
						val[5]
					)
					
					insert_trans_lainnya(myArray)
				})
			}
		})
		
		$.getJSON('index.php/sppd_fdpd_list_detail/get_data_akomodasi', {
			fdpd_id : fdpd_id
		}).done(function(json){
			if (json.aaData != null){
				$.each(json.aaData, function(i, val){
					var myArray=[]
					val[3]=val[3].replace(/.[^.]+$/, "")
					myArray.push(
						val[0],
						val[1],
						val[2],
						val[3],
						val[4],
						val[5]
					)
					
					insert_akomodasi(myArray)
				})
			}
		})
		
		
		$.getJSON('index.php/sppd_fdpd_list_detail/get_data_lain_lain', {
			fdpd_id : fdpd_id
		}).done(function(json){
			if (json.aaData != null){
				$.each(json.aaData, function(i, val){
					var myArray=[]
					val[3]=val[3].replace(/.[^.]+$/, "")
					myArray.push(
						val[0],
						val[1],
						val[2],
						val[3],
						val[4],
						val[5]
					)
					
					insert_biaya_lain(myArray)
				})
			}
		})
		
		$.getJSON('index.php/sppd_fdpd_list_detail/select_table', {
			query : "select fdpd_note from sppd_t_fdpd where fdpd_id='"+fdpd_id+"'"
		}).done(function(json){
			$('#fdpd_note').val(json[0][0].fdpd_note)
		})
		
		$.getJSON('index.php/sppd_fdpd_list_detail/select_table', {
			query : "select is_done from sppd_t_fdpd where fdpd_id='"+fdpd_id+"'"
		}).done(function(json){
			$('#is_done').val(json[0][0].is_done)
		})
		
		//select Link
		$.getJSON('index.php/sppd_fdpd_list_detail/get_data_link', {
			fdpd_id : fdpd_id
		}).done(function(jsn){
			if (jsn.aaData!=null){
				$.each(jsn.aaData, function(i,val){
					var myArray = {
						doc_description : jsn.aaData[i][0],
						doc_address : jsn.aaData[i][1]
					}
					arr_to_table_link(myArray)
				})
			}
		})
		
	}
	
	function arr_to_table_link(arr){
		array_link.push([arr.doc_description, arr.doc_address])
		$('#list_link')[0].record=array_link
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
		
	function detail_uang_muka(category_dest_id, is_sf, no, tot_day){
			var sf=0
			var symbol_saku_konsumsi=''
			var uang_saku_konsumsi=0
			var symbol_saku=''
			var uang_saku=0
			var symbol_konsumsi=''
			var uang_konsumsi=0
			sf=is_sf
			$.getJSON('index.php/sppd_fppd/select_dest_cost', {
				category_dest_id : category_dest_id,  
				is_sf : sf
			}).done(function(jsn){
				if (sf==1){
					cost_purpose_id_saku_konsumsi=jsn.data[0][0]
					symbol_saku_konsumsi=jsn.data[0][1]
					uang_saku_konsumsi=jsn.data[0][2]
					uang_saku_konsumsi = uang_saku_konsumsi.replace(/.[^.]+$/, "")
					uang_saku_konsumsi = uang_saku_konsumsi * tot_day
					array_uang_muka.push([jsn.data[0][3], uang_saku_konsumsi, symbol_saku_konsumsi, cost_purpose_id_saku_konsumsi, no])
				}else if (sf==0){
					cost_purpose_id_saku=jsn.data[0][0]
					symbol_saku=jsn.data[0][1]
					uang_saku=jsn.data[0][2]
					uang_saku = uang_saku.replace(/.[^.]+$/, "")
					uang_saku = uang_saku * tot_day
					array_uang_muka.push([jsn.data[0][3], uang_saku, symbol_saku, cost_purpose_id_saku, no])
					
					cost_purpose_id_konsumsi=jsn.data[1][0]
					symbol_konsumsi=jsn.data[1][1]
					uang_konsumsi=jsn.data[1][2]
					uang_konsumsi = uang_konsumsi.replace(/.[^.]+$/, "")
					uang_konsumsi = uang_konsumsi * tot_day

					array_uang_muka.push([jsn.data[1][3], uang_konsumsi, symbol_konsumsi, cost_purpose_id_konsumsi, no])
				}
				
				$('#detail_uang_muka').append('<br/><table style="border-collapse: collapse;border: 1px solid #BDBDAE;" id="table_uang_muka"><tr height="30px"><td width="210px"><b>Struktural Fungsional</b></td><td width="20px"></td><td width="50px"></td><td width="200px"></td></tr><tr height="30px"><td style="text-align:right">Uang Saku Dan Konsumsi</td><td> : </td><td>'+symbol_saku_konsumsi+'</td><td>'+uang_saku_konsumsi+'</td></tr><tr height="30px"><td><b>Pekerjaan Operasional</b></td><td></td><td></td><td></td></tr height="30px"><tr height="30px"><td style="text-align:right">Uang Saku</td><td> : </td><td>'+symbol_saku+'</td><td>'+uang_saku+'</td></tr><tr height="30px"><td style="text-align:right">Konsumsi</td><td> : </td><td>'+symbol_konsumsi+'</td><td>'+uang_konsumsi+'</td></tr></table><br/>');
				count_total()
			})
	}
	
	function reload_array_tujuan(){
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
		$('#detail_tujuan').append('<br/><table style="border-collapse: collapse;border: 1px solid #BDBDAE;" width="100%" class="table_detail_tujuan"><tr height="40px"><td width="20%">'+data.no+'. Kota</td><td width="1%">:</td><td width="29%" colspan="4">'+data.city+'</td></tr><tr height="40px"><td width="20%">Tanggal Berangkat</td><td width="1%">:</td><td width="29%">'+data.departure_date+'</td><td width="20%">Jam</td><td width="1%">:</td><td width="29%">-</td></tr><tr height="40px"><td width="20%">Tanggal Kembali</td><td width="1%">:</td><td width="29%">'+data.arrival_date+'</td><td width="20%">Jam</td><td width="1%">:</td><td width="29%">-</td></tr><tr height="40px"><td width="20%">Hari Efektif</td><td width="1%">:</td><td width="29%"><j-textArea value="'+data.eff_date+'" class="inp_disable"></j-textArea></td><td width="20%">Jumlah Hari Efektif</td><td width="1%">:</td><td width="29%">'+data.eff_date_tot+'</td></tr></tr><tr height="40px"><td width="20%">Keterangan Hari Efektif</td><td width="1%">:</td><td width="29%" colspan="4">'+data.eff_date_note+'</td></tr></table><br/>');
	}
	
	$('#btnEditTujuan').click(function(){
		if ($('#list_tujuan')[0].selectedIndex.length==0){
			alert('Pilih salah satu tujuan !');
		}else{
			if ($('#list_tujuan')[0].selectedIndex.length==1){
				$.ajax({
					url: 'index.php/sppd_fdpd/pop_up_edit_tujuan',
					data : {
						idx : $('#list_tujuan')[0].selectedIndex[0],
						user : user,
						employee_id : array_pegawai[0]
					},
					success: function(data){
						$('#div_add_fdpd').append(data);
					}
				})
			}else{
				alert('Pilih satu tujuan !');
			}
		}
	})
	
	$('#btnAddKegiatan').click(function(){
		$.ajax({
			url: 'index.php/sppd_fdpd/pop_up_add_kegiatan',
			success: function(data){
				$('#div_add_fdpd').append(data);
			}
		})
	})
	
	$('#btnRemoveKegiatan').click(function(){
		$.each($('#list_rincian_kegiatan')[0].selectedIndex, function(i, val){
			$('#list_rincian_kegiatan')[0].data.splice(i,1)
			$('#list_rincian_kegiatan')[0].generateData()
		})
		reload_array_kegiatan()
	})
	
	function reload_array_kegiatan(){
		array_rincian_kegiatan=[];
		no_rincian_kegiatan=0;
		$.each($('#list_rincian_kegiatan')[0].record, function(i, val){
			no_rincian_kegiatan=no_rincian_kegiatan+1
			array_rincian_kegiatan.push([no_rincian_kegiatan, val[1], val[2], val[3], val[4]]);
		})
		$('#list_rincian_kegiatan')[0].record=array_rincian_kegiatan
		count_total()
	}
	
	$('#btnAddUdara').click(function(){
		$.ajax({
			url: 'index.php/sppd_fdpd/pop_up_add_biaya',
			data : {
					jenis : 'trans_udara'
			},
			success: function(data){
				$('#div_add_fdpd').append(data);
			}
		})
	})
	
	$('#btnRemoveUdara').click(function(){
		$.each($('#list_trans_udara')[0].selectedIndex, function(i, val){
			$('#list_trans_udara')[0].data.splice(i,1)
			$('#list_trans_udara')[0].generateData()
		})
		reload_array_trans_udara()
	})
	
	function reload_array_trans_udara(){
		array_trans_udara=[];
		no_trans_udara=0;
		$.each($('#list_trans_udara')[0].record, function(i, val){
			no_trans_udara=no_trans_udara+1
			array_trans_udara.push([no_trans_udara, val[1], val[2], val[3], val[4], val[5], val[6]]);
		})
		$('#list_trans_udara')[0].record=array_trans_udara
		count_total()
	}
	
	$('#btnAddLainnya').click(function(){
		$.ajax({
			url: 'index.php/sppd_fdpd/pop_up_add_biaya',
			data : {
					jenis : 'trans_lainnya'
			},
			success: function(data){
				$('#div_add_fdpd').append(data);
			}
		})
	})	
		
	$('#btnRemoveLainnya').click(function(){
		$.each($('#list_trans_lainnya')[0].selectedIndex, function(i, val){
			$('#list_trans_lainnya')[0].data.splice(i,1)
			$('#list_trans_lainnya')[0].generateData()
		})
		reload_array_trans_lainnya()
	})
	
	function reload_array_trans_lainnya(){
		array_trans_lainnya=[];
		no_trans_lainnya=0;
		$.each($('#list_trans_lainnya')[0].record, function(i, val){
			no_trans_lainnya=no_trans_lainnya+1
			array_trans_lainnya.push([no_trans_lainnya, val[1], val[2], val[3], val[4], val[5], val[6]]);
		})
		$('#list_trans_lainnya')[0].record=array_trans_lainnya
		count_total()
	}
	
	$('#btnAddAkomodasi').click(function(){
		$.ajax({
			url: 'index.php/sppd_fdpd/pop_up_add_biaya',
			data : {
					jenis : 'akomodasi'
			},
			success: function(data){
				$('#div_add_fdpd').append(data);
			}
		})
	})
	
	$('#btnRemoveAkomodasi').click(function(){
		$.each($('#list_akomodasi')[0].selectedIndex, function(i, val){
			$('#list_akomodasi')[0].data.splice(i,1)
			$('#list_akomodasi')[0].generateData()
		})
		reload_array_akomodasi()
	})
	
	function reload_array_akomodasi(){
		array_akomodasi=[];
		no_akomodasi=0;
		$.each($('#list_akomodasi')[0].record, function(i, val){
			no_akomodasi=no_akomodasi+1
			array_akomodasi.push([no_akomodasi, val[1], val[2], val[3], val[4], val[5], val[6]]);
		})
		$('#list_akomodasi')[0].record=array_akomodasi
		count_total()
	}
	
	$('#btnAddBiayaLain').click(function(){
		$.ajax({
			url: 'index.php/sppd_fdpd/pop_up_add_biaya',
			data : {
					jenis : 'biaya_lain'
			},
			success: function(data){
				$('#div_add_fdpd').append(data);
			}
		})
	})
	
	$('#btnRemoveBiayaLain').click(function(){
		$.each($('#list_biaya_lain')[0].selectedIndex, function(i, val){
			$('#list_biaya_lain')[0].data.splice(i,1)
			$('#list_biaya_lain')[0].generateData()
		})
		reload_array_biaya_lain()
	})
	
	function reload_array_biaya_lain(){
		array_biaya_lain=[];
		no_biaya_lain=0;
		$.each($('#list_biaya_lain')[0].record, function(i, val){
			no_biaya_lain=no_biaya_lain+1
			array_biaya_lain.push([no_biaya_lain, val[1], val[2], val[3], val[4], val[5], val[6]]);
		})
		$('#list_biaya_lain')[0].record=array_biaya_lain
		count_total()
	}
		
	var no_rincian_kegiatan=0
	function insert_rincian_kegiatan(arr){
		no_rincian_kegiatan=no_rincian_kegiatan+1
		array_rincian_kegiatan.push([no_rincian_kegiatan, arr[0], arr[1], arr[2], arr[3]]);
		$('#list_rincian_kegiatan')[0].record=array_rincian_kegiatan
		count_total()
	}
	
	var no_trans_udara=0
	function insert_trans_udara(arr){
			no_trans_udara=no_trans_udara+1
			array_trans_udara.push([no_trans_udara, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]]);
			$('#list_trans_udara')[0].record=array_trans_udara
			count_total()
	}
	
	var no_trans_lainnya=0
	function insert_trans_lainnya(arr){
			no_trans_lainnya=no_trans_lainnya+1
			array_trans_lainnya.push([no_trans_lainnya, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]]);
			$('#list_trans_lainnya')[0].record=array_trans_lainnya
			count_total()
	}
	
	var no_akomodasi=0
	function insert_akomodasi(arr){
			no_akomodasi=no_akomodasi+1
			array_akomodasi.push([no_akomodasi, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]]);
			$('#list_akomodasi')[0].record=array_akomodasi
			count_total()
	}
	
	var no_biaya_lain=0
	function insert_biaya_lain(arr){
			no_biaya_lain=no_biaya_lain+1
			array_biaya_lain.push([no_biaya_lain, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]]);
			$('#list_biaya_lain')[0].record=array_biaya_lain
			count_total()
	}
	
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
				  array_total.push([array_uang_muka[i][2], array_uang_muka[i][1], array_uang_muka[i][0]])
				}else{
				  for(var a in array_total){
					if (array_total[a][0]==curr){
					  array_total[a][1]=parseInt(array_total[a][1])+parseInt(tot)
					}
				  }
				}
		  }
		}
		
		for(var i in array_trans_udara){
		  if (i!='_reduce'){
				curr=array_trans_udara[i][6]
				tot=array_trans_udara[i][4]
				if (check(array_total, array_trans_udara[i][6])){
				  array_total.push([array_trans_udara[i][3], array_trans_udara[i][4], array_trans_udara[i][6]])
				}else{
				  for(var a in array_total){
					if (array_total[a][2]==curr){
					  array_total[a][1]=parseInt(array_total[a][1])+parseInt(tot)
					}
				  }
				}
		  }
		}
		
		for(var i in array_trans_lainnya){
		  if (i!='_reduce'){
				curr=array_trans_lainnya[i][6]
				tot=array_trans_lainnya[i][4]
				if (check(array_total, array_trans_lainnya[i][6])){
				  array_total.push([array_trans_lainnya[i][3], array_trans_lainnya[i][4], array_trans_lainnya[i][6]])
				}else{
				  for(var a in array_total){
					if (array_total[a][2]==curr){
					  array_total[a][1]=parseInt(array_total[a][1])+parseInt(tot)
					}
				  }
				}
		  }
		}
		
		for(var i in array_akomodasi){
		  if (i!='_reduce'){
				curr=array_akomodasi[i][6]
				tot=array_akomodasi[i][4]
				if (check(array_total, array_akomodasi[i][6])){
				  array_total.push([array_akomodasi[i][3], array_akomodasi[i][4], array_akomodasi[i][6]])
				}else{
				  for(var a in array_total){
					if (array_total[a][2]==curr){
					  array_total[a][1]=parseInt(array_total[a][1])+parseInt(tot)
					}
				  }
				}
		  }
		}
		
		for(var i in array_biaya_lain){
		  if (i!='_reduce'){
				curr=array_biaya_lain[i][6]
				tot=array_biaya_lain[i][4]
				if (check(array_total, array_biaya_lain[i][6])){
					array_total.push([array_biaya_lain[i][3], array_biaya_lain[i][4], array_biaya_lain[i][6]])
				}else{
				  for(var a in array_total){
					if (array_total[a][2]==curr){
					  array_total[a][1]=parseInt(array_total[a][1])+parseInt(tot)
					}
				  }
				}
		  }
		}
		
		count_kekurangan_biaya(array_total)
		
		if (array_total.length > 0){
			for(var a in array_total){
				if (a!='_reduce'){
					$('#table_total_all').append('<tr><td>'+array_total[a][0]+'</td><td>'+array_total[a][1]+'</td></tr>')
				}
			}
		}
		
		$(".inp_disable").attr("disabled","disabled")
		
	}
		
	function count_kekurangan_biaya(arr){
		var array_kekurangan_biaya=[]
		$('#table_kekurangan_biaya').children().remove()
		
		//Jika ada di fdpd tapi tidak ada di fppd
		for(var i in arr){
			if (i!='_reduce'){
				if (check(array_biaya_diterima, arr[i][2])){
					array_kekurangan_biaya.push([arr[i][0], arr[i][1], arr[i][2]])
				}
			}
		}
		
		//Jika ada di fppd tapi tidak ada di fdpd
		for(var i in array_biaya_diterima){
			if (i!='_reduce'){
				if (check(arr, array_biaya_diterima[i][2])){
					var tot = parseFloat(0) - parseFloat(array_biaya_diterima[i][1])
					array_kekurangan_biaya.push([array_biaya_diterima[i][0], tot, array_biaya_diterima[i][2]])
				}
			}
		}
		
		//Pengurangan
		for(var i in arr){
			if (i!='_reduce'){
				curr=arr[i][2]
				tot=arr[i][1]
				for(var a in array_biaya_diterima){
					if (a!='_reduce'){
						if (array_biaya_diterima[a][2]==curr){
						  var total = parseFloat(tot) - parseFloat(array_biaya_diterima[a][1])
						  array_kekurangan_biaya.push([arr[i][0], total, arr[i][2]])
						}
					}
				}
			}
		}
		
		if (array_kekurangan_biaya.length > 0){
			for(var a in array_kekurangan_biaya){
				if (a!='_reduce'){
					$('#table_kekurangan_biaya').append('<tr><td>'+array_kekurangan_biaya[a][0]+'</td><td>'+array_kekurangan_biaya[a][1]+'</td></tr>')
				}
			}
		}
		
	}
		
</script>