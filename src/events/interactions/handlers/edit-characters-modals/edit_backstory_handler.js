import { TextDisplayBuilder } from "discord.js";
import { updateCharacterBackstory } from "../../../../data/db-commands/character_db_commands.js"
export default {
    customId: 'edit_backstory_modal:', 
    type: 'modal',
    async execute(interaction) {
        const userId = interaction.user.id;
        const characterId = interaction.customId.split(':')[1];
        const backstoryInput = interaction.fields.getTextInputValue('character_edit_backstory_input');

            try {      

                updateCharacterBackstory(userId, characterId, backstoryInput);

                const confirmationMessage = `✅ Successfully updated the backstory!`

                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent(confirmationMessage)
                    ]
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);

                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent('❌ Something went wrong. Please wait a moment and try again!')
                    ]
                });
            }
    }
};