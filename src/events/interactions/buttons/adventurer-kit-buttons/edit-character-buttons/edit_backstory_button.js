import { MessageFlags } from "discord.js";
import { createEditBackstoryModal } from "../../../../modals/character-edit-modals/EditBackstoryModal.js";


export default {
    customId: 'edit_character_backstory_button:', 
    type: 'button',
    async execute(interaction) {
        const characterId = interaction.customId.split(':')[1];
        const userId = interaction.user.id;

        try {

            await interaction.showModal(createEditBackstoryModal(characterId));

        } catch (err) {
            console.error('Error:', err);

            const message = '❌ Something went wrong. Please wait a moment and try again!';

            await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent(message)
                    ],
                    flags: [MessageFlags.Ephemeral]
                });
        }
    }
};