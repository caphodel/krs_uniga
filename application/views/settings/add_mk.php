<j-modal id="mdlAddMK" title="Add Mata Kuliah" drag="true" height="235px" mask="true">
	<j-textfield id="txtKodeProdi">Kode Prodi</j-textfield><br/>
	<j-textfield id="txtKodeMK">Kode MK</j-textfield><br/>
	<j-textfield id="txtNama">Nama</j-textfield><br/>
	<j-textfield id="txtSKS">SKS</j-textfield><br/>
	<j-combofield id="cmbActive">
		Active
		<j-table>
			[["", "Active"], [0, "No"], [1, "Yes"]]
		</j-table>
	</j-combofield><br/><br/>
	<div style="text-align: right;"><j-spacer></j-spacer><j-button id="btnSave">Save</j-button></div>
</j-modal>
<script>
	$('#btnSave').click(function(){
		var check = $('#txtKodeProdi, #txtKodeMK, #txtNama, #txtSKS, #cmbActive').checkField()
		if(check==true){
			var param = $('#mdlAddMK').getValues()
			$.getJSON('index.php/settings/save_mk', param).success(function(){
				$('#mdlAddMK').remove()
				$('#list_mk')[0].generateData()
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
