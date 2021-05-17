export const name = 'game';
export const description = 'play a game lol';
export const category = 'fun';

export async function execute(message) {
	const filter = m => m.author.id === message.author.id;

	const botNumber = Math.floor(Math.random() * 10);

	await message.channel.send('Type a number 1 - 10, you have 20 seconds');
	await message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(async collected => {
		if (collected.first().content > 10) {
			return message.channel.send('that is too high');
		} else if (collected.first().content <= 0) {
			return message.channel.send('that is too low');
		} else if (collected.first().content == botNumber) {
			message.channel.send('Correct :tada:');
		} else if (collected.first().content < botNumber) {
			message.channel.send(`You were off by ${botNumber - collected.first().content} the number was ${botNumber}`);
		} else if (collected.first().content > botNumber) {
			message.channel.send(`You were off by ${collected.first().content - botNumber} the number was ${botNumber}`);
		} else if (isNaN(collected.first().content)) {
			message.channel.send("It seems like you didn't type in a number");
		}
	});
}
