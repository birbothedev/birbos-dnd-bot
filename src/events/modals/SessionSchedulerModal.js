import { ModalBuilder, TextInputBuilder, 
    TextInputStyle, LabelBuilder, StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder } from "discord.js";

export function createSessionSchedulerModal(){
    const sessionSchedulerModal = new ModalBuilder()
        .setCustomId(`session_schedule_modal`)
        .setTitle('🗓️ Session Scheduler');
    
    // select campagin from db options
    const selectCampagin = new StringSelectMenuBuilder()
    .setCustomId('select_campaign_for_scheduling')
    .setPlaceholder('Select')
    .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('✧ Campaign 1').setValue('Campaign 1'),
        new StringSelectMenuOptionBuilder().setLabel('✦ Campaign 2').setValue('Campaign 2'),
    );
    const selectCampaginLabel = new LabelBuilder()
    .setLabel('Campaign Selector')
    .setDescription('Please choose the campaign to schedule.')
    .setStringSelectMenuComponent(selectCampagin);

    // date input 
    const dateInput = new TextInputBuilder()
        .setCustomId('date_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('2026-10-16')
        .setMaxLength(10)
        .setMinLength(1)
        .setRequired(true);
    const dateInputLabel = new LabelBuilder()
        .setLabel('Enter the session date in YYYY-MM-DD format.')
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
        .setLabel('Enter the session time in 24-hour format.')
        .setTextInputComponent(timeInput);
    
    // select channel
    // const channelSelect = new ChannelSelectMenuBuilder()
    //     .setCustomId('selected_schedule_channel')
    //     .setPlaceholder('Select a text channel...')
    //     .setMinValues(1)
    //     .setMaxValues(1)
    //     .setChannelTypes([ChannelType.GuildText]); 

    // const channelSelectLabel = new LabelBuilder()
    //     .setLabel('Target Channel')
    //     .setDescription('Choose where the bot should post the session sign-ups.')
    //     .setChannelSelectMenuComponent(channelSelect);

    // time input 
    const descriptionInput = new TextInputBuilder()
        .setCustomId('session_description_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`Ex: "Origins", "Cold Open with Mateo", etc.`)
        .setMaxLength(100)
        .setMinLength(1)
        .setRequired(true);
    const descriptionInputLabel = new LabelBuilder()
        .setLabel(`Optionally give a description of the session.`)
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

    sessionSchedulerModal.addLabelComponents(selectCampaginLabel, dateInputLabel, timeInputLabel, descriptionInputLabel, roleSelectLabel);

    return sessionSchedulerModal;
}