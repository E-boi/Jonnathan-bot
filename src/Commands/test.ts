import BaseCommand, { MessageReturn } from '../Structures/BaseCommand';

export default class Test extends BaseCommand {
	constructor() {
		super({ name: 'testc', description: 'test command', usage: '{p}test', category: 'test' });
		this.run = this.makeRun;
	}

	makeRun(): MessageReturn {
		return 'This is a test command';
	}
}
