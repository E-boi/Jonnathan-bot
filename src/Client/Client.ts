import Discord, { ClientOptions } from 'discord.js';
import pkg from 'mongodb';
import config from '../../config';
import { readdir } from 'fs';
const { MongoClient } = pkg;

export default class Client extends Discord.Client {
	public mongo: pkg.Db;
	constructor(options: ClientOptions = {}) {
		super(options);
	}

	init() {
		this.initMongo();
		this.startEvents();
	}

	async initMongo() {
		const client = await MongoClient.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
			throw new Error(err);
		});
		this.mongo = client.db(config.mongo.db);
	}

	async startEvents() {
		readdir('./dist/src/events', (err, files) => {
			if (err) return console.log(err);
			files.forEach(async file => {
				if (file.endsWith('.map')) return;
				const eventName = file.split('.')[0];
				const event = new (await import(`../events/${file}`)).default(this);
				this.on(eventName, (...args) => event.run(...args));
			});
		});
	}
}
