<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class master_model extends CI_Model{
    public function master_model()
    {
        parent::__construct();
        //Codeigniter : Write Less Do More
        $this -> db_hris = $this -> load -> database('hris', true);
    }
    function get_data_dept(){
        if ($_REQUEST['sSearch']!=''){
			$where ="    where DIRECTORATE like '%".$_REQUEST['sSearch']."%' 
                            OR DIVISION like '%".$_REQUEST['sSearch']."%' 
                            or DEPARTMENT like '%".$_REQUEST['sSearch']."%' 
                            or SECTION like '%".$_REQUEST['sSearch']."%' 
                            or a.CREATED_BY like '%".$_REQUEST['sSearch']."%' 
                            or a.MODIFIED_BY like '%".$_REQUEST['sSearch']."%' ";
		}
        $query = "  SELECT ROW_NUMBER() over(order by DIRECTORATE,DIVISION,DEPARTMENT,SECTION asc) as ROW_NUM
                        ,DEPT_ID,[LEVEL], DIRECTORATE,DIVISION,DEPARTMENT,SECTION
                        ,a.IS_ACTIVE
                        ,'CREATED BY :'+b.FULLNAME CREATED_BY
                    	,'('+CONVERT(VARCHAR(17),a.CREATED_DATE,113)+')'CREATED_DATE
                    	,CASE WHEN A.IS_ACTIVE = 1 THEN 'ACTIVE' WHEN A.IS_ACTIVE=0 THEN 'INACTIVE' END IS_ACTIVE_DESC
                        ,'('+CONVERT(VARCHAR(17),a.MODIFIED_DATE,113)+')'MODIFIED_DATE
                        ,'MODIFIED BY :'+C.FULLNAME MODIFIED_BY
                    FROM BASE_M_DEPT A 
                        LEFT JOIN S_USER B on A.CREATED_BY  =B.user_id
                        LEFT JOIN S_USER C ON A.MODIFIED_BY =C.USER_ID
                    $where
                    ORDER BY DIRECTORATE, DIVISION, DEPARTMENT,SECTION asc 
					OFFSET ".$_REQUEST['iDisplayStart']." rows fetch next ".$_REQUEST['iDisplayLength']." rows only";
        $result=$this->db_hris->query($query);
		$index = 0 ;
		$data = array();
        foreach($result->result_array() as $key => $value){
            $data[] = array(
                            $value['DEPT_ID'], //0
                            $value['LEVEL'], //1
                            $value['DIRECTORATE'],//2
                            $value['DIVISION'],//3 
                            $value['DEPARTMENT'],//4
                            $value['SECTION'],//5
                            $value['IS_ACTIVE'],//6
                            $value['ROW_NUM'],//7
                            $value['CREATED_DATE'],//8
                            $value['CREATED_BY'],//9
                            $value['IS_ACTIVE_DESC'],//10
                            $value['MODIFIED_DATE'],//11
                            $value['MODIFIED_BY']//12
                    );
        }
        return $data;
    }
    function get_data_dept_total(){
        if ($_REQUEST['sSearch']!=''){
			$where ="    where DIRECTORATE like '%".$_REQUEST['sSearch']."%' 
                            OR DIVISION like '%".$_REQUEST['sSearch']."%' 
                            or DEPARTMENT like '%".$_REQUEST['sSearch']."%' 
                            or SECTION like '%".$_REQUEST['sSearch']."%' 
                            or CREATED_BY like '%".$_REQUEST['sSearch']."%' 
                            or MODIFIED_BY like '%".$_REQUEST['sSearch']."%' ";
		}
        $query = "  SELECT COUNT(*) total
					FROM BASE_M_DEPT 
					$where
				";
        $result=$this->db_hris->query($query);
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
    }
    function insert_dept(){
        $query  ="INSERT INTO [dbo].[BASE_M_DEPT]
           ([LEVEL]
           ,[DIRECTORATE]
           ,[DIVISION]
           ,[DEPARTMENT]
           ,[SECTION]
           ,[IS_ACTIVE]
           ,[CREATED_BY]
           ,[CREATED_DATE])
            VALUES
           ('".$_REQUEST['level']."'
           ,'".$_REQUEST['directorate']."'
           ,'".$_REQUEST['division']."'
           ,'".$_REQUEST['department']."'
           ,'".$_REQUEST['section']."'
           ,1
           ,'".$_REQUEST['user']."'
           ,GETDATE())";
        $result = $this->db_hris->query($query);		
		return $result;
    }
    function update_dept(){
        $query="    UPDATE [dbo].[BASE_M_DEPT]
                    SET [LEVEL]     = '".$_REQUEST['level']."'
                      ,[DIRECTORATE]= '".$_REQUEST['directorate']."'
                      ,[DIVISION]   = '".$_REQUEST['division']."'
                      ,[DEPARTMENT] = '".$_REQUEST['department']."'
                      ,[SECTION]    = '".$_REQUEST['section']."'
                      ,[IS_ACTIVE]  = '".$_REQUEST['is_active']."'
                      ,[MODIFIED_BY]= '".$_REQUEST['user']."'
                      ,[MODIFIED_DATE]  = GETDATE()
                 WHERE DEPT_ID = '".$_REQUEST['idEdit']."' ";
        $result = $this->db_hris->query($query);		
		return $result;
    }
    function check_dept(){
        $query  ="  select COUNT(*) total
                    from dbo.BASE_M_DEPT A
                    WHERE A.DIRECTORATE ='".$_REQUEST['directorate']."' 
                        AND DIVISION    ='".$_REQUEST['division']."' 
                        AND DEPARTMENT  ='".$_REQUEST['department']."' 
                        AND SECTION     ='".$_REQUEST['section']."'
                        AND [LEVEL]     ='".$_REQUEST['level']."'";
        $result=$this->db_hris->query($query);
		foreach($result->result_array() as $key => $value){
			$total = $value['total'];
		}
		return $total;
    }
}