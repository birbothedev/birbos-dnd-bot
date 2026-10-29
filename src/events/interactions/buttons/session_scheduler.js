import { MessageFlags } from "discord.js";
import { createSessionSchedulerModal } from "../../modals/SessionSchedulerModal.js";
import { getCampaignsList } from "../../../data/db-commands/campaign_db_commands.js";

export default {
    customId: 'session_scheduler', 
    type: 'button',
    async execute(interaction) {
        const userId = interaction.user.id;
        try {
            const activeCampaignsList = getCampaignsList(1, userId);
            if (activeCampaignsList.length > 0){
                await interaction.showModal(createSessionSchedulerModal(activeCampaignsList));
            } else {
                await interaction.reply({
                    content: '❌ Please add a campaign before attempting to schedule a session!',
                    flags: MessageFlags.Ephemeral
                });
            }
            
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};