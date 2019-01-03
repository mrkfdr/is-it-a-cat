
//\/\ark
var catApi = (function(){

    return{
        openXhr:function(type,path,str){
            var xhr = new XMLHttpRequest();

            xhr.open(type, path, true);
            xhr.responseType = '';
            xhr.onload = function(e) {
                if (this.status == 200) {
                      console.log(this.responseText);
                    }
                };

            xhr.send(str);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    return (xhr.responseText);
                }
            }
        }
    }
});
