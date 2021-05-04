const { MessageEmbed } = require('discord.js');
const reddit = require('../../utils/reddit');

module.exports = {
	name: 'dankmeme',
	description: 'returns a dankmeme lol',
	aliases: ['dank'],
	execute: async message => {
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
	},
};
