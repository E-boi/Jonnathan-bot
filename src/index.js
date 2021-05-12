import Discord from 'discord.js';
const Client = new Discord.Client();
import { readdirSync, readFileSync } from 'fs';
const config = JSON.parse(readFileSync('./config.json'));
global.config = config;

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
Client.categories = readdirSync('./src/commands/');

import('./handlers/command.js').then(file => file.default(Client));
import('./handlers/event.js').then(file => file.default(Client));
// import('./utils/mongo.js').then(file => file.connect(Client)); 👀

Client.login(config.token);
