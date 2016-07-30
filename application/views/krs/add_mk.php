<j-modal id="mdlAddMK" title="Add Mata Kuliah" drag="true" height="400px" width="550px" mask="true">
	<div style="border: 1px solid #F07420;padding: 3px;">Tekan Ctrl lalu klik pada mata kuliah - mata kuliah yang ingin dipilih<br>
		Untuk menghapus pilihan tekan Ctrl lalu klik pada mata kuliah yang ingin dihapus<br>
		Jika telah selesai klik tombol Add
	</div><br/>
	<j-table id="tblMK" height="200px">
		[["Kode Prodi", "Kode MK", "Nama Mata Kuliah", "SKS"]]
		<j-loader src="index.php/krs/get_data_mk?semester=<?php echo $_REQUEST['semester'];?>&year=<?php echo $_REQUEST['year'];?>&username=<?php echo $_REQUEST['username'];?>"></j-loader>
	</j-table><br/>
	<div>Total SKS yang di pilih: <span id="totalSKS">0 SKS</span></div>
	<div style="text-align: right;"><j-spacer></j-spacer><j-button id="btnAdd">Add</j-button></div>
</j-modal>
<script>

	$('#tblMK').on('afterdraw', function(){
		var mk = $('#list_krs')[0].data
		$.each(mk, function(i, val){
			$('#tblMK tbody tr td:nth-child(2)').filter(function(){
				return $(this).text() == val[0];
			}).parent().addClass('j-active');
		})
	})
	$('#tblMK').click(function(){
		var sks = 0
		$.each($('#tblMK').val(), function(i, val){
			sks += parseInt(val[3])
		})
		$('#totalSKS').html(sks+' SKS')
	})
	$('#btnAdd').click(function(){
		var param = {
			mk: [],
			semester: <?php echo $_REQUEST['semester'];?>,
			year: <?php echo $_REQUEST['year'];?>,
			username: user
		}
		var sks = 0, maxSKS = 21
		$.each($('#tblMK').val(), function(i, val){
			param.mk.push([user+','+val[0]+','+val[1]+','+<?php echo $_REQUEST['year'];?>+','+<?php echo $_REQUEST['semester'];?>])
			sks += parseInt(val[3])
		})
		param.mk = param.mk.join(';');
		if(sks>maxSKS)
			alert('Jumlah SKS yang Anda ambil melebihi total kuota SKS Anda!')
		else
			$.getJSON('index.php/krs/save_krs', param).success(function(){
				$('#mdlAddMK').remove()
				$('#list_krs')[0].generateData()
			}).error(function(){
				alert('Error occured!')
			})
	})
</script>
