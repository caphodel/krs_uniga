<br/>
<j-table id="list_element" class="doc" title="List Element">
	<j-toolbar id="toolbar">
		<j-spacer></j-spacer><j-button id="btnAdd" color="blue">Add Element</j-button><j-button id="btnEdit">Edit</j-button><j-button id="btnDelete" color="red">Delete</j-button><j-textField id="tfSearch" ></j-textField><j-button id="btnSearch">Search</j-button>
	</j-toolbar>
	  [
		["ID", "Name", "Description", "Group"]
	  ]
	<j-loader src="index.php/sppd_settings/get_data_element"></j-loader>
	<j-pagination></j-pagination>
</j-table>
<script>
	$('#btnEdit').click(function(){
		$.ajax({
			url: 'index.php/sppd_settings/edit_element',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
	$('#btnAdd').click(function(){
		$.ajax({
			url: 'index.php/sppd_settings/add_element',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
	$('#btnDelete').click(function(){
		if(confirm("Apakah Anda yakin akan menghapus element "+$('#list_element').val()[0][1]+"?")){
			$.getJSON('index.php/sppd_settings/delete_element', {'element_id': $('#list_element').val()[0][0]}).success(function(){
				$('#list_element')[0].generateData()
			}).error(function(){
				alert('Error occured!')
			})
		}
	})
</script>