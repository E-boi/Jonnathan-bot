import { CommandReturn, RedditCommand } from '../../../Structures/Command';

export default class ecchi extends RedditCommand {
	constructor() {
		super(
			{ name: 'ecchi', description: 'get ecchi' },
			{
				category: 'nsfw',
				usage: '/ecchi',
				nsfw: true,
				reddit: 'https://www.reddit.com/r/ecchi/hot/.json?limit=100',
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
