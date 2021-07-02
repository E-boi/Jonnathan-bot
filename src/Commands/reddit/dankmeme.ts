import { MessageReturn } from '../../Structures/BaseCommand';
import RedditCommand from '../../Structures/RedditCommand';

export default class meme extends RedditCommand {
	constructor() {
		super({
			name: 'dankmeme',
			aliases: ['dm', 'dankmemes'],
			description: 'gets a dankmeme',
			usage: '{p}meme',
			reddit: ['https://www.reddit.com/r/Memes_Of_The_Dank/hot/.json?limit=100', 'https://www.reddit.com/r/dankmemes/hot/.json?limit=100'],
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
