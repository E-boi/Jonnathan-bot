import { MessageEmbedOptions, PermissionResolvable } from 'discord.js';

interface CommandProps {
	name: string;
	description: string;
	usage: string;
	devOnly?: boolean;
	botPerms?: PermissionResolvable[];
	userPerms?: PermissionResolvable[];
	nsfw?: boolean;
	aliases?: string[];
}

export default class BaseCommand {
	run: (...args: any[]) => string | { embed: MessageEmbedOptions };
	help: CommandProps;
	constructor({ name, description, usage, aliases, nsfw }: CommandProps) {
		this.help = { name, description, usage, aliases, nsfw };
	}
}
