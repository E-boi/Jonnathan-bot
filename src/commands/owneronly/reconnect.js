import { reconnect } from '../../utils/mongo.js';

export const ownerOnly = true;
export const name = 'reconnect';
export const description = 'reconnect mongodb';
export const category = 'owneronly';

export async function execute(message, args, client) {
	const msg = await message.channel.send('Reconecting mongo...');
	const connect = await reconnect(client);
	if (connect.isConnected) return msg.edit('Connected!');

	msg.edit(`Failed to connect: \`${connect.errorMessage}\``);
}
