const contactForm = document.getElementById('form');
const name = document.getElementById('formName');
const email = document.getElementById('formEmail');
const userMessage = document.getElementById('formUserMessage');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  // sanitize input values
  const nameRaw = DOMPurify.sanitize(name.value, {
    FORBID_ATTR: ['width', 'height', 'style'],
    FORBID_TAGS: ['style'],
  });
  const emailRaw = DOMPurify.sanitize(email.value, {
    FORBID_ATTR: ['width', 'height', 'style'],
    FORBID_TAGS: ['style'],
  });
  const userMessageRaw = DOMPurify.sanitize(userMessage.value, {
    FORBID_ATTR: ['width', 'height', 'style'],
    FORBID_TAGS: ['style'],
  });

  const nameValue = nameRaw.trim();
  const emailValue = emailRaw.trim();
  const userMessageValue = userMessageRaw.trim();

  if (nameValue === '') {
    // show error
    // add error class
    setErrorFor(name, '請加上你的名字');
  } else {
    // add success class
    setSuccessFor(name);
  }

  if (emailValue === '') {
    setErrorFor(email, '請添加您的電子郵件');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, '請添加一個有效的電子郵件地址');
  } else {
    setSuccessFor(email);
  }

  if (userMessageValue === '') {
    // show error
    // add error class
    setErrorFor(userMessage, '請添加一條消息');
  } else if (userMessageValue.length > 5000) {
    setErrorFor(userMessage, '最大長度= 5000個字符');
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
