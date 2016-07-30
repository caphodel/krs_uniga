<j-modal id="mdlAddLink" title="Tambah Link" drag="true" mask="true" height="250px" width="400px">
	<div id="pop_up_add_link">
		<j-textArea id="doc_description">Keterangan</j-textArea><br/>
		<j-textArea id="doc_address">Link</j-textArea><br/><br/>
		<j-button id="save_pop_up" color="blue" icon="fa-save">Save</j-button>
		<j-button id="close_pop_up" color="blue" >Close</j-button>
	</div>
</j-modal>
<script>

	var myArray=[]
	$('#save_pop_up').click(function(){
		myArray=[]
		if ($('#doc_description').val()==''){alert('Keterangan harus di isi !');return;}
		if ($('#doc_address').val()==''){alert('Link harus di isi !');return;}
		
		var myArray = {
			doc_description : $('#doc_description').val(),
			doc_address : $('#doc_address').val()
		}
		
		arr_to_table_link(myArray)
		$('#mdlAddLink').remove();
	})
	
	$('#close_pop_up').click(function(){
		$('#mdlAddLink').remove();
	})
	
</script>