var constraints = {
        video:true,// { facingMode: "environment" },
        facingMode: "environment" ,
        audio: false
    };
const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")
const catM = new catModule();
var track;

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
    .catch(function(error) {
        console.log("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    catM.returnResultPage(cameraOutput.src);
    track.stop();
    //document.documentElement.requestFullscreen();
};

window.addEventListener("load", cameraStart, false);
