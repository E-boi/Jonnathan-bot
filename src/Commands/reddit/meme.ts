import { MessageReturn } from '../../Structures/BaseCommand';
import RedditCommand from '../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'meme',
			aliases: ['memes'],
			description: 'gets a meme',
			usage: '{p}meme',
			reddit: [
				'https://www.reddit.com/r/memes/hot/.json?limit=100',
				'https://www.reddit.com/r/meme/hot/.json?limit=100',
				'https://www.reddit.com/r/MemeEconomy/hot/.json?limit=100',
				'https://www.reddit.com/r/HistoryMemes/hot/.json?limit=100',
				'https://www.reddit.com/r/wholesomememes/hot/.json?limit=100',
			],
		});
		this.run = this.makeRun;
	}

	async makeRun(): Promise<MessageReturn> {
		const post = await this.getPost();
		this.logger.log(post.title);
		return {
			embed: {
				title: post.title,
				url: post.link,
				description: post.description,
				image: { url: post.image },
				color: 'RANDOM',
				footer: { text: `💬 ${post.comments} 👍 ${post.upvotes}` },
			},
		};
	}
}
