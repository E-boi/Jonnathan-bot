import Client from '../../Structures/Client';
import BaseCommand, { MessageReturn } from '../../Structures/BaseCommand';
import { Message } from 'discord.js';
import config from '../../../config';

export default class prefix extends BaseCommand {
	constructor() {
		super({
			name: 'prefix',
			description: 'change the prefix',
			usage: '{p}prefix {new prefix}',
			category: 'configurations',
			userPerms: ['ADMINISTRATOR'],
			guildOnly: true,
		});
		this.run = this.makeRun;
	}

	async makeRun({ guild }: Message, args: string[], client: Client): Promise<MessageReturn> {
		if (!args[0]) return 'You need to specify a prefix';
		else if (args[0].length > 20) return 'maybe a little to long';
		else if (args[0] === client.configs.prefixes[guild?.id || 'default']) return "That's already the prefix!";
		if (!guild) return 'try in a server';
		client.configs.prefixes[guild.id] = args[0];
		await client.mongo
			.collection(config.mongo.collections.guildConfigs)
			.updateOne({ guildId: guild.id }, { $set: { prefix: args[0] } }, { upsert: true });
		return `Set prefix to ${args[0]}`;
	}
}
