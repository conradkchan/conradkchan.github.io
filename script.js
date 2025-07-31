const correctPassword = "12345678";

window.onload = () => {
  // For each dial, create 10 numbers stacked vertically inside a container div.numbers
  document.querySelectorAll(".dial").forEach((dial, index) => {
    const numbersDiv = document.createElement("div");
    numbersDiv.className = "numbers";

    // Create 10 divs for numbers 0-9
    for (let i = 0; i < 10; i++) {
      const numDiv = document.createElement("div");
      numDiv.textContent = i;
      numbersDiv.appendChild(numDiv);
    }

    // Set initial position (show 0)
    numbersDiv.style.transform = `translateY(0px)`;
    dial.appendChild(numbersDiv);

    // Store current number index in dataset
    dial.dataset.current = "0";

    // Add click to dial to cycle forward number
    dial.addEventListener("click", () => {
      let currentNum = parseInt(dial.dataset.current);
      currentNum = (currentNum + 1) % 10;
      dial.dataset.current = currentNum.toString();
      // Immediately set transform (no animation here)
      numbersDiv.style.transition = 'none';
      numbersDiv.style.transform = `translateY(${-110 * currentNum}px)`;
      // Force reflow to reset transition
      void numbersDiv.offsetWidth;
      numbersDiv.style.transition = 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
      // Animate a little bounce forward and settle on number
      // (optional - here just basic smooth slide)
    });
  });

  document.getElementById("unlockBtn").addEventListener("click", () => {
    spinAndCheck();
  });
};

function spinAndCheck() {
  const dials = document.querySelectorAll(".dial");
  const numbersHeight = 110; // height of each number div in px
  const spins = 3; // how many full rotations

  // Animate each dial to spin through 0-9 * spins times, then land on current number
  dials.forEach(dial => {
    const numbersDiv = dial.querySelector(".numbers");
    const targetNum = parseInt(dial.dataset.current);
    const totalShift = (10 * spins + targetNum) * numbersHeight;

    // Animate transform to spin down through numbers multiple times, then land on targetNum
    numbersDiv.style.transition = 'transform 2s cubic-bezier(0.77, 0, 0.175, 1)';
    numbersDiv.style.transform = `translateY(${-totalShift}px)`;
  });

  // After animation ends (2s), check the combo
  setTimeout(() => {
    const input = Array.from(dials).map(d => d.dataset.current).join("");
    const status = document.getElementById("status");

    if (input === correctPassword) {
      status.textContent = "🪵 Combo Correct — Unlocked!";
      status.className = "unlocked-effect";
    } else {
      status.textContent = "🔥 Incorrect combo. Try again!";
      status.className = "";
    }

    // Reset all dial numbersDiv positions so animation can replay next time
    dials.forEach(dial => {
      const numbersDiv = dial.querySelector(".numbers");
      const targetNum = parseInt(dial.dataset.current);
      // Instantly snap to correct position without animation
      numbersDiv.style.transition = 'none';
      numbersDiv.style.transform = `translateY(${-targetNum * numbersHeight}px)`;
      // Force reflow to ensure next animation works cleanly
      void numbersDiv.offsetWidth;
    });
  }, 2100);
}
