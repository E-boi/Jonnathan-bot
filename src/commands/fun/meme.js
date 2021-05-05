const { MessageEmbed } = require('discord.js');
const reddit = require('../../utils/reddit');

module.exports = {
	name: 'meme',
	description: 'return a meme lol',
	aliases: ['memes'],
	category: 'fun',
	execute: async message => {
		const post = await reddit([
			'https://www.reddit.com/r/memes/top/.json?limit=100',
			'https://www.reddit.com/r/meme/top/.json?limit=100',
			'https://www.reddit.com/r/MemeEconomy/hot/.json?limit=100',
			'https://www.reddit.com/r/HistoryMemes/hot/.json?limit=100',
			'https://www.reddit.com/r/wholesomememes/hot/.json?limit=100',
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
