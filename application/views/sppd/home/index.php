<style>
	#homeTab{
		background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
	    border-left: 0 none;
	    border-right: 0 none;
	    border-top: 0 none;
	}
</style>
<div data-content="Home" class="j-panel" id="home">
	<j-toolbar type="tab" id="homeTab">
		<j-button id="btnFppd">FPPD<j-badge id="bdgFPPD"></j-badge></j-button>
		<j-button id="btnFppdBatal">FPPD Batal<j-badge id="bdgFppdBatal"></j-badge></j-button>
		<j-button id="btnPerpanjanganFppd">Perpanjangan SPPD<j-badge id="bdgPerpanjanganFppd"></j-badge></j-button>
		<j-button id="btnVerifikasiFppd">Verifikasi FPPD<j-badge id="bdgVerifikasiFppd"></j-badge></j-button>
		<j-button id="btnKonfirmasiBatalPU">Konfirmasi Batal (PU)<j-badge id="bdgKonfirmasiBatalPU"></j-badge></j-button>
		<j-button id="btnKonfirmasiBatalKeu">Konfirmasi Batal (Keuangan)<j-badge id="bdgKonfirmasiBatalKeu"></j-badge></j-button>
		<j-button id="btnFdpd">FDPD<j-badge id="bdgFdpd"></j-badge></j-button>
		<j-button id="btnVerifikasiFdpd">Verifikasi FDPD<j-badge id="bdgVerifikasiFdpd"></j-badge></j-button>
		<j-button id="btnIjinSppd">Ijin SPPD<j-badge id="bdgIjinSppd"></j-badge></j-button>
		<j-button id="btnPembayaran">Pembayaran<j-badge id="bdgPembayaran"></j-badge></j-button>
		<j-button id="btnTutupFppd">Tutup FDPD<j-badge id="bdgTutupFppd"></j-badge></j-button>
	</j-toolbar><br/>
	<div id="homeContent">
	</div>
</div>
<script>
	//load('sppd_home/fppd?user='+user, '#homeContent')
	$('#btnFppdBatal').click(function(){
		load('sppd_home/fppd_batal?user='+user, '#homeContent')
	})
	$('#btnFppd').click(function(){
		load('sppd_home/fppd?user='+user, '#homeContent')
	})
	$('#btnPerpanjanganFppd').click(function(){
		load('sppd_home/perpanjangan_fppd?user='+user, '#homeContent')
	})
	$('#btnIjinSppd').click(function(){
		load('sppd_home/ijin_sppd?user='+user, '#homeContent')
	})
	$('#btnFdpd').click(function(){
		load('sppd_home/fdpd?user='+user, '#homeContent')
	})
	$('#btnKonfirmasiBatalPU').click(function(){
		load('sppd_home/konfirmasi_batal_pu?user='+user, '#homeContent')
	})
	$('#btnKonfirmasiBatalKeu').click(function(){
		load('sppd_home/konfirmasi_batal_keu?user='+user, '#homeContent')
	})
	$('#btnTutupFppd').click(function(){
		load('sppd_home/tutup_fdpd?user='+user, '#homeContent')
	})
	$('#btnVerifikasiFdpd').click(function(){
		load('sppd_home/verifikasi_fdpd?user='+user, '#homeContent')
	})
	$('#btnPembayaran').click(function(){
		load('sppd_home/pembayaran?user='+user, '#homeContent')
	})
	$('#btnVerifikasiFppd').click(function(){
		load('sppd_home/verifikasi_fppd?user='+user, '#homeContent')
	})
	
	function reload_badge(){
		$.getJSON('index.php/sppd_home/get_data_badge', {
			user : user
		}).done(function(json){
				$('#bdgFPPD').text(json[0].tot_fppd)
				$('#bdgFppdBatal').text(json[0].tot_fppd_batal)
				$('#bdgPerpanjanganFppd').text(json[0].tot_extend_fppd)
				$('#bdgVerifikasiFppd').text(json[0].tot_ver_fppd)
				$('#bdgKonfirmasiBatalPU').text(json[0].tot_fppd_batal_pu)
				$('#bdgKonfirmasiBatalKeu').text(json[0].tot_fppd_batal_keu)
				$('#bdgFdpd').text(json[0].tot_fdpd)
				$('#bdgVerifikasiFdpd').text(json[0].tot_ver_fdpd)
				$('#bdgIjinSppd').text(json[0].tot_ijin)
				$('#bdgPembayaran').text(json[0].tot_pembayaran)
				$('#bdgTutupFppd').text(json[0].tot_tutup)
		})
	}
	
	reload_badge()
	
	setInterval('reload_badge()', 60 * 1000);
	
</script>