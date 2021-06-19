<?php
//$dir =  '.'.$_REQUEST["directory"].'/';

$dir =  '.'.$_POST["directory"];

// Open a directory, and read its contents
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
       if ($file != "." && $file != "..")
      $array[] = $file;
   }
   closedir($dh);
}
}
echo (json_encode ($array));
?>