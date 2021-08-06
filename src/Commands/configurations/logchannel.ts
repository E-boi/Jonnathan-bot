import { CommandProps, CommandReturn, MongoCommand } from '../../Structures/Command';
import Config from '../../../config';

export default class logchannel extends MongoCommand {
	constructor() {
		super(
			{
				name: 'logchannel',
				description: 'change/set a log channel',
				options: [{ name: 'channels', description: 'channels', type: 'CHANNEL', required: true }],
			},
			{ usage: '/logchannel {channel}', category: 'configurations' }
		);
	}

	async execute({ interaction: { guildId }, args, client }: CommandProps): Promise<CommandReturn> {
		if (!args[0].channel || args[0].channel.type !== 'GUILD_TEXT') return { content: 'invaild channel', ephemeral: true };
		await this.getCollection(Config.mongo.collections.guildConfigs, client).updateOne(
			{ guildId },
			{ $set: { logchannel: args[0].channel.id } },
			{ upsert: true }
		);
		return `${args[0].channel} is now the log channel`;
	}
}
