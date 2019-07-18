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
        cardData.forEach(el => this.deck.set(el.name, new Card(el.name, el.points, el.img)));
    }
    
    loadSets (setData) {
        setData.forEach(el => this.sets.push(new Set(el.points, el.name, el.special, el.cards)));
    }
    
    addCardsToSets() {
        this.sets.forEach(el => el.findCardsInSet(this.deck));
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
    
    getLastCard() {
        return Array.from(this.hand.values()).pop();
    }
    
    undo() {
        // Remove last card from hand
        const lastCard = this.getLastCard();
        
        // Subtract card points from points
        this.points -= lastCard.points;
        this.deck.set(lastCard.name, lastCard);
        this.hand.delete(lastCard.name);
        
        // If last card was in a complete set, move set from complete to partial and subtract set points
        for (const set of this.completeSets) {
            if (set.cardKeys.includes(lastCard.name)) {
                this.partialSets.push(set);
                this.completeSets = this.completeSets.filter(el => el !== set);
                this.points -= set.points;
            }
        }
        
        // If last card was in partial set, if no other cards from set in hand, remove from partial set
        for (const set of lastCard.belongsToSets) {
            let empty = true;
            
            for (const card of set.cardKeys) {
                if (this.hand.has(card)) {
                    empty = false;
                    break;
                } 
            }
            
            if (empty) { 
                this.partialSets = this.partialSets.filter(el => el !== set);
            }
        }
    }
    
    reset() {
        this.hand.forEach((value, key) => this.deck.set(key, value));
        this.hand.clear();
        this.partialSets = [];
        this.completeSets = [];
        this.points = 0;
    }
}