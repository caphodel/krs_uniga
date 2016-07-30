<?php

class sppd_fppd_model extends CI_Model {
						
	function sppd_fppd_model(){					
		parent::__construct();
		$this -> db_sppd = $this -> load -> database('hris', true);
	}
	
	function select_table($query=''){
		$result = $this->db_sppd->query($query);
		$result = $result->result_array();
		return $result;
	}
	
	function get_data_fppd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select 
				ROW_NUMBER() over(order by a.fppd_id desc) as row_num,
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
			from [dbo].[fn_sppd_getFppdList] ('".$_REQUEST['user']."', 'FPPD') a 
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
							$value['verifikasi'],
							$value['fppd_main_id']
					);
		}
		return $return;
	}

	function get_data_employee(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.nik like '%".$_REQUEST['sSearch']."%' or a.name like '%".$_REQUEST['sSearch']."%') ";
		}
		
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
			from fn_getDetailEmployeeBasedUser('".$_REQUEST['user']."') a
			cross apply fn_getPPCodeByDeptID(a.dept_id) b
			".$sSearch."
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
							$value['banknumber'],
							$value['pp_code_id'],
							$value['pp_code']
						);
		}
		return $return;
	}
	
	function generate_date_sppd(){
		$result = $this->db_sppd->query("
			select 
				a.date,
				DATENAME(weekday, a.Date) dayName
			from dbo.fn_get_range_date('".$_REQUEST['departure_date']."', '".$_REQUEST['arrival_date']."') a
		");
		
		$result = $result->result_array();
		$data = array();
		foreach($result as $key => $value){
						$hari='';
						if ($value['dayName']=='Monday')$hari='Senin';
						if ($value['dayName']=='Tuesday')$hari='Selasa';
						if ($value['dayName']=='Wednesday')$hari='Rabu';
						if ($value['dayName']=='Thursday')$hari='Kamis';
						if ($value['dayName']=='Friday')$hari='Jumat';
						if ($value['dayName']=='Saturday')$hari='Sabtu';
						if ($value['dayName']=='Sunday')$hari='Minggu';
						
			$data[] = array( 
							$value['date'], 
							$hari
						);
		}
		return $data;
	}
	
	function get_data_destination(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (city like '%".$_REQUEST['sSearch']."%' or province like '%".$_REQUEST['sSearch']."%' or category_dest like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
				select 
				  ROW_NUMBER() over(order by destination_id asc) as row_num,
				  destination_id,
				  city,
				  province,
				  category_dest,
				  employee_id,
				  category_dest_id
				from fn_getDestinationBasedEmployee('".$_REQUEST['employee_id']."')
				".$sSearch."
		");
		
		$result = $result -> result_array();
		$return['total']=sizeof($result);
		$result = array_slice($result, $_REQUEST['iDisplayStart'], $_REQUEST['iDisplayLength']);
		foreach($result as $key => $value){
			$return['data'][]=array(
								$value['row_num'],								
								$value['city'],								
								$value['province'],								
								$value['category_dest'],								
								$value['employee_id'],
								$value['destination_id'],
								$value['category_dest_id']
						);
		}
		return $return;
	}
	
	function select_dest_cost(){
		$result = $this->db_sppd->query("
			select 
				a.cost_purpose_id,
				a.curr_symbol,
				a.amount,
				a.currency_id			
			from fn_sppd_getCatDestCost('".$_REQUEST['category_dest_id']."', '".$_REQUEST['is_sf']."') a
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
								$value['cost_purpose_id'],
								$value['curr_symbol'],
								$value['amount'],
								$value['currency_id']
						);
		}
		return $return;
	}
	
	function get_data_currency(){
		$result = $this->db_sppd->query("
			select 
				a.currency_id,
				a.curr_symbol
			from m_currency a 
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
								$value['currency_id'],
								$value['curr_symbol']
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
	
	function insert_fppd_main($param){
		$result = $this->db_sppd->query("
				insert into dbo.sppd_t_fppd_main(
					fppd_no,
					employee_id,
					job_position_id,
					job_level_id,
					dept_id,
					location_work_id
				)
				values (
					'".$param['fppd_no']."',
					'".$param['employee_id']."',
					'".$param['job_position_id']."',
					'".$param['job_level_id']."',
					'".$param['dept_id']."',
					'".$param['location_work_id']."'
				)
		");
		
		return $this->db_sppd->insert_id();
	}	
	
	function insert_fppd(){
		$result = $this->db_sppd->query("
				insert into sppd_t_fppd(
					fppd_main_id,
					purpose,
					version,
					is_transport_air,
					is_transport_other,
					transport_note,
					is_accomodation,
					accomodation_note,
					is_money_dp,
					pp_code_id,
					fppd_note,
					created_by,
					created_date,
					is_active
				)values(
					'".$_REQUEST['fppd_main_id']."',
					'".$_REQUEST['purpose']."',
					1,
					'".$_REQUEST['is_transport_air']."',
					'".$_REQUEST['is_transport_other']."',
					'".$_REQUEST['transport_note']."',
					'".$_REQUEST['is_accomodation']."',
					'".$_REQUEST['accomodation_note']."',
					'".$_REQUEST['is_money_dp']."',
					'".$_REQUEST['pp_code_id']."',
					'".$_REQUEST['fppd_note']."',
					'".$_REQUEST['created_by']."',
					getdate(),
					1
				)
		");
		#echo $this->db_sppd->last_query();
		return $this->db_sppd->insert_id();
	}
	
	function insert_fppd_revisi(){
		$result = $this->db_sppd->query("
				update sppd_t_fppd 
					set is_active=0 
				where fppd_id='".$_REQUEST['fppd_id']."'
		
				insert into sppd_t_fppd(
					fppd_main_id,
					purpose,
					version,
					is_transport_air,
					is_transport_other,
					transport_note,
					is_accomodation,
					accomodation_note,
					is_money_dp,
					pp_code_id,
					fppd_note,
					created_by,
					created_date,
					is_active
				)values(
					'".$_REQUEST['fppd_main_id']."',
					'".$_REQUEST['purpose']."',
					(select max(version)+1 from sppd_t_fppd where fppd_main_id='".$_REQUEST['fppd_main_id']."'),
					'".$_REQUEST['is_transport_air']."',
					'".$_REQUEST['is_transport_other']."',
					'".$_REQUEST['transport_note']."',
					'".$_REQUEST['is_accomodation']."',
					'".$_REQUEST['accomodation_note']."',
					'".$_REQUEST['is_money_dp']."',
					'".$_REQUEST['pp_code_id']."',
					'".$_REQUEST['fppd_note']."',
					'".$_REQUEST['created_by']."',
					getdate(),
					1
				)
		");
		#echo $this->db_sppd->last_query();
		return $this->db_sppd->insert_id();
	}
	
	function insert_fppd_dest(){
		if (strlen($_REQUEST['departure_time'])==5){
			$departure_time = " '".$_REQUEST['departure_date']." ".$_REQUEST['departure_time']."' ";
		}else{
			$departure_time = "null";
		}
		
		if (strlen($_REQUEST['arrival_time'])==5){
			$arrival_time = " '".$_REQUEST['arrival_date']." ".$_REQUEST['arrival_time']."' ";
		}else{
			$arrival_time = "null";
		}
		
		$result = $this->db_sppd->query("
			insert into sppd_t_fppd_dest(
				  fppd_id,
				  destination_id,
				  departure_date,
				  departure_time,
				  arrival_date,
				  arrival_time,
				  eff_date_tot,
				  eff_date_note
			)values(
				  '".$_REQUEST['fppd_id']."',
				  '".$_REQUEST['destination_id']."',
				  '".$_REQUEST['departure_date']."',
				  ".$departure_time.",
				  '".$_REQUEST['arrival_date']."',
				  ".$arrival_time.",
				  '".$_REQUEST['eff_date_tot']."',
				  '".$_REQUEST['eff_date_note']."'
			)
		");
		
		#echo $this->db_sppd->last_query();
		return $this->db_sppd->insert_id();
	}
	
	function insert_fppd_dest_date($param){
		$result = $this->db_sppd->query("
			insert into sppd_t_fppd_dest_date(
			  fppd_dest_id,
			  effective_date,
			  is_active,
			  record_type,
			  created_by,
			  created_date
			) 
			select
				'".$param['fppd_dest_id']."',
				a.Data,
				1,
				'".$param['record_type']."',
				'".$param['created_by']."',
				getdate()
			from dbo.[Split]('".$param['effective_date']."', ',') a
		");
		
		#echo $this->db_sppd->last_query();
		return $this->db_sppd->affected_rows();
	}
	/*
	function insert_fppd_dest_cost(){
		$result = $this->db_sppd->query("
				insert into dbo.sppd_t_fppd_dest_cost(
					fppd_dest_id,
					money_purpose_id,
					currency_id,
					amount
				) 
				values(
					'".$_REQUEST['fppd_dest_id']."',
					'".$_REQUEST['money_purpose_id']."',
					'".$_REQUEST['currency_id']."',
					'".$_REQUEST['amount']."'
				)
		");

		return $this->db_sppd->affected_rows();
	}	
	*/
	function insert_fppd_cost_other(){
		$result = $this->db_sppd->query("
				insert into dbo.sppd_t_fppd_cost_other(
					fppd_id,
					cost_breakdown,
					currency_id,
					amount,
					is_active,
					record_type,
					created_by,
					created_date
				) 
				values (
					'".$_REQUEST['fppd_id']."',
					'".$_REQUEST['cost_breakdown']."',
					'".$_REQUEST['currency_id']."',
					'".$_REQUEST['amount']."',
					1,
					'".$_REQUEST['record_type']."',
					'".$_REQUEST['created_by']."',
					getdate()
				)
		");

		return $this->db_sppd->affected_rows();
	}
	
	function pembatalan_fppd(){
		$result = $this->db_sppd->query("
			insert into sppd_t_fppd_cancel (
				fppd_id,
				statusflag,
				created_by,
				created_date,
				cancel_note					
			)values(
				'".$_REQUEST['fppd_id']."',
				0,
				'".$_REQUEST['user']."',
				getdate(),
				'".$_REQUEST['cancel_note']."'
			)
			
			update sppd_t_fppd 
					set cancel=1 
			where fppd_id='".$_REQUEST['fppd_id']."'
		");

		return $this->db_sppd->affected_rows();
	}
	
	
	function select_data_perpanjangan(){
		$result = $this->db_sppd->query("
			select 
				convert(varchar(11), a.departure_date, 120) departure_date,
				left(cast(a.departure_time as time),5) departure_time,
				convert(varchar(11), a.arrival_date, 120) arrival_date,
				left(cast(a.arrival_time as time),5) arrival_time
			from sppd_t_fppd_dest a 
			where a.fppd_id='".$_REQUEST['fppd_id']."'
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['departure_date'],
							$value['departure_time'],
							$value['arrival_date'],
							$value['arrival_time']
						);
		}
		return $return;
	}
	
	function perpanjangan_fppd(){
		$result = $this->db_sppd->query("
			insert into sppd_t_fppd_extend (
				fppd_id,
				statusflag,
				created_by,
				created_date,
				extend_type,
				extend_arrival_date,
				extend_arrival_time,
				extend_note
			)values(
				'".$_REQUEST['fppd_id']."',
				0,
				'".$_REQUEST['user']."',
				getdate(),
				'".$_REQUEST['extend_type']."',
				'".$_REQUEST['extend_arrival_date']."',
				'".$_REQUEST['extend_arrival_date']." ".$_REQUEST['extend_arrival_time']."',
				'".$_REQUEST['extend_note']."'
			)
			
			update sppd_t_fppd 
					set extend=1 
			where fppd_id='".$_REQUEST['fppd_id']."'
		");

		return $this->db_sppd->affected_rows();
	}
	
	function listActionButton(){
		$result = $this->db_sppd->query("
			select 
				allow_edit,
				allow_revision,
				allow_cancel,
				allow_extend,
				allow_print,
				allow_fdpd
			from fn_sppd_cekFppdListAction('".$_REQUEST['user']."', '".$_REQUEST['fppd_id']."')
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){		
			$return[]=array(
							'allow_edit'=>$value['allow_edit'],
							'allow_revision'=>$value['allow_revision'],
							'allow_cancel'=>$value['allow_cancel'],
							'allow_extend'=>$value['allow_extend'],
							'allow_print'=>$value['allow_print'],
							'allow_print'=>$value['allow_print'],
							'allow_fdpd'=>$value['allow_fdpd']
						);
		}
		return $return[0];
	}
	
	function insert_fppd_link(){
		$result = $this->db_sppd->query("
			insert into dbo.sppd_t_fppd_doc(
				  fppd_id,
				  doc_description,
				  doc_address,
				  is_active,
				  created_by,
				  created_date
			) 
			values (
				  '".$_REQUEST['fppd_id']."',
				  '".$_REQUEST['doc_description']."',
				  '".$_REQUEST['doc_address']."',
				  '1',
				  '".$_REQUEST['user']."',
				  getdate()
			)
		");

		return $this->db_sppd->affected_rows();
	}
	
	function delete_detail(){
		$result = $this->db_sppd->query("
			delete from sppd_t_fppd_doc where fppd_id='".$_REQUEST['fppd_id']."'
			delete from sppd_t_fppd_total_fix where fppd_id='".$_REQUEST['fppd_id']."'
			delete from sppd_t_fppd_cost_other where fppd_id='".$_REQUEST['fppd_id']."'
			delete from sppd_t_fppd_dest_date where fppd_dest_id in (
				select fppd_dest_id from sppd_t_fppd_dest where fppd_id='".$_REQUEST['fppd_id']."'
			)
			delete from sppd_t_fppd_dest_cost_fix where fppd_dest_id in (
				select fppd_dest_id from sppd_t_fppd_dest where fppd_id='".$_REQUEST['fppd_id']."'
			)
			delete from sppd_t_fppd_dest where fppd_id='".$_REQUEST['fppd_id']."'
		
		");
		
		#echo $this->db_sppd->last_query();
		return $this->db_sppd->affected_rows();
	}
	
	function update_fppd(){
		$result = $this->db_sppd->query("				
				update sppd_t_fppd set 
					purpose='".$_REQUEST['purpose']."',
					is_transport_air='".$_REQUEST['is_transport_air']."',
					is_transport_other='".$_REQUEST['is_transport_other']."',
					transport_note='".$_REQUEST['transport_note']."',
					is_accomodation='".$_REQUEST['is_accomodation']."',
					accomodation_note='".$_REQUEST['accomodation_note']."',
					is_money_dp='".$_REQUEST['is_money_dp']."',
					pp_code_id='".$_REQUEST['pp_code_id']."',
					fppd_note='".$_REQUEST['fppd_note']."',
					modified_by='".$_REQUEST['modified_by']."',
					modified_date=getdate()
				where fppd_id='".$_REQUEST['fppd_id']."'
		");

		return $_REQUEST['fppd_id'];
	}
	
	function print_fppd(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdPrint '".$_REQUEST['user']."','".$_REQUEST['fppd_id']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
	
}