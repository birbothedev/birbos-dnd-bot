import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { getCampaignsList } from "../../data/db-commands/campaign_db_commands.js";

export function createCharacterModal(){
    const addAdventurerModal = new ModalBuilder()
        .setCustomId(`add_character_modal`)
        .setTitle('⚔️ Add Your Character');
    
    // character name input field
    const characterName = new TextInputBuilder()
        .setCustomId('character_name_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`Enter your character's name.`)
        .setMaxLength(40)
        .setMinLength(1)
        .setRequired(true);
    const characterNameLabel = new LabelBuilder()
        .setLabel("Add a Character")
        .setTextInputComponent(characterName);
    
    // get active campaigns
    const campaignsList = getCampaignsList(1);

    const options = []
        for (const campaign of campaignsList){
            const camp = new StringSelectMenuOptionBuilder()
                .setLabel(campaign.name)
                .setValue(String(campaign.id));
            
            options.push(camp);
        }
    
    // select campaign field
    const selectCampaginMenu = new StringSelectMenuBuilder()
    .setCustomId('character_campaign_input')
    .setPlaceholder('Select your campaign.')
    .addOptions(options);
    const selectCampaginMenuLabel = new LabelBuilder()
    .setLabel('Campaign')
    .setDescription(`Select the campaign your character is a part of.`)
    .setStringSelectMenuComponent(selectCampaginMenu);

    // select class field
    const selectClassMenu = new StringSelectMenuBuilder()
    .setCustomId('character_class_input')
    .setPlaceholder('Select your class.')
    .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('Artificer').setValue('artificer').setEmoji('⚙️'),
        new StringSelectMenuOptionBuilder().setLabel('Barbarian').setValue('barbarian').setEmoji('⚔️'),
        new StringSelectMenuOptionBuilder().setLabel('Bard').setValue('bard').setEmoji('🎼'),
        new StringSelectMenuOptionBuilder().setLabel('Cleric').setValue('cleric').setEmoji('✨'),
        new StringSelectMenuOptionBuilder().setLabel('Druid').setValue('druid').setEmoji('🍃'),
        new StringSelectMenuOptionBuilder().setLabel('Fighter').setValue('fighter').setEmoji('🗡️'),
        new StringSelectMenuOptionBuilder().setLabel('Monk').setValue('monk').setEmoji('🥋'),
        new StringSelectMenuOptionBuilder().setLabel('Paladin').setValue('paladin').setEmoji('🛡️'),
        new StringSelectMenuOptionBuilder().setLabel('Ranger').setValue('ranger').setEmoji('🏹'),
        new StringSelectMenuOptionBuilder().setLabel('Rogue').setValue('rogue').setEmoji('🗝️'),
        new StringSelectMenuOptionBuilder().setLabel('Sorcerer').setValue('sorcerer').setEmoji('🔥'),
        new StringSelectMenuOptionBuilder().setLabel('Warlock').setValue('warlock').setEmoji('🌀'),
        new StringSelectMenuOptionBuilder().setLabel('Wizard').setValue('wizard').setEmoji('🔮')
    );
    const selectClassMenuLabel = new LabelBuilder()
        .setLabel('Class')
        .setDescription(`Select your character's main class.`)
        .setStringSelectMenuComponent(selectClassMenu);

    // add race
    const raceInput = new TextInputBuilder()
        .setCustomId('race_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`Enter your character's race.`)
        .setMaxLength(40)
        .setMinLength(1)
        .setRequired(true);
    const raceInputLabel = new LabelBuilder()
        .setLabel("Add a Race")
        .setTextInputComponent(raceInput);

    // optional add subclass
    const subclassInput = new TextInputBuilder()
        .setCustomId('subclass_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`Enter your character's subclass. Leave blank if none!`)
        .setMaxLength(40)
        .setMinLength(1)
        .setRequired(false);
    const subclassInputLabel = new LabelBuilder()
        .setLabel("Add a Subclass")
        .setTextInputComponent(subclassInput);

    // character background input field
    const characterBackstoryInput = new TextInputBuilder()
        .setCustomId('character_backstory_input')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder(`Enter a brief description of your character's backstory. Max 500 characters.`)
        .setMaxLength(500)
        .setMinLength(1)
        .setRequired(true);
    const characterBackstoryInputLabel = new LabelBuilder()
        .setLabel("Add a Backstory")
        .setTextInputComponent(characterBackstoryInput);

    addAdventurerModal.addLabelComponents(characterNameLabel, selectCampaginMenuLabel, raceInputLabel, selectClassMenuLabel, characterBackstoryInputLabel);

    return addAdventurerModal;
}