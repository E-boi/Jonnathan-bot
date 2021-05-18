import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'pics';
export const description = 'returns a image lol';
export const category = 'fun';

export async function execute(message) {
	const post = await reddit('https://www.reddit.com/r/pics/hot/.json?limit=100');

	const embed = new MessageEmbed()
		.setTitle(post.title)
		.setURL(post.link)
		.setImage(post.image)
		.setColor('RANDOM')
		.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	return message.channel.send(embed);
}
