<j-modal id="mdlAddKegiatan" title="Tambah Kegiatan" drag="true" mask="true" height="350px" width="400px">
	<div id="pop_up_add_kegiatan">
		<table>
			<tr>
				<td>
					<j-dateField id="job_date" format="YYYY-MM-DD">Tanggal</j-dateField>
				</td>
			</tr>
			<tr>
				<td>
					<j-timeField id="start_time">Jam Datang</j-timeField>
				</td>
			</tr>
			<tr>
				<td>
					<j-timeField id="end_time">Jam Pulang</j-timeField>
				</td>
			</tr>
			<tr>
				<td>
					<j-textArea id="job_note">Pekerjaan</j-textArea>
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

	var myArray=[]

	$('#save_pop_up').click(function(){
		if ($('#job_date').val()==''){alert('Tanggal harus di isi !');return;}
		if ($('#start_time').val()==''){alert('Jam Datang harus di isi !');return;}
		if ($('#end_time').val()==''){alert('Jam Pulang harus di isi !');return;}
		if ($('#job_note').val()==''){alert('Pekerjaan harus di isi !');return;}
		
		myArray.push(
			$('#job_date').val(),
			$('#start_time').val(),
			$('#end_time').val(),
			$('#job_note').val()
		)
		
		insert_rincian_kegiatan(myArray)
		$('#mdlAddKegiatan').remove();
	})
	
	$('#close_pop_up').click(function(){
		$('#mdlAddKegiatan').remove();
	})

</script>