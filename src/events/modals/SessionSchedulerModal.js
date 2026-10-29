import { ModalBuilder, TextInputBuilder, 
    TextInputStyle, LabelBuilder, StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder, RoleSelectMenuBuilder } from "discord.js";

export function createSessionSchedulerModal(activeCampaignsList){
    const sessionSchedulerModal = new ModalBuilder()
        .setCustomId(`session_schedule_modal`)
        .setTitle('🗓️ Session Scheduler');

    const options = []
        for (const campaign of activeCampaignsList){
            const camp = new StringSelectMenuOptionBuilder()
                .setLabel(campaign.name)
                .setValue(String(campaign.id));
            
            options.push(camp);
        }
    
    // select campaign field
    const selectCampaginMenu = new StringSelectMenuBuilder()
    .setCustomId('select_campaign_for_scheduling')
    .setPlaceholder('Select...')
    .addOptions(options);
    const selectCampaginMenuLabel = new LabelBuilder()
    .setLabel('Campaign')
    .setDescription(`Select the Campaign for scheduling.`)
    .setStringSelectMenuComponent(selectCampaginMenu);

    // date input 
    const dateInput = new TextInputBuilder()
        .setCustomId('date_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('2026-10-16')
        .setMaxLength(10)
        .setMinLength(1)
        .setRequired(true);
    const dateInputLabel = new LabelBuilder()
        .setLabel('Session Date')
        .setDescription('Enter the session date in YYYY-MM-DD format.')
        .setTextInputComponent(dateInput);

    // time input 
    const timeInput = new TextInputBuilder()
        .setCustomId('time_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('16:00')
        .setMaxLength(5)
        .setMinLength(1)
        .setRequired(true);
    const timeInputLabel = new LabelBuilder()
        .setLabel('Session Time')
        .setDescription(`Enter the session time in 24-hour format in YOUR timezone.`)
        .setTextInputComponent(timeInput);

    // time input 
    const descriptionInput = new TextInputBuilder()
        .setCustomId('session_description_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`Ex: "Origins", "Cold Open with Mateo", etc.`)
        .setMaxLength(100)
        .setMinLength(1)
        .setRequired(false);
    const descriptionInputLabel = new LabelBuilder()
        .setLabel(`Session Activities`)
        .setDescription(`Optionally give a description of the session.`)
        .setTextInputComponent(descriptionInput);
    
    // select channel
    const roleSelect = new RoleSelectMenuBuilder()
        .setCustomId('selected_role_scheduling')
        .setPlaceholder('Select a role...')
        .setMinValues(1)
        .setMaxValues(1); 

    const roleSelectLabel = new LabelBuilder()
        .setLabel('Who can attend this session?')
        .setDescription('Choose the roles that have permission to sign-up for this session.')
        .setRoleSelectMenuComponent(roleSelect);

    sessionSchedulerModal.addLabelComponents(selectCampaginMenuLabel, dateInputLabel, timeInputLabel, descriptionInputLabel, roleSelectLabel);

    return sessionSchedulerModal;
}