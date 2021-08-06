import { CommandReturn, RedditCommand } from '../../../Structures/Command';

export default class porn extends RedditCommand {
	constructor() {
		super(
			{ name: 'porn', description: 'get porn' },
			{
				category: 'nsfw',
				usage: '/porn',
				nsfw: true,
				reddit: [
					'https://www.reddit.com/r/porn/hot/.json?limit=100',
					'https://www.reddit.com/r/nsfw/hot/.json?limit=100',
					'https://www.reddit.com/r/nsfw_gif/hot/.json?limit=100',
				],
			}
		);
	}

	async execute(): Promise<CommandReturn> {
		const post = await this.getPost();
		if (post.image?.includes('redgifs')) {
			post.description = post.image;
			post.image = null;
		}

		return {
			embeds: [
				{
					title: post.title,
					url: post.link,
					description: post.description,
					image: post.image && { url: post.image },
					color: 'RANDOM',
					footer: { text: `💬 ${post.comments} 👍 ${post.upvotes}` },
				},
			],
		};
	}
}
