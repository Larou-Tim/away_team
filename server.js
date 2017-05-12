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
require("./app/routes/doors-routes.js")(app);
require("./app/routes/treasure-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    createData();

  });
});

function createData() {
  db.Item.bulkCreate([
    { name: "Lightsaber", spot: 'Weapon', bonus: 2, description: 'Your father\'s lightsaber. Better point it at your eye and look directly into it.', image: 'item1.jpg' },
    { name: 'Phaser', spot: 'Weapon', bonus: 1, description: 'Set phasers to fun, am I right?',  image: 'item2.jpg' },
    { name: 'Noisy Cricket', spot: 'Weapon', bonus: 2, description: 'Small but powerful. Basically the opposite of your mom.',  image: 'item3.jpg' },
    { name: 'Ronan\'s Universal Weapon', spot: 'Weapon', bonus: 4, description: 'Ronan\'s totally-not-overpowered hammer. It can only manipulate matter, generate force fields, grant interstellar teleportation....',  image: 'item4.png' },
    { name: 'Zorg\'s ZF-1', spot: 'Weapon', bonus: 3, description: 'Contains rocket launcher, arrow launcher, net launcher, flamethrower (my favorite), replay system, and Zorg\'s patented "Replay" system.',  image: 'item5.jpg' },
    { name: 'Obi Wan\'s Jedi Cloak', spot: 'Armor', bonus: 1, description: 'An old man\'s cloak. There\'s hard candies in the pockets.',  image: 'item6.jpg' },
    { name: 'Commander Riker\'s Beard', spot: 'Armor', bonus: 1, description: 'You don Riker\'s beard. You are immediately stronger and more confident...and a lil\'s dashing',  image: 'item7.jpg' },
    { name: 'Boba Fett\'s Suit', spot: 'Armor', bonus: 2, description: 'Complete with helmet, jet pack, and bits of Boba still in the suit!',  image: 'item8.jpg' },
    { name: 'Starlord\'s Helmet', spot: 'Armor', bonus: 2, description: 'Allows for combat in unpressurized environments and comes with the only the best tracks from Starlord\'s Awesome Mix',  image: 'item9.jpg' },
    { name: 'Dark Helmet\'s Helmet', spot: 'Armor', bonus: 3, description: 'When you put it on, people assume you give great helmet',  image: 'item10.png' },
    { name: 'Rocket and Groot', spot: 'Helper', bonus: 2, description: 'You hire Rocket and Groot to assist you on the condition you don\'t pet Rocket.',  image: 'item11.jpg' },
    { name: 'Mr. Meeseeks', spot: 'Helper', bonus: 1, description: 'HEY LOOK AT ME I\'M MR. MEESEEKS. (Mr. Meeseeks increases your level by 1)',  image: 'item12.png' },
    { name: 'Wall-E', spot: 'Helper', bonus: 1, description: 'Wall-E agrees to assist you in hopes of impressing EVA',  image: 'item13.png' },
    { name: 'Multipass', spot: 'Helper', bonus: 1, description: 'You found a multipass! While it will help you get around faster, the real value is getting to contiunuously repeat MULTIPASS',  image: 'item14.jpg' },
    { name: 'An army of Sam Rockwell Clones', spot: 'Helper', bonus: 2, description: 'A bunch of Sam Rockwell\'s clones from MOON agree to assist you, at least until they suffer collective organ failure.',  image: 'item15.jpg' },
    { name: 'Han Solo', spot: 'Helper', bonus: 2, description: 'Always good to have someone on your team that shoots first...',  image: 'item16.jpg' },
    { name: 'Freeze Ray', spot: 'Weapon', bonus: 2, description: 'A great weapon for freezing your enemies in their tracks, also makes great Han Solo wall decorations.',  image: 'item17.jpg' },
    { name: 'Throw a face-hugger', spot: 'Weapon', bonus: 1, description: 'Throw a facehugger hatchling at your enemies face, they\'re clingy-er than you in a relationship, more secure too.',  image: 'item18.jpg' },
    { name: 'Ruby Rhod\'s cheetah print body suit', spot: 'Armor', bonus: 1, description: 'Not very effective armor, but you look fabulous',  image: 'item19.jpg' },
    { name: 'Cybernetic limb', spot: 'Armor', bonus: 2, description: 'Increase your resistance with a robot arm! Just be careful what you use it for...', image: 'item20.jpg' },
    { name: 'Enterprise', spot: 'Ship', bonus: 3, description: 'And with you, so ends the streak of the SS Enterprise having a charismatic, good-looking captain.', image: 'item21.jpg' },
    { name: 'Old Bessie', spot: 'Ship', bonus: 1, description: 'This ship can fly itself so...Why are you here?', image: 'item22.jpg' },
    { name: 'Serenity', spot: 'Ship', bonus: 2, description: 'You\'ll use this ship for 1 year and think it\'s decent, and then afterwards you\'ll act like it\'s biggest fan', image: 'item23.jpg' },
    { name: 'Nostromo', spot: 'Ship', bonus: 1, description: 'Great freighter class ship, definitely no apex predator infestations on board', image: 'item24.jpg' },
    { name: 'Milano', spot: 'Ship', bonus: 1, description: 'Nothing spectacular about this ship, but the sound system is BANGIN\'', image: 'item25.jpg' },
    { name: 'Millenium Falcon', spot: 'Ship', bonus: 2, description: '"You came in that thing?"' , image: 'item26.jpg'},
    { name: 'TARDIS', spot: 'Ship', bonus: 1, description: 'The only drawback to this ship are the police stickers, causing other ships in front of you to fly 5 below the speed limit.', image: 'item27.jpg' },
    { name: 'Battlestar Galactica', spot: 'Ship', bonus: 3, description: 'Huge battle cruiser outfitted with the best bears and beets.', image: 'item28.jpg' }
  ]);

  db.Door.bulkCreate([
    { name: 'The Grand Inquisitor', type: 'monster', level: 5, treasure: 2, description: '"I\'ll show you things far more frightening than death...like my Luke-Leia fanfic"', image: 'door1.png' },
    { name: 'Xenomorph', type: 'monster', level: 7, treasure: 2, description: '"HHSSSSS...."', image: 'door2.jpg' },
    { name: 'Khan', type: 'monster', level: 10, treasure: 2, description: '"You? Perhaps I no longer need to try."', image: 'door3.jpg' },
    { name: 'A bunch of Daleks', type: 'monster', level: 1, treasure: 1, description: 'Exterminate!', image: 'door4.jpg' },
    { name: 'Cyberman', type: 'monster', level: 2, treasure: 1, description: 'Delete!', image: 'door5.jpg' },
    { name: 'A couple Reavers', type: 'monster', level: 4, treasure: 1, description: '"We\'re going to eat your flesh and wear your skin!"', image: 'door6.jpg' },
    { name: 'A Cylon', type: 'monster', level: 1, treasure: 1, description: '"I am a walking toaster!"', image: 'door7.jpg' },
    { name: 'Darth Vader', type: 'monster', level: 10, treasure: 2, description: '"Who\'s your daddy? I\'m your daddy"', image: 'door8.jpg' },
    { name: 'The Master', type: 'monster', level: 7, treasure: 1, description: '"Here come the drums! By drums I mean my fists."', image: 'door9.gif' },
    { name: 'Thanos', type: 'monster', level: 10, treasure: 2, description: '"I WILL BATHE THE STARWAYS WITH YOUR BLOOD!"', image: 'door10.jpg' },
    { name: 'Ronan the Accuser', type: 'monster', level: 8, treasure: 1, description: '"Fight or dance off? Cause honesly I could win either one."', image: 'door11.jpg' },
    { name: 'The Borg', type: 'monster', level: 3, treasure: 1, description: '"Resistance is futile!"', image: 'door12.jpg' },
    { name: 'Klingon', type: 'monster', level: 2, treasure: 1, description: '"Your mother has a smooth forhead!"', image: 'door13.jpg' },
    { name: 'Boba Fett', type: 'monster', level: 5, treasure: 1, description: '"I\'m totally not going to die a horrible death this time."', image: 'door14.jpg' },
    { name: 'Jabba the hut', type: 'monster', level: 6, treasure: 1, description: '"I shall enjoy watching you die."',  image: 'door15.jpg' },
    { name: 'Emperor Palpatine', type: 'monster', level: 9, treasure: 1, description: '"I\'d turn you to the dark side but you\'re not worh it."', image: 'door16.jpg' },
    { name: 'MomCorp.', type: 'monster', level: 7, treasure: 2, description: '"Oh shove a big ol\' melon in it,I\'m talking!"', image: 'door17.jpg' },
    { name: 'Roberto', type: 'monster', level: 2, treasure: 1, description: '"You ever kill a man with a sock before? It\'s not so hard ha-HA....Here let me show you"', image: 'door18.jpg' },
    { name: 'Zorg', type: 'monster', level: 3, treasure: 1, description: 'I\'ve got a rocket launcher rocket launcher, arrow launcher, net launcher, flamethrower (my favorite). Which one ya want?', image: 'door19.png' },
    { name: 'Scary Terry', type: 'monster', level: 4, treasure: 1, description: '"Welcome to your nightmare, BITCH!"', image: 'door20.jpg' },
    { name: 'Stormtrooper', type: 'monster', level: 1, treasure: 1, description: '"I\'m here to carry out Lord Vader\'s orders as inadequately as possible"', image: 'door21.png' },
    { name: 'Predator', type: 'monster', level: 7, treasure: 2, description: '"You got time to bleed?"', image: 'door22.jpg' },
    { name: 'Davros', type: 'monster', level: 5, treasure: 1, description: '"I will destroy your reality! ...you should thank me."', image: 'door23.png' },
    { name: 'Rassilon', type: 'monster', level: 6, treasure: 1, description: '"The final act of your life is murder. But which one of us?"', image: 'door24.jpg' },
    { name: 'Darth Maul', type: 'monster', level: 5, treasure: 1, description: '"Remember that time I killed Oskar Schindler?"', image: 'door25.jpeg' },
    { name: 'Dark Helmet', type: 'monster', level: 6, treasure: 2, description: '"You\'re about to see that evil always triumphs because good is dumb."', image: 'door26.jpeg' },
    { name: 'Sarlacc', type: 'monster', level: 9, treasure: 2, description: '"Wbbbgggrrgggrrlll *Chomp* *Chomp*"', image: 'door27.png' },
    { name: 'Baron Harkonnen', type: 'monster', level: 5, treasure: 1, description: '"He who controls the spice, controls the eff-you-niverse!"', image: 'door28.jpg' },
    { name: 'Matt Damon in Interstellar', type: 'monster', level: 1, treasure: 0, description: '"You can trust me I\'m totally not a backstabbing douche."', image: 'door29.jpg' }, 
    { name: 'Eww! Stepped in alien goo', type: 'curse', effect: 'remove', category: 'Armor', description: 'Your clothes have been dissolved!', image: 'door30.jpg'},
    { name: 'Missing ";" in Transporter code', type: 'curse', effect: 'remove', category: 'Armor', description: 'An error in the Transporter code caused you to be teleported without your armor!', image: 'door31.jpg'},
    { name: 'Tribble Infestation!', type: 'curse', effect: '-2', category: 'player_level', description: 'The tribbles you were carrying won\'t stop procreating! Weighing and slowing you down.', image: 'door32.jpg'},
    { name: 'Stuck in a bookcase', type: 'curse', effect: '-5', category: 'player_level', description: 'Oh no! You fell into a blackhole and got stuck in a bookcase! Quick, wiggle some books around!', image: 'door33.jpg'},
    { name: 'Hypnotoad', type: 'curse', effect: '-1', description: 'ALL GLORY TO THE HYPNOTOAD! (go back a level)', category: 'player_level', image: 'door34.gif'},
    { name: 'Weeping Angel\'s touch', type: 'curse', effect: '-2', category: 'player_level', description: 'A Weeping Angel touches you, taking you back to yourself 2 levels ago. (not like you did a good job the first time anyway)', image: 'door35.jpg'},
    { name: 'Hal 9000\'s sorry but he\'s afraid he cannot allow you to do that', type: 'curse', effect: 'remove', category: 'Ship', description: 'Hal locks you out of your ship. He said he\'s sorry.', image: 'door36.jpg'},
    { name: 'A "you" from a parallel universe needs to borrow your weapons ', type: 'curse', effect: 'remove', category: 'Weapon', description: 'An alternate version of you takes your weapons. Fun fact, technically it\'s not stealing since they\'re his weapons too!', image: 'door37.jpg'},
    { name: 'A TV Exec prematurely cancels your show', type: 'curse', effect: '-9', category: 'player_level', description: 'Oh no! You had so much critical acclaim too! (Return to level 1)', image: 'door38.jpg'},
    { name: 'Time Bandits appear and steal your weapon!', type: 'curse', effect: 'remove', category: 'Weapon', description: 'A bunch of dwarves steal your weapon! You\'d probably hurt yourself with it anyway...', image: 'door39.jpg'},
    { name: 'Excess space radiation makes you, uh, bigger, also and stronger', type: 'curse', effect: '1', category: 'player_level', description: '8th grade science, dude. LOOK IT UP.', image: 'door40.png'},
    { name: 'Red Shirted!', type: 'curse', effect: '-9', category: 'player_level', description: 'You get turned into a Red Shirt and promptly are killed. Patrick Stewart and his exclusive clique of friends are OK so it\'s cool', image: 'door41.jpg'},
    { name: 'Droid OS update', type: 'curse', effect: '-3', category: 'player_level', description: 'The Federation has pushed a system update to all droid units, increasing their power. Roger Roger.', image: 'door42.jpg'},
    { name: 'Jar Jar Binks tries to help you!', type: 'curse', effect: '-1', category: 'player_level', description: 'Meesa here to helpa yous-a and meesa...you get the idea. (level is decreased by 1)', image: 'door43.jpg'},
    { name: 'Picard calls you #2', type: 'curse', effect: '-1', category: 'player_level', description: 'He always calls you #1. Have you been replaced? Has he found a new #1? (emotionally crushed for 1 level)', image: 'door44.jpg'},
    { name: 'Weapon jam!', type: 'curse', effect: 'remove', category: 'Weapon', description: 'Your weapon jams! Maybe you can talk them into a dance off. (lose weapon)', image: 'door45.gif'}
  ]);
}