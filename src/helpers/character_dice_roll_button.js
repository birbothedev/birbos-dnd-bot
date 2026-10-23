import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export function createCharacterDiceRollerButton(characterId) {
    const button = new ButtonBuilder()
        .setCustomId(`character_dice_roller:${characterId}`)
        .setLabel('🎲 Dice Roller')
        .setStyle(ButtonStyle.Secondary);

    
    return button;
}