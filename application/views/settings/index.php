<style>
	#settings j-toolbar{
		background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
	    border-left: 0 none;
	    border-right: 0 none;
	    border-top: 0 none;
	}
</style>
<div data-content="Settings" class="j-panel" id="settings">
	<j-toolbar type="tab">
		<j-button id="btnUser">User</j-button>
		<j-button id="btnGroup">Group</j-button>
		<j-button id="btnMK">Mata Kuliah</j-button>
	</j-toolbar>
	<div id="setting_content"></div>
</div>
<script>
	$('#btnUser').click(function(){
		load('settings/user', '#setting_content')
	})
	$('#btnGroup').click(function(){
		load('settings/group', '#setting_content')
	})
	$('#btnMK').click(function(){
		load('settings/mk', '#setting_content')
	})
	load('settings/user', '#setting_content')
</script>
