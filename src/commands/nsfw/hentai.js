import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'hentai';
export const description = 'returns a cursed image lol';
export const category = 'nsfw';
export const nsfw = true;

export async function execute(message) {
	const post = await reddit(
		[
			'https://www.reddit.com/r/hentaihaven/hot/.json?limit=100',
			'https://www.reddit.com/r/hentai_gif/hot/.json?limit=100',
			'https://www.reddit.com/r/hentai/hot/.json?limit=100',
		],
		true
	);

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
