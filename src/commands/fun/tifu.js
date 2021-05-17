import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'tifu';
export const description = 'returns a fuck up lol';
export const category = 'fun';

export async function execute(message) {
	const post = await reddit('https://www.reddit.com/r/tifu/hot/.json?limit=100');

	const embed = new MessageEmbed()
		.setTitle(post.title)
		.setURL(post.link)
		.setDescription(post.description)
		.setColor('RANDOM')
		.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	return message.channel.send(embed);
}
