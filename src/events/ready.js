import { Events, EmbedBuilder, ChannelType, MessageFlags } from "discord.js";
import {
    AttachmentBuilder
} from 'discord.js';
import { WELCOME_CHANNEL_ID, ACCENT_COLOR} from "../../src/data/Globals.js";
import { db } from "../database.js";
import { createWelcomePageComponent } from "./components/welcome_page_comp.js";

const banner = new AttachmentBuilder(
    './src/assets/banner.png',
    { name: 'banner.png' }
)

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        console.log("DB FILE:", db.name);
        
        try {
            const channel = await client.channels.fetch(WELCOME_CHANNEL_ID);

            if (channel && channel.type === ChannelType.GuildText) {
                // Delete old startup embeds from this bot
                const messages = await channel.messages.fetch({ limit: 50 });

                const botMessages = messages.filter(
                    m => m.author.id === client.user.id && m.components.length > 0
                );

                for (const [, msg] of botMessages) {
                    await msg.delete().catch(console.error);
                }

                const component = createWelcomePageComponent(banner.name);

                await channel.send({
                    components: [component],
                    files: [banner],
                    flags: MessageFlags.IsComponentsV2
                });

                console.log('Bot startup message sent successfully');
            } else {
                console.error('Channel not found or is not a text channel');
            }
        } catch (error) {
            console.error('Failed to send startup message:', error);
        }
    }
};
