import { MessageFlags, TextDisplayBuilder } from "discord.js";
import { createSessionRegistrationComponent } from "../../../components/session-schedule/session_registration.js";
import { getActiveCharactersByUserID } from "../../../../data/db-commands/character_db_commands.js";
import { getCampaignByCampaignID } from "../../../../data/db-commands/campaign_db_commands.js";
import { getCurrentSignUpByUserID } from "../../../../data/db-commands/sessions_db_commands.js";

export default {
    customId: 'session_signup_button:', 
    type: 'button',
    async execute(interaction) {
        const userId = interaction.user.id;
        const campaignId = interaction.customId.split(`:`)[1];
        const date = interaction.customId.split(`:`)[2];

        const date_formatted = `<t:${date}:F>`

        //TODO add checks to make sure user not already signed up
        try {
            const charactersList = getActiveCharactersByUserID(userId, 1);
            const campaign = getCampaignByCampaignID(campaignId);
            const component = createSessionRegistrationComponent(false, campaign.name, date_formatted, charactersList, campaign.id, date);
            const findCurrentSignup = getCurrentSignUpByUserID(userId, campaignId, date);

            if (findCurrentSignup > 0){
                await interaction.reply({
                    components: [
                        new TextDisplayBuilder()
                            .setContent('❌ You are already signed up for this session!')
                    ],
                    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
                });
            }

            if (charactersList >= 1){
                await interaction.reply({
                    components: [component],
                    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
                });
            } else {
                await interaction.reply({
                    components: [
                        new TextDisplayBuilder()
                            .setContent('❌ Please add a character before attempting to sign up for this session!')
                    ],
                    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
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