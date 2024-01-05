const commandHistoryEl = document.getElementById("commandHistory")
const typedTextEl = document.getElementById("typedText")

let currentTypeTextArray = []
let typedCommand = ""
let typedCommandHistory = []

function typeText(command) {
  commandHistoryEl.innerHTML += "<br />"
  command.map(line => {
    commandHistoryEl.innerHTML += line
  })
  // commandHistoryEl.innerHTML += "<br />"
}

function onTerminalLoad() {
  typeText(presentation)
}

setTimeout(() => {
  onTerminalLoad()
}, 0)

function renderTypedText(typedTextArray) {
  typedTextEl.innerHTML = ""

  typedTextArray.map(key => {
    if (key == " ") {
      typedTextEl.innerHTML += "&nbsp;"
    } else {
      typedTextEl.innerHTML += key
    }
  })
}

function handleEnterCommand(typedCommand) {
  console.log(typedCommand)

  typedCommandHistory.push(typedCommand)

  switch (typedCommand) {
    case "clear":
      commandHistoryEl.innerHTML = ""
      break;

    case "whoami":
      typeText(whoami)
      break;

    case "help":
      typeText(help)
      break;

    default:
      typeText(defaultText)
      break;
  }

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

document.addEventListener("keydown", (event) => {
  const key = event.key
  typedCommand = currentTypeTextArray.join("")

  switch (key) {
    case "Enter":
      commandHistoryEl.innerHTML += `<span style='color: var(--highlightHigh);'>visitor@ednerOS:~$ <span style='color: var(--foam);'>${typedCommand}</span><span>`
      currentTypeTextArray = []
      typedTextEl.innerHTML = null
      handleEnterCommand(typedCommand)
      break;

    case " ":
      currentTypeTextArray.push(key)
      renderTypedText(currentTypeTextArray)
      break;

    case "Backspace":
      currentTypeTextArray.pop()
      renderTypedText(currentTypeTextArray)
      break;

    default:
      typedTextEl.innerHTML += key
      currentTypeTextArray.push(key)
      break;
  }

  console.log(currentTypeTextArray)
})