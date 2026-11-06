import { MessageFlags, TextDisplayBuilder } from "discord.js";
import { createSessionRegistrationComponent } from "../../../components/session-schedule/session_registration.js";
import { getActiveCharactersByUserID } from "../../../../data/db-commands/character_db_commands.js";
import { getCampaignByCampaignID } from "../../../../data/db-commands/campaign_db_commands.js";
import { getCurrentSignUpByUserID } from "../../../../data/db-commands/sessions_db_commands.js";

export default {
    customId: 'session_cancel_button:', 
    type: 'button',
    async execute(interaction) {
        const userId = interaction.user.id;
        const campaignId = interaction.customId.split(`:`)[1];
        const date = interaction.customId.split(`:`)[2];
        const sessionId = interaction.customId.split(':')[3];

        const date_formatted = `<t:${date}:F>`

        await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

        try {
            const charactersList = getActiveCharactersByUserID(userId, 1);
            const campaign = getCampaignByCampaignID(campaignId);
            
            const findCurrentSignup = getCurrentSignUpByUserID(userId, sessionId, date);

            if (findCurrentSignup.length <= 0){
                return await interaction.editReply({
                    components: [
                        new TextDisplayBuilder()
                            .setContent('❌ You are not signed up for this session.')
                    ],
                    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
                });
            } 

            if (charactersList.length < 1){
                return await interaction.editReply({
                    components: [
                        new TextDisplayBuilder()
                            .setContent('❌ Please add a character before attempting to cancel your attendance for this session!')
                    ],
                    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
                });
            } 

            const component = createSessionRegistrationComponent(true, campaign.name, date_formatted, charactersList, date, sessionId, campaignId);

            await interaction.editReply({
                components: [component],
                flags: [MessageFlags.IsComponentsV2]
            });

        } catch (err) {
            console.error('Error:', err);
            await interaction.editReply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};