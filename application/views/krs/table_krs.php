<j-table id="list_krs" class="doc" title="KRS">
	<j-toolbar id="toolbar">
		<j-spacer></j-spacer><j-button color="blue" id="btnAddMK">Tambah/Hapus Mata Kuliah</j-button><j-button id="btnReport">Report</j-button><j-textField id="tfSearch" placeholder="Search"></j-textField><j-button id="btnSearch">Search</j-button>
	</j-toolbar>
	  [
		["Kode MK", "Mata Kuliah", "SKS"]
	  ]
	<j-loader src="index.php/krs/get_data_krs?semester=<?php echo $_REQUEST['semester'];?>&year=<?php echo $_REQUEST['year'];?>&username=<?php echo $_REQUEST['username'];?>"></j-loader>
</j-table>
<script>
	$('#btnAddMK').click(function(){
		$.ajax({
			url: 'index.php/krs/add_mk?semester=<?php echo $_REQUEST['semester'];?>&year=<?php echo $_REQUEST['year'];?>&username=<?php echo $_REQUEST['username'];?>',
			success: function(data){
				$('#content_krs').append(data);
			}
		})
	})

	$('#btnReport').click(function(){
		var data = $('#list_krs .j-table-body').html();
		var myWindow = window.open("", "MsgWindow");
		myWindow.document.write('<style>thead th {padding-right: 0;} .j-border-bot2 {border-bottom: 2px solid #53abe6;} .j-border-right1 {border-right: 1px solid #d9d9d9;} .j-no-wrap {white-space: nowrap;} .j-bg1 {background: #f7f7f9 none repeat scroll 0 0;} table {border-collapse: collapse;min-width: 100%;}</style>'+data);
	})
</script>
