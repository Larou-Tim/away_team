$(document).ready(function () {
  $('.modal').modal()
  var nameInput = $("#player-name");
  var awayMissionDeck = [];
  var selectedPlayerID;
  var selectedPlayerEffectiveLevel;

  var playerTrack = {
    name: "",
    level: 1,
    effectiveLevel: 1,
    turn: 0,
    lastEnemy: ""
  }

  //used to determine if item should be a post/put
  var playerCurrentItems = {
    Weapon: false,
    Armor: false,
    Ship: false,
    Aide: false
  }

  var cardPlayed;

  // when player enters their name
  $(document).on("submit", "#player-form", handleNewPlayer);
  // when a player uses a card in their 'hand'
  $(document).on("click", ".cardPlay", handleItemCard);
  // when a player clicks on the away mission card
  $(document).on("click", "#awayMission", handleAwayMission);
  //if a player decides to fight a monster
  $(document).on("click", "#fight", handleFight);
  // if a player decides to run away from a monster
  $(document).on("click", "#runaway", handleRun)
  // only choice for when a curse shows up
  $(document).on("click", "#resolve", handleCurse);
  $(document).on("click", "#hall-button", updateModal);


  // Cards in hand constructor
  function getItemCard(cards) {
    $("#playersHand").empty()
    if (cards.length) {
      for (var i in cards) {
        $.get("/api/items/" + cards[i].ItemId, function (data) {
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

    $.get("/api/playerItems/" + selectedPlayerID, function (data) {
      //reset var for use
      playerCurrentItems = {
        Weapon: false,
        Armor: false,
        Ship: false,
        Aide: false
      }


      if (data) {
        for (var i in data) {
          var selectedItemSpot;
          switch (data[i].Item.spot) {
            case "Weapon":
              selectedItemSpot = "weapon";
              playerCurrentItems.Weapon = true;
              break;
            case "Armor":
              selectedItemSpot = "armor";
              playerCurrentItems.Armor = true;
              break;
            case "Helper":
              selectedItemSpot = "helper";
              playerCurrentItems.Helper = true;
              break;
            case "Ship":
              selectedItemSpot = "ship";
              playerCurrentItems.Ship = true;
              break;
          }

          $("#" + selectedItemSpot + "Out").text("You have a " + data[i].Item.name + ". This gives you +" + data[i].Item.bonus);

          if (!playerCurrentItems.Weapon) {
            $("#weaponOut").text("You don't have a weapon.");
          }
          if (!playerCurrentItems.Armor) {
            $("#armorOut").text("You don't have armor.");
          }
          if (!playerCurrentItems.Ship) {
            $("#shipOut").text("You don't have a ship.");
          }
          if (!playerCurrentItems.Helper) {
            $("#helperOut").text("You don't have a helper.");
          }

        }
      }
      calcEffectiveLevel()
    });

  }

  //constructor to update the away mission
  function handleAwayMission() {

    if (selectedPlayerID > 1) {
      playerTrack.turn++
      updateHand();

      $.get("/api/door/", function (data) {

        if (data[0].type == 'curse') {
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
    else {
      Materialize.toast('You need to make a character!', 4000);
    }
  }

  //handle when a player clicks on the curse button
  function resolveCurse(curse) {
    /* first handle the removal effect by pulling in all players items
     and removing the one that corresponds to the curse category */

    if (curse.effect == "remove") {
      //if its remove, check the player's items to see if they have one
      $.get("/api/playerItems/" + selectedPlayerID, function (data) {
        //reset var for use
        playerCurrentItemsId = {

        }


        if (data) {
          for (var i in data) {

            switch (data[i].Item.spot) {
              case "Weapon":
                playerCurrentItemsId.Weapon = data[i].Item.id;
                break;
              case "Armor":
                playerCurrentItemsId.Armor = data[i].Item.id;
                break;
              case "Helper":
                playerCurrentItemsId.Helper = data[i].Item.id;
                break;
              case "Ship":
                playerCurrentItemsId.Ship = data[i].Item.id;
                break;
            }
          }
          var curseItemSpot = curse.category;
          //if the player has that item then delete it

          if (playerCurrentItemsId[curseItemSpot]) {
            Materialize.toast('You lost your ' + curseItemSpot + '!', 4000);
            var deletedItemId = playerCurrentItemsId[curseItemSpot]

            $.ajax({
              method: "DELETE",
              url: "/api/playerItems/" + deletedItemId + "/" + selectedPlayerID
            }).done(function (x) {

              updateHand();
              updateItems();
              resetAwayCard();
            });
          }
          else {
            if (curseItemSpot == 'Armor') {
              Materialize.toast("Lucky! You didn't have any " + curseItemSpot + '!', 4000);
            }
            else {
              Materialize.toast("Lucky! You didn't have a " + curseItemSpot + '!', 4000);
            }

            updateHand();
            updateItems();
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
        enemyLevel = data[0].level;
        playerTrack.lastEnemy = data[0].name;
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

    handleHallLoss()

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
    playerTrack = {
      name: "",
      level: 1,
      effectiveLevel: 1,
      turn: 0,
      lastEnemy: ""
    }
    $("#player-name").text("");
    selectedPlayerID = "";
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
        handleHallWin();
        Materialize.toast("You've won!", 4000);
        Materialize.toast("Can you do it again?", 4500);
        resetPage();
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


        updateItems();
        calcEffectiveLevel()
      }

    }).done(function () {


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

  //runs through all items a player has and their current level to calc
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
        playerTrack.level = bonus.level;
        playerTrack.effectiveLevel = totalBonus;
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

  // A function to handle what happens when the form is submitted to create a new Player
  function handleNewPlayer(event) {
    event.preventDefault();

    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    playerTrack.name = nameInput.val().trim().trim()
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
    $.post("/api/players", playerData, function (data) {

      selectedPlayerID = data.id

    }).then(function () {
      drawNCards(4);
    });

  }

  function addToPlayerHand(cardID) {
    var newCard = {
      ItemId: cardID,
      PlayerId: parseInt(selectedPlayerID)
    };
    $.post("/api/playerHand/", newCard, function () {
    });
  }

  function updateHand() {
    $("#playersHand").empty();
    $.get("/api/playerHand/" + selectedPlayerID, function (data) {
      getItemCard(data)
    });
  }

  //used if another player is selected
  function selectPlayer() {
    $("#playerSelectDrop").text($(this).text());
    selectedPlayerID = $(this).attr("id").substring(6);

    updateHand()
    updateItems();
  }

  // refreshes away mission card after resolving its effects
  function resetAwayCard() {
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

  // function to drawn a random card from the api
  function drawNCards(n) {
    $.get("/api/treasure/" + n, function (data) {

      for (var i = 0; i < data.length; i++) {

        // getItemCard(cardNumber);
        addToPlayerHand(data[i].id);
      }

    }).done(updateHand);
  }

  function handleHallWin() {


    $.post("/api/hallwin", playerTrack, function (data) {
    })
  }

  function handleHallLoss() {
    $.post("/api/halldeath", playerTrack, function (data) {
    })
  }

  function updateModal() {
    //force an update somewhere
    updateHand();
    updateItems();

    $.get("/api/hallwin/", function (winData) {
      $.get("/api/halldeath/", function (deathData) {
        $("#winList").empty()
        for (var i in winData) {
          var newList = $("<li>");
          newList.attr("class", "collection-item");
          var listTitle = $("<span>");
          listTitle.attr("class", "title");
          listTitle.text(winData[i].name);
          var listContent = $("<p>");
          listContent.html("Won in " + winData[i].turn + " turns by defeating " + winData[i].lastEnemy + "!" +
            " <br/> " + winData[i].name + " had a total bonus of " + winData[i].effectiveLevel + ". Congrats!")
          newList.append(listTitle);
          newList.append(listContent);
          $("#winList").append(newList);

        }
        $("#deathList").empty()
        for (var i in deathData) {
          var newList = $("<li>");
          newList.attr("class", "collection-item");
          var listTitle = $("<span>");
          listTitle.attr("class", "title");
          listTitle.text(deathData[i].name);
          var listContent = $("<p>");
          listContent.html("Died in " + deathData[i].turn + " turns, and was defeated by " + deathData[i].lastEnemy + "." +
            " <br/> " + deathData[i].name + " was only level " + deathData[i].level + " at the time of death and had a total bonus of " +
            deathData[i].effectiveLevel + ". Better luck next time!")
          newList.append(listTitle);
          newList.append(listContent);
          $("#deathList").append(newList);
        }

      });
    });
  }

});


