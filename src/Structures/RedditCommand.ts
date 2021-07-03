import fetch from 'node-fetch';
import BaseCommand, { CommandProps, configProps } from './BaseCommand';

interface RedditCommandProps extends CommandProps {
	reddit: string | string[];
}

interface RedditConfigProps extends configProps {
	reddit: string | string[];
}

export default class RedditCommand extends BaseCommand {
	config: RedditConfigProps;
	constructor({ name, description, usage, aliases, nsfw, guildOnly, botPerms, userPerms, devOnly, category, reddit }: RedditCommandProps) {
		super({ name, description, usage, aliases, nsfw, guildOnly, botPerms, userPerms, devOnly, category });
		this.config.reddit = reddit;
	}

	async getPost() {
		const url = Array.isArray(this.config.reddit) ? this.config.reddit[Math.floor(Math.random() * this.config.reddit.length)] : this.config.reddit;
		const res = await fetch(url);
		const json = await res.json();
		const index = json.data.children[Math.floor(Math.random() * json.data.dist)].data;
		const post = {
			title: index.title,
			description: index.selftext,
			image: index.url_overridden_by_dest || index.preview?.images[0].source.url.replace('&amp;', '&'),
			link: `https://www.reddit.com${index.permalink}`,
			comments: index.num_comments,
			upvotes: index.ups,
			nsfw: !!(index.thumbnail === 'NSFW' || index.over_18),
		};
		return post;
	}
}
