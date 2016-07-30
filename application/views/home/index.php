<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title>
		<?php echo $this->config->item('site_name');?>
	</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="-1" />
	<style>
	.j-panel::after {
	    color: #bbb;
	    content: attr(data-content);
	    font-size: 12px;
	    font-weight: 700;
	    left: 15px;
	    letter-spacing: 1px;
	    position: absolute;
	    text-transform: uppercase;
	    top: 15px;
	}
	.j-panel {
	    background-clip: padding-box !important;
	    border: 1px solid #ddd;
	    border-radius: 4px !important;
	    padding: 45px 15px 15px;
	    position: relative;
		background: #fff;
		margin: 5px;
	}
	</style>
	<link rel="stylesheet" type="text/css" href="asset/css/main.css" />
	<script type='text/javascript'>
		var site = "<?php echo site_url();?>";
		var site_url = "<?php echo site_url();?>";
		var baseUrl = "<?php echo base_url();?>";
		var base_url = "<?php echo base_url();?>";
		var loading_image_large = "<?php echo base_url();?>asset/images/loading_large.gif";
		var loading_image_small = "<?php echo base_url();?>asset/images/loading.gif";
		var intervalId = new Array();
		var countIntervalId = 0;
		var chartAll = new Array();
		var countChart = 0;
		var cet = 0;
		var addProject = false;
	</script>
	<script type="text/javascript" src="<?php echo base_url();?>asset/javascript/jquery.js"></script>
	<!-- icon -->
	<link rel="icon" href="<?php echo base_url();?>asset/images/favicon.png" type="image/x-icon" />
	<link rel="shorcut icon" href="<?php echo base_url();?>asset/images/favicon.ico" type="image/x-icon" />
	<!-- jui2 -->
	<!--link rel="stylesheet" href="asset/jui2/jui2.css">
	<link rel="stylesheet" href="asset/jui2/css/font-awesome.min.css"-->
	<!--script src="asset/jui2/library.min.js"></script>
	<script src="asset/jui2/jui2.js"></script>
	<script src="asset/jui2/templates.min.js"></script>
	<script src="asset/jui2/helpers.min.js"></script-->
	<!-- tintMCE -->
	<script type="text/javascript" src="asset/tinymce/tinymce.min.js"></script>
	<script>
		tinymce.init({
			selector: 'j-wysiwyg textarea'
		});
	</script>
	<!-- jui2 web component ver. -->
	<link rel="stylesheet" href="rnd/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="rnd/dist/css/jui2.min.css" />
	<script src="rnd/dist/jui2.lib.js"></script>
	<script src="rnd/dist/jui2.tmp.min.js"></script>
	<script src="rnd/dist/jui2.ui.js"></script>
	<script>
		jui2.path = 'rnd/dist/'
		jui2.loadExtension()
	</script>
</head>

<body class="j-vertical-flex">
	<div id="header">
		<div id="headerTop" class="j-transition1"></div>
		<div id="headerMid" class="j-horizontal-flex">
			<j-spacer></j-spacer>
			<span id="usernameText"></span>
			<span style="display:none;"><i class="fa fa-home"></i> Home</span>
			<span style="display:none;" module="SETTING"><i class="fa fa-cog"></i> Settings</span>
			<span style="display:none;"><i class="fa fa-power-off"></i> Log out</span>
		</div>
		<div id="headerBot" class="j-horizontal-flex">
		</div>
		<j-progressbar id="mainProgressbar"></j-progressbar>
	</div>
	<div id="content" class="j-spacer contentGrey">
		<div id="frmLogin" class="center border-radius base-animation">
			<div style="text-align: center">
				<span>SIAKAD UNIGA</span>
			</div>
			<div>
				<j-textfield id="username">Username</j-textfield>
				<br/>
				<j-passwordfield id="password">Password</j-passwordfield>
				<br/>
				<!--input type="checkbox" id="remember" />
				<label for="remember">Remember Me</label-->
				<br/>
				<j-button style="float: right" id="btnLogin" color="blue">Login</j-button>
			</div>
		</div>
	</div>
	<script>
		/** declare variable **/
		var genFromfunc = false;
		window.location.lastmenu = []
		window.location.menu = ''
		window.location.lasthash = []
		var module = ''

		$('#password, #username').keyup(function(event) {
			if(event.keyCode == 13){
		        $("#btnLogin").click();
				$('#password, #username').blur()
		    }
		});

		$('#btnLogin').click(function() {
			user = $("#username").val();
			pass = $("#password").val();
			$('input').blur()
			if (user == ''){
				alert("Username field is required.");
				$("#username input").focus()
			}
			else {
				if (pass == ''){
					alert("Password field is required.");
					$("#password input").focus()
				}
				else {
					$.ajax({
						url: site + '/home/do_login/' + user + '/' + pass,
						beforeSend: function() {
							$('#mainProgressbar').get(0).reset()
							$('#mainProgressbar').attr('type', 'indeterminate');
							$('#content').attr('loading', 'true')
						},
						success: function(response) {
							if (response[0].success == 1) {
								$('#headerTop').css('height', '0px')
								addProject = response[0].addProject;
								load('home/moduleChooser?nohistory=', '#content')
								$('#headerMid span, #headerMid span i').show();
								$('#headerMid .fa-home').parent().click(function(){
									$('#headerBot').empty();
									load('home/moduleChooser?nohistory=', '#content')
								})
								$('#headerMid .fa-cog').parent().click(function(){
									$("#headerBot").empty()
									load("menu/menu_settings","#headerBot");load("settings/index","#content");
								})
								$('#headerMid .fa-power-off').parent().click(function(){
									$.ajax({
								        url: site+'/home/logout',
								        success: function(response){

								        },
								        dataType: "json"
								    }).always(function(){
										window.location.reload();
									});
								})
								$('#headerMid #usernameText').text(user);

							} else if (response[0].success == 3) {
								alert("Maaf, username atau password yang Anda masukkan salah...");
							} else if (response[0].success == 2) {
								alert("Anda Sudah login");
							}
						},
						dataType: "json",
						xhr: function() {
							var xhr = new window.XMLHttpRequest();
							xhr.addEventListener("progress", function(evt) {
								if (evt.lengthComputable) {
									$('#mainProgressbar').removeAttr('type')
									var percentComplete = evt.loaded / evt.total;
									$('#mainProgressbar')[0].progress(Math.round(percentComplete * 100));
								}
							}, false);
							return xhr;
						}
					}).always(function() {
						$('#mainProgressbar')[0].complete();
						$('#content').attr('loading', 'false')
					});
				}
			}
		})

		function clearAllInterval() {
			var i = 0;
			for (i = 0; i < intervalId.length; i++) {
				clearInterval(intervalId[i]);
			}
			intervalId = new Array();
			countIntervalId = 0;
		}

		function setDisabled(div, response){
			$content = $(response)
			if(user)
				$.getJSON('index.php/home/get_disabled_element?group='+module+' '+$content.filter('div').eq(0).attr('id'), {'user_id': user}).success(function(data){
					data = data.join(',');
					$content.find(data).remove();
					$(div).empty().append($content);
				})
		}

		function load(page, div) {
			genFromFunc = false;
			clearAllInterval();
			tinyMCE.remove()

			$.ajax({
				url: site + "/" + page,
				beforeSend: function() {
					$('#mainProgressbar').get(0).reset()
					$('#mainProgressbar').attr('type', 'indeterminate');
					$('#content').attr('loading', 'true')
				},
				xhr: function() {
					var xhr = new window.XMLHttpRequest();
					xhr.addEventListener("progress", function(evt) {
						if (evt.lengthComputable) {
							$('#mainProgressbar').removeAttr('type')
							var percentComplete = evt.loaded / evt.total;
							$('#mainProgressbar')[0].progress(Math.round(percentComplete * 100));
						}
					}, false);
					return xhr;
				},
				success: function(response) {
					if (div != '#headerBot'){
						$('#disabled_element').remove()
						setDisabled(div, response)
						/*$(div).html(response)
						$(div).append('<script id="disabled_element">setDisabled()<\/script>');*/
					}
					if (div == '#headerBot') {
						window.location.menu = page
						createMenu(response)
					}
					if (div == '#content') {
						$('j-modal').remove()
					}
				},
				dataType: "html"
			}).always(function() {
				$('#content').removeAttr('loading');
				$('#mainProgressbar')[0].complete();
			}).error(function(error){
				$(div).html(error.responseText)
			});
			return false;
		}

		function ajaxLoadPage(args) {
			clearAllInterval();
			var params = {
				url: site,
				dataType: "html",
				data: null,
				targetDiv: ""
			};
			$.extend(params, args);
			//clearAllChart();
			var image_load = "<div class='ajax_loading'><img src='" + loading_image_large + "' /></div>";
			$.ajax({
				url: site + "/" + params.url,
				type: "post",
				data: params.data,
				xhr: function() {
					var xhr = new window.XMLHttpRequest();
					xhr.addEventListener("progress", function(evt) {
						if (evt.lengthComputable) {
							$('#mainProgressbar').removeAttr('type')
							var percentComplete = evt.loaded / evt.total;
							$('#mainProgressbar')[0].progress(Math.round(percentComplete * 100));
						}
					}, false);
					return xhr;
				},
				beforeSend: function() {
					$('#mainProgressbar').get(0).reset()
					$('#mainProgressbar').attr('type', 'indeterminate');
					$('#content').attr('loading', 'true')
				},
				success: function(response) {
					$(params.targetDiv).html(response);
				},
				dataType: params.dataType
			}).always(function() {
				$('#content').removeAttr('loading');
				$('#mainProgressbar')[0].complete();
			});
			return false;
		}

		function randomString() {
			return jui2.random(8, '#aA')
		}
		$('body').delegate('#headerBot li a', 'click', function(event) {
			var upperLi = $(this).parents('li').last()
			$('#headerBot li').removeClass('selected')
			if ($(this).next().is(':visible'))
				$(this).next().hide().find('ul').hide()
			else {
				$(this).next().show()
				upperLi.addClass('selected')
			}
			upperLi.siblings().find('ul').hide()
		});
		$('body').click(function(e) {
			if ($(e.target).parents('ul').last().parent('#headerBot').length == 0) {
				$('#headerBot > ul > li ul').hide();
				$('#headerBot li').removeClass('selected')
			}
		})

		function createMenu(data) {
			$.getJSON('index.php/home/get_disabled_element?group=menu', {'user_id': user}).success(function(menudata){
				menudata = menudata.join(',')

				var items = data.split('\n'),
					parent = $('<ul></ul>'),
					tab = 0,
					lastli;
				$.each(items, function(i, val) {
					var  text = val.split(';'), el = $('<li id="'+(text[2]?text[2].trim():'')+'"><a hrf="#">' + text[0].trim() + '</a><ul></ul</li>'),
						curtab = 0

					if(text[1])
						if(text[1].trim()!=''){
							el.children('a')[0].dataClick = text[1]
							el.children('a').click(function(){
								eval(this.dataClick)
								$('#headerBot > ul > li ul').hide();
							})
						}
					if (text[0].match(/\t+/g))
						curtab = text[0].match(/\t+/g)[0].length
					if (curtab > tab)
						parent = lastli.children('ul')
					if (tab > curtab)
						for (i = 0; i < tab; i++) {
							parent = parent.parents('ul').first()
						}
					parent.append(el)
					tab = curtab
					lastli = el
				})
				menu = parent.parents('ul').last().length > 0 ? parent.parents('ul').last() : parent
				menu.find('ul:empty').remove()
				$menu = $(menu)
				$menu.filter(menudata).remove();
				$menu.find(menudata).remove()
				$('#headerBot').append(menu)
			})
		}
	</script>
</body>
