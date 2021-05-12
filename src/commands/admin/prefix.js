import { guildPrefixes } from '../../utils/getAllPrefixes.js';

export const name = 'prefix';
export const description = 'changes the server prefix';
export const category = 'admin';
export const userPerms = ['ADMINISTRATOR'];

export async function execute(message, args, client) {
	if (!args[0]) return message.channel.send(`You probably already know but the prefix is ${guildPrefixes[message.guild.id]}`);
	if (args.length > 20) return message.channel.send('This might be too long');

	guildPrefixes[message.guild.id] = args[0];
	const result = await client.mongo.collection(config.mongo.collections.guildConfigs).findOne({ guildId: message.guild.id });

	if (!result) await client.mongo.collection(config.mongo.collections.guildConfigs).insertOne({ guildId: message.guild.id, prefix: args[0] });
	if (result)
		await client.mongo.collection(config.mongo.collections.guildConfigs).updateOne({ guildId: message.guild.id }, { $set: { prefix: args[0] } });
	return message.channel.send(`Updated prefix to ${args[0]}`);
}
