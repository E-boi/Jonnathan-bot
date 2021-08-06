import { Client as client, ClientOptions, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { BaseCommand } from './Command';
import Logger from './Logger';
import config from '../../config';
import { MongoClient, Db } from 'mongodb';

export default class Client extends client {
	public mongo: Db;
	public logger: Logger;
	public commands: Collection<string, BaseCommand>;
	public owner: string[];

	constructor(options: ClientOptions) {
		super(options);
		this.logger = new Logger('client');
		this.commands = new Collection<string, BaseCommand>();
		this.owner = config.ownerId;
	}

	init() {
		this.initMongo();
		this.loadEvents();
		this.application?.commands.fetch().then(() => {
			this.loadCommands();
		});
	}

	private async initMongo() {
		const client = await MongoClient.connect(config.mongo.uri).catch(err => {
			this.logger.warn(err);
			throw new Error();
		});
		this.mongo = client.db(config.mongo.db);
	}

	private loadEvents() {
		const files = readdirSync('./dist/src/Events');

		files.forEach(async file => {
			if (file.endsWith('.map')) return;
			const eventName = file.split('.')[0];
			const event = (await import(`../Events/${file}`)).default;
			this.on(eventName, (...args) => event(this, ...args));
		});
	}

	private loadCommands() {
		const files = readdirSync(`${__dirname}/../Commands/`, { withFileTypes: true });

		files.forEach(async file => {
			if (file.name.endsWith('.map')) return;
			if (file.isDirectory()) return this.loadCommand(file.name);
			const command: BaseCommand = new (await import(`../Commands/${file.name}`)).default();
			this.commands.set(command.slashCommand.name, command);
		});
	}

	private loadCommand(folder: string) {
		const files = readdirSync(`${__dirname}/../Commands/${folder}`, { withFileTypes: true });

		files.forEach(async file => {
			if (file.name.endsWith('.map')) return;
			if (file.isDirectory()) return this.loadCommand(`${folder}/${file.name}`);
			const command: BaseCommand = new (await import(`../Commands/${folder}/${file.name}`)).default();
			this.commands.set(command.slashCommand.name, command);
		});
	}
}
