import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export function createDiceRollerModal(){
    const addAdventurerModal = new ModalBuilder()
        .setCustomId(`add_adventurer_modal`)
        .setTitle('⚔️ Add Your Adventurer');
    
    // rsn input field
    const rsnInput = new TextInputBuilder()
        .setCustomId('rsninput')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('RSN of the account you will participate on.')
        .setMaxLength(12)
        .setMinLength(1)
        .setRequired(true);
    const signupLabel = new LabelBuilder()
        .setLabel("Sign Up to Participate")
        .setDescription('Limit 1 account per player.')
        .setTextInputComponent(rsnInput);

    // select region field
    const selectRegionMenu = new StringSelectMenuBuilder()
    .setCustomId('timezoneinput')
    .setPlaceholder('Please select your region')
    .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('NA').setValue('na').setEmoji('❤️'),
        new StringSelectMenuOptionBuilder().setLabel('EU').setValue('eu').setEmoji('💙'),
        new StringSelectMenuOptionBuilder().setLabel('Asia').setValue('asia').setEmoji('💛'),
        new StringSelectMenuOptionBuilder().setLabel('LATAM').setValue('latam').setEmoji('💜'),
        new StringSelectMenuOptionBuilder().setLabel('OCE').setValue('oce').setEmoji('💚')
    );
    const selectRegionMenuLabel = new LabelBuilder()
    .setLabel('Region')
    .setDescription('To help Team Captains choose teammates with similar timezones.')
    .setStringSelectMenuComponent(selectRegionMenu);

    // select team captain field
    const selectCaptainMenu = new StringSelectMenuBuilder()
    .setCustomId('captaininput')
    .setPlaceholder('Please select your response')
    .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('Yes, I would like to be a team captain!').setValue('1').setEmoji('✅'),
        new StringSelectMenuOptionBuilder().setLabel('No, I am not interested in being a team captain.').setValue('0').setEmoji('❌')
    );
    const selectCaptainMenuLabel = new LabelBuilder()
    .setLabel('Would you like to be a Team Captain?')
    .setDescription(`Roles: check Discord often, ensure correct submissions, keep team motivated and aligned.`)
    .setStringSelectMenuComponent(selectCaptainMenu);

    addAdventurerModal.addLabelComponents(signupLabel, selectRegionMenuLabel, selectCaptainMenuLabel);

    return addAdventurerModal;
}