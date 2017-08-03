console.log('<== STARTING MODULAR BOT ==>');

// Loading Requirements
const discord = require('discord.js') // Discord itself
const settings = require('./settings.json') // Settings file
const fs = require('fs') // Filesystem npm Package
const bot = new discord.Client() // Creating a new bot instance

bot.on('message', (message) => {

	// Disables bot to listen to himself
	if (message.author.id === bot.user.id) return

	// ------------- EVAL START ------------

	// overrides all other commands
	// limited to a spcific user (using the user ID)

	if (message.content.startsWith('.eval') && message.author.id === 'YOUR ID HERE!') {
		try {
			const com = eval(message.content.split(" ").slice(1).join(" "))
			message.channel.send('```\n' + com + '```')
		} catch (e) {
			message.channel.send('```\n' + e + '```')
		}
	}

	// ------------- EVAL END --------------


	// Bot only executes command if the right prefix is used
	if (!message.content.startsWith(settings.prefix)) return

	// Splits message parts into arguments
	const args = message.content.split(' ');

	// Deletes the prefix in the command variable
	const command = args.shift().slice(settings.prefix.length);
	try {

		// looks for all command files
		let cmdFile = require('./commands/' + command);

		// Runs the command
		cmdFile.run(discord, bot, message, args);

	// catching errors
	} catch (e) {
		console.log(e + '\n');
	}
})

// When bot is ready
bot.on('ready', () => {
    console.log('<== MODULAR BOT ONLINE ==>')
})

// bot login using the token provided in the settings file
bot.login(settings.bottoken)
