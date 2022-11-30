song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
} 

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(420, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = " + scoreRightWrist + " ,Score Left Wrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " ,Right Wrist Y = " + rightWristY);

        leftWristX = (results[0].pose.leftWrist.x) - 150;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + ' ,Left Wrist Y = ' + leftWristY);
    }
} 

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#2596be");
    stroke("#2596be");

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        inNumber = Number(leftWristY);
        console.log(inNumber);

        removeDecimals = floor(inNumber);
        console.log(removeDecimals);

        volume = removeDecimals/500;
        console.log(volume);

        document.getElementById("volume").innerHTML = "volume = " +volume;
        song.setVolume(volume);
    }

    if (scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20)
        
        if (rightWristY > 0 && rightWristY <= 100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "speed = 0.5x";
        }

        else if (rightWristY > 100 && rightWristY <= 200){
            song.rate(1);
            document.getElementById("speed").innerHTML = "speed = 1x";
        }

        else if (rightWristY > 200 && rightWristY <= 300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "speed = 1.5x";
        }

        else if (rightWristY > 300 && rightWristY <= 400){
            song.rate(2);
            document.getElementById("speed").innerHTML = "speed = 2x";
        }

        else if (rightWristY > 400 && rightWristY <= 500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "speed = 2.5x";
        }

    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
   console.log("model loaded");
}