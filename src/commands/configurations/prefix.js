import { guildPrefixes, guildConfigs } from '../../utils/mongo.js';

export const name = 'prefix';
export const description = 'changes the server prefix';
export const category = 'configurations';
export const userPerms = ['ADMINISTRATOR'];
export const staffCanDo = true;

export async function execute(message, args, client) {
	if (!args[0]) return message.channel.send(`You probably already know but the prefix is ${guildPrefixes[message.guild.id]}`);
	if (args.length > 20) return message.channel.send('This might be too long');

	if (guildPrefixes[message.guild.id] === args[0]) return message.channel.send("That's the current prefix");
	guildPrefixes[message.guild.id] = args[0];
	const result = await guildConfigs(client).findOne({ guildId: message.guild.id });

	if (result) await guildConfigs(client).updateOne({ guildId: message.guild.id }, { $set: { prefix: args[0] } });
	else if (!result) await guildConfigs(client).insertOne({ guildId: message.guild.id, prefix: args[0] });
	return message.channel.send(`Updated prefix to ${args[0]}`);
}
