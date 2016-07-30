<br/>
<j-table id="list_element_group" class="doc" title="List Element Group">
	<j-toolbar id="toolbar">
		<j-spacer></j-spacer><j-button color="blue" id="btnAddElementGroup">Add Element Group</j-button><j-button id="btnEditElementGroup">Edit</j-button><j-button id="btnDeleteElementGroup" color="red">Delete</j-button><j-textField id="tfSearchElementGroup" ></j-textField><j-button id="btnSearchElementGroup">Search</j-button>
	</j-toolbar>
	  [
		["", "Group Name"]
	  ]
	<j-loader src="index.php/sppd_settings/get_data_element_group"></j-loader>
	<j-pagination></j-pagination>
</j-table>
<script>
	$('#btnAddElementGroup').click(function(){
		$.ajax({
			url: 'index.php/sppd_settings/add_element_group',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
	$('#btnDeleteElementGroup').click(function(){
		if(confirm("Apakah Anda yakin akan menghapus element group "+$('#list_element_group').val()[0][1]+"?")){
			$.getJSON('index.php/sppd_settings/delete_element_group', {'element_group_id': $('#list_element_group').val()[0][0]}).success(function(){
				$('#list_element_group')[0].generateData()
			}).error(function(){
				alert('Error occured!')
			})
		}
	})
	$('#btnEditElementGroup').click(function(){
		$.ajax({
			url: 'index.php/sppd_settings/edit_element_group',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
</script>