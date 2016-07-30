<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Krs extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    //Codeigniter : Write Less Do More
	$this->load->model(array('krs_model'));
  }

  function index()
  {
	$this->load->view('krs/index.php');
  }

  function get_data_krs(){
	$data = $this->krs_model->get_data_krs();
	echo json_encode(array(
	  'sEcho'=>$_REQUEST['sEcho'],
	  'aaData'=>$data
	));
  }

  function table_krs(){
	$this->load->view('krs/table_krs.php');
  }

  function add_mk(){
	$this->load->view('krs/add_mk.php');
  }

  function get_data_mk(){
	$data = $this->krs_model->get_data_mk();
	echo json_encode(array(
	  'sEcho'=>$_REQUEST['sEcho'],
	  'aaData'=>$data
	));
  }

  function save_krs(){
	$data = $this->krs_model->save_krs();
	echo json_encode(array('status'=>$data));
  }

}
