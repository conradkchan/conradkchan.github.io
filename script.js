const correctPassword = "12345678";

window.onload = () => {
  document.querySelectorAll(".dial").forEach((dial, index) => {
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
      let currentNum = parseInt(dial.dataset.current);
      currentNum = (currentNum + 1) % 10;
      dial.dataset.current = currentNum.toString();

      numbersDiv.style.transition = 'none';
      numbersDiv.style.transform = `translateY(${-110 * currentNum}px)`;
      void numbersDiv.offsetWidth;
      numbersDiv.style.transition = 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
    });
  });

  document.getElementById("unlockBtn").addEventListener("click", () => {
    spinAndCheck();
  });
};

function spinAndCheck() {
  const dials = document.querySelectorAll(".dial");
  const numbersHeight = 110;
  const spins = 3;

  dials.forEach(dial => {
    const numbersDiv = dial.querySelector(".numbers");
    const targetNum = parseInt(dial.dataset.current);
    const totalShift = (10 * spins + targetNum) * numbersHeight;

    numbersDiv.style.transition = 'transform 2s cubic-bezier(0.77, 0, 0.175, 1)';
    numbersDiv.style.transform = `translateY(${-totalShift}px)`;
  });

  setTimeout(() => {
    const input = Array.from(dials).map(d => d.dataset.current).join("");
    const status = document.getElementById("status");

    if (input === correctPassword) {
      status.textContent = "Correct";
      status.className = "unlocked-effect";
    } else {
      status.textContent = "INCORRECT";
      status.className = "";
    }

    dials.forEach(dial => {
      const numbersDiv = dial.querySelector(".numbers");
      const targetNum = parseInt(dial.dataset.current);
      numbersDiv.style.transition = 'none';
      numbersDiv.style.transform = `translateY(${-targetNum * numbersHeight}px)`;
      void numbersDiv.offsetWidth;
    });
  }, 2100);
}
