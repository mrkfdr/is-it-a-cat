var shareButton = document.getElementById("sharePD");
shareButton.addEventListener("click", async () => {
    try {
        await navigator.share({ title: "PicDataAI image recognition", url: "https://cat-service-dot-gonow-140204.appspot.com/" });
    }
    catch (err) {
            console.error("Share failed:", err.message);
    }
});

var homeButton = document.getElementById("homePD");
homeButton.addEventListener("click", async () => {
    try {
    console.log("kk")
        window.location.replace("https://www.picdata-ai.com/");
    }
    catch (err) {
            console.error("go home failed:", err.message);
    }
});

