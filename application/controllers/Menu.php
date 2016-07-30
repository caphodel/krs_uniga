<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Menu extends CI_Controller {

	function Menu()
	{
		parent::__construct();
	}
	function index()
	{
		$this->load->view('home/index');
	}
    function menu_mfs()
    {
    	$this->load->view('menu/mfs');
    }
    function menu_loaning()
    {
    	$this->load->view('menu/loaning_asset');
    }
    function menu_proj_manage()
	{
		$this->load->view('menu/proj_manage');
	}
    function menu_default()
    {
        if(strstr(from_session('module'),"secondaryGempolModul"))
        {
            $this->load->view('menu/sec_gempol2');

        }
        else if(strstr(from_session('module'),"skModul"))
        {
            $this->load->view('menu/sec_kediri2');
        }
    }
    function content_default()
    {
        if(strstr(from_session('module'),"secondaryGempolModul"))
        {
            $this->load->view('secondaryGempol/overview');
        }
        else if(strstr(from_session('module'),"skModul"))
        {
           $this->load->view('secondaryKediri/machine_overview');
        }
    }
	function menu_sec_gempol()
	{
            $this->load->view('menu/sec_gempol2');
	}
    function menu_sec_kediri()
	{
		$this->load->view('menu/sec_kediri2');
	}
    function menu_pri_kediri()
	{
		$this->load->view('menu/pri_kediri');
	}
	function menu_pri_gempol()
	{
		$this->load->view('menu/pri_gempol');
	}
    function menu_home()
	{
		$this->load->view('menu/home');
	}
    function menu_account()
	{
		$this->load->view('menu/account');
	}
    function menu_info()
	{
		$this->load->view('menu/info');
	}
	function menu_about()
	{
		$this->load->view('menu/about');
	}
	function menu_help()
	{
		$this->load->view('menu/help');
	}
	function menu_new_sec_gempol()
	{
		$this->load->view('menu/new_sec_gempol2');
	}
	function menu_loan()
	{
		$this->load->view('menu/loan_gempol');
	}
    function menu_utility()
	{
		$this->load->view('menu/utility');
	}
    function menu_workshop()
	{
		$this->load->view('menu/workshop');
	}
	function menu_ewis()
	{
		$this->load->view('menu/yanur_view');
	}
    function menu_emres()
	{
		$this->load->view('menu/emres_new');
	}
	function menu_cbs()
	{
		$this->load->view('menu/menu_cbs');
	}

    function menu_ea()
    {
        $this->load->view('menu/menu_ea');
    }

	function menu_email()
    {
        $this->load->view('menu/menu_email');
    }

	function menu_qc()
    {
        $this->load->view('menu/menu_qc');
    }

	function menu_elmas()
    {
        $this->load->view('menu/menu_elmas');
    }

	function menu_saa()
    {
        $this->load->view('menu/menu_saa');
    }
    function menu_sp()
    {
        $this->load->view('menu/menu_sp');
    }
    function menu_print()
    {
        $this->load->view('menu/menu_print');
    }
	function menu_prod_sec()
    {
        $this->load->view('menu/menu_prodsec');
    }
	function menu_redmine()
    {
        $this->load->view('menu/menu_redmine');
    }
	function menu_billing_lunch()
    {
        $this->load->view('menu/menu_billing_lunch');
    }
	function menu_psps()
    {
        $this->load->view('menu/menu_psps');
    }
	function menu_ebike()
    {
        $this->load->view('menu/menu_ebike');
    }
	function menu_hotline()
    {
        $this->load->view('menu/menu_hotline');
    }
	function menu_srm()
    {
        $this->load->view('menu/menu_srm');
    }
	function menu_guest()
    {
        $this->load->view('menu/menu_guest');
    }
	function menu_sppd()
    {
        $this->load->view('menu/menu_sppd');
    }
	function menu_settings()
    {
        $this->load->view('menu/menu_settings');
    }
	function menu_krs()
    {
        $this->load->view('menu/menu_krs');
    }


}

/* End of file home.php */
/* Location: ./system/application/controllers/home.php */
