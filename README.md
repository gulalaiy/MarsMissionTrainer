# Sol 33: Mars Mission Simulator

An interactive, web-based resource management and survival simulator built with **p5.js** and **p5play**. Step into the boots of an astronaut leading a two-person crew on a 33-day mission across the Martian surface, balancing real-world planetary hazards, scientific discovery, and crew survival.

---

## Overview

Surviving on Mars requires tough trade-offs. In **Sol 33**, players navigate critical mission milestones—from selecting an optimal landing site and analyzing Martian soil samples to enduring solar flares and severe dust storms. Every choice directly impacts your crew's **Power**, **Radiation Shielding**, **Supplies**, and cumulative **Radiation Dose (mSv)**, culminating in one of three unique mission endings and a complete scientific log.

### Key Features
* **Strategic Resource Management:** Balance four vital survival metrics (`Power`, `Shields`, `Supplies`, and `Radiation`) across 33 simulated Martian days (sols).
* **Authentic Landing Sites:** Choose between **Vera Rubin Ridge (Sunny Ridge)** for high photovoltaic output or **Gale Crater (Crater Bowl)** for natural geological radiation shielding—complete with direct links to explore the terrain on **NASA Mars Trek**.
* **Live Space Weather Telemetry:** Integrates live solar flare and space weather notification data via the **NASA CCMC DONKI API** (with automatic fallback telemetry for offline resilience).
* **Interactive Science & Maintenance Tasks:** Learn about real spaceflight operations including Near-Infrared Spectrometry (NIRSpec), dehydrated space nutrition, solar panel dust mitigation, and rover telemetry checks.
* **Post-Mission Debrief & Citations:** Generates a personalized decision log and full list of NASA open-data references at the end of every run.

---

## Tech Stack & Data Sources

* **Core Framework:** HTML5 Canvas, JavaScript (ES6+), [p5.js](https://p5js.org/), and [p5play](https://p5play.org/)
* **NASA Open Data & APIs:**
  * **NASA CCMC DONKI API:** Real-time solar flare (`FLR`) and space weather notification telemetry.
  * **NASA Mars Trek:** Topographical coordinates and interactive map integration for Gale Crater and Vera Rubin Ridge.
  * **NASA OSDR (RadLab):** Baseline radiation dosimetry and absorbed dose rate references.
  * **NASA Science / CSA:** Educational data on NIRSpec spectrometry, Martian dust accumulation on solar arrays, and space nutrition.

---

## 📂 Project Structure

```text
mars-mission-simulator/
├── index.html          # Main entry point loading p5.js, p5play, and sketch.js
├── sketch.js           # Core game loop, UI widgets, DONKI API fetch, and state logic
├── README.md           # Project documentation
└── assets/             # Visual sprites and planetary backgrounds
    ├── marsbg.png
    ├── labandmaint.png
    ├── food.png
    ├── spectrometry.png
    ├── rovercheck.png
    ├── dirtypanels.png
    ├── cleanpanels.png
    ├── crater.jpg
    ├── ridge.jpg
    └── [astronaut sprites].png
```

---

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   cd YOUR-REPO-NAME
   ```
2. **Launch a local development server:**
   * Because the game loads local image assets and fetches JSON data, open the folder in **VS Code** and click **"Go Live"** using the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
   * Alternatively, run a quick Python server in your terminal:
     ```bash
     python -m http.server 8000
     ```
3. **Play:** Open `http://localhost:5500` (or `http://localhost:8000`) in your browser and click **Initiate Training**.

---

## Future Roadmap
* **Dynamic Random Events:** Expand the DONKI API integration so live flare classes (`M-class` vs. `X-class`) dynamically scale radiation penalties.
* **Audio & Ambient Soundscapes:** Add Martian wind ambience, rover telemetry beeps, and solar storm alarms.
* **Mobile & Responsive Scaling:** Add dynamic canvas scaling for seamless play on tablets and mobile viewports.
