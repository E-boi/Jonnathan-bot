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

interface helpProps {
	name: CommandProps['name'];
	description: CommandProps['description'];
	usage: CommandProps['usage'];
	aliases?: CommandProps['aliases'];
}

interface configProps {
	nsfw: CommandProps['nsfw'];
	botPerms: CommandProps['botPerms'];
	userPerms: CommandProps['userPerms'];
	guildOnly?: CommandProps['guildOnly'];
	devOnly?: CommandProps['devOnly'];
}

export type MessageReturn = string | { embed: MessageEmbedOptions };

export default class BaseCommand {
	run: (...args: any[]) => Promise<MessageReturn> | MessageReturn;
	help: helpProps;
	config: configProps;
	logger: Logger;
	constructor({ name, description, usage, aliases, nsfw, guildOnly, botPerms, userPerms, devOnly }: CommandProps) {
		this.help = { name, description, usage, aliases };
		this.config = { nsfw, guildOnly, botPerms, userPerms, devOnly };
		this.logger = new Logger(`command: ${this.help.name}`);
	}
}
