const ALERT = document.getElementsByClassName("alert")[0];
const ENTER = document.getElementsByClassName("enter")[0];
const REMOVE = document.getElementsByClassName("remove")[0];
const RESET = document.getElementsByClassName("reset")[0];
const LETTERS = document.getElementsByClassName("main__letters")[0];
const INPUT = document.getElementsByClassName("textinput")[0];
const QUEUE = [];

window.addEventListener("load", () => {
  if (localStorage.hasOwnProperty("queue"))
    QUEUE.push(...JSON.parse(localStorage.getItem("queue")));
  if (QUEUE.length) printMessages();
});

function inputValidation() {
  return INPUT.value.length;
}

function resetInput() {
  INPUT.value = "";
}

function resetAll() {
  INPUT.value = "";
  QUEUE.length = 0;
  LETTERS.innerHTML = "";
  localStorage.clear();
  throwAlert("All clear!");
}

function addToLocalStorage() {
  localStorage.setItem("queue", JSON.stringify(QUEUE));
}

function dequeue() {
  QUEUE.shift();
  addToLocalStorage();
}

function removeFirstMessage() {
  !QUEUE.length
    ? throwAlert("Nothing to remove")
    : LETTERS.removeChild(LETTERS.firstChild);
  dequeue();
}

function enqueue() {
  QUEUE.push(INPUT.value);
  addToLocalStorage();
}

function throwAlert(text) {
  ALERT.textContent = text;
  ALERT.className = "alert--visible";
  setTimeout(() => {
    ALERT.className = "alert";
  }, "1500");
}

function printMessages() {
  let messages = "";
  for (let i = 0; i < QUEUE.length; i++) {
    messages += `<div class="main__letter"><p class="letter-text">${QUEUE[i]}</p></div>`;
  }
  LETTERS.innerHTML = messages;
}

function addMessage() {
  if (!inputValidation()) throwAlert("Empty input");
  if (inputValidation() && QUEUE.length <= 9) {
    enqueue();
    resetInput();
    addToLocalStorage();
    printMessages();
  }
  if (inputValidation() && QUEUE.length === 10) {
    enqueue();
    dequeue();
    resetInput();
    addToLocalStorage();
    printMessages();
  }
}

function addMessageAfterKeyPress(event) {
  if (inputValidation() && event.keyCode === 13) {
    addMessage();
  }
}

ENTER.addEventListener("click", addMessage);
REMOVE.addEventListener("click", removeFirstMessage);
RESET.addEventListener("click", resetAll);
INPUT.addEventListener("keypress", addMessageAfterKeyPress);
