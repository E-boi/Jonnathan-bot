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
		if (command.help.nsfw && message.channel.type === 'text' && !message.channel.nsfw)
			return message.channel.send("Can't use nsfw command in a not nsfw channel");
		const res = await command.run(message, args, this.client);
		return message.channel.send(res);
	}
}