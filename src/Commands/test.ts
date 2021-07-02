import BaseCommand, { MessageReturn } from '../Structures/BaseCommand';

export default class Test extends BaseCommand {
	constructor() {
		super({ name: 'test', description: 'test command', usage: '{p}test' });
		this.run = this.makeRun;
	}

	makeRun(): MessageReturn {
		return 'This is a test command';
	}
}
