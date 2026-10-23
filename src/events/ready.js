import { Events, EmbedBuilder, ChannelType } from "discord.js";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    AttachmentBuilder
} from 'discord.js';
import { WELCOME_CHANNEL_ID, ACCENT_COLOR} from "../../src/data/Globals.js";
import { db } from "../database.js";

const banner = new AttachmentBuilder(
    './src/assets/banner.png',
    { name: 'banner.png' }
)
const icon = new AttachmentBuilder(
    './src/assets/d20.png',
    { name: 'icon.png' }
)

const welcomeEmbed = new EmbedBuilder()
    .setColor(ACCENT_COLOR)
    .setAuthor({
        name: "BIRBO'S DND BOT",
        iconURL: 'attachment://icon.png'
    })
    .setTitle(`⚜ THE DUNGEON AND DRAGONS PLANNER ⚜`)
    .setDescription(
        '\n' +
        '༺════════════════════༻\n'
    )
    .setImage('attachment://banner.png')
    .addFields(
        {
            name: `⚔️ Adventurer's Tools`,
            value: 'Dice rolls, character sheets, and party utilities.',
            inline: false
        },
        {
            name: '📜 Campaign Manager',
            value: `Manage or Schedule your active campaigns`,
            inline: false
        },
        {
            name: '༺════════════════════༻',
            value: '',
            inline: false
        }
    )
    .setFooter({
        text: 'Every legend begins with a single roll.'
    })
    .setTimestamp()

const dashboardButtons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('campaign_dashboard')
            .setLabel('Campaign Manager')
            .setEmoji('📜')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('adventurers_tools')
            .setLabel(`Adventurer's Toolkit`)
            .setEmoji('⚔️')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('dice_roller')
            .setLabel('Dice Roller')
            .setEmoji('🎲')
            .setStyle(ButtonStyle.Secondary)
    );

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
                    m => m.author.id === client.user.id && m.embeds.length > 0
                );

                for (const [, msg] of botMessages) {
                    await msg.delete().catch(console.error);
                }

                // Send the updated startup embed
                await channel.send({
                    embeds: [welcomeEmbed],
                    files: [banner, icon],
                    components: [dashboardButtons],
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
