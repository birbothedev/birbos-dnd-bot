import { MessageFlags } from "discord.js";
import { createCharacterSheetComponent } from "../events/components/adventurer-kit/character_stat_page.js";
import { createDeleteButton } from "../helpers/delete_character.js";

export default {
    customId: 'character_sheet_button', 
    type: 'button',
    async execute(interaction) {

        const characterName = "Katharine";
        const characterLevel = "5";
        const characterRace = "Starborn";
        const characterClass = "Rogue";
        const characterBackstory = "this is a really cool backstory. this is a really cool backstory. this is a really cool backstory. this is a really cool backstory. this is a really cool backstory. this is a really cool backstory. this is a really cool backstory. this is a really cool backstory."

        const component = createCharacterSheetComponent(characterName, characterLevel, characterRace, characterClass, characterBackstory);

        try {
            await interaction.reply({
                components: [component, createDeleteButton()],
                flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
            });

        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};