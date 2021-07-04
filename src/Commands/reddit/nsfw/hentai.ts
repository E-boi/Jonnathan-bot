import { MessageReturn } from '../../../Structures/BaseCommand';
import RedditCommand from '../../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'hentai',
			description: 'gets hentai',
			usage: '{p}hentai',
			reddit: [
				'https://www.reddit.com/r/hentaihaven/hot/.json?limit=100',
				'https://www.reddit.com/r/hentai_gif/hot/.json?limit=100',
				'https://www.reddit.com/r/hentai/hot/.json?limit=100',
			],
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
