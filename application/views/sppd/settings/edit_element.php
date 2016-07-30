<j-modal id="mdlEditElement" title="Edit Element" drag="true" height="245px" mask="true">
	<j-textfield id="txtElementId">ID</j-textfield><br/>
	<j-textfield id="txtElementName">Name</j-textfield><br/>
	<j-textarea id="txtDescription">Description</j-textarea><br/>
	<j-combofield id="cmbGroup">
		Group
		<j-table>
			[["", "Group Name"]]
			<j-loader src="index.php/sppd_settings/get_data_element_group"></j-loader>
		</j-table>
	</j-combofield><br/><br/>
	<div style="text-align: right;"><j-spacer></j-spacer><j-button id="btnSave">Save</j-button></div>
</j-modal>
<script>
	var record = $('#list_element').val()[0];
	$('#txtElementId').val(record[0])
	$('#txtElementName').val(record[1])
	$('#txtDescription').val(record[2])
	$('#cmbGroup').val(record[4])
	$('#btnSave').click(function(){
		var check = $('#cmbGroup').checkField()
		if(check==true){
			var param = $('#mdlEditElement').getValues()
			param.element_id = record[0]
			param.created_by = user
			$.getJSON('index.php/sppd_settings/update_element', param).success(function(){
				$('#mdlEditElement').remove()
				$('#list_element')[0].generateData()
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