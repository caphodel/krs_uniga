<br/>
<j-table id="list_user" class="doc" title="List User">
	<j-toolbar id="toolbar">
		<j-spacer></j-spacer><j-button color="blue" id="btnAdd">Add user</j-button><j-button id="btnEdit">Edit</j-button><j-button id="btnDelete" color="red">Delete</j-button><j-textField id="tfSearch" ></j-textField><j-button id="btnSearch">Search</j-button>
	</j-toolbar>
	  [
		["Username", "Full Name", "Employee", "Group", "", "SKS"]
	  ]
	<j-loader src="index.php/settings/get_data_user"></j-loader>
	<j-pagination></j-pagination>
</j-table>
<script>
	$('#btnAdd').click(function(){
		$.ajax({
			url: 'index.php/settings/add_user',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
	$('#btnEdit').click(function(){
		$.ajax({
			url: 'index.php/settings/edit_user',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
	$('#btnDelete').click(function(){
		if(confirm("Apakah Anda yakin akan menghapus user "+$('#list_user').val()[0][0]+"?")){
			$.getJSON('index.php/settings/delete_user', {'username': $('#list_user').val()[0][0]}).success(function(){
				$('#list_user')[0].generateData()
			}).error(function(){
				alert('Error occured!')
			})
		}
	})
</script>
