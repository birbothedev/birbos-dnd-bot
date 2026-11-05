import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder} from "discord.js";

export function createAbilityScoresModal(){
    const abilityScoresModal = new ModalBuilder()
        .setCustomId(`edit_ability_scores_modal`)
        .setTitle('Edit your Ability Scores');

    const characterStr = new TextInputBuilder()
        .setCustomId('character_str_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`10`)
        .setMaxLength(3)
        .setMinLength(1)
        .setRequired(true);
    const characterStrLabel = new LabelBuilder()
        .setLabel("Strength Score")
        .setTextInputComponent(characterStr);
    
    const characterDex = new TextInputBuilder()
        .setCustomId('character_dex_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`19`)
        .setMaxLength(3)
        .setMinLength(1)
        .setRequired(true);
    const characterDexLabel = new LabelBuilder()
        .setLabel("Dexterity Score")
        .setTextInputComponent(characterDex);
    
    const characterCon = new TextInputBuilder()
        .setCustomId('character_con_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`16`)
        .setMaxLength(3)
        .setMinLength(1)
        .setRequired(true);
    const characterConLabel = new LabelBuilder()
        .setLabel("Constitution Score")
        .setTextInputComponent(characterCon);
    
    const characterInt = new TextInputBuilder()
        .setCustomId('character_int_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`13`)
        .setMaxLength(3)
        .setMinLength(1)
        .setRequired(true);
    const characterIntLabel = new LabelBuilder()
        .setLabel("Intelligence Score")
        .setTextInputComponent(characterInt);
    
    const characterWis = new TextInputBuilder()
        .setCustomId('character_wis_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`16`)
        .setMaxLength(3)
        .setMinLength(1)
        .setRequired(true);
    const characterWisLabel = new LabelBuilder()
        .setLabel("Wisdom Score")
        .setTextInputComponent(characterWis);
    
    const characterCha = new TextInputBuilder()
        .setCustomId('character_cha_input')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`8`)
        .setMaxLength(3)
        .setMinLength(1)
        .setRequired(true);
    const characterChaLabel = new LabelBuilder()
        .setLabel("Charisma Score")
        .setTextInputComponent(characterCha);
    
    

    abilityScoresModal.addLabelComponents(characterStrLabel, characterDexLabel, characterConLabel, characterIntLabel, characterWisLabel);

    return abilityScoresModal;
}