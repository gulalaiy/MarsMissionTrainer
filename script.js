/* VARIABLES */
let enterButton;
let a1Button, a2Button;
let next1Button;
let b1Button, b2Button;
let next2Button;
let c1Button, c2Button;
let next3Button;
let d1Button, d2Button;
let next4Button;
let e1Button, e2Button, e3Button;
let restartButton;

let screen = 0;

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(1400, 1200);
  textFont("Geist Pixel");
  textAlign(CENTER);
  textSize(25);
  angleMode(DEGREES);


  // Create buttons (positioned off-screen initially)
  enterButton = new Sprite(-200, -200);
  a1Button = new Sprite(-200, -200);
  a2Button = new Sprite(-200, -200);
  next1Button = new Sprite(-200, -200);
  b1Button = new Sprite(-200, -200);
  b2Button = new Sprite(-200, -200);
  next2Button = new Sprite(-200, -200);
  c1Button = new Sprite(-200, -200);
  c2Button = new Sprite(-200, -200);
  next3Button = new Sprite(-200, -200);
  d1Button = new Sprite(-200, -200);
  d2Button = new Sprite(-200, -200);
  next4Button = new Sprite(-200, -200);
  e1Button = new Sprite(-200, -200);
  e2Button = new Sprite(-200, -200);
  e3Button = new Sprite(-200, -200);
  restartButton = new Sprite(-200, -200);
}

/* DRAW LOOP REPEATS */
function draw() {
  // HOMESCREEN (Screen 0)
  if (screen == 0) {

    // Display homescreen
    background("#180B24");
    showStarfield();
    
    noStroke();
    fill('#ffe2ab');
    textSize(30)
    text(
      "You and your fellow astronaut have a 33-day Mars mission\ncoming up to explore and conduct research on the surface of Mars...\nbut are you ready for it?\nLet's see if you have what it takes to manage resources and get through\na 33-day mission to Mars through this simulation!",
      width / 2,
      height / 2 - 160
    );

    // Display Enter Button
    enterButton.w = 240;
    enterButton.h = 80;
    enterButton.collider = 'k';
    enterButton.color = '#ffb067';
    enterButton.text = "Initiate Training";
    enterButton.pos = { x: width / 2, y: height / 2 + 130 };

    if (enterButton.mouse.presses()) {
      hideAllButtons();
      screen = 1; // Decision 1
    }
  }

  // SCREEN 1: DECISION 1 (Base Camp Location)
  else if (screen == 1) {
    background("#4A1525");
    drawTextBox("DAY 1: Landing\n2 crew, 1 pressurized rover, 33 days.\n\nDECISION 1: Where do we park base camp?");

    a1Button.w = 450; a1Button.h = 90; a1Button.collider = 'k'; a1Button.color = '#ffbe82';
    a1Button.text = "Sunny Ridge\n(More solar power, less shielding)";
    a1Button.pos = { x: width / 2 - 240, y: height / 2 + 180 };
    a1Button.rotation = 0;

    a2Button.w = 450; a2Button.h = 90; a2Button.collider = 'k'; a2Button.color = '##ffbe82';
    a2Button.text = "Crater Bowl\n(Walls block radiation, less sun)";
    a2Button.pos = { x: width / 2 + 240, y: height / 2 + 180 };
    a2Button.rotation = 0;

    if (a1Button.mouse.presses() || a2Button.mouse.presses()) {
      hideAllButtons();
      screen = 2; // Timeskip 1 & Educational Task
    }
  }

  // SCREEN 2: TIMESKIP 1 & EDUCATIONAL TASK (Days 2 to 9)
  else if (screen == 2) {
    background("#12263A");
    drawTextBox("TIMESKIP (Days 2 to 9): Scan Martian Samples\n\nEducational Task:\nAstronauts use spectrometers to analyze rock mineral composition.\nUnderstanding iron oxide dust helps us determine surface habitability\nand locate potential water ice deposits beneath the soil.");

    next1Button.w = 260; next1Button.h = 80; next1Button.collider = 'k'; next1Button.color = '#9CE6FF';
    next1Button.text = "Continue to Event 1";
    next1Button.pos = { x: width / 2, y: height / 2 + 180 };
    next1Button.rotation = 0;

    if (next1Button.mouse.presses()) {
      hideAllButtons();
      screen = 3; // Event 1 / Decision 2 (Solar Flare)
    }
  }

  // SCREEN 3: EVENT 1 & DECISION 2 (Day 10 Solar Flare Alert)
  else if (screen == 3) {
    background("#4A1525");
    drawTextBox("DAY 10 EVENT: Solar flare alert from Earth (Real NASA DONKI data)!\n\nDECISION 2: What do we do?");

    b1Button.w = 420; b1Button.h = 90; b1Button.collider = 'k'; b1Button.color = '#ffb977';
    b1Button.text = "Shelter in storage zone\n(Safe, heaters drain power)";
    b1Button.pos = { x: width / 2 - 230, y: height / 2 + 180 };
    b1Button.rotation = 0;

    b2Button.w = 420; b2Button.h = 90; b2Button.collider = 'k'; b2Button.color = '#ffc493';
    b2Button.text = "Finish sample drive first\n(Big science win, high radiation)";
    b2Button.pos = { x: width / 2 + 230, y: height / 2 + 180 };
    b2Button.rotation = 0;

    if (b1Button.mouse.presses() || b2Button.mouse.presses()) {
      hideAllButtons();
      screen = 4; // Timeskip 2 & Educational Task
    }
  }

  // SCREEN 4: TIMESKIP 2 & EDUCATIONAL TASK (Days 11 to 17)
  else if (screen == 4) {
    background("#12263A");
    drawTextBox("TIMESKIP (Days 11 to 17): Nutritional Meal Preparation\n\nEducational Task:\nLong-duration space missions require carefully balanced nutrients.\nAstronauts monitor caloric intake and hydration closely\nto prevent muscle atrophy and bone density loss in low gravity.");

    next2Button.w = 260; next2Button.h = 80; next2Button.collider = 'k'; next2Button.color = '#9CE6FF';
    next2Button.text = "Continue to Event 2";
    next2Button.pos = { x: width / 2, y: height / 2 + 180 };
    next2Button.rotation = 0;

    if (next2Button.mouse.presses()) {
      hideAllButtons();
      screen = 5; // Event 2 / Decision 3 (Dust Storm)
    }
  }

  // SCREEN 5: EVENT 2 & DECISION 3 (Day 18 Dust Storm & Power Drop)
  else if (screen == 5) {
    background("#4A1525");
    drawTextBox("DAY 18 EVENT: Dust storm covers solar panels (20-min communication delay).\n\nDECISION 3: Power is dropping!");

    c1Button.w = 370; c1Button.h = 90; c1Button.collider = 'k'; c1Button.color = '#a2e8f5';
    c1Button.text = "Switch off science & heaters\n(Save power, lose research)";
    c1Button.pos = { x: width / 2 - 200, y: height / 2 + 180 };
    c1Button.rotation = 0;

    c2Button.w = 390; c2Button.h = 90; c2Button.collider = 'k'; c2Button.color = '#c3e6eb';
    c2Button.text = "Keep science on\n(More data, risk low air pumps)";
    c2Button.pos = { x: width / 2 + 200, y: height / 2 + 180 };
    c2Button.rotation = 0;

    if (c1Button.mouse.presses() || c2Button.mouse.presses()) {
      hideAllButtons();
      screen = 6; // Timeskip 3 & Educational Task
    }
  }

  // SCREEN 6: TIMESKIP 3 & EDUCATIONAL TASK (Days 19 to 22)
  else if (screen == 6) {
    background("#12263A");
    drawTextBox("TIMESKIP (Days 19 to 22): Cleaning Solar Panels\n\nEducational Task:\nFine Martian dust clings to panels via electrostatic forces.\nRegular maintenance and sweeping are essential to restore\nphotovoltaic efficiency and maintain outpost power generation.");

    next3Button.w = 260; next3Button.h = 80; next3Button.collider = 'k'; next3Button.color = '#9CE6FF';
    next3Button.text = "Continue to Event 3";
    next3Button.pos = { x: width / 2, y: height / 2 + 180 };
    next3Button.rotation = 0;

    if (next3Button.mouse.presses()) {
      hideAllButtons();
      screen = 7; // Event 3 / Decision 4 (Air Scrubber Alarm)
    }
  }

  // SCREEN 7: EVENT 3 & DECISION 4 (Day 23 Air Scrubber Alarm)
  else if (screen == 7) {
    background("#4A1525");
    drawTextBox("DAY 23 EVENT: Air scrubber alarm! CO2 levels rising in habitat.\n\nDECISION 4: How do we fix the air?");

    d1Button.w = 390; d1Button.h = 90; d1Button.collider = 'k'; d1Button.color = '#b3e65f';
    d1Button.text = "Repair it now\n(Costs power/science day, safe)";
    d1Button.pos = { x: width / 2 - 200, y: height / 2 + 180 };
    d1Button.rotation = 0;

    d2Button.w = 380; d2Button.h = 90; d2Button.collider = 'k'; d2Button.color = '#cfe69c';
    d2Button.text = "Use backup scrubber\n(Fast fix, no spares left)";
    d2Button.pos = { x: width / 2 + 200, y: height / 2 + 180 };
    d2Button.rotation = 0;

    if (d1Button.mouse.presses() || d2Button.mouse.presses()) {
      hideAllButtons();
      screen = 8; // Timeskip 4 & Educational Task
    }
  }

  // SCREEN 8: TIMESKIP 4 & EDUCATIONAL TASK (Days 24 to 29)
  else if (screen == 8) {
    background("#12263A");
    drawTextBox("TIMESKIP (Days 24 to 29): Rover Checks & Maintenance\n\nEducational Task:\nMars rovers require rigorous daily telemetry checks and mechanical maintenance.\nMonitoring actuator wear, wheel traction, and power distribution systems ensures\nlong-term operational survival in the harsh, abrasive dust environment.");

    next4Button.w = 340; next4Button.h = 80; next4Button.collider = 'k'; next4Button.color = '#9CE6FF';
    next4Button.text = "Continue to Final Window";
    next4Button.pos = { x: width / 2, y: height / 2 + 180 };
    next4Button.rotation = 0;

    if (next4Button.mouse.presses()) {
      hideAllButtons();
      screen = 9; // Event 4 / Decision 5 (Day 30 Final Window)
    }
  }

  // SCREEN 9: EVENT 4 & DECISION 5 (Day 30 Final Window & Ending choice)
  else if (screen == 9) {
    background("#4A1525");
    drawTextBox("DAY 30: Final mission window. Fuel and food for one trip.\n\nDECISION 5: Choose your final destination:");

    e1Button.w = 320; e1Button.h = 80; e1Button.collider = 'k'; e1Button.color = '#ff9e6d';
    e1Button.text = "Long drive to far cliffs\n(Biggest discovery / risk)";
    e1Button.pos = { x: width / 2 - 330, y: height / 2 + 180 };
    e1Button.rotation = 0;

    e2Button.w = 320; e2Button.h = 80; e2Button.collider = 'k'; e2Button.color = '#ffb977';
    e2Button.text = "Short trip near base\n(Safe, steady science)";
    e2Button.pos = { x: width / 2, y: height / 2 + 180 };
    e2Button.rotation = 0;

    e3Button.w = 320; e3Button.h = 80; e3Button.collider = 'k'; e3Button.color = '#e2afeb';
    e3Button.text = "Skip science & head home\n(Safety first)";
    e3Button.pos = { x: width / 2 + 330, y: height / 2 + 180 };
    e3Button.rotation = 0;

    if (e1Button.mouse.presses()) {
      hideAllButtons();
      screen = 10; 
    } else if (e2Button.mouse.presses()) {
      hideAllButtons();
      screen = 11; 
    } else if (e3Button.mouse.presses()) {
      hideAllButtons();
      screen = 12; 
    }
  }

  // ENDINGS (Screens 10, 11, 12)
  else if (screen >= 10 && screen <= 12) {
    background("#12263A");
    let endingText = "";
    if (screen == 10) endingText = "ENDING: SCIENCE STAR\nGreat discoveries made, tight resources managed!";
    if (screen == 11) endingText = "ENDING: STEADY EXPLORER\nBalanced mission executed with a safe return!";
    if (screen == 12) endingText = "ENDING: SAFETY FIRST\nHealthy crew returned home with careful resource use!";

    drawTextBox(endingText + "\n\nWhat would you trade differently next time?");

    restartButton.w = 220; restartButton.h = 70; restartButton.collider = 'k'; restartButton.color = '#b8acfb';
    restartButton.text = "Replay Mission";
    restartButton.pos = { x: width / 2, y: height / 2 + 180 };
    restartButton.rotation = 0;

    if (restartButton.mouse.presses()) {
      hideAllButtons();
      screen = 0;
    }
  }
}

/* HELPER FUNCTIONS */

function drawTextBox(txt) {
  fill('#ffe2ab');
  noStroke();
  textSize(28);
  textAlign(CENTER, CENTER);
  text(txt, width / 2, height / 2 - 80);
}

function hideAllButtons() {
  let allBtns = [
    enterButton, a1Button, a2Button, next1Button,
    b1Button, b2Button, next2Button,
    c1Button, c2Button, next3Button,
    d1Button, d2Button, next4Button,
    e1Button, e2Button, e3Button, restartButton
  ];
  for (let b of allBtns) {
    b.pos = { x: -500, y: -500 };
  }
}

function showStarfield() {
  noStroke();
  fill('#ffdecb');
  let starCoords = [
    [40, 100], [130, 430], [220, 70], [300, 610], [410, 210],
    [540, 840], [670, 160], [760, 520], [830, 930], [940, 320],
    [1040, 710], [1160, 1080], [170, 1040], [340, 1240], [600, 1360],
    [860, 1160], [1010, 900], [1150, 400], [80, 760], [460, 1000]
  ];

  for (let i = 0; i < starCoords.length; i++) {
    let sSize = (i % 3 === 0) ? 5 : (i % 2 === 0 ? 4 : 3);
    circle(starCoords[i][0], starCoords[i][1], sSize);
  }
}
