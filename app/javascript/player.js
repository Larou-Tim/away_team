

var Player = function (name) {
    this.playerName = name;
    this.level = 1;
    this.race = 'Human';
    this.weapon;
    this.armor;
    this.ship;
    this.aide;
    this.class = 'None';
    this.cardsOut = [];
    this.hand = [];
    this.drawCard = function (deck) {
        var cardNumber = deck.shift();

        //query DB
        var cardIndex = findWithAttr(test, "itemNumber", cardNumber);
        var card = test[cardIndex];


        this.hand.push(card);
    }
    this.addItem = function (number) {
        var itemIndex = findWithAttr(itemDeck, itemNumber, number);
        this.effectiveLevel += itemDeck[itemIndex].bonus;
        this[itemDeck[itemIndex].itemType] = itemIndex;
    }
    this.calcEffectiveLevel = function () {
        var effectiveLevel = this.level;
        for (var i in this.cardsOut) {
            effectiveLevel += this.cardsOut[i].bonus
        }
        return effectiveLevel;
    }
    this.playCard = function (card) {
        //remove frome hand array and either immediate or add to 
    }
    this.showHand = function () {
        console.log(this.hand);
    }
}
function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

module.exports = Player;