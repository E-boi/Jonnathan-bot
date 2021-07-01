import Client from 'src/Client/Client';

export default class ready {
	client: Client;
	constructor(client: Client) {
		this.client = client;
	}

	run() {
		console.log(`Logged in as ${this.client.user?.username}`);
	}
}
