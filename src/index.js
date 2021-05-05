const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('../config.json');
const { readdirSync } = require('fs');

global.config = config;

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
Client.categories = readdirSync('./src/commands/');

require('./handlers/command')(Client);
require('./handlers/event')(Client);

Client.login(config.token);
