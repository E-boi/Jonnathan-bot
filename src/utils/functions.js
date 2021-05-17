import { MessageEmbed } from 'discord.js';
import { getLog, staffRoles } from './mongo.js';

export function isBotOwner(member) {
	return member?.id === config.ownerId;
}

export function isStaff({ command, member, guildId }) {
	return (command.userPerms && member?.hasPermission(command.userPerms)) || (command.staffCanDo && member?.roles.cache.has(staffRoles[guildId]));
}

export function moderationEmbed(member, staff, { name, id }, reason, action) {
	return new MessageEmbed({
		title: `${member.user.username} ${action}`,
		description: `**${action} member:** ${member.user.tag} (id: ${member.id}, mention: ${member})
		**${action} by:** ${staff.user.tag} (id: ${staff.id}, mention: ${staff})
		**${action} from:** ${name} (id: ${id})
		**reason:** ${reason}`,
		footer: { iconURL: staff.user.avatarURL({ dynamic: true }), text: staff.user.tag },
		timestamp: Date.now(),
		color: '#ff0000',
	});
}

export async function addPunish(client, guildId, userId, punishment) {
	const result = await getLog(client).findOne({ guildId, userId });
	if (result)
		await getLog(client).updateOne(
			{ guildId, userId },
			{
				$push: { punishments: punishment },
			}
		);
	else
		await getLog(client).insertOne({
			guildId,
			userId,
			punishments: [punishment],
		});
}
