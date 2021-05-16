import { staffRoles } from './mongo.js';

export function isBotOwner(member) {
	return member?.id === config.ownerId;
}

export function isStaff({ command, member, guildId }) {
	return (command.userPerms && member.hasPermission(command.userPerms)) || (command.staffCanDo && member?.roles.cache.has(staffRoles[guildId]));
}
