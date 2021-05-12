import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export const name = 'cursed';
export const description = 'returns a cursed image lol';
export const category = 'nsfw';
export const nsfw = false;

export async function execute(message) {
	const post = await reddit([
		'https://www.reddit.com/r/cursedimages/hot/.json?limit=100',
		'https://www.reddit.com/r/Cursed_Images/hot/.json?limit=100',
		'https://www.reddit.com/r/cursedcomments/hot/.json?limit=100',
	]);

	const embed = new MessageEmbed()
		.setTitle(post.title)
		.setURL(post.link)
		.setImage(post.image)
		.setColor('RANDOM')
		.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

	return message.channel.send(embed);
}
