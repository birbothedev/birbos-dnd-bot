import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { commands } from '../commands/commands.js';
import { Events, MessageFlags } from 'discord.js';
import { ALLOWED_ROLE_ID } from "../data/Globals.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.isAutocomplete()) {
            const command = commands.find(
                cmd => cmd.data.name === interaction.commandName
            );
            if (command?.autocomplete) {
                return command.autocomplete(interaction);
            }
        }

                /* -------- BUTTONS -------- */
        if (interaction.isButton()) {
            const handlers = await loadHandlers('buttons');
            const handler = handlers.find(
                h => interaction.customId.startsWith(h.customId)
            );

            if (handler) return handler.execute(interaction);
        }

        /* -------- MODALS -------- */
        if (interaction.isModalSubmit()) {
            const handlers = await loadHandlers('handlers');
            const handler = handlers.find(
                h => interaction.customId.startsWith(h.customId)
            );

            if (handler) return handler.execute(interaction);
        }

        /* -------- SELECT MENU -------- */
        if (interaction.isStringSelectMenu()) {
            const handlers = await loadHandlers('menus');
            const handler = handlers.find(
                h => interaction.customId.startsWith(h.customId)
            );

            if (handler) return handler.execute(interaction);
        }

        /* -------- SLASH COMMANDS -------- */
        if (interaction.isChatInputCommand()) {
            if (!interaction.member.roles.cache.has(ALLOWED_ROLE_ID)) {
                return interaction.reply({
                    content: "❌ You don't have permission to use commands!",
                    flags: MessageFlags.Ephemeral
                });
            }
            const command = commands.find(
                cmd => cmd.data.name === interaction.commandName
            );

            if (!command) return;
            return command.execute(interaction);
        }
    }
};

/* -------- helper -------- */
async function loadHandlers(folder) {
    const folderPath = path.join(__dirname, 'interactions', folder);

    if (!fs.existsSync(folderPath)) {
        console.warn(`⚠️ Handler folder missing: ${folderPath}`);
        return [];
    }

    // Find JS files in this folder and all subfolders
    function getFiles(directory) {
        const entries = fs.readdirSync(directory, {
            withFileTypes: true
        });

        return entries.flatMap(entry => {
            const fullPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                return getFiles(fullPath);
            }

            if (entry.isFile() && entry.name.endsWith('.js')) {
                return [fullPath];
            }

            return [];
        });
    }

    const files = getFiles(folderPath);

    return Promise.all(
        files.map(async file => {
            const mod = await import(pathToFileURL(file).href);

            if (!mod.default?.customId || typeof mod.default.execute !== 'function') {
                return null;
            }

            return mod.default;
        })
    ).then(handlers => handlers.filter(Boolean));
}