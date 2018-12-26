var xmlHTTP = xhr.XMLHttpRequest();
xmlHTTP.open('GET', url, true);
xmlHTTP.responseType = 'arraybuffer';
xmlHTTP.onload = function(e) {
  var arr = new Uint8Array(this.response);
  var raw = String.fromCharCode.apply(null,arr);
  var b64 = base64.encode(raw);
  var dataURL="data:image/png;base64," + b64;
};
xmlHTTP.send();
