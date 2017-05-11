// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./app/models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./app/public"));

// Routes =============================================================

// require("./app/routes/html-routes.js")(app);
require("./app/routes/player-api-routes.js")(app);
require("./app/routes/card-api-routes.js")(app);
// require("./app/routes/doors-routes.js")(app);
// require("./app/routes/treasure-routes.js")(app);

// db.Player.belongsToMany(db.Item, { through: db.PlayerItem });
// db.Item.belongsToMany(db.Player, { through: db.PlayerItem });

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


db.Item.bulkCreate([
{	name:	"Lightsaber"	,	spot:	'Weapon'	,	bonus:	2	,	description:	'Your father\'s lightsaber. Better point it at your eye and look directly into it.'	}	,
{	name:	'Phaser'	,	spot:	'Weapon'	,	bonus:	1	,	description:	'Set phasers to fun, am I right?'	}	,
{	name:	'Noisy Cricket'	,	spot:	'Weapon'	,	bonus:	2	,	description:	'Small but powerful. Basically the opposite of your mom.'	}	,
{	name:	'Ronan\'s Universal Weapon'	,	spot:	'Weapon'	,	bonus:	4	,	description:	'Ronan\'s totally-not-overpowered hammer. It can only manipulate matter, generate force fields, grant interstellar teleportation....'	}	,
{	name:	'Zorg\'s ZF-1'	,	spot:	'Weapon'	,	bonus:	3	,	description:	'Contains rocket launcher, arrow launcher, net launcher, flamethrower (my favorite), replay system, and Zorg\'s patented "Replay" system.'	}	,
{	name:	'Obi Wan\'s Jedi Cloak'	,	spot:	'Armor'	,	bonus:	1	,	description:	'An old man\'s cloak. There\'s hard candies in the pockets.'	}	,
{	name:	'Commander Riker\'s Beard'	,	spot:	'Armor'	,	bonus:	1	,	description:	'You don Riker\'s beard. You are immediately stronger and more confident...and a lil\'s dashing'	}	,
{	name:	'Boba Fett\'s Suit'	,	spot:	'Armor'	,	bonus:	2	,	description:	'Complete with helmet, jet pack, and bits of Boba still in the suit!'	}	,
{	name:	'Starlord\'s Helmet'	,	spot:	'Armor'	,	bonus:	2	,	description:	'Allows for combat in unpressurized environments and comes with the only the best tracks from Starlord\'s Awesome Mix'	}	,
{	name:	'Dark Helmet\'s Helmet'	,	spot:	'Armor'	,	bonus:	3	,	description:	'When you put it on, people assume you give great helmet'	}	,
{	name:	'Rocket and Groot'	,	spot:	'Helper'	,	bonus:	2	,	description:	'You hire Rocket and Groot to assist you on the condition you don\'t pet Rocket.'	}	,
{	name:	'Mr. Meeseeks'	,	spot:	'Helper'	,	bonus:	1	,	description:	'HEY LOOK AT ME I\'M MR. MEESEEKS. (Mr. Meeseeks increases your level by 1)'	}	,
{	name:	'Wall-E'	,	spot:	'Helper'	,	bonus:	1	,	description:	'Wall-E agrees to assist you in hopes of impressing EVA'	}	,
{	name:	'Multipass'	,	spot:	'Helper'	,	bonus:	1	,	description:	'You found a multipass! While it will help you get around faster, the real value is getting to contiunuously repeat MULTIPASS'	}	,
{	name:	'An army of Sam Rockwell Clones'	,	spot:	'Helper'	,	bonus:	2	,	description:	'A bunch of Sam Rockwell\'s clones from MOON agree to assist you, at least until they suffer collective organ failure.'	}	,
{	name:	'Han Solo'	,	spot:	'Helper'	,	bonus:	2	,	description:	'Always good to have someone on your team that shoots first...'	}	,
{	name:	'Freeze Ray'	,	spot:	'Weapon'	,	bonus:	2	,	description:	'A great weapon for freezing your enemies in their tracks, also makes great Han Solo wall decorations.'	}	,
{	name:	'Throw a face-hugger'	,	spot:	'Weapon'	,	bonus:	1	,	description:	'Throw a facehugger hatchling at your enemies face, they\'re clingy-er than you in a relationship, more secure too.'	}	,
{	name:	'Ruby Rhod\'s cheetah print body suit'	,	spot:	'Armor'	,	bonus:	1	,	description:	'Not very effective armor, but you look fabulous'	}	,
{	name:	'Cybernetic limb'	,	spot:	'Armor'	,	bonus:	2	,	description:	'Increase your resistance with a robot arm! Just be careful what you use it for...'	}	,
{	name:	'Enterprise'	,	spot:	'Ship'	,	bonus:	3	,	description:	'And with you, so ends the streak of the SS Enterprise having a charismatic, good-looking captain.'	}	,
{	name:	'Old Bessie'	,	spot:	'Ship'	,	bonus:	1	,	description:	'This ship can fly itself so...Why are you here?'	}	,
{	name:	'Serenity'	,	spot:	'Ship'	,	bonus:	2	,	description:	'You\'ll use this ship for 1 year and think it\'s decent, and then afterwards you\'ll act like it\'s biggest fan'	}	,
{	name:	'Nostromo'	,	spot:	'Ship'	,	bonus:	1	,	description:	'Great freighter class ship, definitely no apex predator infestations on board'	}	,
{	name:	'Milano'	,	spot:	'Ship'	,	bonus:	1	,	description:	'Nothing spectacular about this ship, but the sound system is BANGIN\''	}	,
{	name:	'Millenium Falcon'	,	spot:	'Ship'	,	bonus:	2	,	description:	'"You came in that thing?"'	}	,
{	name:	'TARDIS'	,	spot:	'Ship'	,	bonus:	1	,	description:	'The only drawback to this ship are the police stickers, causing other ships in front of you to fly 5 below the speed limit.'	}	,
{	name:	'Battlestar Galactica'	,	spot:	'Ship'	,	bonus:	3	,	description:	'Huge battle cruiser outfitted with the best bears and beets.'	}	
]);