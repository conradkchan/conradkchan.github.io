const correctPassword = "12345678";

window.onload = () => {
  document.querySelectorAll(".dial").forEach((dial) => {
    const select = document.createElement("select");
    for (let i = 0; i < 10; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      select.appendChild(option);
    }

    // Simulated bump animation (no rotation)
    select.addEventListener("change", () => {
      select.classList.remove("bump");
      void select.offsetWidth; // force reflow to restart animation
      select.classList.add("bump");
    });

    dial.appendChild(select);
  });
};

function checkCombo() {
  const input = Array.from(document.querySelectorAll(".dial select"))
    .map(sel => sel.value)
    .join("");

  const status = document.getElementById("status");

  if (input === correctPassword) {
    status.textContent = "🪵 Combo Correct — Unlocked!";
    status.className = "unlocked-effect";
  } else {
    status.textContent = "🔥 Incorrect combo. Try again!";
    status.className = "";
  }
}
