import { Client, Collection, CommandInteraction, Events, GatewayIntentBits, type Interaction } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import { type CustomClient, initClient } from './utils.ts';
import { commands } from './commands/commands.ts'; // Import commands from the commands directory
import type { Command } from './models/command.model.ts';

// Loading Environemnt Variables from .env file
dotenv.config();

// Setting up Express server
// This is going to listen for incoming requests from Strava?
const app = express()
const PORT = process.env.PORT || 3000;

// Saving Token from env variables
const TOKEN = process.env.DISCORD_TOKEN;
if (!TOKEN) {
    throw new Error('DISCORD_TOKEN not found in .env');
}

// Initialize Discord Client
let client: CustomClient;
// Discord Intents define the events/accesses the bot will receive
let intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]

try {
    client = initClient(intents, commands);
} catch (err) {
    console.log('Error initializing Discord client:', err);
    process.exit(1);
}

// Log Client start
client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Client Initialized as ${readyClient.user.tag}`);
});

// Handling Slash Command interactions only
client.on(Events.InteractionCreate, async (interaction: Interaction)  => {
    // Only handle slash commands
    if (!interaction.isChatInputCommand()) return;
    
    // Retrieve command from client's commands collection
    const command: Command | undefined = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    // Execute command
    try {
        // Logs the interaction
        await command.execute(interaction);
        console.log(`Executed command: ${interaction.commandId} by user: ${interaction.user.tag}`);
    } catch (err) {
        console.log('Error handling interaction:', err);
        await interaction.reply({ 
            content: 'There was an error while executing this command!',
            ephemeral: true 
        });
    }
})

// Authenicate with Discord
client.login(TOKEN);