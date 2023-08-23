(function () {
  const preTag = document.getElementById("donut");

  // Angles, Radius and Contants
  let A = 1;
  let B = 1;
  let R1 = 1;
  let R2 = 2;
  let K1 = 150;
  let K2 = 5;

  // Function to render ASCII frame
  function renderAsciiFrame() {
    let b = []; // Array to stay ascii chars
    let z = []; // Array to store depth values

    let width = 280; // Width of frame
    let height = 160; // Height of frame

    A += 0.07; //Increament angle a
    B += 0.03; //Increament angle b

    // Sin and Consine of angles
    let cA = Math.cos(A),
      sA = Math.sin(A),
      cB = Math.cos(B),
      sB = Math.sin(B);

    // Initialize arrays with default angles
    for (let k = 0; k < width * height; k++) {
      // Set default ascii char
      b[k] = k % width == width - 1 ? "\n" : " ";
      // Set default depth
      z[k] = 0;
    }

    // Generate the ascii frame
    for (let j = 0; j < 6.28; j += 0.07) {
      let ct = Math.cos(j); // Consine of j
      let st = Math.sin(j); // Sin of j

      for (let i = 0; i < 6.28; i += 0.02) {
        let sp = Math.sin(i), // Sin of i
          cp = Math.cos(i), // Consine of i
          h = ct + 2, // Height calculation
          D = 1 / (sp * h * sA + st * cA + 5), // Distance calculation
          t = sp * h * cA - st * sA; // Temporary variable

        // Calculate cordinates of ascii char
        let x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
        let y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

        // Calculate the index in the array
        let o = x + width * y;

        // Calculate the ascii char index
        let N = Math.floor(
          8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB)
        );

        // Update ascii char and depth if conditions are met
        if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
          z[o] = D;
          // Update ascii char based on the index
          b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
        }
      }
    }

    // Update html element with the ascii frame
    preTag.innerHTML = b.join("");
  }

  // Function to start the animation
  function startAsciiAnimation() {
    // Start it by calling renderAsciiAnimation every 50ms
    window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
  }

  // Render the inital ascii frame
  renderAsciiFrame();

  // Add event listener to start animation when page is loaded
  if (document.all) {
    // For older versions of internet explorer
    window.attachEvent("onload", startAsciiAnimation);
  } else {
    // For modern browsers
    window.addEventListener("load", startAsciiAnimation, false);
  }

  // Add event lister to update ascii frame when window resized
  window.addEventListener("resize", renderAsciiFrame);
})();
