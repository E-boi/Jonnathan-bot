import commandHandler from '../../handlers/command.js';

export const ownerOnly = true;
export const name = 'reloadcommands';
export const description = 'reloads commands';
export const category = 'owneronly';

export async function execute(message, args, client) {
	const msg = await message.channel.send('Reload commands...');
	await commandHandler(client);
	msg.edit('Done!');
}
