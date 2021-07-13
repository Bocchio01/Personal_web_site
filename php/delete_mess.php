<?php
$img_author = [];
$file = '..' . $_POST['file'];

if (file_exists($file)) {
     $current_data = file_get_contents($file);
     $array_data = json_decode($current_data, true);
     array_pop($array_data);
     $final_data = json_encode($array_data, JSON_PRETTY_PRINT);
     if (file_put_contents($file, $final_data)) {
          print_r(json_encode($extra));
     }
} else {
     echo 'JSON File not exits';
}