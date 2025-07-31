const correctPassword = "12345678";

window.onload = () => {
  // Create dropdowns for each dial
  document.querySelectorAll(".dial").forEach((dial) => {
    const select = document.createElement("select");
    for (let i = 0; i < 10; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      select.appendChild(option);
    }

    // Add bump animation on change
    select.addEventListener("change", () => {
      select.classList.remove("bump");
      void select.offsetWidth; // trigger reflow
      select.classList.add("bump");
    });

    dial.appendChild(select);
  });

  // Add click listener for Unlock button
  document.getElementById("unlockBtn").addEventListener("click", checkCombo);
};

function checkCombo() {
  const selects = document.querySelectorAll(".dial select");
  const input = Array.from(selects).map(sel => sel.value).join("");

  const status = document.getElementById("status");
  const padlock = document.getElementById("padlock");

  // Add spin class to start animation
  padlock.classList.add("spin");

  // Remove spin class after animation ends, so it can be retriggered next time
  padlock.addEventListener("animationend", () => {
    padlock.classList.remove("spin");
  }, { once: true });

  if (input === correctPassword) {
    status.textContent = "🪵 Combo Correct — Unlocked!";
    status.className = "unlocked-effect";
    padlock.textContent = "🔓"; // Open lock on success
  } else {
    status.textContent = "🔥 Incorrect combo. Try again!";
    status.className = "";
    padlock.textContent = "🔒"; // Closed lock on fail
  }
}
