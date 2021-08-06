import Client from '../Structures/Client';

export default function ready(client: Client) {
	client.logger.log(`Logged in as ${client.user?.username}`);
	setTimeout(() => client.guilds.cache.get('783870918346145812')?.commands.set(client.commands.map(base => base.slashCommand)), 1000);
}
