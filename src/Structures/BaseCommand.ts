import { MessageEmbedOptions, PermissionResolvable } from 'discord.js';
import Logger from './Logger';

export interface CommandProps {
	name: string;
	description: string;
	usage: string;
	category: string;
	devOnly?: boolean;
	botPerms?: PermissionResolvable[];
	userPerms?: PermissionResolvable[];
	nsfw?: boolean;
	aliases?: string[];
	guildOnly?: boolean;
}

export interface helpProps {
	name: CommandProps['name'];
	description: CommandProps['description'];
	usage: CommandProps['usage'];
	category: CommandProps['category'];
	aliases?: CommandProps['aliases'];
}

export interface configProps {
	nsfw: CommandProps['nsfw'];
	category: CommandProps['category'];
	userPerms?: CommandProps['userPerms'];
	botPerms?: CommandProps['botPerms'];
	guildOnly?: CommandProps['guildOnly'];
	devOnly?: CommandProps['devOnly'];
}

export type MessageReturn = string | { embed: MessageEmbedOptions };

export default class BaseCommand {
	run: (...args: any[]) => Promise<MessageReturn> | MessageReturn;
	help: helpProps;
	config: configProps;
	logger: Logger;
	constructor({ name, description, usage, aliases, nsfw, guildOnly, botPerms, userPerms, devOnly, category }: CommandProps) {
		this.help = { name, description, usage, aliases, category };
		this.config = { nsfw, guildOnly, botPerms, userPerms, devOnly, category };
		this.logger = new Logger(`command: ${this.help.name}`);
	}
}
