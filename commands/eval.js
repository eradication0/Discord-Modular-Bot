exports.run = function(bot, message, args) {
	if (message.author.id === 'PUT YOUR ID HERE') {
		try {
			const com = eval(message.content.split(" ").slice(1).join(" "))
			message.channel.sendMessage('```\n' + com + '```')
		} catch (e) {
			message.channel.sendMessage('```\n' + e + '```')
		}
	} else {
		message.channel.sendMessage('You dont have permission to execute eval')
	}
}
