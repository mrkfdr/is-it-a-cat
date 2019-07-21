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
       catA.openXhr("POST","/identifyimage",imageTaken)
        .then(function(res){
           addTagsToPage(res);
        });
   };

   function addTagsToPage(tags) {
       $( document ).ready(function() {
           data = $.parseJSON(tags);
           if (data.length === 0){
               $('#isCatmsg').text('Can not prosess image please try again')
               $('#isCatmsg').removeClass('alert-warning').addClass('alert-danger')
               $('#spinner').remove();

               return
           }

           data.data.forEach(function (itemfound, index) {
               switch(Object.keys(itemfound)[0]) {
                   case 'bestguess':
                       $('#topicresultsoutput').append('<div id = "label" class="wrp font-weight-bold text-info">Image Description</div>')
                       $('#topicresultsoutput').append('<div id = "tag" class="wrp badge">'+itemfound.bestguess+'</div>')
                       $('.wrp' ).wrapAll( "<div class='container border border-primary rounded pb-1 m-1'></div></p>" );
                   break
                   case 'labels':
                       $('#resultsoutput').append('<div id = "label" class="wrp1 font-weight-bold text-info">Generated Tags</div>')
                       $('#resultsoutput').append('<div id = "labelTags" class="wrp1">')
                       itemfound.labels.forEach(function (item, index) {
                          $('#labelTags').append('<div class = "badge" id = lb'+index+'>#'+item+' </div>')
                       });
                       $('.wrp1' ).wrapAll( "<div class='container border border-primary rounded pb-1 m-1'></div></p>" )
                   break
                   case 'textfound':
                       $('#resultsoutput').append('<div id = "label" class="wrp2 font-weight-bold text-info">Text</div>')
                       $('#resultsoutput').append('<div id = "textTags" class="wrp2">')
                       itemfound.textfound.forEach(function (item, index) {
                          if (index > 0) {
                              $('#textTags').append('<div class = "badge " id = tx'+index+'>'+item+', </div>')
                          }
                       });
                       $('.wrp2' ).wrapAll( "<div class='container border border-primary rounded pb-1 m-1'></div></p>" )
                    break
                    case 'logofound':
                        $('#resultsoutput').append('<div id = "label" class="wrp3 font-weight-bold text-info">Brands & Logo</div>')
                        $('#resultsoutput').append('<div id = "logoTags" class="wrp3">')
                        itemfound.logofound.forEach(function (item, index) {
                           $('#logoTags').append('<div class = "badge " id = lo'+index+'>'+item+' </div>')
                        });
                        $('.wrp3' ).wrapAll( "<div class='container border border-primary rounded pb-1 m-1'></div></p>" )
                    break
                    case 'safesearch':
                        $('#resultsoutput').append('<div id = "label" class="wrp4 font-weight-bold text-info">Safe Content</div>')
                        $('#resultsoutput').append('<div id = "safeTags" class="wrp4">')
                        itemfound.safesearch.forEach(function (item, index) {                           
                           if ( item.match("UNLIKELY")) {
                               $('#safeTags').append('<div class = "badge badge-success " id = lo'+index+'>'+item+' </div>')                          
                           }else if (item.match("POSSIBLE")) {
                               $('#safeTags').append('<div class = "badge badge-warning " id = lo'+index+'>'+item+' </div>')
                           }else{
                               $('#safeTags').append('<div class = "badge badge-danger " id = lo'+index+'>'+item+' </div>')
                           }                             
                        })
                        $('.wrp4' ).wrapAll( "<div class='container border border-primary rounded pb-1 m-1'></div></p>" )

                    

                   default:
               }
           })
            $('#isCatmsg').text('Image analysis results')
            $('#isCatmsg').removeClass('alert-warning').addClass('alert-success')
            $('#spinner').remove();


           return
       });
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
