import { CommandReturn, RedditCommand } from '../../../Structures/Command';

export default class hentai extends RedditCommand {
	constructor() {
		super(
			{ name: 'hentai', description: 'get hentai' },
			{
				category: 'nsfw',
				usage: '/hentai',
				nsfw: true,
				reddit: [
					'https://www.reddit.com/r/hentaihaven/hot/.json?limit=100',
					'https://www.reddit.com/r/hentai_gif/hot/.json?limit=100',
					'https://www.reddit.com/r/hentai/hot/.json?limit=100',
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
