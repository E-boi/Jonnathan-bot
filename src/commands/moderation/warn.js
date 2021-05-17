import { MessageEmbed } from 'discord.js';
import { addPunish, moderationEmbed } from '../../utils/functions.js';
import { logChannels } from '../../utils/mongo.js';

export const name = 'warn';
export const description = 'warns a user';
export const category = 'moderation';
export const userPerms = ['ADMINISTRATOR'];
export const staffCanDo = true;

export async function execute(message, args, client) {
	const member = message.mentions.members.first();
	const reason = args.splice(1).join(' ') || '(none)';

	if (!member) return message.channel.send('Mention someone to warn');
	if (member.id === message.member.id) return message.channel.send("You can't warn yourself");

	const embed = moderationEmbed(member, message.member, message.guild, reason, 'warned');

	await addPunish(client, message.guild.id, member.id, { type: 'Warning', by: message.member.id, reason, timestamp: message.createdAt });

	if (logChannels[message.guild.id]) {
		const channel = message.guild.channels.cache.find(c => c.id === logChannels[message.guild.id]);
		if (!channel) return message.channel.send(embed);
		return channel
			.send(embed)
			.then(() => message.channel.send(new MessageEmbed({ description: `${member} has been warned lol` })))
			.catch(() => message.channel.send(embed));
	}

	return message.channel.send(embed);
}
