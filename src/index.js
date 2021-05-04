const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('../config.json');

global.config = config;

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();

require('./handlers/command')(Client);
require('./handlers/event')(Client);

Client.login(config.token);
