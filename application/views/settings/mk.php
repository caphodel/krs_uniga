<br/>
<j-table id="list_mk" class="doc" title="List Mata Kuliah">
	<j-toolbar id="toolbar">
		<j-spacer></j-spacer><j-button color="blue" id="btnAddMK">Add Mata Kuliah</j-button><!--j-button id="btnEditMK">Edit</j-button--><j-button id="btnDeleteMK" color="red">Delete</j-button><j-button id="btnToggleMK" color="blue">Toggle Active</j-button><j-textField id="tfSearchMK" ></j-textField><j-button id="btnSearchMK">Search</j-button>
	</j-toolbar>
	  [
		["Kode Prodi", "Kode MK", "Nama", "SKS", "Active"]
	  ]
	<j-loader src="index.php/settings/get_data_mk"></j-loader>
	<j-pagination></j-pagination>
	<j-custom target="4">
		function(record){

			return record[4] == 1 ? "Yes" : "No";
		}
	</j-custom>
</j-table>
<script>
	$('#btnAddMK').click(function(){
		$.ajax({
			url: 'index.php/settings/add_mk',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
	$('#btnDeleteMK').click(function(){
		if(confirm("Apakah Anda yakin akan menghapus mata kuliah "+$('#list_mk').val()[0][2]+"?")){
			$.getJSON('index.php/settings/delete_mk', {'kodeProdi': $('#list_mk').val()[0][0], 'kodeMK': $('#list_mk').val()[0][1]}).success(function(){
				$('#list_mk')[0].generateData()
			}).error(function(){
				alert('Error occured!')
			})
		}
	})
	$('#btnEditMK').click(function(){
		$.ajax({
			url: 'index.php/settings/edit_mk',
			success: function(data){
				$('#settings').append(data);
			}
		})
	})
	$('#btnToggleMK').click(function(){
		var data = $('#list_mk').val()[0]
		$.getJSON('index.php/settings/toggle_mk?kdProdi='+data[0]+'&kdMK='+data[1]+'&is_active='+(data[4] == 1 ? 0 : 1)).success(function(data){
				$('#list_mk')[0].generateData()
		}).error(function(){
			alert('Error occured!')
		})
	})
	$('#btnSearchMK').click(function(){
		$('#list_mk').find('j-loader')[0].param.sSearch = $('#tfSearchMK').val()
		$('#list_mk')[0].generateData()
	})
</script>
