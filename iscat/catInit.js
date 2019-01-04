//\/\ark

var catModule = (function(){
    const catA = new catApi();
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
      // var responseText = document.getElementById('tags');
       catA.openXhr("POST","/identify",imageTaken).then(function(res){
           addTagsToPage(res);
       });
   };

   function addTagsToPage(tags) {
       $( document ).ready(function() {
           data = $.parseJSON(tags);
           if (data.length === 0){
               $('.msgNotfound').append('<p>...  can not prosess image </p><p>...  please try taking a clear pictire of the subject</p> ')
               return
           }

           $.each(data, function(i, item) {
               //$('#tags').append(document.createTextNode(item + ' ,'));
               $('#tags').append('<div class = "badge badge-pill badge-info" id = '+item+'>'+item+'</div>')
               shearchTag.setTagParams(item)
           });
           $('#tags').append('</br>').append(document.createTextNode('Click on tag to search term'));

           isCatOnImage(data);
           contsearch(data[1]);
           kgsearch(data[0]);
           //contsearch(shearchTag.getTagParams().slice(0,1));

           $('.badge-pill').click(function (){
               var clickId =$(this).html();
               kgsearch(clickId);
               contsearch(clickId);
               $('#searchResults').empty()
               $(".se-pre-con").fadeIn("slow");
            });

           return
       });
  };

  function contsearch(str){
      catA.openXhr("POST","/contsearch",str).then(function(res){
          if (res){
              prosessCWSearchResult (res);
          }
          $(".se-pre-con").fadeOut("slow");
      });
  };

function prosessCWSearchResult(result){
    var res = JSON.parse(result);

    $.each(res, function(id, element) {
        var outName = element.title ;
        var outDetailDescription = element.hasOwnProperty('description') ? element.description : "";
        var outUrl = element.hasOwnProperty('url') ? element.url: "";
        var outImage =  element.image.hasOwnProperty('thumbnail') ? element.image.thumbnail : ""
        var outDescription ='';
        id = id + "CW"
        createSearchResultRow(id,outName.substring(0,70),outDescription,outUrl,outImage,outDetailDescription.substring(0,300))
      });
  }

  function kgsearch(str){
      catA.openXhr("POST","/kgsearch",str).then(function(res){
          processKGSearchResults(res);
      });
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

  function processKGSearchResults (res){
      var res = JSON.parse(res);
      if (!res.itemListElement.length){
          //$(".msgNotfound").text( ' ... no search found');
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
        data = {image: 'imageTaken'};
        catA.openXhr("POST","/camera",JSON.stringify(data))
            .then(function(res){
                $("#mainView").replaceWith( res );
                $("#imageOutput").attr("src",imageTaken);
                identifyImage(imageTaken);
        });
        return
    }
}
});
