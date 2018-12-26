exports.bufferImage = function (b64Img) {
    var data = b64Img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer.from(data, 'base64');
    return buf
};
