<div id="div_home_fppd" class="j-panel">
	<j-table id="list_fppd" class="doc" title="FPPD LIST">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnAddFdpd">Input FDPD</j-button><j-textField id="tfSearch" placeholder="Search SPPD, Nama, NIK"></j-textField><j-button id="btnSearch">Search</j-button>
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
		<j-loader src="index.php/sppd_fdpd/get_data_fppd?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
	<br/>
	<j-table id="list_fdpd" class="doc" title="FDPD LIST">
		<j-toolbar id="toolbar">
				<j-spacer></j-spacer><j-button color="blue" id="btnEdit">Edit</j-button><j-button color="blue" id="btnPrintDeklarasi">Print Deklarasi</j-button><j-button color="blue" id="btnPrint">Print FDPD</j-button><j-textField id="tfSearch2" placeholder="Search No, Nama, NIK"></j-textField><j-button id="btnSearch2">Search</j-button>
		</j-toolbar>
		<j-custom target="11">
			function(record){
				return '<center><input type="radio" name="select" value="'+record[11]+'" ></input></center>';
			}
		</j-custom>
		<j-drop target="0" onclick="drop2"></j-drop>
		  [
			["+", "No", "No SPPD", "No FDPD", "Nama", "NIK", "Direktorat", "Divisi", "Departement", "Seksi", "Posisi", "Select"]
		  ]
		<j-loader src="index.php/sppd_fdpd/get_data_fdpd?user=<?php echo $_REQUEST['user']; ?>"></j-loader>
		<j-pagination></j-pagination>
	</j-table>
</div>
<script>			
		
	$('#btnAddFdpd').click(function(){
		if($('[name=select]:checked').val()){
			var fppd_id = $('[name=select]:checked').val()
			load("sppd_fdpd/add_fdpd?fppd_id="+fppd_id+"&rand="+randomString(),"#content");
		}else{
			alert('Harap pilih 1 Fppd Terlebih dahulu !')
		}		
	})	
	
	function drop(tr, record){
		if (record[14]=='OK')
			load("sppd_home/detail_fppd_verify?fppd_id="+record[0]+'&rand='+randomString(),tr.children())
		else 
			load("sppd_fdpd/list_detail_fppd_list?fppd_id="+record[0]+'&rand='+randomString(),tr.children())
	}
	
	function drop2(tr, record){
		load("sppd_fdpd/list_detail_fdpd_list?fdpd_id="+record[0]+'&rand='+randomString(),tr.children())
	}
	
	$('#list_fdpd').on('itemclick',function(e,val){
		$.getJSON('index.php/sppd_fdpd/listActionButton', {
			user : user,
			fppd_id : val[0]
		}).done(function(json){
				if (json.allow_edit==1) 	
					$('#btnEdit').show()
				else 
					$('#btnEdit').hide()
				
				if (json.allow_print==1){
					$('#btnPrint').show()
					$('#btnPrintDeklarasi').show()
				}
				else {
					$('#btnPrint').hide()
					$('#btnPrintDeklarasi').hide()
				}
		})
	})
	
	function hide_button(){
		$('#btnEdit').hide()
		$('#btnPrint').hide()
		$('#btnPrintDeklarasi').hide()
	}
	
	hide_button()
	
	$('#btnPrintDeklarasi').click(function(){
		var fdpd_id = $('[name=select]:checked').val();
		window.open('http://gggmpscdweb05:5000/generate/deklarasi/deklarasi?fdpd_id='+fdpd_id+'','_blank');
	})
	
	$('#btnPrint').click(function(){
		var fdpd_id = $('[name=select]:checked').val();
		$.getJSON('index.php/sppd_fdpd/print_fdpd', {
			user : user,
			fdpd_id : fdpd_id
		}).done(function(){
			window.open('http://gggmpscdweb05:5000/generate/fdpd/fdpd?fdpd_id='+fdpd_id+'','_blank');
		})		
	})
	
	$('#btnSearch').click(function(){
		$('#list_fppd j-loader')[0].param.sSearch=$('#tfSearch').val()
		$('#list_fppd')[0].generateData()
	})
	
	$('#btnSearch2').click(function(){
		$('#list_fdpd j-loader')[0].param.sSearch=$('#tfSearch2').val()
		$('#list_fdpd')[0].generateData()
	})
	
	$('#list_fppd').on('itemclick',function(e,val){
		$.getJSON('index.php/sppd_fppd/listActionButton', {
			user : user,
			fppd_id : val[0]
		}).done(function(json){
				$('#btnAddFdpd').attr('disabled', true)
				if (json.allow_fdpd==1)$('#btnAddFdpd').removeAttr('disabled');
		})
	})
	
	$('#list_fppd').on('afterdraw', function(){
			$('#btnAddFdpd').attr('disabled', true)
	})
	
</script>