import type { APIApplicationCommandOption } from "discord.js";

export interface SlashCommandBuilderJSON {
    name: string;
    description: string;
    options: APIApplicationCommandOption[];
    default_permission: boolean;
}