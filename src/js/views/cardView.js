import { DOMStr, elements } from './elements.js';

export const renderCard = (card, el) => {
    const markup = `<img src="${card.img}" class="card" id="${card.name}" data-cardname=${card.name}></img>`;
    el.insertAdjacentHTML('afterbegin', markup);

};

export const removeCard = card => {
    const cardInDOM = document.getElementById(card.name);
    cardInDOM.parentElement.removeChild(cardInDOM);
    renderCard(card, elements.table);
};