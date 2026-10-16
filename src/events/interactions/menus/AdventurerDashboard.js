import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';


export const adventurerEmbed = new EmbedBuilder()
    .setColor('#750D02')
    .setTitle("⚔️ Adventurer's Toolkit")
    .setDescription(
        `Welcome to the adventurer's toolkit!\n\n` +
        'Choose an option below to manage your adventurer.'
    )
    .addFields(
        {
            name: 'Adventurer Tools',
            value:
                '📖 View your character details\n' +
                '🗺️ Add or Remove a character\n' 
        }
    );

export const adventurerButtons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('dashboard_home')
            .setLabel('⤺ Back')
            .setStyle(ButtonStyle.Secondary),
            
        new ButtonBuilder()
            .setCustomId('characters_view')
            .setLabel('View Characters')
            .setEmoji('📖')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('add_or_remove_character')
            .setLabel('Add or Remove Characters')
            .setEmoji('🗺️')
            .setStyle(ButtonStyle.Primary),
    );