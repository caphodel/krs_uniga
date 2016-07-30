<j-modal id="mdlInfoPU" title="Kirim Info" drag="true" mask="true" height="250px" width="250px">
	<j-textArea id="info_pu"></j-textArea><br/><br/>
	<j-button id="save_pop_up" color="blue" icon="fa-save">Save</j-button>
	<j-button id="close_pop_up" color="blue" >Close</j-button>
</j-modal>
<script>

	$('#save_pop_up').click(function(){
		if ($('#info_pu').val()==''){alert('Harap isi info PU !');return;}
		
		var fppd_id = '<?php echo $_REQUEST['fppd_id']; ?>';
		$.getJSON('index.php/sppd_home/update_info_verifikasi_fppd', {
			user : user,
			info_pu : $('#info_pu').val(),
			fppd_id : fppd_id
		}).done(function(json){
			if (json.status==1){
				alert(''+json.message+'');
				$('#list_verifikasi_sppd')[0].generateData();
				$('#mdlInfoPU').remove();
			}else{
				alert(''+json.message+'');
			}
		})
	})
	
	$('#close_pop_up').click(function(){
		$('#mdlInfoPU').remove();
	})

</script>