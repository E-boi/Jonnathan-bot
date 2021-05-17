import { MessageEmbed } from 'discord.js';
import { addPunish, moderationEmbed } from '../../utils/functions.js';
import { logChannels } from '../../utils/mongo.js';

export const name = 'ban';
export const description = 'bans a user';
export const category = 'moderation';
export const userPerms = ['BAN_MEMBERS'];
export const botPerms = ['BAN_MEMBERS'];

export async function execute(message, args) {
	const member = message.mentions.members.first();
	const reason = args.splice(1).join(' ') || '(none)';
	let error = false;

	if (!member) return message.channel.send('Mention someone to ban');
	if (member.id === message.member.id) return message.channel.send("You can't ban yourself");
	if (!member.bannable) return message.channel.send("I can't ban that user");

	const embed = moderationEmbed(member, message.member, message.guild, reason, 'banned');
	await member.send(embed);
	await member.ban({ reason }).catch(err => {
		member.send('You got lucky a error happened');
		console.log(err);
		error = true;
		return message.channel.send('Unlucky a error happened');
	});

	if (error) return;
	await addPunish(client, message.guild.id, member.id, { type: 'Kicked', by: message.member.id, reason, timestamp: message.createdAt });

	if (logChannels[message.guild.id]) {
		const channel = message.guild.channels.cache.find(c => c.id === logChannels[message.guild.id]);
		if (!channel) return message.channel.send(embed);
		return channel
			.send(embed)
			.then(() => message.channel.send(new MessageEmbed({ description: `${member} has been banned lol` })))
			.catch(() => message.channel.send(embed));
	}

	return message.channel.send(embed);
}
