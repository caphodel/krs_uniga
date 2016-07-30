<style>
	#master j-toolbar{
		background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
	    border-left: 0 none;
	    border-right: 0 none;
	    border-top: 0 none;
	}
</style>
<div data-content="Master" class="j-panel" id="master">
	<j-toolbar type="tab">
		<j-button id="btnDept">Master Department</j-button>
	</j-toolbar>
	<div id="master_content"></div>
</div>
<script>
	$('#btnDept').click(function(){
		load('master/department', '#master_content')
	})
	load('master/department', '#master_content')
</script>