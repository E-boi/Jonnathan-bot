export default () => {
	switch (true) {
		// check for a token
		case !config.token:
			throw new Error('No bot token found!');
			break;
		// check for a default prefix
		case !config.prefix:
			throw new Error('No default prefix found!');
			break;
		// check for owner id
		case !config.ownerId:
			throw new Error('No owner id found!');
			break;
		// check for mongo configs
		case !config.mongo:
			throw new Error('No mongo config found!');
			break;
		case !config.mongo.uri:
			throw new Error('No mongo uri found!');
			break;
		case !config.mongo.db:
			throw new Error('No mongo db found!');
			break;
		case !config.mongo.collections:
			throw new Error('No mongo collections found!');
			break;
		case !config.mongo.collections.guildConfigs:
			throw new Error('No mongo collection for guild configs found!');
			break;
		case !config.mongo.collections.logs:
			throw new Error('No mongo collection for logs (kick, bans, warns) found!');
			break;
		case !config.mongo.collections.currency:
			throw new Error('No mongo collection for currency found!');
			break;
		case !config.mongo.collections.moneymaker:
			throw new Error('No mongo collection for jobs found!');
			break;
	}
};
