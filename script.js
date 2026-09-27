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
const continueBombButton = document.querySelector("#continue-bomb-button");
const levelThree = document.querySelector("#level-three");
const terminalForm = document.querySelector("#terminal-form");
const terminalCode = document.querySelector("#terminal-code");
const terminalStatus = document.querySelector("#terminal-status");
const terminalObjective = document.querySelector("#terminal-objective");
const terminalScene = document.querySelector(".terminal-scene");
const terminalSceneLabel = document.querySelector("#terminal-scene-label");
const monitorResult = document.querySelector("#monitor-result");
let secondsRemaining = 240;
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
      bombObjective.textContent = "Nivel 2 superado";
      bombSceneLabel.textContent = "BOMBA DESACTIVADA";
      bombScene.classList.add("is-defused");
      continueBombButton.hidden = false;
      return;
    }

    bombStatus.textContent = "Respuesta incorrecta. ERROR-404 sigue contando.";
    bombStatus.dataset.state = "error";
    button.classList.add("is-wrong");
    window.setTimeout(() => button.classList.remove("is-wrong"), 500);
  });
});

continueBombButton.addEventListener("click", () => {
  levelTwo.hidden = true;
  levelThree.hidden = false;
  levelNumber.textContent = "NIVEL 03";
  terminalCode.focus();
});

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = terminalCode.value.trim();

  if (!/^\d{4}$/.test(password)) {
    setTerminalStatus("error", "Introduce una contraseña de cuatro números.");
    terminalCode.focus();
    return;
  }

  const digits = [...password].map(Number);
  const matchesClues = digits[0] === 7 && digits[3] === 3 && digits.reduce((sum, digit) => sum + digit, 0) === 18;

  if (!matchesClues) {
    setTerminalStatus("error", "ACCESO DENEGADO. Revisa las tres pistas e inténtalo otra vez.");
    monitorResult.innerHTML = "&gt; contraseña rechazada<span class=\"cursor-block\">_</span>";
    terminalCode.select();
    return;
  }

  setTerminalStatus("success", "ACCESO CONCEDIDO. ¡Has hackeado ERROR-404 y completado el juego!");
  monitorResult.innerHTML = "&gt; acceso concedido<span class=\"cursor-block\">_</span>";
  terminalObjective.textContent = "ERROR-404 hackeada · Juego completado";
  terminalSceneLabel.textContent = "SISTEMA BAJO TU CONTROL";
  terminalScene.classList.add("is-hacked");
  terminalCode.disabled = true;
  terminalForm.querySelector("button").disabled = true;
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

terminalCode.addEventListener("input", () => {
  terminalCode.value = terminalCode.value.replace(/\D/g, "").slice(0, 4);
  if (terminalStatus.dataset.state === "error") {
    setTerminalStatus("", "Esperando contraseña...");
  }
});

function setStatus(state, message) {
  statusMessage.dataset.state = state;
  statusText.textContent = message;
}

function startTimer() {
  clearInterval(timerId);
  secondsRemaining = 240;
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

function setTerminalStatus(state, message) {
  terminalStatus.dataset.state = state;
  terminalStatus.textContent = message;
}