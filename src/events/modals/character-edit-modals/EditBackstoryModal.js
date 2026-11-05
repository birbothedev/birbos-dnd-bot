import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder } from "discord.js";

export function createEditBackstoryModal(characterId){
    const editBackstoryModal = new ModalBuilder()
        .setCustomId(`edit_backstory_modal:${characterId}`)
        .setTitle('Edit Backstory');

    // character background input field
    const characterBackstoryInput = new TextInputBuilder()
        .setCustomId(`character_edit_backstory_input`)
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder(`Enter a brief description of your character's backstory. Max 500 characters.`)
        .setMaxLength(500)
        .setMinLength(1)
        .setRequired(true);
    const characterBackstoryInputLabel = new LabelBuilder()
        .setLabel("Edit your Backstory")
        .setTextInputComponent(characterBackstoryInput);

    editBackstoryModal.addLabelComponents(characterBackstoryInputLabel);

    return editBackstoryModal;
}