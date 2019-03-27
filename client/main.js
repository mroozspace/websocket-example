const url = 'ws://127.0.0.1:3000/';
const destroyMessageTreshold = 8000;

const form = document.querySelector('#form');
const message = document.querySelector('#message');
const messages = document.querySelector('#messages');

const xhr = new XMLHttpRequest();
const socket = new WebSocket(url);

const sendMessage = e => {
  e.preventDefault && e.preventDefault();
  if (message.value) {
    socket.send(message.value);
  }
  message.value = '';
};

const showMessage = ({ data }) => {
  const message = document.createElement('div');
  message.className = 'message';
  message.innerText = data;
  messages.appendChild(message);

  setTimeout(() => message.classList.toggle('visible'), 300)
  setTimeout(() => message.classList.toggle('visible'), destroyMessageTreshold - 300)
  setTimeout(() => {
    messages.removeChild(message);
  }, destroyMessageTreshold);
};

const handleSubmit = ({ code }) => {
  if (code === 'Enter') {
    sendMessage({});
  }
};

socket.addEventListener('message', showMessage);
form.addEventListener('submit', sendMessage);
window.addEventListener('keypress', handleSubmit);
