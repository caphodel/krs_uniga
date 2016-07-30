<j-modal id="mdlAddUser" title="Add User" drag="true" height="235px" mask="true">
	<j-textfield id="txtFullname">Full Name</j-textfield><br/>
	<j-textfield id="txtUsername">Username</j-textfield><br/>
	<j-passwordfield id="txtPassword">Password</j-passwordfield><br/>
	<j-combofield id="cmbGroup">
		Group
		<j-table>
			[["", "Group Name"]]
			<j-loader src="index.php/settings/get_data_group"></j-loader>
		</j-table>
	</j-combofield><br/>
	<j-textfield id="txtTotalSKS">SKS</j-textfield><br/><br/>
	<div style="text-align: right;"><j-spacer></j-spacer><j-button id="btnSave">Save</j-button></div>
</j-modal>
<script>
	$('#btnSave').click(function(){
		var check = $('#txtFullname, #txtUsername, #txtPassword, #cmbGroup, #txtTotalSKS').checkField()
		if(check==true){
			var param = $('#mdlAddUser').getValues()
			param.created_by = user
			$.getJSON('index.php/settings/save_user', param).success(function(){
				$('#mdlAddUser').remove()
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
