const Colors = {
	Reset: '\x1b[0m',

	Red: '\x1b[31m',
	Green: '\x1b[32m',
	Yellow: '\x1b[33m',
	Blue: '\x1b[34m',
	Magenta: '\x1b[35m',
	Cyan: '\x1b[36m',
	White: '\x1b[37m',
};

export default class Logger {
	prefix: string;

	constructor(prefix: string) {
		this.prefix = prefix;
	}

	log(...args: any[]) {
		console.log(`${Colors.Cyan}[${this.prefix}]${Colors.Reset}`, ...args);
	}

	warn(...args: any[]) {
		console.warn(`${Colors.Cyan}[${this.prefix}]${Colors.Reset}${Colors.Red}`, ...args, Colors.Reset);
	}

	debug(...args: any[]) {
		console.debug(`${Colors.Cyan}[${this.prefix}]${Colors.Reset}${Colors.Green}`, ...args, Colors.Reset);
	}
}
