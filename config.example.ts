import { ClientOptions, Intents } from 'discord.js';

interface Config {
	prefix: string;
	ownerId: string[];
	token: string;
	mongo: {
		uri: string;
		db: string;
		collections: {
			guildConfigs: string;
			logs: string;
			currency: string;
			moneymaker: string;
		};
	};
	clientOptions: ClientOptions;
	topgg?: {
		oauth: string;
		token: string;
	};
}

const config: Config = {
	token: 'your bot token',
	prefix: 'a default prefix',
	ownerId: ['owner(s) id'],
	mongo: {
		uri: 'mongodb uri',
		db: 'bot db',
		collections: {
			guildConfigs: 'guildConfigs',
			logs: 'logs',
			currency: 'currency',
			moneymaker: 'moneymaker',
		},
	},
	clientOptions: {
		intents: [Intents.FLAGS.GUILDS],
	},
};

export default config;
