const correctPassword = "1305772842"; // 5 double-digit numbers

document.addEventListener("DOMContentLoaded", () => {
  const dials = document.querySelectorAll(".dial");

  // Populate each select with numbers 00–99
  for (let i = 0; i < 100; i++) {
    const value = i.toString().padStart(2, "0");
    dials.forEach(select => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  document.getElementById("unlockBtn").addEventListener("click", checkCombo);
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
  });
});

function checkCombo() {
  const dials = document.querySelectorAll(".dial");
  const guess = Array.from(dials).map(d => d.value).join("");
  const status = document.getElementById("status");

  // Animate each dial on guess
  dials.forEach(dial => {
    dial.classList.remove("spin-on-guess");
    void dial.offsetWidth; // Force reflow to restart animation
    dial.classList.add("spin-on-guess");
  });

  if (guess === correctPassword) {
    status.textContent = "Correct";
    status.className = "unlocked-effect";
    const ts = new Date();
    document.getElementById("timestamp").textContent = ts.toLocaleString();
    document.getElementById("modal").classList.remove("hidden");
  } else {
    status.textContent = "INCORRECT";
    status.className = "";
  }
}
