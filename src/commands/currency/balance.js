import { MessageEmbed } from 'discord.js';
import { getMoney } from '../../utils/mongo.js';

export const name = 'balance';
export const description = 'Gets your balance';
export const aliases = ['bal'];
export const category = 'currency';
export const cooldown = 5;

export async function execute(message, args, client) {
	const member = message.mentions.members.first() || message.guild.members.cache.find(x => x.user.id === args[0]);
	if (args[0] && !member) return message.channel.send('Invaild user');
	const user = await getMoney(client).findOne({ userId: member ? member.id : message.member.id });
	if (user) {
		const embed = new MessageEmbed({
			title: `${member ? member.user.username : message.member.user.username} balance`,
			description: `:coin: ${user.coins}`,
		});
		return message.channel.send(embed);
	} else return message.channel.send(`LOL! ${!member && !args[0] ? 'you' : 'they'} have nothing!`);
}
