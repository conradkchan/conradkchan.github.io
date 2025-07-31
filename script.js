// Set your password here
const correctPassword = "12345678";

window.onload = () => {
  document.querySelectorAll(".dial").forEach((dial, index) => {
    const select = document.createElement("select");
    for (let i = 0; i < 10; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      select.appendChild(option);
    }

    // Spin animation when user changes the value
    select.addEventListener("change", () => {
      select.style.transform = `rotateX(${360 + Math.random() * 360}deg)`;
    });

    dial.appendChild(select);
  });
};

function checkCombo() {
  const input = Array.from(document.querySelectorAll(".dial select"))
    .map(sel => sel.value)
    .join("");

  const status = document.getElementById("status");
  const unlockSound = document.getElementById("unlock-sound");
  const errorSound = document.getElementById("error-sound");

  if (input === correctPassword) {
    status.textContent = "🔓 Combo Correct — Unlocked!";
    status.className = "unlocked-effect";
    unlockSound.play();
  } else {
    status.textContent = "❌ Incorrect combo. Try again!";
    status.className = "";
    errorSound.play();
  }
}
