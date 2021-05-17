import { MessageEmbed } from 'discord.js';
import { moderationEmbed } from '../../utils/functions.js';
import { logChannels } from '../../utils/mongo.js';

export const name = 'kick';
export const description = 'kicks a user';
export const category = 'moderation';
export const userPerms = ['KICK_MEMBERS'];
export const botPerms = ['KICK_MEMBERS'];

export async function execute(message, args) {
	const member = message.mentions.members.first();
	const reason = args.splice(1).join(' ') || '(none)'; // will be useful once modlogs are setup

	if (!member) return message.channel.send('Mention someone to kick');
	if (member.id === message.member.id) return message.channel.send("You can't kick yourself");
	if (!member.kickable) return message.channel.send("I can't kick that user");

	const embed = moderationEmbed(member, message.member, message.guild, reason, 'kicked');
	await member.send(embed);
	await member.kick(reason).catch(err => {
		member.send('You got lucky a error happened');
		console.log(err);
		return message.channel.send('Unlucky a error happened');
	});

	if (logChannels[message.guild.id]) {
		const channel = message.guild.channels.cache.find(c => c.id === logChannels[message.guild.id]);
		if (!channel) return message.channel.send(embed);
		return channel
			.send(embed)
			.then(() => message.channel.send(new MessageEmbed({ description: `${member} has been kicked lol` })))
			.catch(() => message.channel.send(embed));
	}

	return message.channel.send(embed);
}
