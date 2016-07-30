<?php

class sppd_report_model extends CI_Model {
						
	function sppd_report_model(){		
		parent::__construct();
		$this -> db_sppd = $this -> load -> database('hris', true);
	}
	
	function get_data_report_fppd(){
		$result = $this->db_sppd->query("
			select 
				fppd_main_id,
				ROW_NUMBER() over(order by fppd_id asc) as row_num,
				fppd_no, 
				fppd_id, 
				employee_id,
				name, 
				nik, 
				dept_id,
				directorate, 
				division, 
				department, 
				section, 
				[version],
				[version_name],
				cancel,
				extend,
				departure_date,
				arrival_date
			from fn_sppd_getFppdListReport('".$_REQUEST['user']."', '".$_REQUEST['departure_date_start']."', '".$_REQUEST['departure_date_end']."')
		");
		
		#echo $this->db_sppd->last_query();
		$result = $result -> result_array();
		$return['total']=sizeof($result);
		$result = array_slice($result, $_REQUEST['iDisplayStart'], $_REQUEST['iDisplayLength']);
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['fppd_id'],
							$value['row_num'],
							$value['fppd_no'],
							$value['name'],
							$value['nik'],
							$value['directorate'],
							$value['division'],
							$value['department'],
							$value['section'],
							$value['version_name'],
							$value['fppd_id']
					);
		}
		return $return;
	}	

	function get_data_report_fdpd(){
		$result = $this->db_sppd->query("
			select 
				ROW_NUMBER() over(order by fdpd_id asc) as row_num,
				fdpd_main_id,
				fppd_no, 
				fdpd_no, 
				fdpd_id, 
				employee_id,
				name, 
				nik, 
				dept_id,
				directorate, 
				division, 
				department, 
				section,
				departure_date,
				arrival_date
			from fn_sppd_getFdpdListReport('".$_REQUEST['user']."', '".$_REQUEST['departure_date_start']."', '".$_REQUEST['departure_date_end']."')
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
		$result = array_slice($result, $_REQUEST['iDisplayStart'], $_REQUEST['iDisplayLength']);
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['fdpd_id'],
							$value['row_num'],
							$value['fppd_no'],
							$value['fdpd_no'],
							$value['name'],
							$value['nik'],
							$value['directorate'],
							$value['division'],
							$value['department'],
							$value['section'],
							$value['fdpd_id']
					);
		}
		return $return;
	}	
		
}