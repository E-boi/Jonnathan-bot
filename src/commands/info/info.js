import { MessageEmbed } from 'discord.js';

export const name = 'botinfo';
export const description = 'information about the bot';
export const category = 'info';

export async function execute(message, args, client) {
	const embed = new MessageEmbed({
		fields: [
			{ name: 'Tag:', value: client.user.tag },
			{ name: 'Created at:', value: client.user.createdAt },
			{ name: 'Avatar:', value: client.user.avatarURL({ dynamic: true }) },
			{ name: 'Github:', value: 'https://github.com/E-boi/Jonnathan-bot' },
			{ name: 'Top gg:', value: 'https://top.gg/bot/718998971799961701' },
		],
		thumbnail: { url: client.user.avatarURL({ dynamic: true }) },
		footer: { iconURL: client.user.avatarURL({ dynamic: true }), text: client.user.tag },
		timestamp: Date.now(),
	});

	return message.channel.send(embed);
}
