<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	function Home()
	{
		parent::__construct();
		$this->load->library('auth');
		$this->load->model(array('Home_model'));
	}
	function index($user='', $pass='')
	{
		$data = array();
		if($user==''){
	       $data['autoLogin'] = false;
           $data['username'] = '';
           $data['pass'] = '';
	   }
       else{
	       $data['autoLogin'] = true;
           $data['username'] = $user;
           $data['pass'] = $pass;
	   }

		$this->load->view('home/index', $data);
	}
	function moduleChooser(){
		$this->load->view('home/moduleChooser');
	}
    function viewLogin()
	{
		$this->load->view('home/login_form');
	}
    function manageUser()
	{
		$this->load->view('home/manageUser');
	}
    function getOnline()
    {
        $sql = "SELECT username,online,name FROM karyawan_new WHERE ONLINE!='0' ORDER BY USERNAME";
		$query = $this->db->query($sql);
        $q = array();
        $count=0;
        $string = "<div id='tabdiv'><table id='tablediv' width='100%'>";
        foreach ($query->result() as $row)
        {
            $user = $row->username;
            $name = $row->name;
            $string = $string."<tr><td><a href=\"javascript:void(0)\" onclick=\"javascript:chatWith('".$user."')\">".$name."</a></td></tr>";
        }
        $string = $string."</table></div>";
        echo $string;
    }
	function getValidasi()
	{
		$user = from_session('username');
		$pass = from_session('redPass');
		$valid = from_session('valid');
        $q = array();
		$validDB='';
		$sql = "SELECT online FROM karyawan_new WHERE username='".$user."' ORDER BY USERNAME";
		$query = $this->db->query($sql);
		foreach ($query->result() as $row)
        {
        	$validDB =$row->online;
		}
		if($valid!=$validDB)
		{
			//echo "tidak valid";
			$q['valid'] = 1;
			$q['onlineNew']= $valid;
			$q['onlineOld']= $validDB;
		}
        else if($valid=='' && $validDB=='')
		{
			//echo "tidak valid";
			$q['valid'] = 1;
			$q['onlineNew']= $valid;
			$q['onlineOld']= $validDB;
		}
		else
		{
			//echo "data valid";
			$q['valid'] = 0;
			$q['onlineNew']= $valid;
			$q['onlineOld']= $validDB;
		}
		 echo json_encode($q);
	}
    function getPdf(){
    	//require_once("dompdf_config.inc.php");

        $this->load->helper(array('dompdf', 'file'));
        $com = $this->fungsi->get_post(array('hidValContent'));
        $html = urldecode($com['hidValContent']);
        $html=str_replace('id="run"', 'id="run2"', $html);
        $html=str_replace('id="stop"', 'id="stop2"', $html);
        $html=str_replace('id="die"', 'id="die2"', $html);
        $html=str_replace('id="max"', 'id="max2"', $html);
        //$data['data'] = $com['valuex'];
		//$this->load->view('home/getPdf', $data);
        $html = '<html><head><title></title><link href="'.base_url().'asset/theme/style.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="'.base_url().'asset/css/style.css" type="text/css" /></head><body>'.$html.'</body></html>';
        /*$dompdf = new DOMPDF();
$dompdf->load_html($html);
$dompdf->set_paper('a4', 'landscape'); // change 'a4' to whatever you want
$dompdf->render();
file_put_contents($filename, $dompdf->output()); */
         $data = pdf_create($html, 'download', true);

    }
    function viewInfo()
	{
	    //$data['data'] = $this->trmodel->getNews();
        $data['comment'] = $this->trmodel->getComment();
		$this->load->view('home/info', $data);
	}
    function simpanComment()
	{
	   $com = $this->fungsi->get_post(array('comment','subject'));
	   $this->trmodel->simpanComment($com['comment'], $com['subject']);
       $this->viewInfo();
	    /*$data['data'] = $this->trmodel->getNews();
        $data['comment'] = $this->trmodel->getComment();
		$this->load->view('home/info', $data);*/
	}
    function simpanReply()
	{
	   $com = $this->fungsi->get_post(array('comment', 'idTanggapan'));
	   $this->trmodel->simpanReply($com['idTanggapan'], $com['comment']);
       $this->viewInfo();
	    /*$data['data'] = $this->trmodel->getNews();
        $data['comment'] = $this->trmodel->getComment();
		$this->load->view('home/info', $data);*/
	}
    function viewInfoAccount()
	{
	    $data['direktorat'] = $this->trmodel->getDirektorat();
		$this->load->view('home/accountInfo', $data);
	}
    function changePass()
	{
	   $data_post = $this->fungsi->get_post(array('txtName','newPasswd','Passwd'));
       if($data_post['Passwd']!=$data_post['newPasswd']){
            echo '<script> alert("Password tidak sama"); </script>';
       }
       else{
            $this->trmodel->updatePass($data_post['txtName'],$data_post['Passwd']);
       }
	   $this->viewInfoAccount();
	}
    function changePass1($data_posttxtName,$data_postPasswd)
	{
	   //$data_post = $this->fungsi->get_post(array('txtName','newPasswd','Passwd'));
       //if($data_post['Passwd']!=$data_post['newPasswd']){
            //echo '<script> alert("Password tidak sama"); </script>';
       //}
       //else{
            $this->trmodel->updatePass1($data_posttxtName,$data_postPasswd);
       //}
	  // $this->viewInfoAccount();
	}
    function autoLogin($user, $pass)
	{
	   $data = array();
		if($user==''){
	       $data['autoLogin'] = false;
           $data['username'] = '';
           $data['pass'] = '';
	   }
       else{
	       $data['autoLogin'] = true;
           $data['username'] = $user;
           $data['pass'] = $pass;
	   }

		$this->load->view('home/index', $data);
        //echo '<script type="text/javascript">location = "'.base_url().'";</script>';
        //redirect(base_url(), 'refresh');
	}
	function do_login($user, $pass)
	{
		/*$this->auth->restrict(true);
		$this->load->library('form_validation');
		$this->form_validation->set_rules('username', 'Username', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'trim|required');*/
		//$this->form_validation->set_rules('captcha', 'Captcha', 'trim|required|callback_valid_captcha');
		//$this->form_validation->set_message('valid_captcha','%s tidak sama');
		/*if ($this->form_validation->run() == FALSE)
		{
			$this->index();
		}
		else
		{*/
			$this->load->library('auth');
			$login = array('username'=>$user,
				       'password'=>$pass
			);
			$return = $this->auth->do_login($login);
            $q = array();
            $d = $this->fungsi->cek123('addProject',true);
			if($return==1 || $return==2)
			{
			     //$goTo = site_url().'/home';
                 //header('Location: '.base_url());
                // echo "<script type='text/javascript'> location = '".base_url()."'; </script>";
                //echo $this->fungsi->warningHome('Selamat datang, '.from_session('nama'));
                //redirect(base_url(), 'refresh');
                //echo '<script>load("test/menuAtas","#topmenu");load("test/menuTengah","#tabs");load("test/content","#content");</script>';
                //$this->load->view('home/index');
                $q[0]['success'] = 1;
                $q[0]['message'] = "Success";
                $q[0]['addProject'] = $d;
				if(isset($_REQUEST['callback'])){
					echo $_REQUEST['callback'].'('.json_encode($q).')';
				}
				else{
                	echo json_encode($q);
				}
                //redirect(base_url(), 'refresh');
			}
			else if($return==3)
			{
			    $q[0]['success'] = 3;
                $q[0]['message'] = "Error";
                $q[0]['addProject'] = $d;
				if(isset($_REQUEST['callback'])){
					echo $_REQUEST['callback'].'('.json_encode($q).')';
				}
				else{
					echo json_encode($q);
				}
			     //redirect(base_url(), 'refresh');
				//echo $this->fungsi->warningHome('Maaf, username atau password yang Anda masukkan salah...');
			}
            else if($return==2)
            {
                $q[0]['success'] = 2;
                $q[0]['message'] = "Already Login";
                $q[0]['addProject'] = $d;
				if(isset($_REQUEST['callback'])){
					echo $_REQUEST['callback'].'('.json_encode($q).')';
				}
				else{
					echo json_encode($q);
				}
            }
		//}
	}
	function interupt()
	{
		$q = array();
        if($this->auth->interupt())
            $q['success'] = 1;
        else
            $q['success'] = 0;
        echo json_encode($q);
	}
	function logout()
	{
	   $q = array();
        if($this->auth->logout())
            $q['success'] = 1;
        else
            $q['success'] = 0;
        echo json_encode($q);
	}
	function front()
	{
		if(!is_logged_in())
		{
			$this->load->view('home/login_form');
		}
		else
		{
			$this->load->view('home/testaja');
		}
	}
	function about()
	{
		$this->load->view('home/about');
	}
    function deleteUser(){
        $id = $this->input->post('where');
        $state = $this->trmodel->deleteUser($id);
        echo $state;
    }
    function listUser($page = 1){
        $msg = '';
        $cur_page = $page;
        $page -= 1;
        $per_page = 10;
        $previous_btn = true;
        $next_btn = true;
        $first_btn = true;
        $last_btn = true;
        $start = $page * $per_page;
        $com = $this->fungsi->get_post(array('queryWhere'));
        $key = urldecode($com['queryWhere']);
        $stmnt = "SELECT * FROM (select *, ROW_NUMBER() OVER (ORDER BY username) as row from karyawan_new where username like '%".$key."%' or name like '%".$key."%' or type like '%".$key."%' or direktorat like '%".$key."%') a WHERE row > ".$start." and row <= ".($cur_page*$per_page);
		# echo $stmnt; exit;
        $stmntCount = "select count(*) as count from karyawan_new a where username like '%".$key."%' or name like '%".$key."%' or type like '%".$key."%' or direktorat like '%".$key."%'";
        $count = $this->trmodel->countUser($stmntCount);
        //echo $stmnt;
        $no_of_paginations = ceil($count / $per_page);

        /* ---------------Calculating the starting and endign values for the loop----------------------------------- */
        if ($cur_page >= 7) {
            $start_loop = $cur_page - 3;
            if ($no_of_paginations > $cur_page + 3)
                $end_loop = $cur_page + 3;
            else if ($cur_page <= $no_of_paginations && $cur_page > $no_of_paginations - 6) {
                $start_loop = $no_of_paginations - 6;
                $end_loop = $no_of_paginations;
            } else {
                $end_loop = $no_of_paginations;
            }
        } else {
            $start_loop = 1;
            if ($no_of_paginations > 7)
                $end_loop = 7;
            else
                $end_loop = $no_of_paginations;
        }
        /* ----------------------------------------------------------------------------------------------------------- */
        $msg .= "<div class='pagination'><ul>";

        // FOR ENABLING THE FIRST BUTTON
        if ($first_btn && $cur_page > 1) {
            $msg .= "<li p='1' class='active'>First</li>";
        } else if ($first_btn) {
            $msg .= "<li p='1' class='inactive'>First</li>";
        }

        // FOR ENABLING THE PREVIOUS BUTTON
        if ($previous_btn && $cur_page > 1) {
            $pre = $cur_page - 1;
            $msg .= "<li p='$pre' class='active'>Previous</li>";
        } else if ($previous_btn) {
            $msg .= "<li class='inactive'>Previous</li>";
        }
        for ($i = $start_loop; $i <= $end_loop; $i++) {

            if ($cur_page == $i)
                $msg .= "<li p='$i' style='color:#fff;background-color:#006699;' class='active'>{$i}</li>";
            else
                $msg .= "<li p='$i' class='active'>{$i}</li>";
        }

        // TO ENABLE THE NEXT BUTTON
        if ($next_btn && $cur_page < $no_of_paginations) {
            $nex = $cur_page + 1;
            $msg .= "<li p='$nex' class='active'>Next</li>";
        } else if ($next_btn) {
            $msg .= "<li class='inactive'>Next</li>";
        }

        // TO ENABLE THE END BUTTON`
        if ($last_btn && $cur_page < $no_of_paginations) {
            $msg .= "<li p='$no_of_paginations' class='active'>Last</li>";
        } else if ($last_btn) {
            $msg .= "<li p='$no_of_paginations' class='inactive'>Last</li>";
        }
        $goto = "<input type='text' class='goto' size='1' style='margin-top:-1px;margin-left:60px;'/><input type='button' id='go_btn' class='go_button' value='Go'/>";
        $total_string = "<span class='total' a='$no_of_paginations'>Page <b>" . $cur_page . "</b> of <b>$no_of_paginations</b></span>";
        $msg = $msg . "</ul>" . $goto . $total_string . "</div>";  // Content for pagination
        $q = $this->trmodel->listUser($stmnt);
        $x['pag'] = $msg;
        $x['datax'] = $q;
        header("Content-Type:application/json");
        echo json_encode($x);
    }
    function updateUser(){
        $com = $this->fungsi->get_post(array('txtUsername','txtName', 'txtPwd', 'cekRedmine', 'txtUsernameRedmine', 'txtPwdRedmine', 'optDir', 'optType'));
        $stringModul = '';
        $queryStmnt='';
		if(isset($_REQUEST['cekModul']))
			foreach ($this->input->post('cekModul') as $key => $value)
			{
				$stringModul = $stringModul.$value.'|';
			}


        if($com['txtPwd']!=''){
            $queryStmnt = "UPDATE karyawan_new SET password='".md5($com['txtUsername'].":automation:".$com['txtPwd'])."',name='".$com['txtName']."',direktorat='".$com['optDir']."',type='".$com['optType']."',modul='".$stringModul."' WHERE username='".$com['txtUsername']."'";
        }
        else{
            $queryStmnt = "UPDATE karyawan_new SET name='".$com['txtName']."',direktorat='".$com['optDir']."',type='".$com['optType']."',modul='".$stringModul."' WHERE username='".$com['txtUsername']."'";
        }
        $querySdm = "UPDATE [user] SET fullname='".$com['txtName']."' where [user]='".$com['txtUsername']."'";
        //echo $query;
        //echo $com['cekRedmine'];
        //echo $com['txtUsernameRedmine'];
        //echo var_dump($modul);
        $data['state'] = $this->trmodel->updateUser($queryStmnt,$querySdm);
        echo json_encode($data);
    }
    function addUser(){
        $com = $this->fungsi->get_post(array('txtUsername','txtName', 'txtPwd', 'cekRedmine', 'txtUsernameRedmine', 'txtPwdRedmine', 'optDir', 'optType'));
        //$modul = $this->input->post("cekModul");
        $stringModul = '';
        foreach ($this->input->post('cekModul') as $key => $value)
        {
            $stringModul = $stringModul.$value.'|';
        }

        $queryStmnt = "INSERT INTO karyawan_new (username,password,name,direktorat,type,modul";
        $queryValue = " VALUES ('".$com['txtUsername']."', '".md5($com['txtUsername'].":automation:".$com['txtPwd'])."', '".$com['txtName']."', '".$com['optDir']."', '".$com['optType']."', '".$stringModul."'" ;
        if($com['cekRedmine']==''){
            $queryStmnt = $queryStmnt.')';
            $queryValue = $queryValue.')';
        }
        else{
            $queryStmnt = $queryStmnt.',redusername,redpassword)';
            $queryValue = $queryValue.",'".$com['txtUsernameRedmine']."','".$com['txtPwdRedmine']."')";
        }
        $query = $queryStmnt.$queryValue;
        $querySdm = "INSERT INTO [user] ([user],fullname) VALUES('".$com['txtUsername']."','".$com['txtName']."')";
        //echo $query;
        //echo $com['cekRedmine'];
        //echo $com['txtUsernameRedmine'];
        //echo var_dump($modul);
        $data['state'] = $this->trmodel->addUser($query,$querySdm);
        echo json_encode($data);
    }
	function get_module(){
		echo json_encode($this->Home_model->get_module());
	}

	function get_disabled_element(){
		echo json_encode($this->Home_model->get_disabled_element());
	}
}

/* End of file home.php */
/* Location: ./system/application/controllers/home.php */
