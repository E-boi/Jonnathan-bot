import { CommandReturn, RedditCommand } from '../../Structures/Command';

export default class blessed extends RedditCommand {
	constructor() {
		super(
			{ name: 'blessed', description: 'get a blessed image' },
			{
				category: 'reddit',
				usage: '/blessed',
				reddit: [
					'https://www.reddit.com/r/aww/hot/.json?limit=100',
					'https://www.reddit.com/r/blessed/hot/.json?limit=100',
					'https://www.reddit.com/r/Blessed_Images/hot/.json?limit=100',
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
