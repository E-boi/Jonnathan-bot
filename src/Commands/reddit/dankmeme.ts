import { CommandReturn, RedditCommand } from '../../Structures/Command';

export default class dankmeme extends RedditCommand {
	constructor() {
		super(
			{ name: 'dankmeme', description: 'get a dankmeme' },
			{
				category: 'reddit',
				usage: '/dankmeme',
				reddit: ['https://www.reddit.com/r/Memes_Of_The_Dank/hot/.json?limit=100', 'https://www.reddit.com/r/dankmemes/hot/.json?limit=100'],
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
