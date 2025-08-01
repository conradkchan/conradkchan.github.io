const password = ["12", "34", "56", "78", "90"]; // Set your 5-number password here
const dialElements = Array.from(document.querySelectorAll(".dial"));
const status = document.getElementById("status");
const modal = document.getElementById("modal");
const timestamp = document.getElementById("timestamp");
const closeModal = document.getElementById("closeModal");

// Initialize dropdowns with double-digit numbers
dialElements.forEach(dial => {
  for (let i = 0; i <= 99; i++) {
    const num = i.toString().padStart(2, "0");
    const option = document.createElement("option");
    option.value = num;
    option.textContent = num;
    dial.appendChild(option);
  }
});

// Compare two arrays
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}

function checkPassword() {
  const guess = dialElements.map(d => d.value);
  const lock = document.querySelector('.lock');

  // Trigger spin animation
  lock.classList.remove('spin-on-guess'); // Reset class if already spinning
  void lock.offsetWidth; // Force reflow to restart animation
  lock.classList.add('spin-on-guess');

  // Wait until animation completes (~600ms)
  setTimeout(() => {
    if (arraysEqual(guess, password)) {
      status.textContent = 'Correct';
      status.classList.add('unlocked-effect');
      showModal();
    } else {
      status.textContent = 'INCORRECT';
      status.classList.remove('unlocked-effect');
    }
  }, 600);
}

function showModal() {
  const now = new Date();
  const formatted = now.toLocaleString();
  timestamp.textContent = `Unlocked at: ${formatted}`;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
