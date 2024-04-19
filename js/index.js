const $formOne = $('.step.one');
const $formTwo = $('.step.two');
const $formThree = $('.step.three');

const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputemail = $('#email');
const $inputDataNascimento = $('#dataNascimento');
const $inputMiniBio = $('#minibio');
const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');

const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');
const $containerBtnFormTwo = $('#containerBtnFormTwo');
const $btnFormTwo = $('#btnFormTwo');

const $inputHabilidades = $('#habilidades');
const $inputPontosForte = $('#pontosForte');
const $containerBtnFormThree = $('#containerBtnFormThree');
const $btnFormThree = $('#btnFormThree');

const $title = $('#title');
const $stepText = $('#step-text');
const $stepDescription = $('#step-description');

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const cepRegex = /(\d{5})(\d)/;
const nonNumericReplace = /[^\d]/g;

const minLength = 2;
const minLengthTextArea = 10;
const minLengthData = 8;

let nomeValido = false;
let sobrenomeValido = false;
let emailValido = false;
let dataNascimentoValido = false;

let enderecoValido = false;
let cidadeValido = false;
let cepValido = false;

let habilidadesValido = false;
let pontosForteValido = false;

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

  if (!element.value || !element.value.toLowerCase().match(emailRegex)) {
    closest.addClass('error');
    return false;
  }

  closest.removeClass('error');
  return true;
}

function validarFormOne() {
  if (nomeValido && sobrenomeValido && emailValido && dataNascimentoValido) {
    $containerBtnFormOne.removeClass('disabled');
    $btnFormOne.removeClass('disabled');
    $btnFormOne.off('click').on('click', initFormTwo);
  } else {
    $containerBtnFormOne.addClass('disabled');
    $btnFormOne.addClass('disabled');
    $btnFormOne.off('click');
  }
}

function validarFormTwo() {
  if (enderecoValido && cidadeValido && cepValido) {
    $containerBtnFormTwo.removeClass('disabled');
    $btnFormTwo.removeClass('disabled');
    $btnFormTwo.off('click').on('click', initFormThree);
  } else {
    $containerBtnFormTwo.addClass('disabled');
    $btnFormTwo.addClass('disabled');
    $btnFormTwo.off('click');
  }
}

function validarFormThree() {
  if (habilidadesValido && pontosForteValido) {
    $containerBtnFormThree.removeClass('disabled');
    $btnFormThree.removeClass('disabled');
    $btnFormThree.off('click').on('click', salvarNoTrello);
  } else {
    $containerBtnFormThree.addClass('disabled');
    $btnFormThree.addClass('disabled');
    $btnFormThree.off('click');
  }
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
    validarFormOne();
  });

  $inputSobrenome.keyup(function () {
    sobrenomeValido = validarInput(this, minLength);
    validarFormOne();
  });

  $inputemail.keyup(function () {
    emailValido = validarEmail(this, minLength);
    validarFormOne();
  });

  $inputDataNascimento.keyup(function () {
    dataNascimentoValido = validarInput(this, minLengthData);
    validarFormOne();
  });

  $inputDataNascimento.change(function () {
    dataNascimentoValido = validarInput(this, minLengthData);
    validarFormOne();
  });

  $inputMiniBio.keyup(function () {
    validarFormOne();
  });
  $inputDataNascimento.on('focus', function () {
    this.type = 'date';
  });

  $inputDataNascimento.on('blur', function () {
    if (!this.value) {
      this.type = 'text';
    }
  });
}

function initFormTwo() {
  $stepText.text('Passo 2 de 3 - Dados de correspondência');
  $stepDescription.text(
    'Precisamos desses dados para que possamos entrar em contato.'
  );

  $formOne.hide();
  $formTwo.show();

  $inputEndereco.keyup(function () {
    enderecoValido = validarInput(this, minLengthTextArea);
    validarFormTwo();
  });

  $inputCidade.keyup(function () {
    cidadeValido = validarInput(this, minLength);
    validarFormTwo();
  });

  $inputCep.keyup(function () {
    this.value = this.value.replace(nonNumericReplace, '');

    cepValido = validarInput(this, cepRegex);

    if (cepValido) {
      this.value = this.value.replace(cepRegex, '$1-$2');
    }
    validarFormTwo();
  });

  $inputComplemento.keyup(function () {
    validarFormTwo();
  });
}

function initFormThree() {
  $stepText.text('Passo 3 de 3 - Conte-nos sobre você');
  $stepDescription.text(
    'Não economize palavras, aqui é onde você pode se destacar.'
  );

  $formTwo.hide();
  $formThree.show();

  $inputHabilidades.keyup(function () {
    habilidadesValido = validarInput(this, minLengthTextArea);
    validarFormThree();
  });

  $inputPontosForte.keyup(function () {
    pontosForteValido = validarInput(this, minLengthTextArea);
    validarFormThree();
  });
}

function finishForm() {
  $formThree.hide();
  $stepDescription.hide();

  $title.text('Muito obrigado pela sua inscrição!');
  $stepText.text(
    'Entraremos em contato assim que possível, nosso prazo médio de resposta é de 5 dias. Fique atento na sua caixa de email.'
  );
}

async function salvarNoTrello() {
  try {
    const nome = $inputNome.val();
    const sobrenome = $inputSobrenome.val();
    const email = $inputemail.val();
    const dataNascimento = $inputDataNascimento.val();
    const minibio = $inputMiniBio.val();
    const endereco = $inputEndereco.val();
    const complemento = $inputComplemento.val();
    const cidade = $inputCidade.val();
    const cep = $inputCep.val();
    const habilidades = $inputHabilidades.val();
    const pontosForte = $inputPontosForte.val();

    const body = {
      name: `Formulário de candidatura de ${nome} ${sobrenome}`,
      desc: `Seguem os dados do candidato:
      ------------------- Dados pessoais ------------
      Nome: ${nome}
      Sobrenome: ${sobrenome}
      Email: ${email}
      Data de nascimento: ${dataNascimento}
      Minibio: ${minibio}
      ------------------- Dados de correspondência ------------
      Endereço: ${endereco}
      Complemento: ${complemento}
      Cidade: ${cidade}
      CEP: ${cep}
      ------------------- Dados de recrutamento ------------
      Habilidades: ${habilidades}
      Pontos Fortes: ${pontosForte}
      `
    };

    if (
      !nome ||
      !sobrenome ||
      !email ||
      !dataNascimento ||
      !endereco ||
      !complemento ||
      !cidade ||
      !cep ||
      !habilidades ||
      !pontosForte
    ) {
      return alert('Preencha todos os campos corretamente antes de continuar.');
    }

    await fetch(
      'https://api.trello.com/1/cards?idList=66227870b96eb50e98241e49&key=a01d5f91d4d2670e86e2a4e127707762&token=ATTA10e4400813d81e83185c62437b4c20e496b1c7f122373331daaf9e609e74f3dcE966847D',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    return finishForm();
  } catch (error) {
    console.log(`Erro ao salvar no trello: `, error);
  }
}

init();
