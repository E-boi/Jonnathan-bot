import { MessageEmbed } from 'discord.js';
import { getLog } from '../../utils/mongo.js';

export const name = 'logs';
export const description = 'return a user logs';
export const category = 'moderation';
export const userPerms = ['ADMINISTRATOR'];
export const staffCanDo = true;

export async function execute(message, args, client) {
	if (!args[0]) return message.channel.send('Mentions a user or send the user id');

	const member = message.mentions.members.first() || message.guild.members.cache.find(x => x.id === args[0]);
	if (!member) return message.channel.send("Couldn't find that user");
	if (member.user.bot) return message.channel.send('Cannot warn a bot');

	const log = await getLog(client).findOne({ guildId: message.guild.id, userId: member.id });
	if (!log) return message.channel.send('No logs found on that user');

	const embed = new MessageEmbed({
		title: `${member.user.username} logs`,
		timestamp: Date.now(),
		footer: { iconURL: member.user.avatarURL({ dynamic: true }), text: member.user.tag },
	});
	log.punishments.map((punishment, idx) => {
		embed.addField(`Log ${++idx}`, `Type: ${punishment.type}\nReason: ${punishment.reason}\nBy: <@${punishment.by}>\nWhen: ${punishment.timestamp}`);
	});

	return message.channel.send(embed);
}
