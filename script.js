// Press a button to choose your path
// See the README file for more information

/* VARIABLES */
let enterButton;
let a1Button;
let a2Button;
let b1Button;
let b2Button;
let screen = 0;

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(1400, 1200);
  fill('#ffe2ab');
  textFont("Geist Pixel")
  textAlign(CENTER);
  textSize(20);
  noStroke();
  angleMode(DEGREES);

  // Set up the home screen
  background("#240331");
  text(
    "You and your fellow astronaut have a 33-day Mars mission \ncoming up to explore and conduct research on the surface of Mars... \nbut are you ready for it? \nLet's see if you have what it takes to manage resources and get through \na 33 day mission to Mars through this simulation!",
    width / 2,
    height / 2 - 100
  );

  // Create buttons for all screens
  enterButton = new Sprite(width/2, height/2 + 120);
  a1Button = new Sprite(-200, -200);
  a2Button = new Sprite(-50, -50);
  b1Button = new Sprite(-100, -100);
  b2Button = new Sprite(-150, -150);

}

/* DRAW LOOP REPEATS */
function draw() {
  // Display enter button
  enterButton.w = 170;
  enterButton.h = 80;
  enterButton.collider = 'k';
  enterButton.color = '#ffb067';
  enterButton.text = "Initiate Training";


  // Homescreen design
  if (screen == 0) {
    showShapes();
    noStroke();
    fill('#4d2439');
  }

  // Check enter button
  if(enterButton.mouse.presses()) {
    print("pressed");
    showScreen1();
    screen = 1;
  }

  // Displaying either screen 2 or 5
  if (screen == 1) {
    if (a1Button.mouse.presses()) {
      print("Display screen 2");
      showScreen2();
      screen = 2;
    } 
    else if (a2Button.mouse.presses()) {
      print("Display screen 5");
      showScreen5();
      screen = 5;
    }
    
  }
  else if (screen == 2) {
    if (b1Button.mouse.presses()) {
      showScreen3();
      screen = 3;
    }
    else if (b2Button.mouse.presses()) {
      showScreen4();
      screen = 4;
    }
  }

  print(screen);

}

/* FUNCTIONS TO DISPLAY SCREENS */
function showScreen1() {
  background("#E8D0F5");
  text("decision 1", width/2, height/2 - 70);
  enterButton.pos = {x: -50, y: -50};
    
  // Add A1 button
  a1Button.w = 70;
  a1Button.h = 50;
  a1Button.collider = 'k';
  a1Button.color = 'rgb(255, 190, 130)';
  a1Button.text = "choice 1";
  a1Button.pos = {x: width/2 - 50, y: height/2 + 100};
    
  // Add A2 button
  a2Button.w = 70;
  a2Button.h = 50;
  a2Button.collider ='k';
  a2Button.color = '#ffcdaf';
  a2Button.text = "choice 2";
  a2Button.pos = {x: width/2 + 50, y: height/2 + 100};
}

function showScreen2() {
  background('#ffb969');
  text("decision 2" );

  // Draw off A1 and A2 Buttons
  a1Button.pos = {x: -200, y: -200};
  a2Button.pos = {x: -50, y: -50};

  // Add B1 Button
  b1Button.w = 150;
  b1Button.h = 80;
  b1Button.collider = 'k';
  b1Button.color = '#ffb977';
  b1Button.text = "choice 1";
  b1Button.pos = {x: width/2 - 95, y: height/2 + 100};

  // Add B2 Button
  b2Button.w = 150;
  b2Button.h = 80;
  b2Button.collider = 'k';
  b2Button.color = '#ffc493';
  b2Button.text = "choice 2";
  b2Button.pos = {x: width/2 + 95, y: height/2 + 100};
}

function showScreen3() {
  background("#c3e6eb");
  text("decision 3", width/2, height/2 - 100);
  // move b1 and b2 off screen
  b1Button.pos = {x: -50, y: -50};
  b2Button.pos = {x: -67, y: -67};
}

function showScreen4() {
  background("#DFF0E6");
  text("next scene", width/2, height/2 - 70);
  // move b1 and b2 off screen
  b1Button.pos = {x: -50, y: -50};
  b2Button.pos = {x: -67, y: -67};
}

function showScreen5() {
  background('#823737');
  fill('#ffe6d2')
  text("next scene.", width/2, height/2-70);
  // Draw off A1 and A2 Buttons
  a1Button.pos = {x: -200, y: -200};
  a2Button.pos = {x: -50, y: -50};
}

function showShapes() {
   noStroke();
  fill('#ffdecb');
  
  // Custom scattering across 1200 width x 1400 height
  let starCoords = [
    [50, 120], [120, 450], [230, 80], [310, 600], [420, 200],
    [550, 850], [680, 150], [750, 500], [820, 920], [950, 300],
    [1050, 700], [1120, 1100], [180, 1050], [350, 1250], [600, 1350],
    [850, 1150], [1000, 900], [1150, 400], [90, 750], [450, 1000]
  ];

  for (let i = 0; i < starCoords.length; i++) {
    let sSize = (i % 3 === 0) ? 5 : (i % 2 === 0 ? 4 : 3);
    circle(starCoords[i][0], starCoords[i][1], sSize);
  }
}
