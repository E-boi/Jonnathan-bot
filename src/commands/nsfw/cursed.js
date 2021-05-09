const { MessageEmbed } = require('discord.js');
const reddit = require('../../utils/reddit');

module.exports = {
	name: 'cursed',
	description: 'returns a cursed image lol',
	nsfw: true,
	category: 'nsfw',
	execute: async message => {
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
	},
};
