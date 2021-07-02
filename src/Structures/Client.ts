import Discord, { ClientOptions, Collection } from 'discord.js';
import pkg from 'mongodb';
import config from '../../config';
import { readdir } from 'fs';
import BaseCommand from './BaseCommand';
const { MongoClient } = pkg;

export default class Client extends Discord.Client {
	public mongo: pkg.Db;
	public configs: { prefixes: { [key: string]: string } };
	public commands: Collection<string, BaseCommand>;
	public aliases: Collection<string, string>;

	constructor(options: ClientOptions = {}) {
		super(options);
		this.configs = { prefixes: { default: config.prefix } };
		this.commands = new Collection<string, BaseCommand>();
		this.aliases = new Collection<string, string>();
	}

	init() {
		this.initMongo();
		this.loadEvents();
		this.loadCommands();
	}

	async initMongo() {
		const client = await MongoClient.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
			throw new Error(err);
		});
		this.mongo = client.db(config.mongo.db);
	}

	async guildConfigs() {
		for (const guild of this.guilds.cache) {
			const guildConfig = await this.mongo.collection(config.mongo.collections.guildConfigs).findOne({ guildId: guild[0] });
			this.configs.prefixes[guild[0]] = guildConfig?.prefix || config.prefix;
		}
		console.log('Done getting guild prefixes!');
	}

	loadCommands() {
		readdir('./dist/src/Commands', (err, files) => {
			if (err) return console.log(err);
			files.forEach(async file => {
				if (file.endsWith('.map')) return;
				if (!file.endsWith('.js')) return this.loadCommand(file);
				const command: BaseCommand = new (await import(`../Commands/${file}`)).default();
				this.commands.set(command.help.name, command);
				if (command.help.aliases) command.help.aliases.forEach(alias => this.aliases.set(alias, command.help.name));
			});
		});
	}

	loadCommand(folder: string) {
		readdir(`./dist/src/Commands/${folder}`, (err, files) => {
			if (err) return console.log(err);
			files.forEach(async file => {
				if (file.endsWith('.map')) return;
				if (!file.endsWith('.js')) return this.loadCommand(`${folder}/${file}`);
				const command: BaseCommand = new (await import(`../Commands/${folder}/${file}`)).default();
				this.commands.set(command.help.name, command);
			});
		});
	}

	loadEvents() {
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
