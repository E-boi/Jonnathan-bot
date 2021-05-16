import { guildConfigs, logChannels } from '../../utils/mongo.js';

export const name = 'logchannel';
export const description = 'set up a log channel for the bot to send bans/kicks message there';
export const category = 'configurations';
export const userPerms = ['MANAGE_CHANNELS'];
export const staffCanDo = true;

export async function execute(message, args, client) {
	if (!args[0])
		return message.channel.send(
			logChannels[message.guild.id] ? `the current logchannel is ${logChannels[message.guild.id]}` : 'Mention a channel to set a logchannel'
		);

	const channel = message.mentions.channels.first();
	if (!channel) return message.channel.send('Mention a vaild channel');

	if (!channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))
		return message.channel.send(`I don\'t have permission to send messages in ${channel}`);

	if (logChannels[message.guild.id] === channel.id) return message.channel.send("That's already the logchannel");
	logChannels[message.guild.id] = channel.id;
	const result = await guildConfigs(client).findOne({ guildId: message.guild.id });
	if (result) await guildConfigs(client).updateOne({ guildId: message.guild.id }, { $set: { logchannel: channel.id } });
	else if (!result) await guildConfigs(client).insertOne({ guildId: message.guild.id, prefix: config.prefix, logchannel: channel.id });

	return message.channel.send(`Updated logchannel to ${channel}`);
}
