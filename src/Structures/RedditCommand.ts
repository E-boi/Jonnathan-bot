import { PermissionResolvable } from 'discord.js';
import fetch from 'node-fetch';
import { MessageReturn } from './BaseCommand';

interface CommandProps {
	name: string;
	description: string;
	usage: string;
	reddit: string | string[];
	aliases?: string[];
	devOnly?: boolean;
	botPerms?: PermissionResolvable[];
	userPerms?: PermissionResolvable[];
	nsfw?: boolean;
}

export default class RedditCommand {
	run: (...args: any[]) => Promise<MessageReturn>;
	help: CommandProps;
	constructor({ name, description, usage, aliases, nsfw, reddit }: CommandProps) {
		this.help = { name, description, reddit, usage, aliases, nsfw };
	}

	async getPost() {
		const url = Array.isArray(this.help.reddit) ? this.help.reddit[Math.floor(Math.random() * this.help.reddit.length)] : this.help.reddit;
		const res = await fetch(url);
		const json = await res.json();
		const index = json.data.children[Math.floor(Math.random() * json.data.dist)].data;
		const post = {
			title: index.title,
			description: index.selftext,
			image: index.url || index.url_overridden_by_dest || index.preview.images[0].source.url.replace('&amp;', '&'),
			link: `https://www.reddit.com${index.permalink}`,
			comments: index.num_comments,
			upvotes: index.ups,
			nsfw: !!(index.thumbnail === 'NSFW' || index.over_18),
		};
		return post;
	}
}
