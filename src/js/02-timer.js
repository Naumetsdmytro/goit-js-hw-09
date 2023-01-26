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

const timerId = setInterval(countdownTimer, 1000);

function countdownTimer() {
  const now = Date.now();
  const tomorrow = new Date(2023, 0, 26, 13, 6);

  const delta = tomorrow - now;

  if (delta < 0) {
    clearInterval(timerId);
    return;
  }

  console.log(convertMs(delta));
}

countdownTimer();
