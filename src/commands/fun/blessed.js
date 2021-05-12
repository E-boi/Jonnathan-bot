import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'blessed';
export const description = 'returns a blessed image lol';
export const aliases = ['blessed'];
export const category = 'fun';

export async function execute(message) {
	const post = await reddit([
		'https://www.reddit.com/r/aww/hot/.json?limit=100',
		'https://www.reddit.com/r/blessed/hot/.json?limit=100',
		'https://www.reddit.com/r/Blessed_Images/hot/.json?limit=100',
	]);

	const embed = new MessageEmbed()
		.setTitle(post.title)
		.setURL(post.link)
		.setImage(post.image)
		.setColor('RANDOM')
		.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	return message.channel.send(embed);
}
