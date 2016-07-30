<br/>
<j-table id="list_user" class="doc" title="List User">
	<j-toolbar id="toolbar">
		<j-spacer></j-spacer><j-button id="btnEdit">Edit</j-button><j-textField id="tfSearch" ></j-textField><j-button id="btnSearch">Search</j-button>
	</j-toolbar>
	  [
		["Username", "Full Name", "Group", "Department"]
	  ]
	<j-custom target="3" width="150px">
		function(record){
			return '<center><j-button color="blue" class="department">View/Edit Department</j-button></center>';
		}
	</j-custom>
	<j-loader src="index.php/sppd_settings/get_data_user"></j-loader>
	<j-pagination></j-pagination>
</j-table>
<script>
	$('#btnEdit').click(function(){
		$.ajax({
			url: 'index.php/sppd_settings/edit_user',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})

	$('#list_user').delegate('.department', 'click', function(event) {
		$.ajax({
			url: 'index.php/sppd_settings/department',
			success: function(data){
				$('#settings').append(data);
			}
		})
	});
</script>