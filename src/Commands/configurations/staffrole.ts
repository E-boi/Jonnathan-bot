import { CommandProps, CommandReturn, MongoCommand } from '../../Structures/Command';
import Config from '../../../config';

export default class staffrole extends MongoCommand {
	constructor() {
		super(
			{ name: 'staffrole', description: 'change/set a staff role', options: [{ name: 'roles', description: 'roles', type: 'ROLE', required: true }] },
			{ usage: '/staffrole {staff role}', category: 'configurations' }
		);
	}

	async execute({ interaction: { guildId }, args, client }: CommandProps): Promise<CommandReturn> {
		if (!args[0].role) return { content: 'Invaild role', ephemeral: true };
		await this.getCollection(Config.mongo.collections.guildConfigs, client).updateOne(
			{ guildId },
			{ $set: { staffRole: args[0].role.id } },
			{ upsert: true }
		);
		return `${args[0].role} is now the staff role`;
	}
}
