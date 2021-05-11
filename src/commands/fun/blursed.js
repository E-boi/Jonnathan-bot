import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export default {
	name: 'blursed',
	description: 'returns a blursed image lol',
	category: 'fun',
	execute: async message => {
		const post = await reddit('https://www.reddit.com/r/blursedimages/hot/.json?limit=100');

		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setURL(post.link)
			.setImage(post.image)
			.setColor('RANDOM')
			.setFooter(`💬 ${post.comments} 👍 ${post.upvotes}`);

		return message.channel.send(embed);
	},
};
