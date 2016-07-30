<style>
	.card {
		height: 200px;
		width: 150px;
		padding-bottom: 25px;
		display: inline-block;
		position: relative;
		background-color: #fff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		transition: all 0.2s ease-in-out;
		margin: 5px;
	}

	.card:after {
		content: attr(title);
		position: absolute;
		width: 100%;
		height: 55px;
		bottom: 0px;
		left: 0px;
		background-color: #fff;
		font-family: "Roboto", sans-serif;
		font-weight: normal;
		line-height: 1.5;
		font-size: 12px;
		padding: 10px;
		box-sizing: border-box;
		text-align: center;
		border-top: 1px solid #D9D9D9;
	}

	#moduleChooser {
		padding: 20px 40px;
	}

	#moduleChooser .card:before {
		height: 100%;
		content: "";
		width: 1px;
		display: inline-block;
		vertical-align: middle;
	}

	#moduleChooser .card {
		text-align: center;
		cursor: pointer;
	}

	.card[title=EMRES],
	.card[title="NEW EMRES"] {
		background: #76b852;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to left, #76b852, #8DC26F);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to left, #76b852, #8DC26F);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}

	.card[title="Employee Attendance"] {
		background: #FFB75E;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to left, #FFB75E, #ED8F03);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to left, #FFB75E, #ED8F03);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 2 */
	}

	.card[title="Secondary"] {
		background: #215f00;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to left, #215f00, #e4e4d9);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to left, #215f00, #e4e4d9);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
</style>
<div id="moduleChooser">
	<!--div class="card" title="EMRES">
		<img src="asset/images/image/warehouse.png" style="vertical-align: middle; width: 75px;" />
	</div>
	<div class="card" title="Employee Attendance">
		<img src="asset/images/image/absensi.png" style="vertical-align: middle; width: 75px;" />
	</div-->
</div>

<script>
	$('#content').addClass('contentGrey')
	/**
	 * Load menu data from txt and insert as card
	 * @author Deddy Lasmono Putro
	 */
	var modules = [];
	$.getJSON("index.php/home/get_module?username="+user).success(function(modules) {
		modules = modules;
		$.ajax({
			url: "asset/txt/ListMenu.txt"
		}).done(function(data) {
			var data = data.split('\n'),
				menu, el
			for (i in data) {
				if (typeof data[i].match == 'function')
					if (data[i].match(/^--/) == null) {
						menu = data[i].split("<>")
						if(modules.filter(function(a){
							return a.modul == menu[1]
						}).length > 0){
							el = $('<div style="background: '+menu[4]+'" class="card" title="' + menu[1] + '" module="' + menu[1] + '"><img src="' + menu[0] + '" style="vertical-align: middle; width: 75px;" /></div>');
							el[0].dataClick = menu[3];

							el.click(function(){
								module = $(this).attr('title').toLowerCase()
								eval(this.dataClick)
								$('#content').removeClass('contentGrey')
							})
							$('#moduleChooser').append(el)
						}
					}
			}
			$('[module]').filter(function(){
				var pass = true;
				for(i in modules){
					if($(this).attr('module') == modules[i].modul)
					pass = false;
				}
				return pass
			}).remove()
		})
	})
</script>
