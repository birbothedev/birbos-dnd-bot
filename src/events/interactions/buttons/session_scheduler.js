import { MessageFlags } from "discord.js";
import { createSessionSchedulerModal } from "../../modals/SessionSchedulerModal.js";

export default {
    customId: 'session_scheduler', 
    type: 'button',
    async execute(interaction) {
        const eventId = interaction.customId;
        const userId = interaction.user.id;

        try {
            await interaction.showModal(createSessionSchedulerModal());
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};