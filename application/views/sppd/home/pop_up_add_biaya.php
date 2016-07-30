<j-modal id="mdlAddBiaya" title="Tambah Biaya" drag="true" mask="true" height="200px">
	<div id="pop_up_add_tujuan">
		<j-textField id="cost_breakdown">Keterangan</j-textField><br/>
		<j-combofield id="currency" pk="0">Mata Uang
			<j-table >
				<j-loader src="http://gggmpscdweb05/new/index.php/sppd_fppd/get_data_currency"></j-loader>
					[["", "Mata Uang"]]
				<j-pagination>
				</j-pagination>
			</j-table>
		</j-combofield><br/>
		<j-numberField id="amount">Nominal</j-numberField><br/><br/>
		<j-button id="save_pop_up" color="blue" icon="fa-save">Save</j-button>
		<j-button id="close_pop_up" color="blue" >Close</j-button>
	</div>
</j-modal>
<script>

	var myArray=[]

	$('#save_pop_up').click(function(){
		if ($('#cost_breakdown').val()==''){alert('Keterangan harus di isi !');return;}
		if ($('#currency').val()==''){alert('Mata uang harus di isi !');return;}
		if ($('#amount').val()==''){alert('Nominal harus di isi !');return;}
		
		var myArray = {
			cost_breakdown : $('#cost_breakdown').val(),
			currency : $('#currency').val(),
			curr_symbol : $('#currency')[0].getSelectedRecord()[1],
			amount : $('#amount').val()
		}

		arr_to_table_biaya(myArray)
		array_cost_other.push(['<?php echo $_REQUEST['fppd_id']; ?>', myArray.cost_breakdown, myArray.curr_symbol, myArray.amount, myArray.currency ])
		$('#mdlAddBiaya').remove();
	})
	
	$('#close_pop_up').click(function(){
		$('#mdlAddBiaya').remove();
	})
	
</script>