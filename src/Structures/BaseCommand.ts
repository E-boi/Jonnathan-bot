import { MessageEmbedOptions, PermissionResolvable } from 'discord.js';
import Logger from './Logger';

interface CommandProps {
	name: string;
	description: string;
	usage: string;
	devOnly?: boolean;
	botPerms?: PermissionResolvable[];
	userPerms?: PermissionResolvable[];
	nsfw?: boolean;
	aliases?: string[];
	guildOnly?: boolean;
}

export type MessageReturn = string | { embed: MessageEmbedOptions };

export default class BaseCommand {
	run: (...args: any[]) => Promise<MessageReturn> | MessageReturn;
	help: CommandProps;
	logger: Logger;
	constructor({ name, description, usage, aliases, nsfw, guildOnly }: CommandProps) {
		this.help = { name, description, usage, aliases, nsfw, guildOnly };
		this.logger = new Logger(`command: ${this.help.name}`);
	}
}
