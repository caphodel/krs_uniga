<?php

class sppd_fdpd_model extends CI_Model {
						
	function sppd_fdpd_model(){
		parent::__construct();
		$this -> db_sppd = $this -> load -> database('hris', true);
	}		
	
	function select_table($query=''){
		$result = $this->db_sppd->query($query);
		$result = $result->result_array();
		return $result[0];
	}
	
	function get_data_fppd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select 
				ROW_NUMBER() over(order by a.fppd_main_id asc) as row_num,
				a.fppd_main_id,
				a.fppd_no, 
				a.fppd_id, 
				a.employee_id,
				a.name, 
				a.nik, 
				a.dept_id,
				a.directorate, 
				a.division, 
				a.department, 
				a.section, 
				a.[version],
				a.[version_name],
				a.cancel,
				a.extend,
				a.position,
				a.verifikasi
			from [dbo].[fn_sppd_getFppdList] ('".$_REQUEST['user']."', 'FDPD') a
			".$sSearch."
		");

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
							$value['cancel'],
							$value['extend'],
							$value['position'],
							$value['fppd_id'],
							$value['verifikasi']
					);
		}
		return $return;
	}
	
	function get_data_fdpd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".trim($_REQUEST['sSearch'])."%' or a.nik like '%".trim($_REQUEST['sSearch'])."%' or a.fppd_no like '%".trim($_REQUEST['sSearch'])."%') ";
		}
		
		$result = $this->db_sppd->query("
			select 
				ROW_NUMBER() over(order by a.fdpd_main_id asc) as row_num,
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
				position
			from [dbo].[fn_sppd_getFdpdList] ('".$_REQUEST['user']."') a
			".$sSearch."
		");
		
		#echo $this->db_sppd->last_query();
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
							$value['position'],
							$value['fdpd_id']
					);
		}
		return $return;
	}
	
	function get_fppd_total_fix(){
		$result = $this->db_sppd->query("
			select 
			  a.currency_id,
			  b.curr_symbol,
			  a.total
			from sppd_t_fppd_total_fix a
			inner join m_currency b on b.currency_id=a.currency_id
			where a.fppd_id='".$_REQUEST['fppd_id']."'
		");

		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['curr_symbol'],
							$value['total'],
							$value['currency_id']
					);
		}
		return $return;
	}
	
	function get_data_employee($param){
		$result = $this->db_sppd->query("
				select 
					ROW_NUMBER() over(order by a.nik asc) as row_num,
					a.name,
					a.nik,
					a.directorate,
					a.division,
					a.department,
					a.section,
					a.location_work,
					a.job_position,
					a.job_level,
					a.employee_id,
					a.is_sf,
					a.address,
					a.phonenumber,
					a.banknumber,
					b.pp_code_id,
					b.pp_code
				from fn_getDetailEmployeeBasedUser('".$param['user']."') a
				cross apply fn_getPPCodeByDeptID(a.dept_id) b
				where a.employee_id='".$param['employee_id']."'
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
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
							$value['banknumber'],
							$value['pp_code_id'],
							$value['pp_code'],
							$param['fppd_no']
						);
		}
		return $return;
	}
	
	function get_data_destination(){
		$result = $this->db_sppd->query("
				select 
					b.city,
					d.category_dest,
					a.destination_id,
					convert(varchar(10), a.departure_date, 120) departure_date,
					left(cast(a.departure_time as time),5) departure_time,
					convert(varchar(10), a.arrival_date, 120) arrival_date,
					left(cast(a.arrival_time as time),5) arrival_time,
					stuff((
							select 
								','+convert(varchar(10), e.effective_date, 120)
							from sppd_t_fppd_dest_date e
							where e.is_active=1 and e.fppd_dest_id in (
								select 
									fppd_dest_id 
								from sppd_t_fppd_dest 
								where fppd_id=a.fppd_id and fppd_dest_id=a.fppd_dest_id
							)
						for xml path(''),type).value('.[1]','varchar(max)'),1,1,''
					) eff_date,
					a.eff_date_tot,
					a.eff_date_note,
					d.category_dest_id
				from sppd_t_fppd_dest a
				inner join sppd_m_destination b on b.destination_id=a.destination_id
				inner join SPPD_M_DEST_LOC_CAT c on c.DESTINATION_ID=b.DESTINATION_ID
				inner join sppd_m_category_dest d on d.CATEGORY_DEST_ID=c.CATEGORY_DEST_ID
				where a.fppd_id='".$_REQUEST['fppd_id']."'
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['city'],
							$value['category_dest'],
							$value['destination_id'],
							$value['departure_date'],
							$value['departure_time'],
							$value['arrival_date'],
							$value['arrival_time'],
							$value['eff_date'],
							$value['eff_date_tot'],
							$value['eff_date_note'],
							$value['category_dest_id']
						);
		}
		return $return;
	}
	
	function select_detail_employee(){
		$result = $this->db_sppd->query("
			select 
				a.job_position_id,
				a.job_level_id,
				a.dept_id,
				a.location_work_id
			from fn_getEmployeeBasedUser('".$_REQUEST['user']."') a 
			where a.employee_id='".$_REQUEST['employee_id']."'
		");
		
		$result = $result->result_array();
		$return['job_position_id']=$result[0]['job_position_id'];
		$return['job_level_id']=$result[0]['job_level_id'];
		$return['dept_id']=$result[0]['dept_id'];
		$return['location_work_id']=$result[0]['location_work_id'];
		return $return;
	}
	
	
	function insert_fdpd_main($param){
		$result = $this->db_sppd->query("
				insert into sppd_t_fdpd_main(
					fdpd_no,
					fppd_no,
					fppd_main_id,
					employee_id,
					job_position_id,
					job_level_id,
					dept_id,
					location_work_id,
					fppd_id
				) 
				values(
					'".$param['fdpd_no']."',
					'".$param['fppd_no']."',
					(select top 1 fppd_main_id from sppd_t_fppd_main where fppd_no='".$param['fppd_no']."'),
					'".$param['employee_id']."',
					'".$param['job_position_id']."',
					'".$param['job_level_id']."',
					'".$param['dept_id']."',
					'".$param['location_work_id']."',
					'".$param['fppd_id']."'
				)
				
				update sppd_t_fppd set is_fdpd=1 where fppd_id='".$param['fppd_id']."'
		");
		
		return $this->db_sppd->insert_id();
	}	
	
	function insert_fdpd(){
		$result = $this->db_sppd->query("
				insert into dbo.sppd_t_fdpd(
					fdpd_main_id,
					purpose,
					is_done,
					fdpd_note,
					statusflag,
					is_active,
					created_by,
					created_date
				) 
				values (
					'".$_REQUEST['fdpd_main_id']."',
					'".$_REQUEST['purpose']."',
					'".$_REQUEST['is_done']."',
					'".$_REQUEST['fdpd_note']."',
					0,
					1,
					'".$_REQUEST['user']."',
					getdate()
				)
		");
		
		return $this->db_sppd->insert_id();
	}	
	
	function insert_job_detail(){
		$result = $this->db_sppd->query("
			insert into sppd_t_fdpd_job_detail(
				fdpd_id,
				job_date,
				start_time,
				end_time,
				job_note
			) 
			values (
				'".$_REQUEST['fdpd_id']."',
				'".$_REQUEST['job_date']."',
				'".$_REQUEST['job_date']." ".$_REQUEST['start_time']."',
				'".$_REQUEST['job_date']." ".$_REQUEST['end_time']."',
				'".$_REQUEST['job_note']."'
			)
		");
		
		return $this->db_sppd->insert_id();
	}	
	
	function insert_trans_air(){
		$result = $this->db_sppd->query("
			insert into sppd_t_fdpd_cost_trans_air(
				fdpd_id,
				cost_date,
				cost_breakdown,
				currency_id,
				amount,
				is_receipt,
				is_active,
				record_type,
				created_by,
				created_date
			) 
			values (
				'".$_REQUEST['fdpd_id']."',
				'".$_REQUEST['cost_date']."',
				'".$_REQUEST['cost_breakdown']."',
				'".$_REQUEST['currency_id']."',
				'".$_REQUEST['amount']."',
				'".$_REQUEST['is_receipt']."',
				1,
				'O',
				'".$_REQUEST['user']."',
				getdate()
			)
		");
		
		return $this->db_sppd->insert_id();
	}
	
	function insert_trans_other(){
		$result = $this->db_sppd->query("
			insert into sppd_t_fdpd_cost_trans_other(
				fdpd_id,
				cost_date,
				cost_breakdown,
				currency_id,
				amount,
				is_receipt,
				is_active,
				record_type,
				created_by,
				created_date
			) 
			values (
				'".$_REQUEST['fdpd_id']."',
				'".$_REQUEST['cost_date']."',
				'".$_REQUEST['cost_breakdown']."',
				'".$_REQUEST['currency_id']."',
				'".$_REQUEST['amount']."',
				'".$_REQUEST['is_receipt']."',
				1,
				'O',
				'".$_REQUEST['user']."',
				getdate()
			)
		");
		
		return $this->db_sppd->insert_id();
	}
		
	function insert_akomodasi(){
		$result = $this->db_sppd->query("
			insert into sppd_t_fdpd_cost_accom(
				fdpd_id,
				cost_date,
				cost_breakdown,
				currency_id,
				amount,
				is_receipt,
				is_active,
				record_type,
				created_by,
				created_date
			) 
			values (
				'".$_REQUEST['fdpd_id']."',
				'".$_REQUEST['cost_date']."',
				'".$_REQUEST['cost_breakdown']."',
				'".$_REQUEST['currency_id']."',
				'".$_REQUEST['amount']."',
				'".$_REQUEST['is_receipt']."',
				1,
				'O',
				'".$_REQUEST['user']."',
				getdate()
			)
		");
		
		return $this->db_sppd->insert_id();
	}	
	
	function insert_cost_other(){
		$result = $this->db_sppd->query("
				insert into sppd_t_fdpd_cost_other(
					fdpd_id,
					cost_date,
					cost_breakdown,
					currency_id,
					amount,
					is_receipt,
					is_active,
					record_type,
					created_by,
					created_date
				) 
				values (
					'".$_REQUEST['fdpd_id']."',
					'".$_REQUEST['cost_date']."',
					'".$_REQUEST['cost_breakdown']."',
					'".$_REQUEST['currency_id']."',
					'".$_REQUEST['amount']."',
					'".$_REQUEST['is_receipt']."',
					1,
					'O',
					'".$_REQUEST['user']."',
					getdate()
				)
		");
		
		return $this->db_sppd->affected_rows();
	}
	
	
	function insert_fdpd_dest(){		
		$result = $this->db_sppd->query("
			insert into sppd_t_fdpd_dest(
				  fdpd_id,
				  destination_id,
				  departure_date,
				  arrival_date,
				  eff_date_tot,
				  eff_date_note
			)values(
				  '".$_REQUEST['fdpd_id']."',
				  '".$_REQUEST['destination_id']."',
				  '".$_REQUEST['departure_date']."',
				  '".$_REQUEST['arrival_date']."',
				  '".$_REQUEST['eff_date_tot']."',
				  '".$_REQUEST['eff_date_note']."'
			)
		");
		
		#echo $this->db_sppd->last_query();
		return $this->db_sppd->insert_id();
	}
	
	
	function insert_fdpd_dest_date($param){
		$result = $this->db_sppd->query("
			insert into sppd_t_fdpd_dest_date(
			  fdpd_dest_id,
			  effective_date,
			  is_active,
			  record_type,
			  created_by,
			  created_date
			) 
			select
				'".$param['fdpd_dest_id']."',
				a.Data,
				1,
				'".$param['record_type']."',
				'".$param['created_by']."',
				getdate()
			from dbo.[Split]('".$param['effective_date']."', ',') a
		");
		
		return $this->db_sppd->affected_rows();
	}
	
	function insert_cost_paid(){
		$result = $this->db_sppd->query("
			insert into dbo.sppd_t_fdpd_cost_paid(
				fdpd_id,
				currency_id,
				total
			) 
			select 
				".$_REQUEST['fdpd_id'].",
				a.currency_id,
				a.total
			from sppd_t_fppd_total_fix a
			where a.fppd_id='".$_REQUEST['fppd_id']."'
		");
		
		return $this->db_sppd->affected_rows();
	}
	
	function listActionButton(){
		$result = $this->db_sppd->query("
			select 
				allow_edit,
				allow_print
			from fn_sppd_cekFdpdListAction('".$_REQUEST['user']."', '".$_REQUEST['fppd_id']."')
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return[]=array(
							'allow_edit'=>$value['allow_edit'],
							'allow_print'=>$value['allow_print']
						);
		}
		return $return[0];
	}
	
	function insert_fdpd_link(){
		$result = $this->db_sppd->query("
			insert into dbo.sppd_t_fdpd_doc(
				  fdpd_id,
				  doc_description,
				  doc_address,
				  is_active,
				  created_by,
				  created_date
			) 
			values (
				  '".$_REQUEST['fdpd_id']."',
				  '".$_REQUEST['doc_description']."',
				  '".$_REQUEST['doc_address']."',
				  '1',
				  '".$_REQUEST['user']."',
				  getdate()
			)
		");

		return $this->db_sppd->affected_rows();
	}
	
	function print_fdpd(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fdpdPrint '".$_REQUEST['user']."','".$_REQUEST['fdpd_id']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
		
}