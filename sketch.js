var spiral;
var mic;
var capture;

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
  capture.hide();

  // var myFeed = capture.loadPixels();
  spiral = new Spiral(300, 150, 10);

}

var go = false;

function ready() {
  go = true;
}

function draw() {
  spiral.move();
  spiral.display();

  for (var i = 0; i < windowWidth; i++) {
    spiralTre = new Spiral(i, 400, 60);
  }
}

function Spiral(_x, _y, _diameter) {
  this.x = _x;
  this.y = _y;
  this.size = _diameter;
  this.color = 'blue';

  this.start = 10;
  this.angle = 90;
  this.speed = 0.1;
  this.distance = this.speed * 4;

  this.move = function() {
    this.x = cos(-this.angle) * this.start;
    this.y = sin(-this.angle) * this.start;
    this.angle -= this.speed;
    this.start = this.start - this.distance;
  }

  this.display = function() {
    translate(width / 2, height / 2);

    // fill(this.color);
    stroke(this.color);
    imageMode(CENTER);
    fill(200, 30, col, 5);
    var myImage = capture.loadPixels();
    var vol = mic.getLevel();
    var col = vol * 20;
    rotate((frameCount)*(vol*5));

    // if (vol <= 0.1) {
    //   image(myImage, this.x*0 , this.y *0, this.size * vol * 50);
    // } else if (vol > 0.1) {
    //   image(myImage, this.x, this.y, this.size * vol * 50);
    // }
    if (keyIsPressed === true) {
        this.angle -= this.speed/100
        this.start = random(-100, 100);
    } else {
      this.angle -= this.speed;
      this.start = this.start - this.distance;
    }

    image(myImage, this.x, this.y, this.size * col);
    console.log(vol);

  }
}
