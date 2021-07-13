<?php
$img_author = [];
$file = '..' . $_POST['file'];

switch (substr($_POST['author'], -1)) {
     case 'a':
     case 'e':
          if ($_POST['author'] != 'Andrea') {
               $img_dir = '/img/Avatar/Woman/';
               break;
          } else
               $img_dir = '/img/Avatar/Man/';

     default:
          $img_dir = '/img/Avatar/Man/';
          break;
}

if ($dh = opendir('..' . $img_dir)) {
     while (($img = readdir($dh)) !== false) {
          if ($img != "." && $img != "..")
               $img_author[] = $img;
     }
     closedir($dh);
}

if (file_exists($file)) {
     $current_data = file_get_contents($file);
     $array_data = json_decode($current_data, true);
     $extra = array(
          'author'               =>     $_POST['author'],
          'message'          =>     $_POST["message"],
          'img_author'     =>     $img_dir . $img_author[random_int(2, count($img_author))],
          'date'     =>     date("j F Y - H:i:s")
     );
     if ($_POST['author'] == "") {
          $extra['author'] = "Anonimus";
     }
     if ($_POST['author'] == "Admin") {
          $extra['img_author'] = "/img/Avatar/3079846.png";
     }
     for ($i = 0; $i < sizeof($array_data); $i++) {
          if ($array_data[$i]['author'] == $_POST['author']) {
               $extra['img_author'] = $array_data[$i]['img_author'];
               break;
          }
          $i++;
     }
     $array_data[] = $extra;
     $final_data = json_encode($array_data, JSON_PRETTY_PRINT);
     if (file_put_contents($file, $final_data)) {
          print_r(json_encode($extra));
     }
} else {
     echo 'JSON File not exits';
}
