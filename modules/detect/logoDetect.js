// /\/\ark

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

function getLogoEnteties(img){
    let image = {content: img };

     return client
       .logoDetection( {image} )
       .then(results => {
         const logos = results[0].logoAnnotations;
         //console.log('Logos:');
         //logos.forEach(logo =>
            // console.log(logo));
         return logos

       })
       .catch(err => {
         console.error('ERROR:', err);
       });
};

exports.getLogoEnteties =  getLogoEnteties
