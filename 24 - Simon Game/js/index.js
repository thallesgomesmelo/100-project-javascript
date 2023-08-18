const scoreEl = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerEl = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultEl = document.querySelector("#score-result");
const wrapperEl = document.querySelector(".wrapper");

// Current and new colors object
const colorObjs = {
  color1: { current: "#006400", new: "#00ff00" },
  color2: { current: "#800000", new: "#ff0000" },
  color3: { current: "#0000b8", new: "#0000ff" },
  color4: { current: "#808000", new: "#ffff00" }
};

let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

const getRandomColor = colorsObj => {
  const colorKeys = Object.keys(colorsObj);
  return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

// Function to pause execution of game for given amount of time
const delay = async time => {
  return await new Promise(resolve => setTimeout(resolve, time));
};

// Function to generate a random path of colors
const generateRandomPath = async () => {
  randomColors.push(getRandomColor(colorObjs));
  score = randomColors.length;
  isPathGenerating = true;
  await showPath(randomColors);
};

const showPath = async colors => {
  scoreEl.innerText = score;

  for (const color of colors) {
    const currentColor = document.querySelector(`.${color}`);

    // Pause execution for 500 milliseconds
    await delay(500);

    // Set backgroun to new color
    currentColor.style.backgroundColor = colorObjs[color].new;
    await delay(600);

    // Set backgroun to old color
    currentColor.style.backgroundColor = colorObjs[color].current;
    await delay(600);
  }

  // Set flag to indicate the game is no longer generating path
  isPathGenerating = false;
};

const endGame = () => {
  resultEl.innerHTML = `<span> Your Score : </span> ${score}`;
  resultEl.classList.remove("hide");
  containerEl.classList.remove("hide");
  wrapperEl.classList.add("hide");
  startBtn.innerText = "Play Again";
  startBtn.classList.remove("hide");
};

const resetGame = () => {
  score = 0;
  clickCount = 0;
  randomColors = [];
  isPathGenerating = false;
  wrapperEl.classList.remove("hide");
  containerEl.classList.add("hide");
  generateRandomPath();
};

const handleColorClick = async e => {
  // If the path is currently being generated, ignore click
  if (isPathGenerating) return false;

  // If clicked color is correct, update score and continue generating the path
  if (e.target.classList.contains(randomColors[clickCount])) {
    e.target.style.backgroundColor = colorObjs[randomColors[clickCount]].new;
    await delay(500);
    e.target.style.backgroundColor = colorObjs[randomColors[clickCount]].current;
    clickCount++;

    if (clickCount === score) {
      clickCount = 0;
      generateRandomPath();
    }
  } else {
    endGame();
  }
};

startBtn.addEventListener("click", resetGame);
colorParts.forEach(color => color.addEventListener("click", handleColorClick));
