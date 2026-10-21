
import { MessageFlags } from "discord.js";
import { DM_USER_ID } from "../../../data/Globals.js";
import { parseUserDateAndTime } from "../../../data/HelperFunctions.js";
import { createSessionScheduleComponent } from "../../components/session-schedule/session_schedule_component.js";

export default {
    customId: 'session_schedule_modal', 
    type: 'modal',
    async execute(interaction) {
        const eventId = interaction.customId;
        const userId = interaction.user.id;
        const campaignSelect = interaction.fields.getStringSelectValues('select_campaign_for_scheduling');
        const dateInput = interaction.fields.getTextInputValue('date_input');
        const timeInput = interaction.fields.getTextInputValue('time_input');
        const selectedChannel = interaction.fields.getSelectedChannels('selected_schedule_channel').first();

        const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeInput);
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateInput);

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        if ( isValidTime && isValidDate){

            try {      

                const scheduled_date_message = parseUserDateAndTime(dateInput, timeInput);
                const component = createSessionScheduleComponent(campaignSelect, scheduled_date_message);

                await selectedChannel.send({
                    components: [component],
                    flags: MessageFlags.IsComponentsV2
                });

                await interaction.editReply({
                    content: 'Message sent successfully!',
                    ephemeral: true
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);
            }

        } else {
            interaction.editReply({
                content: '❌ Invalid date or time format! Please use HH:MM (24-hour format) and YYYY-MM-DD (including dashes).', 
                flags: MessageFlags.Ephemeral
            });
        }
    }
};