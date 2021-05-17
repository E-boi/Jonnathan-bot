export const ownerOnly = true;
export const name = 'eval';
export const description = 'some epik eval command';
export const category = 'owneronly';

export async function execute(message, args, client) {
	const evalText = args.slice(0).join(' ');
	const evaled = await eval(evalText);
	console.log(evaled);
	if (typeof evaled !== 'string')
		return message.channel.send(JSON.stringify(evaled), { code: 'JSON' }).catch(() => message.channel.send('error better off checking the console'));
	return message.channel.send(evaled, { code: 'JSON' }).catch(() => message.channel.send('error better off checking the console'));
}
