import { MessageFlags } from "discord.js";
import { createCharacterDiceRollerModal } from "../../../modals/CharacterDiceRoller.js";
import { getCharacterByCharacterID } from "../../../../data/db-commands/character_db_commands.js";


export default {
    customId: 'character_dice_roller', 
    type: 'button',
    async execute(interaction) {
        const characterId = interaction.customId.split(':')[1];
        const userId = interaction.user.id;
        const character = getCharacterByCharacterID(characterId, userId);

        try {
            await interaction.showModal(createCharacterDiceRollerModal(character.character_name, characterId));
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};