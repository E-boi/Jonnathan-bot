import { staffRoles } from '../../utils/mongo.js';

export const name = 'staffrole';
export const description = 'set a staff role';
export const category = 'configuration';
export const userPerms = ['ADMINISTRATOR'];

export async function execute(message, args, client) {
	const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
	if (!role) return message.channel.send(`Cannot find role`);

	staffRoles[message.guild.id] = role.id;
	const result = await client.mongo.collection(config.mongo.collections.guildConfigs).findOne({ guildId: message.guild.id });

	if (!result)
		await client.mongo
			.collection(config.mongo.collections.guildConfigs)
			.insertOne({ guildId: message.guild.id, prefix: config.prefix, staffRole: role.id });
	if (result)
		await client.mongo.collection(config.mongo.collections.guildConfigs).updateOne({ guildId: message.guild.id }, { $set: { staffRole: role.id } });
	return message.channel.send(`Updated staff role to \`${role.name}\``);
}
