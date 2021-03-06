import pkg from 'mongodb';
const { MongoClient } = pkg;
export const guildPrefixes = { dm: config.prefix };
export const staffRoles = {};
export const logChannels = {};

export async function connect(client) {
	try {
		if (client.mongo) return client.mongo;
		const Dbclient = await MongoClient.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
			throw err.message;
		});
		client.mongo = Dbclient.db(config.mongo.db);
		client.mongo.connected = Dbclient.isConnected();
		client.mongo.close = Dbclient.close;
		console.log('Conected to mongo!');
		return { isConnected: true };
	} catch (err) {
		console.log(err);
		return { isConnected: false, errorMessage: err };
	}
}

export async function reconnect(client) {
	try {
		if (client.mongo?.connected) await client.mongo.close();
		client.mongo = null;
		console.log('Reconnecting to mongo...');
		const mongo = await connect(client);
		if (!mongo?.isConnected) throw mongo?.errorMessage;
		return { isConnected: true };
	} catch (err) {
		return { isConnected: false, errorMessage: err };
	}
}

export async function getConfigs(client) {
	if (client.mongo && client.mongo.connected) {
		for (const guild of client.guilds.cache) {
			const result = await guildConfigs(client).findOne({ guildId: guild[0] });
			staffRoles[guild[0]] = result?.staffRole;
			logChannels[guild[0]] = result?.logchannel;
			guildPrefixes[guild[0]] = result?.prefix || config.prefix;
		}
		console.log('Done getting all guild configs');
	}
}

export function guildConfigs(client) {
	return client.mongo.collection(config.mongo.collections.guildConfigs);
}

export function getLog(client) {
	return client.mongo.collection(config.mongo.collections.logs);
}

export function getMoney(client) {
	return client.mongo.collection(config.mongo.collections.currency);
}

export function getJobs(client) {
	return client.mongo.collection(config.mongo.collections.moneymaker);
}
