import { CommandReturn, RedditCommand } from '../../../Structures/Command';

export default class rule34 extends RedditCommand {
	constructor() {
		super(
			{ name: 'rule34', description: 'get rule34' },
			{
				category: 'nsfw',
				usage: '/rule34',
				nsfw: true,
				reddit: 'https://www.reddit.com/r/rule34/hot/.json?limit=100',
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
