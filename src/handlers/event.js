const { readdirSync } = require('fs');

module.exports = client => {
	const loadedEvent = [];
	readdirSync('./src/events/').forEach(f => {
		if (!f.endsWith('.js')) return;
		const evt = require(`../events/${f}`);
		const evtName = f.split('.')[0];
		loadedEvent.push(evtName);
		client.on(evtName, evt.bind(null, client));
	});
	console.log(`Loaded events: ${loadedEvent.join(', ')}`);
};
