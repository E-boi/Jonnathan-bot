import { guildPrefixes } from '../utils/mongo.js';

export default async (client, guild) => {
	guildPrefixes[guild.id] = '>';
};
