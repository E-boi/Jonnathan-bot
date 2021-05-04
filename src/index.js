const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('../config.json');

global.config = config;

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();

require('./handlers/command')(Client);

const prefix = config.prefix;

Client.on('ready', () => {
	console.log(`Logging in as "${Client.user.username}"`);
});

Client.on('message', async message => {
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	let command = Client.commands.get(cmd);
	if (!command) command = Client.commands.get(Client.aliases.get(cmd));
	// if there is no command
	if (!command) return;
	await command.execute(message, args, Client);
});

Client.login(config.token);
