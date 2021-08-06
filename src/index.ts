import config from '../config';
import Client from './Structures/Client';

const client = new Client(config.clientOptions);

client
	.login(config.token)
	.then(() => client.init())
	.catch(err => client.logger.warn(err));
