import { MessageFlags } from "discord.js";
import { createCharacterModal } from "../../../modals/AddCharacterModal.js";

export default {
    customId: 'add_character', 
    type: 'button',
    async execute(interaction) {

        try {
            await interaction.showModal(createCharacterModal());
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};