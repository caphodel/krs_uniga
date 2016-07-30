<?php
if($dh = opendir('./')){
  while(($file = readdir($dh)) != false){

    if($file == "." or $file == ".."){

    } else {
      if(is_dir($file))
        $return_array[] = $file;
    }
  }
}

echo json_encode($return_array);
 ?>
