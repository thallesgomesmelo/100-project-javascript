const pickerBtn = document.querySelector("#picker-btn");
const clearBtn = document.querySelector("#clear-btn");
const colorList = document.querySelector(".all-colors");
const exportBtn = document.querySelector("#export-btn");

// Retrieving picked colors from localstorage or initializing an empty array
let pickedColors = JSON.parse(localStorage.getItem("colors-list")) || [];

// Variable to keep track of the current color popup
let currentPopup = null;

// Function to copy text to the clip board
const copyToClipBoard = async (text, element) => {
  try {
    await navigator.clipboard.writeText(text);
    element.innerText = "Copied!";

    // Resseting element text after 1 second
    setTimeout(() => (element.innerText = text), 1000);
  } catch (err) {
    console.log("%Erro:\n", err, "color: #f00");
    alert("Filed to copy text!");
  }
};

// Function to export colors as text file
const exportColors = () => {
  const colorText = pickedColors.join("\n");
  const blob = new Blob([colorText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "Colors.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Function to create the color popup
const createColorPopup = color => {
  const popup = document.createElement("div");
  popup.classList.add("color-popup");
  popup.innerHTML = `
    <div class="color-popup-content">
      <span class="close-popup">x</span>

      <div class="color-info">
        <div class="color-preview" style="background: ${color};border:1px solid ${
    color === "rgba(255, 255, 255, 1)" ? "rgba(204, 204, 204, 1)" : color
  }"></div>
        <div class="color-details">
          <div class="color-value">
            <span class="label">Hex:</span>
            <span class="value hex" data-color="${color}">${rgbToHex(color)}</span>
          </div>

          <div>
            <span class="label">RBGA:</span>
            <span class="value rgb" data-color="${color}">${color}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Close button inside the popup
  const closePopup = popup.querySelector(".close-popup");
  closePopup.addEventListener("click", () => {
    document.body.removeChild(popup);
    currentPopup = null;
  });

  // Event listeners to copy color values to clipboard
  const colorValues = popup.querySelectorAll(".value");
  colorValues.forEach(value => {
    value.addEventListener("click", e => {
      const text = e.currentTarget.innerText;
      copyToClipBoard(text, e.currentTarget);
    });
  });

  return popup;
};

// Function to display the picked colors
const showColors = () => {
  colorList.innerHTML = pickedColors
    .map(
      color =>
        `
        <li class="color">
          <span class="rect" style="background:${color}; border:1px solid ${
          color === "rgba(255, 255, 255, 1)" ? "rgba(204, 204, 204, 1)" : color
        }"></span>
          <span class="value hex" data-color="${color}">${rgbToHex(color)}</span>
        </li>
      `
    )
    .join("");

  const colorElements = document.querySelectorAll(".color");
  colorElements.forEach(li => {
    const colorHex = li.querySelector(".value.hex");
    colorHex.addEventListener("click", e => {
      const color = e.currentTarget.dataset.color;

      if (currentPopup) {
        document.body.removeChild(currentPopup);
      }

      const popup = createColorPopup(color);
      document.body.appendChild(popup);
      currentPopup = popup;
    });
  });

  const pickedColorsContainer = document.querySelector(".colors-list");
  pickedColorsContainer.classList.toggle("hide", pickedColors.length === 0);
};

// Function to convert a hex color code to rgb format
const hexToRgb = hex => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r},${g},${b})`;
};

function rgbToHex(rgb) {
  const match = rgb.match(/\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);

  const toHex = c => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const red = toHex(parseInt(match[1]));
  const green = toHex(parseInt(match[2]));
  const blue = toHex(parseInt(match[3]));

  return `#${red}${green}${blue}`;
}

const activateEyeDropper = async () => {
  document.body.style.display = "none";

  try {
    // Opening the eye dropper and retrieving the selected color
    const { sRGBHex } = await new EyeDropper().open();
    const teste = sRGBHex.replace(", 0)", ", 1)");

    if (!pickedColors.includes(teste)) {
      pickedColors.push(teste);
      localStorage.setItem("colors-list", JSON.stringify(pickedColors));
    }

    showColors();
  } catch (err) {
    alert("Filed to copy the color code!");
  } finally {
    document.body.style.display = "block";
  }
};

// Function to clear all picked colors
const clearAllColors = () => {
  pickedColors = [];
  localStorage.removeItem("colors-list");
  showColors();
};

// Event listeners for buttons
clearBtn.addEventListener("click", clearAllColors);
pickerBtn.addEventListener("click", activateEyeDropper);
exportBtn.addEventListener("click", exportColors);

// Displaying picked colors on document load
showColors();
