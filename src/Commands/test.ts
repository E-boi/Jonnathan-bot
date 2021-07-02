import { MessageEmbedOptions } from 'discord.js';
import BaseCommand from '../Structures/BaseCommand';

export default class Test extends BaseCommand {
	constructor() {
		super({ name: 'test', description: 'test command', usage: '{p}test' });
		this.run = this.makeRun;
	}

	makeRun(): string | { embed: MessageEmbedOptions } {
		return 'This is a test command';
	}
}
