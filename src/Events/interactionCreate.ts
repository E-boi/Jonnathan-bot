import { CommandInteraction } from 'discord.js';
import Client from '../Structures/Client';
import CommandWrapper from '../Structures/CommandWrapper';

export default function interactionCreate(client: Client, interaction: CommandInteraction) {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	CommandWrapper(command, interaction, client);
}
