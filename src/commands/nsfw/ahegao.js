import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'ahegao';
export const description = 'returns ahegao lol';
export const category = 'nsfw';
export const nsfw = true;

export async function execute(message) {
	const post = await reddit('https://www.reddit.com/r/ahegao/hot/.json?limit=100');

	if (post.image?.includes('redgifs')) {
		post.description = post.image;
		post.image = null;
	}

	const embed = new MessageEmbed()
		.setTitle(post.title)
		.setURL(post.link)
		.setImage(post.image)
		.setColor('RANDOM')
		.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	if (post.description) embed.setDescription(post.description);

	return message.channel.send(embed);
}
