<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class sppd_settings_model extends CI_Model{

  public function sppd_settings_model()
  {
    parent::__construct();
    //Codeigniter : Write Less Do More
    $this -> db_hris = $this -> load -> database('hris', true);
  }

	function get_data_user(){
		$query = "with table_user as(select ROW_NUMBER() over(order by user_id desc) as row_num, *, (select group_name from s_modul_user_group where modul_user_group_id = (select modul_user_group_id from s_user_modul where user_id = s.user_id) and modul_id = 1) as group_name, (select modul_user_group_id from s_user_modul where user_id = s.user_id) as modul_user_group_id, (select count(modul_id) from s_user_group_modul where user_group_id = s.user_group_id and modul_id = 1) as count_modul_id from s_user s) select * from table_user where count_modul_id = 1 order by row_num asc offset ".$_REQUEST['iDisplayStart']." rows fetch next ".$_REQUEST['iDisplayLength']." rows only";
		$result=$this->db_hris->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['USER_ID'], $value['FULLNAME'], $value['group_name'], $value['modul_user_group_id']);
		}
		return $data;
	}

	function get_data_user_total(){
		$query = "select count(*) as total from s_user";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function get_data_group(){
		$query = "select * ,
			stuff((select ';'+element_name from s_element where element_id in (select element_id from s_modul_user_group_element where MODUL_USER_GROUP_ID = sug.MODUL_USER_GROUP_ID) FOR XML PATH('')), 1, 1,'') as module
			from s_modul_user_group sug where is_active = 1 and modul_id = 1";
		$result=$this->db_hris->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['MODUL_USER_GROUP_ID'], $value['GROUP_NAME'], $value['module']);
		}
		return $data;
	}

	function get_data_group_total(){
		$query = "select count(*) as total from s_modul_user_group where modul_id = 1";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function get_data_modul(){
		$query = "select * from s_element where modul_id = 1";
		$result=$this->db_hris->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['ELEMENT_ID'], $value['ELEMENT_NAME'], $value['DESCRIPTION']);
		}
		return $data;
	}

	function get_data_modul_total(){
		$query = "select count(*) as total from s_element where modul_id = 1";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function update_user(){
		$query = "delete from s_user_modul where user_id = '".$_REQUEST['user_id']."' and modul_user_group_id = '".$_REQUEST['cmbGroup']."'";
		$result=$this->db_hris->query($query);
		$query = "insert into s_user_modul(user_id, modul_user_group_id, created_by) values('".$_REQUEST['user_id']."', '".$_REQUEST['cmbGroup']."', '".$_REQUEST['created_by']."')";
		$result=$this->db_hris->query($query);
		return 1;
	}

	function get_data_element_group(){
		$query = "select * from s_element_group";
		$result=$this->db_hris->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['ELEMENT_GROUP_ID'], $value['GROUP_NAME']);
		}
		return $data;
	}

	function get_data_element_group_total(){
		$query = "select count(*) as total from s_element_group";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function save_group(){
		$query = "insert INTO S_MODUL_USER_GROUP (group_name, modul_id, is_active) OUTPUT Inserted.modul_user_group_id as id values('".$_REQUEST['txtGroupName']."', 1, 1)";
		$result=$this->db_hris->query($query);
		$user_group_id = $this->db_hris->insert_id();
		$module = explode(',', $_REQUEST['module']);
		foreach($module as $key => $value){
			$query = "INSERT INTO S_MODUL_USER_GROUP_ELEMENT (modul_user_group_id, element_id, created_by, is_active) values('".$user_group_id."', '".$value."', '".$_REQUEST['created_by']."', 1)";
			$result=$this->db_hris->query($query);
		}
		return 1;
	}

	function delete_group(){
		$query = "delete from S_MODUL_USER_GROUP_ELEMENT where modul_user_group_id = ".$_REQUEST['modul_user_group_id'];
		$result=$this->db_hris->query($query);
		$query = "delete from S_MODUL_USER_GROUP where modul_user_group_id = ".$_REQUEST['modul_user_group_id'];
		$result=$this->db_hris->query($query);
		return 1;
	}

	function update_group(){
		$query = "update S_MODUL_USER_GROUP set group_name = '".$_REQUEST['txtGroupName']."' where modul_user_group_id = '".$_REQUEST['user_group_id']."'";
		$result=$this->db_hris->query($query);
		$module = explode(',', $_REQUEST['module']);
		$query = "delete from S_MODUL_USER_GROUP_ELEMENT where modul_user_group_id = '".$_REQUEST['user_group_id']."'";
		$result=$this->db_hris->query($query);
		foreach($module as $key => $value){
			$query = "INSERT INTO S_MODUL_USER_GROUP_ELEMENT (modul_user_group_id, element_id, created_by, is_active) values('".$_REQUEST['user_group_id']."', '".$value."', '".$_REQUEST['created_by']."', 1)";
			$result=$this->db_hris->query($query);
		}
		return 1;
	}

	function save_element_group(){
		$query = "insert into s_element_group(group_name) values('".$_REQUEST['txtGroupName']."')";
		$result=$this->db_hris->query($query);
		return 1;
	}

	function update_element_group(){
		$query = "update into s_element_group set group_name = '".$_REQUEST['txtGroupName']."' where element_group_id '".$_REQUEST['element_group_id']."'";
		$result=$this->db_hris->query($query);
		return 1;
	}

	function delete_element_group(){
		$query = "delete from s_element_group where element_group_id = '".$_REQUEST['element_group_id']."'";
		$result=$this->db_hris->query($query);
		return 1;
	}

	function get_data_element(){
		$query = "select *, (select group_name from s_element_group where element_group_id = s.element_group_id) as group_name from s_element s where modul_id = 1";
		$result=$this->db_hris->query($query);
		$index = 0 ;
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['ELEMENT_ID'], $value['ELEMENT_NAME'], $value['DESCRIPTION'], $value['group_name'], $value['element_group_id']);
		}
		return $data;
	}

	function get_data_element_total(){
		$query = "select count(*) as total from s_element where modul_id = 1";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function save_element(){
		$query = "insert into s_element(element_id, element_name, description, modul_id, element_group_id) values('".$_REQUEST['txtElementId']."', '".$_REQUEST['txtElementName']."', '".$_REQUEST['txtDescription']."', 1, '".$_REQUEST['cmbGroup']."')";
		$result=$this->db_hris->query($query);
		return 1;
	}

	function update_element(){
		$query = "update s_element set element_id = '".$_REQUEST['txtElementId']."', element_name = '".$_REQUEST['txtElementName']."', description = '".$_REQUEST['txtDescription']."', element_group_id = '".$_REQUEST['cmbGroup']."' where element_id = '".$_REQUEST['element_id']."'";
		$result=$this->db_hris->query($query);
		return 1;
	}

	function delete_element(){
		$query = "delete from s_element where element_id = '".$_REQUEST['element_id']."'";
		$result=$this->db_hris->query($query);
		return 1;
	}

	function get_data_directorate(){
		$query = "SELECT * FROM (
									SELECT  *,
			                        ROW_NUMBER() OVER(PARTITION BY directorate ORDER BY dept_ID asc) rn
			                    	from fn_genAllDeptIDBasedLevel(1)
			    				) a
		WHERE rn = 1 order by directorate asc";
		$result=$this->db_hris->query($query);
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['DEPT_ID'], $value['DIRECTORATE'] == '' ? 'All' : $value['DIRECTORATE']);
		}
		return $data;
	}

	function get_data_directorate_total(){
		$query = "select count(*) as total from (select distinct directorate from fn_genAllDeptIDBasedLevel(1))a";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function get_data_division(){
		$query = "SELECT * FROM (
									SELECT  *,
			                        ROW_NUMBER() OVER(PARTITION BY division ORDER BY dept_ID asc) rn
			                    	from fn_genAllDeptIDBasedLevel(".(isset($_REQUEST['id']) ? $_REQUEST['id'] : 1).")
			    				) a
		WHERE rn = 1 order by division asc";
		$result=$this->db_hris->query($query);
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['DEPT_ID'], $value['DIVISION'] == '' ? 'All' : $value['DIVISION']);
		}
		return $data;
	}

	function get_data_division_total(){
		$query = "select count(*) as total from (select distinct division from fn_genAllDeptIDBasedLevel(".(isset($_REQUEST['id']) ? $_REQUEST['id'] : 1)."))a";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function get_data_department(){
		$query = "SELECT * FROM (
									SELECT  *,
			                        ROW_NUMBER() OVER(PARTITION BY department ORDER BY dept_ID asc) rn
			                    	from fn_genAllDeptIDBasedLevel(".(isset($_REQUEST['id']) ? $_REQUEST['id'] : 1).")
			    				) a
		WHERE rn = 1 order by department asc";
		$result=$this->db_hris->query($query);
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['DEPT_ID'], $value['DEPARTMENT'] == '' ? 'All' : $value['DEPARTMENT']);
		}
		return $data;
	}

	function get_data_department_total(){
		$query = "select count(*) as total from (select distinct department from fn_genAllDeptIDBasedLevel(".(isset($_REQUEST['id']) ? $_REQUEST['id'] : 1)."))a";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function get_data_section(){
		$query = "SELECT * FROM (
									SELECT  *,
			                        ROW_NUMBER() OVER(PARTITION BY section ORDER BY dept_ID asc) rn
			                    	from fn_genAllDeptIDBasedLevel(".(isset($_REQUEST['id']) ? $_REQUEST['id'] : 1).")
			    				) a
		WHERE rn = 1 order by section asc";
		$result=$this->db_hris->query($query);
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['DEPT_ID'], $value['SECTION'] == '' ? 'All' : $value['SECTION']);
		}
		return $data;
	}

	function get_data_section_total(){
		$query = "select count(*) as total from (select distinct section from fn_genAllDeptIDBasedLevel(".(isset($_REQUEST['id']) ? $_REQUEST['id'] : 1)."))a";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function get_data_user_dept(){
		$query = "select s.useracc_dept_id, directorate, division, department, section from SPPD_S_USERACC_DEPT s inner join base_m_dept b on b.DEPT_ID = s.DEPT_ID where user_id = '".$_REQUEST['user_id']."'";
		$result=$this->db_hris->query($query);
		$data = array();
		foreach($result->result_array() as $key => $value){
			$data[] = array($value['useracc_dept_id'], $value['directorate'] == '' ? 'All' : $value['directorate'], $value['division'] == '' ? 'All' : $value['division'], $value['department'] == '' ? 'All' : $value['department'], $value['section'] == '' ? 'All' : $value['section']);
		}
		return $data;
	}

	function get_data_user_dept_total(){
		$query = "select count(*) as total from SPPD_S_USERACC_DEPT where user_id = '".$_REQUEST['user_id']."'";
		$result=$this->db_hris->query($query);
		$total = 0 ;
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
	}

	function save_user_dept(){
		$query = "insert into SPPD_S_USERACC_DEPT(user_id, dept_id, created_by) values('".$_REQUEST['user_id']."', '".$_REQUEST['dept_id']."', '".$_REQUEST['user_id']."')";
		$result=$this->db_hris->query($query);
		return 1;
	}

	function delete_user_dept(){
		$query = "delete from SPPD_S_USERACC_DEPT where useracc_dept_id = '".$_REQUEST['useracc_dept_id']."'";
		$result=$this->db_hris->query($query);
		return 1;
	}
}