import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onButtonCreate);

function onButtonCreate(evt) {
  evt.preventDefault();
  let position = 0;
  let step = 0;
  for (let i = 1; i <= formEl.elements.amount.value; i++) {
    createPromise((position = i), Number(formEl.elements.delay.value) + step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            timeout: 3500,
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            timeout: 3500,
          }
        );
      });
    step += Number(formEl.elements.step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
