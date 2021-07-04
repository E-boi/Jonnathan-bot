import { MessageReturn } from '../../../Structures/BaseCommand';
import RedditCommand from '../../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'rule34',
			description: 'gets rule34',
			usage: '{p}rule34',
			reddit: 'https://www.reddit.com/r/rule34/hot/.json?limit=100',
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
