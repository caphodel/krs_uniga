<j-modal id="mdlAddKota" title="Tambah Tujuan" drag="true" mask="true" height="550px" width="550px">
	<div id="pop_up_add_tujuan">
		<table>
			<tr>
				<td>
					<j-combofield id="city" pk="5">Kota
						<j-table >
							<j-loader src="http://gggmpscdweb05/new/index.php/sppd_fppd/get_data_destination?employee_id=<?php echo $_REQUEST['employee_id']; ?>&user=<?php echo $_REQUEST['user']; ?>"></j-loader>
								[["No", "Kota", "Provinsi/Negara", "Kategori"]]
							<j-pagination>
							</j-pagination>
						</j-table>
					</j-combofield>
				</td>
				<td>
				</td>
			</tr>
			<tr>
				<td>
					<j-dateField id="departure_date" format="YYYY-MM-DD">Tanggal Berangkat</j-dateField>
				</td>
				<td>
					<j-timeField id="departure_time">Jam</j-timeField>
				</td>
			</tr>
			<tr>
				<td>
					<j-dateField id="arrival_date" format="YYYY-MM-DD">Tanggal Kembali</j-dateField>
				</td>
				<td>
					<j-timeField id="arrival_time">Jam</j-timeField>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<j-table id="list_hari" height="200px">
						<j-toolbar id="toolbar">
								<j-spacer></j-spacer><j-button color="blue" id="btnGenerate">Generate Hari Efektif</j-button><j-button color="blue" id="btnSelectAll" icon="fa-check">Pilih Semua</j-button><j-button color="blue" id="btnTambah" icon="fa-plus">Tambah</j-button>
						</j-toolbar>
							[
								["Tanggal", "Hari", "Check"]	
							]
					</j-table>
				</td>
			</tr>
			<tr>
				<td>
					<j-textArea id="eff_date" class="inp_disable">Hari Efektif</j-textArea>
				</td>
				<td>
					<span>Jumlah Hari Efektif : </span><label id="eff_date_tot">-</label>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<j-textArea id="eff_date_note">Ket. Hari Efektif</j-textArea>
				</td>
			</tr>
			<tr height="50px">
				<td colspan="2">
					<j-button id="save_pop_up" color="blue" icon="fa-save">Save</j-button>
					<j-button id="close_pop_up" color="blue" >Close</j-button>
				</td>
			</tr>
		</table>
	</div>
</j-modal>
<script>

	$('#save_pop_up').click(function(){
		if ($('#city').val()==''){alert('Kota harus di isi !');return;}
		if ($('#departure_date').val()==''){alert('Tanggal Berangkat harus di isi !');return;}
		if ($('#arrival_date').val()==''){alert('Tanggal Kembali harus di isi !');return;}
		if ($('#arrival_date').val() < $('#departure_date').val()){alert('Harap cek tanggal !');return;}
		if ($('#eff_date_note').val()==''){alert('Keterangan Hari Efektif harus di isi !');return;}
		
		var myArray ={
			city : $('#city')[0].getSelectedRecord()[1], 
			category_dest : $('#city')[0].getSelectedRecord()[3],
			destination_id : $('#city').val(),
			departure_date : $('#departure_date').val(),
			departure_time : $('#departure_time').val(),
			arrival_date : $('#arrival_date').val(),
			arrival_time : $('#arrival_time').val(), 
			eff_date : $('#eff_date').val(), 
			eff_date_tot : $('#eff_date_tot').text(),
			eff_date_note : $('#eff_date_note').val(),
			category_dest_id : $('#city')[0].getSelectedRecord()[6]
		}
		
		arr_to_table(myArray)
		$('#mdlAddKota').remove();
	})
	
	$('#close_pop_up').click(function(){
		$('#mdlAddKota').remove();
	})
	
	$('#btnGenerate').click(function(){
			var array_hari=[]
			if ($('#departure_date').val()==''){alert('Tanggal Berangkat harus di isi !');return;}
			if ($('#arrival_date').val()==''){alert('Tanggal Kembali harus di isi !');return;}
			
			$.getJSON('index.php/sppd_fppd/generate_date_sppd', {
				departure_date : $('#departure_date').val(),
				arrival_date : $('#arrival_date').val()
			}).done(function(json){
				$.each(json, function(i, val){
				   array_hari.push([val[0], val[1], '<center><input type="checkbox" name="select2" value="'+val[0]+'"></input></center>'])
				})
				
				$('#list_hari')[0].record=array_hari
			})
			
			$('#eff_date').val('')
			document.getElementById('eff_date_tot').innerHTML = '-'; 
	})	
	
	$('#btnTambah').click(function(){
			var list_hari='';
			if ($('#list_hari input[type=checkbox]:checked').length==0){
					alert('Pilih Minimal 1 Tanggal !');																			
			} else {
				var total_hari = $('#list_hari input[type=checkbox]:checked').length
				$('#list_hari input[type=checkbox]:checked').each(function(i,v){
					if (i==0){
						list_hari=v.value
					}else{
						list_hari=list_hari+','+v.value
					}
				})
				
				$('#eff_date').val(list_hari)
				document.getElementById('eff_date_tot').innerHTML = total_hari; 
			}
	})
	
	$('#list_hari').on('afterdraw', function(){
		$('#list_hari .j-table-body table tbody td:nth-child(2)').each(function(i, val){
			var value = $(this).text()
			if (value=='Minggu' || value=='Sabtu'){
				$('#list_hari .j-table-body table tbody tr:nth-child('+(i+1)+')').css('background', '#FF9999');
			}
		})
	})
	
	$('#btnSelectAll').click(function(){
		var count_total = $('#list_hari input[type=checkbox]').length
		var count_checked = $('#list_hari input[type=checkbox]:checked').length
		if (count_checked==0){
			$('#list_hari input[type=checkbox]').prop('checked', true)
		}else if (count_checked>0 && count_checked < count_total){
			$('#list_hari input[type=checkbox]').prop('checked', true)
		}else{
			$('#list_hari input[type=checkbox]').prop('checked', false)
		}
	})
	
	$(".inp_disable").attr("disabled","disabled")
	$('#hari_efektif').attr('readonly', true);		
</script>