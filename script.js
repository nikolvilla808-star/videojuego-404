const accessForm = document.querySelector("#access-form");
const codeInput = document.querySelector("#secret-code");
const statusMessage = document.querySelector("#status-message");
const statusText = statusMessage.querySelector("span:last-child");
const gameScene = document.querySelector(".scene");
const doorLabel = document.querySelector("#door-label");

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
    return;
  }

  setStatus("error", "Acceso denegado. Prueba otra vez.");
  codeInput.select();
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