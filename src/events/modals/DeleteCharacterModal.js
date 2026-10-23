import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder, CheckboxBuilder, CheckboxGroupBuilder, CheckboxGroupOptionBuilder } from "discord.js";

export function createDeleteCharacterModal(characterId){
    const createDeleteCharacter = new ModalBuilder()
        .setCustomId(`delete_character_modal:${characterId}`)
        .setTitle('❌ Delete Character');
    
    // character name
    const characterName = new TextInputBuilder()
        .setCustomId('delete_character_name')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Enter the name...')
        .setMaxLength(30)
        .setMinLength(1)
        .setRequired(true);
    const characterNameLabel = new LabelBuilder()
        .setLabel("Character Name")
        .setDescription(`Enter the character's name as it is stored in the database to confirm.`)
        .setTextInputComponent(characterName);

    const selectDelete = new CheckboxGroupBuilder()
        .setCustomId('delete_confirmation')
        .addOptions(
            new CheckboxGroupOptionBuilder().setLabel('Confirm').setValue('confirm')
        );

    const selectDeleteLabel = new LabelBuilder()
        .setLabel('Are you sure?')
        .setDescription('⚠️Warning: This action is permanent and is NOT reversable.')
        .setCheckboxGroupComponent(selectDelete);

    createDeleteCharacter.addLabelComponents(characterNameLabel, selectDeleteLabel);

    return createDeleteCharacter;
}