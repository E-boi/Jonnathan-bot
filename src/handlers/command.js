import { readdirSync } from 'fs';

export default client => {
	readdirSync('./src/commands/').forEach(dir => {
		const unLoadedCommands = [];
		const commands = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
		const commandsP = new Promise(reslove => {
			commands.forEach(async (f, idx) => {
				const command = await import(`../commands/${dir}/${f}`);

				if (command.name) client.commands.set(command.name, command);
				else unLoadedCommands.push(`❌ ${f} couldn't load from ${dir}`);

				if (command.aliases && Array.isArray(command.aliases))
					command.aliases.forEach(alias => {
						return client.aliases.set(alias, command.name);
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
