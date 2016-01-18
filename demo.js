


$(function() {
    var uploadButton = document.getElementById("jpeg_upload_button");
    //Console logging (html)
   
    var output_format = "jpg";
    var console = document.getElementById('status');
    console.innerHTML=("Waiting for image...");

    
	/*
    //Slider init
    $("#slider-range-min").slider({
        range: "min",
        value: 30,
        min: 1,
        max: 100,
        slide: function(event, ui) {
            $("#jpeg_encode_quality").val(ui.value);
        }
    });
    $("#jpeg_encode_quality").val($("#slider-range-min").slider("value"));
        */
    /** DRAG AND DROP STUFF WITH FILE API **/
    var holder = document.getElementById('holder');
    
    holder.ondragover = function() {
        this.className = 'is_hover';
        return false;
    };
    holder.ondragend = function() {
        this.className = '';
        return false;
    };
    holder.ondrop = function(e) {
        this.className = '';
        e.preventDefault();
        document.getElementById('jpeg_encode_quality').value = "30";
        console.innerHTML=("Loading image from your disk...");
       // document.getElementById("holder_helper").removeChild(document.getElementById("holder_helper_title"));
        
        var file = e.dataTransfer.files[0], 
        reader = new FileReader();
        reader.onload = function(event) {
            var i = document.getElementById("source_image");
           	 	i.src = event.target.result;
           	 	i.onload = function(){
           	 		image_width=$(i).width(),
	                image_height=$(i).height();
	
	                if(image_width > image_height){
	                	i.style.width="600px";
	                }else{
	                	i.style.height="600px";
	                }
	                i.style.display = "block";
	                console.innerHTML=("Image loaded");
                    //$("#hello").trigger("select");

           	 	}
                
        };
        
        if(file.type=="image/png"){
            output_format = "png";
        }

        console.innerHTML=("Filename:" + file.name);
        console.innerHTML=("Filesize:" + (parseInt(file.size) / 1024) + " Kb");
        console.innerHTML=("Type:" + file.type);
        

        reader.readAsDataURL(file);
        
        return false;
    };



    document.querySelector('#afile').addEventListener('change', function(e) {

            var selectedFile = event.target.files[0];
            var reader = new FileReader();

             var imgtag = document.getElementById("source_image");
             imgtag.title = selectedFile.name;
             console.innerHTML=("Loading image from your disk...");
             reader.onload = function(event) {
             imgtag.src = event.target.result;
                imgtag.onload = function(){
                    image_width=$(imgtag).width(),
                    image_height=$(imgtag).height();
    
                    if(image_width > image_height){
                        imgtag.style.width="600px";
                    }else{
                        imgtag.style.height="600px";
                    }
                    imgtag.style.display = "block";
                    console.innerHTML=("Image loaded");
                    //$("#hello").trigger("select");

                };};

     reader.readAsDataURL(selectedFile);

    },false);






    
    var encodeButton = document.getElementById('jpeg_encode_button');
    var encodeQuality = document.getElementById('jpeg_encode_quality');

    //HANDLE COMPRESS BUTTON
    encodeButton.addEventListener('click', function(e) {
        
        var source_image = document.getElementById('source_image');
        var result_image = document.getElementById('result_image');
        if(document.getElementById('uix').value!='' && document.getElementById('country').value!='')

        {

            ///alert(document.getElementById('country').value);

          if (source_image.src == "") {
                    alert("You must load an image first!");
                    return false;
                }
        
                var quality = parseInt(encodeQuality.value);
                console.innerHTML=("Quality >>" + quality);
        
                console.innerHTML=("Compressing image..May take some time for large image files");
                var time_start = new Date().getTime();
                
                result_image.src = jic.compress(source_image,quality,output_format).src;
                
                result_image.onload = function(){
                  var image_width=$(result_image).width(),
                    image_height=$(result_image).height();
                         
                  if(image_width > image_height){
                    result_image.style.width="600px";
                  }else{
                    result_image.style.height="600px";
                  }
                 result_image.style.display = "block";
        
        
                }
                var duration = new Date().getTime() - time_start;
                
                
        
        
                console.innerHTML=("process finished...");
                console.innerHTML=('Upload started after : ' + duration + 'ms');
        
                //$("#jpeg_upload_button").trigger("click");
                //uploadButton.click;
               // upload(output_format,result_image);
        
               setTimeout(function(){ upload(output_format,document.getElementById('result_image')) }, 1000);
        
            //   jic.upload(result_image, 'upload2.php', 'file', 'new.'+output_format,callback);
            
            }

            else
            {
              alert("Please fill the whole form");
            }

          }, false);
    
    
    //HANDLE UPLOAD BUTTON
    
    uploadButton.addEventListener('click', function(e) {
        //alert("Yup");
        var result_image = document.getElementById('result_image');
        if (result_image.src == "") {
            alert("You must load an image and compress it first!");
            return false;
        }
        var callback= function(response){
        	console.log=("image uploaded successfully! :)");
            //alert(response);
        	console.log=(response);        	
        }

        myfunction(duringCallback);
                
        jic.upload(result_image, 'upload2.php', 'file', 'new.'+output_format,callback);


       
    }, false);

/*** END OF DRAG & DROP STUFF WITH FILE API **/

});

function upload(output_format,result_image)
{
   // var result_image = document.getElementById('result_image');
        if (result_image.src == "") {
            alert("You must load an image and compress it first!");
            return false;
        }
        var callback= function(response){
            console.innerHTML=("image uploaded successfully! :)");
            //alert(response);
            html = "<img class='col-md-8' src='"+response+"'>";
            console.innerHTML=(response); 
            publish(html);         
        }
        //alert(output_format);
        //document.getElementById('progressa').value = this[duringCallback]();

            var errorCallback = function () {
                   console.innerHTML=("Upload failure");
                };

            var duringCallback = function (progressPercent) {
             document.getElementById('progressa').value = progressPercent;
            };


        jic.upload(result_image, 'http://izifiso.com/izifiso/blogeditor/test3/upload.php', 'file', document.getElementById('yy').value,callback,errorCallback,duringCallback);
        


}

function load()
{
  //document.getElementById("up_b").disabled = true;
  //document.getElementById("up_b2").disabled = true;

  var hr = new XMLHttpRequest();
  hr.open("POST", "http://izifiso.com/izifiso/blogeditor/test3/c_base.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() 
    {
      if(hr.readyState == 4 && hr.status == 200) 
      {
       
       var univ_id = hr.responseText;
     // alert(univ_id);
      document.getElementById("yy").value = univ_id;
      }

    }

    
    hr.send();

    // alert(univ_id);

}

function publish(html)
{
  var get_ref = "0";
  var hr = new XMLHttpRequest();
  hr.open("POST", "http://izifiso.com/izifiso/blogeditor/test3/publish.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() 
    {
      if(hr.readyState == 4 && hr.status == 200) 
      {
       
       var f = hr.responseText;
      //alert(f);
      alert(f);
      window.location = "photo_up.html";
      

      }

    }
    univ_id = document.getElementById("yy").value;
    //var title = "pic";
    var title = document.getElementById('uix').value;
    var description = document.getElementById('dscrp').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
  //  alert(title);
    //var html2 = document.getElementById("editing").innerHTML;
     //var html = html2.replace(/&nbsp;/g, " ");
    //var html = document.getElementById("textarea").value;
   //alert(html); 

    parameters1 = 'id=' + univ_id + '&html=' + html + '&title=' + title + '&ref=' + get_ref + '&des=' + description + '&country=' + country + '&state=' + state;
    hr.send(parameters1);
}



