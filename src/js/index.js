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
hanafuda.hand.forEach(card => cardView.renderCard(card, elements.hand));
hanafuda.deck.forEach(card => cardView.renderCard(card, elements.table));

// 6. Set event listeners

elements.table.addEventListener('click', function (event) {
    
    if (event.target.matches(DOMStr.card)) {

        elements.hand.appendChild(event.target);
        hanafuda.addCardToHand(event.target.dataset.cardname);
        pointsView.renderPoints(hanafuda.points);
        pointsView.renderSets(hanafuda.completeSets.length);  
    } 
     
}, false);        

elements.undo.addEventListener('click', () => {
    if (hanafuda.hand.size > 0) {
        const lastCard = hanafuda.getLastCard();
        hanafuda.undo();
        pointsView.renderPoints(hanafuda.points);
        pointsView.renderSets(hanafuda.completeSets.length);
        cardView.removeCard(lastCard);
    }
    
});

elements.new.addEventListener('click', () => {
    if (hanafuda.hand.size > 0) {
        const confirm = window.confirm('Do you want to reset the game? All your points will be lost.');
        hanafuda.hand.forEach(el => cardView.removeCard(el));
        hanafuda.reset();
        pointsView.renderPoints(hanafuda.points);
        pointsView.renderSets(hanafuda.completeSets.length);
    }
});

elements.info.addEventListener('click', () => {
    if (elements.infobox.style.display === 'none') {
        elements.infobox.style.display = 'block';
    } else {
        elements.infobox.style.display = 'none';
    }
    
});

elements.more.addEventListener('click', () => {
    if (hanafuda.hand.size > 0) {
        if (elements.expandedhand.style.display === 'none') {
            elements.expandedhand.style.display = 'block';
        } else {
            elements.expandedhand.style.display = 'none';
        }    
        pointsView.renderHand(hanafuda.hand, hanafuda.completeSets, hanafuda.partialSets);
    }
});

// Views for points and sets
// Undo functionality by going backwards through cards in hand one by one
// Reset functionality, clear all cards in hand 
// View for question mark with expanatory text
// Dropdown menu for partial and completed sets