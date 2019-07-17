// /\/\ark

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

function getImageAnnotation(img){
    const request = {
      image: {content:img },
      features: [
        {
          type: 'LABEL_DETECTION'
        },
        {
          type: 'TYPE_UNSPECIFIED'
        },
        {
          type: 'LANDMARK_DETECTION'
        },
        {
          type: 'LOGO_DETECTION'
        },
        {
          type: 'TEXT_DETECTION'
        },
        {
          type: 'FACE_DETECTION'
        },
        {
          type: 'WEB_DETECTION'
        },
        {
          type: 'SAFE_SEARCH_DETECTION'
        },

      ]
    };

    return client
      .annotateImage(request)
      .then(results => {
          return results;
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
};
exports.getImageAnnotation =  getImageAnnotation
