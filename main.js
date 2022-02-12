noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550,500);
    canvas = createCanvas(550,550);
    canvas.position(560,150);
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}

function draw() {
    background("#fffff0");
    document.getElementById("square_side").innerHTML="The square is " + difference + " pixels wide and " + difference + " pixels tall.";
    fill("purple");
    stroke("purple");
    square(noseX, noseY, difference);
}

function modelLoaded() {
    console.log("model loaded");
}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("noseX = " + noseX + ", noseY =" + noseY);

        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        difference=floor(leftWristX-rightWristX);
        console.log("leftWristX = " + leftWristX + ", rightWristX =" + rightWristX);
    }
}