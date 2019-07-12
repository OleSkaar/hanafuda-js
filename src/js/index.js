import '../css/style.css';
import Hanafuda from './models/Hanafuda.js';
import cards from '../data/cards.json';
import sets from '../data/sets.json';
import * as cardView from './views/cardView.js';
import * as pointsView from './views/pointsView.js';
import { DOMStr, elements } from './views/elements.js';

console.log('Index.js loaded.');

// 1. Create Hanafuda object
const hanafuda = new Hanafuda();

//2. Load data and create cards and sets
hanafuda.loadCards(cards);
hanafuda.loadSets(sets);

// 3. Add cards to sets
hanafuda.addCardsToSets();

// 4. Load state, if any, from cookies
// For each card in hand from cookies, move card from deck to hand

// 5. Load cards in UI
hanafuda.hand.forEach(el => cardView.renderCard(el, elements.hand));
hanafuda.deck.forEach(el => cardView.renderCard(el, elements.table));

// 6. Set event listeners
    
document.addEventListener('click', function (event) {
        
    if (event.target.matches(DOMStr.card) && event.target.parentElement.matches(DOMStr.table)) {
        elements.hand.appendChild(event.target);
        hanafuda.addCardToHand(event.target.dataset.cardname);
        pointsView.renderPoints(hanafuda.points);
    }
            
}, false);        



// Views for points and sets
// Dropdown menu for partial and completed sets
// Reset functionality, clear all cards in hand 
// Undo functionality by going backwards through cards in hand one by one
// View for question mark with expanatory text


