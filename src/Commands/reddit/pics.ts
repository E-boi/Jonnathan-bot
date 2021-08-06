import { CommandReturn, RedditCommand } from '../../Structures/Command';

export default class pics extends RedditCommand {
	constructor() {
		super(
			{ name: 'pics', description: 'get a pic' },
			{
				category: 'reddit',
				usage: '/pics',
				reddit: 'https://www.reddit.com/r/pics/hot/.json?limit=100',
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
