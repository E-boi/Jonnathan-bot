import { BaseCommand, CommandReturn } from '../Structures/Command';

export default class Test extends BaseCommand {
	constructor() {
		super({ name: 'testc', description: 'testing command' }, { category: 'test', usage: '/test' });
	}

	execute(): CommandReturn {
		return 'hey';
	}
}
