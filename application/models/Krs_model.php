<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Krs_model extends CI_Model{

  public function __construct()
  {
    parent::__construct();
    //Codeigniter : Write Less Do More
    $this->db_krs = $this->load->database('krs', true);
  }

  function get_data_krs(){
  	$data = array();
	if(isset($_REQUEST['username'])){
		$query = "select *, (select namaMK from t_mk where kdprodi = k.kdprodi and kdmk = k.kdmk) as nama, (select sks from t_mk where kdprodi = k.kdprodi and kdmk = k.kdmk) as sks from t_krs k where year = ".$_REQUEST['year']." and semester = ".$_REQUEST['semester']." and username = '".$_REQUEST['username']."'";
		$result=$this->db_krs->query($query);
		$index = 0 ;
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['kdMK'], $value['nama'], $value['sks']);
		}
	}
	return $data;
  }

  function get_data_mk(){
  	$data = array();
	$query = "select * from t_mk where is_active = 1 and kdProdi = (select kdprodi from t_mhsw where nim = '".$_REQUEST['username']."')";
	$result=$this->db_krs->query($query);
	$index = 0 ;
	foreach($result->result_array() as $key => $value){
		$data[] = array($value['kdProdi'], $value['kdMK'], $value['namaMK'], $value['sks']);
	}
	return $data;
  }

  function save_krs(){
	$mk = explode(';', $_REQUEST['mk']);
	$query = "delete from t_krs where username = '".$_REQUEST['username']."' and year =  '".$_REQUEST['year']."' and semester =  '".$_REQUEST['semester']."'";
	$result=$this->db_krs->query($query);
	foreach($mk as $key => $value){
		$val = explode(',', $value);
		$query = "INSERT INTO t_krs (username, kdMK, kdProdi, year, semester) values('".$val[0]."', '".$val[2]."', '".$val[1]."', '".$val[3]."', '".$val[4]."')";
		$result=$this->db_krs->query($query);
	}
	return 1;
  }

}
