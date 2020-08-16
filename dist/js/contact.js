const contactForm = document.getElementById('form');
const name = document.getElementById('formName');
const email = document.getElementById('formEmail');
const userMessage = document.getElementById('formUserMessage');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  // get values
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const userMessageValue = userMessage.value.trim();

  if (nameValue === '') {
    // show error
    // add error class
    setErrorFor(name, 'Please add your name');
  } else {
    // add success class
    setSuccessFor(name);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Please add your email');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Please add a valid email address');
  } else {
    setSuccessFor(email);
  }

  if (userMessageValue === '') {
    // show error
    // add error class
    setErrorFor(userMessage, 'Please add a message');
  } else if (userMessageValue.length > 5000) {
    setErrorFor(userMessage, 'Max length = 5000 characters');
  } else {
    // add success class
    setSuccessFor(userMessage);
  }

  // submit form if no errors
  if (
    !(nameValue === '') &&
    !(emailValue === '') &&
    isEmail(emailValue) &&
    !(userMessageValue === '') &&
    !(userMessageValue.length > 5000)
  ) {
    contactForm.submit();
  }
}

function setErrorFor(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector('small');

  // add error message inside small
  small.innerText = message;

  // add error class
  formGroup.className = 'form-group error';
}

function setSuccessFor(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
