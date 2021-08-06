import { CommandInteraction } from 'discord.js';
import { BaseCommand } from './Command';
import Client from './Client';

export default async function CommandWrapper(command: BaseCommand, interaction: CommandInteraction, client: Client) {
	if (!interaction.isCommand()) return;
	else if (command.config.devOnly && !client.owner.includes(interaction.user.id)) return interaction.reply('Only devs can do this command');
	if (command.config.nsfw && interaction.channel?.type === 'GUILD_TEXT' && !interaction.channel.nsfw) {
		return interaction.reply({ content: 'Try in a NSFW channel.', ephemeral: true });
	}
	const execute = await command.execute({ interaction, args: interaction.options.data, client });
	return await interaction.reply(execute).catch(() => {});
}
