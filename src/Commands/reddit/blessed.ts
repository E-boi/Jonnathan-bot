import { MessageReturn } from '../../Structures/BaseCommand';
import RedditCommand from '../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'blessed',
			description: 'gets a blessed image',
			usage: '{p}blessed',
			reddit: [
				'https://www.reddit.com/r/aww/hot/.json?limit=100',
				'https://www.reddit.com/r/blessed/hot/.json?limit=100',
				'https://www.reddit.com/r/Blessed_Images/hot/.json?limit=100',
			],
		});
		this.run = this.makeRun;
	}

	async makeRun(): Promise<MessageReturn> {
		const post = await this.getPost();
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
