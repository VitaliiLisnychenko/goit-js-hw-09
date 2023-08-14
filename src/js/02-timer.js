import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStartEl.addEventListener('click', onStartClick);
btnStartEl.disabled = true;

let slctDate;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    slctDate = selectedDates[0].getTime();
    const remainingTime = slctDate - Date.now();

    if (remainingTime > 0) {
      btnStartEl.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartEl.disabled = true;
    }
  },
});

function onStartClick(evt) {
  const timer = setInterval(() => {
    const remainingTime = slctDate - Date.now();

    if (remainingTime >= 0) {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);

      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);
    } else {
        clearInterval(timer);
    }
  }, 1000);
}
