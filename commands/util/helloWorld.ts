import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../models/command.model';
import { randomEmoji } from '../../utils.ts';

// Declare minimum command requirements (Name + Description)
const helloWorld: SlashCommandBuilder = new SlashCommandBuilder()
    .setName('hello') // Command Name
    .setDescription(`Hello World`); // Command Description

// Steps to execute when command is called
const executionSteps = async function (interaction: any): Promise<void> {
    // Reply to interaction
    await interaction.reply(`Hello World!  ${randomEmoji()}`);
}

// Export command with its data and execution steps
export const HELLO_WORLD_COMMAND: Command = {
    data: helloWorld,
    execute: executionSteps
};