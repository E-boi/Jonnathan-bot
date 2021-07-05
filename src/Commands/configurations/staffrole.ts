import Client from '../../Structures/Client';
import BaseCommand, { MessageReturn } from '../../Structures/BaseCommand';
import { Message } from 'discord.js';
import config from '../../../config';

export default class prefix extends BaseCommand {
	constructor() {
		super({
			name: 'staffrole',
			description: 'set/change the staff role',
			usage: '{p}staffrole {new staff role/staff role id}',
			category: 'configurations',
			userPerms: ['ADMINISTRATOR'],
			guildOnly: true,
		});
		this.run = this.makeRun;
	}

	async makeRun({ guild, mentions }: Message, args: string[], client: Client): Promise<MessageReturn> {
		if (!args[0])
			return client.configs.staffroles[guild?.id || '']
				? { embed: { description: `The current staff role is <@&${client.configs.staffroles[guild?.id || '']}>` } }
				: 'There is no staff role';

		const role = mentions.roles.first() || guild?.roles.cache.get(args[0]);
		if (!role) return 'Cannot find role';
		else if (role.id === client.configs.staffroles[guild?.id || 'default']) return "That's already the staff role!";
		if (!guild) return 'try in a server';
		client.configs.staffroles[guild.id] = args[0];
		await client.mongo
			.collection(config.mongo.collections.guildConfigs)
			.updateOne(
				{ guildId: guild.id },
				{ $set: { prefix: client.configs.prefixes[guild.id] || client.configs.prefixes['default'], staffRole: args[0] } },
				{ upsert: true }
			);
		return { embed: { description: `Updated staff role ${role}` } };
	}
}
