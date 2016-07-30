<?php

class Home_model extends CI_Model {

	function Home_model(){
		parent::__construct();
		$this -> db_hris = $this -> load -> database('krs', true);
	}

	function get_module(){
		$query = "select * from t_modul where modul_id in (select modul_id from t_user_group_modul where user_group_id = (select user_group_id from t_user where username = '".$_REQUEST['username']."'))";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array('modul' => $value['modul']);
		}
		return $data;
	}

	function get_disabled_element(){
		$query = "select element_id from t_element s where (select group_name from t_element_group where element_group_id = s.element_group_id) = '".$_REQUEST['group']."' and element_id not in(select element_id from t_modul_user_group_element where modul_user_group_id in (select modul_user_group_id from t_user_modul where user_id = '".$_REQUEST['user_id']."')) and IS_ACTIVE = 1";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = '#'.$value['element_id'];
		}
		return $data;
	}

}
