import { CommandReturn, RedditCommand } from '../../Structures/Command';

export default class meme extends RedditCommand {
	constructor() {
		super(
			{ name: 'meme', description: 'get a meme' },
			{
				category: 'reddit',
				usage: '/meme',
				reddit: [
					'https://www.reddit.com/r/memes/hot/.json?limit=100',
					'https://www.reddit.com/r/meme/hot/.json?limit=100',
					'https://www.reddit.com/r/MemeEconomy/hot/.json?limit=100',
					'https://www.reddit.com/r/HistoryMemes/hot/.json?limit=100',
					'https://www.reddit.com/r/wholesomememes/hot/.json?limit=100',
				],
			}
		);
	}

	async execute(): Promise<CommandReturn> {
		const post = await this.getPost();
		return {
			embeds: [
				{
					title: post.title,
					url: post.link,
					description: post.description,
					image: { url: post.image },
					color: 'RANDOM',
					footer: { text: `💬 ${post.comments} 👍 ${post.upvotes}` },
				},
			],
		};
	}
}
