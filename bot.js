console.log('<== STARTING MODULAR BOT ==>');

// Loading Requirements
const discord = require('discord.js') // Discord itself
const settings = require('settings.js') // Settings file
const fs = require('fs') // Filesystem npm Package
const bot = new discord.Client() // Creating a new bot instance

console.log('Setup √')

// Looping through all commands
bot.on('message', (message) => {
	if (message.author.id === bot.user.id) return // Bot should not listen to himself
	if (!message.content.startsWith(cred.prefix)) return // Bot only executes command if the right prefix is used
	const args = message.content.split(' '); // Splits message parts into arguments
	const command = args.shift().slice(cred.prefix.length); // Deletes the prefix in the command variable
	try {
		let cmdFile = require('./commands/' + command); // requires all files in the commands folder
		cmdFile.run(bot, message, args); // Runs the command
	} catch (e) {
		fileLog(e + '\n'); // Occuring errors will be stored in the log.txt
	}
}

console.log('Commands loaded √')

// "When bot is online" function
bot.on('ready', () => {
    console.log('<== STARTING MODULAR BOT ==>')
})

// Logs in via Token (Set in the settings.json file)
bot.login(settings.bottoken)
console.log('<== BOT ONLINE ==>')
