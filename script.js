let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById('info');

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

// Get random image from https://www.unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=nature";

// When image loads
image.onload = async function () {
    endTime = new Date().getTime();

    // Get image size
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

// Function to calculate speed
function calculateSpeed() {
    // Time taken is seconds
    let timeDuration = (endTime - startTime) / 1000;
    // Total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // If all tests are completed, (we get 5 images then calculate the average)
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        // Display average speeds
        bitSpeed.innerHTML += `${averageSpeedInBps}B/s`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}KB/s`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}MB/s`;
        info.innerHTML = "Test completed!";
    } else {
        // Run the next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// Initial function to start test
const init = async () => {
    info.innerHTML = "Running the tests..."
    startTime = new Date().getTime();
    image.src = imageApi;
};

// Run tests when window loads
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};