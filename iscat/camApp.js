var constraints = { video: { facingMode: "environment" }, audio: false };
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
        console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    imageTaken = cameraSensor.toDataURL("image/jpeg");
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    catM.returnResultPage(cameraOutput.src);
    track.stop();
};

window.addEventListener("load", cameraStart, false);
