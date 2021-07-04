import { MessageReturn } from '../../../Structures/BaseCommand';
import RedditCommand from '../../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'cursed',
			description: 'gets a cursed image',
			usage: '{p}cursed',
			reddit: [
				'https://www.reddit.com/r/cursedimages/hot/.json?limit=100',
				'https://www.reddit.com/r/Cursed_Images/hot/.json?limit=100',
				'https://www.reddit.com/r/cursedcomments/hot/.json?limit=100',
			],
			nsfw: true,
			category: 'nsfw',
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
