const prefix = config.prefix;

module.exports = async (client, message) => {
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	// if there is no command
	if (!command) return;
	await command.execute(message, args, client);
};
