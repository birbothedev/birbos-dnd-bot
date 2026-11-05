import { ButtonBuilder, ButtonStyle } from 'discord.js';

export function createSubmitButton(pageId) {
    const button = new ButtonBuilder()
        .setCustomId(`submit_button:${pageId}`)
        .setLabel('✅ Submit')
        .setStyle(ButtonStyle.Primary);

    
    return button;
}