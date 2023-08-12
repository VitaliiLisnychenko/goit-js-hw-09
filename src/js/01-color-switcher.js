const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);
btnStop.disabled = true;

let timeInerval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartClick(evt) {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timeInerval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick(evt) {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timeInerval);
}
