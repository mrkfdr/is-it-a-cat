// /\/\ark

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

function getLabelDescription(img){
    const request = {
      image: {content:img }
    };

    return client
      .labelDetection( request )
      .then(results => {
        const labels = results[0].labelAnnotations;
        return labels;
      })
      .catch(err => {
        console.error('ERROR:', err);
    });
};
exports.getLabelDescription =  getLabelDescription
