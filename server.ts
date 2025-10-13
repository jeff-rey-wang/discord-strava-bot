import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import { CustomClient, initClient } from './utils';
import { commands } from './commands/commands'; // Import commands from the commands directory

// Loading Environemnt Variables from .env file
dotenv.config();

// Setting up Express server
// This is going to listen for incoming requests from Strava?
// const app = express()
// const PORT = process.env.PORT || 3000;

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
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Client Initialized as ${readyClient.user.tag}`);
});

// Authenicate with Discord
client.login(TOKEN);