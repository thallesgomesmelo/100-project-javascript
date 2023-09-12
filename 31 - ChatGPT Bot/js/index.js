const chatLog = document.getElementById("chat-log"),
  userInput = document.getElementById("user-input"),
  sendButton = document.getElementById("send-button"),
  buttonIcon = document.getElementById("button-icon"),
  info = document.querySelector(".info");

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();

  // if message = empty do nothing
  if (message === "") {
    return;
  }
  // if message = developer - show our message
  else if (message === "developer") {
    // clear input value
    userInput.value = "";
    // append message as user - we will code it's function
    appendMessage("user", message);
    // sets a fake timeout that showing loading on send button
    setTimeout(() => {
      // send our message as bot(sender : bot)
      appendMessage(
        "bot",
        "This Source Coded By Reza Mehdikhanlou \nYoutube : @AsmrProg"
      );

      // change button icon to default
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  }

  // else if none of above
  // appends users message to screen
  appendMessage("user", message);
  userInput.value = "";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "0be2505db1msh7f0bfecc3198fe8p1e0a0cjsn7dc4331f3f7a",
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
      // if you want use official api
      /*
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'Your Key',
            'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
            */
    },
    body: `{"messages": [{ "content": "${message}", "role": "user" }], "stream": false}`
    // if you want use official api you need have this body
    // `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${message}"}]}`
  };
  // official api : 'https://openai80.p.rapidapi.com/chat/completions';
  fetch("https://open-ai21.p.rapidapi.com/conversationgpt35", options)
    .then(response => response.json())
    .then(response => {
      appendMessage("bot", response.BOT);

      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    })
    .catch(err => {
      if (err.name === "TypeError") {
        appendMessage("bot", "Error : Check Your Api Key!");
        buttonIcon.classList.add("fa-solid", "fa-paper-plane");
        buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
      }
    });
}

function appendMessage(sender, message) {
  info.style.display = "none";
  // change send button icon to loading using fontawesome
  buttonIcon.classList.remove("fa-solid", "fa-paper-plane");
  buttonIcon.classList.add("fas", "fa-spinner", "fa-pulse");

  const messageElement = document.createElement("div");
  const iconElement = document.createElement("div");
  const chatElement = document.createElement("div");
  const icon = document.createElement("i");

  chatElement.classList.add("chat-box");
  iconElement.classList.add("icon");
  messageElement.classList.add(sender);
  messageElement.innerText = message;

  // add icons depending on who send message bot or user
  if (sender === "user") {
    icon.classList.add("fa-regular", "fa-user");
    iconElement.setAttribute("id", "user-icon");
  } else {
    icon.classList.add("fa-solid", "fa-robot");
    iconElement.setAttribute("id", "bot-icon");
  }

  iconElement.appendChild(icon);
  chatElement.appendChild(iconElement);
  chatElement.appendChild(messageElement);
  chatLog.appendChild(chatElement);
  chatLog.scrollTo = chatLog.scrollHeight;
}

// TODO:
/**
 * - Melhora documentação do código.
 * - Refatorar as funções.
 * - Adicionar favicon
 * - Fazer documentação do REAME.md
 */

// FIXME:
/**
 * - Adicionar bloqueio no campo pergunta quando estiver esperando resporta do fetch
 * - Melhorar adaptação do texto quando mensagens for muito grande.
 */
