<j-modal id="mdlRincianBiaya" title="Rincian Biaya" drag="true" mask="true" height="300px" width="500px">
	<div id="pop_up_add_biaya">
		<j-dateField id="date" format="YYYY-MM-DD">Tanggal</j-dateField><br/>
		<j-textArea id="cost_breakdown">Keterangan</j-textArea><br/>
		<j-combofield id="currency" pk="0">Mata Uang
			<j-table >
				<j-loader src="http://gggmpscdweb05/new/index.php/sppd_fppd/get_data_currency"></j-loader>
					[["", "Mata Uang"]]
				<j-pagination>
				</j-pagination>
			</j-table>
		</j-combofield><j-numberField id="amount"></j-numberField><br/>
		<j-radiofield id="bukti_pembayaran">Bukti Pembayaran[[1, "Ada"], [2, "Tidak Ada"]]</j-radiofield><br/><br/>
		<j-button color="blue" id="add">Add</j-button><j-button id="cancel">Cancel</j-button>
	</div>
</j-modal>
<script>	

	var myArray=[]

	$('#add').click(function(){
		var type = '<?php echo $_REQUEST['jenis']; ?>'
		if ($('#date').val()==''){alert('Harap isi Tanggal !');return;}
		if ($('#cost_breakdown').val()==''){alert('Harap isi Keterangan !');return;}
		if ($('#currency').val()==''){alert('Harap isi Mata Uang !');return;}
		if ($('#amount').val()==''){alert('Harap isi Jumlah Uang !');return;}
		if ($('#bukti_pembayaran').val()==''){alert('Bukti Pembayaran harus di isi !');return;}
		
		myArray.push(
				$('#date').val(),
				$('#cost_breakdown').val(),
				$('#currency')[0].getSelectedRecord()[1],
				$('#amount').val(),
				$('#bukti_pembayaran').val(),
				$('#currency').val()
		)
		
		if (type=='trans_udara'){
			insert_trans_udara(myArray)
		} else if (type=='trans_lainnya'){
			insert_trans_lainnya(myArray)
		} else if (type=='akomodasi'){
			insert_akomodasi(myArray)
		} else if (type=='biaya_lain'){
			insert_biaya_lain(myArray)
		}	
		$('#mdlRincianBiaya').remove();
	})
	
	$('#cancel').click(function(){
		$('#mdlRincianBiaya').remove();
	})
	
</script>