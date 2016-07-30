<div id="div_home_fppd" class="j-panel">
	<j-table id="list_fppd" class="doc" title="FPPD List" data-content="SPPD >> FPPD">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnAddFppd">Input FPPD</j-button><j-button color="blue" id="btnEdit">Edit</j-button><j-button color="blue" id="btnRevisi">Revisi</j-button><j-button color="blue" id="btnPembatalan">Pembatalan</j-button><j-button color="blue" id="btnPerpanjangan">Perpanjangan / Percepatan</j-button><j-button color="blue" id="btnPrintMemo">Print Memo</j-button><j-button color="blue" id="btnPrint">Print FPPD</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
		</j-toolbar>
		<j-custom target="13">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[13]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop"></j-drop>
		  [
			["+", "No", "No SPPD", "Nama", "NIK", "Direktorat", "Divisi", "Departement", "Seksi", "Versi", "Pembatalan", "Perpanjangan", "Posisi", "Select"]
		  ]
		<j-loader src="index.php/sppd_fppd/get_data_fppd?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
<div>
<script>

	$('#btnAddFppd').click(function(){
		load("sppd_fppd/add_fppd?rand="+randomString(),"#content");
	})

	$('#btnPembatalan').click(function(){
		if($('[name=select]:checked').val()){
			var fppd_id = $('[name=select]:checked').val()
			$.ajax({
				url: 'index.php/sppd_fppd/pop_up_pembatalan_fppd',
				data:{
					fppd_id : fppd_id,
					fppd_no : $('#list_fppd')[0].selectedRecord[0][2]
				},
				success: function(data){
					$('#div_home_fppd').append(data);
				}
			})
		}else{
			alert('Harap pilih 1 Fppd Terlebih dahulu !')
		}
	})

	$('#btnPerpanjangan').click(function(){
		if($('[name=select]:checked').val()){
			var fppd_id = $('[name=select]:checked').val()
			$.ajax({
				url: 'index.php/sppd_fppd/pop_up_perpanjangan_fppd',
				data : {
					fppd_id : fppd_id,
					fppd_no : $('#list_fppd')[0].selectedRecord[0][2]
				},
				success: function(data){
					$('#div_home_fppd').append(data);
				}
			})
		}else{
			alert('Harap pilih 1 Fppd Terlebih dahulu !')
		}
	})

	$('#list_fppd').on('afterdraw', function(){
			disable_button()
	})

	$('#list_fppd').on('itemclick',function(e,val){
		$.getJSON('index.php/sppd_fppd/listActionButton', {
			user : user,
			fppd_id : val[0]
		}).done(function(json){
				$('#btnEdit').attr('disabled', true)
				$('#btnRevisi').attr('disabled', true)
				$('#btnPembatalan').attr('disabled', true)
				$('#btnPerpanjangan').attr('disabled', true)
				$('#btnPrint').attr('disabled', true)
				$('#btnPrintMemo').attr('disabled', true)
					
				if (json.allow_edit==1)$('#btnEdit').removeAttr('disabled');
				if (json.allow_revision==1)$('#btnRevisi').removeAttr('disabled');
				if (json.allow_cancel==1)$('#btnPembatalan').removeAttr('disabled');
				if (json.allow_extend==1)$('#btnPerpanjangan').removeAttr('disabled');
				if (json.allow_print==1){
					$('#btnPrint').removeAttr('disabled');
					$('#btnPrintMemo').removeAttr('disabled');
				}
		})
	})


	function drop(tr, record){
			if (record[14]=='OK')
				load("sppd_home/detail_fppd_verify?fppd_id="+record[0]+'&rand='+randomString(),tr.children())
			else
				load("sppd_fppd/list_detail_fppd_list?fppd_id="+record[0]+'&rand='+randomString(),tr.children())
	}

	function disable_button(){
		$('#btnEdit').attr('disabled', true)
		$('#btnRevisi').attr('disabled', true)
		$('#btnPembatalan').attr('disabled', true)
		$('#btnPerpanjangan').attr('disabled', true)
		$('#btnPrint').attr('disabled', true)
		$('#btnPrintMemo').attr('disabled', true)
	}

	$('#btnPrintMemo').click(function(){
		var fppd_id = $('[name=select]:checked').val();
		window.open('http://gggmpscdweb05:5000/generate/memo/memo?fppd_id='+fppd_id+'','_blank');
	})

	$('#btnPrint').click(function(){
		var fppd_id = $('[name=select]:checked').val();
		
		$.getJSON('index.php/sppd_fppd/print_fppd', {
			user : user,
			fppd_id : fppd_id
		}).done(function(){
			window.open('http://gggmpscdweb05:5000/generate/fppd/fppd?fppd_id='+fppd_id+'','_blank');
		})
	})

	$('#btnSearch').click(function(){
		$('#list_fppd j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_fppd')[0].generateData()
	})

	$('#btnEdit').click(function(){
		if($('[name=select]:checked').val()){
			load("sppd_fppd/edit_fppd?fppd_id="+$('#list_fppd')[0].selectedRecord[0][0]+'&rand='+randomString(),"#content");
		}else{
			alert('Harap pilih 1 Fppd Terlebih dahulu !')
		}
	})

	$('#btnRevisi').click(function(){
		if($('[name=select]:checked').val()){
			load("sppd_fppd/revisi_fppd?fppd_main_id="+$('#list_fppd')[0].selectedRecord[0][15]+"&fppd_id="+$('#list_fppd')[0].selectedRecord[0][0]+'&rand='+randomString(),"#content");
		}else{
			alert('Harap pilih 1 Fppd Terlebih dahulu !')
		}
	})

</script>