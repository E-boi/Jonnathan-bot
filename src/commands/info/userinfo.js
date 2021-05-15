import { MessageEmbed } from 'discord.js';
import { isBotOwner } from '../../utils/functions.js';

export const name = 'userinfo';
export const description = 'information about a user';
export const category = 'info';

export async function execute(message, args) {
	const member =
		message.mentions.members.first() ||
		message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0]?.toLowerCase()) ||
		message.member;

	const presenceType = {
		CUSTOM_STATUS: 'Custom status',
		PLAYING: 'Playing a game',
		LISTENING: 'Listening to',
		WATCHING: 'Watching',
		dnd: 'Do Not Disturb',
		online: 'Online',
		idle: 'Idle',
		offline: 'Offline',
	};

	const embed = new MessageEmbed({
		fields: [
			{ name: 'Username:', value: member.user.username, inline: true },
			{ name: 'Nickname:', value: member.nickname || 'none', inline: true },
			{ name: 'ID:', value: member.user.id, inline: true },
			{ name: 'Status', value: presenceType[member.presence.status], inline: true },
			{ name: 'Created at:', value: member.user.createdAt, inline: true },
			{ name: 'Joined at:', value: member.joinedAt, inline: true },
		],
		author: { iconURL: member.user.avatarURL({ dynamic: true }), name: `Information about: ${member.user.tag}` },
		thumbnail: { url: member.user.avatarURL({ dynamic: true }) },
		footer: { iconURL: message.member.user.avatarURL({ dynamic: true }), text: `Requested by: ${message.member.displayName}` },
	});

	if (isBotOwner(member)) embed.setDescription(`${member.user.username} is the bot owner!`);

	if (member.presence.activities)
		member.presence.activities.map(presence =>
			embed.addField(
				`${presenceType[presence.type]}:`,
				`> **Name:** ${presence.name}\n> **State:** ${presence.emoji?.name || ''} ${presence.state || 'none'}\n> **Details:** ${
					presence.details || 'none'
				}`
			)
		);

	return message.channel.send(embed);
}
