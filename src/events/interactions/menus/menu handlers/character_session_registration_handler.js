import { TextDisplayBuilder } from "discord.js";
import { getCharacterByCharacterID, getCharactersByUserID } from "../../../../data/db-commands/character_db_commands.js";
import { addSessionSignUpToDB, getSessionBySessionId, removeSessionSignUpFromDB } from "../../../../data/db-commands/sessions_db_commands.js";
import { getCampaignByCampaignID } from "../../../../data/db-commands/campaign_db_commands.js";
import { getAllSignUpsForSession } from "../../../../data/db-commands/sessions_db_commands.js";
import { createSessionScheduleComponent } from "../../../components/session-schedule/session_schedule_component.js";

export default {
    customId: 'session_reg_character_dropdown:', 
    async execute(interaction) {
        const isCanceling = interaction.customId.split(':')[1] === 'true';
        const sessionId = interaction.customId.split(':')[2];
        const date = interaction.customId.split(':')[3];
        const campaignId = interaction.customId.split(':')[4];
        const userId = interaction.user.id;
        const selectedCharacter = interaction.values[0];

        const date_formatted = `<t:${date}:F>`

            try {      

                // look up characters in db here
                const characters = getCharactersByUserID(userId);
                const campaign = getCampaignByCampaignID(campaignId);
                const session = getSessionBySessionId(sessionId);

                const character = characters.find(
                    char => char.id === Number(selectedCharacter)
                );

                if (!character) {
                    return await interaction.update({
                        components: [
                            new TextDisplayBuilder()
                                .setContent('❌ Character not found in database.')
                        ]
                    });
                }

                let confirmationMessage = ""

                if (isCanceling){
                    const removed = removeSessionSignUpFromDB(sessionId, character.id, date, userId);

                    confirmationMessage = removed >= 1
                    ? `You have canceled **${character.character_name}'s** attendance!`
                    : `❌ There was an issue attempting to remove the signup.`;
                } else {
                    const added = addSessionSignUpToDB(sessionId, character.id, date, userId);

                    confirmationMessage = added >= 1
                    ? `You have signed up with **${character.character_name}**!`
                    : `❌ There was an issue attempting to add the signup.`;
                }

                const signupCount = getAllSignUpsForSession(sessionId);

                let signUpText =`### 👀 Current Attendees\n\n`;

                if (signupCount.length >= 1){
                    for (const count of signupCount){
                        const character = getCharacterByCharacterID(count.attending_character_id, count.character_user_id_text);

                        signUpText += `**${character.character_name}**: Level ${character.character_level} ${character.character_race} ${character.character_class}\n`
                    }
                } else {
                    signUpText += "No characters currently registered to attend the session."
                }

                const updateContainer = createSessionScheduleComponent(campaign.name, date_formatted, session.description, campaignId, date, sessionId, signUpText);

                const channel = await interaction.client.channels.fetch(session.scheduler_message_channel_id_text);
                const message = await channel.messages.fetch(session.scheduler_message_id_text);
    
                await message.edit({
                    components: [updateContainer]
                });

                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent(confirmationMessage)
                    ]
                });
                
            } catch (error) {
                console.error("Dropdown select submit error: ", error);
                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent('❌ Something went wrong. Please wait a moment and try again!')
                    ]
                });
            }
    }
};