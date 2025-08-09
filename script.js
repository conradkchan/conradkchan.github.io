const password = ["35", "51", "44", "48", "56"];
const dialElements = Array.from(document.querySelectorAll(".dial"));
const status = document.getElementById("status");
const modal = document.getElementById("modal");
const timestamp = document.getElementById("timestamp");
const closeModal = document.getElementById("closeModal");

// Fill dropdowns with double-digit numbers
dialElements.forEach(dial => {
  for (let i = 0; i <= 99; i++) {
    const num = i.toString().padStart(2, "0");
    const option = document.createElement("option");
    option.value = num;
    option.textContent = num;
    dial.appendChild(option);
  }
});

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}

function checkPassword() {
  const guess = dialElements.map(d => d.value);

  // Spin only the dials
  dialElements.forEach(dial => {
    dial.classList.remove('spin-on-guess');
    void dial.offsetWidth; // Force reflow
    dial.classList.add('spin-on-guess');
  });

  setTimeout(() => {
    if (arraysEqual(guess, password)) {
      status.textContent = 'Correct';
      status.classList.add('unlocked-effect');
      showModal();
    } else {
      status.textContent = 'INCORRECT';
      status.classList.remove('unlocked-effect');
    }
  }, 600); // Match the spin animation duration
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
