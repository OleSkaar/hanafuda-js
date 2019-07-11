import Hanafuda from './models/Hanafuda.js';
import cards from '../data/cards.json';
import sets from '../data/sets.json';

console.log('Index.js loaded.');

// 1. Create Hanafuda object
const hanafuda = new Hanafuda();

//2. Load data and create cards and sets
hanafuda.loadCards(cards);
hanafuda.loadSets(sets);

// 3. Add cards to sets
hanafuda.addCardsToSets();

// 4. Load state, if any, from cookies

// 5. Load cards in UI

// 6. Set event listeners

    var setupEventListeners = function() {      
    
        document.addEventListener('click', function (event) {
            
            if (event.target.matches('.card') && event.target.parentElement.matches('#table')) {
                document.querySelector('#hand').appendChild(event.target);
                hanafuda.addCardToHand(event.target.dataset.cardname);
            }
            
        }, false);        
    };

setupEventListeners();


// Views for points and sets
// Dropdown menu for partial and completed sets
// Reset functionality, clear all cards in hand 
// Undo functionality by going backwards through cards in hand one by one
// View for question mark with expanatory text


