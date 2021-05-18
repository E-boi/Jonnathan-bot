import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'space';
export const description = 'returns space lol';
export const category = 'fun';

export async function execute(message) {
	const post = await reddit(['https://www.reddit.com/r/space/hot/.json?limit=100', 'https://www.reddit.com/r/spaceporn/hot/.json?limit=100']);

	const embed = new MessageEmbed().setTitle(post.title).setURL(post.link).setColor('RANDOM').setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	if (post.image && post.description) {
		embed.setDescription(post.description);
		embed.setThumbnail(post.image);
	} else if (post.image && !post.description) embed.setImage(post.image);
	else if (!post.image && post.description) embed.setDescription(post.image);

	return message.channel.send(embed);
}
