const { readdirSync } = require('fs');

module.exports = client => {
	const unloadedCommands = [];
	readdirSync('./src/commands/').forEach(dir => {
		const commands = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
		commands.forEach(f => {
			const command = require(`../commands/${dir}/${f}`);

			if (command.name) client.commands.set(command.name, command);
			else unloadedCommands.push(`❌ ${f} couldn't load please check the work`);

			if (command.aliases && Array.isArray(command.aliases))
				command.aliases.forEach(alias => {
					return client.aliases.set(alias, command.name);
				});
		});
	});
	if (unloadedCommands.length > 0)
		return unloadedCommands.forEach(f => {
			console.log(f);
		});
	else console.log('✅ All commands loaded');
};
