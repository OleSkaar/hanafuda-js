export default class Card {
    constructor(points, img) {
        this.points = points,
        this.img = img,
        this.belongsToSets = [];
    }
    
    addSet(set) {
        this.belongsToSets.push(set);
    }
}