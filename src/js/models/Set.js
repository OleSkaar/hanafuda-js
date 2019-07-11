export default class Set {
    constructor(points, name, specialEffect, cardKeys) {
        this.points = points,
        this.name = name,
        this.specialEffect = specialEffect,
        this.cardKeys = cardKeys,
        this.cards = [];
    }
    
    findCardsInSet(deck) {
        for (const key of this.cardKeys) {
            if (deck.get(key)) {
                this.cards.push(deck.get(key));
                deck.get(key).addSet(this);
            } else {
                alert(`Card "${key}" does not exist in deck!`);
            }
        }
    }
}