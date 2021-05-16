import { guildPrefixes } from '../utils/mongo.js';
import { isBotOwner, isStaff } from '../utils/functions.js';

export default async (client, message) => {
	if (!message.content.startsWith(guildPrefixes[message.guild?.id || 'dm'])) return;
	const args = message.content.slice(guildPrefixes[message.guild?.id || 'dm'].length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (!command) return;

	if (message.channel.type === 'dm') {
		if (['admin', 'configurations', 'owneronly'].includes(command.category)) return message.channel.send("You can't do those commands here");
		else if (command.name.includes('serverinfo')) return message.channel.send('Try this in a server');
		return await command.execute(message, args, client);
	}

	if (command.nsfw && !message.channel.nsfw) return message.channel.send('Try this command in a NSFW channel');
	if (command.ownerOnly && !isBotOwner(message.member)) return message.channel.send('Only the bot owner can use this command');
	if (command.userPerms && !isStaff({ command, member: message.member, guildId: message.guild.id }))
		return message.channel.send("You can't use this command lol");
	await command.execute(message, args, client);
};
