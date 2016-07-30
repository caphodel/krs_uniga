<j-modal id="mdlEditUser" title="Edit User" drag="true" height="205px" mask="true">
	<j-textfield id="txtFullname" disabled="true">Full Name</j-textfield><br/>
	<j-textfield id="txtUsername" disabled="true">Username</j-textfield><br/>
	<j-combofield id="cmbGroup">
		Group
		<j-table>
			[["", "Group Name"]]
			<j-loader src="index.php/sppd_settings/get_data_group"></j-loader>
		</j-table>
	</j-combofield><br/><br/>
	<div style="text-align: right;"><j-spacer></j-spacer><j-button id="btnSave">Save</j-button></div>
</j-modal>
<script>
	var record = $('#list_user').val()[0];
	$('#txtFullname').val(record[1])
	$('#txtUsername').val(record[0])
	$('#cmbGroup').val(record[3])
	$('#btnSave').click(function(){
		var check = $('#cmbGroup').checkField()
		if(check==true){
			var param = $('#mdlEditUser').getValues()
			param.user_id = record[0]
			param.created_by = user
			$.getJSON('index.php/sppd_settings/update_user', param).success(function(){
				$('#mdlEditUser').remove()
				$('#list_user')[0].generateData()
			}).error(function(){
				alert('Error occured!')
			})
		}
		else{
			var text = ''
			for(i in check){
				text+=' '+$(check[i]).find('label').text().trim()
			}
			alert('Mohon inputan'+text+' untuk di isi!')
		}
	})
</script>