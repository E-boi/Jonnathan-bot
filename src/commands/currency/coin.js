import { addCoins } from '../../utils/functions.js';

export const name = 'coinflip';
export const description = 'Flip a coin to earn some coins';
export const category = 'currency';
export const cooldown = 10;

export async function execute(message, args, client) {
	const filter = m => m.author.id === message.author.id;
	const botChoice = ['heads', 'tails'][Math.floor(Math.random() * 2)];
	if (args[0]) {
		if (args[0].toLowerCase() === botChoice) {
			const earns = Math.floor(Math.random() * 10) + 1;
			message.channel.send(`Correct! You get ${earns} coins`);
			return addCoins(client, message.member.id, earns);
		} else return message.channel.send('Wrong!');
	}
	message.channel.send('Heads or tails?');
	message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(async collected => {
		if (collected.first().content.toLowerCase() === botChoice) {
			const earns = Math.floor(Math.random() * 10) + 1;
			message.channel.send(`Correct! You get ${earns} coins`);
			return addCoins(client, message.member.id, earns);
		} else return message.channel.send('Wrong!');
	});
}
