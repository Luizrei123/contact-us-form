const $formOne = $('.step.one');
const $formTwo = $('.step.two');
const $formThree = $('.step.three');

const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputemail = $('#email');
const $inputDataNascimento = $('#dataNascimento');

const $stepText = $('#step-text');
const $stepDescription = $('#step-description');

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const minLength = 2;
const minLengthData = 8;

let nomeValido = false;
let sobrenomeValido = false;
let emailValido = false;
let dataNascimentoValido = false;

function validarInput(element, minLength, maxLength) {
  const closest = $(element).closest('.input-data');

  if (
    !element.value ||
    element.value.trim().length < minLength ||
    element.value.trim().length > maxLength
  ) {
    closest.addClass('error');
    return false;
  }
  closest.removeClass('error');
  return true;
}

function validarEmail(element) {
  const closest = $(element).closest('.input-data');

  if (!element.value || element.value.toLowerCase().match(emailRegex)) {
    closest.addClass('error');
    return false;
  }

  closest.removeClass('error');
  return true;
}

function init() {
  $formTwo.hide();
  $formThree.hide();

  $stepText.text('Passo 1 de 3 - Dados pessoais');
  $stepDescription.text(
    'Descreva seus dados para que possamos te conhecer melhor.'
  );

  $inputNome.keyup(function () {
    nomeValido = validarInput(this, minLength);
  });

  $inputSobrenome.keyup(function () {
    sobrenomeValido = validarInput(this, minLength);
  });

  $inputemail.keyup(function () {
    emailValido = validarEmail(this, minLength);
  });

  $inputDataNascimento.keyup(function () {
    dataNascimentoValido = validarInput(this, minLengthData);
  });

  $inputDataNascimento.change(function () {
    dataNascimentoValido = validarInput(this, minLengthData);
  });
}

$inputDataNascimento.on('focus', function () {
  this.type = 'date';
});

$inputDataNascimento.on('blur', function () {
  if (!this.value) {
    this.type = 'text';
  }
});

init();
