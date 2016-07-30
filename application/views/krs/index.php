<div id="content_krs" class="j-panel">
	<j-combofield id="cmbYear">
		Tahun
		<j-table>
			[
				["Tahun"],
				["2016"]
			]
		</j-table>
	</j-combofield><br/>
	<j-combofield id="cmbSemester">
		Semester
		<j-table>
			[
				["", "Semester"],
				["1", "Ganjil"],
				["2", "Genap"]
			]
		</j-table>
	</j-combofield><br/>
	<j-button color="blue" id="btnTampilKrs">Tampilkan</j-button><br/><br/>
	<div id="tableKrs"></div>
</div>
<script>
	$('#btnTampilKrs').click(function(){
		load('krs/table_krs?username='+user+'&year='+$('#cmbYear').val()+'&semester='+$('#cmbSemester').val(), '#tableKrs')
	})
</script>
