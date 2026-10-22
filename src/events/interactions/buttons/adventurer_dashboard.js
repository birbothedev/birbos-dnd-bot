import { MessageFlags } from "discord.js";
import { createAdventurerDashboardComponent } from "../../components/adventurer-kit/adventurer_home.js";

export default {
    customId: 'adventurers_tools', 
    type: 'button',
    async execute(interaction) {

        try {
            // reply with a new ephemeral menu here, then use interaction.update to change that ephemeral message client sided
            const component = createAdventurerDashboardComponent();

            await interaction.reply({
                components: [component],
                flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
            });

        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};