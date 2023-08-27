import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

feedbackForm.addEventListener('input', throttle(saveFormState, 500));
feedbackForm.addEventListener('submit', handleSubmit);

function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formState));
}

function restoreFormState() {
  try {
    const savedFormState = localStorage.getItem(storageKey);
    if (savedFormState) {
      const { email, message } = JSON.parse(savedFormState);
      emailInput.value = email;
      messageInput.value = message;
    }
  } catch (error) {
    console.error('Error restoring form state:', error);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log('Form submitted with data:', formState);

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
}

restoreFormState();

