import chalk from 'chalk';

export default class Logger {
	private prefix: string;

	constructor(prefix: string) {
		this.prefix = prefix;
	}

	log(...args: any[]) {
		console.log(`${chalk.cyan(`[${this.prefix}]`)}`, ...args);
	}

	warn(...args: any[]) {
		console.warn(`${chalk.cyan(`[${this.prefix}]`)} ${chalk.red(...args)}`);
	}

	debug(...args: any[]) {
		console.debug(`${chalk.cyan}[${this.prefix}] ${chalk.green(...args)}`);
	}
}
