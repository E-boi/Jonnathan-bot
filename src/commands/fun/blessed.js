import { MessageEmbed } from 'discord.js';
import reddit from '../../utils/reddit.js';

export default {
	name: 'blessed',
	description: 'returns a blessed image lol',
	aliases: ['aww'],
	category: 'fun',
	execute: async message => {
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
	},
};
