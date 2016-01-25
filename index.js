//required modules/files
var fs = require('fs');
var request = require('request');
var Discord = require("discord.js");
var ttvGlobalEmotes = require("./ttvglobalemotes.json");
var ttvSubscriberEmotes = require("./ttvsubscriberemotes.json");
var ttvBetterttvEmotes = require("./ttvbetterttvemotes.json");
var auth = require("./auth.json");
var settings = require("./settings.json");

//bot's discord client
var bot = new Discord.Client();

//secret hitler
var shInEffect = false;
var shRoles = [[],[],[]];
var shCountUp = null;
var shPlayerList = [];

bot.on('message', function(msg)
{
	try{
	//Permissions
	var serverActive = false;
	var isPM = false;
	if (msg.channel.server!=null){
		serverActive = (settings.serverids.indexOf(msg.channel.server.id)>-1);
	} else {
		isPM = true;
	}
	var ttvAllowed = isPM;
	if (serverActive==true){
		ttvAllowed = settings.serverpermissions[msg.channel.server.id].ttvemotes;
	}
	var commandsAllowed = isPM;
	if (serverActive==true){
		commandsAllowed = settings.serverpermissions[msg.channel.server.id].commands;
	}
	var shAllowed = isPM;
	if (serverActive==true){
		shAllowed = settings.serverpermissions[msg.channel.server.id].secrethitler;
	}
	var miscAllowed = isPM;
	if (serverActive==true){
		miscAllowed = settings.serverpermissions[msg.channel.server.id].misc;
	}

	//if we have permission for this server or we're using PM
	if (serverActive || isPM){
		//commands
		if (commandsAllowed){
			var command = msg.content.toLowerCase().split(" ")[0];
			if (command.charAt(0)=='!'){
				var param1 = "";
				if (msg.content.toLowerCase().split(" ").length>1){
					var param1 = msg.content.toLowerCase().split(" ")[1].replace('_', ' ');
				}
			    switch(command){
			    	case "!reportglitch":
			    	case "!reporterror":
			    	case "!reportbug":
			    	case "!bugreport":
			    			console.log("bugreport \n" + "Bug Report from " + msg.author.name + "; " + msg.content + "\n");
			    			bot.sendMessage(msg.channel, "@TheWoopWooper, Bug Report from " + msg.author.name + ". ");
			    		break;
			    	case "!h":
			    	case "!help":
			    	case "!commands":
			    			console.log("help");
			    			bot.sendMessage(msg.channel, "Commands: !info, !lenny, !playgame [game_name], !stopgame, !time, !bugreport <message>, !inspectsquishy, !hellosquishy");
			    		break;
			    	case "!t":
			    	case "!time":
			    			console.log("time");
			    			bot.sendMessage(msg.channel, "The time is " + new Date());
			    		break;
			    	case "!info":
			    	case "!information":
			    	case "!aboutsquishy":
			    			console.log("info");
			    			bot.sendMessage(msg.channel, "I am a bot and I am called Squishy and I will be your Squishy. Made by @TheWoopWooper using discord.js");
			    		break;
			    	case "!inspectsquishy":
			    			console.log("inspectsquishy");
			    			bot.sendFile(msg.channel, "./squishy bot.png");
			    		break;
			    	case "!lenny":
			    	case "!lennyboi":
			    	case "!lennyface":
			    			console.log("lennyface");
			    			bot.sendMessage(msg.channel, "( ͡° ͜ʖ ͡°)");
			    		break;
			    	case "!kappski":
			    			console.log("kappski");
			    			bot.sendFile(msg.channel, "./kappski.png");
			    		break;
			    	case "!playgame":
			    			console.log("playgame");
			    			bot.setPlayingGame(param1);
			    		break;
			    	case "!stopgame":
			    			console.log("stopgame");
			    			bot.setPlayingGame(null);
			    		break;
			    	case "!hellosquishy":
			    			bot.sendMessage(msg.channel, "Squishy Bot says hello.");
			    			console.log("hellosquishy");
			    		break;
			    	case "!beginshroles":
			    			if (shAllowed){
				    			bot.sendMessage(msg.channel, "Squishy Bot has begun collecting results, PM one of the following commands to Squishy Bot : !hitler, !fascist, !liberal");
				    			bot.sendMessage(msg.channel, "Squishy Bot has collected " + 0 + " result(s) from these players: . Use !endshroles to finish.", false, function(error, message){
							  		shcountup = message;
								});
				    			this.shInEffect = true;
				    			this.shRoles = [[],[],[]];
				    			this.shPlayerList = [];
			    			}
			    			console.log("beginshroles");
			    		break;
			    	case "!hitler":
			    	case "!iamhit":
			    	case "!iamhitler":
			    			if (shAllowed){
				    			if (this.shInEffect){
				    				if (arrayContains(this.shPlayerList, msg.author.id)==false){
					    				this.shRoles[0].push(msg.author);
					    				this.shPlayerList.push(msg.author.id);
					    				console.log(this.shPlayerList);
					    				msg.reply("Squishy Bot has noted your role, Hitler.");
					    				var randomList = [];
					    				for(var i = 0; i < this.shRoles.length; i++)
										{
										    randomList = randomList.concat(this.shRoles[i]);
										}
					    				randomList = shuffleArray(randomList);
					    				bot.updateMessage(shcountup, "Squishy Bot has collected " + randomList.length + " result(s) from these players: " + randomList.toString() + ". Use !endshroles to finish.", false, function(error, message){
								  			shcountup = message;
										});
									} else {
				    					msg.reply("You have already entered your role.");
				    				}
				    			} else {
				    				msg.reply("You sure are pal, you sure are. (try !beginshroles)");
				    			}
				    		}
			    			console.log("iamhitler");
			    		break;
			    	case "!fascist":
			    	case "!iamfas":
			    	case "!iamfascist":
			    			if (shAllowed){
				    			if (this.shInEffect){
				    				if (arrayContains(this.shPlayerList, msg.author.id)==false){
					    				this.shRoles[1].push(msg.author);
					    				this.shPlayerList.push(msg.author.id);
					    				console.log(this.shPlayerList);
					    				msg.reply("Squishy Bot has noted your role, Fascist.");
					    				var randomList = [];
					    				for(var i = 0; i < this.shRoles.length; i++)
										{
										    randomList = randomList.concat(this.shRoles[i]);
										}
					    				randomList = shuffleArray(randomList);
					    				bot.updateMessage(shcountup, "Squishy Bot has collected " + randomList.length + " result(s) from these players: " + randomList.toString() + ". Use !endshroles to finish.", false, function(error, message){
								  			shcountup = message;
										});
									} else {
				    					msg.reply("You have already entered your role.");
				    				}
				    			} else {
				    				msg.reply("(try !beginshroles)");
				    			}
				    		}
			    			console.log("iamfascist");
			    		break;
			    	case "!liberal":
			    	case "!iamlib":
			    	case "!iamliberal":
			    			if (shAllowed){
				    			if (this.shInEffect){
				    				if (arrayContains(this.shPlayerList, msg.author.id)==false){
					    				this.shRoles[2].push(msg.author);
					    				this.shPlayerList.push(msg.author.id);
					    				console.log(this.shPlayerList);
					    				msg.reply("Squishy Bot has noted your role, Liberal.");
					    				var randomList = [];
					    				for(var i = 0; i < this.shRoles.length; i++)
										{
										    randomList = randomList.concat(this.shRoles[i]);
										}
					    				randomList = shuffleArray(randomList);
					    				bot.updateMessage(shcountup, "Squishy Bot has collected " + randomList.length + " result(s) from these players: " + randomList.toString() + ". Use !endshroles to finish.", false, function(error, message){
								  			shcountup = message;
										});
				    				} else {
				    					msg.reply("You have already entered your role.");
				    				}
				    			} else {
				    				msg.reply("(try !beginshroles)");
				    			}
				    		}
			    			console.log("iamliberal");
			    		break;
			    	case "!endshroles":
			    			if (shAllowed){
				    			if (this.shInEffect){
				    				var playerCount = this.shRoles[0].length + this.shRoles[1].length + this.shRoles[2].length;
				    				//PM the fascists/hitler
				    				if (this.shRoles[0].length==1){
				    					if (playerCount<5){
				    						bot.sendMessage(msg.channel, "Error; too few players.");
				    					} else if (playerCount>10){
				    						bot.sendMessage(msg.channel, "Error; too many players.");
				    					} else {
				    						//correct player count
				    						if ((playerCount==5 || playerCount==6) && this.shRoles[1].length!=1){
				    							bot.sendMessage(msg.channel, "Error; wrong number of fascists for 5-6 players.");
				    						} else if ((playerCount==7 || playerCount==8) && this.shRoles[1].length!=2){
				    							bot.sendMessage(msg.channel, "Error; wrong number of fascists for 7-8 players.");
				    						} else if ((playerCount==9 || playerCount==10) && this.shRoles[1].length!=3){
				    							bot.sendMessage(msg.channel, "Error; wrong number of fascists for 9-10 players.");
				    						} else {
				    							//correct everything
				    							//tell hitler
				    							if (playerCount==5 || playerCount==6){
				    								bot.sendMessage(this.shRoles[0][0], "You're Hitler, in 5-6 player games you get to know the identity of the fascist, who is " + this.shRoles[1][0]);
				    							} else {
				    								bot.sendMessage(this.shRoles[0][0], "You're Hitler, in 7-10 player games identities remain unknown to you.");
				    							}
				    							//tell fascists
				    							if (playerCount==5 || playerCount==6){
				    								bot.sendMessage(this.shRoles[1][0], "You're the Fascist, Hitler is " + this.shRoles[0][0]);
				    							} else {
				    								for (var i = 0; i<this.shRoles[1].length; i++){
				    									bot.sendMessage(this.shRoles[1][i], "You're a Fascist, Hitler is " + this.shRoles[0][0] + ", and your fellow Fascists are: " + this.shRoles[1]);
				    								}
				    							}
				    							//tell liberals
				    							for (var i = 0; i<this.shRoles[2].length; i++){
				    								bot.sendMessage(this.shRoles[2][i], "You're a Liberal, identities remain unknown to you");
				    							}
				    						}
				    					}
				    				} else {
				    					bot.sendMessage(msg.channel, "Error; one hitler is required (and only one hitler).");
				    				}
				    				bot.sendMessage(msg.channel, "Squishy Bot has finished collecting the results; " + playerCount + " players in total, " + this.shRoles[1].length + " fascist(s), " + this.shRoles[2].length + " liberal(s), " + "and " + this.shRoles[0].length + " hitler. ");
				    			} else {
				    				bot.sendMessage(msg.channel, "(try !beginshroles)");
				    			}
				    			shcountup = null;
				    			this.shPlayerList = [];
				    			this.shInEffect = false;
				    		}
			    			console.log("endshroles");
			    		break;
			    	case "!squishysucks":
			    	case "!fucksquishy":
			    			console.log("fucksquishy");
			    			msg.reply("Up until now, Squishy believed he had no emotions... ;_;");
			    		break;
			    	case "!mynameisvlad":
			    			console.log("mynameisvlad");
			    			msg.reply("...not a vampire.");
			    		break;
			    	default:
			    			//console.log("Unknown command");
			    		break;
			    }
			}
		}
		if (miscAllowed){
			if (msg.isMentioned(bot.user)){
				//msg.reply("Squishy Bot is online.");
			}
			if (msg.content=="↑↑↓↓←→←→BA" || msg.content=="↑ ↑ ↓ ↓ ← → ← → B A" || msg.content=="up up down down left right left right b a" || msg.content=="^ ^ v v < > < > b a" || msg.content=="^^vv<><>ba"){
				bot.sendMessage(msg.channel, "#FucKonami");
			}
		}
		if (ttvAllowed){
			if (msg.content.indexOf("ttv/") > -1) {
				var emoteWordPos = msg.content.indexOf('ttv/')+4;
				var emoteWord = msg.content.substr(emoteWordPos, msg.content.length-emoteWordPos).split(" ")[0];
				var emoteObj = ttvGlobalEmotes.emotes[emoteWord];
				if (emoteObj!=null){
					var emoteID = emoteObj.image_id;
					download("https://static-cdn.jtvnw.net/emoticons/v1/" + emoteID + "/1.0", emoteWord + '.png', function(){
					  	bot.sendFile(msg.channel, "./" + emoteWord + ".png");
					  	console.log('done');
					});
					console.log("global ttv emote: " + "https://static-cdn.jtvnw.net/emoticons/v1/" + emoteID + "/1.0");
				} else {
					var ttvChannels = ttvSubscriberEmotes.channels;
					for (var key in ttvChannels){
						channelEmotes = ttvChannels[key].emotes;
						for (var i = 0; i < channelEmotes.length; i++) {
						    if (channelEmotes[i].code == emoteWord){
						    	emoteObj = channelEmotes[i];
						    }
						}
					}
					if (emoteObj!=null){
						var emoteID = emoteObj.image_id;
						download("https://static-cdn.jtvnw.net/emoticons/v1/" + emoteID + "/1.0", emoteWord + '.png', function(){
						  	bot.sendFile(msg.channel, "./" + emoteWord + ".png");
						  	console.log('done');
						});
						console.log("subscriber ttv emote: " + emoteWord + " " + emoteID);
					} else {
						//better ttv
						for (var i = 0; i < ttvBetterttvEmotes.emotes.length; i++) {
						    if (ttvBetterttvEmotes.emotes[i].regex == emoteWord){
						    	emoteObj = ttvBetterttvEmotes.emotes[i];
						    }
						}
						if (emoteObj!=null){
							download("https:" + emoteObj.url, emoteWord + '.png', function(){
							  	bot.sendFile(msg.channel, "./" + emoteWord + ".png");
							  	console.log('done');
							});
							console.log("subscriber ttv emote: " + emoteWord + " " + emoteID);
						} else {
							bot.sendMessage(msg.channel, "Emote not found.");
							console.log("ERROR: ttv emote " + emoteWord + " not found");
						}
					}
				}
			}
		}
	}
	} catch(e) {
		console.log(e);
	}
});

bot.on('voiceJoin', function(user, voiceChannel)
{
	try{
	var textvoiceAllowed = settings.serverpermissions[voiceChannel.server.id].textvoice;
	if (textvoiceAllowed){
		//create temp chats
		var textChannelName = ("temp_" + voiceChannel.name.replace(/\W/g, '').toLowerCase());
		if (voiceChannel.server.channels.getAll("name", textChannelName).length!=0){
			//ADD GUY TO CHANNEL
			console.log("new guy")
			if (user.id!=bot.user.id){
				bot.overwritePermissions(voiceChannel.server.channels.get("name", textChannelName), user, { "createInstantInvite" : false, "manageChannel" : false, "managePermissions" : false, "readMessages" : true, "sendMessages" : true, "sendTTSMessages" : true, "manageMessages" : false, "embedLinks" : true, "attachFiles" : true, "readMessageHistory" : false, "mentionEveryone" : false });
			}
		} else {
			if (voiceChannel.members.length>=2){
				var newchannel = null;
				bot.createChannel(voiceChannel.server, textChannelName, "text", function(error, channel){
					newchannel = channel;
					if (newchannel!=null){
						//SETUP NEW CHANNEL'S PERMS
						//console.log(voiceChannel);
						console.log("NEW CHANNEL");
						bot.overwritePermissions(newchannel, bot.user, { "createInstantInvite" : false, "manageChannel" : true, "managePermissions" : true, "readMessages" : true, "sendMessages" : true, "sendTTSMessages" : true, "manageMessages" : true, "embedLinks" : true, "attachFiles" : true, "readMessageHistory" : false, "mentionEveryone" : false });
						bot.overwritePermissions(newchannel, newchannel.server.roles[0], { "createInstantInvite" : false, "manageChannel" : false, "managePermissions" : false, "readMessages" : false, "sendMessages" : false, "sendTTSMessages" : false, "manageMessages" : false, "embedLinks" : false, "attachFiles" : false, "readMessageHistory" : false, "mentionEveryone" : false });
						//ADD EVERYONE TO CHANNEL
						for (var i = 0; i < voiceChannel.members.length; i++){
							if (voiceChannel.members[i].id!=bot.user.id){
								bot.overwritePermissions(newchannel, voiceChannel.members[i], { "createInstantInvite" : false, "manageChannel" : false, "managePermissions" : false, "readMessages" : true, "sendMessages" : true, "sendTTSMessages" : true, "manageMessages" : false, "embedLinks" : true, "attachFiles" : true, "readMessageHistory" : false, "mentionEveryone" : false });
							}
						}
					}
				});
				console.log("temp channel created");
			}
		}

		//delete unused temp chats
		var index;
		var list = voiceChannel.server.channels.getAll("type", "voice")
		for (index = 0; index < list.length; ++index){
			console.log("channel tested");
			if (list[index].members.length<=0){
				var textChannelName = ("temp_" + list[index].name.replace(/\W/g, '').toLowerCase());
				if (list[index].server.channels.getAll("name", textChannelName).length!=0){
					bot.deleteChannel(list[index].server.channels.get("name", textChannelName))
					console.log("temp channel deleted");
				}
			} else {
				//CHECK ALL TEMP CHATS FOR USERS WHO SHOULDN'T BE THERE
				//REMOVE THEIR PERMS
				//NEW CODE (UNTESTED)
				var textChannelName = ("temp_" + list[index].name.replace(/\W/g, '').toLowerCase());
				if (list[index].server.channels.getAll("name", textChannelName).length!=0){
					var textChannel = list[index].server.channels.get("name", textChannelName);
					console.log(textChannel.permissionOverwrites);
					for (var i = 0; i < textChannel.permissionOverwrites.length; i++){
						if (textChannel.permissionOverwrites[i].type = "member") {
							//does this member still exist in voice?
							var userID = textChannel.permissionOverwrites[i].id;
							var noUser = true;
							for (var j = 0; j < list[index].members.length; j++){
								if (list[index].members[j].id == userID){
									noUser - false;
								}
							}

							if (noUser){
								console.log("removed guy")
								if (userID!=bot.user.id){
									bot.overwritePermissions(textChannel, userID, { "createInstantInvite" : false, "manageChannel" : false, "managePermissions" : false, "readMessages" : false, "sendMessages" : false, "sendTTSMessages" : false, "manageMessages" : false, "embedLinks" : false, "attachFiles" : false, "readMessageHistory" : false, "mentionEveryone" : false });
								}
							}
						}
					}

					console.log("temp channel updated");
				}
			}
		}
	}
	} catch (e){
		console.log(e);
	}
});

bot.on('voiceLeave', function(user, voiceChannel)
{
	try{
	var textvoiceAllowed = settings.serverpermissions[voiceChannel.server.id].textvoice;

	//delete unused temp chats
	if (textvoiceAllowed){
		var textChannelName = ("temp_" + voiceChannel.name.replace(/\W/g, '').toLowerCase());
		if (voiceChannel.members.length<=0){
			if (voiceChannel.server.channels.getAll("name", textChannelName).length!=0){
				bot.deleteChannel(voiceChannel.server.channels.get("name", textChannelName))
				console.log("temp channel deleted");
			}
		} else {
			if (voiceChannel.server.channels.getAll("name", textChannelName).length!=0){
				//REMOVE PERMS OF USER (UNTESETED)
				console.log("removed guy")
				if (user.id!=bot.user.id){
					bot.overwritePermissions(voiceChannel.server.channels.get("name", textChannelName), user, { "createInstantInvite" : false, "manageChannel" : false, "managePermissions" : false, "readMessages" : false, "sendMessages" : false, "sendTTSMessages" : false, "manageMessages" : false, "embedLinks" : false, "attachFiles" : false, "readMessageHistory" : false, "mentionEveryone" : false });
				}		
			}		
		}
	}
	} catch (e){
		console.log(e);
	}
});

bot.login(auth.email, auth.password).then(success).catch(err);

function success(token){
    console.log("Login successsful");
}

function err(error){
    console.log(error);
}

function download(uri, filename, callback){
  	request.head(uri, function(err, res, body){
	    //console.log('content-type:', res.headers['content-type']);
	    //console.log('content-length:', res.headers['content-length']);
	    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  	});
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function arrayContains(array, value) {
    result = false;
    for (var i = 0; i < array.length; i++){
    	if (array[i] == value){
    		result=true;
    	}
    }
    return result;
}