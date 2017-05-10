CREATE DATABASE away_team; 
USE away_team; 

SELECT * FROM Treasures; 

INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('The Grand Inquisitor', 
'monster', 5, 2, '"I''ll show you things far more frightening than death...like my Luke-Leia fanfic"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Xenomorph', 
'monster', 7, 2, '"HHSSSSS...."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Khan', 
'monster', 10, 2, '"You? Perhaps I no longer need to try."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('A bunch of Daleks', 
'monster', 1, 1, 'Exterminate!', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Cyberman', 
'monster', 2, 1, 'Delete!', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('A couple Reavers', 
'monster', 4, 1, '"We''re going to eat your flesh and wear your skin!"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('A Cylon', 
'monster', 1, 1, '"I am a walking toaster!"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Darth Vader', 
'monster', 10, 2, '"Who''s your daddy? I''m your daddy"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('The Master', 
'monster', 7, 1, '"Here come the drums! By drums I mean my fists."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Thanos', 
'monster', 10, 2, '"I WILL BATHE THE STARWAYS WITH YOUR BLOOD!"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Ronan the Accuser', 
'monster', 8, 1, '"Fight or dance off? Cause honesly I could win either one."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('The Borg', 
'monster', 3, 1, '"Resistance is futile!"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Klingon', 
'monster', 2, 1, '"Your mother has a smooth forhead!"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Boba Fett', 
'monster', 5, 1, '"I''m totally not going to die a horrible death this time."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Jabba the hut', 
'monster', 6, 1, '"I shall enjoy watching you die."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Emperor Palpatine', 
'monster', 9, 1, '"I''d turn you to the dark side but you''re not worh it."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('MomCorp.', 
'monster', 7, 2, '"Oh shove a big ol'' melon in it, I''m talking!"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Roberto', 
'monster', 2, 1, '"You ever kill a man with a sock before? It''s not so hard ha-HA....Here let me show you"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Zorg', 
'monster', 3, 1, 'I''ve got a rocket launcher, arrow launcher, net launcher, and a flame thrower (my favorite). Which one ya want?', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Scary Terry', 
'monster', 4, 1, '"Welcome to your nightmare, BITCH!"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Stormtrooper', 
'monster', 1, 1, '"I''m here to carry out Lord Vader''s orders as inadequately as possible"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Predator', 
'monster', 7, 2, '"You got time to bleed?"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Davros', 
'monster', 5, 1, '"I will destroy your reality! ...you should thank me."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Rassilon', 
'monster', 6, 1, '"The final act of your life is murder. But which one of us?"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Darth Maul', 
'monster', 5, 1, '"Remember that time I killed Oskar Schindler?"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Dark Helmet', 
'monster', 6, 2, '"You''re about to see that evil always triumphs because good is dumb."', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Sarlacc', 
'monster', 9, 2, '"Wbbbgggrrgggrrlll *Chomp* *Chomp*"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Baron Harkonnen', 
'monster', 5, 1, '"He who controls the spice, controls the eff-you-niverse!"', FALSE, FALSE);
INSERT INTO Doors (name, type, level, treasure, description, createdAt, updatedAt) VALUES ('Matt Damon in Interstellar', 
'monster', 1, 0, '"You can trust me I''m totally not a backstabbing douche."', FALSE, FALSE);












INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Eww! Stepped in alien goo', 
'curse', 'remove', 'armor', 'Your clothes has been dissolved!', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Missing ";" in Transporter code', 
'curse', 'remove', 'armor', 'An error in the Transporter code caused you to be teleported without your armor!', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Tribble Infestation!', 
'curse', '-2', 'player_level', 'The tribbles you were carrying won''t stop procreating! Weighing and slowing you down.', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Stuck in a bookcase', 
'curse', '-5', 'player_level', 'Oh no! You fell into a blackhole and got stuck in a bookcase! Quick, wiggle some books around!', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Hypnotoad', 
'curse', '-1', 'player_level', 'ALL GLORY TO THE HYPNOTOAD! (go back a level)', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Weeping Angel''s touch', 
'curse', '-2', 'player_level', 'A Weeping Angel touches you, taking you back to yourself 2 levels ago. (not like you did a good job the first time anyway)', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Hal 9000''s sorry but he''s afraid he cannot allow you to do that', 
'curse', '3', 'monster_level', 'Hal increases the monster''s level by 3. He said he''s sorry.', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('A "you" from a parallel universe needs to borrow your weapons ', 
'curse', 'remove', 'weapon', 'An alternate version of you takes your weapons. Fun fact, technically it''s not stealing since they''re his weapons too!', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('A TV Exec prematurely cancels your show', 
'curse', '-9', 'player_level', 'Oh no! You had so much critical acclaim too! (Return to level 1)', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Time Bandits appear and steal your weapon!', 
'curse', 'remove', 'weapon', 'A bunch of dwarves steal your weapon! You''d probably hurt yourself with it anyway...', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Excess space radiation makes the space monster, uh, bigger, also and stronger', 
'curse', '1', 'monster_level', '8th grade science, dude. LOOK IT UP.', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Red Shirted!', 
'curse', '-9', 'player_level', 'You get turned into a Red Shirt and promptly are killed. Patrick Stewart and his exclusive clique of friends are OK so it''s cool', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Droid IOS update', 
'curse', '3', 'monster_level', 'The Federation has pushed a system update to all droid units, increasing their power. Roger Roger.', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Jar Jar binks tries to help you!', 
'curse', '-1', 'player_level', 'Meesa here to helpa yous-a and meesa...you get the idea. (level is decreased by 1)', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Picard calls you #2', 
'curse', '-1', 'player_level', 'He always calls you #1. Have you been replaced? Has he found a new #1? (emotionally crushed for 1 level)', FALSE, FALSE);
INSERT INTO Doors (name, type, effect, category, description, createdAt, updatedAt) VALUES ('Weapon jam!', 
'curse', 'remove', 'weapon', 'Your weapon jams! Maybe you can talk them into a dance off. (lose weapon)', FALSE, FALSE);



INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Lightsaber', 
'weapon', '2', 'Your father''s lightsaber. Better point it at your eye and look directly into it.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Phaser', 
'weapon', '1', 'Set phasers to fun, am I right?', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Noisy Cricket', 
'weapon', '2', 'Small but powerful. Basically the opposite of your mom.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Ronan''s Universal Weapon', 
'weapon', '4', 'Ronan''s totally-not-overpowered hammer. It can only manipulate matter, generate force fields, grant interstellar teleportation....', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Zorg''s ZF-1', 
'weapon', '3', 'Contains rocket launcher, arrow launcher, net launcher, flamethrower (my favorite), replay system, and Zorg''s patented "Replay" system.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Obi Wan''s Jedi Cloak', 
'armor', '1', 'An old man''s cloak. There''s hard candies in the pockets.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Commander Riker''s Beard', 
'armor', '1', 'You don Riker''s beard. You are immediately stronger and more confident...and a lil'' dashing', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Boba Fett''s Suit', 
'armor', '2', 'Complete with helmet, jet pack, and bits of Boba still in the suit!', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Starlord''s Helmet', 
'armor', '2', 'Allows for combat in unpressurized environments and comes with the only the best tracks from Starlord''s Awesome Mix', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Dark Helmet''s Helmet', 
'armor', '3', 'When you put it on, people assume you give great helmet', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Rocket and Groot', 
'helper', '2', 'You hire Rocket and Groot to assist you on the condition you don''t pet Rocket.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Mr. Meeseeks', 
'helper', '1', 'HEY LOOK AT ME I''M MR. MEESEEKS. (Mr. Meeseeks increases your level by 1)', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Wall-E', 
'helper', '1', 'Wall-E agrees to assist you in hopes of impressing EVA', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Multipass', 
'helper', '1', 'You found a multipass! While it will help you get around faster, the real value is getting to contiunuously repeat MULTIPASS', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('An army of Sam Rockwell Clones', 
'helper', '2', 'A bunch of Sam Rockwell''s clones from MOON agree to assist you, at least until they suffer collective organ failure.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Han Solo', 
'helper', '2', 'Always good to have someone on your team that shoots first...', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Freeze Ray', 
'weapon', '2', 'A great weapon for freezing your enemies in their tracks, also makes great Han Solo wall decorations.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Throw a face-hugger', 
'weapon', '1', 'Throw a facehugger hatchling at your enemies face, they''re clingy-er than you in a relationship, more secure too.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Ruby Rhod''s cheetah print body suit', 
'armor', '1', 'Not very effective armor, but you look fabulous', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Cybernetic limb', 
'armor', '2', 'Increase your resistance with a robot arm! Just be careful what you use it for...', FALSE, FALSE);

INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Enterprise', 
'ship', '3', 'And with you, so ends the streak of the SS Enterprise having a charismatic, good-looking captain.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Old Bessie', 
'ship', '1', 'This ship can fly itself so...Why are you here?', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Serenity', 
'ship', '2', 'You''ll use this ship for 1 year and think it''s decent, and then afterwards you''ll act like it''s biggest fan', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Nostromo', 
'ship', '1', 'Great freighter class ship, definitely no apex predator infestations on board', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Milano', 
'ship', '1', 'Nothing spectacular about this ship, but the sound system is BANGIN''', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Millenium Falcon', 
'ship', '2', '"You came in that thing?"', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('TARDIS', 
'ship', '1', 'The only drawback to this ship are the police stickers, causing other ships in front of you to fly 5 below the speed limit.', FALSE, FALSE);
INSERT INTO Treasures (name, type, effect, description, createdAt, updatedAt) VALUES ('Battlestar Galactica', 
'ship', '3', 'Huge battle cruiser outfitted with the best bears and beets.', FALSE, FALSE);






