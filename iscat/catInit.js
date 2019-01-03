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
       xhr.onerror = function() {
           console.log('err add how to deal with');
               //reject(new TypeError(xhr.responseText || 'Network request failed'))
        }

        xhr.ontimeout = function() {
            console.log('err add how to deal with');
               //reject(new TypeError(xhr.responseText || 'Network request failed'))
        }
       xhr.onreadystatechange = function() {
           if (xhr.readyState == XMLHttpRequest.DONE) {
               addTagsToPage(xhr.responseText);
           }
       }
       xhr.send(imageTaken);

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
               shearchTag.setTagParams(item)
           });
           isCatOnImage(data);

           //var searchString =data[2] + " + " + data[3];
           contsearch(data[0]);
           kgsearch(data[0]);
           //contsearch(shearchTag.getTagParams().slice(0,1));

           return
       });
  };

  function contsearch(str){

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/contsearch", true);
        xhr.responseType = '';
        xhr.onload = function(e) {
            if (this.status == 200) {
                //  console.log(this.responseText);
                }
            };
            // search term fix
        xhr.send(str);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                prosessCWSearchResult (xhr.responseText);
                $(".se-pre-con").fadeOut("slow");

                return
            }
        }
  };

function prosessCWSearchResult(result){
    var res = JSON.parse(result);

    $.each(res, function(id, element) {
        var outName = element.title ;
        var outDetailDescription = element.hasOwnProperty('description') ? element.description : "";
        var outUrl = element.hasOwnProperty('url') ? element.url: "";
        var outImage =  element.image.hasOwnProperty('thumbnail') ? element.image.thumbnail : ""
        var outDescription ='';
        //outDetailDescription = outDetailDescription.substring(0, 300);
        id = id + "CW"
        createSearchResultRow(id,outName.substring(0,70),outDescription,outUrl,outImage,outDetailDescription.substring(0,300))
      });
}



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
              addKGSearchToPage(xhr.responseText);
          }
      }
  };

  function createSearchResultRow(id,outName,outDescription,outUrl,outImage,outDetailDescription){

      $("#searchResults").append('<div class="row border border-light rounded m-1 shadow" id ='+id+ '>')
      $("#"+id)
         .append(
          $('<div class="pl-1 w-100 text-primary">' + outName + " " + outDescription +'</div>'),
          $('<a class="pl-1 w-100 text-success small searchUrl border-bottom text-truncate" target="_blank" href = "'+outUrl+'">'+outUrl+' </a>') ,
          $('<div class="col-9 small">'+ outDetailDescription +'... </div>'),
          $('<img src="'+outImage+'" alt=""  class=" pt-1 col-3 h-50 rounded float-right ">')
         )
  };

  function addKGSearchToPage (res){
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
          outDetailDescription = outDetailDescription.substring(0, 300);
          id =id + "KG";
          createSearchResultRow(id,outName,outDescription,outUrl,outImage,outDetailDescription)

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
