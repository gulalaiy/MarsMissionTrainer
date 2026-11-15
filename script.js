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
let marsBg, labandmaintBg, foodBg, spectrometryBg, roverBg, cleanPanelsBg, dirtyPanelsBg;
let idleAstronaut1, idleAstronaut2;
let idleAstronaut1Img, idleAstronaut2Img, alertAstronautImg, happyAstronautImg, worriedAstronautImg;

let screen = 0;
let panelsCleaned = false;

function preload() {
  marsBg = loadImage("assets/marsbg.png");
  labandmaintBg = loadImage("assets/labandmaint.png");
  foodBg = loadImage("assets/food.png");
  spectrometryBg = loadImage("assets/spectrometry.png")
  roverBg = loadImage("assets/rovercheck.png");
  dirtyPanelsBg = loadImage("assets/dirtypanels.png");
  cleanPanelsBg = loadImage("assets/cleanpanels.png");
  idleAstronaut1Img = loadImage("assets/idleastronaut1.png");
  idleAstronaut2Img = loadImage("assets/idleastronaut2.png");
  alertAstronautImg = loadImage("assets/alertastronaut.png");
  happyAstronautImg = loadImage("assets/happyastronaut.png");
  worriedAstronautImg = loadImage("assets/worriedastronaut.png");
}

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
    // 1. Set a solid background color to fill the empty borders instead of stretching
    background('#180B24'); 

    // 2. Draw the background image while keeping its exact aspect ratio
    imageMode(CENTER);
    
    // Calculate proportional height based on your canvas width to avoid squishing
    let imgAspect = labandmaintBg.width / labandmaintBg.height;
    let drawWidth = width; // or set a custom max width like 1200
    let drawHeight = drawWidth / imgAspect;
    
    image(labandmaintBg, width / 2, height / 2, drawWidth, drawHeight);

    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("DAY 1: Landing", width / 2, height / 2 - 420);
    noStroke();

    // Display astronauts
    image(idleAstronaut1Img, 250, height / 2 + 25, 750, 880); // x, y, width, height
    image(idleAstronaut2Img, width - 250, height / 2 + 77, 750, 880);


    // Transculent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white');
    text("2 crew, 1 pressurized rover, 33 days. Where do we park base camp?", width / 2, height / 2 + 240);

    a1Button.w = 450; a1Button.h = 85; a1Button.collider = 'k'; a1Button.color = '#ffbe82';
    a1Button.visible = true;
    a1Button.text = "Sunny Ridge\n(More solar power, less shielding)";
    a1Button.pos = { x: width / 2 - 240, y: height / 2 + 330 };
    a1Button.rotation = 0;

    a2Button.w = 450; a2Button.h = 85; a2Button.collider = 'k'; a2Button.color = '#ffdab8';
    a2Button.text = "Crater Bowl\n(Walls block radiation, less sun)";
    a2Button.pos = { x: width / 2 + 240, y: height / 2 + 330 };
    a2Button.rotation = 0;

    if (a1Button.mouse.presses() || a2Button.mouse.presses()) {
      hideAllButtons();
      screen = 2; // Timeskip 1 & Educational Task
    }
  }

  // SCREEN 2: TIMESKIP 1 & EDUCATIONAL TASK (Days 2 to 9)
  else if (screen == 2) {
    // 1. Set a solid background color to fill the empty borders instead of stretching
    background('#180B24'); 

    // 2. Draw the background image while keeping its exact aspect ratio
    imageMode(CENTER);
    
    // Calculate proportional height based on your canvas width to avoid squishing
    let imgAspect = spectrometryBg.width / spectrometryBg.height;
    let drawWidth = width; // or set a custom max width like 1200
    let drawHeight = drawWidth / imgAspect;

    image(spectrometryBg, width / 2, height / 2, drawWidth, drawHeight);

    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Day 5 Task: Scan Martian Samples",  width / 2, height / 2 - 420);
    noStroke();

    // Transculent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white');
    textSize(25);
    text("Astronauts use spectrometers to analyze rock mineral composition. Understanding iron oxide\n dust helps us determine surface habitability and locate potential water ice deposits \nbeneath the soil.", width / 2, height / 2 + 258);

    next1Button.w = 260; next1Button.h = 61; next1Button.collider = 'k'; next1Button.color = '#ffe7b2';
    next1Button.text = "Continue to Event 1";
    next1Button.pos = { x: width / 2, y: height / 2 + 343 };
    next1Button.rotation = 0;

    if (next1Button.mouse.presses()) {
      hideAllButtons();
      screen = 3; // Event 1 / Decision 2 (Solar Flare)
    }
  }

  // SCREEN 3: EVENT 1 & DECISION 2 (Day 10 Solar Flare Alert)
  else if (screen == 3) {
    // 1. Set a solid background color to fill the empty borders instead of stretching
    background('#180B24'); 

    // 2. Draw the background image while keeping its exact aspect ratio
    imageMode(CENTER);
    
    // Calculate proportional height based on your canvas width to avoid squishing
    let imgAspect = marsBg.width / marsBg.height;
    let drawWidth = width; // or set a custom max width like 1200
    let drawHeight = drawWidth / imgAspect;

    image(marsBg, width / 2, height / 2, drawWidth, drawHeight);

    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("DAY 10: Solar flare alert from Earth!", width / 2, height / 2 - 420);
    noStroke();

    // Alert astronaut
    image(alertAstronautImg, 140, height / 2 - 80, 350, 400);


    // Transculent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white');
    textSize(25);
    text("What do we do? Shelter in the storage zone is safe but the heater drains our power reserves... \nwhile finishing the sample risks high radiation but it will accelerate our scientific discoveries." , width / 2, height / 2 + 240);


    b1Button.w = 420; b1Button.h = 85; b1Button.collider = 'k'; b1Button.color = '#ffb977';
    b1Button.text = "Shelter in storage zone\n(Safe, heaters drain power)";
    b1Button.pos = { x: width / 2 - 230, y: height / 2 + 320 };
    b1Button.rotation = 0;

    b2Button.w = 420; b2Button.h = 85; b2Button.collider = 'k'; b2Button.color = '#ffc493';
    b2Button.text = "Finish sample drive first\n(Big science win, high radiation)";
    b2Button.pos = { x: width / 2 + 230, y: height / 2 + 320 };
    b2Button.rotation = 0;

    if (b1Button.mouse.presses() || b2Button.mouse.presses()) {
      hideAllButtons();
      screen = 4; // Timeskip 2 & Educational Task
    }
  }

  // SCREEN 4: TIMESKIP 2 & EDUCATIONAL TASK (Days 11 to 17)
  else if (screen == 4) {
    // 1. Set a solid background color to fill the empty borders instead of stretching
    background('#180B24'); 

    // 2. Draw the background image while keeping its exact aspect ratio
    imageMode(CENTER);
    
    // Calculate proportional height based on your canvas width to avoid squishing
    let imgAspect = foodBg.width / foodBg.height;
    let drawWidth = width; // or set a custom max width like 1200
    let drawHeight = drawWidth / imgAspect;

    image(foodBg, width / 2, height / 2, drawWidth, drawHeight);

    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Day 15 Task: Nutritional Meal Preparation", width / 2, height / 2 - 420 );
    noStroke();

    // Transculent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white');
    textSize(26);
    text("Long-duration space missions require carefully balanced nutrients. Astronauts monitor caloric \nintake and hydration closely to prevent muscle atrophy and bone density loss in low gravity." , width / 2, height / 2 + 260);

    next2Button.w = 260; next2Button.h = 70; next2Button.collider = 'k'; next2Button.color = '#ffc49d';
    next2Button.text = "Continue to Event 2";
    next2Button.pos = { x: width / 2, y: height / 2 + 340 };
    next2Button.rotation = 0;

    if (next2Button.mouse.presses()) {
      hideAllButtons();
      screen = 5; // Event 2 / Decision 3 (Dust Storm)
    }
  }

  // SCREEN 5: EVENT 2 & DECISION 3 (Day 18 Dust Storm & Power Drop)
  else if (screen == 5) {
    // 1. Set a solid background color to fill the empty borders instead of stretching
    background('#180B24'); 

    // 2. Draw the background image while keeping its exact aspect ratio
    imageMode(CENTER);
    
    // Calculate proportional height based on your canvas width to avoid squishing
    let imgAspect = labandmaintBg.width / labandmaintBg.height;
    let drawWidth = width; // or set a custom max width like 1200
    let drawHeight = drawWidth / imgAspect;
    
    image(labandmaintBg, width / 2, height / 2, drawWidth, drawHeight);

    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("DAY 18: Dust storm covers solar panels", width / 2, height / 2 - 420);
    noStroke();

    // Display astronauts
    image(worriedAstronautImg, 250, height / 2 + 25, 750, 880); // x, y, width, height
    image(idleAstronaut2Img, width - 250, height / 2 + 77, 750, 880);

    // Transculent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white');
    textSize(25);
    text("Power is dropping and communication to and from the Earth is delayed! Do we \nsave power by switching off all lab equipment and heaters, or do we continue to gather data?", width / 2, height / 2 + 240);

    c1Button.w = 370; c1Button.h = 85; c1Button.collider = 'k'; c1Button.color = '#ffb88f';
    c1Button.text = "Switch off science & heaters\n(Save power, lose research)";
    c1Button.pos = { x: width / 2 - 200, y: height / 2 + 330 };
    c1Button.rotation = 0;

    c2Button.w = 390; c2Button.h = 85; c2Button.collider = 'k'; c2Button.color = '#ffdc9b';
    c2Button.text = "Keep science on\n(More data, risk low air pumps)";
    c2Button.pos = { x: width / 2 + 200, y: height / 2 + 330};
    c2Button.rotation = 0;

    if (c1Button.mouse.presses() || c2Button.mouse.presses()) {
      hideAllButtons();
      screen = 6; // Timeskip 3 & Educational Task
    }
  }

  // SCREEN 6: TIMESKIP 3 & SOLAR PANEL CLEANING (Days 19 to 22)
  else if (screen == 6) {
    // 1. Set a solid background color
    background('#180B24'); 

    // 2. Select background image based on whether panels are cleaned
    imageMode(CENTER);
    let currentPanelBg = panelsCleaned ? cleanPanelsBg : dirtyPanelsBg;
    
    let imgAspect = currentPanelBg.width / currentPanelBg.height;
    let drawWidth = width; 
    let drawHeight = drawWidth / imgAspect;

    image(currentPanelBg, width / 2, height / 2, drawWidth, drawHeight);

    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(panelsCleaned ? "Day 20: Panels Swept & Clean!" : "Day 19: Cleaning Solar Panels", width / 2, height / 2 - 420);
    noStroke();

    // Translucent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white')
    textSize(25);
    
    // Change text dynamically based on cleaning state
    if (!panelsCleaned) {
      text("Fine Martian dust clings to panels via electrostatic forces. Regular maintenance and sweeping \nare essential to restore photovoltaic efficiency and maintain outpost power generation.", width / 2, height / 2 + 240);
      next3Button.text = "Sweep & Clean Panels";
    } else {
      text("Dust cleared successfully! Photovoltaic power generation is back to 100%. Energy reserves \nstabilized for the remainder of the mission.", width / 2, height / 2 + 240);
      next3Button.text = "Continue to Event 3";
    }

    next3Button.w = 280; next3Button.h = 75; next3Button.collider = 'k'; next3Button.color = '#ffd19c';
    next3Button.pos = { x: width / 2, y: height / 2 + 325 };
    next3Button.rotation = 0;

    // Two-step button click handler
    if (next3Button.mouse.presses()) {
      if (!panelsCleaned) {
        panelsCleaned = true; // Step 1: Switch to clean view
      } else {
        panelsCleaned = false; // Step 2: Reset flag for replays and move forward
        hideAllButtons();
        screen = 7; // Move to Event 3 / Decision 4
      }
    }
  }

  // SCREEN 7: EVENT 3 & DECISION 4 (Day 23 Air Scrubber Alarm)
  else if (screen == 7) {
    // 1. Set a solid background color to fill the empty borders instead of stretching
    background('#180B24'); 

    // 2. Draw the background image while keeping its exact aspect ratio
    imageMode(CENTER);
    
    // Calculate proportional height based on your canvas width to avoid squishing
    let imgAspect = labandmaintBg.width / labandmaintBg.height;
    let drawWidth = width; // or set a custom max width like 1200
    let drawHeight = drawWidth / imgAspect;
    
    image(labandmaintBg, width / 2, height / 2, drawWidth, drawHeight);

    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("DAY 23: Air scrubber alarm! CO2 levels rising in habitat." , width / 2, height / 2 - 420);
    noStroke();

    image(alertAstronautImg, 250, height / 2 + 25, 750, 880); // x, y, width, height
    image(idleAstronaut2Img, width - 250, height / 2 + 77, 750, 880);


    // Transculent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white');
    textSize(25);
    text("How do we fix the air? Repairing it now would be safe, but it would cost power and a whole \nday of science... on the other hand, we can use the backup scrubber, but there is no spare.",  width / 2, height / 2 + 240);

    d1Button.w = 390; d1Button.h = 85; d1Button.collider = 'k'; d1Button.color = '#e69c5f';
    d1Button.text = "Repair it now\n(Costs power/science day, safe)";
    d1Button.pos = { x: width / 2 - 200, y: height / 2 + 330 };
    d1Button.rotation = 0;

    d2Button.w = 380; d2Button.h = 85; d2Button.collider = 'k'; d2Button.color = '#e6c39c';
    d2Button.text = "Use backup scrubber\n(Fast fix, no spares left)";
    d2Button.pos = { x: width / 2 + 200, y: height / 2 + 330 };
    d2Button.rotation = 0;

    if (d1Button.mouse.presses() || d2Button.mouse.presses()) {
      hideAllButtons();
      screen = 8; // Timeskip 4 & Educational Task
    }
  }

  // SCREEN 8: TIMESKIP 4 & EDUCATIONAL TASK (Days 24 to 29)
  else if (screen == 8) {
    // 1. Set a solid background color to fill the empty borders instead of stretching
    background('#180B24'); 

    // 2. Draw the background image while keeping its exact aspect ratio
    imageMode(CENTER);
    
    // Calculate proportional height based on your canvas width to avoid squishing
    let imgAspect = roverBg.width / roverBg.height;
    let drawWidth = width;
    let drawHeight = drawWidth / imgAspect;

    image(roverBg, width / 2, height / 2, drawWidth, drawHeight);


    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Day 26: Rover Checks & Maintenance", width / 2, height / 2 - 420);
    noStroke();

    // Alert astronaut
    image(idleAstronaut1Img, 390, height / 2 - 20, 280, 330);
    image(idleAstronaut2Img, 975, height / 2 + 10, 270, 320);

    // Transculent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    textSize(25);
    fill('white');
    text("Mars rovers require rigorous daily telemetry checks and mechanical maintenance. Monitoring \nactuator wear, wheel traction, and power distribution systems ensures long-term operational \nsurvival in the harsh, abrasive dust environment.",  width / 2, height / 2 + 250);

    next4Button.w = 340; next4Button.h = 67; next4Button.collider = 'k'; next4Button.color = '#ffbb9c';
    next4Button.text = "Continue to Final Window";
    next4Button.pos = { x: width / 2, y: height / 2 + 337 };
    next4Button.rotation = 0;

    if (next4Button.mouse.presses()) {
      hideAllButtons();
      screen = 9; // Event 4 / Decision 5 (Day 30 Final Window)
    }
  }

  // SCREEN 9: EVENT 4 & DECISION 5 (Day 30 Final Window & Ending choice)
  else if (screen == 9) {
    // 1. Set a solid background color to fill the empty borders instead of stretching
    background('#180B24'); 

    // 2. Draw the background image while keeping its exact aspect ratio
    imageMode(CENTER);
    
    // Calculate proportional height based on your canvas width to avoid squishing
    let imgAspect = marsBg.width / marsBg.height;
    let drawWidth = width; // or set a custom max width like 1200
    let drawHeight = drawWidth / imgAspect;

    image(marsBg, width / 2, height / 2, drawWidth, drawHeight);


    fill('#ffffff');
    stroke('white')
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("DAY 30: Final mission window. Fuel and food for one trip." , width / 2, height / 2 - 420);
    noStroke();

    // Transculent box
    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    // Alert astronaut
    image(happyAstronautImg, 140, height / 2 - 80, 340, 390);
    image(idleAstronaut2Img, 340, height / 2 - 51, 340, 390);

    fill('white');
    textSize(26);
    text("Choosing the final destination:",  width / 2, height / 2 + 240);

    e1Button.w = 320; e1Button.h = 80; e1Button.collider = 'k'; e1Button.color = '#ff9e6d';
    e1Button.text = "Long drive to far cliffs\n(Biggest discovery / risk)";
    e1Button.pos = { x: width / 2 - 330, y: height / 2 + 320 };
    e1Button.rotation = 0;

    e2Button.w = 320; e2Button.h = 80; e2Button.collider = 'k'; e2Button.color = '#ffb977';
    e2Button.text = "Short trip near base\n(Safe, steady science)";
    e2Button.pos = { x: width / 2, y: height / 2 + 320 };
    e2Button.rotation = 0;

    e3Button.w = 320; e3Button.h = 80; e3Button.collider = 'k'; e3Button.color = '#ebcaaf';
    e3Button.text = "Skip science & head home\n(Safety first)";
    e3Button.pos = { x: width / 2 + 330, y: height / 2 + 320 };
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
    background("#180B24");
    showStarfield();
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
