const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    const itemList = items.querySelectorAll('.item');
    for(let i=0;i<itemList.length;i++) {
      let checkbox = itemList[i].querySelector('.item__checkbox');
      let text = itemList[i].querySelector('.item__text');
      let button = itemList[i].querySelector('.item__button');

      checkbox.addEventListener('click', finish);
      text.addEventListener('click', edit);
      button.addEventListener('click', deleteItem);
    }
  }
//<li class="item">
  //<input type="checkbox" class="item__checkbox">
  //<span class="item__text">Klára verkefni</span>
  //<button class="item__button">Eyða</button>
  function formHandler(e) {
    e.preventDefault();
    const { target } = e;
    const { parentNode } = target;
    let textContent = document.querySelector('.form__input');
    let value = textContent.value;

    if(value.replace(/\s+/g, '') !== '') {
      let items = parentNode.querySelector('.items');
      let item = el('li', 'item');
      items.appendChild(item);

      let checkbox = el('input', 'item__checkbox', finish);
      checkbox.setAttribute('type', 'checkbox');
      item.appendChild(checkbox);

      let spen = el('span', 'item__text', edit);
      spen.textContent = value;
      item.appendChild(spen);

      let button = el('button', 'item__button', deleteItem);
      button.textContent = 'Eyða';
      item.appendChild(button);
    }

  }

  // event handler fyrir það að klára færslu checkbox
  function finish(e) {
    const { target } = e;
    target.parentNode.classList.toggle('item--done');
    //er til í css file
  }

  // event handler fyrir það að breyta færslu texti
  function edit(e) {
    const { target } = e;
    const { textContent, parentNode } = target;
    parentNode.removeChild(target);

    //bua til element sem er input en ekki span
    let input = el('input', 'item__edit');
    input.addEventListener('keyup', commit);
    input.setAttribute('type', 'text');
    const button = parentNode.querySelector('.item__button');
    parentNode.insertBefore(input, button);
    input.value = textContent;
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu texti
  function commit(e) {
    //gerir övugt við edit
    const { keyCode} = e;
    if(keyCode === ENTER_KEYCODE) {
      const { target } = e;
      const { value, parentNode } = target;
      parentNode.removeChild(target);

      let span = el('span', 'item__text', edit);
      const button =  parentNode.querySelector('.item__button');
      parentNode.insertBefore(span, button);
      span.textContent = value;
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    let element = document.createElement('li');
    element.className = 'item';

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = 'item__checkbox';

    let text = document.createElement('span');
    text.className = 'item__text';
    text.textContent = value;

    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Eyða'));
    button.className = 'item__button';

    element.appendChild(checkbox);
    element.appendChild(text);
    element.appendChild(button);

    items.appendChild(element);

    checkbox.addEventListener('click', finish);
    text.addEventListener('click', edit);
    button.addEventListener('click', deleteItem);

  }

  // event handler til að eyða færslu eyða takki
  function deleteItem(e) {
    //jafngilt og const breyta = e.target;
    const { target } = e;
    const parent = target.parentNode;
    //removar childið á ul
    parent.parentNode.removeChild(parent);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {

    //bua til element
    let element = document.createElement(type);

    //gefa class
    element.classList.add(className);
    if(clickHandler != null) {
      element.addEventListener('click', clickHandler);
    }
    return element;
  }

  return {
    init: init
  }
})();

//býr til element í body
//let element = document.createElement('span');
//element.appendChild(document.createTextNode('Supper'));
//let thebody = document.querySelector('body');
//thebody.appendChild(element);

//bætir við class í element efninu
//element.classList.add('container');
