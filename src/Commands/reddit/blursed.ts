import { CommandReturn, RedditCommand } from '../../Structures/Command';

export default class blursed extends RedditCommand {
	constructor() {
		super(
			{ name: 'blursed', description: 'get a blursed image' },
			{
				category: 'reddit',
				usage: '/blursed',
				reddit: 'https://www.reddit.com/r/blursedimages/hot/.json?limit=100',
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
