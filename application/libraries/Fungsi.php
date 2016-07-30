<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Fungsi
{
    function Fungsi()
    {
        $this->CI =& get_instance();
    }
    function bulan($input)
    {
        if($input=='1'){$output='Januari';}
        if($input=='2'){$output='Februari';}
        if($input=='3'){$output='Maret';}
        if($input=='4'){$output='April';}
        if($input=='5'){$output='Mei';}
        if($input=='6'){$output='Juni';}
        if($input=='7'){$output='Juli';}
        if($input=='8'){$output='Agustus';}
        if($input=='9'){$output='September';}
        if($input=='10'){$output='Oktober';}
        if($input=='11'){$output='November';}
        if($input=='12'){$output='Desember';}
        return $output;
    }
    function hari($input)
    {
        if($input=='Sun'){$output='Minggu';}
        if($input=='Mon'){$output='Senin';}
        if($input=='Tue'){$output='Selasa';}
        if($input=='Wed'){$output='Rabu';}
        if($input=='Thu'){$output='Kamis';}
        if($input=='Fri'){$output='Jumat';}
        if($input=='Sat'){$output='Sabtu';}
        return $output;
    }
    function hari2($input)
    {
        if($input=='1'){$output='Minggu';}
        if($input=='2'){$output='Senin';}
        if($input=='3'){$output='Selasa';}
        if($input=='4'){$output='Rabu';}
        if($input=='5'){$output='Kamis';}
        if($input=='6'){$output='Jumat';}
        if($input=='7'){$output='Sabtu';}
        return $output;
    }
    function hari3($input)
    {
        if($input=='1'){$output='Sun';}
        if($input=='2'){$output='Mon';}
        if($input=='3'){$output='Tue';}
        if($input=='4'){$output='Wed';}
        if($input=='5'){$output='Thu';}
        if($input=='6'){$output='Fri';}
        if($input=='7'){$output='Sat';}
        return $output;
    }
    function tanggal($in,$time='',$show_time=true)
    {
        $tgl = substr($in,8,2);
        $bln = substr($in,5,2);
        $thn = substr($in,0,4);
        if($time=='')
        {
            $hour = 0;
            $min = 0;
            $sec = 0;
        }
        else
        {
            $hour = substr($time,0,2);
            $min = substr($time,3,2);
            $sec = substr($time,6,2);
        }
        $timestmp = mktime($hour,$min,$sec,$bln,$tgl,$thn);
        $output = $this->hari(date('D',$timestmp)).', '.$tgl.' '.$this->bulan($bln).' '.$thn;
        if($show_time) $output .= ' pukul '.$hour.'.'.$min;
        return $output;
    }
    function tanggal2($timestamp)
    {
        $tgl = date('d',$timestamp);
        $bln = date('n',$timestamp);
        $thn = date('Y',$timestamp);
        $hari = date('D',$timestamp);
        $output = $this->hari($hari).", ".$tgl." ".$this->bulan($bln)." ".$thn." pukul ".date('G:i',$timestamp);
        return $output;
    }
    function tanggal3($in)
    {
        $tgl = substr($in,8,2);
        $bln = substr($in,5,2);
        $thn = substr($in,0,4);
        $output = $tgl.' '.$this->bulan($bln).' '.$thn;
        return $output;
    }
    function tanggal_jurnal($in)
    {
        $out[]=$this->bulan(substr($in,5,2)).' '.substr($in,0,4);
        $out[]=substr($in,8,2);
        return $out;
    }
    function date_to_tanggal($in)
    {
        $tgl = substr($in,8,2);
        $bln = substr($in,5,2);
        $thn = substr($in,0,4);
        if(checkdate($bln,$tgl,$thn))
        {
           $out=substr($in,8,2)." ".$this->bulan(substr($in,5,2))." ".substr($in,0,4);
        }
        else
        {
           $out = "<span class='error'>-error-</span>";
        }
        return $out;
    }
    function complete($in,$max)
    {
        $len = $max;
        $len_in = strlen($in);
        $zero_len = $len - $len_in;
        $zero = "";
        for($i=1;$i<=$zero_len;$i++)
        {
            $zero .= '0';
        }
        return $zero.$in;
    }
    function pecah($uang,$delimiter='.',$kurung=false)
    {
        if($uang == '' || $uang == 0)
        {
            $rupiah = '0';
            return $rupiah;
        }
        $neg = false;
        if($uang<0)
        {
            $neg = true;
            $uang = abs($uang);
        }
        $rupiah = number_format($uang,0,',',$delimiter);
        if($neg && $kurung)
        {
            $rupiah = '('.$rupiah.')';
        }
        return $rupiah;
    }
    function build_select_time($name,$edit='')
    {
        $select = '<select name="'.$name.'">';
        for($i=0;$i<=23;$i++)
        {
            for($j=0;$j<=30;$j+=30)
            {
                $selected = '';
                $c_hour = $this->complete($i,2);
                $c_min = $this->complete($j,2);
                if($edit!='')
                {
                    if($edit==($c_hour.':'.$c_min.':00'))
                    {
                        $selected = 'selected="selected"';
                    }
                }
                $select .= '<option '.$selected.' value="'.$c_hour.':'.$c_min.'">'.$c_hour.':'.$c_min.'</option>';
            }
        }
        $select .= '</select>';
        return $select;
    }
    function build_select_weekly($name,$edit='')
    {
        $select = '<select name="'.$name.'">';
        $select .= '<option value="">- pilih -</option>';
        for($j=1;$j<=7;$j++)
        {
            $selected = '';
            if($edit!='')
            {
                if($edit==$this->hari3($j))
                {
                    $selected = 'selected="selected"';
                }
            }
            $select .= '<option '.$selected.' value="'.$this->hari3($j).'">'.$this->hari2($j).'</option>';
        }
        $select .= '</select>';
        return $select;
    }
    function build_select_monthly($name,$edit='')
    {
        $select = '<select name="'.$name.'">';
        $select .= '<option value="">- pilih -</option>';
        for($j=1;$j<=31;$j++)
        {
            $selected = '';
            if($edit!='')
            {
                if($edit==$j)
                {
                    $selected = 'selected="selected"';
                }
            }
            $select .= '<option '.$selected.' value="'.$j.'">'.$j.'</option>';
        }
        $select .= '</select>';
        return $select;
    }
    function build_select_month($name,$extra='',$edit='')
    {
        $select = '<select name="'.$name.'" '.$extra.'>';
        $select .= '<option value="">- pilih -</option>';
        for($j=1;$j<=12;$j++)
        {
            $selected = '';
            if($edit!='')
            {
                if($edit==$j)
                {
                    $selected = 'selected="selected"';
                }
            }
            $select .= '<option '.$selected.' value="'.$this->complete($j,2).'">'.$this->bulan($j).'</option>';
        }
        $select .= '</select>';
        return $select;
    }
    function build_select_year($name,$extra='',$edit='')
    {
        $select = '<select name="'.$name.'" '.$extra.'>';
        $select .= '<option value="">- pilih -</option>';
        for($j=2011;$j<=date('Y');$j++)
        {
            $selected = '';
            if($edit!='')
            {
                if($edit==$j)
                {
                    $selected = 'selected="selected"';
                }
            }
            $select .= '<option '.$selected.' value="'.$j.'">'.$j.'</option>';
        }
        $select .= '</select>';
        return $select;
    }
    function build_select_common($name,$dbobj,$key,$value,$extra='',$edit='')
    {
        $select = '<select name="'.$name.'" id="'.$name.'" '.$extra.'>';
        foreach($dbobj->result() as $row)
        {
            $selected = '';
            if($edit!='')
            {
                if($edit==$row->$key)
                {
                    $selected = 'selected="selected"';
                }
            }
            $select .= '<option '.$selected.' value="'.$row->$key.'">'.$row->$value.'</option>';
        }
        $select .= '</select>';
        return $select;
    }
    function array_delete($array,$keys)
    {
        $tmp_array = array();
        if(is_string($keys))
        {
            $keys_to_be_deleted = array($keys);
        }
        elseif(is_array($keys))
        {
            $keys_to_be_deleted = $keys;
        }
        else
        {
            return $array;
        }
        foreach($array as $key=>$val)
        {
            if(!in_array($key,$keys_to_be_deleted))
            {
                $tmp_array[$key] = $val;
            }
        }
        return $tmp_array;
    }
    function get_post($keys)
    {
        foreach($keys as $val)
        {
            $inp = $this->CI->input->post($val);
            $inp = trim($inp);
            $data[$val] = $inp;
        }
        return $data;
    }
    function fixtime($time)
    {
        $timespan = timespan($time);
        if(stristr($timespan,'hari'))
        {
            return $this->tanggal2($time);
        }
        return $timespan.' yang lalu';
    }
    function display_gravatar($email)
    {
        $gravatarMd5 = md5($email);
        return '<img src="http://www.gravatar.com/avatar/'.$gravatarMd5.'" alt="" width="35" height="35" />';
    }
    function generate_calendar($year, $month, $days = array(), $day_name_length = 3, $month_href = NULL, $first_day = 0, $pn = array())
    {
	$first_of_month = gmmktime(0,0,0,$month,1,$year);
	#remember that mktime will automatically correct if invalid dates are entered
	# for instance, mktime(0,0,0,12,32,1997) will be the date for Jan 1, 1998
	# this provides a built in "rounding" feature to generate_calendar()

	$day_names = array(); #generate all the day names according to the current locale
	for($n=0,$t=(3+$first_day)*86400; $n<7; $n++,$t+=86400) #January 4, 1970 was a Sunday
		$day_names[$n] = ucfirst(gmstrftime('%A',$t)); #%A means full textual day name

	list($month, $year, $month_name, $weekday) = explode(',',gmstrftime('%m,%Y,%B,%w',$first_of_month));
	$weekday = ($weekday + 7 - $first_day) % 7; #adjust for $first_day
	$title   = htmlentities(ucfirst($month_name)).'&nbsp;'.$year;  #note that some locales don't capitalize month and day names

	#Begin calendar. Uses a real <caption>. See http://diveintomark.org/archives/2002/07/03
	@list($p, $pl) = each($pn); @list($n, $nl) = each($pn); #previous and next links, if applicable
	if($p) $p = '<span class="calendar-prev">'.($pl ? '<a href="'.htmlspecialchars($pl).'">'.$p.'</a>' : $p).'</span>&nbsp;';
	if($n) $n = '&nbsp;<span class="calendar-next">'.($nl ? '<a href="'.htmlspecialchars($nl).'">'.$n.'</a>' : $n).'</span>';
	$calendar = '<div class="calendar"><table class="cal_bottom" style="border-top:1px solid #777777;">'."\n<tr class=day_title>";

	if($day_name_length){ #if the day names should be shown ($day_name_length > 0)
		#if day_name_length is >3, the full name of the day will be printed
		foreach($day_names as $d)
			$calendar .= '<th abbr="'.htmlentities($d).'">'.htmlentities($day_name_length < 4 ? substr($d,0,$day_name_length) : $d).'</th>';
		$calendar .= "</tr>\n<tr class='day'>";
	}

	if($weekday > 0) $calendar .= '<td colspan="'.$weekday.'">&nbsp;</td>'; #initial 'empty' days
	for($day=1,$days_in_month=gmdate('t',$first_of_month); $day<=$days_in_month; $day++,$weekday++){
		if($weekday == 7){
			$weekday   = 0; #start a new week
			$calendar .= "</tr>\n<tr class='day'>";
		}
		if(isset($days[$day]) and is_array($days[$day])){
			@list($link, $classes, $content) = $days[$day];
			if(is_null($content))  $content  = $day;
			$calendar .= '<td'.($classes ? ' class="'.htmlspecialchars($classes).'">' : '>').
				($link ? '<a href="'.htmlspecialchars($link).'">'.$content.'</a>' : $content).'</td>';
		}
		else $calendar .= "<td>$day</td>";
	}
	if($weekday != 7) $calendar .= '<td colspan="'.(7-$weekday).'">&nbsp;</td>'; #remaining "empty" days

	return $calendar."</tr>\n</table></div>\n";
    }
    function accept_data($value)
    {
        foreach($value as $key => $val)
        {
            $data[$val]  = $this->CI->input->post($val,TRUE);
            if(!is_array($data[$val]))
            {
                $data[$val]     = strip_image_tags($data[$val]);
                $data[$val]     = quotes_to_entities($data[$val]);
                $data[$val]     = encode_php_tags($data[$val]);
                $data[$val]     = trim($data[$val]);
            }
        }
        return $data;
    }
    function warning($input,$goTo='')
    {
        if($goTo=='')
        {
           $goTo = base_url();
        }
        $output="<script>
                alert(\"$input\");
                location = '$goTo';
            </script>";
        return $output;
    }
    function warningHome($input)
    {
        $output="<script>
                alert(\"$input\");
                location = 'http://192.168.50.78/gg/';
            </script>";
        return $output;
    }
	function cek_line($id,$line)
	{
		$allowed = explode('-',$line);
		if(!in_array($id,$allowed))
		{
			return FALSE;
		}
		else
		{
			return TRUE;
		}
	}
	function DBtoArray($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count][0] = $count+1;
            $q[$count][1] = $row->F1_TotTob;
            $q[$count][2] = $row->F1_TotTob_bid;
            $q[$count][3] = $row->F4_TotTob;
            $q[$count][4] = $row->F4_TotTob_bid;
            $q[$count][5] = $row->F5_TotTob;
			$q[$count][6] = $row->F5_TotTob_bid;
			$q[$count][7] = $row->F6_TotTob;
			$q[$count][8] = $row->F6_TotTob_bid;
			$q[$count][9] = $row->E3_TotTob;
			$q[$count][10] = $row->E3_TotTob_bid;
			$q[$count][11] = $row->E6_TotTob;
			$q[$count][12] = $row->E6_TotTob_bid;
            $count++;
        }

	return $q;
    }

	function DBtoArrayNew($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count][0] = $count+1;
            $q[$count][1] = $row->F1_TotTob;
            $q[$count][2] = $row->F1_TotTob_bid;
            $q[$count][3] = $row->F4_TotTob;
            $q[$count][4] = $row->F4_TotTob_bid;
            $q[$count][5] = $row->F5_TotTob;
			$q[$count][6] = $row->F5_TotTob_bid;
			$q[$count][7] = $row->F6_TotTob;
			$q[$count][8] = $row->F6_TotTob_bid;
			$q[$count][9] = $row->E3_TotTob;
			$q[$count][10] = $row->E3_TotTob_bid;
			$q[$count][11] = $row->E4_TotTob;
			$q[$count][12] = $row->E4_TotTob_bid;
			$q[$count][13] = $row->E5_TotTob;
			$q[$count][14] = $row->E5_TotTob_bid;
			$q[$count][15] = $row->E6_TotTob;
			$q[$count][16] = $row->E6_TotTob_bid;
            $count++;
        }

	return $q;
    }

    function DBtoArray2($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count][0] = $count+1;
            $q[$count][1] = $row->G1_TotTob;
            $q[$count][2] = $row->G1_TotTob_bid;
            $q[$count][3] = $row->G2_TotTob;
            $q[$count][4] = $row->G2_TotTob_bid;
            $q[$count][5] = $row->G3_TotTob;
			$q[$count][6] = $row->G3_TotTob_bid;
			$q[$count][7] = $row->G5_TotTob;
			$q[$count][8] = $row->G5_TotTob_bid;
			$q[$count][9] = $row->H1_TotTob;
			$q[$count][10] = $row->H1_TotTob_bid;
			$q[$count][11] = $row->H2_TotTob;
			$q[$count][12] = $row->H2_TotTob_bid;
			$q[$count][13] = $row->H3_TotTob;
			$q[$count][14] = $row->H3_TotTob_bid;
			$q[$count][15] = $row->H4_TotTob;
			$q[$count][16] = $row->H4_TotTob_bid;
			$q[$count][17] = $row->H5_TotTob;
			$q[$count][18] = $row->H5_TotTob_bid;
            $count++;
        }

	return $q;
    }
    function DBtoArray3($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count][0] = $count+1;
            $q[$count][1] = $row->I1_TotTob;
            $q[$count][2] = $row->I1_TotTob_bid;
            $q[$count][3] = $row->I2_TotTob;
            $q[$count][4] = $row->I2_TotTob_bid;
            $q[$count][5] = $row->I3_TotTob;
			$q[$count][6] = $row->I3_TotTob_bid;
			$q[$count][7] = $row->J3_TotTob;
			$q[$count][8] = $row->J3_TotTob_bid;

            $count++;
        }

	return $q;
    }

	function DBtoArray3New($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count][0] = $count+1;
            $q[$count][1] = $row->I1_TotTob;
            $q[$count][2] = $row->I1_TotTob_bid;
            $q[$count][3] = $row->I2_TotTob;
            $q[$count][4] = $row->I2_TotTob_bid;
            $q[$count][5] = $row->I3_TotTob;
			$q[$count][6] = $row->I3_TotTob_bid;
			$q[$count][7] = $row->I5_TotTob;
			$q[$count][8] = $row->I5_TotTob_bid;
			$q[$count][9] = $row->I6_TotTob;
			$q[$count][10] = $row->I6_TotTob_bid;
			$q[$count][11] = $row->J1_TotTob;
			$q[$count][12] = $row->J1_TotTob_bid;
			$q[$count][13] = $row->J2_TotTob;
			$q[$count][14] = $row->J2_TotTob_bid;
			$q[$count][15] = $row->J3_TotTob;
			$q[$count][16] = $row->J3_TotTob_bid;

            $count++;
        }

	return $q;
    }


	function DBtoArray4($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count][0] = $count+1;
            $q[$count][1] = $row->I1_TotTob;
            $q[$count][2] = $row->I1_TotTob_bid;
            $q[$count][3] = $row->I2_TotTob;
            $q[$count][4] = $row->I2_TotTob_bid;
            $q[$count][5] = $row->I3_TotTob;
			$q[$count][6] = $row->I3_TotTob_bid;
			$q[$count][7] = $row->J2_TotTob;
			$q[$count][8] = $row->J2_TotTob_bid;
            $q[$count][9] = $row->J3_TotTob;
			$q[$count][10] = $row->J3_TotTob_bid;

            $count++;
        }

	return $q;
    }

	function DBtoArray4New($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count][0] = $count+1;
            $q[$count][1] = $row->I1_TotTob;
            $q[$count][2] = $row->I1_TotTob_bid;
            $q[$count][3] = $row->I2_TotTob;
            $q[$count][4] = $row->I2_TotTob_bid;
            $q[$count][5] = $row->I3_TotTob;
			$q[$count][6] = $row->I3_TotTob_bid;
			$q[$count][7] = $row->I5_TotTob;
			$q[$count][8] = $row->I5_TotTob_bid;
			$q[$count][9] = $row->I6_TotTob;
			$q[$count][10] = $row->I6_TotTob_bid;
			$q[$count][11] = $row->J1_TotTob;
			$q[$count][12] = $row->J1_TotTob_bid;
			$q[$count][13] = $row->J2_TotTob;
			$q[$count][14] = $row->J2_TotTob_bid;
            $q[$count][15] = $row->J3_TotTob;
			$q[$count][16] = $row->J3_TotTob_bid;
            $count++;
        }

	return $q;
    }


	function DBtoArr($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count] = $count+1;
            $q[$count] = $row->Datalog_ID;

            $count++;
        }
	return $q;
    }
	function DBtoArr2($datarecord)
	{
	$q = null;
	$count = 0;
	foreach ($datarecord->result() as $row)
        {
            $q[$count] = $count+1;
            $q[$count] = $row->Datalog_Lbl;
			$q[$count] = $row->Datalog_Sat;

            $count++;
        }
	return $q;
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
    function sortBySubkey(&$array, $subkey, $sortType = SORT_ASC) {
        foreach ($array as $subarray) {
            $keys[] = $subarray[$subkey];
        }
        array_multisort($keys, $sortType, $array);
    }
    function getDuration($awal, $akhir){
        $h =  strtotime($awal);
        $h2 = strtotime($akhir);

        $minute = date("i", $h);
        $second = date("s", $h);
        $hour = date("H", $h);

        $convert = strtotime("-$minute minutes", $h2);
        $convert = strtotime("-$second seconds", $convert);
        $convert = strtotime("-$hour hours", $convert);
        $new_time = date('H:i:s', $convert);

        return $new_time;
    }
    function groupArraySortU($arrayx, $keyx){
        $this->sortBySubkey($arrayx, $keyx, SORT_ASC);
        $tmpArray = array();
        foreach($arrayx as $data)
        {
            $tmpArray[$data[$keyx]]['COUNT']+=1;
            $tmpArray[$data[$keyx]]['DATA'][$tmpArray[$data[$keyx]]['COUNT']-1] = $data;
        }
        $arrGroupSort = array();
        foreach($tmpArray as $key=>$val){
            array_push($arrGroupSort,array('key'=>$key,'data'=>$val['DATA']));
        }
        return $arrGroupSort ;
    }
    function groupArraySortStopDetail($arrayx, $keyx){
        $this->sortBySubkey($arrayx, $keyx, SORT_ASC);
        $tmpArray = array();
        $tmpArrWE = array();
        $tmpArrWE1 = array();
        $counter = 0;
        foreach($arrayx as $data){
            $tmpArray[$data[$keyx]]['COUNT']+=1;
            if($counter==1){
                $tmpArrWE1['date'] = $data['date'];
                $tmpArrWE1['from'] = '00:00:00';
                $tmpArrWE1['duration'] = $this->getDuration($tmpArrWE1['from'], $tmpArrWE1['to']);
                $tmpArray[$data[$keyx]]['DATA'][$tmpArray[$data[$keyx]]['COUNT']-1] = $tmpArrWE1;
                $tmpArray[$data[$keyx]]['COUNT']+=1;
                $counter=0;
            }
            if($data['from']>$data['to']){
                $tmpArrWE1 = $data;
                $tmpArrWE = $data;
                $tmpArrWE['to'] = '00:00:00';
                $tmpArrWE['duration'] = $this->getDuration($tmpArrWE['from'], $tmpArrWE['to']);
                $tmpArray[$data[$keyx]]['DATA'][$tmpArray[$data[$keyx]]['COUNT']-1] = $tmpArrWE;
                $counter = 1;
            }
            else
                $tmpArray[$data[$keyx]]['DATA'][$tmpArray[$data[$keyx]]['COUNT']-1] = $data;
        }
        $arrGroupSort = array();
        foreach($tmpArray as $key=>$val){
            array_push($arrGroupSort,array('key'=>$key,'data'=>$val['DATA']));
        }
        /*$arrRet = array();
        $this->array_sort($arrayx, $keyx);
        $temp = '';
        for($i=0; $i<count($sortedArray); $i++){
            if($i==0){
                $temp = $arrayx[$i][$keyx];
            }
            if($arrayx[$i][$keyx]==$temp){

            }
        }*/
        return $arrGroupSort ;
    }

    function delTree($dir) {
        $files = glob( $dir . '*', GLOB_MARK );
        foreach( $files as $file ){
            if( substr( $file, -1 ) != '/' )
                unlink( $file );
        }
        //if (is_dir($dir)) rmdir( $dir );
    }

    function rmdir_files($dir) {
        $dh = opendir($dir);
        if ($dh) {
            while($file = readdir($dh)) {
                if (!in_array($file, array('.', '..'))) {
                    if (is_file($dir.$file)) {
                        unlink($dir.$file);
                    }
                    else if (is_dir($dir.$file)) {
                        $this->rmdir_files($dir.$file);
                    }
                }
            }
            rmdir($dir);
        }
    }
}
