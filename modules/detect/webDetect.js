// /\/\ark

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

function getWebEnteties(img){
    let image = {content: img };
    return client
      .webDetection( {image})
      .then(results => {
        const webDetection = results[0].webDetection;
        //console.log(results)
        //logResults(webDetection);
        return webDetection;
      })
      .catch(err => {
        console.error('ERROR:', err);
    });
};

function logResults(webDetection){
    if (webDetection.fullMatchingImages.length) {
         console.log(
           `Full matches found: ${webDetection.fullMatchingImages.length}`
         );
         webDetection.fullMatchingImages.forEach(image => {
           console.log(`  URL: ${image.url}`);
           console.log(`  Score: ${image.score}`);
         });
       }

       if (webDetection.partialMatchingImages.length) {
         console.log(
           `Partial matches found: ${webDetection.partialMatchingImages.length}`
         );
         webDetection.partialMatchingImages.forEach(image => {
           console.log(`  URL: ${image.url}`);
           console.log(`  Score: ${image.score}`);
         });
       }

       if (webDetection.webEntities.length) {
         console.log(`Web entities found: ${webDetection.webEntities.length}`);
         webDetection.webEntities.forEach(webEntity => {
           console.log(`  Description: ${webEntity.description}`);
           console.log(`  Score: ${webEntity.score}`);
         });
       }

       if (webDetection.bestGuessLabels.length) {
         console.log(
           `Best guess labels found: ${webDetection.bestGuessLabels.length}`
         );
         webDetection.bestGuessLabels.forEach(label => {
           console.log(`  Label: ${label.label}`);
         });
       }


};

exports.getWebEnteties =  getWebEnteties
