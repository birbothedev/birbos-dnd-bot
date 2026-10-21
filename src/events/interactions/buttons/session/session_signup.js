import { MessageFlags } from "discord.js";
import { createSessionRegistrationComponent } from "../../../components/session-schedule/session_registration.js";

export default {
    customId: 'session_signup_button', 
    type: 'button',
    async execute(interaction) {
        const eventId = interaction.customId;
        const userId = interaction.user.id;

        // pull campaign and date from db
        const campaign = ""
        const date =""

        //TODO add checks to make sure user not already signed up
        try {
            const component = createSessionRegistrationComponent(true, campaign, date);

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