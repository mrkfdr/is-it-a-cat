//\/\ark

var catModule = (function(){

    var shearchTag = (function(){
        var tagParams = [];
        function exec(val){
            tagParams.push(val);
        }
        return{
            setTagParams:function(val){
                exec(val);
            },
            getTagParams:function(){
                return tagParams;
            }
        }
    })();

   function identifyImage(imageTaken){
       var responseText = document.getElementById('tags');
       var xhr = new XMLHttpRequest();
       xhr.open('POST', '/identify', true);
       xhr.responseType = '';
       //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       xhr.onload = function(e) {
           if (this.status == 200) {
                 console.log(this.responseText);
               }
           };
       xhr.send(imageTaken);

       xhr.onreadystatechange = function() {
           if (xhr.readyState == XMLHttpRequest.DONE) {
               addTagsToPage(xhr.responseText);
               $(".se-pre-con").fadeOut("slow");

           }
       }
   };

   function addTagsToPage(tags) {
       $( document ).ready(function() {
           data = $.parseJSON(tags);
           if (data.length === 0){
               $('.msgNotfound').append('<p>...  can not prosess image </p><p>...  please try taking a clear pictire of the subject</p> ')
               return
           }

           $.each(data, function(i, item) {
               $('#tags').append(document.createTextNode(item + ' ,'));
           });
           isCatOnImage(data);
           //future use
           shearchTag.setTagParams(data[0]);
           shearchTag.setTagParams(data[1]);
           shearchTag.setTagParams(data[3]);

           var searchString =data[0];// + "+" + data[1];
           kgsearch(searchString);

           return
       });
  };
  function kgsearch(str){
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/kgsearch', true);
      xhr.responseType = '';
      xhr.onload = function(e) {
          if (this.status == 200) {
                console.log(this.responseText);
              }
          };
          // search term fix
      xhr.send(str);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
              addSearchToPage(xhr.responseText);
          }
      }
  };
  function addSearchToPage (res){
      var res = JSON.parse(res);
      if (res.itemListElement.length === 0){
          $("#msgNotfound").text( ' ... no search found');
          return
      }
      $.each(res.itemListElement, function(id, element) {
        if (!element.result.detailedDescription) return
          var outName = element.result.name ;
          var outDescription = element.result.hasOwnProperty('description') ? element.result.description : "";
          var outUrl = element.result.detailedDescription.hasOwnProperty ('url') ? element.result.detailedDescription.url: "";
          var outImage =  element.result.hasOwnProperty('image') ? element.result.image.contentUrl : ""
          var outDetailDescription =  element.result.detailedDescription.hasOwnProperty('articleBody') ? element.result.detailedDescription.articleBody :"" ;
          outDetailDescription = outDetailDescription.substring(0, 100);

          $("#searchResults").append('<div class="row border border-light rounded m-1 shadow" id ='+id+ '>')
          $("#"+id)
             .append(
              $('<div class="col-8 text-primary">' + outName + " " + outDescription +'</div>'),
              $('<a class="col-8 text-success small searchUrl border-bottom text-truncate" target="_blank" href = "'+outUrl+'">'+outUrl+' </a>') ,
              $('<div class="col-8 small">'+ outDetailDescription +'... </div>'),
              $('<img src="'+outImage+'" alt="" class="col-4 h-50 rounded float-right ">')
             )
       });
  };

  function isCatOnImage (data){
      if (data.includes('cat')){
          $('#isCat').text('  yeahhh  you have a cat');
      }else{
          $('#isCat').text('  hmm.. No cats here,  but we found :');
      }
  };
return{
    returnResultPage:function(imageTaken){
        var xhr = new XMLHttpRequest();
        data = {image: 'imageTaken'};
            xhr.open('post', '/camera', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                $("#mainView").replaceWith( xhr.responseText );
                $("#imageOutput").attr("src",imageTaken);
                identifyImage(imageTaken);
            }
        }
        xhr.send(JSON.stringify(data));
        return
    }
}
});
