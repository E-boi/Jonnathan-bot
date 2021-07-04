import { MessageReturn } from '../../../Structures/BaseCommand';
import RedditCommand from '../../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'ecchi',
			description: 'gets ecchi image',
			usage: '{p}ecchi',
			reddit: 'https://www.reddit.com/r/ecchi/hot/.json?limit=100',
			nsfw: true,
			category: 'nsfw',
		});
		this.run = this.makeRun;
	}

	async makeRun(): Promise<MessageReturn> {
		const post = await this.getPost();
		if (post.image?.includes('redgifs')) {
			post.description = post.image;
			post.image = null;
		}
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
