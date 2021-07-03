import config from '../config';
import Client from './Structures/Client';

const client = new Client();
client.init();

client
	.login(config.token)
	.then(() => client.guildConfigs())
	.catch(err => client.logger.warn(err));
