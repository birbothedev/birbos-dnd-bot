import { MessageFlags } from "discord.js";
import { createDeleteCharacterModal } from "../../modals/DeleteCharacterModal.js";

export default {
    customId: 'character_delete:', 
    type: 'button',
    async execute(interaction) {
        const characterId = interaction.customId.split(':')[1];

        //TODO add character id to button id to verify what character is being deleted
        try {
            await interaction.showModal(createDeleteCharacterModal(characterId));
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};