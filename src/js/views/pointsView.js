import { elements, DOMStr } from './elements.js';
import * as cardView from './cardView.js';

export const renderPoints = points => elements.points.innerHTML = points;
export const renderSets = sets => elements.sets.innerHTML = sets;


export const renderHand = (hand, completeSets, partialSets) => {
    
    const helper = (sets, DOMelement) => {
        if (sets.length < 1) {
            DOMelement.style.display = 'none';
        } else {
            sets.forEach(set => {
                // If set with id doesn't exist in DOM
                if (!document.getElementById(set.name)) {
                    const markup = `<h3>${set.name}</h3><div class="${DOMStr.cardBox}" id="${set.name}"></div>`;
                    DOMelement.style.display = 'block';
                    DOMelement.insertAdjacentHTML('beforeend', markup);
                    set.cards.forEach(card => {
                        cardView.renderCard(card, document.getElementById(set.name));
                        if (!hand.has(card.name)) document.getElementById(card.name).classList.add('empty');
                    });
                } else {
                    set.cards.forEach(card => {
                        if (hand.has(card.name)) document.getElementById(card.name).classList.remove('empty');
                    });
                }
            });
        }
    };
    
    helper(completeSets, document.getElementById('complete'));
    helper(partialSets, document.getElementById('partial'));
};