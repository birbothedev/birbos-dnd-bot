
import { MessageFlags } from "discord.js";
import { parseUserDateAndTime } from "../../../data/HelperFunctions.js";
import { createSessionScheduleComponent } from "../../components/session-schedule/session_schedule_component.js";
import { ATTENDANCE_CHANNEL_ID } from "../../../data/Globals.js";
import { getCampaignByCampaignID } from "../../../data/db-commands/campaign_db_commands.js";
import { addMessageIdToDB, addSessionScheduleToDB } from "../../../data/db-commands/sessions_db_commands.js";

export default {
    customId: 'session_schedule_modal', 
    type: 'modal',
    async execute(interaction) {
        const userId = interaction.user.id;
        const campaignId = interaction.fields.getStringSelectValues('select_campaign_for_scheduling');
        const dateInput = interaction.fields.getTextInputValue('date_input');
        const timeInput = interaction.fields.getTextInputValue('time_input');
        const selectedChannel = await interaction.client.channels.fetch(ATTENDANCE_CHANNEL_ID);
        const descriptionInput = interaction.fields.getTextInputValue('session_description_input');


        const allowedRole = interaction.fields.getSelectedRoles('selected_role_scheduling');
        const first = allowedRole.first();
        const allowedRoleId = first.id;

        console.log("first id: ", ATTENDANCE_CHANNEL_ID);


        const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeInput);
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateInput);

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        if ( isValidTime && isValidDate){

            try {      

                const unix_date = parseUserDateAndTime(dateInput, timeInput);
                const scheduled_date_message = `<t:${unix_date}:F>`
                const campaign = getCampaignByCampaignID(campaignId)

                await interaction.editReply({
                    content: 'Message sent successfully!',
                    flags: MessageFlags.Ephemeral
                });

                const session = addSessionScheduleToDB(campaignId, userId, unix_date, allowedRoleId, descriptionInput);

                const sessionId = session.lastInsertRowid;
                console.log("Session id added: ", sessionId);

                const component = createSessionScheduleComponent(campaign.name, scheduled_date_message, descriptionInput, campaignId, unix_date, sessionId);

                const message = await selectedChannel.send({
                    components: [component],
                    flags: MessageFlags.IsComponentsV2
                });

                console.log("second id: ", ATTENDANCE_CHANNEL_ID);

                addMessageIdToDB(message.id, ATTENDANCE_CHANNEL_ID, sessionId, unix_date);
                
            } catch (error) {
                console.error("Modal submit error: ", error);
                await interaction.editReply({
                    content: '❌ Something went wrong. Please wait a moment and try again!',
                    flags: MessageFlags.Ephemeral
                });
            }

        } else {
            interaction.editReply({
                content: '❌ Invalid date or time format! Please use HH:MM (24-hour format) and YYYY-MM-DD (including dashes).', 
                flags: MessageFlags.Ephemeral
            });
        }
    }
};