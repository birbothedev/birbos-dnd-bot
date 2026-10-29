import { MessageFlags, ActionRowBuilder } from "discord.js";
import { getCharactersByUserID } from "../../../../data/db-commands/character_db_commands.js";
import { createCharacterSheetComponent } from "../../../components/adventurer-kit/character_stat_page.js";
import { createDeleteButton } from "../../../../helpers/delete_character.js"
import { createCharacterDiceRollerButton } from "../../../../helpers/character_dice_roll_button.js";
import { getCampaignByCampaignID } from "../../../../data/db-commands/campaign_db_commands.js";

export default {
    customId: 'character_sheet_dropdown', 
    async execute(interaction) {
        const userId = interaction.user.id;
        const characterSelected = interaction.values[0];

            try {      

                // look up characters in db
                const characters = getCharactersByUserID(userId, 1)

                const selectedCharacter = characters.find(
                    char => char.id === Number(characterSelected)
                );

                // if no matching character found
                if (!selectedCharacter) {
                    return interaction.update({
                        content: 'Character not found.'
                    });
                }

                const characterId = selectedCharacter.id;
                const characterName = selectedCharacter.character_name;
                const characterLevel = selectedCharacter.character_level;
                const characterRace = selectedCharacter.character_race;
                const characterClass = selectedCharacter.character_class;
                const characterBackstory = selectedCharacter.character_backstory;
                const charSTR = selectedCharacter.strength;
                const charDEX = selectedCharacter.dexterity;
                const charCON = selectedCharacter.constitution;
                const charINT = selectedCharacter.intelligence;
                const charWIS = selectedCharacter.wisdom;
                const charCHA = selectedCharacter.charisma;
                const charHP = selectedCharacter.health_points;
                const charAC = selectedCharacter.armor_class;
                const charSPEED = selectedCharacter.speed;
                
                const campaignId = selectedCharacter.campaign_id;
                const campaign = getCampaignByCampaignID(campaignId);


                const component = createCharacterSheetComponent(characterId, characterName, characterLevel, characterRace, characterClass, characterBackstory, charSTR, charDEX, charCON, charINT, charWIS, charCHA, charHP, charAC, charSPEED, campaign.name, campaign.description);
                const row = new ActionRowBuilder()
                    .addComponents(createDeleteButton(characterId), createCharacterDiceRollerButton(characterId));

                component.addActionRowComponents(row);

                await interaction.update({
                    components: [component],
                    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);
                await interaction.reply({
                    content: '❌ Something went wrong. Please wait a moment and try again!',
                    flags: MessageFlags.Ephemeral
                });
            }
    }
};