import { readdirSync } from 'fs';

export default async client => {
	const loadedEvent = [];
	readdirSync('./src/events/').forEach(async f => {
		if (!f.endsWith('.js')) return;
		const evt = await import(`../events/${f}`);
		const evtName = f.split('.')[0];
		client.on(evtName, evt.default.bind(null, client));
		console.log(`loaded ${evtName}`);
	});
};
