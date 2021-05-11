import { readdirSync } from 'fs';

export default client => {
	readdirSync('./src/commands/').forEach(dir => {
		const unLoadedCommands = [];
		const commands = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
		const commandsP = new Promise(reslove => {
			commands.forEach(async (f, idx) => {
				const command = await import(`../commands/${dir}/${f}`);

				if (command.default.name) client.commands.set(command.default.name, command.default);
				else unLoadedCommands.push(`❌ ${f} couldn't load from ${dir}`);

				if (command.default.aliases && Array.isArray(command.default.aliases))
					command.default.aliases.forEach(alias => {
						return client.aliases.set(alias, command.default.name);
					});
				//console.log(idx);
				if (idx >= commands.length - 1) reslove();
			});
		});
		commandsP.then(() => {
			if (unLoadedCommands.length > 0) return unLoadedCommands.forEach(command => console.log(command));
			else console.log(`✅ Loading all command from ${dir}`);
		});
	});
};
