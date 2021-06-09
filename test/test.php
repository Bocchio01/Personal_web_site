 <!DOCTYPE html>  
 <html>  
      <head>  
           <title>Webslesson Tutorial | How to Load JSON Data in PHP</title>  
           <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>  
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />  
           <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>  
      </head>  
      <body>  
           <br />  
           <div class="container" style="width:500px;">  
                <h3 align="">How to Load JSON Data in PHP</h3><br />                 
                <div class="table-responsive">  
                     <table class="table table-bordered">  
                          <tr>  
                               <th>Video Title</th>  
                          </tr>  
                          <?php   
                          $data = file_get_contents("video.json");  
                          $data = json_decode($data, true); 
                          echo $data[0]["title"]; 
                          foreach($data as $row)  
                          {  
                          	echo '<div class="container">
        <div class="sinistra">
          <h1 class="title">'.$row["title"].'</h1>
          <div class="description">'.$row["description"].'</div>
        </div>
        <div class="destra">
          <img src='.$row["img"].'>
        </div>
      </div>';}  
                          ?>  
                     </table>  
                </div>  
           </div>  
           <br />  
      </body>  
 </html>  