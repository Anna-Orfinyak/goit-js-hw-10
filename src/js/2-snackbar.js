import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

    const form = document.querySelector('.form');
    const delayInput = form.querySelector('input[name="delay"]');
    const stateInputs = form.querySelectorAll('input[name="state"]');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const delay = Number(delayInput.value);
        const selectedState = [...stateInputs].find(input => input.checked)?.value;

        createPromise(delay, selectedState === 'fulfilled')
            .then((resDelay) => {
                iziToast.success({
                    title: '✅ Success',
                    message: `Fulfilled promise in ${resDelay}ms`,
                    position: 'topRight',
                });
            })
            .catch((resDelay) => {
                iziToast.error({
                    title: '❌ Error',
                    message: `Rejected promise in ${resDelay}ms`,
                    position: 'topRight',
                });
            });
        form.reset(); 
    });

    function createPromise(delay, shouldResolve) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                shouldResolve ? resolve(delay) : reject(delay);
            }, delay);
        });
    }
