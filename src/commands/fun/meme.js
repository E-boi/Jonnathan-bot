import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'meme';
export const description = 'returns a meme lol';
export const aliases = ['memes'];
export const category = 'fun';

export async function execute(message) {
	const post = await reddit([
		'https://www.reddit.com/r/memes/top/.json?limit=100',
		'https://www.reddit.com/r/meme/top/.json?limit=100',
		'https://www.reddit.com/r/MemeEconomy/hot/.json?limit=100',
		'https://www.reddit.com/r/HistoryMemes/hot/.json?limit=100',
		'https://www.reddit.com/r/wholesomememes/hot/.json?limit=100',
	]);

	const embed = new MessageEmbed()
		.setTitle(post.title)
		.setURL(post.link)
		.setImage(post.image)
		.setColor('RANDOM')
		.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	return message.channel.send(embed);
}
