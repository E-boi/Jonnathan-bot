import config from '../../config';
import { Message } from 'discord.js';
import Client from '../Structures/Client';

export default class message {
	client: Client;
	constructor(client: Client) {
		this.client = client;
	}

	async run(message: Message) {
		if (!message.content.startsWith(this.client.configs.prefixes[message.guild?.id || 'default'])) return;
		const args = message.content.slice(this.client.configs.prefixes[message.guild?.id || 'default'].length).split(/ +/g);
		const cmd = args.shift()?.toLowerCase();
		if (!cmd) return;

		const command = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd) || '');
		if (!command) return;
		if (command.config.guildOnly && message.channel.type === 'dm') return message.channel.send('Try this command in a server.');
		else if (command.config.nsfw && message.channel.type === 'text' && !message.channel.nsfw)
			return message.channel.send("Can't use nsfw command in a not nsfw channel.");
		else if (command.config.devOnly && config.ownerId.includes(message.author.id)) return message.channel.send("Can't use a dev only command.");
		const res = await command.run(message, args, this.client);
		return message.channel.send(res);
	}
}
