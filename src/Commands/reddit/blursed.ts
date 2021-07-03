import { MessageReturn } from '../../Structures/BaseCommand';
import RedditCommand from '../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'blursed',
			description: 'gets a blursed image',
			usage: '{p}blursed',
			reddit: 'https://www.reddit.com/r/blursedimages/hot/.json?limit=100',
			category: 'reddit',
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
