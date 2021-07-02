import { MessageReturn } from '../../Structures/BaseCommand';
import RedditCommand from '../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'pics',
			description: 'gets a image',
			usage: '{p}pics',
			reddit: 'https://www.reddit.com/r/pics/hot/.json?limit=100',
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
