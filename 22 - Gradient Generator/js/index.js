const colorOne = document.getElementById("color-a");
const colorTwo = document.getElementById("color-b");
const outputCode = document.getElementById("code");
let currentDirection = "to bottom";

function setDirection(value, _this) {
  const directions = document.querySelectorAll(".buttons button");

  for (let i of directions) {
    i.classList.remove("active");
  }

  _this.classList.add("active");
  currentDirection = value;
}

function generateCode() {
  outputCode.value = `background-image: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
  document.getElementsByTagName(
    "BODY"
  )[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
}

function copyText() {
  outputCode.select();
  document.execCommand("copy");
  alert("Gradient Coopied!");
}

generateCode();
