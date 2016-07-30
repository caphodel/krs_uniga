<?php

class sppd_fdpd_list_detail_model extends CI_Model {
						
	function sppd_fdpd_list_detail_model(){
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
					g.banknumber
				from sppd_t_fdpd_main a
				inner join base_m_employee b on b.employee_id=a.employee_id
				inner join base_m_job_position c on c.job_position_id=a.job_position_id
				inner join base_m_job_level d on d.job_level_id=a.job_level_id
				inner join base_m_dept e on e.dept_id=a.dept_id
				inner join base_m_location_work f on f.location_work_id=a.location_work_id
				inner join base_m_emp_biodata g on g.employee_id=a.employee_id
				inner join sppd_t_fdpd h on h.fdpd_main_id=a.fdpd_main_id
				where h.fdpd_id='".$_REQUEST['fdpd_id']."'
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
							$param['fppd_no'],
							$param['fdpd_no']
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
					a.amount
				from sppd_t_fdpd_cost_other a
				inner join m_currency b on b.currency_id=a.currency_id
				where a.fdpd_id='".$_REQUEST['fdpd_id']."' and a.is_active=1
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
									$value['cost_breakdown'],
									$value['currency_id'],
									$value['curr_symbol'],
									$value['amount']
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
					convert(varchar(10), a.arrival_date, 120) arrival_date,
					stuff((
							select 
								','+convert(varchar(10), e.effective_date, 120)
							from sppd_t_fdpd_dest_date e
							where e.is_active=1 and e.fdpd_dest_id in (
								select 
									fdpd_dest_id 
								from sppd_t_fdpd_dest 
								where fdpd_id=a.fdpd_id and fdpd_dest_id=a.fdpd_dest_id
							)
						for xml path(''),type).value('.[1]','varchar(max)'),1,1,''
					) eff_date,
					a.eff_date_tot,
					a.eff_date_note,
					d.category_dest_id
				from sppd_t_fdpd_dest a
				inner join sppd_m_destination b on b.destination_id=a.destination_id
				inner join SPPD_M_DEST_LOC_CAT c on c.DESTINATION_ID=b.DESTINATION_ID
				inner join sppd_m_category_dest d on d.CATEGORY_DEST_ID=c.CATEGORY_DEST_ID
				where a.fdpd_id='".$_REQUEST['fdpd_id']."'
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
				from sppd_t_fdpd a 
				where a.fdpd_id='".$_REQUEST['fdpd_id']."'
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
	
	function get_fdpd_total_fix(){
		$result = $this->db_sppd->query("
			select 
			  a.currency_id,
			  b.curr_symbol,
			  a.total
			from sppd_t_fdpd_total_fix a
			inner join m_currency b on b.currency_id=a.currency_id
			where a.fdpd_id='".$_REQUEST['fdpd_id']."'
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
	
	function get_fppd_total_fix(){
		$result = $this->db_sppd->query("
			select 
			  a.currency_id,
			  b.curr_symbol,
			  a.total
			from sppd_t_fppd_total_fix a
			inner join m_currency b on b.currency_id=a.currency_id
			where a.fppd_id in (
				select fppd_id from sppd_t_fdpd_main where fdpd_main_id in (
					select fdpd_main_id from sppd_t_fdpd 
					where fdpd_id='".$_REQUEST['fdpd_id']."'
				)
			)
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
	
	function get_data_rincian_pekerjaan(){
		$result = $this->db_sppd->query("
			select 
			  cast(job_date as date) job_date,
			  left(cast(start_time as time),5) start_time,
			  left(cast(end_time as time),5) end_time,
			  job_note
			from sppd_t_fdpd_job_detail 
			where fdpd_id='".$_REQUEST['fdpd_id']."'
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
									$value['job_date'],
									$value['start_time'],
									$value['end_time'],
									$value['job_note'],
							);
		}
		return $return;
	}
	
	function get_data_transportasi_udara(){
		$result = $this->db_sppd->query("
			select 
				cast(a.cost_date as date) cost_date,
				a.cost_breakdown,
				b.curr_symbol,
				a.amount,
				a.is_receipt,
				a.currency_id
			from dbo.sppd_t_fdpd_cost_trans_air a 
			inner join m_currency b on b.currency_id=a.currency_id
			where a.fdpd_id='".$_REQUEST['fdpd_id']."' and a.is_active=1
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
									$value['cost_date'],
									$value['cost_breakdown'],
									$value['curr_symbol'],
									$value['amount'],
									$value['is_receipt'],
									$value['currency_id']
							);
		}
		return $return;
	}
	
	function get_data_transportasi_lainnya(){
		$result = $this->db_sppd->query("
			select 
				cast(a.cost_date as date) cost_date,
				a.cost_breakdown,
				b.curr_symbol,
				a.amount,
				a.is_receipt,
				a.currency_id
			from dbo.sppd_t_fdpd_cost_trans_other a 
			inner join m_currency b on b.currency_id=a.currency_id
			where a.fdpd_id='".$_REQUEST['fdpd_id']."' and a.is_active=1
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
									$value['cost_date'],
									$value['cost_breakdown'],
									$value['curr_symbol'],
									$value['amount'],
									$value['is_receipt'],
									$value['currency_id']
							);
		}
		return $return;
	}
	
	function get_data_akomodasi(){
		$result = $this->db_sppd->query("
			select 
				cast(a.cost_date as date) cost_date,
				a.cost_breakdown,
				b.curr_symbol,
				a.amount,
				a.is_receipt,
				a.currency_id
			from dbo.sppd_t_fdpd_cost_accom a 
			inner join m_currency b on b.currency_id=a.currency_id
			where a.fdpd_id='".$_REQUEST['fdpd_id']."' and a.is_active=1
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
									$value['cost_date'],
									$value['cost_breakdown'],
									$value['curr_symbol'],
									$value['amount'],
									$value['is_receipt'],
									$value['currency_id']
							);
		}
		return $return;
	}
	
	function get_data_lain_lain(){
		$result = $this->db_sppd->query("
			select 
				cast(a.cost_date as date) cost_date,
				a.cost_breakdown,
				b.curr_symbol,
				a.amount,
				a.is_receipt,
				a.currency_id
			from dbo.sppd_t_fdpd_cost_other a 
			inner join m_currency b on b.currency_id=a.currency_id
			where a.fdpd_id='".$_REQUEST['fdpd_id']."' and a.is_active=1
		");
		
		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return['data'][]=array(
									$value['cost_date'],
									$value['cost_breakdown'],
									$value['curr_symbol'],
									$value['amount'],
									$value['is_receipt'],
									$value['currency_id']
							);
		}
		return $return;
	}
	
	function get_data_link(){
		$result = $this->db_sppd->query("
			select 
				a.doc_description,
				a.doc_address 
			from sppd_t_fdpd_doc a 
			where a.fdpd_id='".$_REQUEST['fdpd_id']."'
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
	
	function select_dest_cost(){
		$result = $this->db_sppd->query("
			select 
				b.cost_purpose_id,
				c.curr_symbol,
				b.amount,
				b.currency_id
			from sppd_t_fdpd_dest a 
			inner join sppd_t_fdpd_dest_cost_fix b on b.fdpd_dest_id=a.fdpd_dest_id
			inner join m_currency c on c.currency_id=b.currency_id
			where a.fdpd_id='".$_REQUEST['fdpd_id']."' and a.destination_id='".$_REQUEST['destination_id']."'
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