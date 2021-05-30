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
		if (['moderation', 'configurations', 'owneronly'].includes(command.category)) return message.channel.send("You can't do those commands here");
		else if (command.name.includes('serverinfo')) return message.channel.send('Try this in a server');
		return await command.execute(message, args, client);
	}

	if (command.cooldown) {
		if (message.member.id !== config.ownerId) {
			if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Map());

			const cooldown = client.cooldowns.get(command.name);
			const coollength = command.cooldown * 1000;

			if (cooldown.has(message.member.id)) {
				const expireTime = cooldown.get(message.member.id) + coollength;

				if (Date.now() < expireTime) {
					const left = (expireTime - Date.now()) / 1000;

					return message.channel.send(`Wait ${left > 1 ? `${left.toFixed(1)} seconds` : `${left.toFixed(1)} second`}`);
				}
			}

			cooldown.set(message.member.id, Date.now());
			setTimeout(() => cooldown.delete(message.member.id), coollength);
		}
	}

	if (command.nsfw && !message.channel.nsfw) return message.channel.send('Try this command in a NSFW channel');
	if (command.ownerOnly && !isBotOwner(message.member)) return message.channel.send('Only the bot owner can use this command');
	if (command.userPerms && !isStaff({ command, member: message.member, guildId: message.guild.id }))
		return message.channel.send("You can't use this command lol");
	if (command.botPerms && !message.guild.me.hasPermission(command.botPerms)) return message.channel.send("I don't have permissions to do this");
	await command.execute(message, args, client);
};
