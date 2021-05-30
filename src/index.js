global.config = JSON.parse(readFileSync('./config.json'));
import Discord from 'discord.js';
const Client = new Discord.Client(config.clientOptions);
import { readdirSync, readFileSync } from 'fs';

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
Client.categories = readdirSync('./src/commands/');
Client.cooldowns = new Map();

import('./handlers/command.js').then(file => file.default(Client));
import('./handlers/event.js').then(file => file.default(Client));

Client.login(config.token).then(() =>
	import('./utils/mongo.js')
		.then(file => file.connect(Client))
		.then(() => import('./utils/mongo.js').then(file => file.getConfigs(Client)))
);
