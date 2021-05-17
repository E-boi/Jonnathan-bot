import { MessageEmbed } from 'discord.js';

export const name = 'looks';
export const description = 'the bot rates your looks lol';
export const category = 'fun';

export function execute(message) {
	const random = Math.floor(Math.random() * 100);

	if (random < 20) {
		const embed = new MessageEmbed().setTitle('Your looks').setDescription(`${random}/100 :face_vomiting:`);
		return message.channel.send(embed);
	} else if (random < 40) {
		const embed = new MessageEmbed().setTitle('Your looks').setDescription(`${random}/100 :confused:`);
		return message.channel.send(embed);
	} else if (random < 60) {
		const embed = new MessageEmbed().setTitle('Your looks').setDescription(`${random}/100 :neutral_face:`);
		return message.channel.send(embed);
	} else if (random < 80) {
		const embed = new MessageEmbed().setTitle('Your looks').setDescription(`${random}/100 :kissing:`);
		return message.channel.send(embed);
	} else if (random < 90) {
		const embed = new MessageEmbed().setTitle('Your looks').setDescription(`${random}/100 :kissing_heart:`);
		return message.channel.send(embed);
	} else if (random < 100) {
		const embed = new MessageEmbed().setTitle('Your looks').setDescription(`${random}/100 :heart_eyes: :hot_face:`);
		return message.channel.send(embed);
	}
}
