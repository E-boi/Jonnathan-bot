import { MessageEmbed } from 'discord.js';
import { guildConfigs, staffRoles } from '../../utils/mongo.js';

export const name = 'staffrole';
export const description = 'set a staff role';
export const category = 'configuration';
export const userPerms = ['ADMINISTRATOR'];

export async function execute(message, args, client) {
	if (!args[0])
		return staffRoles[message.guild.id]
			? message.channel.send(new MessageEmbed().setDescription(`You may already know this but <@&${staffRoles[message.guild.id]}> is the staff role`))
			: message.channel.send('There is no staff role');
	const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
	if (!role) return message.channel.send(`Cannot find role`);

	if (staffRoles[message.guild.id] === role.id) return message.channel.send("That's already the staff role");
	staffRoles[message.guild.id] = role.id;
	const result = await guildConfigs(client).findOne({ guildId: message.guild.id });

	if (result) await guildConfigs(client).updateOne({ guildId: message.guild.id }, { $set: { staffRole: role.id } });
	else if (!result) await guildConfigs(client).insertOne({ guildId: message.guild.id, prefix: config.prefix, staffRole: role.id });
	return message.channel.send(`Updated staff role to \`${role.name}\``);
}
