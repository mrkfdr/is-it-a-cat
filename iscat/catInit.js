//\/\ark

var catModule = (function(){

    // var wtTagParams = (function(){
    //     var tagParams = [];
    //     function exec(val){
    //         tagParams = val;
    //     }
    //     return{
    //         setTagParams:function(val){
    //             exec(val);
    //         },
    //         getTagParams:function(){
    //             return tagParams;
    //         }
    //     }
    // })();

    function addTagsToPage(tags) {
        $( document ).ready(function() {
            data = $.parseJSON(tags);
            $.each(data, function(i, item) {
                $('#tags').append(document.createTextNode(item + ' ,'));
            });
            isCatOnImage(data);
            return
        });
   };

   function isCatOnImage (data){

       if (data.includes('cat')){
           $('#isCat').append(document.createTextNode('  yeahhh  you have a cat'));
       }else{
           $('#isCat').append(document.createTextNode('  hmm.. No cats here But We found'));

       }
   };

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
