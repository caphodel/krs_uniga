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
		<j-button id="btnElementGroup">Element Group</j-button>
		<j-button id="btnElement">Element</j-button>
	</j-toolbar>
	<div id="setting_content"></div>
</div>
<script>
	$('#btnUser').click(function(){
		load('sppd_settings/user', '#setting_content')
	})
	$('#btnGroup').click(function(){
		load('sppd_settings/group', '#setting_content')
	})
	$('#btnElementGroup').click(function(){
		load('sppd_settings/element_group', '#setting_content')
	})
	$('#btnElement').click(function(){
		load('sppd_settings/element', '#setting_content')
	})
	load('sppd_settings/user', '#setting_content')
</script>