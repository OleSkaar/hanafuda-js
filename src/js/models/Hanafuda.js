import Card from './Card.js';
import Set from './Set.js';
import * as cardView from '../views/cardView.js';

export default class Hanafuda {
    constructor() {
        this.sets = [],
        this.deck = new Map(),
        this.hand = new Map(),
        this.partialSets = [],
        this.completeSets = [],
        this.points = 0;
    }
    
    loadCards (cardData) {
        cardData.forEach(el => {
            this.deck.set(el.name, new Card(el.points, el.img));
            cardView.renderCard(el);
        });
    }
    
    loadSets (setData) {
        setData.forEach(el => {
            this.sets.push(new Set(el.points, el.name, el.special, el.cards));
        });
    }
    
    addCardsToSets() {
        this.sets.forEach(el => {
            el.findCardsInSet(this.deck);
            });
    }
    
    loadState() {
        // Get state from cookie
        // For each card in cookies, add card to hand
    }
    
    addCardToHand(cardKey) {
        const card = this.deck.get(cardKey);
        this.points += card.points;
        this.deck.delete(cardKey);
        this.hand.set(cardKey, card);
        // For each set card belongs to, check if it's in partial or complete, 
        // if not add to partial,
        // else check if set is complete, if yes, move to complete
        
        for (const set of card.belongsToSets) {
            
            if (!this.completeSets.includes(set)) {
                if (!this.partialSets.includes(set)) {
                    this.partialSets.push(set);

                } else {
                    
                    let complete = false;
                    for (let i = 0; i < set.cardKeys.length; i++) {
                        if (this.hand.has(set.cardKeys[i])) {
                            complete = true;
                        } else {
                            complete = false;    
                            break;
                        }
                    }
                    
                    if (complete) {
                        this.partialSets = this.partialSets.filter(el => el !== set);
                        this.completeSets.push(set);
                        this.points += set.points;
                    }
                }
            }
        }
        console.log(`Points: ${this.points}`);
    }
}