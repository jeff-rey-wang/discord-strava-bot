import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Command } from "./models/command.model";

// New client instance
// Extend Client to include commands property
export interface CustomClient extends Client {
    commands: Collection<any, any>;
}

export function initClient(intents: GatewayIntentBits[], commands: Command[]): CustomClient {
    try {
        let client = new Client({
            intents: intents,
        }) as CustomClient;
        client.commands = new Collection(); // Initialize commands collection
        for (const command of commands) {
            // Register commands with the client
            // set takes (key, value)
            // key: command.data.name - command name
            // value: command, the exported command object
            try {
                if (!command.data || !command.execute) {
                    console.log(`Invalid command structure for command: ${command}`);
                    continue; // Skip invalid command
                }
                client.commands.set(command.data.name, command);
            } catch {
                console.log(`Error registering command ${command.data.name ? command.data.name : 'Unknown Command' }`);
            }
        }
        return client;
    } catch (err) {
        throw new Error('Error - initClient: ' + err);
    }
}

export function randomEmoji(): string {
    const emojis = ['😀', '😂', '😎', '😍', '🤔', '🙃', '😴', '🤖', '👾', '🎉'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}
// Add more utility functions here as needed