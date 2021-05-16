import { moderationEmbed } from '../../utils/functions.js';

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
	return message.channel.send(embed);
}
