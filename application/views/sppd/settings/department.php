<j-modal id="mdlDepartment" title="Department" drag="true" height="500px" mask="true">
	<j-combofield id="cmbDirectorate">
		Directorate
		<j-table>
			[["", "Directorate"]]
			<j-loader src="index.php/sppd_settings/get_data_directorate"></j-loader>
		</j-table>
	</j-combofield><br/>

	<j-combofield id="cmbDivision">
		Division
		<j-table>
			[["", "Division"]]
			<j-loader src="index.php/sppd_settings/get_data_division"></j-loader>
		</j-table>
	</j-combofield><br/>

	<j-combofield id="cmbDepartment">
		Department
		<j-table>
			[["", "Department"]]
			<j-loader src="index.php/sppd_settings/get_data_department"></j-loader>
		</j-table>
	</j-combofield><br/>

	<j-combofield id="cmbSection">
		Division
		<j-table>
			[["", "Section"]]
			<j-loader src="index.php/sppd_settings/get_data_section"></j-loader>
		</j-table>
	</j-combofield><br/>
	<j-button id="btnDeptAdd">Add</j-button><br/><br/>
	<j-table id="list_department" class="doc" title="List Department">

		<j-toolbar id="toolbar">
			<j-spacer></j-spacer><j-button id="btnDeptDelete" color="red">Delete</j-button>
		</j-toolbar>
		  [
			["", "Directorate", "Division", "Department", "Section"]
		  ]
		<j-loader src="index.php/sppd_settings/get_data_user_dept"></j-loader>
	</j-table>
</j-modal>
<script>
	$('#cmbDivision, #cmbDepartment, #cmbSection').on("afterdraw", function(){
		$('#cmbDivision, #cmbDepartment, #cmbSection').hide();
	})
	$('#cmbDirectorate').on('select', function(e, val){
		if(val==1)
			$('#cmbDivision, #cmbDepartment, #cmbSection').hide();
		else{
			$('#cmbDivision').show().find('j-loader')[0].param.id = val
			$('#cmbDivision j-table')[0].generateData();
			$('#cmbDivision').val(2)

			if($('#cmbDepartment').is(':visible')){
				$('#cmbDepartment').find('j-loader')[0].param.id = val
				$('#cmbDepartment j-table')[0].generateData();
				$('#cmbDepartment').val(3)
			}

			if($('#cmbSection').is(':visible')){
				$('#cmbSection').find('j-loader')[0].param.id = val
				$('#cmbSection j-table')[0].generateData();
				$('#cmbSection').val(8)
			}
			$('#cmbDivision').on('select', function(e, val){
				if(val==2)
					$('#cmbDepartment, #cmbSection').hide();
				else{
					$('#cmbDepartment').show().find('j-loader')[0].param.id = val
					$('#cmbDepartment j-table')[0].generateData();
					$('#cmbDepartment').val(3)

					if($('#cmbSection').is(':visible')){
						$('#cmbSection').find('j-loader')[0].param.id = val
						$('#cmbSection j-table')[0].generateData();
						$('#cmbSection').val(8)
					}
					$('#cmbDepartment').on('select', function(e, val){
						if(val==3)
							$('#cmbSection').hide()
						else{
							$('#cmbSection').show().find('j-loader')[0].param.id = val
							$('#cmbSection j-table')[0].generateData();
							$('#cmbSection').val(8)
						}
					})
				}
			})
		}
	})
	$('#btnDeptAdd').click(function(){
		var check = $('#list_department')[0].data.filter(function(a){
		  return a[0]==$('#mdlDepartment > div > j-combofield:visible').last().val()
		})
		if(check.length==0){
			var param = {
				dept_id: $('#mdlDepartment > div > j-combofield:visible').last().val(),
				user_id: $('#list_user').val()[0][0],
				created_by: user
			}
			$.getJSON('index.php/sppd_settings/save_user_dept', param).success(function(){
				$('#list_department')[0].generateData()
			}).error(function(){
				alert('Error occured!')
			})
		}
		else{
			alert("Telah didaftarkan sebelumnya!");
		}
	})
	$('#btnDeptDelete').click(function(){
		var param = {
			useracc_dept_id: $('#list_department').val()[0][0]
		}
		$.getJSON('index.php/sppd_settings/delete_user_dept', param).success(function(){
			$('#list_department')[0].generateData()
		}).error(function(){
			alert('Error occured!')
		})
	})
	$('#list_department j-loader').on('created', function(){
		this.setParam('user_id', user);
		$('#list_department')[0].generateData()
	})
</script>