<?php

class Settings_model extends CI_Model {

	function Settings_model(){
		parent::__construct();
		$this -> db_krs = $this -> load -> database('krs', true);
	}

	function get_data_user(){
		$query = "select *, (select group_name from t_user_group where user_group_id = s.user_group_id) as group_name from t_user s limit ".$_REQUEST['iDisplayStart'].", ".$_REQUEST['iDisplayLength'];
		$result=$this->db_krs->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['username'], $value['fullname'], '', $value['group_name'], $value['user_group_id'], $value['max_sks']);
		}
		return $data;
	}

	function get_data_user_total(){
		$query = "select count(*) as total from t_user";
		$result=$this->db_krs->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function get_data_group(){
		$query = "select * ,
			(select group_concat(modul separator ', ') from t_modul where modul_id in (select modul_id from t_user_group_modul where user_group_id = sug.user_group_id)) as module
			from t_user_group sug";
		$result=$this->db_krs->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['user_group_id'], $value['group_name'], $value['module']);
		}
		return $data;
	}

	function get_data_group_total(){
		$query = "select count(*) as total from t_user_group";
		$result=$this->db_krs->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function get_data_modul(){
		$query = "select * from t_modul";
		$result=$this->db_krs->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['modul_id'], $value['modul'], $value['description']);
		}
		return $data;
	}

	function get_data_modul_total(){
		$query = "select count(*) as total from t_modul";
		$result=$this->db_krs->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function save_user(){
		$query = "insert into t_user(username, password, fullname, user_group_id, created_by, max_sks) values('".$_REQUEST['txtUsername']."', '".md5($_REQUEST['txtUsername'].'uniga'.$_REQUEST['txtPassword'])."', '".$_REQUEST['txtFullname']."', '".$_REQUEST['cmbGroup']."', '".$_REQUEST['created_by']."', '".$_REQUEST['txtTotalSKS']."')";
		$result=$this->db_krs->query($query);
		return 1;
	}

	function delete_user(){
		$query = "delete from t_user where username = '".$_REQUEST['username']."'";
		$result=$this->db_krs->query($query);
		return 1;
	}

	function update_user(){
		$query = "update t_user set username = '".$_REQUEST['txtUsername']."', password = '".md5($_REQUEST['txtUsername'].'uniga'.$_REQUEST['txtPassword'])."', fullname = '".$_REQUEST['txtFullname']."', user_group_id = '".$_REQUEST['cmbGroup']."', max_sks = '".$_REQUEST['txtTotalSKS']."' where username = '".$_REQUEST['user_id']."'";
		$result=$this->db_krs->query($query);
		return 1;
	}

	function save_group(){
		$query = "insert into t_user_group (group_name, is_active) values('".$_REQUEST['txtGroupName']."', 1)";
		$result=$this->db_krs->query($query);
		$user_group_id = $this->db_krs->insert_id();
		$module = explode(',', $_REQUEST['module']);
		foreach($module as $key => $value){
			$query = "insert into t_user_group_modul (user_group_id, modul_id, created_by, is_active) values(".$user_group_id.", ".$value.", '".$_REQUEST['created_by']."', 1)";
			$result=$this->db_krs->query($query);
		}
		return 1;
	}

	function delete_group(){
		$query = "delete from t_user_group_modul where user_group_id = ".$_REQUEST['user_group_id'];
		$result=$this->db_krs->query($query);
		$query = "delete from t_user_group where user_group_id = ".$_REQUEST['user_group_id'];
		$result=$this->db_krs->query($query);
		return 1;
	}

	function update_group(){
		$query = "update t_user_group set group_name = '".$_REQUEST['txtGroupName']."' where user_group_id = ".$_REQUEST['user_group_id'];
		$result=$this->db_krs->query($query);
		$module = explode(',', $_REQUEST['module']);
		$query = "delete from t_user_group_modul where user_group_id = ".$_REQUEST['user_group_id'];
		$result=$this->db_krs->query($query);
		foreach($module as $key => $value){
			$query = "insert into t_user_group_modul (user_group_id, modul_id, created_by, is_active) values(".$_REQUEST['user_group_id'].", ".$value.", '".$_REQUEST['created_by']."', 1)";
			$result=$this->db_krs->query($query);
		}
		return 1;
	}

	/*function get_data_employee(){
		$query = "with table_employee as(select row_number() over(order by a.[employee_id] desc) as row_num, a.[employee_id]  as employee_id
      ,a.[name]			as [name]
      ,a.[nik]			as [nik]
	  ,b.directorate	as directorate
	  ,b.division		as division
	  ,b.department		as department
	  ,b.section		as section
  from [hris].[dbo].[base_m_employee] a
			inner join base_m_dept b on a.dept_id = b.dept_id
  where a.is_active = 1 ) select * from table_employee order by row_num asc offset ".$_REQUEST['iDisplayStart']." rows fetch next ".$_REQUEST['iDisplayLength']." rows only";
		$result=$this->db_krs->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
		  $data[] = array($value['employee_id'], $value['nik'], $value['name'], $value['directorate'], $value['division'], $value['department'], $value['section']);
		}
		return $data;
	}

	function get_data_employee_total(){
		$query = "select count(*) as total from [HRIS].[dbo].[BASE_M_EMPLOYEE] A
	  			INNER JOIN BASE_M_DEPT B ON A.DEPT_ID = B.DEPT_ID
	    WHERE A.IS_ACTIVE = 1 ";
		$result=$this->db_krs->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}*/

	function get_data_mk(){
		$query = "select * from t_mk where namaMK like '%".$_REQUEST['sSearch']."%' limit ".$_REQUEST['iDisplayStart'].", ".$_REQUEST['iDisplayLength'];
		$result=$this->db_krs->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['kdProdi'], $value['kdMK'], $value['namaMK'], $value['sks'], $value['is_active']);
		}
		return $data;
	}

	function get_data_mk_total(){
		$query = "select count(*) as total from t_mk";
		$result=$this->db_krs->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function toggle_mk(){
		$query = "update t_mk set is_active = '".$_REQUEST['is_active']."' where kdProdi = '".$_REQUEST['kdProdi']."' and kdMK = '".$_REQUEST['kdMK']."'";
		$result=$this->db_krs->query($query);
		return 1;
	}

	function save_mk(){
		$query = "insert into t_mk(kdProdi, kdMK, namaMK, sks, is_active) values('".$_REQUEST['txtKodeProdi']."', '".$_REQUEST['txtKodeMK']."', '".$_REQUEST['txtNama']."', '".$_REQUEST['txtSKS']."', '".$_REQUEST['cmbActive']."')";
		$result=$this->db_krs->query($query);
		return 1;
	}

	function delete_mk(){
		$query = "delete from t_mk where kdProdi = '".$_REQUEST['kodeProdi']."' and kdMK = '".$_REQUEST['kodeMK']."'";
		$result=$this->db_krs->query($query);
		return 1;
	}

}
