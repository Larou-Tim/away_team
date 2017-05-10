var inquirer = require("inquirer");
var Player = require("./player.js");
var db = require("../../models");



var baddie = new doorCard(0, "monster", 'One Eye', "He's evil", 2);

var baddieDeck = [];
baddieDeck.push(baddie);

//-----------------------------------------------------------

// function itemCard(number, name, bonus, item, oneTime) {
//     this.itemNumber = number;
//     this.itemName = name;
//     // this.playPhase = phase;
//     this.bonus = bonus;
//     // this.itemType = type;
//     this.item = item;
//     this.oneTime = oneTime;
//     //other effects?
// }

function doorCard(number, type, name, desc, effect) {
    //String // Monster, Curse, others
    this.cardNumber = number
    this.name = name;
    this.description = desc;
    this.type = type;
    this.effect = effect;

}

var treasureDeck = [];
var awayMissionDeck = [];
var players = [];

function shuffleDeck(cards, deck) {
    //want to look into peoples hands and remove those numbers
    // deck.empty();
    // var cardsOut = [];
    // if (players) {
    //     for (var i = 0; i < players.length; i++) {
    //         for (var j = 0; j < players[i].hand.length; j++) {
    //             cardsOut.push(players[i].hand[j]);
    //         }
    //     }
    // }
    // console.log(cardsOut);

    for (var i = 1; i < cards; i++) {
        // var index = cardsOut.indexOf(i);
        // if (index == -1) {
        deck.push(i);
        // }
    }
    console.log(deck, "before random");
    shuffle(deck);
}

function shuffle(array) {
    var i = 0
        , j = 0
        , temp = null;

    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


shuffleDeck(6, awayMissionDeck);
console.log(awayMissionDeck.length, awayMissionDeck)



var player = new Player('Bob');

players.push(player);

for (var i = 0; i < 5; i++) {
    player.drawCard(awayMissionDeck);
}


console.log(player.name, "has", player.hand);
// console.log(deck.length);

turn(0);

function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}


function turn(val) {
    console.log(players[val].playerName + "'s turn");
    startTurn(val)
}

function startTurn(val) {
    var choiceArray = ["View Hand", "Play card", "Go on Mission", "See Items Out"];
    // console.log(choiceArray);
    inquirer.prompt([
        {
            type: "list",
            message: "Which card would you like to play?",
            choices: choiceArray,
            name: "playCard"
        }
    ]).then(function (user) {
        switch (user.playCard) {
            case choiceArray[0]:
                // viewHand();
                player.showHand();
                startTurn();
                break;
            case choiceArray[1]:
                playCard();
                break;
            case choiceArray[2]:
                awayMission();
                break;
            case choiceArray[3]:
                showOut();
                break;
        }

    });
}

function showOut() {
    for (var i in player.cardsOut) {
        console.log(player.cardsOut[i]);

    }
    startTurn();
}

function playCard() {
    var choiceArray = [];
    for (var i = 0; i < player.hand.length; i++) {
        choiceArray.push(player.hand[i].name);
    }
    choiceArray.push('Return');

    inquirer.prompt([
        {
            type: "list",
            message: "Which card would you like to play?",
            choices: choiceArray,
            name: "playCard"
        }
    ]).then(function (user) {
        if (user.playCard == 'Return') {
            startTurn();
        }
        else {

            var cardIndex = findWithAttr(player.hand, "name", user.playCard);
            var card = player.hand[cardIndex];
            player.cardsOut.push(card);
            player.hand.splice(cardIndex, 1);
        }
        startTurn();
    });
}

function awayMission() {

    var cardNumber = 0; //awayMissionDeck.shift()
    //query DB
    var cardIndex = findWithAttr(baddieDeck, "cardNumber", cardNumber);
    var card = baddieDeck[cardIndex];
    var baddieLevel = card.effect
    var playerEffectiveLevel = player.calcEffectiveLevel();

    console.log("You are fighting", card.name, "Which is level", baddieLevel);
    console.log("You are level", player.level, "Your items make you level", playerEffectiveLevel);

    //play one time cards

    if (playerEffectiveLevel > baddieLevel) {
        console.log("You Win");

    }
    else {
        console.log("You die");
    }


}