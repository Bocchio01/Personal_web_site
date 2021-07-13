<?php
$dir =  $_POST["directory"];
$array = [];

if (is_dir($dir))
{
   if ($dh = opendir($dir))
   {
      while (($file = readdir($dh)) !== false)
      {
         if ($file != "." && $file != "..")
            $array[] = $file;
      }
      closedir($dh);
   }
}
echo (json_encode ($array));
?>