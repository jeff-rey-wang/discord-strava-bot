import { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js";

export interface Command {
    // Command data (name, description, options, etc.)
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    // Function to execute when command is called
    execute: (interaction: any) => Promise<void>;
}