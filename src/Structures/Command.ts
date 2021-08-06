import { ApplicationCommandData, CommandInteraction, CommandInteractionOption, InteractionReplyOptions } from 'discord.js';
import fetch from 'node-fetch';
import Client from './Client';

interface CommandConfig {
	usage: string;
	category: string;
	devOnly?: boolean;
	nsfw?: boolean;
	guildOnly?: boolean;
}

interface RedditCommandConfig extends CommandConfig {
	reddit: string[] | string;
}

type CommandReturn = string | InteractionReplyOptions;
type CommandProps = {
	interaction: CommandInteraction;
	args: Readonly<CommandInteractionOption[]>;
	client: Client;
};

abstract class BaseCommand {
	public slashCommand: Readonly<ApplicationCommandData>;
	public config: Readonly<CommandConfig>;
	public abstract execute({ interaction, args, client }: CommandProps): CommandReturn | Promise<CommandReturn>;

	constructor(options: ApplicationCommandData, config: CommandConfig) {
		this.slashCommand = options;
		this.config = config;
	}
}

abstract class RedditCommand extends BaseCommand {
	public config: RedditCommandConfig;

	constructor(options: ApplicationCommandData, config: RedditCommandConfig) {
		super(options, config);
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

abstract class MongoCommand extends BaseCommand {
	constructor(options: ApplicationCommandData, config: CommandConfig) {
		super(options, config);
	}

	getCollection(collection: string, client: Client) {
		return client.mongo.collection(collection);
	}
}

export { BaseCommand, RedditCommand, MongoCommand, CommandReturn, CommandProps };
