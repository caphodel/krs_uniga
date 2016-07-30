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
	<table id="table_fdpd">
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
			<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_perjalanan_dinas">
				<tr height="40px">
					<td width="20%">Biaya Perjalanan Dinas</td><td width="20%"> : </td><td width="2%"></td><td width="58%"></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Transportasi Udara</td><td width="1%"> : </td><td width="29%"><j-radiofield id="is_transport_air" class="inp_disable">[[1, "Disediakan"], [0, "Diatur Sendiri"]]</j-radiofield></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Transportasi Lainnya</td><td width="1%"> : </td><td width="29%"><j-radiofield id="is_transport_other" class="inp_disable">[[1, "Disediakan"], [0, "Diatur Sendiri"]]</j-radiofield></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Keterangan Transportasi</td><td width="1%"> : </td><td width="29%"><j-textArea id="transport_note" class="inp_disable"></j-textArea></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Akomodasi</td><td width="1%"> : </td><td width="29%"><j-radiofield id="is_accomodation" class="inp_disable">[[1, "Disediakan"], [0, "Diatur Sendiri"]]</j-radiofield></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Keterangan Akomodasi</td><td width="1%"> : </td><td width="29%"><j-textArea id="accomodation_note" class="inp_disable"></j-textArea></td>
				</tr>
				<tr height="40px">
					<td width="20%"></td><td width="20%">Uang Muka Yang Dibutuhkan</td><td width="1%"> : </td><td width="29%"><j-radiofield id="is_money_dp" class="inp_disable">[[1, "Ya"], [0, "Tidak"]]</j-radiofield></td>
				</tr>
			</table>
			<div id="detail_uang_muka">
			</div>
		<br/>
		<table style="border-collapse: collapse;border: 1px solid #FFFFFF;" width="100%" id="table_tindakan_karyawan">
			<tr height="40px" id="tr_list_biaya">
				<td width="20%">Lain Lain</td><td width="1%">:</td><td colspan="4">
					<j-table width="600px" id="list_biaya">
						  <j-custom target="3">
							function(record){
								return record[4];
							}
						  </j-custom>
						  [
							["Keterangan", "Mata Uang", "Nominal", "Pembayaran Oleh"]	
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
				<td width="20%">Keterangan</td><td width="1%">:</td><td colspan="4"><j-textArea id="fppd_note" class="inp_disable"></j-textArea></td>
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
			$('#fppd_no').text(obj_karyawan.fppd_no)
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
		detail_uang_muka(arr.destination_id, array_pegawai[3], no)
	}
	
	function detail_tujuan(data){
		$('#detail_tujuan').append('<br/><table style="border-collapse: collapse;border: 1px solid #BDBDAE;" width="100%" class="table_detail_tujuan"><tr height="40px"><td width="20%">'+data.no+'. Kota</td><td width="1%">:</td><td width="29%" colspan="4">'+data.city+'</td></tr><tr height="40px"><td width="20%">Tanggal Berangkat</td><td width="1%">:</td><td width="29%">'+data.departure_date+'</td><td width="20%">Jam</td><td width="1%">:</td><td width="29%">'+data.departure_time+'</td></tr><tr height="40px"><td width="20%">Tanggal Kembali</td><td width="1%">:</td><td width="29%">'+data.arrival_date+'</td><td width="20%">Jam</td><td width="1%">:</td><td width="29%">'+data.arrival_time+'</td></tr><tr height="40px"><td width="20%">Hari Efektif</td><td width="1%">:</td><td width="29%"><j-textArea value="'+data.eff_date+'" class="inp_disable"></j-textArea></td><td width="20%">Jumlah Hari Efektif</td><td width="1%">:</td><td width="29%">'+data.eff_date_tot+'</td></tr></tr><tr height="40px"><td width="20%">Keterangan Hari Efektif</td><td width="1%">:</td><td width="29%" colspan="4">'+data.eff_date_note+'</td></tr></table><br/>');
	}
	
	function detail_uang_muka(destination_id, is_sf, no){
			var sf=0
			var symbol_saku_konsumsi=''
			var uang_saku_konsumsi=0
			var symbol_saku=''
			var uang_saku=0
			var symbol_konsumsi=''
			var uang_konsumsi=0
			sf=is_sf
			$.getJSON('index.php/sppd_fppd_list_detail/select_dest_cost', {
				fppd_id : '<?php echo $_REQUEST['fppd_id']; ?>',  
				destination_id : destination_id
			}).done(function(jsn){
				if (jsn.data.length==1){
					cost_purpose_id_saku_konsumsi=jsn.data[0][0]
					symbol_saku_konsumsi=jsn.data[0][1]
					uang_saku_konsumsi=jsn.data[0][2]
					uang_saku_konsumsi = uang_saku_konsumsi.replace(/.[^.]+$/, "")
					array_uang_muka.push([jsn.data[0][3], uang_saku_konsumsi, symbol_saku_konsumsi, cost_purpose_id_saku_konsumsi, no])
				}else if (jsn.data.length > 1){
					cost_purpose_id_saku=jsn.data[0][0]
					symbol_saku=jsn.data[0][1]
					uang_saku=jsn.data[0][2]
					uang_saku = uang_saku.replace(/.[^.]+$/, "")
					array_uang_muka.push([jsn.data[0][3], uang_saku, symbol_saku, cost_purpose_id_saku, no])
					
					cost_purpose_id_konsumsi=jsn.data[1][0]
					symbol_konsumsi=jsn.data[1][1]
					uang_konsumsi=jsn.data[1][2]
					uang_konsumsi = uang_konsumsi.replace(/.[^.]+$/, "")

					array_uang_muka.push([jsn.data[1][3], uang_konsumsi, symbol_konsumsi, cost_purpose_id_konsumsi, no])
				}
				
				$('#detail_uang_muka').append('<br/><table style="border-collapse: collapse;border: 1px solid #BDBDAE;" id="table_uang_muka"><tr height="30px"><td width="210px"><b>Struktural Fungsional</b></td><td width="20px"></td><td width="50px"></td><td width="200px"></td></tr><tr height="30px"><td style="text-align:right">Uang Saku Dan Konsumsi</td><td> : </td><td>'+symbol_saku_konsumsi+'</td><td>'+uang_saku_konsumsi+'</td></tr><tr height="30px"><td><b>Pekerjaan Operasional</b></td><td></td><td></td><td></td></tr height="30px"><tr height="30px"><td style="text-align:right">Uang Saku</td><td> : </td><td>'+symbol_saku+'</td><td>'+uang_saku+'</td></tr><tr height="30px"><td style="text-align:right">Konsumsi</td><td> : </td><td>'+symbol_konsumsi+'</td><td>'+uang_konsumsi+'</td></tr></table><br/>');
			})
			$(".inp_disable").attr("disabled","disabled")
	}
	
	function arr_to_table_biaya(arr){			
		array_biaya_lain.push([arr.cost_breakdown, arr.curr_symbol, arr.amount, arr.currency , arr.processed_by]);
		$('#list_biaya')[0].record=array_biaya_lain
		array_biaya_lain2.push([arr.currency, arr.amount, arr.curr_symbol])
	}
	
	load_data('<?php echo $_REQUEST['fppd_id']; ?>')
	
	function load_data(fppd_id){
		$.getJSON('index.php/sppd_fppd_list_detail/get_data_employee_detail', {
			user : user,
			fppd_id : fppd_id
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
					fppd_no : jsn.aaData[0][17]
				}
				load_karyawan(detail_karyawan)
				load_det()
			} 
		})
		
				
	}
	
	function load_det(id){
		var fppd_id='<?php echo $_REQUEST['fppd_id']; ?>'
		//select tujuan
		$.getJSON('index.php/sppd_fppd_list_detail/get_data_destination_detail', {
			fppd_id : fppd_id
		}).done(function(jsn){
			if (jsn.aaData.length > 0){
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
		
		$.getJSON('index.php/sppd_fppd_list_detail/select_table', {
			query : "select purpose from sppd_t_fppd where fppd_id='"+fppd_id+"'"
		}).done(function(json){
			$('#purpose').text(json[0][0].purpose)
		})
		
		//select cost other
		$.getJSON('index.php/sppd_fppd_list_detail/get_data_other', {
			fppd_id : fppd_id
		}).done(function(jsn){
			if (jsn.aaData!=null){
				if (jsn.aaData.length > 0){
					$.each(jsn.aaData, function(i,val){
						jsn.aaData[i][3] = parseInt(jsn.aaData[i][3])
						var myArray = {
							cost_breakdown : jsn.aaData[i][0],
							currency : jsn.aaData[i][1],
							curr_symbol : jsn.aaData[i][2],
							amount : jsn.aaData[i][3],
							processed_by : jsn.aaData[i][4]
						}
						arr_to_table_biaya(myArray)
					})
				}
			}
		})
		
		//select tujuan
		$.getJSON('index.php/sppd_fppd_list_detail/get_data_transport_detail', {
			fppd_id : fppd_id
		}).done(function(jsn){
			if (jsn.aaData.length > 0){
				$.each(jsn.aaData, function(i,val){
					$('#is_transport_air').val(jsn.aaData[i][0])
					$('#is_transport_other').val(jsn.aaData[i][1])
					$('#transport_note').val(jsn.aaData[i][2])
					$('#is_accomodation').val(jsn.aaData[i][3])
					$('#accomodation_note').val(jsn.aaData[i][4])
					$('#is_money_dp').val(jsn.aaData[i][5])
					$('#fppd_note').val(jsn.aaData[i][6])
				})
			}
		})
		
		//select Link
		$.getJSON('index.php/sppd_fppd_list_detail/get_data_link', {
			fppd_id : fppd_id
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
		
		
		//select Total Fix
		$.getJSON('index.php/sppd_fppd_list_detail/get_fppd_total_fix', {
			fppd_id : fppd_id
		}).done(function(jsn){
			if (jsn.aaData!=null){
				$.each(jsn.aaData, function(i,val){
					val[1] = val[1].replace(/.[^.]+$/, "")
					$('#table_total_all').append('<tr><td>'+val[0]+'</td><td>'+val[1]+'</td></tr>')
				})
			}
		})
				
	}
	
	function arr_to_table_link(arr){
		array_link.push([arr.doc_description, arr.doc_address])
		$('#list_link')[0].record=array_link
	}
	
	
</script>