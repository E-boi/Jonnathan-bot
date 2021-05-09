const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'helps the user',
	category: 'info',
	execute: (message, args, client) => {
		let command = client.commands.get(args[0]);
		if (!command) command = client.commands.get(client.aliases.get(args[0]));
		if (!args[0]) {
			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.addField(
					`**Commands**`,
					`
**Info:** 
\`${config.prefix}help info\`
**Fun:** 
\`${config.prefix}help fun\`
**NSFW:** 
\`${config.prefix}help NSFW\`
**Prefix:** 
\`\`\`${config.prefix}\`\`\` 
			`,
					false
				)
				.setThumbnail(client.user.avatarURL({ dynamic: true }));
			return message.channel.send(embed);
		} else if (command) {
			const embed = new MessageEmbed().setColor('RANDOM').setTitle(`**${command.name} Information**`)
				.setDescription(`**Name:** ${config.prefix}${command.name}
**Description:** ${command.description}`);
			if (command.aliases) embed.description += `\n**Aliases:** ${command.aliases.map(a => `${config.prefix}${a}`).join(', ')}`;
			return message.channel.send(embed);
		} else if (args[0]) {
			const commands = category => {
				return client.commands
					.filter(cmd => cmd.category === category)
					.map(cmd => `- \`${config.prefix}${cmd.name}\``)
					.join('\n');
			};

			const info = client.categories
				.filter(cmd => cmd === args[0])
				.map(cat => `**${cat[0].toUpperCase() + cat.slice(1)} commands:** \n${commands(cat)}`);

			const embed = new MessageEmbed().setColor('RANDOM');
			if (info.length == 0) return message.channel.send(`Please do a vaild name`);
			return message.channel.send(embed.setDescription(info));
		}
	},
};
