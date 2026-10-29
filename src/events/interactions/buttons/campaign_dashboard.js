import { MessageFlags } from "discord.js";
import { createDMDashboardComponent } from "../../components/dm-kit/dm_home.js";

export default {
    customId: 'campaign_dashboard', 
    type: 'button',
    async execute(interaction) {
        const userId = interaction.user.id;

        try {
            // reply with a new ephemeral menu here, then use interaction.update to change that ephemeral message client sided
            const component = createDMDashboardComponent(userId);

            await interaction.reply({
                components: [component],
                flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
            });

        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
};