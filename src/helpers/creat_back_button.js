import { ButtonBuilder, ButtonStyle } from 'discord.js';

export function createBackButton(pageId) {
    const button = new ButtonBuilder()
        .setCustomId(`back_button:${pageId}`)
        .setLabel('↶ Back')
        .setStyle(ButtonStyle.Secondary);

    
    return button;
}