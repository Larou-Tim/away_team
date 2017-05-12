// curses?
// win logic
// learn to deploy this 
//issue when you win, does not correctly display cards



//hall of heros display all dead people, what they had, and what they died to.


$(document).ready(function () {

  var nameInput = $("#player-name");
  // var player = new Player("Test");
  var awayMissionDeck = [];
  var selectedPlayerID;
  var selectedPlayerEffectiveLevel;


  //used to determine if item should be a post/put
  var playerCurrentItems = {
    Weapon: false,
    Armor: false,
    Ship: false,
    Aide: false
  }

  //not used? might want to go back to constructors?
  var player;

  var cardPlayed;

  $(document).on("submit", "#player-form", handleNewPlayer);
  $(document).on("click", "#newGame", handleNewGame);
  // $(document).on("click", ".playerSelect", selectPlayer);
  // $(document).on("click", "#drawFive", drawFiveCards);
  $(document).on("click", ".cardPlay", handleItemCard);
  $(document).on("click", "#awayMission", handleAwayMission);

  $(document).on("click", "#fight", handleFight);
  $(document).on("click", "#runaway", handleRun);

  //pulls in all players in the DB for selection (this should be log in or something, but testing this will work)
  getPlayers();


  // Cards in hand constructor
  function getItemCard(cards) {
    $("#playersHand").empty()
    // console.log(cards);

    if (cards.length) {
      for (var i in cards) {
        // console.log("card search", cards[i].ItemId)
        $.get("/api/items/" + cards[i].ItemId, function (data) {
          // console.log("card data ------- ", data);
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



          // ------ card fab instead of button

          var cardActionButton = $("<a>");
          cardActionButton.attr("class", "btn-floating halfway-fab waves-effect waves-light teal cardPlay");
          cardActionButton.attr("id", "card" + data.id);
          cardActionButton.attr("itemSpot", data.spot)

          var fabIcon = $("<i>");
          fabIcon.attr("class", "material-icons")
          fabIcon.text("add");

          cardActionButton.append(fabIcon);
          cardImageDiv.append(cardActionButton);

          cardDiv.append(cardImageDiv);

          var cardContentDiv = $("<div>");
          cardContentDiv.attr("class", "card-content");

          var cardBonus = $("<h5>");
          cardBonus.text("+" + data.bonus + " " + data.spot);
          cardContentDiv.append(cardBonus);

          var cardContentText = $("<p>");
          //need item spot
          cardContentText.text(data.description);
          cardContentDiv.append(cardContentText);

          cardDiv.append(cardContentDiv);

          cardCol.append(cardDiv)
          $("#playersHand").append(cardCol);


        });
      }
    }

  }

  // constructor to make updates on what item a player has played
  function updateItems() {
    console.log('updating Items for playerID', selectedPlayerID);
    $.get("/api/playerItems/" + selectedPlayerID, function (data) {


      console.log("item update data", data);

      if (data) {
        for (var i in data) {
          var selectedItemSpot;
          // console.log(data.PlayerItems[i])
          switch (data[i].Item.spot) {
            case "Weapon":
              selectedItemSpot = "weapon";
              break;
            case "Armor":
              selectedItemSpot = "armor";
              break;
            case "Helper":
              selectedItemSpot = "helper";
              break;
            case "Ship":
              selectedItemSpot = "ship";
              break;
          }
          $("#" + selectedItemSpot + "Out").text("You have a " + data[i].Item.name + ". This gives you +" + data[i].Item.bonus);

        }
      }
      calcEffectiveLevel()
    });

  }

  //constructor to update the away mission
  function handleAwayMission() {
    console.log('handling mission')

    $.get("/api/door/", function (data) {
      $("#awayTitle").text(data[0].name + " Level " + data[0].level)
      $("#awayContent").text(data[0].description);
      $("#awayMission").remove();

      var newFabFight = $("<a>");
      newFabFight.attr("class", "btn-floating halfway-fab waves-effect waves-light green");
      newFabFight.attr("id", "fight");
      var newFabFightIcon = $("<i>");
      newFabFightIcon.attr("class", "material-icons");
      newFabFightIcon.text("play_arrow");
      newFabFight.attr("doorCard", data[0].id);

      newFabFight.append(newFabFightIcon);
      $("#awayMissionInner").append(newFabFight);

      var newFabRun = $("<a>");
      newFabRun.attr("class", "btn-floating halfway-fab waves-effect waves-light orange");
      newFabRun.attr("id", "runaway");
      var newFabRunIcon = $("<i>");
      newFabRunIcon.attr("class", "material-icons");
      newFabRunIcon.text("call_missed");
      newFabRun.attr("doorCard", data[0].id);

      newFabRun.append(newFabRunIcon);
      $("#awayMissionInner").append(newFabRun);

    });
  }


  // handler for when run away button is selected
  function handleRun() {
    var doorCard = $(this).attr("doorCard")
    var runChance = Math.random()
    if (runChance > .66) {
      //run succeed 
      resetAwayCard();
    }
    else {
      handleFight(doorCard);
    }
  }

  function handleFight(doorCard) {
    //first get player's effective level
    // then compare 
    // then we decide what happens
    var playerLevel;
    var enemyLevel;
    var reward;
    var doorCard = $(this).attr("doorCard") || doorCard;

    $.get("/api/players/" + selectedPlayerID, function (data) {
      playerLevel = data[0].effectiveLevel;
      $.get("/api/doors/" + doorCard, function (data) {
        console.log("---------- Door data", data)
        enemyLevel = data[0].level;
        reward = data[0].treasure;
        if (playerLevel > enemyLevel) {
          drawNCards(reward);
          updatePlayerLevel(1);
          resetAwayCard();
        }
        else {
          handleLoss();
        }
      });

    });





  }

  function handleLoss() {

    $.ajax({
      method: "DELETE",
      url: "/api/players/" + selectedPlayerID
    });

    resetPage();
    //display death



  }

  function resetPage() {
    resetAwayCard();
    $("#playersHand").empty();
    $("#totalBonus").text("You ded, no bonus for you");
    $("#weaponOut").text("You don't have any weapons");
    $("#armorOut").text("You don't have any armor");
    $("#helperOut").text("You don't have a helper");
    $("#shipOut").text("You don't have a ship");

  }
  // function when player uses card from hand to play to items
  // grabs current static player and data stored on the button of the item
  // then runs api call to create/update that players items
  // runs either updatePlayerItem() or addPlayerItem

  function updatePlayerLevel(levels) {
    $.get("/api/players/" + selectedPlayerID, function (data) {
      var playerCurrentLevel = data[0].level;
      playerCurrentLevel += levels;

      if (playerCurrentLevel > 0) {
        $.ajax({
          method: "PUT",
          url: "/api/playerLevelUp",
          data: {
            id: selectedPlayerID,
            level: playerCurrentLevel
          }
        });
        updateHand()
        updateItems();
      }
      else {
        console.log("You ded");
      }
    });
  }



  function handleItemCard() {

    var cardNumberSelected = $(this).attr("id").substring(4);
    var selectedItemSpot = $(this).attr("itemspot");

    var newItemSpot = {
      ItemId: cardNumberSelected,
      spot: selectedItemSpot,
      PlayerId: selectedPlayerID
    };

    cardPlayed = cardNumberSelected;

    var updating = playerCurrentItems[selectedItemSpot];

    //add or update to playersItemsOut
    //using simple selector instead of pulling from server could update

    if (updating) {
      // item.id = postId;
      updatePlayerItem(newItemSpot);

    }
    else {
      console.log("add it");
      playerCurrentItems[selectedItemSpot] = true;
      addPlayerItem(newItemSpot);
    }

  }

  //calls the api to insert new row into table PlayerItem then calls deleteFromHand to remove card
  function addPlayerItem(item) {

    $.post("/api/playerItems/", item, function () {
    }).then(deleteFromHand);

  }

  //calls the api to updates players item to new item then calls deleteFromHand to remove card

  function updatePlayerItem(item) {
    $.ajax({
      method: "PUT",
      url: "/api/playerItems",
      data: item
    })
      .done(deleteFromHand);
  }

  //removes card from players hand and then updates items and hand
  function deleteFromHand() {
    if (cardPlayed) {
      $.ajax({
        method: "DELETE",
        url: "/api/playerHand/" + cardPlayed + "/" + selectedPlayerID
      })
        .done(function () {
          updateHand();
          updateItems();
          cardPlayed = ""
        });
    }
  }

  function calcEffectiveLevel() {
    var bonus = {
      level: 1,
      Armor: 0,
      Weapon: 0,
      Ship: 0,
      Helper: 0
    }

    $.get("/api/playerItems/" + selectedPlayerID, function (data) {
      if (data) {

        for (var i in data) {
          bonus[data[i].Item.spot] = data[i].Item.bonus
        }
      }

      var totalBonus = bonus.level + bonus.Armor + bonus.Weapon + bonus.Ship + bonus.Helper;
      $("#totalBonus").text(totalBonus)
      updateEffectiveLevel(totalBonus);
    });


  }

  function updateEffectiveLevel(level) {
    console.log("updating level to ", level)
    var query = {
      id: selectedPlayerID,
      effectiveLevel: level
    }

    $.ajax({
      method: "PUT",
      url: "/api/playerELevel/",
      data: query

    })
  }

  //---------- needs update call if no item in slot
  //handle to display the items a player has out
  //calls api to get items associated with that player


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
      effectiveLevel: 1,
      race: "Human",
      class: "Captain"
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertPlayer(playerData) {
    // console.log("Running post", playerData);
    $.post("/api/players", playerData, function (data) {
      // console.log(data);
      selectedPlayerID = data.id

    }).then(function () {
      drawNCards(4);
    });

  }

  //function removed___________________________________________________
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


  function addToPlayerHand(cardID) {
    console.log("card to add to hand", cardID)
    var newCard = {
      // itemSpot: false,
      ItemId: cardID,
      PlayerId: parseInt(selectedPlayerID)
    };
    console.log(newCard);
    $.post("/api/playerHand/", newCard, function () {
    });
  }

  function updateHand() {
    $("#playersHand").empty();
    $.get("/api/playerHand/" + selectedPlayerID, function (data) {
      // console.log("handData", data);

      getItemCard(data)

    });
  }

  //updates dropdown for selected player and grabs that players ID for use
  function selectPlayer() {
    $("#playerSelectDrop").text($(this).text());
    selectedPlayerID = $(this).attr("id").substring(6);
    //-**** add get method to pull in seleceted players eLevel
    // player = new Player(selectedPlayerID);

    updateHand()
    updateItems();
  }


  function resetAwayCard() {

    $("#awayMissionInner").empty();

    var awayImg = $("<img>");
    awayImg.attr("src", "https://media0.giphy.com/media/QhcPmeqippizS/200.webp#15-grid1")
    awayImg.attr("height", "250px")
    $("#awayMissionInner").append(awayImg);
    var awayTitle = $("<span>");
    awayTitle.attr("class", "card-title");
    awayTitle.attr("id", "awayTitle");
    awayTitle.text("Away Mission");
    $("#awayMissionInner").append(awayTitle);

    var awayButton = $("<a>");
    awayButton.attr("class", "btn-floating halfway-fab waves-effect waves-light red");
    awayButton.attr("id", "awayMission");
    var awayButtonIcon = $("<i>");
    awayButtonIcon.attr("class", "material-icons")
    awayButtonIcon.text("add");
    awayButton.append(awayButtonIcon);
    $("#awayMissionInner").append(awayButton);
    $("#awayContent").text("Go on an away Mission!");

  }
  //should probably be a back end call if i can figure that out
  function handleNewGame() {
    awayMissionDeck = [];
    shuffleDeck(28, awayMissionDeck)
    console.log(awayMissionDeck);

  }

  function drawNCards(n) {
    $.get("/api/treasure/" + n, function (data) {

      for (var i = 0; i < data.length; i++) {

        // getItemCard(cardNumber);
        addToPlayerHand(data[i].id);
      }
      updateHand();
    });
  }

});


