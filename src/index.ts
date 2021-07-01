import config from '../config';
import Client from './Client/Client';

const client = new Client();
client.init();

client.login(config.token);
