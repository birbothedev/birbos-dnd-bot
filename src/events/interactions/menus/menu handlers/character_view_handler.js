import { MessageFlags, ActionRowBuilder } from "discord.js";
import { getCharactersByUserID } from "../../../../data/db-commands/character_db_commands.js";
import { createCharacterSheetComponent } from "../../../components/adventurer-kit/character_stat_page.js";
import { createDeleteButton } from "../../../../helpers/delete_character.js"
import { createCharacterDiceRollerButton } from "../../../../helpers/character_dice_roll_button.js";

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


                const component = createCharacterSheetComponent(characterName, characterLevel, characterRace, characterClass, characterBackstory);
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