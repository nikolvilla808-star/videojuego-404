const accessForm = document.querySelector("#access-form");
const codeInput = document.querySelector("#secret-code");
const statusMessage = document.querySelector("#status-message");
const statusText = statusMessage.querySelector("span:last-child");
const gameScene = document.querySelector(".scene");
const doorLabel = document.querySelector("#door-label");
const continueButton = document.querySelector("#continue-button");
const levelOne = document.querySelector("#level-one");
const levelTwo = document.querySelector("#level-two");
const levelNumber = document.querySelector("#level-number");
const bombTimer = document.querySelector(".bomb-display > span");
const bombStatus = document.querySelector("#bomb-status");
const answerButtons = [...document.querySelectorAll(".answer-button")];
const retryButton = document.querySelector("#retry-button");
const bombObjective = document.querySelector("#bomb-objective");
const bombScene = document.querySelector(".bomb-scene");
const bombSceneLabel = document.querySelector("#bomb-scene-label");
let secondsRemaining = 45;
let timerId;
let bombSolved = false;

accessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = codeInput.value.trim();

  if (!/^\d{4}$/.test(code)) {
    setStatus("error", "Introduce un código de cuatro números.");
    codeInput.focus();
    return;
  }

  if (code === "2026") {
    setStatus("success", "Puerta abierta. ¡Nivel completado!");
    gameScene.classList.add("is-open");
    doorLabel.textContent = "PUERTA ABIERTA";
    codeInput.disabled = true;
    accessForm.querySelector("button").disabled = true;
    continueButton.hidden = false;
    return;
  }

  setStatus("error", "Acceso denegado. Prueba otra vez.");
  codeInput.select();
});

continueButton.addEventListener("click", () => {
  levelOne.hidden = true;
  levelTwo.hidden = false;
  levelNumber.textContent = "NIVEL 02";
  levelTwo.querySelector(".answer-button").focus();
  startTimer();
});

answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (bombSolved || secondsRemaining === 0) return;

    if (button.dataset.answer === "20") {
      bombSolved = true;
      clearInterval(timerId);
      answerButtons.forEach((option) => { option.disabled = true; });
      bombStatus.textContent = "¡Correcto! Bomba desactivada. Has escapado de esta trampa.";
      bombStatus.dataset.state = "success";
      bombObjective.textContent = "Nivel 2 superado · Nivel 3 pendiente";
      bombSceneLabel.textContent = "BOMBA DESACTIVADA";
      bombScene.classList.add("is-defused");
      return;
    }

    bombStatus.textContent = "Respuesta incorrecta. ERROR-404 sigue contando.";
    bombStatus.dataset.state = "error";
    button.classList.add("is-wrong");
    window.setTimeout(() => button.classList.remove("is-wrong"), 500);
  });
});

retryButton.addEventListener("click", () => {
  answerButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("is-wrong");
  });
  retryButton.hidden = true;
  bombStatus.textContent = "Elige la respuesta correcta para cortar la señal.";
  bombStatus.dataset.state = "";
  startTimer();
});

codeInput.addEventListener("input", () => {
  codeInput.value = codeInput.value.replace(/\D/g, "").slice(0, 4);
  if (statusMessage.dataset.state === "error") {
    setStatus("", "La cerradura está esperando.");
  }
});

function setStatus(state, message) {
  statusMessage.dataset.state = state;
  statusText.textContent = message;
}

function startTimer() {
  clearInterval(timerId);
  secondsRemaining = 45;
  bombSolved = false;
  updateTimer();
  timerId = window.setInterval(() => {
    secondsRemaining -= 1;
    updateTimer();

    if (secondsRemaining === 0) {
      clearInterval(timerId);
      answerButtons.forEach((button) => { button.disabled = true; });
      bombStatus.textContent = "Tiempo agotado. Reinicia el temporizador para intentarlo otra vez.";
      bombStatus.dataset.state = "error";
      retryButton.hidden = false;
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");
  bombTimer.textContent = `${minutes}:${seconds}`;
  bombScene.classList.toggle("is-critical", secondsRemaining <= 10);
}