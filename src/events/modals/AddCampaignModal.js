import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder } from "discord.js";

export function createCampaignModal(){
    const addCampaignModal = new ModalBuilder()
        .setCustomId(`add_campaign_modal`)
        .setTitle('📖 Add Your Campaign');
    
    // character name input field
    const campaignName = new TextInputBuilder()
        .setCustomId('campaign_name_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`Enter your campaign's name.`)
        .setMaxLength(60)
        .setMinLength(1)
        .setRequired(true);
    const campaignNameLabel = new LabelBuilder()
        .setLabel("Add a Campaign")
        .setTextInputComponent(campaignName);

    // character background input field
    const campaignPremiseInput = new TextInputBuilder()
        .setCustomId('campaign_premise_input')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder(`Enter a brief description of your campaign. Max 500 characters.`)
        .setMaxLength(500)
        .setMinLength(1)
        .setRequired(true);
    const campaignPremiseInputLabel = new LabelBuilder()
        .setLabel("Add a Premise")
        .setDescription(`*Warning: Other players will be able to read this. Be wary of spoilers!*`)
        .setTextInputComponent(campaignPremiseInput);

    addCampaignModal.addLabelComponents(campaignNameLabel, campaignPremiseInputLabel);

    return addCampaignModal;
}