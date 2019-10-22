var spiral;
var mic;
var capture;
var errors;
var myError1;
var myError2;
var myError3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(52);
  //for framecount
  frameRate(10);


  // Create an audio input microphone
  mic = new p5.AudioIn();
  // start the audio input by microphone
  mic.start();

  capture = createCapture(VIDEO);
  capture.size(600, 400);
  capture.hide();//la mostro dopo


  // funzione 1 da webcam
  spiral = new Spiral(300, 150, 10);

  // funzione 2
  errors = new Errors(2, 2, 2);
  // funzione 3
  errors2 = new Errors2(2, 2, 2);

  myError1 = loadImage("./assets/error1.jpg");
  myError2 = loadImage("./assets/error2.jpg");
  myError3 = loadImage("./assets/error3.jpg");


}

  var go = false;

  function ready() {
  go = true;}

function draw() {
  //text
  push();
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);
  textSize(10);
  text("PRESS ENTER TO MOVE YOUR FACE AND TO MAKE NICE COMPOSITIONS (react with the sound of your voice)", windowWidth / 2, windowHeight / 1.1);
  pop();

  //funzione webcam
  spiral.move();
  spiral.display();
  for (var i = 0; i < windowWidth; i++) {
    spiralTre = new Spiral(i, 400, 60);
  }

//funzione errore 1
  errors.move();
  errors.display();
  for (var i = 0; i < windowWidth; i++) {
    errorsDue = new Errors(2, i, 2);
  }

//funzione errore 2
  errors2.move();
  errors2.display();
  for (var i = 0; i < windowWidth; i++) {
    errors2Due = new Errors2(2, i, 2);
  }
}
//webcam input
function Spiral(_x, _y, _diameter) {
  this.x = _x;
  this.y = _y;
  this.size = _diameter;
  // this.color = 'blue';

  this.start = 10;
  this.angle = 90;
  this.speed = 0.1;
  this.distance = this.speed * 4;

  this.move = function() {
    this.x = cos(-this.angle) * this.start; //crea una spirale - tunnel
    this.y = sin(-this.angle) * this.start;
    this.angle -= this.speed;
    this.start = this.start - this.distance;
  }

  this.display = function() {
    translate(width / 2, height / 2);
    // fill(this.color);
    // stroke(this.color);
    // fill(200, 30, col, 5);
    imageMode(CENTER);
    var myImage = capture.loadPixels();
    var vol = mic.getLevel();
    var col = vol * 20;
    rotate((frameCount) * (vol * 5));

    // if (vol <= 0.1) {
    //   image(myImage, this.x*0 , this.y *0, this.size * vol * 50);
    // } else if (vol > 0.1) {
    //   image(myImage, this.x, this.y, this.size * vol * 50);
    // }

    if (keyIsPressed === true) {
      this.angle -= this.speed / 100
      this.start = random(-100, 100);
    } else {
      this.angle -= this.speed;
      this.start = this.start - this.distance;
    }
    image(myImage, this.x, this.y, this.size * col);
    console.log(vol);
  }

}
//errore window
function Errors(_x, _y, _diameter) {
  this.x = _x;
  this.y = _y;
  this.size = _diameter;

  this.start = 2;
  this.angle = 90;
  this.speed = 0.1;
  this.distance = this.speed * 4;

  this.move = function() {
    this.x = this.angle * this.start;
    this.y = this.angle * this.start;
    this.angle -= this.speed;
    this.start = this.start - this.distance;
  }

  this.display = function() {
    translate(width / 2, height / 2);
    imageMode(CENTER);

    if (keyIsPressed === true) {
      this.angle -= this.speed / 100
      this.start = random(-100, 100);
    } else {
      this.angle -= this.speed;
      this.start = this.start - this.distance;
    }

    image(myError1, this.x, this.y, myError1.width, myError1.height);
    // image(myError2, this.x, this.y, this.size / 2);
    // image(myError3, this.x, this.y, this.size / 40);
  }
}
//errore window 2
function Errors2(_x, _y, _diameter) {
  this.x = _x;
  this.y = _y;
  this.size = _diameter;

  this.start = 2;
  this.angle = 90;
  this.speed = 0.1;
  this.distance = this.speed * 4;

  this.move = function() {
    this.x = this.angle * this.start;
    this.y = this.angle * this.start;
    this.angle += this.speed;
    this.start = this.start - this.distance;
  }

  this.display = function() {
    translate(width / 2, height / 2);
    imageMode(CENTER);

    if (keyIsPressed === true) {
      this.angle += this.speed / 150
      this.start = random(-100, 100);
    } else {
      this.angle += this.speed;
      this.start = this.start - this.distance;
    }

    // image(myError1, this.x, this.y, myError1.width, myError1.height);
    image(myError2, this.x, this.y, myError2.width/4, myError2.height/4);
    // image(myError3, this.x, this.y, this.size / 40);
  }
}
