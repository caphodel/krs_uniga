<j-modal id="mdlEditGroup" title="Add Group" drag="true" height="355px" mask="true">
	<j-textfield id="txtGroupName">Group Name</j-textfield><br/>
	<j-table height="200px" title="Modules" id="tblModules">
		[["", "Module Name", "Description"]]
		<j-loader src="index.php/settings/get_data_modul"></j-loader>
	</j-table><br/><br/>
	<div style="text-align: right;"><j-spacer></j-spacer><j-button id="btnSave">Save</j-button></div>
</j-modal>
<script>
	var record = $('#list_group').val()[0], module = record[2].split(';');
	$('#txtGroupName').val(record[1])
	$('#tblModules').on('afterdraw', function(){
		$.each(module, function(i, val){
			$('#tblModules tbody tr td:nth-child(2)').filter(function(){
				return $(this).text() == val;
			}).parent().addClass('j-active');
		})
	})
	$('#btnSave').click(function(){
		var check = $('#txtGroupName').checkField()
		if(check==true){
			var param = $('#mdlEditGroup').getValues()
			param.user_group_id = record[0];
			param.module = []
			$.each($('#tblModules').val(), function(i, val){
				param.module.push(val[0])
			})
			param.module = param.module.join(',');
			param.created_by = user
			$.getJSON('index.php/settings/update_group', param).success(function(){
				$('#mdlEditGroup').remove()
				$('#list_group')[0].generateData()
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
