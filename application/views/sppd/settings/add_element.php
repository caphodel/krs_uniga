<j-modal id="mdlAddElement" title="Add Element" drag="true" height="235px" mask="true">
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
	$('#btnSave').click(function(){
		var check = $('#txtElementName, #txtDescription, #cmbGroup').checkField()
		if(check==true){
			var param = $('#mdlAddElement').getValues()
			$.getJSON('index.php/sppd_settings/save_element', param).success(function(){
				$('#mdlAddElement').remove()
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