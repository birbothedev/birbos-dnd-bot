import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';
import { ACCENT_COLOR } from '../../../data/Globals.js'

export const campaignsEmbed = new EmbedBuilder()
    .setColor(ACCENT_COLOR)
    .setTitle('🗓️ Session Registration')
    .setDescription(
        'Welcome to campaign management!\n\n' +
        'Choose an option below to manage your campaign.'
    )
    .addFields(
        {
            name: 'Campaign Tools',
            value:
                '📖 View campaign details\n' +
                '🗺️ Manage locations and lore\n' +
                '👥 Manage characters and NPCs\n'+
                '👥 Manage players and PCs\n'+
                ':calendar: Schedule a Session'
        }
    );

export const campaignsButtons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('campaigns_view')
            .setLabel('View Campaigns')
            .setEmoji('📖')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('session_scheduler')
            .setLabel('Session Manager')
            .setEmoji('📅')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('campaigns_characters')
            .setLabel('Characters')
            .setEmoji('👥')
            .setStyle(ButtonStyle.Secondary),
    );