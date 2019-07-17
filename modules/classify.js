exports.recieveddata = function (data) {
    var jsonStr = '{"meta":"","data":[]}'
    var obj = JSON.parse(jsonStr);

    if (data[0].webDetection.bestGuessLabels.length > 0) {
        obj.data.push ( {'bestguess' : data[0].webDetection.bestGuessLabels[0].label})
    }

    if (data[0].labelAnnotations.length > 0) {
        var labelAnnotation = []
        data[0].labelAnnotations.forEach(function (item, index) {
          labelAnnotation.push(item.description)
        });
        obj.data.push ({'labels': labelAnnotation})
    }

    if (data[0].textAnnotations.length > 0) {
        var textAnnotations = []
        data[0].textAnnotations.forEach(function (item, index) {
          textAnnotations.push(item.description)
        });
        obj.data.push ({'textfound': textAnnotations})
    }

    if (data[0].logoAnnotations.length > 0) {
        var logoAnnotations = []
        data[0].logoAnnotations.forEach(function (item, index) {
          logoAnnotations.push(item.description)
        });
        obj.data.push ({'logofound': logoAnnotations})
    }else{
    //    obj.data.push ({'logofound': "No logos or brands found on image"})
    }

    // if (data[0].safeSearchAnnotation.length > 0) {
    //     var safeAnnotations = []
    //
    //     data[0].safeAnnotations.forEach(function (item, index) {
    //       safeAnnotations.push(item.description)
    //     });
    //
    //     obj.data.push ({'logofound': safeAnnotations})
    // }
    //
    //     data[0].safeSearchAnnotation.adult

    return obj
};
