import { MessageEmbed } from 'discord.js';
import { guildPrefixes } from '../../utils/mongo.js';
import { isBotOwner } from '../../utils/functions.js';

export const name = 'serverinfo';
export const description = 'information about the server';
export const aliases = ['server'];
export const category = 'info';

export async function execute({ guild, channel }) {
	const getChannels = type => guild.channels.cache.filter(c => c.type === type).size;
	const embed = new MessageEmbed({
		fields: [
			{ name: 'Server name', value: guild.name, inline: true },
			{ name: 'ID', value: guild.id, inline: true },
			{ name: 'Region', value: guild.region, inline: true },
			{ name: 'Created At', value: guild.createdAt, inline: true },
			{ name: 'Text Channels', value: getChannels('text'), inline: true },
			{ name: 'Voice Channels', value: getChannels('voice'), inline: true },
			{ name: 'Categories', value: getChannels('category'), inline: true },
			{ name: 'Member count', value: guild.memberCount, inline: true },
			{ name: 'Role count', value: guild.roles.cache.size, inline: true },
			{ name: 'Owner', value: guild.owner.displayName, inline: true },
			{ name: 'Owner Tag', value: guild.owner.user.tag, inline: true },
			{ name: 'Emojis', value: guild.emojis.cache.array().join(' '), inline: true },
		],
		color: 'RANDOM',
		thumbnail: { url: guild.iconURL({ dynamic: true }) },
	});

	channel.send(embed);
}
