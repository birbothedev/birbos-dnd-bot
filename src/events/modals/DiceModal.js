import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export function createDiceRollerModal(){
    const diceRollerModal = new ModalBuilder()
        .setCustomId(`dice_roller_modal`)
        .setTitle('🎲 Dice Roller');
    
    // character name
    const characterName = new TextInputBuilder()
        .setCustomId('character_name')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Enter the Character you would like to roll for.')
        .setMaxLength(30)
        .setMinLength(1)
        .setRequired(true);
    const characterNameLabel = new LabelBuilder()
        .setLabel("Character Name")
        .setTextInputComponent(characterName);

    // select dice field
    const selectDiceMenu = new StringSelectMenuBuilder()
    .setCustomId('select_dice_input')
    .setPlaceholder('Select')
    .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('✧ D2').setValue('2'),
        new StringSelectMenuOptionBuilder().setLabel('✦ D4').setValue('4'),
        new StringSelectMenuOptionBuilder().setLabel('✯ D6').setValue('6'),
        new StringSelectMenuOptionBuilder().setLabel('✶ D8').setValue('8'),
        new StringSelectMenuOptionBuilder().setLabel('✵ D10').setValue('10'),
        new StringSelectMenuOptionBuilder().setLabel('✷ D12').setValue('12'),
        new StringSelectMenuOptionBuilder().setLabel('🌟 D20').setValue('20'),
        new StringSelectMenuOptionBuilder().setLabel('✨ Percentile').setValue('100')
    );
    const selectDiceMenuLabel = new LabelBuilder()
    .setLabel('Dice Selector')
    .setDescription('Please choose the die to roll.')
    .setStringSelectMenuComponent(selectDiceMenu);

    // dice quantity input 
    const selectDiceQuantityMenu = new TextInputBuilder()
        .setCustomId('dice_quantity_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Enter the quantity of dice to roll.')
        .setMaxLength(3)
        .setMinLength(1)
        .setRequired(true);
    const selectDiceQuantityMenuLabel = new LabelBuilder()
        .setLabel("Quantity")
        .setTextInputComponent(selectDiceQuantityMenu);

    const selectPrivacyLabel = new LabelBuilder()
        .setLabel('How would you like to roll?')
        .setRadioGroupComponent(radioGroup =>
            radioGroup
                .setCustomId('dice_privacy_selection')
                .setRequired(true)
                .addOptions([
                    {
                        label: 'Private Roll',
                        value: 'private'
                    },
                    {
                        label: 'Roll to DM',
                        value: 'dm',
                        description: 'Will only send to the DM. Unknown roll for player.'
                    },
                    {
                        label: 'Roll to Everyone',
                        value: 'everyone'
                    }
                ])
        );

    diceRollerModal.addLabelComponents(characterNameLabel, selectDiceMenuLabel, selectDiceQuantityMenuLabel, selectPrivacyLabel);

    return diceRollerModal;
}