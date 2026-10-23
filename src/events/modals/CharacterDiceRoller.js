import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export function createCharacterDiceRollerModal(characterName, characterId){
    const diceRollerModal = new ModalBuilder()
        .setCustomId(`character_dice_roller_modal:${characterId}`)
        .setTitle(`🎲 ${characterName} Dice Roller`);

    const selectAbilityMenu = new StringSelectMenuBuilder()
        .setCustomId('character_select_ability_input')
        .setPlaceholder('Select')
        .addOptions(
            new StringSelectMenuOptionBuilder().setLabel('STR').setValue('str'),
            new StringSelectMenuOptionBuilder().setLabel('DEX').setValue('dex'),
            new StringSelectMenuOptionBuilder().setLabel('CON').setValue('con'),
            new StringSelectMenuOptionBuilder().setLabel('INT').setValue('int'),
            new StringSelectMenuOptionBuilder().setLabel('WIS').setValue('wis'),
            new StringSelectMenuOptionBuilder().setLabel('CHA').setValue('cha')
        );
    const selectAbilityMenuLabel = new LabelBuilder()
    .setLabel('Ability Selector')
    .setDescription('Please choose the ability check to roll.')
    .setStringSelectMenuComponent(selectAbilityMenu);

    const selectProficiencyLabel = new LabelBuilder()
        .setLabel('Proficiency?')
        .setRadioGroupComponent(radioGroup =>
            radioGroup
                .setCustomId('character_proficiency_selection')
                .setRequired(true)
                .addOptions([
                    {
                        label: 'Yes',
                        value: 'yes'
                    },
                    {
                        label: 'No',
                        value: 'no'
                    },
                    {
                        label: 'Expertise',
                        value: 'expertise'
                    }
                ])
        );

    // select dice field
    const selectDiceMenu = new StringSelectMenuBuilder()
    .setCustomId('character_select_dice_input')
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
        .setCustomId('character_dice_quantity_input')
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
                .setCustomId('character_dice_privacy_selection')
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

    diceRollerModal.addLabelComponents(selectAbilityMenuLabel, selectProficiencyLabel, selectDiceMenuLabel, selectDiceQuantityMenuLabel, selectPrivacyLabel);

    return diceRollerModal;
}