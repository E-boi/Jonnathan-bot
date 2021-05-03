const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('../config.json');

global.config = config;

Client.on('ready', () => {
	console.log(`%cLogginig in as "${Client.user.username}"`, 'color: #7289da');
});

Client.login(config.token);
