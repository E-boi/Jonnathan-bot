export const guildPrefixes = {};

export async function getPrefixes(client) {
	if (client.mongo && client.mongo.connected) {
		for (const guild of client.guilds.cache) {
			const result = await client.mongo.collection(config.mongo.collections.guildConfigs).findOne({ guildId: guild[0] });
			guildPrefixes[guild[0]] = result?.prefix || config.prefix;
		}
		console.log('Done getting prefixes');
	}
}
