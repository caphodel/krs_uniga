<style>
	#table_pembatalan
	{
		font-family:arial;
	}
</style>
<j-modal id="mdlPembatalan" title="Pembatalan FPPD" drag="true" mask="true" height="250px" width="300px">	
	<div id="div_pembatalan">
		<table id="table_pembatalan">
			<tr>
				<td>
					No SPPD
				</td>
				<td>
					: <a id="fppd_no"><?php echo $_REQUEST['fppd_no']; ?></a>
				</td>
			</tr>
			<tr>
				<td>
					Status FPPD
				</td>
				<td>
					: Batal
				</td>
			</tr>
			<tr>
				<td>
					Keterangan
				</td>
				<td>
					: <j-textArea id="cancel_note"></j-textArea>
				</td>
			</tr>
			<tr height="50px">
				<td colspan="2">
					<j-button id="save" color="blue" icon="fa-save">Save</j-button>
					<j-button id="close" >Close</j-button>
				</td>
			</tr>
		</table>
	</div>
</j-modal>
<script>

	$('#save').click(function(){
		if ($('#cancel_note').val()==''){alert('Harap isi keterangan pembatalan');return;}
		var fppd_id = '<?php echo $_REQUEST['fppd_id']; ?>';
		
		$.getJSON('index.php/sppd_fppd/pembatalan_fppd', {
			fppd_id : fppd_id,
			cancel_note : $('#cancel_note').val(),
			user : user
		}).done(function(jsn){
			$('#list_fppd')[0].generateData();
			$('#mdlPembatalan').remove();
		})
	})

</script>