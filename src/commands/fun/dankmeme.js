import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'dankmeme';
export const description = 'returns a dankmeme lol';
export const aliases = ['dank'];
export const category = 'fun';

export async function execute(message) {
	const post = await reddit([
		'https://www.reddit.com/r/Memes_Of_The_Dank/hot/.json?limit=100',
		'https://www.reddit.com/r/dankmemes/hot/.json?limit=100',
	]);

	const embed = new MessageEmbed()
		.setTitle(post.title)
		.setURL(post.link)
		.setImage(post.image)
		.setColor('RANDOM')
		.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	return message.channel.send(embed);
}
