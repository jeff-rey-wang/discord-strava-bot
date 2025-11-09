import { Client, Collection, GatewayIntentBits, REST, Routes } from "discord.js";
import type { Command } from "./models/command.model.ts";
import type { SlashCommandBuilderJSON } from "./models/slashCommandBuilderJson.model.ts";

// New client instance
// Extend Client to include commands property
export interface CustomClient extends Client {
    commands: Collection<string, Command>;
}

export function initClient(intents: GatewayIntentBits[], commands: Command[]): CustomClient {
    try {
        // Create new client instance with specified intents
        let client = new Client({
            intents: intents,
        }) as CustomClient;

        // Initialize commands collection
        client.commands = new Collection(); 
        for (const command of commands) {
            // Register commands with the client
            // set takes (key, value)
            // key: command.data.name - command name
            // value: command, the exported command object
            try {
                if (!command.data || !command.execute) {
                    console.log(`InitClient - Invalid command structure for command: ${command}`);
                    continue; // Skip invalid command
                }
                console.log(`InitClient - Found command: ${command.data.name}`);
                client.commands.set(command.data.name, command);
                console.log(`InitClient - Registered command: ${command.data.name}`);
            } catch {
                console.log(`Error registering command ${command.data.name ? command.data.name : 'Unknown Command' }`);
            }
        }
        deployCommands(commands);

        return client;
    } catch (err) {
        throw new Error('Error - initClient: ' + err);
    }
}

// This function deploys commands to Discord via REST API
function deployCommands(commands: Command[]): void {
    const commandJSONList: SlashCommandBuilderJSON[] = [];
    // Compile command data for deployment
    try {
        console.log('DeployCommand - Compiling command data for Deployment')
        for (const command of commands) {
            console.log(`DeployCommand - Preparing command for deployment: '${command.data.name}'`);
            commandJSONList.push(command.data.toJSON() as SlashCommandBuilderJSON);
        }
    } catch (err) {
        console.log('DeployCommand - Error compiling command data:', err);
    }

    // Deploy Commands
    const rest = new REST().setToken(process.env.DISCORD_TOKEN!);
    (async () => {
        try {
            console.log(`DeployCommand - Attempting to refresh ${commandJSONList.length} Slash-commands.`);
            const data = await rest.put(
                Routes.applicationCommands(process.env.APP_ID!),
                { body: commandJSONList }
            );
            console.log(`DeployCommand - Successfully deployed ${commandJSONList.length} Slash-commands.`);
        } catch (err) {
            console.error('DeployCommand - Error deploying commands:', err);
        }
    })();
}

export function randomEmoji(): string {
    const emojis = ['😀', '😂', '😎', '😍', '🤔', '🙃', '😴', '🤖', '👾', '🎉'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}
// Add more utility functions here as needed