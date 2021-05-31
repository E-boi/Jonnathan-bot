import { MessageEmbed } from 'discord.js';
import { getJobs } from '../../utils/mongo.js';

export const name = 'jobs';
export const description = 'List of jobs';
export const category = 'currency';

export async function execute(message, args, client) {
	if (args[0]) {
		const job = await getJobs(client).findOne({ name: args[0] });

		if (job) {
			const embed = new MessageEmbed({ title: job.name, description: `Earns: ${job.earns}\nCan work every: ${job.when} minutes` });
			return message.channel.send(embed);
		} else return message.channel.send('No job under that name');
	}

	const embed = new MessageEmbed({ title: 'Jobs' });

	const jobs = await getJobs(client).find();
	const count = await jobs.count();
	let idx = 0;

	const loop = new Promise(resolve =>
		jobs.forEach(job => {
			embed.addField(job.name, `Earns: ${job.earns}\nCan work every: ${job.when} minutes`);
			idx++;
			if (idx >= count) resolve();
		})
	);
	loop.then(() => message.channel.send(embed));
}
