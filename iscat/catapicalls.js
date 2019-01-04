
//\/\ark
var catApi = (function(){
    return {
        openXhr:function(type,path,str){
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(type, path, true);
                if (path === '/camera'){
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                }
                xhr.responseType = '';
                xhr.onload = function(e) {
                    var status = xhr.status;
                    if (this.status == 200) {
                        resolve (xhr.responseText);
                    }else{
                        console.log('isCat: ERR in '+ path + ' ' + e);
                        reject(status);
                    }
                };
                xhr.send(str);
            });
        }
    };
});
