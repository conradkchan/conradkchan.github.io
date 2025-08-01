const correctPassword = "12345"; // five-digit code

window.onload = () => {
  document.querySelectorAll(".dial").forEach((dial) => {
    const numbersDiv = document.createElement("div");
    numbersDiv.className = "numbers";
    for (let i = 0; i < 10; i++) {
      const numDiv = document.createElement("div");
      numDiv.textContent = i;
      numbersDiv.appendChild(numDiv);
    }
    numbersDiv.style.transform = `translateY(0px)`;
    dial.appendChild(numbersDiv);
    dial.dataset.current = "0";
    dial.addEventListener("click", () => {
      let cur = (parseInt(dial.dataset.current) + 1) % 10;
      dial.dataset.current = cur.toString();
      numbersDiv.style.transition = 'none';
      numbersDiv.style.transform = `translateY(${-parseInt(getComputedStyle(dial).height)*cur}px)`;
      void numbersDiv.offsetWidth;
      numbersDiv.style.transition = 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
    });
  });
  document.getElementById("unlockBtn").addEventListener("click", spinAndCheck);
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
  });
};

function spinAndCheck() {
  const dials = document.querySelectorAll(".dial");
  const spins = 3;
  dials.forEach(dial => {
    const numbersDiv = dial.querySelector(".numbers");
    const target = parseInt(dial.dataset.current);
    const h = parseInt(getComputedStyle(dial).height);
    const shift = (10*spins + target)*h;
    numbersDiv.style.transition = 'transform 2s cubic-bezier(0.77, 0, 0.175, 1)';
    numbersDiv.style.transform = `translateY(${-shift}px)`;
  });
  setTimeout(() => {
    const guess = Array.from(dials).map(d => d.dataset.current).join("");
    const status = document.getElementById("status");
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
    dials.forEach(dial => {
      const numbersDiv = dial.querySelector(".numbers");
      const t = parseInt(dial.dataset.current);
      const h = parseInt(getComputedStyle(dial).height);
      numbersDiv.style.transition = 'none';
      numbersDiv.style.transform = `translateY(${-t*h}px)`;
      void numbersDiv.offsetWidth;
    });
  }, 2100);
}
