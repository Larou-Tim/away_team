$(document).ready(function () {
  var nameInput = $("#player-name");
  // var player = new Player("Test");
  var awayMissionDeck = [];
  var selectedPlayerID;
  var selectedPlayerEffectiveLevel;
  var player;

  // this is a work around until i learn to push in args
  var playersCurrentCards = []

  $(document).on("submit", "#player-form", handleNewPlayer);
  $(document).on("click", "#newGame", handleNewGame);
  $(document).on("click", ".playerSelect", selectPlayer);
  $(document).on("click", "#drawFive", drawFiveCards);
  $(document).on("click", ".cardPlay", handleItemCard);


  //pulls in all players in the DB for selection (this should be log in or something, but testing this will work)
  getPlayers();

  function handleItemCard() {
    //need to pull which item it is based on itemCardID
    //then update player DB based on that item

    //or just have the item be an object that's usuable? 
    var cardNumberSelected = $(this).attr("id").substring(4);
    var selectedItemSpot = $(this).attr("itemSpot");

    var newItemSpot = {
      ItemId: cardNumberSelected,
      itemSpot: selectedItemSpot,
      PlayerId: selectedPlayerID
    };

    // $(this).parent().parent().remove()



    // if (updating) {
    //   item.id = postId;
    //   updatePost(newPost);
    // }
    // else {
    addPlayerItem(newItemSpot);
    // }

  }

  function addPlayerItem(item) {
    console.log(item);
    $.post("/api/playerItems/", item, function () {
    }).then(updateItems);

  }

  function updateItems() {
    $.get("/api/playerItems/" + selectedPlayerID, function (data) {
      if (data) {
        for (var i in data.PlayerItems) {
          var selectedItemSpot;
          console.log(data.PlayerItems[i])
          switch (data.PlayerItems[i].itemSpot) {
            case "Weapon":
              selectedItemSpot = "weapon";
              break;
            case "Armor":
              selectedItemSpot = "armor";
              break;
            case "Aide":
              selectedItemSpot = "aide";
              break;
            case "Ship":
              selectedItemSpot = "ship";
              break;
          }
          $("#" + selectedItemSpot + "Out").text("I need the card thing");
        }
      }

    });

  }

  // A function to handle what happens when the form is submitted to create a new Player
  function handleNewPlayer(event) {
    event.preventDefault();
    console.log('Running input', nameInput.val())
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertPlayer({
      name: nameInput
        .val()
        .trim(),
      level: 1,
      effectiveLevel: 1
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertPlayer(playerData) {
    // console.log("Running post", playerData);
    $.post("/api/players", playerData)
      .then(getPlayers);
  }

  // adds all players to drop down
  function getPlayers() {

    $.get("/api/players", function (data) {
      for (var i = 0; i < data.length; i++) {
        var playerList = $("<li>");
        var playerAnchor = $("<a>")
        playerAnchor.attr("href", "#!");
        playerAnchor.attr("id", "player" + data[i].id);
        playerAnchor.attr("class", "playerSelect");
        playerAnchor.text(data[i].name);
        playerList.append(playerAnchor);
        $("#playerDropdown").append(playerList);
      }
    });
  }

  //i want this shifted to a db pull to pull from table player hand
  function getItemCard() {
    $("#playersHand").empty()
    cards = playersCurrentCards;
    console.log("Cards are ", cards)
    if (cards.length) {
      for (var i in cards) {
        console.log("card search", cards[i])
        $.get("/api/items/" + cards[i], function (data) {

          var cardCol = $("<div>");
          cardCol.attr("class", "col s12 m3");

          var cardDiv = $("<div>");
          cardDiv.attr("class", "card");

          var cardImageDiv = $("<div>");
          cardImageDiv.attr("class", "card-image");
          var cardImage = $("<img>");
          cardImage.attr("src", "https://getmdl.io/assets/demos/welcome_card.jpg");
          cardImageDiv.append(cardImage);

          var cardTitle = $("<span>");
          cardTitle.text(data.name);
          cardImageDiv.append(cardTitle);
          cardDiv.append(cardImageDiv);

          var cardContentDiv = $("<div>");
          cardContentDiv.attr("class", "card-content");
          var cardContentText = $("<p>");
          //need item spot
          cardContentText.text("The " + data.name + " adds a +" + data.bonus + " bonus and uses the " + data.spot + " spot");
          cardContentDiv.append(cardContentText);

          cardDiv.append(cardContentDiv);

          var cardActionDiv = $("<div>");
          cardActionDiv.attr("class", "card-action");

          var cardActionButton = $("<a>");
          cardActionButton.attr("href", "#!");
          cardActionButton.attr("class", "btn waves-effect waves-teal cardPlay");
          cardActionButton.attr("id", "card" + cards[i]);
          cardActionButton.attr("itemSpot", data.spot)
          cardActionButton.text("Play Card");
          cardActionDiv.append(cardActionButton);
          cardDiv.append(cardActionDiv);

          cardCol.append(cardDiv)
          $("#playersHand").append(cardCol);


        });
      }
    }

  }

  function addToPlayerHand(cardID) {
    console.log("card to add to hand", cardID)
    var newCard = {
      // itemSpot: false,
      ItemId: cardID,
      PlayerId: parseInt(selectedPlayerID)
    };
    console.log(newCard);
    $.post("/api/playerHand/", newCard, function () {
    }).then(updateHand);
  }

  function updateHand() {

    $.get("/api/playerHand/" + selectedPlayerID, function (data) {
      console.log("handData", data);
      playersCurrentCards = [];
      for (var i in data) {
        playersCurrentCards.push(data[i].ItemId)
      }
      console.log(playersCurrentCards);
    }).then(getItemCard);
  }

  //updates dropdown for selected player and grabs that players ID for use
  function selectPlayer() {
    $("#playerSelectDrop").text($(this).text());
    selectedPlayerID = $(this).attr("id").substring(6);
    //-**** add get method to pull in seleceted players eLevel
    // player = new Player(selectedPlayerID);

    updateHand()

  }

  //should probably be a back end call if i can figure that out
  function handleNewGame() {

    shuffleDeck(7, awayMissionDeck)
    console.log(awayMissionDeck);

  }

  function drawFiveCards() {
    for (var i = 0; i < 5; i++) {
      var cardNumber = awayMissionDeck.shift();
      // getItemCard(cardNumber);
      addToPlayerHand(cardNumber);
    }

  }


  //pulls cards from item DB


  // i want this back end or require need to ask JHill or someone

  //----------------------------------------
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

    for (var i = 1; i <= cards; i++) {
      // var index = cardsOut.indexOf(i);
      // if (index == -1) {
      deck.push(i);
      // }
    }
    // console.log(deck, "before random");
    shuffle(deck);
    // console.log(deck);
  }

  //randomize the order of the 'cards' in the deck
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


  var Player = function (id) {
    this.playerID = id;
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
      console.log("Hello");
      var cardNumber = deck.shift();
      var tempObj = {}



      $.get("/api/players", function (data) {

      });

      db.Item.findOne({ where: { id: cardNumber } }).done(function (dbItem) {

        // var tempObj = {}
        tempObj.name = dbItem.name;
        tempObj.bonus = dbItem.bonus;
        tempObj.itemNumber = dbItem.id;
        // console.log(tempObj);
        // this.hand.push(tempObj);
      });
      this.hand.push(tempObj);
      //query DB
      // var cardIndex = findWithAttr(test, "itemNumber", cardNumber);
      // var card = test[cardIndex];
      // this.hand.push(card);
    }
    this.addItem = function (number) {
      var itemIndex = findWithAttr(itemDeck, itemNumber, number);
      this.effectiveLevel += itemDeck[itemIndex].bonus;
      this[itemDeck[itemIndex].itemType] = itemIndex;
    }

    this.calcEffectiveLevel = function () {
      var effectiveLevel = this.level;
      for (var i in this.cardsOut) {
        console.log(this.cardsOut[i])
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
  //----------------------------------------

});


