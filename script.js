// Set the correct password
const correctPassword = "12345678";

document.querySelectorAll(".paddle").forEach((paddle, index) => {
  let value = 0;
  paddle.textContent = value;

  paddle.addEventListener("click", () => {
    value = (value + 1) % 10;
    paddle.textContent = value;
  });
});

function checkCombo() {
  const input = Array.from(document.querySelectorAll(".paddle"))
    .map(p => p.textContent)
    .join("");

  const status = document.getElementById("status");

  if (input === correctPassword) {
    status.textContent = "🔓 Unlocked!";
    status.className = "unlocked";
  } else {
    status.textContent = "❌ Wrong combo!";
    status.className = "";
  }
}
