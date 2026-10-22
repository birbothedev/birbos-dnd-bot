import { MessageFlags } from "discord.js";
import { createCampaignModal } from "../../../modals/AddCampaignModal.js";

export default {
    customId: 'add_campaign_button', 
    type: 'button',
    async execute(interaction) {

        try {
            await interaction.showModal(createCampaignModal());
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};