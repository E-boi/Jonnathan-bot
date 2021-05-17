import { MessageEmbed } from 'discord.js';
import { getLog } from '../../utils/mongo.js';

export const name = 'clearlog';
export const description = 'clears a user logs';
export const category = 'moderation';
export const userPerms = ['ADMINISTRATOR'];
export const staffCanDo = true;

export async function execute(message, args, client) {
	if (!args[0]) return message.channel.send('Mentions a user or send the user id');
	if (!args[1]) return message.channel.send('Specify a log to clear (log number) or all to clear all logs from a user');

	const member = message.mentions.members.first() || message.guild.members.cache.find(x => x.id === args[0]);
	const logToClear = args[1] === 'all' ? 'all' : parseInt(args[1]);

	if (!member) return message.channel.send("Couldn't find that user");
	if (!logToClear) return message.channel.send('Invaild number');

	const log = await getLog(client).findOne({ guildId: message.guild.id, userId: member.id });
	if (!log) return message.channel.send('That user has no logs');
	if (logToClear === 'all') {
		await getLog(client).deleteOne({ guildId: message.guild.id, userId: member.id });
		return message.channel.send(new MessageEmbed().setDescription(`Cleared all logs for ${member}`));
	}
	if (logToClear > log.punishments.length || logToClear < 0) return message.channel.send('Invaild log');
	log.punishments.splice(logToClear - 1, 1);

	await getLog(client).updateOne({ guildId: message.guild.id, userId: member.id }, { $set: { punishments: log.punishments } });
	return message.channel.send(new MessageEmbed().setDescription(`Cleared log ${logToClear} from ${member}`));
}
