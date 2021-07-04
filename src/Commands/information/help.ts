import Client from '../../Structures/Client';
import BaseCommand, { MessageReturn } from '../../Structures/BaseCommand';
import { Message, MessageEmbedOptions } from 'discord.js';

export default class help extends BaseCommand {
	constructor() {
		super({ name: 'help', description: 'helps the users', usage: '{p}help or {p}help {command/category}', category: 'information' });
		this.run = this.makeRun;
	}

	makeRun({ guild }: Message, args: any[], client: Client): MessageReturn {
		const categories: string[] = [];
		client.commands.forEach(
			command => !categories.includes(command.help.category.toLowerCase()) && categories.push(command.help.category.toLowerCase())
		);
		if (!args[0]) {
			const embed: MessageEmbedOptions = {
				title: 'Categories',
				fields: [],
				color: 'RANDOM',
				thumbnail: { url: client.user?.avatarURL({ dynamic: true }) || undefined },
			};
			categories.forEach(cat =>
				embed.fields?.push({
					name: `**${cat[0].toUpperCase()}${cat.slice(1)}:**`,
					value: `\`${client.configs.prefixes[guild?.id || 'default']}help ${cat}\``,
				})
			);
			return { embed };
		} else if (categories.includes(args[0].toLowerCase())) {
			const embed: MessageEmbedOptions = {
				title: `${args[0][0].toUpperCase()}${args[0].slice(1)} category:`,
				fields: [],
				color: 'RANDOM',
			};

			client.commands.forEach(
				command =>
					command.help.category.toLowerCase() === args[0].toLowerCase() &&
					embed.fields?.push({
						name: `**${command.help.name[0].toUpperCase()}${command.help.name.slice(1)}:**`,
						value: `${client.configs.prefixes[guild?.id || 'default']}${command.help.name}`,
					})
			);

			return { embed };
		} else if (client.commands.has(args[0].toLowerCase()) || client.commands.has(client.aliases.get(args[0].toLowerCase()) || '')) {
			const command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()) || '');
			const embed: MessageEmbedOptions = {
				title: command?.help.name,
				description: `**Command:** ${client.configs.prefixes[guild?.id || 'default']}${command?.help.name}\n**Description:** ${
					command?.help.description
				}\n**Usage:** ${command?.help.usage.replace(/{p}/g, client.configs.prefixes[guild?.id || 'default'])}\n**NSFW:** ${!!command?.config.nsfw}`,
				color: 'RANDOM',
			};
			if (command?.help.aliases) embed.description += `\n**Aliases:** ${command.help.aliases.join(', ')}`;
			return { embed };
		}
		return 'invailed command/category';
	}
}
