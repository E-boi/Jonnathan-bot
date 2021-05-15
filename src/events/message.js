import { guildPrefixes } from '../utils/mongo.js';
import { isStaff } from '../utils/functions.js';

export default async (client, message) => {
	if (!message.guild) return;
	else if (!message.content.startsWith(guildPrefixes[message.guild.id])) return;
	const args = message.content.slice(guildPrefixes[message.guild.id].length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (!command) return;
	if (command.nsfw && !message.channel.nsfw) return message.channel.send('Try this command in a NSFW channel');
	if (command.ownerOnly && message.member.id !== config.ownerId) return message.channel.send('Only the bot owner can use this command');
	if (command.userPerms && !isStaff({ command, member: message.member, guildId: message.guild.id }))
		return message.channel.send("You can't use this command lol");
	await command.execute(message, args, client);
};
