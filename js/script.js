'use strict';

const form = document.querySelector('.form');
const tipContainer = form.querySelector('.form__tip');
const billContainer = form.querySelector('.form__bill');
const peopleContainer = form.querySelector('.form__people');
const inputTipContainer = form.querySelector('.form__input-tip');

const numberOfPeopleEl = form.querySelector('#people');
const billEl = document.querySelector('#bill');
const tipEl = document.querySelector('.tip-value');
const totalEl = document.querySelector('.total-value');
const btnResetEl = document.querySelector('.btn-reset');
const btnFormEl = document.querySelector('.btn-form');
let btnTipEl, spanError;

//* FUNCTIONS
function init(e) {
  e.preventDefault();

  billEl.value = '';
  numberOfPeopleEl.value = '';
  if (btnTipEl) btnTipEl.value = '';

  totalEl.textContent = (0).toFixed(2);
  tipEl.textContent = (0).toFixed(2);

  removeClassFromChildren(inputTipContainer, 'form__tip-button--active');
}

function removeClassFromChildren(parent, classToRemove) {
  [...parent.children].forEach(child => child.classList.remove(classToRemove));
}

function getTip(e) {
  e.preventDefault();
  removeClassFromChildren(this, 'form__tip-button--active');

  //? guard clause
  if (!e.target.closest('.form__tip--value')) return;

  //? selects the button clicks
  const btnTip = e.target.closest('.form__tip--value');
  const inputTip = document.querySelector('.form--input.form__tip--value');
  inputTip.value = '';
  //? loops all the child elements for tipContainer and removes the active class

  //? adds the active class to everything except the input element
  if (btnTip.classList.contains('form__tip-button'))
    btnTip.classList.toggle('form__tip-button--active');

  //* stores the button / input clicked
  btnTipEl = btnTip;
}

function renderError(
  parentEl,
  message = 'value must be a <strong>number</strong> greater than 0'
) {
  spanError = document.createElement('span');
  spanError.classList.add('error-message');
  spanError.innerHTML = message;
  parentEl.append(spanError);
  console.log(spanError);
}

function renderTip(e) {
  try {
    spanError &&
      document.querySelectorAll('.error-message').forEach(err => err.remove());
    e.preventDefault();

    const bill = +billEl.value;
    const tipPercent = +btnTipEl.value / 100;
    const numberOfPeople = +numberOfPeopleEl.value;
    // console.log(bill, tipPercent, numberOfPeople);
    const tip = bill * tipPercent;
    const tipPerPerson = tip / numberOfPeople;
    const total = (tip + bill) / numberOfPeople;
    // console.log(tip, total);
    if (!numberOfPeople) renderError(peopleContainer);
    if (tipPercent <= 0) renderError(tipContainer);
    if (!bill) renderError(billContainer);

    //! if the tip is not a number, nothing will be outputted
    if (!total || !tip || !numberOfPeople) throw new Error();

    totalEl.textContent = total.toFixed(2);
    tipEl.textContent = tipPerPerson.toFixed(2);
  } catch (error) {
    renderError(form, 'please fill all the input fields, then try again');
  }
}

//* EVENT LISTENERS
inputTipContainer.addEventListener('click', getTip);
btnFormEl.addEventListener('click', renderTip);
btnResetEl.addEventListener('click', init);
