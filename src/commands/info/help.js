import { MessageEmbed } from 'discord.js';
import { guildPrefixes } from '../../utils/mongo.js';
import { isBotOwner, isStaff } from '../../utils/functions.js';

export const name = 'help';
export const description = 'helps the user';
export const category = 'info';

export async function execute(message, args, client) {
	const prefix = guildPrefixes[message.guild?.id || 'dm'];
	let command = client.commands.get(args[0]);
	if (!command) command = client.commands.get(client.aliases.get(args[0]));
	if (!args[0]) {
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setDescription(
				`**Commands**
**Info:** 
\`${prefix}help info\`
**Fun:** 
\`${prefix}help fun\`
**NSFW:** 
\`${prefix}help NSFW\` ${
					isStaff({ command: { userPerms: null, staffCanDo: true }, member: message.member, guildId: message.guild?.id })
						? `
**Moderation:**
\`${prefix}help moderation\`
**Configurations:**
\`${prefix}help configurations\``
						: ''
				} ${
					isBotOwner(message.member)
						? `
				**Owner Only:**
				\`${prefix}help owneronly\``
						: ''
				}
**Prefix:** 
\`\`\`${prefix}\`\`\` 
			`
			)
			.setThumbnail(client.user.avatarURL({ dynamic: true }));
		return message.channel.send(embed);
	} else if (command) {
		if (
			(command.category === 'owneronly' && !isBotOwner(message.member)) ||
			(command.userPerms && !isStaff({ command, member: message.member, guildId: message.guild?.id }))
		)
			return message.channel.send("Hmmm looks like you can't view this command");
		const embed = new MessageEmbed().setColor('RANDOM').setTitle(`**${command.name} Information**`)
			.setDescription(`**Name:** ${config.prefix}${command.name}
**Description:** ${command.description}`);
		if (command.aliases) embed.description += `\n**Aliases:** ${command.aliases.map(a => `${config.prefix}${a}`).join(', ')}`;
		return message.channel.send(embed);
	} else if (args[0]) {
		if (
			(args[0] === 'owneronly' && !isBotOwner(message.member)) ||
			(['admin', 'configurations'].includes(args[0]) &&
				!isStaff({ command: { userPerms: null, canStaffDo: true }, member: message.member, guildId: message.guild.id }))
		)
			return message.channel.send("Hmmm looks like you can't view this category");

		const commands = category => {
			return client.commands
				.filter(cmd => cmd.category === category)
				.map(cmd => `- \`${prefix}${cmd.name}\``)
				.join('\n');
		};

		const info = client.categories
			.filter(cmd => cmd === args[0])
			.map(cat => `**${cat[0].toUpperCase() + cat.slice(1)} commands:** \n${commands(cat)}`);

		const embed = new MessageEmbed().setColor('RANDOM');
		if (info.length == 0) return message.channel.send(`Please do a vaild name`);
		return message.channel.send(embed.setDescription(info));
	}
}
