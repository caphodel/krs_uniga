<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Settings extends CI_Controller {

	function Settings(){
		parent::__construct();
		$this->load->model(array('Settings_model'));
	}

	function index(){
		$this->load->view('settings/index.php');
	}

	function get_data_user(){
		$data = $this->Settings_model->get_data_user();
		$total = $this->Settings_model->get_data_user_total();
		echo json_encode(array('sEcho'=>$_REQUEST['sEcho'], 'aaData'=>$data, 'iTotalRecords'=>$total, 'iTotalDisplayRecords'=>$_REQUEST['iDisplayLength']));
	}

	function add_user(){
		$this->load->view('settings/add_user.php');
	}

	function get_data_group(){
		$data = $this->Settings_model->get_data_group();
		$total = $this->Settings_model->get_data_group_total();
		echo json_encode(array('sEcho'=>$_REQUEST['sEcho'], 'aaData'=>$data, 'iTotalRecords'=>$total, 'iTotalDisplayRecords'=>$_REQUEST['iDisplayLength']));
	}

	function save_user(){
		$data = $this->Settings_model->save_user();
		echo json_encode(array('status'=>$data));
	}

	function delete_user(){
		$data = $this->Settings_model->delete_user();
		echo json_encode(array('status'=>$data));
	}

	function edit_user(){
		$this->load->view('settings/edit_user.php');
	}

	function update_user(){
		$data = $this->Settings_model->update_user();
		echo json_encode(array('status'=>$data));
	}

	function add_group(){
		$this->load->view('settings/add_group.php');
	}

	function get_data_modul(){
		$data = $this->Settings_model->get_data_modul();
		$total = $this->Settings_model->get_data_modul_total();
		echo json_encode(array('sEcho'=>$_REQUEST['sEcho'], 'aaData'=>$data, 'iTotalRecords'=>$total, 'iTotalDisplayRecords'=>$_REQUEST['iDisplayLength']));
	}

	function save_group(){
		$data = $this->Settings_model->save_group();
		echo json_encode(array('status'=>$data));
	}

	function delete_group(){
		$data = $this->Settings_model->delete_group();
		echo json_encode(array('status'=>$data));
	}

	function edit_group(){
		$this->load->view('settings/edit_group.php');
	}

	function update_group(){
		$data = $this->Settings_model->update_group();
		echo json_encode(array('status'=>$data));
	}

	function user(){
		$this->load->view('settings/user.php');
	}

	function group(){
		$this->load->view('settings/group.php');
	}

	function mk(){
		$this->load->view('settings/mk.php');
	}

	/*function get_data_employee(){
		$data = $this->Settings_model->get_data_employee();
		$total = $this->Settings_model->get_data_employee_total();
		echo json_encode(array('sEcho'=>$_REQUEST['sEcho'], 'aaData'=>$data, 'iTotalRecords'=>$total, 'iTotalDisplayRecords'=>$_REQUEST['iDisplayLength']));
	}*/

	function get_data_mk(){
		$data = $this->Settings_model->get_data_mk();
		$total = $this->Settings_model->get_data_mk_total();
		echo json_encode(array('sEcho'=>$_REQUEST['sEcho'], 'aaData'=>$data, 'iTotalRecords'=>$total, 'iTotalDisplayRecords'=>$_REQUEST['iDisplayLength']));
	}

	function add_mk(){
		$this->load->view('settings/add_mk.php');
	}

	function toggle_mk(){
		$data = $this->Settings_model->toggle_mk();
		echo json_encode(array('status'=>$data));
	}

	function save_mk(){
		$data = $this->Settings_model->save_mk();
		echo json_encode(array('status'=>$data));
	}

	function delete_mk(){
		$data = $this->Settings_model->delete_mk();
		echo json_encode(array('status'=>$data));
	}

}
?>
