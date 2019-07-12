export default class Card {
    constructor(name, points, img) {
        this.name = name,
        this.points = points,
        this.img = img,
        this.belongsToSets = [];
    }
    
    addSet(set) {
        this.belongsToSets.push(set);
    }
}