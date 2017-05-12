// 
// update rikers beard img

//issue when you win, does not correctly display cards
//issue on death it doesn't let you keep playing
//issue curse not reseting away mission



//spit player - api - routes

//hall of heros display all dead people, what they had, and what they died to.
// will use a modal pop up to display the winners and losers
// will make tables before the records are destroyed from the player DB


$(document).ready(function () {
  $('.modal').modal()
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
  // $(document).on("click", "#newGame", handleNewGame);
  $(document).on("click", ".cardPlay", handleItemCard);
  $(document).on("click", "#awayMission", handleAwayMission);
  $(document).on("click", "#fight", handleFight);
  $(document).on("click", "#runaway", handleRun)
  $(document).on("click", "#resolve", handleCurse);

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
          cardDiv.attr("id", "item-card")


          var cardImageDiv = $("<div>");


          cardImageDiv.attr("class", "card-image");
          var cardImage = $("<img>");
          cardImage.attr("id", "item-image")
          cardImage.attr("src", "images/" + data.image);
          cardImageDiv.append(cardImage);

          var cardTitle = $("<span>");
          cardTitle.text(data.name);
          cardTitle.attr("class", "card-title")
          cardTitle.attr("id", "item-title")
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
          cardContentDiv.attr("id", "item-content");

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

    // add if stmt to determine if its a monster /curse
    // if curse only add resolve button
    // test fields seem to change slighting on curses, so look into that
    // resulve card will call function resolveCurse and then reset the the away card 

    $.get("/api/door/", function (data) {

      if (data[0].type == 'curse') {
        console.log("add curse")
        var newFabResolve = $("<a>");
        newFabResolve.attr("class", "btn-floating halfway-fab waves-effect waves-light pink");
        newFabResolve.attr("id", "resolve");
        var newFabResolveIcon = $("<i>");
        newFabResolveIcon.attr("class", "material-icons");
        newFabResolveIcon.text("visibility");
        newFabResolve.append(newFabResolveIcon);
        newFabResolve.attr("doorCard", data[0].id);
        $("#awayMissionInner").append(newFabResolve);
        $("#away-title").text(data[0].name)

      }
      else {
        console.log("handle fight");
        var newFabFight = $("<a>");
        newFabFight.attr("class", "btn-floating halfway-fab waves-effect waves-light green");
        newFabFight.attr("id", "fight");
        var newFabFightIcon = $("<i>");
        newFabFightIcon.attr("class", "material-icons");
        newFabFightIcon.text("my_location");
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
        $("#away-title").text(data[0].name + " Level " + data[0].level)

        newFabRun.append(newFabRunIcon);
        $("#awayMissionInner").append(newFabRun);
      }

      $("#awayContent").text(data[0].description);
      $("#awayMission").remove();
      $("#door-image").attr("src", "images/" + data[0].image)

    });
  }

  //handle when a player clicks on the curse button
  function resolveCurse(curse) {
    console.log("The curse is", curse);
    /* first handle the removal effect by pulling in all players items
     and removing the one that corresponds to the curse category */

    if (curse.effect == "remove") {
      $.get("/api/playerItems/" + selectedPlayerID, function (data) {
        for (var i in data) {
          if (data[i].Item.spot == curse.category) {
            var deletedItemId = data[i].Item.id;

            $.ajax({
              method: "DELETE",
              url: "/api/playerItems/" + selectedPlayerID + "/" + deletedItemId
            }).done(function () {
              $("#playersHand").empty();
              updateHand();
              updateItems();
              resetAwayCard();
            });
          }
          else {
            resetAwayCard();
          }
        }
      });

    }
    /* Next handle any that effect the player_level. I've removed other effects for monster level as its one player for now */
    else {
      var levelsChanged = parseInt(curse.effect);
      updatePlayerLevel(levelsChanged);
    }


  }
  // handler for when run away button is selected
  function handleRun() {
    var doorCard = $(this).attr("doorCard")
    var runChance = Math.random()
    if (runChance > .66) {
      //run succeed 
      Materialize.toast('You escaped!', 4000);
      resetAwayCard();
    }
    else {
      handleFight(doorCard);
    }
  }

  function handleCurse() {
    var doorCard = $(this).attr("doorCard")
    $.get("/api/doors/" + doorCard, function (data) {
      resolveCurse(data[0])
    });
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
          var rewardText;
          Materialize.toast('You defeated the enemy!', 4000);

          if (reward == 1) {
            rewardText = reward + " item!"
          }
          else {
            rewardText = reward + " items!"
          }
          Materialize.toast('You get ' + rewardText, 4000);

          $("#playersHand").empty();
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
    Materialize.toast("You're Dead", 4000);
    //display death



  }

  function resetPage() {
    resetAwayCard();
    $("#playersHand").empty();
    $("#totalBonus").text("1");
    $("#weaponOut").text("You don't have any weapons");
    $("#armorOut").text("You don't have any armor");
    $("#helperOut").text("You don't have a helper");
    $("#shipOut").text("You don't have a ship");

  }

  /* updates the players level for winning a fight or getting it witha curse this will not allow a player to drop below level 1, curses will not 'kill' a player */
  function updatePlayerLevel(levels) {
    $.get("/api/players/" + selectedPlayerID, function (data) {
      console.log("player Data ---", data)
      var playerCurrentLevel = data[0].level;

      playerCurrentLevel += levels;
      if (playerCurrentLevel < 1) {
        playerCurrentLevel = 1;
      }
      if (levels > 0) {
        Materialize.toast('You leveled to ' + playerCurrentLevel, 4000);
      }
      else {
        Materialize.toast('Your level has decreased to ' + playerCurrentLevel, 4000);
      }

      if (playerCurrentLevel > 9) {
        Materialize.toast("You've won!", 4000);
      }


      if (playerCurrentLevel > 0) {
        $.ajax({
          method: "PUT",
          url: "/api/playerLevelUp",
          data: {
            id: selectedPlayerID,
            level: playerCurrentLevel
          }
        });
         $("#playersHand").empty();
        updateHand()
        updateItems();
        calcEffectiveLevel()
      }

    }).done(function () {
       $("#playersHand").empty();
      updateHand();
      updateItems();
      resetAwayCard();
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
           $("#playersHand").empty();
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
    $.get("/api/players/" + selectedPlayerID, function (playerData) {
      bonus.level = playerData[0].level;

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
    });


  }

  function updateEffectiveLevel(level) {
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
    console.log("Update used");
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
    console.log("reset called")
    $("#awayMissionInner").empty();

    var awayImg = $("<img>");
    awayImg.attr("src", "images/door0.gif")
    awayImg.attr("id", "door-image")
    $("#awayMissionInner").append(awayImg);
    var awayTitle = $("<span>");
    awayTitle.attr("class", "card-title");
    awayTitle.attr("id", "away-title");
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


