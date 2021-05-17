import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'wholesome';
export const description = 'returns something wholesome lol';
export const category = 'fun';

export async function execute(message) {
	const post = await reddit([
		'https://www.reddit.com/r/wholesome/hot/.json?limit=100',
		'https://www.reddit.com/r/wholesomegifs/hot/.json?limit=100',
		'https://www.reddit.com/r/UnexpectedlyWholesome/hot/.json?limit=100',
	]);

	const embed = new MessageEmbed()
		.setTitle(post.title)
		.setURL(post.link)
		.setImage(post.image)
		.setColor('RANDOM')
		.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	return message.channel.send(embed);
}
