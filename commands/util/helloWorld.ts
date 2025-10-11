import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../models/command.model';
import { randomEmoji } from '../../utils.ts';

// Declare minimum command requirements (Name + Description)
const pingCommand: SlashCommandBuilder = new SlashCommandBuilder()
    .setName('Hello World') // Command Name
    .setDescription('Testing Bot Connection'); // Command Description

// Steps to execute when command is called
const executionSteps = async function (interaction: any): Promise<void> {
    // Reply to interaction
    await interaction.reply('Hello World! ' + randomEmoji());
}

// Export command with its data and execution steps
export const PingCommand: Command = {
    data: pingCommand,
    execute: executionSteps
};