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
let marsBg, labandmaintBg, foodBg, spectrometryBg, roverBg, cleanPanelsBg, dirtyPanelsBg, craterBg, ridgeBg, logo;
let idleAstronaut1Img, idleAstronaut2Img, alertAstronautImg, happyAstronautImg, worriedAstronautImg;
let donkiFlares = [];
let donkiNotifications = [];
let liveFlareInfo = "Normal solar activity";
let latestNotificationMsg = "NASA Space Weather: All clear.";
let apiLoaded = false;

// AI assistance has been used during the making of this script for trouble shooting and code generation in some areas.

// Location & Mars Trek Data tracking
let selectedLocationKey = null; // "crater" or "ridge"
let marsTrekButton = null;     // HTML DOM link for bottom-right widget

let screen = 0;
let panelsCleaned = false; // Tracks solar panel cleaning state
let pressedButton = null;

// Mission Resources & Stats Tracker
let missionStats = {
  power: 100,          // Percentage (%)
  shielding: 80,       // Radiation protection level (%)
  supplies: 100,       // Food/Water rations (%)
  radiationDose: 12,   // mSv
  decisionsLog: []     // Stores history for final report & NASA sources
};

function preload() {
  marsBg = loadImage("assets/marsbg.png");
  labandmaintBg = loadImage("assets/labandmaint.png");
  foodBg = loadImage("assets/food.png");
  spectrometryBg = loadImage("assets/spectrometry.png");
  roverBg = loadImage("assets/rovercheck.png");
  dirtyPanelsBg = loadImage("assets/dirtypanels.png");
  cleanPanelsBg = loadImage("assets/cleanpanels.png");
  craterBg = loadImage("assets/crater.jpg");
  ridgeBg = loadImage("assets/sunnyridge.jpg");
  logo = loadImage("assets/sol33.png");
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

  // Fetching real data from NASA DONKI API (CCMC Endpoints with <=60 day range)
  let flareUrl = "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-10-01&endDate=2026-11-15";
  let notifUrl = "https://ccmc.gsfc.nasa.gov/DONKI-API/get/notifications?startDate=2026-10-01&endDate=2026-11-15&type=all";

  loadJSON(flareUrl, (data) => {
    let flareArr = Array.isArray(data) ? data : Object.values(data);
    if (flareArr && flareArr.length > 0) {
      donkiFlares = flareArr;
      apiLoaded = true;
      updateLiveSpaceWeather();
    } else {
      loadFallbackDonki();
    }
  }, (err) => {
    loadFallbackDonki();
  });

  loadJSON(notifUrl, (data) => {
    let notifArr = Array.isArray(data) ? data : Object.values(data);
    if (notifArr && notifArr.length > 0) {
      donkiNotifications = notifArr;
      apiLoaded = true;
      updateLiveSpaceWeather(); // Process the data once loaded
    } else if (donkiNotifications.length === 0) {
      loadFallbackDonki();
    }
  }, (err) => {
    if (donkiNotifications.length === 0) {
      loadFallbackDonki();
    }
  });
}

/* DRAW LOOP REPEATS */
function draw() {
  // HOMESCREEN (Screen 0)
  if (screen == 0) {
    background("#180B24");
    showStarfield();

    imageMode(CENTER);
    image(logo, width / 2 - 7, height / 2 - 300, 300, 190);

    noStroke();
    fill('#ffe2ab');
    textSize(30);
    text(
      "You and your fellow astronaut have a 33-day Mars mission\ncoming up to explore and conduct research on the surface of Mars...\nbut are you ready for it?\nLet's see if you have what it takes to manage resources and get through\na 33-day mission to Mars through this simulation!",
      width / 2,
      height / 2 - 130
    );

    enterButton.w = 240;
    enterButton.h = 80;
    enterButton.collider = 'k';
    enterButton.color = '#b8acfb';
    enterButton.text = "Initiate Training";
    enterButton.pos = { x: width / 2, y: height / 2 + 130 };

    if (buttonPressed(enterButton)) {
      hideAllButtons();
      screen = 1; 
    }
  }

  // SCREEN 1: DECISION 1 (Base Camp Location)
  else if (screen == 1) {
    background('#180B24'); 
    imageMode(CENTER);
    let imgAspect = labandmaintBg.width / labandmaintBg.height;
    image(labandmaintBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker(); // Top-left resource tracker
    drawLiveNotificationWidget(); // Top-right DONKI live notification widget

    fill('#ffffff');
    stroke('white');
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("DAY 1: Landing", width / 2, height / 2 - 420);
    noStroke();

    image(idleAstronaut1Img, 250, height / 2 + 25, 750, 880);
    image(idleAstronaut2Img, width - 250, height / 2 + 77, 750, 880);

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

    if (buttonPressed(a1Button)) {
      selectedLocationKey = "ridge";
      setupMarsTrekButton();
      missionStats.power = min(100, max(0, missionStats.power + 15)); // Capped!
      missionStats.shielding -= 15;
      missionStats.radiationDose += 6;
      missionStats.decisionsLog.push({
        decision: "Base Camp: Sunny Ridge",
        tradeoff: "+15% Power, -15% Shielding, +6 Radiation",
        source: "NASA Mars Trek & Vera Rubin Ridge Data"
      });
      hideAllButtons();
      screen = 1.5;
    } else if (buttonPressed(a2Button)) {
      selectedLocationKey = "crater";
      setupMarsTrekButton();
      missionStats.power -= 10;
      missionStats.shielding += 20;
      missionStats.radiationDose -= 4;
      missionStats.decisionsLog.push({
        decision: "Base Camp: Crater Bowl",
        tradeoff: "-10% Power, +20% Shielding, -4 Radiation",
        source: "NASA Mars Trek Gale Crater Data"
      });
      hideAllButtons();
      screen = 1.5;
    }
  }

  // SCREEN 1.5: LANDING SITE ARRIVAL SCENE
  else if (screen == 1.5) {
    background('#180B24');
    imageMode(CENTER);
    let currentBg = selectedLocationKey === "ridge" ? ridgeBg : craterBg;
    let imgAspect = currentBg.width / currentBg.height;
    image(currentBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker();
    drawLiveNotificationWidget();

    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1050, 15);
    noStroke();

    fill('white');
    textSize(25);
    textAlign(CENTER, CENTER);
    let arrivalText = selectedLocationKey === "ridge" 
      ? "Arrived at Sunny Ridge. High ground established; photovoltaic arrays deploying." 
      : "Arrived at Crater Bowl. Descent successful; shielding parameters nominal.";
    text(arrivalText, width / 2, height / 2 + 260);

    next1Button.w = 265; next1Button.h = 58; next1Button.collider = 'k'; next1Button.color = '#ffe7b2';
    next1Button.text = "Proceed to next Days";
    next1Button.pos = { x: width / 2, y: height / 2 + 320 };
    next1Button.rotation = 0;

    if (buttonPressed(next1Button)) {
      hideAllButtons();
      screen = 2;
    }
  }

  // SCREEN 2: TIMESKIP 1 & EDUCATIONAL TASK (Days 2 to 9)
  else if (screen == 2) {
    background('#180B24'); 
    imageMode(CENTER);
    let imgAspect = spectrometryBg.width / spectrometryBg.height;
    image(spectrometryBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker();
    drawLiveNotificationWidget();
    drawBottomRightLocationWidget(); // Bottom-right Mars Trek widget

    fill('#ffffff');
    stroke('white');
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Day 5 Task: Scan Martian Samples", width / 2, height / 2 - 420);
    noStroke();

    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 290, width - 120, height - 1000, 15);
    noStroke();

    fill('white');
    textSize(22);
    text("A spectrometer is used to disperse light into a spectrum that helps scientists study its physical \nand chemical properties like temperature, mass, and most importantly: chemical composition. Spectrometers \nare one of the sharpest tools for exploring and identifying samples from space. The Near Infrared Spectrograph \n(NIRSpectrograph) is designed to observe more than 100 objects simultaneously, making it highly efficient.", width / 2, height / 2 + 260);

    next1Button.w = 260; next1Button.h = 58; next1Button.collider = 'k'; next1Button.color = '#ffe7b2';
    next1Button.text = "Continue to Event 1";
    next1Button.pos = { x: width / 2, y: height / 2 + 350 };
    next1Button.rotation = 0;

    if (buttonPressed(next1Button)) {
      hideAllButtons();
      screen = 3; 
    }
  }

  // SCREEN 3: EVENT 1 & DECISION 2 (Day 10 Solar Flare Alert)
  else if (screen == 3) {
    background('#180B24'); 
    imageMode(CENTER);
    let imgAspect = marsBg.width / marsBg.height;
    image(marsBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker();
    drawLiveNotificationWidget();
    drawBottomRightLocationWidget();

    fill('#ffffff');
    stroke('white');
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(`DAY 10: Solar flare alert from Earth!\n\nLive Data: ${liveFlareInfo}`, width / 2, height / 2 - 390);
    noStroke();

    image(alertAstronautImg, 140, height / 2 - 80, 350, 400);

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

    if (buttonPressed(b1Button)) {
      missionStats.power = min(100, max(0, missionStats.power - 20)); // Capped!
      missionStats.shielding += 10;
      missionStats.decisionsLog.push({
        decision: "Solar Flare: Shelter in Storage",
        tradeoff: "-20% Power, +10% Shielding",
        source: "NASA DONKI Space Weather Notifications"
      });
      hideAllButtons();
      screen = 4;
    } else if (buttonPressed(b2Button)) {
      missionStats.radiationDose += 12;
      missionStats.supplies -= 5;
      missionStats.decisionsLog.push({
        decision: "Solar Flare: Finish Sample Drive",
        tradeoff: "+12 Radiation Dose, -5% Supplies",
        source: "NASA OSDR Space Biology Research"
      });
      hideAllButtons();
      screen = 4;
    }
  }

  // SCREEN 4: TIMESKIP 2 & EDUCATIONAL TASK (Days 11 to 17)
  else if (screen == 4) {
    background('#180B24'); 
    imageMode(CENTER);
    let imgAspect = foodBg.width / foodBg.height;
    image(foodBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker();
    drawLiveNotificationWidget();
    drawBottomRightLocationWidget();

    fill('#ffffff');
    stroke('white');
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Day 15 Task: Nutritional Meal Preparation", width / 2, height / 2 - 420);
    noStroke();

    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 273, width - 120, height - 960, 15);
    noStroke();

    fill('white');
    textSize(21);
    text(`Astronauts' meals are decided months before their mission in space. Dietitians provide recommendations and
      plan their meals so that astronauts meet their nutritional requirements. Space food is made lightweight and 
      compact to save rocket space, and is crumb-free to avoid floating bits. Scientists can dehydrate, thermostabalize, 
      and irradiate food to extend shelf life. Astronauts simply use scissors to cut open pre-made packets and add 
      normal/hot water to activate their food and enjoy their meal! Studies show that quality food and quality time with
      a crew can greatly increase well-being.`, width / 2, height / 2 + 245);

    next2Button.w = 260; next2Button.h = 55; next2Button.collider = 'k'; next2Button.color = '#ffc49d';
    next2Button.text = "Continue to Event 2";
    next2Button.pos = { x: width / 2, y: height / 2 + 355 };
    next2Button.rotation = 0;

    if (buttonPressed(next2Button)) {
      hideAllButtons();
      screen = 5; 
    }
  }

  // SCREEN 5: EVENT 2 & DECISION 3 (Day 18 Dust Storm & Power Drop)
  else if (screen == 5) {
    background('#180B24'); 
    imageMode(CENTER);
    let imgAspect = labandmaintBg.width / labandmaintBg.height;
    image(labandmaintBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker();
    drawLiveNotificationWidget();
    drawBottomRightLocationWidget();

    fill('#ffffff');
    stroke('white');
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("DAY 18: Dust storm covers solar panels", width / 2, height / 2 - 420);
    noStroke();

    image(worriedAstronautImg, 250, height / 2 + 25, 750, 880);
    image(idleAstronaut2Img, width - 250, height / 2 + 77, 750, 880);

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

    if (buttonPressed(c1Button)) {
      missionStats.power = min(100, max(0, missionStats.power + 20)); // Capped!
      missionStats.supplies -= 5;
      missionStats.decisionsLog.push({
        decision: "Dust Storm: Save Power",
        tradeoff: "+20% Power, -5% Supplies",
        source: "NASA Spacecraft Power Documentation"
      });
      hideAllButtons();
      screen = 6;
    } else if (buttonPressed(c2Button)) {
      missionStats.power = min(100, max(0, missionStats.power - 25)); // Capped!
      missionStats.supplies -= 10;
      missionStats.decisionsLog.push({
        decision: "Dust Storm: Keep Science On",
        tradeoff: "-25% Power, -10% Supplies",
        source: "NASA Rover Operational Manual"
      });
      hideAllButtons();
      screen = 6;
    }
  }

  // SCREEN 6: TIMESKIP 3 & SOLAR PANEL CLEANING (Days 19 to 22)
  else if (screen == 6) {
    background('#180B24'); 
    imageMode(CENTER);
    let currentPanelBg = panelsCleaned ? cleanPanelsBg : dirtyPanelsBg;
    let imgAspect = currentPanelBg.width / currentPanelBg.height;
    image(currentPanelBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker();
    drawLiveNotificationWidget();
    drawBottomRightLocationWidget();

    fill('#ffffff');
    stroke('white');
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(panelsCleaned ? "Day 20: Panels Cleaned!" : "Day 19: Cleaning Solar Panels", width / 2, height / 2 - 420);
    noStroke();

    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white');
    textSize(25);
    if (!panelsCleaned) {
      text("Mars' atmosphere is very thin and dry, which means that it takes longer for dust particles \nto move out of the atmosphere. This poses a threat to the solar panels, as dust accumulates \non them and disrupts power systems and reduces efficiency.", width / 2, height / 2 + 240);
      next3Button.text = "Sweep & Clean Panels";
    } else {
      text("Panels cleaned successfully! Power generation restored to maximum capacity.", width / 2, height / 2 + 240);
      next3Button.text = "Continue to Event 3";
    }

    next3Button.w = 280; next3Button.h = 75; next3Button.collider = 'k'; next3Button.color = '#ffd19c';
    next3Button.pos = { x: width / 2, y: height / 2 + 335 };
    next3Button.rotation = 0;

    if (buttonPressed(next3Button)) {
      if (!panelsCleaned) {
        panelsCleaned = true;
        missionStats.power = min(100, max(0, missionStats.power + 25)); // Capped at 100 max!
        missionStats.decisionsLog.push({
          decision: "Maintenance: Cleaning Panels",
          tradeoff: "+25% Power Restored",
          source: "NASA Surface Dust Studies"
        });
      } else {
        panelsCleaned = false;
        hideAllButtons();
        screen = 7; 
      }
    }
  }

  // SCREEN 7: ROVER CHECKS & MAINTENANCE (Day 26)
  else if (screen == 7) {
    background('#180B24'); 
    imageMode(CENTER);
    let imgAspect = roverBg.width / roverBg.height;
    image(roverBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker();
    drawLiveNotificationWidget();
    drawBottomRightLocationWidget();

    fill('#ffffff');
    stroke('white');
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Day 26: Rover Checks & Maintenance", width / 2, height / 2 - 420);
    noStroke();

    image(idleAstronaut1Img, 390, height / 2 - 20, 280, 330);
    image(idleAstronaut2Img, 975, height / 2 + 10, 270, 320);

    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    textSize(25);
    fill('white');
    text("Mars rovers require rigorous daily telemetry checks and mechanical maintenance. Monitoring \nactuator wear, wheel traction, and power distribution systems ensures long-term operational \nsurvival in the harsh, abrasive dust environment.", width / 2, height / 2 + 250);

    next4Button.w = 340; next4Button.h = 67; next4Button.collider = 'k'; next4Button.color = '#ffbb9c';
    next4Button.text = "Continue to Final Window";
    next4Button.pos = { x: width / 2, y: height / 2 + 337 };
    next4Button.rotation = 0;

    if (buttonPressed(next4Button)) {
      hideAllButtons();
      screen = 9; 
    }
  }

  // SCREEN 9: EVENT 4 & DECISION 5 (Day 33 Final Window)
  else if (screen == 9) {
    background('#180B24'); 
    imageMode(CENTER);
    let imgAspect = marsBg.width / marsBg.height;
    image(marsBg, width / 2, height / 2, width, width / imgAspect);

    drawResourceTracker();
    drawLiveNotificationWidget();
    drawBottomRightLocationWidget();

    fill('#ffffff');
    stroke('white');
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("DAY 33: Final mission window.", width / 2, height / 2 - 420);
    noStroke();

    image(happyAstronautImg, 140, height / 2 - 80, 340, 390);
    image(idleAstronaut2Img, 340, height / 2 - 51, 340, 390);

    fill(18, 10, 31, 190);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 287, width - 180, height - 1000, 15);
    noStroke();

    fill('white');
    textSize(26);
    text("Choosing the final destination:", width / 2, height / 2 + 240);

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

    if (buttonPressed(e1Button)) {
      missionStats.supplies -= 20;
      missionStats.decisionsLog.push({
        decision: "Final Window: Far Cliffs Traverse",
        tradeoff: "-20% Supplies, High Science",
        source: "NASA Mars Traverse Planning Data"
      });
      hideAllButtons();
      screen = 10; 
    } else if (buttonPressed(e2Button)) {
      missionStats.supplies -= 10;
      missionStats.decisionsLog.push({
        decision: "Final Window: Local Base Trip",
        tradeoff: "-10% Supplies, Balanced Science",
        source: "NASA Mission Profiles"
      });
      hideAllButtons();
      screen = 11; 
    } else if (buttonPressed(e3Button)) {
      missionStats.supplies += 5;
      missionStats.decisionsLog.push({
        decision: "Final Window: Immediate Return",
        tradeoff: "+5% Supplies Saved",
        source: "NASA Safety Protocols"
      });
      hideAllButtons();
      screen = 12; 
    }
  }

  // ENDINGS & MISSION REPORT (Screens 10, 11, 12)
  else if (screen >= 10 && screen <= 12) {
    background("#180B24");
    showStarfield();

    // Hide Mars Trek DOM button on ending screens
    if (marsTrekButton) marsTrekButton.hide();

    let endingTitle = "";
    let endingDesc = "";
    if (screen == 10) {
      endingTitle = "ENDING: SCIENCE STAR";
      endingDesc = "Great discoveries made, tight resources managed!";
    }
    if (screen == 11) {
      endingTitle = "ENDING: STEADY EXPLORER";
      endingDesc = "Balanced mission executed with a safe return!";
    }
    if (screen == 12) {
      endingTitle = "ENDING: SAFETY FIRST";
      endingDesc = "Healthy crew returned home with careful resource use!";
    }

    fill(18, 10, 31, 200);
    stroke('#ff8c49');
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 - 10, width - 200, height - 300, 15);
    noStroke();

    fill('#ffb067');
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(endingTitle, width / 2, height / 2 - 300);

    textStyle(NORMAL);
    fill('#ffe2ab');
    textSize(19);
    text(endingDesc + "\nWhat would you trade differently next time?", width / 2, height / 2 - 250);

    let startX = width / 2 - 500;
    let startY = height / 2 - 165;

    fill('#ffffff');
    textSize(20);
    textAlign(LEFT, TOP);
    text("Your Decision Log:", startX, startY);

    let yOffset = startY + 22;
    for (let i = 0; i < missionStats.decisionsLog.length; i++) {
      let log = missionStats.decisionsLog[i];
      fill('#ffbe82');
      textSize(18);
      text(`• ${log.decision}: ${log.tradeoff}`, startX, yOffset);
      yOffset += 24;
    }

    yOffset += 10;
    fill('#ffffff');
    textSize(20);
    text("NASA Data & Source Citations:", startX, yOffset);
    yOffset += 22;

    let referenceList = [
      "Spectrometry Info: https://science.nasa.gov/mission/webb/nirspec/",
      "Food info: Source: https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/eating-in-space.asp",
      "Dust & Solar panel info: NASA Mars Surface Power PDF (2024).",
      "NASA Mars Trek: Landing site data.",
      "NASA DONKI: Space weather alerts, solar flares, and CME tracking.",
    ];

    for (let ref of referenceList) {
      fill('#a0a0c0');
      textSize(18);
      text(`• ${ref}`, startX + 10, yOffset);
      yOffset += 20;
    }

    restartButton.w = 220; restartButton.h = 65; restartButton.collider = 'k'; restartButton.color = '#b8acfb';
    restartButton.text = "Replay Mission";
    restartButton.pos = { x: width / 2, y: height / 2 + 280 };
    restartButton.rotation = 0;

    if (buttonPressed(restartButton)) {
      missionStats.power = 100;
      missionStats.shielding = 80;
      missionStats.supplies = 100;
      missionStats.radiationDose = 12;
      missionStats.decisionsLog = [];
      panelsCleaned = false;
      if (marsTrekButton) marsTrekButton.remove();
      marsTrekButton = null;
      selectedLocationKey = null;
      hideAllButtons();
      screen = 0;
      textAlign(CENTER);
    }
  }
}

/* HELPER FUNCTIONS */

// Store clicks in canvas coordinates so CSS sizing/scaling does not offset sprite hit tests.
function mousePressed(event) {
  pressedButton = null;
  let canvasElement = document.querySelector('canvas');
  if (!canvasElement) return;

  let bounds = canvasElement.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  let clientX = event && Number.isFinite(event.clientX) ? event.clientX : mouseX + bounds.left;
  let clientY = event && Number.isFinite(event.clientY) ? event.clientY : mouseY + bounds.top;
  let clickX = (clientX - bounds.left) * width / bounds.width;
  let clickY = (clientY - bounds.top) * height / bounds.height;
  let allBtns;
  if (screen === 0) allBtns = [enterButton];
  else if (screen === 1) allBtns = [a1Button, a2Button];
  else if (screen === 1.5 || screen === 2) allBtns = [next1Button];
  else if (screen === 3) allBtns = [b1Button, b2Button];
  else if (screen === 4) allBtns = [next2Button];
  else if (screen === 5) allBtns = [c1Button, c2Button];
  else if (screen === 6) allBtns = [next3Button];
  else if (screen === 7) allBtns = [next4Button];
  else if (screen === 9) allBtns = [e1Button, e2Button, e3Button];
  else if (screen >= 10 && screen <= 12) allBtns = [restartButton];
  else allBtns = [];

  for (let button of allBtns) {
    if (button && Math.abs(clickX - button.x) <= button.w / 2 &&
        Math.abs(clickY - button.y) <= button.h / 2) {
      pressedButton = button;
      break;
    }
  }
}

function buttonPressed(button) {
  if (pressedButton !== button) return false;
  pressedButton = null;
  return true;
}

function drawResourceTracker() {
  push();
  rectMode(CORNER);
  fill(18, 10, 31, 210);
  stroke('#ff8c49');
  strokeWeight(2);
  rect(10, 75, 130, 120, 10);
  noStroke();

  fill('#fcf7ee');
  textSize(13);
  textAlign(LEFT, TOP);
  
  let x = 18;
  let y = 93;
  text(`Power: ${missionStats.power}%`, x, y);
  text(`Shields: ${missionStats.shielding}%`, x, y + 25);
  text(`Supplies: ${missionStats.supplies}%`, x, y + 50);
  text(`Radiation: ${missionStats.radiationDose} mSv`, x, y + 75);
  pop();
}

function drawLiveNotificationWidget() {
  push();
  rectMode(CORNER);
  fill(18, 10, 31, 210);
  stroke('#ff8c49');
  strokeWeight(2);
  rect(width - 370, 75, 340, 120, 10);

  noStroke();
  fill('#ffbe82');
  textSize(15);
  textAlign(LEFT, TOP);
  text("NASA DONKI LIVE TELEMETRY", width - 355, 100);

  fill('#fcf7ee');
  textSize(13);
  text(latestNotificationMsg, width - 355, 130, 310, 70);
  pop();
}

// Small Bottom-left Widget displaying chosen location & description once selected
function drawBottomRightLocationWidget() {
  if (!selectedLocationKey) return;

  push();
  rectMode(CORNER);
  // Positioned neatly in the bottom right corner
  fill(18, 10, 31, 220);
  stroke('#ff8c49');
  strokeWeight(2);
  rect(10, height - 190, 340, 90, 10);

  noStroke();
  fill('#ff8c49');
  textSize(14);
  textAlign(LEFT, TOP);
  let title = selectedLocationKey === "crater" ? "Gale Crater (Curiosity Site)" : "Vera Rubin Ridge (Sunny Ridge)";
  text(`📍 ${title}`, 12, height - 180);

  fill('#fcf7ee');
  textSize(11);
  let desc = selectedLocationKey === "crater" 
    ? "Coordinates: 4.5895°S, 137.4417°E\n Diameter: 154 km. Clay-rich layers and ancient water basins explored by Curiosity."
    : "Coordinates: 4.8°S, 137.4°E. \nHigh photovoltaic output and hematite-bearing bedrock.";
  text(desc, 16, height - 155, 310, 50);

  pop();

  if (marsTrekButton) {
    marsTrekButton.show();
  }
}

// Creates the clickable HTML link button for NASA Mars Trek at the bottom right
function setupMarsTrekButton() {
  if (marsTrekButton) marsTretkButton.remove(); // safety guard

  let linkUrl = selectedLocationKey === "crater" 
    ? "https://trek.nasa.gov/mars/#v=0.1&x=144.31602252135553&y=-2.7839593452500027&z=5&p=urn%3Aogc%3Adef%3Acrs%3AEPSG%3A%3A104905&d=&locale=&b=mars&e=133.52744850385093%2C-10.342552954255272%2C155.10459653886014%2C4.774634263755266&sfz=&w="
    : "https://trek.nasa.gov/mars/#v=0.1&x=137.6120191619876&y=-7.757652170717654&z=4&p=urn%3Aogc%3Adef%3Acrs%3AEPSG%3A%3A104905&d=&locale=&b=mars&e=116.03487112697837%2C-22.87483938872819%2C159.18916719699683%2C7.359535047292884&sfz=&w=";

  marsTrekButton = createA(linkUrl, '🔍 Explore on NASA Mars Trek ↗', '_blank');
  // Positioned directly inside the bottom-right widget box
  marsTrekButton.position(width - 355, height - 110);
  marsTrekButton.style('color', '#00ffcc');
  marsTrekButton.style('font-family', 'monospace');
  marsTrekButton.style('font-weight', 'bold');
  marsTrekButton.style('text-decoration', 'none');
  marsTrekButton.style('background', 'rgba(0, 40, 40, 0.9)');
  marsTrekButton.style('border', '1px solid #00ffcc');
  marsTrekButton.style('padding', '5px 10px');
  marsTrekButton.style('border-radius', '4px');
  marsTrekButton.style('font-size', '11px');
  marsTrekButton.style('z-index', '1000');
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

function updateLiveSpaceWeather() {
  if (apiLoaded) {
    // 1. Handle Flares matching the October window
    if (donkiFlares.length > 0) {
      let randomFlare = random(donkiFlares);
      let fClass = randomFlare.classType || "M1.0";
      let peakT = randomFlare.peakTime ? randomFlare.peakTime.replace("T", " ").substring(0, 16) : "2026-10-10 14:30";
      liveFlareInfo = `Class ${fClass} Flare (Peak: ${peakT} UTC)`;
    }

    // 2. Handle Notifications matching the October window
    if (donkiNotifications.length > 0) {
      // Pick the latest notification within that window (or index 0)
      let latestNotif = donkiNotifications[0];
      let mType = latestNotif.messageType || "FLR";
      let issueTime = latestNotif.messageIssueTime 
        ? latestNotif.messageIssueTime.replace("T", " ").substring(0, 16) + " UTC" 
        : "2026-10-10 12:00 UTC";

      let rawBody = latestNotif.messageMessageBody || latestNotif.messageBody || "";
      let summaryText = rawBody.includes("## Summary:")
        ? rawBody.split("## Summary:")[1].split("##")[0]
        : rawBody;

      summaryText = summaryText.replace(/<[^>]*>/g, "").replace(/#/g, "").replace(/\s+/g, " ").trim();
      if (summaryText.length > 95) {
        summaryText = summaryText.substring(0, 92) + "...";
      }

      latestNotificationMsg = `[${mType}] ${issueTime}\n${summaryText}`;
    }
  }
}

function loadFallbackDonki() {
  donkiFlares = [
    { classType: "X1.8", beginTime: "2026-10-14T11:20Z" },
    { classType: "M4.2", beginTime: "2026-10-22T06:45Z" }
  ];
  donkiNotifications = [
    { messageBody: "Space Weather Message: High solar activity detected. Elevated radiation alert active for Mars sector." }
  ];
  apiLoaded = true;
  updateLiveSpaceWeather();
}