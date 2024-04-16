const $formOne = $('.step.one');
const $formTwo = $('.step.two');
const $formThree = $('.step.three');

const $stepText = $('#step-text');
const $stepDescription = $('#step-description');

function init() {
  $formTwo.hide();
  $formThree.hide();

  $stepText.text('Passo 1 de 3 - Dados pessoais');
  $stepDescription.text(
    'Descreva seus dados para que possamos te conhecer melhor.'
  );
}

init();
