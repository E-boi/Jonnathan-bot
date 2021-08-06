import { CommandReturn, RedditCommand } from '../../../Structures/Command';

export default class cursed extends RedditCommand {
	constructor() {
		super(
			{ name: 'cursed', description: 'get a cursed image' },
			{
				category: 'nsfw',
				usage: '/cursed',
				nsfw: true,
				reddit: [
					'https://www.reddit.com/r/cursedimages/hot/.json?limit=100',
					'https://www.reddit.com/r/Cursed_Images/hot/.json?limit=100',
					'https://www.reddit.com/r/cursedcomments/hot/.json?limit=100',
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
