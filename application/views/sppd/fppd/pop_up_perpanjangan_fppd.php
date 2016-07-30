<j-modal id="mdlPerpanjanganFppd" title="Perpanjangan FPPD" drag="true" mask="true" height="300px" width="550px">
	<div id="pop_up_perpanjangan_fppd">
		<table>
			<tr>
				<td width="24%">
					No SPPD
				</td>
				<td width="2%">
					:
				</td>
				<td width="24%">
					<a id="fppd_no"></a>
				</td>
				<td width="24%">
				</td>
				<td width="2%">
				</td>
				<td width="24%">
				</td>
			</tr>
			<tr>
				<td width="24%">
					Tanggal Berangkat
				</td>
				<td width="2%">
					:
				</td>
				<td width="24%">
					<a id="departure_date"></a>
				</td>
				<td width="24%">
					Jam
				</td>
				<td width="2%">
					:
				</td>
				<td width="24%">
					<a id="departure_time"></a>
				</td>
			</tr>
			<tr>
				<td width="24%">
					Tanggal Kembali
				</td>
				<td width="2%">
					:
				</td>
				<td width="24%">
					<j-dateField id="arrival_date" format="YYYY-MM-DD"></j-dateField>
				</td>
				<td width="24%">
					Jam
				</td>
				<td width="2%">
					:
				</td>
				<td width="24%">
					<j-timeField id="arrival_time"></j-timeField>
				</td>
			</tr>
			<tr>
				<td colspan="6">
					<j-textArea id="extend_note">Keterangan</j-textArea>
				</td>
			</tr>
			<tr height="50px">
				<td colspan="6">
					<j-button id="save_pop_up" color="blue" icon="fa-save">Save</j-button>
					<j-button id="close_pop_up" color="blue" >Close</j-button>
				</td>
			</tr>
		</table>
	</div>
</j-modal>
<script>
	
	var arrival_date_old=''
	$('#save_pop_up').click(function(){
		if ($('#arrival_date').val()==''){alert('Harap isi tanggal kembali');return;}
		if ($('#arrival_time').val()==':'){alert('Harap isi tanggal kembali');return;}
		if (arrival_date_old==$('#arrival_date').val()){alert('Tanggal Kembali tidak boleh sama');return;}
		if ($('#extend_note').val()==''){alert('Keterangan harus di isi');return;}
		var extend_type=0
		
		if (arrival_date_old < $('#arrival_date').val()){
			extend_type=1
		}else if (arrival_date_old > $('#arrival_date').val()){
			extend_type=2
		}
		
		$.getJSON('index.php/sppd_fppd/perpanjangan_fppd', {
			fppd_id : '<?php echo $_REQUEST['fppd_id']; ?>',
			user : user,
			extend_arrival_date : $('#arrival_date').val(),
			extend_arrival_time : $('#arrival_time').val(),
			extend_note : $('#extend_note').val(),
			extend_type : extend_type
		}).done(function(json){
			$('#list_fppd')[0].generateData();
			$('#mdlPerpanjanganFppd').remove();
		})
		
	})

	load_data('<?php echo $_REQUEST['fppd_id']; ?>')

	function load_data(fppd_id){
		$.getJSON('index.php/sppd_fppd/select_data_perpanjangan', {
			fppd_id : fppd_id
		}).done(function(jsn){
				$('#fppd_no').text('<?php echo $_REQUEST['fppd_no']; ?>')
				$('#departure_date').text(jsn.data[0][0])
				$('#departure_time').text(jsn.data[0][1])
				$('#arrival_date').val(jsn.data[0][2])
				$('#arrival_time').val(jsn.data[0][3])
				arrival_date_old=jsn.data[0][2]
		})
	}
		
</script>