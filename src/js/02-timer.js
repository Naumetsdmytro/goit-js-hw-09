import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

const buttonEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');
buttonEl.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonEl.disabled = false;
      countdownTimer(Date.parse(selectedDates[0]));
    }
  },
};

flatpickr('#datetime-picker', options);

buttonEl.addEventListener('click', onTimerStart);
let timerId = 0;
function onTimerStart() {
  timerId = setInterval(countdownTimer, 1000, Date.parse(inputEl.value));
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function countdownTimer(toDate) {
  const now = Date.now();

  const delta = toDate - now;

  if (delta < 0) {
    clearInterval(timerId);
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(delta);
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}
