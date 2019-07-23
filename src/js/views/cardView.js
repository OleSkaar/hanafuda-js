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


// When app loads, load cards from data to deck. 
// Split them into 8-card segments, each with its own slide
// For each card in hand, toggle card in deck as empty
// When a card is added or removed, the empty class is toggled and animation plays

// Views:
// Table, cards in 4-card segments, as many as horizontal space allows,
//  vertical overflow pageianted, empty cards transluscent
// Hand, cards entering from top left, gradually overlapping
// Expanded hand, 50%-width 4-card segments overlapping, empty cards transluscent. 
//  Pageinated when overflowing vertically