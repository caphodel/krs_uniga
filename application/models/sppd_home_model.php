<?php

class sppd_home_model extends CI_Model {

	function sppd_home_model(){		
		parent::__construct();
		$this -> db_sppd = $this -> load -> database('hris', true);
	}		
	
	function get_data_badge(){
		$result = $this->db_sppd->query("
			select (
				  select
					  count(*) 
				  from fn_sppd_getFppdListVal('".$_REQUEST['user']."')) tot_fppd,
				  (select 
					  count(*) 
				  from fn_sppd_getFppdListCancel('".$_REQUEST['user']."')) tot_fppd_batal,
				  (select 
					  count(*) 
				  from fn_sppd_getFppdListExtend('".$_REQUEST['user']."')) tot_extend_fppd,
				  (select 
					  count(*) 
				  from fn_sppd_getFppdListVerify('".$_REQUEST['user']."')) tot_ver_fppd,
				  (select 
					  count(*) 
				  from fn_sppd_getFppdListCancelConfirmPU('".$_REQUEST['user']."')) tot_fppd_batal_pu,
				  (select 
					  count(*) 
				  from fn_sppd_getFppdListCancelConfirmKEU('".$_REQUEST['user']."')) tot_fppd_batal_keu,
				  (select 
					  count(*) 
				  from fn_sppd_getFdpdListVal('".$_REQUEST['user']."')) tot_fdpd,
				  (select 
					  count(*) 
				  from fn_sppd_getFdpdListVerify('".$_REQUEST['user']."')) tot_ver_fdpd,
				  (select 
					  count(*) 
				  from fn_sppd_getFppdFdpdListIjin('".$_REQUEST['user']."')) tot_ijin,
				  (select 
					  count(*) 
				  from fn_sppd_getFppdFdpdListPayment('".$_REQUEST['user']."')) tot_pembayaran,
				  (select 
					  count(*) 
				  from fn_sppd_getFdpdListClose('".$_REQUEST['user']."')) tot_tutup
		");

		$result = $result -> result_array();
		foreach($result as $key => $value){
			$return[]=array(
							'tot_fppd'=>$value['tot_fppd'],
							'tot_fppd_batal'=>$value['tot_fppd_batal'],
							'tot_extend_fppd'=>$value['tot_extend_fppd'],
							'tot_ver_fppd'=>$value['tot_ver_fppd'],
							'tot_fppd_batal_pu'=>$value['tot_fppd_batal_pu'],
							'tot_fppd_batal_keu'=>$value['tot_fppd_batal_keu'],
							'tot_fdpd'=>$value['tot_fdpd'],
							'tot_ver_fdpd'=>$value['tot_ver_fdpd'],
							'tot_ijin'=>$value['tot_ijin'],
							'tot_pembayaran'=>$value['tot_pembayaran'],
							'tot_tutup'=>$value['tot_tutup']
					);
		}
		return $return;
	}	
	
	function get_data_validasi_fppd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
				select 
					ROW_NUMBER() over(order by a.fppd_id desc) as row_num,
					fppd_main_id,
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
					position
				from fn_sppd_getFppdListVal('".$_REQUEST['user']."') a
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
							$value['position'],
							$value['fppd_id']
					);
		}
		return $return;
	}	
	
	function validasi_fppd(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdValidasi '".$_REQUEST['user']."','".$_REQUEST['fppd_id']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
	
	
	function get_data_verifikasi_fppd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
				select 
					ROW_NUMBER() over(order by a.fppd_id desc) as row_num,
					fppd_main_id,
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
					extend,
					verifikasi
				from fn_sppd_getFppdListVerify('".$_REQUEST['user']."') a
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
							$value['extend'],
							$value['verifikasi'],
							$value['fppd_id']
					);
		}
		return $return;
	}
	
	function validasi_verifikasi_fppd(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdVerify '".$_REQUEST['user']."','".$_REQUEST['fppd_id']."','".$_REQUEST['processed_by']."','".$_REQUEST['verify_note']."'
		");
		
		#echo $this->db_sppd->last_query();
		$result = $result->result_array();
		return $result[0];
	}
	
	function update_info_verifikasi_fppd(){
		$result = $this->db_sppd->query("
			update sppd_t_fppd set 
					is_info_pu=1,
					info_pu='".$_REQUEST['info_pu']."',
					info_pu_by='".$_REQUEST['user']."',
					info_pu_date=getdate()
			where fppd_id='".$_REQUEST['fppd_id']."' and statusflag=6
		");
		
		return $this->db_sppd->affected_rows();
	}
	
	function insert_cost_other_fppd(){
		$result = $this->db_sppd->query("
				insert into dbo.sppd_t_fppd_cost_other(
					fppd_id,
					cost_breakdown,
					currency_id,
					amount,
					is_active,
					record_type,
					created_by,
					created_date,
					processed_by
				) 
				values (
					'".$_REQUEST['fppd_id']."',
					'".$_REQUEST['cost_breakdown']."',
					'".$_REQUEST['currency_id']."',
					'".$_REQUEST['amount']."',
					1,
					'".$_REQUEST['record_type']."',
					'".$_REQUEST['created_by']."',
					getdate(),
					'".$_REQUEST['processed_by']."'
				)
				
				update sppd_t_fppd_cost_other 
					set processed_by='".$_REQUEST['processed_by']."' 
				where fppd_id='".$_REQUEST['fppd_id']."' 
				and is_active=1
		");
		
		return $this->db_sppd->affected_rows();
	}
	
	function update_dest_date_fppd(){
		$result = $this->db_sppd->query("
			declare @fppd_dest_id int
			select top 1 @fppd_dest_id=fppd_dest_id from sppd_t_fppd_dest where fppd_id='".$_REQUEST['fppd_id']."' and destination_id='".$_REQUEST['destination_id']."'
			
			if (@fppd_dest_id is not null)
			begin
				insert into sppd_t_fppd_dest_date(
				  fppd_dest_id,
				  effective_date,
				  is_active,
				  record_type,
				  created_by,
				  created_date
				) 
				select
					@fppd_dest_id,
					a.Data,
					1,
					'".$_REQUEST['record_type']."',
					'".$_REQUEST['created_by']."',
					getdate()
				from dbo.[Split]('".$_REQUEST['eff_date']."', ',') a where cast(a.Data as date) not in (
					select cast(b.effective_date as date) from sppd_t_fppd_dest_date b where fppd_dest_id=@fppd_dest_id
				)
				
				update sppd_t_fppd_dest_date 
					set is_active=0
				where fppd_dest_id=@fppd_dest_id and cast(effective_date as date) not in (
					select
						cast(a.Data as date)
					from dbo.[Split]('".$_REQUEST['eff_date']."', ',') a
				)
				
			end			
		");
		
		return $this->db_sppd->affected_rows();
	}
	
	function update_dest_date_fppd_tot(){
		$result = $this->db_sppd->query("
			declare @fppd_dest_id int
			select top 1 @fppd_dest_id=fppd_dest_id from sppd_t_fppd_dest where fppd_id='".$_REQUEST['fppd_id']."' and destination_id='".$_REQUEST['destination_id']."'
			
			if (@fppd_dest_id is not null)
			begin
				update sppd_t_fppd_dest set 
					eff_date_tot=(select count(*) from sppd_t_fppd_dest_date where fppd_dest_id=@fppd_dest_id and is_active=1) 
				where fppd_dest_id=@fppd_dest_id
			end
		");
		
		return $this->db_sppd->affected_rows();
	}
	
	
	function get_data_validasi_fdpd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%' or a.fdpd_no like '%".$_REQUEST['sSearch']."%') ";
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
				from fn_sppd_getFdpdListVal('".$_REQUEST['user']."') a
				".$sSearch."
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
							$value['position'],
							$value['fdpd_id']
					);
		}
		return $return;
	}
	function validasi_fdpd(){					
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fdpdValidasi '".$_REQUEST['user']."','".$_REQUEST['fdpd_id']."'
		");
		
		#echo $this->db_sppd->last_query();
		$result = $result->result_array();
		return $result[0];
	}
	
	function get_data_verifikasi_fdpd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%'  or a.fdpd_no like '%".$_REQUEST['sSearch']."%') ";
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
					section
				from fn_sppd_getFdpdListVerify('".$_REQUEST['user']."') a
				".$sSearch."
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
	function validasi_verifikasi_fdpd(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fdpdVerify '".$_REQUEST['user']."','".$_REQUEST['fdpd_id']."','".$_REQUEST['verify_note']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
	function update_dest_date_fdpd(){
		$result = $this->db_sppd->query("
			declare @fdpd_dest_id int
			select top 1 @fdpd_dest_id=fdpd_dest_id from sppd_t_fdpd_dest where fdpd_id='".$_REQUEST['fdpd_id']."' and destination_id='".$_REQUEST['destination_id']."'
			
			if (@fdpd_dest_id is not null)
			begin
				insert into sppd_t_fdpd_dest_date(
				  fdpd_dest_id,
				  effective_date,
				  is_active,
				  record_type,
				  created_by,
				  created_date
				) 
				select
					@fdpd_dest_id,
					a.Data,
					1,
					'".$_REQUEST['record_type']."',
					'".$_REQUEST['created_by']."',
					getdate()
				from dbo.[Split]('".$_REQUEST['eff_date']."', ',') a where cast(a.Data as date) not in (
					select cast(b.effective_date as date) from sppd_t_fdpd_dest_date b where fdpd_dest_id=@fdpd_dest_id
				)
				
				update sppd_t_fdpd_dest_date 
					set is_active=0
				where fdpd_dest_id=@fdpd_dest_id and cast(effective_date as date) not in (
					select
						cast(a.Data as date)
					from dbo.[Split]('".$_REQUEST['eff_date']."', ',') a
				)
				
			end
		");
		
		return $this->db_sppd->affected_rows();
	}

	function update_dest_date_fdpd_tot(){
		$result = $this->db_sppd->query("
			declare @fdpd_dest_id int
			select top 1 @fdpd_dest_id=fdpd_dest_id from sppd_t_fdpd_dest where fdpd_id='".$_REQUEST['fdpd_id']."' and destination_id='".$_REQUEST['destination_id']."'
			
			if (@fdpd_dest_id is not null)
			begin
				update sppd_t_fdpd_dest set 
					eff_date_tot=(select count(*) from sppd_t_fdpd_dest_date where fdpd_dest_id=@fdpd_dest_id and is_active=1) 
				where fdpd_dest_id=@fdpd_dest_id
			end
		");
		
		return $this->db_sppd->affected_rows();
	}
	
	//Ijin
	function get_data_ijin_sppd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%'  or a.fdpd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select 
				ROW_NUMBER() over(order by fppd_id asc) as row_num,
				fppd_no, 
				fppd_id, 
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
				[version],
				[version_name],
				cancel,
				extend
			from fn_sppd_getFppdFdpdListIjin('".$_REQUEST['user']."') a
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
						$value['fdpd_no'],
						$value['name'],
						$value['nik'],
						$value['directorate'],
						$value['division'],
						$value['department'],
						$value['section'],
						$value['version_name'],
						$value['cancel'],
						$value['extend'],
						$value['fppd_id'],
						$value['fdpd_id']
				);
		}
		return $return;
	}
	function validasi_ijin_fdpd_fppd(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdfdpdIjinConfirm '".$_REQUEST['inpUSER_ID']."','".$_REQUEST['inpFORM']."','".$_REQUEST['inpFORM_ID']."','".$_REQUEST['inpCANCEL']."','".$_REQUEST['inpEXTEND']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
	
	//Tutup FDPD
	function get_data_tutup_fdpd(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%' or a.fdpd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select 
				ROW_NUMBER() over(order by fdpd_id desc) as row_num,
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
				is_info_keu
			from fn_sppd_getFdpdListClose('".$_REQUEST['user']."') a
			".$sSearch."
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
		$result = array_slice($result, $_REQUEST['iDisplayStart'], $_REQUEST['iDisplayLength']);
		foreach($result as $key => $value){
			$return['data'][]=array(
						$value['fdpd_main_id'],
						$value['row_num'],
						$value['fppd_no'],
						$value['fdpd_no'],
						$value['name'],
						$value['nik'],
						$value['directorate'],
						$value['division'],
						$value['department'],
						$value['section'],
						$value['is_info_keu'],
						$value['fdpd_id']
				);
		}
		return $return;
	}
	function validasi_tutup_fdpd(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fdpdClose '".$_REQUEST['user']."','".$_REQUEST['fdpd_id']."'
		");
		
		#echo $this->db_sppd->last_query();
		$result = $result->result_array();
		return $result[0];
	}
	
	//FPPD Batal
	function get_data_fppd_batal(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select 
				ROW_NUMBER() over(order by fppd_id asc) as row_num,
					fppd_main_id,
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
					position,
					cancel_note,
					verifikasi
			from fn_sppd_getFppdListCancel('".$_REQUEST['user']."') a
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
					$value['cancel_note'],
					$value['position'],
					$value['fppd_id'],
					$value['verifikasi']
				);
		}
		return $return;
	}
	function validasi_fppd_batal(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdValidasiCancel '".$_REQUEST['user']."','".$_REQUEST['fppd_id']."'
		");
		
		#echo $this->db_sppd->last_query();
		$result = $result->result_array();
		return $result[0];
	}
	
	//FPPD Batal PU
	function get_data_fppd_batal_pu(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select
				ROW_NUMBER() over(order by fppd_id asc) as row_num,
				fppd_main_id,
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
				cancel_note
			from fn_sppd_getFppdListCancelConfirmPU('".$_REQUEST['user']."') a
			".$sSearch."
		");

		$result = $result -> result_array();
		$return['total']=sizeof($result);
		$result = array_slice($result, $_REQUEST['iDisplayStart'], $_REQUEST['iDisplayLength']);
		foreach($result as $key => $value){
			$return['data'][]=array(
					$value['fppd_main_id'],
					$value['row_num'],
					$value['fppd_no'],
					$value['name'],
					$value['nik'],
					$value['directorate'],
					$value['division'],
					$value['department'],
					$value['section'],
					$value['version_name'],
					$value['cancel_note'],
					$value['fppd_id']
				);
		}
		return $return;
	}
	function validasi_fppd_batal_pu(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdConfirmPUCancel '".$_REQUEST['user']."', '".$_REQUEST['fppd_id']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
	
	//FPPD Batal KEUANGAN
	function get_data_fppd_batal_keu(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select
				ROW_NUMBER() over(order by fppd_id asc) as row_num,
				fppd_main_id,
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
				cancel_note
			from fn_sppd_getFppdListCancelConfirmKEU('".$_REQUEST['user']."') a
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
									$value['cancel_note'],
									$value['fppd_id']
							);
		}
		return $return;
	}
	function validasi_fppd_batal_keu(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdConfirmKEUCancel '".$_REQUEST['user']."', '".$_REQUEST['fppd_id']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
	
	//FPPD Pembayaran
	function get_data_pembayaran(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%' or a.fdpd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select
				ROW_NUMBER() over(order by fppd_id asc) as row_num,
				fppd_no, 
				fppd_id, 
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
				[version],
				[version_name]
			from fn_sppd_getFppdFdpdListPayment('".$_REQUEST['user']."') a
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
									$value['fdpd_no'],
									$value['name'],
									$value['nik'],
									$value['directorate'],
									$value['division'],
									$value['department'],
									$value['section'],
									$value['fppd_id'],
									$value['fdpd_id']
							);
		}
		return $return;
	}
	function proses_pembayaran(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdfdpdPayment '".$_REQUEST['inpUSER_ID']."', '".$_REQUEST['inpFORM']."', '".$_REQUEST['inpFORM_ID']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
	
	//FPPD Perpanjangan
	function get_data_perpanjangan(){
		if ($_REQUEST['sSearch']!=''){
			$sSearch = " where (a.name like '%".$_REQUEST['sSearch']."%' or a.nik like '%".$_REQUEST['sSearch']."%' or a.fppd_no like '%".$_REQUEST['sSearch']."%') ";
		}
		
		$result = $this->db_sppd->query("
			select 
				ROW_NUMBER() over(order by fppd_id desc) as row_num,
				fppd_main_id,
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
				position,
				extend,
				periode,
				extend_arrival_date
			from fn_sppd_getFppdListExtend('".$_REQUEST['user']."') a
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
									$value['extend'],
									$value['periode'],
									$value['extend_arrival_date'],
									$value['position'],
									$value['fppd_id']
							);
		}
		return $return;
	}
	function validasi_perpanjangan(){
		$result = $this->db_sppd->query("
			exec dbo.sp_sppd_fppdValidasiExtend '".$_REQUEST['user']."', '".$_REQUEST['fppd_id']."'
		");
		
		$result = $result->result_array();
		return $result[0];
	}
	
}