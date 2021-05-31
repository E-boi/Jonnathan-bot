import duration from 'dayjs/plugin/duration.js';
import dayjs from 'dayjs';
import { getMoney } from '../../utils/mongo.js';
import { MessageEmbed } from 'discord.js';
dayjs.extend(duration);

export const name = 'daily';
export const description = 'Earn coins daily';
export const category = 'currency';

export async function execute(message, _, client) {
	const user = await getMoney(client).findOne({ userId: message.member.id });

	if (user) {
		if (user.daily) {
			if (Date.now() <= new Date(user.daily.doNext)) {
				const hour = dayjs(new Date(user.daily.doNext)).diff(Date.now(), 'h');
				const minute = dayjs.duration(dayjs(new Date(user.daily.doNext)).diff(Date.now(), 'm'), 'm').minutes();
				return message.channel.send(`Do in ${hour > 1 ? `${hour} hours` : `${hour} hour`} ${minute > 1 ? `${minute} minutes` : `${minute} minute`}.`);
			} else if (Date.now() >= dayjs(user.daily.doNext).add(1, 'd')) {
				const earns = 100;
				const embed = new MessageEmbed({
					description: `WOW cool beans! You get ${earns} coins`,
					footer: { iconURL: message.member.user.avatarURL({ dynamic: true }), text: `+${earns} coins | streak: 1` },
				});
				message.channel.send(embed);
				return await getMoney(client).updateOne(
					{ userId: message.member.id },
					{ $set: { coins: user.coins + earns, daily: { doNext: dayjs(Date.now()).add(1, 'd').toDate(), streak: 1, earned: earns } } }
				);
			} else {
				const earns = user.daily.streak === 1 ? 200 : user.daily.earned + Math.floor(Math.random() * (60 - 40)) + 40;
				const embed = new MessageEmbed({
					description: `WOW cool beans! You get ${earns} coins`,
					footer: { iconURL: message.member.user.avatarURL({ dynamic: true }), text: `+${earns} coins | streak: ${++user.daily.streak}` },
				});
				message.channel.send(embed);
				return await getMoney(client).updateOne(
					{ userId: message.member.id },
					{
						$set: {
							coins: user.coins + earns,
							daily: { doNext: dayjs(Date.now()).add(1, 'd').toDate(), streak: user.daily.streak, earned: earns },
						},
					}
				);
			}
		} else {
			const earns = 100;
			const embed = new MessageEmbed({
				description: `WOW cool beans! You get ${earns} coins`,
				footer: { iconURL: message.member.user.avatarURL({ dynamic: true }), text: `+${earns} coins | streak: 1` },
			});
			message.channel.send(embed);
			return await getMoney(client).updateOne(
				{ userId: message.member.id },
				{ $set: { coins: user.coins + earns, daily: { doNext: dayjs(Date.now()).add(1, 'd').toDate(), streak: 1, earned: earns } } }
			);
		}
	} else {
		const earns = 100;
		const embed = new MessageEmbed({
			description: `WOW cool beans! You get ${earns} coins`,
			footer: { iconURL: message.member.user.avatarURL({ dynamic: true }), text: `+${earns} coins | streak: 1` },
		});
		message.channel.send(embed);
		return await getMoney(client).insertOne({
			userId: message.member.id,
			coins: earns,
			daily: { doNext: dayjs(Date.now()).add(1, 'd').toDate(), streak: 1, earned: earns },
		});
	}
}
