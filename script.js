/* VARIABLES */
let enterButton;
let a1Button, a2Button;
let b1Button, b2Button;
let c1Button, c2Button;
let d1Button, d2Button;
let e1Button, e2Button, e3Button;
let restartButton;

let screen = 0;
let marsBg, labBg;

/* PRELOAD ASSETS */
function preload() {
  marsBg = loadImage('assets/marsbg.jpg');
  labBg = loadImage('assets/labandmaint.jpg');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(1400, 1200);
  textFont("Geist Pixel");
  textAlign(CENTER);
  textSize(22);
  angleMode(DEGREES);

  // Create buttons (pooled and positioned off-screen initially)
  enterButton = new Sprite(-200, -200);
  a1Button = new Sprite(-200, -200);
  a2Button = new Sprite(-200, -200);
  b1Button = new Sprite(-200, -200);
  b2Button = new Sprite(-200, -200);
  c1Button = new Sprite(-200, -200);
  c2Button = new Sprite(-200, -200);
  d1Button = new Sprite(-200, -200);
  d2Button = new Sprite(-200, -200);
  e1Button = new Sprite(-200, -200);
  e2Button = new Sprite(-200, -200);
  e3Button = new Sprite(-200, -200);
  restartButton = new Sprite(-200, -200);
}

/* DRAW LOOP REPEATS */
function draw() {
  background(18, 10, 31);

  // HOMESCREEN (Screen 0)
  if (screen == 0) {
    showShapes();
    noStroke();
    fill('#ffe2ab');
    text(
      "You and your fellow astronaut have a 33-day Mars mission\ncoming up to explore and conduct research on the surface of Mars...\nbut are you ready for it?\nLet's see if you have what it takes to manage resources and get through\na 33-day mission to Mars through this simulation!",
      width / 2,
      height / 2 - 180
    );

    // Display Enter Button
    enterButton.w = 240;
    enterButton.h = 80;
    enterButton.collider = 'k';
    enterButton.color = '#ffb067';
    enterButton.text = "Initiate Training";
    enterButton.pos = { x: width / 2, y: height / 2 + 100 };

    if (enterButton.mouse.presses()) {
      hideAllButtons();
      screen = 1; // Decision 1
    }
  }

  // SCREEN 1: DECISION 1 (Base Camp Location)
  else if (screen == 1) {
    drawMarsBackground(marsBg);
    drawTextBox("DAY 1: Landing\n2 crew, 1 pressurized rover, 33 days.\n\nDECISION 1: Where do we park base camp?");

    a1Button.w = 320; a1Button.h = 90; a1Button.collider = 'k'; a1Button.color = '#ffbe82';
    a1Button.text = "Sunny Ridge\n(More solar power, less shielding)";
    a1Button.pos = { x: width / 2 - 200, y: height / 2 + 180 };

    a2Button.w = 320; a2Button.h = 90; a2Button.collider = 'k'; a2Button.color = '#ffcdaf';
    a2Button.text = "Crater Bowl\n(Walls block radiation, less sun)";
    a2Button.pos = { x: width / 2 + 200, y: height / 2 + 180 };

    if (a1Button.mouse.presses() || a2Button.mouse.presses()) {
      hideAllButtons();
      screen = 2; // Timeskip 1 -> Event 1 (Solar Flare Day 10)
    }
  }

  // SCREEN 2: DECISION 2 (Day 10 Solar Flare Alert)
  else if (screen == 2) {
    drawMarsBackground(labBg);
    drawTextBox("DAY 10 EVENT: Solar flare alert from Earth (DONKI data)!\n\nDECISION 2: What do we do?");

    b1Button.w = 340; b1Button.h = 90; b1Button.collider = 'k'; b1Button.color = '#ffb977';
    b1Button.text = "Shelter in storage zone\n(Safe, heaters drain power)";
    b1Button.pos = { x: width / 2 - 200, y: height / 2 + 180 };

    b2Button.w = 340; b2Button.h = 90; b2Button.collider = 'k'; b2Button.color = '#ffc493';
    b2Button.text = "Finish sample drive first\n(Big science win, high radiation)";
    b2Button.pos = { x: width / 2 + 200, y: height / 2 + 180 };

    if (b1Button.mouse.presses() || b2Button.mouse.presses()) {
      hideAllButtons();
      screen = 3; // Timeskip 2 -> Event 2 (Dust storm Day 18)
    }
  }

  // SCREEN 3: DECISION 3 (Day 18 Dust Storm & Power Drop)
  else if (screen == 3) {
    drawMarsBackground(marsBg);
    drawTextBox("DAY 18 EVENT: Dust storm covers solar panels (20-min delay to Earth).\n\nDECISION 3: Power is dropping!");

    c1Button.w = 340; c1Button.h = 90; c1Button.collider = 'k'; c1Button.color = '#a2e8f5';
    c1Button.text = "Switch off science & heaters\n(Save power, lose research)";
    c1Button.pos = { x: width / 2 - 200, y: height / 2 + 180 };

    c2Button.w = 340; c2Button.h = 90; c2Button.collider = 'k'; c2Button.color = '#c3e6eb';
    c2Button.text = "Keep science on\n(More data, risk low air pumps)";
    c2Button.pos = { x: width / 2 + 200, y: height / 2 + 180 };

    if (c1Button.mouse.presses() || c2Button.mouse.presses()) {
      hideAllButtons();
      screen = 4; // Timeskip 3 -> Event 3 (Air scrubber alarm Day 23)
    }
  }

  // SCREEN 4: DECISION 4 (Day 23 Air Scrubber Alarm)
  else if (screen == 4) {
    drawMarsBackground(labBg);
    drawTextBox("DAY 23 EVENT: Air scrubber alarm! CO2 levels rising.\n\nDECISION 4: How do we fix the air?");

    d1Button.w = 340; d1Button.h = 90; d1Button.collider = 'k'; d1Button.color = '#b3e65f';
    d1Button.text = "Repair it now\n(Costs power/science day, safe)";
    d1Button.pos = { x: width / 2 - 200, y: height / 2 + 180 };

    d2Button.w = 340; d2Button.h = 90; d2Button.collider = 'k'; d2Button.color = '#cfe69c';
    d2Button.text = "Use backup scrubber\n(Fast fix, no spares left)";
    d2Button.pos = { x: width / 2 + 200, y: height / 2 + 180 };

    if (d1Button.mouse.presses() || d2Button.mouse.presses()) {
      hideAllButtons();
      screen = 5; // Timeskip 4 -> Event 4 (Day 30 Final window)
    }
  }

  // SCREEN 5: DECISION 5 (Day 30 Final Window & Ending choice)
  else if (screen == 5) {
    drawMarsBackground(marsBg);
    drawTextBox("DAY 30: Final mission window. Fuel and food for one trip.\n\nDECISION 5: Choose your final destination:");

    e1Button.w = 280; e1Button.h = 80; e1Button.collider = 'k'; e1Button.color = '#ff9e6d';
    e1Button.text = "Long drive to far cliffs\n(Biggest discovery / risk)";
    e1Button.pos = { x: width / 2 - 320, y: height / 2 + 180 };

    e2Button.w = 280; e2Button.h = 80; e2Button.collider = 'k'; e2Button.color = '#ffb977';
    e2Button.text = "Short trip near base\n(Safe, steady science)";
    e2Button.pos = { x: width / 2, y: height / 2 + 180 };

    e3Button.w = 280; e3Button.h = 80; e3Button.collider = 'k'; e3Button.color = '#e2afeb';
    e3Button.text = "Skip science & head home\n(Safety first)";
    e3Button.pos = { x: width / 2 + 320, y: height / 2 + 180 };

    if (e1Button.mouse.presses()) {
      hideAllButtons();
      screen = 6; // Ending: Science Star or Close Call
    } else if (e2Button.mouse.presses()) {
      hideAllButtons();
      screen = 7; // Ending: Steady Explorer
    } else if (e3Button.mouse.presses()) {
      hideAllButtons();
      screen = 8; // Ending: Safety First
    }
  }

  // ENDINGS (Screens 6, 7, 8)
  else if (screen >= 6 && screen <= 8) {
    drawMarsBackground(labBg);
    let endingText = "";
    if (screen == 6) endingText = "ENDING: SCIENCE STAR\nGreat discoveries made, tight resources managed!";
    if (screen == 7) endingText = "ENDING: STEADY EXPLORER\nBalanced mission executed with a safe return!";
    if (screen == 8) endingText = "ENDING: SAFETY FIRST\nHealthy crew returned home with careful resource use!";

    drawTextBox(endingText + "\n\nWhat would you trade differently next time?");

    restartButton.w = 220; restartButton.h = 70; restartButton.collider = 'k'; restartButton.color = '#b8acfb';
    restartButton.text = "Replay Mission";
    restartButton.pos = { x: width / 2, y: height / 2 + 180 };

    if (restartButton.mouse.presses()) {
      hideAllButtons();
      screen = 0;
    }
  }
}

/* HELPER FUNCTIONS */

// Draws background image with a dark translucent overlay for text readability
function drawMarsBackground(bgImg) {
  if (bgImg) {
    image(bgImg, 0, 0, width, height);
  }
  fill(18, 10, 31, 200); // Dark tint overlay
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2, width - 100, height - 100, 20);
  rectMode(CORNER);
}

// Draws standardized dialog text boxes
function drawTextBox(txt) {
  fill('#ffe2ab');
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text(txt, width / 2, height / 2 - 80);
}

// Safely hide all sprites offscreen when changing screens
function hideAllButtons() {
  let allBtns = [enterButton, a1Button, a2Button, b1Button, b2Button, c1Button, c2Button, d1Button, d2Button, e1Button, e2Button, e3Button, restartButton];
  for (let b of allBtns) {
    b.pos = { x: -500, y: -500 };
  }
}

/* HOMESCREEN DECORATIVE STARFIELD */
function showShapes() {
  noStroke();
  fill('#ffdecb');
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