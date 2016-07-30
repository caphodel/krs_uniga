<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class master extends CI_Controller{
    public function master()
    {
        parent::__construct();
        //Codeigniter : Write Less Do More
        $this->load->model(array('master_model'));
    }
    function department(){
        $this->load->view('sppd/settings/master_department.php');
    }
    function get_data_dept(){
        $data   = $this->master_model->get_data_dept();
        $total  = $this->master_model->get_data_dept_total();
        echo json_encode(array('sEcho'=>$_REQUEST['sEcho'], 'aaData'=>$data, 'iTotalRecords'=>$total, 'iTotalDisplayRecords'=>$_REQUEST['iDisplayLength']));
    }
    function insert_dept(){
        if($_REQUEST['idEdit']==""){
            $id = $this->master_model->insert_dept();
    		echo json_encode(array(
    			'status' => $id,
    			'id' => $id,
    			'message' => $id == 1 ? 'insert success' : $id== 2 ? 'Insert Success!' : 'Insert fail'
    	   ));
        }else{
            $id = $this->master_model->update_dept();
    		echo json_encode(array(
    			'status' => $id,
    			'id' => $id,
    			'message' => $id == 1 ? 'insert success' : $id== 2 ? 'Update Success!' : 'Insert fail'
    	   ));
        }
    }
    function check_dept(){
        $data   = $this->master_model->check_dept();
        echo json_encode(array('jumlah'=>$data));
    }
}