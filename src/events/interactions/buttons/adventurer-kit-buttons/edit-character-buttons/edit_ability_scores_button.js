import { MessageFlags } from "discord.js";
import { createAbilityScoresModal } from "../../../../modals/character-edit-modals/ability_scores_edit.js";


export default {
    customId: 'character_skills_edit', 
    type: 'button',
    async execute(interaction) {
        const userId = interaction.user.id;

        try {

            await interaction.showModal(createAbilityScoresModal());
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};