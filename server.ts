import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';

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

// New client instance
// Extend Client to include commands property
interface CustomClient extends Client {
    commands: Collection<any, any>;
}

let client: CustomClient;

try {
    // Intents define the events/accesses the bot will receive
    client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
    }) as CustomClient;
    client.commands = new Collection(); // Initialize commands collection
    // Create a new utility class to handle the messy importing logic???
} catch (err) {
    console.log('Error initializing Discord client:', err);
    process.exit(1);
}

// Log Client start
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Client Initialized as ${readyClient.user.tag}`);
});



// Message Listener
client.on('messageCreate', (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;
    // If the message content is "!ping", reply with "Pong!"
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

// Authenicate with Discord
client.login(TOKEN);