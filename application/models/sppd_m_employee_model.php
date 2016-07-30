<?php

class sppd_m_employee_model extends CI_Model {

	function sppd_m_employee_model(){
		parent::__construct();
		$this -> db_sppd = $this -> load -> database('hris', true);
	}
	
	function get_data_employee(){
		$result = $this->db_sppd->query("
			SELECT
				row_num,
				employee_id,
				[name],
				nik,
				directorate,
				division,
				department,
				[section],
				location_work,
				job_position,
				job_level,
				is_sf,
				address,
				phonenumber,
				banknumber 
			FROM dbo.vw_list_employee
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
		$result = array_slice($result, $_REQUEST['iDisplayStart'], $_REQUEST['iDisplayLength']);
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['row_num'],
							$value['name'],
							$value['nik'],
							$value['directorate'],
							$value['division'],
							$value['department'],
							$value['section'],
							$value['location_work'],
							$value['job_position'],
							$value['job_level'],
							$value['employee_id'],									
							$value['is_sf'],									
							$value['address'],									
							$value['phonenumber'],									
							$value['banknumber']
						);
		}
		return $return;
	}

}