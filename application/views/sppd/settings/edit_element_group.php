<j-modal id="mdlAddElementGroup" title="Edit Element Group" drag="true" height="155px" mask="true">
	<j-textfield id="txtGroupName">Group Name</j-textfield><br/><br/>
	<div style="text-align: right;"><j-spacer></j-spacer><j-button id="btnSave">Save</j-button></div>
</j-modal>
<script>
	var record = $('#list_element_group').val()[0]
	$('#btnSave').click(function(){
		var check = $('#txtGroupName').checkField()
		if(check==true){
			var param = $('#mdlAddElementGroup').getValues()
			param.element_group_id = record[0];
			$.getJSON('index.php/sppd_settings/update_element_group', param).success(function(){
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