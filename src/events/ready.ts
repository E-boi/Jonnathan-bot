import Client from '../Structures/Client';

export default class ready {
	client: Client;
	constructor(client: Client) {
		this.client = client;
	}

	run() {
		this.client.logger.log(`Logged in as ${this.client.user?.username}`);
	}
}