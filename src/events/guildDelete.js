import { guildPrefixes, logChannels, staffRoles } from '../utils/mongo.js';

export default (client, { id }) => {
	delete guildPrefixes[id];
	delete staffRoles[id];
	delete logChannels[id];
};
