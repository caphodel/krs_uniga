<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Auth {

	var $CI = null;

	function Auth()
	{
		$this->CI =& get_instance();
		$this->CI->load->database();
        session_start();
	}
	function do_login($login = NULL)
	{
            // A few safety checks
            // Our array has to be set
            $username = '';
            $namafull = '';
            $level = '';
            $module = '';
            $redUser = '';
            $redPass = '';
            $online='';
            $redYear = '';

	    	if(!isset($login))
                  return FALSE;

	    	//Our array has to have 2 values
	     	//No more, no less!
	    	if(count($login) != 2)
			return FALSE;

	     	$username = $login['username'];
	     	$password = $login['password'];
            $md5Pass = md5($username.'uniga'.$password);

		$this->CI->db->from('t_user');
		$this->CI->db->where('username', $username);
		$this->CI->db->where('password', $md5Pass);
        //$this->CI->db->where('online !=','1');
        $query = $this->CI->db->query($this->CI->db->get_compiled_select());
            /*foreach ($query->result() as $row)
        	{
                  var_dump($row);
            }
		$query = $this->CI->db->get();*/

            //var_dump($query->result());
            //var_dump(count($query->result_array()));
            //var_dump($query->num_rows());

	     	foreach ($query->result() as $row)
        	{
                  $username = $row->user_id;
                  $namafull = $row->fullname;
                  //$level = $row->type;
                  //$module = $row->modul;
                  //$redUser = $row->redusername;
                  //$redPass = $row->redpassword;
                  //$online = $row->online;
                  /*if($row->redyear=='' || $row->redyear==' ')
                        $redYear = '';
                  else
                        $redYear = $row->redyear;*/
        	}

            if ($query->num_rows() == 1)
	     	{
      	     	$valid = rand(1,1000);
                  $newdata = array(
                        'user_id'  => $username,
                        'nama'  	=> $namafull,
                        'logged_in' => TRUE//,
                        //'level'	=> $level,
                        //'module' => $module,
                        //'redUser'	=> $redUser,
                        //'redPass' => $redPass,
                        //'valid'=>$valid,
                        //'redYear'=>$redYear
                  );
			// Our user exists, set session.
      		$this->CI->session->set_userdata($newdata);
                  $_SESSION['user_id']=$username;
                  $_SESSION['fullname']=$namafull;
			// update counter login
                  /*$data = array(
                        'online'=> $valid
                  );*/
                  $this->CI->db->where('username',$username);
                  //$this->CI->db->update('karyawan_new', $data);
			return 1;
            }
            else
    		{
    			// No existing user.
    			return 3;
    		}

	}

	 /**
         *
         * This function restricts users from certain pages.
         * use restrict(TRUE) if a user can't access a page when logged in
         *
         * @access	public
         * @param	boolean	wether the page is viewable when logged in
         * @return	void
         */
    	function restrict($logged_out = FALSE)
    	{
		// If the user is logged in and he's trying to access a page
		// he's not allowed to see when logged in,
		// redirect him to the index!
		if ($logged_out && is_logged_in())
		{
		      echo $this->CI->fungsi->warning('Maaf, sepertinya Anda sudah login...',base_url());
		      die();
              //redirect(base_url(), 'refresh');
              //$this->load->view('home/index');
                //redirect(base_url(), 'refresh');
		}

		// If the user isn' logged in and he's trying to access a page
		// he's not allowed to see when logged out,
		// redirect him to the login page!
		if ( ! $logged_out && !is_logged_in())
		{
		      echo $this->CI->fungsi->warning('Anda diharuskan untuk Login bila ingin mengakses halaman ini.',base_url());
		      die();
		}
	}
	function logout()
	{
	   $data = array(
                    'online'=> '0'
                    );
        $user = from_session('user_id');
        if($user=='')
            $user = $_SESSION['user_id'];
            $this->CI->db->where('user_id',$user);
            $this->CI->db->update('s_user', $data);
		$this->CI->session->sess_destroy();
        session_destroy();
		return TRUE;
	}
	function interupt()
	{
	   //
       $data = array(
                    'online'=> '0'
                    );
        $user = from_session('user_id');
        if($user=='')
            $user = $_SESSION['user_id'];
            $this->CI->db->where('user_id',$user);
            $this->CI->db->update('s_user', $data);
       //
		$this->CI->session->sess_destroy();
        session_destroy();
		return TRUE;
	}
	function cek($id,$ret=false)
	{
		$menu = array(
			'data_master'=>'+admin+',
			'manajemen_user'=>'+admin+'
		);
		$allowed = explode('+',$menu[$id]);
		if(!in_array(from_session('level'),$allowed))
		{
			if($ret) return false;
			echo $this->CI->fungsi->warning('Anda tidak diijinkan mengakses halaman ini.',base_url());
			die();
		}
		else
		{
			if($ret) return true;
		}
	}
    function cekAdmin(){
        if(from_session('level')=='Admin')
            return true;
        else
            return false;
    }
    function cek123($id,$ret=false)
	{
		$allowed = explode('|',from_session('module'));
		if(!in_array($id,$allowed))
		{
			if($ret) return false;
			echo $this->CI->fungsi->warning('Anda tidak diijinkan mengakses halaman ini.',base_url());
			die();
		}
		else
		{
			if($ret) return true;
		}
	}
	function setChaptcha()
	{
		$this->CI->config->load('config');
		$this->CI->load->helper('string');
		$this->CI->load->helper('captcha');
		$captcha_url = $this->CI->config->item('captcha_url');
		$captcha_path = $this->CI->config->item('captcha_path');
		$vals = array(
			'img_path'      	=> $captcha_path,
			'img_url'       	=> $captcha_url,
			'expiration'    	=> 3600,// one hour
			'font_path'	 	=> './system/fonts/georgia.ttf',
			'img_width'	 	=> '140',
			'img_height' 		=> 30,
			'word'			=> random_string('numeric', 6),
        	);
		$cap = create_captcha($vals);
		$capdb = array(
			'captcha_time'    	=> $cap['time'],
			'ip_address'      	=> $this->CI->input->ip_address(),
			'word'            	=> $cap['word']
		);
		$query = $this->CI->db->insert_string('captcha', $capdb);
		$this->CI->db->query($query);
		$data['cap'] = $cap;
		return $data;
	}

}
// End of library class
// Location: system/application/libraries/Auth.php
