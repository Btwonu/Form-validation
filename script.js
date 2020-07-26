const form = document.getElementById('form');
const username = document.getElementById('user_name');
const userMail = document.getElementById('user_mail');
const password = document.getElementById('user_password');
const passwordConfirm = document.getElementById('user_password_confirm');
// const submitBtn = document.getElementById('submit_btn');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  //Check if fields are empty
  emptyCheck([username, userMail, password, passwordConfirm]);

  //Email check must be afterwards
  validateEmail(userMail);
  
  //Validate username and password length
  lengthCheck(username, 3, 15);
  lengthCheck(password, 6, 32);

  //Require a number and a capital letter in the password
  validatePassword(password);

  //Check if passwords match
  confirmPasswords(password, passwordConfirm);
});

//Declarations
function confirmPasswords(pass, confirm) {
  if ( pass.value.trim() !== confirm.value.trim() ) {
    showError(confirm, "The passwords don't match");
  }
}

function lengthCheck(input, min, max) {
  if (input.value.trim().length < min) {
    showError(input, `The length of the ${input.name.toLowerCase()} must be at least ${min} characters`);
  } else if (input.value.trim().length > max) {
    showError(input, `The length of the ${input.name.toLowerCase()} must not exceed ${max} characters`);
  }
}

function emptyCheck(fieldArr) {
  fieldArr.forEach((field) => {
    if (field.value.trim() === '') {
      let errorMsg = `${field.name} is required`;
      showError(field, errorMsg);
    } else {
      showSuccess(field);
    }
  });
}

function showError(input, message) {
  //Get current form control and set class to form-control + error
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  //Get it's small and change textContent
  const small = formControl.querySelector('small');
  small.textContent = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function validateEmail(input) {
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if ( !emailReg.test(input.value.trim()) ) {
    showError(input, `The ${input.name} is not valid`);
  }
}

function validatePassword(pass) {
  const passReg = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if ( !passReg.test(pass.value.trim()) ) {
    showError(pass, 'The password must contain at least one digit and a capital letter');
  }
}