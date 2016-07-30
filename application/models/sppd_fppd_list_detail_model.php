<?php

class sppd_fppd_list_detail_model extends CI_Model {

	function sppd_fppd_list_detail_model(){					
		parent::__construct();
		$this -> db_sppd = $this -> load -> database('hris', true);
	}
	
	function select_table($query=''){
		$result = $this->db_sppd->query($query);
		$result = $result->result_array();
		return $result;
	}	
	
	function get_data_employee_detail($param){
		$result = $this->db_sppd->query("
				select 
					ROW_NUMBER() over(order by b.nik asc) as row_num,
					b.name,
					b.nik,
					e.directorate,
					e.division,
					e.department,
					e.section,
					f.location_work,
					c.job_position,
					d.job_level,
					a.employee_id,
					d.is_sf,
					g.address,
					g.phonenumber,
					g.banknumber,
					h.pp_code_id,
					i.pp_code
				from sppd_t_fppd_main a
				inner join base_m_employee b on b.employee_id=a.employee_id
				inner join base_m_job_position c on c.job_position_id=a.job_position_id
				inner join base_m_job_level d on d.job_level_id=a.job_level_id
				inner join base_m_dept e on e.dept_id=a.dept_id
				inner join base_m_location_work f on f.location_work_id=a.location_work_id
				inner join base_m_emp_biodata g on g.employee_id=a.employee_id
				inner join sppd_t_fppd h on h.fppd_main_id=a.fppd_main_id
				inner join base_m_pp_code i on i.pp_code_id=h.pp_code_id
				where h.fppd_id='".$_REQUEST['fppd_id']."'
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
	
	
	function get_data_other(){
		$result = $this->db_sppd->query("
				select 
					a.cost_breakdown,
					a.currency_id,
					b.curr_symbol,
					a.amount,
					a.processed_by
				from sppd_t_fppd_cost_other a
				inner join m_currency b on b.currency_id=a.currency_id
				where a.fppd_id='".$_REQUEST['fppd_id']."' and a.is_active=1
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
									$value['cost_breakdown'],
									$value['currency_id'],
									$value['curr_symbol'],
									$value['amount'],
									$value['processed_by']
							);
		}
		return $return;
	}
	
	function get_data_destination_detail(){
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
				inner join sppd_m_dest_loc_cat c on c.destination_id=b.destination_id
				inner join sppd_m_category_dest d on d.category_dest_id=c.category_dest_id
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
	
	function get_data_transport_detail(){
		$result = $this->db_sppd->query("
				select
					a.is_transport_air,
					a.is_transport_other,
					a.transport_note,
					a.is_accomodation,
					a.accomodation_note,
					a.is_money_dp,
					a.fppd_note
				from sppd_t_fppd a 
				where a.fppd_id='".$_REQUEST['fppd_id']."' 
				and a.is_active=1
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['is_transport_air'],
							$value['is_transport_other'],
							$value['transport_note'],
							$value['is_accomodation'],
							$value['accomodation_note'],
							$value['is_money_dp'],
							$value['fppd_note']
						);
		}
		return $return;
	}

	function get_data_pembatalan(){
		$result = $this->db_sppd->query("
			select 
				cancel_note
			from sppd_t_fppd_cancel 
			where fppd_id='".$_REQUEST['fppd_id']."'
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['cancel_note']
						);
		}
		return $return;
	}	

	function get_data_perpanjangan(){
		$result = $this->db_sppd->query("
			select
				case when (a.extend_type=1) then ('PERPANJANGAN')
					 when (a.extend_type=2) then ('PERCEPATAN')
					 else '' end as extend_type,
				convert(varchar(16), a.extend_arrival_time, 121) extend_arrival_time
			from sppd_t_fppd_extend a
			where a.fppd_id='".$_REQUEST['fppd_id']."'
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
		foreach($result as $key => $value){
			$return['data'][]=array(
							$value['extend_type']." SAMPAI ".$value['extend_arrival_time']
						);
		}
		return $return;
	}
	

	function get_data_link(){
		$result = $this->db_sppd->query("
			select 
				a.doc_description,
				a.doc_address 
			from sppd_t_fppd_doc a 
			where a.fppd_id='".$_REQUEST['fppd_id']."'
		");

		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
										$value['doc_description'], 
										'<a href="'.$value['doc_address'].'" target="_blank">'.$value['doc_address'].'</a>' 
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
	
	function select_dest_cost(){
		$result = $this->db_sppd->query("
			select 
				b.cost_purpose_id,
				c.curr_symbol,
				b.amount,
				b.currency_id
			from sppd_t_fppd_dest a 
			inner join sppd_t_fppd_dest_cost_fix b on b.fppd_dest_id=a.fppd_dest_id
			inner join m_currency c on c.currency_id=b.currency_id
			where a.fppd_id='".$_REQUEST['fppd_id']."' and a.destination_id='".$_REQUEST['destination_id']."'
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

}