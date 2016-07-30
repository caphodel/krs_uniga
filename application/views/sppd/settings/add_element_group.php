<j-modal id="mdlAddElementGroup" title="Add Element Group" drag="true" height="155px" mask="true">
	<j-textfield id="txtGroupName">Group Name</j-textfield><br/><br/>
	<div style="text-align: right;"><j-spacer></j-spacer><j-button id="btnSave">Save</j-button></div>
</j-modal>
<script>
	$('#btnSave').click(function(){
		var check = $('#txtGroupName').checkField()
		if(check==true){
			var param = $('#mdlAddElementGroup').getValues()
			param.created_by = user
			$.getJSON('index.php/sppd_settings/save_element_group', param).success(function(){
				$('#mdlAddElementGroup').remove()
				$('#list_element_group')[0].generateData()
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