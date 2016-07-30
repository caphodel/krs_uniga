<br/>
<j-table id="list_group" class="doc" title="List Group">
	<j-toolbar id="toolbar">
		<j-spacer></j-spacer><j-button color="blue" id="btnAddGroup">Add Group</j-button><j-button id="btnEditGroup">Edit</j-button><j-button id="btnDeleteGroup" color="red">Delete</j-button><j-textField id="tfSearchGroup" ></j-textField><j-button id="btnSearchGroup">Search</j-button>
	</j-toolbar>
	  [
		["", "Group Name", "Module"]
	  ]
	<j-loader src="index.php/sppd_settings/get_data_group"></j-loader>
	<j-pagination></j-pagination>
</j-table>
<script>
	$('#btnAddGroup').click(function(){
		$.ajax({
			url: 'index.php/sppd_settings/add_group',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
	$('#btnDeleteGroup').click(function(){
		if(confirm("Apakah Anda yakin akan menghapus group "+$('#list_group').val()[0][1]+"?")){
			$.getJSON('index.php/sppd_settings/delete_group', {'modul_user_group_id': $('#list_group').val()[0][0]}).success(function(){
				$('#list_group')[0].generateData()
			}).error(function(){
				alert('Error occured!')
			})
		}
	})
	$('#btnEditGroup').click(function(){
		$.ajax({
			url: 'index.php/sppd_settings/edit_group',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
</script>