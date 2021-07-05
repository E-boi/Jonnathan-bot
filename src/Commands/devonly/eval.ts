import { Client, Message } from 'discord.js';
import BaseCommand, { MessageReturn } from '../../Structures/BaseCommand';

export default class prefix extends BaseCommand {
	constructor() {
		super({
			name: 'eval',
			description: 'eval shit',
			usage: '{p}eval {shit to eval}',
			category: 'devonly',
			devOnly: true,
		});
		this.run = this.makeRun;
	}
	// @ts-ignore: Unreachable code error
	async makeRun(message: Message, args: string[], client: Client): Promise<MessageReturn> {
		const evalText = args.slice(0).join(' ');
		const evaled = await eval(evalText);
		console.log(evaled);
		if (typeof evaled === 'undefined') return 'this returned undefined';
		if (typeof evaled !== 'string') return `\`\`\`JSON\n${JSON.stringify(evaled)}\`\`\``;
		return `\`\`\`JSON\n${evaled}\`\`\``;
	}
}
