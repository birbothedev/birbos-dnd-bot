import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export function createDeleteButton(characterId) {
    const button = new ButtonBuilder()
        .setCustomId(`character_delete:${characterId}`)
        .setLabel('❌ Delete Character')
        .setStyle(ButtonStyle.Danger);

    
    return button;
}