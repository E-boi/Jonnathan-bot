const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('../config.json');

global.config = config;

Client.on('ready', () => {
	console.log(`Logging in as "${Client.user.username}"`);
});

Client.login(config.token);
